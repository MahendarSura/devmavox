import type { AtoZLesson } from "../lessons";

export const grafanaAtoZLessons: Record<string, AtoZLesson> = {
  "grafana/grafana-introduction": {
    "summary": "Grafana is an observability platform for querying, visualizing and alerting on metrics, logs and traces from connected data sources.",
    "diagram": {
      "title": "Grafana Introduction observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana is an observability platform for querying, visualizing and alerting on metrics, logs and traces from connected data sources.",
          "This capability improves grafana introduction by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Grafana Introduction when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "curl -s http://localhost:3000/api/health",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana is an observability platform for querying, visualizing and alerting on metrics, logs and traces from connected data sources. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Grafana Introduction with a practical DevOps monitoring example.",
        "answer": "Grafana is an observability platform for querying, visualizing and alerting on metrics, logs and traces from connected data sources. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/grafana-architecture": {
    "summary": "Grafana separates the web application, backend services, data-source plugins, alerting engine and persistent configuration store.",
    "diagram": {
      "title": "Grafana Architecture observability flow",
      "nodes": [
        "browser user",
        "Grafana backend",
        "data-source plugin",
        "Prometheus/Loki/API",
        "query response",
        "panel render"
      ],
      "explanation": "browser user → Grafana backend → data-source plugin → Prometheus/Loki/API → query response → panel render. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana separates the web application, backend services, data-source plugins, alerting engine and persistent configuration store.",
          "This capability improves grafana architecture by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Grafana Architecture when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "browser user → Grafana backend → data-source plugin → Prometheus/Loki/API → query response → panel render. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana separates the web application, backend services, data-source plugins, alerting engine and persistent configuration store. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Grafana Architecture with a practical DevOps monitoring example.",
        "answer": "Grafana separates the web application, backend services, data-source plugins, alerting engine and persistent configuration store. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/installation": {
    "summary": "Grafana installation deploys the server, configures storage and authentication, and connects the required data sources.",
    "diagram": {
      "title": "Installation observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana installation deploys the server, configures storage and authentication, and connects the required data sources.",
          "This capability improves installation by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Installation when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "sudo systemctl status grafana-server\ncurl -s http://localhost:3000/api/health",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana installation deploys the server, configures storage and authentication, and connects the required data sources. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Installation with a practical DevOps monitoring example.",
        "answer": "Grafana installation deploys the server, configures storage and authentication, and connects the required data sources. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/organizations-and-teams": {
    "summary": "Grafana organizations and teams group users and resources to support logical access boundaries and collaboration.",
    "diagram": {
      "title": "Organizations and Teams observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana organizations and teams group users and resources to support logical access boundaries and collaboration.",
          "This capability improves organizations and teams by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Organizations and Teams when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana organizations and teams group users and resources to support logical access boundaries and collaboration. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Organizations and Teams with a practical DevOps monitoring example.",
        "answer": "Grafana organizations and teams group users and resources to support logical access boundaries and collaboration. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/users-and-roles": {
    "summary": "Grafana users and roles define who can view, edit or administer dashboards, folders and data sources.",
    "diagram": {
      "title": "Users and Roles observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana users and roles define who can view, edit or administer dashboards, folders and data sources.",
          "This capability improves users and roles by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Users and Roles when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana users and roles define who can view, edit or administer dashboards, folders and data sources. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Users and Roles with a practical DevOps monitoring example.",
        "answer": "Grafana users and roles define who can view, edit or administer dashboards, folders and data sources. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/data-sources": {
    "summary": "Data sources connect Grafana to external systems such as Prometheus, Loki, Elasticsearch and SQL databases.",
    "diagram": {
      "title": "Data Sources observability flow",
      "nodes": [
        "dashboard panel query",
        "data-source plugin",
        "external metrics/log system",
        "result frame",
        "visualization"
      ],
      "explanation": "dashboard panel query → data-source plugin → external metrics/log system → result frame → visualization. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Data sources connect Grafana to external systems such as Prometheus, Loki, Elasticsearch and SQL databases.",
          "This capability improves data sources by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Data Sources when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "dashboard panel query → data-source plugin → external metrics/log system → result frame → visualization. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "curl -s -u admin:YOUR_PASSWORD http://localhost:3000/api/datasources",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Data sources connect Grafana to external systems such as Prometheus, Loki, Elasticsearch and SQL databases. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Data Sources with a practical DevOps monitoring example.",
        "answer": "Data sources connect Grafana to external systems such as Prometheus, Loki, Elasticsearch and SQL databases. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/prometheus-data-source": {
    "summary": "The Prometheus data source lets Grafana execute PromQL queries and visualize Prometheus time-series metrics.",
    "diagram": {
      "title": "Prometheus Data Source observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Prometheus data source lets Grafana execute PromQL queries and visualize Prometheus time-series metrics.",
          "This capability improves prometheus data source by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Prometheus Data Source when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Prometheus data source lets Grafana execute PromQL queries and visualize Prometheus time-series metrics. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Prometheus Data Source with a practical DevOps monitoring example.",
        "answer": "The Prometheus data source lets Grafana execute PromQL queries and visualize Prometheus time-series metrics. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/loki-data-source": {
    "summary": "The Loki data source lets Grafana query and explore logs stored in Grafana Loki.",
    "diagram": {
      "title": "Loki Data Source observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Loki data source lets Grafana query and explore logs stored in Grafana Loki.",
          "This capability improves loki data source by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Loki Data Source when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Loki data source lets Grafana query and explore logs stored in Grafana Loki. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Loki Data Source with a practical DevOps monitoring example.",
        "answer": "The Loki data source lets Grafana query and explore logs stored in Grafana Loki. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/dashboards": {
    "summary": "Dashboards organize panels into a shared view of service and infrastructure health.",
    "diagram": {
      "title": "Dashboards observability flow",
      "nodes": [
        "dashboard JSON",
        "panels and variables",
        "data-source queries",
        "transformations",
        "rendered view"
      ],
      "explanation": "dashboard JSON → panels and variables → data-source queries → transformations → rendered view. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Dashboards organize panels into a shared view of service and infrastructure health.",
          "This capability improves dashboards by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dashboards when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "dashboard JSON → panels and variables → data-source queries → transformations → rendered view. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "curl -s -u admin:YOUR_PASSWORD http://localhost:3000/api/search?type=dash-db",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Dashboards organize panels into a shared view of service and infrastructure health. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dashboards with a practical DevOps monitoring example.",
        "answer": "Dashboards organize panels into a shared view of service and infrastructure health. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/panels": {
    "summary": "Panels are individual dashboard visualizations or data displays driven by one or more queries.",
    "diagram": {
      "title": "Panels observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Panels are individual dashboard visualizations or data displays driven by one or more queries.",
          "This capability improves panels by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Panels when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Panels are individual dashboard visualizations or data displays driven by one or more queries. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Panels with a practical DevOps monitoring example.",
        "answer": "Panels are individual dashboard visualizations or data displays driven by one or more queries. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/visualizations": {
    "summary": "Visualizations render queried data as graphs, tables, gauges, stat panels and other formats suited to the question.",
    "diagram": {
      "title": "Visualizations observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Visualizations render queried data as graphs, tables, gauges, stat panels and other formats suited to the question.",
          "This capability improves visualizations by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Visualizations when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Visualizations render queried data as graphs, tables, gauges, stat panels and other formats suited to the question. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Visualizations with a practical DevOps monitoring example.",
        "answer": "Visualizations render queried data as graphs, tables, gauges, stat panels and other formats suited to the question. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/dashboard-variables": {
    "summary": "Dashboard variables create dynamic query inputs that let viewers filter or switch context without duplicating dashboards.",
    "diagram": {
      "title": "Dashboard Variables observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Dashboard variables create dynamic query inputs that let viewers filter or switch context without duplicating dashboards.",
          "This capability improves dashboard variables by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dashboard Variables when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Dashboard variables create dynamic query inputs that let viewers filter or switch context without duplicating dashboards. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dashboard Variables with a practical DevOps monitoring example.",
        "answer": "Dashboard variables create dynamic query inputs that let viewers filter or switch context without duplicating dashboards. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/templating": {
    "summary": "Templating uses variables and query-driven values to create reusable dashboards across services, clusters and environments.",
    "diagram": {
      "title": "Templating observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Templating uses variables and query-driven values to create reusable dashboards across services, clusters and environments.",
          "This capability improves templating by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Templating when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Templating uses variables and query-driven values to create reusable dashboards across services, clusters and environments. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Templating with a practical DevOps monitoring example.",
        "answer": "Templating uses variables and query-driven values to create reusable dashboards across services, clusters and environments. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/transformations": {
    "summary": "Transformations reshape or combine query results inside Grafana before visualization.",
    "diagram": {
      "title": "Transformations observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Transformations reshape or combine query results inside Grafana before visualization.",
          "This capability improves transformations by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Transformations when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Transformations reshape or combine query results inside Grafana before visualization. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Transformations with a practical DevOps monitoring example.",
        "answer": "Transformations reshape or combine query results inside Grafana before visualization. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/annotations": {
    "summary": "Annotations mark events such as deployments and incidents on dashboard timelines for correlation.",
    "diagram": {
      "title": "Annotations observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Annotations mark events such as deployments and incidents on dashboard timelines for correlation.",
          "This capability improves annotations by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Annotations when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Annotations mark events such as deployments and incidents on dashboard timelines for correlation. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Annotations with a practical DevOps monitoring example.",
        "answer": "Annotations mark events such as deployments and incidents on dashboard timelines for correlation. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/provisioning": {
    "summary": "Provisioning loads data sources, dashboards, alert rules and other Grafana configuration from files or automation.",
    "diagram": {
      "title": "Provisioning observability flow",
      "nodes": [
        "version-controlled config files",
        "Grafana provisioning loader",
        "data sources/dashboards/alerts"
      ],
      "explanation": "version-controlled config files → Grafana provisioning loader → data sources/dashboards/alerts. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Provisioning loads data sources, dashboards, alert rules and other Grafana configuration from files or automation.",
          "This capability improves provisioning by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Provisioning when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "version-controlled config files → Grafana provisioning loader → data sources/dashboards/alerts. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Inspect /etc/grafana/provisioning/ and Grafana server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Provisioning loads data sources, dashboards, alert rules and other Grafana configuration from files or automation. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Provisioning with a practical DevOps monitoring example.",
        "answer": "Provisioning loads data sources, dashboards, alert rules and other Grafana configuration from files or automation. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/dashboard-as-code": {
    "summary": "Dashboard as Code stores dashboard definitions in version control and deploys them through repeatable provisioning.",
    "diagram": {
      "title": "Dashboard as Code observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Dashboard as Code stores dashboard definitions in version control and deploys them through repeatable provisioning.",
          "This capability improves dashboard as code by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dashboard as Code when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Validate dashboard JSON in version control and deploy via provisioning or API.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Dashboard as Code stores dashboard definitions in version control and deploys them through repeatable provisioning. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dashboard as Code with a practical DevOps monitoring example.",
        "answer": "Dashboard as Code stores dashboard definitions in version control and deploys them through repeatable provisioning. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/alerting": {
    "summary": "Grafana Alerting evaluates alert rules across supported data sources and routes notifications to contact points.",
    "diagram": {
      "title": "Alerting observability flow",
      "nodes": [
        "alert rule query",
        "evaluation engine",
        "alert state",
        "notification policy",
        "contact point"
      ],
      "explanation": "alert rule query → evaluation engine → alert state → notification policy → contact point. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana Alerting evaluates alert rules across supported data sources and routes notifications to contact points.",
          "This capability improves alerting by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Alerting when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "alert rule query → evaluation engine → alert state → notification policy → contact point. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana Alerting evaluates alert rules across supported data sources and routes notifications to contact points. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Alerting with a practical DevOps monitoring example.",
        "answer": "Grafana Alerting evaluates alert rules across supported data sources and routes notifications to contact points. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/alert-rules": {
    "summary": "Alert rules define queries, conditions, evaluation intervals and pending periods that determine alert state.",
    "diagram": {
      "title": "Alert Rules observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Alert rules define queries, conditions, evaluation intervals and pending periods that determine alert state.",
          "This capability improves alert rules by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Alert Rules when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "curl -s -u admin:YOUR_PASSWORD http://localhost:3000/api/v1/provisioning/alert-rules",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Alert rules define queries, conditions, evaluation intervals and pending periods that determine alert state. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Alert Rules with a practical DevOps monitoring example.",
        "answer": "Alert rules define queries, conditions, evaluation intervals and pending periods that determine alert state. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/contact-points": {
    "summary": "Contact points define notification destinations such as email, chat or incident-management integrations.",
    "diagram": {
      "title": "Contact Points observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Contact points define notification destinations such as email, chat or incident-management integrations.",
          "This capability improves contact points by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Contact Points when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "curl -s -u admin:YOUR_PASSWORD http://localhost:3000/api/v1/provisioning/contact-points",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Contact points define notification destinations such as email, chat or incident-management integrations. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Contact Points with a practical DevOps monitoring example.",
        "answer": "Contact points define notification destinations such as email, chat or incident-management integrations. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/notification-policies": {
    "summary": "Notification policies route alerts to contact points based on labels, grouping and routing hierarchy.",
    "diagram": {
      "title": "Notification Policies observability flow",
      "nodes": [
        "alert labels",
        "policy tree matching",
        "grouping and routing",
        "contact point receiver"
      ],
      "explanation": "alert labels → policy tree matching → grouping and routing → contact point receiver. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Notification policies route alerts to contact points based on labels, grouping and routing hierarchy.",
          "This capability improves notification policies by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Notification Policies when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "alert labels → policy tree matching → grouping and routing → contact point receiver. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "curl -s -u admin:YOUR_PASSWORD http://localhost:3000/api/v1/provisioning/policies",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Notification policies route alerts to contact points based on labels, grouping and routing hierarchy. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Notification Policies with a practical DevOps monitoring example.",
        "answer": "Notification policies route alerts to contact points based on labels, grouping and routing hierarchy. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/silences": {
    "summary": "Silences temporarily suppress notifications for alerts matching specified label filters.",
    "diagram": {
      "title": "Silences observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Silences temporarily suppress notifications for alerts matching specified label filters.",
          "This capability improves silences by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Silences when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Silences temporarily suppress notifications for alerts matching specified label filters. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Silences with a practical DevOps monitoring example.",
        "answer": "Silences temporarily suppress notifications for alerts matching specified label filters. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/explore": {
    "summary": "Explore is an interactive workspace for querying data sources and investigating metrics, logs and traces.",
    "diagram": {
      "title": "Explore observability flow",
      "nodes": [
        "operator query",
        "selected data source",
        "query result",
        "logs/metrics correlation"
      ],
      "explanation": "operator query → selected data source → query result → logs/metrics correlation. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Explore is an interactive workspace for querying data sources and investigating metrics, logs and traces.",
          "This capability improves explore by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Explore when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "operator query → selected data source → query result → logs/metrics correlation. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → Explore → select a data source → run a query.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Explore is an interactive workspace for querying data sources and investigating metrics, logs and traces. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Explore with a practical DevOps monitoring example.",
        "answer": "Explore is an interactive workspace for querying data sources and investigating metrics, logs and traces. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/ad-hoc-filters": {
    "summary": "Ad hoc filters add dynamic label or field filters to dashboard queries without defining a separate variable for each filter.",
    "diagram": {
      "title": "Ad hoc Filters observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Ad hoc filters add dynamic label or field filters to dashboard queries without defining a separate variable for each filter.",
          "This capability improves ad hoc filters by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Ad hoc Filters when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Ad hoc filters add dynamic label or field filters to dashboard queries without defining a separate variable for each filter. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Ad hoc Filters with a practical DevOps monitoring example.",
        "answer": "Ad hoc filters add dynamic label or field filters to dashboard queries without defining a separate variable for each filter. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/plugins": {
    "summary": "Grafana plugins extend data-source connectivity, visualizations and application capabilities.",
    "diagram": {
      "title": "Plugins observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana plugins extend data-source connectivity, visualizations and application capabilities.",
          "This capability improves plugins by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Plugins when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana plugins extend data-source connectivity, visualizations and application capabilities. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Plugins with a practical DevOps monitoring example.",
        "answer": "Grafana plugins extend data-source connectivity, visualizations and application capabilities. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/authentication-and-authorization": {
    "summary": "Authentication verifies user identity while authorization controls what authenticated users can access or change.",
    "diagram": {
      "title": "Authentication and Authorization observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Authentication verifies user identity while authorization controls what authenticated users can access or change.",
          "This capability improves authentication and authorization by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Authentication and Authorization when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Authentication verifies user identity while authorization controls what authenticated users can access or change. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Authentication and Authorization with a practical DevOps monitoring example.",
        "answer": "Authentication verifies user identity while authorization controls what authenticated users can access or change. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/folder-permissions": {
    "summary": "Folder permissions control who can view, edit or administer dashboards grouped within a folder.",
    "diagram": {
      "title": "Folder Permissions observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Folder permissions control who can view, edit or administer dashboards grouped within a folder.",
          "This capability improves folder permissions by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Folder Permissions when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Folder permissions control who can view, edit or administer dashboards grouped within a folder. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Folder Permissions with a practical DevOps monitoring example.",
        "answer": "Folder permissions control who can view, edit or administer dashboards grouped within a folder. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/backup-and-restore": {
    "summary": "Grafana backup and restore protects dashboards, data-source configuration, alerting resources and persistent application data.",
    "diagram": {
      "title": "Backup and Restore observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana backup and restore protects dashboards, data-source configuration, alerting resources and persistent application data.",
          "This capability improves backup and restore by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Backup and Restore when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Back up the Grafana database and provisioning files using a consistent snapshot procedure.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana backup and restore protects dashboards, data-source configuration, alerting resources and persistent application data. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Backup and Restore with a practical DevOps monitoring example.",
        "answer": "Grafana backup and restore protects dashboards, data-source configuration, alerting resources and persistent application data. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/grafana-security": {
    "summary": "Grafana security protects user access, service accounts, data sources, plugins, secrets and network endpoints.",
    "diagram": {
      "title": "Grafana Security observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana security protects user access, service accounts, data sources, plugins, secrets and network endpoints.",
          "This capability improves grafana security by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Grafana Security when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "# Open Grafana → inspect the relevant dashboard, data source or alerting configuration.\n# Review browser panel errors and server logs.",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana security protects user access, service accounts, data sources, plugins, secrets and network endpoints. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Grafana Security with a practical DevOps monitoring example.",
        "answer": "Grafana security protects user access, service accounts, data sources, plugins, secrets and network endpoints. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  },
  "grafana/troubleshooting-grafana": {
    "summary": "Grafana troubleshooting checks data-source connectivity, query behavior, dashboard configuration, permissions and backend logs.",
    "diagram": {
      "title": "Troubleshooting Grafana observability flow",
      "nodes": [
        "user request",
        "Grafana backend",
        "selected plugin or service",
        "query/configuration result",
        "UI"
      ],
      "explanation": "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Separate query errors, permission errors and data-source availability issues before changing dashboard configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Grafana troubleshooting checks data-source connectivity, query behavior, dashboard configuration, permissions and backend logs.",
          "This capability improves troubleshooting grafana by turning observability data into a reusable operational view. Dashboards and alerts should answer a specific question and help an owner decide what action to take."
        ],
        "bullets": [
          "Use clear dashboard names and ownership.",
          "Choose a visualization that matches the data and question.",
          "Avoid exposing sensitive labels or query results to unauthorized users."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Troubleshooting Grafana when a team needs to query, visualize, investigate or alert on service behavior. A practical DevOps dashboard can show request rate, error rate, latency, CPU, memory and deployment annotations for one service.",
          "Use folders, teams and permissions to separate audiences, and keep production alert routes connected to on-call ownership."
        ],
        "bullets": [
          "Development: explore metrics and validate queries.",
          "Operations: monitor service-level indicators and correlate deployments.",
          "Production: use role-based access, provisioning and tested alert delivery."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "user request → Grafana backend → selected plugin or service → query/configuration result → UI. Grafana evaluates queries through configured data-source plugins, receives result frames, applies transformations and renders the chosen visualization. Alerting evaluates rules independently of whether a dashboard is open.",
          "A dashboard can load successfully while a panel query fails. Check the panel's data source, query inspector, time range and backend response."
        ],
        "bullets": [
          "Data source defines where data is queried.",
          "Query defines the time series, logs or records returned.",
          "Transformations reshape data before rendering.",
          "Permissions determine which users can query or edit resources."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Connect a lab Prometheus data source, create a panel for the up metric and set a meaningful time range. Use API examples only with a local test instance and replace credentials securely."
        ],
        "code": "curl -s http://localhost:3000/api/health\nsudo journalctl -u grafana-server -n 100 --no-pager",
        "note": "Do not put admin passwords in shell history or public workflow logs. Use service accounts and scoped tokens for automation; rotate credentials and protect provisioning files."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Provision dashboards and data sources from version-controlled configuration, use least-privilege roles and separate editor/admin access. Keep plugins updated and review plugin provenance before installation.",
          "Design dashboards around service ownership and actionable signals. Test alert rules, grouping, notification delivery and silence behavior before relying on them during incidents."
        ],
        "bullets": [
          "Use folders and team permissions to control dashboard access.",
          "Use service accounts with narrowly scoped tokens for automation.",
          "Provision critical dashboards and data sources as code.",
          "Monitor Grafana health, query latency and backend errors.",
          "Back up persistent storage and configuration consistently."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with Grafana health and server logs. For a panel error, inspect query inspector, selected data source, time range, query syntax, permissions and network connectivity to the backend.",
          "For missing alerts, inspect rule evaluation state, labels, notification policy matching, contact-point configuration, silences and receiver delivery logs."
        ],
        "bullets": [
          "No data: check data-source health, query, time range and label filters.",
          "Unauthorized: verify user role, folder permissions and data-source access.",
          "Slow panel: inspect query cost, time range, transformations and backend load.",
          "Dashboard missing: check folder permissions and provisioning state.",
          "Alert not delivered: inspect policy route, contact point, silence and integration response."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Grafana troubleshooting checks data-source connectivity, query behavior, dashboard configuration, permissions and backend logs. In production, I would provision configuration as code, apply least-privilege access, design dashboards around service indicators and test alert delivery end to end."
        ],
        "bullets": [
          "Explain dashboard, panel and data-source relationships.",
          "Describe how query results become visualizations.",
          "Explain access control, provisioning and alert troubleshooting."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Troubleshooting Grafana with a practical DevOps monitoring example.",
        "answer": "Grafana troubleshooting checks data-source connectivity, query behavior, dashboard configuration, permissions and backend logs. I would use it to provide a repeatable operational view, connect the correct data source, protect access, and verify that dashboards and alerts give actionable information to the responsible team."
      },
      {
        "question": "How do you troubleshoot a Grafana panel showing no data?",
        "answer": "Check Grafana health, selected data source and its connection, query inspector, time range, label filters and user permissions. Run the equivalent query directly against the backend to separate Grafana issues from source-data issues, then inspect server logs."
      }
    ],
    "handsOn": [
      "Connect Grafana to a lab Prometheus data source and build a dashboard with an up panel.",
      "Add a variable for a cluster or job label and use it to filter a panel.",
      "Provision a sample dashboard from a JSON file or configuration directory.",
      "Break a lab query or data-source URL, use query inspector and server logs to diagnose it, then restore it."
    ]
  }
};
