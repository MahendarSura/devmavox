
import type { DevOpsTool } from "./command-types";

type CommandLevel = DevOpsTool["commands"][number]["level"];

const makeCommands = (
  level: CommandLevel,
  rows: [string, string, string][]
) =>
  rows.map(([command, english, telugu]) => ({
    command,
    level,
    english,
    telugu,
  }));

export const grafana: DevOpsTool = {
  name: "Grafana",
  category: "Monitoring",

  commands: [
    // BASIC - 4
    ...makeCommands("Basic", [
      [
        "curl -I http://localhost:3000/api/health",
        "Check Grafana health endpoint response headers.",
        "Grafana health endpoint headers check cheyyi.",
      ],
      [
        "curl -fsS http://localhost:3000/api/health",
        "Check Grafana server health and display the response.",
        "Grafana server health status choodu.",
      ],
      [
        "grafana cli plugins ls",
        "List plugins installed in Grafana.",
        "Grafana lo install ayina plugins list choodu.",
      ],
      [
        "grafana cli plugins list-remote",
        "List plugins available in the Grafana plugin repository.",
        "Grafana repository lo available plugins choodu.",
      ],
    ]),

    // INTERMEDIATE - 9
    ...makeCommands("Intermediate", [
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/org',
        "Get details of the current Grafana organization.",
        "Current Grafana organization details choodu.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/datasources',
        "List configured Grafana data sources.",
        "Grafana data sources anni list cheyyi.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/search',
        "Search Grafana dashboards and folders.",
        "Grafana dashboards, folders search cheyyi.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/folders',
        "List Grafana dashboard folders.",
        "Grafana dashboard folders list choodu.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/dashboards/uid/<uid>',
        "Get a dashboard using its unique UID.",
        "Dashboard UID use chesi dashboard details choodu.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/datasources/uid/<uid>',
        "Get a data source using its UID.",
        "Data source UID tho details choodu.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/user',
        "Get details of the authenticated Grafana user.",
        "Login ayina Grafana user details choodu.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/org/users',
        "List users in the current Grafana organization.",
        "Current organization lo unna users list choodu.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/teams/search',
        "Search for Grafana teams.",
        "Grafana teams ni search cheyyi.",
      ],
    ]),

    // ADVANCED - 8
    ...makeCommands("Advanced", [
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" "http://localhost:3000/api/annotations?from=<from-ms>&to=<to-ms>"',
        "Retrieve Grafana annotations within a time range.",
        "Time range madhyalo unna annotations retrieve cheyyi.",
      ],
      [
        'curl -sS -H "Authorization: Bearer $GRAFANA_TOKEN" http://localhost:3000/api/plugins',
        "List plugins registered in the Grafana instance.",
        "Grafana instance lo registered plugins choodu.",
      ],
      [
        'curl -sS -u "$GRAFANA_USER:$GRAFANA_PASSWORD" http://localhost:3000/api/admin/stats',
        "Retrieve Grafana server statistics using administrator credentials.",
        "Admin credentials tho Grafana server statistics choodu.",
      ],
      [
        "grafana cli plugins install <plugin-id>",
        "Install a plugin from the Grafana plugin repository.",
        "Grafana repository nunchi plugin install cheyyi.",
      ],
      [
        "grafana cli plugins update <plugin-id>",
        "Update a specific installed Grafana plugin.",
        "Specific Grafana plugin update cheyyi.",
      ],
      [
        "grafana cli plugins update-all",
        "Update all installed Grafana plugins.",
        "Install ayina plugins anni update cheyyi.",
      ],
      [
        "grafana cli plugins remove <plugin-id>",
        "Remove an installed Grafana plugin.",
        "Grafana plugin remove cheyyi.",
      ],
      [
        "grafana cli admin reset-admin-password <new-password>",
        "Reset the Grafana administrator password.",
        "Grafana admin password reset cheyyi.",
      ],
    ]),

    // TROUBLESHOOTING - 4
    ...makeCommands("Troubleshooting", [
      [
        "sudo systemctl status grafana-server",
        "Check whether the Grafana service is running.",
        "Grafana service running lo undo ledo check cheyyi.",
      ],
      [
        "journalctl -u grafana-server -n 100 --no-pager",
        "Inspect the latest 100 Grafana service log entries.",
        "Grafana latest 100 service logs choodu.",
      ],
      [
        "sudo journalctl -u grafana-server -n 100 --no-pager",
        "Inspect Grafana service logs with elevated permissions.",
        "Admin permissions tho Grafana logs choodu.",
      ],
      [
        "curl -sS -o /dev/null -w '%{http_code}\\n' http://localhost:3000/login",
        "Check the HTTP status code returned by the Grafana login page.",
        "Grafana login page HTTP status code check cheyyi.",
      ],
    ]),
  ],
};
