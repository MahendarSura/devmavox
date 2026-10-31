const data = {
  title: "CI/CD and Rollback",
  description: "Understand a release pipeline from source control to production and learn safe rollback strategies for failed application deployments.",
  sections: [
    {
      heading: "1. End-to-End CI/CD Pipeline",
      explanation: "A CI/CD pipeline automates checkout, build, test, packaging, publishing and deployment. Each stage should fail safely when validation does not pass.",
      steps: [
        "Developer pushes a reviewed code change.",
        "CI system checks out the repository.",
        "Dependencies are installed.",
        "Build and automated tests run.",
        "Security and quality checks execute.",
        "A versioned artifact or Docker image is created.",
        "The artifact is published to a registry.",
        "The release is deployed and verified."
      ],
      commands: "git push origin main\ndocker build -t myapp:v1 .\ndocker tag myapp:v1 REGISTRY/myapp:v1\ndocker push REGISTRY/myapp:v1",
      config: "name: Application CI\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run build\n      - run: npm test",
      problems: [
        { issue: "Pipeline passes tests but deployment fails.", solution: "Check deployment credentials, environment configuration, artifact access and target platform health." },
        { issue: "Pipeline publishes an incorrect image.", solution: "Use commit-based or release-based tags and verify the artifact before deployment." }
      ]
    },
    {
      heading: "2. Kubernetes Rollback",
      explanation: "Kubernetes Deployments maintain rollout history when revisions are recorded. An engineer can inspect the history and undo a failed rollout. Rollback of application Pods does not automatically reverse database changes or external configuration changes.",
      steps: [
        "Identify the failed Deployment and release.",
        "Inspect rollout status and recent events.",
        "Review the Deployment revision history.",
        "Confirm the previous image and configuration are still valid.",
        "Run the rollback command if appropriate.",
        "Verify that Pods become Ready and traffic works.",
        "Investigate the original failure separately."
      ],
      commands: "kubectl rollout status deployment/myapp\nkubectl rollout history deployment/myapp\nkubectl rollout history deployment/myapp --revision=2\nkubectl rollout undo deployment/myapp\nkubectl get pods\nkubectl rollout status deployment/myapp",
      config: "spec:\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0",
      problems: [
        { issue: "Previous revision is not available.", solution: "Check rollout history and deployment revision settings. Redeploy a verified previous image and configuration if necessary." },
        { issue: "Rollback succeeds but application still fails.", solution: "Check database migrations, external dependencies, secrets and configuration changes that are not part of the Deployment revision." }
      ]
    },
    {
      heading: "3. Safe Rollback and Release Recovery",
      explanation: "A safe rollback requires a known-good artifact, compatible configuration and a clear decision process. For databases, prefer backward-compatible migrations because application rollback cannot always reverse schema changes.",
      steps: [
        "Define rollback triggers such as sustained errors or failed health checks.",
        "Identify the last known-good application artifact.",
        "Confirm database and configuration compatibility.",
        "Stop further rollout if the release is unsafe.",
        "Restore the known-good version using the platform's release procedure.",
        "Verify user-facing functionality and operational metrics.",
        "Record the incident and prevent recurrence."
      ],
      commands: "kubectl rollout undo deployment/myapp\nkubectl rollout status deployment/myapp\nkubectl get pods -l app=myapp\nkubectl logs deployment/myapp --tail=100",
      config: "Release recovery plan:\n1. Detect release failure\n2. Stop further rollout\n3. Select known-good artifact\n4. Restore compatible configuration\n5. Roll back application version\n6. Verify health and traffic\n7. Record incident and follow-up actions",
      problems: [
        { issue: "Database schema is incompatible with the old application.", solution: "Use backward-compatible expand-and-contract migrations and coordinate application and database recovery." },
        { issue: "Rollback image has been deleted.", solution: "Retain release artifacts according to policy and verify that the previous image is available before deployment." },
        { issue: "The same bad release is redeployed automatically.", solution: "Fix pipeline triggers and release controls, and require successful validation before promotion." }
      ]
    }
  ]
};
export default data;
