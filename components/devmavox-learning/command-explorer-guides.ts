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

const topicAliases: Record<string,string> = {
  "EC2 instance commands":"aws ec2 describe-instances --region <region>",
  "Auto Scaling commands":"aws autoscaling describe-auto-scaling-groups --region <region>",
  "ELB and Target Group commands":"aws elbv2 describe-target-groups --region <region>",
  "EKS cluster commands":"aws eks list-clusters --region <region>",
  "ECR repository commands":"aws ecr describe-repositories --region <region>",
  "ECS service commands":"aws ecs list-services --cluster <cluster> --region <region>",
  "S3 bucket commands":"aws s3api list-buckets",
  "EBS volume commands":"aws ec2 describe-volumes --region <region>",
  "RDS commands":"aws rds describe-db-instances --region <region>",
  "VPC and subnet commands":"aws ec2 describe-vpcs --region <region>",
  "Security Group commands":"aws ec2 describe-security-groups --region <region>",
  "Route 53 commands":"aws route53 list-hosted-zones",
  "AWS CLI profiles":"aws configure list-profiles",
  "IAM users and roles CLI":"aws iam list-roles",
  "IAM policy inspection":"aws iam list-policies --scope Local",
  "CloudWatch log commands":"aws logs describe-log-groups --region <region>",
  "CloudWatch metrics commands":"aws cloudwatch list-metrics --region <region>",
  "CloudWatch alarms commands":"aws cloudwatch describe-alarms --region <region>",
  "AWS CLI query and output":"aws ec2 describe-instances --query Reservations[].Instances[].InstanceId --output table",
  "AWS CLI pagination and filters":"aws ec2 describe-instances --max-items 20 --region <region>",
  "Nexus repository inspection":"curl -fsS <nexus-url>/service/rest/v1/repositories",
  "Nexus component search":"curl -fsS '<nexus-url>/service/rest/v1/search?repository=<repo>&name=<name>'",
  "Nexus REST API":"curl -fsS <nexus-url>/service/rest/v1/status",
  "Artifact checksum verification":"sha256sum <artifact-file>",
  "Prometheus targets API":"curl -fsS <prometheus-url>/api/v1/targets",
  "Prometheus TSDB commands":"promtool tsdb analyze <prometheus-data-directory>",
  "PromQL selectors":"up{job=\"<job>\"}",
  "PromQL rate and increase":"sum(rate(http_requests_total[5m]))",
  "PromQL aggregation":"sum by (job) (rate(http_requests_total[5m]))",
  "Grafana API dashboards":"curl -fsS <grafana-url>/api/search",
  "Grafana data source API":"curl -fsS <grafana-url>/api/datasources",
  "Alertmanager API":"curl -fsS <alertmanager-url>/api/v2/alerts",
  "SSH config checks":"ssh -G <user>@<host>",
  "PostgreSQL activity queries":"psql -c 'SELECT pid, state, wait_event_type FROM pg_stat_activity;'",
  "Redis memory diagnostics":"redis-cli INFO memory",
  "Tomcat service status":"systemctl status tomcat --no-pager",
  "Tomcat logs":"journalctl -u tomcat -n 100 --no-pager",
  "Tomcat thread dump":"jcmd <java-pid> Thread.print",
  "WAR deployment checks":"curl -fsS -I <application-url>/health",
  "CNI diagnostics":"kubectl get pods -n kube-system -o wide",
  "Jenkins agent diagnostics":"curl -fsS <jenkins-url>/computer/api/json",
  "GitLab CI lint":"glab ci lint .gitlab-ci.yml",
  "GitLab artifacts and trace":"glab job trace <job-id>",
  "Database connection checks":"nc -vz <db-host> <db-port>",
  "Database slow query checks":"Inspect the engine slow-query log with an approved read-only query",
  "HTTP health checks":"curl -fsS -i <health-url>",
  "HTTP status diagnostics":"curl -sS -D - -o /dev/null <url>",
  "TLS certificate checks":"openssl s_client -connect <host>:443 -servername <host>"
};
const topicArgs: Record<string,string> = {
  pwd:"", ls:"-lah", cd:"<directory>", find:". -maxdepth 2 -type f", locate:"<filename>", tree:"-L 2",
  mkdir:"-p <directory>", touch:"<file>", cp:"<source> <destination>", mv:"<source> <destination>", rm:"-i <file>",
  cat:"<file>", less:"<file>", head:"-n 20 <file>", tail:"-n 100 <file>", grep:"-n '<pattern>' <file>",
  sed:"-n '1,20p' <file>", awk:"'{print $1}' <file>", cut:"-d: -f1 /etc/passwd", sort:"<file>", uniq:"-c",
  wc:"-l <file>", chmod:"644 <file>", chown:"<user>:<group> <path>", sudo:"-l", tar:"-tzf <archive.tar.gz>",
  rsync:"-avhn <source>/ <destination>/", scp:"<file> <user>@<host>:<path>", ssh:"-o BatchMode=yes <user>@<host> true",
  ps:"auxww", top:"-b -n 1", pgrep:"-a <process>", systemctl:"status <service> --no-pager", journalctl:"-n 100 --no-pager",
  df:"-hT", du:"-sh <path>", lsblk:"-f", free:"-h", vmstat:"1 5", uptime:"", lscpu:"",
  useradd:"-m <user>", usermod:"-aG <group> <user>", passwd:"-S <user>", crontab:"-l",
  "ip addr":"show", "ip link":"show", "ip route":"show", ss:"-lntup", ping:"-c 4 <host>",
  traceroute:"<host>", tcpdump:"-ni <interface> -c 20", nc:"-vz <host> <port>", curl:"-sS -D - -o /dev/null <url>",
  dig:"<name>", nslookup:"<name>", host:"<name>", "openssl s_client":"-connect <host>:443 -servername <host>",
  "git clone":"<repository-url>", "git status":"--short --branch", "git add":"-p", "git commit":"--dry-run",
  "git push":"--dry-run", "git pull":"--ff-only", "git fetch":"--all --prune", "git log":"--oneline --decorate -10",
  "git diff":"--stat", "git branch":"-avv", "git switch":"<branch>", "git merge":"--no-commit --no-ff <branch>",
  "git tag":"--list", "git stash":"list", "git remote":"-v", "git restore":"--staged <path>",
  "docker pull":"<image:tag>", "docker build":"-t <image:tag> .", "docker images":"--digests", "docker ps":"-a",
  "docker run":"--rm --name test <image:tag>", "docker exec":"-it <container> sh", "docker logs":"--tail=100 <container>",
  "docker inspect":"<container>", "docker stats":"--no-stream", "docker network":"ls", "docker volume":"ls",
  "kubectl cluster-info":"", "kubectl get nodes":"-o wide", "kubectl get namespaces":"", "kubectl config":"current-context",
  "kubectl get pods":"-A -o wide", "kubectl get deployments":"-A", "kubectl apply":"--dry-run=server -f <manifest.yaml>",
  "kubectl describe":"pod/<name> -n <namespace>", "kubectl logs":"pod/<name> -n <namespace> --all-containers --tail=100",
  "kubectl events":"-n <namespace> --sort-by=.lastTimestamp", "kubectl top":"pods -A",
  "terraform init":"-backend=false", "terraform fmt":"-check -recursive", "terraform validate":"",
  "terraform plan":"", "terraform output":"", "terraform state":"list", "terraform workspace":"show",
  "ansible":"all -i <inventory> -m ping", "ansible-inventory":"-i <inventory> --graph",
  "ansible-playbook":"-i <inventory> <playbook.yml> --syntax-check",
  "helm lint":"<chart-directory>", "helm template":"<release> <chart> --namespace <namespace>",
  "helm install":"<release> <chart> --namespace <namespace> --dry-run --debug",
  "helm upgrade":"<release> <chart> --namespace <namespace> --install --dry-run",
  "helm history":"<release> --namespace <namespace>", "argocd app get":"<app>",
  "argocd app diff":"<app>", "argocd app sync":"<app> --dry-run",
  "gh run list":"--limit 10", "gh run view":"<run-id>", "glab pipeline":"list",
  "mvn clean":"", "mvn compile":"", "mvn test":"", "mvn package":"", "mvn dependency:tree":"",
  "gradle build":"--dry-run", "gradle test":"--dry-run", "promtool check config":"<prometheus.yml>",
  "trivy image":"<image:tag>", "trivy fs":".", "checkov":"-d .", "semgrep":"scan --config auto",
  "mysql client":"-h <host> -u <user> -p", "psql":"-h <host> -U <user> -d <database>",
  "pg_isready":"-h <host> -p 5432", "redis-cli ping":"", "redis-cli info":"memory",
  bash:"--version", "bash -x":"<script.sh>", "Get-Process":"| Sort-Object CPU -Descending | Select-Object -First 10",
  "Get-Service":"", "Get-ChildItem":"-Force", "Get-Content":"<file> -Tail 100",
  "Test-NetConnection":"<host> -Port <port>", "Invoke-WebRequest":"-Uri <url> -Method Head",
  "java -version":"", javac:"-version", jps:"-lv", jcmd:"<pid> VM.version",
  "crictl ps":"-a", "crictl pods":"-a", "crictl images":"", "crictl logs":"<container-id>",
  "ctr containers":"list", "ctr images":"list", "kubeadm certs":"check-expiration"
};
function inferSeed(topic: string, category: string, subcategory: string): GuideSeed {
  const categoryKey = category.toLowerCase();
  const alias = topicAliases[topic];
  const raw = alias || topic;
  const first = raw.trim().split(/\s+/)[0] || "help";
  const categoryDefaults: Record<string,string> = {
    "linux":"ls", "linux administration":"systemctl", "networking":"ip", "git":"git",
    "docker":"docker", "kubernetes":"kubectl", "aws cli":"aws", "terraform":"terraform",
    "ansible":"ansible-playbook", "helm and argo cd":"helm", "ci/cd platforms":"gh",
    "build and artifact tools":"mvn", "monitoring and observability":"promtool",
    "devsecops and security":"trivy", "databases and caching":"psql",
    "scripting and automation":"bash", "java and tomcat":"java",
    "container runtime and platform tools":"crictl"
  };
  const knownExecutables = /^(pwd|ls|cd|find|locate|tree|mkdir|touch|cp|mv|rm|ln|readlink|file|stat|cat|less|head|tail|grep|egrep|sed|awk|cut|sort|uniq|wc|tr|xargs|tee|diff|cmp|chmod|chown|chgrp|umask|getfacl|setfacl|namei|id|groups|sudo|tar|gzip|gunzip|zip|unzip|rsync|scp|sftp|ssh|sha256sum|ps|top|htop|pgrep|pkill|kill|killall|nice|renice|systemctl|service|journalctl|df|du|lsblk|blkid|mount|umount|free|vmstat|iostat|iotop|uptime|nproc|lscpu|dmesg|useradd|usermod|userdel|passwd|chage|getent|apt|apt-cache|dpkg|yum|dnf|rpm|crontab|at|timedatectl|ip|ss|netstat|ethtool|nmcli|route|arp|ping|traceroute|tracepath|mtr|tcpdump|tshark|nc|nmap|telnet|curl|wget|dig|nslookup|host|resolvectl|openssl|git|docker|kubectl|aws|terraform|ansible|ansible-playbook|ansible-inventory|ansible-doc|ansible-config|ansible-vault|ansible-galaxy|ansible-pull|ansible-lint|ansible-navigator|helm|argocd|jenkins|gh|glab|mvn|gradle|promtool|grafana-cli|amtool|trivy|grype|syft|checkov|tfsec|snyk|sonar-scanner|gitleaks|git-secrets|semgrep|cosign|mysql|mysqldump|mysqladmin|psql|pg_dump|pg_restore|pg_isready|redis-cli|bash|sh|source|export|env|printenv|read|getopts|trap|timeout|Get-Process|Get-Service|Get-ChildItem|Get-Content|Select-String|Test-NetConnection|Invoke-WebRequest|Invoke-RestMethod|Get-Command|Get-Help|python|pip|jq|yq|java|javac|jar|jps|jcmd|jstack|jmap|jstat|jinfo|catalina.sh|startup.sh|shutdown.sh|version.sh|crictl|ctr|kubeadm|kubelet)$/i;
  let base = alias ? first : (knownExecutables.test(topic) ? topic : (categoryDefaults[categoryKey] || first));
  let args = topicArgs[topic] ?? (alias ? raw.slice(first.length).trim() : (base === topic ? "" : "--help"));
  if (!alias && topic.toLowerCase().startsWith(base.toLowerCase() + " ")) args = topic.slice(base.length).trim() || args;
  if (topic.startsWith("git ")) { base="git"; args=topic.slice(4)+(topicArgs[topic] ? " "+topicArgs[topic] : " --help"); }
  else if (topic.startsWith("docker ")) { base="docker"; args=topic.slice(7)+(topicArgs[topic] ? " "+topicArgs[topic] : " --help"); }
  else if (topic.startsWith("kubectl ")) { base="kubectl"; args=topic.slice(8)+(topicArgs[topic] ? " "+topicArgs[topic] : " --help"); }
  else if (topic.startsWith("terraform ")) { base="terraform"; args=topic.slice(10)+(topicArgs[topic] ? " "+topicArgs[topic] : " --help"); }
  else if (topic.startsWith("helm ")) { base="helm"; args=topic.slice(5)+(topicArgs[topic] ? " "+topicArgs[topic] : " --help"); }
  else if (topic.startsWith("argocd ")) { base="argocd"; args=topic.slice(7)+(topicArgs[topic] ? " "+topicArgs[topic] : " --help"); }
  else if (topic.startsWith("mvn ")) { base="mvn"; args=topic.slice(4); }
  else if (topic.startsWith("gradle ")) { base="gradle"; args=topic.slice(7); }
  else if (topic.startsWith("ip ")) { base="ip"; args=topic.slice(3)+" "+(topicArgs[topic] || "show"); }
  if (!args && base !== "pwd") args="--help";
  const purpose = categoryKey.includes("linux") ? "Use "+topic+" to inspect or manage Linux files, processes, services, storage, permissions or system configuration."
    : categoryKey.includes("network") ? "Use "+topic+" to diagnose network interfaces, routing, connectivity, DNS, TLS, HTTP or packet behavior."
    : categoryKey.includes("git") ? "Use "+topic+" to inspect or manage repository state, history, branches and collaboration safely."
    : categoryKey.includes("docker") ? "Use "+topic+" to inspect or manage Docker images, containers, networks, volumes, builds or registries."
    : categoryKey.includes("kubernetes") ? "Use "+topic+" to inspect or manage Kubernetes resources, workloads, scheduling, networking or configuration."
    : categoryKey.includes("aws") ? "Use "+topic+" to query AWS resources. Confirm the active account, role, profile and region before use."
    : categoryKey.includes("terraform") ? "Use "+topic+" to validate, plan, inspect or manage Terraform configuration, providers, modules and state."
    : categoryKey.includes("ansible") ? "Use "+topic+" to inspect inventory, validate automation or troubleshoot controlled Ansible execution."
    : categoryKey.includes("helm") ? "Use "+topic+" to inspect Helm releases/charts or Argo CD GitOps application state."
    : categoryKey.includes("ci/cd") ? "Use "+topic+" to inspect CI/CD authentication, pipelines, jobs, agents, logs and deployments."
    : categoryKey.includes("build") ? "Use "+topic+" to build, test, resolve dependencies or verify application artifacts."
    : categoryKey.includes("monitoring") ? "Use "+topic+" to validate monitoring, query metrics, inspect alerts or diagnose service health."
    : categoryKey.includes("security") ? "Use "+topic+" to inspect credentials, certificates, vulnerabilities or software supply-chain security."
    : categoryKey.includes("database") ? "Use "+topic+" to inspect database connectivity, sessions, backups, queries or cache behavior."
    : categoryKey.includes("scripting") ? "Use "+topic+" to write, validate, debug or automate repeatable DevOps tasks."
    : categoryKey.includes("java") ? "Use "+topic+" to inspect Java runtime, JVM diagnostics, Tomcat services, logs or deployments."
    : "Use "+topic+" to inspect container runtime, CRI, kubelet or Kubernetes node health.";
  const safety = categoryKey.includes("git") ? "Check git status and preserve uncommitted work. Back up before reset, clean, rebase or force-push."
    : categoryKey.includes("aws") ? "Verify aws sts get-caller-identity, profile and region. Never expose access keys or session tokens."
    : categoryKey.includes("kubernetes") || categoryKey.includes("container runtime") ? "Verify kubectl current-context, namespace and target. Start read-only; review impact before changing live resources."
    : categoryKey.includes("terraform") ? "Confirm workspace, backend and state lock. Review a saved plan before apply; avoid destroy or force-unlock without approval."
    : categoryKey.includes("database") ? "Use least-privilege credentials and read-only queries for diagnosis. Verify host and database; avoid production writes."
    : "Confirm host, identity, working directory and target. Prefer read-only inspection and use a disposable lab for changes.";
  const nextByCategory: Record<string,string[]> = {
    "linux":["stat <path>","find <path> -maxdepth 2 -type f","journalctl -n 50 --no-pager"],
    "linux administration":["systemctl status <service> --no-pager","journalctl -u <service> -n 100 --no-pager","df -hT"],
    "networking":["ip route","ss -lntup","dig <hostname>"],
    "git":["git status --short --branch","git diff","git log --oneline --decorate -10"],
    "docker":["docker ps -a","docker inspect <container>","docker logs --tail=100 <container>"],
    "kubernetes":["kubectl get events -A --sort-by=.lastTimestamp","kubectl describe <resource> <name> -n <namespace>","kubectl logs <pod> -n <namespace> --all-containers"],
    "aws cli":["aws sts get-caller-identity","aws configure list","aws <service> help"],
    "terraform":["terraform workspace show","terraform validate","terraform plan"],
    "ansible":["ansible-inventory -i <inventory> --graph","ansible-playbook -i <inventory> <playbook> --syntax-check","ansible all -i <inventory> -m ping"],
    "helm and argo cd":["helm list -A","helm history <release> -n <namespace>","argocd app get <application>"],
    "ci/cd platforms":["gh run list --limit 10","glab pipeline list","curl -fsS <jenkins-url>/api/json"],
    "build and artifact tools":["mvn -version","gradle --version","sha256sum <artifact>"],
    "monitoring and observability":["curl -fsS <prometheus-url>/-/ready","curl -fsS <alertmanager-url>/api/v2/alerts","journalctl -p warning -n 100 --no-pager"],
    "devsecops and security":["ssh -G <user>@<host>","openssl x509 -in <certificate> -noout -dates","trivy image <image:tag>"],
    "databases and caching":["nc -vz <database-host> <port>","psql -c 'SELECT 1;'","redis-cli PING"],
    "scripting and automation":["bash -n <script.sh>","python -m py_compile <script.py>","jq . <file.json>"],
    "java and tomcat":["java -version","jcmd <pid> VM.version","journalctl -u tomcat -n 100 --no-pager"],
    "container runtime and platform tools":["crictl ps -a","crictl pods -a","journalctl -u kubelet -n 100 --no-pager"]
  };
  return { base, args, purpose, example:base+(args ? " "+args : ""),
    output:"Example workflow for "+topic+": run the command against the intended target, capture standard output and standard error, record the exit code, then compare returned resource identifiers and status fields with the expected state. This is illustrative guidance only; exact output depends on tool version, permissions and environment. No live system was queried.",
    next:nextByCategory[categoryKey] || ["<tool> --help","<tool> --version"], safety, level:"Intermediate" };
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
