import type { GlossaryLearningSection } from "./glossary-data";

const bilingual = (telugu: string, english: string) =>
  `Telugu Answer:\n${telugu}\n\nEnglish Explanation:\n${english}`;

const commandMap: Record<string, string[]> = {
  "Docker": ["docker version", "docker info", "docker ps -a", "docker images"],
  "Kubernetes": ["kubectl get nodes", "kubectl get pods -A", "kubectl describe pod <pod-name>", "kubectl get events -A"],
  "Jenkins": ["systemctl status jenkins", "journalctl -u jenkins -n 100", "curl -I http://localhost:8080"],
  "Git": ["git status", "git log --oneline --graph", "git branch -a", "git diff"],
  "Terraform": ["terraform init", "terraform validate", "terraform plan", "terraform state list"],
  "Ansible": ["ansible --version", "ansible-inventory --list", "ansible all -m ping", "ansible-playbook --syntax-check site.yml"],
  "Linux": ["ps aux", "top", "df -h", "free -m", "journalctl -xe"],
  "Prometheus": ["promtool check config prometheus.yml", "curl http://localhost:9090/-/healthy"],
  "Grafana": ["systemctl status grafana-server", "journalctl -u grafana-server -n 100"],
  "Helm": ["helm list -A", "helm lint ./chart", "helm template release ./chart", "helm history release"],
  "Argo CD": ["argocd app list", "argocd app get <app-name>", "argocd app diff <app-name>", "argocd app sync <app-name>"],
  "AWS": ["aws sts get-caller-identity", "aws configure list", "aws ec2 describe-instances"],
  "Maven": ["mvn validate", "mvn test", "mvn package"],
  "Nexus": ["curl -I https://<nexus-host>/service/rest/v1/status"],
  "GitHub Actions": ["gh workflow list", "gh run list", "gh run view <run-id>"],
  "default": ["<tool-specific-command> --help", "Check the service status", "Review application and service logs"]
};

function getCommands(name: string): string[] {
  const key = Object.keys(commandMap).find(k =>
    k !== "default" && name.toLowerCase().includes(k.toLowerCase())
  );
  return commandMap[key || "default"];
}

const sectionTitles = [
  "1. Purpose – Why Is It Used?",
  "2. How It Works",
  "3. Real-Time Project Example",
  "4. Architecture / Components",
  "5. Step-by-Step Workflow",
  "6. Practical Commands",
  "7. Configuration Examples",
  "8. Common Mistakes",
  "9. Troubleshooting",
  "10. Best Practices",
  "11. Security Considerations",
  "12. Interview Points",
  "13. Related Concepts"
];

export function buildBulkGlossaryLearningContent(
  name: string,
  definition: string,
  project: string,
  related: string[]
): GlossaryLearningSection[] | undefined {
  // Preserve the two completed learning-content pages exactly.
  if (name === "Docker Image" || name === "Docker Container") return undefined;

  const commands = getCommands(name);
  const projectContext = project || "a production DevOps project";
  const relatedText = related?.length ? related.join(", ") : "the surrounding DevOps workflow";

  const content = [
    {
      title: "Purpose",
      te: `${name} ఎందుకు ఉపయోగిస్తారంటే, project లో దీనికి సంబంధించిన పనిని సరైన విధంగా నిర్వహించడానికి ఉపయోగిస్తారు. అవసరమైనప్పుడు మాత్రమే ఉపయోగించి, application మరియు infrastructure requirements కు అనుగుణంగా configure చేయాలి.`,
      en: `${name} is used to address a specific requirement in the DevOps lifecycle. ${definition} In ${projectContext}, teams use it where this capability is required instead of treating it as an isolated tool or concept.`,
      details: [
        `Primary responsibility: ${definition}`,
        "Identify the requirement before selecting configuration or implementation options."
      ]
    },
    {
      title: "How It Works",
      te: `${name} పని చేసే విధానం దాని configuration, inputs, dependencies మరియు environment పై ఆధారపడి ఉంటుంది. ముందుగా input లేదా request అందుతుంది. తర్వాత సంబంధిత processing జరుగుతుంది. చివరగా output లేదా status ను verify చేయాలి.`,
      en: `${name} operates through its configured inputs, dependencies and execution environment. A request or configuration is provided, the relevant component processes it, and the resulting state or output is checked. The exact implementation depends on the technology and its deployment model.`,
      details: [
        "Understand the input, processing stage and expected output.",
        "Check dependencies and permissions before execution.",
        "Validate the resulting state rather than assuming success."
      ]
    },
    {
      title: "Real-Time Project Example",
      te: `${projectContext} లో ${name} అవసరమైన దశలో ఉపయోగించబడుతుంది. ఉదాహరణకు, team ఒక change చేసినప్పుడు సంబంధిత configuration లేదా operation ను అమలు చేసి, result ను logs, status మరియు application behaviour ద్వారా verify చేస్తుంది.`,
      en: `In ${projectContext}, the team uses ${name} at the point where its capability is needed. After a change, engineers validate the result through service status, logs, metrics and application behaviour. The implementation should match the actual project architecture.`,
      details: [
        "Use a development or staging environment to validate the change first.",
        "Record the expected result and compare it with the observed result."
      ]
    },
    {
      title: "Architecture / Components",
      te: `${name} ను అర్థం చేసుకోవడానికి దాని ప్రధాన components, వాటి responsibilities మరియు వాటి మధ్య communication తెలుసుకోవాలి. ప్రతి component role ను గుర్తించి, dependencies ఎక్కడ ఉన్నాయో పరిశీలించాలి.`,
      en: `The architecture around ${name} consists of the components that provide inputs, perform the operation, store or transfer state, and expose results. Identify each component's responsibility and the communication path between them before troubleshooting.`,
      details: [
        "Identify the main component responsible for the operation.",
        "Identify its dependencies, interfaces and stored state.",
        "Understand where logs and status information are available."
      ]
    },
    {
      title: "Step-by-Step Workflow",
      te: `${name} ను implement చేసేటప్పుడు ముందుగా requirement గుర్తించాలి. తర్వాత environment మరియు dependencies check చేసి configuration చేయాలి. అమలు చేసిన తర్వాత output verify చేసి, అవసరమైతే logs పరిశీలించి documentation update చేయాలి.`,
      en: `A safe workflow starts by identifying the requirement, checking prerequisites, preparing the configuration, applying the change in a controlled environment, and validating the result. Monitor the implementation after release and document any operational decisions.`,
      details: [
        "Confirm the requirement and expected outcome.",
        "Check prerequisites, dependencies and access permissions.",
        "Prepare and review the configuration.",
        "Apply the change in a non-production environment first.",
        "Validate, monitor and document the result."
      ]
    },
    {
      title: "Practical Commands",
      te: `${name} కు సంబంధించిన commands ఉపయోగించి current status, configuration మరియు logs పరిశీలించవచ్చు. Commands ను execute చేసే ముందు environment మరియు target resource సరైనవో నిర్ధారించాలి.`,
      en: `Use the following relevant diagnostic commands as a starting point for ${name}. Confirm the target environment and command options before running commands that change infrastructure or application state.`,
      commands,
      details: [
        "Prefer read-only diagnostic commands during initial investigation.",
        "Review command output and exit codes before taking corrective action."
      ]
    },
    {
      title: "Configuration Examples",
      te: `${name} configuration project requirements మరియు environment ఆధారంగా మారుతుంది. Development, staging మరియు production values ను వేరు చేయాలి. Credentials లేదా secrets ను source code లో hardcode చేయకూడదు.`,
      en: `Configuration for ${name} depends on the selected platform and project requirements. Keep environment-specific values separate, validate configuration syntax, and store credentials in an approved secrets-management system. The exact configuration file and keys must follow the technology's official specification.`,
      example: `# Configuration checklist for ${name}\nenvironment: staging\nvalidate_before_apply: true\nstore_credentials_in_secret_manager: true`,
      details: [
        "Use the official configuration schema for the selected technology.",
        "Keep environment-specific configuration separate.",
        "Review changes before applying them to production."
      ]
    },
    {
      title: "Common Mistakes",
      te: `${name} ఉపయోగించేటప్పుడు configuration ను verify చేయకుండా apply చేయడం, permissions పట్టించుకోకపోవడం, dependencies మర్చిపోవడం మరియు production లో test చేయని changes చేయడం సాధారణ తప్పులు.`,
      en: `Common mistakes include applying unvalidated configuration, overlooking dependencies, granting excessive permissions, and assuming that a successful command guarantees application health. These issues can cause failures that are difficult to diagnose.`,
      details: [
        "Do not copy configuration blindly between environments.",
        "Do not ignore warnings, exit codes or validation failures.",
        "Do not make production changes without an appropriate review."
      ]
    },
    {
      title: "Troubleshooting",
      te: `${name} లో సమస్య వచ్చినప్పుడు ముందుగా exact error message సేకరించాలి. తర్వాత service status, logs, configuration, permissions, network connectivity మరియు dependencies పరిశీలించాలి. Root cause గుర్తించిన తర్వాత మాత్రమే corrective change చేయాలి.`,
      en: `Troubleshoot ${name} by collecting the exact error, identifying the affected component, checking service health and reviewing recent changes. Validate configuration, permissions, connectivity and dependencies. Apply one controlled correction at a time and verify recovery.`,
      details: [
        "Capture timestamps, error messages and recent change history.",
        "Check logs and service status before restarting components.",
        "Compare working and failing environments.",
        "Verify recovery with a functional test."
      ],
      commands
    },
    {
      title: "Best Practices",
      te: `${name} కోసం standard configuration maintain చేయాలి. Changes ను review చేయాలి. Monitoring మరియు logging enable చేయాలి. అవసరమైన documentation ఉంచాలి. Production changes కు rollback plan సిద్ధంగా ఉండాలి.`,
      en: `Follow consistent configuration standards for ${name}. Review changes, enable appropriate observability, document operational procedures, and prepare a rollback plan. Test upgrades and configuration changes before production rollout.`,
      details: [
        "Use version control for configuration where appropriate.",
        "Automate repeatable and validated operations.",
        "Monitor the result and review operational alerts.",
        "Maintain a tested recovery or rollback procedure."
      ]
    },
    {
      title: "Security Considerations",
      te: `${name} ను secure గా ఉపయోగించడానికి అవసరమైన permissions మాత్రమే ఇవ్వాలి. Secrets ను protect చేయాలి. Access ను audit చేయాలి. Network communication మరియు stored data కు సరైన security controls అమలు చేయాలి.`,
      en: `Secure the implementation of ${name} by applying least privilege, protecting credentials, restricting network access and auditing important operations. Use encryption where supported and keep components updated with security fixes.`,
      details: [
        "Apply least-privilege access.",
        "Never expose passwords, tokens or private keys in source code or logs.",
        "Audit access and configuration changes.",
        "Keep software and dependencies patched."
      ]
    },
    {
      title: "Interview Points",
      te: `${name} గురించి interview లో definition మాత్రమే కాకుండా, ఎందుకు ఉపయోగిస్తారు, ఎలా పనిచేస్తుంది, project లో ఎక్కడ ఉపయోగిస్తారు, common failures ఎలా troubleshoot చేస్తారు అనే విషయాలు explain చేయాలి.`,
      en: `In an interview, explain what ${name} is, the problem it solves, how it fits into a real delivery workflow, its important dependencies, and how you validate and troubleshoot it. Support the explanation with a project example relevant to your experience.`,
      details: [
        `Define ${name} in simple technical language.`,
        "Explain its role in the complete DevOps lifecycle.",
        "Describe one practical implementation and one failure scenario.",
        "Explain how you validate success and recover from failure."
      ]
    },
    {
      title: "Related Concepts",
      te: `${name} ఒంటరిగా పనిచేయదు. Project architecture లో దీనికి సంబంధం ఉన్న ఇతర technologies మరియు processes కూడా ఉంటాయి. వాటి మధ్య dependency మరియు integration అర్థం చేసుకోవాలి.`,
      en: `${name} is connected to other technologies and practices in the DevOps lifecycle. Understanding these relationships helps engineers design integrations, investigate cross-component failures and make safer operational decisions.`,
      details: relatedText.split(", ").map(x => x.trim())
    }
  ];

  return content.map((section, index) => ({
    title: sectionTitles[index],
    items: [{
      title: section.title,
      explanation: bilingual(section.te, section.en),
      ...(section.details ? { details: section.details } : {}),
      ...(section.commands ? { commands: section.commands } : {}),
      ...(section.example ? { example: section.example } : {})
    }]
  }));
}
