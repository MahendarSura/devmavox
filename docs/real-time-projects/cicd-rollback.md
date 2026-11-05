# Production CI/CD Pipeline and Rollback Guide

A production CI/CD system automates the movement of application changes from source control to a live environment. Continuous Integration validates every change, while Continuous Delivery or Deployment prepares and releases tested artifacts. A safe release process also needs controlled promotion, monitoring, rollback and recovery procedures.

## 1. End-to-End CI/CD Architecture

A typical production pipeline contains source control, validation, build, security scanning, artifact publishing, deployment and post-deployment verification stages. Each stage should produce evidence that the next stage can trust.

### Real-Time Pipeline Flow

1. Developer creates a feature branch and commits application changes.
2. A pull request triggers CI validation.
3. The pipeline checks out the source code.
4. Dependencies are installed using a lock file.
5. Unit tests, integration tests and code-quality checks run.
6. The application is built and packaged.
7. Container image and dependency security scans execute.
8. A versioned artifact is published to a registry.
9. The release is deployed to a test environment.
10. Smoke tests and approval gates validate the release.
11. The approved artifact is promoted to production.
12. Monitoring verifies the release and triggers recovery if required.

### Architecture Example

```text
Developer
   |
   v
Git Repository
   |
   v
CI Pipeline
   |
   +--> Checkout
   +--> Install Dependencies
   +--> Unit / Integration Tests
   +--> Build
   +--> Security / Quality Checks
   |
   v
Versioned Artifact
   |
   v
Container Registry
   |
   v
Test / Staging Deployment
   |
   v
Smoke Tests and Approval
   |
   v
Production Deployment
   |
   v
Monitoring and Release Verification
```

### Common Issues and Solutions

**Pipeline stages run in an unpredictable order.**

Define explicit job dependencies and stage boundaries. Ensure deployment cannot begin until required validation and artifact publishing have succeeded.

**A pipeline reports success but the release is broken.**

Add deployment-level smoke tests and application health verification. Build success alone does not establish production readiness.

## 2. Source Control and Pull Request Validation

Source control provides the history and review process for application changes. A production pipeline should build from a known commit rather than an engineer's local working directory.

### Practical Steps

1. Create a feature branch from the approved base branch.
2. Make a focused application change.
3. Run local tests and formatting checks.
4. Commit changes with a meaningful message.
5. Push the branch to the remote repository.
6. Create a pull request.
7. Review the diff and required approvals.
8. Merge only after required CI checks pass.

### Commands

```bash
git checkout main
git pull origin main
git checkout -b feature/payment-api
git status
git add .
git commit -m "Add payment API validation"
git push origin feature/payment-api
```

### Configuration Example

```yaml
name: Pull Request Validation

on:
  pull_request:
    branches:
      - main

permissions:
  contents: read

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install
        run: npm ci

      - name: Test
        run: npm test

      - name: Build
        run: npm run build
```

### Common Issues and Solutions

**A developer pushes directly to the production branch.**

Protect the branch with pull-request requirements, status checks and restricted write permissions.

**The pipeline builds an unexpected commit.**

Record the checked-out commit SHA in the pipeline output and associate it with the artifact metadata.

## 3. Continuous Integration: Build and Automated Testing

Continuous Integration detects errors early by building and testing code whenever changes are proposed or merged. Test stages should fail the pipeline when required validation fails.

### Practical Steps

1. Check out the exact commit.
2. Install dependencies deterministically.
3. Run linting and formatting validation.
4. Execute unit tests.
5. Execute integration tests.
6. Build the application.
7. Publish test reports and build evidence.
8. Stop the pipeline if mandatory checks fail.

### Commands

```bash
npm ci
npm run lint
npm test
npm run build
```

For a Maven application:

```bash
mvn clean test
mvn package
```

### Jenkins Pipeline Example

```groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'dist/**',
                             allowEmptyArchive: true
        }
    }
}
```

### Common Issues and Solutions

**Tests pass locally but fail in the pipeline.**

Compare runtime versions, environment variables, dependency versions and test data. Use the same supported runtime configuration in local and CI environments.

**A test failure does not stop deployment.**

Make the test stage mandatory and ensure deployment jobs depend on successful validation.

## 4. Build, Package and Artifact Versioning

An artifact is the deployable output of the build process. Examples include a JAR file, ZIP package or container image. Versioning makes it possible to identify exactly what was tested and deployed.

### Practical Steps

1. Build from a known source commit.
2. Assign a release version or commit-based tag.
3. Include build metadata where appropriate.
4. Generate checksums or record container image digests.
5. Publish artifacts to the approved repository.
6. Verify the published artifact can be retrieved.
7. Retain release artifacts according to policy.
8. Promote the same artifact between environments.

### Commands

```bash
mvn clean package
docker build -t myapp:1.4.2 .
docker image inspect myapp:1.4.2
docker tag myapp:1.4.2 registry.example.com/myapp:1.4.2
docker push registry.example.com/myapp:1.4.2
```

### Configuration Example

```text
Application: myapp
Release: 1.4.2
Git commit: <commit-sha>
Build number: <pipeline-build-number>
Artifact: registry.example.com/myapp:1.4.2
Image digest: <sha256-digest>
Build result: SUCCESS
```

### Common Issues and Solutions

**The same tag is reused for different builds.**

Use unique release tags and immutable registry policies where supported. Record the digest so the exact artifact can be identified.

**The production environment cannot retrieve an artifact.**

Check registry permissions, repository retention, network access and the artifact's existence before deployment.

## 5. Container Image Security and Registry Publishing

Container images contain the application and its runtime dependencies. They should be built consistently, scanned and published to an approved registry before deployment.

### Practical Steps

1. Use a trusted and maintained base image.
2. Keep the Docker build context minimal.
3. Avoid copying secrets into image layers.
4. Use a non-root runtime user where practical.
5. Scan the image according to security policy.
6. Tag the image with the release version.
7. Push it to the approved registry.
8. Record the digest and verify registry access.

### Dockerfile Example

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD ["npm", "start"]
```

The application must be compatible with the selected runtime user and base image. Build and test this Dockerfile before using it for a production release.

### Commands

```bash
docker build -t myapp:1.4.2 .
docker run --rm myapp:1.4.2
docker tag myapp:1.4.2 REGISTRY/myapp:1.4.2
docker push REGISTRY/myapp:1.4.2
docker pull REGISTRY/myapp:1.4.2
```

### Common Issues and Solutions

**Image scanning reports vulnerable packages.**

Identify the affected package and base image. Upgrade to a supported version, rebuild and rescan before release.

**Image push fails with authentication errors.**

Verify the registry login method, token expiration, repository permissions and target registry URL. Never print access tokens in CI logs.

## 6. Continuous Delivery and Environment Promotion

Continuous Delivery keeps a tested release ready for deployment. Environment promotion moves the same artifact from development to staging and then production, with additional checks and approvals at each stage.

### Practical Steps

1. Deploy the build to a development environment.
2. Run automated integration tests.
3. Promote the same artifact to staging.
4. Run acceptance and smoke tests.
5. Review release evidence and outstanding risks.
6. Obtain production approval if required.
7. Promote the verified artifact to production.
8. Record the artifact digest and environment results.

### Environment Flow

```text
Build
  |
  v
Development
  |
  v
Integration Tests
  |
  v
Staging
  |
  v
Acceptance Tests
  |
  v
Production Approval
  |
  v
Production
```

### Configuration Example

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t myapp:${{ github.sha }} .

  staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: echo "Deploy the verified artifact to staging"

  production:
    needs: staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo "Deploy the approved artifact to production"
```

This example shows the job dependency and environment structure. Replace the placeholder deployment commands with your actual deployment process.

### Common Issues and Solutions

**Staging and production run different image versions.**

Promote the exact same immutable artifact. Do not rebuild the application separately for each environment.

**Production deploys without approval.**

Configure production environment protection and required reviewers in the CI platform.

## 7. Production Deployment with Kubernetes

A Kubernetes deployment stage updates the application workload in a cluster. The pipeline must target the correct cluster and namespace and verify the rollout after applying the new image.

### Practical Steps

1. Authenticate using the approved deployment identity.
2. Confirm the Kubernetes context and namespace.
3. Verify cluster and node health.
4. Update the Deployment with the approved image.
5. Wait for the rollout to complete.
6. Verify the expected Pod count and readiness.
7. Check Service endpoints and application health.
8. Stop release promotion if verification fails.

### Commands

```bash
kubectl config current-context
kubectl get nodes
kubectl get deployments -n production

kubectl set image deployment/myapp \
  myapp=registry.example.com/myapp:1.4.2 \
  -n production

kubectl rollout status deployment/myapp -n production
kubectl get pods -n production -l app=myapp
kubectl get endpoints myapp -n production
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
      containers:
        - name: myapp
          image: registry.example.com/myapp:1.4.2
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
```

### Common Issues and Solutions

**Pipeline cannot connect to the cluster.**

Check kubeconfig, authentication, network access, cluster endpoint availability and deployment identity permissions.

**Deployment succeeds but Pods are not Ready.**

Inspect Pod events, container logs, readiness probes, resource limits, secrets and dependency connectivity.

## 8. Rolling Update, Blue-Green and Canary Deployment

Deployment strategies control how application traffic moves from an old version to a new version. The right strategy depends on availability, infrastructure capacity, application architecture and the ability to observe traffic safely.

### Rolling Update

A rolling update gradually replaces old Pods with new Pods. It is commonly used for Kubernetes Deployments.

```yaml
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

### Blue-Green Deployment

1. Keep the current production version running as Blue.
2. Deploy the new version separately as Green.
3. Validate Green using tests and health checks.
4. Switch production traffic to Green.
5. Monitor the new version.
6. Keep Blue available temporarily for recovery.

### Canary Deployment

1. Deploy the new version to a small subset of instances.
2. Route a controlled percentage of traffic to it.
3. Compare error rate, latency and business metrics.
4. Increase traffic only when results remain healthy.
5. Stop promotion and restore traffic if thresholds fail.

### Common Issues and Solutions

**Rolling update causes temporary unavailability.**

Review readiness probes, replica count, capacity and update strategy. Confirm the application can run old and new versions concurrently.

**Canary receives traffic but metrics are not separated by version.**

Add release labels or version dimensions to telemetry. Compare the canary and stable versions independently.

## 9. CI/CD Security, Credentials and Permissions

Pipeline credentials can access source code, registries, cloud infrastructure and production clusters. Protecting them is essential because a compromised pipeline can become a production security incident.

### Practical Steps

1. Use the CI platform's secret store.
2. Prefer short-lived credentials or workload identity where supported.
3. Apply least-privilege permissions.
4. Restrict who can edit production pipelines.
5. Protect release branches and environments.
6. Avoid printing tokens or secret values.
7. Rotate credentials according to policy.
8. Review pipeline and deployment audit logs.

### Configuration Example

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4

      - name: Deploy
        env:
          DEPLOY_ENVIRONMENT: production
        run: |
          echo "Run approved deployment steps here"
```

The `id-token` permission is relevant when using supported OIDC-based authentication. Configure the cloud trust relationship and role permissions separately.

### Common Issues and Solutions

**Credentials are exposed in pipeline output.**

Stop the affected process, rotate the exposed credential and review access logs. Remove secret printing and use masked secret handling.

**A deployment identity has excessive permissions.**

Review the actual API actions and resources required. Replace broad permissions with a narrowly scoped role.

## 10. Deployment Verification and Automated Quality Gates

A release should not be promoted simply because the deployment command returned successfully. Automated quality gates check whether the application is healthy enough to receive production traffic.

### Practical Steps

1. Wait for the rollout to finish.
2. Verify all required replicas are Ready.
3. Check the health endpoint.
4. Run API and user-journey smoke tests.
5. Verify database and external dependency connectivity.
6. Check error rate and latency.
7. Compare results against release thresholds.
8. Block further promotion if any critical gate fails.

### Commands

```bash
kubectl rollout status deployment/myapp -n production
kubectl get pods -n production -l app=myapp
kubectl logs deployment/myapp -n production --since=10m
curl -fsS https://YOUR-APPLICATION-HOST/health
```

### Example Quality Gate

```text
Deployment rollout: PASS
Expected replicas: 3
Ready replicas: 3
Health endpoint: PASS
Smoke tests: PASS
API error rate: Within threshold
Latency: Within threshold
Critical alerts: None
Promotion decision: APPROVED
```

### Common Issues and Solutions

**Pipeline promotes a release before smoke tests finish.**

Make smoke tests a required dependent job. Do not start production promotion until the test result is successful.

**Health checks pass but business operations fail.**

Add tests for critical application journeys and dependencies. A basic health endpoint should not be the only quality gate.

## 11. Kubernetes Rollback Using Deployment History

Kubernetes Deployments maintain rollout history for changes to the Pod template. Engineers can inspect previous revisions and undo a failed rollout when the previous version is still valid.

### Practical Steps

1. Identify the failed Deployment and namespace.
2. Inspect current rollout status.
3. Review revision history.
4. Inspect the previous revision.
5. Confirm the previous image and configuration are valid.
6. Execute rollback.
7. Wait for the rollback rollout to complete.
8. Verify Pods, endpoints, smoke tests and metrics.

### Commands

```bash
kubectl rollout status deployment/myapp -n production

kubectl rollout history deployment/myapp -n production

kubectl rollout history deployment/myapp \
  --revision=2 -n production

kubectl rollout undo deployment/myapp -n production

kubectl rollout status deployment/myapp -n production

kubectl get pods -n production -l app=myapp
```

### Configuration Example

```yaml
spec:
  revisionHistoryLimit: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

`revisionHistoryLimit` controls how many old ReplicaSets are retained by the Deployment. It does not replace external artifact retention or backup policies.

### Common Issues and Solutions

**Previous revision is not available.**

Inspect retained ReplicaSets and release records. Redeploy a verified previous image and configuration if necessary.

**Rollback command completes but the application is still unhealthy.**

Check database migrations, external dependencies, configuration changes, secrets and traffic routing. Deployment rollback does not reverse every external change.

## 12. Application Rollback and Known-Good Artifact Recovery

Rollback means restoring a previously working application release. The recovery target should be known, available and compatible with current infrastructure and data.

### Practical Steps

1. Detect a release-related failure.
2. Confirm the affected application and environment.
3. Identify the last known-good release.
4. Verify its artifact still exists.
5. Confirm configuration and database compatibility.
6. Stop further promotion of the failed release.
7. Redeploy the known-good artifact.
8. Verify application functionality and operational signals.
9. Preserve evidence for the incident review.

### Docker Example

```bash
docker pull registry.example.com/myapp:1.4.1

docker stop myapp

docker run -d \
  --name myapp \
  -p 8080:8080 \
  registry.example.com/myapp:1.4.1
```

This is a simplified single-container example. Production platforms should use their managed deployment mechanism, traffic routing and service supervision rather than manually replacing containers without a recovery plan.

### Common Issues and Solutions

**The old image has been deleted.**

Restore it from the approved artifact repository or rebuild from the verified source commit if the process allows it. Improve retention so rollback artifacts remain available.

**The old application cannot use the current database schema.**

Use backward-compatible migrations and a coordinated data recovery strategy. Do not assume application rollback reverses database changes.

## 13. Database Migration Recovery and Compatibility

Database recovery requires special care because data changes may not be safely reversible. A deployment pipeline should separate application rollback from database recovery.

### Expand-and-Contract Strategy

1. Expand the schema with backward-compatible changes.
2. Deploy application code that supports both old and new structures.
3. Backfill existing records in controlled batches.
4. Verify data consistency.
5. Move all application instances to the new structure.
6. Remove obsolete fields only in a later release.

### Example

```sql
-- Expand
ALTER TABLE orders
ADD COLUMN status_code VARCHAR(30);

-- Backfill in a controlled migration process
UPDATE orders
SET status_code = status
WHERE status_code IS NULL;

-- Contract only after all old application versions
-- and old field dependencies have been removed.
```

### Recovery Checklist

```text
[ ] Migration version identified
[ ] Backup availability verified
[ ] Data impact understood
[ ] Old and new application compatibility checked
[ ] Migration logs preserved
[ ] Recovery owner assigned
[ ] Data restoration procedure approved
[ ] Post-recovery consistency checks completed
```

### Common Issues and Solutions

**Migration partially completes before failure.**

Inspect the migration tool's transaction behavior and migration history. Determine which statements committed before retrying or recovering.

**Restoring a backup would lose recent customer transactions.**

Assess recovery point objectives and data-loss impact. Involve the database owner and incident lead before restoring production data.

## 14. Automated Rollback and Deployment Failure Controls

Automated rollback can reduce recovery time, but it should use reliable signals and safe decision rules. A single temporary error should not necessarily trigger a destructive recovery action.

### Practical Steps

1. Define measurable rollback thresholds.
2. Identify the metrics and health checks used for decisions.
3. Allow a suitable observation period.
4. Stop further promotion when a critical gate fails.
5. Trigger the approved recovery mechanism.
6. Verify that the previous version is healthy.
7. Notify the release owner and incident channel.
8. Preserve the failed release evidence.

### Example Decision Policy

```text
IF rollout fails:
    Stop further promotion

IF critical health check fails:
    Evaluate customer impact

IF sustained error rate exceeds approved threshold:
    Pause or roll back according to release policy

AFTER recovery:
    Verify health, traffic and key user journeys

FINALLY:
    Notify owners and record incident evidence
```

### Common Issues and Solutions

**Automatic rollback repeatedly switches between versions.**

Use sustained thresholds, minimum observation periods and a clear release state. Prevent repeated automated actions without human review when the system is unstable.

**Rollback happens because of a temporary dependency issue.**

Correlate application and dependency signals before deciding. Use the incident policy to distinguish application regression from an external service outage.

## 15. Blue-Green and Canary Release Recovery

Blue-green and canary deployments allow teams to control traffic independently of application deployment. Recovery often involves switching traffic back to the stable version rather than rebuilding or manually replacing all instances.

### Blue-Green Recovery

1. Keep the previous Blue environment available.
2. Deploy and validate Green.
3. Shift traffic to Green.
4. Monitor application and business metrics.
5. If failure occurs, switch traffic back to Blue.
6. Confirm stable traffic and health.
7. Investigate Green without removing incident evidence.

### Canary Recovery

1. Keep most traffic on the stable version.
2. Send a small percentage to the canary.
3. Observe error rate, latency and business metrics.
4. If thresholds fail, stop canary promotion.
5. Route canary traffic back to stable.
6. Verify stable version health.
7. Correct the issue before another promotion.

### Common Issues and Solutions

**The previous environment is deleted immediately after switching traffic.**

Retain the stable environment for the agreed observation period and confirm recovery requirements before cleanup.

**Traffic returns to the stable version but user sessions still fail.**

Inspect session storage, caches, external state, DNS and load-balancer behavior. Traffic switching alone does not reverse every stateful change.

## 16. CI/CD Observability, Audit and Incident Response

CI/CD observability helps engineers understand what happened during a release and correlate pipeline activity with production behavior.

### Practical Steps

1. Record pipeline run ID and source commit.
2. Record build and artifact metadata.
3. Capture deployment start and completion timestamps.
4. Record cluster, namespace and release version.
5. Monitor error rate, latency and resource utilization.
6. Correlate application logs with the release identifier.
7. Notify the incident team when a release causes impact.
8. Save evidence and assign corrective actions.

### Example Release Metadata

```text
Pipeline: production-release
Pipeline run: <run-id>
Commit: <commit-sha>
Artifact: myapp:1.4.2
Digest: <sha256-digest>
Environment: production
Deployment: SUCCESS / FAILED
Verification: PASS / FAIL
Rollback: YES / NO
Incident reference: <incident-id>
```

### Common Issues and Solutions

**Engineers cannot identify which release introduced an error.**

Attach release version and commit metadata to logs, metrics and deployment events.

**Pipeline logs are unavailable during an incident.**

Retain pipeline logs and deployment evidence according to the organization's audit and retention policies.

## 17. Complete Production CI/CD Release Checklist

### Source and Build

```text
[ ] Correct source branch selected
[ ] Pull request reviewed
[ ] Required approvals completed
[ ] Commit SHA recorded
[ ] Dependencies installed consistently
[ ] Unit tests passed
[ ] Integration tests passed
[ ] Build completed
[ ] Quality checks passed
```

### Artifact and Security

```text
[ ] Artifact version recorded
[ ] Container image built
[ ] Image scan reviewed
[ ] Secrets excluded from image
[ ] Artifact published successfully
[ ] Image digest recorded
[ ] Registry access verified
[ ] Previous release artifact retained
```

### Deployment and Verification

```text
[ ] Correct environment selected
[ ] Deployment identity verified
[ ] Production approval completed
[ ] Approved artifact promoted
[ ] Rollout completed
[ ] Replicas Ready
[ ] Smoke tests passed
[ ] Service endpoints verified
[ ] Metrics and logs reviewed
[ ] No critical release alerts
```

### Rollback Readiness

```text
[ ] Last known-good version identified
[ ] Previous artifact available
[ ] Configuration compatibility checked
[ ] Database compatibility reviewed
[ ] Rollback procedure documented
[ ] Recovery owner identified
[ ] Post-rollback verification defined
```

## 18. Real-Time Example: Jenkins to Amazon EKS Deployment

Consider an application maintained in GitHub, built through Jenkins, packaged as a Docker image, published to Amazon ECR and deployed to Amazon EKS.

### Complete Release Flow

1. Developer pushes code to GitHub.
2. Jenkins detects the change through the configured webhook.
3. Jenkins checks out the exact commit.
4. Dependencies are installed and tests execute.
5. Jenkins builds the application.
6. Docker creates a versioned container image.
7. Security checks run against the image.
8. Jenkins authenticates to Amazon ECR and pushes the image.
9. The release pipeline deploys the image to EKS.
10. Kubernetes performs a rolling update.
11. Jenkins waits for rollout completion and executes smoke tests.
12. Prometheus and Grafana monitor application health.
13. If critical release thresholds fail, the release is stopped and the approved rollback procedure is executed.

### Jenkinsfile Example

```groovy
pipeline {
    agent any

    environment {
        IMAGE_NAME = "myapp"
        IMAGE_TAG = "${BUILD_NUMBER}"
        ECR_REGISTRY = "ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }

        stage('Build Image') {
            steps {
                sh '''
                    docker build \
                      -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Publish Image') {
            steps {
                sh '''
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} \
                      ${ECR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}

                    docker push \
                      ${ECR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    kubectl set image deployment/myapp \
                      myapp=${ECR_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \
                      -n production

                    kubectl rollout status deployment/myapp \
                      -n production --timeout=5m
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh 'curl -fsS https://YOUR-APPLICATION-HOST/health'
            }
        }
    }
}
```

This is an illustrative pipeline. Configure Jenkins credentials, ECR authentication, EKS access, agent Docker support, environment approvals and secret handling separately. Do not hardcode AWS credentials in the Jenkinsfile.

### Rollback Commands

```bash
kubectl rollout history deployment/myapp -n production

kubectl rollout undo deployment/myapp -n production

kubectl rollout status deployment/myapp -n production

kubectl get pods -n production -l app=myapp

kubectl logs deployment/myapp -n production --since=15m
```

### Success Criteria

- Jenkins pipeline completes required stages.
- The correct image is available in ECR.
- EKS rollout completes successfully.
- Expected Pods are Ready.
- Smoke tests pass.
- Application errors and latency remain acceptable.
- The release record includes the commit and image digest.

## 19. CI/CD Failure Troubleshooting Guide

A production pipeline can fail at source checkout, dependency installation, tests, build, image publishing, authentication, deployment or verification. Identify the failing stage before changing configuration.

### Common Failure Scenarios

**Git checkout fails.**

Check repository URL, branch name, credentials, network access and repository permissions.

**Dependency installation fails.**

Check package registry availability, lock files, runtime version and authentication for private packages.

**Docker build fails.**

Inspect the Dockerfile, build context, missing files, dependency installation and available disk space.

**Image push fails.**

Check registry authentication, repository permissions, image name and network connectivity.

**Kubernetes deployment fails.**

Inspect cluster access, namespace, RBAC, image pull permissions, resource capacity and Pod events.

**Smoke tests fail.**

Check application logs, readiness, ingress, DNS, dependency health and the test endpoint.

### Diagnostic Commands

```bash
# Git
git status
git log -1 --oneline

# Docker
docker image ls
docker image inspect myapp:1.4.2

# Kubernetes
kubectl get deployments -n production
kubectl get pods -n production
kubectl describe deployment myapp -n production
kubectl get events -n production --sort-by=.lastTimestamp
kubectl logs deployment/myapp -n production --since=20m

# Rollout
kubectl rollout status deployment/myapp -n production
kubectl rollout history deployment/myapp -n production
```

### Recovery Principle

Do not rerun a failed production pipeline blindly. Identify whether the failure is in the source, build, artifact, credentials, infrastructure, application or external dependency. Correct the actual cause, preserve evidence and use the approved release or rollback procedure.

## 20. CI/CD and Rollback Best Practices

A mature CI/CD pipeline should make releases repeatable, traceable and recoverable. Automation must enforce quality and security without hiding failures.

### Recommended Practices

1. Build once and promote the same artifact across environments.
2. Use immutable artifact versions and record image digests.
3. Protect source branches and production environments.
4. Make required tests and security checks mandatory.
5. Use short-lived credentials and least-privilege permissions.
6. Keep production deployment approvals where required.
7. Use health checks and smoke tests after deployment.
8. Monitor releases against agreed operational thresholds.
9. Retain known-good artifacts and deployment history.
10. Use backward-compatible database migrations.
11. Test rollback procedures regularly.
12. Record release metadata and incident evidence.

### Final Operational Principle

A reliable CI/CD pipeline does not simply automate deployment. It ensures that the correct artifact is tested, secured, promoted, deployed and verified. A reliable rollback process ensures that when a release causes problems, engineers can restore service safely without creating additional data or infrastructure damage.