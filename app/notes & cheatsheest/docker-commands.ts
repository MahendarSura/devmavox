
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

export const dockerTool: DevOpsTool = {
  name: "Docker",
  category: "Containers & DevOps",
  commands: [
    // BASIC - 12
    ...makeCommands("Basic", [
      ["docker --version", "Displays the installed Docker CLI version.", "Install ayina Docker CLI version chupistundi."],
      ["docker version", "Displays Docker client and server version information.", "Docker client mariyu server version information chupistundi."],
      ["docker info", "Displays information about the Docker daemon and environment.", "Docker daemon mariyu environment information chupistundi."],
      ["docker help", "Displays Docker CLI help and available commands.", "Docker CLI help mariyu available commands chupistundi."],
      ["docker images", "Lists locally available Docker images.", "Local lo unna Docker images list chestundi."],
      ["docker ps", "Lists currently running containers.", "Prastutam running lo unna containers list chestundi."],
      ["docker ps -a", "Lists all containers, including stopped containers.", "Stopped containers tho saha anni containers list chestundi."],
      ["docker pull nginx", "Downloads the Nginx image from a registry.", "Registry nundi Nginx image download chestundi."],
      ["docker run hello-world", "Runs the Hello World container to test Docker.", "Docker test cheyadaniki Hello World container run chestundi."],
      ["docker run -d --name web nginx", "Runs an Nginx container in detached mode.", "Nginx container ni background lo run chestundi."],
      ["docker stop web", "Stops a running container gracefully.", "Running container ni graceful ga stop chestundi."],
      ["docker start web", "Starts an existing stopped container.", "Already unna stopped container ni start chestundi."],
    ]),

    // INTERMEDIATE - 15
    ...makeCommands("Intermediate", [
      ["docker build -t myapp:1.0 .", "Builds an image from the Dockerfile in the current directory.", "Current directory Dockerfile nundi image build chestundi."],
      ["docker tag myapp:1.0 username/myapp:1.0", "Adds another tag to an existing image.", "Existing image ki another tag add chestundi."],
      ["docker login", "Authenticates with a container registry.", "Container registry ki authenticate chestundi."],
      ["docker push username/myapp:1.0", "Uploads an image to a container registry.", "Container image ni registry ki upload chestundi."],
      ["docker inspect web", "Displays detailed information about a container.", "Container gurinchi detailed information chupistundi."],
      ["docker stats", "Displays live resource usage statistics for containers.", "Containers CPU mariyu memory usage chupistundi."],
      ["docker top web", "Displays processes running inside a container.", "Container lopala running processes chupistundi."],
      ["docker port web", "Lists the port mappings of a container.", "Container port mappings list chestundi."],
      ["docker cp ./config.yml web:/app/config.yml", "Copies a local file into a container.", "Local file ni container loki copy chestundi."],
      ["docker rm web", "Removes a stopped container.", "Stopped container ni remove chestundi."],
      ["docker rmi myapp:1.0", "Removes a local Docker image.", "Local Docker image ni remove chestundi."],
      ["docker network ls", "Lists Docker networks.", "Docker networks anni list chestundi."],
      ["docker network create app-net", "Creates a Docker network.", "Docker network create chestundi."],
      ["docker volume ls", "Lists Docker volumes.", "Docker volumes anni list chestundi."],
      ["docker volume create app-data", "Creates a named Docker volume.", "Named Docker volume create chestundi."],
    ]),

    // ADVANCED - 10
    ...makeCommands("Advanced", [
      ["docker run -d --name limited-app --memory=512m --cpus=1.5 nginx", "Runs a container with memory and CPU limits.", "Memory mariyu CPU limits tho container run chestundi."],
      ["docker run -d --name health-app --health-cmd='curl -f http://localhost/ || exit 1' --health-interval=30s --health-retries=3 nginx", "Runs a container with a configured health check.", "Health check configure chesi container run chestundi."],
      ["docker run -d --name readonly-app --read-only nginx", "Runs a container with a read-only root filesystem.", "Read-only root filesystem tho container run chestundi."],
      ["docker run -d --name app-user --user 1000:1000 nginx", "Runs a container using a specified user and group ID.", "Specified user mariyu group ID tho container run chestundi."],
      ["docker run -d --name mounted-app --mount type=bind,source=/host/data,target=/app/data nginx", "Mounts a host directory inside a container.", "Host directory ni container lopala mount chestundi."],
      ["docker run -d --name restart-app --restart unless-stopped nginx", "Runs a container with an automatic restart policy.", "Automatic restart policy tho container run chestundi."],
      ["docker build --no-cache -t myapp:clean .", "Builds an image without using the build cache.", "Build cache use cheyakunda image build chestundi."],
      ["docker build --target production -t myapp:production .", "Builds a specific target stage from a multi-stage Dockerfile.", "Multi-stage Dockerfile nundi specific target stage build chestundi."],
      ["docker buildx build --platform linux/amd64,linux/arm64 -t username/myapp:latest --push .", "Builds and pushes an image for multiple platforms.", "Multiple platforms kosam image build chesi push chestundi."],
      ["docker run -d --name secure-app --cap-drop ALL nginx", "Runs a container after dropping all Linux capabilities.", "Linux capabilities anni drop chesi container run chestundi."],
    ]),

    // TROUBLESHOOTING - 15
    ...makeCommands("Troubleshooting", [
      ["docker logs --tail 100 web", "Displays the last 100 lines of container logs.", "Container logs lo last 100 lines chupistundi."],
      ["docker logs --since 10m web", "Displays logs generated during the last 10 minutes.", "Last 10 minutes lo generate ayina logs chupistundi."],
      ["docker logs -f web", "Streams container logs continuously.", "Container logs ni continuous ga stream chestundi."],
      ["docker inspect --format '{{.State.Status}} {{.State.ExitCode}}' web", "Checks the container state and exit code.", "Container state mariyu exit code check chestundi."],
      ["docker inspect --format '{{json .State.Health}}' web", "Displays the container health-check status.", "Container health-check status chupistundi."],
      ["docker stats --no-stream", "Displays a one-time snapshot of container resource usage.", "Container resource usage oka sari snapshot ga chupistundi."],
      ["docker events --since 10m --filter type=container", "Displays container events generated during the last 10 minutes.", "Last 10 minutes lo jarigina container events chupistundi."],
      ["docker system df", "Displays Docker disk usage.", "Docker disk usage chupistundi."],
      ["docker system df -v", "Displays detailed Docker disk usage information.", "Detailed Docker disk usage information chupistundi."],
      ["docker network inspect app-net", "Checks network configuration and connected containers.", "Network configuration mariyu connected containers check chestundi."],
      ["docker port web", "Checks host-to-container port mappings.", "Host mariyu container madhya port mappings check chestundi."],
      ["docker exec -it web sh", "Opens an interactive shell inside a running container.", "Running container lopala interactive shell open chestundi."],
      ["docker exec web cat /etc/resolv.conf", "Checks DNS resolver configuration inside a container.", "Container lopala DNS resolver configuration check chestundi."],
      ["docker image inspect nginx:latest", "Checks image metadata and configuration.", "Image metadata mariyu configuration check chestundi."],
      ["docker ps -a --filter status=exited", "Lists containers that have exited.", "Exit ayina containers list chestundi."],
    ]),
  ],
};
