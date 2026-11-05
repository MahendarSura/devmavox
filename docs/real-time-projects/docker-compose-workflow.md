# Docker Compose Real-Time Application Workflow

**Workflow 01 | Application Architecture and Containerized Development**

This workflow demonstrates how to develop, containerize, configure, run and validate a multi-tier application using Docker Compose. The example uses a frontend, backend API and PostgreSQL database. The same architecture can be used by development teams to create repeatable local environments before deploying application images to a production container platform.

## 1. Application Architecture

A typical three-tier application contains three independently managed components.

- **Frontend:** Provides the user interface. It sends HTTP requests to backend APIs and displays application responses.
- **Backend:** Implements business logic, validates requests, communicates with the database and returns API responses.
- **Database:** Stores application records persistently. PostgreSQL is used in this example.

The frontend should communicate with the backend through an API endpoint. The backend should connect to the database using the Docker Compose service name `database`, not `localhost`. Inside a container, `localhost` refers to that same container.

**Request flow**

1. A user opens the frontend using the browser.
2. The frontend sends an API request to the backend.
3. The backend validates the request and applies business logic.
4. The backend connects to PostgreSQL using the internal Compose network.
5. PostgreSQL returns the requested data.
6. The backend sends a response to the frontend.
7. The frontend displays the result to the user.

## 2. Prerequisites and Project Structure

Install Docker Desktop or Docker Engine with the Docker Compose plugin. Verify that Docker is running before creating the application environment.

### Commands

```bash
docker --version
docker compose version
docker info
git --version
```

Create a repository with a predictable structure:

```text
real-time-application/
├── frontend/
│   ├── Dockerfile
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── src/
│   └── package.json
├── database/
│   └── init.sql
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

Keep application code, Dockerfiles and deployment configuration in Git. Keep real credentials outside source control. The `.env.example` file should contain variable names and safe sample values, not production passwords.

## 3. Build the Frontend and Backend Applications

Develop the frontend and backend independently. The frontend should use an API base URL that is valid for the environment in which it runs. Browser-side code cannot resolve Docker-only service names unless the browser itself is inside the Docker network; normally, expose the backend through a host-accessible URL or reverse proxy.

The backend should expose a health endpoint such as `/health`. It should return a successful HTTP status only when the application can serve requests. If database readiness is part of application readiness, verify database connectivity separately.

### Validation checklist

1. Start the frontend and backend locally during development.
2. Test the backend health endpoint.
3. Test important API endpoints with representative requests.
4. Verify database reads and writes.
5. Confirm that invalid requests return suitable error responses.
6. Confirm that application logs do not expose passwords or tokens.

## 4. Create Dockerfiles

A Dockerfile defines how an application is packaged into an image. Use a supported base image, install only required dependencies, copy application files and define the startup command.

### Backend Dockerfile example

```dockerfile
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 8080
USER node
CMD ["npm", "start"]
```

### Frontend Dockerfile example

```dockerfile
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

Adjust the build output directory and startup command to match the actual framework. Do not blindly copy this example into an application whose build output differs.

### Build commands

```bash
docker build -t my-backend:v1 ./backend
docker build -t my-frontend:v1 ./frontend
docker image ls
docker image inspect my-backend:v1
```

Use `.dockerignore` to exclude unnecessary files such as `.git`, local dependencies, temporary files and local environment files. This reduces build context size and prevents accidental inclusion of secrets.

## 5. Configure Docker Compose Services

Docker Compose defines multiple related containers in one YAML file. It creates a project network and manages service startup, configuration, volumes and container lifecycle.

### docker-compose.yml

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "8080:80"
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped

  backend:
    build: ./backend
    environment:
      DATABASE_HOST: database
      DATABASE_PORT: "5432"
      DATABASE_NAME: appdb
      DATABASE_USER: appuser
      DATABASE_PASSWORD: ${DB_PASSWORD}
    depends_on:
      database:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 5s
      retries: 3
    networks:
      - app-network
    restart: unless-stopped

  database:
    image: postgres:16
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d appdb"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network
    restart: unless-stopped

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
```

**Important configuration details**

- `services` defines the containers managed by Compose.
- `ports` publishes a container port on the host machine.
- `environment` passes runtime configuration into a container.
- `depends_on` controls startup ordering and can wait for a health check when configured with `service_healthy`.
- `healthcheck` tests whether a service is responding.
- `volumes` preserve database data beyond the lifetime of a container.
- `networks` allow services to communicate using their Compose service names.
- The backend image must contain the health-check executable used by its health check. If `curl` is not installed, use an available command or add it deliberately.

## 6. Configure Environment Variables and Secrets

Create a local `.env` file:

```text
DB_PASSWORD=replace-with-a-local-development-password
```

Add `.env` to `.gitignore`:

```text
.env
.env.*
!.env.example
```

For production, use a managed secrets solution or the deployment platform's secret mechanism. Avoid storing credentials in Git, Docker image layers, shell history or plain-text pipeline logs. Rotate credentials when exposure is suspected.

## 7. Start and Validate the Application

Validate the Compose configuration before starting containers.

### Commands

```bash
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail=100
docker compose logs -f backend
```

Open the frontend using the published host port. Test the backend API and confirm that the backend can read and write database records.

### Expected validation

- Frontend container is running.
- Backend health check reports healthy.
- PostgreSQL accepts connections.
- Frontend API requests reach the backend.
- Backend database operations succeed.
- No repeated restart loop appears in container status.

## 8. Networking and Service Discovery

Compose creates a network for the application. Containers attached to the same network can reach one another using service names and container ports.

For example, the backend connects to PostgreSQL at `database:5432`. It should not use `localhost:5432`, because that would point to the backend container itself.

### Diagnostic commands

```bash
docker network ls
docker network inspect real-time-application_app-network
docker compose exec backend printenv
docker compose exec database pg_isready -U appuser -d appdb
```

Use the actual Compose project and network names returned by Docker. Verify firewall rules and published host ports when accessing services from outside the Compose network.

## 9. Persistent Storage and Database Backup

A named volume keeps database files outside the container's writable layer. Recreating a database container does not normally remove its named volume.

### Commands

```bash
docker volume ls
docker volume inspect real-time-application_db-data
docker compose exec database pg_isready -U appuser -d appdb
docker compose exec database pg_dump -U appuser appdb > backup.sql
```

Test database restoration in a non-production environment. A backup is useful only when it can be restored successfully. Define retention, encryption, access control and recovery objectives for production data.

**Warning:** `docker compose down -v` removes named volumes declared by the Compose project. Do not run it when database data must be preserved.

## 10. CI/CD Integration

A CI pipeline should validate application changes before publishing images.

Typical pipeline stages:

1. Checkout source code from Git.
2. Install frontend and backend dependencies.
3. Run linting and unit tests.
4. Build application artifacts.
5. Build Docker images.
6. Scan images and dependencies for vulnerabilities.
7. Tag images with an immutable build identifier or commit SHA.
8. Push approved images to a container registry.
9. Deploy to a test environment.
10. Run smoke tests and publish the deployment result.

Do not rely only on the mutable `latest` tag. Use traceable version tags so a deployment can be connected to a source commit and build record.

## 11. Logging, Monitoring and Resource Management

Send application logs to standard output and standard error so container logging drivers can collect them. Include useful timestamps, severity and request identifiers. Avoid logging passwords, access tokens and sensitive personal data.

### Commands

```bash
docker stats
docker compose top
docker compose logs --since=30m backend
docker inspect CONTAINER_ID
docker system df
```

Monitor CPU, memory, restart count, request latency, error rate and database connection usage. Set appropriate resource limits based on observed workload rather than choosing arbitrary values.

## 12. Production Readiness and Security

Before using this pattern in a production environment:

- Pin base images to approved versions and rebuild regularly.
- Use non-root users where supported.
- Scan images and dependencies.
- Restrict published ports to services that require external access.
- Store secrets in a secure secret manager.
- Configure health checks and application-level retries.
- Use persistent storage and tested backups for stateful services.
- Configure log retention and monitoring.
- Define deployment, rollback and recovery procedures.
- Keep development, staging and production configuration separate.

Docker Compose is excellent for local development, testing and smaller deployments. For large-scale orchestration, high availability and cluster scheduling, use an orchestrator such as Kubernetes.

## 13. Common Production Issues and Solutions

**Frontend cannot communicate with backend.**

Check the API URL used by the browser, published ports, reverse proxy configuration, CORS policy and backend logs. Remember that a browser normally cannot resolve the internal Compose service name `backend`.

**Backend cannot connect to PostgreSQL.**

Verify the hostname `database`, port `5432`, credentials, database name, network membership and database health. Implement connection retries with backoff because a healthy database at startup can become unavailable later.

**Container repeatedly restarts.**

Run `docker compose ps` and inspect `docker compose logs SERVICE_NAME`. Check exit codes, startup commands, environment variables, health-check commands and memory limits.

**Database data disappears after recreation.**

Verify that the database uses a named volume and that the volume was not removed. Restore from a tested backup if required.

**Image build fails.**

Check Dockerfile paths, `.dockerignore`, dependency lock files, registry access and build logs. Reproduce the build locally before changing the pipeline.

## 14. Recovery, Rollback and Incident Closure

When a release causes a production issue:

1. Identify the affected service and customer impact.
2. Stop further deployments until the issue is understood.
3. Compare the current release with the last known healthy image.
4. Restore the previous image tag and configuration.
5. Restart or redeploy only the required services.
6. Validate health checks, API responses and database connectivity.
7. Monitor error rates and latency after recovery.
8. Document the timeline, root cause and corrective actions.

A rollback does not automatically reverse database schema changes. Plan backward-compatible migrations and test recovery procedures before production deployment.

## 15. End-to-End Workflow Validation

The workflow is complete only when the team can demonstrate the full application lifecycle:

1. Source code is committed to Git.
2. CI tests pass.
3. Docker images build successfully.
4. Images are tagged and stored in a registry.
5. Compose services start successfully.
6. Frontend, backend and database communication works.
7. Data persists after container recreation.
8. Logs and health checks provide useful operational evidence.
9. A failed release can be recovered safely.
10. Deployment and recovery steps are documented.

The objective is to create a repeatable application environment that developers and operations engineers can understand, validate and troubleshoot.
