                  
## Docker Mastery Roadmap — Beginner to Production 

> A practical, step-by-step Docker learning path for DevOps engineers. Learn the concepts, commands, debugging workflow, and production practices used in real projects.

## Learning outcomes

By completing this roadmap, you should be able to:

- Explain containers, images, registries, and the difference between containers and virtual machines.
- Build, tag, inspect, run, stop, and troubleshoot Docker images and containers.
- Write efficient Dockerfiles and use multi-stage builds.
- Persist data with volumes and share networks between services.
- Run multi-container applications with Docker Compose.
- Debug logs, ports, DNS, permissions, storage, and resource problems.
- Apply image security, reliability, and deployment practices used in production.

## How to use this roadmap

For every part, follow this cycle:

1. Read the concept and understand why it matters.
2. Run the commands in a disposable lab environment.
3. Inspect the result instead of only copying commands.
4. Break something intentionally and troubleshoot it.
5. Write down the root cause, fix, and verification command.

**Safety note:** Practice destructive commands only in a lab. Commands such as `docker system prune -a --volumes` can remove images, stopped containers, build cache, and unused volumes.

---

## Part 1 — Container fundamentals

### What is Docker?

Docker is a platform for packaging and running applications in containers. A container uses the host operating system's kernel while isolating application processes, filesystem, networking, and resource usage. Containers usually start faster and use fewer resources than full virtual machines, though they are not a replacement for every VM use case.

### Core terms

| Term | Meaning |
|---|---|
| Image | Read-only template used to create containers |
| Container | A running or stopped instance of an image |
| Registry | Service that stores and distributes images |
| Dockerfile | Instructions used to build an image |
| Volume | Docker-managed persistent data storage |
| Network | Connectivity between containers and external systems |
| Compose | Tool for defining and running multi-container applications |

### First commands

```bash
docker --version
docker info
docker run --rm hello-world
docker ps
docker ps -a
```

**Practice:** Run `hello-world`, identify whether the container remains after it exits, and explain what `--rm` changes.

## Part 2 — Images and registries

Images are built from layers. Reusing unchanged layers can make builds faster. Tags are labels, not guaranteed immutable identifiers; for reproducible deployments, record the image digest.

```bash
docker pull nginx:stable
docker images
docker image inspect nginx:stable
docker history nginx:stable
docker tag nginx:stable your-dockerhub-name/nginx-lab:v1
docker login
docker push your-dockerhub-name/nginx-lab:v1
```

**Troubleshooting checklist:** Check the repository name, tag, registry hostname, login status, network connectivity, and push permissions. Never put registry passwords or access tokens directly in a Dockerfile or commit them to Git.

## Part 3 — Container lifecycle

```bash
docker run -d --name web-lab -p 8080:80 nginx:stable
docker ps
docker logs web-lab
docker inspect web-lab
docker exec -it web-lab sh
docker stop web-lab
docker start web-lab
docker restart web-lab
docker rm -f web-lab
```

- `-d` runs in the background.
- `--name` assigns a readable name.
- `-p 8080:80` maps host port 8080 to container port 80.
- `docker exec` runs a command inside an already running container.
- A container's writable layer is not durable storage; use a volume for important data.

**Practice:** Open `http://localhost:8080`, inspect the container, then stop and remove it.

## Part 4 — Port mapping and application access

A process listening inside a container is not automatically reachable from the host. The application must listen on the appropriate container interface, and the port must be published if host access is needed.

```bash
docker run -d --name web-port-lab -p 8081:80 nginx:stable
docker port web-port-lab
docker logs web-port-lab
```

If access fails, check in this order:

1. Is the container running?
2. Is the application listening on the expected container port?
3. Is the host-to-container port mapping correct?
4. Is the host port already in use?
5. Is a host firewall, cloud security group, or proxy blocking traffic?

Do not assume the container port and host port must be identical.

## Part 5 — Writing a Dockerfile

Example for a static website:

```dockerfile
FROM nginx:stable
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
```

Build and run it:

```bash
docker build -t web-lab:v1 .
docker run --rm -p 8082:80 web-lab:v1
```

Important instructions:

- `FROM`: chooses the base image.
- `WORKDIR`: sets the working directory for later instructions.
- `COPY`: copies files from the build context.
- `RUN`: executes build-time commands.
- `ENV`: sets environment variables.
- `EXPOSE`: documents the intended container port; it does not publish that port.
- `CMD` and `ENTRYPOINT`: define how the container process starts.

Prefer explicit base-image versions and keep the build context small.

## Part 6 — Build context and `.dockerignore`

Docker sends a build context to the builder. Unneeded files can make builds slower and accidentally include sensitive data.

Example `.dockerignore`:

```text
.git
node_modules
.next
.env
.env.*
coverage
*.log
```

Review exclusions carefully: do not exclude files required by the build. Keep credentials, private keys, and local environment files out of the context.

## Part 7 — Image layers and build cache

Docker can reuse cached build steps when inputs and instructions have not changed. Order instructions so stable dependencies are installed before frequently changing application files when the application framework allows it.

```bash
docker build --progress=plain -t web-lab:cache-test .
docker image history web-lab:cache-test
```

**Practice:** Change only a source file, rebuild, and observe which steps are cached. Do not optimize by blindly combining every instruction; clarity and correctness matter.

## Part 8 — Multi-stage builds

Multi-stage builds separate build tools from the final runtime image. This can reduce image size and the number of tools shipped to production.

General pattern:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/.next ./.next
```

This is an illustrative pattern, not a universal Next.js production Dockerfile. Some Next.js projects require standalone output or additional public/static files. Follow the framework's deployment requirements and test the final image.

## Part 9 — Environment variables and configuration

Keep environment-specific configuration outside the image where possible.

```bash
docker run --rm -e APP_ENV=development alpine:3.20 env
```

Use `--env-file` for local non-secret configuration when appropriate. Treat secrets differently: use a secret manager or platform-supported secret mechanism, restrict access, and rotate exposed credentials. Environment variables can be visible to processes and privileged operators; they are not a complete secrets-management system.

## Part 10 — Persistent storage and volumes

Container writable layers are usually disposable. Volumes allow data to survive container replacement.

```bash
docker volume create app-data
docker volume ls
docker run -d --name volume-demo -v app-data:/data alpine:3.20 sleep 3600
docker exec volume-demo sh -c 'echo persistent > /data/example.txt'
docker rm -f volume-demo
docker run --rm -v app-data:/data alpine:3.20 cat /data/example.txt
```

Understand the difference between named volumes and bind mounts. Bind mounts connect a host path to a container path and are useful for development; they also expose host files to the container. Back up important volume data and test restoration.

## Part 11 — Docker networking

Common network types include bridge, host, and none. User-defined bridge networks provide container-name DNS resolution within the network.

```bash
docker network create app-net
docker run -d --name web --network app-net nginx:stable
docker run --rm --network app-net busybox:1.36 nslookup web
docker network inspect app-net
docker network rm app-net
```

For service-to-service communication on the same user-defined network, use the service/container name and the container's listening port. A host-published port is generally for access from outside that network.

## Part 12 — Docker Compose

Compose describes related services, networks, and volumes in a YAML file.

Example `compose.yaml`:

```yaml
services:
  web:
    image: nginx:stable
    ports:
      - "8083:80"
    depends_on:
      - app
  app:
    image: hashicorp/http-echo:1.0.0
    command: ["-text=hello from app"]
```

This sample demonstrates Compose structure; the web service does not proxy requests to `app` without additional configuration.

Useful commands:

```bash
docker compose config
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

`depends_on` controls startup ordering, but it does not automatically mean a dependency is ready to serve requests. Use health checks and application-level retry logic where needed.

## Part 13 — Health checks and restart policies

A container being running does not prove that its application is healthy. Health checks can test an application-specific endpoint or command.

Example:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
```

The command must exist in the image; for minimal images, choose a suitable check. Restart policies such as `unless-stopped` can help recover from process exits, but they do not fix an application that repeatedly crashes.

## Part 14 — Logs and troubleshooting workflow

```bash
docker ps -a
docker logs --tail 100 <container>
docker logs -f <container>
docker inspect <container>
docker events
docker stats
```

Troubleshoot systematically:

1. Capture the exact error and timestamp.
2. Check container state and exit code.
3. Read logs from the failing container and its dependencies.
4. Inspect environment variables, mounts, networks, and port mappings.
5. Reproduce the failure with the smallest possible test.
6. Apply one change at a time.
7. Verify the fix and document the root cause.

Avoid repeatedly restarting a container before capturing useful logs.

## Part 15 — Common Docker failures

| Symptom | Common causes | First checks |
|---|---|---|
| Container exits immediately | Main process finishes or crashes | `docker ps -a`, `docker logs` |
| Restart loop | Startup error, missing config, dependency unavailable | `docker logs`, `docker inspect` |
| Image pull denied | Wrong image/tag or missing permissions | `docker pull`, registry login |
| Port unreachable | Wrong mapping or app binding | `docker port`, logs, inspect |
| DNS/service connection failure | Different networks or wrong service name | `docker network inspect`, DNS test |
| Data disappears | Data stored only in container layer | Check mounts and volume configuration |
| Permission denied | UID/GID or host filesystem permissions | Inspect process user and mount ownership |
| Disk usage grows | Old images, build cache, logs, volumes | `docker system df` |
| Out of memory | Excessive workload or memory limit | `docker stats`, host/container metrics |

Useful commands:

```bash
docker system df
docker inspect <container>
docker stats
docker exec -it <container> sh
```

Do not delete volumes as a first troubleshooting step; they may contain important data.

## Part 16 — Resource limits and performance

Containers can consume host CPU, memory, disk, and network resources. Establish resource requests/limits appropriate to the deployment environment and monitor actual usage.

```bash
docker stats
docker run --rm --memory=256m --cpus=1.0 alpine:3.20 sh -c 'sleep 10'
```

Investigate memory pressure, CPU saturation, disk I/O, oversized images, excessive logging, and unnecessary processes. The correct limits depend on the application and workload; the example values are for demonstration only.

## Part 17 — Docker security basics

- Prefer trusted, maintained base images.
- Pin versions and consider digest pinning for controlled production releases.
- Run as a non-root user when the application supports it.
- Do not bake credentials into images or source control.
- Use a `.dockerignore` file.
- Keep images minimal and rebuild to receive security updates.
- Scan images for known vulnerabilities and review findings.
- Drop unnecessary Linux capabilities and use read-only filesystems where practical.
- Avoid privileged containers unless there is a justified operational requirement.
- Limit access to the Docker daemon; daemon access can grant extensive host privileges.

## Part 18 — Image scanning and software supply chain

Use the scanning tools approved by your organization, such as Docker Scout or an established vulnerability scanner. Review the image's base layers, operating-system packages, application dependencies, and provenance.

Example:

```bash
docker scout quickview web-lab:v1
docker scout cves web-lab:v1
```

These commands require Docker Scout availability and may require authentication. Treat scan results as input to risk assessment; prioritize severity, exploitability, exposure, and available fixes.

## Part 19 — Docker in CI/CD

A typical container delivery pipeline:

1. Checkout source code.
2. Run tests and static checks.
3. Build the image.
4. Scan the image.
5. Tag it with a unique version or commit SHA.
6. Push it to a registry.
7. Deploy the same tested image to the target environment.
8. Verify health and monitor the rollout.

Avoid using only `latest` for release tracking. Keep registry credentials in the CI platform's secret store, restrict permissions, and use immutable build identifiers where possible.

## Part 20 — Deploying containers to a server

Before deployment, verify:

- The target host has a supported container runtime.
- Required ports are intentionally exposed and protected.
- Persistent data is stored outside disposable container layers.
- Configuration and secrets are provided securely.
- Logs and metrics can be collected.
- Restart and recovery behavior is understood.
- Backups and rollback steps have been tested.

For production systems, use an orchestrator or platform that fits the reliability, scaling, security, and operations requirements. A single `docker run` command alone is not a complete production deployment strategy.

## Part 21 — Docker Compose project lab

Build a small multi-service application with:

- A frontend or reverse proxy.
- An application service.
- A database service.
- A named volume for database data.
- A private network for internal communication.
- Health checks and environment-specific configuration.

Deliverables:

- `compose.yaml`
- `.env.example` containing placeholders only
- Dockerfiles where needed
- A README with startup, test, backup, restore, and cleanup steps

Do not commit real `.env` files, passwords, tokens, or production data.

## Part 22 — Reverse proxy and service communication

Use a reverse proxy when you need routing, TLS termination, or a single public entry point for multiple services. Configure upstream service names, ports, timeouts, and health behavior explicitly.

Practice by routing `/api` to an application service and `/` to a frontend. Verify internal DNS, upstream reachability, response codes, and proxy logs. Do not publish database ports publicly unless the architecture explicitly requires it and access is restricted.

## Part 23 — Backups, recovery, and cleanup

A backup is useful only if it can be restored. Document what is backed up, how frequently, where it is stored, who can access it, and how recovery is tested.

```bash
docker volume ls
docker system df
docker ps -a
```

Before cleanup, identify containers, images, networks, volumes, and build cache that are safe to remove. Confirm backups before deleting data-bearing volumes. Test recovery in a separate lab environment.

## Part 24 — Production incident simulation

Simulate these failures in a disposable lab:

1. Stop a required dependency and observe application behavior.
2. Configure an incorrect host port and diagnose connectivity.
3. Use a missing environment variable and identify the startup error.
4. Fill a test filesystem or constrain resources carefully.
5. Remove a container and verify that volume-backed data survives.
6. Break service DNS by placing containers on separate networks.

For each incident, record:

- User-visible impact
- Detection signal
- Evidence collected
- Root cause
- Fix and verification
- Prevention action

Do not run destructive experiments on production systems.

## Part 25 — Capstone: containerized application delivery

Create a small application and deliver it through a complete container workflow.

### Required components

- A maintained base image and a well-structured Dockerfile
- A `.dockerignore` file
- Multi-stage build when appropriate
- Externalized configuration and safe secret handling
- Persistent storage for stateful data
- A user-defined network or Compose configuration
- Health checks and useful logs
- Automated tests and image scanning
- Versioned image tags and registry publishing
- Deployment, verification, rollback, and backup instructions

### Acceptance checklist

- [ ] A clean checkout can build the image.
- [ ] The application starts with documented commands.
- [ ] Published ports and internal service ports are correct.
- [ ] Data persists when the application container is replaced.
- [ ] Logs explain common startup failures.
- [ ] Secrets are not committed or baked into the image.
- [ ] Image vulnerabilities are reviewed.
- [ ] The deployment can be rolled back to a known version.
- [ ] Backup restoration has been tested.
- [ ] The README explains setup, operations, troubleshooting, and cleanup.

---

## Quick command reference

| Task | Command |
|---|---|
| Running containers | `docker ps` |
| All containers | `docker ps -a` |
| Container logs | `docker logs <container>` |
| Inspect object | `docker inspect <name>` |
| Execute command | `docker exec -it <container> sh` |
| Build image | `docker build -t name:tag .` |
| List images | `docker images` |
| List volumes | `docker volume ls` |
| List networks | `docker network ls` |
| Resource usage | `docker stats` |
| Docker disk usage | `docker system df` |
| Compose startup | `docker compose up -d` |
| Compose logs | `docker compose logs -f` |
| Compose stop/remove containers | `docker compose down` |

## Suggested study schedule

| Week | Focus | Practical outcome |
|---|---|---|
| 1 | Parts 1–5 | Run containers and build a basic image |
| 2 | Parts 6–10 | Improve builds and persist data |
| 3 | Parts 11–16 | Network services and troubleshoot failures |
| 4 | Parts 17–20 | Apply security and CI/CD practices |
| 5 | Parts 21–25 | Complete the capstone and document operations |

## Final advice

Do not memorize commands alone. For each lab, learn what changed, why it changed, how to verify it, and how to roll it back. Docker is one part of a DevOps workflow; production readiness also requires sound application design, security, observability, automation, and reliable operational procedures.
"""
out = "/mnt/data/README-Docker-Mastery-Roadmap.md"
pypandoc.convert_text(md, 'md', format='md', outputfile=out, extra_args=['--standalone'])
print(out, os.path.getsize(out))
