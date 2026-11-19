import type { AtoZLesson } from "../lessons";

export const prometheusAtoZLessons: Record<string, AtoZLesson> = {
  "prometheus/monitoring-fundamentals": {
    "summary": "Monitoring collects and evaluates system and application signals so teams can understand availability, performance and failures.",
    "diagram": {
      "title": "Monitoring Fundamentals monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Monitoring collects and evaluates system and application signals so teams can understand availability, performance and failures.",
          "This capability helps teams observe monitoring fundamentals in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Monitoring Fundamentals when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Monitoring collects and evaluates system and application signals so teams can understand availability, performance and failures. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Monitoring Fundamentals with a real monitoring example.",
        "answer": "Monitoring collects and evaluates system and application signals so teams can understand availability, performance and failures. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/prometheus-introduction": {
    "summary": "Prometheus is an open-source monitoring system that collects and stores time-series metrics and evaluates PromQL queries and alerting rules.",
    "diagram": {
      "title": "Prometheus Introduction monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus is an open-source monitoring system that collects and stores time-series metrics and evaluates PromQL queries and alerting rules.",
          "This capability helps teams observe prometheus introduction in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Prometheus Introduction when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "promtool --version\ncurl -s http://localhost:9090/-/healthy",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus is an open-source monitoring system that collects and stores time-series metrics and evaluates PromQL queries and alerting rules. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Prometheus Introduction with a real monitoring example.",
        "answer": "Prometheus is an open-source monitoring system that collects and stores time-series metrics and evaluates PromQL queries and alerting rules. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/prometheus-architecture": {
    "summary": "Prometheus scrapes targets, stores samples in its time-series database, evaluates rules and sends alerts to Alertmanager.",
    "diagram": {
      "title": "Prometheus Architecture monitoring flow",
      "nodes": [
        "exporters / app metrics",
        "scrape manager",
        "TSDB",
        "PromQL and rules",
        "Alertmanager"
      ],
      "explanation": "exporters / app metrics → scrape manager → TSDB → PromQL and rules → Alertmanager. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus scrapes targets, stores samples in its time-series database, evaluates rules and sends alerts to Alertmanager.",
          "This capability helps teams observe prometheus architecture in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Prometheus Architecture when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "exporters / app metrics → scrape manager → TSDB → PromQL and rules → Alertmanager. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus scrapes targets, stores samples in its time-series database, evaluates rules and sends alerts to Alertmanager. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Prometheus Architecture with a real monitoring example.",
        "answer": "Prometheus scrapes targets, stores samples in its time-series database, evaluates rules and sends alerts to Alertmanager. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/pull-based-monitoring": {
    "summary": "Pull-based monitoring has Prometheus periodically request metrics from instrumented targets over HTTP.",
    "diagram": {
      "title": "Pull-based Monitoring monitoring flow",
      "nodes": [
        "Prometheus scheduler",
        "HTTP scrape request",
        "/metrics endpoint",
        "sample ingestion"
      ],
      "explanation": "Prometheus scheduler → HTTP scrape request → /metrics endpoint → sample ingestion. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Pull-based monitoring has Prometheus periodically request metrics from instrumented targets over HTTP.",
          "This capability helps teams observe pull-based monitoring in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pull-based Monitoring when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Prometheus scheduler → HTTP scrape request → /metrics endpoint → sample ingestion. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Pull-based monitoring has Prometheus periodically request metrics from instrumented targets over HTTP. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Pull-based Monitoring with a real monitoring example.",
        "answer": "Pull-based monitoring has Prometheus periodically request metrics from instrumented targets over HTTP. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/time-series-data": {
    "summary": "A time series is a sequence of timestamped samples identified by a metric name and label set.",
    "diagram": {
      "title": "Time Series Data monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A time series is a sequence of timestamped samples identified by a metric name and label set.",
          "This capability helps teams observe time series data in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Time Series Data when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A time series is a sequence of timestamped samples identified by a metric name and label set. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Time Series Data with a real monitoring example.",
        "answer": "A time series is a sequence of timestamped samples identified by a metric name and label set. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/metrics-and-labels": {
    "summary": "Metrics represent measurements and labels add dimensions used to select and aggregate time series.",
    "diagram": {
      "title": "Metrics and Labels monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Metrics represent measurements and labels add dimensions used to select and aggregate time series.",
          "This capability helps teams observe metrics and labels in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Metrics and Labels when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Metrics represent measurements and labels add dimensions used to select and aggregate time series. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Metrics and Labels with a real monitoring example.",
        "answer": "Metrics represent measurements and labels add dimensions used to select and aggregate time series. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/metric-types": {
    "summary": "Prometheus metric types include counter, gauge, histogram and summary, each suited to different measurement patterns.",
    "diagram": {
      "title": "Metric Types monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus metric types include counter, gauge, histogram and summary, each suited to different measurement patterns.",
          "This capability helps teams observe metric types in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Metric Types when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus metric types include counter, gauge, histogram and summary, each suited to different measurement patterns. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Metric Types with a real monitoring example.",
        "answer": "Prometheus metric types include counter, gauge, histogram and summary, each suited to different measurement patterns. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/prometheus-installation": {
    "summary": "Prometheus installation deploys the server with configuration, storage, scrape targets and lifecycle management.",
    "diagram": {
      "title": "Prometheus Installation monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus installation deploys the server with configuration, storage, scrape targets and lifecycle management.",
          "This capability helps teams observe prometheus installation in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Prometheus Installation when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus installation deploys the server with configuration, storage, scrape targets and lifecycle management. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Prometheus Installation with a real monitoring example.",
        "answer": "Prometheus installation deploys the server with configuration, storage, scrape targets and lifecycle management. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/prometheus-yml": {
    "summary": "prometheus.yml configures global settings, scrape jobs, rule files and Alertmanager integration.",
    "diagram": {
      "title": "prometheus.yml monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "prometheus.yml configures global settings, scrape jobs, rule files and Alertmanager integration.",
          "This capability helps teams observe prometheus.yml in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use prometheus.yml when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "promtool check config prometheus.yml",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "prometheus.yml configures global settings, scrape jobs, rule files and Alertmanager integration. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain prometheus.yml with a real monitoring example.",
        "answer": "prometheus.yml configures global settings, scrape jobs, rule files and Alertmanager integration. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/scrape-configuration": {
    "summary": "Scrape configuration defines how Prometheus discovers and collects metrics from targets.",
    "diagram": {
      "title": "Scrape Configuration monitoring flow",
      "nodes": [
        "prometheus.yml job",
        "target discovery",
        "scrape interval/path",
        "metrics endpoint"
      ],
      "explanation": "prometheus.yml job → target discovery → scrape interval/path → metrics endpoint. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Scrape configuration defines how Prometheus discovers and collects metrics from targets.",
          "This capability helps teams observe scrape configuration in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Scrape Configuration when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "prometheus.yml job → target discovery → scrape interval/path → metrics endpoint. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "promtool check config prometheus.yml\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Scrape configuration defines how Prometheus discovers and collects metrics from targets. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Scrape Configuration with a real monitoring example.",
        "answer": "Scrape configuration defines how Prometheus discovers and collects metrics from targets. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/service-discovery": {
    "summary": "Service discovery dynamically finds scrape targets from platforms such as Kubernetes, cloud APIs or static configuration.",
    "diagram": {
      "title": "Service Discovery monitoring flow",
      "nodes": [
        "Kubernetes API / cloud API",
        "discovery labels",
        "relabeling",
        "scrape target list"
      ],
      "explanation": "Kubernetes API / cloud API → discovery labels → relabeling → scrape target list. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Service discovery dynamically finds scrape targets from platforms such as Kubernetes, cloud APIs or static configuration.",
          "This capability helps teams observe service discovery in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Service Discovery when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Kubernetes API / cloud API → discovery labels → relabeling → scrape target list. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Service discovery dynamically finds scrape targets from platforms such as Kubernetes, cloud APIs or static configuration. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Service Discovery with a real monitoring example.",
        "answer": "Service discovery dynamically finds scrape targets from platforms such as Kubernetes, cloud APIs or static configuration. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/node-exporter": {
    "summary": "Node Exporter exposes Linux host metrics such as CPU, memory, filesystem and network statistics for Prometheus scraping.",
    "diagram": {
      "title": "Node Exporter monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Node Exporter exposes Linux host metrics such as CPU, memory, filesystem and network statistics for Prometheus scraping.",
          "This capability helps teams observe node exporter in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Node Exporter when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9100/metrics | head",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Node Exporter exposes Linux host metrics such as CPU, memory, filesystem and network statistics for Prometheus scraping. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Node Exporter with a real monitoring example.",
        "answer": "Node Exporter exposes Linux host metrics such as CPU, memory, filesystem and network statistics for Prometheus scraping. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/blackbox-exporter": {
    "summary": "Blackbox Exporter probes endpoints over HTTP, HTTPS, DNS, TCP, ICMP or gRPC and exposes probe results as metrics.",
    "diagram": {
      "title": "Blackbox Exporter monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Blackbox Exporter probes endpoints over HTTP, HTTPS, DNS, TCP, ICMP or gRPC and exposes probe results as metrics.",
          "This capability helps teams observe blackbox exporter in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Blackbox Exporter when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s 'http://localhost:9115/probe?target=https://example.com&module=http_2xx' | head",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Blackbox Exporter probes endpoints over HTTP, HTTPS, DNS, TCP, ICMP or gRPC and exposes probe results as metrics. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Blackbox Exporter with a real monitoring example.",
        "answer": "Blackbox Exporter probes endpoints over HTTP, HTTPS, DNS, TCP, ICMP or gRPC and exposes probe results as metrics. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/application-instrumentation": {
    "summary": "Application instrumentation exposes business and runtime metrics through a Prometheus-compatible endpoint or client library.",
    "diagram": {
      "title": "Application Instrumentation monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Application instrumentation exposes business and runtime metrics through a Prometheus-compatible endpoint or client library.",
          "This capability helps teams observe application instrumentation in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Application Instrumentation when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:8080/metrics | head",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Application instrumentation exposes business and runtime metrics through a Prometheus-compatible endpoint or client library. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Application Instrumentation with a real monitoring example.",
        "answer": "Application instrumentation exposes business and runtime metrics through a Prometheus-compatible endpoint or client library. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/promql-basics": {
    "summary": "PromQL is Prometheus' query language for selecting, filtering and calculating time-series metrics.",
    "diagram": {
      "title": "PromQL Basics monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "PromQL is Prometheus' query language for selecting, filtering and calculating time-series metrics.",
          "This capability helps teams observe promql basics in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use PromQL Basics when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -G 'http://localhost:9090/api/v1/query' --data-urlencode 'query=up'",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "PromQL is Prometheus' query language for selecting, filtering and calculating time-series metrics. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain PromQL Basics with a real monitoring example.",
        "answer": "PromQL is Prometheus' query language for selecting, filtering and calculating time-series metrics. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/selectors-and-operators": {
    "summary": "PromQL selectors choose series by metric and labels; operators filter, compare and combine vectors and scalars.",
    "diagram": {
      "title": "Selectors and Operators monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "PromQL selectors choose series by metric and labels; operators filter, compare and combine vectors and scalars.",
          "This capability helps teams observe selectors and operators in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Selectors and Operators when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "PromQL selectors choose series by metric and labels; operators filter, compare and combine vectors and scalars. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Selectors and Operators with a real monitoring example.",
        "answer": "PromQL selectors choose series by metric and labels; operators filter, compare and combine vectors and scalars. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/rate-and-increase": {
    "summary": "rate calculates per-second average counter increase over a range; increase calculates total counter growth over that range.",
    "diagram": {
      "title": "Rate and Increase monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "rate calculates per-second average counter increase over a range; increase calculates total counter growth over that range.",
          "This capability helps teams observe rate and increase in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Rate and Increase when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -G 'http://localhost:9090/api/v1/query' --data-urlencode 'query=rate(http_requests_total[5m])'",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "rate calculates per-second average counter increase over a range; increase calculates total counter growth over that range. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Rate and Increase with a real monitoring example.",
        "answer": "rate calculates per-second average counter increase over a range; increase calculates total counter growth over that range. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/aggregations": {
    "summary": "PromQL aggregations combine series using operations such as sum, avg, max, min and count with optional grouping.",
    "diagram": {
      "title": "Aggregations monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "PromQL aggregations combine series using operations such as sum, avg, max, min and count with optional grouping.",
          "This capability helps teams observe aggregations in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Aggregations when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "PromQL aggregations combine series using operations such as sum, avg, max, min and count with optional grouping. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Aggregations with a real monitoring example.",
        "answer": "PromQL aggregations combine series using operations such as sum, avg, max, min and count with optional grouping. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/recording-rules": {
    "summary": "Recording rules precompute PromQL expressions and store results as new time series for efficient dashboards and alerts.",
    "diagram": {
      "title": "Recording Rules monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Recording rules precompute PromQL expressions and store results as new time series for efficient dashboards and alerts.",
          "This capability helps teams observe recording rules in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Recording Rules when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "promtool check rules rules/*.yml",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Recording rules precompute PromQL expressions and store results as new time series for efficient dashboards and alerts. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Recording Rules with a real monitoring example.",
        "answer": "Recording rules precompute PromQL expressions and store results as new time series for efficient dashboards and alerts. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/alerting-rules": {
    "summary": "Alerting rules evaluate PromQL conditions and create pending or firing alerts based on configured duration and labels.",
    "diagram": {
      "title": "Alerting Rules monitoring flow",
      "nodes": [
        "PromQL expression",
        "pending duration",
        "firing alert",
        "Alertmanager"
      ],
      "explanation": "PromQL expression → pending duration → firing alert → Alertmanager. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Alerting rules evaluate PromQL conditions and create pending or firing alerts based on configured duration and labels.",
          "This capability helps teams observe alerting rules in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Alerting Rules when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "PromQL expression → pending duration → firing alert → Alertmanager. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "promtool check rules rules/*.yml\ncurl -s http://localhost:9090/api/v1/rules",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Alerting rules evaluate PromQL conditions and create pending or firing alerts based on configured duration and labels. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Alerting Rules with a real monitoring example.",
        "answer": "Alerting rules evaluate PromQL conditions and create pending or firing alerts based on configured duration and labels. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/alertmanager": {
    "summary": "Alertmanager groups, deduplicates, routes, silences and inhibits alerts received from Prometheus.",
    "diagram": {
      "title": "Alertmanager monitoring flow",
      "nodes": [
        "Prometheus alert",
        "grouping and deduplication",
        "routing tree",
        "receiver"
      ],
      "explanation": "Prometheus alert → grouping and deduplication → routing tree → receiver. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Alertmanager groups, deduplicates, routes, silences and inhibits alerts received from Prometheus.",
          "This capability helps teams observe alertmanager in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Alertmanager when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Prometheus alert → grouping and deduplication → routing tree → receiver. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "amtool alert query\namtool config routes test --config.file=alertmanager.yml alertname=Test",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Alertmanager groups, deduplicates, routes, silences and inhibits alerts received from Prometheus. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Alertmanager with a real monitoring example.",
        "answer": "Alertmanager groups, deduplicates, routes, silences and inhibits alerts received from Prometheus. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/alert-routing": {
    "summary": "Alert routing directs grouped alerts to receivers based on labels and route configuration.",
    "diagram": {
      "title": "Alert Routing monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Alert routing directs grouped alerts to receivers based on labels and route configuration.",
          "This capability helps teams observe alert routing in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Alert Routing when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Alert routing directs grouped alerts to receivers based on labels and route configuration. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Alert Routing with a real monitoring example.",
        "answer": "Alert routing directs grouped alerts to receivers based on labels and route configuration. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/silences-and-inhibition": {
    "summary": "Silences suppress matching alerts for a time window; inhibition suppresses lower-priority alerts when related higher-priority alerts fire.",
    "diagram": {
      "title": "Silences and Inhibition monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Silences suppress matching alerts for a time window; inhibition suppresses lower-priority alerts when related higher-priority alerts fire.",
          "This capability helps teams observe silences and inhibition in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Silences and Inhibition when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "amtool silence query\namtool alert query",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Silences suppress matching alerts for a time window; inhibition suppresses lower-priority alerts when related higher-priority alerts fire. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Silences and Inhibition with a real monitoring example.",
        "answer": "Silences suppress matching alerts for a time window; inhibition suppresses lower-priority alerts when related higher-priority alerts fire. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/service-monitors": {
    "summary": "A Prometheus Operator ServiceMonitor selects Kubernetes Services and defines how their endpoints should be scraped.",
    "diagram": {
      "title": "Service Monitors monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Prometheus Operator ServiceMonitor selects Kubernetes Services and defines how their endpoints should be scraped.",
          "This capability helps teams observe service monitors in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Service Monitors when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Prometheus Operator ServiceMonitor selects Kubernetes Services and defines how their endpoints should be scraped. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Service Monitors with a real monitoring example.",
        "answer": "A Prometheus Operator ServiceMonitor selects Kubernetes Services and defines how their endpoints should be scraped. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/pod-monitors": {
    "summary": "A PodMonitor selects Pods directly and configures endpoint scraping without requiring a Service.",
    "diagram": {
      "title": "Pod Monitors monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A PodMonitor selects Pods directly and configures endpoint scraping without requiring a Service.",
          "This capability helps teams observe pod monitors in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pod Monitors when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A PodMonitor selects Pods directly and configures endpoint scraping without requiring a Service. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Pod Monitors with a real monitoring example.",
        "answer": "A PodMonitor selects Pods directly and configures endpoint scraping without requiring a Service. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/kubernetes-monitoring": {
    "summary": "Kubernetes monitoring collects cluster, node, Pod and application metrics using service discovery and exporters.",
    "diagram": {
      "title": "Kubernetes Monitoring monitoring flow",
      "nodes": [
        "Kubernetes API discovery",
        "kubelet / exporters / app endpoints",
        "Prometheus",
        "dashboards and alerts"
      ],
      "explanation": "Kubernetes API discovery → kubelet / exporters / app endpoints → Prometheus → dashboards and alerts. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Kubernetes monitoring collects cluster, node, Pod and application metrics using service discovery and exporters.",
          "This capability helps teams observe kubernetes monitoring in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Kubernetes Monitoring when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Kubernetes API discovery → kubelet / exporters / app endpoints → Prometheus → dashboards and alerts. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Kubernetes monitoring collects cluster, node, Pod and application metrics using service discovery and exporters. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Kubernetes Monitoring with a real monitoring example.",
        "answer": "Kubernetes monitoring collects cluster, node, Pod and application metrics using service discovery and exporters. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/federation": {
    "summary": "Prometheus federation lets one Prometheus server scrape selected time series from another Prometheus server.",
    "diagram": {
      "title": "Federation monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus federation lets one Prometheus server scrape selected time series from another Prometheus server.",
          "This capability helps teams observe federation in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Federation when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus federation lets one Prometheus server scrape selected time series from another Prometheus server. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Federation with a real monitoring example.",
        "answer": "Prometheus federation lets one Prometheus server scrape selected time series from another Prometheus server. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/remote-write": {
    "summary": "Remote write sends scraped samples to a compatible remote metrics storage system.",
    "diagram": {
      "title": "Remote Write monitoring flow",
      "nodes": [
        "Prometheus WAL samples",
        "remote-write queue",
        "receiver endpoint",
        "remote metrics backend"
      ],
      "explanation": "Prometheus WAL samples → remote-write queue → receiver endpoint → remote metrics backend. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Remote write sends scraped samples to a compatible remote metrics storage system.",
          "This capability helps teams observe remote write in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Remote Write when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Prometheus WAL samples → remote-write queue → receiver endpoint → remote metrics backend. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Remote write sends scraped samples to a compatible remote metrics storage system. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Remote Write with a real monitoring example.",
        "answer": "Remote write sends scraped samples to a compatible remote metrics storage system. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/storage-and-retention": {
    "summary": "Prometheus local TSDB stores time-series blocks and uses retention settings to control local data lifetime.",
    "diagram": {
      "title": "Storage and Retention monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus local TSDB stores time-series blocks and uses retention settings to control local data lifetime.",
          "This capability helps teams observe storage and retention in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Storage and Retention when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/api/v1/status/tsdb",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus local TSDB stores time-series blocks and uses retention settings to control local data lifetime. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Storage and Retention with a real monitoring example.",
        "answer": "Prometheus local TSDB stores time-series blocks and uses retention settings to control local data lifetime. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/high-availability": {
    "summary": "Prometheus high availability commonly runs independent replicas with compatible scrape configuration and alert deduplication downstream.",
    "diagram": {
      "title": "High Availability monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus high availability commonly runs independent replicas with compatible scrape configuration and alert deduplication downstream.",
          "This capability helps teams observe high availability in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use High Availability when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus high availability commonly runs independent replicas with compatible scrape configuration and alert deduplication downstream. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain High Availability with a real monitoring example.",
        "answer": "Prometheus high availability commonly runs independent replicas with compatible scrape configuration and alert deduplication downstream. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/prometheus-security": {
    "summary": "Prometheus security protects endpoints, configuration, network access, credentials and sensitive labels.",
    "diagram": {
      "title": "Prometheus Security monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus security protects endpoints, configuration, network access, credentials and sensitive labels.",
          "This capability helps teams observe prometheus security in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Prometheus Security when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/-/healthy\ncurl -s http://localhost:9090/api/v1/targets",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus security protects endpoints, configuration, network access, credentials and sensitive labels. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Prometheus Security with a real monitoring example.",
        "answer": "Prometheus security protects endpoints, configuration, network access, credentials and sensitive labels. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  },
  "prometheus/troubleshooting-prometheus": {
    "summary": "Prometheus troubleshooting checks target discovery, scrape errors, query behavior, rule evaluation, storage and alert delivery.",
    "diagram": {
      "title": "Troubleshooting Prometheus monitoring flow",
      "nodes": [
        "target endpoint",
        "Prometheus scrape/discovery",
        "time-series storage",
        "PromQL query or rule",
        "alert/dashboard"
      ],
      "explanation": "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Check target health, sample freshness and rule evaluation separately; successful scraping does not guarantee a meaningful alert."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prometheus troubleshooting checks target discovery, scrape errors, query behavior, rule evaluation, storage and alert delivery.",
          "This capability helps teams observe troubleshooting prometheus in a consistent monitoring platform. Good metrics need clear names, bounded labels, correct units and an operational question they answer."
        ],
        "bullets": [
          "Prefer actionable metrics tied to service-level indicators.",
          "Avoid unbounded labels such as request IDs or user IDs.",
          "Keep dashboards and alerts aligned with service ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Troubleshooting Prometheus when operators need visibility into application behavior, infrastructure health or service objectives. A practical workflow scrapes application and host metrics, builds PromQL dashboards, and routes actionable alerts to the owning team.",
          "For production, define scrape intervals, retention, access controls and alert ownership according to scale and reliability needs."
        ],
        "bullets": [
          "Development: validate metrics endpoints and query behavior.",
          "CI: check Prometheus configuration and rule files.",
          "Production: monitor availability, latency, errors, saturation and alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "target endpoint → Prometheus scrape/discovery → time-series storage → PromQL query or rule → alert/dashboard. Prometheus identifies targets, requests metrics, ingests timestamped samples and evaluates queries or rules. Alertmanager then groups and routes firing alerts to receivers.",
          "A target can be up while application behavior is unhealthy; pair infrastructure metrics with application-level signals and meaningful thresholds."
        ],
        "bullets": [
          "Target discovery determines what should be scraped.",
          "Scrape status indicates whether collection succeeded.",
          "PromQL transforms stored series into useful signals.",
          "Rules evaluate conditions and Alertmanager handles notifications."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands against a lab Prometheus or exporter. Replace localhost and ports with your configured endpoints. Inspect API responses and target labels before writing alert rules."
        ],
        "code": "curl -s http://localhost:9090/api/v1/targets\ncurl -s http://localhost:9090/api/v1/rules\npromtool check config prometheus.yml",
        "note": "Do not expose Prometheus or exporter endpoints publicly without appropriate network controls and authentication. Avoid placing sensitive user or credential data in metric labels."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use stable metric names and bounded label cardinality. Set scrape intervals and retention based on data volume, query needs and storage capacity. Protect administrative endpoints and remote-write credentials.",
          "Alert on symptoms and user impact, group related notifications and define runbooks. Test alert routing and silence/inhibition behavior to prevent noisy or duplicate pages."
        ],
        "bullets": [
          "Monitor Prometheus itself: target count, scrape duration, ingestion and TSDB health.",
          "Use recording rules for repeated expensive queries.",
          "Set retention and storage capacity with headroom.",
          "Secure remote write and external endpoints.",
          "Run independent HA replicas and validate alert deduplication."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the Targets page or /api/v1/targets and identify scrape errors. Check DNS, routing, TLS, authentication, endpoint path, relabeling and firewall rules. Then inspect query results, rule evaluation and Alertmanager delivery.",
          "If a query is empty, verify the metric name, labels, time range and sample freshness before changing the expression."
        ],
        "bullets": [
          "Target down: inspect last scrape error and endpoint reachability.",
          "No data: check discovery, relabeling and exporter metrics path.",
          "High cardinality: inspect label combinations and ingestion volume.",
          "Alert missing: check rule state, for duration, labels and Alertmanager routes.",
          "Notification absent: inspect receiver config, inhibition, silence and delivery logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prometheus troubleshooting checks target discovery, scrape errors, query behavior, rule evaluation, storage and alert delivery. In production, I would define useful metrics, keep label cardinality controlled, build PromQL dashboards, route actionable alerts and monitor the monitoring system itself."
        ],
        "bullets": [
          "Explain pull-based scraping and time-series labels.",
          "Describe counter, gauge, histogram and summary use cases.",
          "Explain PromQL rate, aggregation and alert routing."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Troubleshooting Prometheus with a real monitoring example.",
        "answer": "Prometheus troubleshooting checks target discovery, scrape errors, query behavior, rule evaluation, storage and alert delivery. A team can implement this by exposing or discovering metrics, validating collection, writing PromQL for operational signals and connecting actionable alerts to an owner and runbook."
      },
      {
        "question": "How do you troubleshoot missing Prometheus metrics or alerts?",
        "answer": "Check the target discovery and scrape status first, inspect scrape errors and endpoint reachability, then confirm metric names, labels and sample timestamps. Validate PromQL and rule evaluation with promtool, and finally inspect Alertmanager routes, silences, inhibition and receiver delivery."
      }
    ],
    "handsOn": [
      "Run Prometheus and one exporter in a disposable lab; verify the target appears as UP.",
      "Query up and one exporter metric through the Prometheus UI or HTTP API.",
      "Create a simple alert rule, validate it with promtool and observe its state transition.",
      "Break a lab scrape target or metric path, diagnose the error and restore it."
    ]
  }
};
