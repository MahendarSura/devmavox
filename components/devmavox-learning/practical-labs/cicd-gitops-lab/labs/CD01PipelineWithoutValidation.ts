export const CD01PipelineWithoutValidation = {
  id: "CD-01",
  title: "Pipeline Without Validation",
  severity: "High",
  businessImpact: "Invalid application manifests can reach production because the pipeline deploys without checking YAML syntax or Kubernetes schema validity.",
  incident: "A CI/CD pipeline builds and deploys an application without validating its Kubernetes manifests.",
  brokenYaml: `stages:
  - build
  - deploy

build:
  stage: build
  script:
    - docker build -t example/app:latest .

deploy:
  stage: deploy
  script:
    - kubectl apply -f deployment.yaml`,
  fixedYaml: `stages:
  - build
  - validate
  - deploy

build:
  stage: build
  script:
    - docker build -t example/app:latest .

validate:
  stage: validate
  script:
    - kubectl apply --dry-run=client -f deployment.yaml

deploy:
  stage: deploy
  script:
    - kubectl apply -f deployment.yaml
  needs:
    - validate`,
  commands: [
    { command: "git status", purpose: "Inspect working tree", output: "Review changed pipeline and manifest files." },
    { command: "cat .gitlab-ci.yml", purpose: "Inspect pipeline stages", output: "Pipeline contains build and deploy stages but no validation stage." },
    { command: "kubectl apply --dry-run=client -f deployment.yaml", purpose: "Validate manifest without applying", output: "Simulated validation step. A real cluster or configured kubectl environment is required for actual validation." },
    { command: "git diff -- .gitlab-ci.yml", purpose: "Review pipeline changes", output: "Confirm validation stage executes before deployment." }
  ],
  rootCause: "The pipeline deploys manifests directly after the build stage. It does not validate YAML or Kubernetes resources before deployment.",
  validation: ["stages:", "validate", "dry-run", "deploy", "needs:"],
  recovery: "Add a validation stage and make deployment depend on successful validation. A real CI runner is required to execute the pipeline.",
  prevention: ["Validate manifests in CI.", "Require successful checks before deployment.", "Protect production deployment environments."],
  assessment: ["Identify the missing validation stage.", "Add validation before deployment.", "Set the correct dependency.", "Explain the production safety benefit."]
} as const;