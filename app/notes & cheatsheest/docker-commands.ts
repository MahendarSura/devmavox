
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

export const dockerComposeTool: DevOpsTool = {
  name: "Docker Compose",
  category: "Containers & DevOps",
  commands: [
    // BASIC - 8
    ...makeCommands("Basic", [
      [
        "docker compose version",
        "Displays the installed Docker Compose version.",
        "Install ayina Docker Compose version chupistundi.",
      ],
      [
        "docker compose ls",
        "Lists Docker Compose projects.",
        "Docker Compose projects list chestundi.",
      ],
      [
        "docker compose ps",
        "Lists containers belonging to the current Compose project.",
        "Current Compose project containers list chestundi.",
      ],
      [
        "docker compose up",
        "Creates and starts services defined in the Compose file.",
        "Compose file lo define chesina services create chesi start chestundi.",
      ],
      [
        "docker compose up -d",
        "Starts Compose services in detached mode.",
        "Compose services ni background lo run chestundi.",
      ],
      [
        "docker compose logs",
        "Displays logs from Compose services.",
        "Compose services logs chupistundi.",
      ],
      [
        "docker compose stop",
        "Stops running services without removing their containers.",
        "Running services ni containers remove cheyakunda stop chestundi.",
      ],
      [
        "docker compose down",
        "Stops and removes project containers and networks.",
        "Project containers mariyu networks ni stop chesi remove chestundi.",
      ],
    ]),

    // INTERMEDIATE - 10
    ...makeCommands("Intermediate", [
      [
        "docker compose build",
        "Builds or rebuilds service images.",
        "Services images ni build leda rebuild chestundi.",
      ],
      [
        "docker compose pull",
        "Downloads service images from their configured registries.",
        "Configured registries nundi service images download chestundi.",
      ],
      [
        "docker compose push",
        "Pushes service images to their configured registries.",
        "Service images ni configured registries ki push chestundi.",
      ],
      [
        "docker compose exec web sh",
        "Opens a shell inside the running web service container.",
        "Running web service container lopala shell open chestundi.",
      ],
      [
        "docker compose run web npm test",
        "Runs a one-off command using the web service configuration.",
        "Web service configuration use chesi one-time command run chestundi.",
      ],
      [
        "docker compose cp ./config.yml web:/app/config.yml",
        "Copies files between the host and a Compose service container.",
        "Host mariyu Compose service container madhya files copy chestundi.",
      ],
      [
        "docker compose port web 80",
        "Displays the public port mapped to port 80 of the web service.",
        "Web service port 80 ki map ayina public port chupistundi.",
      ],
      [
        "docker compose images",
        "Lists images used by containers created by the Compose project.",
        "Compose project containers use chestunna images list chestundi.",
      ],
      [
        "docker compose restart web",
        "Restarts the specified Compose service.",
        "Specified Compose service ni restart chestundi.",
      ],
      [
        "docker compose start web",
        "Starts an existing stopped Compose service.",
        "Already unna stopped Compose service ni start chestundi.",
      ],
    ]),

    // ADVANCED - 8
    ...makeCommands("Advanced", [
      [
        "docker compose -f compose.yaml -f compose.prod.yaml up -d",
        "Combines multiple Compose files and starts the resulting application.",
        "Multiple Compose files combine chesi application start chestundi.",
      ],
      [
        "docker compose -p myapp up -d",
        "Starts the project using a specified project name.",
        "Specified project name tho application start chestundi.",
      ],
      [
        "docker compose --profile debug up -d",
        "Starts services enabled by the debug profile along with default services.",
        "Debug profile services mariyu default services start chestundi.",
      ],
      [
        "docker compose up -d --scale web=3",
        "Starts the application with three replicas of the web service.",
        "Web service ni 3 replicas tho start chestundi.",
      ],
      [
        "docker compose --dry-run up -d",
        "Previews the operations Compose would perform without applying them.",
        "Changes apply cheyakunda Compose operations preview chestundi.",
      ],
      [
        "docker compose --parallel 1 pull",
        "Pulls service images with a maximum parallelism of one.",
        "Oka time lo oka image matrame pull chestundi.",
      ],
      [
        "docker compose up -d --wait",
        "Starts services and waits until they are running or healthy.",
        "Services start chesi running leda healthy ayye varaku wait chestundi.",
      ],
      [
        "docker compose up --watch",
        "Starts services and watches configured files for changes.",
        "Services start chesi configured files changes ni watch chestundi.",
      ],
    ]),

    // TROUBLESHOOTING - 10
    ...makeCommands("Troubleshooting", [
      [
        "docker compose ps -a",
        "Lists all project containers, including stopped containers.",
        "Stopped containers tho saha project containers anni chupistundi.",
      ],
      [
        "docker compose logs --tail 100",
        "Displays the last 100 lines of service logs.",
        "Service logs lo last 100 lines chupistundi.",
      ],
      [
        "docker compose logs -f web",
        "Continuously follows logs from the web service.",
        "Web service logs ni continuous ga follow chestundi.",
      ],
      [
        "docker compose logs --since 10m",
        "Displays service logs generated during the last 10 minutes.",
        "Last 10 minutes lo generate ayina service logs chupistundi.",
      ],
      [
        "docker compose events",
        "Displays real-time events from Compose project containers.",
        "Compose project containers real-time events chupistundi.",
      ],
      [
        "docker compose top",
        "Displays processes running inside Compose service containers.",
        "Compose service containers lopala running processes chupistundi.",
      ],
      [
        "docker compose stats",
        "Displays live resource usage statistics for Compose containers.",
        "Compose containers live resource usage chupistundi.",
      ],
      [
        "docker compose config -q",
        "Validates the Compose configuration quietly and reports errors.",
        "Compose configuration validate chesi errors unte report chestundi.",
      ],
      [
        "docker compose config --services",
        "Lists the services resolved from the Compose configuration.",
        "Compose configuration nundi resolve ayina services list chestundi.",
      ],
      [
        "docker compose exec -T web sh -c 'printenv'",
        "Checks environment variables inside the running web service without allocating a TTY.",
        "TTY allocate cheyakunda web service environment variables check chestundi.",
      ],
    ]),
  ],
};
