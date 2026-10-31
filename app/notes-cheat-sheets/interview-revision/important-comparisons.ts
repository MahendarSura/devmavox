const data = {
  title: "Important DevOps Comparisons",
  description: "Understand frequently confused DevOps concepts. These comparisons explain the purpose, differences and practical situations in which each option is used.",
  sections: [
    {
      heading: "1. Git and CI/CD Comparisons",
      explanation: "Git, GitHub, Jenkins and GitHub Actions have different responsibilities. Git manages version history, GitHub hosts repositories and collaboration, while CI/CD tools automate validation and delivery.",
      steps: [
        "Git vs GitHub: Git is version control software; GitHub is a hosted collaboration platform.",
        "git fetch vs git pull: Fetch downloads remote updates; pull also integrates them.",
        "merge vs rebase: Merge combines histories; rebase replays commits onto another base.",
        "Continuous Delivery vs Continuous Deployment: Delivery keeps releases ready for approval; deployment automatically releases validated changes.",
        "CI vs CD: CI focuses on integration and validation; CD focuses on release and deployment."
      ],
      commands: "git fetch origin\ngit pull origin main\ngit merge feature\ngit rebase main\ngit log --oneline --graph",
      config: "Example pipeline stages:\nCheckout -> Build -> Test -> Package\n-> Approval (optional) -> Deploy\n-> Verify -> Monitor",
      problems: [
        { issue: "When should a team avoid rebasing shared commits?", solution: "Avoid rewriting commits that others already depend on unless the team has coordinated the history rewrite." },
        { issue: "Should every production deployment be automatic?", solution: "Choose automation and approvals based on risk, testing maturity, compliance and rollback capability." }
      ]
    },
    {
      heading: "2. Docker and Kubernetes Comparisons",
      explanation: "Docker and Kubernetes are related but solve different problems. Docker tools build and run containers; Kubernetes orchestrates workloads across a cluster.",
      steps: [
        "Image vs container: An image is a template; a container is a running instance.",
        "Container vs Pod: A container runs a process; a Pod is Kubernetes' deployable unit.",
        "Deployment vs StatefulSet: Deployment suits stateless replicas; StatefulSet provides stable identities and ordered behavior for stateful workloads.",
        "ConfigMap vs Secret: ConfigMap stores non-sensitive configuration; Secret is intended for sensitive values but still requires proper access controls.",
        "ClusterIP vs NodePort vs LoadBalancer: These Service types provide different network exposure patterns."
      ],
      commands: "docker images\ndocker ps -a\nkubectl get pods\nkubectl get deployments\nkubectl get statefulsets\nkubectl get services",
      config: "Service types:\nClusterIP: Internal cluster access\nNodePort: Exposes a port on cluster nodes\nLoadBalancer: Requests an external load balancer where supported",
      problems: [
        { issue: "A team uses a Deployment for an application needing stable Pod identity.", solution: "Evaluate StatefulSet when stable identities and persistent storage association are required." },
        { issue: "Sensitive values are stored in a ConfigMap.", solution: "Move sensitive data to a Secret or an external secret manager and restrict access." }
      ]
    },
    {
      heading: "3. Terraform and Infrastructure Comparisons",
      explanation: "Infrastructure teams choose tools and state strategies based on scale, collaboration, provider support and operational requirements.",
      steps: [
        "Terraform vs manual provisioning: Terraform records desired infrastructure as code; manual provisioning relies on direct operator actions.",
        "terraform plan vs apply: Plan previews changes; apply executes approved changes.",
        "Variables vs outputs: Variables provide input; outputs expose selected result values.",
        "Local vs remote state: Local state is stored on one machine; remote state supports shared workflows when configured with suitable locking and access control.",
        "Immutable vs mutable infrastructure: Immutable patterns replace instances or artifacts; mutable patterns update existing systems."
      ],
      commands: "terraform init\nterraform validate\nterraform plan\nterraform output\nterraform state list",
      config: "variable \"environment\" {\n  type    = string\n  default = \"dev\"\n}\n\noutput \"environment_name\" {\n  value = var.environment\n}",
      problems: [
        { issue: "Two engineers run Terraform against the same state.", solution: "Use a supported remote backend with state locking and coordinate changes." },
        { issue: "A production resource is unexpectedly planned for deletion.", solution: "Stop before applying. Review the plan, state, configuration and resource lifecycle requirements." }
      ]
    }
  ]
};
export default data;
