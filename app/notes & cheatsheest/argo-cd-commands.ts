
import type { DevOpsTool } from "./command-types";

type CommandLevel = DevOpsTool["commands"][number]["level"];

const makeCommands = (
  level: CommandLevel,
  rows: [string, string, string][]
) =>
  rows.map(([command, english, telugu]) => ({
    command,
    level,
    english,
    telugu,
  }));

export const argocdTool: DevOpsTool = {
  name: "Argo CD",
  category: "CI/CD & GitOps",
  commands: [
    // BASIC - 15
    ...makeCommands("Basic", [
      ["argocd version", "Displays the Argo CD CLI and server versions.", "Argo CD CLI mariyu server versions chupistundi."],
      ["argocd help", "Displays the main CLI help information.", "Argo CD CLI help information chupistundi."],
      ["argocd login argocd.example.com", "Logs in to an Argo CD server.", "Argo CD server ki login chestundi."],
      ["argocd logout argocd.example.com", "Logs out from an Argo CD server.", "Argo CD server nundi logout chestundi."],
      ["argocd app list", "Lists applications managed by Argo CD.", "Argo CD manage chestunna applications list chestundi."],
      ["argocd app get my-app", "Displays details of an application.", "Application details chupistundi."],
      ["argocd app sync my-app", "Synchronizes an application with its Git desired state.", "Application ni Git desired state tho sync chestundi."],
      ["argocd app diff my-app", "Shows differences between live and desired application resources.", "Live resources mariyu desired resources madhya differences chupistundi."],
      ["argocd app history my-app", "Displays application deployment history.", "Application deployment history chupistundi."],
      ["argocd app resources my-app", "Lists resources managed by an application.", "Application manage chese resources list chestundi."],
      ["argocd app manifests my-app", "Displays generated application manifests.", "Application generate chesina manifests chupistundi."],
      ["argocd repo list", "Lists configured Git and Helm repositories.", "Configure chesina Git mariyu Helm repositories list chestundi."],
      ["argocd cluster list", "Lists clusters registered with Argo CD.", "Argo CD lo register ayina clusters list chestundi."],
      ["argocd proj list", "Lists Argo CD projects.", "Argo CD projects list chestundi."],
      ["argocd appset list", "Lists ApplicationSets managed by Argo CD.", "Argo CD manage chese ApplicationSets list chestundi."],
    ]),

    // INTERMEDIATE - 20
    ...makeCommands("Intermediate", [
      ["argocd app create guestbook --repo https://github.com/argoproj/argocd-example-apps.git --path guestbook --dest-server https://kubernetes.default.svc --dest-namespace default", "Creates an application from a Git repository path.", "Git repository path nundi application create chestundi."],
      ["argocd app create helm-app --repo https://charts.example.com --helm-chart nginx --dest-server https://kubernetes.default.svc --dest-namespace default", "Creates an application from a Helm chart repository.", "Helm chart repository nundi application create chestundi."],
      ["argocd app create my-app --file application.yaml", "Creates an application from an application manifest file.", "Application manifest file nundi application create chestundi."],
      ["argocd app set my-app --revision main", "Changes the Git revision tracked by an application.", "Application track chese Git revision change chestundi."],
      ["argocd app set my-app --parameter image.tag=v2", "Sets an application parameter override.", "Application parameter override set chestundi."],
      ["argocd app set my-app --parameter image.tag=v2 --validate", "Sets and validates an application parameter.", "Application parameter set chesi validate chestundi."],
      ["argocd app set my-app --dest-namespace production", "Changes the application's destination namespace.", "Application destination namespace change chestundi."],
      ["argocd app set my-app --dest-server https://kubernetes.default.svc", "Changes the application's destination cluster.", "Application destination cluster change chestundi."],
      ["argocd app set my-app --sync-policy automated", "Enables automated synchronization for an application.", "Application ki automated synchronization enable chestundi."],
      ["argocd app set my-app --auto-prune", "Enables automatic pruning for automated synchronization.", "Automated synchronization lo automatic pruning enable chestundi."],
      ["argocd app set my-app --self-heal", "Enables self-healing for an application.", "Application ki self-healing enable chestundi."],
      ["argocd app wait my-app --sync", "Waits until an application becomes synchronized.", "Application Synced state ki vache varaku wait chestundi."],
      ["argocd app wait my-app --health", "Waits until an application becomes healthy.", "Application Healthy state ki vache varaku wait chestundi."],
      ["argocd app rollback my-app 2", "Rolls an application back to history revision 2.", "Application ni history revision 2 ki rollback chestundi."],
      ["argocd app edit my-app", "Opens an application configuration for editing.", "Application configuration edit cheyadaniki open chestundi."],
      ["argocd app terminate-op my-app", "Terminates the running operation of an application.", "Application lo running operation ni terminate chestundi."],
      ["argocd appset get my-appset", "Displays ApplicationSet details.", "ApplicationSet details chupistundi."],
      ["argocd appset create appset.yaml", "Creates an ApplicationSet from a YAML file.", "YAML file nundi ApplicationSet create chestundi."],
      ["argocd cluster add staging-context", "Registers a Kubernetes context with Argo CD.", "Kubernetes context ni Argo CD lo register chestundi."],
      ["argocd repo add https://github.com/example/app.git --username my-user --password my-token", "Adds a private Git repository using credentials.", "Credentials use chesi private Git repository add chestundi."],
    ]),

    // ADVANCED - 15
    ...makeCommands("Advanced", [
      ["argocd app sync my-app --dry-run", "Previews synchronization without applying changes.", "Changes apply cheyakunda synchronization preview chupistundi."],
      ["argocd app sync my-app --prune", "Synchronizes the application and removes resources no longer defined in Git.", "Application sync chesi Git lo leni resources prune chestundi."],
      ["argocd app sync my-app --force", "Forces resource application during synchronization.", "Synchronization time lo resources force apply chestundi."],
      ["argocd app sync my-app --revision main", "Synchronizes an application to a specific Git revision.", "Application ni specific Git revision ki sync chestundi."],
      ["argocd app sync my-app --resource apps:Deployment:my-deployment", "Synchronizes only the specified Deployment resource.", "Specified Deployment resource matrame sync chestundi."],
      ["argocd app sync my-app --timeout 300", "Sets a 300-second synchronization timeout.", "Synchronization timeout ni 300 seconds ga set chestundi."],
      ["argocd app sync my-app --retry-limit 3", "Retries failed synchronization up to three times.", "Sync fail ayithe maximum three times retry chestundi."],
      ["argocd app sync my-app --server-side", "Uses server-side apply during synchronization.", "Synchronization lo server-side apply use chestundi."],
      ["argocd app diff my-app --hard-refresh", "Refreshes application data and manifest cache before comparing.", "Compare cheyadaniki mundu application data mariyu manifest cache refresh chestundi."],
      ["argocd app diff my-app --revision main", "Compares live resources against a specific Git revision.", "Live resources ni specific Git revision tho compare chestundi."],
      ["argocd app diff my-app --local ./manifests", "Compares live application resources with local manifests.", "Live application resources ni local manifests tho compare chestundi."],
      ["argocd app set my-app --sync-option ApplyOutOfSyncOnly=true", "Configures synchronization to apply only out-of-sync resources.", "Out-of-sync resources matrame apply ayye la sync option set chestundi."],
      ["argocd app set my-app --source-position 1 --repo https://github.com/example/app.git", "Changes the repository override for the first source in a multi-source application.", "Multi-source application lo first source repository override change chestundi."],
      ["argocd appset generate appset.yaml", "Generates applications from an ApplicationSet manifest.", "ApplicationSet manifest nundi applications generate chestundi."],
      ["argocd account can-i sync applications '*'", "Checks whether the current account can synchronize applications.", "Current account applications sync cheyagalado ledo check chestundi."],
    ]),

    // TROUBLESHOOTING - 20
    ...makeCommands("Troubleshooting", [
      ["argocd app get my-app --refresh", "Refreshes application information while retrieving its details.", "Application details retrieve chestunnappudu information refresh chestundi."],
      ["argocd app get my-app --hard-refresh", "Refreshes application data and target manifest cache.", "Application data mariyu target manifest cache hard refresh chestundi."],
      ["argocd app get my-app --show-operation", "Displays the current or last application operation.", "Application current leda last operation chupistundi."],
      ["argocd app get my-app --show-params", "Displays application parameters and overrides.", "Application parameters mariyu overrides chupistundi."],
      ["argocd app get my-app -o yaml", "Displays application details in YAML format.", "Application details YAML format lo chupistundi."],
      ["argocd app get my-app -o json", "Displays application details in JSON format.", "Application details JSON format lo chupistundi."],
      ["argocd app diff my-app --refresh", "Refreshes application data before displaying differences.", "Differences chupinche mundu application data refresh chestundi."],
      ["argocd app logs my-app", "Displays logs from pods belonging to an application.", "Application ki sambandhinchina pods logs chupistundi."],
      ["argocd app logs my-app --tail 100", "Displays the last 100 lines of application logs.", "Application logs lo last 100 lines chupistundi."],
      ["argocd app logs my-app --since-seconds 3600", "Displays application logs from the previous hour.", "Last one hour application logs chupistundi."],
      ["argocd app logs my-app --filter error", "Filters application logs for the word error.", "Application logs lo error word unna lines filter chestundi."],
      ["argocd app logs my-app -f", "Streams application logs continuously.", "Application logs ni continuous ga stream chestundi."],
      ["argocd app logs my-app -p", "Displays logs from previously terminated containers.", "Mundu terminate ayina containers logs chupistundi."],
      ["argocd app logs my-app -c api", "Displays logs from the specified container.", "Specified container logs chupistundi."],
      ["argocd app wait my-app --sync --health", "Waits until the application is synchronized and healthy.", "Application Synced mariyu Healthy ayye varaku wait chestundi."],
      ["argocd repo get https://github.com/example/app.git", "Checks the configured repository connection details.", "Configured repository connection details check chestundi."],
      ["argocd cluster get https://kubernetes.default.svc -o wide", "Displays detailed information about a registered cluster.", "Registered cluster detailed information chupistundi."],
      ["argocd login argocd.example.com --skip-test-tls", "Skips the initial TLS connectivity test during login.", "Login time lo initial TLS connectivity test skip chestundi."],
      ["argocd --loglevel debug app get my-app", "Runs an application inspection with debug-level CLI logging.", "Debug-level CLI logs tho application details check chestundi."],
      ["argocd relogin", "Refreshes an expired Argo CD authentication token.", "Expire ayina Argo CD authentication token refresh chestundi."],
    ]),
  ],
};
