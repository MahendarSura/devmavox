
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

export const terraformTool: DevOpsTool = {
  name: "Terraform",
  category: "Cloud & IaC",
  commands: [
    ...makeCommands("Basic", [
      [
        "terraform version",
        "Display the installed Terraform version.",
        "Install aina Terraform version chupisthundi.",
      ],
      [
        "terraform --help",
        "Display Terraform CLI help and available commands.",
        "Terraform CLI help and available commands chupisthundi.",
      ],
      [
        "terraform init",
        "Initialize the working directory and download required providers and modules.",
        "Working directory initialize chesi required providers and modules download chesthundi.",
      ],
      [
        "terraform fmt",
        "Format Terraform configuration files.",
        "Terraform configuration files ni standard format lo arrange chesthundi.",
      ],
      [
        "terraform validate",
        "Check Terraform configuration syntax and consistency.",
        "Terraform configuration syntax and consistency check chesthundi.",
      ],
      [
        "terraform plan",
        "Preview proposed infrastructure changes.",
        "Infrastructure changes apply cheyadaniki mundu preview chupisthundi.",
      ],
      [
        "terraform apply",
        "Create or update infrastructure according to the configuration.",
        "Configuration prakaram infrastructure create or update chesthundi.",
      ],
      [
        "terraform destroy",
        "Destroy infrastructure managed by the configuration.",
        "Configuration manage chese infrastructure destroy chesthundi.",
      ],
      [
        "terraform show",
        "Display the current state or a saved execution plan.",
        "Current state or saved execution plan display chesthundi.",
      ],
      [
        "terraform output",
        "Display root module output values.",
        "Terraform root module output values chupisthundi.",
      ],
      [
        "terraform providers",
        "Show providers required by the configuration.",
        "Configuration ki required providers chupisthundi.",
      ],
      [
        "terraform workspace list",
        "List available Terraform workspaces.",
        "Available Terraform workspaces list chesthundi.",
      ],
      [
        "terraform workspace show",
        "Display the currently selected workspace.",
        "Currently selected workspace chupisthundi.",
      ],
      [
        "terraform state list",
        "List resources tracked in Terraform state.",
        "Terraform state lo unna resources list chesthundi.",
      ],
      [
        "terraform state show <resource-address>",
        "Display attributes of a specific resource in the state.",
        "Specific resource state attributes inspect cheyyataniki.",
      ],
      [
        "terraform graph",
        "Generate a dependency graph in DOT format.",
        "Resource dependencies graph generate chesthundi.",
      ],
      [
        "terraform console",
        "Evaluate Terraform expressions interactively.",
        "Terraform expressions interactive ga evaluate cheyyataniki.",
      ],
      [
        "terraform get",
        "Download modules referenced by the configuration.",
        "Configuration lo reference chesina modules download chesthundi.",
      ],
      [
        "terraform login",
        "Authenticate with a supported Terraform remote host.",
        "Supported Terraform remote host tho authenticate chesthundi.",
      ],
      [
        "terraform logout",
        "Remove locally stored credentials for a remote host.",
        "Remote host credentials local system nunchi remove chesthundi.",
      ],
    ]),

    ...makeCommands("Intermediate", [
      [
        "terraform init -upgrade",
        "Upgrade installed providers and modules within configured version constraints.",
        "Configured version constraints prakaram providers and modules upgrade chesthundi.",
      ],
      [
        "terraform init -reconfigure",
        "Reinitialize the backend without migrating existing state.",
        "Existing state migrate cheyakunda backend reinitialize chesthundi.",
      ],
      [
        "terraform init -migrate-state",
        "Migrate existing state when changing backend configuration.",
        "Backend configuration change chesinappudu existing state migrate chesthundi.",
      ],
      [
        "terraform init -backend=false",
        "Initialize providers and modules without initializing the backend.",
        "Backend initialize cheyakunda providers and modules initialize chesthundi.",
      ],
      [
        "terraform fmt -recursive",
        "Format Terraform files in the current directory and subdirectories.",
        "Current directory and subdirectories lo Terraform files format chesthundi.",
      ],
      [
        "terraform fmt -check",
        "Check formatting without modifying Terraform files.",
        "Terraform files formatting correct ga undho change cheyakunda check chesthundi.",
      ],
      [
        "terraform validate -json",
        "Return configuration validation results in JSON format.",
        "Configuration validation results JSON format lo isthundi.",
      ],
      [
        "terraform plan -out=tfplan",
        "Create and save an execution plan.",
        "Infrastructure changes preview plan file ga save chesthundi.",
      ],
      [
        "terraform show tfplan",
        "Display a previously saved execution plan.",
        "Saved plan lo changes review cheyyataniki.",
      ],
      [
        "terraform apply tfplan",
        "Apply a previously saved execution plan.",
        "Reviewed plan apply cheyyataniki; correct workspace and account confirm cheyyali.",
      ],
      [
        "terraform plan -var='region=ap-south-1'",
        "Pass an input variable directly while creating a plan.",
        "Plan create chesthunnappudu input variable pass chesthundi.",
      ],
      [
        "terraform plan -var-file=dev.tfvars",
        "Load input variables from a specified variable file.",
        "Specified variable file nunchi input variables load chesthundi.",
      ],
      [
        "terraform apply -var-file=prod.tfvars",
        "Apply infrastructure using production variable values.",
        "Production variable file values use chesi infrastructure apply chesthundi.",
      ],
      [
        "terraform output -json",
        "Display root module outputs in JSON format.",
        "Automation kosam outputs JSON format lo pondataniki; sensitive values leak kakunda chusukovali.",
      ],
      [
        "terraform show -json",
        "Display the current state or saved plan in JSON format.",
        "Current state or saved plan JSON format lo chupisthundi.",
      ],
      [
        "terraform workspace new <workspace>",
        "Create a new Terraform workspace.",
        "New Terraform workspace create chesthundi.",
      ],
      [
        "terraform workspace select <workspace>",
        "Switch to an existing workspace.",
        "Existing workspace ki switch avvataniki; environment correct ga undho verify cheyyali.",
      ],
      [
        "terraform workspace delete <workspace>",
        "Delete a workspace that is no longer required.",
        "Avsaram leni workspace delete chesthundi.",
      ],
      [
        "terraform import <resource-address> <provider-id>",
        "Import an existing infrastructure resource into Terraform state.",
        "Existing infrastructure resource ni Terraform state lo import chesthundi.",
      ],
      [
        "terraform plan -refresh-only",
        "Preview state updates based on remote infrastructure changes.",
        "Remote infrastructure drift ni state refresh plan lo inspect chesthundi.",
      ],
    ]),

    ...makeCommands("Advanced", [
      [
        "terraform apply -auto-approve",
        "Apply infrastructure changes without an interactive approval prompt.",
        "Interactive approval prompt lekunda infrastructure changes apply chesthundi.",
      ],
      [
        "terraform plan -destroy",
        "Create a plan describing infrastructure destruction.",
        "Infrastructure destroy cheyadaniki plan create chesthundi.",
      ],
      [
        "terraform apply -refresh-only",
        "Update state to reflect current remote infrastructure without planned resource changes.",
        "Remote infrastructure prakaram state refresh chesthundi; mundu plan review cheyyali.",
      ],
      [
        "terraform apply -replace=aws_instance.web",
        "Force Terraform to replace a specified resource during apply.",
        "Apply time lo specified resource ni replace cheyamani Terraform ki chepthundi.",
      ],
      [
        "terraform plan -target=aws_instance.web",
        "Create a targeted plan for a specific resource.",
        "Specific resource kosam targeted plan create chesthundi; normal planning ki alternative ga use cheyyakudadhu.",
      ],
      [
        "terraform apply -parallelism=5",
        "Limit concurrent resource operations during apply.",
        "Apply time lo concurrent resource operations count limit chesthundi.",
      ],
      [
        "terraform plan -lock-timeout=5m",
        "Wait up to five minutes to acquire a state lock.",
        "State lock kosam five minutes varaku wait chesthundi.",
      ],
      [
        "terraform force-unlock <lock-id>",
        "Remove a state lock after confirming it is stale.",
        "Stale lock ni matrame remove cheyyataniki; active operation lock ni unlock cheyyakudadhu.",
      ],
      [
        "terraform state pull",
        "Read the current remote state snapshot.",
        "Remote state snapshot inspect cheyyataniki; sensitive data contain cheyyachu.",
      ],
      [
        "terraform state push terraform.tfstate",
        "Upload a local state file to the configured backend.",
        "Local state file ni configured backend ki upload chesthundi; carefully use cheyyali.",
      ],
      [
        "terraform state mv <source> <destination>",
        "Move a resource address in Terraform state.",
        "State resource address move cheyyataniki; state backup teesukovali.",
      ],
      [
        "terraform state rm <resource-address>",
        "Remove a resource binding without deleting the real infrastructure resource.",
        "State nunchi binding remove chesthundi, actual resource delete kaadu.",
      ],
      [
        "terraform state replace-provider hashicorp/aws registry.example.com/custom/aws",
        "Replace provider source addresses recorded in the state.",
        "State lo record aina provider source addresses replace chesthundi.",
      ],
      [
        "terraform providers schema -json",
        "Display provider and resource schemas in JSON format.",
        "Provider and resource schemas JSON format lo chupisthundi.",
      ],
      [
        "terraform providers lock",
        "Update provider dependency lock selections and checksums.",
        "Provider lock file update cheyyataniki; dependency changes review cheyyali.",
      ],
      [
        "terraform providers lock -platform=linux_amd64",
        "Update provider lock selections for a specific platform.",
        "Specific platform kosam provider lock selections update chesthundi.",
      ],
      [
        "terraform providers mirror ./provider-mirror",
        "Create a local mirror containing required provider packages.",
        "Required provider packages tho local mirror create chesthundi.",
      ],
      [
        "terraform graph -type=plan",
        "Generate a dependency graph representing a Terraform plan.",
        "Terraform plan represent chese dependency graph generate chesthundi.",
      ],
      [
        "terraform -chdir=environments/production plan",
        "Run Terraform plan from a specified configuration directory.",
        "Specified configuration directory nunchi Terraform plan run chesthundi.",
      ],
      [
        "terraform plan -detailed-exitcode",
        "Return distinct exit codes for errors, no changes, and pending changes.",
        "Errors, changes levu, pending changes ki separate exit codes isthundi.",
      ],
      [
        "terraform test",
        "Run Terraform configuration tests defined in test files.",
        "Terraform test files execute cheyyataniki.",
      ],
    ]),

    ...makeCommands("Troubleshooting", [
      [
        "terraform init -lockfile=readonly",
        "Initialize Terraform without modifying the provider dependency lock file.",
        "Provider dependency lock file modify cheyakunda Terraform initialize chesthundi.",
      ],
      [
        "terraform init -lock-timeout=5m",
        "Wait for a state lock during backend initialization.",
        "Backend initialization time lo state lock kosam wait chesthundi.",
      ],
      [
        "terraform plan -input=false",
        "Disable interactive variable prompts during planning.",
        "Planning time lo interactive variable prompts disable chesthundi.",
      ],
      [
        "terraform apply -input=false",
        "Disable interactive input prompts during apply.",
        "Apply time lo interactive input prompts disable chesthundi.",
      ],
      [
        "terraform plan -refresh=false",
        "Create a plan without refreshing remote objects first.",
        "Remote objects munduga refresh cheyakunda plan create chesthundi.",
      ],
      [
        "terraform fmt -check -recursive",
        "Find formatting problems across Terraform configuration directories.",
        "Terraform configuration directories lo formatting problems identify chesthundi.",
      ],
      [
        "TF_LOG=DEBUG terraform plan",
        "Enable debug logs while investigating planning failures.",
        "Planning failures investigate chesthunnappudu debug logs enable chesthundi.",
      ],
      [
        "TF_LOG=TRACE terraform plan",
        "Enable detailed trace logs for Terraform troubleshooting.",
        "Terraform troubleshooting kosam detailed trace logs enable chesthundi.",
      ],
      [
        "TF_LOG=DEBUG TF_LOG_PATH=./terraform.log terraform plan",
        "Write Terraform debug logs to a specified log file.",
        "Terraform debug logs ni specified log file lo write chesthundi.",
      ],
      [
        "TF_LOG=off terraform plan",
        "Disable detailed Terraform logging for a planning run.",
        "Planning run kosam Terraform detailed logging disable chesthundi.",
      ],
      [
        "terraform plan -compact-warnings",
        "Display compact warning summaries during planning.",
        "Planning time lo compact warning summaries chupisthundi.",
      ],
      [
        "terraform plan -no-color",
        "Disable colored terminal output in plan results.",
        "Plan results lo terminal colors disable chesthundi.",
      ],
      [
        "terraform apply -no-color",
        "Disable colored terminal output during apply.",
        "Apply output lo terminal colors disable chesthundi.",
      ],
      [
        "terraform plan -parallelism=5",
        "Limit concurrent operations while investigating planning issues.",
        "Planning issues investigate chesthunnappudu concurrent operations limit chesthundi.",
      ],
      [
        "env | grep '^TF_'",
        "Display Terraform-related environment variables.",
        "Terraform related environment variables chupisthundi.",
      ],
      [
        "unset TF_LOG",
        "Remove the TF_LOG environment variable from the current shell.",
        "Current shell nunchi TF_LOG environment variable remove chesthundi.",
      ],
      [
        "ls -la .terraform",
        "Inspect the Terraform working directory and downloaded metadata.",
        "Terraform working directory and downloaded metadata inspect chesthundi.",
      ],
      [
        "cat .terraform.lock.hcl",
        "Inspect locked provider versions and checksums.",
        "Locked provider versions and checksums inspect chesthundi.",
      ],
      [
        "test -f terraform.tfstate && ls -lh terraform.tfstate",
        "Check whether a local Terraform state file exists and inspect its size.",
        "Local Terraform state file undho and file size entho check chesthundi.",
      ],
      [
        "terraform plan -detailed-exitcode",
        "Distinguish planning errors, no changes, and pending changes in automation.",
        "Automation lo planning errors, changes levu, pending changes ni distinguish chesthundi.",
      ],
    ]),
  ],
};
