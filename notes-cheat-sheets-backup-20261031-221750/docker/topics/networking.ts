import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Networking",
  description: "Detailed Docker networking notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "08. Docker Networking – Bridge, Host, None and Overlay",
      explanation: `
Docker networking allows containers to communicate.

BRIDGE:
A common network mode for containers on a single Docker host. User-defined bridge networks provide automatic DNS resolution between containers by name.

HOST:
The container shares the host network namespace on supported Linux configurations. Port publishing is not used in the same way as bridge mode.

NONE:
Disables normal container network connectivity, apart from loopback.

OVERLAY:
Provides networking across Docker hosts when used with a suitable multi-host setup such as Swarm.

MACVLAN:
Can give containers addresses on a physical network, subject to host and network infrastructure configuration.

PORT PUBLISHING:
-p HOST_PORT:CONTAINER_PORT publishes a container port on the host.

Example:
-p 8080:80

Host port 8080 forwards traffic to container port 80.

EXPOSE:
Dockerfile EXPOSE documents the intended container port. It does not publish that port.

CONTAINER DNS:
On a user-defined bridge network, containers can normally reach each other by container name or network alias.

LOCALHOST WARNING:
Inside a container, localhost means that same container's network namespace. It does not mean another container or the Docker host.

Example:
An API container connecting to a database container should normally use the database service/container name and database port, not localhost.
      `,
      steps: [
        "List Docker networks.",
        "Inspect the network used by each container.",
        "Confirm both containers are attached to the intended network.",
        "Check the destination service name and listening port.",
        "Check application bind address and firewall rules.",
        "Test name resolution and TCP connectivity from the correct container.",
        "Inspect host port publishing when traffic enters from outside."
      ],
      commands: `
docker network ls
docker network inspect app-network

docker network create app-network

docker run -d --name database \\
  --network app-network \\
  postgres

docker run -d --name api \\
  --network app-network \\
  my-api:v1

docker port api
docker inspect api

# Test from a suitable diagnostic container
docker run --rm --network app-network busybox nslookup database
      `,
      problems: [
        {
          issue: "API container cannot connect to database using localhost.",
          rootCause:
            "localhost inside the API container points to the API container itself, not the database container.",
          solution:
            "Connect to the database using its Docker network name or Compose service name and the database listening port."
        },
        {
          issue: "Container name cannot be resolved.",
          rootCause:
            "The containers may be on different networks, or the application may be using a network without the expected DNS behavior.",
          solution:
            "Inspect network membership and attach both containers to the intended user-defined network."
        },
        {
          issue: "Application is reachable inside the container but not from the host.",
          rootCause:
            "The port may not be published, the application may bind only to loopback, or host firewall rules may block traffic.",
          solution:
            "Check docker port, inspect published-port configuration, verify the application bind address and review host firewall rules."
        }
      ]
    }
  ]
};

export default data;
