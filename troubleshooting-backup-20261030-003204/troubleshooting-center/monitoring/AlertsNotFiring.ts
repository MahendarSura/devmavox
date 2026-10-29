export interface AlertsNotFiringGuide {
  title: string;
  category: string;
  severity: string;
  overview: string[];
  incidentScenario: string[];
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretation: string[];
    nextAction: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCause: string;
    verification: string[];
    resolution: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    symptoms: string[];
    investigation: string[];
    resolution: string[];
    prevention: string[];
  }[];
  recoveryProcedures: {
    situation: string;
    steps: string[];
    validation: string[];
    rollback: string[];
  }[];
  cicdTroubleshooting: string[];
  monitoringAndPrevention: string[];
  incidentRunbook: string[];
  handsOnLabs: {
    lab: string;
    objective: string;
    procedure: string[];
    expectedResult: string[];
    cleanup: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  incidentReportTemplate: string[];
  officialReferences: string[];
}

export const alertsNotFiringGuide: AlertsNotFiringGuide = {
  title: "Prometheus / Alertmanager / Grafana Alerts Not Firing — Production Troubleshooting",
  category: "Monitoring and Alerting / SRE / DevOps",
  severity: "SEV-1 to SEV-3 depending on missed detection and business impact",

  overview: [
    "An alert-not-firing incident occurs when a monitored failure happens but the expected alert does not become Pending or Firing, or when a Firing alert does not reach the intended notification destination.",
    "First identify which stage failed. The complete path is: application or infrastructure metric -> exporter -> Prometheus scrape -> stored time series -> PromQL expression -> alert rule evaluation -> Pending/Firing state -> Alertmanager -> routing and inhibition -> receiver integration -> email, Slack, PagerDuty, webhook or another destination.",
    "Grafana-managed alerting has its own evaluation engine and notification policies. Do not assume every Grafana alert passes through Prometheus or Alertmanager.",
    "An alert visible in Prometheus but absent from Slack is not the same failure as a metric missing from Prometheus. Isolate the exact broken stage before changing configuration.",
    "Do not fix a missing alert by blindly lowering thresholds, removing the `for` duration, disabling silences or restarting the entire monitoring stack. First preserve evidence and establish the failure mechanism.",
    "Commands in this guide assume Linux, curl, jq, Prometheus and Alertmanager HTTP APIs. Replace example endpoints, namespaces, job names and labels with actual environment values.",
    "Never paste credentials, bearer tokens, webhook URLs, private keys or sensitive incident data into shared logs or public tickets."
  ],

  incidentScenario: [
    "Production API latency rises above the agreed SLO threshold, but the on-call engineer receives no notification.",
    "A Kubernetes workload has zero healthy replicas, but the expected availability alert is absent.",
    "Prometheus shows a rule as Firing, but Alertmanager has no corresponding alert.",
    "Alertmanager receives the alert, but a Slack, email or PagerDuty notification never arrives.",
    "After a monitoring deployment, multiple alerts stop firing because labels, rule files, selectors or configuration changed.",
    "A disk fills up or a service becomes unavailable before the team realizes that its alerting pipeline is broken."
  ],

  impactAssessment: [
    "Identify the affected environment: production, staging, development, a specific region, cluster, tenant or business service.",
    "Determine whether an actual outage exists or whether only alert delivery is broken. A monitoring failure can exist independently of a workload failure.",
    "Identify affected alert classes: availability, latency, errors, saturation, Kubernetes health, infrastructure, security or business transactions.",
    "Establish the incident start time, last known successful notification, last successful configuration reload and last successful Prometheus scrape.",
    "Determine whether one rule, one receiver, one monitoring instance or the entire alerting path is affected.",
    "Check whether another independent detection path exists, such as synthetic monitoring, cloud alarms, black-box probes or an application health dashboard.",
    "Assess missed pages, possible SLO burn, customer impact and risk of an undetected secondary incident.",
    "Assign an incident owner and communication channel. Treat a confirmed loss of critical production paging as a monitoring incident even if the application remains healthy."
  ],

  safetyChecks: [
    "Confirm the correct cluster, namespace, Prometheus instance, Alertmanager instance, Grafana organization and environment before executing commands.",
    "Check whether you are using a production endpoint or a local test endpoint. Never send test alerts to real on-call channels without authorization.",
    "Preserve timestamps, configuration versions, relevant logs, current rule status and notification-policy state before making changes.",
    "Review recent Git commits, Helm releases, ConfigMap changes, secret rotations, service discovery changes and monitoring upgrades.",
    "Check change approvals and maintenance windows before editing production alert rules, routes, thresholds or notification integrations.",
    "Do not expose Alertmanager or Prometheus admin endpoints publicly merely to make troubleshooting easier.",
    "Do not delete silences, disable inhibition rules, clear queues or restart all replicas as a first response.",
    "For HA deployments, verify quorum and replica health before making changes that could reduce redundancy.",
    "Use read-only API calls and queries first. Apply the smallest approved change only after the root cause is supported by evidence.",
    "If a critical alert is unavailable, establish an approved temporary manual monitoring or paging process while repairing the alerting pipeline."
  ],

  evidenceCollection: [
    "Incident timestamps in UTC, affected service, environment, severity and incident owner.",
    "Prometheus query results for the exact metric and alert expression at the incident time.",
    "Prometheus Targets page or `/api/v1/targets` output, including scrape errors and last scrape timestamps.",
    "Prometheus Rules page or `/api/v1/rules` output, including rule health, state, evaluation errors and labels.",
    "Prometheus `/api/v1/alerts` output showing Pending and Firing alerts.",
    "Alertmanager `/api/v2/alerts` output and the active routing configuration, with sensitive receiver details redacted.",
    "Alertmanager logs around the notification attempt, including grouping, retry, receiver and integration errors.",
    "Grafana alert rule state, evaluation history, contact-point test results and notification-policy configuration when Grafana-managed alerting is involved.",
    "Monitoring deployment manifests, Helm values, rule files, ConfigMaps, secret references and recent Git diffs.",
    "Network, DNS, TLS, proxy, firewall, service-account and RBAC evidence when monitoring components cannot communicate.",
    "Notification destination evidence: delivery status, webhook response code, email rejection, rate limit, PagerDuty event response or receiver-side logs.",
    "A timeline of the last successful evaluation, last successful alert delivery and the first observed failure."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the actual incident and define the expected alert",
      objective: "Determine whether the alert is missing, delayed, incorrectly resolved or firing but not delivered.",
      commands: [
        "date -u",
        "kubectl get pods -A",
        "kubectl get events -A --sort-by=.lastTimestamp"
      ],
      interpretation: [
        "Use the incident timeline and workload evidence to confirm whether the triggering condition actually occurred.",
        "A missing notification alone does not prove that Prometheus failed to evaluate the rule.",
        "Cluster-wide commands may return a large amount of data; narrow subsequent investigation to the affected namespace and service."
      ],
      nextAction: [
        "Write down the expected alert name, expression, threshold, labels, evaluation interval, `for` duration and destination.",
        "Proceed to the relevant Prometheus or Grafana alerting engine rather than assuming both use the same pipeline."
      ]
    },
    {
      step: 2,
      title: "Verify Prometheus health and the correct endpoint",
      objective: "Ensure the investigation is querying the intended healthy Prometheus instance.",
      commands: [
        "export PROM='http://localhost:9090'",
        "curl -fsS \"$PROM/-/healthy\"",
        "curl -fsS \"$PROM/-/ready\"",
        "curl -fsS \"$PROM/api/v1/status/buildinfo\" | jq '.status, .data.version'"
      ],
      interpretation: [
        "The health endpoint indicates whether the process is alive; the readiness endpoint indicates whether it is ready to serve requests.",
        "HTTP connection errors, DNS failures, TLS failures or non-success status codes may indicate an endpoint or connectivity problem.",
        "A healthy Prometheus process does not prove that scraping or alert evaluation is working."
      ],
      nextAction: [
        "Confirm the endpoint, port, authentication and TLS settings with the deployment configuration.",
        "If Prometheus is running in Kubernetes, check the Service, EndpointSlices, pod readiness and network policies before restarting it."
      ]
    },
    {
      step: 3,
      title: "Check whether the source metric exists",
      objective: "Separate a missing metric from an incorrect alert expression.",
      commands: [
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=up' | jq '.status, .data.result'",
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=YOUR_METRIC_NAME' | jq '.status, .data.result'",
        "curl -fsSG \"$PROM/api/v1/label/__name__/values\" | jq '.status, .data.result'"
      ],
      interpretation: [
        "Replace `YOUR_METRIC_NAME` with the real metric name. An unquoted metric name is a placeholder, not a usable generic query.",
        "An empty result means no matching time series was returned for that instant. Possible causes include no scrape, an incorrect metric name, different labels, staleness or an incorrect query.",
        "A result containing a zero is different from an empty result. Many alert expressions behave differently for zero and absent data.",
        "The `up` metric is normally 1 for a successful scrape and 0 for a failed scrape, but a target that is not discovered at all may have no corresponding `up` series."
      ],
      nextAction: [
        "If the metric is absent, inspect target discovery, exporter health, scrape configuration and metric naming.",
        "If the metric exists, execute the exact alert expression next."
      ]
    },
    {
      step: 4,
      title: "Inspect Prometheus scrape targets",
      objective: "Find failed scrapes, missing targets and service-discovery errors.",
      commands: [
        "curl -fsS \"$PROM/api/v1/targets\" | jq -r '.data.activeTargets[] | [.labels.job, .labels.instance, .health, .lastError, .lastScrape] | @tsv'",
        "curl -fsS \"$PROM/api/v1/targets\" | jq '.data.droppedTargets'",
        "curl -fsS \"$PROM/api/v1/status/config\" | jq -r '.data.yaml'"
      ],
      interpretation: [
        "A target marked down commonly indicates connection refusal, timeout, DNS, TLS, authentication, exporter or network-policy problems.",
        "A target absent from active targets may have failed service discovery, been dropped by relabeling or not matched by the scrape configuration.",
        "A successful scrape does not guarantee that the application exports the metric expected by the alert.",
        "Configuration API output can contain sensitive endpoint information; redact it before sharing."
      ],
      nextAction: [
        "Check the exporter endpoint from the Prometheus network context and compare the discovered labels with the rule expression.",
        "Inspect target discovery and relabeling rules before changing the alert threshold."
      ]
    },
    {
      step: 5,
      title: "Evaluate the exact PromQL expression manually",
      objective: "Prove whether the expression returns the intended time series during the incident.",
      commands: [
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=YOUR_ALERT_EXPRESSION' | jq '.status, .data.result'",
        "curl -fsSG \"$PROM/api/v1/query_range\" --data-urlencode 'query=YOUR_ALERT_EXPRESSION' --data-urlencode 'start=2026-10-26T10:00:00Z' --data-urlencode 'end=2026-10-26T11:00:00Z' --data-urlencode 'step=30s' | jq '.status, .data.result'"
      ],
      interpretation: [
        "Replace `YOUR_ALERT_EXPRESSION` with URL-encoded or properly quoted PromQL and replace the example time window with the incident window.",
        "An empty result may be caused by label mismatch, missing metrics, stale series, vector matching, filtering or a range selector that excludes the relevant samples.",
        "A result that remains below the threshold means the expression may be correct but the expected condition did not occur according to the queried data.",
        "Check units carefully: seconds versus milliseconds, bytes versus bits, ratios versus percentages, and counter values versus rates.",
        "Range queries can reveal brief threshold crossings that an instant query misses."
      ],
      nextAction: [
        "Compare the expression with the intended service labels and business threshold.",
        "Test each expression component separately and use the Prometheus expression browser to isolate the clause that removes the expected series."
      ]
    },
    {
      step: 6,
      title: "Inspect rule loading, health and evaluation state",
      objective: "Determine whether Prometheus loaded and evaluated the expected alert rule.",
      commands: [
        "curl -fsS \"$PROM/api/v1/rules?type=alert\" | jq '.status, .data.groups[] | {name, file, rules}'",
        "curl -fsS \"$PROM/api/v1/alerts\" | jq '.status, .data.alerts[] | {labels, annotations, state, activeAt, value}'",
        "curl -fsS \"$PROM/api/v1/status/runtimeinfo\" | jq '.status, .data'"
      ],
      interpretation: [
        "Confirm the exact rule name, group, namespace or labels, expression, health and last evaluation information in the API response.",
        "If the rule is absent, investigate rule file discovery, configuration mounts, selectors and reload errors.",
        "If the rule is unhealthy or has evaluation errors, inspect Prometheus logs for the exact parser, query or execution error.",
        "A valid rule can remain inactive because its expression returns no matching series or because its threshold is not met.",
        "A Pending alert has met the expression condition but has not necessarily completed its configured `for` duration."
      ],
      nextAction: [
        "Correct invalid PromQL, missing rule files, selector mismatches or configuration reload failures using the approved deployment process.",
        "Do not shorten `for` simply to force an alert to appear before determining whether the duration is intentional."
      ]
    },
    {
      step: 7,
      title: "Check the `for` duration, evaluation interval and alert lifecycle",
      objective: "Identify expected delays or repeated resets of the Pending state.",
      commands: [
        "curl -fsS \"$PROM/api/v1/rules?type=alert\" | jq '.data.groups[] | {name, interval, rules}'",
        "curl -fsS \"$PROM/api/v1/alerts\" | jq '.data.alerts[] | {labels, state, activeAt, value}'"
      ],
      interpretation: [
        "A rule with `for: 5m` generally must remain active for the configured duration before it becomes Firing, subject to evaluation timing and implementation behavior.",
        "If the expression becomes false between evaluations or labels change, the Pending state may reset or a different alert instance may be created.",
        "Rule group evaluation intervals and query delays affect how quickly a condition is observed.",
        "Do not confuse the Prometheus rule evaluation interval with Alertmanager's `group_wait`, `group_interval` or `repeat_interval`."
      ],
      nextAction: [
        "Compare `activeAt`, the rule's `for` duration, the evaluation interval and the incident timeline.",
        "If an alert never reaches Pending, investigate the expression and data rather than notification delays."
      ]
    },
    {
      step: 8,
      title: "Validate labels and PromQL vector matching",
      objective: "Find rules that silently exclude series due to label assumptions.",
      commands: [
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=count by (job, instance, namespace, pod) (up)' | jq '.data.result'",
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=count by (job, namespace) (YOUR_METRIC_NAME)' | jq '.data.result'"
      ],
      interpretation: [
        "Prometheus label matching is exact unless the expression explicitly uses a matching modifier or aggregation.",
        "A rule expecting `namespace=\"production\"` will not match a series labeled `namespace=\"prod\"`.",
        "Binary operations may produce no output when label sets do not match.",
        "Aggregation can accidentally combine services or hide a single failing instance.",
        "Changing a label can create a new alert identity and affect grouping, routing, inhibition and notification deduplication."
      ],
      nextAction: [
        "Compare actual labels from the query results with the rule's selectors and Alertmanager route matchers.",
        "Make a deliberate change to the expression or labeling convention and add a regression test."
      ]
    },
    {
      step: 9,
      title: "Check Prometheus configuration and reload errors",
      objective: "Verify that configuration changes reached the running process.",
      commands: [
        "promtool check config /etc/prometheus/prometheus.yml",
        "promtool check rules /etc/prometheus/rules/*.yml",
        "journalctl -u prometheus --since '30 minutes ago' --no-pager",
        "kubectl -n monitoring logs deploy/prometheus --since=30m"
      ],
      interpretation: [
        "The `promtool` paths are examples. Use the actual mounted configuration and rule file paths.",
        "A successful local validation does not prove that the running Prometheus instance loaded the same files.",
        "A reload endpoint may be disabled, unavailable or protected. Do not enable unsafe admin options merely for convenience.",
        "For Prometheus Operator installations, generated configuration and selected rule resources may differ from manually edited files."
      ],
      nextAction: [
        "Inspect the actual running configuration, mounted files, operator events and reload logs.",
        "Deploy corrected configuration through GitOps, Helm or the approved change process."
      ]
    },
    {
      step: 10,
      title: "Determine whether Prometheus actually sent the alert",
      objective: "Separate rule evaluation problems from Alertmanager connectivity or delivery problems.",
      commands: [
        "curl -fsS \"$PROM/api/v1/alertmanagers\" | jq '.status, .data'",
        "curl -fsS \"$PROM/api/v1/alerts\" | jq '.data.alerts[] | {labels, state, activeAt}'"
      ],
      interpretation: [
        "A Firing alert in Prometheus proves that the rule is firing, but not that the correct Alertmanager received it or that a notification was delivered.",
        "An absent or unhealthy Alertmanager target can indicate endpoint, DNS, TLS, authentication or configuration problems.",
        "Check whether Prometheus is configured to send alerts to the intended Alertmanager service and whether network policies permit traffic.",
        "For Grafana-managed alerts, follow Grafana's evaluation and contact-point path instead of assuming Prometheus is the sender."
      ],
      nextAction: [
        "Check Prometheus logs for send failures and Alertmanager logs for receipt.",
        "Compare the alert labels and timestamps at both components."
      ]
    },
    {
      step: 11,
      title: "Inspect Alertmanager's received alerts",
      objective: "Confirm whether Alertmanager received the expected alert and its labels.",
      commands: [
        "export AM='http://localhost:9093'",
        "curl -fsS \"$AM/-/healthy\"",
        "curl -fsS \"$AM/api/v2/alerts\" | jq '.[] | {labels, annotations, startsAt, endsAt, status}'",
        "curl -fsS \"$AM/api/v2/status\" | jq '{cluster, configYAML}'"
      ],
      interpretation: [
        "An alert present in Prometheus but absent in Alertmanager suggests a send path, endpoint, connectivity, filtering or timing problem.",
        "An alert present in Alertmanager but not delivered suggests route selection, silence, inhibition, grouping, receiver configuration or integration failure.",
        "The API status response varies by Alertmanager version; verify supported fields and redact secrets before sharing output.",
        "Do not treat an alert's presence in Alertmanager as proof that a notification was sent."
      ],
      nextAction: [
        "Trace the exact label set through route matching, silence and inhibition evaluation, then receiver delivery.",
        "If the alert is not present, check Prometheus alert delivery configuration and the two components' logs."
      ]
    },
    {
      step: 12,
      title: "Inspect silences, inhibition rules and active maintenance",
      objective: "Determine whether Alertmanager intentionally suppresses a notification.",
      commands: [
        "curl -fsS \"$AM/api/v2/silences\" | jq '.[] | {id, status, startsAt, endsAt, createdBy, comment, matchers}'",
        "curl -fsS \"$AM/api/v2/alerts\" | jq '.[] | {labels, status}'"
      ],
      interpretation: [
        "A matching active silence can suppress notifications while the alert still exists.",
        "An inhibition rule can suppress a lower-level alert when a configured source alert is active and the required equal labels match.",
        "A maintenance window may be intentional. Verify its owner, scope, expiration and approval before changing it.",
        "Alertmanager versions differ in how status and inhibition details are exposed by the API; consult the deployed version's documentation and logs."
      ],
      nextAction: [
        "If suppression is unintended, verify the exact matcher and policy owner before modifying the silence or inhibition rule.",
        "If suppression is intended, verify that a parent alert or alternative paging path remains operational."
      ]
    },
    {
      step: 13,
      title: "Validate route selection and receiver configuration",
      objective: "Identify alerts that match the wrong route or fall through to an unexpected receiver.",
      commands: [
        "curl -fsS \"$AM/api/v2/status\" | jq -r '.configYAML'",
        "kubectl -n monitoring get configmap",
        "kubectl -n monitoring get secret"
      ],
      interpretation: [
        "Inspect route matchers, route ordering, continuation behavior, grouping labels, child routes, default receivers and the configuration actually loaded.",
        "A route that expects `team=\"platform\"` will not match an alert carrying `team=\"sre\"`.",
        "A default receiver may be configured but not be the receiver the incident owner expects.",
        "Secret metadata can be inspected safely, but do not print or export secret values into logs or tickets.",
        "In Kubernetes, the source configuration may be generated by an operator or mounted from another resource; identify the authoritative source."
      ],
      nextAction: [
        "Compare the received alert labels with the route matchers exactly.",
        "Make the smallest route or label correction and validate it before deployment."
      ]
    },
    {
      step: 14,
      title: "Inspect receiver integration errors",
      objective: "Find why Slack, email, PagerDuty or a webhook did not accept the notification.",
      commands: [
        "kubectl -n monitoring logs deploy/alertmanager --since=30m",
        "journalctl -u alertmanager --since '30 minutes ago' --no-pager"
      ],
      interpretation: [
        "Use the command appropriate to the installation; a Kubernetes deployment and a systemd service may not both exist.",
        "HTTP 400 often indicates a malformed request or invalid payload; 401/403 suggests authentication or authorization; 404 may indicate an incorrect endpoint; 429 indicates rate limiting; 5xx indicates a receiver or intermediary problem.",
        "Connection timeouts can indicate DNS, routing, firewall, proxy, TLS or destination availability issues.",
        "Do not assume every integration uses the same response semantics. Read the specific receiver's error response and official documentation.",
        "Redact webhook URLs, authorization headers, tokens, email addresses and customer data."
      ],
      nextAction: [
        "Verify credentials, endpoint, TLS trust, DNS, outbound network access and destination service status.",
        "Use the approved receiver test mechanism and check destination-side logs or delivery history."
      ]
    },
    {
      step: 15,
      title: "Troubleshoot DNS, network, TLS and proxy failures",
      objective: "Determine whether the monitoring component can reach its target or notification service.",
      commands: [
        "getent hosts YOUR_RECEIVER_HOST",
        "curl -v --connect-timeout 5 --max-time 15 https://YOUR_RECEIVER_HOST/",
        "openssl s_client -connect YOUR_RECEIVER_HOST:443 -servername YOUR_RECEIVER_HOST </dev/null",
        "kubectl -n monitoring get networkpolicy",
        "kubectl -n monitoring get svc,endpoints,endpointslices"
      ],
      interpretation: [
        "Replace the host placeholder with a hostname only; use the correct URL path and authentication for the actual integration.",
        "A successful DNS lookup does not prove that TCP, TLS or application-level delivery works.",
        "TLS certificate expiry, hostname mismatch, missing CA certificates, incorrect system time and proxy interception can break integrations.",
        "A successful curl from an administrator's laptop does not prove that the Alertmanager pod can reach the destination.",
        "Network policies, service meshes, egress gateways, proxies and cloud firewall rules can affect only the monitoring workload."
      ],
      nextAction: [
        "Run diagnostics from the same network context as the failing component using approved tools.",
        "Correct the specific DNS, CA, routing, egress or proxy issue without disabling TLS verification or opening unrestricted outbound access."
      ]
    },
    {
      step: 16,
      title: "Check Alertmanager grouping and notification timing",
      objective: "Distinguish an intentionally delayed notification from a missing one.",
      commands: [
        "curl -fsS \"$AM/api/v2/alerts\" | jq '.[] | {labels, startsAt, endsAt, status}'",
        "kubectl -n monitoring logs deploy/alertmanager --since=30m"
      ],
      interpretation: [
        "`group_wait` delays the first notification for a new group, giving related alerts time to arrive.",
        "`group_interval` controls notification timing for updates to an existing group.",
        "`repeat_interval` controls how often an unchanged alert group is resent, subject to the configured integration and version behavior.",
        "A new alert may be grouped with other alerts and delivered to a different channel than expected.",
        "An alert that resolves before the initial notification may behave differently depending on the configuration and timing."
      ],
      nextAction: [
        "Compare the configured timing values with the incident SLA and notification logs.",
        "Change grouping or timing only when the delay violates the documented response requirement."
      ]
    },
    {
      step: 17,
      title: "Troubleshoot Grafana-managed alerting separately",
      objective: "Find failures in Grafana rule evaluation, data sources or contact points.",
      commands: [
        "curl -fsS -u \"$GRAFANA_USER:$GRAFANA_TOKEN\" \"$GRAFANA_URL/api/health\" | jq '.'",
        "curl -fsS -u \"$GRAFANA_USER:$GRAFANA_TOKEN\" \"$GRAFANA_URL/api/v1/provisioning/alert-rules\" | jq '.'",
        "curl -fsS -u \"$GRAFANA_USER:$GRAFANA_TOKEN\" \"$GRAFANA_URL/api/v1/provisioning/contact-points\" | jq '.[].name'"
      ],
      interpretation: [
        "Set `GRAFANA_URL`, `GRAFANA_USER` and `GRAFANA_TOKEN` through a secure shell environment or approved secret manager before running these examples.",
        "Do not place real tokens directly in shell history or shared scripts. Prefer an approved authentication method and protect command output.",
        "API endpoints and permissions can vary by Grafana version and deployment. A 401 or 403 may indicate authentication or permissions rather than a broken alert.",
        "Inspect the rule's evaluation state, query errors, data-source health, pending period, labels, notification policy and contact-point logs.",
        "Grafana-managed alerting may not appear in Prometheus `/api/v1/rules`."
      ],
      nextAction: [
        "Use Grafana's alert-rule details, evaluation history and contact-point test feature to isolate the failing stage.",
        "If Grafana sends to Alertmanager, continue with Alertmanager diagnostics after confirming that the notification was handed off."
      ]
    },
    {
      step: 18,
      title: "Check Kubernetes operators, selectors and generated resources",
      objective: "Find rule resources that exist in Git but are not loaded by the running monitoring stack.",
      commands: [
        "kubectl get prometheus -A",
        "kubectl get prometheusrule -A",
        "kubectl get servicemonitor,podmonitor -A",
        "kubectl -n monitoring describe prometheus YOUR_PROMETHEUS_RESOURCE",
        "kubectl -n monitoring get events --sort-by=.lastTimestamp"
      ],
      interpretation: [
        "These commands require the Prometheus Operator CRDs. They will fail in a non-operator installation.",
        "A `PrometheusRule` can exist in Kubernetes but be ignored because its namespace or labels do not match the Prometheus rule selectors.",
        "A `ServiceMonitor` or `PodMonitor` can exist but be excluded by selectors or fail to discover targets.",
        "Check operator reconciliation events, generated configuration, resource status and pod logs.",
        "The `monitoring` namespace and resource names are examples; locate the actual installation before running `describe`."
      ],
      nextAction: [
        "Compare the Prometheus resource selectors with the labels and namespaces of the rule and monitor resources.",
        "Fix the authoritative Helm values or manifests, then verify that reconciliation completed and the rule appeared in the running API."
      ]
    },
    {
      step: 19,
      title: "Inspect resource pressure and monitoring-system overload",
      objective: "Find delayed evaluations, dropped scrapes or notification failures caused by resource exhaustion.",
      commands: [
        "kubectl -n monitoring top pods",
        "kubectl -n monitoring describe pods",
        "kubectl -n monitoring get pods -o wide",
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=prometheus_rule_evaluation_failures_total' | jq '.data.result'",
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=prometheus_rule_group_last_duration_seconds' | jq '.data.result'"
      ],
      interpretation: [
        "The `kubectl top` command requires a working metrics API. Missing metrics do not necessarily indicate that pods have no resource usage.",
        "Look for OOMKilled containers, CPU throttling, memory pressure, disk exhaustion, long rule evaluations and repeated restarts.",
        "Prometheus internal metrics can vary by version. Verify exact metric availability in the deployed instance.",
        "High-cardinality queries and overloaded rule groups can cause slow evaluations or timeouts.",
        "Alertmanager queue, retry and notification error metrics are useful when available, but names can vary by version and integration."
      ],
      nextAction: [
        "Inspect CPU, memory, disk, WAL, query load, rule-group duration and receiver latency together.",
        "Apply a controlled resource or query optimization change and confirm that evaluation and delivery latency return to acceptable levels."
      ]
    },
    {
      step: 20,
      title: "Validate the proposed fix before production rollout",
      objective: "Prevent a second incident caused by an incorrect rule or route change.",
      commands: [
        "promtool check config /etc/prometheus/prometheus.yml",
        "promtool check rules /etc/prometheus/rules/*.yml",
        "amtool check-config /etc/alertmanager/alertmanager.yml",
        "git diff --check",
        "git diff --"
      ],
      interpretation: [
        "Use the actual paths and the validator versions corresponding to the deployed software.",
        "A successful syntax check does not prove that the expression detects the intended failure or that a receiver can deliver messages.",
        "For Grafana-managed rules, validate provisioning configuration and test the rule and contact point using the supported workflow.",
        "Review the diff for accidental threshold changes, removed routes, exposed credentials or changes to unrelated alert groups."
      ],
      nextAction: [
        "Run rule tests, a controlled synthetic alert and an approved notification test in a non-production environment.",
        "Obtain required approval and deploy through the standard release mechanism."
      ]
    },
    {
      step: 21,
      title: "Confirm end-to-end recovery and close the incident",
      objective: "Prove that detection and notification work after the fix.",
      commands: [
        "curl -fsS \"$PROM/api/v1/alerts\" | jq '.data.alerts[] | {labels, state, activeAt}'",
        "curl -fsS \"$AM/api/v2/alerts\" | jq '.[] | {labels, startsAt, status}'",
        "kubectl -n monitoring get pods",
        "kubectl -n monitoring logs deploy/alertmanager --since=10m"
      ],
      interpretation: [
        "A healthy pod alone does not prove that alerts are delivered.",
        "Confirm that the expected rule evaluates correctly, the expected alert enters the intended state, Alertmanager routes it, and the destination acknowledges receipt.",
        "Verify that a genuine recovery clears the alert according to the rule's intended behavior.",
        "A synthetic test confirms the tested path but may not prove that every production rule, route or integration is healthy."
      ],
      nextAction: [
        "Document the root cause, timeline, customer impact, fix, validation evidence and rollback decision.",
        "Add regression tests, ownership, alert-delivery monitoring and a follow-up action with an owner and due date."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Expected metric is missing from Prometheus",
      likelyCause: "Scrape failure, missing target discovery, incorrect exporter, relabeling or changed metric name",
      verification: [
        "Query the metric directly.",
        "Inspect `/api/v1/targets` and `up`.",
        "Check exporter endpoint, scrape configuration, service discovery and relabeling."
      ],
      resolution: [
        "Restore the exporter or scrape target, fix the target selector or relabeling rule, and verify the time series appears."
      ]
    },
    {
      symptom: "Metric exists but the alert expression returns no series",
      likelyCause: "Incorrect PromQL, label mismatch, stale series, vector matching or an overly restrictive filter",
      verification: [
        "Run the exact expression in the Prometheus expression browser.",
        "Inspect labels on the underlying time series.",
        "Evaluate expression components separately."
      ],
      resolution: [
        "Correct the query and add promtool rule tests for matching and non-matching cases."
      ]
    },
    {
      symptom: "Rule is missing from the Prometheus Rules page",
      likelyCause: "Rule file not loaded, bad configuration, wrong mount, selector mismatch or operator reconciliation failure",
      verification: [
        "Query `/api/v1/rules?type=alert`.",
        "Inspect startup and reload logs.",
        "Check rule resources, mounts, namespace selectors and generated configuration."
      ],
      resolution: [
        "Correct the authoritative configuration, validate it and deploy using the approved process."
      ]
    },
    {
      symptom: "Alert stays Inactive even though a problem is reported",
      likelyCause: "Expression does not match actual data, wrong threshold, wrong units or missing metric",
      verification: [
        "Compare actual metric values and the threshold.",
        "Inspect units and label filters.",
        "Use a historical range query for the incident window."
      ],
      resolution: [
        "Correct the expression or data source only after confirming the intended business condition."
      ]
    },
    {
      symptom: "Alert remains Pending",
      likelyCause: "Configured `for` duration has not elapsed, expression intermittently clears or alert labels keep changing",
      verification: [
        "Inspect `activeAt`, evaluation intervals and rule configuration.",
        "Compare the expression over time.",
        "Check whether label changes create new alert instances."
      ],
      resolution: [
        "Correct unstable queries or labels, or adjust the pending duration through a documented risk-based decision."
      ]
    },
    {
      symptom: "Prometheus shows Firing but Alertmanager has no alert",
      likelyCause: "Wrong Alertmanager endpoint, failed alert delivery, network issue or mismatched monitoring instance",
      verification: [
        "Inspect `/api/v1/alertmanagers`.",
        "Check Prometheus logs and alert delivery errors.",
        "Compare the configured endpoint with the active Alertmanager service."
      ],
      resolution: [
        "Repair the intended endpoint, DNS, TLS or network path and confirm receipt at Alertmanager."
      ]
    },
    {
      symptom: "Alertmanager contains the alert but no notification arrives",
      likelyCause: "Silence, inhibition, route mismatch, receiver error, grouping delay or notification retry",
      verification: [
        "Inspect active silences and routing configuration.",
        "Check receiver errors and destination delivery history.",
        "Compare alert labels with route matchers."
      ],
      resolution: [
        "Correct the identified suppression, routing or receiver issue and verify a test notification at the destination."
      ]
    },
    {
      symptom: "Only one team or service receives no alerts",
      likelyCause: "Team-label mismatch, incorrect child route, wrong contact point or missing destination permissions",
      verification: [
        "Compare the affected and working alerts' labels.",
        "Inspect child routes and receiver configuration.",
        "Review destination permissions and delivery logs."
      ],
      resolution: [
        "Restore the intended label contract and route, then test the affected team's destination."
      ]
    },
    {
      symptom: "Alerts stopped after a deployment",
      likelyCause: "Changed configuration, rule selectors, labels, secrets, network policies or software version",
      verification: [
        "Compare the last known good and current Git revisions.",
        "Inspect Helm release history, rollout events and logs.",
        "Compare generated runtime configuration."
      ],
      resolution: [
        "Roll back the specific faulty change if safe, or deploy a corrected version through the approved release process."
      ]
    },
    {
      symptom: "Alerts are delayed or duplicated",
      likelyCause: "Grouping settings, retries, receiver latency, overlapping rules, HA deduplication or repeated notifications",
      verification: [
        "Compare alert fingerprints, timestamps, group labels and delivery logs.",
        "Inspect `group_wait`, `group_interval`, `repeat_interval` and receiver retry behavior.",
        "Check for duplicate rule definitions or inconsistent labels across replicas."
      ],
      resolution: [
        "Correct the specific grouping, retry, duplicate-rule or HA configuration issue and verify the resulting notification behavior."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Prometheus Operator ignores a PrometheusRule",
      symptoms: [
        "The PrometheusRule exists in Kubernetes.",
        "The expected rule is missing from the Prometheus Rules API.",
        "The workload and exporter may otherwise be healthy."
      ],
      investigation: [
        "Inspect the Prometheus resource's rule selectors and namespace selectors.",
        "Compare the labels on the PrometheusRule with the selector requirements.",
        "Check operator logs, reconciliation status, generated configuration and Kubernetes events.",
        "Verify that the rule YAML passes `promtool check rules`."
      ],
      resolution: [
        "Correct the selector labels or namespace configuration in the authoritative manifest or Helm values.",
        "Wait for operator reconciliation and verify the rule appears in the runtime API."
      ],
      prevention: [
        "Add a CI check that confirms required rules are selected by the target Prometheus resource.",
        "Monitor rule count, rule evaluation errors and monitoring-operator reconciliation failures."
      ]
    },
    {
      scenario: "Metric disappears after a service deployment",
      symptoms: [
        "The alert used to work but now returns no data.",
        "The application appears healthy or has changed its instrumentation.",
        "The exporter may still be scrapeable."
      ],
      investigation: [
        "Compare metric names, label keys, label values and metric types before and after the release.",
        "Inspect the target's latest scrape and exporter metrics endpoint.",
        "Review instrumentation changes and dashboard queries in the same release.",
        "Check whether the alert depends on a label that was removed or renamed."
      ],
      resolution: [
        "Restore the intended instrumentation or update the query with an approved backward-compatible change.",
        "Validate the rule against both the old and new metric schema when a migration requires compatibility."
      ],
      prevention: [
        "Treat important metric names and labels as a versioned observability contract.",
        "Add integration tests for critical metrics and alerts to application deployment pipelines."
      ]
    },
    {
      scenario: "Alert uses a counter without rate()",
      symptoms: [
        "An error alert does not behave as expected.",
        "The counter increases over time but does not represent the current error rate.",
        "Threshold behavior changes as the process restarts or uptime increases."
      ],
      investigation: [
        "Check whether the metric is a counter or a gauge.",
        "Inspect the metric's value over a historical range.",
        "Review whether the alert should measure a rate, increase over a window or absolute count."
      ],
      resolution: [
        "For a counter-based rate alert, consider an expression such as `sum by (service) (rate(http_requests_total{status=~\"5..\"}[5m]))`.",
        "Adapt the metric and labels to the actual instrumentation; this example is not universally valid."
      ],
      prevention: [
        "Document metric type, unit and intended aggregation.",
        "Test the expression with realistic sample data, restarts and low-traffic periods."
      ]
    },
    {
      scenario: "High-cardinality alert creates excessive alert instances",
      symptoms: [
        "Many nearly identical alerts appear.",
        "Alertmanager groups grow large or notifications become noisy.",
        "Rule evaluation becomes slower."
      ],
      investigation: [
        "Inspect labels retained by the expression.",
        "Look for unique identifiers such as request IDs, session IDs or user IDs.",
        "Measure series count and rule evaluation duration.",
        "Check whether aggregation should occur before alert evaluation."
      ],
      resolution: [
        "Aggregate by stable service, cluster, namespace or team labels when that matches the intended incident semantics.",
        "Remove unneeded high-cardinality labels from the alert identity while retaining useful diagnostic labels elsewhere."
      ],
      prevention: [
        "Set cardinality budgets and review new labels in code review.",
        "Alert on rule evaluation duration and excessive alert-instance counts."
      ]
    },
    {
      scenario: "Alert never fires when a target disappears completely",
      symptoms: [
        "A service or exporter vanishes from discovery.",
        "The expected `up == 0` alert does not fire.",
        "The metric may be absent instead of having value zero."
      ],
      investigation: [
        "Check target discovery and dropped-target information.",
        "Determine whether the rule expects a present `up` series.",
        "Verify that a separate expected-target inventory or black-box probe exists."
      ],
      resolution: [
        "Use an appropriate discovery, expected-target or black-box availability alert so total target disappearance can be detected.",
        "Avoid blindly applying `absent()` to a query that has multiple expected label combinations without validating its semantics."
      ],
      prevention: [
        "Monitor service discovery and expected target counts.",
        "Use independent synthetic probes for critical externally visible services."
      ]
    },
    {
      scenario: "Notification webhook returns HTTP 429",
      symptoms: [
        "Alertmanager logs show rate limiting.",
        "Notifications are delayed, retried or dropped depending on integration behavior.",
        "A burst of alerts may coincide with a large incident."
      ],
      investigation: [
        "Review receiver logs, HTTP response codes, retry timing and destination rate limits.",
        "Inspect whether excessive alert instances or repeated notifications caused the burst.",
        "Check the integration's documented retry and backoff behavior."
      ],
      resolution: [
        "Reduce unnecessary duplicate alert traffic, correct grouping and follow the receiver's rate-limit guidance.",
        "Use an approved queue, relay or integration strategy if the destination requires it."
      ],
      prevention: [
        "Monitor delivery errors, retries, queue growth and destination latency.",
        "Test notification bursts and establish a documented escalation fallback."
      ]
    },
    {
      scenario: "TLS certificate rotation breaks notifications",
      symptoms: [
        "Notifications stop shortly after a secret or certificate rotation.",
        "Logs show certificate verification or hostname errors.",
        "The receiver may be reachable at the TCP level."
      ],
      investigation: [
        "Inspect certificate expiry, subject alternative names, certificate chain and configured CA.",
        "Compare the certificate mounted in the monitoring pod with the intended secret version.",
        "Check whether the process reloads the updated certificate automatically."
      ],
      resolution: [
        "Restore the correct trusted certificate chain and reload or roll out the affected component through the approved process.",
        "Never solve the issue by permanently disabling TLS verification."
      ],
      prevention: [
        "Monitor certificate expiry and test rotation in staging.",
        "Document which components require a reload after certificate changes."
      ]
    },
    {
      scenario: "Prometheus HA replicas produce inconsistent alerts",
      symptoms: [
        "Alerts appear from one replica but not another.",
        "Duplicate notifications occur or labels differ.",
        "Rules or configuration are not synchronized."
      ],
      investigation: [
        "Compare rule files, versions, external labels, evaluation errors and scrape coverage across replicas.",
        "Check Alertmanager cluster health and connectivity.",
        "Review whether the deployment uses supported HA deduplication behavior."
      ],
      resolution: [
        "Restore consistent configuration and connectivity across replicas.",
        "Correct external labels and deduplication configuration according to the deployed architecture."
      ],
      prevention: [
        "Deploy replicas from the same versioned configuration.",
        "Monitor replica health, configuration drift and duplicate notification rates."
      ]
    },
    {
      scenario: "Alert fires in staging but not production",
      symptoms: [
        "The same rule name exists in both environments.",
        "Production has no corresponding alert or reports different values.",
        "The issue may be caused by data, labels or configuration drift."
      ],
      investigation: [
        "Compare the actual expression, rule version, scrape interval, label values, metric type and threshold.",
        "Check production rule selectors, service discovery and permissions.",
        "Compare effective runtime configuration rather than relying only on repository files."
      ],
      resolution: [
        "Correct the environment-specific discrepancy after verifying the intended production behavior.",
        "Deploy through the approved production change process."
      ],
      prevention: [
        "Use version-controlled alert rules and environment-specific configuration reviews.",
        "Add production parity checks for required rules and notification destinations."
      ]
    },
    {
      scenario: "Grafana notification policy routes to the wrong contact point",
      symptoms: [
        "Grafana evaluates the rule but the wrong team receives the alert.",
        "The alert appears in Grafana but not in the expected destination.",
        "Routing behavior changes after labels or policy edits."
      ],
      investigation: [
        "Inspect the alert labels and the notification policy tree.",
        "Check nested policy matchers, default contact points, grouping and mute timings.",
        "Review contact-point errors and provisioning changes."
      ],
      resolution: [
        "Correct the policy matcher or contact point using the supported Grafana provisioning process.",
        "Test routing with an authorized synthetic alert."
      ],
      prevention: [
        "Version-control provisioning files and review policy changes.",
        "Schedule regular contact-point tests and ownership reviews."
      ]
    },
    {
      scenario: "Alerting stops after a monitoring upgrade",
      symptoms: [
        "Rules or integrations worked before an upgrade.",
        "New logs show configuration or API compatibility errors.",
        "Some integrations behave differently after deployment."
      ],
      investigation: [
        "Compare the old and new component versions and configuration schemas.",
        "Inspect migration notes, startup logs, deprecated settings and rule evaluation errors.",
        "Validate configuration with the tooling shipped for the target version."
      ],
      resolution: [
        "Apply the documented configuration migration or roll back the upgrade if the incident warrants it and rollback is supported.",
        "Verify all critical rules and notification integrations after the change."
      ],
      prevention: [
        "Test upgrades in staging with representative alerts and receiver integrations.",
        "Maintain version-pinned deployment manifests and a tested rollback procedure."
      ]
    }
  ],

  recoveryProcedures: [
    {
      situation: "The alert expression is incorrect",
      steps: [
        "Preserve the failing expression and evidence from the incident.",
        "Reproduce the failure with the exact production metric and labels.",
        "Build a corrected expression and test both firing and non-firing cases.",
        "Run promtool rule tests and validate the rule file.",
        "Deploy through the approved GitOps or release process."
      ],
      validation: [
        "Confirm the rule appears in the running Prometheus API.",
        "Confirm a controlled test condition transitions through the expected alert state.",
        "Confirm the alert clears when the condition recovers."
      ],
      rollback: [
        "Restore the last known good rule revision if the new expression produces false positives, misses the condition or increases query load.",
        "Continue approved manual monitoring until the corrected rule is verified."
      ]
    },
    {
      situation: "Alertmanager route or receiver is incorrect",
      steps: [
        "Capture the current route configuration and identify the exact matcher or receiver failure.",
        "Check destination credentials, DNS, TLS, network access and service availability.",
        "Correct only the failing route or integration configuration.",
        "Validate the configuration using the deployed version's supported tooling.",
        "Apply the configuration through the approved deployment process."
      ],
      validation: [
        "Confirm Alertmanager loads the intended configuration.",
        "Send an authorized synthetic test alert and verify receipt at the actual destination.",
        "Confirm critical alerts still route to the intended team and escalation path."
      ],
      rollback: [
        "Restore the last known good configuration if delivery becomes less reliable.",
        "Do not delete all silences or redirect every alert to a broad channel as an unreviewed emergency workaround."
      ]
    },
    {
      situation: "Prometheus or Alertmanager is overloaded",
      steps: [
        "Identify CPU, memory, disk, query latency, rule evaluation duration and notification retry evidence.",
        "Find expensive expressions, high-cardinality labels or notification bursts.",
        "Apply a controlled optimization or resource adjustment approved for the environment.",
        "Verify capacity and HA behavior before restarting or replacing any component."
      ],
      validation: [
        "Check rule evaluation success and latency.",
        "Check scrape health and notification delivery.",
        "Confirm resource pressure is reduced without dropping required coverage."
      ],
      rollback: [
        "Revert the optimization or resource change if it causes data loss, missed evaluation or worse HA behavior.",
        "Retain independent monitoring while restoring the affected service."
      ]
    },
    {
      situation: "Critical production paging is completely unavailable",
      steps: [
        "Declare an incident according to the organization's severity policy.",
        "Notify the incident commander and on-call owner through an independent approved channel.",
        "Activate a documented temporary manual monitoring or escalation process.",
        "Preserve the failed notification evidence and identify whether evaluation, routing or destination delivery is broken.",
        "Restore one critical end-to-end alert path first, then test the remaining required paths."
      ],
      validation: [
        "Confirm a controlled test reaches the correct on-call recipient.",
        "Confirm the intended production alert reaches the same destination.",
        "Confirm the temporary manual escalation remains active until the primary path is verified."
      ],
      rollback: [
        "Roll back the faulty monitoring change when it is safe and supported.",
        "Keep the fallback process in place until the primary alerting path passes end-to-end verification."
      ]
    }
  ],

  cicdTroubleshooting: [
    "Store Prometheus alert rules, Alertmanager routes and Grafana provisioning files in version control.",
    "Run `promtool check rules` and `promtool test rules` where appropriate before merging alert-rule changes.",
    "Run `promtool check config` against the configuration used by the intended Prometheus version.",
    "Run `amtool check-config` against the Alertmanager version deployed in the target environment.",
    "Test important alert behavior for healthy, failing, recovering, absent-metric and label-mismatch cases.",
    "Validate required rule names and routing labels using automated checks.",
    "Check that every critical alert has an owner, severity, runbook link and meaningful summary.",
    "Verify that the intended Prometheus or Grafana instance actually loads the deployed configuration after release.",
    "Use pull-request reviews for threshold changes, route changes, silences, inhibition rules and contact-point changes.",
    "Deploy monitoring changes progressively where the architecture permits it; preserve a known-good revision.",
    "Run controlled synthetic notification tests in non-production and authorized production test channels.",
    "Fail the pipeline when rule syntax, required labels or defined rule tests fail.",
    "Never print credentials, webhook URLs or secret values in pipeline logs.",
    "Track monitoring changes with release IDs so a missed alert can be correlated with a deployment."
  ],

  monitoringAndPrevention: [
    "Monitor Prometheus scrape failures, missing expected targets, scrape duration, rule evaluation failures and rule evaluation duration.",
    "Monitor Prometheus configuration reload success, rule count changes, TSDB capacity, WAL health, disk usage, memory pressure and process restarts.",
    "Monitor Alertmanager availability, peer health, notification errors, retries, queue or delivery latency where exposed, and configuration reload failures.",
    "Monitor Grafana alert evaluation errors, data-source errors, contact-point failures and provisioning drift when Grafana-managed alerting is used.",
    "Create an independent alert for loss of critical monitoring capability. Avoid relying exclusively on the same Prometheus instance to report its own total failure.",
    "Use an external black-box probe to monitor critical public endpoints and a synthetic alert path to verify that the on-call destination receives messages.",
    "Define a periodic end-to-end test that proves metric collection, rule evaluation, routing and notification delivery.",
    "Document expected alert names, owners, labels, thresholds, pending durations, destinations and runbooks.",
    "Keep notification credentials in a secret manager and define a safe rotation procedure.",
    "Test TLS certificate expiry, webhook rotation, destination rate limiting, receiver outages and monitoring upgrades in staging.",
    "Review silences regularly and ensure every maintenance silence has an owner, reason, scope and expiry.",
    "Set clear SLOs for alert evaluation latency and notification delivery latency.",
    "Use actionable alert summaries and annotations with service name, severity, current value, threshold and runbook link.",
    "Reduce alert noise through correct aggregation and grouping, not by hiding important failure modes.",
    "Run periodic game days that simulate missing metrics, failed scrapes, incorrect routes and notification destination outages.",
    "After every missed critical alert, complete a blameless postmortem with measurable follow-up actions."
  ],

  incidentRunbook: [
    "1. Declare the monitoring incident and identify the affected services, environments and alert destinations.",
    "2. Establish a timestamped incident timeline and preserve evidence before making changes.",
    "3. Determine whether the problem is metric collection, expression evaluation, rule loading, alert forwarding, Alertmanager routing or receiver delivery.",
    "4. Query the exact metric and exact alert expression; inspect target health and rule state.",
    "5. If the alert is Firing in Prometheus, inspect Alertmanager receipt, silences, inhibition, route matching and receiver errors.",
    "6. If Grafana manages the rule, inspect its evaluation history, data source, policy tree and contact point.",
    "7. Activate an approved independent manual monitoring or paging fallback if critical notifications are unavailable.",
    "8. Apply the smallest validated correction through the approved production process.",
    "9. Verify the full path with an authorized synthetic alert and the intended production alert condition.",
    "10. Confirm the alert resolves appropriately after recovery and that no important alerts were inadvertently disabled.",
    "11. Record root cause, impact, start and end time, change history, verification evidence and rollback status.",
    "12. Assign preventive actions, owners and due dates, then update the runbook and regression tests."
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Alert expression returns no data",
      objective: "Learn to distinguish an empty time series from a zero value.",
      procedure: [
        "Create a test alert rule against a metric available in a disposable Prometheus environment.",
        "Query the metric directly and inspect its labels.",
        "Intentionally add an incorrect label matcher to the test expression.",
        "Observe the difference between an empty result and a result with value zero.",
        "Correct the matcher and validate the rule."
      ],
      expectedResult: [
        "You can explain why an alert expression did not match any series.",
        "You can verify the corrected expression against the actual labels."
      ],
      cleanup: [
        "Remove the temporary test rule and restore the test environment."
      ]
    },
    {
      lab: "Lab 2 — Test an alert with promtool",
      objective: "Validate rule syntax and simulate alert evaluation without affecting production.",
      procedure: [
        "Create a temporary alert rule file with a simple test metric.",
        "Run `promtool check rules ./alerts-test.yml`.",
        "Write a promtool rule-test file containing input samples and expected alert states.",
        "Run `promtool test rules ./alerts-test-test.yml`.",
        "Introduce an incorrect threshold and confirm that the test catches the regression."
      ],
      expectedResult: [
        "Syntax validation succeeds for valid rules.",
        "The rule test fails when expected alert behavior is broken."
      ],
      cleanup: [
        "Delete temporary test files or keep them in the repository only if they are useful regression tests."
      ]
    },
    {
      lab: "Lab 3 — Simulate a failed scrape",
      objective: "Understand why an exporter outage may or may not create the expected alert.",
      procedure: [
        "In a disposable environment, configure Prometheus to scrape a temporary test endpoint.",
        "Confirm that the target initially reports `up = 1`.",
        "Stop the test endpoint and inspect target health and the `up` series.",
        "Restore the endpoint and observe recovery.",
        "Separately simulate a target disappearing from service discovery."
      ],
      expectedResult: [
        "A scrape failure and a completely missing target are recognized as different failure modes.",
        "You can explain when a simple `up == 0` rule is insufficient."
      ],
      cleanup: [
        "Restore the test endpoint and remove temporary scrape configuration."
      ]
    },
    {
      lab: "Lab 4 — Test Alertmanager routing",
      objective: "Verify that labels select the expected receiver.",
      procedure: [
        "Use a disposable Alertmanager configuration and a local test receiver.",
        "Create a route matching a test label such as `team=\"platform\"`.",
        "Send an authorized synthetic alert containing the expected label.",
        "Change the label to a non-matching value and compare routing behavior.",
        "Review grouping and notification timing."
      ],
      expectedResult: [
        "You can demonstrate the relationship between labels, routes and receivers.",
        "You can identify a route mismatch without changing production policies."
      ],
      cleanup: [
        "Remove the test route and disable the local test receiver."
      ]
    },
    {
      lab: "Lab 5 — Simulate an active silence",
      objective: "Understand notification suppression without confusing it with rule failure.",
      procedure: [
        "Create a test alert in a disposable Alertmanager environment.",
        "Verify that the alert reaches Alertmanager.",
        "Create a short-lived silence matching only the test alert.",
        "Inspect the silence status and observe notification behavior.",
        "Allow the silence to expire or remove it using the approved test procedure."
      ],
      expectedResult: [
        "The test alert remains distinguishable from its suppressed notification.",
        "You can identify the exact matcher and expiry time."
      ],
      cleanup: [
        "Confirm the test silence is no longer active."
      ]
    },
    {
      lab: "Lab 6 — Simulate a receiver failure",
      objective: "Practice distinguishing routing success from delivery success.",
      procedure: [
        "Configure a disposable receiver that intentionally returns an error.",
        "Send a test alert and inspect Alertmanager logs.",
        "Observe the response code and retry behavior supported by the integration.",
        "Restore the receiver and send a second test alert.",
        "Verify receipt at the destination."
      ],
      expectedResult: [
        "You can identify a notification integration failure from its evidence.",
        "You can prove end-to-end recovery after the receiver is restored."
      ],
      cleanup: [
        "Remove the intentionally failing receiver and any test credentials."
      ]
    },
    {
      lab: "Lab 7 — Detect a missing target",
      objective: "Test detection when a target disappears entirely.",
      procedure: [
        "Create a test service-discovery configuration with one expected target.",
        "Confirm that the target is discovered and scraped.",
        "Remove the target from discovery rather than merely stopping the endpoint.",
        "Observe whether the expected-target alert detects the disappearance.",
        "Design a separate test for a missing series or unexpected target-count drop."
      ],
      expectedResult: [
        "You can distinguish target health from target existence.",
        "You can describe an independent detection strategy for a missing target."
      ],
      cleanup: [
        "Restore the target and remove test-only discovery configuration."
      ]
    },
    {
      lab: "Lab 8 — End-to-end alert delivery test",
      objective: "Prove that the complete path from a metric to a notification works.",
      procedure: [
        "Use a disposable Prometheus and Alertmanager environment or an approved non-production stack.",
        "Create a test metric and an alert with a short, appropriate pending duration.",
        "Verify the metric, expression result, rule state and Alertmanager receipt.",
        "Route the test alert to a test-only receiver.",
        "Record the destination acknowledgement and recovery behavior."
      ],
      expectedResult: [
        "The test proves each stage instead of relying on pod health alone.",
        "The evidence identifies where the path would fail if a stage were broken."
      ],
      cleanup: [
        "Remove test rules and routes and confirm no temporary alert remains active."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "1. What does 'alert not firing' mean?",
      answer: "It can mean that the source metric is missing, the expression is false, the rule is not loaded, the alert remains Pending, the alert is not forwarded or the notification is suppressed or rejected. Identify the failing stage before fixing it."
    },
    {
      question: "2. What is the difference between Pending and Firing?",
      answer: "Pending means the expression condition is active but the configured `for` duration has not yet been satisfied. Firing means the alert has reached its firing condition according to the rule's evaluation semantics."
    },
    {
      question: "3. How do you check whether Prometheus received a metric?",
      answer: "Run the exact metric query through the expression browser or `/api/v1/query`, inspect its labels and compare it with the target's scrape health."
    },
    {
      question: "4. What does `up == 0` indicate?",
      answer: "It indicates that a discovered scrape target has a failed scrape. A target that disappears completely may have no `up` series, so missing-target detection may need a separate strategy."
    },
    {
      question: "5. What is the difference between an empty result and zero?",
      answer: "An empty result means no matching series was returned. Zero is a value in a returned series. Alert expressions and comparisons can behave differently for these cases."
    },
    {
      question: "6. How do you debug a PromQL expression?",
      answer: "Query the metric directly, inspect its labels, evaluate expression components separately, check units and aggregation, and use a range query over the incident window."
    },
    {
      question: "7. What is the purpose of `for` in an alert rule?",
      answer: "It requires the condition to remain active for a configured duration before firing. It reduces transient noise but introduces intentional detection delay."
    },
    {
      question: "8. How do you validate Prometheus alert rules?",
      answer: "Use `promtool check rules` for syntax and `promtool test rules` for simulated evaluation behavior, using tooling compatible with the deployed version."
    },
    {
      question: "9. What does `promtool check config` do?",
      answer: "It validates Prometheus configuration syntax and supported configuration structure. It does not prove that targets are reachable or that an alert reaches a receiver."
    },
    {
      question: "10. What is Alertmanager responsible for?",
      answer: "It handles alert grouping, routing, deduplication, silences, inhibition and notification delivery for alerts sent to it."
    },
    {
      question: "11. Prometheus shows Firing but Slack receives nothing. What do you check?",
      answer: "Check the configured Alertmanager endpoint, Prometheus send errors, Alertmanager receipt, silence and inhibition status, route matchers, receiver errors and Slack-side delivery evidence."
    },
    {
      question: "12. What is the difference between a silence and inhibition?",
      answer: "A silence suppresses notifications for alerts matching specified matchers during a defined period. Inhibition suppresses matching alerts when a configured source alert is active and the required equal labels match."
    },
    {
      question: "13. What are `group_wait`, `group_interval` and `repeat_interval`?",
      answer: "They control initial notification delay for a new group, notification timing for updates to an existing group and repeat notification timing for unchanged alerts, respectively."
    },
    {
      question: "14. Why can label changes break alert routing?",
      answer: "Prometheus expressions and Alertmanager routes use labels to identify and match alerts. Renamed, missing or changed labels can create new alert identities or prevent a route from matching."
    },
    {
      question: "15. How do you troubleshoot a missing PrometheusRule in an operator installation?",
      answer: "Check rule selectors and namespace selectors, resource labels, operator reconciliation, generated configuration, events, operator logs and the runtime Prometheus Rules API."
    },
    {
      question: "16. What is the difference between Prometheus-managed and Grafana-managed alerting?",
      answer: "Prometheus evaluates rules defined in its rule configuration. Grafana-managed alerting evaluates rules through Grafana's alerting engine and uses Grafana's data sources, policies and contact points. Their diagnostic paths differ."
    },
    {
      question: "17. Why should you not simply remove `for` when an alert is delayed?",
      answer: "The delay may be intentional to avoid transient noise. Removing it can increase false positives and paging volume without fixing a missing metric, bad expression or failed receiver."
    },
    {
      question: "18. How can a target disappear without triggering `up == 0`?",
      answer: "If service discovery removes the target, Prometheus may no longer have an `up` series for it. Expected-target inventory, target-count alerts or black-box probes can detect that class of failure."
    },
    {
      question: "19. How do you troubleshoot HTTP 429 from a notification receiver?",
      answer: "Inspect destination rate limits, response details, retry/backoff behavior and notification volume. Correct duplicate alert traffic or grouping issues and follow the integration's documented limits."
    },
    {
      question: "20. What can cause alert evaluation delays?",
      answer: "High-cardinality queries, expensive PromQL, CPU or memory pressure, slow storage, long rule-group evaluation, query timeouts and overloaded monitoring infrastructure."
    },
    {
      question: "21. How do you distinguish TLS failure from an application-level failure?",
      answer: "Inspect DNS and TCP connectivity, TLS handshake and certificate validation, then examine the HTTP response. A successful TCP connection alone does not prove application-level delivery."
    },
    {
      question: "22. How should alert rules be tested in CI/CD?",
      answer: "Validate configuration and rule syntax, execute rule tests with representative samples, verify required labels and annotations, and run controlled integration tests for routing and delivery."
    },
    {
      question: "23. What should a production alert contain?",
      answer: "It should have a meaningful name, severity, stable service and ownership labels, concise summary, diagnostic details, a runbook link and a clearly defined recovery condition."
    },
    {
      question: "24. Why is independent monitoring important?",
      answer: "A monitoring system cannot reliably report its own complete outage through the same unavailable path. External probes or an independent monitoring channel can detect total failure."
    },
    {
      question: "25. How do you verify an alerting fix?",
      answer: "Prove the metric exists, the expression behaves correctly, the rule evaluates, the alert reaches the expected state, Alertmanager routes it, and the destination acknowledges the test. Then verify recovery behavior."
    },
    {
      question: "26. What should happen after a missed critical alert?",
      answer: "Restore detection, activate a fallback if needed, document the timeline and root cause, assess impact, add regression tests, assign prevention work and conduct a blameless postmortem."
    },
    {
      question: "27. Why might a rule exist in Git but not in Prometheus?",
      answer: "The deployed version may not include the commit, the file may not be mounted or selected, configuration reload may have failed, or an operator may ignore the resource because of label or namespace selectors."
    },
    {
      question: "28. Why can duplicated alert notifications happen in an HA setup?",
      answer: "Inconsistent external labels, duplicate rules, incorrect HA configuration, mismatched grouping or broken Alertmanager clustering can prevent the intended deduplication behavior."
    },
    {
      question: "29. What is a synthetic alert test?",
      answer: "It is a controlled test alert used to verify a notification path. It should use a clearly identifiable test label and an approved destination, and it should never create unnecessary production paging."
    },
    {
      question: "30. How do you prioritize an alerting incident?",
      answer: "Prioritize by the criticality of the missed detection, the services and environments affected, the availability of independent monitoring and the risk of an undetected outage."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Title: Alerts Not Firing / Notifications Not Delivered",
    "Environment and affected services:",
    "Severity and business impact:",
    "Incident commander and technical owner:",
    "Start time in UTC:",
    "Detection time and detection source:",
    "Last known successful alert and notification:",
    "Expected alert name and rule expression:",
    "Expected notification destination:",
    "Observed behavior: metric / scrape / rule / Pending / Firing / routing / receiver:",
    "Evidence collected and relevant timestamps:",
    "Recent deployments or configuration changes:",
    "Root cause supported by evidence:",
    "Immediate mitigation:",
    "Permanent corrective change:",
    "Prometheus rule validation evidence:",
    "Alertmanager or Grafana validation evidence:",
    "End-to-end test notification evidence:",
    "Recovery verification and resolved time in UTC:",
    "Rollback decision and outcome:",
    "Customer or SLO impact:",
    "Prevention actions, owners and due dates:",
    "Runbook and CI/CD changes:",
    "Blameless postmortem summary:"
  ],

  officialReferences: [
    "Prometheus alerting rules: https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/",
    "Prometheus configuration: https://prometheus.io/docs/prometheus/latest/configuration/configuration/",
    "Prometheus HTTP API: https://prometheus.io/docs/prometheus/latest/querying/api/",
    "Prometheus expression language: https://prometheus.io/docs/prometheus/latest/querying/basics/",
    "Prometheus unit testing rules: https://prometheus.io/docs/prometheus/latest/configuration/unit_testing_rules/",
    "Prometheus command-line tools: https://prometheus.io/docs/prometheus/latest/command-line/promtool/",
    "Alertmanager overview: https://prometheus.io/docs/alerting/latest/alertmanager/",
    "Alertmanager configuration: https://prometheus.io/docs/alerting/latest/configuration/",
    "Alertmanager HTTP API: https://prometheus.io/docs/alerting/latest/alerts_api/",
    "Prometheus Operator: https://prometheus-operator.dev/",
    "Grafana alerting documentation: https://grafana.com/docs/grafana/latest/alerting/",
    "Grafana provisioning alert rules: https://grafana.com/docs/grafana/latest/alerting/set-up/provision-alerting-resources/"
  ]
};
