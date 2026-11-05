# Production Deployment Checklists

A production deployment is a controlled process that moves a tested application release into a live environment. A reliable deployment requires preparation, approvals, infrastructure checks, security validation, controlled execution, health verification and a documented recovery plan. These checklists describe how DevOps engineers coordinate a real release from development through production.

## 1. Understand the Complete Deployment Lifecycle

A production release involves more than running a deployment command. Engineers must confirm what is being released, where it will run, which dependencies it needs and how the team will detect a failure.

### Real-Time Workflow

1. A developer completes a feature or bug fix and pushes the reviewed code.
2. The CI pipeline builds the application and runs automated tests.
3. The pipeline produces a versioned artifact or container image.
4. The release owner confirms the target environment and deployment window.
5. Infrastructure, secrets, database compatibility and capacity are checked.
6. The approved artifact is deployed using the organization's release strategy.
7. Readiness checks and smoke tests verify the new release.
8. Monitoring is observed before the deployment is declared successful.
9. The release version, evidence and outstanding issues are recorded.

### Practical Commands

```bash
git status
git log -1 --oneline
git rev-parse HEAD
docker image inspect myapp:1.4.2
kubectl get nodes
kubectl get deployments -A
```

### Production Example

An online shopping application is releasing version `1.4.2`. The team confirms the commit ID, image digest, target Kubernetes namespace, database migration status and rollback image. Only after these checks does the release owner approve production deployment.

### Common Issues and Solutions

**The team deploys code without knowing the exact artifact version.**

Record the Git commit, release tag, image tag and preferably the immutable image digest. Do not rely on a mutable `latest` tag for production releases.

**A deployment starts while another release is running.**

Use release locking or deployment concurrency controls. Confirm the previous deployment has completed or been safely stopped before starting another one.

## 2. Pre-Deployment Source Code and Build Validation

Before production deployment, verify that the source code is reviewed, the intended branch is selected and the build represents the expected release. A successful local build does not prove that the production artifact is correct.

### Practical Steps

1. Confirm the approved release branch and commit.
2. Check that required pull requests have been reviewed and merged.
3. Verify that no unintended local changes are included.
4. Run unit tests, integration tests and required quality checks.
5. Confirm that the production build completes successfully.
6. Review dependency changes and lock files.
7. Verify that the artifact was produced by the expected pipeline run.
8. Record the commit SHA and artifact version.

### Commands

```bash
git status --short
git branch --show-current
git log -1 --oneline
git show --stat --oneline HEAD
npm ci
npm test
npm run build
```

### Configuration Example

```yaml
name: Production Build Validation

on:
  pull_request:
    branches:
      - main

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build
```

### Common Issues and Solutions

**Build passes locally but fails in CI.**

Compare runtime versions, environment variables, dependency lock files and operating-system assumptions. Reproduce the CI environment before changing production configuration.

**Unexpected code is included in the release.**

Compare the release commit with the approved pull request and inspect the Git diff. Build from a clean, known commit rather than an uncommitted working directory.

## 3. Artifact, Docker Image and Container Registry Validation

The artifact deployed to production must be the same artifact that passed validation. Rebuilding separately during deployment can introduce differences between tested and released software.

### Practical Steps

1. Identify the image repository and approved release tag.
2. Confirm the image was built from the intended commit.
3. Scan the image for known vulnerabilities according to policy.
4. Verify that the registry contains the expected image.
5. Confirm production nodes or deployment identities can pull it.
6. Prefer immutable digests for critical production releases.
7. Check image retention policies so rollback versions remain available.

### Commands

```bash
docker build -t myapp:1.4.2 .
docker image inspect myapp:1.4.2
docker tag myapp:1.4.2 registry.example.com/myapp:1.4.2
docker push registry.example.com/myapp:1.4.2
docker pull registry.example.com/myapp:1.4.2
docker image ls
```

### Configuration Example

```yaml
services:
  application:
    image: registry.example.com/myapp:1.4.2
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      APP_ENV: production
```

### Common Issues and Solutions

**Image pull fails in production.**

Check registry availability, image name, tag, network access and registry credentials. For Kubernetes, inspect Pod events and image pull secrets.

**The image tag points to different content than expected.**

Use immutable tags and record the digest. Verify the digest before deployment and avoid overwriting release tags.

## 4. Infrastructure and Environment Readiness

Application deployment depends on infrastructure resources being available. Engineers should verify compute capacity, networking, storage, DNS, load balancers and the target environment before changing application workloads.

### Practical Steps

1. Confirm the correct AWS account, cluster, region and environment.
2. Verify Kubernetes nodes are Ready and have sufficient capacity.
3. Check CPU, memory, disk and storage availability.
4. Verify load balancer, ingress and DNS configuration.
5. Confirm required firewall rules and security groups.
6. Check database, cache and message broker connectivity.
7. Review pending infrastructure changes.
8. Confirm infrastructure changes have been approved.

### Commands

```bash
kubectl config current-context
kubectl get nodes -o wide
kubectl top nodes
kubectl get pods -A
kubectl get services -A
kubectl get ingress -A
terraform plan
```

### Configuration Example

```hcl
resource "aws_instance" "application" {
  ami           = var.ami_id
  instance_type = var.instance_type
  subnet_id     = var.subnet_id

  tags = {
    Name        = "production-application"
    Environment = "production"
  }
}
```

### Common Issues and Solutions

**Deployment cannot schedule new Pods.**

Inspect node capacity, Pod requests, resource quotas, affinity rules and taints. Scale the cluster or adjust approved resource requirements.

**Application cannot connect to a dependency.**

Check DNS resolution, routes, security groups, network policies, service endpoints and dependency health from the actual application environment.

## 5. Configuration, Secrets and Access Validation

Production applications require environment-specific configuration and controlled access to credentials. Secrets should not be committed to source control or printed in deployment logs.

### Practical Steps

1. Confirm the target environment configuration.
2. Verify required environment variables and configuration maps.
3. Confirm secret names and versions exist.
4. Check IAM roles, service accounts and least-privilege permissions.
5. Verify certificates and credential expiration dates.
6. Confirm deployment automation has only the permissions it needs.
7. Ensure logs do not expose passwords, tokens or private keys.
8. Confirm that configuration changes have been reviewed.

### Commands

```bash
kubectl get configmaps -n production
kubectl get secrets -n production
kubectl describe serviceaccount app-service-account -n production
kubectl auth can-i get pods -n production
aws sts get-caller-identity
```

### Configuration Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
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
      serviceAccountName: app-service-account
      containers:
        - name: application
          image: registry.example.com/myapp:1.4.2
          env:
            - name: DATABASE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: application-secrets
                  key: database-password
```

### Common Issues and Solutions

**Application starts but cannot authenticate to the database.**

Verify secret references, credential rotation, database grants and network connectivity. Do not solve the issue by exposing credentials in source code.

**Deployment automation receives AccessDenied errors.**

Identify the exact denied API action and resource. Grant only the required permission through the approved IAM process.

## 6. Database Migration and Data Readiness

Database changes are one of the most important deployment risks. Application rollback does not automatically reverse schema changes or restore deleted data. Plan database changes so the old and new application versions can coexist when possible.

### Practical Steps

1. Review the migration scripts and expected data impact.
2. Confirm a recent, usable backup exists.
3. Verify the migration has been tested against representative data.
4. Check whether the migration locks large tables or causes downtime.
5. Prefer backward-compatible expand-and-contract changes.
6. Confirm migration ownership and execution order.
7. Monitor migration duration, locks and database health.
8. Define a recovery strategy before applying destructive changes.

### Example Migration Sequence

```sql
-- Expand: add a new nullable column
ALTER TABLE customers
ADD COLUMN display_name VARCHAR(200);

-- Backfill: populate data in controlled batches
UPDATE customers
SET display_name = name
WHERE display_name IS NULL;

-- Later release: application uses display_name.
-- Contract: remove the old column only after compatibility is confirmed.
```

### Commands

```bash
# Example: inspect migration status using the application's migration tool
npm run migrate:status

# Example: run migrations only through the approved release process
npm run migrate:deploy
```

### Common Issues and Solutions

**Migration takes longer than expected.**

Inspect database locks, query plans, table size and transaction duration. Stop only according to the approved migration recovery procedure.

**New application works but old application cannot run.**

The schema change may not be backward-compatible. Keep old and new application versions compatible during the rollout, or use a coordinated recovery plan.

## 7. Security, Compliance and Change Approval

Production releases should meet the organization's security and change-management requirements. The goal is to identify risky changes before they affect customers.

### Practical Steps

1. Confirm the change request and release owner.
2. Review security scan results and dependency alerts.
3. Confirm container and infrastructure scans have passed.
4. Verify required approvals and segregation of duties.
5. Check firewall, IAM and network-policy changes.
6. Review audit requirements and deployment records.
7. Confirm sensitive data is not exposed in logs.
8. Record any approved exception and its expiry.

### Commands

```bash
git diff --check
docker image inspect myapp:1.4.2
kubectl auth can-i create deployments -n production
terraform plan
```

### Configuration Example

```yaml
environment:
  name: production
  protection_rules:
    required_reviewers: true
```

The exact syntax for protected environments depends on the CI platform. Configure approvals using the platform's supported environment protection settings.

### Common Issues and Solutions

**A security scan reports a critical vulnerability.**

Identify whether the finding affects the deployed component, upgrade or mitigate it, and follow the organization's exception process when immediate remediation is not possible.

**A release has no required approval.**

Keep production deployment blocked until the correct authorized reviewer approves the release.

## 8. Deployment Strategy and Execution

Choose a deployment strategy based on application architecture, availability requirements and recovery capabilities. A rolling update replaces instances gradually, while blue-green and canary approaches provide additional traffic-control options.

### Practical Steps

1. Confirm the release strategy and expected impact.
2. Notify stakeholders and confirm the deployment window.
3. Verify the current healthy release.
4. Apply only approved changes.
5. Deploy the new version using the selected strategy.
6. Monitor rollout progress and application health.
7. Stop promotion if health checks fail.
8. Record the deployed version and execution result.

### Kubernetes Commands

```bash
kubectl apply -f k8s/
kubectl rollout status deployment/myapp -n production
kubectl get deployment myapp -n production
kubectl get pods -l app=myapp -n production
kubectl describe deployment myapp -n production
```

### Configuration Example

```yaml
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

`maxSurge` controls how many additional Pods can be created during the update. `maxUnavailable: 0` prevents the Deployment controller from intentionally reducing the available replica count during the rollout, provided the cluster has sufficient capacity and readiness checks work correctly.

### Common Issues and Solutions

**Rollout remains stuck.**

Inspect Deployment conditions, Pod events, image availability, readiness probes, resource capacity and scheduling constraints.

**New Pods become Ready but users experience errors.**

A readiness probe only confirms the configured readiness condition. Run application-level smoke tests and check dependencies, ingress routing and real user requests.

## 9. Health Checks, Smoke Tests and Functional Verification

A successful deployment command does not prove that the application works. Verification must cover infrastructure health, application health and important user-facing functionality.

### Practical Steps

1. Confirm all expected replicas are Ready.
2. Verify the Service has healthy endpoints.
3. Test the application health endpoint.
4. Test important user journeys.
5. Verify database reads and writes using safe test operations.
6. Check external integrations and background workers.
7. Review error logs and response times.
8. Compare the new release with the previous baseline.

### Commands

```bash
kubectl get pods -l app=myapp -n production
kubectl get endpoints myapp -n production
kubectl rollout status deployment/myapp -n production
curl -fsS https://YOUR-APPLICATION-HOST/health
curl -I https://YOUR-APPLICATION-HOST/
```

### Example Smoke-Test Checklist

```text
[ ] Homepage responds successfully
[ ] Login flow works
[ ] Main API responds correctly
[ ] Database operation succeeds
[ ] Background worker is healthy
[ ] External integration is reachable
[ ] No unexpected 5xx errors
[ ] Expected replicas are Ready
```

### Common Issues and Solutions

**Health endpoint returns success but the application is unusable.**

Use meaningful readiness checks and functional smoke tests. Verify critical dependencies and important user journeys separately.

**Service has no endpoints.**

Check Pod labels, Service selectors, namespace, readiness status and target ports.

## 10. Monitoring, Logs and Alert Verification

Monitor the release after deployment to detect problems that may not appear during initial smoke tests. Compare operational signals with the pre-release baseline.

### Practical Steps

1. Observe CPU and memory usage.
2. Monitor request rate, error rate and latency.
3. Review application and infrastructure logs.
4. Check database connection pools and query performance.
5. Verify queue depth and background-job completion.
6. Confirm alert rules and notification channels work.
7. Watch for restart loops and scaling events.
8. Continue observation for the agreed release window.

### Commands

```bash
kubectl top pods -n production
kubectl get pods -n production
kubectl logs deployment/myapp -n production --since=15m
kubectl get events -n production --sort-by=.lastTimestamp
```

### Example Prometheus Alert

```yaml
groups:
  - name: application-alerts
    rules:
      - alert: HighApplicationErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          clamp_min(sum(rate(http_requests_total[5m])), 1)
          > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Application error rate is above 5 percent
```

Metric names and labels must match the application's actual instrumentation.

### Common Issues and Solutions

**Metrics are missing after deployment.**

Check instrumentation, scrape targets, service discovery, network access and monitoring configuration.

**Alerts do not fire.**

Validate the expression using actual metrics, inspect rule evaluation and test the notification receiver.

## 11. Post-Deployment Documentation and Handover

The deployment is complete only when the team has verified the release and recorded what changed. Good release records help the next engineer troubleshoot incidents without reconstructing the deployment from memory.

### Practical Steps

1. Record the release ID and deployed commit.
2. Record the container image tag and digest.
3. Record deployment start and completion times.
4. Save test and health-check evidence.
5. Document known issues and accepted risks.
6. Confirm dashboards and alerts are operational.
7. Notify application owners and support teams.
8. Assign follow-up actions with owners and due dates.

### Example Release Record

```text
Application: myapp
Environment: production
Release: 1.4.2
Git commit: <commit-sha>
Image digest: <image-digest>
Deployment start: <timestamp>
Deployment finish: <timestamp>
Smoke tests: PASS / FAIL
Monitoring: HEALTHY / INVESTIGATE
Rollback required: YES / NO
Release owner: <engineer>
Outstanding issues: <details>
```

### Common Issues and Solutions

**The deployment succeeded but no one knows what version is live.**

Record the commit, artifact digest and release identifier as part of the deployment process.

**Support teams are unaware of a production change.**

Send a release completion notice with the impact, version, verification result and escalation contact.

## 12. Production Failure, Stop Conditions and Recovery Decision

A deployment must have clear stop conditions. When critical checks fail, the team should avoid continuing the rollout simply because some stages succeeded.

### Practical Steps

1. Identify the failed health check or release signal.
2. Determine whether customer impact is occurring.
3. Pause or stop further rollout using the platform's supported controls.
4. Preserve logs, events and deployment evidence.
5. Decide whether to fix forward, roll back or apply a temporary mitigation.
6. Confirm database and configuration compatibility before rollback.
7. Verify recovery using smoke tests and monitoring.
8. Communicate the incident and document follow-up work.

### Commands

```bash
kubectl rollout pause deployment/myapp -n production
kubectl rollout status deployment/myapp -n production
kubectl get events -n production --sort-by=.lastTimestamp
kubectl logs deployment/myapp -n production --since=30m
```

### Production Decision Record

```text
Release status: PAUSED
Failure detected: <symptom>
Customer impact: <confirmed impact>
Last known-good version: <version>
Current version: <version>
Database compatibility: CONFIRMED / UNKNOWN
Decision: FIX FORWARD / ROLLBACK / MITIGATE
Decision owner: <name or role>
Verification required: Health checks, smoke tests and monitoring
```

### Common Issues and Solutions

**The team continues deployment despite increasing errors.**

Define measurable stop conditions and give the release owner authority to halt promotion.

**Rollback is requested before checking database compatibility.**

Confirm schema and data compatibility first. If rollback is unsafe, use an approved fix-forward or recovery plan.

## 13. Complete Production Deployment Checklist

Use this checklist during a real release. Mark each item only after checking the relevant evidence.

### Before Deployment

```text
[ ] Correct repository, branch and commit confirmed
[ ] Code review completed
[ ] Unit and integration tests passed
[ ] Build completed successfully
[ ] Security checks reviewed
[ ] Artifact version and digest recorded
[ ] Infrastructure capacity verified
[ ] Environment configuration verified
[ ] Secrets and permissions verified
[ ] Database migration reviewed
[ ] Backup and recovery plan confirmed
[ ] Change approval completed
[ ] Rollback artifact available
```

### During Deployment

```text
[ ] Target environment confirmed
[ ] Deployment window announced
[ ] Approved artifact deployed
[ ] Rollout progress monitored
[ ] Expected replicas becoming Ready
[ ] Service and ingress endpoints verified
[ ] Smoke tests completed
[ ] Logs and metrics reviewed
[ ] Stop conditions not triggered
```

### After Deployment

```text
[ ] Critical user journeys verified
[ ] Error rate and latency acceptable
[ ] Background workers healthy
[ ] Integrations functioning
[ ] Alerts and dashboards operational
[ ] Release version recorded
[ ] Evidence saved
[ ] Support team notified
[ ] Follow-up issues assigned
[ ] Release formally closed
```

## 14. Real-Time Example: Deploying an Application to Amazon EKS

Consider a three-tier application running on Amazon EKS. The frontend receives customer requests, the backend processes business logic and Amazon RDS stores application data. The team is releasing a new backend container image.

### Deployment Flow

1. Developer merges the approved pull request.
2. CI creates and scans the backend image.
3. Image is pushed to Amazon ECR.
4. Release owner verifies the ECR image digest.
5. Engineer checks the EKS cluster and production namespace.
6. Kubernetes Deployment is updated with the approved image.
7. Rolling update replaces the old Pods gradually.
8. Service routes traffic to Ready Pods.
9. Smoke tests verify the API and database connection.
10. Prometheus and Grafana are monitored for errors and latency.

### Commands

```bash
aws sts get-caller-identity
aws eks update-kubeconfig --region REGION --name CLUSTER_NAME

kubectl get nodes
kubectl get pods -n production

kubectl set image deployment/backend \
  backend=ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/backend:1.4.2 \
  -n production

kubectl rollout status deployment/backend -n production
kubectl get pods -n production -l app=backend
kubectl logs deployment/backend -n production --since=10m
```

Replace the placeholders with the actual AWS account, region, cluster and image values. The deployment identity must have the required EKS and Kubernetes permissions.

### Success Criteria

- New Pods are Ready.
- The Service has healthy endpoints.
- API smoke tests pass.
- Database connectivity is successful.
- Error rate and latency remain within agreed thresholds.
- No unexpected restart loops or critical alerts occur.

## 15. Deployment Checklist Best Practices

A mature deployment process is repeatable, observable and reversible. The checklist should be maintained as the application and infrastructure evolve.

### Recommended Practices

1. Automate repeatable validation instead of relying on memory.
2. Deploy the exact artifact that passed testing.
3. Keep production credentials outside source control.
4. Prefer backward-compatible database migrations.
5. Use readiness and liveness probes appropriately.
6. Monitor the release against a known baseline.
7. Define explicit approval and stop conditions.
8. Keep known-good artifacts available for recovery.
9. Record evidence for every production release.
10. Review failed deployments and improve the checklist.

### Final Operational Principle

A production deployment is successful only when the intended version is running, critical application functions work, dependencies are healthy, operational metrics remain acceptable and the release has been properly recorded.