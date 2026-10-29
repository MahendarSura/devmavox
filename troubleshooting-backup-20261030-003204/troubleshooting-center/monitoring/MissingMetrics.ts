export interface MissingMetricsGuide {
  title: string;
  category: string;
  severity: string;
  overview: string;
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    expectedResults: string[];
    interpretation: string[];
    nextActions: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCauses: string[];
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
    procedure: string[];
    validation: string[];
    rollback: string[];
  }[];
  cicdTroubleshooting: string[];
  monitoringAndPrevention: string[];
  incidentRunbook: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  incidentReportTemplate: string[];
  officialReferences: {
    title: string;
    url: string;
  }[];
}

export const missingMetricsGuide: MissingMetricsGuide = {
  title: "Missing Metrics — Complete Production Troubleshooting Guide",
  category: "Monitoring / Prometheus / Grafana / Observability / SRE",
  severity: "SEV-2 or higher when critical monitoring or alerting is affected",

  overview: `
Missing Metrics means an expected metric is absent, stale, incomplete, or
returning no data in Prometheus, Grafana, a recording rule, or a remote
monitoring backend.

Do not immediately assume Grafana is broken. Metrics pass through several
independent stages:

Application
    |
    v
Instrumentation / Metrics Endpoint
    |
    v
Exporter / Service Discovery
    |
    v
Prometheus Scrape
    |
    v
Prometheus TSDB
    |
    +--> PromQL / Recording Rules
    |
    +--> Remote Write / Long-term Storage
    |
    v
Grafana Datasource / Dashboard / Variables

A metric may be missing because:
- The application no longer exposes it.
- The exporter is down or has changed its metric names.
- Prometheus cannot discover or scrape the target.
- The scrape succeeds but the required metric is not emitted.
- Relabeling drops the target or metric.
- PromQL filters, labels, time ranges, or dashboard variables exclude it.
- Recording rules fail or are not loaded.
- Remote write, remote storage, or query federation is broken.
- The metric has not been emitted because its event has never occurred.
- Retention, staleness, permissions, or query limits affect visibility.

The goal is to locate the first failing stage and fix that specific stage.
`,

  incidentScenario: `
At 10:15 UTC, the on-call team notices that the production API request-rate
panel in Grafana suddenly shows No data. The application is responding to
users, but its latency and error-rate panels are empty.

The Prometheus server is reachable. However, the team has not yet confirmed
whether the application metrics endpoint is healthy, whether the target is
being scraped, or whether the dashboard query is correct.

The incident responder must establish:
1. Which metric or metric family disappeared?
2. Which applications, clusters, namespaces, and environments are affected?
3. When was the metric last present?
4. Is the target discovered and UP?
5. Does the endpoint expose the metric?
6. Does Prometheus contain recent samples?
7. Is the issue in collection, storage, query logic, or presentation?
8. Are alerts and recording rules affected too?

Do not fix the dashboard first if the metric is missing at the source.
Likewise, do not restart Prometheus when a label mismatch is the real cause.
`,

  impactAssessment: [
    "Record the exact metric name, expected labels, dashboard panel, datasource, environment, and time range.",
    "Determine whether one metric, one target, one service, an entire namespace, or all metrics are affected.",
    "Identify the last known good sample and the time the gap began.",
    "Check whether the application is functioning normally while telemetry is missing.",
    "Determine whether critical alerts, SLO calculations, autoscaling, or capacity decisions depend on the missing metric.",
    "Check whether the problem affects only Grafana, the Prometheus API, the exporter endpoint, or the underlying application.",
    "Compare affected and unaffected instances to identify a common deployment, configuration, network, or label change.",
    "Assess the duration of the monitoring blind spot and whether an incident notification is required.",
    "Choose severity according to internal policy and business impact. Missing a critical error-rate metric may be more severe than a missing nonessential dashboard metric."
  ],

  safetyChecks: [
    "Confirm the production cluster, Prometheus instance, namespace, datasource, and metric before running changes.",
    "Use read-only API queries and diagnostics first.",
    "Check the current incident owner, change window, and production approval requirements.",
    "Do not restart Prometheus, delete TSDB data, remove persistent volumes, or change retention as an initial troubleshooting step.",
    "Do not expose bearer tokens, API keys, credentials, or sensitive label values in shared terminal output.",
    "Use a bounded time range and reasonable query limits to avoid expensive production queries.",
    "Avoid broad label changes or relabeling edits until their effect on dashboards and alerts is understood.",
    "Do not assume a metric is broken just because it has no value; some metrics appear only after a particular event occurs.",
    "Do not disable scrape authentication, TLS verification, or network policies as a permanent workaround.",
    "Make configuration changes through the actual deployment source, such as version-controlled Prometheus configuration, Helm values, an operator custom resource, or GitOps repository.",
    "Preserve before-and-after evidence so recovery can be verified and the change can be rolled back."
  ],

  evidenceCollection: [
    "Record the incident start time in UTC and the last timestamp at which the metric was visible.",
    "Capture the exact PromQL query, dashboard panel, selected time range, variables, and datasource.",
    "Record the expected metric name and label set from the application or exporter documentation.",
    "Capture Prometheus target status, scrape URL, scrape error, scrape duration, and last scrape timestamp.",
    "Query the raw metric in Prometheus and inspect recent sample timestamps.",
    "Capture sanitized output from the application or exporter metrics endpoint.",
    "Review Prometheus configuration, ServiceMonitor or PodMonitor resources, scrape annotations, relabeling rules, and recent Git changes.",
    "Collect exporter logs, application logs, Prometheus logs, Kubernetes events, and deployment history.",
    "Check recording-rule evaluation, remote-write queue health, remote-storage errors, and query frontend status where applicable.",
    "Compare affected and healthy targets running the same application version.",
    "Document every diagnostic command, relevant output, interpretation, and action taken."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Define the exact missing metric",
      objective:
        "Identify the expected metric, labels, affected environment, and time window before changing configuration.",
      commands: [
        "date -u",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=up'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=YOUR_METRIC_NAME'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=count by (job) (up)'"
      ],
      expectedResults: [
        "The Prometheus API returns a JSON response with status success when the request and query succeed.",
        "The up query returns discovered scrape-target health series.",
        "The raw metric query returns matching series if recent data exists.",
        "The job aggregation helps compare target health across jobs."
      ],
      interpretation: [
        "An empty result for the raw metric does not automatically mean Prometheus is down.",
        "If up is available but the metric is absent, investigate target scraping, instrumentation, labels, and query filters.",
        "If the entire up query is empty, check the Prometheus instance, query endpoint, permissions, and whether any targets are configured.",
        "If the API returns an error, read the error message; syntax, authentication, query limits, and backend availability are different failure classes."
      ],
      nextActions: [
        "Write down the exact expected metric name and labels.",
        "Compare the last known good time with the incident timeline.",
        "Continue to target discovery and scrape health in Step 2.",
        "If the raw metric exists but the panel is empty, prioritize PromQL and dashboard investigation in Step 7."
      ]
    },
    {
      step: 2,
      title: "Check target discovery and scrape health",
      objective:
        "Determine whether Prometheus knows about the target and can scrape it successfully.",
      commands: [
        "curl -fsS 'http://prometheus.example.com/api/v1/targets'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=up'",
        "kubectl get servicemonitor,podmonitor -A",
        "kubectl get pods,svc,endpoints -A",
        "kubectl get events -A --sort-by=.lastTimestamp"
      ],
      expectedResults: [
        "The Prometheus targets API lists active targets and their health details.",
        "The up metric is normally 1 for a successful scrape and 0 for a failed scrape.",
        "The intended ServiceMonitor or PodMonitor exists if the deployment uses Prometheus Operator.",
        "Kubernetes services have appropriate endpoints for the application."
      ],
      interpretation: [
        "No target in the targets API suggests discovery, configuration selection, namespace selection, or relabeling problems.",
        "A target with up equal to 0 indicates a failed scrape, but the target's lastError and endpoint details are needed to identify why.",
        "A target with up equal to 1 proves that the scrape succeeded, not that every expected metric is present.",
        "A missing Service endpoint may result from selector mismatch, no ready pods, or an incorrect service port.",
        "ServiceMonitor and PodMonitor checks apply only when the environment uses Prometheus Operator."
      ],
      nextActions: [
        "If the target is absent, inspect scrape configuration, service labels, monitor selectors, and target relabeling.",
        "If the target is down, use the exact scrape error to investigate DNS, routing, TLS, authentication, or endpoint availability.",
        "If the target is healthy, check the raw endpoint and metric name in Step 3.",
        "Use the configuration source of truth to make any approved change."
      ]
    },
    {
      step: 3,
      title: "Inspect the application or exporter metrics endpoint",
      objective:
        "Confirm that the metric is actually exposed by the source.",
      commands: [
        "curl -fsS http://<target-host>:<metrics-port>/metrics | head -80",
        "curl -sS -o /dev/null -w 'HTTP=%{http_code} TOTAL=%{time_total}s\\n' http://<target-host>:<metrics-port>/metrics",
        "curl -fsS http://<target-host>:<metrics-port>/metrics | grep -E '^YOUR_METRIC_NAME([ {]|$)'",
        "kubectl logs -n <namespace> <application-pod> --since=30m",
        "kubectl describe pod -n <namespace> <application-pod>"
      ],
      expectedResults: [
        "The endpoint returns the expected metrics format and an appropriate HTTP response.",
        "The expected metric family appears when it is supposed to be emitted.",
        "Application or exporter logs provide evidence of instrumentation or collection failures."
      ],
      interpretation: [
        "HTTP 404 often indicates the wrong path or port, or an endpoint that is not configured.",
        "Connection refused indicates that the tested endpoint is not accepting connections at that address and port.",
        "Timeouts can indicate network restrictions, overload, or an unresponsive exporter.",
        "A healthy endpoint without the expected metric points toward instrumentation, version changes, metric lifecycle, or an incorrect metric name.",
        "Metrics may be emitted only after an event happens; a counter for an operation may not appear until the first operation is recorded.",
        "Some applications expose metrics on a separate management port rather than the main application port."
      ],
      nextActions: [
        "Verify the endpoint path and port against the actual application configuration.",
        "Check instrumentation initialization and whether the relevant code path has executed.",
        "Compare the endpoint output with a healthy instance of the same version.",
        "If the metric exists at the source but not in Prometheus, continue to Step 4."
      ]
    },
    {
      step: 4,
      title: "Investigate scrape errors, networking, and authentication",
      objective:
        "Find out why a discovered target cannot be scraped.",
      commands: [
        "curl -sS -o /dev/null -w '%{http_code} %{time_total}s\\n' http://<target-host>:<metrics-port>/metrics",
        "getent hosts <target-host>",
        "kubectl describe pod -n <namespace> <prometheus-pod>",
        "kubectl get networkpolicy -A",
        "kubectl logs -n <namespace> <prometheus-pod> --since=30m"
      ],
      expectedResults: [
        "The target resolves to the expected address from the relevant network context.",
        "The endpoint is reachable from the Prometheus environment, not merely from an administrator's laptop.",
        "Prometheus logs and target errors expose relevant connection or scrape failures."
      ],
      interpretation: [
        "A connection timeout may indicate routing, firewall, network policy, or target overload.",
        "HTTP 401 or 403 suggests authentication or authorization issues.",
        "TLS certificate errors suggest certificate trust, expiry, hostname, or TLS configuration issues.",
        "An administrator's successful curl does not prove that Prometheus can reach the target.",
        "A scrape timeout may indicate a slow endpoint, an expensive exporter, or an overly strict timeout."
      ],
      nextActions: [
        "Test connectivity from an approved diagnostic environment with the same network path as Prometheus.",
        "Verify service ports, DNS, certificates, authentication, and network policy.",
        "Correct the specific failing dependency rather than disabling security controls.",
        "Review scrape duration and timeout settings only after establishing actual endpoint behavior."
      ]
    },
    {
      step: 5,
      title: "Inspect metric relabeling and target relabeling",
      objective:
        "Find configuration rules that drop targets, rename labels, or discard metrics.",
      commands: [
        "grep -nE 'relabel_configs|metric_relabel_configs|keep|drop|labeldrop|labelkeep|replacement' prometheus.yml",
        "kubectl get servicemonitor,podmonitor -A -o yaml",
        "kubectl get prometheus -A -o yaml",
        "git log -10 --oneline"
      ],
      expectedResults: [
        "The active configuration and recent changes can be identified.",
        "Relabeling rules reveal which targets or metric samples are retained or dropped.",
        "Operator-managed resources show the intended scrape configuration when the operator is in use."
      ],
      interpretation: [
        "Target relabeling acts on target metadata before scraping and can prevent a target from being scraped.",
        "Metric relabeling acts on scraped samples and can drop a metric even when the target is healthy.",
        "A keep rule may exclude targets that no longer match the expected labels.",
        "A labeldrop rule may remove labels required by a query or dashboard.",
        "The local prometheus.yml may not be the effective configuration when a Helm chart or operator generates it."
      ],
      nextActions: [
        "Compare the active configuration with the last known-good revision.",
        "Validate the intended labels and keep/drop conditions against actual target metadata.",
        "Test the change in a safe environment and review the effect on alerts and dashboards.",
        "Apply through the actual configuration source and verify the active configuration after rollout."
      ]
    },
    {
      step: 6,
      title: "Check metric names, labels, staleness, and time range",
      objective:
        "Determine whether data exists under a different metric name, label set, or timestamp.",
      commands: [
        "curl -fsSG 'http://prometheus.example.com/api/v1/label/__name__/values'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/series' --data-urlencode 'match[]=YOUR_METRIC_NAME'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=count by (job,instance) (up)'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query_range' --data-urlencode 'query=YOUR_METRIC_NAME' --data-urlencode 'start=<RFC3339_START>' --data-urlencode 'end=<RFC3339_END>' --data-urlencode 'step=60s'"
      ],
      expectedResults: [
        "The label-values endpoint lists metric names known to Prometheus, subject to API version and permissions.",
        "The series API returns matching series within the requested time interval when applicable.",
        "Aggregations reveal which jobs and instances currently contribute data.",
        "A bounded range query shows whether samples existed earlier in the incident window."
      ],
      interpretation: [
        "A metric may have been renamed after an application or exporter upgrade.",
        "A series may exist historically but no longer have recent samples.",
        "An exact label selector can return no data when a label value changes or a new label is added.",
        "Prometheus instant queries use evaluation time and lookback behavior; they are not equivalent to searching all historical samples.",
        "The series API may require a suitable time range and can return substantial data if the selector is broad.",
        "Do not query all series or all label values unnecessarily on a large production server."
      ],
      nextActions: [
        "Compare actual metric names and labels with the expected dashboard selector.",
        "Use bounded time windows and specific matchers.",
        "Check the metric's emission lifecycle and scrape timestamps.",
        "If raw data exists, reproduce the dashboard query in Step 7."
      ]
    },
    {
      step: 7,
      title: "Debug PromQL and Grafana dashboard queries",
      objective:
        "Find query filters, variables, transformations, or datasource settings that hide existing data.",
      commands: [
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=YOUR_METRIC_NAME'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=sum by (job) (rate(YOUR_COUNTER_NAME[5m]))'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=count by (job,instance) (YOUR_METRIC_NAME)'"
      ],
      expectedResults: [
        "A raw query helps establish whether any matching series exist.",
        "A counter rate query returns a rate only when there are suitable samples in the selected range.",
        "Grouped results help determine which label combinations have data."
      ],
      interpretation: [
        "A dashboard query may contain an obsolete label matcher.",
        "A counter rate query may return no result when there are too few samples or no samples in its range.",
        "Grafana variables can expand to empty or unexpected label values.",
        "Dashboard transformations, field filters, expressions, or panel overrides can hide returned data.",
        "The dashboard may point to the wrong datasource, environment, or Prometheus tenant.",
        "A metric with no samples is different from a query that returns a valid zero."
      ],
      nextActions: [
        "Run the exact panel query in Prometheus using the same time range.",
        "Remove filters one at a time to identify the matcher causing the empty result.",
        "Check dashboard variables, transformations, datasource UID, and query inspector.",
        "Restore the intended query and test representative time ranges before publishing the change."
      ]
    },
    {
      step: 8,
      title: "Investigate recording rules and alert rules",
      objective:
        "Determine whether derived metrics or alerts are missing because rules are absent or failing.",
      commands: [
        "curl -fsS 'http://prometheus.example.com/api/v1/rules'",
        "curl -fsS 'http://prometheus.example.com/api/v1/targets'",
        "grep -nE 'groups:|record:|alert:|expr:|for:' prometheus-rules.yml",
        "kubectl logs -n <namespace> <prometheus-pod> --since=30m"
      ],
      expectedResults: [
        "The rules API lists loaded rule groups and their evaluation status.",
        "Expected recording rules and alert rules are loaded.",
        "Rule evaluation errors and missing source metrics can be identified."
      ],
      interpretation: [
        "A missing recording-rule output may be caused by absent input metrics or an invalid expression.",
        "A rule file present in Git is not proof that Prometheus has loaded it.",
        "A rule group may fail evaluation due to query errors or resource pressure.",
        "An alert may be inactive because its expression returns no series rather than a numeric zero.",
        "Alert rules can exist in a separate Prometheus-compatible system or managed alerting service."
      ],
      nextActions: [
        "Check rule loading, evaluation errors, and the source metric independently.",
        "Validate the rule syntax with the appropriate Prometheus tooling before rollout.",
        "Confirm rule reload or deployment success.",
        "Test alert firing and recovery using a safe test rule or staging environment."
      ]
    },
    {
      step: 9,
      title: "Check Prometheus capacity, retention, and storage",
      objective:
        "Identify resource or storage issues affecting ingestion and query results.",
      commands: [
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=prometheus_tsdb_head_samples_appended_total'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=prometheus_tsdb_head_series'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=prometheus_tsdb_wal_corruptions_total'",
        "df -h",
        "free -h",
        "kubectl describe pod -n <namespace> <prometheus-pod>"
      ],
      expectedResults: [
        "Where available, TSDB metrics provide evidence about ingestion and head-series behavior.",
        "Filesystem and memory checks reveal resource constraints.",
        "Pod events show whether the Prometheus workload has restarted or been evicted."
      ],
      interpretation: [
        "Some internal metric names and availability vary by Prometheus version and deployment.",
        "A sudden ingestion drop across many targets suggests a broader scrape, ingestion, resource, or configuration issue.",
        "A single missing application metric is more likely to be target-specific, instrumentation-related, or query-related.",
        "High series count can indicate excessive label cardinality, which can increase memory and storage pressure.",
        "A full disk can affect ingestion and database operation, but deleting TSDB files is not a safe generic fix."
      ],
      nextActions: [
        "Compare ingestion and target health over time.",
        "Identify the source of resource pressure and assess capacity.",
        "Review retention and storage settings through the supported deployment configuration.",
        "Follow Prometheus-supported backup, retention, and recovery procedures if storage is damaged."
      ]
    },
    {
      step: 10,
      title: "Check remote write, federation, and long-term storage",
      objective:
        "Determine whether metrics exist in local Prometheus but disappear from a downstream backend.",
      commands: [
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=prometheus_remote_storage_samples_pending'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=prometheus_remote_storage_samples_failed_total'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=prometheus_remote_storage_samples_retried_total'",
        "kubectl logs -n <namespace> <prometheus-pod> --since=30m"
      ],
      expectedResults: [
        "When exposed by the deployed version, remote-storage metrics indicate queue pressure, failures, or retries.",
        "Prometheus logs reveal remote-write errors and endpoint failures.",
        "Comparing local and remote queries shows where data disappears."
      ],
      interpretation: [
        "If local Prometheus has the metric but the remote backend does not, investigate remote write, relabeling, authentication, tenancy, and downstream ingestion.",
        "Pending samples can indicate that remote write cannot keep up.",
        "A successful local query does not guarantee remote storage or federation is healthy.",
        "Metric relabeling for remote write can intentionally exclude data from the remote destination."
      ],
      nextActions: [
        "Compare the same metric, labels, and time range in local and remote backends.",
        "Inspect remote endpoint health, authentication, network, and ingestion limits.",
        "Review remote-write relabeling and queue behavior.",
        "Do not discard or reset queues without understanding potential data loss and the supported recovery procedure."
      ]
    },
    {
      step: 11,
      title: "Validate the fix end to end",
      objective:
        "Confirm that samples flow from the source through Prometheus into the expected dashboard and alert path.",
      commands: [
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=up'",
        "curl -fsSG 'http://prometheus.example.com/api/v1/query' --data-urlencode 'query=YOUR_METRIC_NAME'",
        "curl -fsS 'http://prometheus.example.com/api/v1/targets'",
        "curl -fsS 'http://prometheus.example.com/api/v1/rules'"
      ],
      expectedResults: [
        "The intended target is discovered and healthy.",
        "The expected metric has recent samples.",
        "Relevant recording and alert rules are loaded and evaluating successfully.",
        "Grafana panels return the expected data."
      ],
      interpretation: [
        "A healthy target with a missing metric still requires source and query validation.",
        "One successful sample is not enough to prove sustained recovery.",
        "A recovered dashboard does not guarantee remote write or alert delivery is restored."
      ],
      nextActions: [
        "Observe multiple scrape and rule-evaluation intervals.",
        "Verify dashboards and alert notifications independently.",
        "Record the root cause, change, validation evidence, and prevention actions.",
        "Close the incident only when the agreed service and monitoring checks pass."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Target is absent from Prometheus",
      likelyCauses: [
        "Scrape configuration missing",
        "ServiceMonitor selector mismatch",
        "Namespace selector mismatch",
        "Target relabeling drops the target",
        "Service or pod labels changed"
      ],
      verification: [
        "Inspect the targets API.",
        "Inspect Prometheus configuration and monitor resources.",
        "Compare actual Kubernetes labels with monitor selectors.",
        "Review recent configuration commits."
      ],
      resolution: [
        "Correct the confirmed selector or discovery configuration.",
        "Validate the resulting configuration before rollout.",
        "Confirm the target appears in the targets API."
      ]
    },
    {
      symptom: "Target exists but up equals 0",
      likelyCauses: [
        "Endpoint unreachable",
        "Wrong metrics port or path",
        "TLS or authentication failure",
        "Network policy or firewall restriction",
        "Exporter overloaded or unavailable"
      ],
      verification: [
        "Inspect the target lastError and scrape URL.",
        "Test the endpoint from the Prometheus network context.",
        "Inspect DNS, service endpoints, certificates, and exporter logs."
      ],
      resolution: [
        "Correct the verified connectivity, endpoint, authentication, or exporter problem.",
        "Recheck target health after the change."
      ]
    },
    {
      symptom: "Target is up but one metric is missing",
      likelyCauses: [
        "Instrumentation stopped emitting the metric",
        "Metric renamed after upgrade",
        "Metric relabeling drops the sample",
        "Metric only appears after an event",
        "Query uses obsolete labels"
      ],
      verification: [
        "Inspect the raw metrics endpoint.",
        "Query the metric without dashboard filters.",
        "Inspect metric relabeling and application version changes."
      ],
      resolution: [
        "Correct instrumentation, metric filtering, or query logic based on evidence.",
        "Confirm the metric appears in a bounded Prometheus query."
      ]
    },
    {
      symptom: "Metric exists in Prometheus but not in Grafana",
      likelyCauses: [
        "Wrong datasource",
        "Incorrect PromQL",
        "Wrong time range",
        "Dashboard variable mismatch",
        "Transformation or field filter hides the result"
      ],
      verification: [
        "Run the exact panel query directly in Prometheus.",
        "Inspect Grafana Query Inspector.",
        "Check datasource UID, variables, transformations, and time range."
      ],
      resolution: [
        "Correct the specific query, datasource, variable, or transformation.",
        "Test the dashboard in the affected environment."
      ]
    },
    {
      symptom: "Recording rule output is missing",
      likelyCauses: [
        "Input metric missing",
        "Rule file not loaded",
        "Invalid rule expression",
        "Rule evaluation error",
        "Wrong labels in the expression"
      ],
      verification: [
        "Inspect the rules API and rule evaluation status.",
        "Query the input metric and rule expression separately.",
        "Check Prometheus logs and active rule configuration."
      ],
      resolution: [
        "Correct the input metric or rule expression.",
        "Deploy and verify the loaded rule group."
      ]
    },
    {
      symptom: "Metrics exist locally but not in long-term storage",
      likelyCauses: [
        "Remote-write endpoint unavailable",
        "Authentication or tenancy issue",
        "Remote-write queue pressure",
        "Remote-write relabeling drops samples",
        "Downstream ingestion limits"
      ],
      verification: [
        "Compare local and remote queries for the same time range.",
        "Inspect remote-write metrics and logs.",
        "Check endpoint health, credentials configuration, and relabeling."
      ],
      resolution: [
        "Fix the confirmed remote endpoint, authentication, queue, or filtering issue.",
        "Verify downstream samples after recovery."
      ]
    },
    {
      symptom: "Many unrelated metrics disappear simultaneously",
      likelyCauses: [
        "Prometheus scrape configuration change",
        "Prometheus resource exhaustion",
        "Network outage",
        "Exporter fleet failure",
        "Storage or ingestion failure"
      ],
      verification: [
        "Compare target health across jobs and clusters.",
        "Check ingestion metrics, Prometheus logs, and resource usage.",
        "Correlate the outage with infrastructure or deployment changes."
      ],
      resolution: [
        "Restore the shared failing component or revert the confirmed configuration change.",
        "Validate multiple representative targets and metric families."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Metric name changed after an exporter upgrade",
      symptoms: [
        "Target remains UP.",
        "Old dashboard query returns no data.",
        "Other metrics from the exporter remain available."
      ],
      investigation: [
        "Compare metrics endpoint output before and after the upgrade if available.",
        "Inspect exporter release notes and deployed image version.",
        "Compare actual metric names and label sets."
      ],
      resolution: [
        "Update the query or instrumentation to use the supported metric name.",
        "Where continuity is needed, consider a tested recording rule or dashboard compatibility layer.",
        "Avoid inventing a metric name based only on assumptions."
      ],
      prevention: [
        "Test exporter upgrades in staging.",
        "Add query compatibility checks for critical metrics.",
        "Document metric schema changes."
      ]
    },
    {
      scenario: "Prometheus Operator does not discover a ServiceMonitor",
      symptoms: [
        "The ServiceMonitor resource exists.",
        "The expected target is absent from Prometheus.",
        "Other targets remain healthy."
      ],
      investigation: [
        "Inspect the Prometheus resource's serviceMonitorSelector and serviceMonitorNamespaceSelector.",
        "Compare the ServiceMonitor labels with the selector.",
        "Check the ServiceMonitor namespace and endpoint configuration.",
        "Verify the Service selector and its ready endpoints."
      ],
      resolution: [
        "Correct the confirmed selector, namespace, labels, or endpoint port.",
        "Apply the change through Helm, GitOps, or the source manifest.",
        "Verify that the target appears and becomes healthy."
      ],
      prevention: [
        "Add manifest validation and selector checks to CI.",
        "Use consistent label conventions.",
        "Test monitoring resources during application deployment."
      ]
    },
    {
      scenario: "Metric relabeling drops a critical metric",
      symptoms: [
        "The endpoint exposes the metric.",
        "The target is UP.",
        "The metric is absent from Prometheus after a configuration change."
      ],
      investigation: [
        "Inspect metric_relabel_configs in the effective scrape configuration.",
        "Check keep, drop, labeldrop, and labelkeep rules.",
        "Compare the source metric labels with the relabel matchers.",
        "Identify whether the change affects local ingestion or remote write."
      ],
      resolution: [
        "Correct or narrow the rule that unintentionally removes the metric.",
        "Validate configuration and deploy through the normal change process.",
        "Check the metric and associated alerts after the next scrapes."
      ],
      prevention: [
        "Review relabeling changes with metric owners.",
        "Add critical metric presence tests.",
        "Monitor expected metric availability."
      ]
    },
    {
      scenario: "Kubernetes application metrics disappeared after a rollout",
      symptoms: [
        "The application is available to users.",
        "Metrics disappear after a deployment.",
        "Pods or Services have changed."
      ],
      investigation: [
        "Compare old and new pod labels, container ports, and annotations.",
        "Inspect Service endpoints and monitor selectors.",
        "Check whether the metrics port or path changed.",
        "Review application startup logs and instrumentation configuration."
      ],
      resolution: [
        "Correct the actual port, path, labels, or instrumentation mismatch.",
        "Roll back the application only if evidence indicates the release introduced the problem and rollback is safe.",
        "Verify metrics across all intended replicas."
      ],
      prevention: [
        "Add metrics endpoint smoke tests to deployment pipelines.",
        "Validate Service and monitor selectors.",
        "Alert when expected targets or metric families disappear."
      ]
    },
    {
      scenario: "PromQL returns no data because a label changed",
      symptoms: [
        "Raw metric exists.",
        "A dashboard or alert query returns an empty result.",
        "The issue began after label or instrumentation changes."
      ],
      investigation: [
        "Run the metric query without the suspected label matcher.",
        "Inspect actual label values using bounded series or label queries.",
        "Compare old and new application versions.",
        "Review dashboard variables and alert expressions."
      ],
      resolution: [
        "Update the query to match the intended current labels.",
        "Preserve useful aggregation semantics.",
        "Test all dependent dashboards and alerts."
      ],
      prevention: [
        "Treat label names and values as an interface contract.",
        "Review instrumentation changes for query compatibility.",
        "Add regression tests for important PromQL expressions."
      ]
    },
    {
      scenario: "High-cardinality metrics create Prometheus pressure",
      symptoms: [
        "Prometheus memory or disk usage rises.",
        "Queries slow down or ingestion becomes unstable.",
        "A recent deployment introduced labels such as user ID or request ID."
      ],
      investigation: [
        "Inspect series growth and memory usage over time.",
        "Review labels with unbounded values.",
        "Compare series count before and after the deployment.",
        "Check Prometheus logs and query latency."
      ],
      resolution: [
        "Remove or redesign inappropriate unbounded labels at the instrumentation source.",
        "Use bounded categories where appropriate.",
        "Plan any relabeling or retention changes with data and alerting owners."
      ],
      prevention: [
        "Review label cardinality during code review.",
        "Set cardinality budgets for critical services.",
        "Monitor series growth and storage capacity."
      ]
    },
    {
      scenario: "Counter rate query returns no data",
      symptoms: [
        "The raw counter exists intermittently.",
        "rate() or increase() returns an empty result.",
        "The issue appears during low traffic or after a restart."
      ],
      investigation: [
        "Inspect raw counter samples over a bounded time range.",
        "Compare the query range with the scrape interval and actual sample count.",
        "Check whether the counter is emitted only after the first event.",
        "Inspect labels and series resets."
      ],
      resolution: [
        "Use a range that is appropriate for the scrape interval and expected traffic.",
        "Correct label selectors and validate sample availability.",
        "Do not replace missing data with zero unless that behavior is correct for the metric's meaning."
      ],
      prevention: [
        "Test PromQL at both high and low traffic rates.",
        "Document metric initialization behavior.",
        "Alert on missing critical telemetry separately from a measured zero."
      ]
    },
    {
      scenario: "Prometheus scrapes successfully but samples are delayed",
      symptoms: [
        "Targets appear UP.",
        "Latest sample timestamps lag behind real time.",
        "Dashboards show intermittent gaps."
      ],
      investigation: [
        "Inspect scrape duration, interval, and scrape timestamps.",
        "Check Prometheus CPU, memory, disk latency, and ingestion behavior.",
        "Review exporter response time and sample volume.",
        "Check whether query limits or downstream storage add delay."
      ],
      resolution: [
        "Address the measured bottleneck in exporter response, ingestion capacity, or downstream query path.",
        "Tune scrape intervals only after assessing monitoring freshness requirements and capacity.",
        "Validate that critical metrics return to expected freshness."
      ],
      prevention: [
        "Monitor sample freshness and scrape duration.",
        "Load-test telemetry pipelines.",
        "Review scrape scheduling and exporter cost."
      ]
    },
    {
      scenario: "Metric is present locally but missing in remote storage",
      symptoms: [
        "Local Prometheus queries return data.",
        "Long-term storage queries return no data or show gaps.",
        "Remote-write error counters or pending samples increase."
      ],
      investigation: [
        "Inspect remote-write endpoint health and logs.",
        "Compare tenant, labels, timestamps, and time ranges.",
        "Review remote-write relabeling and downstream ingestion limits.",
        "Check remote storage availability and authentication."
      ],
      resolution: [
        "Restore the confirmed remote endpoint or correct the configuration.",
        "Assess whether queued samples can be delivered safely.",
        "Verify downstream data before closing the incident."
      ],
      prevention: [
        "Alert on remote-write failures and queue pressure.",
        "Monitor remote storage availability independently.",
        "Document data-gap and replay limitations."
      ]
    },
    {
      scenario: "Critical metric disappears but alert remains green",
      symptoms: [
        "A dashboard panel shows No data.",
        "An alert is inactive or not firing.",
        "The alert expression does not explicitly detect missing series."
      ],
      investigation: [
        "Inspect the alert expression and rule state.",
        "Determine how the alert system treats an empty result.",
        "Check whether a separate up or expected-metric presence alert exists."
      ],
      resolution: [
        "Create an explicit missing-telemetry alert using a known expected-target or metric-presence condition.",
        "Test the alert for both a missing series and a genuine zero.",
        "Verify notification delivery."
      ],
      prevention: [
        "Monitor telemetry presence as well as metric values.",
        "Test alert behavior when a target disappears.",
        "Use an independent alert-delivery path for critical monitoring failures."
      ]
    }
  ],

  recoveryProcedures: [
    {
      situation: "Target discovery or scrape configuration is incorrect",
      procedure: [
        "Capture the active targets and configuration evidence.",
        "Identify the specific missing selector, path, port, label, or scrape job.",
        "Validate the corrected configuration using the supported tooling for the deployment.",
        "Apply the reviewed change through the configuration source of truth.",
        "Confirm that the target is discovered and the scrape succeeds."
      ],
      validation: [
        "The target appears in the targets API.",
        "The up metric is 1 for the intended target.",
        "The expected metric appears with the correct labels and recent samples.",
        "Critical dashboards and alert rules return expected results."
      ],
      rollback: [
        "Restore the last known-good configuration revision if the new change causes additional failures.",
        "Revalidate configuration before reloading or rolling out.",
        "Confirm target health and rule behavior after rollback."
      ]
    },
    {
      situation: "Application or exporter stopped exposing metrics",
      procedure: [
        "Compare the actual endpoint with the expected metric schema.",
        "Check instrumentation initialization, exporter logs, application version, and endpoint configuration.",
        "Identify whether the metric is event-driven or should always exist.",
        "Correct the source or deploy a known-good version using the approved process."
      ],
      validation: [
        "The metrics endpoint exposes the expected metric family.",
        "Prometheus collects recent samples.",
        "Metric labels match dashboard and alert expectations."
      ],
      rollback: [
        "Roll back the application or exporter release only if it is the verified cause and rollback is compatible.",
        "Preserve application data and unrelated configuration changes.",
        "Retest metrics after the rollback."
      ]
    },
    {
      situation: "PromQL or Grafana query is incorrect",
      procedure: [
        "Capture the exact dashboard query, variables, datasource, and time range.",
        "Run the query directly in Prometheus.",
        "Remove filters one at a time to isolate the failing selector or expression.",
        "Correct the query or dashboard configuration in version control.",
        "Review all dependent panels and alert expressions."
      ],
      validation: [
        "The corrected query returns expected series.",
        "The dashboard shows appropriate values across representative time ranges.",
        "Alert rules using the query evaluate as expected."
      ],
      rollback: [
        "Restore the previous known-good dashboard or query revision if the change breaks other panels.",
        "Retain the diagnostic evidence and create a regression test."
      ]
    },
    {
      situation: "Prometheus storage or capacity problem",
      procedure: [
        "Collect storage, memory, ingestion, and Prometheus log evidence.",
        "Identify whether the problem is disk capacity, high cardinality, query load, or ingestion pressure.",
        "Plan the least disruptive supported capacity or instrumentation correction.",
        "Obtain approval before storage, retention, or database recovery operations."
      ],
      validation: [
        "Prometheus remains healthy and can query recent samples.",
        "Targets are scraped at the expected cadence.",
        "Critical metric freshness returns to normal."
      ],
      rollback: [
        "Revert only the specific capacity or configuration change if it introduces a regression.",
        "Never delete TSDB data or persistent volumes as a generic rollback.",
        "Use supported backup and recovery procedures if data integrity is affected."
      ]
    }
  ],

  cicdTroubleshooting: [
    "Store Prometheus configuration, alert rules, recording rules, and monitoring resources in version control.",
    "Validate Prometheus rule files before deployment using promtool check rules <rules-file>.",
    "Validate configuration using the promtool version compatible with the deployed Prometheus version.",
    "Validate Kubernetes manifests and Helm templates before rollout.",
    "Check ServiceMonitor and PodMonitor selectors against actual Service and pod labels.",
    "Add a smoke test that confirms the metrics endpoint returns the expected response.",
    "Add a bounded Prometheus query test for critical metric families after deployment.",
    "Check target discovery and target health after a monitoring configuration change.",
    "Run regression checks for critical PromQL expressions and recording rules.",
    "Review metric name, label, and cardinality changes as compatibility-impacting changes.",
    "Pin tested exporter and Prometheus versions.",
    "Use staging tests for scrape intervals, TLS, authentication, relabeling, and remote write.",
    "Use a reviewed rollout and rollback strategy for Prometheus and exporter upgrades.",
    "Prevent secrets from being printed into CI logs.",
    "Fail the pipeline when required metrics or targets disappear unexpectedly.",
    "For GitOps-managed monitoring, verify that the intended revision is reconciled and applied."
  ],

  monitoringAndPrevention: [
    "Monitor up for critical scrape jobs and alert when expected targets are unavailable.",
    "Remember that up equal to 1 means the scrape succeeded, not that all required metrics are present.",
    "Create explicit presence alerts for critical metric families.",
    "Monitor scrape duration, scrape errors, sample ingestion, target count, and last-sample freshness.",
    "Monitor Prometheus CPU, memory, disk, WAL health, series count, and query latency.",
    "Monitor remote-write queue pressure and failed or retried samples where those metrics are available.",
    "Monitor recording-rule and alert-rule evaluation errors.",
    "Create a synthetic query that verifies critical metrics are available from the intended datasource.",
    "Track metric names and labels as part of application compatibility reviews.",
    "Avoid unbounded labels such as user IDs, request IDs, and arbitrary URLs.",
    "Alert on unexpected changes in target count or critical metric availability.",
    "Test dashboards and alerts after application, exporter, Prometheus, and Grafana upgrades.",
    "Keep a known-good monitoring configuration and tested recovery instructions.",
    "Document which metrics are event-driven and may legitimately be absent before the first event.",
    "Test independent notification delivery when Prometheus, Grafana, or the primary network is unavailable.",
    "Run regular incident simulations for missing metrics and monitoring blind spots."
  ],

  incidentRunbook: [
    "1. Acknowledge the incident and record the UTC start time.",
    "2. Identify the exact metric, expected labels, dashboard, datasource, environment, and affected services.",
    "3. Determine whether the impact is one metric, one target, one job, one cluster, or the entire monitoring system.",
    "4. Check the raw metric query and the up metric in Prometheus.",
    "5. Inspect target discovery, scrape status, last error, and scrape timestamps.",
    "6. Check the application or exporter endpoint from the Prometheus network context.",
    "7. Investigate labels, metric names, target relabeling, metric relabeling, and recent deployments.",
    "8. If raw data exists, reproduce the exact Grafana query and inspect variables and transformations.",
    "9. Check recording rules, alert rules, ingestion capacity, and remote write as relevant.",
    "10. Apply the smallest evidence-based change through the approved configuration source.",
    "11. Verify recent samples, target health, dashboards, recording rules, and critical alert behavior.",
    "12. Observe several scrape and evaluation intervals before declaring recovery.",
    "13. Communicate the duration and impact of the monitoring blind spot.",
    "14. Document the root cause, evidence, remediation, rollback decision, and preventive actions.",
    "15. Track follow-up tasks to completion and update the runbook."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a missing metric in Prometheus",
      objective: "Distinguish a missing series from a query or target failure.",
      steps: [
        "Use a disposable Prometheus instance and a test metrics endpoint.",
        "Query up and then query a known metric.",
        "Inspect the targets API and identify the target's status.",
        "Compare the metric endpoint output with Prometheus results."
      ],
      successCriteria: [
        "The failing stage is identified.",
        "The conclusion is supported by query or endpoint evidence.",
        "The metric becomes queryable after the test issue is corrected."
      ]
    },
    {
      title: "Lab 2 — Fix a ServiceMonitor selector mismatch",
      objective: "Understand Kubernetes monitoring discovery.",
      steps: [
        "Deploy a sample app, Service, and ServiceMonitor in a test namespace.",
        "Introduce a label mismatch in the lab.",
        "Inspect the monitor selectors, Service labels, and Prometheus targets.",
        "Correct the selector and confirm discovery."
      ],
      successCriteria: [
        "The target appears in Prometheus.",
        "The scrape succeeds.",
        "Expected samples appear."
      ]
    },
    {
      title: "Lab 3 — Troubleshoot an incorrect metrics port",
      objective: "Separate application health from metrics endpoint health.",
      steps: [
        "Use a test application exposing metrics on a dedicated port.",
        "Configure the test scrape target with an incorrect port.",
        "Inspect the scrape error and test the actual endpoint.",
        "Correct the port and verify the target."
      ],
      successCriteria: [
        "The original scrape error is explained.",
        "The target becomes UP.",
        "The expected metric is available."
      ]
    },
    {
      title: "Lab 4 — Find a relabeling rule that drops samples",
      objective: "Understand metric relabeling behavior.",
      steps: [
        "Create a test scrape configuration with a rule that drops one sample family.",
        "Confirm that the source endpoint exposes the metric.",
        "Query Prometheus and observe the missing series.",
        "Correct the rule in the lab and validate the configuration."
      ],
      successCriteria: [
        "The difference between target relabeling and metric relabeling is explained.",
        "The corrected rule preserves intended samples.",
        "No unrelated test metrics are unexpectedly removed."
      ]
    },
    {
      title: "Lab 5 — Debug a PromQL label mismatch",
      objective: "Find why a dashboard selector returns no series.",
      steps: [
        "Create sample series with different job and instance labels.",
        "Run a query with an incorrect label matcher.",
        "Inspect the available labels and rerun the query without the incorrect matcher.",
        "Correct the selector and test a representative dashboard query."
      ],
      successCriteria: [
        "The exact mismatching label is identified.",
        "The corrected query returns the expected series.",
        "The change does not unintentionally combine unrelated environments."
      ]
    },
    {
      title: "Lab 6 — Investigate a missing recording-rule output",
      objective: "Diagnose rule loading and evaluation.",
      steps: [
        "Create a test recording rule using a known metric.",
        "Introduce a controlled invalid expression or missing input.",
        "Inspect the rules API and rule evaluation status.",
        "Correct the expression and verify the recorded series."
      ],
      successCriteria: [
        "The rule failure is identified from evidence.",
        "The corrected rule evaluates successfully.",
        "The resulting metric can be queried."
      ]
    },
    {
      title: "Lab 7 — Test missing telemetry alerting",
      objective: "Detect the absence of a critical metric.",
      steps: [
        "Create a test metric and a corresponding presence alert.",
        "Remove or stop the test source in the disposable environment.",
        "Verify that the alert detects the missing telemetry.",
        "Restore the source and verify the recovery notification."
      ],
      successCriteria: [
        "Missing data is distinguished from a genuine zero.",
        "The alert fires and recovers as expected.",
        "The test notification reaches the approved test destination."
      ]
    },
    {
      title: "Lab 8 — Investigate remote-write gaps",
      objective: "Locate missing data between local Prometheus and a remote backend.",
      steps: [
        "Use a test Prometheus and a supported remote-write destination.",
        "Compare the same metric locally and remotely.",
        "Inspect remote-write logs and available queue metrics.",
        "Correct the test endpoint or configuration and verify delivery."
      ],
      successCriteria: [
        "The data gap is located at the correct pipeline stage.",
        "Local and remote results are compared over the same time range.",
        "Recovery is verified without deleting data or queues."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "1. What do you check first when metrics are missing?",
      answer:
        "Identify the exact metric and time range, query it directly in Prometheus, inspect up, and determine whether the target is discovered and successfully scraped."
    },
    {
      question: "2. Does up equal to 1 mean all metrics are available?",
      answer:
        "No. It means the scrape succeeded. A particular metric may still be absent because of instrumentation, metric relabeling, metric lifecycle, or query filters."
    },
    {
      question: "3. What is the difference between target relabeling and metric relabeling?",
      answer:
        "Target relabeling changes target metadata and can drop targets before scraping. Metric relabeling operates on scraped samples and can drop or modify those samples."
    },
    {
      question: "4. Why is a ServiceMonitor not discovered?",
      answer:
        "Possible causes include Prometheus selectors, namespace selectors, incorrect labels, endpoint configuration, or a Service without matching ready endpoints."
    },
    {
      question: "5. How do you troubleshoot a missing metric when the target is UP?",
      answer:
        "Inspect the raw metrics endpoint, exact metric name and labels, metric relabeling, sample timestamps, instrumentation behavior, and PromQL selectors."
    },
    {
      question: "6. Why might a metric appear only after the first event?",
      answer:
        "Some instrumentation creates a counter or series lazily when the first operation occurs. Confirm the metric's intended lifecycle before treating its absence as a failure."
    },
    {
      question: "7. How do you debug an empty PromQL result?",
      answer:
        "Run the raw metric query, remove filters one at a time, inspect actual labels, verify time range and sample count, and then restore the intended expression."
    },
    {
      question: "8. What causes Grafana to show No data?",
      answer:
        "Missing samples, wrong datasource, label mismatch, query errors, time-range issues, variables, transformations, or a metric that has not been emitted."
    },
    {
      question: "9. How do you investigate a missing recording-rule output?",
      answer:
        "Check rule loading, evaluation errors, input metrics, expression correctness, and labels using the rules API and direct queries."
    },
    {
      question: "10. How do you verify remote-write problems?",
      answer:
        "Compare local and remote queries over the same time range, inspect remote-write logs and queue metrics, and verify endpoint, authentication, tenancy, and relabeling."
    },
    {
      question: "11. What is metric cardinality?",
      answer:
        "Cardinality is the number of distinct time series. Unbounded label values can create excessive series and increase memory, storage, and query costs."
    },
    {
      question: "12. Why can adding a label break a dashboard?",
      answer:
        "A query may require an exact old label set or use a matcher that no longer matches. Inspect the real series labels and update queries carefully."
    },
    {
      question: "13. What causes a target to disappear after deployment?",
      answer:
        "Changed pod or Service labels, ports, annotations, monitor selectors, endpoint paths, or target relabeling can affect discovery."
    },
    {
      question: "14. How do you troubleshoot scrape timeouts?",
      answer:
        "Inspect target errors, scrape duration, exporter response time, network path, resource usage, and scrape timeout configuration."
    },
    {
      question: "15. Why is a successful curl from a laptop insufficient?",
      answer:
        "The laptop may have different routing, DNS, credentials, or firewall access. Test from an approved environment matching Prometheus's network path."
    },
    {
      question: "16. How do you distinguish missing data from zero?",
      answer:
        "An empty query result means no matching series was returned. A zero is a real sample with numeric value zero. Alert and dashboard logic should preserve that distinction."
    },
    {
      question: "17. What if all metrics disappear at once?",
      answer:
        "Check broad scrape failures, configuration changes, Prometheus resource pressure, network outages, and storage or ingestion problems."
    },
    {
      question: "18. How do you validate Prometheus rules before deployment?",
      answer:
        "Use promtool check rules with a compatible tool version, review the change, test it in staging, and verify rule loading and evaluation after rollout."
    },
    {
      question: "19. What should be monitored for Prometheus itself?",
      answer:
        "Monitor target health, scrape duration, ingestion, resource usage, storage, query latency, rule evaluation, and remote-write health where applicable."
    },
    {
      question: "20. How do you detect missing metrics proactively?",
      answer:
        "Use explicit metric-presence alerts, expected-target checks, freshness checks, synthetic queries, and independent notification delivery."
    },
    {
      question: "21. What is a stale time series?",
      answer:
        "A series may stop producing samples or be marked stale according to Prometheus semantics. A query at the current evaluation time may not return a series whose samples are no longer considered current."
    },
    {
      question: "22. Why might rate() return no result?",
      answer:
        "There may be too few samples in the selected range, a series may be missing, or label filters may exclude it. Check the raw counter and scrape interval."
    },
    {
      question: "23. What do you do when disk usage is high on Prometheus?",
      answer:
        "Identify the consuming filesystem and workload, inspect retention and cardinality, and use supported capacity or retention procedures. Never delete TSDB data blindly."
    },
    {
      question: "24. How do you troubleshoot missing Kubernetes container metrics?",
      answer:
        "Check the relevant exporter or kubelet endpoint, target discovery, permissions, network access, metric names, labels, and whether the cluster uses the expected monitoring architecture."
    },
    {
      question: "25. Why can an alert stay green when a metric disappears?",
      answer:
        "The alert expression may return no series and not represent the missing condition. Create and test an explicit telemetry-presence alert."
    },
    {
      question: "26. How do you safely roll back a monitoring change?",
      answer:
        "Identify the faulty revision, confirm the previous configuration is compatible, obtain approval, revert through the source of truth, and verify targets, metrics, rules, and dashboards."
    },
    {
      question: "27. What is the purpose of a post-incident report?",
      answer:
        "It records impact, timeline, evidence, root cause, remediation, validation, monitoring gaps, and assigned preventive actions."
    },
    {
      question: "28. How do you confirm a missing-metrics incident is resolved?",
      answer:
        "Confirm target discovery, successful scraping, recent metric samples, expected labels, dashboard queries, recording rules, alerts, and downstream storage where applicable."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Title: Missing production metrics",
    "Environment / cluster / namespace:",
    "Incident owner:",
    "Severity and justification:",
    "Start time (UTC):",
    "Last known good sample time (UTC):",
    "Detection time (UTC):",
    "Recovery time (UTC):",
    "Affected metric names and labels:",
    "Affected applications, targets, and dashboards:",
    "Business and monitoring impact:",
    "Critical alerts or SLOs affected:",
    "Evidence collected:",
    "Prometheus target status and scrape errors:",
    "Metrics endpoint verification:",
    "PromQL and label investigation:",
    "Rule evaluation and remote-write findings:",
    "Confirmed root cause:",
    "Contributing factors:",
    "Recent changes investigated:",
    "Remediation and approval:",
    "Rollback decision:",
    "Validation results:",
    "Monitoring blind-spot duration:",
    "Prevention actions, owners, and due dates:",
    "Runbook and CI/CD changes:",
    "Incident closure approval:"
  ],

  officialReferences: [
    {
      title: "Prometheus Documentation",
      url: "https://prometheus.io/docs/introduction/overview/"
    },
    {
      title: "Prometheus Querying Basics",
      url: "https://prometheus.io/docs/prometheus/latest/querying/basics/"
    },
    {
      title: "Prometheus HTTP API",
      url: "https://prometheus.io/docs/prometheus/latest/querying/api/"
    },
    {
      title: "Prometheus Configuration",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/configuration/"
    },
    {
      title: "Prometheus Relabeling Configuration",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config"
    },
    {
      title: "Prometheus Recording Rules",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/"
    },
    {
      title: "Prometheus Alerting Rules",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/"
    },
    {
      title: "Prometheus Remote Write",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write"
    },
    {
      title: "Prometheus Operator",
      url: "https://prometheus-operator.dev/"
    },
    {
      title: "Grafana Troubleshooting",
      url: "https://grafana.com/docs/grafana/latest/troubleshooting/"
    },
    {
      title: "Grafana Prometheus Data Source",
      url: "https://grafana.com/docs/grafana/latest/datasources/prometheus/"
    },
    {
      title: "Kubernetes Debugging Applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    }
  ]
};
