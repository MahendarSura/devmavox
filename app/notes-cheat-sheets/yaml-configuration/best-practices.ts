const data = {
  title: "Configuration Best Practices",
  description: "Apply reliable YAML and infrastructure configuration practices to reduce deployment errors, improve security and make DevOps files easier to maintain.",
  sections: [
    {
      heading: "1. YAML Quality and Validation",
      explanation: "Consistent YAML structure makes configuration easier to review and maintain. Validate files before deploying them, use meaningful names and avoid unnecessary duplication.",
      steps: [
        "Use spaces instead of tabs.",
        "Keep indentation consistent.",
        "Quote strings when necessary.",
        "Use descriptive resource and variable names.",
        "Validate YAML in CI before deployment.",
        "Review configuration changes through pull requests."
      ],
      commands: "yamllint deployment.yaml\nkubectl apply --dry-run=client -f deployment.yaml\ndocker compose config",
      config: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web-app\n  labels:\n    app: web-app\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: web-app\n  template:\n    metadata:\n      labels:\n        app: web-app\n    spec:\n      containers:\n        - name: web\n          image: nginx:1.27",
      problems: [
        { issue: "Different environments use inconsistent configuration.", solution: "Use clearly separated environment values, overlays or templates and review differences before deployment." },
        { issue: "Configuration contains duplicated values.", solution: "Use reusable templates, variables or shared configuration where supported." }
      ]
    },
    {
      heading: "2. Secrets and Security",
      explanation: "Passwords, API tokens, private keys and cloud credentials must not be committed to Git or placed directly in public configuration files. Use a dedicated secret manager or platform secret facility.",
      steps: [
        "Identify sensitive values in configuration.",
        "Move secrets to an approved secret store.",
        "Reference secrets securely during deployment.",
        "Restrict access using least-privilege permissions.",
        "Rotate credentials when exposure is suspected.",
        "Scan repositories and pipeline logs for accidental leaks."
      ],
      commands: "git grep -n -I -E 'password|secret|token|access_key' -- . ':!*.lock'\ngit status",
      config: "apiVersion: v1\nkind: Pod\nmetadata:\n  name: secure-app\nspec:\n  containers:\n    - name: app\n      image: nginx:1.27\n      env:\n        - name: API_TOKEN\n          valueFrom:\n            secretKeyRef:\n              name: app-secrets\n              key: api-token",
      problems: [
        { issue: "A secret was committed to Git.", solution: "Revoke or rotate the exposed credential immediately. Remove it from active configuration and follow repository history cleanup procedures if required." },
        { issue: "Application cannot read a secret.", solution: "Check secret name, key, namespace, permissions and how the application consumes the environment variable or mounted file." }
      ]
    },
    {
      heading: "3. Version Control and Change Management",
      explanation: "Configuration should be version-controlled so teams can review changes, identify who changed a setting and recover earlier versions. Infrastructure changes should be reviewed before they are applied.",
      steps: [
        "Store configuration in the appropriate Git repository.",
        "Use branches for proposed changes.",
        "Review configuration through pull requests.",
        "Run automated validation and security checks.",
        "Review Terraform plans or deployment diffs.",
        "Merge only approved changes and monitor the result."
      ],
      commands: "git status\ngit diff\ngit add .\ngit commit -m \"Update deployment configuration\"\ngit push origin feature/config-update",
      config: "terraform fmt -check\nterraform validate\nterraform plan -out=tfplan\n# Review the plan before applying\nterraform apply tfplan",
      problems: [
        { issue: "A configuration change causes an outage.", solution: "Use Git history to identify the change, restore a known-good configuration and follow the team's rollback procedure." },
        { issue: "Two engineers overwrite each other's changes.", solution: "Use branches, pull requests and conflict resolution instead of editing the same shared configuration without coordination." }
      ]
    }
  ]
};
export default data;
