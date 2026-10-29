
export interface DependencyDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  interpretResults: string[];
  nextDecision: string;
  safetyNote?: string;
}

export interface DependencyFailureCase {
  id: string;
  title: string;
  symptoms: string[];
  likelyCauses: string[];
  diagnosticSteps: string[];
  resolution: string[];
  validation: string[];
  prevention: string[];
}

export interface DependencyProductionIncident {
  title: string;
  severity: string;
  scenario: string;
  impact: string[];
  immediateActions: string[];
  investigation: string[];
  recovery: string[];
  closureCriteria: string[];
}

export interface HelmDependencyFetchFailureGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  overview: string;
  objectives: string[];
  incidentWorkflow: DependencyDiagnosticStep[];
  failureCases: DependencyFailureCase[];
  productionIncidents: DependencyProductionIncident[];
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

export const dependencyFetchFailureGuide: HelmDependencyFetchFailureGuide = {
  title: "Helm Dependency Fetch Failures",
  slug: "dependency-fetch-failure",
  category: "Helm",
  difficulty: "Advanced",

  overview: `
Helm charts can depend on other charts. Those dependencies may be downloaded
from traditional Helm repositories or OCI registries, or supplied as local
chart archives and directories.

Dependency-fetch failures can block CI pipelines before any Kubernetes
resources are changed. However, an incident may occur inside a larger
deployment pipeline after earlier steps have already changed infrastructure
or application state.

Common causes include unavailable repositories, DNS failures, TLS certificate
problems, expired credentials, proxy configuration, incorrect chart versions,
missing dependencies, invalid repository URLs, stale metadata, incompatible
Chart.yaml and Chart.lock files, registry rate limits, and CI cache problems.

The key distinction is whether the failure occurred while:
- Resolving dependency metadata.
- Downloading a dependency archive.
- Authenticating to a repository or OCI registry.
- Verifying or unpacking a downloaded chart.
- Building a chart package.
- Rendering or deploying the parent chart.

Do not assume that a failed dependency command means the entire deployment
pipeline had no side effects.

Production workflow:
incident assessment -> safety checks -> evidence collection -> network and
repository diagnosis -> dependency/version/lock validation -> root-cause isolation
-> controlled recovery -> clean-build verification -> prevention and reporting.
`,

  objectives: [
    "Troubleshoot helm dependency update and helm dependency build failures.",
    "Distinguish traditional Helm repositories from OCI registries.",
    "Diagnose DNS, TLS, proxy, firewall, authentication, and authorization failures.",
    "Understand Chart.yaml, Chart.lock, dependency versions, aliases, and repositories.",
    "Investigate CI-only failures, cache corruption, and non-reproducible builds.",
    "Recover without accidentally changing approved dependency versions.",
    "Verify downloaded chart artifacts and dependency provenance.",
    "Build repeatable dependency validation into CI/CD.",
    "Create production incident reports, runbooks, and prevention controls."
  ],

  incidentWorkflow: [
    {
      id: "01",
      title: "Establish the incident and deployment boundary",
      objective:
        "Identify the failed command, environment, pipeline stage, and any changes already made.",
      commands: [
        "date -Is",
        "helm version",
        "git status --short",
        "git rev-parse HEAD",
        "git log -5 --oneline",
        "helm repo list"
      ],
      interpretResults: [
        "Capture the pipeline run ID, commit SHA, chart directory, failed command, exact error, and timestamp.",
        "Identify whether the failure occurred during helm dependency update, helm dependency build, chart packaging, or deployment.",
        "Record the Helm version and runner image because different environments may behave differently.",
        "Inspect Git changes to Chart.yaml, Chart.lock, repositories configuration, CI files, and dependency archives.",
        "Check whether an earlier pipeline stage already deployed infrastructure or changed application state.",
        "Determine whether the problem affects one chart, one repository, one runner, or multiple teams."
      ],
      nextDecision:
        "If production impact exists, coordinate with the incident owner and release approver. If the issue is isolated to a build stage, preserve evidence before changing dependency metadata or caches.",
      safetyNote:
        "Do not upgrade dependency versions or rerun the entire production pipeline until the failed stage and any earlier side effects are understood."
    },
    {
      id: "02",
      title: "Assess impact and severity",
      objective:
        "Determine whether releases are blocked and whether the failure is widespread.",
      commands: [
        "helm dependency list ./<chart-directory>",
        "git status --short",
        "git diff -- Chart.yaml Chart.lock",
        "git diff -- .github/workflows/",
        "helm list -n <namespace> --all"
      ],
      interpretResults: [
        "If no deployment command was reached, Kubernetes workloads may be unaffected even though delivery is blocked.",
        "If the pipeline deploys multiple components, establish which components completed before the failure.",
        "A missing dependency may affect all builds that consume a shared parent chart.",
        "A repository outage may affect many projects simultaneously, while a single version error may affect only one chart.",
        "Check whether an existing deployed application remains healthy; do not confuse a blocked new release with a current service outage."
      ],
      nextDecision:
        "Classify severity using customer impact, release criticality, number of affected services, and availability of a known-good artifact.",
      safetyNote:
        "Do not uninstall a deployed release merely because the next chart build cannot download dependencies."
    },
    {
      id: "03",
      title: "Preserve evidence and reproduce the exact command",
      objective:
        "Avoid changing the evidence before identifying the original failure.",
      commands: [
        "helm version",
        "helm env",
        "helm dependency list ./<chart-directory>",
        "git status --short",
        "git diff -- Chart.yaml Chart.lock",
        "env | grep -Ei '^(HTTP_PROXY|HTTPS_PROXY|NO_PROXY|HELM_)='"
      ],
      interpretResults: [
        "Capture the full error and relevant log lines around the first failure, not only the final pipeline exit message.",
        "Compare Helm versions, working directories, proxy settings, environment variables, and repository configuration between local and CI environments.",
        "helm env reports Helm-related environment configuration; it does not replace inspection of every operating-system, network, or CI setting.",
        "On Windows, use PowerShell equivalents such as Get-ChildItem Env: and Get-Location.",
        "Do not print all environment variables into public logs because they may contain credentials.",
        "Record whether the runner uses a clean checkout, a restored cache, or a prebuilt chart package."
      ],
      nextDecision:
        "Reproduce the exact dependency command in a controlled workspace. Change one suspected variable at a time so the evidence distinguishes causes.",
      safetyNote:
        "Redact tokens, authorization headers, passwords, private repository URLs when sensitive, and Secret values from incident logs."
    },
    {
      id: "04",
      title: "Validate dependency declarations and lock file",
      objective:
        "Determine whether the parent chart requests a valid, reproducible dependency set.",
      commands: [
        "helm dependency list ./<chart-directory>",
        "helm show chart <repository>/<dependency-chart> --version <version>",
        "git diff -- Chart.yaml Chart.lock",
        "git status --short"
      ],
      interpretResults: [
        "Inspect dependencies in Chart.yaml, including name, version, repository, alias, and optional condition or tags.",
        "Confirm that the requested version exists in the configured source.",
        "Chart.lock records the resolved dependency set and digest for a dependency build.",
        "A mismatch between Chart.yaml and Chart.lock can require an intentional dependency update.",
        "A lock file should not be edited manually to make a build appear successful.",
        "If the chart uses local file:// dependencies, verify the referenced directory exists relative to the chart."
      ],
      nextDecision:
        "If the dependency declaration is incorrect, fix it in source control. If the lock file is stale, regenerate it deliberately, review the diff, and commit the approved result.",
      safetyNote:
        "Do not run helm dependency update and commit the resulting version changes blindly during a production incident."
    },
    {
      id: "05",
      title: "Test repository reachability and metadata",
      objective:
        "Find out whether the configured chart repository is reachable and serves the requested version.",
      commands: [
        "helm repo list",
        "helm repo update",
        "curl -I <repository-url>",
        "nslookup <repository-host>",
        "getent hosts <repository-host>"
      ],
      interpretResults: [
        "Use the DNS command available on the runner; getent is commonly available on Linux, while nslookup may be used on Windows or Linux.",
        "A DNS failure suggests name resolution or network configuration rather than an incorrect chart template.",
        "HTTP 401 or 403 points toward authentication or authorization, subject to repository-specific behavior.",
        "HTTP 404 may indicate an incorrect URL, missing artifact, or unavailable version.",
        "HTTP 429 suggests rate limiting; HTTP 5xx can indicate a repository or upstream outage.",
        "A successful HTTP HEAD request does not prove Helm can retrieve repository metadata or download the chart archive.",
        "Some repositories require authentication, so a bare curl command may not reproduce Helm's actual access."
      ],
      nextDecision:
        "If the host is unreachable, investigate DNS, routing, firewall, proxy, and service health. If reachable, inspect repository metadata and the exact dependency version.",
      safetyNote:
        "Use approved credential handling when testing authenticated endpoints. Never add tokens directly to shell history or shared logs."
    },
    {
      id: "06",
      title: "Differentiate traditional Helm repositories from OCI registries",
      objective:
        "Use the right diagnostic path for the dependency source type.",
      commands: [
        "helm repo list",
        "helm show chart <repository-alias>/<chart> --version <version>",
        "helm show chart oci://<registry>/<path>/<chart> --version <version>",
        "helm registry list"
      ],
      interpretResults: [
        "Traditional Helm repositories generally provide an index.yaml and chart archives.",
        "OCI chart references use OCI registry paths and authentication rather than the same repository-alias workflow.",
        "A traditional helm repo add command is not the right way to configure an OCI chart reference.",
        "OCI authentication may use registry login credentials and registry permissions.",
        "Private registry proxies, repository mirrors, and organization-specific gateways may add their own authorization or TLS requirements.",
        "The exact command support and flags depend on the installed Helm version."
      ],
      nextDecision:
        "Classify the source first, then verify its URL format, authentication method, artifact path, and pinned version using the appropriate Helm commands.",
      safetyNote:
        "Do not switch a production dependency from a private registry to a public source as an unreviewed workaround."
    },
    {
      id: "07",
      title: "Investigate authentication and authorization",
      objective:
        "Determine whether the build identity can read the required chart artifact.",
      commands: [
        "helm repo list",
        "helm registry list",
        "helm show chart <repository>/<chart> --version <version>",
        "helm show chart oci://<registry>/<path>/<chart> --version <version>"
      ],
      interpretResults: [
        "Check whether a repository token or registry credential expired or was rotated.",
        "Compare the CI identity with the local identity; local success does not prove that CI has equivalent access.",
        "A login can succeed while the identity still lacks permission to pull a particular repository or artifact.",
        "Repository-specific access control may distinguish listing artifacts from downloading a particular version.",
        "Inspect secret-injection and credential-binding steps in CI without printing the secret value.",
        "Check whether a recent security change revoked the pipeline identity or changed repository permissions."
      ],
      nextDecision:
        "Restore the approved identity or minimal read permission. Retry the exact artifact retrieval before rerunning the full deployment.",
      safetyNote:
        "Do not use personal administrator credentials as a permanent CI workaround. Rotate exposed credentials immediately according to policy."
    },
    {
      id: "08",
      title: "Diagnose TLS, proxy, firewall, and DNS problems",
      objective:
        "Separate network transport failures from repository and chart errors.",
      commands: [
        "nslookup <repository-host>",
        "curl -Iv <repository-url>",
        "env | grep -Ei '^(HTTP_PROXY|HTTPS_PROXY|NO_PROXY)='",
        "helm env"
      ],
      interpretResults: [
        "Certificate expiration, unknown certificate authority, or hostname mismatch suggests a TLS trust or endpoint configuration issue.",
        "A corporate proxy may work on the host but not inside a containerized CI runner.",
        "NO_PROXY may need the correct registry hostname or internal domain; an overly broad bypass can create security or connectivity problems.",
        "DNS resolution can differ between the runner, container, cluster, and developer workstation.",
        "A connection timeout suggests routing, firewall, proxy, or unavailable service, but requires evidence to distinguish them.",
        "TLS verification should not be disabled merely to make a dependency download succeed."
      ],
      nextDecision:
        "Repair the demonstrated DNS, proxy, firewall, or certificate trust problem. Retest from the same runner environment where the failure occurred.",
      safetyNote:
        "Do not use insecure TLS flags as a production fix. Follow the organization's certificate and network-security process."
    },
    {
      id: "09",
      title: "Check dependency cache, workspace, and package integrity",
      objective:
        "Determine whether a stale or incomplete local artifact is causing inconsistent builds.",
      commands: [
        "pwd",
        "ls -la ./<chart-directory>",
        "find ./<chart-directory>/charts -maxdepth 1 -type f -print",
        "sha256sum ./<chart-directory>/Chart.lock",
        "git status --short"
      ],
      interpretResults: [
        "A missing charts directory may be normal before dependencies are downloaded.",
        "Unexpected chart archives can indicate a stale workspace or cache.",
        "A cached artifact may be from an older dependency version or a different branch.",
        "A partial download may cause archive or extraction errors.",
        "A changed Chart.lock hash is evidence of file change, not proof that the dependency artifact is authentic.",
        "Commands such as find and sha256sum are Linux examples; use appropriate equivalents on Windows."
      ],
      nextDecision:
        "Reproduce in a fresh disposable checkout. If the clean build succeeds, inspect cache keys and workspace reuse before invalidating shared caches.",
      safetyNote:
        "Do not delete a shared cache used by active pipelines without assessing the impact. Preserve the failing workspace and logs when possible."
    },
    {
      id: "10",
      title: "Run the correct dependency recovery command",
      objective:
        "Restore dependencies without unintentionally changing the approved version set.",
      commands: [
        "helm dependency list ./<chart-directory>",
        "helm dependency build ./<chart-directory>",
        "helm dependency update ./<chart-directory>",
        "git diff -- ./<chart-directory>/Chart.yaml ./<chart-directory>/Chart.lock"
      ],
      interpretResults: [
        "helm dependency build reconstructs dependencies from Chart.lock when the lock file is present.",
        "helm dependency update resolves dependencies and can update Chart.lock to a newly resolved dependency set.",
        "A successful build proves dependency retrieval completed for that invocation, but not that the parent chart will render or deploy successfully.",
        "Review downloaded dependency archives and generated lock-file changes.",
        "Use a clean workspace to avoid confusing new artifacts with stale files."
      ],
      nextDecision:
        "Prefer dependency build for a reproducible locked dependency set. Use dependency update only when intentionally resolving or updating dependencies and reviewing the resulting changes.",
      safetyNote:
        "Run mutating dependency commands in a branch or disposable workspace first. Do not overwrite the production release artifact without review."
    },
    {
      id: "11",
      title: "Validate the parent chart after dependencies are fetched",
      objective:
        "Ensure the problem is actually resolved and no later stage fails.",
      commands: [
        "helm dependency list ./<chart-directory>",
        "helm lint ./<chart-directory>",
        "helm template <release> ./<chart-directory> -n <namespace> -f values.yaml",
        "helm package ./<chart-directory> --destination ./dist"
      ],
      interpretResults: [
        "Confirm every required dependency is present at the intended version.",
        "helm lint can find chart issues but does not guarantee cluster compatibility.",
        "helm template checks rendering with the selected values but does not prove server-side admission will succeed.",
        "Packaging should produce the intended chart artifact and include its dependencies.",
        "Compare the package identity and dependency versions with the release pipeline's expected artifact."
      ],
      nextDecision:
        "Only continue to deployment after the clean dependency build, lint, rendering, and package checks pass. Then follow normal environment approvals.",
      safetyNote:
        "Do not use a successful local render as permission to bypass production change approval."
    },
    {
      id: "12",
      title: "Close the incident and prevent recurrence",
      objective:
        "Document the verified root cause and introduce controls that prevent another dependency outage.",
      commands: [
        "git diff -- Chart.yaml Chart.lock",
        "git status --short",
        "helm dependency list ./<chart-directory>",
        "helm lint ./<chart-directory>"
      ],
      interpretResults: [
        "Record the exact failure class: DNS, TLS, auth, version, metadata, lock file, cache, or package integrity.",
        "Document which tests passed and which were not run.",
        "Confirm the resulting dependency versions match the approved release.",
        "Capture the final artifact identity and pipeline run ID.",
        "Assign owners and due dates to prevention actions."
      ],
      nextDecision:
        "Close only after the pipeline has a reproducible dependency set, the intended artifact is available, and the release owner confirms the incident impact is resolved.",
      safetyNote:
        "Do not report the incident as fixed solely because a retry happened to succeed; record the evidence supporting the root cause."
    }
  ],

  failureCases: [
    {
      id: "HDF-01",
      title: "Repository URL is incorrect or unavailable",
      symptoms: [
        "Helm cannot fetch repository metadata.",
        "Dependency download returns 404 or connection errors.",
        "Multiple charts using the same repository fail."
      ],
      likelyCauses: [
        "Incorrect repository URL or alias.",
        "Repository service outage.",
        "Wrong artifact path.",
        "Repository migration or DNS change."
      ],
      diagnosticSteps: [
        "Inspect helm repo list and Chart.yaml.",
        "Test DNS and HTTPS from the failing runner.",
        "Request the exact chart metadata or version.",
        "Compare the configured endpoint with the approved repository documentation.",
        "Check whether other pipelines using the same source are failing."
      ],
      resolution: [
        "Correct the URL or alias.",
        "Restore repository service or network connectivity.",
        "Use the approved mirror if the primary source is unavailable.",
        "Keep the requested chart version pinned."
      ],
      validation: [
        "The exact chart version can be retrieved from the expected source.",
        "helm dependency build succeeds in a clean workspace.",
        "The resulting dependency set matches Chart.lock."
      ],
      prevention: [
        "Monitor repository availability.",
        "Document repository ownership and failover.",
        "Use pinned dependency versions and controlled mirrors."
      ]
    },
    {
      id: "HDF-02",
      title: "Authentication or authorization failure",
      symptoms: [
        "Helm reports 401 or 403.",
        "Local download succeeds but CI fails.",
        "Only private dependencies fail."
      ],
      likelyCauses: [
        "Expired token.",
        "Missing CI credential binding.",
        "Insufficient artifact-read permission.",
        "Registry credential rotation."
      ],
      diagnosticSteps: [
        "Identify the repository type and exact failing request.",
        "Confirm the identity used by the CI job.",
        "Inspect credential binding configuration without printing secret values.",
        "Verify the identity has read access to the specific artifact.",
        "Review recent token rotation and access-policy changes."
      ],
      resolution: [
        "Restore the approved credential binding.",
        "Renew or rotate credentials using the standard secret-management process.",
        "Grant minimal artifact-read access.",
        "Retry artifact retrieval before rerunning the deployment."
      ],
      validation: [
        "The CI identity downloads the exact dependency.",
        "Credentials are not exposed in logs.",
        "No unnecessary permissions were granted."
      ],
      prevention: [
        "Use managed CI credentials.",
        "Monitor token expiry and rotation.",
        "Test repository access in a protected pipeline stage."
      ]
    },
    {
      id: "HDF-03",
      title: "Chart version does not exist",
      symptoms: [
        "The requested chart version cannot be found.",
        "Dependency update fails for one dependency.",
        "The repository lists other versions but not the pinned one."
      ],
      likelyCauses: [
        "Typo in dependency version.",
        "Version was never published.",
        "Artifact was removed or repository retention changed.",
        "Incorrect repository or chart name."
      ],
      diagnosticSteps: [
        "Read the dependency entry in Chart.yaml.",
        "Query the configured source for the exact chart version.",
        "Compare with the last successful Chart.lock.",
        "Inspect recent dependency changes in Git history.",
        "Check repository retention or artifact publication logs."
      ],
      resolution: [
        "Correct the version if it was a typo.",
        "Republish the approved artifact through the normal release process if it is missing.",
        "Choose another version only after compatibility and security review.",
        "Regenerate Chart.lock deliberately when the dependency set changes."
      ],
      validation: [
        "The requested version is retrievable.",
        "The lock file and dependency declaration agree.",
        "The parent chart renders with the selected version."
      ],
      prevention: [
        "Verify artifacts before merging dependency updates.",
        "Retain release artifacts according to policy.",
        "Review chart-version changes in code review."
      ]
    },
    {
      id: "HDF-04",
      title: "Chart.lock is stale or inconsistent",
      symptoms: [
        "Dependency build reports a lock mismatch.",
        "Local and CI dependency versions differ.",
        "A clean build fails after a dependency declaration change."
      ],
      likelyCauses: [
        "Chart.yaml changed without updating the lock file.",
        "Lock file was generated from another dependency set.",
        "Merge conflict resolved incorrectly.",
        "Dependency update was not committed."
      ],
      diagnosticSteps: [
        "Inspect the dependency declarations in Chart.yaml.",
        "Review the lock file and Git diff.",
        "Compare the last known good commit.",
        "Run dependency list and build in a disposable checkout.",
        "Check whether the proposed update changes dependency versions."
      ],
      resolution: [
        "Restore the approved dependency declaration if the change was accidental.",
        "Run helm dependency update only when intentionally resolving the new dependency set.",
        "Review and commit the resulting lock-file changes.",
        "Rebuild from a clean checkout."
      ],
      validation: [
        "A clean checkout builds the locked dependencies.",
        "The dependency versions match the reviewed change.",
        "Linting and rendering succeed."
      ],
      prevention: [
        "Review Chart.yaml and Chart.lock together.",
        "Require dependency build validation in CI.",
        "Avoid manual lock-file editing."
      ]
    },
    {
      id: "HDF-05",
      title: "DNS, proxy, or firewall failure",
      symptoms: [
        "Connection timeout or host resolution failure.",
        "Downloads work on a developer laptop but not on the runner.",
        "Several external artifact sources fail at once."
      ],
      likelyCauses: [
        "DNS resolver issue.",
        "Proxy configuration missing from the runner.",
        "Firewall or egress rule change.",
        "Incorrect NO_PROXY configuration."
      ],
      diagnosticSteps: [
        "Check name resolution from the exact runner.",
        "Inspect sanitized proxy configuration.",
        "Test HTTPS reachability to the repository host.",
        "Compare runner network configuration with a known-good runner.",
        "Check network or proxy change records."
      ],
      resolution: [
        "Repair DNS, proxy, firewall, or egress settings.",
        "Configure the approved proxy and trust chain.",
        "Repeat the test from the same runner environment."
      ],
      validation: [
        "The repository hostname resolves correctly.",
        "The exact artifact download succeeds.",
        "Other required network controls remain enforced."
      ],
      prevention: [
        "Monitor repository reachability from CI runners.",
        "Document required egress endpoints.",
        "Test network changes before rollout."
      ]
    },
    {
      id: "HDF-06",
      title: "TLS certificate verification failure",
      symptoms: [
        "Certificate authority or hostname verification errors.",
        "The failure begins after certificate rotation.",
        "Only runners with an old trust store fail."
      ],
      likelyCauses: [
        "Expired certificate.",
        "Missing trusted CA certificate.",
        "Hostname mismatch.",
        "TLS interception or incomplete certificate chain."
      ],
      diagnosticSteps: [
        "Capture the exact TLS error.",
        "Inspect certificate validity and hostname using approved tools.",
        "Compare the runner trust store with the repository's expected CA.",
        "Check certificate rotation and proxy changes.",
        "Verify whether the endpoint is the expected trusted repository."
      ],
      resolution: [
        "Renew or correct the repository certificate.",
        "Install the approved CA through the standard trust-store process.",
        "Correct the hostname or endpoint configuration.",
        "Retest TLS verification normally."
      ],
      validation: [
        "The endpoint certificate validates successfully.",
        "The dependency downloads without insecure TLS bypasses.",
        "The resulting artifact is the expected chart."
      ],
      prevention: [
        "Monitor certificate expiry.",
        "Test CA rotations on CI runners.",
        "Never disable TLS verification as a permanent fix."
      ]
    },
    {
      id: "HDF-07",
      title: "OCI registry login or pull failure",
      symptoms: [
        "OCI dependency cannot be fetched.",
        "Traditional Helm repository commands do not resolve the source.",
        "Registry authentication succeeds but artifact pull fails."
      ],
      likelyCauses: [
        "Incorrect OCI reference.",
        "Missing registry login.",
        "Insufficient repository pull permission.",
        "Registry rate limit or unavailable artifact."
      ],
      diagnosticSteps: [
        "Confirm the dependency uses an OCI reference.",
        "Inspect helm version and registry configuration.",
        "Verify the exact artifact path and version.",
        "Test metadata retrieval using the OCI-specific Helm command.",
        "Review registry access logs where available."
      ],
      resolution: [
        "Correct the OCI reference.",
        "Restore approved registry authentication.",
        "Grant minimal pull access.",
        "Retry the exact version after the registry issue is resolved."
      ],
      validation: [
        "The exact OCI chart version can be retrieved.",
        "The parent chart builds dependencies successfully.",
        "The resulting artifact matches the approved dependency set."
      ],
      prevention: [
        "Document OCI registry paths and authentication.",
        "Pin chart versions.",
        "Monitor registry access failures."
      ]
    },
    {
      id: "HDF-08",
      title: "HTTP 429 rate limit or repository outage",
      symptoms: [
        "Intermittent dependency fetch failures.",
        "HTTP 429 or 5xx responses.",
        "Many parallel pipelines fail together."
      ],
      likelyCauses: [
        "Too many parallel downloads.",
        "Registry rate limits.",
        "Repository service degradation.",
        "Upstream dependency source outage."
      ],
      diagnosticSteps: [
        "Record response status and timestamps.",
        "Check whether failures correlate across projects.",
        "Inspect repository status and rate-limit information.",
        "Compare parallelism and retry patterns.",
        "Check whether a proxy or mirror is returning the error."
      ],
      resolution: [
        "Apply bounded retry with backoff where appropriate.",
        "Reduce unnecessary parallel downloads.",
        "Use an approved internal mirror or cache if available.",
        "Escalate persistent service failures to the repository owner."
      ],
      validation: [
        "The exact dependency fetch succeeds consistently.",
        "Retries are bounded and do not overload the repository.",
        "The dependency version remains unchanged."
      ],
      prevention: [
        "Use repository mirrors where approved.",
        "Monitor rate-limit responses.",
        "Avoid unbounded pipeline retries."
      ]
    },
    {
      id: "HDF-09",
      title: "Corrupted or stale dependency cache",
      symptoms: [
        "Build fails only on one runner.",
        "A clean checkout succeeds.",
        "Archive extraction or package validation fails intermittently."
      ],
      likelyCauses: [
        "Partial download.",
        "Cache key does not include dependency inputs.",
        "Workspace reused across branches.",
        "Old dependency archive remains in the charts directory."
      ],
      diagnosticSteps: [
        "Preserve the failing workspace and logs.",
        "Inspect charts directory contents and timestamps.",
        "Compare cache keys and branch inputs.",
        "Build dependencies in a fresh disposable checkout.",
        "Compare artifact checksums against a trusted source when available."
      ],
      resolution: [
        "Correct cache keys to include Chart.yaml, Chart.lock, and relevant build inputs.",
        "Remove only the affected disposable workspace or cache entry through the approved process.",
        "Re-fetch dependencies from the trusted source.",
        "Verify the resulting artifact."
      ],
      validation: [
        "Fresh and cached builds produce the same intended dependency set.",
        "Archive integrity checks succeed.",
        "The pipeline is repeatable."
      ],
      prevention: [
        "Use deterministic cache keys.",
        "Avoid sharing mutable workspaces between builds.",
        "Retain artifact provenance and checksums."
      ]
    },
    {
      id: "HDF-10",
      title: "Local file dependency path is invalid",
      symptoms: [
        "Helm cannot find a local dependency.",
        "A build works in one directory but fails in CI.",
        "The dependency directory is missing from the checkout."
      ],
      likelyCauses: [
        "Incorrect file:// path.",
        "Relative path resolved from an unexpected chart directory.",
        "Submodule or generated dependency not checked out.",
        "Case-sensitive path mismatch."
      ],
      diagnosticSteps: [
        "Inspect the dependency repository field in Chart.yaml.",
        "Check the actual chart directory and relative path.",
        "Verify submodules or generated artifacts are available.",
        "Reproduce from a clean checkout using the CI working directory.",
        "Check path case and runner operating system."
      ],
      resolution: [
        "Correct the relative file:// path.",
        "Ensure required source directories are present in CI.",
        "Make path handling consistent across supported environments."
      ],
      validation: [
        "A clean checkout resolves the local dependency.",
        "Dependency build and rendering succeed.",
        "No untracked local-only file is required."
      ],
      prevention: [
        "Test local dependencies in clean CI workspaces.",
        "Document monorepo chart layout.",
        "Avoid undocumented developer-machine paths."
      ]
    },
    {
      id: "HDF-11",
      title: "Dependency archive or package integrity failure",
      symptoms: [
        "Downloaded archive cannot be extracted.",
        "Chart metadata is invalid.",
        "The artifact differs between downloads."
      ],
      likelyCauses: [
        "Interrupted download.",
        "Corrupted repository artifact.",
        "Incorrect content served by a proxy.",
        "Untrusted or replaced artifact."
      ],
      diagnosticSteps: [
        "Record the exact artifact version and source.",
        "Re-fetch in a clean workspace.",
        "Inspect archive integrity using approved archive tools.",
        "Compare checksums or provenance with trusted published metadata.",
        "Check repository and proxy logs for unexpected content."
      ],
      resolution: [
        "Remove the bad artifact from the trusted source through the repository owner's process.",
        "Republish the verified chart using the approved release workflow.",
        "Re-fetch and verify the artifact.",
        "Investigate potential supply-chain compromise when evidence warrants it."
      ],
      validation: [
        "The archive can be opened and inspected.",
        "The chart metadata and expected version are correct.",
        "Provenance or checksum verification succeeds where configured."
      ],
      prevention: [
        "Use trusted repositories and immutable artifact versions.",
        "Verify chart provenance when supported by the release process.",
        "Restrict artifact publishing permissions."
      ]
    },
    {
      id: "HDF-12",
      title: "Helm version or runner environment mismatch",
      symptoms: [
        "Dependency commands behave differently locally and in CI.",
        "A flag or chart reference is unsupported on one runner.",
        "One runner consistently fails while another succeeds."
      ],
      likelyCauses: [
        "Different Helm versions.",
        "Different OS or shell behavior.",
        "Different trust stores or proxy settings.",
        "Different dependency cache and repository configuration."
      ],
      diagnosticSteps: [
        "Capture helm version on every environment.",
        "Compare runner image and OS.",
        "Compare sanitized Helm and proxy configuration.",
        "Reproduce with the same pinned toolchain.",
        "Inspect changes to the runner image or build container."
      ],
      resolution: [
        "Pin an approved Helm version.",
        "Align runner images and required CA certificates.",
        "Correct shell and path assumptions.",
        "Re-run the dependency build in a clean, consistent environment."
      ],
      validation: [
        "Local and CI dependency builds use the approved toolchain.",
        "The same locked dependency set is produced.",
        "The pipeline passes from a clean checkout."
      ],
      prevention: [
        "Pin Helm and runner image versions.",
        "Test toolchain upgrades separately.",
        "Record tool versions in build logs."
      ]
    }
  ],

  productionIncidents: [
    {
      title: "Incident A: Production release blocked by shared chart repository outage",
      severity: "SEV-2 or SEV-3 based on release criticality",
      scenario:
        "Several CI pipelines suddenly fail to fetch the same private Helm dependency. Existing applications remain healthy, but approved releases cannot proceed.",
      impact: [
        "Multiple releases are blocked.",
        "Existing deployments may remain healthy.",
        "Repeated retries can increase repository load."
      ],
      immediateActions: [
        "Pause uncontrolled retries.",
        "Confirm whether current production workloads are affected.",
        "Record failing repository, dependency version, response code, and timestamps.",
        "Identify other affected pipelines and notify the repository owner."
      ],
      investigation: [
        "Check DNS and HTTPS from the failing runners.",
        "Distinguish repository outage from authentication and rate-limit failures.",
        "Check repository service health and recent configuration changes.",
        "Determine whether a trusted internal mirror contains the exact approved artifact."
      ],
      recovery: [
        "Restore repository service or approved network access.",
        "Use an approved mirror only if artifact identity and version can be verified.",
        "Build dependencies in a clean workspace.",
        "Resume releases through the normal approval process."
      ],
      closureCriteria: [
        "The exact dependency is retrievable.",
        "Affected pipelines pass dependency validation.",
        "The repository owner confirms recovery.",
        "Monitoring or failover actions are assigned."
      ]
    },
    {
      title: "Incident B: CI fails because Chart.lock does not match Chart.yaml",
      severity: "SEV-3 unless a critical release is blocked",
      scenario:
        "A dependency declaration changed in a pull request but the lock file was not updated or reviewed.",
      impact: [
        "Builds are not reproducible.",
        "Different developers may resolve different dependency sets.",
        "An unreviewed dependency upgrade could reach a release."
      ],
      immediateActions: [
        "Stop the affected release candidate.",
        "Inspect the Git diff for both dependency files.",
        "Identify the last known approved dependency set."
      ],
      investigation: [
        "Review the dependency name, repository, and version changes.",
        "Run dependency list and build in a disposable checkout.",
        "Determine whether the intended change was a version update or an accidental edit.",
        "Review dependency security and compatibility requirements."
      ],
      recovery: [
        "Restore the approved declaration if the change was accidental.",
        "Otherwise update dependencies deliberately and review the lock-file diff.",
        "Commit the consistent dependency files and rerun CI."
      ],
      closureCriteria: [
        "Chart.yaml and Chart.lock are consistent.",
        "The dependency versions are reviewed and approved.",
        "A clean build and chart validation pass."
      ]
    },
    {
      title: "Incident C: Only Jenkins fails to download a private dependency",
      severity: "SEV-2 or SEV-3",
      scenario:
        "Developers can build the chart locally, but Jenkins cannot download a private chart after a credential rotation.",
      impact: [
        "Automated deployments are blocked.",
        "Manual builds may not represent the CI identity or environment."
      ],
      immediateActions: [
        "Capture the Jenkins error and identify the failed repository.",
        "Confirm the pipeline identity without printing credentials.",
        "Pause any manual production workaround."
      ],
      investigation: [
        "Inspect Jenkins credential binding and secret rotation history.",
        "Verify the identity has artifact-read access.",
        "Check whether the runner uses the correct Helm repository or OCI registry configuration.",
        "Inspect proxy and certificate differences between Jenkins and local environments."
      ],
      recovery: [
        "Repair the approved credential binding or minimal repository permission.",
        "Test the exact dependency fetch from the Jenkins runner.",
        "Run the normal validation pipeline before deployment."
      ],
      closureCriteria: [
        "Jenkins retrieves the pinned dependency.",
        "Credentials remain protected.",
        "The release completes through the approved workflow."
      ]
    },
    {
      title: "Incident D: Dependency update unexpectedly changes versions",
      severity: "SEV-2 if a production release is at risk",
      scenario:
        "An engineer runs helm dependency update during an incident and the lock file changes to a different dependency set.",
      impact: [
        "The build may no longer match the tested artifact.",
        "New dependency behavior or vulnerabilities may be introduced.",
        "Rollback and reproducibility become harder."
      ],
      immediateActions: [
        "Stop packaging or deployment of the unreviewed artifact.",
        "Inspect the Chart.lock and charts directory changes.",
        "Compare dependency versions with the last approved commit."
      ],
      investigation: [
        "Identify which versions changed and why.",
        "Determine whether repository metadata or version constraints allowed a new resolution.",
        "Check whether the new dependency set was tested and approved.",
        "Inspect the build artifact identity."
      ],
      recovery: [
        "Restore the approved lock file if the change was unintended.",
        "Rebuild using helm dependency build from the approved lock file.",
        "If the update was intentional, review and test it as a new dependency change."
      ],
      closureCriteria: [
        "The release uses an approved dependency set.",
        "The resulting package is reproducible.",
        "Any intended version change has completed review and validation."
      ]
    }
  ],

  commandReference: [
    {
      title: "Dependency and lock-file inspection",
      commands: [
        "helm dependency list ./<chart-directory>",
        "helm dependency build ./<chart-directory>",
        "helm dependency update ./<chart-directory>",
        "git diff -- Chart.yaml Chart.lock",
        "git status --short"
      ],
      warning:
        "dependency update can resolve and write a new lock file. Use it deliberately and review every dependency change."
    },
    {
      title: "Traditional Helm repository",
      commands: [
        "helm repo list",
        "helm repo update",
        "helm show chart <repository-alias>/<chart> --version <version>",
        "curl -I <repository-url>"
      ],
      warning:
        "A repository metadata update does not guarantee that every artifact is available. Authenticated repositories may require a credential-aware test."
    },
    {
      title: "OCI registry",
      commands: [
        "helm registry list",
        "helm show chart oci://<registry>/<path>/<chart> --version <version>"
      ],
      warning:
        "OCI authentication and access depend on the registry. Do not substitute a traditional repository alias for an OCI reference."
    },
    {
      title: "Network and environment",
      commands: [
        "helm version",
        "helm env",
        "nslookup <repository-host>",
        "curl -Iv <repository-url>",
        "env | grep -Ei '^(HTTP_PROXY|HTTPS_PROXY|NO_PROXY)='"
      ],
      warning:
        "Linux examples may need PowerShell equivalents on Windows. Sanitize output and do not expose tokens or secret environment variables."
    },
    {
      title: "Validate and package the parent chart",
      commands: [
        "helm lint ./<chart-directory>",
        "helm template <release> ./<chart-directory> -n <namespace> -f values.yaml",
        "helm package ./<chart-directory> --destination ./dist"
      ],
      warning:
        "Run validation in a controlled workspace. Successful rendering does not guarantee successful admission or application startup in Kubernetes."
    }
  ],

  recoveryRunbook: [
    "1. Declare the incident and record the affected pipeline, repository, dependency, chart, and timestamp.",
    "2. Determine whether the failure blocked a build only or occurred after earlier deployment changes.",
    "3. Preserve the original error, pipeline logs, tool version, Git diff, and sanitized environment details.",
    "4. Confirm the source type: traditional Helm repository, OCI registry, or local file dependency.",
    "5. Inspect Chart.yaml, Chart.lock, dependency list, and recent dependency changes.",
    "6. Test DNS, TLS, proxy, authentication, authorization, and exact artifact availability from the failing runner.",
    "7. Distinguish the verified failure class before changing versions, caches, credentials, or repository configuration.",
    "8. Fix only the demonstrated cause using the approved source-control, network, or access process.",
    "9. Prefer helm dependency build when reproducing an approved lock-file dependency set.",
    "10. Use helm dependency update only when intentionally resolving a dependency change and reviewing the new lock file.",
    "11. Rebuild in a clean checkout and validate the parent chart with lint, rendering, and packaging.",
    "12. Confirm artifact versions and provenance before resuming deployment.",
    "13. Resume through normal production approvals and verify application health if deployment proceeds.",
    "14. Write the incident report and assign prevention actions."
  ],

  preventionChecklist: [
    "Commit Chart.yaml and Chart.lock together.",
    "Pin dependency versions.",
    "Use helm dependency build for reproducible locked builds.",
    "Use helm dependency update only for intentional dependency resolution.",
    "Keep chart repositories and OCI registries under controlled ownership.",
    "Use dedicated CI credentials with minimal read permissions.",
    "Monitor token rotation and repository certificate expiry.",
    "Validate DNS, proxy, TLS, and repository access from build runners.",
    "Use deterministic CI images and pinned Helm versions.",
    "Design cache keys around Chart.yaml, Chart.lock, and build inputs.",
    "Avoid sharing mutable workspaces between concurrent builds.",
    "Verify chart archives and provenance where supported.",
    "Run lint, render, and package validation in CI.",
    "Test dependency changes before production release.",
    "Maintain an approved internal mirror or documented repository failover when required.",
    "Record chart artifact identity, dependency versions, and commit SHA."
  ],

  monitoringAndAlerting: [
    "Track dependency-fetch failures by repository and chart.",
    "Alert on sustained repository HTTP 5xx and authentication failures.",
    "Monitor HTTP 429 rate limits and retry volume.",
    "Monitor repository DNS resolution and TLS certificate expiry.",
    "Track dependency build duration and repeated retries.",
    "Monitor artifact availability for critical pinned versions.",
    "Track CI failures correlated across projects using the same repository.",
    "Record Helm version, runner image, commit SHA, and dependency versions.",
    "Monitor chart cache hit rate and clean-build reproducibility.",
    "Alert when a production release uses an unapproved dependency change."
  ],

  ciValidation: [
    "Pin an approved Helm version in the runner image.",
    "Check that Chart.yaml and Chart.lock are committed and consistent.",
    "Run helm dependency build in a clean workspace.",
    "Run helm dependency list and verify expected dependency versions.",
    "Run helm lint.",
    "Render the chart using each supported values configuration.",
    "Package the chart and validate its artifact identity.",
    "Use protected credentials for private repositories and OCI registries.",
    "Never print credentials in build logs.",
    "Fail the build when required dependencies cannot be retrieved.",
    "Review dependency version changes in pull requests.",
    "Run vulnerability and provenance checks required by organizational policy.",
    "Test repository connectivity and certificate trust in runner images.",
    "Keep deployment approval separate from dependency troubleshooting.",
    "Publish the tested chart artifact rather than rebuilding dependencies differently at deployment time."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Start time / detection time / recovery time:",
    "Severity and release impact:",
    "Affected pipeline, repository, chart, and dependency:",
    "Helm version and CI runner image:",
    "Commit SHA and pipeline run ID:",
    "Dependency source type: repository / OCI / local:",
    "Exact command and sanitized error:",
    "Chart.yaml and Chart.lock changes:",
    "DNS / TLS / proxy / auth / version investigation:",
    "Evidence supporting the confirmed root cause:",
    "Corrective action and approval:",
    "Dependency versions before and after:",
    "Clean-build, lint, render, and package validation:",
    "Deployment status and application health:",
    "Prevention action, owner, and due date:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1: Reproduce a missing dependency version",
      objective:
        "Learn to distinguish an unavailable chart version from a repository outage.",
      steps: [
        "Create a disposable parent chart in a development workspace.",
        "Declare a test dependency with an intentionally unavailable version.",
        "Run helm dependency list and helm dependency build.",
        "Inspect the exact repository response and version declaration.",
        "Correct the test dependency to an approved available version.",
        "Build dependencies and inspect the lock-file diff."
      ],
      expectedOutcome:
        "You can isolate an invalid version from network, authentication, and template failures."
    },
    {
      title: "Lab 2: Diagnose a stale lock file",
      objective:
        "Understand how Chart.yaml and Chart.lock affect reproducibility.",
      steps: [
        "Create a disposable chart with a version-pinned dependency.",
        "Generate the lock file using the approved Helm workflow.",
        "Change the dependency declaration in a test branch.",
        "Run helm dependency build and capture the result.",
        "Intentionally resolve the new dependency set with helm dependency update.",
        "Review the lock-file diff and commit only the intended changes."
      ],
      expectedOutcome:
        "You can explain when dependency build is appropriate and when dependency update is required."
    },
    {
      title: "Lab 3: Investigate a private repository authentication failure",
      objective:
        "Trace repository access using a protected CI identity.",
      steps: [
        "Use a test repository and non-production CI credentials.",
        "Run a dependency fetch with valid test access.",
        "Revoke or expire the test credential in the lab environment.",
        "Capture the sanitized failure and determine whether it is authentication or authorization.",
        "Restore the approved test credential and minimal read permission.",
        "Verify the exact dependency fetch succeeds."
      ],
      expectedOutcome:
        "You can diagnose private dependency access without exposing secrets or using administrator credentials."
    },
    {
      title: "Lab 4: Investigate a CI-only dependency failure",
      objective:
        "Find differences between a developer workstation and a build runner.",
      steps: [
        "Build the same chart locally and in a disposable CI runner.",
        "Record Helm versions, working directories, and sanitized network configuration.",
        "Compare repository access and trust-store behavior.",
        "Reproduce the failure in a clean runner workspace.",
        "Correct the verified environment difference.",
        "Repeat the build and compare dependency versions."
      ],
      expectedOutcome:
        "You can isolate environment-specific failures without changing dependency versions unnecessarily."
    },
    {
      title: "Lab 5: Recover from a stale dependency cache",
      objective:
        "Build a reproducible chart after a controlled cache problem.",
      steps: [
        "Use a disposable runner and test chart.",
        "Populate a cache with a previous dependency artifact.",
        "Change the test dependency input and observe the build.",
        "Inspect the cache key and charts directory.",
        "Rebuild from a clean checkout using the approved lock file.",
        "Compare the generated artifact and dependency list."
      ],
      expectedOutcome:
        "You can distinguish stale-cache problems from repository and dependency declaration problems."
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between helm dependency build and helm dependency update?",
      answer:
        "dependency build reconstructs dependencies from Chart.lock when it exists. dependency update resolves dependencies and can update the lock file. Use build for reproducible builds and update for deliberate dependency resolution."
    },
    {
      question: "What is Chart.lock used for?",
      answer:
        "It records the resolved dependency set and digest so builds can reproduce the selected dependency versions. It should be reviewed and committed alongside intentional dependency declaration changes."
    },
    {
      question: "Why does a Helm dependency build work locally but fail in Jenkins?",
      answer:
        "The environments may differ in credentials, network access, proxy settings, TLS trust, Helm version, working directory, repository configuration, or cached artifacts. Reproduce the exact command in the failing runner."
    },
    {
      question: "How do you troubleshoot a 401 or 403 dependency fetch error?",
      answer:
        "Confirm the source and CI identity, inspect credential binding without exposing secrets, and verify read permission for the exact chart artifact. Restore minimal approved access."
    },
    {
      question: "How do you distinguish a repository outage from a missing chart version?",
      answer:
        "Check DNS and endpoint reachability, response codes, repository metadata, and the exact requested version. A broad outage often affects multiple artifacts, while a missing version may affect one chart."
    },
    {
      question: "Why should you avoid helm dependency update during every production build?",
      answer:
        "It can resolve a new dependency set and modify Chart.lock. That can introduce unreviewed versions and reduce reproducibility. Production builds should generally use the approved locked set."
    },
    {
      question: "What causes a TLS error during dependency fetching?",
      answer:
        "Possible causes include expired certificates, missing trusted CA certificates, hostname mismatch, incomplete certificate chains, or proxy TLS interception. Fix certificate trust rather than disabling verification."
    },
    {
      question: "How do you troubleshoot an OCI chart dependency?",
      answer:
        "Verify the OCI reference, Helm version, registry authentication, exact artifact path, version, and pull permissions. OCI dependencies use registry-specific workflows rather than ordinary repository aliases."
    },
    {
      question: "What does HTTP 429 mean during a chart download?",
      answer:
        "It generally indicates rate limiting. Correlate failures across pipelines, inspect retry behavior, and use bounded backoff or an approved mirror rather than launching more parallel retries."
    },
    {
      question: "How can a cache cause inconsistent dependency builds?",
      answer:
        "A stale or incomplete archive may be reused after dependency inputs change. Use cache keys that include dependency declarations and lock files, and verify behavior from a clean checkout."
    },
    {
      question: "How do you troubleshoot a local file:// dependency?",
      answer:
        "Inspect the dependency path relative to the parent chart, confirm the directory exists in the clean checkout, and verify submodules or generated content are present in CI."
    },
    {
      question: "What should you do if a dependency version is no longer available?",
      answer:
        "Verify the repository and requested version, inspect the last approved lock file, and contact the artifact owner. Restore or republish the approved artifact or review a new version deliberately."
    },
    {
      question: "Does a successful dependency build guarantee deployment success?",
      answer:
        "No. It confirms dependency retrieval for that command. The parent chart can still fail linting, rendering, Kubernetes API validation, admission, scheduling, readiness, or application health checks."
    },
    {
      question: "How do you handle a dependency fetch failure during a production incident?",
      answer:
        "Assess release impact, preserve logs, identify the exact failure class, verify the approved dependency set, fix the demonstrated cause, rebuild in a clean workspace, validate the package, and resume deployment through normal approvals."
    },
    {
      question: "Why is it unsafe to disable TLS verification as a workaround?",
      answer:
        "It weakens artifact transport security and can expose builds to interception or untrusted content. Correct the certificate chain, hostname, or trust configuration instead."
    },
    {
      question: "How do you validate the final chart after dependency recovery?",
      answer:
        "Run dependency build, inspect dependency versions, lint the chart, render it with intended values, package it, and verify the artifact identity before deployment."
    },
    {
      question: "What should you monitor for dependency reliability?",
      answer:
        "Track fetch failures by repository, authentication errors, DNS/TLS problems, rate limits, download duration, artifact availability, cache behavior, and CI failures across projects."
    },
    {
      question: "How can you avoid a dependency outage blocking all deployments?",
      answer:
        "Use controlled repository mirrors where approved, retain immutable artifacts, monitor availability, document failover, and ensure builds consume verified pinned dependency versions."
    },
    {
      question: "What evidence should be included in a dependency incident report?",
      answer:
        "Record the exact command and error, repository and dependency version, Helm and runner versions, sanitized network/authentication findings, lock-file changes, confirmed root cause, recovery steps, and clean-build validation."
    },
    {
      question: "What is the difference between a dependency fetch failure and a Kubernetes deployment failure?",
      answer:
        "A fetch failure occurs while retrieving chart dependencies, usually before the parent chart can be packaged or deployed. A Kubernetes deployment failure occurs later during API operations or workload execution. Inspect the exact failed pipeline stage to distinguish them."
    }
  ],

  references: [
    {
      title: "Helm dependency build",
      url: "https://helm.sh/docs/helm/helm_dependency_build/"
    },
    {
      title: "Helm dependency update",
      url: "https://helm.sh/docs/helm/helm_dependency_update/"
    },
    {
      title: "Helm dependency list",
      url: "https://helm.sh/docs/helm/helm_dependency_list/"
    },
    {
      title: "Helm chart dependencies",
      url: "https://helm.sh/docs/topics/charts/"
    },
    {
      title: "Helm registry login",
      url: "https://helm.sh/docs/helm/helm_registry_login/"
    },
    {
      title: "Helm environment",
      url: "https://helm.sh/docs/helm/helm_env/"
    },
    {
      title: "Helm chart best practices",
      url: "https://helm.sh/docs/chart_best_practices/"
    },
    {
      title: "GitHub Actions dependency caching",
      url: "https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows"
    }
  ]
};

export default dependencyFetchFailureGuide;
