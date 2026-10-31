const data = {
  title: "Configuration Examples",
  description: "Study practical configuration patterns used in Jenkins, GitHub Actions, Terraform and Kubernetes projects.",
  sections: [
    {
      heading: "1. Jenkinsfile Pipeline",
      explanation: "A Jenkinsfile defines a pipeline as code. Stages divide the delivery process into checkout, build, test, packaging and deployment activities. Credentials should be stored in Jenkins credentials rather than hardcoded.",
      steps: [
        "Create a Jenkinsfile in the repository root.",
        "Configure the Jenkins job to use the repository.",
        "Add checkout, build and test stages.",
        "Store credentials securely in Jenkins.",
        "Run the pipeline and inspect stage logs."
      ],
      commands: "git add Jenkinsfile\ngit commit -m \"Add Jenkins pipeline\"\ngit push origin main",
      config: "pipeline {\n  agent any\n  stages {\n    stage('Checkout') {\n      steps { checkout scm }\n    }\n    stage('Build') {\n      steps { sh 'npm ci && npm run build' }\n    }\n    stage('Test') {\n      steps { sh 'npm test' }\n    }\n  }\n}",
      problems: [
        { issue: "Jenkins cannot find Jenkinsfile.", solution: "Verify the repository root, branch and pipeline script path." },
        { issue: "Pipeline shell command fails.", solution: "Check the agent operating system, installed tools, working directory and command exit status." }
      ]
    },
    {
      heading: "2. GitHub Actions Workflow",
      explanation: "GitHub Actions uses workflow YAML files stored under .github/workflows. Events such as push and pull_request trigger jobs. Jobs run on configured runners and contain individual steps.",
      steps: [
        "Create the .github/workflows directory.",
        "Create a workflow YAML file.",
        "Choose the trigger events and runner.",
        "Check out the repository.",
        "Install dependencies and run build or tests.",
        "Review workflow results in the Actions tab."
      ],
      commands: "git add .github/workflows/ci.yml\ngit commit -m \"Add CI workflow\"\ngit push origin main",
      config: "name: Node CI\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run build",
      problems: [
        { issue: "Workflow does not trigger.", solution: "Check workflow file location, YAML syntax, branch filters and event configuration." },
        { issue: "Action fails because a secret is missing.", solution: "Add the required repository or environment secret and reference it through the secrets context." }
      ]
    },
    {
      heading: "3. Terraform HCL Configuration",
      explanation: "Terraform uses HashiCorp Configuration Language (HCL) to define infrastructure resources. Providers connect Terraform to platforms such as AWS. State records the resources Terraform manages.",
      steps: [
        "Declare the required Terraform provider.",
        "Configure provider settings and credentials.",
        "Define resources and input variables.",
        "Initialize the working directory.",
        "Format and validate configuration.",
        "Review the execution plan before applying changes."
      ],
      commands: "terraform init\nterraform fmt -check\nterraform validate\nterraform plan\nterraform apply",
      config: "terraform {\n  required_providers {\n    aws = {\n      source  = \"hashicorp/aws\"\n      version = \"~> 5.0\"\n    }\n  }\n}\n\nprovider \"aws\" {\n  region = \"ap-south-1\"\n}\n\nresource \"aws_s3_bucket\" \"example\" {\n  bucket = \"replace-with-a-unique-bucket-name\"\n}",
      problems: [
        { issue: "terraform init fails to download provider.", solution: "Check network access, provider source, version constraints and registry availability." },
        { issue: "Terraform plan proposes unexpected changes.", solution: "Inspect state, configuration, provider versions and manually changed infrastructure before applying." },
        { issue: "Credentials are rejected.", solution: "Verify the configured AWS profile, environment credentials and IAM permissions. Do not hardcode access keys." }
      ]
    }
  ]
};
export default data;
