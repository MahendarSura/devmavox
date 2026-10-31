import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Compose",
  description: "Detailed Docker compose notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "10. Docker Compose – Multi-Container Applications",
      explanation: `
Docker Compose defines an application using a YAML configuration file.

A typical application may contain:
- Frontend.
- Backend API.
- Database.
- Cache.
- Reverse proxy.

Compose allows an engineer to describe services, networks, volumes and related configuration in one place.

IMPORTANT COMPOSE CONCEPTS:

services:
Defines application containers.

image:
Selects an existing image.

build:
Builds an image from a Dockerfile.

ports:
Publishes container ports.

environment:
Defines environment variables.

env_file:
Loads environment variables from a file.

volumes:
Defines persistent storage and mounts.

networks:
Defines network membership.

depends_on:
Controls dependency startup ordering. It does not automatically prove that a dependency is ready to serve requests. Use health checks and supported dependency conditions when readiness ordering is required.

healthcheck:
Defines a service health test.

profiles:
Enables optional groups of services.

secrets:
Provides secret data through supported Compose secret mechanisms. For production, also evaluate the deployment platform's secret-management capabilities.

configs:
Provides configuration files to services where supported.

Compose is useful for local development, testing and some deployment workflows. It is not the same thing as a full production orchestration platform.
      `,
      steps: [
        "Create compose.yaml.",
        "Define application services.",
        "Define networks and persistent volumes.",
        "Provide configuration without committing secrets.",
        "Validate the file.",
        "Start the application.",
        "Inspect service status and logs.",
        "Test dependency readiness and application endpoints."
      ],
      commands: `
docker compose config
docker compose up -d

docker compose ps
docker compose logs
docker compose logs -f api

docker compose exec api sh

docker compose restart api
docker compose down

# Remove declared volumes too: destructive to persisted data
docker compose down --volumes
      `,
      config: `
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_HOST: database
    depends_on:
      database:
        condition: service_healthy

  database:
    image: postgres:16
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - database-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d appdb"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  database-data:
      `,
      problems: [
        {
          issue: "API starts before the database is ready.",
          rootCause:
            "Container startup order does not necessarily mean that the database is accepting connections.",
          solution:
            "Use a database health check and a supported depends_on health condition. The API should also implement retry logic for temporary database unavailability."
        },
        {
          issue: "Compose application cannot resolve a service name.",
          rootCause:
            "The services may not share the expected Compose network or the application may use the wrong hostname.",
          solution:
            "Inspect Compose network configuration and use the service name as the hostname for service-to-service communication."
        }
      ]
    }
  ]
};

export default data;
