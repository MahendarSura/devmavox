export type CommandGuide = {
  base: string;
  args: string;
  purpose: string;
  when: string;
  flags: { flag: string; meaning: string }[];
  examples: { label: string; command: string }[];
  output: string;
  next: string[];
  task: string;
  verify: string;
  safety: string;
  workflow: string[];
  pitfalls: string[];
  level: string;
};

type GuideSeed = {
  base: string;
  args: string;
  purpose: string;
  example: string;
  output: string;
  next: string[];
  safety?: string;
  level?: string;
};

const commonFlags = [
  { flag: "--help", meaning: "Display supported subcommands and options." },
  { flag: "--version", meaning: "Display the installed tool version where supported." },
];

const seeds: Record<string, GuideSeed> = {
  "crashloopbackoff": {
    base: "kubectl",
    args: "get pods -n <namespace> -o wide",
    purpose: "Find restarting Pods and identify the affected workload before changing anything.",
    example: "kubectl get pods -n staging -o wide",
    output: "Pod status, restart count, node placement and age. A high restart count indicates repeated container restarts, not the root cause.",
    next: ["kubectl describe pod <pod> -n <namespace>", "kubectl logs <pod> -n <namespace> --previous", "kubectl get events -n <namespace> --sort-by=.lastTimestamp"],
    safety: "Confirm the current cluster context and namespace. Do not delete or restart Pods before collecting previous-container logs and Events.",
    level: "Production",
  },
  "imagepullbackoff": {
    base: "kubectl",
    args: "describe pod <pod> -n <namespace>",
    purpose: "Inspect image pull failures, registry authentication, image name and tag.",
    example: "kubectl describe pod <pod> -n staging",
    output: "Pod Events commonly identify image-not-found, authorization, rate-limit, DNS or TLS errors.",
    next: ["kubectl get pod <pod> -n <namespace> -o yaml", "kubectl get secret -n <namespace>", "kubectl get events -n <namespace> --sort-by=.lastTimestamp"],
    level: "Production",
  },
  "pod not ready": {
    base: "kubectl",
    args: "describe pod <pod> -n <namespace>",
    purpose: "Investigate readiness probe failures, container state and scheduling conditions.",
    example: "kubectl describe pod <pod> -n staging",
    output: "Conditions, probe failures, container state and recent Events.",
    next: ["kubectl logs <pod> -n <namespace> --all-containers", "kubectl get endpoints -n <namespace>", "kubectl describe deployment <deployment> -n <namespace>"],
    level: "Production",
  },
  "deployment rollback": {
    base: "kubectl",
    args: "rollout history deployment/<name> -n <namespace>",
    purpose: "Review rollout revisions and deployment history before selecting a rollback target.",
    example: "kubectl rollout history deployment/payment-api -n staging",
    output: "Deployment revision history and recorded change causes when available.",
    next: ["kubectl rollout status deployment/<name> -n <namespace>", "kubectl rollout history deployment/<name> -n <namespace> --revision=<revision>", "kubectl get replicasets -n <namespace>"],
    safety: "Rollback changes the live workload. Confirm revision, image, owner approval and impact window before running kubectl rollout undo.",
    level: "Production",
  },
  "docker logs": {
    base: "docker",
    args: "logs --tail=100 --timestamps <container>",
    purpose: "Read recent container output with timestamps to identify startup and runtime failures.",
    example: "docker logs --tail=100 --timestamps web",
    output: "Recent stdout and stderr lines emitted by the container process.",
    next: ["docker inspect <container>", "docker ps -a", "docker stats --no-stream"],
    level: "Intermediate",
  },
  "docker ps": {
    base: "docker",
    args: "ps -a",
    purpose: "List running and stopped containers and inspect their lifecycle state.",
    example: "docker ps -a",
    output: "Container ID, image, command, status, ports and name.",
    next: ["docker logs <container>", "docker inspect <container>", "docker stats --no-stream"],
    level: "Beginner",
  },
  "git status": {
    base: "git",
    args: "status --short --branch",
    purpose: "Inspect the current branch and working-tree changes before source-control operations.",
    example: "git status --short --branch",
    output: "Current branch and concise staged, unstaged and untracked file indicators.",
    next: ["git diff", "git diff --staged", "git log --oneline --decorate -10"],
    level: "Beginner",
  },
  "terraform plan": {
    base: "terraform",
    args: "plan -out=tfplan",
    purpose: "Preview infrastructure changes before applying them.",
    example: "terraform plan -out=tfplan",
    output: "Planned resource additions, changes and destructions.",
    next: ["terraform fmt -check", "terraform validate", "terraform show tfplan"],
    safety: "Review the full plan, workspace, account, backend and state lock. Never apply an unreviewed plan to production.",
    level: "Production",
  },
  "ansible playbook": {
    base: "ansible-playbook",
    args: "--syntax-check site.yml",
    purpose: "Validate playbook syntax before executing automation against hosts.",
    example: "ansible-playbook --syntax-check site.yml",
    output: "Syntax validation result. This does not prove tasks will succeed on target hosts.",
    next: ["ansible-inventory --graph", "ansible-playbook --check site.yml", "ansible-playbook site.yml --limit <test-host>"],
    safety: "Use a test inventory and least-privilege credentials. Check mode is not supported by every Ansible module.",
    level: "Intermediate",
  },
  "helm upgrade": {
    base: "helm",
    args: "diff upgrade <release> <chart> -n <namespace>",
    purpose: "Review the proposed Helm release changes before upgrading.",
    example: "helm diff upgrade web ./chart -n staging",
    output: "A rendered manifest diff showing additions, modifications and removals.",
    next: ["helm lint ./chart", "helm template web ./chart -n staging", "helm history web -n staging"],
    safety: "Confirm release, namespace, values files and rendered diff. A Helm upgrade can change or remove live resources.",
    level: "Production",
  },
  "aws ec2": {
    base: "aws",
    args: "ec2 describe-instances --region <region>",
    purpose: "Inspect EC2 instance state and metadata using the active AWS identity.",
    example: "aws ec2 describe-instances --region ap-south-1",
    output: "Instance IDs, states, types, private addresses and tags.",
    next: ["aws sts get-caller-identity", "aws ec2 describe-instance-status --instance-ids <id> --region <region>", "aws ec2 describe-security-groups --region <region>"],
    safety: "Verify AWS account, role and region first. Prefer read-only IAM permissions during investigation.",
    level: "Intermediate",
  },
  "kubectl get pods": {
    base: "kubectl",
    args: "get pods -A -o wide",
    purpose: "List Pods across namespaces and inspect readiness, restarts and node placement.",
    example: "kubectl get pods -A -o wide",
    output: "Namespace, Pod name, readiness, phase, restart count, age and node.",
    next: ["kubectl describe pod <pod> -n <namespace>", "kubectl logs <pod> -n <namespace> --all-containers", "kubectl get events -A --sort-by=.lastTimestamp"],
    level: "Beginner",
  },
};

function inferSeed(topic: string, category: string, subcategory: string): GuideSeed {
  const value = topic.toLowerCase();
  const categoryName = category.toLowerCase();

  if (categoryName.includes("kubernetes") || value.includes("kubectl") || value.includes("pod") || value.includes("deployment")) {
    return {
      base: "kubectl",
      args: "get pods -n <namespace> -o wide",
      purpose: "Inspect Kubernetes resources and collect evidence before taking corrective action.",
      example: "kubectl get pods -n <namespace> -o wide",
      output: "Kubernetes resource status, readiness, restart counts and placement. Exact columns depend on the selected resource.",
      next: ["kubectl describe <resource> <name> -n <namespace>", "kubectl get events -n <namespace> --sort-by=.lastTimestamp", "kubectl logs <pod> -n <namespace> --all-containers --tail=100"],
      safety: "Check kubectl config current-context and namespace before every operation. Use read-only inspection first.",
      level: "Production",
    };
  }
  if (categoryName.includes("docker") || value.includes("docker") || value.includes("container")) {
    return {
      base: "docker",
      args: "ps -a",
      purpose: "Inspect container lifecycle state and gather runtime evidence.",
      example: "docker ps -a",
      output: "Container IDs, image names, status, ports and names.",
      next: ["docker logs --tail=100 <container>", "docker inspect <container>", "docker stats --no-stream"],
      safety: "Confirm the target container and mounted volumes before stop, remove or prune operations.",
      level: "Intermediate",
    };
  }
  if (categoryName.includes("git") || value.startsWith("git ") || ["commit", "branch", "merge", "rebase", "push", "pull"].some((word) => value.includes(word))) {
    return {
      base: "git",
      args: "status --short --branch",
      purpose: "Inspect repository state and avoid accidental loss of uncommitted work.",
      example: "git status --short --branch",
      output: "Current branch and staged, unstaged or untracked changes.",
      next: ["git diff", "git log --oneline --decorate -10", "git remote -v"],
      safety: "Create a backup branch before reset, clean, rebase or force-push. Never rewrite a shared branch without approval.",
      level: "Intermediate",
    };
  }
  if (categoryName.includes("terraform") || value.includes("terraform")) {
    return {
      base: "terraform",
      args: "plan",
      purpose: "Preview infrastructure changes and inspect the selected workspace and state.",
      example: "terraform plan",
      output: "Planned infrastructure additions, modifications and deletions.",
      next: ["terraform workspace show", "terraform validate", "terraform show"],
      safety: "Confirm account, workspace, backend and state lock. Review every planned change before apply.",
      level: "Production",
    };
  }
  if (categoryName.includes("aws") || value.includes("aws")) {
    return {
      base: "aws",
      args: "sts get-caller-identity",
      purpose: "Confirm the active AWS account and identity before running service commands.",
      example: "aws sts get-caller-identity",
      output: "AWS account ID, caller ARN and user ID for the active credentials.",
      next: ["aws configure list", "aws ec2 describe-regions", "aws help"],
      safety: "Verify account, role and region. Do not expose access keys or session tokens in terminal output.",
      level: "Intermediate",
    };
  }
  if (categoryName.includes("linux")) {
    return {
      base: "journalctl",
      args: "-n 100 --no-pager",
      purpose: "Inspect recent system or service logs during Linux host troubleshooting.",
      example: "journalctl -n 100 --no-pager",
      output: "Recent journal entries with timestamps, service metadata and messages.",
      next: ["systemctl status <service> --no-pager", "journalctl -u <service> -n 100 --no-pager", "df -hT"],
      level: "Intermediate",
    };
  }
  return {
    base: "help",
    args: "",
    purpose: "Identify the installed tool and confirm its supported syntax before using it.",
    example: "<tool> --help",
    output: "Help text from the installed tool. No command is executed by this guide.",
    next: ["<tool> --version", "<tool> --help"],
    safety: "This topic needs version-specific validation. Do not run guessed commands against production systems.",
    level: "Practice",
  };
}

export function buildCommandGuide(
  topic: string,
  category: string,
  subcategory: string,
  existing?: Partial<CommandGuide>,
): CommandGuide {
  const key = topic.toLowerCase();
  const seed = seeds[key] || inferSeed(topic, category, subcategory);
  const base = existing?.base || seed.base;
  const args = existing?.args ?? seed.args;
  const example = existing?.examples?.[0]?.command || seed.example;
  const next = existing?.next || seed.next;

  return {
    base,
    args,
    purpose: existing?.purpose || seed.purpose,
    when: existing?.when || `Use this guide when investigating "${topic}" in the ${category} / ${subcategory} workflow.`,
    flags: existing?.flags || commonFlags,
    examples: existing?.examples || [
      { label: "Operational example", command: example },
      { label: "Show supported options", command: base + " --help" },
    ],
    output: (existing?.output || seed.output) + "\n\nIllustrative output only. Exact values vary by tool version and environment.",
    next,
    task: existing?.task || `In a disposable lab, investigate "${topic}" and record the command, output, exit code and evidence.`,
    verify: existing?.verify || "Verify the target context, expected resource state, command exit code and application-level health independently.",
    safety: existing?.safety || seed.safety || "Start with read-only inspection. Confirm host, identity, context, namespace, region and target before changing state.",
    workflow: existing?.workflow || [
      "Confirm the correct environment, identity and target resource.",
      "Run the read-only inspection command and capture its output.",
      "Inspect logs, events or detailed resource metadata.",
      "Identify the root cause before proposing a change.",
      "Apply one approved, reversible change in a test environment first.",
      "Repeat the original check and verify application health.",
    ],
    pitfalls: existing?.pitfalls || [
      "A successful command exit code does not guarantee application-level health.",
      "Sample resource names and identifiers must be replaced with real values.",
      "Options and output can vary by installed tool version.",
    ],
    level: existing?.level || seed.level || "Intermediate",
  };
}
