import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Volumes",
  description: "Detailed Docker volumes notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "09. Docker Storage – Volumes, Bind Mounts and tmpfs",
      explanation: `
A container's writable layer is not the right place for important data that must survive container replacement.

DOCKER VOLUME:
A Docker-managed storage location. Volumes are commonly used for databases and persistent application data.

BIND MOUNT:
Maps a specific host filesystem path into a container.

tmpfs:
Stores temporary data in memory on supported Linux configurations. It is not persistent storage.

WHY STORAGE MATTERS:

A database container may be removed and recreated during deployment. If its database files exist only in the container writable layer, data may be lost when the container is removed.

Use persistent storage for important application state.

MOUNT SYNTAX:

-v:
Short syntax for volumes and bind mounts.

--mount:
Explicit syntax with fields such as type, source and target.

READ-ONLY MOUNT:
A mount can be made read-only when the application only needs to read its contents.

BACKUP:
A volume is not automatically a backup. Production data needs a tested backup and restore process.
      `,
      steps: [
        "Identify which application paths contain persistent data.",
        "Choose a Docker volume or bind mount.",
        "Check ownership and permissions for the container process.",
        "Mount the storage at the application's expected path.",
        "Write test data and recreate the container.",
        "Confirm the data survives container replacement.",
        "Test backup and restore separately."
      ],
      commands: `
docker volume ls
docker volume create app-data
docker volume inspect app-data

docker run -d --name app \\
  --mount type=volume,source=app-data,target=/var/lib/app \\
  my-app:v1

docker inspect app

docker volume ls
      `,
      config: `
# Compose example with persistent database storage

services:
  database:
    image: postgres:16
    volumes:
      - database-data:/var/lib/postgresql/data

volumes:
  database-data:
      `,
      problems: [
        {
          issue: "Database data disappears after container replacement.",
          rootCause:
            "Database files were stored in the container writable layer rather than persistent storage.",
          solution:
            "Use a persistent volume, restore data from a verified backup if needed and test container replacement before production rollout."
        },
        {
          issue: "Application receives permission denied on a mounted path.",
          rootCause:
            "The process UID/GID inside the container does not have the required permissions on the mounted storage.",
          solution:
            "Inspect process identity and storage ownership. Set appropriate ownership or group access with the minimum required permissions."
        }
      ]
    },
    {
      heading: "23. Real Production Incident – Container Cannot Write to Volume",
      explanation: `
SCENARIO:

An application starts but fails when it tries to write uploaded files or database data.

Possible error:
Permission denied.

INVESTIGATION:

1. Identify the exact path from the application log.
2. Inspect the container's configured user.
3. Inspect the mounted volume or bind mount.
4. Check ownership and permissions on the host path.
5. Confirm whether the mount is read-only.
6. Check whether the application expects a different directory.
7. Apply the smallest permission correction.

Avoid chmod 777 as a default fix. It grants broad access and hides the actual ownership problem.
      `,
      steps: [
        "Capture the exact path and permission error.",
        "Check the container process UID and GID.",
        "Inspect the mount configuration.",
        "Check host directory ownership and permissions.",
        "Check read-only mount settings.",
        "Correct ownership or group access.",
        "Restart or redeploy if required.",
        "Verify that the application can write and read the expected data."
      ],
      commands: `
docker inspect api

docker exec api id

docker exec api sh -c 'ls -ld /app/uploads'

docker exec api sh -c 'touch /app/uploads/write-test'
      `,
      problems: [
        {
          issue: "Permission denied when writing to a bind mount.",
          rootCause:
            "The host directory ownership or permissions do not allow the container process user to write.",
          solution:
            "Match the required UID/GID or group permissions and grant only the access the application needs."
        }
      ]
    }
  ]
};

export default data;
