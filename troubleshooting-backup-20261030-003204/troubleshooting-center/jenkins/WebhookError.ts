

export interface WebhookDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  interpretResults: string[];
  nextDecision: string;
  safetyNote?: string;
}

export interface WebhookFailureCase {
  id: string;
  title: string;
  symptoms: string[];
  likelyCauses: string[];
  diagnosticSteps: string[];
  resolution: string[];
  validation: string[];
  prevention: string[];
}

export interface WebhookIncident {
  title: string;
  severity: string;
  scenario: string;
  impact: string[];
  immediateActions: string[];
  investigation: string[];
  recovery: string[];
  closureCriteria: string[];
}

export interface WebhookErrorGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  overview: string;
  objectives: string[];
  incidentWorkflow: WebhookDiagnosticStep[];
  failureCases: WebhookFailureCase[];
  productionIncidents: WebhookIncident[];
  commandReference: {
    title: string;
    commands: string[];
    warning?: string;
  }[];
  recoveryRunbook: string[];
  preventionChecklist: string[];
  monitoringAndAlerting: string[];
  ciValidation: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedOutcome: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const webhookErrorGuide: WebhookErrorGuide = {
  title: "Jenkins Webhook Errors: Production Troubleshooting",
  slug: "webhook-error",
  category: "Jenkins",
  difficulty: "Advanced",

  overview: `
A webhook connects a source-control platform such as GitHub or GitLab to Jenkins.
When a repository event occurs, the source platform sends an HTTP request to a
configured endpoint. Jenkins, its plugins, reverse proxies, authentication
layers, and job configuration must process that request correctly.

A successful HTTP delivery does not necessarily mean that a Jenkins build started.
Likewise, a successful Jenkins build does not prove that the intended commit was
built or that deployment succeeded.

Production troubleshooting must trace the entire event lifecycle:

Repository event
  -> Webhook delivery
  -> DNS / network / TLS
  -> Load balancer / reverse proxy
  -> Jenkins endpoint
  -> Authentication / authorization / CSRF handling
  -> Webhook plugin
  -> Job discovery / branch filtering
  -> Queue
  -> Agent execution
  -> Build result
  -> Deployment verification

The goal is to identify the first failed boundary using timestamps, delivery IDs,
HTTP responses, Jenkins logs, job configuration, and commit SHAs—not by repeatedly
clicking "Build Now" or changing several settings at once.
`,

  objectives: [
    "Trace a webhook from GitHub or GitLab to a Jenkins job.",
    "Distinguish webhook delivery success from successful build execution.",
    "Diagnose HTTP 400, 401, 403, 404, 408, 429, and 5xx responses.",
    "Investigate wrong URLs, missing secrets, proxy errors, TLS failures, and DNS issues.",
    "Troubleshoot missing builds, branch filters, multibranch indexing, and duplicate triggers.",
    "Identify plugin regressions, queue congestion, and Jenkins resource problems.",
    "Recover safely without exposing secrets or deploying an unintended commit.",
    "Implement observability, CI validation, replay protection, and incident prevention."
  ],

  incidentWorkflow: [
    {
      id: "01",
      title: "Confirm the incident and establish the timeline",
      objective:
        "Determine exactly what failed, when it started, and which repository, job, branch, and environment are affected.",
      commands: [
        "date -Is",
        "git rev-parse HEAD",
        "git status --short",
        "git log -5 --oneline --decorate"
      ],
      interpretResults: [
        "Record the repository URL, affected job, branch, expected commit SHA, and approximate event time.",
        "Compare the last successful webhook delivery with the first failed delivery.",
        "Check whether the failure affects one repository, one Jenkins job, one branch, or every webhook.",
        "Correlate source-control delivery timestamps with reverse-proxy and Jenkins logs.",
        "Use the repository commands only in the intended local checkout; they do not inspect remote webhook delivery history."
      ],
      nextDecision:
        "One repository suggests repository configuration or permissions. One job suggests job configuration. All repositories failing suggests shared infrastructure, credentials, proxy, TLS, or Jenkins availability.",
      safetyNote:
        "Do not replay production deployment events until you know whether the original event already started a build or changed infrastructure."
    },
    {
      id: "02",
      title: "Assess severity and stop unsafe deployment activity",
      objective:
        "Understand business impact before attempting recovery.",
      commands: [
        "kubectl get deploy,pods -n <namespace>",
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=60s",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp"
      ],
      interpretResults: [
        "These Kubernetes commands are relevant only if the Jenkins pipeline deploys to Kubernetes.",
        "A missing webhook with no build usually means the expected pipeline never started.",
        "A running or completed build may already have applied changes even if webhook delivery later appears unsuccessful.",
        "A failed webhook does not prove that production is unchanged.",
        "Record whether users are affected, deployment is blocked, and a release is partially applied."
      ],
      nextDecision:
        "If a production rollout is in progress or its outcome is uncertain, pause new releases using the approved release-control process and inspect the target environment before replaying anything.",
      safetyNote:
        "Never assume that retrying a deployment is harmless. Determine whether the operation is idempotent and whether the first attempt partially succeeded."
    },
    {
      id: "03",
      title: "Inspect source-control webhook delivery",
      objective:
        "Determine whether the source platform sent the event and what HTTP response it received.",
      commands: [
        "Open GitHub repository Settings -> Webhooks -> select the configured webhook -> Recent Deliveries.",
        "Open the exact delivery and inspect event type, delivery timestamp, request URL, response status, response body, and duration.",
        "Record the delivery ID and request/event identifiers when available.",
        "Compare the failed delivery with a known successful delivery."
      ],
      interpretResults: [
        "No delivery: investigate webhook configuration, event subscriptions, repository permissions, and whether the event actually occurred.",
        "DNS or connection failure: investigate name resolution, routing, firewall rules, load balancer health, and endpoint reachability.",
        "TLS failure: inspect certificate validity, hostname matching, certificate chain, and trust configuration.",
        "HTTP 401 or 403: investigate authentication, authorization, secret verification, and security controls.",
        "HTTP 404: verify the endpoint path and whether the expected plugin or webhook endpoint exists.",
        "HTTP 5xx or timeout: inspect reverse-proxy errors, Jenkins availability, plugin processing, and upstream timeouts.",
        "HTTP 2xx: continue investigating Jenkins job selection, branch filters, queueing, and downstream execution."
      ],
      nextDecision:
        "Follow the evidence from the earliest failed boundary. Do not change Jenkinsfile, network rules, secrets, and plugins simultaneously.",
      safetyNote:
        "Do not paste complete webhook payloads, signatures, authorization headers, or shared secrets into tickets or public logs."
    },
    {
      id: "04",
      title: "Verify the webhook endpoint and event configuration",
      objective:
        "Ensure that the source repository sends the correct event to the intended Jenkins installation.",
      commands: [
        "Inspect the webhook URL configured in the source repository.",
        "Inspect the matching endpoint documentation for the installed Jenkins integration plugin.",
        "Confirm the expected event types, such as push or pull-request events.",
        "Confirm that the configured Jenkins job or multibranch pipeline is intended to process those events."
      ],
      interpretResults: [
        "A URL pointing to an old Jenkins server may return a valid HTTP response while triggering the wrong installation.",
        "A trailing path, missing context path, or incorrect plugin endpoint can result in 404 or unexpected behavior.",
        "A webhook subscribed only to pull-request events will not necessarily trigger for ordinary push events.",
        "A webhook subscribed to push events does not guarantee that a branch-filtered job accepts every pushed branch.",
        "Do not assume all Jenkins GitHub integrations use the same endpoint; verify the actual plugin and configuration."
      ],
      nextDecision:
        "Correct only the verified URL or event subscription. Capture the existing configuration first and coordinate changes with the repository owner.",
      safetyNote:
        "Do not replace a webhook URL with a guessed endpoint or expose an administrative Jenkins endpoint to the public internet."
    },
    {
      id: "05",
      title: "Trace DNS, network, proxy, and TLS",
      objective:
        "Determine whether the source platform can reach the intended Jenkins endpoint.",
      commands: [
        "nslookup <jenkins.example.com>",
        "curl -sS -o /dev/null -w 'HTTP %{http_code}\\n' --connect-timeout 5 --max-time 15 https://<jenkins.example.com>/",
        "curl -Iv --connect-timeout 5 --max-time 15 https://<jenkins.example.com>/",
        "openssl s_client -connect <jenkins.example.com>:443 -servername <jenkins.example.com> -verify_return_error </dev/null"
      ],
      interpretResults: [
        "DNS resolution failure suggests an incorrect hostname, DNS outage, or resolver problem.",
        "Connection timeout can indicate routing, firewall, security group, proxy, load balancer, or unavailable upstream.",
        "Connection refused indicates that the destination is reachable but the target port is not accepting connections.",
        "Certificate verification errors suggest an expired certificate, hostname mismatch, incomplete chain, or trust issue.",
        "A response from curl confirms only the tested client path. It does not prove that GitHub's delivery infrastructure can reach the same endpoint.",
        "A 403 or 404 from the root URL is not proof that the configured webhook endpoint is broken; the root path may be protected or unrelated."
      ],
      nextDecision:
        "Compare external delivery evidence with tests from the relevant network boundary. Ask the network or platform team to validate firewall, ingress, DNS, and proxy logs at the incident timestamp.",
      safetyNote:
        "Do not use curl -k as a permanent fix. Do not expose internal hostnames, tokens, or sensitive response headers in incident reports."
    },
    {
      id: "06",
      title: "Check reverse-proxy and load-balancer behavior",
      objective:
        "Identify whether NGINX, an ingress controller, an application gateway, or another proxy rejects or mishandles requests.",
      commands: [
        "sudo nginx -t",
        "sudo journalctl -u nginx --since '30 minutes ago' --no-pager",
        "kubectl get ingress,svc,endpoints -A",
        "kubectl logs <ingress-controller-pod> -n <ingress-namespace> --since=30m"
      ],
      interpretResults: [
        "Run NGINX commands only on the actual NGINX host and only when you have authorization.",
        "Run Kubernetes commands only when the proxy or Jenkins service is hosted in Kubernetes.",
        "Inspect upstream connection failures, request-size limits, body buffering, rate limiting, path rewriting, and upstream timeouts.",
        "Compare proxy access-log status with Jenkins application-log status.",
        "A proxy-generated 502 or 504 often points to upstream connectivity or timeout; it does not identify the exact root cause by itself.",
        "Do not increase request-size or timeout limits without evidence that the existing limit is the failing boundary."
      ],
      nextDecision:
        "If the proxy returns an error before Jenkins receives the request, fix the verified proxy or upstream issue. If Jenkins receives it, continue with Jenkins-side diagnostics.",
      safetyNote:
        "Validate configuration before reloads. Use the approved change process and preserve the previous working configuration for rollback."
    },
    {
      id: "07",
      title: "Inspect Jenkins logs and endpoint processing",
      objective:
        "Find out whether Jenkins received the event and which component handled or rejected it.",
      commands: [
        "sudo journalctl -u jenkins --since '30 minutes ago' --no-pager",
        "kubectl logs <jenkins-pod> -n <jenkins-namespace> --since=30m",
        "Open Jenkins -> Manage Jenkins -> System Log.",
        "Open Jenkins -> Manage Jenkins -> Plugins and record relevant plugin versions."
      ],
      interpretResults: [
        "Use the systemd command only when Jenkins runs as a system service.",
        "Use Kubernetes logs only when Jenkins runs in Kubernetes.",
        "Search by timestamp, request ID, delivery ID, endpoint path, plugin name, and exception class when available.",
        "A missing log entry may mean the request never reached Jenkins, logging is insufficient, or the relevant component does not log each request.",
        "A plugin exception or class-loading error after an upgrade suggests a possible compatibility or regression issue.",
        "Correlate with Jenkins startup, restart, memory pressure, and controller availability."
      ],
      nextDecision:
        "If the request reaches Jenkins and is rejected, inspect the responsible security or plugin layer. If the request is accepted but no job is scheduled, inspect job configuration and event matching.",
      safetyNote:
        "Avoid enabling verbose HTTP logging indiscriminately; it may record sensitive headers or payloads."
    },
    {
      id: "08",
      title: "Validate job discovery, branch filters, and multibranch indexing",
      objective:
        "Explain why an accepted event did not produce the expected job or build.",
      commands: [
        "git remote -v",
        "git branch --show-current",
        "git rev-parse HEAD",
        "Open the affected Jenkins job -> Configure -> Build Triggers.",
        "For a multibranch pipeline, inspect the branch source, include/exclude rules, indexing logs, and discovered branch jobs."
      ],
      interpretResults: [
        "A webhook may be accepted but not match any configured job.",
        "Branch filters can exclude the pushed branch.",
        "A pull-request event may be handled by a different job or branch source than a push event.",
        "A multibranch job may require indexing to discover a newly created branch or pull request.",
        "A repository URL mismatch can cause Jenkins to build a different repository.",
        "A disabled job, removed branch job, or changed trigger configuration can prevent scheduling."
      ],
      nextDecision:
        "Correct the verified job trigger or branch-source configuration. Use a controlled indexing operation if appropriate and inspect its logs before changing credentials or network configuration.",
      safetyNote:
        "Do not enable every branch or pull-request trigger in production just to make one missing build appear."
    },
    {
      id: "09",
      title: "Check credentials, authorization, and CSRF handling",
      objective:
        "Determine whether a security layer blocks the webhook or downstream SCM access.",
      commands: [
        "Inspect the webhook's configured secret or signature verification mechanism without displaying its value.",
        "Inspect the Jenkins credential ID and credential scope used by the relevant integration.",
        "Inspect Jenkins security settings and relevant authentication/authorization logs.",
        "Review plugin documentation for the endpoint's expected authentication and CSRF behavior."
      ],
      interpretResults: [
        "A missing or incorrect shared secret can cause signature verification to fail when the integration expects one.",
        "A rotated secret must be updated consistently at both ends.",
        "An expired or revoked GitHub App token can affect repository discovery or API access even if basic HTTP delivery succeeds.",
        "A 403 may be generated by a proxy, WAF, Jenkins authorization, or an application plugin; identify which component generated it.",
        "Do not assume that disabling CSRF protection is required for webhook integration. Use the supported integration endpoint and documented security behavior.",
        "Do not assume a GitHub App credential is the same thing as a webhook secret; they serve different purposes."
      ],
      nextDecision:
        "Correct only the verified credential, permission, or security configuration. Rotate compromised secrets through the approved secret-management process.",
      safetyNote:
        "Never disable authentication globally, disable CSRF protections as a shortcut, or print secrets into the build log."
    },
    {
      id: "10",
      title: "Inspect queue, executor, and controller health",
      objective:
        "Distinguish a missing trigger from a build that was scheduled but cannot start.",
      commands: [
        "Open Jenkins -> Build Queue.",
        "Open Jenkins -> Manage Jenkins -> Nodes and inspect agent availability.",
        "Open the affected job's build history and queue-related logs.",
        "kubectl get pods -n <jenkins-namespace> -o wide",
        "kubectl top pods -n <jenkins-namespace>"
      ],
      interpretResults: [
        "A queued build means event processing progressed further than a request that never reached Jenkins.",
        "No available executor, an offline agent, label mismatch, or blocked queue item can delay execution.",
        "Controller memory pressure, CPU saturation, disk exhaustion, or repeated restarts can cause delayed or failed processing.",
        "A webhook retry may create duplicate events while the original build is still queued.",
        "kubectl top requires a functioning metrics source and is not available in every cluster."
      ],
      nextDecision:
        "Restore capacity or correct the verified scheduling constraint. Avoid replaying the event until the existing queue and build state are understood.",
      safetyNote:
        "Do not increase executor counts blindly; that may overload the controller or downstream production systems."
    },
    {
      id: "11",
      title: "Investigate duplicate events and unexpected builds",
      objective:
        "Find the cause of repeated builds, duplicate deployments, or event storms.",
      commands: [
        "Compare source-platform delivery IDs and timestamps.",
        "Compare the SCM commit SHA associated with each Jenkins build.",
        "Inspect job trigger configuration and plugin-specific webhook behavior.",
        "Review recent changes to shared libraries, webhook consumers, and pipeline retry logic."
      ],
      interpretResults: [
        "Different delivery IDs can represent separate legitimate events, retries, or multiple configured hooks.",
        "Multiple jobs may intentionally respond to the same repository event.",
        "A push and pull-request event may both schedule builds for the same commit.",
        "A retry policy may re-run a deployment after an ambiguous timeout.",
        "A repeated build is not automatically a duplicate; compare the event type, branch, commit, and intended behavior."
      ],
      nextDecision:
        "Remove only the verified duplicate trigger or implement a supported idempotency strategy. Preserve legitimate validation workflows.",
      safetyNote:
        "Before cancelling queued builds, verify whether they contain required security checks or release approvals."
    },
    {
      id: "12",
      title: "Repair, validate, and recover under change control",
      objective:
        "Restore the event path and prove that the intended commit is processed safely.",
      commands: [
        "Re-test the configured endpoint using the approved source-platform delivery mechanism.",
        "Confirm that the expected Jenkins job is scheduled.",
        "Confirm that the build uses the expected repository, branch, and commit SHA.",
        "Inspect test, security-scan, artifact, and deployment results.",
        "Verify the target environment's health after the release."
      ],
      interpretResults: [
        "A successful HTTP delivery is the first checkpoint, not the final success criterion.",
        "A successful build for the wrong branch or commit is still an incident.",
        "A successful deployment command does not guarantee application health.",
        "If the first attempt may have partially deployed, reconcile the actual environment before another deployment.",
        "Record the configuration change, verification evidence, and rollback decision."
      ],
      nextDecision:
        "Close the incident only after the delivery, expected build, intended commit, required checks, and deployment outcome are verified.",
      safetyNote:
        "Use an approved replay or test event. Do not send arbitrary production deployment payloads or bypass required approvals."
    }
  ],

  failureCases: [
    {
      id: "WH-01",
      title: "Webhook delivery returns HTTP 404",
      symptoms: [
        "Source platform reports 404.",
        "No corresponding Jenkins build appears.",
        "The webhook worked before a Jenkins URL or plugin change."
      ],
      likelyCauses: [
        "Incorrect endpoint path or context path.",
        "Webhook points to the wrong Jenkins instance.",
        "Expected integration plugin is absent or changed.",
        "Reverse proxy rewrites the request path incorrectly."
      ],
      diagnosticSteps: [
        "Inspect the exact request URL in the failed delivery.",
        "Compare it with the installed integration plugin's documented endpoint.",
        "Check proxy access logs to see whether the request reached Jenkins.",
        "Inspect Jenkins logs at the same timestamp.",
        "Compare the endpoint with a known successful configuration."
      ],
      resolution: [
        "Correct the URL using the documented endpoint for the installed integration.",
        "Fix the verified proxy path rewrite if the request is altered before reaching Jenkins.",
        "Restore a compatible plugin only through the approved plugin-change procedure.",
        "Re-deliver a safe test event."
      ],
      validation: [
        "The expected endpoint responds as documented.",
        "The intended Jenkins job is scheduled.",
        "The expected commit SHA is built."
      ],
      prevention: [
        "Manage webhook URLs as reviewed configuration.",
        "Monitor delivery failures and endpoint changes.",
        "Document plugin-specific endpoint requirements."
      ]
    },
    {
      id: "WH-02",
      title: "HTTP 401 or 403: authentication or authorization failure",
      symptoms: [
        "Webhook delivery is rejected.",
        "A security layer reports unauthorized or forbidden.",
        "The failure begins after a secret, permission, or security-policy change."
      ],
      likelyCauses: [
        "Incorrect or missing webhook signature.",
        "Credential rotation was not completed on both sides.",
        "Repository or GitHub App permissions changed.",
        "Proxy, WAF, or Jenkins authorization rejected the request."
      ],
      diagnosticSteps: [
        "Identify which component generated the response.",
        "Inspect the relevant delivery metadata and security logs.",
        "Check the configured secret or credential ID without printing the value.",
        "Review recent secret rotations and permission changes.",
        "Verify the documented authentication method for the selected integration."
      ],
      resolution: [
        "Update the correct secret or credential through approved secret management.",
        "Grant only the minimum required permissions.",
        "Correct the responsible proxy or authorization rule if evidence identifies it.",
        "Re-test without exposing credentials."
      ],
      validation: [
        "A controlled delivery is accepted.",
        "The expected job starts once.",
        "No new authorization errors appear."
      ],
      prevention: [
        "Track secret ownership and rotation.",
        "Alert on authentication failures.",
        "Use least privilege and audited credential changes."
      ]
    },
    {
      id: "WH-03",
      title: "Webhook returns HTTP 5xx or times out",
      symptoms: [
        "Delivery reports 500, 502, 503, 504, or timeout.",
        "Failures are intermittent or occur during busy periods.",
        "Jenkins or the reverse proxy shows errors around the same time."
      ],
      likelyCauses: [
        "Jenkins restart or controller overload.",
        "Reverse-proxy upstream connection failure.",
        "Slow plugin processing or a blocking downstream dependency.",
        "Network interruption or timeout mismatch.",
        "Disk, CPU, or memory exhaustion."
      ],
      diagnosticSteps: [
        "Correlate delivery timestamps with proxy and Jenkins logs.",
        "Inspect Jenkins uptime, restarts, and resource usage.",
        "Check controller disk space and system resource metrics.",
        "Inspect upstream connection errors and timeout logs.",
        "Determine whether a build was scheduled despite the response."
      ],
      resolution: [
        "Restore the failing upstream service or resource.",
        "Correct a proven timeout or proxy configuration issue.",
        "Fix a plugin exception or resource leak through a tested change.",
        "Replay only after checking existing build and deployment state."
      ],
      validation: [
        "Controlled deliveries complete within expected time.",
        "Jenkins logs show successful event handling.",
        "The intended build starts without duplicates."
      ],
      prevention: [
        "Monitor endpoint latency, HTTP status, and controller health.",
        "Load-test the event path where appropriate.",
        "Document recovery behavior for ambiguous delivery outcomes."
      ]
    },
    {
      id: "WH-04",
      title: "HTTP 2xx but no Jenkins build starts",
      symptoms: [
        "Delivery is marked successful.",
        "No expected build appears in job history.",
        "Other repositories or jobs may still work."
      ],
      likelyCauses: [
        "Wrong job trigger configuration.",
        "Branch or event filters exclude the event.",
        "Multibranch indexing has not discovered the branch.",
        "Webhook was accepted by a different Jenkins instance or plugin.",
        "The job is disabled or no matching job exists."
      ],
      diagnosticSteps: [
        "Confirm the delivery's target URL and receiving Jenkins instance.",
        "Check job trigger configuration.",
        "Inspect branch source filters and indexing logs.",
        "Compare the event branch and commit with job configuration.",
        "Check queue history and relevant plugin logs."
      ],
      resolution: [
        "Correct the verified trigger or branch-source configuration.",
        "Run a controlled indexing operation if needed.",
        "Enable only the intended job or trigger.",
        "Test with a branch and event that the job is configured to accept."
      ],
      validation: [
        "The expected branch job is discovered.",
        "One expected build is scheduled.",
        "The build checks out the correct commit."
      ],
      prevention: [
        "Test trigger configuration during changes.",
        "Monitor expected events versus scheduled builds.",
        "Document branch and pull-request filtering rules."
      ]
    },
    {
      id: "WH-05",
      title: "Webhook stopped after plugin upgrade",
      symptoms: [
        "Deliveries fail or builds stop after a plugin update.",
        "Jenkins logs show exceptions or missing classes.",
        "Other integrations may also be affected."
      ],
      likelyCauses: [
        "Incompatible plugin versions.",
        "Core/plugin dependency mismatch.",
        "Changed endpoint or behavior.",
        "Regression introduced by a plugin update."
      ],
      diagnosticSteps: [
        "Record Jenkins core and relevant plugin versions.",
        "Compare the incident start time with the change history.",
        "Inspect startup logs and plugin exceptions.",
        "Review release notes and compatibility requirements.",
        "Reproduce in staging if possible."
      ],
      resolution: [
        "Use a tested compatible version or vendor-recommended fix.",
        "Apply the organization's plugin rollback process if the regression is confirmed.",
        "Restart Jenkins only when required by the approved procedure.",
        "Validate dependent integrations after the change."
      ],
      validation: [
        "Jenkins starts without relevant plugin errors.",
        "Controlled webhook delivery works.",
        "Other affected jobs and integrations remain healthy."
      ],
      prevention: [
        "Pin and review plugin versions.",
        "Test updates in staging.",
        "Keep a tested rollback plan and compatibility inventory."
      ]
    },
    {
      id: "WH-06",
      title: "TLS certificate or DNS failure",
      symptoms: [
        "Delivery fails before an HTTP response is received.",
        "Certificate validation or hostname resolution errors appear.",
        "Failure starts after DNS or certificate renewal."
      ],
      likelyCauses: [
        "Expired or incorrect certificate.",
        "Incomplete certificate chain.",
        "Incorrect DNS record or stale address.",
        "Firewall or routing changes."
      ],
      diagnosticSteps: [
        "Inspect certificate validity and hostname.",
        "Validate DNS from relevant network locations.",
        "Check load-balancer and firewall logs.",
        "Compare current DNS and certificate configuration with the last known good state."
      ],
      resolution: [
        "Renew or correct the certificate and complete the trust chain.",
        "Correct DNS or routing using the approved change process.",
        "Validate connectivity from the external delivery path."
      ],
      validation: [
        "TLS validation succeeds.",
        "The expected endpoint is reachable.",
        "A controlled event reaches Jenkins."
      ],
      prevention: [
        "Alert before certificate expiry.",
        "Monitor external endpoint reachability.",
        "Review DNS and network changes."
      ]
    },
    {
      id: "WH-07",
      title: "Webhook signature or shared-secret verification fails",
      symptoms: [
        "The endpoint rejects otherwise valid events.",
        "Failures start after a secret rotation.",
        "Logs indicate signature verification failure."
      ],
      likelyCauses: [
        "Different secrets configured at sender and receiver.",
        "Incorrect signature algorithm or header handling.",
        "Proxy or middleware alters the request body before verification.",
        "Incorrect custom validation implementation."
      ],
      diagnosticSteps: [
        "Confirm the documented signature algorithm and header name.",
        "Verify secret versions through the approved secret manager.",
        "Inspect whether middleware changes the raw request body.",
        "Review validation errors without logging secret values or full signatures."
      ],
      resolution: [
        "Synchronize the secret using a controlled rotation.",
        "Verify the signature against the original raw payload as required by the integration.",
        "Remove unsafe custom parsing or validation only through a reviewed fix."
      ],
      validation: [
        "A valid signed event is accepted.",
        "An invalid signature remains rejected.",
        "Secret values do not appear in logs."
      ],
      prevention: [
        "Automate safe secret rotation.",
        "Test valid and invalid signature cases.",
        "Use maintained integration libraries rather than custom cryptography."
      ]
    },
    {
      id: "WH-08",
      title: "Duplicate webhook events trigger multiple builds",
      symptoms: [
        "Multiple builds use the same commit.",
        "Deployments run more than once.",
        "Several webhooks or trigger mechanisms exist for the same repository."
      ],
      likelyCauses: [
        "Duplicate webhook registrations.",
        "Multiple plugins responding to the same event.",
        "Push and pull-request events both trigger jobs.",
        "Retry logic replays an event after an ambiguous timeout."
      ],
      diagnosticSteps: [
        "Compare delivery IDs, event types, timestamps, branch, and commit SHA.",
        "Inspect repository webhook registrations.",
        "Inspect Jenkins trigger configuration and plugin behavior.",
        "Check whether duplicate builds were actually separate intended validations."
      ],
      resolution: [
        "Remove only confirmed duplicate registrations or triggers.",
        "Consolidate event ownership where appropriate.",
        "Use idempotent deployment operations and concurrency controls.",
        "Avoid dropping legitimate security or pull-request validation builds."
      ],
      validation: [
        "A controlled event triggers the intended number of builds.",
        "Legitimate branch and pull-request workflows still run.",
        "Deployment retries do not create unsafe duplicate side effects."
      ],
      prevention: [
        "Document which component owns each trigger.",
        "Track delivery IDs and commit SHAs.",
        "Design deployments to tolerate safe retries."
      ]
    },
    {
      id: "WH-09",
      title: "Webhook triggers the wrong branch or commit",
      symptoms: [
        "A build starts but uses unexpected source code.",
        "A pull request build and branch build differ.",
        "The deployed version does not match the requested release."
      ],
      likelyCauses: [
        "Incorrect branch specification.",
        "Stale checkout or workspace reuse.",
        "Incorrect repository URL.",
        "Multibranch configuration or pull-request ref confusion."
      ],
      diagnosticSteps: [
        "Record the event's repository, ref, and commit SHA.",
        "Inspect the checkout log and the actual checked-out SHA.",
        "Compare the Jenkins job's branch specification with the event.",
        "Check shared-library and pipeline checkout behavior."
      ],
      resolution: [
        "Correct the repository or branch configuration.",
        "Use an explicit, verified revision when the pipeline design requires it.",
        "Clean or isolate workspaces only when evidence indicates stale workspace state.",
        "Rebuild and deploy only after confirming the intended commit and approvals."
      ],
      validation: [
        "Build metadata matches the requested commit.",
        "Artifacts identify the correct revision.",
        "Deployment provenance matches the approved release."
      ],
      prevention: [
        "Record commit SHA in build metadata.",
        "Use immutable artifact identifiers.",
        "Verify the release revision before production deployment."
      ]
    },
    {
      id: "WH-10",
      title: "Jenkins queue or agents prevent execution",
      symptoms: [
        "Webhook delivery succeeds but the build stays queued.",
        "Jobs wait for labels or offline agents.",
        "Build delays increase during busy periods."
      ],
      likelyCauses: [
        "No available executor.",
        "Offline agent or label mismatch.",
        "Resource saturation.",
        "Queue throttling or concurrency restrictions."
      ],
      diagnosticSteps: [
        "Inspect Jenkins queue reasons.",
        "Check node status, labels, and executor availability.",
        "Inspect controller and agent resource metrics.",
        "Check recent agent provisioning or infrastructure failures."
      ],
      resolution: [
        "Restore the failed agent or correct the verified label mismatch.",
        "Resolve resource constraints within approved capacity limits.",
        "Preserve required concurrency and deployment controls."
      ],
      validation: [
        "The queued build starts on the intended agent.",
        "Queue wait returns to the expected range.",
        "No new controller overload is introduced."
      ],
      prevention: [
        "Alert on queue age and offline agents.",
        "Set capacity and concurrency policies.",
        "Exercise agent recovery procedures."
      ]
    },
    {
      id: "WH-11",
      title: "GitHub App or SCM API permissions fail",
      symptoms: [
        "Webhook delivery succeeds but repository discovery or checkout fails.",
        "Multibranch indexing cannot list branches or pull requests.",
        "Failures begin after app installation or permission changes."
      ],
      likelyCauses: [
        "GitHub App lacks required repository permissions.",
        "App installation no longer includes the repository.",
        "Expired, revoked, or incorrectly scoped credentials.",
        "SCM API rate limits or transient API failures."
      ],
      diagnosticSteps: [
        "Inspect SCM indexing and checkout logs.",
        "Confirm the app installation includes the repository.",
        "Review required permissions against the integration documentation.",
        "Check API response codes and rate-limit information."
      ],
      resolution: [
        "Grant the minimum required permissions.",
        "Refresh or rotate credentials using the supported integration flow.",
        "Resolve rate limits with appropriate backoff and caching.",
        "Repeat indexing and verify the target branch."
      ],
      validation: [
        "Repository and branch discovery succeeds.",
        "Checkout uses the intended repository and revision.",
        "No permission or rate-limit errors remain."
      ],
      prevention: [
        "Review app permissions periodically.",
        "Monitor indexing failures and API rate limits.",
        "Document credential ownership and renewal."
      ]
    },
    {
      id: "WH-12",
      title: "Webhook succeeds but deployment outcome is uncertain",
      symptoms: [
        "The source platform shows successful delivery.",
        "The Jenkins build times out during deployment.",
        "Production health does not clearly indicate whether changes were applied."
      ],
      likelyCauses: [
        "Deployment operation partially completed.",
        "Network timeout after the remote system applied changes.",
        "Health checks failed after rollout.",
        "The build lost connectivity after initiating deployment."
      ],
      diagnosticSteps: [
        "Record the build ID, commit SHA, artifact version, and deployment target.",
        "Inspect the deployment tool's logs and target-system state.",
        "Check rollout status and application health where relevant.",
        "Determine whether the deployment is complete, partially applied, or still running."
      ],
      resolution: [
        "Do not immediately replay the entire deployment.",
        "Reconcile actual target state against the desired release.",
        "Use the approved resume, repair, or rollback procedure.",
        "Verify health and version after recovery."
      ],
      validation: [
        "The deployed revision is known.",
        "Application health and key business checks pass.",
        "No unintended duplicate deployment remains in progress."
      ],
      prevention: [
        "Use idempotent deployment steps.",
        "Record immutable artifact and release IDs.",
        "Implement deployment-state checks and explicit rollback criteria."
      ]
    }
  ],

  productionIncidents: [
    {
      title: "Incident A: Every GitHub webhook fails after a proxy change",
      severity: "SEV-1 or SEV-2 depending on release impact",
      scenario:
        "Several repositories stop triggering Jenkins immediately after a reverse-proxy configuration change. GitHub reports HTTP 502 for the configured webhook endpoint.",
      impact: [
        "Release pipelines cannot start.",
        "Emergency fixes may be delayed.",
        "Existing production workloads may remain healthy, but release capability is degraded."
      ],
      immediateActions: [
        "Declare the incident according to release impact.",
        "Pause risky manual deployment workarounds.",
        "Identify the first failing delivery and record its timestamp.",
        "Confirm whether existing builds or deployments are still running."
      ],
      investigation: [
        "Compare proxy logs with Jenkins logs at the exact delivery timestamp.",
        "Check whether the proxy can resolve and connect to the Jenkins upstream.",
        "Validate the active proxy configuration.",
        "Compare the recent change with the last known good configuration.",
        "Check whether all affected repositories use the same endpoint."
      ],
      recovery: [
        "If evidence confirms the proxy change caused the failure, use the approved rollback or corrected configuration.",
        "Validate the configuration before reload.",
        "Send a controlled test event.",
        "Inspect the queue and avoid replaying events whose builds already exist.",
        "Resume releases only after the event path and deployment checks are verified."
      ],
      closureCriteria: [
        "Webhook delivery succeeds for representative repositories.",
        "Expected Jenkins jobs start exactly as configured.",
        "The correct revisions are built.",
        "No duplicate production deployment is in progress.",
        "The proxy change and root cause are documented."
      ]
    },
    {
      title: "Incident B: HTTP 200 but production release does not start",
      severity: "SEV-2 or SEV-3 depending on release deadline",
      scenario:
        "GitHub reports successful push-event delivery, but the production multibranch pipeline has no new build.",
      impact: [
        "Release automation is delayed.",
        "Developers may mistakenly start manual builds.",
        "The wrong manual branch or revision could be deployed."
      ],
      immediateActions: [
        "Confirm the pushed branch and commit SHA.",
        "Check the job history and build queue before replaying.",
        "Determine whether other branches or repositories trigger successfully."
      ],
      investigation: [
        "Inspect the receiving Jenkins instance.",
        "Review multibranch indexing logs and branch filters.",
        "Confirm the source repository and configured branch source.",
        "Check whether the branch was discovered and whether the job is enabled.",
        "Compare the last successful event with the failed scenario."
      ],
      recovery: [
        "Correct the confirmed branch-source or trigger configuration.",
        "Run controlled indexing if appropriate.",
        "Verify that the correct branch job appears.",
        "Trigger a safe test event and inspect the actual checked-out SHA."
      ],
      closureCriteria: [
        "The expected branch is discovered.",
        "Exactly the intended job is scheduled.",
        "The expected commit is built.",
        "Required checks and release approvals remain enabled."
      ]
    },
    {
      title: "Incident C: Webhook retries create duplicate deployments",
      severity: "SEV-1 if users or data are at risk",
      scenario:
        "A webhook request times out, the sender retries, and more than one Jenkins build attempts to deploy the same release.",
      impact: [
        "Conflicting deployment operations may overlap.",
        "Database migrations or other non-idempotent operations may execute twice.",
        "Release status becomes difficult to determine."
      ],
      immediateActions: [
        "Inspect active and queued builds.",
        "Determine whether any deployment has already modified production.",
        "Use the approved release freeze or concurrency control if required.",
        "Do not cancel jobs blindly before determining their state."
      ],
      investigation: [
        "Compare delivery IDs, event types, commit SHAs, and build IDs.",
        "Inspect deployment logs and target-system state.",
        "Determine whether separate triggers or sender retries caused the duplicate.",
        "Check whether deployment steps are idempotent."
      ],
      recovery: [
        "Allow only the appropriate release operation to proceed under the incident lead's direction.",
        "Reconcile the target environment with the desired state.",
        "Use an approved rollback or repair plan if changes conflict.",
        "Remove the verified duplicate trigger or add appropriate concurrency protection."
      ],
      closureCriteria: [
        "The final deployed revision is verified.",
        "No conflicting deployment remains active.",
        "Duplicate-trigger behavior is explained and corrected.",
        "Non-idempotent operations have explicit retry protections."
      ]
    },
    {
      title: "Incident D: Webhook failures after secret rotation",
      severity: "SEV-2 or SEV-3 depending on affected pipelines",
      scenario:
        "A scheduled secret rotation occurs, after which webhook deliveries begin returning authentication or signature errors.",
      impact: [
        "Some or all repository events are rejected.",
        "Security checks and releases may be delayed.",
        "Operators may be tempted to disable verification."
      ],
      immediateActions: [
        "Confirm the rotation time and affected repositories.",
        "Identify the component producing the authentication error.",
        "Keep the approved verification mechanism enabled.",
        "Avoid displaying the secret in logs or chat."
      ],
      investigation: [
        "Check secret version metadata at both ends.",
        "Verify the documented signature algorithm and header handling.",
        "Inspect whether the integration uses a webhook secret, an SCM API credential, or both.",
        "Check whether only one repository or every repository is affected."
      ],
      recovery: [
        "Synchronize the correct secret through approved secret management.",
        "Validate a test event.",
        "Verify that invalid signatures remain rejected.",
        "Review the rotation automation and ownership."
      ],
      closureCriteria: [
        "Valid deliveries are accepted.",
        "Invalid signatures are still rejected.",
        "No secret appears in logs.",
        "Rotation automation is corrected and documented."
      ]
    }
  ],

  commandReference: [
    {
      title: "Network and endpoint diagnostics",
      commands: [
        "nslookup <jenkins.example.com>",
        "curl -sS -o /dev/null -w '%{http_code}\\n' --connect-timeout 5 --max-time 15 https://<jenkins.example.com>/",
        "curl -Iv --connect-timeout 5 --max-time 15 https://<jenkins.example.com>/",
        "openssl s_client -connect <jenkins.example.com>:443 -servername <jenkins.example.com> -verify_return_error </dev/null"
      ],
      warning:
        "These test general reachability and TLS from the machine where they run. They do not reproduce GitHub's source network or prove that a plugin endpoint works."
    },
    {
      title: "Jenkins service logs",
      commands: [
        "sudo journalctl -u jenkins --since '30 minutes ago' --no-pager",
        "sudo systemctl status jenkins --no-pager",
        "sudo journalctl -u nginx --since '30 minutes ago' --no-pager"
      ],
      warning:
        "Use only on the appropriate Linux host. Service names and log locations vary by installation."
    },
    {
      title: "Kubernetes-hosted Jenkins or ingress",
      commands: [
        "kubectl get pods,svc,ingress -n <jenkins-namespace>",
        "kubectl describe pod <jenkins-pod> -n <jenkins-namespace>",
        "kubectl logs <jenkins-pod> -n <jenkins-namespace> --since=30m",
        "kubectl get events -n <jenkins-namespace> --sort-by=.lastTimestamp",
        "kubectl top pods -n <jenkins-namespace>"
      ],
      warning:
        "Use only when the relevant service is hosted in Kubernetes. Confirm the cluster context and namespace before investigating or changing resources."
    },
    {
      title: "Repository and revision evidence",
      commands: [
        "git remote -v",
        "git branch --show-current",
        "git rev-parse HEAD",
        "git log -5 --oneline --decorate",
        "git status --short"
      ],
      warning:
        "These commands inspect the local checkout, not the webhook server. Confirm that the checkout corresponds to the repository involved in the incident."
    }
  ],

  recoveryRunbook: [
    "1. Declare the incident and identify the affected repository, Jenkins instance, job, branch, and target environment.",
    "2. Record the first failed delivery ID, event type, timestamp, HTTP status, response duration, and expected commit SHA.",
    "3. Check whether a build was already queued, started, completed, or partially deployed.",
    "4. Trace the request boundary by boundary: source platform, DNS/network, TLS, proxy/load balancer, Jenkins endpoint, security validation, plugin, job selection, queue, agent.",
    "5. Use the earliest reliable error as the primary investigation point. Do not treat downstream symptoms as the root cause without evidence.",
    "6. Choose one evidence-supported corrective action and record the change.",
    "7. Validate configuration before applying it. Use staging or a controlled event when possible.",
    "8. Re-test using the approved delivery mechanism. Confirm the intended job, branch, and commit SHA.",
    "9. If deployment is involved, verify the target system and application health before replaying an event.",
    "10. Use rollback when the correction introduces new errors or the release violates the approved recovery criteria.",
    "11. Resume normal releases only after required checks, approvals, and monitoring are healthy.",
    "12. Record the root cause, evidence, recovery steps, duration, and preventive actions."
  ],

  preventionChecklist: [
    "Maintain an inventory of webhook URLs, owning teams, repositories, event types, and receiving Jenkins jobs.",
    "Use TLS with valid certificates and monitored renewal.",
    "Use documented integration endpoints instead of guessed paths.",
    "Keep webhook secrets in approved secret-management systems.",
    "Never disable authentication or CSRF protections as a shortcut.",
    "Review GitHub App permissions and installation scope.",
    "Test Jenkins core and plugin upgrades in staging.",
    "Monitor proxy errors, Jenkins restarts, queue age, agent availability, and disk usage.",
    "Record delivery IDs and correlate them with Jenkins build IDs.",
    "Record the actual commit SHA and immutable artifact version for each release.",
    "Implement safe concurrency controls and idempotent deployment steps.",
    "Create runbooks for 401/403, 404, 5xx, timeouts, missing builds, and duplicate triggers.",
    "Test secret rotation, endpoint migration, and rollback procedures.",
    "Review incident reports for recurring failures and track corrective actions to completion."
  ],

  monitoringAndAlerting: [
    "Alert on sustained webhook delivery failures, not just a single transient request.",
    "Track delivery success rate, HTTP status distribution, endpoint latency, and timeout rate.",
    "Monitor Jenkins controller health, restart count, CPU, memory, disk, and queue age.",
    "Monitor offline agents and builds waiting for unavailable labels.",
    "Track multibranch indexing failures and SCM API rate limits.",
    "Correlate source delivery IDs with Jenkins build IDs and commit SHAs.",
    "Alert when expected release events repeatedly fail to produce a build.",
    "Alert on unusually high build frequency that may indicate duplicate triggers.",
    "Monitor TLS certificate expiry and DNS/endpoint reachability.",
    "Use structured logs with timestamps and request identifiers while excluding secrets and sensitive payloads."
  ],

  ciValidation: [
    "Validate Jenkinsfile syntax using the supported Jenkins Pipeline linter for the installed configuration.",
    "Test webhook-to-job mapping in a non-production repository or staging environment.",
    "Test the intended event types: push, pull request, and branch creation where applicable.",
    "Verify branch filters with both allowed and excluded branches.",
    "Test valid and invalid signature behavior without logging secret values.",
    "Verify that one delivery does not cause unintended duplicate production deployments.",
    "Test behavior when Jenkins or an agent is temporarily unavailable.",
    "Verify that deployment retries are safe and that uncertain outcomes require state reconciliation.",
    "Check that required security scans and release approvals cannot be bypassed by a manual workaround.",
    "Document a tested rollback path for proxy, endpoint, credential, and plugin changes."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Start time / detection time / recovery time:",
    "Severity and business impact:",
    "Source repository and event type:",
    "Webhook delivery ID and timestamp:",
    "HTTP status, response duration, and receiving endpoint:",
    "Jenkins instance and affected job:",
    "Branch, expected commit SHA, and actual built commit SHA:",
    "First confirmed failing boundary:",
    "Evidence and relevant log references:",
    "Confirmed root cause:",
    "Corrective change and approval reference:",
    "Recovery and validation performed:",
    "Deployment state and rollback decision:",
    "Duplicate events or security concerns:",
    "Preventive actions, owners, and due dates:",
    "Lessons learned:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1: Diagnose a missing Jenkins build",
      objective:
        "Distinguish successful delivery from job-selection failure.",
      steps: [
        "Use a non-production repository and Jenkins job.",
        "Send a test push event to the configured webhook.",
        "Record the delivery status and timestamp.",
        "Inspect job history, branch filters, and multibranch indexing logs.",
        "Verify the commit SHA that Jenkins actually checks out.",
        "Correct a deliberately misconfigured branch filter in the lab.",
        "Send another test event and compare the evidence."
      ],
      expectedOutcome:
        "You can explain whether the event failed to arrive, was rejected, or arrived but did not match a job."
    },
    {
      title: "Lab 2: Investigate a simulated HTTP 404",
      objective:
        "Find an incorrect endpoint without making production changes.",
      steps: [
        "Use a disposable staging integration.",
        "Record the known-good webhook endpoint.",
        "Change the lab endpoint to an invalid path.",
        "Send a controlled event and capture the HTTP response.",
        "Compare proxy and Jenkins logs to identify where the response originated.",
        "Restore the documented endpoint and re-test."
      ],
      expectedOutcome:
        "You can identify whether the 404 comes from the proxy or the intended application endpoint."
    },
    {
      title: "Lab 3: Investigate duplicate trigger behavior",
      objective:
        "Identify duplicate registrations and distinguish retries from legitimate events.",
      steps: [
        "Use a staging repository and a harmless pipeline.",
        "Record delivery IDs, event types, commit SHAs, and build IDs.",
        "Inspect configured webhook registrations and Jenkins triggers.",
        "Determine whether multiple builds were expected.",
        "Remove only the confirmed duplicate configuration.",
        "Re-test push and pull-request workflows."
      ],
      expectedOutcome:
        "One event follows the documented trigger policy without breaking legitimate validation builds."
    },
    {
      title: "Lab 4: Simulate an endpoint outage",
      objective:
        "Practice safe recovery when webhook delivery times out.",
      steps: [
        "Use staging only and simulate an unavailable upstream.",
        "Record failed deliveries and the proxy response.",
        "Check whether any build or deployment was already started.",
        "Restore the upstream and validate reachability.",
        "Replay one safe event using the supported mechanism.",
        "Verify the resulting build and commit SHA."
      ],
      expectedOutcome:
        "You recover the webhook path without blindly replaying events or causing duplicate deployment."
    },
    {
      title: "Lab 5: Practice a credential rotation failure",
      objective:
        "Validate secure secret rotation and signature verification.",
      steps: [
        "Use a disposable webhook and test secret.",
        "Rotate the secret on one side only and observe the expected verification failure.",
        "Inspect sanitized logs without printing the secret.",
        "Synchronize the secret using the supported mechanism.",
        "Verify a valid event succeeds and an invalid signature is rejected."
      ],
      expectedOutcome:
        "You can recover authentication safely while preserving signature verification."
    }
  ],

  interviewQuestions: [
    {
      question: "A GitHub webhook returns HTTP 200, but Jenkins does not start a build. What do you check?",
      answer:
        "Confirm the receiving Jenkins instance, event type, job trigger configuration, branch filters, multibranch indexing, queue history, and plugin logs. Then verify the actual repository, branch, and commit SHA. HTTP 200 alone does not prove a build was scheduled."
    },
    {
      question: "What does HTTP 404 usually indicate in webhook troubleshooting?",
      answer:
        "It indicates that the requested path was not found by the responding component. Verify the endpoint, Jenkins context path, plugin-specific route, receiving instance, and reverse-proxy path rewriting."
    },
    {
      question: "How do you troubleshoot HTTP 403?",
      answer:
        "Identify which layer generated the response, then inspect authentication, authorization, signature validation, WAF rules, and documented CSRF behavior. Never disable security protections globally as a shortcut."
    },
    {
      question: "Why can a webhook return 502 or 504?",
      answer:
        "A reverse proxy may be unable to connect to its upstream or may time out waiting for a response. Correlate proxy logs, upstream health, Jenkins logs, and resource metrics before changing timeouts."
    },
    {
      question: "What is the difference between a webhook secret and a GitHub App credential?",
      answer:
        "A webhook secret is used to validate the authenticity of webhook payloads when supported. GitHub App credentials provide authenticated API access according to app permissions. They are separate mechanisms."
    },
    {
      question: "Why should you not blindly replay a failed webhook?",
      answer:
        "The original request may have scheduled a build or partially completed a deployment despite a timeout. Inspect delivery history, build state, and target state first to avoid duplicate or conflicting operations."
    },
    {
      question: "How do you determine whether a network or Jenkins configuration caused the failure?",
      answer:
        "Correlate the source delivery timestamp with proxy access/error logs and Jenkins application logs. Identify the earliest boundary where the request fails, and test from the relevant network path."
    },
    {
      question: "How do multibranch pipelines complicate webhook troubleshooting?",
      answer:
        "An event can arrive successfully while branch discovery, pull-request filtering, indexing, or branch-specific job configuration prevents a build from being created."
    },
    {
      question: "What should you check after a plugin upgrade?",
      answer:
        "Compare plugin and Jenkins core versions, compatibility requirements, release notes, startup logs, endpoint behavior, and recent failures. Reproduce in staging and use the approved rollback procedure if a regression is confirmed."
    },
    {
      question: "How do you troubleshoot a webhook that triggers the wrong branch?",
      answer:
        "Compare the event ref and commit SHA with job branch configuration, multibranch discovery, checkout logs, repository URL, and actual checked-out revision."
    },
    {
      question: "What is the difference between delivery success and pipeline success?",
      answer:
        "Delivery success means the receiving endpoint accepted the HTTP request according to its response. Pipeline success requires the intended job to run and complete its required checks; deployment success additionally requires verification of the target system."
    },
    {
      question: "How do you handle duplicate webhook events in production?",
      answer:
        "Compare delivery IDs, event types, timestamps, commit SHAs, and build IDs. Remove confirmed duplicate triggers, preserve legitimate workflows, and use idempotent deployment operations and concurrency controls."
    },
    {
      question: "What is the safest way to investigate a secret mismatch?",
      answer:
        "Compare secret version metadata and configuration references without displaying the secret. Follow the supported rotation process, validate a controlled event, and verify that invalid signatures remain rejected."
    },
    {
      question: "What evidence should be collected during a webhook incident?",
      answer:
        "Collect delivery ID, event type, timestamp, URL with sensitive components redacted, HTTP status, response duration, proxy and Jenkins log references, job ID, branch, commit SHA, build state, and deployment outcome."
    },
    {
      question: "Why might a webhook work for one repository but fail for another?",
      answer:
        "Repositories may differ in webhook configuration, event subscriptions, app installation scope, credentials, branch filters, job definitions, or repository permissions."
    },
    {
      question: "How do Jenkins queue problems appear during webhook troubleshooting?",
      answer:
        "The event may be accepted and a build may be queued, but the job cannot start because agents are offline, labels do not match, executors are unavailable, or resources are saturated."
    },
    {
      question: "How do you prevent certificate-expiry incidents?",
      answer:
        "Monitor certificate expiry, validate hostname and trust chain, test renewal automation, and verify the external endpoint after certificate changes."
    },
    {
      question: "What is the purpose of recording the actual commit SHA?",
      answer:
        "It proves which source revision was built and helps distinguish a successful trigger from a wrong-branch or stale-workspace build. It also improves artifact provenance and release auditing."
    },
    {
      question: "What should an incident report include?",
      answer:
        "Include timeline, severity, affected repositories and jobs, delivery identifiers, evidence, confirmed root cause, corrective changes, recovery validation, rollback decision, and preventive actions with owners and due dates."
    },
    {
      question: "How do you know a webhook incident is fully resolved?",
      answer:
        "A controlled event reaches the intended endpoint, the correct job and commit are selected, required checks pass, the deployment state is verified where applicable, monitoring is healthy, and the root cause and prevention actions are documented."
    }
  ],

  references: [
    {
      title: "Jenkins Pipeline documentation",
      url: "https://www.jenkins.io/doc/book/pipeline/"
    },
    {
      title: "Jenkins Pipeline Syntax",
      url: "https://www.jenkins.io/doc/book/pipeline/syntax/"
    },
    {
      title: "Jenkins GitHub plugin",
      url: "https://plugins.jenkins.io/github/"
    },
    {
      title: "Jenkins Git plugin",
      url: "https://plugins.jenkins.io/git/"
    },
    {
      title: "Jenkins GitHub Branch Source plugin",
      url: "https://plugins.jenkins.io/github-branch-source/"
    },
    {
      title: "GitHub Webhooks documentation",
      url: "https://docs.github.com/en/webhooks"
    },
    {
      title: "GitHub Webhook events and payloads",
      url: "https://docs.github.com/en/webhooks/webhook-events-and-payloads"
    },
    {
      title: "GitHub Webhook troubleshooting",
      url: "https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks"
    },
    {
      title: "GitHub Webhook security",
      url: "https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries"
    }
  ]
};

export default webhookErrorGuide;
