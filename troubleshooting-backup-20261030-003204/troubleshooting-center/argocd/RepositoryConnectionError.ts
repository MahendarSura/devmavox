export interface RepositoryDiagnostic {
  title: string;
  purpose: string;
  command: string;
  interpretOutput: string[];
  nextStep: string;
  safetyNote?: string;
}

export interface RepositoryRootCause {
  cause: string;
  symptoms: string[];
  verification: string[];
  resolution: string[];
  prevention: string[];
}

export interface RepositoryIncidentScenario {
  title: string;
  situation: string;
  impact: string[];
  investigation: string[];
  resolution: string[];
  verification: string[];
}

export interface RepositoryInterviewQuestion {
  question: string;
  answer: string;
}

export const repositoryConnectionErrorGuide = {
  title: "Argo CD Repository Connection Errors",
  slug: "repository-connection-error",

  category: "Argo CD",
  difficulty: "Advanced",
  estimatedTime: "45–60 minutes",

  description:
    "A production-focused troubleshooting guide for diagnosing and resolving Argo CD repository connection failures involving Git authentication, SSH, HTTPS, DNS, TLS, networking, repository credentials, repo-server health, Git submodules, and repository configuration.",

  overview: {
    whatIsTheProblem:
      "Argo CD must retrieve application source code and configuration from a Git repository or another supported source before it can generate the desired Kubernetes manifests. If Argo CD cannot authenticate to, resolve, reach, or correctly communicate with the repository server, application reconciliation may fail.",

    importantDistinction:
      "A repository connection error is not the same as a manifest rendering error, a Kubernetes synchronization failure, or an application runtime failure. Troubleshooting must identify the exact failing stage before changing configuration.",

    commonErrorMessages: [
      "Unable to connect to repository",
      "authentication required",
      "repository not found",
      "Permission denied (publickey)",
      "Host key verification failed",
      "Could not resolve hostname",
      "Connection timed out",
      "Connection refused",
      "x509: certificate signed by unknown authority",
      "SSL certificate problem: unable to get local issuer certificate",
      "repository not accessible",
      "failed to fetch",
      "failed to list refs",
      "fatal: unable to access repository",
      "context deadline exceeded",
      "i/o timeout",
      "unexpected EOF",
      "failed to load target state",
      "failed to checkout and determine revision",
      "repository server is unavailable",
    ],

    systemFlow: [
      "1. Argo CD Application identifies its repository URL and requested revision.",
      "2. The application controller requests source information and manifests as needed.",
      "3. The repo-server retrieves source content and prepares the requested revision.",
      "4. Git authentication and network communication must succeed.",
      "5. Argo CD renders the source using the configured tool, such as Helm or Kustomize.",
      "6. The generated desired state is compared with the live Kubernetes state.",
      "7. Synchronization may then apply changes to the destination cluster.",
    ],

    architectureComponents: [
      {
        component: "Argo CD Application",
        responsibility:
          "Defines the source repository, path, target revision, destination, and sync configuration.",
      },
      {
        component: "Application Controller",
        responsibility:
          "Reconciles Application resources and coordinates desired-state comparison.",
      },
      {
        component: "Repo-server",
        responsibility:
          "Retrieves source content and generates manifests. Repository access and rendering failures often appear in this component's logs.",
      },
      {
        component: "Repository Credentials",
        responsibility:
          "Provides the configured authentication method for private repositories.",
      },
      {
        component: "Git Provider",
        responsibility:
          "Hosts repository data and enforces access, authentication, branch permissions, and service availability.",
      },
      {
        component: "DNS, Network, Proxy, and TLS",
        responsibility:
          "Provide name resolution, routing, firewall access, proxy communication, and secure transport.",
      },
    ],

    keyPrinciple:
      "Find the first failing boundary. Do not rotate credentials, disable TLS verification, restart every Argo CD component, or force-sync an application before evidence identifies the problem.",
  },

  learningObjectives: [
    "Understand the Argo CD repository retrieval workflow.",
    "Differentiate repository authentication, authorization, DNS, TLS, network, and repo-server failures.",
    "Use the Argo CD CLI and Kubernetes commands to gather evidence.",
    "Read repository and repo-server errors and choose the next diagnostic step.",
    "Troubleshoot HTTPS and SSH repository access separately.",
    "Investigate repository credential templates and credential rotation.",
    "Diagnose private submodules, proxy settings, Git provider outages, and repo-server capacity issues.",
    "Recover repository access without exposing credentials or disrupting healthy applications.",
    "Verify that source retrieval, rendering, synchronization, and application health recover independently.",
    "Build incident reports, alerts, runbooks, and prevention checks.",
  ],

  prerequisites: [
    "Basic Kubernetes and kubectl knowledge.",
    "Basic Git concepts, including clone, fetch, branches, tags, and commits.",
    "Basic SSH and HTTPS authentication knowledge.",
    "Access to the appropriate Argo CD namespace and application.",
    "Read-only access to the affected Git repository and relevant logs.",
    "Approval and change-management access if production configuration changes are required.",
  ],

  incidentSeverity: [
    {
      level: "SEV-1 / Critical",
      examples: [
        "A critical production deployment platform cannot retrieve source from any repository.",
        "A widespread repository credential failure blocks emergency production recovery.",
        "Multiple critical applications cannot reconcile and there is an active service incident.",
      ],
      response:
        "Follow the organization's incident command process, assess business impact, preserve evidence, engage platform and repository owners, and use an approved recovery path.",
    },
    {
      level: "SEV-2 / High",
      examples: [
        "A production application cannot retrieve its required repository revision.",
        "A credential rotation breaks deployments for a critical team.",
        "A network or certificate change blocks a production repository.",
      ],
      response:
        "Prioritize the affected application, identify whether the issue is isolated or shared, and restore access through a controlled change.",
    },
    {
      level: "SEV-3 / Medium",
      examples: [
        "One noncritical application has a repository connection failure.",
        "A new repository cannot be added because its credentials or URL are incorrect.",
      ],
      response:
        "Diagnose the specific repository, verify configuration, and resolve through the normal support and change process.",
    },
    {
      level: "SEV-4 / Low",
      examples: [
        "A test repository has a configuration problem.",
        "An intermittent issue has no current production impact.",
      ],
      response:
        "Collect evidence, create a reproducible test, and fix the underlying issue before it reaches production.",
    },
  ],

  productionWorkflow: [
    {
      step: 1,
      name: "Detect and acknowledge",
      actions: [
        "Capture the exact error and timestamp.",
        "Record the affected Argo CD Application and repository URL.",
        "Check whether the failure is ongoing or intermittent.",
        "Identify the alert, pipeline, user report, or reconciliation event that exposed the problem.",
      ],
      decision:
        "If several applications fail simultaneously, investigate shared infrastructure or shared credentials before treating each application as an isolated incident.",
    },
    {
      step: 2,
      name: "Assess impact",
      actions: [
        "Determine the affected environment: development, staging, or production.",
        "Check whether one repository or multiple repositories are affected.",
        "Identify whether new deployments are blocked.",
        "Check whether an ongoing rollout, incident recovery, or emergency patch depends on the repository.",
        "Determine whether the currently running application is still serving traffic.",
      ],
      decision:
        "A repository connection failure does not automatically mean the running application is down. Establish actual customer impact separately.",
    },
    {
      step: 3,
      name: "Perform safety checks",
      actions: [
        "Confirm the correct Kubernetes context.",
        "Confirm the Argo CD namespace and Application name.",
        "Verify the configured repository URL and revision.",
        "Check whether a recent credential, certificate, firewall, DNS, proxy, or Git provider change occurred.",
        "Use read-only diagnostics first.",
        "Obtain approval before changing production credentials, network policy, certificates, or shared Argo CD configuration.",
      ],
      decision:
        "Do not make a production change until the affected component and expected outcome are understood.",
    },
    {
      step: 4,
      name: "Collect evidence",
      actions: [
        "Save the Application status and source configuration.",
        "Collect repository connection status and repo-server logs.",
        "Record timestamps, error messages, and correlation identifiers where available.",
        "Inspect repository configuration without printing secrets.",
        "Compare working and failing applications when they use the same infrastructure.",
        "Record recent changes from Git, CI/CD, identity management, and platform teams.",
      ],
      decision:
        "Preserve enough evidence to compare the failure before and after recovery.",
    },
    {
      step: 5,
      name: "Run ordered diagnostics",
      actions: [
        "Check Application and repository configuration.",
        "Check repository status in Argo CD.",
        "Check repo-server health and logs.",
        "Test DNS and network reachability from the relevant runtime environment.",
        "Test TLS and authentication using an approved identity.",
        "Compare the configured revision with the actual remote repository.",
      ],
      decision:
        "Use each output to select the next test. Avoid running unrelated fixes simultaneously.",
    },
    {
      step: 6,
      name: "Isolate the root cause",
      actions: [
        "Determine whether the failure is DNS, network, TLS, authentication, authorization, URL, revision, credential selection, submodule, or repo-server related.",
        "Compare one working repository with one failing repository.",
        "Compare one healthy repo-server instance with a failing instance if evidence supports that comparison.",
        "Verify the exact failing hostname, port, URL, revision, and authentication method.",
      ],
      decision:
        "Choose a correction only after the evidence supports a specific cause.",
    },
    {
      step: 7,
      name: "Recover safely",
      actions: [
        "Apply the smallest approved correction.",
        "Avoid exposing or copying tokens and private keys.",
        "Validate access before retrying the complete application reconciliation.",
        "Check whether the source can now be fetched and rendered.",
        "Check sync status and application health separately.",
        "Use the organization's rollback procedure if the change causes additional impact.",
      ],
      decision:
        "Restoring repository access does not authorize an automatic production deployment. Follow the application's sync policy and change approvals.",
    },
    {
      step: 8,
      name: "Prevent recurrence",
      actions: [
        "Document the root cause and evidence.",
        "Add repository connectivity and authentication checks to appropriate monitoring.",
        "Improve credential and certificate rotation procedures.",
        "Add repository validation to onboarding and CI/CD.",
        "Create a tested runbook and escalation path.",
        "Review whether other applications share the same failure mode.",
      ],
      decision:
        "Close the incident only after access is verified, the impact is understood, and follow-up actions have owners.",
    },
  ],

  diagnostics: [
    {
      title: "1. Confirm the Kubernetes context",
      purpose:
        "Prevent troubleshooting the wrong cluster or changing an unrelated environment.",
      command: "kubectl config current-context",
      interpretOutput: [
        "The output identifies the currently selected context.",
        "Compare it with the approved production or staging context.",
        "A correct context is a prerequisite, not proof that repository access works.",
      ],
      nextStep:
        "If the context is incorrect, stop and select the authorized context before continuing.",
      safetyNote:
        "Do not run mutating commands until the context has been confirmed.",
    },
    {
      title: "2. Confirm the Argo CD namespace",
      purpose:
        "Identify where Argo CD is running in the selected cluster.",
      command: "kubectl get namespaces",
      interpretOutput: [
        "Look for the expected namespace, commonly argocd.",
        "Some organizations use a custom namespace.",
        "A missing namespace may indicate the wrong context or a different installation layout.",
      ],
      nextStep:
        "Use the actual namespace in subsequent commands.",
    },
    {
      title: "3. Inspect the affected Application",
      purpose:
        "Check which source URL, path, revision, and destination the Application uses.",
      command:
        "kubectl get application <app-name> -n <argocd-namespace> -o yaml",
      interpretOutput: [
        "Inspect spec.source.repoURL or the appropriate source entry for a multi-source Application.",
        "Inspect spec.source.targetRevision, path, chart, and source-specific fields.",
        "Inspect status.conditions and status.operationState for error messages.",
        "A wrong source URL or revision can look like a connectivity failure.",
        "Avoid sharing the complete output publicly if it contains internal infrastructure details.",
      ],
      nextStep:
        "Compare the configured source with the intended repository and deployment configuration.",
      safetyNote:
        "This is a read-only command. Do not edit the live Application just to test a theory.",
    },
    {
      title: "4. Inspect Application summary",
      purpose:
        "Identify the current sync status, health status, revision, and reported conditions.",
      command: "argocd app get <app-name>",
      interpretOutput: [
        "Check the Sync Status and Health Status separately.",
        "Look for repository retrieval, manifest generation, comparison, or operation errors.",
        "An OutOfSync status alone does not prove repository connectivity is failing.",
        "A Healthy application may still be running while new source revisions cannot be retrieved.",
      ],
      nextStep:
        "Use the detailed error message to choose the repository, rendering, sync, or runtime diagnostic path.",
    },
    {
      title: "5. Inspect configured repositories",
      purpose:
        "Check whether Argo CD recognizes the expected repository configuration.",
      command: "argocd repo list",
      interpretOutput: [
        "Confirm the expected repository URL appears.",
        "Review connection status and the reported error.",
        "A missing repository may indicate it was never registered, was removed, or is represented through a different configuration mechanism.",
        "An inaccessible repository may have a URL, credential, TLS, or network problem.",
      ],
      nextStep:
        "If the repository is listed but failing, investigate its reported error instead of immediately registering it again.",
    },
    {
      title: "6. Check repository details",
      purpose:
        "Inspect repository connection information for a specific URL.",
      command: "argocd repo get <repository-url>",
      interpretOutput: [
        "Verify the URL matches the Application source.",
        "Review the reported connection status and any authentication or TLS error.",
        "Exact command behavior can vary by Argo CD CLI version; check argocd repo get --help if the command is unavailable.",
      ],
      nextStep:
        "Use the specific error to choose authentication, authorization, DNS, TLS, or network diagnostics.",
    },
    {
      title: "7. Check Argo CD component health",
      purpose:
        "Determine whether the relevant Argo CD components are running.",
      command:
        "kubectl get pods -n <argocd-namespace> -o wide",
      interpretOutput: [
        "Identify repo-server pods and their Ready status.",
        "Look for CrashLoopBackOff, Pending, ImagePullBackOff, frequent restarts, or nodes with resource pressure.",
        "Check whether all repo-server replicas are affected or only one.",
        "Running pods do not prove that the Git provider is reachable.",
      ],
      nextStep:
        "If repo-server is unhealthy, investigate its events, resource use, and logs before blaming Git credentials.",
    },
    {
      title: "8. Read repo-server logs",
      purpose:
        "Find the first useful error produced while retrieving or processing repository content.",
      command:
        "kubectl logs -n <argocd-namespace> deploy/argocd-repo-server --since=30m --all-pods=true",
      interpretOutput: [
        "Search for the affected repository hostname and the incident timestamp.",
        "Permission denied (publickey) points toward SSH authentication.",
        "Authentication failed or HTTP 401 often points toward invalid or expired credentials.",
        "HTTP 403 often points toward insufficient permission or provider policy, though provider behavior varies.",
        "Could not resolve hostname points toward DNS or an incorrect hostname.",
        "Connection timed out points toward network routing, firewall, proxy, or an unavailable endpoint.",
        "x509 or certificate errors point toward TLS trust or certificate validity.",
        "A repository-specific error should be compared with errors from other repositories.",
      ],
      nextStep:
        "If this command is unsupported by the installed kubectl version, inspect the repo-server Deployment and select the relevant pod, then run kubectl logs against that pod.",
      safetyNote:
        "Do not paste unredacted logs into tickets or public channels. Logs may contain internal URLs or sensitive operational data.",
    },
    {
      title: "9. Check repo-server events",
      purpose:
        "Find scheduling, container, resource, or platform issues affecting the repository service.",
      command:
        "kubectl get events -n <argocd-namespace> --sort-by=.metadata.creationTimestamp",
      interpretOutput: [
        "Look for failed scheduling, failed mounts, probe failures, OOMKilled events, and repeated restarts.",
        "Events may have expired, so an empty result does not prove no incident occurred.",
        "Node-level or network-level failures may require investigation outside the Argo CD namespace.",
      ],
      nextStep:
        "Investigate the event's affected resource before restarting or replacing components.",
    },
    {
      title: "10. Inspect repository configuration without exposing secrets",
      purpose:
        "Determine whether the repository URL and credential configuration are present.",
      command:
        "kubectl get configmap,secret -n <argocd-namespace>",
      interpretOutput: [
        "Look for repository configuration objects and relevant credential resources by name.",
        "This command lists object names and types, not the actual secret values.",
        "Argo CD may store repository credentials in Secrets, use credential templates, or obtain them through another approved integration.",
        "A Secret's existence does not prove that its credential is valid or selected for the URL.",
      ],
      nextStep:
        "Inspect only the specific authorized resource and compare its metadata, URL matching, ownership, and rotation history.",
      safetyNote:
        "Never dump all Secrets, print tokens, decode private keys into terminal logs, or commit credentials to Git.",
    },
    {
      title: "11. Inspect repository host resolution from repo-server",
      purpose:
        "Check whether the repository hostname resolves inside the runtime environment that needs to access it.",
      command:
        "kubectl exec -n <argocd-namespace> <repo-server-pod> -- getent hosts <git-hostname>",
      interpretOutput: [
        "A valid address indicates that the hostname resolved in that container environment.",
        "No result or a resolver error may indicate DNS, search-domain, resolver, or hostname configuration problems.",
        "Some minimal images do not include getent.",
        "A failed lookup from an administrator laptop does not establish that cluster DNS is broken.",
      ],
      nextStep:
        "If the tool is unavailable, use an approved diagnostic container with equivalent network policies, DNS settings, and routing. Avoid installing packages into production containers as an ad hoc fix.",
    },
    {
      title: "12. Check HTTPS endpoint reachability",
      purpose:
        "Separate basic TCP/TLS endpoint problems from repository authentication problems.",
      command:
        "kubectl exec -n <argocd-namespace> <repo-server-pod> -- curl -I --connect-timeout 5 https://<git-hostname>/",
      interpretOutput: [
        "An HTTP response demonstrates that the request reached an HTTP-speaking endpoint, but it does not prove Git repository authorization.",
        "HTTP 401 or 403 may be expected for an unauthenticated request to a protected service.",
        "A certificate validation error points toward TLS trust or certificate configuration.",
        "A timeout or connection refusal points toward network reachability or service availability.",
        "Some providers redirect requests or restrict their root URL; test the correct endpoint when necessary.",
      ],
      nextStep:
        "If curl is unavailable in the repo-server container, use an approved diagnostic workload that follows the same network and DNS path.",
      safetyNote:
        "Do not add authentication tokens to command-line arguments or shell history.",
    },
    {
      title: "13. Inspect TLS certificate verification",
      purpose:
        "Identify expired certificates, hostname mismatches, or missing certificate authorities.",
      command:
        "openssl s_client -connect <git-hostname>:443 -servername <git-hostname> -verify_return_error",
      interpretOutput: [
        "Confirm the certificate is valid for the requested hostname.",
        "Check the certificate chain and verification result.",
        "A valid certificate from one workstation does not prove the repo-server trust store is correct.",
        "A private Git server may require an organization-approved CA certificate.",
        "Certificate output can vary by OpenSSL version and server configuration.",
      ],
      nextStep:
        "If verification fails, inspect the certificate chain and approved CA distribution process before changing trust configuration.",
      safetyNote:
        "Do not solve a certificate failure by disabling certificate verification in production.",
    },
    {
      title: "14. Check SSH port reachability",
      purpose:
        "Determine whether the repo-server network path can reach an SSH Git endpoint.",
      command:
        "kubectl exec -n <argocd-namespace> <repo-server-pod> -- nc -vz -w 5 <git-hostname> 22",
      interpretOutput: [
        "A successful TCP connection proves that the port is reachable, not that the SSH key is authorized.",
        "Connection refused can mean the service is not listening or a network device actively rejects the connection.",
        "A timeout can indicate a firewall, routing, network policy, or endpoint problem.",
        "Some Git providers use a nonstandard SSH port or an HTTPS-based Git endpoint.",
        "The nc utility may not be installed in the container.",
      ],
      nextStep:
        "Use the repository's actual SSH port and an approved network diagnostic environment if the utility is unavailable.",
    },
    {
      title: "15. Inspect Git URL and revision",
      purpose:
        "Check whether the source URL and revision refer to a real repository and intended branch, tag, or commit.",
      command:
        "git ls-remote <repository-url> <branch-or-tag>",
      interpretOutput: [
        "A successful result returns matching references and commit identifiers.",
        "An empty result may mean the requested reference does not match the filter.",
        "Authentication errors indicate that the test identity lacks access or the credentials are invalid.",
        "Repository-not-found errors can indicate a wrong URL, missing repository, or provider-specific access masking.",
        "The result is meaningful only if the command uses the same intended identity and an equivalent network path.",
      ],
      nextStep:
        "Compare the configured revision with the Git provider and validate the test identity without exposing credentials.",
      safetyNote:
        "Run this command from an approved environment. A developer workstation's success is not conclusive evidence about repo-server connectivity.",
    },
    {
      title: "16. Check proxy environment configuration",
      purpose:
        "Investigate whether repository traffic depends on an HTTP or HTTPS proxy.",
      command:
        "kubectl exec -n <argocd-namespace> <repo-server-pod> -- printenv",
      interpretOutput: [
        "Review only approved proxy-related configuration such as HTTP_PROXY, HTTPS_PROXY, and NO_PROXY.",
        "Proxy settings may be injected through a Deployment, ConfigMap, or platform configuration.",
        "Incorrect NO_PROXY entries can send internal traffic through an unintended proxy or bypass a required proxy.",
        "Environment variables may include credentials or other sensitive information.",
      ],
      nextStep:
        "Prefer inspecting the Deployment's approved configuration and redacted proxy variables. Compare with a known-good environment.",
      safetyNote:
        "Do not share raw printenv output. It can disclose secrets. Use a narrow, redacted inspection method.",
    },
    {
      title: "17. Check recent repository configuration changes",
      purpose:
        "Correlate the start of the failure with a URL, credential, CA certificate, or repository permission change.",
      command:
        "kubectl get events -n <argocd-namespace> --sort-by=.metadata.creationTimestamp",
      interpretOutput: [
        "Kubernetes events do not provide a complete audit trail of every configuration change.",
        "Correlate timestamps with the Git provider's audit log, secret-management history, GitOps commits, and platform change records.",
        "A failure beginning immediately after credential rotation is evidence to investigate, not proof by itself.",
      ],
      nextStep:
        "Identify the exact changed field or identity and verify it against the expected configuration.",
    },
    {
      title: "18. Compare healthy and failing repositories",
      purpose:
        "Find differences when some applications work and others fail.",
      command:
        "argocd repo list",
      interpretOutput: [
        "Compare repository hosts, connection status, URL patterns, and authentication methods.",
        "If only one repository fails, prioritize its URL, credentials, permissions, and repository settings.",
        "If repositories on the same host fail together, investigate shared credentials, DNS, TLS, network paths, provider availability, or proxy configuration.",
        "If every repository fails but the Git provider is healthy, inspect shared repo-server and platform dependencies.",
      ],
      nextStep:
        "Use a controlled comparison to narrow the investigation. Do not assume repositories use the same credential template or access policy.",
    },
    {
      title: "19. Check repo-server resource usage",
      purpose:
        "Determine whether resource pressure or repeated restarts contribute to repository timeouts.",
      command:
        "kubectl top pods -n <argocd-namespace>",
      interpretOutput: [
        "High CPU or memory usage may contribute to latency or instability.",
        "Missing metrics may indicate that the metrics API is unavailable rather than that the pods use no resources.",
        "Resource pressure is more convincing when it correlates with latency, restarts, or failures across several repositories.",
      ],
      nextStep:
        "Review resource requests, limits, pod restarts, and metrics over the incident window before adjusting capacity.",
    },
    {
      title: "20. Verify repository access after the correction",
      purpose:
        "Confirm that the original repository operation now succeeds.",
      command:
        "argocd repo list",
      interpretOutput: [
        "Confirm the affected repository now reports a successful connection.",
        "Confirm the result corresponds to the correct URL and intended identity.",
        "A successful connection check alone does not prove that the Application can render the selected revision.",
      ],
      nextStep:
        "Continue with Application source retrieval, manifest generation, sync status, and health verification.",
    },
  ] satisfies RepositoryDiagnostic[],

  rootCauses: [
    {
      cause: "Incorrect repository URL",
      symptoms: [
        "Repository not found.",
        "The hostname cannot be resolved.",
        "A redirect or unexpected endpoint is returned.",
        "The Application references a different repository from the intended source.",
      ],
      verification: [
        "Compare the Application source URL with the repository's official clone URL.",
        "Check hostname, organization or project, repository name, and URL scheme.",
        "Check whether the organization recently migrated the repository.",
        "Confirm whether a trailing slash, URL casing, or SSH-versus-HTTPS difference affects the configured repository identity.",
      ],
      resolution: [
        "Correct the URL through the approved GitOps or repository configuration process.",
        "Check whether repository credentials are associated with the corrected URL.",
        "Validate access before allowing any production sync.",
      ],
      prevention: [
        "Use a reviewed repository onboarding process.",
        "Validate source URLs in pull requests.",
        "Document repository migrations and update dependent Applications.",
      ],
    },
    {
      cause: "Expired, revoked, or rotated HTTPS credentials",
      symptoms: [
        "HTTP 401 or an authentication failure.",
        "A previously working repository starts failing after credential rotation.",
        "Multiple repositories using the same identity fail together.",
      ],
      verification: [
        "Check the Git provider's authentication and audit logs.",
        "Confirm the token or credential is still active using the approved identity-management process.",
        "Verify that the configured repository or credential template selects the intended credential.",
        "Check the credential rotation timestamp against the incident timeline.",
      ],
      resolution: [
        "Rotate or replace the credential through the approved secret-management process.",
        "Update the intended Argo CD credential resource or external secret integration.",
        "Verify the correct repository URL matches the credential configuration.",
        "Run a controlled connection check.",
      ],
      prevention: [
        "Use short-lived or managed credentials where supported.",
        "Monitor credential expiry and rotation failures.",
        "Document credential ownership and rotation responsibilities.",
        "Test credential rotation in a nonproduction environment.",
      ],
    },
    {
      cause: "Insufficient repository permissions",
      symptoms: [
        "HTTP 403 or a provider-specific access-denied message.",
        "The credential is valid but cannot read the repository.",
        "Access works for one repository but not another.",
      ],
      verification: [
        "Check the repository provider's permissions for the configured identity.",
        "Confirm read access to the repository and required project or organization.",
        "Check SSO authorization, organization policies, deploy-key restrictions, and token scopes where applicable.",
        "Compare access with a known-good repository using the same intended identity.",
      ],
      resolution: [
        "Grant only the required read permission.",
        "Authorize the identity through the provider's approved SSO or organization process.",
        "Use a supported token scope or deploy-key configuration appropriate to the provider.",
        "Re-test access using the intended identity.",
      ],
      prevention: [
        "Use least-privilege repository identities.",
        "Review permissions when repositories move between organizations or projects.",
        "Audit access changes and expired deploy keys.",
      ],
    },
    {
      cause: "SSH private key is missing, invalid, or unauthorized",
      symptoms: [
        "Permission denied (publickey).",
        "SSH authentication fails while DNS and TCP connectivity succeed.",
        "A repository fails after a key rotation.",
      ],
      verification: [
        "Confirm the repository URL uses SSH.",
        "Check which approved SSH credential is associated with the repository.",
        "Verify that the corresponding public key is registered with the Git provider.",
        "Check whether the key was revoked, rotated, or restricted.",
      ],
      resolution: [
        "Install or rotate the approved key using the organization's secure secret-management workflow.",
        "Register the matching public key with the correct repository or organization.",
        "Confirm the key is selected for the configured repository URL.",
        "Test access without printing or copying the private key.",
      ],
      prevention: [
        "Track key ownership, scope, expiry where applicable, and rotation dates.",
        "Avoid sharing personal developer keys for production automation.",
        "Prefer dedicated, least-privilege automation identities.",
      ],
    },
    {
      cause: "SSH host key verification failure",
      symptoms: [
        "Host key verification failed.",
        "The server host key differs from the known host entry.",
        "The error begins after a Git provider migration or host-key rotation.",
      ],
      verification: [
        "Confirm the hostname and port are correct.",
        "Obtain the expected host-key fingerprint from the Git provider's trusted documentation or administrator.",
        "Compare the fingerprint with the configured known-hosts data.",
        "Investigate unexpected changes as a potential security incident.",
      ],
      resolution: [
        "Update the trusted host key through the approved Argo CD configuration process.",
        "Verify the fingerprint independently before trusting the new key.",
        "Re-test SSH connectivity.",
      ],
      prevention: [
        "Document the host-key update process.",
        "Monitor planned provider key changes.",
        "Never disable host-key checking as a shortcut.",
      ],
    },
    {
      cause: "TLS certificate or CA trust failure",
      symptoms: [
        "x509: certificate signed by unknown authority.",
        "Certificate expired or not yet valid.",
        "Hostname does not match the certificate.",
        "HTTPS requests fail while DNS and TCP connectivity work.",
      ],
      verification: [
        "Check the certificate validity period and hostname.",
        "Inspect the certificate chain from the relevant runtime network path.",
        "Confirm the correct organization CA is trusted by the Argo CD repository configuration when using a private Git server.",
        "Check whether a proxy performs TLS inspection.",
      ],
      resolution: [
        "Renew or correct the server certificate when it is invalid.",
        "Install the approved CA certificate using the supported Argo CD configuration mechanism.",
        "Restart or roll out components only if required by the documented certificate update process.",
        "Verify certificate validation after the change.",
      ],
      prevention: [
        "Monitor certificate expiry.",
        "Automate CA distribution and renewal where possible.",
        "Test private CA changes before production rollout.",
        "Never disable TLS verification to hide certificate errors.",
      ],
    },
    {
      cause: "DNS resolution failure",
      symptoms: [
        "Could not resolve hostname.",
        "Temporary failure in name resolution.",
        "Several services using the same DNS resolver fail.",
      ],
      verification: [
        "Test hostname resolution from an environment with the same DNS path as repo-server.",
        "Check the configured repository hostname for spelling errors.",
        "Inspect cluster DNS health and relevant resolver configuration.",
        "Compare the affected hostname with a known-good hostname.",
      ],
      resolution: [
        "Correct the hostname if the URL is wrong.",
        "Restore the approved DNS record or resolver configuration.",
        "Resolve cluster DNS issues through the platform team.",
        "Repeat the lookup from the relevant runtime environment.",
      ],
      prevention: [
        "Monitor cluster DNS and critical external hostname resolution.",
        "Document internal Git DNS dependencies.",
        "Test DNS changes before rollout.",
      ],
    },
    {
      cause: "Firewall, routing, or network policy blocks Git traffic",
      symptoms: [
        "Connection timed out.",
        "Connection refused.",
        "Repository access fails from repo-server but works from another environment.",
        "Only a particular network segment or destination is affected.",
      ],
      verification: [
        "Identify the exact destination hostname and required port.",
        "Check egress NetworkPolicies and network security controls.",
        "Check firewall rules, routing, NAT, proxy, and private endpoint requirements.",
        "Compare successful and failing paths without assuming they are identical.",
      ],
      resolution: [
        "Request the minimum approved network rule for the correct destination and port.",
        "Correct routing or endpoint configuration through the platform network process.",
        "Re-test connectivity from the same runtime path.",
      ],
      prevention: [
        "Maintain a documented allowlist of required Git endpoints.",
        "Include repository connectivity in network-change testing.",
        "Alert on correlated failures across multiple repositories.",
      ],
    },
    {
      cause: "Proxy or NO_PROXY configuration is incorrect",
      symptoms: [
        "Repository traffic fails after a proxy change.",
        "External repositories fail while internal endpoints work, or vice versa.",
        "TLS errors or unexpected connection timeouts occur through a proxy.",
      ],
      verification: [
        "Inspect approved, redacted proxy settings in the repo-server configuration.",
        "Confirm the proxy can resolve and reach the repository host.",
        "Check NO_PROXY entries for the intended hostnames and internal endpoints.",
        "Compare proxy configuration with the platform's documented requirements.",
      ],
      resolution: [
        "Correct the proxy settings through the approved configuration process.",
        "Update NO_PROXY only when required by the intended network path.",
        "Roll out configuration changes using the organization's standard deployment process.",
        "Verify repository connectivity after the rollout.",
      ],
      prevention: [
        "Version-control nonsecret proxy configuration.",
        "Test proxy changes against representative internal and external repositories.",
        "Keep proxy credentials in an approved secret-management system.",
      ],
    },
    {
      cause: "Git provider outage or repository service degradation",
      symptoms: [
        "Many repositories on the same provider fail at approximately the same time.",
        "Connection latency or server errors increase.",
        "Local configuration has not changed, but provider requests fail.",
      ],
      verification: [
        "Check the provider's official service-status page.",
        "Check provider response codes and incident timestamps.",
        "Compare repositories hosted by the same provider with repositories hosted elsewhere.",
        "Confirm whether the issue affects authentication, Git transport, or the provider's web interface only.",
      ],
      resolution: [
        "Escalate to the provider or internal Git platform team.",
        "Preserve the current working application state while assessing the impact.",
        "Use only an approved alternate source or emergency deployment process if one exists.",
        "Do not migrate production source URLs during an outage without a reviewed plan.",
      ],
      prevention: [
        "Document Git provider dependencies and escalation contacts.",
        "Maintain a tested emergency deployment procedure.",
        "Consider provider resilience according to business criticality.",
      ],
    },
    {
      cause: "Repository credential template does not match the URL",
      symptoms: [
        "A repository appears configured but uses an unexpected credential.",
        "Several repositories under a common URL prefix fail.",
        "A new repository is not authenticated by an existing credential template.",
      ],
      verification: [
        "Inspect the configured repository URL and credential-template matching rules.",
        "Check whether a more specific repository entry overrides or bypasses the intended template.",
        "Compare a working URL and failing URL, including scheme and hostname.",
        "Confirm the credential type is compatible with the repository transport.",
      ],
      resolution: [
        "Correct the URL pattern or repository configuration through the approved process.",
        "Avoid overlapping or ambiguous credential-template definitions.",
        "Re-test the exact repository that originally failed.",
      ],
      prevention: [
        "Use consistent repository URL conventions.",
        "Document credential-template scope and ownership.",
        "Add repository onboarding tests for credential matching.",
      ],
    },
    {
      cause: "Git submodule cannot be retrieved",
      symptoms: [
        "The main repository can be accessed but source processing fails on a private submodule.",
        "Errors reference a second repository URL.",
        "A change adding a submodule introduces the failure.",
      ],
      verification: [
        "Inspect the .gitmodules file and identify every submodule URL.",
        "Confirm that the required submodule is reachable from the relevant runtime environment.",
        "Verify that the configured identity has access to the submodule repository.",
        "Check whether the submodule URL uses SSH while only HTTPS credentials are configured, or the reverse.",
      ],
      resolution: [
        "Provide the correct approved credentials for the submodule.",
        "Correct the submodule URL if it is wrong.",
        "Follow the documented Argo CD and Git configuration requirements for submodule access.",
        "Re-test source retrieval and rendering.",
      ],
      prevention: [
        "Validate submodule access during pull requests.",
        "Document credentials required by all nested repositories.",
        "Avoid introducing undocumented private repository dependencies.",
      ],
    },
    {
      cause: "Repo-server resource pressure or instability",
      symptoms: [
        "Repository operations time out intermittently.",
        "Repo-server pods restart or are OOMKilled.",
        "Several unrelated repositories fail during the same time window.",
        "Latency increases during large manifest generation or concurrent refresh activity.",
      ],
      verification: [
        "Inspect repo-server logs, restarts, events, CPU, and memory.",
        "Compare failure timestamps with deployment activity and workload peaks.",
        "Check whether failures are limited to one replica or affect all replicas.",
        "Separate Git transport errors from resource exhaustion and manifest-generation failures.",
      ],
      resolution: [
        "Address the measured bottleneck according to the supported Argo CD deployment model.",
        "Review resource requests and limits, workload concurrency, repository size, and supported repo-server scaling options.",
        "Use a controlled rollout only when the diagnosis justifies it.",
        "Verify all relevant repositories after recovery.",
      ],
      prevention: [
        "Monitor resource saturation and restart rates.",
        "Load-test repository and rendering workloads.",
        "Review capacity as the number and size of applications grow.",
      ],
    },
    {
      cause: "Requested branch, tag, or commit is unavailable",
      symptoms: [
        "The repository is reachable but Argo CD cannot find the requested revision.",
        "The error references an unknown revision or failed checkout.",
        "A branch or tag was renamed, deleted, or not pushed.",
      ],
      verification: [
        "Check the Application's targetRevision.",
        "Confirm that the branch, tag, or commit exists in the intended repository.",
        "Compare the configured revision with the deployment change request.",
        "Check whether a protected branch or release process prevented the expected ref from being published.",
      ],
      resolution: [
        "Restore or correct the intended revision through the repository's release process.",
        "Update targetRevision only when the change is authorized and reviewed.",
        "Revalidate source retrieval and rendering before production sync.",
      ],
      prevention: [
        "Protect deployment branches and release tags.",
        "Validate targetRevision values in CI.",
        "Document release and rollback reference policies.",
      ],
    },
  ] satisfies RepositoryRootCause[],

  incidentScenarios: [
    {
      title: "Scenario 1: Production deployments fail after token rotation",
      situation:
        "A team rotates a Git provider access token. Shortly afterward, several Argo CD Applications report repository authentication errors. The existing Kubernetes workloads continue running, but new changes are not being reconciled.",
      impact: [
        "New deployments are blocked for affected repositories.",
        "Existing workloads may continue serving traffic.",
        "Emergency fixes may be delayed.",
        "The incident may affect every repository using the rotated identity.",
      ],
      investigation: [
        "Record the first failure timestamp and identify all affected Applications.",
        "Inspect Application source URLs and repository connection status.",
        "Compare the token rotation time with the first authentication failure.",
        "Check provider audit logs and credential status.",
        "Confirm which Argo CD repository entry or credential template is used.",
        "Check whether unrelated repositories using different identities remain healthy.",
      ],
      resolution: [
        "Confirm that the replacement credential is valid and has the required read access.",
        "Update the approved credential resource or external secret integration.",
        "Verify that the intended repository selects the replacement credential.",
        "Run the repository connection check.",
        "Confirm source retrieval and rendering before allowing production sync.",
      ],
      verification: [
        "The repository reports a successful connection.",
        "The affected Application can retrieve the intended revision.",
        "Manifest generation succeeds.",
        "Sync and health status are checked independently.",
        "The incident timeline and rotation process are documented.",
      ],
    },
    {
      title: "Scenario 2: All repositories on one Git provider time out",
      situation:
        "Applications using one Git provider fail to refresh, while repositories hosted on another provider remain accessible.",
      impact: [
        "Multiple teams may be unable to deploy.",
        "The incident may affect production and nonproduction environments.",
        "The existing applications may continue running, but reconciliation is delayed.",
      ],
      investigation: [
        "Compare affected repositories by hostname and provider.",
        "Check provider status and internal Git service monitoring.",
        "Test DNS resolution from repo-server.",
        "Test TCP and TLS reachability from the relevant runtime environment.",
        "Check proxy, firewall, egress rules, and provider-side incidents.",
        "Check whether all repo-server replicas experience the same failure.",
      ],
      resolution: [
        "Escalate a confirmed provider outage to the appropriate team.",
        "If an internal network change caused the problem, restore the approved network path.",
        "Avoid changing repository URLs or rotating valid credentials without evidence.",
        "Use an approved emergency deployment process only when required by the incident.",
      ],
      verification: [
        "Several representative repositories on the affected provider are accessible.",
        "Previously failing Applications can refresh their source.",
        "The recovery is sustained rather than a single successful request.",
        "The provider or network incident is recorded.",
      ],
    },
    {
      title: "Scenario 3: SSH host key changes unexpectedly",
      situation:
        "A repository begins reporting Host key verification failed after a server migration or an unexpected key change.",
      impact: [
        "Applications using the affected SSH endpoint cannot retrieve source.",
        "Deployments may be blocked even if the SSH private key is valid.",
        "An unexpected host-key change may indicate a security concern.",
      ],
      investigation: [
        "Confirm the repository hostname and SSH port.",
        "Check the provider's official host-key rotation notice.",
        "Obtain the expected fingerprint through a trusted channel.",
        "Compare it with the configured known-hosts entry.",
        "Check whether the change was approved and whether other repositories use the same endpoint.",
      ],
      resolution: [
        "Treat an unverified host-key change as a security issue.",
        "After independent verification, update the trusted host-key configuration through the approved process.",
        "Re-test SSH access and the original Application.",
        "Do not bypass host-key verification to restore service quickly.",
      ],
      verification: [
        "The trusted fingerprint matches the independently verified value.",
        "SSH repository access succeeds.",
        "Argo CD can retrieve the intended source revision.",
        "The security review and configuration change are recorded.",
      ],
    },
    {
      title: "Scenario 4: One private repository fails after a project migration",
      situation:
        "A repository moves to a different organization or project. Argo CD continues using the old URL or an identity that no longer has access.",
      impact: [
        "Applications using the moved repository cannot refresh.",
        "Other repositories may remain healthy.",
        "Deployment pipelines can fail even when the Git provider is available.",
      ],
      investigation: [
        "Compare the Application URL with the repository's current clone URL.",
        "Check provider audit logs and repository migration details.",
        "Verify the identity's new permissions.",
        "Check whether the repository credential template matches the new URL.",
        "Check whether redirects are supported by the configured Git transport and tooling.",
      ],
      resolution: [
        "Update the source URL through the reviewed GitOps configuration.",
        "Configure the correct repository credentials or template.",
        "Verify read access to the new location.",
        "Review the manifest diff and deployment impact before syncing.",
      ],
      verification: [
        "Argo CD connects to the intended repository.",
        "The configured revision exists at the new location.",
        "Manifest generation succeeds.",
        "Production sync proceeds only through the approved workflow.",
      ],
    },
    {
      title: "Scenario 5: Repository connection succeeds but rendering fails",
      situation:
        "The repository becomes accessible, but the Application still reports a manifest generation error.",
      impact: [
        "Deployment remains blocked even though the original connection problem is resolved.",
        "Repeated credential changes do not fix the current error.",
      ],
      investigation: [
        "Confirm repository connection status.",
        "Read the new, current error instead of relying on the original incident message.",
        "Check the requested path and revision.",
        "Inspect Helm values, Kustomize references, plugins, and repository-specific rendering configuration.",
        "Check whether the error is reproducible at the same commit.",
      ],
      resolution: [
        "Handle the rendering failure as a separate incident stage.",
        "Correct the source configuration or rendering input identified by evidence.",
        "Validate the generated manifests before syncing.",
      ],
      verification: [
        "Repository retrieval succeeds.",
        "Manifest generation succeeds.",
        "The desired-state diff is reviewed.",
        "Sync and runtime health are checked separately.",
      ],
    },
  ] satisfies RepositoryIncidentScenario[],

  troubleshootingDecisionTree: [
    {
      observation: "The repository is not listed in Argo CD.",
      likelyAreas: [
        "Repository was never registered.",
        "Repository configuration was removed.",
        "The Application uses a different source configuration.",
        "The CLI is connected to the wrong Argo CD instance.",
      ],
      nextAction:
        "Confirm the Argo CD endpoint, Application source URL, and approved repository configuration mechanism.",
    },
    {
      observation: "The error contains Permission denied (publickey).",
      likelyAreas: [
        "Wrong SSH key.",
        "Missing public key registration.",
        "Key revoked or rotated.",
        "Incorrect repository URL or credential selection.",
      ],
      nextAction:
        "Validate the configured SSH identity and its repository permissions without exposing the private key.",
    },
    {
      observation: "The error contains HTTP 401.",
      likelyAreas: [
        "Missing credential.",
        "Expired token.",
        "Incorrect username or token.",
        "Credential template not selected.",
      ],
      nextAction:
        "Check credential validity, URL matching, and provider authentication logs.",
    },
    {
      observation: "The error contains HTTP 403.",
      likelyAreas: [
        "Insufficient repository permission.",
        "Organization SSO restrictions.",
        "Token scope or provider policy.",
        "IP allowlist or other access policy.",
      ],
      nextAction:
        "Verify authorization and provider policy for the actual configured identity.",
    },
    {
      observation: "The error contains Could not resolve hostname.",
      likelyAreas: [
        "Incorrect hostname.",
        "DNS resolver failure.",
        "Missing private DNS record.",
        "Cluster DNS issue.",
      ],
      nextAction:
        "Test resolution from the repo-server network path and compare with a known-good hostname.",
    },
    {
      observation: "The error contains Connection timed out.",
      likelyAreas: [
        "Firewall or egress policy.",
        "Routing or NAT issue.",
        "Proxy failure.",
        "Git provider network outage.",
      ],
      nextAction:
        "Identify the exact hostname and port, then test the approved network path.",
    },
    {
      observation: "The error contains x509 or certificate verification failure.",
      likelyAreas: [
        "Expired certificate.",
        "Hostname mismatch.",
        "Missing CA trust.",
        "TLS inspection proxy.",
      ],
      nextAction:
        "Inspect certificate validity and trust from the relevant runtime environment.",
    },
    {
      observation: "Many repositories fail at once.",
      likelyAreas: [
        "Shared Git provider outage.",
        "Shared credentials or credential template.",
        "DNS, proxy, firewall, or CA change.",
        "Repo-server resource or availability issue.",
      ],
      nextAction:
        "Group failures by host, credential identity, timestamp, and repo-server instance.",
    },
    {
      observation: "Repository access succeeds but manifest generation fails.",
      likelyAreas: [
        "Wrong source path.",
        "Invalid Helm or Kustomize configuration.",
        "Missing dependency.",
        "Config-management plugin error.",
      ],
      nextAction:
        "Switch to rendering diagnostics. Do not keep changing repository credentials without new evidence.",
    },
    {
      observation: "Manifest generation succeeds but sync fails.",
      likelyAreas: [
        "Kubernetes API connectivity.",
        "RBAC or admission policy.",
        "Resource conflicts.",
        "Invalid destination configuration.",
      ],
      nextAction:
        "Investigate the synchronization error as a separate stage.",
    },
  ],

  safeRecoveryProcedure: [
    {
      step: 1,
      action: "Capture the original error",
      details:
        "Save the exact error message, timestamp, affected Application, repository host, revision, and current impact.",
    },
    {
      step: 2,
      action: "Identify the failure boundary",
      details:
        "Determine whether the failure occurs during DNS, network connection, TLS, authentication, authorization, repository retrieval, or manifest rendering.",
    },
    {
      step: 3,
      action: "Select the smallest approved correction",
      details:
        "Examples include correcting a URL, restoring a valid credential, fixing a trusted CA, or allowing an approved network path. Do not change multiple unrelated settings at once.",
    },
    {
      step: 4,
      action: "Make the change through the source of truth",
      details:
        "Use the organization's approved GitOps, secret-management, platform configuration, or credential rotation process. Avoid undocumented manual changes to live resources.",
    },
    {
      step: 5,
      action: "Validate repository access",
      details:
        "Run the repository connection check and confirm the intended repository is accessible with the expected identity.",
    },
    {
      step: 6,
      action: "Validate source retrieval and rendering",
      details:
        "Confirm the expected revision can be retrieved and the desired manifests can be generated.",
    },
    {
      step: 7,
      action: "Review synchronization separately",
      details:
        "Check the proposed diff and the application's sync policy. A repository fix must not accidentally authorize an unintended production deployment.",
    },
    {
      step: 8,
      action: "Verify application health",
      details:
        "After an authorized sync, verify rollout status, readiness, application health, and relevant service-level indicators.",
    },
    {
      step: 9,
      action: "Record the incident",
      details:
        "Document the cause, evidence, change, verification, rollback decision, customer impact, and prevention work.",
    },
  ],

  verificationChecklist: [
    "Correct cluster, Argo CD instance, and namespace confirmed.",
    "Affected Application and repository URL confirmed.",
    "Incident timestamp and impact recorded.",
    "Repository status checked.",
    "Repo-server health and logs reviewed.",
    "DNS resolution verified from the relevant runtime path.",
    "Network and port reachability verified where relevant.",
    "TLS certificate and CA trust verified where relevant.",
    "Correct authentication identity verified.",
    "Repository read authorization confirmed.",
    "Credential-template matching checked where applicable.",
    "Git submodule access checked where applicable.",
    "Requested branch, tag, or commit verified.",
    "Repository connection now succeeds.",
    "Source retrieval succeeds.",
    "Manifest generation succeeds.",
    "Desired-state diff reviewed.",
    "Synchronization status checked separately.",
    "Application health and service indicators checked.",
    "No credentials or private keys exposed in logs or incident notes.",
    "Incident report and preventive actions completed.",
  ],

  prevention: [
    {
      area: "Repository onboarding",
      actions: [
        "Standardize HTTPS or SSH repository URL formats.",
        "Validate repository access before registering an Application.",
        "Document the required identity, credential owner, and access scope.",
        "Include private submodules and private chart dependencies in onboarding checks.",
      ],
    },
    {
      area: "Credential management",
      actions: [
        "Use approved secret-management integrations where available.",
        "Track credential expiry and rotation ownership.",
        "Test credential rotation in a nonproduction environment.",
        "Avoid broad personal access tokens and shared personal SSH keys.",
        "Never commit credentials to Git.",
      ],
    },
    {
      area: "TLS and SSH security",
      actions: [
        "Monitor TLS certificate expiry.",
        "Maintain an approved CA trust-distribution process.",
        "Verify SSH host-key fingerprints through trusted channels.",
        "Never disable TLS certificate or SSH host-key verification to bypass an incident.",
      ],
    },
    {
      area: "Networking",
      actions: [
        "Document required Git provider hostnames and ports.",
        "Test egress, DNS, firewall, proxy, and private endpoint changes before rollout.",
        "Monitor cluster DNS and critical repository endpoint availability.",
        "Document proxy and NO_PROXY configuration ownership.",
      ],
    },
    {
      area: "Monitoring and alerting",
      actions: [
        "Monitor repository connection failures over time.",
        "Alert on sustained failures affecting critical production Applications.",
        "Correlate failures by repository host and error category.",
        "Monitor repo-server restarts, resource pressure, and latency.",
        "Avoid alerting on one transient failure without evaluating duration and impact.",
      ],
    },
    {
      area: "CI/CD validation",
      actions: [
        "Validate repository URLs and required revisions in pull requests.",
        "Test repository access using the intended automation identity.",
        "Validate Helm and Kustomize rendering separately from Git connectivity.",
        "Include source access and credential rotation tests in platform release procedures.",
      ],
    },
    {
      area: "Incident readiness",
      actions: [
        "Maintain a repository outage runbook.",
        "Document Git provider and network escalation contacts.",
        "Practice credential rotation and recovery in a nonproduction environment.",
        "Document emergency deployment and rollback procedures.",
        "Review incidents for systemic causes rather than fixing only the first affected Application.",
      ],
    },
  ],

  commonMistakes: [
    {
      mistake: "Restarting every Argo CD pod immediately",
      whyItIsWrong:
        "Restarts can remove useful diagnostic context and may not fix an invalid URL, expired credential, DNS issue, or blocked network path.",
      betterApproach:
        "Capture logs and status first. Restart a component only when evidence supports a component-level fault and the action is approved.",
    },
    {
      mistake: "Disabling TLS verification",
      whyItIsWrong:
        "This removes an important security control and may expose repository traffic to interception.",
      betterApproach:
        "Verify the certificate, hostname, chain, and approved CA trust configuration.",
    },
    {
      mistake: "Disabling SSH host-key checking",
      whyItIsWrong:
        "This removes protection against connecting to an unexpected SSH server.",
      betterApproach:
        "Verify the host-key fingerprint independently and update trusted configuration through the approved process.",
    },
    {
      mistake: "Rotating credentials without checking the error",
      whyItIsWrong:
        "The actual problem may be DNS, permissions, URL matching, TLS, or network connectivity.",
      betterApproach:
        "Use the exact error and provider audit logs to determine whether authentication is the failing stage.",
    },
    {
      mistake: "Testing only from a laptop",
      whyItIsWrong:
        "The laptop may use different credentials, DNS, proxy settings, routing, firewall rules, and certificate trust.",
      betterApproach:
        "Run diagnostics from the relevant runtime path or a controlled equivalent environment.",
    },
    {
      mistake: "Assuming HTTP 403 means an expired token",
      whyItIsWrong:
        "A valid credential can still lack repository access or violate organization policy.",
      betterApproach:
        "Check authorization, token scope, SSO, provider policies, and identity selection.",
    },
    {
      mistake: "Force-syncing after repository access returns",
      whyItIsWrong:
        "A successful connection does not prove the generated manifests or production changes are safe.",
      betterApproach:
        "Validate source retrieval, render manifests, review the diff, and follow the approved sync procedure.",
    },
    {
      mistake: "Printing or sharing all Secrets and environment variables",
      whyItIsWrong:
        "This can expose access tokens, private keys, passwords, and proxy credentials.",
      betterApproach:
        "Inspect narrow metadata and use redacted evidence. Keep secret values in approved secret-management systems.",
    },
    {
      mistake: "Treating every error as a Git server outage",
      whyItIsWrong:
        "An individual repository can fail because of its own URL, identity, permissions, or revision.",
      betterApproach:
        "Compare multiple repositories and group failures by host, identity, and timestamp.",
    },
  ],

  incidentReportTemplate: {
    incidentId: "<incident-id>",
    summary: "Argo CD repository connection failure",
    environment: "<development / staging / production>",
    affectedApplications: ["<application-name>"],
    repositoryHost: "<git-hostname>",
    firstObservedAt: "<timestamp-with-timezone>",
    detectedBy: "<alert / pipeline / user report>",
    severity: "<severity>",
    customerImpact: "<verified-impact>",
    errorMessage: "<redacted-exact-error>",
    recentChanges: [
      "<credential rotation>",
      "<certificate or DNS change>",
      "<network or proxy change>",
      "<repository migration>",
    ],
    evidenceCollected: [
      "<Application status>",
      "<repository connection status>",
      "<repo-server logs>",
      "<network or TLS diagnostics>",
      "<provider audit logs>",
    ],
    rootCause: "<evidence-supported-cause>",
    resolution: "<approved-change>",
    verification: [
      "<repository connection verified>",
      "<source retrieval verified>",
      "<manifest generation verified>",
      "<sync and health checked separately>",
    ],
    rollbackDecision: "<not-required / executed / planned>",
    preventionActions: [
      "<action, owner, due date>",
    ],
    lessonsLearned: "<what should change to prevent recurrence>",
  },

  runbook: {
    title: "Production Repository Connection Failure Runbook",
    steps: [
      "Acknowledge the alert and record the incident timestamp.",
      "Confirm the correct cluster, Argo CD namespace, and Application.",
      "Determine the impact and whether deployments are blocked.",
      "Capture Application status and the exact error.",
      "Check repository connection status.",
      "Inspect repo-server health, logs, and recent events.",
      "Classify the error as URL, DNS, network, TLS, authentication, authorization, revision, submodule, or repo-server related.",
      "Compare working and failing repositories.",
      "Check recent credential, network, DNS, certificate, proxy, and provider changes.",
      "Apply only an approved, evidence-based correction.",
      "Revalidate repository connection.",
      "Verify source retrieval and manifest rendering.",
      "Review the desired-state diff and follow the approved synchronization process.",
      "Verify application health and customer-facing service indicators.",
      "Document root cause, recovery evidence, and prevention actions.",
    ],
    exitCriteria: [
      "The repository is accessible with the intended identity.",
      "The intended revision can be retrieved.",
      "Manifest generation succeeds.",
      "Any required synchronization completes through the approved workflow.",
      "Application health and customer impact are verified.",
      "The incident report is complete.",
    ],
  },

  interviewQuestions: [
    {
      question: "What is an Argo CD repository connection error?",
      answer:
        "It means Argo CD cannot successfully access or retrieve the configured source. The underlying cause may be authentication, authorization, URL configuration, DNS, network connectivity, TLS, Git provider availability, or repo-server health.",
    },
    {
      question: "Which component commonly retrieves repository source?",
      answer:
        "The Argo CD repo-server is responsible for retrieving source content and generating manifests. The application controller coordinates reconciliation and interacts with the source-processing workflow.",
    },
    {
      question: "How do you start troubleshooting a repository failure?",
      answer:
        "Confirm the environment and Application, capture the exact error and timestamp, check repository status and repo-server logs, and classify the error before making changes.",
    },
    {
      question: "What does Permission denied (publickey) usually indicate?",
      answer:
        "SSH public-key authentication failed. Check the selected private-key credential, corresponding registered public key, repository permissions, URL, and key rotation history.",
    },
    {
      question: "What is the difference between HTTP 401 and HTTP 403?",
      answer:
        "HTTP 401 generally indicates an authentication problem, while HTTP 403 generally indicates an authorization or policy restriction. Provider behavior varies, so verify the provider's logs and policies.",
    },
    {
      question: "How do you troubleshoot an x509 certificate error?",
      answer:
        "Check the certificate's validity, hostname, certificate chain, and whether the correct CA is trusted by the relevant runtime environment. Never disable TLS verification as a shortcut.",
    },
    {
      question: "Why can a Git clone succeed from a laptop but fail in Argo CD?",
      answer:
        "The laptop and repo-server may use different credentials, DNS resolvers, proxy settings, network routes, firewall rules, and certificate trust stores.",
    },
    {
      question: "What does a repository timeout suggest?",
      answer:
        "It may indicate network routing, firewall, proxy, DNS, provider availability, or service latency. Test the relevant hostname and port from the appropriate runtime path.",
    },
    {
      question: "How do you distinguish repository failure from manifest generation failure?",
      answer:
        "Repository failure prevents source retrieval or revision access. Manifest generation failure occurs when source processing cannot produce valid desired manifests. Read the current error and diagnose the correct stage.",
    },
    {
      question: "What should you check if all repositories fail at once?",
      answer:
        "Investigate shared dependencies such as the Git provider, shared credentials, DNS, network egress, proxy, CA configuration, and repo-server health.",
    },
    {
      question: "Why is disabling TLS verification dangerous?",
      answer:
        "It weakens server identity verification and can expose repository communication to interception. The correct fix is to resolve certificate validity, hostname, or trust-chain problems.",
    },
    {
      question: "What is a repository credential template?",
      answer:
        "It allows matching repositories to use a shared credential configuration. Troubleshooting must verify that the repository URL matches the intended template and that the credential type is appropriate.",
    },
    {
      question: "How can private Git submodules cause failures?",
      answer:
        "The main repository may be accessible while a private submodule is not. Each required submodule URL and its authentication requirements must be validated.",
    },
    {
      question: "Should you restart repo-server immediately?",
      answer:
        "No. First collect evidence and identify whether the problem is component health, resource pressure, credentials, network, or repository configuration. Restart only when justified and approved.",
    },
    {
      question: "Does a successful repository connection guarantee a successful deployment?",
      answer:
        "No. Source retrieval, manifest rendering, synchronization, and application runtime health are separate stages and must be verified independently.",
    },
    {
      question: "How do you verify recovery?",
      answer:
        "Confirm repository access, retrieve the intended revision, generate manifests, review the desired-state diff, perform any required approved sync, and verify application health.",
    },
    {
      question: "What evidence belongs in a production incident report?",
      answer:
        "Include the timestamp, affected applications, redacted error messages, source and environment, diagnostics, recent changes, evidence-supported root cause, approved fix, verification, rollback decision, and prevention actions.",
    },
    {
      question: "How do you safely troubleshoot credentials?",
      answer:
        "Verify the configured identity and its permissions through approved tools. Avoid printing tokens or private keys, sharing raw Secret data, or putting credentials in command history.",
    },
    {
      question: "What should you do if a Git provider is unavailable?",
      answer:
        "Confirm the outage through provider status and independent diagnostics, assess deployment impact, escalate to the responsible team, and follow an approved emergency deployment process if needed.",
    },
    {
      question: "How do you prevent recurring repository failures?",
      answer:
        "Use credential lifecycle management, repository onboarding checks, TLS and DNS monitoring, controlled network changes, CI validation, alerting, tested runbooks, and incident reviews.",
    },
  ] satisfies RepositoryInterviewQuestion[],

  practicalExercises: [
    {
      title: "Exercise 1: Simulate a wrong repository URL",
      objective:
        "Learn to identify a URL problem without changing production configuration.",
      steps: [
        "Use a disposable test Application in a nonproduction environment.",
        "Configure an intentionally incorrect repository URL.",
        "Observe the Application and repository error.",
        "Compare the configured URL with the known-good repository URL.",
        "Correct the test configuration and verify access.",
      ],
      successCriteria:
        "The learner can identify the URL mismatch and explain why the error is not automatically an authentication failure.",
    },
    {
      title: "Exercise 2: Distinguish SSH authentication from network failure",
      objective:
        "Understand the difference between TCP reachability and SSH key authorization.",
      steps: [
        "Use a test repository and approved test identity.",
        "Check SSH port reachability.",
        "Test access with the intended approved key.",
        "Compare the outputs for a network failure and an authentication failure.",
        "Restore the correct test credential.",
      ],
      successCriteria:
        "The learner can explain why an open SSH port does not prove that repository authentication works.",
    },
    {
      title: "Exercise 3: Diagnose a private CA issue",
      objective:
        "Understand TLS trust-chain errors.",
      steps: [
        "Use a nonproduction Git endpoint with a controlled certificate configuration.",
        "Inspect the certificate chain and hostname.",
        "Compare the result with the approved CA trust configuration.",
        "Apply the documented CA configuration method in the test environment.",
        "Verify certificate validation without disabling verification.",
      ],
      successCriteria:
        "The learner can distinguish certificate trust problems from DNS, TCP, and credential failures.",
    },
    {
      title: "Exercise 4: Separate connection and rendering errors",
      objective:
        "Avoid treating every Application error as a repository outage.",
      steps: [
        "Confirm that a test repository is accessible.",
        "Introduce an invalid Helm value or Kustomize reference in a test branch.",
        "Observe the manifest generation error.",
        "Restore the valid configuration and compare the error stages.",
      ],
      successCriteria:
        "The learner can identify that repository access may succeed while manifest generation fails.",
    },
  ],

  productionBestPractices: [
    "Use least-privilege identities for repository access.",
    "Store credentials only in approved secret-management systems.",
    "Never commit tokens, passwords, or private keys.",
    "Do not expose secret values while collecting logs or command output.",
    "Verify the target environment before any mutating operation.",
    "Use read-only diagnostics before making production changes.",
    "Change one variable at a time when practical.",
    "Prefer reversible, reviewed changes.",
    "Do not disable TLS verification or SSH host-key checking.",
    "Do not force-sync simply because repository connectivity has returned.",
    "Use the current error to choose the next diagnostic step.",
    "Check source retrieval, rendering, sync, and runtime health separately.",
    "Record timestamps and correlate them with change history.",
    "Escalate security-sensitive host-key or unexpected certificate changes.",
    "Validate the fix from the relevant runtime network path.",
  ],

  summary: [
    "Repository connection failures can originate from configuration, credentials, permissions, DNS, networking, TLS, Git provider availability, or repo-server health.",
    "The exact error message and the environment from which the request fails are essential evidence.",
    "A successful test from a developer workstation does not prove that repo-server can reach the same repository.",
    "Fix the demonstrated root cause rather than applying broad changes.",
    "Never expose secrets or bypass TLS and SSH host verification.",
    "Verify repository access, source retrieval, rendering, synchronization, and application health as separate stages.",
    "Use incident reports, monitoring, runbooks, and credential lifecycle controls to prevent recurrence.",
  ],
} satisfies {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  description: string;
  overview: {
    whatIsTheProblem: string;
    importantDistinction: string;
    commonErrorMessages: string[];
    systemFlow: string[];
    architectureComponents: {
      component: string;
      responsibility: string;
    }[];
    keyPrinciple: string;
  };
  learningObjectives: string[];
  prerequisites: string[];
  incidentSeverity: {
    level: string;
    examples: string[];
    response: string;
  }[];
  productionWorkflow: {
    step: number;
    name: string;
    actions: string[];
    decision: string;
  }[];
  diagnostics: RepositoryDiagnostic[];
  rootCauses: RepositoryRootCause[];
  incidentScenarios: RepositoryIncidentScenario[];
  troubleshootingDecisionTree: {
    observation: string;
    likelyAreas: string[];
    nextAction: string;
  }[];
  safeRecoveryProcedure: {
    step: number;
    action: string;
    details: string;
  }[];
  verificationChecklist: string[];
  prevention: {
    area: string;
    actions: string[];
  }[];
  commonMistakes: {
    mistake: string;
    whyItIsWrong: string;
    betterApproach: string;
  }[];
  incidentReportTemplate: {
    incidentId: string;
    summary: string;
    environment: string;
    affectedApplications: string[];
    repositoryHost: string;
    firstObservedAt: string;
    detectedBy: string;
    severity: string;
    customerImpact: string;
    errorMessage: string;
    recentChanges: string[];
    evidenceCollected: string[];
    rootCause: string;
    resolution: string;
    verification: string[];
    rollbackDecision: string;
    preventionActions: string[];
    lessonsLearned: string;
  };
  runbook: {
    title: string;
    steps: string[];
    exitCriteria: string[];
  };
  interviewQuestions: RepositoryInterviewQuestion[];
  practicalExercises: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string;
  }[];
  productionBestPractices: string[];
  summary: string[];
};

export default repositoryConnectionErrorGuide;
