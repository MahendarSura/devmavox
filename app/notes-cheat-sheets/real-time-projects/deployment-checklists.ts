const data = {
  title: "Deployment Checklists",
  description: "Use repeatable pre-deployment, deployment and post-deployment checks to reduce release risk and verify that an application is healthy.",
  sections: [
    {
      heading: "1. Pre-Deployment Checklist",
      explanation: "Before releasing, confirm that the artifact, configuration, permissions, dependencies and rollback plan are ready. A successful build alone does not guarantee a safe production deployment.",
      steps: [
        "Confirm the correct source branch and reviewed commit.",
        "Run automated tests and build validation.",
        "Verify the image tag or release artifact.",
        "Check environment variables and secret references.",
        "Review infrastructure and configuration changes.",
        "Confirm database migration compatibility.",
        "Check monitoring, backups and rollback readiness.",
        "Obtain required release approvals."
      ],
      commands: "git status\ngit log -1 --oneline\ndocker image inspect myapp:v1\nkubectl diff -f k8s/\nterraform plan",
      config: "Pre-deployment checklist:\n[ ] Code reviewed\n[ ] Tests passed\n[ ] Artifact version confirmed\n[ ] Secrets verified\n[ ] Configuration reviewed\n[ ] Database changes reviewed\n[ ] Rollback plan ready\n[ ] Approvals completed",
      problems: [
        { issue: "Wrong image tag is selected.", solution: "Confirm the release commit and immutable image tag before deployment." },
        { issue: "Database migration is incompatible.", solution: "Review backward compatibility and use a staged migration strategy where needed." }
      ]
    },
    {
      heading: "2. Deployment Execution Checklist",
      explanation: "During deployment, follow the approved sequence and monitor each stage. Avoid making unrelated changes while a release is in progress.",
      steps: [
        "Announce the deployment and confirm the target environment.",
        "Apply approved configuration changes.",
        "Deploy the versioned application artifact.",
        "Monitor rollout progress.",
        "Verify readiness and service endpoints.",
        "Run smoke tests against the deployed application.",
        "Check logs and metrics for unexpected errors."
      ],
      commands: "kubectl apply -f k8s/\nkubectl rollout status deployment/myapp\nkubectl get pods -l app=myapp\nkubectl get endpoints myapp\ncurl -I https://YOUR-APPLICATION-HOST",
      config: "Rolling update strategy:\nspec:\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0",
      problems: [
        { issue: "Rollout gets stuck.", solution: "Inspect Deployment conditions, Pod events, readiness probes, image access and available resources." },
        { issue: "Smoke test fails.", solution: "Stop further rollout, inspect application logs and route health, then follow the approved rollback or mitigation procedure." }
      ]
    },
    {
      heading: "3. Post-Deployment Checklist",
      explanation: "A release is complete only after the application is verified and operational signals are healthy. Keep evidence of the deployed version and any follow-up work.",
      steps: [
        "Confirm all intended replicas are Ready.",
        "Check application health and key user journeys.",
        "Review error rate and latency.",
        "Verify background jobs and integrations.",
        "Confirm monitoring and alerting are working.",
        "Record release version and deployment time.",
        "Communicate completion and document issues."
      ],
      commands: "kubectl rollout status deployment/myapp\nkubectl get deployment myapp\nkubectl get pods -l app=myapp\nkubectl logs deployment/myapp --tail=100",
      config: "Post-deployment record:\nRelease version: Record actual version\nEnvironment: Record target environment\nDeployment result: Success / Failed\nHealth checks: Record results\nKnown issues: Record outstanding issues\nOwner: Record responsible engineer",
      problems: [
        { issue: "Application is healthy but background jobs fail.", solution: "Verify worker deployments, queues, credentials, schedules and dependency connectivity." },
        { issue: "Errors increase after release.", solution: "Compare release metrics with baseline, inspect logs and decide whether to mitigate or roll back." }
      ]
    }
  ]
};
export default data;
