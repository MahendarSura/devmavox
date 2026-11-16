"use client";

import { useMemo, useState } from "react";

type Lab = "Kubernetes Manifest Lab" | "Troubleshooting Lab" | "CI/CD and GitOps Lab";

type Exercise = {
  id: string;
  title: string;
  incident: string;
  task: string;
  broken: string;
  solution: string;
  checks: string[];
  commands: string[];
  expected: string;
};

const labs: { name: Lab; description: string; exercises: Exercise[] }[] = [
  {
    name: "Kubernetes Manifest Lab",
    description: "Practice broken Kubernetes manifests, deployment failures, service routing, storage, probes and resource configuration.",
    exercises: [
      {
        id: "KML-01", title: "Deployment selector mismatch",
        incident: "Deployment pods are running, but the Deployment reports zero available replicas.",
        task: "Make the pod template labels match the Deployment selector.",
        broken: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout
spec:
  replicas: 2
  selector:
    matchLabels:
      app: checkout
  template:
    metadata:
      labels:
        app: payment
    spec:
      containers:
        - name: checkout
          image: nginx:1.27`,
        solution: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout
spec:
  replicas: 2
  selector:
    matchLabels:
      app: checkout
  template:
    metadata:
      labels:
        app: checkout
    spec:
      containers:
        - name: checkout
          image: nginx:1.27`,
        checks: ["Deployment selector and pod template labels must match.", "Two replicas must be requested.", "Container image must remain nginx:1.27."],
        commands: ["kubectl apply --dry-run=client -f deployment.yaml", "kubectl apply -f deployment.yaml", "kubectl get deployment checkout", "kubectl get pods --show-labels"],
        expected: "Deployment selector matches pod labels. The Deployment can manage its two replicas."
      },
      {
        id: "KML-02", title: "Service targetPort points to the wrong port",
        incident: "The Service exists, but requests to the application fail because traffic reaches the wrong container port.",
        task: "Correct the Service targetPort to match the container's listening port.",
        broken: `apiVersion: v1
kind: Service
metadata:
  name: catalog
spec:
  selector:
    app: catalog
  ports:
    - name: http
      port: 80
      targetPort: 8080`,
        solution: `apiVersion: v1
kind: Service
metadata:
  name: catalog
spec:
  selector:
    app: catalog
  ports:
    - name: http
      port: 80
      targetPort: 3000`,
        checks: ["Service port remains 80.", "targetPort must be 3000.", "Selector must continue targeting app=catalog."],
        commands: ["kubectl get svc catalog -o yaml", "kubectl get pods --show-labels", "kubectl describe svc catalog", "kubectl get endpoints catalog"],
        expected: "The Service forwards port 80 traffic to container port 3000."
      },
      {
        id: "KML-03", title: "ConfigMap key does not match environment reference",
        incident: "The application starts without its required configuration value.",
        task: "Make the ConfigMap key and Deployment reference identical.",
        broken: `apiVersion: v1
kind: ConfigMap
metadata:
  name: catalog-config
data:
  DATABASE_HOST: postgres.default.svc
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: catalog
spec:
  selector:
    matchLabels:
      app: catalog
  template:
    metadata:
      labels:
        app: catalog
    spec:
      containers:
        - name: catalog
          image: nginx:1.27
          env:
            - name: DATABASE_HOST
              valueFrom:
                configMapKeyRef:
                  name: catalog-config
                  key: DB_HOST`,
        solution: `apiVersion: v1
kind: ConfigMap
metadata:
  name: catalog-config
data:
  DATABASE_HOST: postgres.default.svc
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: catalog
spec:
  selector:
    matchLabels:
      app: catalog
  template:
    metadata:
      labels:
        app: catalog
    spec:
      containers:
        - name: catalog
          image: nginx:1.27
          env:
            - name: DATABASE_HOST
              valueFrom:
                configMapKeyRef:
                  name: catalog-config
                  key: DATABASE_HOST`,
        checks: ["ConfigMap name must be catalog-config.", "Referenced key must exist in ConfigMap data.", "Environment variable name must remain DATABASE_HOST."],
        commands: ["kubectl get configmap catalog-config -o yaml", "kubectl describe pod -l app=catalog", "kubectl get events --sort-by=.lastTimestamp"],
        expected: "The container references an existing ConfigMap key."
      },
      {
        id: "KML-04", title: "PersistentVolumeClaim requests an unsupported access mode",
        incident: "A workload remains Pending because its storage claim cannot be satisfied by the available volume.",
        task: "Change the claim to the supported ReadWriteOnce access mode.",
        broken: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: reports-data
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 5Gi
  storageClassName: standard`,
        solution: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: reports-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: standard`,
        checks: ["Claim name must remain reports-data.", "Access mode must be ReadWriteOnce.", "Requested storage must remain 5Gi."],
        commands: ["kubectl describe pvc reports-data", "kubectl get storageclass", "kubectl get pv", "kubectl get events --sort-by=.lastTimestamp"],
        expected: "The PVC requests an access mode supported by the configured storage."
      },
      {
        id: "KML-05", title: "Readiness probe uses the wrong endpoint",
        incident: "The container is running, but the pod never becomes Ready.",
        task: "Correct the readiness probe path to the application's health endpoint.",
        broken: `apiVersion: v1
kind: Pod
metadata:
  name: health-api
  labels:
    app: health-api
spec:
  containers:
    - name: api
      image: nginx:1.27
      readinessProbe:
        httpGet:
          path: /readyz
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 10`,
        solution: `apiVersion: v1
kind: Pod
metadata:
  name: health-api
  labels:
    app: health-api
spec:
  containers:
    - name: api
      image: nginx:1.27
      readinessProbe:
        httpGet:
          path: /health
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 10`,
        checks: ["Readiness endpoint must be /health.", "Probe port must remain 8080.", "Probe must remain a readinessProbe."],
        commands: ["kubectl describe pod health-api", "kubectl get pod health-api", "kubectl logs health-api", "kubectl get events --sort-by=.lastTimestamp"],
        expected: "The readiness probe checks the configured /health endpoint."
      },
      {
        id: "KML-06", title: "Container resource limit is below the required memory",
        incident: "The application repeatedly terminates when memory usage exceeds its configured limit.",
        task: "Increase the memory limit to 512Mi while retaining the CPU limit.",
        broken: `apiVersion: v1
kind: Pod
metadata:
  name: worker
spec:
  containers:
    - name: worker
      image: busybox:1.36
      command: ["sh", "-c", "sleep 3600"]
      resources:
        requests:
          memory: 128Mi
          cpu: 100m
        limits:
          memory: 64Mi
          cpu: 500m`,
        solution: `apiVersion: v1
kind: Pod
metadata:
  name: worker
spec:
  containers:
    - name: worker
      image: busybox:1.36
      command: ["sh", "-c", "sleep 3600"]
      resources:
        requests:
          memory: 128Mi
          cpu: 100m
        limits:
          memory: 512Mi
          cpu: 500m`,
        checks: ["Memory request must remain 128Mi.", "Memory limit must be 512Mi.", "CPU limit must remain 500m."],
        commands: ["kubectl describe pod worker", "kubectl get pod worker -o yaml", "kubectl top pod worker", "kubectl get events"],
        expected: "The container has a 512Mi memory limit and retains its CPU limit."
      },
      {
        id: "KML-07", title: "Namespace omitted from a production workload",
        incident: "A deployment is created in the default namespace instead of the intended staging namespace.",
        task: "Set the Deployment namespace to staging.",
        broken: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: inventory
spec:
  replicas: 2
  selector:
    matchLabels:
      app: inventory
  template:
    metadata:
      labels:
        app: inventory
    spec:
      containers:
        - name: inventory
          image: nginx:1.27`,
        solution: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: inventory
  namespace: staging
spec:
  replicas: 2
  selector:
    matchLabels:
      app: inventory
  template:
    metadata:
      labels:
        app: inventory
    spec:
      containers:
        - name: inventory
          image: nginx:1.27`,
        checks: ["Namespace must be staging.", "Deployment name must remain inventory.", "Replica count must remain 2."],
        commands: ["kubectl get namespaces", "kubectl apply --dry-run=client -f inventory.yaml", "kubectl apply -f inventory.yaml", "kubectl get deployment -n staging"],
        expected: "The Deployment is created in the staging namespace."
      },
      {
        id: "KML-08", title: "Rolling update strategy is configured incorrectly",
        incident: "A deployment update can take down all available replicas at once.",
        task: "Configure a rolling update with zero unavailable replicas and one surge replica.",
        broken: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 3
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: nginx:1.27`,
        solution: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: nginx:1.27`,
        checks: ["Strategy type must be RollingUpdate.", "maxUnavailable must be 0.", "maxSurge must be 1."],
        commands: ["kubectl get deployment frontend -o yaml", "kubectl apply --dry-run=client -f frontend.yaml", "kubectl rollout status deployment/frontend", "kubectl rollout history deployment/frontend"],
        expected: "The Deployment uses a controlled rolling update strategy."
      }
    ]
  },
  {
    name: "Troubleshooting Lab",
    description: "Reproduce operational failures, inspect evidence, identify root causes, repair configurations and verify recovery.",
    exercises: [
      {
        id: "TL-01", title: "CrashLoopBackOff caused by an invalid command",
        incident: "A worker container starts and exits immediately. Kubernetes repeatedly restarts it.",
        task: "Correct the container command so the process remains alive for this practice workload.",
        broken: `apiVersion: v1
kind: Pod
metadata:
  name: queue-worker
spec:
  restartPolicy: Always
  containers:
    - name: worker
      image: busybox:1.36
      command: ["sh", "-c", "process-that-does-not-exist"]`,
        solution: `apiVersion: v1
kind: Pod
metadata:
  name: queue-worker
spec:
  restartPolicy: Always
  containers:
    - name: worker
      image: busybox:1.36
      command: ["sh", "-c", "sleep 3600"]`,
        checks: ["Container command must use sleep 3600.", "Pod restartPolicy must remain Always.", "Pod name must remain queue-worker."],
        commands: ["kubectl get pod queue-worker", "kubectl describe pod queue-worker", "kubectl logs queue-worker --previous", "kubectl get events --sort-by=.lastTimestamp"],
        expected: "The container command executes successfully and the practice pod stays running."
      },
      {
        id: "TL-02", title: "ImagePullBackOff from an invalid image tag",
        incident: "A deployment cannot start because the requested image tag does not exist.",
        task: "Replace the invalid image tag with the available nginx:1.27 tag.",
        broken: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: image-test
spec:
  replicas: 1
  selector:
    matchLabels:
      app: image-test
  template:
    metadata:
      labels:
        app: image-test
    spec:
      containers:
        - name: web
          image: nginx:version-does-not-exist`,
        solution: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: image-test
spec:
  replicas: 1
  selector:
    matchLabels:
      app: image-test
  template:
    metadata:
      labels:
        app: image-test
    spec:
      containers:
        - name: web
          image: nginx:1.27`,
        checks: ["Image must be nginx:1.27.", "Deployment selector and pod labels must match.", "Replica count must remain 1."],
        commands: ["kubectl get pods", "kubectl describe pod -l app=image-test", "kubectl get events --sort-by=.lastTimestamp", "kubectl rollout status deployment/image-test"],
        expected: "The Deployment references the available image tag."
      },
      {
        id: "TL-03", title: "Pending pod caused by an impossible CPU request",
        incident: "The scheduler cannot place the pod on any node because the CPU request is too large.",
        task: "Reduce the CPU request from 100 cores to 250m.",
        broken: `apiVersion: v1
kind: Pod
metadata:
  name: batch-job
spec:
  containers:
    - name: batch
      image: busybox:1.36
      command: ["sh", "-c", "sleep 3600"]
      resources:
        requests:
          cpu: "100"
          memory: 128Mi`,
        solution: `apiVersion: v1
kind: Pod
metadata:
  name: batch-job
spec:
  containers:
    - name: batch
      image: busybox:1.36
      command: ["sh", "-c", "sleep 3600"]
      resources:
        requests:
          cpu: 250m
          memory: 128Mi`,
        checks: ["CPU request must be 250m.", "Memory request must remain 128Mi.", "Pod name must remain batch-job."],
        commands: ["kubectl get pod batch-job", "kubectl describe pod batch-job", "kubectl get nodes", "kubectl describe nodes"],
        expected: "The scheduler receives a realistic CPU request for the workload."
      },
      {
        id: "TL-04", title: "Service has no endpoints because selector is wrong",
        incident: "The Service is reachable inside the cluster, but it has no backend endpoints.",
        task: "Correct the selector to match the application pod label app=orders.",
        broken: `apiVersion: v1
kind: Service
metadata:
  name: orders-api
spec:
  selector:
    app: order
  ports:
    - port: 80
      targetPort: 8080`,
        solution: `apiVersion: v1
kind: Service
metadata:
  name: orders-api
spec:
  selector:
    app: orders
  ports:
    - port: 80
      targetPort: 8080`,
        checks: ["Selector must be app: orders.", "Service port must remain 80.", "targetPort must remain 8080."],
        commands: ["kubectl get svc orders-api -o yaml", "kubectl get pods --show-labels", "kubectl get endpoints orders-api", "kubectl describe svc orders-api"],
        expected: "The Service selector matches the backend pod labels."
      },
      {
        id: "TL-05", title: "Secret reference uses a missing key",
        incident: "A pod cannot start because its environment variable references a key that is absent from the Secret.",
        task: "Correct the Secret key reference to API_TOKEN.",
        broken: `apiVersion: v1
kind: Pod
metadata:
  name: payment-api
spec:
  containers:
    - name: api
      image: nginx:1.27
      env:
        - name: TOKEN
          valueFrom:
            secretKeyRef:
              name: payment-secret
              key: TOKEN_VALUE`,
        solution: `apiVersion: v1
kind: Pod
metadata:
  name: payment-api
spec:
  containers:
    - name: api
      image: nginx:1.27
      env:
        - name: TOKEN
          valueFrom:
            secretKeyRef:
              name: payment-secret
              key: API_TOKEN`,
        checks: ["Secret name must remain payment-secret.", "Secret key reference must be API_TOKEN.", "Environment variable must remain TOKEN."],
        commands: ["kubectl get secret payment-secret", "kubectl describe pod payment-api", "kubectl get events --sort-by=.lastTimestamp", "kubectl get pod payment-api -o yaml"],
        expected: "The pod references the expected API_TOKEN Secret key. Do not print Secret values in logs."
      },
      {
        id: "TL-06", title: "Liveness probe causes unnecessary restarts",
        incident: "A slow-starting application is restarted before it has enough time to initialize.",
        task: "Add a startupProbe with a suitable failure threshold and period.",
        broken: `apiVersion: v1
kind: Pod
metadata:
  name: slow-start
spec:
  containers:
    - name: app
      image: nginx:1.27
      livenessProbe:
        httpGet:
          path: /
          port: 80
        initialDelaySeconds: 2
        periodSeconds: 5`,
        solution: `apiVersion: v1
kind: Pod
metadata:
  name: slow-start
spec:
  containers:
    - name: app
      image: nginx:1.27
      startupProbe:
        httpGet:
          path: /
          port: 80
        periodSeconds: 10
        failureThreshold: 30
      livenessProbe:
        httpGet:
          path: /
          port: 80
        initialDelaySeconds: 2
        periodSeconds: 5`,
        checks: ["startupProbe must be present.", "startupProbe periodSeconds must be 10.", "failureThreshold must be 30."],
        commands: ["kubectl describe pod slow-start", "kubectl get pod slow-start -w", "kubectl get events --sort-by=.lastTimestamp"],
        expected: "The startup probe gives the application time to initialize before liveness checks take effect."
      },
      {
        id: "TL-07", title: "NetworkPolicy blocks required ingress traffic",
        incident: "A backend pod is isolated and cannot receive traffic from the frontend namespace.",
        task: "Allow ingress TCP traffic on port 8080 from pods labelled app=frontend.",
        broken: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-access
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: monitoring
      ports:
        - protocol: TCP
          port: 9090`,
        solution: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-access
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080`,
        checks: ["Source pod selector must be app=frontend.", "Allowed TCP port must be 8080.", "Policy must continue selecting app=backend."],
        commands: ["kubectl get networkpolicy backend-access -o yaml", "kubectl describe networkpolicy backend-access", "kubectl get pods --show-labels", "kubectl exec <frontend-pod> -- wget -qO- http://backend:8080"],
        expected: "The policy allows the intended frontend pods to reach backend TCP port 8080."
      },
      {
        id: "TL-08", title: "Deployment rollout stuck on an invalid readiness path",
        incident: "A new ReplicaSet is created, but rollout never completes because readiness checks fail.",
        task: "Change the readiness endpoint from /wrong-health to /health.",
        broken: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: profile-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: profile-api
  template:
    metadata:
      labels:
        app: profile-api
    spec:
      containers:
        - name: api
          image: nginx:1.27
          readinessProbe:
            httpGet:
              path: /wrong-health
              port: 80
            periodSeconds: 5`,
        solution: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: profile-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: profile-api
  template:
    metadata:
      labels:
        app: profile-api
    spec:
      containers:
        - name: api
          image: nginx:1.27
          readinessProbe:
            httpGet:
              path: /health
              port: 80
            periodSeconds: 5`,
        checks: ["Readiness path must be /health.", "Probe port must remain 80.", "Deployment must keep two replicas."],
        commands: ["kubectl rollout status deployment/profile-api", "kubectl describe deployment profile-api", "kubectl describe pods -l app=profile-api", "kubectl get events --sort-by=.lastTimestamp"],
        expected: "The rollout can proceed when the readiness endpoint returns success."
      }
    ]
  },
  {
    name: "CI/CD and GitOps Lab",
    description: "Repair pipeline YAML, workflow dependencies, artifact handling, Helm values and GitOps reconciliation failures.",
    exercises: [
      {
        id: "CD-01", title: "CI pipeline job is missing its stage",
        incident: "The CI configuration is rejected because a job references a stage that is not declared.",
        task: "Declare the build stage before the job uses it.",
        broken: `stages:
  - test
  - deploy

build_app:
  stage: build
  script:
    - npm ci
    - npm run build`,
        solution: `stages:
  - build
  - test
  - deploy

build_app:
  stage: build
  script:
    - npm ci
    - npm run build`,
        checks: ["The stages list must include build.", "The build_app job must use stage build.", "Build commands must be preserved."],
        commands: ["git diff -- .gitlab-ci.yml", "gitlab-ci-lint", "git add .gitlab-ci.yml", "git commit -m \"Fix missing build stage\""],
        expected: "The pipeline job references a declared stage."
      },
      {
        id: "CD-02", title: "Pipeline deploy job runs before tests",
        incident: "Deployment starts even when the test job has not completed successfully.",
        task: "Add a dependency so deploy_app waits for test_app.",
        broken: `stages:
  - test
  - deploy

test_app:
  stage: test
  script:
    - npm test

deploy_app:
  stage: deploy
  script:
    - ./deploy.sh`,
        solution: `stages:
  - test
  - deploy

test_app:
  stage: test
  script:
    - npm test

deploy_app:
  stage: deploy
  needs:
    - test_app
  script:
    - ./deploy.sh`,
        checks: ["deploy_app must declare needs.", "The dependency must be test_app.", "Test and deployment scripts must remain unchanged."],
        commands: ["git diff -- .gitlab-ci.yml", "gitlab-ci-lint", "Run pipeline and inspect job dependencies"],
        expected: "The deployment job depends on successful completion of the test job."
      },
      {
        id: "CD-03", title: "Docker build uses an incorrect Dockerfile path",
        incident: "The pipeline cannot build the image because the Dockerfile is stored in the docker directory.",
        task: "Set the build command to use docker/Dockerfile.",
        broken: `build_image:
  stage: build
  script:
    - docker build -t registry.example.com/store:1.0 -f Dockerfile .`,
        solution: `build_image:
  stage: build
  script:
    - docker build -t registry.example.com/store:1.0 -f docker/Dockerfile .`,
        checks: ["Dockerfile path must be docker/Dockerfile.", "Image name and tag must remain unchanged.", "Build context must remain the repository root."],
        commands: ["find . -name Dockerfile", "docker build -t registry.example.com/store:1.0 -f docker/Dockerfile .", "docker image inspect registry.example.com/store:1.0"],
        expected: "The pipeline references the Dockerfile at its actual repository path."
      },
      {
        id: "CD-04", title: "Build artifact is not passed to the deploy stage",
        incident: "The build succeeds, but the deploy job cannot find the generated distribution directory.",
        task: "Publish the dist directory as a build artifact.",
        broken: `build_app:
  stage: build
  script:
    - npm ci
    - npm run build

deploy_app:
  stage: deploy
  script:
    - test -d dist
    - ./deploy.sh`,
        solution: `build_app:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy_app:
  stage: deploy
  script:
    - test -d dist
    - ./deploy.sh`,
        checks: ["Build job must publish dist/ as an artifact.", "Deploy job must check the dist directory.", "Build and deploy stages must remain intact."],
        commands: ["npm ci", "npm run build", "test -d dist", "Inspect pipeline artifacts for build_app"],
        expected: "The build output is retained as an artifact for downstream pipeline jobs."
      },
      {
        id: "CD-05", title: "GitHub Actions workflow references a missing working directory",
        incident: "The workflow fails because npm commands execute in a directory that does not exist.",
        task: "Correct the working-directory to frontend.",
        broken: `name: Frontend CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
        working-directory: ./missing-folder
      - run: npm run build
        working-directory: ./missing-folder`,
        solution: `name: Frontend CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
        working-directory: frontend
      - run: npm run build
        working-directory: frontend`,
        checks: ["Both working-directory values must be frontend.", "Node version must remain 22.", "Checkout and setup-node steps must remain."],
        commands: ["git ls-tree --name-only HEAD", "git diff -- .github/workflows", "Review Actions workflow run logs"],
        expected: "Both npm commands execute from the existing frontend directory."
      },
      {
        id: "CD-06", title: "Helm values override uses the wrong replica key",
        incident: "A Helm deployment ignores the intended replica count because the values key does not match the chart.",
        task: "Correct replicaCount to 3.",
        broken: `replicas: 3
image:
  repository: registry.example.com/orders
  tag: "2.4.0"
service:
  port: 8080`,
        solution: `replicaCount: 3
image:
  repository: registry.example.com/orders
  tag: "2.4.0"
service:
  port: 8080`,
        checks: ["Key must be replicaCount.", "Value must be 3.", "Image repository and tag must remain unchanged."],
        commands: ["helm lint ./orders-chart", "helm template orders ./orders-chart -f values.yaml", "helm upgrade --install orders ./orders-chart -f values.yaml --dry-run"],
        expected: "The rendered chart receives replicaCount=3."
      },
      {
        id: "CD-07", title: "GitOps application watches the wrong branch",
        incident: "New production manifests are merged into main, but the GitOps controller keeps reconciling another branch.",
        task: "Change the GitOps target revision to main.",
        broken: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: storefront
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/example/storefront.git
    targetRevision: develop
    path: deploy/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
        solution: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: storefront
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/example/storefront.git
    targetRevision: main
    path: deploy/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
        checks: ["targetRevision must be main.", "Repository URL must remain unchanged.", "Destination namespace must remain production."],
        commands: ["kubectl get application storefront -n argocd -o yaml", "argocd app get storefront", "argocd app diff storefront", "argocd app sync storefront"],
        expected: "The Application tracks the main branch and the production manifest path."
      },
      {
        id: "CD-08", title: "GitOps sync path points to the wrong directory",
        incident: "The GitOps application cannot find Kubernetes manifests because the configured path is incorrect.",
        task: "Correct the source path to deploy/k8s.",
        broken: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: inventory
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/example/inventory.git
    targetRevision: main
    path: deploy/missing
  destination:
    server: https://kubernetes.default.svc
    namespace: inventory`,
        solution: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: inventory
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/example/inventory.git
    targetRevision: main
    path: deploy/k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: inventory`,
        checks: ["Source path must be deploy/k8s.", "Target revision must remain main.", "Destination namespace must remain inventory."],
        commands: ["find . -maxdepth 3 -type f", "argocd app get inventory", "argocd app diff inventory", "argocd app sync inventory"],
        expected: "The GitOps Application points to the directory containing the Kubernetes manifests."
      }
    ]
  }
];

const normalize = (value: string) =>
  value.replace(/\r\n/g, "\n").trim().replace(/[ \t]+$/gm, "");

export default function PracticalLabsPage() {
  const [labIndex, setLabIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [code, setCode] = useState(labs[0].exercises[0].broken);
  const [completed, setCompleted] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "failed">("idle");

  const lab = labs[labIndex];
  const exercise = lab.exercises[exerciseIndex];
  const total = labs.reduce((sum, item) => sum + item.exercises.length, 0);
  const progress = Math.round((completed.length / total) * 100);

  const selectExercise = (li: number, ei: number) => {
    setLabIndex(li);
    setExerciseIndex(ei);
    setCode(labs[li].exercises[ei].broken);
    setShowHint(false);
    setResult("idle");
  };

  const checkSolution = () => {
    if (normalize(code) === normalize(exercise.solution)) {
      setResult("success");
      setCompleted((previous) =>
        previous.includes(exercise.id) ? previous : [...previous, exercise.id]
      );
    } else {
      setResult("failed");
    }
  };

  const resetExercise = () => {
    setCode(exercise.broken);
    setResult("idle");
    setShowHint(false);
  };

  const loadNext = () => {
    if (exerciseIndex < lab.exercises.length - 1) {
      selectExercise(labIndex, exerciseIndex + 1);
      return;
    }
    if (labIndex < labs.length - 1) {
      selectExercise(labIndex + 1, 0);
    }
  };

  const allExercises = useMemo(
    () => labs.flatMap((item, li) =>
      item.exercises.map((entry, ei) => ({ ...entry, li, ei, labName: item.name }))
    ),
    []
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            DevMavox · Hands-on workspace
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            YAML Practical Labs
          </h1>
          <p className="mt-3 max-w-3xl text-slate-400">
            Reproduce configuration failures, investigate the evidence, repair the YAML,
            validate your changes and verify the expected outcome.
          </p>
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-semibold">Practice progress</span>
              <span className="text-sm text-cyan-300">{completed.length} / {total} completed</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">{progress}% of all practical exercises verified.</p>
          </div>
        </header>

        <div className="grid gap-3 md:grid-cols-3">
          {labs.map((item, index) => (
            <button
              key={item.name}
              onClick={() => selectExercise(index, 0)}
              className={`rounded-xl border p-4 text-left transition ${
                labIndex === index
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-slate-800 bg-slate-900 hover:border-slate-600"
              }`}
            >
              <span className="text-xs font-bold text-cyan-300">LAB 0{index + 4}</span>
              <h2 className="mt-2 font-semibold">{item.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              <p className="mt-3 text-xs text-slate-500">
                {item.exercises.filter((entry) => completed.includes(entry.id)).length} / {item.exercises.length} verified
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="font-semibold">Exercise list</h2>
            <p className="mt-1 text-xs text-slate-500">{lab.name}</p>
            <div className="mt-4 space-y-2">
              {lab.exercises.map((entry, index) => (
                <button
                  key={entry.id}
                  onClick={() => selectExercise(labIndex, index)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left ${
                    exerciseIndex === index
                      ? "border-cyan-500/70 bg-cyan-500/10"
                      : "border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  <span className="mt-0.5 text-xs font-bold text-cyan-300">{entry.id}</span>
                  <span className="min-w-0 flex-1 text-sm">{entry.title}</span>
                  {completed.includes(entry.id) && <span className="text-emerald-400">✓</span>}
                </button>
              ))}
            </div>
            <div className="mt-6 border-t border-slate-800 pt-4">
              <h3 className="text-sm font-semibold">All lab completion</h3>
              <div className="mt-3 space-y-2">
                {allExercises.map((entry) => (
                  <div key={entry.id} className="flex justify-between gap-2 text-xs text-slate-500">
                    <span>{entry.id}</span>
                    <span className={completed.includes(entry.id) ? "text-emerald-400" : ""}>
                      {completed.includes(entry.id) ? "Verified" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="min-w-0 space-y-5">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-wider text-cyan-300">{exercise.id}</span>
                <span className="text-xs text-slate-500">Scenario {exerciseIndex + 1} of {lab.exercises.length}</span>
              </div>
              <h2 className="mt-2 text-xl font-bold">{exercise.title}</h2>
              <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Production incident</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.incident}</p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Your task</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.task}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">1. Broken configuration</h3>
                  <p className="mt-1 text-xs text-slate-500">Inspect the failure before changing the file.</p>
                </div>
                <button onClick={resetExercise} className="rounded-lg border border-slate-700 px-3 py-2 text-xs hover:bg-slate-800">
                  Reset exercise
                </button>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-rose-200">
                {exercise.broken}
              </pre>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div>
                <h3 className="font-semibold">2. Investigate and practice the repair</h3>
                <p className="mt-1 text-xs text-slate-500">Edit the broken configuration below. The checker compares your result with the exercise target.</p>
              </div>
              <textarea
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setResult("idle");
                }}
                spellCheck={false}
                className="mt-4 min-h-[360px] w-full resize-y rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs leading-6 text-emerald-200 outline-none focus:border-cyan-400"
                aria-label="Editable YAML configuration"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={checkSolution} className="rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-300">
                  Check my fix
                </button>
                <button onClick={() => setShowHint((value) => !value)} className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm hover:bg-slate-800">
                  {showHint ? "Hide validation checklist" : "Show validation checklist"}
                </button>
                <button onClick={() => { setCode(exercise.solution); setResult("idle"); }} className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm hover:bg-slate-800">
                  Load reference fix
                </button>
              </div>

              {showHint && (
                <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950 p-4">
                  <h4 className="text-sm font-semibold">Validation checklist</h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                    {exercise.checks.map((check) => <li key={check}>{check}</li>)}
                  </ul>
                </div>
              )}

              {result === "success" && (
                <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4">
                  <p className="font-semibold text-emerald-300">Fix verified in this exercise!</p>
                  <p className="mt-2 text-sm text-slate-300">{exercise.expected}</p>
                  <p className="mt-2 text-xs text-slate-400">This is a local exercise check. Run the commands below against your own lab cluster or CI environment for real execution.</p>
                </div>
              )}
              {result === "failed" && (
                <div className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-4">
                  <p className="font-semibold text-rose-300">The configuration does not match the expected repair yet.</p>
                  <p className="mt-1 text-sm text-slate-300">Review the task and validation checklist. Check names, values, indentation and the exact location of each field.</p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="font-semibold">3. Run investigation and verification commands</h3>
              <p className="mt-1 text-xs text-slate-500">Use these commands in your own terminal or connected practice environment.</p>
              <ol className="mt-4 space-y-2">
                {exercise.commands.map((command, index) => (
                  <li key={command} className="flex items-start gap-3 rounded-lg bg-slate-950 p-3">
                    <span className="text-xs text-cyan-300">{index + 1}.</span>
                    <code className="min-w-0 flex-1 break-all text-xs text-slate-200">{command}</code>
                    <button
                      onClick={() => navigator.clipboard?.writeText(command)}
                      className="shrink-0 text-xs text-cyan-300 hover:text-cyan-100"
                    >
                      Copy
                    </button>
                  </li>
                ))}
              </ol>
              <div className="mt-4 rounded-lg border border-slate-700 p-4">
                <h4 className="text-sm font-semibold">Expected verification result</h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">{exercise.expected}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-3">
              <button
                onClick={() => selectExercise(labIndex, Math.max(0, exerciseIndex - 1))}
                disabled={labIndex === 0 && exerciseIndex === 0}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm disabled:opacity-30"
              >
                Previous exercise
              </button>
              <button
                onClick={loadNext}
                disabled={labIndex === labs.length - 1 && exerciseIndex === lab.exercises.length - 1}
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-30"
              >
                Next exercise
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}