export interface DashboardErrorsGuide {
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

export const dashboardErrorsGuide: DashboardErrorsGuide = {
  title: "Grafana Dashboard Errors — Real Production Troubleshooting",
  category: "Monitoring / Grafana / Prometheus / SRE",
  severity: "SEV-1 to SEV-3 depending on visibility loss and operational impact",

  overview: [
    "Dashboard errors can include blank panels, No data, datasource errors, HTTP 4xx/5xx responses, broken variables, incorrect metrics, slow queries, dashboard loading failures and permission problems.",
    "A dashboard is a visualization layer. A blank panel does not automatically mean the application is down; the issue may be in Grafana, the datasource, the query, the time range, labels, permissions or the underlying telemetry.",
    "The normal troubleshooting path is: browser -> Grafana UI/API -> dashboard definition -> panel query -> datasource plugin -> Prometheus/Loki/InfluxDB/SQL backend -> response transformation -> visualization.",
    "Different panels on the same dashboard may use different data sources, queries, transformations, units and variables. Diagnose the failing panel separately before changing the entire dashboard.",
    "Grafana-managed dashboards may be stored in the database, provisioned from files, managed through GitOps or created through an API. Identify the authoritative source before editing.",
    "A successful datasource health check proves only basic connectivity. It does not prove that a particular query, dashboard variable or panel transformation works.",
    "Avoid deleting dashboards, changing production datasource credentials, disabling authentication or restarting Grafana as the first troubleshooting step.",
    "The commands below assume Linux, curl, jq and Grafana. Replace example URLs, IDs, namespaces and datasource UIDs with values from the actual environment."
  ],

  incidentScenario: [
    "The production Grafana dashboard suddenly displays No data for CPU, memory and request latency, while the application is still receiving traffic.",
    "A deployment completes, but the deployment dashboard shows outdated information because a label or metric name changed.",
    "The dashboard opens, but some panels display HTTP 500, timeout or datasource errors.",
    "The dashboard works for an administrator but fails for the on-call engineer because of datasource permissions or folder access.",
    "A dashboard becomes extremely slow after a new variable, transformation, panel or high-cardinality PromQL query is introduced.",
    "After a Grafana upgrade or GitOps deployment, dashboard provisioning overwrites a manual fix or changes datasource references."
  ],

  impactAssessment: [
    "Identify which environment, cluster, folder, dashboard, panel and user group is affected.",
    "Determine whether the issue affects one panel, one dashboard, all dashboards using one datasource, or the Grafana service itself.",
    "Check whether this is only a visualization issue or whether metrics, logs, traces and alert evaluation are also affected.",
    "Identify the operational decisions that depend on the dashboard, including incident response, release approval, capacity management and SLO reporting.",
    "Record when the dashboard last worked and correlate the failure with Grafana upgrades, datasource changes, deployments, network changes and metric-schema changes.",
    "Assess whether an incident commander needs an alternate query, CLI check, cloud console or secondary dashboard while the main view is unavailable.",
    "Prioritize loss of critical incident visibility more highly than an isolated cosmetic issue.",
    "Do not assume that a working alert proves the dashboard is healthy, or that a broken dashboard means alert evaluation has failed."
  ],

  safetyChecks: [
    "Confirm the correct Grafana URL, organization, environment, folder and dashboard UID.",
    "Check whether the dashboard is provisioned from files, managed by GitOps, stored in Grafana's database or maintained through an API.",
    "Capture the current dashboard JSON, datasource UID, failing query and error message before making changes.",
    "Use read-only queries and API calls before modifying dashboard definitions or datasource configuration.",
    "Do not expose Grafana API tokens, datasource passwords, cloud credentials, private endpoints or customer data in shared logs.",
    "Use a test dashboard or staging environment for potentially expensive queries and transformation changes.",
    "Avoid running broad, unbounded production queries that could overload Prometheus, Loki, SQL or another backend.",
    "Check approval requirements before modifying production datasources, access policies, folders or provisioning resources.",
    "Do not disable TLS verification, authentication or authorization as a workaround for connectivity problems.",
    "If a critical dashboard is unavailable, use an approved alternative data source or direct query while repairing it."
  ],

  evidenceCollection: [
    "Incident start time in UTC, dashboard URL, dashboard UID, folder and affected organization.",
    "Affected panel title, panel ID, query expression, datasource UID and selected time range.",
    "Exact error message, browser developer-tools network response and request timestamp.",
    "Dashboard JSON and the last known good version or Git revision.",
    "Grafana version, deployment method, plugin versions and recent upgrade history.",
    "Datasource health, backend query response, datasource error logs and authentication failures.",
    "Prometheus target health, metric names, labels and query results where Prometheus is used.",
    "Dashboard variables, variable query results, selected values and URL parameters.",
    "Panel transformations, field overrides, units, thresholds, time-series settings and query format.",
    "Grafana logs, pod events, CPU, memory, restarts, database latency and request duration.",
    "Permissions for the affected user, folder, dashboard and datasource.",
    "Recent dashboard provisioning, ConfigMap, Helm values, secret rotations and GitOps reconciliation events."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Identify the failure scope",
      objective: "Determine whether the issue is a Grafana outage, dashboard issue or individual panel failure.",
      commands: [
        "date -u",
        "kubectl get pods -A",
        "kubectl -n monitoring get pods,svc,endpoints"
      ],
      interpretation: [
        "These Kubernetes commands apply only if Grafana is deployed in Kubernetes.",
        "If Grafana cannot load at all, investigate service availability, ingress, DNS, TLS, authentication and backend health.",
        "If only one panel fails, prioritize its query, datasource, variables and transformations.",
        "If every panel using one datasource fails, investigate that datasource and its backend."
      ],
      nextAction: [
        "Record the affected scope and a known-good dashboard or panel for comparison.",
        "Continue with the Grafana health and version checks."
      ]
    },
    {
      step: 2,
      title: "Check Grafana health and version",
      objective: "Verify that Grafana is available and responding.",
      commands: [
        "export GRAFANA_URL='http://localhost:3000'",
        "curl -fsS \"$GRAFANA_URL/api/health\" | jq '.'"
      ],
      interpretation: [
        "The URL is an example. Use the actual Grafana endpoint and HTTPS where required.",
        "A connection failure may indicate service, DNS, routing, ingress or TLS problems.",
        "An HTTP 401 or 403 from a protected endpoint indicates an authentication or authorization issue, not necessarily a Grafana outage.",
        "A healthy API does not prove that the affected datasource or panel query works."
      ],
      nextAction: [
        "Check the Grafana service, ingress, pod readiness and logs if the health endpoint fails.",
        "If Grafana is healthy, proceed to the specific dashboard and panel."
      ]
    },
    {
      step: 3,
      title: "Capture the dashboard and panel identifiers",
      objective: "Avoid modifying the wrong dashboard or datasource.",
      commands: [
        "export GRAFANA_TOKEN='SET_USING_YOUR_APPROVED_SECRET_METHOD'",
        "curl -fsS -H \"Authorization: Bearer $GRAFANA_TOKEN\" \"$GRAFANA_URL/api/search?query=YOUR_DASHBOARD_NAME\" | jq '.[] | {title, uid, url, type}'",
        "curl -fsS -H \"Authorization: Bearer $GRAFANA_TOKEN\" \"$GRAFANA_URL/api/dashboards/uid/YOUR_DASHBOARD_UID\" | jq '.dashboard | {title, uid, version, panels}'"
      ],
      interpretation: [
        "Replace the dashboard name and UID placeholders with real values.",
        "The dashboard API response structure and permissions may differ by Grafana version.",
        "Dashboard JSON can contain sensitive queries, URLs or configuration details. Redact it before sharing.",
        "The token placeholder is not a real credential. Do not put production tokens directly into scripts, source control or shared shell history."
      ],
      nextAction: [
        "Record the dashboard UID, version, panel ID, datasource UID and failing query.",
        "Compare the current dashboard definition with the last known good version."
      ]
    },
    {
      step: 4,
      title: "Check datasource configuration and health",
      objective: "Determine whether Grafana can reach the configured data source.",
      commands: [
        "curl -fsS -H \"Authorization: Bearer $GRAFANA_TOKEN\" \"$GRAFANA_URL/api/datasources\" | jq '.[] | {name, uid, type, url, access, isDefault}'",
        "curl -fsS -H \"Authorization: Bearer $GRAFANA_TOKEN\" \"$GRAFANA_URL/api/datasources/uid/YOUR_DATASOURCE_UID/health\" | jq '.'"
      ],
      interpretation: [
        "Datasource API endpoints vary by Grafana version and datasource plugin; use the documentation for the deployed version.",
        "A 401 or 403 may be caused by Grafana API permissions, datasource credentials or backend access policies.",
        "A datasource health check can succeed even when a specific query fails due to labels, permissions, query syntax or timeouts.",
        "Datasource configuration may contain internal hostnames or sensitive metadata; redact before sharing."
      ],
      nextAction: [
        "Use Grafana's datasource test function and inspect the backend response.",
        "If the datasource is healthy, investigate the exact panel query."
      ]
    },
    {
      step: 5,
      title: "Use Query Inspector on the failing panel",
      objective: "See the actual request, response, timing and error returned by the datasource.",
      commands: [
        "Open the dashboard in Grafana.",
        "Open the affected panel menu.",
        "Select Inspect, then Query or Query Inspector depending on the Grafana version.",
        "Record the query, request parameters, response status, returned data and execution time."
      ],
      interpretation: [
        "A query syntax error points to the expression or query format.",
        "A timeout may indicate a slow query, backend overload, network delay or an unsuitable time range.",
        "A successful response containing no series points toward query matching, time range, metric availability or labels.",
        "A response with data that is not visible suggests panel transformations, field configuration, visualization settings or data-format issues."
      ],
      nextAction: [
        "Reproduce the exact query directly in the datasource's own query interface where possible.",
        "Use the response to determine whether the failure is before or after the data reaches Grafana."
      ]
    },
    {
      step: 6,
      title: "Test Prometheus metrics independently",
      objective: "Separate a dashboard query issue from a metric collection issue.",
      commands: [
        "export PROM='http://localhost:9090'",
        "curl -fsS \"$PROM/-/ready\"",
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=up' | jq '.status, .data.result'",
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=YOUR_PANEL_EXPRESSION' | jq '.status, .data.result'"
      ],
      interpretation: [
        "Replace `YOUR_PANEL_EXPRESSION` with the actual panel PromQL.",
        "If the metric is missing in Prometheus itself, inspect scrape targets, exporters and service discovery.",
        "If the metric exists but the dashboard query is empty, inspect label matchers, aggregation, variables, units and time range.",
        "An empty result is different from a returned series whose value is zero."
      ],
      nextAction: [
        "Correct the query only after confirming the metric and label schema.",
        "If the backend query works independently, focus on Grafana query construction, variables and transformations."
      ]
    },
    {
      step: 7,
      title: "Check time range, timezone and query step",
      objective: "Find data that is hidden by the selected dashboard time window.",
      commands: [
        "curl -fsSG \"$PROM/api/v1/query_range\" --data-urlencode 'query=YOUR_PANEL_EXPRESSION' --data-urlencode 'start=2026-10-26T10:00:00Z' --data-urlencode 'end=2026-10-26T11:00:00Z' --data-urlencode 'step=30s' | jq '.status, .data.result'"
      ],
      interpretation: [
        "Use timestamps appropriate to the incident. The time window above is only an example.",
        "Check the dashboard time picker, browser timezone, UTC timestamps, relative-time settings and panel-specific time overrides.",
        "A range that is too narrow may not include the event. A range that is too broad may produce slow or expensive queries.",
        "The query step and resolution can affect the number of points returned and the appearance of short-lived events."
      ],
      nextAction: [
        "Compare the panel's exact time range with a known incident timestamp.",
        "Use an appropriate query resolution and verify that the event appears in the expected window."
      ]
    },
    {
      step: 8,
      title: "Debug dashboard variables and template filters",
      objective: "Identify variables that generate invalid or overly restrictive queries.",
      commands: [
        "curl -fsS -H \"Authorization: Bearer $GRAFANA_TOKEN\" \"$GRAFANA_URL/api/dashboards/uid/YOUR_DASHBOARD_UID\" | jq '.dashboard.templating.list[] | {name, type, query, datasource, current, multi, includeAll}'"
      ],
      interpretation: [
        "Inspect variables such as `$cluster`, `$namespace`, `$service`, `$job` and `$environment`.",
        "A variable with no available values can cause dependent panels to return no data.",
        "A variable can have a stale default selection or contain a value that no longer matches the backend labels.",
        "Multi-value and All selections may require different query syntax or formatting.",
        "Variable query syntax differs by datasource and Grafana version."
      ],
      nextAction: [
        "Inspect variable preview and available values in Grafana.",
        "Compare the selected value with actual metric labels and correct the variable query or default selection."
      ]
    },
    {
      step: 9,
      title: "Inspect PromQL syntax, labels and aggregation",
      objective: "Find incorrect selectors, units or vector matching.",
      commands: [
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=count by (job, instance, namespace, pod) (up)' | jq '.data.result'",
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=count by (job, namespace) (YOUR_METRIC_NAME)' | jq '.data.result'"
      ],
      interpretation: [
        "Prometheus label matching is exact unless the expression uses a suitable matching modifier or aggregation.",
        "A query that expects `namespace=\"production\"` will not match a series labeled `namespace=\"prod\"`.",
        "Aggregation can accidentally combine multiple services or hide a specific instance.",
        "Check metric types and units: counters versus gauges, seconds versus milliseconds, bytes versus bits, ratios versus percentages.",
        "For counters, determine whether `rate()` or `increase()` is appropriate for the intended visualization."
      ],
      nextAction: [
        "Test the expression in smaller parts and compare the returned labels.",
        "Update the query and add representative regression tests before deploying a shared dashboard change."
      ]
    },
    {
      step: 10,
      title: "Inspect transformations and field configuration",
      objective: "Find data that reaches Grafana but disappears during processing or rendering.",
      commands: [
        "Open the panel editor.",
        "Review the Queries tab and returned data frames.",
        "Review Transformations in execution order.",
        "Inspect field overrides, units, thresholds, value mappings and null-value settings."
      ],
      interpretation: [
        "A filter-fields transformation may remove the field needed by the visualization.",
        "A join or merge transformation may fail because field names or join keys changed.",
        "An incorrect time field, numeric conversion or unit can make valid data appear incorrect.",
        "A panel may receive rows but render nothing because its visualization expects a different data shape.",
        "A threshold or value mapping can change presentation without changing the underlying metric."
      ],
      nextAction: [
        "Temporarily disable one transformation at a time in a test copy of the dashboard.",
        "Restore the transformation chain incrementally after identifying the exact failing stage."
      ]
    },
    {
      step: 11,
      title: "Check Grafana permissions and datasource access",
      objective: "Explain why one user can view a panel while another receives an error.",
      commands: [
        "curl -fsS -H \"Authorization: Bearer $GRAFANA_TOKEN\" \"$GRAFANA_URL/api/user\" | jq '.'",
        "curl -fsS -H \"Authorization: Bearer $GRAFANA_TOKEN\" \"$GRAFANA_URL/api/datasources/uid/YOUR_DATASOURCE_UID\" | jq '{datasource: {name: .datasource.name, uid: .datasource.uid, type: .datasource.type}}'"
      ],
      interpretation: [
        "Use a test account with the affected user's intended role when reproducing permission failures.",
        "Dashboard access, folder permissions, datasource permissions and backend authorization may be separate controls.",
        "A successful administrator query does not prove that a viewer has the same access.",
        "Some API endpoints require elevated permissions and may be unavailable to viewer tokens."
      ],
      nextAction: [
        "Compare the affected user's permissions with a working user.",
        "Grant only the minimum required access through the organization's identity and access process."
      ]
    },
    {
      step: 12,
      title: "Inspect Grafana logs and browser network errors",
      objective: "Find plugin failures, backend errors, failed requests and rendering problems.",
      commands: [
        "kubectl -n monitoring logs deploy/grafana --since=30m",
        "kubectl -n monitoring describe pod YOUR_GRAFANA_POD",
        "kubectl -n monitoring get events --sort-by=.lastTimestamp"
      ],
      interpretation: [
        "These commands apply to a Kubernetes deployment named `grafana`; adapt them to the actual workload.",
        "Look for datasource timeouts, plugin errors, database errors, failed provisioning, authentication errors and repeated restarts.",
        "Browser developer tools can reveal failed API requests, JavaScript errors, blocked requests and HTTP status codes.",
        "A 502 or 504 from an ingress or reverse proxy may originate before the request reaches Grafana.",
        "Redact cookies, authorization headers, query parameters containing secrets and customer information."
      ],
      nextAction: [
        "Correlate browser request timestamps with Grafana and datasource logs.",
        "Identify whether the error originates in the browser, proxy, Grafana backend, plugin or datasource."
      ]
    },
    {
      step: 13,
      title: "Investigate Grafana resource pressure and slow queries",
      objective: "Find dashboard failures caused by overload or expensive panels.",
      commands: [
        "kubectl -n monitoring top pods",
        "kubectl -n monitoring describe pods",
        "curl -fsSG \"$PROM/api/v1/query\" --data-urlencode 'query=prometheus_engine_query_duration_seconds' | jq '.data.result'"
      ],
      interpretation: [
        "The `kubectl top` command requires a working metrics API.",
        "The example Prometheus metric may not be available or sufficient in every version; inspect the actual metrics exposed by the deployment.",
        "Look for CPU throttling, OOMKilled containers, high query latency, slow datasource responses and excessive panel refresh frequency.",
        "Large time ranges, high-cardinality queries, broad regular expressions and many repeated panels can increase backend load.",
        "A dashboard may appear to hang even while Grafana's health endpoint remains responsive."
      ],
      nextAction: [
        "Use Query Inspector to identify the slowest panels and queries.",
        "Optimize query scope, time range, refresh frequency and aggregation before increasing resources."
      ]
    },
    {
      step: 14,
      title: "Check dashboard provisioning and GitOps drift",
      objective: "Determine why a manual fix disappears or a dashboard definition changes unexpectedly.",
      commands: [
        "kubectl -n monitoring get configmap",
        "kubectl -n monitoring get pods",
        "git status --short",
        "git diff --"
      ],
      interpretation: [
        "In a file-provisioned setup, the database may not be the authoritative source of dashboard definitions.",
        "A provisioning sidecar or GitOps controller may overwrite manual edits.",
        "A dashboard may reference an old datasource UID after migration or environment replacement.",
        "A clean Git working tree does not prove that the deployed dashboard matches the repository."
      ],
      nextAction: [
        "Identify the authoritative dashboard JSON, ConfigMap, Helm values or Git repository.",
        "Make the correction at the source of truth and verify the deployed dashboard after reconciliation."
      ]
    },
    {
      step: 15,
      title: "Check datasource networking, DNS and TLS",
      objective: "Determine whether Grafana can reach the backend from its own network context.",
      commands: [
        "getent hosts YOUR_DATASOURCE_HOST",
        "curl -v --connect-timeout 5 --max-time 15 https://YOUR_DATASOURCE_HOST/",
        "openssl s_client -connect YOUR_DATASOURCE_HOST:443 -servername YOUR_DATASOURCE_HOST </dev/null",
        "kubectl -n monitoring get networkpolicy",
        "kubectl -n monitoring get svc,endpoints,endpointslices"
      ],
      interpretation: [
        "Replace the hostname with the actual datasource host. Use the correct URL and authentication for the backend.",
        "A successful DNS lookup does not prove that TCP, TLS or query execution works.",
        "Certificate expiry, hostname mismatch, missing CA certificates, proxy configuration and incorrect system time can break TLS.",
        "A successful curl from a laptop does not prove that the Grafana pod can reach the datasource.",
        "Network policies, service meshes, cloud firewall rules and egress gateways can block the Grafana workload."
      ],
      nextAction: [
        "Run approved connectivity diagnostics from the same network context as Grafana.",
        "Fix the specific DNS, routing, certificate or egress issue without disabling TLS verification or opening unrestricted access."
      ]
    },
    {
      step: 16,
      title: "Check Grafana plugins and version compatibility",
      objective: "Find panels or datasources that fail after a plugin or Grafana upgrade.",
      commands: [
        "grafana cli plugins ls",
        "kubectl -n monitoring logs deploy/grafana --since=30m",
        "kubectl -n monitoring describe deployment grafana"
      ],
      interpretation: [
        "The Grafana CLI command is version- and installation-dependent; use the supported CLI syntax for the deployed release.",
        "Look for plugin startup errors, unsupported plugin APIs, signature validation problems and frontend exceptions.",
        "A dashboard using a deprecated visualization or datasource plugin may behave differently after an upgrade.",
        "Do not install arbitrary plugins directly into a production instance without security review."
      ],
      nextAction: [
        "Compare plugin and Grafana versions with the supported compatibility matrix.",
        "Test a compatible plugin upgrade or controlled rollback in staging."
      ]
    },
    {
      step: 17,
      title: "Validate and deploy the dashboard fix",
      objective: "Ensure the change addresses the actual cause and does not break other panels.",
      commands: [
        "git diff --check",
        "git diff -- path/to/dashboard.json",
        "git status --short"
      ],
      interpretation: [
        "Replace the path with the actual dashboard file or provisioning configuration.",
        "Review the change for unintended query, variable, datasource UID, access-control and refresh-interval changes.",
        "A JSON syntax check alone cannot prove that the datasource query returns data or that the visualization renders correctly."
      ],
      nextAction: [
        "Validate JSON or provisioning syntax with the relevant tooling.",
        "Test the affected panel, related variables, permissions, representative time ranges and dashboard loading performance in staging."
      ]
    },
    {
      step: 18,
      title: "Perform end-to-end recovery verification",
      objective: "Confirm the dashboard is operational and the fix survives the deployment process.",
      commands: [
        "curl -fsS \"$GRAFANA_URL/api/health\" | jq '.'",
        "curl -fsS -H \"Authorization: Bearer $GRAFANA_TOKEN\" \"$GRAFANA_URL/api/dashboards/uid/YOUR_DASHBOARD_UID\" | jq '.dashboard | {title, uid, version}'",
        "kubectl -n monitoring get pods"
      ],
      interpretation: [
        "API health and dashboard metadata are useful checks but do not prove that every panel works.",
        "Open the actual dashboard and confirm the affected panel renders expected values.",
        "Check a known time window, selected variables, a non-admin user and relevant browser errors.",
        "If dashboards are provisioned, verify that the fix remains after reconciliation or the next deployment."
      ],
      nextAction: [
        "Record the verified root cause and the evidence used to prove recovery.",
        "Add a regression test or documented dashboard smoke test for the failure."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Every dashboard is unavailable",
      likelyCause: "Grafana service, ingress, DNS, TLS, database or authentication problem",
      verification: [
        "Check `/api/health` and Grafana logs.",
        "Inspect pod readiness, service endpoints and ingress responses.",
        "Check database connectivity and resource pressure."
      ],
      resolution: [
        "Repair the failing infrastructure layer and verify Grafana availability before investigating individual panels."
      ]
    },
    {
      symptom: "Only one panel shows No data",
      likelyCause: "Incorrect query, time range, variable, metric name or label matcher",
      verification: [
        "Use Query Inspector.",
        "Run the exact query in the datasource.",
        "Inspect variable values and actual series labels."
      ],
      resolution: [
        "Correct the specific query or variable and validate representative time windows."
      ]
    },
    {
      symptom: "All panels using one datasource fail",
      likelyCause: "Datasource credentials, URL, TLS, backend outage or network connectivity",
      verification: [
        "Check datasource health.",
        "Inspect Grafana logs and backend health.",
        "Test connectivity from the Grafana network context."
      ],
      resolution: [
        "Repair the datasource connection, access policy or backend and test multiple queries."
      ]
    },
    {
      symptom: "Dashboard works for admins but not viewers",
      likelyCause: "Folder, dashboard, datasource or backend permission mismatch",
      verification: [
        "Reproduce using the affected role.",
        "Compare folder and datasource permissions.",
        "Inspect backend authorization errors."
      ],
      resolution: [
        "Grant minimum required access using the approved identity-management process."
      ]
    },
    {
      symptom: "Panel has data but renders blank",
      likelyCause: "Transformation, field mapping, data format or visualization mismatch",
      verification: [
        "Inspect the raw query response.",
        "Inspect data frames and transformation order.",
        "Check time fields, numeric fields, units and visualization type."
      ],
      resolution: [
        "Fix the specific transformation or field configuration and test a copy of the dashboard."
      ]
    },
    {
      symptom: "Dashboard became slow after a change",
      likelyCause: "Expensive query, broad time range, high cardinality, frequent refresh or many panels",
      verification: [
        "Compare Query Inspector timings.",
        "Inspect backend query latency and resource pressure.",
        "Review recent dashboard and query changes."
      ],
      resolution: [
        "Optimize query scope and aggregation, reduce unnecessary refreshes and retest performance."
      ]
    },
    {
      symptom: "Dashboard changes revert automatically",
      likelyCause: "File provisioning, GitOps reconciliation or automated dashboard deployment",
      verification: [
        "Inspect provisioning configuration and deployment history.",
        "Compare the deployed JSON with the authoritative repository version.",
        "Check controller reconciliation logs."
      ],
      resolution: [
        "Update the authoritative source and allow the approved deployment mechanism to apply the change."
      ]
    },
    {
      symptom: "Dashboard broke after a metric rename",
      likelyCause: "Application instrumentation changed while dashboard queries remained unchanged",
      verification: [
        "Compare the old and new metric names and labels.",
        "Check the application release notes and instrumentation diff.",
        "Test the updated expression directly in the datasource."
      ],
      resolution: [
        "Update the query or restore a compatible metric schema and add a regression check."
      ]
    },
    {
      symptom: "Dashboard fails only for a particular variable selection",
      likelyCause: "Stale variable value, incorrect multi-value syntax or no matching series",
      verification: [
        "Inspect the variable preview and current selected value.",
        "Compare it with actual datasource labels.",
        "Test single-value, multi-value and All selections."
      ],
      resolution: [
        "Correct variable queries and formatting and choose a valid default."
      ]
    },
    {
      symptom: "Datasource requests time out",
      likelyCause: "Network latency, backend overload, expensive query or timeout configuration",
      verification: [
        "Compare request and backend timings.",
        "Inspect backend health and resource usage.",
        "Check network policies, proxies and TLS."
      ],
      resolution: [
        "Fix the underlying network or query issue and adjust timeout values only when justified."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Prometheus label schema changes after a Kubernetes deployment",
      symptoms: [
        "The dashboard worked before the rollout.",
        "Panels show No data for a specific namespace, service or cluster.",
        "Some metrics still exist, but queries using old labels return no results."
      ],
      investigation: [
        "Query the metric without restrictive label filters.",
        "Inspect actual labels and compare them with the previous release.",
        "Check Helm chart, ServiceMonitor, PodMonitor, relabeling and application instrumentation changes.",
        "Review dashboard variables that depend on the old label values."
      ],
      resolution: [
        "Update the affected queries and variables to use the actual schema.",
        "If multiple dashboard versions must coexist, maintain a deliberate compatibility strategy."
      ],
      prevention: [
        "Treat metric names and labels as a versioned observability contract.",
        "Add dashboard smoke tests to the deployment pipeline."
      ]
    },
    {
      scenario: "Prometheus query returns data but Grafana shows No data",
      symptoms: [
        "The expression works in Prometheus.",
        "The same panel appears empty in Grafana.",
        "The panel may use a different datasource UID or inject template variables."
      ],
      investigation: [
        "Inspect the exact query sent by Grafana, including variables and time range.",
        "Compare the panel datasource UID with the known working Prometheus datasource.",
        "Check query type, instant versus range mode, query step and response format.",
        "Review transformations and field filters."
      ],
      resolution: [
        "Correct the datasource reference or query options and retest the panel.",
        "Disable transformations one at a time in a test copy if the raw data is present."
      ],
      prevention: [
        "Keep datasource UIDs stable across environments where possible.",
        "Test provisioned dashboards after datasource migrations."
      ]
    },
    {
      scenario: "Dashboard variable query becomes expensive",
      symptoms: [
        "Dashboard load time increases.",
        "Dropdowns take a long time to populate.",
        "Backend query load rises when users open the dashboard."
      ],
      investigation: [
        "Inspect variable query definitions, refresh behavior and available values.",
        "Check whether variables query high-cardinality metrics over unnecessarily broad time ranges.",
        "Measure query duration and result count."
      ],
      resolution: [
        "Use a narrower query, a suitable label-values query, a controlled time range or a stable variable source.",
        "Avoid returning thousands of values when the user needs only a few operational choices."
      ],
      prevention: [
        "Set practical variable scopes and review variable queries during dashboard code review.",
        "Test dashboard startup latency with realistic production-sized datasets."
      ]
    },
    {
      scenario: "Grafana dashboard provisioning overwrites a hotfix",
      symptoms: [
        "A manual dashboard correction disappears after restart or reconciliation.",
        "The dashboard version or content changes without a user edit.",
        "The repository still contains the old query."
      ],
      investigation: [
        "Inspect the dashboard provisioning provider and its configured file paths.",
        "Check GitOps controller history, ConfigMaps and Helm values.",
        "Compare the current dashboard JSON with the source-controlled version."
      ],
      resolution: [
        "Apply the fix to the authoritative JSON or provisioning repository.",
        "Deploy the change and verify the reconciled dashboard."
      ],
      prevention: [
        "Document dashboard ownership and source of truth.",
        "Avoid relying on manual production edits for dashboards managed by automation."
      ]
    },
    {
      scenario: "Grafana dashboard loads slowly due to many panels",
      symptoms: [
        "Initial dashboard rendering is slow.",
        "Several panel requests run at the same time.",
        "The datasource backend shows high query concurrency."
      ],
      investigation: [
        "Inspect the browser network waterfall and panel Query Inspector timings.",
        "Identify duplicate queries and panels with unnecessarily broad time ranges.",
        "Check refresh intervals and repeated variable queries.",
        "Compare backend latency before and after opening the dashboard."
      ],
      resolution: [
        "Remove redundant panels, consolidate queries when safe and optimize the slowest expressions.",
        "Use appropriate refresh intervals and avoid excessive concurrent requests."
      ],
      prevention: [
        "Define dashboard performance budgets.",
        "Review query count, latency and cardinality as part of dashboard changes."
      ]
    },
    {
      scenario: "Dashboard fails after Grafana upgrade",
      symptoms: [
        "A previously working panel uses a deprecated visualization or datasource plugin.",
        "Provisioning or frontend errors appear after the release.",
        "Some dashboards work while others fail."
      ],
      investigation: [
        "Compare Grafana and plugin versions with the last known good release.",
        "Review upgrade notes and deprecation notices.",
        "Inspect logs, browser console errors and dashboard JSON changes.",
        "Test the affected dashboard against the new version in staging."
      ],
      resolution: [
        "Migrate the deprecated configuration or use a compatible plugin version.",
        "Roll back the upgrade only when supported and approved."
      ],
      prevention: [
        "Test representative dashboards during upgrades.",
        "Pin versions and keep a tested rollback procedure."
      ]
    },
    {
      scenario: "Datasource returns HTTP 401 or 403",
      symptoms: [
        "Panels show permission errors.",
        "The datasource may work for an administrator but fail for other users.",
        "Errors begin after a credential or permission change."
      ],
      investigation: [
        "Identify whether the error comes from Grafana's API, the datasource backend or the backend's authorization layer.",
        "Check credential rotation, service-account permissions and datasource access configuration.",
        "Inspect redacted backend logs and reproduce using the affected role."
      ],
      resolution: [
        "Restore the correct secret reference or minimum required permissions.",
        "Verify the query using the intended production identity."
      ],
      prevention: [
        "Monitor credential expiry and rotation.",
        "Use managed secrets and document datasource identity ownership."
      ]
    },
    {
      scenario: "Dashboard returns HTTP 502 or 504",
      symptoms: [
        "Grafana is intermittently unavailable through the browser.",
        "Ingress or reverse proxy logs show gateway errors.",
        "Datasource queries or Grafana requests may be slow."
      ],
      investigation: [
        "Check the response headers and determine whether the error originates at ingress, proxy, Grafana or datasource.",
        "Inspect ingress logs, upstream response times and Grafana request logs.",
        "Check pod readiness, resource pressure and backend query latency."
      ],
      resolution: [
        "Fix the failing upstream, service endpoint, query or resource bottleneck.",
        "Adjust proxy timeouts only when the expected workload and underlying latency justify the change."
      ],
      prevention: [
        "Monitor ingress error rate, upstream latency and Grafana health.",
        "Load-test representative dashboards and keep reasonable request timeouts."
      ]
    },
    {
      scenario: "A dashboard shows incorrect units or misleading values",
      symptoms: [
        "CPU appears as a percentage when the query returns a ratio.",
        "Latency values differ by a factor of 1000.",
        "Memory appears unexpectedly small or large."
      ],
      investigation: [
        "Check the metric's documented unit and type.",
        "Inspect raw query values before visualization formatting.",
        "Review panel unit, field overrides, conversion and query calculations."
      ],
      resolution: [
        "Correct the query or panel unit so the displayed value matches the metric semantics.",
        "Document whether the value represents a ratio, percentage, seconds, milliseconds, bytes or another unit."
      ],
      prevention: [
        "Define units in metric documentation and dashboard reviews.",
        "Add sample-value checks for critical dashboards."
      ]
    },
    {
      scenario: "Dashboard is unavailable during a production incident",
      symptoms: [
        "The primary operational dashboard is broken during an outage.",
        "Responders cannot easily assess service health.",
        "The outage may be independent of the dashboard problem."
      ],
      investigation: [
        "Check application health through an independent approved path.",
        "Query critical metrics directly from the datasource.",
        "Inspect whether alerts and synthetic probes still work.",
        "Assign separate owners to the service incident and the monitoring visibility incident when needed."
      ],
      resolution: [
        "Use a verified alternate dashboard, direct query or cloud-native monitoring view.",
        "Restore the critical dashboard path and validate it without delaying service recovery."
      ],
      prevention: [
        "Maintain a minimal fallback dashboard and documented direct-query procedures.",
        "Test observability availability during game days."
      ]
    }
  ],

  recoveryProcedures: [
    {
      situation: "Panel query or variable is incorrect",
      steps: [
        "Capture the original query and failing variable values.",
        "Reproduce the issue with Query Inspector.",
        "Validate the corrected query directly against the datasource.",
        "Update the authoritative dashboard definition.",
        "Review the change and deploy through the approved process."
      ],
      validation: [
        "Confirm the expected values appear for multiple time ranges.",
        "Test all relevant variable selections and user roles.",
        "Check query latency and ensure the correction does not increase backend load excessively."
      ],
      rollback: [
        "Restore the last known good dashboard version if the correction produces incorrect values or breaks other panels."
      ]
    },
    {
      situation: "Datasource connection is broken",
      steps: [
        "Identify the failing connection stage: DNS, TCP, TLS, authentication or query execution.",
        "Check the datasource endpoint and health status.",
        "Inspect the active credential reference and certificate chain without exposing secret values.",
        "Apply the minimum approved correction.",
        "Test the connection and a representative query."
      ],
      validation: [
        "Confirm successful datasource health checks and actual panel queries.",
        "Verify that the fix works from the Grafana workload's network context."
      ],
      rollback: [
        "Restore the last known good datasource configuration if the change breaks additional dashboards.",
        "Do not disable TLS validation or authentication as a fallback."
      ]
    },
    {
      situation: "Provisioning overwrote a dashboard change",
      steps: [
        "Identify the authoritative source of the dashboard.",
        "Compare deployed JSON with the source-controlled version.",
        "Apply the fix to the authoritative file or repository.",
        "Validate and deploy the updated dashboard.",
        "Verify that reconciliation preserves the fix."
      ],
      validation: [
        "Confirm the deployed dashboard version and affected panel behavior.",
        "Restart or reconcile only when required by the deployment mechanism and approved procedure."
      ],
      rollback: [
        "Revert the source-controlled change if it causes regressions and redeploy the known-good version."
      ]
    },
    {
      situation: "Grafana service or critical dashboards are unavailable",
      steps: [
        "Assess whether the problem affects the Grafana service, its database, ingress or a datasource.",
        "Activate the documented fallback dashboard or direct-query process.",
        "Collect health checks, pod status, resource metrics and logs.",
        "Restore the failing infrastructure layer using the approved recovery procedure.",
        "Validate critical dashboards before declaring recovery."
      ],
      validation: [
        "Confirm Grafana API health, dashboard access, representative panel queries and correct displayed values.",
        "Verify that on-call engineers can access the dashboard with their normal permissions."
      ],
      rollback: [
        "Roll back the last known bad deployment or configuration when safe and supported.",
        "Retain the fallback procedure until critical dashboard checks pass."
      ]
    }
  ],

  cicdTroubleshooting: [
    "Store dashboard JSON, provisioning files and datasource configuration templates in version control.",
    "Run `git diff --check` to catch whitespace and patch problems.",
    "Validate dashboard JSON syntax using the JSON tooling available in the project.",
    "Review dashboard UID, datasource UID, variable definitions, panel queries, transformations, units and permissions.",
    "Use environment-specific datasource provisioning rather than hardcoding credentials or machine-specific URLs into dashboard JSON.",
    "Deploy dashboards to a staging Grafana instance and test representative panels before production.",
    "Add smoke tests for critical dashboard APIs and a small set of important panel queries.",
    "Test time ranges, All selections, multi-value variables, missing metrics and permission differences.",
    "Compare dashboard query latency and response sizes before and after changes.",
    "Track dashboard and datasource changes with Git commits and release IDs.",
    "Keep secrets in an approved secret manager and avoid logging credentials in CI.",
    "Use progressive deployment or a tested rollback path for high-impact monitoring changes.",
    "Verify the deployed dashboard after GitOps reconciliation rather than relying only on successful pipeline completion.",
    "Fail CI when required dashboard files are invalid or mandatory datasource references are missing."
  ],

  monitoringAndPrevention: [
    "Monitor Grafana API health, HTTP error rate, request latency, restarts and resource utilization.",
    "Monitor datasource query failures, timeouts and backend latency.",
    "Track the slowest dashboard panels and high-cardinality queries.",
    "Monitor Prometheus target health and critical metric availability independently of the dashboard.",
    "Use synthetic checks for critical dashboard availability and representative datasource queries.",
    "Maintain a fallback dashboard or direct-query runbook for critical production services.",
    "Define ownership for dashboards, folders, datasource configurations and provisioning repositories.",
    "Use stable dashboard UIDs and datasource references across deployments where practical.",
    "Document metric names, labels, units and expected value ranges.",
    "Review dashboard variables for stale values, overly broad queries and high cardinality.",
    "Set sensible refresh intervals based on operational needs and backend capacity.",
    "Avoid duplicating expensive queries across panels when a safe consolidation is possible.",
    "Review permissions with least-privilege access and test dashboards using real operational roles.",
    "Test Grafana and plugin upgrades in staging against representative dashboards.",
    "Monitor TLS certificate expiry and datasource credential rotation.",
    "Review provisioning drift so manual changes are not silently overwritten.",
    "Include critical dashboard checks in production release and observability game-day procedures."
  ],

  incidentRunbook: [
    "1. Declare the dashboard visibility incident and identify the affected service and dashboard.",
    "2. Confirm whether Grafana itself is unavailable or only specific panels are failing.",
    "3. Activate an approved fallback monitoring method if the dashboard is needed for active incident response.",
    "4. Capture the dashboard UID, panel ID, query, datasource UID, time range and exact error.",
    "5. Check Grafana health, datasource health, logs and browser network responses.",
    "6. Run the exact query directly against the datasource and compare its result with Grafana.",
    "7. Inspect variables, labels, transformations, units, permissions and provisioning source.",
    "8. Identify the root cause from evidence rather than restarting components or changing multiple settings simultaneously.",
    "9. Apply the smallest validated correction through the approved deployment mechanism.",
    "10. Verify the dashboard as the affected user, with relevant time ranges and variable selections.",
    "11. Confirm the fix survives provisioning or GitOps reconciliation.",
    "12. Record the timeline, impact, root cause, recovery evidence and preventive follow-up actions."
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Diagnose a No data panel",
      objective: "Distinguish missing source metrics from an incorrect dashboard query.",
      procedure: [
        "Use a disposable Grafana and Prometheus environment.",
        "Create a test panel using a metric known to exist.",
        "Introduce an incorrect label matcher in the test query.",
        "Inspect the panel with Query Inspector.",
        "Run the expression directly in Prometheus and compare results.",
        "Correct the matcher and verify the panel."
      ],
      expectedResult: [
        "You can identify whether the empty result comes from the source metric or dashboard query.",
        "You can explain the difference between no matching series and a zero value."
      ],
      cleanup: [
        "Restore the original test query and remove test-only panels."
      ]
    },
    {
      lab: "Lab 2 — Troubleshoot a datasource connection",
      objective: "Identify DNS, TLS, authentication and backend failures.",
      procedure: [
        "Use a test datasource in a disposable environment.",
        "Confirm that the datasource health check succeeds.",
        "Change the test endpoint to an invalid hostname and observe the error.",
        "Restore the endpoint and test a deliberately invalid test credential.",
        "Restore the correct credential and execute a representative query."
      ],
      expectedResult: [
        "You can distinguish connectivity errors from authorization errors.",
        "You can prove that the datasource works by executing a real query."
      ],
      cleanup: [
        "Restore the original test datasource and remove temporary credentials."
      ]
    },
    {
      lab: "Lab 3 — Fix a broken dashboard variable",
      objective: "Understand how variables filter panel queries.",
      procedure: [
        "Create a test dashboard with a cluster or service variable.",
        "Confirm that the variable returns valid values.",
        "Change the test default to a value absent from the datasource.",
        "Observe the dependent panel returning no data.",
        "Correct the variable query and default selection."
      ],
      expectedResult: [
        "You can trace a blank panel to a stale or invalid variable selection.",
        "You can verify single-value and multi-value behavior."
      ],
      cleanup: [
        "Restore the original variable settings and remove test data."
      ]
    },
    {
      lab: "Lab 4 — Debug transformations",
      objective: "Find where valid query data disappears during panel processing.",
      procedure: [
        "Create a test panel that returns multiple fields.",
        "Add a transformation that filters out a required field.",
        "Inspect the raw query response and transformed data frames.",
        "Disable the transformation in the test panel.",
        "Correct the transformation and verify the visualization."
      ],
      expectedResult: [
        "You can distinguish a datasource problem from a transformation problem.",
        "You can identify the exact transformation that changes the result."
      ],
      cleanup: [
        "Remove the intentionally broken transformation and restore the test dashboard."
      ]
    },
    {
      lab: "Lab 5 — Investigate a slow panel",
      objective: "Use query timing to isolate expensive dashboard operations.",
      procedure: [
        "Create a test panel using a representative metric query.",
        "Record its execution time for a limited time range.",
        "Expand the time range or increase query complexity in the test environment.",
        "Compare Query Inspector timings and backend query load.",
        "Optimize the expression and select an appropriate refresh interval."
      ],
      expectedResult: [
        "You can identify query latency and the effect of time range and query complexity.",
        "You can demonstrate an improvement without increasing production load."
      ],
      cleanup: [
        "Restore the test query and refresh interval."
      ]
    },
    {
      lab: "Lab 6 — Reproduce a permissions failure",
      objective: "Verify dashboard access for a non-admin user.",
      procedure: [
        "Create a test dashboard and a least-privilege test account.",
        "Verify access to the dashboard and its datasource.",
        "Remove one required permission in the disposable environment.",
        "Reproduce the failure as the test user.",
        "Restore the minimum required permission and verify the query."
      ],
      expectedResult: [
        "You can distinguish dashboard access from datasource or backend access.",
        "You can resolve the issue without granting unnecessary administrator privileges."
      ],
      cleanup: [
        "Restore the original test permissions and remove the test account if no longer needed."
      ]
    },
    {
      lab: "Lab 7 — Test dashboard provisioning",
      objective: "Understand why manual dashboard edits can disappear.",
      procedure: [
        "Provision a test dashboard from a source-controlled JSON file.",
        "Make a temporary manual edit in the test Grafana instance.",
        "Trigger the test provisioning or reconciliation workflow.",
        "Observe whether the manual change is overwritten.",
        "Apply the intended fix to the source-controlled dashboard and redeploy."
      ],
      expectedResult: [
        "You can identify the authoritative source of a provisioned dashboard.",
        "You can make a fix that survives reconciliation."
      ],
      cleanup: [
        "Restore the intended test dashboard version and remove temporary test resources."
      ]
    },
    {
      lab: "Lab 8 — Build a dashboard smoke test",
      objective: "Create a repeatable validation process for critical dashboards.",
      procedure: [
        "Choose a disposable Grafana instance and one critical test dashboard.",
        "Check Grafana API health and dashboard metadata.",
        "Run a representative datasource query.",
        "Verify the dashboard JSON contains the expected panel and datasource references.",
        "Open the dashboard as the intended operational role and verify the displayed values.",
        "Record the result in a CI or release test report."
      ],
      expectedResult: [
        "You have a repeatable smoke-test procedure that checks more than API health.",
        "You can detect missing dashboards, broken datasource references and query regressions."
      ],
      cleanup: [
        "Remove temporary tokens from the environment and retain only approved, reusable test assets."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "1. What causes a Grafana dashboard to show No data?",
      answer: "Common causes include missing metrics, incorrect queries, label mismatches, invalid variables, wrong time ranges, datasource failures and transformations that remove required fields."
    },
    {
      question: "2. How do you troubleshoot a blank panel?",
      answer: "Use Query Inspector, capture the exact query and time range, run the query directly against the datasource, inspect labels and variables, then review transformations and visualization settings."
    },
    {
      question: "3. How do you check Grafana health?",
      answer: "Use the `/api/health` endpoint and inspect service readiness, logs and infrastructure health. A healthy API does not prove that every datasource or panel works."
    },
    {
      question: "4. What is Query Inspector?",
      answer: "It shows the query request, response data, execution timing and errors for a panel, helping isolate datasource and query problems."
    },
    {
      question: "5. What is a Grafana datasource?",
      answer: "A datasource connects Grafana to a backend such as Prometheus, Loki, Elasticsearch, InfluxDB or a SQL database."
    },
    {
      question: "6. Why can a datasource test pass while a panel fails?",
      answer: "The connection can be healthy while the specific query has invalid syntax, missing metrics, bad labels, unsupported operations or a timeout."
    },
    {
      question: "7. How do you distinguish missing data from zero?",
      answer: "A missing result has no matching time series or row; zero is an actual returned value. Query filters and visualization settings may handle these cases differently."
    },
    {
      question: "8. What are dashboard variables?",
      answer: "Variables provide reusable filters such as cluster, namespace, service or environment. Their values are substituted into panel queries."
    },
    {
      question: "9. How can a variable break a dashboard?",
      answer: "It may return no values, have a stale default, use incorrect multi-value syntax or select labels that do not exist in the datasource."
    },
    {
      question: "10. What is a panel transformation?",
      answer: "A transformation changes the query result inside Grafana, for example filtering fields, joining data, aggregating rows or renaming columns."
    },
    {
      question: "11. How do you troubleshoot a panel that receives data but renders blank?",
      answer: "Inspect raw query data and transformed data frames, then check field types, time columns, transformations, units and visualization compatibility."
    },
    {
      question: "12. What causes Grafana dashboards to load slowly?",
      answer: "Expensive queries, high-cardinality metrics, broad time ranges, too many panels, short refresh intervals, slow datasources and Grafana resource pressure."
    },
    {
      question: "13. How do you identify a slow panel?",
      answer: "Use Query Inspector and browser network timings to compare panel query duration, response size and backend latency."
    },
    {
      question: "14. Why should datasource UIDs remain stable?",
      answer: "Provisioned dashboards reference datasources by identifiers. A changed or missing UID can leave panels pointing to the wrong datasource or an unavailable reference."
    },
    {
      question: "15. Why can a dashboard work for an admin but fail for a viewer?",
      answer: "Folder permissions, dashboard permissions, datasource access and backend authorization may differ by user role."
    },
    {
      question: "16. What is dashboard provisioning?",
      answer: "Provisioning automatically loads dashboard definitions and configuration from files or other managed sources. Manual edits may be overwritten by reconciliation."
    },
    {
      question: "17. How do you troubleshoot a dashboard after a deployment?",
      answer: "Compare the deployed dashboard JSON, datasource references, query labels, variable definitions and recent metric changes with the last known good revision."
    },
    {
      question: "18. What does HTTP 401 or 403 indicate?",
      answer: "It usually indicates authentication or authorization failure, but first identify whether the response comes from Grafana, a proxy, the datasource or the backend."
    },
    {
      question: "19. What can cause HTTP 502 or 504?",
      answer: "A failed or slow upstream, reverse proxy timeout, unavailable service endpoint, overloaded Grafana process or slow datasource query."
    },
    {
      question: "20. How do you troubleshoot TLS failures?",
      answer: "Inspect DNS, connectivity, certificate expiry, hostname, trust chain and CA configuration from the Grafana workload's network context."
    },
    {
      question: "21. How do you validate dashboard changes in CI/CD?",
      answer: "Validate JSON, review datasource and variable references, test important queries and permissions in staging, then verify the deployed dashboard after reconciliation."
    },
    {
      question: "22. Why should dashboard changes be version-controlled?",
      answer: "Version control provides review, change history, repeatable deployment, rollback and a way to identify which release introduced a regression."
    },
    {
      question: "23. How do you troubleshoot a dashboard after a Grafana upgrade?",
      answer: "Compare versions and plugin compatibility, inspect browser and server errors, review deprecations and test affected dashboards in staging."
    },
    {
      question: "24. Why should a production dashboard have a fallback?",
      answer: "During an outage, responders still need service visibility. A fallback dashboard or direct-query runbook reduces dependence on a single visualization path."
    },
    {
      question: "25. How do you prove that a dashboard issue is fixed?",
      answer: "Verify Grafana health, datasource connectivity, the exact query, displayed values, variable selections, user permissions and persistence after provisioning."
    },
    {
      question: "26. What is the difference between a dashboard issue and an alerting issue?",
      answer: "A dashboard issue affects visualization or data exploration. Alerting issues affect rule evaluation or notification delivery. They may share a datasource but must be diagnosed independently."
    },
    {
      question: "27. Why can changing a metric label break panels?",
      answer: "The panel query may filter on the old label or value and return no series. Compare actual labels with the query and update the metric contract or dashboard."
    },
    {
      question: "28. What should be included in a dashboard incident report?",
      answer: "Affected dashboard and users, timeline, error evidence, root cause, changes made, validation results, rollback details and preventive actions."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Grafana Dashboard Errors",
    "Environment, organization and dashboard UID:",
    "Affected panels and datasource UIDs:",
    "Severity and business impact:",
    "Incident owner:",
    "Start time in UTC:",
    "Time of last known successful operation:",
    "Exact error message and browser request status:",
    "Query Inspector request and response evidence:",
    "Datasource health and backend query results:",
    "Grafana version and plugin versions:",
    "Recent deployments, configuration or metric changes:",
    "Root cause supported by evidence:",
    "Immediate mitigation and fallback used:",
    "Permanent correction and change reference:",
    "Validation performed and results:",
    "Verification using affected user's permissions:",
    "Rollback decision and outcome:",
    "Recovery time in UTC:",
    "Prevention actions, owners and due dates:",
    "Runbook or CI/CD changes:",
    "Blameless postmortem summary:"
  ],

  officialReferences: [
    "Grafana documentation: https://grafana.com/docs/grafana/latest/",
    "Grafana HTTP API: https://grafana.com/docs/grafana/latest/developer-resources/api-reference/http-api/",
    "Grafana dashboards: https://grafana.com/docs/grafana/latest/dashboards/",
    "Grafana dashboard variables: https://grafana.com/docs/grafana/latest/dashboards/variables/",
    "Grafana panel inspection: https://grafana.com/docs/grafana/latest/visualizations/panels-visualizations/panel-inspector/",
    "Grafana data sources: https://grafana.com/docs/grafana/latest/datasources/",
    "Grafana provisioning: https://grafana.com/docs/grafana/latest/administration/provisioning/",
    "Grafana troubleshooting: https://grafana.com/docs/grafana/latest/troubleshooting/",
    "Prometheus query basics: https://prometheus.io/docs/prometheus/latest/querying/basics/",
    "Prometheus HTTP API: https://prometheus.io/docs/prometheus/latest/querying/api/",
    "Kubernetes troubleshooting applications: https://kubernetes.io/docs/tasks/debug/debug-application/"
  ]
};
