

# 🛡️🚀 PROJECT 07 — END-TO-END DEVSECOPS ON AWS EKS


<img width="663" height="462" alt="image" src="https://github.com/user-attachments/assets/0b1f2c8d-63b2-4474-a90d-974c175f342e" />
<img src="/images/real-time-projects/project7.png" alt="Project 7 Architecture" />


# 🛡️🚀 PROJECT 07 — END-TO-END DEVSECOPS ON AWS EKS
## Code Commit nunchi Secure Container Deployment varaku

**Beginner-friendly • Real-world workflow • Architecture • Security • Troubleshooting • Interview-ready**

![AWS](https://img.shields.io/badge/AWS-EKS%20%7C%20ECR-FF9900?logo=amazonaws&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![Security](https://img.shields.io/badge/DevSecOps-Security%20in%20CI%2FCD-6A5ACD)

> **Simple ga cheppalante:** Developer code push chestadu → automated tests run avutayi → source/dependency/container security checks run avutayi → Docker image build avutundi → image scan chestaru → AWS ki OIDC tho secure authentication avutundi → image ECR ki publish avutundi → Kubernetes manifests apply chesi EKS lo deploy chestaru → rollout and health verify chestaru.

</div>

---

## 📚 Table of Contents

1. [Project ante enti?](#-1-project-ante-enti)
2. [Real-time business example](#-2-real-time-business-example)
3. [Business problem vs solution](#-3-business-problem-vs-solution)
4. [DevSecOps basics](#-4-devsecops-ante-enti)
5. [Architecture diagrams](#-5-architecture-diagrams)
6. [Tools enduku vadali?](#-6-tools-enduku-vadali)
7. [Pipeline ela work avutundi?](#-7-devsecops-pipeline-ela-work-avutundi)
8. [Developer and DevOps responsibilities](#-8-developer--devops-engineer-em-chestaru)
9. [Repository structure](#-9-repository-structure)
10. [Prerequisites](#-10-prerequisites)
11. [Build a small Python API](#-11-small-python-api-example)
12. [Automated tests](#-12-automated-tests)
13. [Docker image](#-13-docker-image)
14. [Security scanning](#-14-security-scanning)
15. [AWS authentication with OIDC](#-15-secure-aws-authentication-with-oidc)
16. [Publish image to Amazon ECR](#-16-publish-image-to-amazon-ecr)
17. [Deploy to AWS EKS](#-17-deploy-to-aws-eks)
18. [Health checks and rollback](#-18-health-checks-and-rollback)
19. [Security practices](#-19-security-practices)
20. [Real-time troubleshooting](#-20-real-time-troubleshooting-guide)
21. [Screenshots and evidence](#-21-screenshots-and-evidence)
22. [Cost safety and cleanup](#-22-cost-safety-and-cleanup)
23. [Interview explanation](#-23-interview-lo-project-ela-explain-cheyyali)
24. [Definition of done](#-24-project-complete-ayyindi-ani-ela-telustundi)
25. [Official documentation](#-25-official-documentation)

---

# 🧠 1. Project ante enti?

Ee project lo oka small Python API ni secure DevSecOps pipeline tho build chestam. GitHub Actions automated tests run chestundi, source/dependency checks chestundi, Docker image build chestundi, image vulnerabilities scan chestundi, tarvata AWS ECR ki publish chesi Kubernetes cluster — AWS EKS — lo deploy cheyyadaniki workflow design chestam.

**DevSecOps** ante development, security, operations ni software delivery process lo kalapadam. Security ni release mundu final manual step ga kakunda, code nunchi deployment varaku repeatable checks ga include cheyyadam.

## 🎯 Objectives

- Code commit/pull request meeda automated tests run cheyyadam.
- Python dependencies and source code ni check cheyyadam.
- Docker image build cheyyadam and non-root user tho run cheyyadam.
- Container image vulnerability scan add cheyyadam.
- AWS credentials ni repository lo long-lived access keys ga store cheyyakunda OIDC use cheyyadam.
- Amazon ECR lo immutable/versioned image identify cheyyadam.
- EKS lo Kubernetes Deployment and Service apply cheyyadam.
- Rollout, health, logs, and failure recovery verify cheyyadam.
- Secrets, IAM permissions, network exposure, and cleanup ni document cheyyadam.

**Important:** Ee README implementation blueprint and example files provide chestundi. Actual AWS resources create ayyayani, pipeline pass ayyindani, or EKS deployment success ayyindani claim cheyyadu. Mee environment lo run chesi evidence capture cheyyali.

# 🏢 2. Real-time business example

### 📦 Company scenario — ShopEasy

ShopEasy online shopping application maintain chestundi. Developers frequently code changes chestaru. Company ki fast releases kavali, kani insecure dependencies, leaked secrets, vulnerable images, and broken deployments production ki vellakudadhu.

### 🔴 10:00 AM — Developer change push chestadu
- Developer API code update chestadu.
- Pull request create chestadu.
- GitHub Actions pipeline automatically start avutundi.

### 🟠 10:02 AM — Quality and security gates run avutayi
- Automated tests fail ayithe pipeline stop avutundi.
- Dependency/source security checks findings report chestayi.
- Docker image build avutundi.
- Container scan policy prakaram high-risk findings unte release block cheyyachu.

### 🔵 10:05 AM — Secure publishing
- GitHub Actions AWS role ni OIDC federation dwara assume chestundi.
- Workflow ki required ECR/EKS permissions matrame ivvali.
- Image commit SHA tag tho ECR ki push avutundi.

### 🟢 10:10 AM — Kubernetes deployment
- Approved image EKS lo deploy avutundi.
- Kubernetes rollout status check chestaru.
- Application health endpoint verify chestaru.
- Failure unte logs inspect chesi previous known-good release ki rollback procedure follow chestaru.

Ee scenario real-world flow ni explain chestundi; timings illustrative matrame.

# 🚨 3. Business problem vs solution

| Problem | Risk | DevSecOps solution |
|---|---|---|
| Manual testing | Bugs late ga dorukutayi | Automated test gate |
| Vulnerable dependency | Known exploit risk | Dependency scan and upgrade process |
| Leaked AWS keys | Account compromise | OIDC federation and least privilege |
| Insecure container | Privilege escalation / larger attack surface | Minimal image, non-root user, image scanning |
| Untracked image tag | Wrong artifact deploy avvachu | Commit SHA tag and digest tracking |
| Manual deployment | Human error and inconsistent releases | Reviewed deployment workflow |
| No health verification | Broken release unnoticed | Rollout and smoke tests |
| No rollback plan | Longer outage | Documented, tested rollback |
| Over-permissive IAM | Excessive blast radius | Scoped IAM role and cluster access |

# 🔐 4. DevSecOps ante enti?

DevSecOps means security checks ni software development and operations workflow lo early nunchi integrate cheyyadam.

### CI vs CD vs DevSecOps

| Term | Meaning | Example |
|---|---|---|
| CI — Continuous Integration | Code changes merge avvadaniki mundu build/test | pytest run |
| CD — Continuous Delivery/Deployment | Validated artifact release/deploy | ECR image to EKS |
| DevSecOps | Delivery stages lo security practices integrate cheyyadam | Dependency and image scanning, IAM least privilege |

### Security shift-left

Security issues late production stage lo dorikithe fix cost, risk, and release delay perigey chance untundi. Earlier stage lo linting, tests, secret detection, dependency checks, and image scans run cheyyadam valla problems earlier ga identify cheyyachu.

Security scanners perfect kaavu. False positives, missed findings, and policy tuning issues undachu. Findings ni review chesi risk-based decision document cheyyali.

# 🗺️ 5. Architecture diagrams

## 5.1 End-to-end DevSecOps architecture

```text
Developer
   |
   v
GitHub Repository
   |
   v
GitHub Actions — CI
   |
   +--> Lint / Unit Tests
   +--> Secret / Dependency Checks
   +--> Build Docker Image
   +--> Container Vulnerability Scan
   |
   v
Protected Release Gate / Approval
   |
   v
GitHub OIDC --> AWS IAM Role
   |
   +--> Amazon ECR: Versioned Image
   |
   +--> EKS Deployment Workflow
              |
              v
       AWS EKS Cluster
              |
              +--> Kubernetes Deployment
              |       +--> Pod replicas
              |
              +--> Kubernetes Service
              |
              +--> Readiness / Liveness Probes
              |
              +--> Rollout Status / Logs
              |
              v
       Health Check + Release Evidence
```

## 5.2 Security gates

```text
Pull Request
    |
    v
Tests + Lint
    |
    v
Dependency / Secret Checks
    |
    v
Docker Build
    |
    v
Image Vulnerability Scan
    |
    v
Policy Decision
    |----------------------|
    | Pass                 | Fail
    v                      v
Publish / Release       Block + Fix + Re-run
    |
    v
Deploy to EKS
    |
    v
Health Verification
```

## 5.3 Kubernetes deployment path

```text
Amazon ECR Image
       |
       v
Kubernetes Deployment
       |
       +--> ReplicaSet
                |
                +--> Pod 1
                +--> Pod 2
       |
       v
Kubernetes Service
       |
       v
Internal application access / configured ingress path
```

Two replicas are an example, not a guarantee of high availability by themselves. Production readiness also depends on multi-AZ node capacity, disruption budgets, resource requests, probes, network design, and application behaviour.

# 🧰 6. Tools enduku vadali?

| Tool | Purpose | Simple explanation |
|---|---|---|
| Git + GitHub | Source control | Code history and collaboration |
| GitHub Actions | Pipeline automation | Changes meeda workflow run chestundi |
| Python + pytest | App and tests | API behaviour verify cheyyadaniki |
| Docker | Container packaging | App and dependencies ni image ga package chestundi |
| Trivy | Vulnerability / misconfiguration scanning | Image and files lo known risks identify chestundi |
| Amazon ECR | Container registry | Images store chestundi |
| AWS IAM + OIDC | Secure identity | GitHub workflow ki short-lived AWS role access |
| Amazon EKS | Managed Kubernetes control plane | Kubernetes workloads orchestrate chestundi |
| kubectl | Kubernetes CLI | Cluster resources inspect/apply chestundi |
| CloudWatch / logs | Operational visibility | Workload and platform logs/metrics review |

Tools names use cheyyadam matrame security guarantee kaadu. Configuration, policies, permissions, and how teams respond to findings matter.

# ⚙️ 7. DevSecOps pipeline ela work avutundi?

1. Developer branch lo code change chestadu.
2. Pull request open chesinappudu CI workflow start avutundi.
3. Linting and unit tests run avutayi.
4. Dependency/secret checks run avutayi.
5. Docker image build avutundi.
6. Trivy or equivalent scanner image ni scan chestundi.
7. Release policy pass ayithe image ECR ki publish avutundi.
8. Protected deployment job AWS OIDC role assume chestundi.
9. Kubernetes manifests approved image ni reference chestayi.
10. Deployment rollout and health check verify chestaru.
11. Failure ayithe logs collect chesi release rollback/forward-fix process follow chestaru.

### CI and deployment separation

Pull request validation ki AWS deployment permissions ivvakapovadam safer default. PR workflow untrusted code run cheyyachu; deployment credentials and production environments ni protected branch/environment approval behind lo pettali.

# 👩‍💻 8. Developer / DevOps Engineer em chestaru?

| Role | Responsibility |
|---|---|
| Developer | API code, unit tests, dependency updates |
| DevOps Engineer | Docker build, CI/CD workflow, EKS deployment, rollout |
| Security Engineer | Scan policy, vulnerability triage, threat/risk review |
| Cloud Engineer | IAM roles, ECR, EKS, network, logging |
| Release owner | Approvals, release verification, rollback decision |

Real teams lo roles overlap avvachu. Important thing: security and operational ownership clear ga undali.

# 🗂️ 9. Repository structure

Create repository name:

`end-to-end-devsecops-aws-eks`

```text
end-to-end-devsecops-aws-eks/
├── README.md
├── app/
│   ├── __init__.py
│   └── main.py
├── tests/
│   └── test_main.py
├── requirements.txt
├── requirements-dev.txt
├── Dockerfile
├── .dockerignore
├── .gitignore
├── .trivyignore
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
├── scripts/
│   ├── smoke-test.sh
│   └── smoke-test.ps1
├── .github/
│   └── workflows/
│       ├── ci-security.yml
│       └── deploy-eks.yml
└── docs/
    ├── architecture.md
    ├── security.md
    └── screenshots/
        └── README.md
```

### Folder explanation

| File/folder | Purpose |
|---|---|
| `app/main.py` | Small API application |
| `tests/` | Automated unit tests |
| `requirements.txt` | Runtime dependencies |
| `requirements-dev.txt` | Test/lint tools |
| `Dockerfile` | Container build instructions |
| `k8s/` | Kubernetes Deployment and Service |
| `ci-security.yml` | Test/build/security CI stages |
| `deploy-eks.yml` | Protected deployment workflow template |
| `scripts/` | Repeatable smoke test helpers |
| `docs/` | Architecture, security decisions, and genuine evidence |

# 🧪 10. Prerequisites

Local CI work kosam:
- Git
- Python 3.11+
- Docker
- Terraform is optional for this README unless you choose to provision EKS with IaC
- GitHub repository
- Ability to read GitHub Actions logs

Actual AWS deployment kosam:
- AWS account and billing awareness
- An EKS cluster already provisioned, or a separately reviewed IaC setup
- ECR repository
- IAM OIDC provider and role trust configured for your GitHub repository
- EKS access entry / Kubernetes RBAC permissions for the deployment role
- `aws`, `kubectl`, and appropriate cluster access
- Protected GitHub environment for deployment approval

**Do not create an EKS cluster just to test the YAML without checking costs.** EKS control plane, worker compute, load balancers, NAT, storage, logs, and data transfer can incur charges.

# 🐍 11. Small Python API example

Create `app/main.py`:

```python
from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/")
def index():
    return jsonify(
        service="shopeasy-api",
        status="running",
        project="end-to-end-devsecops-aws-eks",
    )


@app.get("/health")
def health():
    return jsonify(status="healthy"), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

Create `requirements.txt`:

```text
Flask==3.1.0
gunicorn==23.0.0
```

Create `requirements-dev.txt`:

```text
-r requirements.txt
pytest==8.3.4
ruff==0.9.2
```

Pinned versions are example starting points. Review current versions and known vulnerabilities before adopting them; update deliberately and keep dependency checks enabled.

# 🧪 12. Automated tests

Create `tests/test_main.py`:

```python
from app.main import app


def test_index_returns_service_name():
    client = app.test_client()
    response = client.get("/")

    assert response.status_code == 200
    assert response.get_json()["service"] == "shopeasy-api"


def test_health_endpoint():
    client = app.test_client()
    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json()["status"] == "healthy"
```

Run locally:

```bash
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
# source .venv/bin/activate

pip install -r requirements-dev.txt
python -m pytest -q
ruff check .
```

A passing unit test proves only the tested behaviour under that test environment. It does not prove AWS access, container security, or EKS deployment.

# 🐳 13. Docker image

Create `Dockerfile`:

```dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8080

WORKDIR /app

RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

USER appuser
EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "2", "app.main:app"]
```

Create `.dockerignore`:

```text
.git
.github
.venv
__pycache__
.pytest_cache
.ruff_cache
*.pyc
.env
.env.*
terraform.tfstate*
```

Build and test:

```bash
docker build -t shopeasy-api:local .
docker run --rm -p 8080:8080 shopeasy-api:local
```

In another terminal:

```bash
curl http://localhost:8080/health
```

Expected response:

```json
{"status":"healthy"}
```

The expected response is an example. Confirm it from your own running container.

# 🛡️ 14. Security scanning

Recommended CI checks:
- Ruff linting and automated tests
- Secret scanning
- Dependency vulnerability scanning
- Docker image vulnerability scan
- Optional IaC scanning if Terraform or Helm infrastructure files are added
- Review of scanner results and an explicit release policy

Example local Trivy image scan:

```bash
trivy image --severity HIGH,CRITICAL shopeasy-api:local
```

Example source/config scan:

```bash
trivy fs --scanners vuln,misconfig,secret .
```

Scanner output must be reviewed. A finding may be exploitable or not, but do not automatically ignore it. If using `.trivyignore`, document why each exception exists, who approved it, and when it should be reviewed.

# ⚙️ 15. Secure AWS authentication with OIDC

GitHub Actions OIDC lets a workflow request a short-lived identity token and exchange it with AWS STS to assume a configured IAM role. This can avoid storing long-lived AWS access keys in GitHub secrets.

### Required configuration

1. Configure GitHub as an OIDC identity provider in AWS IAM.
2. Create a role with a trust policy restricted to the intended repository and branch/environment.
3. Grant only required ECR and EKS deployment permissions.
4. Add the role ARN and region as non-secret repository/environment variables where appropriate.
5. Ensure deployment runs only from approved refs and protected environments.
6. Verify role assumption logs without exposing sensitive account information.

Workflow permission requirement:

```yaml
permissions:
  contents: read
  id-token: write
```

The trust policy must validate the expected OIDC audience and subject claims. Do not use an unrestricted subject such as a broad wildcard for production. Exact trust-policy values depend on repository, branch, and environment design.

**Important:** `id-token: write` permits requesting an OIDC token; it does not by itself grant AWS permissions. AWS trust and IAM permissions must also be configured correctly.

# 📦 16. Publish image to Amazon ECR

Create an ECR repository before running the publish workflow, or provision it through reviewed infrastructure code. Use a unique image tag tied to the commit SHA so the exact build can be identified.

Example workflow steps for the publishing job:

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ${{ vars.AWS_ROLE_ARN }}
    aws-region: ${{ vars.AWS_REGION }}

- name: Login to Amazon ECR
  id: login-ecr
  uses: aws-actions/amazon-ecr-login@v2

- name: Build and push image
  env:
    REGISTRY: ${{ steps.login-ecr.outputs.registry }}
    REPOSITORY: shopeasy-api
    IMAGE_TAG: ${{ github.sha }}
  run: |
    docker build -t "$REGISTRY/$REPOSITORY:$IMAGE_TAG" .
    docker push "$REGISTRY/$REPOSITORY:$IMAGE_TAG"
```

This is a snippet, not a complete workflow by itself. Put it in a correctly gated job after tests and security checks, and configure the role permissions and repository name. Pin third-party actions to reviewed full commit SHAs for stronger supply-chain controls.

Use the full image URI in Kubernetes configuration. In more controlled release systems, record and deploy the image digest as well as the tag.

# ☸️ 17. Deploy to AWS EKS

## 17.1 Kubernetes Deployment

Create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shopeasy-api
  labels:
    app: shopeasy-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: shopeasy-api
  template:
    metadata:
      labels:
        app: shopeasy-api
    spec:
      securityContext:
        runAsNonRoot: true
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: api
          image: ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/shopeasy-api:REPLACE_WITH_COMMIT_SHA
          ports:
            - name: http
              containerPort: 8080
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "256Mi"
          readinessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 10
            periodSeconds: 20
```

Replace the placeholder image URI with your actual ECR image tag. `ACCOUNT_ID` is a placeholder. Validate the manifest against your cluster and image before applying.

## 17.2 Kubernetes Service

Create `k8s/service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: shopeasy-api
spec:
  type: ClusterIP
  selector:
    app: shopeasy-api
  ports:
    - name: http
      port: 80
      targetPort: http
```

`ClusterIP` exposes the service internally within the cluster. It does not create a public endpoint. For external traffic, design and secure an ingress/load balancer path separately.

## 17.3 Manual verification commands

After AWS role and cluster access are configured:

```bash
aws sts get-caller-identity
aws eks update-kubeconfig --region ap-south-1 --name REPLACE_WITH_CLUSTER_NAME
kubectl get nodes
kubectl apply -f k8s/
kubectl rollout status deployment/shopeasy-api --timeout=180s
kubectl get pods -l app=shopeasy-api
kubectl get service shopeasy-api
kubectl logs deployment/shopeasy-api
```

These commands change the cluster when `kubectl apply` runs. Verify the AWS account, cluster, namespace, and image URI before applying. The EKS cluster and its access configuration must already exist.

## 17.4 Deployment workflow design

A production-oriented deployment workflow should:
- Run after required CI/security jobs pass.
- Use protected branch/environment rules and manual approval where appropriate.
- Assume AWS role using OIDC.
- Configure access only to the intended EKS cluster.
- Deploy a reviewed manifest/image digest.
- Wait for rollout status and run a smoke test.
- Capture logs and release metadata on failure.
- Avoid deploying untrusted pull-request code to production.

# ❤️ 18. Health checks and rollback

### Verify rollout

```bash
kubectl rollout status deployment/shopeasy-api --timeout=180s
kubectl get deployment shopeasy-api
kubectl get pods -l app=shopeasy-api
kubectl describe deployment shopeasy-api
```

### Test service from inside the cluster

```bash
kubectl run curl-test --rm -i --restart=Never \
  --image=curlimages/curl:latest \
  -- curl -fsS http://shopeasy-api/health
```

Use approved image versions and follow cluster policies; the command creates a temporary pod.

### Roll back a failed Deployment

```bash
kubectl rollout history deployment/shopeasy-api
kubectl rollout undo deployment/shopeasy-api
kubectl rollout status deployment/shopeasy-api
```

Rollback works only when the previous ReplicaSet and its image/config are still usable. If the issue is a database schema change or incompatible external dependency, rolling back the application image alone may not restore service. Test rollback in a non-production environment first.

# 🔒 19. Security practices

- Never commit AWS credentials, tokens, `.env` files, or Kubernetes secrets.
- Use OIDC and short-lived role credentials where possible.
- Restrict role trust to the expected repository and branch/environment.
- Separate pull-request validation permissions from deployment permissions.
- Use least-privilege IAM and EKS access.
- Scan dependencies, source, and container images.
- Use minimal base images and run as a non-root user.
- Drop Linux capabilities and disable privilege escalation where compatible.
- Set CPU/memory requests and limits.
- Use readiness/liveness probes thoughtfully.
- Use Kubernetes Secrets only with suitable encryption/access controls; consider an approved external secrets manager for sensitive workloads.
- Restrict network access and use TLS at the ingress/load balancer layer.
- Pin dependencies and GitHub Actions to reviewed versions/SHAs.
- Protect main branch and production environment with review/approval.
- Keep an exception register for accepted vulnerabilities.
- Enable audit/logging appropriate to the environment.
- Set AWS budgets and a cleanup plan.

# 🧯 20. Real-time troubleshooting guide

| Problem | Possible cause | What to inspect | Fix direction |
|---|---|---|---|
| Unit test fails | App behaviour changed or dependency mismatch | pytest output | Fix code/test expectation and rerun |
| Ruff fails | Lint rule violation | Ruff output | Fix or document a justified exception |
| Docker build fails | Dependency/network/context error | Build logs | Verify requirements, Dockerfile, and build context |
| Trivy reports HIGH/CRITICAL | Vulnerable package/base image | Scan report and dependency tree | Upgrade, rebuild, rescan, review exceptions |
| OIDC role assumption denied | Trust policy or token claims mismatch | Workflow logs and IAM trust conditions | Restrict/correct audience and subject conditions |
| ECR login denied | IAM/repository policy issue | Assumed role and ECR permissions | Add only required permissions |
| ECR push denied | Wrong repository or push permissions | Image URI and push logs | Verify repository and role policy |
| `ImagePullBackOff` | Wrong image URI/tag or ECR access | `kubectl describe pod` | Fix tag/registry and node/role pull permissions |
| `CrashLoopBackOff` | App exits or config is wrong | `kubectl logs`, `describe pod` | Fix startup/config and redeploy |
| Readiness probe fails | App not listening or path/port mismatch | Pod logs and probe events | Align port/path and startup behaviour |
| `kubectl` forbidden | EKS access/RBAC insufficient | `kubectl auth can-i`, AWS identity | Grant scoped cluster access |
| Service unreachable | Selector/port/network issue | `kubectl get endpoints`, service, pods | Fix labels, ports, ingress, or network |
| Pipeline passes but wrong image deployed | Tag/digest mismatch | Commit SHA and image digest | Tie release to exact artifact |
| Rollback does not restore app | Incompatible schema/config or no usable prior ReplicaSet | rollout history and app logs | Forward-fix or use tested recovery plan |
| AWS bill rises unexpectedly | Cluster, NAT, load balancer, compute left running | Billing and resource inventory | Identify owner and clean up safely |

## 5-step troubleshooting method

1. **Observe:** Exact error, timestamp, commit SHA, namespace, and failed job note cheyyandi.
2. **Scope:** Test, scan, build, authentication, ECR, deployment, or health stage — ekkada fail ayyindi?
3. **Collect evidence:** Workflow logs, pod events, application logs, and relevant AWS audit information.
4. **Test a hypothesis:** One cause at a time verify cheyyandi.
5. **Re-run and document:** Fix confirm chesi, recurrence prevent cheyyadaniki action note cheyyandi.

# 📸 21. Screenshots and evidence

Actual results verify chesaka `docs/screenshots/` folder lo screenshots save cheyyandi.

| Screenshot | Evidence |
|---|---|
| `01-github-actions-tests.png` | Unit test job success |
| `02-security-scan.png` | Actual dependency/source scan output |
| `03-docker-build.png` | Docker image build result |
| `04-trivy-image-scan.png` | Image scan output and policy result |
| `05-oidc-auth.png` | AWS role assumption success, sensitive details redacted |
| `06-ecr-image.png` | ECR image tag/digest |
| `07-eks-deployment.png` | Deployment and ReplicaSet status |
| `08-pods-ready.png` | Actual ready pods |
| `09-health-check.png` | Real smoke/health check |
| `10-rollback-test.png` | Non-production rollback evidence |

README lo embed example:

```markdown
### EKS Deployment — Verified Result

![EKS deployment result](docs/screenshots/07-eks-deployment.png)
```

**Important:** Screenshot filenames placeholders matrame. Actual output capture cheyyakunda fake evidence add cheyyakandi. AWS account IDs, tokens, secrets, private hostnames, and sensitive infrastructure details redact cheyyandi.

# 💸 22. Cost safety and cleanup

AWS EKS control plane, EC2 worker nodes, ECR storage, load balancers, NAT gateways, EBS, CloudWatch logs, and data transfer charges generate cheyyachu. Exact cost region, configuration, runtime, and current pricing batti vary avutundi.

Before deployment:
- [ ] AWS billing/budget alerts configure cheyyandi.
- [ ] Account and cluster confirm cheyyandi.
- [ ] IAM role and target permissions review cheyyandi.
- [ ] ECR image retention policy decide cheyyandi.
- [ ] Cluster, node groups, load balancers, NAT, volumes, and logs inventory maintain cheyyandi.
- [ ] Cleanup owner and deadline decide cheyyandi.
- [ ] Production/shared environment lo destructive commands ki approval require cheyyandi.

After testing:
1. App resources ni correct namespace nunchi remove cheyyandi if no longer needed.
2. Load balancers and temporary resources remove ayyayo verify cheyyandi.
3. Dedicated lab cluster no longer needed ayithe, ownership and dependencies review chesi approved process lo delete cheyyandi.
4. ECR images, logs, volumes, and networking resources inspect cheyyandi.
5. AWS console/billing tools lo leftover resources verify cheyyandi.

> **Warning:** `kubectl delete`, cluster deletion, or bulk cleanup commands ni blindly run cheyyakandi. Shared/production environment lo outage or data loss avvachu. Ownership, namespace, and plan review chesi approval tho matrame cleanup cheyyandi.

# 🎤 23. Interview lo project ela explain cheyyali?

Ee template ni mee actual implementation ki match ayye laga use cheyyandi. Complete ga implement cheyyani features ni completed ani claim cheyyakandi.

> “I designed an end-to-end DevSecOps workflow for a Python API targeting AWS EKS. The pipeline runs automated tests and security checks, builds a Docker image, scans the image, and publishes a commit-specific artifact to Amazon ECR. For AWS authentication, I use GitHub OIDC with a scoped IAM role instead of long-lived access keys. Kubernetes manifests define the Deployment and Service with probes, resource requests/limits, and container security settings. After deployment, I verify rollout status and application health, inspect logs on failure, and document rollback and cleanup. I keep CI validation separate from actual AWS deployment evidence.”

If you only ran local tests and did not deploy to AWS EKS, say so clearly. Local validation is not proof of a live cluster deployment.

## Interview questions

1. DevSecOps ante enti? DevOps tho difference enti?
2. Shift-left security ante enti?
3. CI and CD madhya difference enti?
4. GitHub Actions workflow, job, step, and runner ante enti?
5. Why should pull-request workflows not receive production credentials?
6. Docker image and container difference enti?
7. Why run containers as non-root?
8. Trivy image scan em identify chestundi?
9. Vulnerability exception ni ela manage chestaru?
10. GitHub OIDC and AWS IAM role ela work chestayi?
11. AWS access keys GitHub secrets lo store cheyyakunda enduku undali?
12. Amazon ECR purpose enti?
13. EKS and Kubernetes madhya relation enti?
14. Deployment, ReplicaSet, Pod, and Service ante enti?
15. Readiness and liveness probes madhya difference enti?
16. `ImagePullBackOff` ni ela troubleshoot chestaru?
17. `CrashLoopBackOff` ni ela troubleshoot chestaru?
18. Kubernetes resource requests and limits enduku?
19. `kubectl rollout undo` eppudu use chestaru?
20. How do you prove that a release deployed the exact image that was scanned?
21. Why should deployment permissions be least-privilege?
22. What AWS resources can create costs in an EKS lab?
23. Why is a passing CI workflow not proof of production readiness?
24. How do you verify cleanup after testing?

# ✅ 24. Project complete ayyindi ani ela telustundi?

| Test | How to verify | Success condition |
|---|---|---|
| App tests | `python -m pytest -q` | All expected tests pass |
| Lint | `ruff check .` | No unreviewed lint errors |
| Container builds | `docker build ...` | Build completes |
| Local health check | `curl http://localhost:8080/health` | Expected healthy response |
| Security scan | Trivy report | Findings reviewed and policy decision documented |
| OIDC authentication | GitHub workflow logs | Intended AWS role assumed |
| ECR publish | ECR console/CLI | Exact tag/digest exists |
| EKS rollout | `kubectl rollout status` | Deployment rollout completes |
| Pods ready | `kubectl get pods` | Intended replicas become Ready |
| Health check | Actual endpoint test | Application returns expected result |
| Rollback test | Non-production exercise | Recovery procedure verified |
| Cleanup | AWS resource inventory | Intended temporary resources removed |

Do not claim AWS deployment, successful scanning, or rollback testing unless you actually ran and verified those stages.

# 📚 25. Official documentation

- [GitHub Actions documentation](https://docs.github.com/en/actions) — workflow basics.
- [GitHub Actions security hardening](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) — workflow security.
- [GitHub OIDC with AWS](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-for-github-actions/configuring-openid-connect-in-amazon-web-services) — federated AWS authentication.
- [AWS IAM OIDC federation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) — identity provider and trust.
- [Amazon ECR user guide](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html) — container registry.
- [Amazon EKS documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) — managed Kubernetes.
- [Kubernetes documentation](https://kubernetes.io/docs/home/) — Deployments, Services, probes, and security context.
- [Docker documentation](https://docs.docker.com/) — image and container basics.
- [Trivy documentation](https://trivy.dev/latest/docs/) — vulnerability and misconfiguration scanning.
- [Flask documentation](https://flask.palletsprojects.com/) — API framework.
- [pytest documentation](https://docs.pytest.org/en/stable/) — automated tests.
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html) — security, reliability, and cost principles.

---



## 🌟 Final thought

**Goal: YAML copy cheyyadam matrame kaadu.** Code change nunchi test, security checks, image build, secure AWS authentication, ECR publishing, EKS rollout, and health verification varaku complete delivery flow ni understand cheyyali.

**PROJECT 07 — End-to-End DevSecOps on AWS EKS**


