# Real-Time DevOps Project Workflow

A real-time DevOps project involves developing, building, testing, deploying and monitoring application components across different environments. A typical application contains frontend, backend and database services. DevOps engineers automate the delivery process using Git, CI/CD pipelines, Docker, Kubernetes and monitoring tools.

## 1. Application Architecture and Docker Compose Workflow

A typical application is divided into three main components:

- **Frontend:** Provides the user interface and communicates with backend APIs.
- **Backend:** Implements business logic, processes application requests and communicates with the database.
- **Database:** Stores application data and provides persistent storage.

### Practical Steps

1. Create separate frontend, backend and database components.
2. Store application source code, Dockerfiles and deployment configurations in Git.
3. Create development, testing and production environment configurations.
4. Build and test frontend and backend application artifacts through a CI pipeline.
5. Package application components into versioned Docker images.
6. Configure service networking, environment variables, secrets and persistent volumes.
7. Use Docker Compose to run and validate the application services in local or test environments.
8. Verify application health, frontend-to-backend communication and backend-to-database connectivity.
9. Push validated images to a container registry for deployment into the target environment.

### Commands

```text
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs
docker compose down
```

### Configuration Example

```yaml
services:
  frontend:
    image: my-frontend:v1
    ports:
      - "8080:80"
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - app-network

  backend:
    image: my-backend:v1
    environment:
      DATABASE_HOST: database
      DATABASE_PORT: "5432"
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

volumes:
  db-data:

networks:
  app-network:
```

**Important:** Store database credentials in environment-specific secrets or a secure secret manager. Never commit passwords to Git. The backend should also implement database connection retries because `depends_on` and health checks do not guarantee that the application will remain available after startup.

### Common Issues and Solutions

**Frontend cannot communicate with backend.**

Check the backend API URL, Docker service DNS name, exposed ports, network membership and browser CORS configuration.

**Backend cannot connect to database.**

Verify database health, hostname, port, credentials, network access and application connection retry settings.

**Container repeatedly restarts.**

Check container exit codes, application logs, health-check results, environment variables and available CPU and memory.

---

## 2. Kubernetes Application Delivery Workflow

In a production environment, Kubernetes manages application containers through resources such as Deployments, Services, ConfigMaps, Secrets, readiness probes, liveness probes and optionally Ingress or Gateway resources.

### Practical Steps

1. Build and test the application using the CI pipeline.
2. Create versioned Docker images and push them to a container registry.
3. Prepare Kubernetes manifests or Helm charts for application deployment.
4. Create the required namespace and configure ConfigMaps and Secrets.
5. Deploy application workloads using Kubernetes Deployments.
6. Configure Services to enable communication between application components.
7. Configure readiness probes, liveness probes and CPU/memory requests and limits.
8. Configure Ingress or Gateway resources when external application access is required.
9. Verify Pod readiness, Service endpoints and deployment rollout status.
10. Monitor application performance and use a controlled rollback if a release causes production issues.

### Commands

```text
docker build -t REGISTRY/myapp:v1 .
docker push REGISTRY/myapp:v1

kubectl apply -f k8s/
kubectl get deployments
kubectl get pods -o wide
kubectl get services
kubectl get endpoints
kubectl rollout status deployment/myapp
kubectl describe deployment myapp
```

### Configuration Example

**Deployment and Service**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: REGISTRY/myapp:v1
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 20
            periodSeconds: 20
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
```

### Common Issues and Solutions

**Deployment does not become Ready.**

Inspect Pod events, container logs, image availability, readiness and liveness probes, resource requests and limits, and configuration errors.

**Traffic does not reach the application.**

Check Service selectors, Pod labels, endpoints, targetPort, network policies and Ingress or Gateway routing.

**New application version fails after deployment.**

Inspect rollout history and application logs. If the previous version was healthy, perform a controlled rollback.

```text
kubectl rollout history deployment/myapp
kubectl rollout undo deployment/myapp
kubectl rollout status deployment/myapp
```

---

## 3. Monitoring and Incident Response Workflow

Production operations require continuous monitoring and a defined incident response process. Monitoring tools collect application and infrastructure metrics, while centralized logging and alerting help engineers identify failures and restore services.

Common DevOps monitoring tools include Prometheus, Grafana, Alertmanager and centralized logging platforms.

### Practical Steps

1. Expose application and infrastructure metrics.
2. Collect metrics using Prometheus or another monitoring platform.
3. Create Grafana dashboards to monitor application and infrastructure health.
4. Monitor availability, latency, error rates, CPU, memory, disk usage and database connections.
5. Define alert rules based on service-level objectives (SLOs) and acceptable thresholds.
6. Configure Alertmanager or an equivalent notification system to route alerts to the responsible teams.
7. Investigate incidents using logs, metrics, events and recent deployment changes.
8. Identify the root cause and apply an appropriate mitigation or recovery procedure.
9. Verify application recovery and confirm that service objectives are being met.
10. Document the incident, root cause, resolution and preventive actions.

### Commands

```text
kubectl get pods -A
kubectl get nodes
kubectl top nodes
kubectl top pods -A
kubectl logs POD_NAME
kubectl describe pod POD_NAME
kubectl get events -A --sort-by=.metadata.creationTimestamp
```

### Configuration Example

**Important Production Monitoring Signals**

```text
Availability:
Successful requests / Total requests

Latency:
Application response time, including p95 and p99 latency

Error Rate:
Failed requests / Total requests

Saturation:
CPU usage, memory usage, disk pressure and queue utilization

Database Health:
Active connections, connection pool usage, query latency and failed connections
```

### Common Issues and Solutions

**Too many noisy alerts.**

Review alert thresholds, group related alerts, configure appropriate evaluation periods and prioritize alerts that indicate actual customer impact.

**Application performance suddenly decreases.**

Check CPU and memory utilization, request latency, database query performance, connection pools and recent deployments.

**Incident has no clear owner.**

Define service ownership, on-call responsibilities, escalation procedures and communication channels. Every production service should have an assigned support team.

**Application remains unavailable after deployment.**

Inspect deployment history, Pod status, application logs and monitoring dashboards. Roll back to the last known healthy version when necessary, then verify service recovery.

### Incident Closure and Continuous Improvement

After resolving a production incident:

1. Confirm that the application is stable and users can access the service.
2. Verify that monitoring alerts have returned to normal.
3. Record the incident timeline, business impact and root cause.
4. Document the recovery steps and any temporary workarounds.
5. Create preventive action items, such as adding automated tests, improving monitoring or correcting deployment procedures.
6. Conduct a post-incident review to prevent similar failures.

The objective is not only to restore the application but also to improve system reliability and reduce the possibility of recurring incidents.
