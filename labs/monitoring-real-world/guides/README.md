# Six lab guides

Run the real local stack as described in the parent README, then complete these in order:

1. [Prometheus and PromQL](01-prometheus-promql.md)
2. [Grafana dashboards](02-grafana-dashboard.md)
3. [Logs with Loki](03-logs-loki.md)
4. [Distributed traces with Tempo](04-traces-tempo.md)
5. [Alert lifecycle](05-alert-lifecycle.md)
6. [Kubernetes fault reproduction and recovery](06-kubernetes-faults.md)

Each lab requires real command execution and observable evidence. Do not mark a lab passed from screenshots of the existing browser simulator.

## Real evidence assessment
At the beginning of a lab, run `bash /workspace/scripts/lab-assess.sh start <lab-id>`. Complete the exercise, then run `bash /workspace/scripts/lab-assess.sh verify <same-lab-id>`. Grafana assessment requires a saved student dashboard; alert assessment requires the watcher to record pending, firing and inactive states; Kubernetes assessment requires retained fault Events and a healthy recovered deployment. Valid IDs: `promql`, `grafana`, `logs`, `traces`, `alerts`, `kubernetes`. Attempts, elapsed seconds, score, verification status and evidence are persisted in the terminal's local Docker volume at `~/.lab-state/assessment.json`. The checks query real service APIs and cluster state, not the browser simulator. The current grader is a local infrastructure-evidence checker, not a full answer-quality grader; scores are stored in the student's Docker volume and are not synchronized to a remote student account or Vercel website.
