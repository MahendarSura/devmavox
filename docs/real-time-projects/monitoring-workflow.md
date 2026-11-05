# Real-Time Production Monitoring and Incident Response Workflow

**Workflow 03 | Observability, Alerting, Troubleshooting and Recovery**

Monitoring is a continuous production activity. It helps engineering teams understand whether applications are available, how users experience them and where failures occur. A complete observability process combines metrics, logs, traces, alerting, incident ownership and recovery procedures.

## 1. Monitoring Architecture

A typical monitoring architecture includes:

- **Application:** Exposes health information and application metrics.
- **Infrastructure:** Provides CPU, memory, disk, network and node-level metrics.
- **Prometheus:** Collects and stores time-series metrics.
- **Grafana:** Displays dashboards and helps engineers investigate trends.
- **Alertmanager:** Groups, routes and manages Prometheus alerts.
- **Logging platform:** Collects application, container and infrastructure logs.
- **On-call team:** Investigates alerts, mitigates incidents and communicates recovery.

The application produces metrics and logs. Monitoring agents or exporters expose infrastructure information. Prometheus collects metrics at configured intervals. Grafana queries the metric store and displays dashboards. Alert rules detect abnormal conditions and Alertmanager sends notifications to the responsible team.

## 2. Define Service Objectives and Critical Signals

Before creating dashboards, define what the service is expected to deliver.

- **Availability:** Whether users can successfully access the service.
- **Latency:** How long requests take to complete.
- **Error rate:** The proportion of requests that fail.
- **Saturation:** How close a resource is to its usable capacity.
- **Throughput:** The number of requests or transactions processed over time.

These signals are often called the four golden signals. Also monitor dependencies such as databases, queues, external APIs and storage.

Define service-level indicators (SLIs), service-level objectives (SLOs) and an error budget. An SLI is a measured indicator; an SLO is the target for that indicator. Avoid choosing alert thresholds without considering customer impact and historical service behavior.

## 3. Prepare the Monitoring Environment

For Kubernetes, confirm that the cluster, nodes and application workloads are healthy before installing monitoring components.

### Commands

```bash
kubectl get nodes
kubectl get pods -A
kubectl get services -A
kubectl get events -A --sort-by=.metadata.creationTimestamp
kubectl top nodes
kubectl top pods -A
```

The `kubectl top` commands require a working metrics API such as Metrics Server. These resource metrics are useful for capacity checks but are not a replacement for a complete Prometheus monitoring system.

Plan storage, retention, access control, network access and resource requests for monitoring components. Monitoring systems must not consume so many resources that they destabilize the applications they observe.

## 4. Install Prometheus and Grafana

A common Kubernetes deployment method is to install a maintained Helm chart such as `kube-prometheus-stack`. Review chart versions, values and security settings before installing in production.

### Example commands

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm search repo prometheus-community/kube-prometheus-stack

helm upgrade --install monitoring \
  prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --values monitoring-values.yaml
```

The example assumes that Helm is configured for the intended cluster. Pin and review chart versions for controlled production upgrades.

### Verify installation

```bash
kubectl get pods -n monitoring
kubectl get services -n monitoring
kubectl get deployments -n monitoring
kubectl get pvc -n monitoring
```

Confirm that Prometheus, Grafana and Alertmanager are ready. Configure authentication and restrict access to their interfaces. Do not expose administrative monitoring endpoints publicly without appropriate security controls.

## 5. Configure Application Metrics

Applications should expose metrics that represent real service behavior. Common metrics include:

- Request count.
- Request duration.
- Failed request count.
- Active requests.
- Queue depth.
- Database connection pool usage.
- Dependency call duration.
- Business transaction success and failure counts.

Use metric names, labels and units consistently. Avoid high-cardinality labels such as user IDs, email addresses or unbounded request paths. High cardinality can increase monitoring storage and query costs.

An application metrics endpoint is commonly exposed at `/metrics`, depending on the instrumentation library. Restrict access to this endpoint according to the monitoring architecture.

## 6. Configure Prometheus Scraping

Prometheus discovers targets through static configuration or service discovery. In Kubernetes, a ServiceMonitor or PodMonitor can be used when the Prometheus Operator is installed and configured to select those resources.

### Example ServiceMonitor

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: backend-monitor
  namespace: monitoring
  labels:
    release: monitoring
spec:
  namespaceSelector:
    matchNames:
      - production
  selector:
    matchLabels:
      app: backend
  endpoints:
    - port: metrics
      path: /metrics
      interval: 30s
```

The Service must have a port named `metrics`, and its labels must match the selector. The Prometheus instance must select the ServiceMonitor's namespace and labels. Adjust the `release` label to match the installed chart configuration.

### Validation

```bash
kubectl get servicemonitor -A
kubectl get services -n production
kubectl describe servicemonitor backend-monitor -n monitoring
```

Open the Prometheus targets page through the approved internal access method and verify that the application target is `UP`.

## 7. Create Grafana Dashboards

Dashboards should answer operational questions quickly rather than display every available metric.

Create separate dashboard sections for:

1. Service availability and request success.
2. Request volume and throughput.
3. p50, p95 and p99 latency.
4. Application error rates.
5. Pod restarts and readiness.
6. CPU and memory usage.
7. Node capacity and disk pressure.
8. Database connections and query latency.
9. Queue depth and consumer lag.
10. Deployment and release activity.

Use consistent time ranges, units and labels. Add links to relevant logs, runbooks and service ownership information. Provision important production dashboards through version-controlled configuration rather than relying only on manual edits.

## 8. Configure Prometheus Alert Rules

Alert on symptoms that indicate customer impact or a meaningful risk to service reliability. Examples include sustained high error rates, unavailable replicas, elevated latency and resource exhaustion.

### Example PrometheusRule

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: application-alerts
  namespace: monitoring
  labels:
    release: monitoring
spec:
  groups:
    - name: application.rules
      rules:
        - alert: BackendTargetDown
          expr: up{job="backend"} == 0
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: Backend metrics target is unavailable
            description: Prometheus has not been able to scrape the backend target for five minutes.

        - alert: HighPodRestartCount
          expr: increase(kube_pod_container_status_restarts_total{namespace="production"}[15m]) > 3
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: Application containers are restarting repeatedly
            description: Investigate Pod events, previous container logs and resource limits.
```

These are illustrative rules. Confirm metric names, labels and selectors in the actual Prometheus environment. A target being down does not always mean the user-facing service is unavailable, so correlate alerts with service-level signals.

## 9. Configure Alertmanager Notifications

Alertmanager groups related alerts, applies routing rules, manages silences and sends notifications to configured receivers.

Production alert routing should define:

- Which team owns each service.
- Which alerts require immediate paging.
- Which alerts can be handled during business hours.
- Escalation rules when the first responder does not acknowledge.
- Maintenance windows and approved silences.
- Notification channels and fallback contacts.

Avoid sending every warning to the on-call engineer. Group duplicate alerts, use meaningful labels and include runbook links. Test notification delivery before relying on it during an incident.

## 10. Centralized Logging

Metrics show what is happening; logs help explain why it is happening. Collect logs from applications, containers, Kubernetes events and relevant infrastructure components.

A log entry should ideally include:

- Timestamp.
- Severity.
- Service name.
- Environment.
- Request or correlation ID.
- Event message.
- Relevant non-sensitive context.

Do not log passwords, access tokens, private keys or sensitive user data. Define log retention, access restrictions and storage limits.

### Kubernetes log commands

```bash
kubectl logs POD_NAME -n production
kubectl logs POD_NAME -n production --previous
kubectl logs deployment/backend -n production --tail=200
kubectl describe pod POD_NAME -n production
kubectl get events -n production --sort-by=.metadata.creationTimestamp
```

Use centralized log search to correlate errors across frontend, backend and database services using timestamps and request identifiers.

## 11. Distributed Tracing and Dependency Analysis

For applications with multiple services, distributed tracing helps follow a request across service boundaries. Instrument services with a supported tracing library and propagate trace context between calls.

A trace can help answer:

1. Which service received the request?
2. Which downstream service was called?
3. How much time was spent in each operation?
4. Where did an error occur?
5. Was the delay caused by the application, database or external dependency?

Use trace sampling and retention policies appropriate for production traffic. Avoid collecting sensitive request payloads in traces.

## 12. Production Incident Detection and Triage

When an alert fires, first determine whether users are affected. Do not assume that every alert is a production outage.

### Initial triage

1. Identify the affected service and environment.
2. Check availability, latency and error-rate dashboards.
3. Review the alert details and the time the issue began.
4. Check recent deployments and configuration changes.
5. Inspect Pod, node and dependency health.
6. Search application logs using the incident time window.
7. Determine customer impact and incident severity.
8. Assign an incident owner and communicate the investigation status.

### Useful commands

```bash
kubectl get pods -A
kubectl get nodes
kubectl top nodes
kubectl top pods -A
kubectl get events -A --sort-by=.metadata.creationTimestamp
kubectl logs deployment/backend -n production --tail=200
```

Preserve evidence before restarting or deleting resources when practical. Record timestamps, affected versions, error messages and observed symptoms.

## 13. Investigate Common Production Symptoms

**High application latency**

Check request duration by endpoint, CPU throttling, memory pressure, database query latency, connection pool saturation and external dependency response times.

**High error rate**

Group errors by status code and service. Check application exceptions, dependency failures, recent configuration changes, authentication problems and database availability.

**Pod restarts increase**

Inspect previous container logs, exit codes, OOMKilled status, liveness probes and resource limits. Identify whether the application is crashing or Kubernetes is restarting it due to health checks.

**Database connection exhaustion**

Inspect active connections, connection pool settings, slow queries, idle sessions and application retry behavior. Avoid increasing connection limits without checking database capacity.

**Monitoring target is missing**

Check service discovery, labels, ServiceMonitor selectors, namespace selection, scrape path, port name and network policies.

## 14. Incident Mitigation and Recovery

The first goal during an incident is to reduce customer impact safely. Depending on the root cause, mitigation may include:

- Rolling back a failed application release.
- Scaling healthy application replicas within available capacity.
- Disabling a failing optional feature using an approved feature flag.
- Restoring a failed dependency.
- Reverting a configuration change.
- Redirecting traffic through an approved failover path.

Do not make several unrelated changes at once. Record each action and its result so responders can identify which change improved or worsened the situation.

## 15. Verify Service Recovery

After mitigation:

1. Confirm application endpoints respond successfully.
2. Verify the expected number of replicas are ready.
3. Confirm Service endpoints and ingress routing.
4. Check error rate and latency dashboards.
5. Confirm database and external dependencies are healthy.
6. Verify that alerts return to their expected state.
7. Ask the service owner or business representative to confirm user-facing recovery where appropriate.
8. Continue monitoring for recurrence.

A service is not fully recovered merely because its Pods are running. Validate the user-facing transaction and its dependencies.

## 16. Incident Communication and Ownership

Every production service should have a named owner and an escalation path. During a significant incident, assign responsibilities where possible:

- Incident commander coordinates the response.
- Technical responders investigate and mitigate.
- Communications owner provides status updates.
- Service owner validates business functionality.

Communicate confirmed facts, current impact, mitigation actions and the next update time. Avoid speculation and clearly identify unknowns.

## 17. Post-Incident Review and Continuous Improvement

After recovery, conduct a blameless review focused on system improvements.

Record:

1. Incident summary and severity.
2. Start time, detection time and recovery time.
3. Customer and business impact.
4. Timeline of important events.
5. Root cause and contributing factors.
6. Detection gaps and response delays.
7. Recovery actions and their results.
8. Preventive and corrective action items.
9. Owners and target dates for follow-up work.

Actions may include adding tests, improving alert thresholds, correcting resource limits, introducing safer deployment strategies, improving runbooks or removing a single point of failure.

## 18. Monitoring Security and Reliability

Monitoring infrastructure is sensitive because it may reveal service topology, internal hostnames and operational behavior.

- Restrict dashboard and metrics access.
- Use authentication and role-based permissions.
- Protect notification credentials.
- Encrypt data in transit and at rest where supported.
- Define retention and deletion policies.
- Monitor the monitoring platform itself.
- Test backups and restoration of important monitoring configuration.
- Keep exporters and monitoring components updated.
- Avoid exposing internal metrics endpoints publicly.

## 19. Production Monitoring Checklist

Before declaring a service operational, confirm:

- Application and infrastructure metrics are collected.
- Critical dashboards show useful service signals.
- Alert rules are tested and routed to the right owners.
- Notification delivery works.
- Logs can be searched by service and request identifier.
- Runbooks exist for important alerts.
- Service ownership and escalation paths are documented.
- Retention and access policies are configured.
- Monitoring components have capacity and availability plans.
- Incident recovery and post-incident review procedures are defined.

## 20. End-to-End Incident Response Workflow

A mature incident response process follows a repeatable lifecycle:

1. **Detect:** Monitoring identifies an abnormal service condition.
2. **Triage:** Responders determine severity and customer impact.
3. **Investigate:** Metrics, logs, traces and deployment history provide evidence.
4. **Mitigate:** The team reduces customer impact using a controlled action.
5. **Recover:** The service returns to normal operation.
6. **Validate:** User-facing transactions and service objectives are checked.
7. **Communicate:** Stakeholders receive accurate incident updates.
8. **Review:** The team documents the cause and timeline.
9. **Improve:** Preventive actions reduce the chance of recurrence.

The objective of monitoring is not simply to create dashboards and alerts. It is to detect meaningful failures, help engineers make evidence-based decisions and continuously improve production reliability.
