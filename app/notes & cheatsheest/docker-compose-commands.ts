import type { DevOpsTool } from "./command-types";

export const dockerComposeTool: DevOpsTool = {
    name: "Docker Compose",
    category: "Containers",
    commands: [
      { command: "docker compose ps", level: "Basic", english: "to list Compose services and their status", telugu: "Compose services status చూడటానికి." },
      { command: "docker compose config", level: "Intermediate", english: "to validate and render the Compose configuration", telugu: "Compose configuration సరిగ్గా ఉందో తనిఖీ చేయటానికి." },
      { command: "docker compose up -d --build", level: "Advanced", english: "to build and start services in the background", telugu: "Images build చేసి services ను background లో start చేయటానికి." },
      { command: "docker compose logs --tail 100", level: "Troubleshooting", english: "to inspect recent logs from Compose services", telugu: "Compose services logs చూడటానికి." },
      {
        command: "docker compose version",
        level: "Basic",
        english: "Display Docker Compose version.",
        telugu: "Docker Compose version chudataniki.",
      },
      {
        command: "docker compose logs -f <service>",
        level: "Intermediate",
        english: "Follow logs for one service.",
        telugu: "Specific service logs live ga chudataniki.",
      },
      {
        command: "docker compose top",
        level: "Intermediate",
        english: "List processes for Compose services.",
        telugu: "Compose services lo processes inspect cheyyataniki.",
      },
      {
        command: "docker compose images",
        level: "Basic",
        english: "List images used by the Compose project.",
        telugu: "Project use chestunna images chudataniki.",
      },
      {
        command: "docker compose pull",
        level: "Intermediate",
        english: "Pull images declared by the Compose configuration.",
        telugu: "Compose images registry nunchi pull cheyyataniki.",
      },
      {
        command: "docker compose build --no-cache",
        level: "Advanced",
        english: "Rebuild service images without cache.",
        telugu: "Service images fresh ga rebuild cheyyataniki.",
      },
      {
        command: "docker compose up -d",
        level: "Basic",
        english: "Create and start services in the background.",
        telugu: "Compose services background lo start cheyyataniki.",
      },
      {
        command: "docker compose restart <service>",
        level: "Intermediate",
        english: "Restart a selected service.",
        telugu: "Specific Compose service restart cheyyataniki.",
      },
      {
        command: "docker compose exec <service> sh",
        level: "Intermediate",
        english: "Open a shell in a running service container.",
        telugu: "Running service container lopala shell open cheyyataniki.",
      },
      {
        command: "docker compose run --rm <service> <command>",
        level: "Advanced",
        english: "Run a one-off command in a new service container.",
        telugu: "Temporary container lo one-off task execute cheyyataniki.",
      },
      {
        command: "docker compose port <service> 8080",
        level: "Troubleshooting",
        english: "Display the host port mapped to a service port.",
        telugu: "Service port host ki ela map ayyindo chudataniki.",
      },
      {
        command: "docker compose config --services",
        level: "Basic",
        english: "List service names from the resolved configuration.",
        telugu: "Compose configuration lo service names list chudataniki.",
      },
      {
        command: "docker compose down",
        level: "Advanced",
        english: "Stop and remove project containers and networks.",
        telugu: "Project containers/networks remove cheyyataniki; shared resources impact verify cheyyali.",
      },
      {
        command: "docker compose down --volumes",
        level: "Advanced",
        english: "Remove project containers, networks, and declared volumes.",
        telugu: "Volumes kuda remove avutayi; persistent data loss risk undi, careful ga use cheyyali.",
      },
      {
        command: "docker compose events",
        level: "Troubleshooting",
        english: "Stream Compose project events.",
        telugu: "Compose services events live ga troubleshoot cheyyataniki.",
      },
      {
        command: "docker compose cp <service>:/app/log.txt ./log.txt",
        level: "Intermediate",
        english: "Copy files between a service container and the host.",
        telugu: "Service container nunchi host ki logs/files copy cheyyataniki.",
      },
    ],
  };
