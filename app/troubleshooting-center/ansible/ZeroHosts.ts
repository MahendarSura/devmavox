
/**
 * AnsibleZeroHosts.ts
 * Production Troubleshooting Runbook
 *
 * Location:
 * app/troubleshooting-center/ansible/AnsibleZeroHosts.ts
 *
 * Purpose:
 * Diagnose Ansible playbooks or CI/CD deployment pipelines that discover
 * zero target hosts, skip all hosts, or unexpectedly execute no tasks.
 *
 * Safety:
 * - Start with read-only diagnostics.
 * - Confirm inventory, environment, and target scope before execution.
 * - Never broaden a production inventory or remove --limit blindly.
 * - Obtain required approval before any production-changing operation.
 * - Examples are templates; replace placeholders with verified values.
 */

export type AnsibleSeverity =
  | "SEV1"
  | "SEV2"
  | "SEV3"
  | "SEV4";

export type DiagnosticRisk =
  | "READ_ONLY"
  | "LOW"
  | "CHANGE_REQUIRES_APPROVAL";

export interface DiagnosticStep {
  id: string;
  title: string;
  purpose: string;
  commands: string[];
  expectedOutput: string[];
  interpretation: string[];
  nextAction: string[];
  risk: DiagnosticRisk;
}

export interface RootCause {
  id: string;
  title: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  remediation: string[];
  verification: string[];
  prevention: string[];
}

export interface IncidentScenario {
  id: string;
  title: string;
  severity: AnsibleSeverity;
  symptoms: string[];
  impact: string[];
  initialChecks: string[];
  diagnosticSteps: DiagnosticStep[];
  rootCauses: RootCause[];
  recovery: string[];
  prevention: string[];
}

export const AnsibleZeroHostsPart1 = [
  {
    id: "AZH-001",
    title: "Production deployment discovers zero hosts",
    category: "Incident triage",
    severity: "SEV1",
    summary:
      "A deployment pipeline starts successfully, but Ansible reports no target hosts.",
    symptoms: [
      "The pipeline exits without deploying the expected application version.",
      "The play recap shows zero hosts or zero successful tasks.",
      "The playbook prints a message similar to 'no hosts matched'.",
      "The pipeline is green even though the expected release is missing.",
      "The incident occurs after a repository, inventory, or pipeline change.",
    ],
    impactAssessment: [
      "Identify the affected application, service, and environment.",
      "Confirm whether the release was skipped or partially applied.",
      "Check whether earlier plays changed any systems before the failure.",
      "Determine whether production traffic is still served by the previous release.",
      "Check whether other deployment jobs share the same inventory or credentials.",
      "Record the incident start time, last successful deployment, and pipeline run ID.",
    ],
    safetyChecks: [
      "Confirm the repository and Git commit used by the pipeline.",
      "Confirm the intended environment: development, staging, or production.",
      "Confirm the intended inventory source and deployment limit.",
      "Confirm the approved change window and required production approvals.",
      "Do not remove a host limit merely to make the playbook run.",
      "Do not replace the production inventory with a broad all-hosts inventory.",
      "Preserve logs and configuration evidence before modifying the pipeline.",
    ],
    diagnosticSteps: [
      {
        id: "AZH-001-01",
        title: "Capture the exact failure",
        purpose:
          "Establish whether the problem is inventory discovery, host pattern matching, task skipping, or a pipeline wrapper issue.",
        commands: [
          "ansible-playbook --version",
          "ansible --version",
          "git rev-parse --show-toplevel",
          "git rev-parse HEAD",
          "pwd",
        ],
        expectedOutput: [
          "Ansible reports its installed version.",
          "The configuration section identifies the selected configuration file, if any.",
          "The working directory belongs to the expected checkout.",
          "The Git commit matches the pipeline run.",
        ],
        interpretation: [
          "A different Ansible version may use different collection or plugin behavior.",
          "An unexpected working directory may cause relative inventory paths to resolve incorrectly.",
          "A mismatched commit suggests the pipeline may not be running the intended change.",
          "These commands do not prove that the inventory contains hosts; continue with inventory checks.",
        ],
        nextAction: [
          "Save the output with the pipeline run ID.",
          "Record the exact playbook command, including every argument.",
          "Proceed to inventory resolution and host-pattern checks.",
        ],
        risk: "READ_ONLY",
      },
      {
        id: "AZH-001-02",
        title: "Verify inventory resolution",
        purpose:
          "Determine whether Ansible can load the intended inventory and discover hosts.",
        commands: [
          "ansible-inventory -i ./inventory/production.ini --list",
          "ansible-inventory -i ./inventory/production.ini --graph",
          "ansible all -i ./inventory/production.ini --list-hosts",
        ],
        expectedOutput: [
          "The inventory listing contains expected groups and hosts.",
          "The inventory graph displays the intended production group hierarchy.",
          "The all-hosts listing shows the hosts Ansible can target from that inventory.",
        ],
        interpretation: [
          "An empty host listing can indicate an empty inventory, an incorrect source, or failed dynamic discovery.",
          "A populated inventory with an empty application group suggests a group-definition or pattern mismatch.",
          "If inventory parsing fails, capture the parser error before editing files.",
          "Never assume that the inventory is valid simply because the file exists.",
        ],
        nextAction: [
          "If all hosts are absent, inspect the inventory path and source configuration.",
          "If hosts exist but the application group is empty, inspect group membership.",
          "If inventory discovery fails, investigate the specific parser or plugin error.",
        ],
        risk: "READ_ONLY",
      },
      {
        id: "AZH-001-03",
        title: "Inspect the exact playbook target pattern",
        purpose:
          "Confirm that the playbook's hosts expression matches discovered inventory hosts.",
        commands: [
          "grep -nE '^[[:space:]]*hosts:' deploy.yml",
          "ansible-playbook -i ./inventory/production.ini deploy.yml --list-hosts",
          "ansible-playbook -i ./inventory/production.ini deploy.yml --syntax-check",
        ],
        expectedOutput: [
          "The playbook lists the intended target pattern.",
          "The list-hosts output identifies the hosts selected for each play.",
          "The syntax check completes without YAML or playbook syntax errors.",
        ],
        interpretation: [
          "A misspelled group name can result in no hosts matching the play.",
          "A syntax check validates playbook syntax but does not prove that runtime inventory discovery is correct.",
          "A playbook can be syntactically valid while its host pattern matches zero systems.",
          "The correct pattern depends on the actual inventory; do not change it based on guesswork.",
        ],
        nextAction: [
          "Compare the playbook pattern with the output of ansible-inventory --graph.",
          "Check whether group names changed in the latest Git commit.",
          "Review any limit argument supplied by the pipeline.",
        ],
        risk: "READ_ONLY",
      },
      {
        id: "AZH-001-04",
        title: "Inspect pipeline arguments and environment",
        purpose:
          "Identify hidden limits, incorrect paths, and environment-specific overrides.",
        commands: [
          "git diff -- deploy.yml ansible.cfg inventory/",
          "git status --short",
          "printf 'ANSIBLE_CONFIG=%s\\n' \"${ANSIBLE_CONFIG:-<unset>}\"",
          "printf 'ANSIBLE_INVENTORY=%s\\n' \"${ANSIBLE_INVENTORY:-<unset>}\"",
          "printf 'ANSIBLE_LIMIT=%s\\n' \"${ANSIBLE_LIMIT:-<unset>}\"",
        ],
        expectedOutput: [
          "Git displays relevant uncommitted or recent configuration changes.",
          "The environment-variable output shows configured overrides or <unset>.",
          "The pipeline log provides the exact command and any --limit argument.",
        ],
        interpretation: [
          "A variable can override the expected configuration or inventory selection.",
          "The listed environment variables are not automatically consumed by every Ansible version or wrapper; verify the actual invocation.",
          "A pipeline template may inject --limit even when the repository playbook is unchanged.",
          "Do not print credentials or dump the complete environment into public CI logs.",
        ],
        nextAction: [
          "Compare the failing pipeline invocation with the last successful run.",
          "Identify which component introduced any changed argument.",
          "Correct the specific configuration source rather than applying a broad workaround.",
        ],
        risk: "READ_ONLY",
      },
    ],
    recoveryPlan: [
      "Pause additional deployment attempts if the target scope is uncertain.",
      "Determine whether any earlier play or pipeline stage already modified systems.",
      "Fix the proven inventory, pattern, or invocation defect.",
      "Run syntax validation and host-list validation before a deployment retry.",
      "Obtain approval if the change affects production deployment configuration.",
      "Retry against the explicitly approved target scope.",
      "Verify the application version, service health, and deployment records.",
      "Escalate to rollback only when there is evidence of a harmful partial change or failed release.",
    ],
    prevention: [
      "Add inventory validation to the CI pipeline.",
      "Require the expected production group to contain at least one host.",
      "Fail the pipeline when the intended deployment selects zero hosts.",
      "Record the commit, inventory source, limit, and target count for each run.",
      "Add a pre-deployment approval gate for production.",
      "Test inventory changes in a non-production environment.",
    ],
  },

  {
    id: "AZH-002",
    title: "Inventory path is incorrect in CI/CD",
    category: "Inventory resolution",
    severity: "SEV2",
    summary:
      "Ansible runs from a different directory than expected and cannot load the intended inventory.",
    symptoms: [
      "The same playbook works on a developer machine but fails in CI.",
      "The inventory file exists in the repository but is not found by the job.",
      "Ansible loads a different inventory source than the one expected.",
      "The failure begins after a pipeline template or checkout change.",
    ],
    diagnosticSteps: [
      {
        id: "AZH-002-01",
        title: "Check the job working directory",
        purpose:
          "Establish the actual checkout location and inventory path.",
        commands: [
          "pwd",
          "git rev-parse --show-toplevel",
          "ls -la",
          "ls -la ./inventory",
          "test -f ./inventory/production.ini && echo INVENTORY_EXISTS || echo INVENTORY_MISSING",
        ],
        expectedOutput: [
          "The working directory is the expected repository root.",
          "The inventory directory contains the intended file.",
          "INVENTORY_EXISTS is printed when the expected file is present.",
        ],
        interpretation: [
          "INVENTORY_MISSING indicates that the relative path is not valid from the current directory.",
          "A file may be present on a developer machine but absent from the CI checkout.",
          "A monorepo or nested checkout can change the path from which the job executes.",
        ],
        nextAction: [
          "Check the pipeline checkout and working-directory settings.",
          "Use a path verified from the actual job directory.",
          "Confirm that the inventory file is tracked and available in the selected commit.",
        ],
        risk: "READ_ONLY",
      },
      {
        id: "AZH-002-02",
        title: "Check the exact inventory argument",
        purpose:
          "Verify that the pipeline invokes Ansible with the intended source.",
        commands: [
          "ansible-inventory -i ./inventory/production.ini --graph",
          "ansible-playbook -i ./inventory/production.ini deploy.yml --list-hosts",
        ],
        expectedOutput: [
          "The inventory graph contains the expected group names.",
          "The playbook host list contains the intended targets.",
        ],
        interpretation: [
          "If the file is found but no hosts appear, investigate inventory content or parsing.",
          "If the command reports a file or plugin error, resolve that error before deployment.",
          "If the command succeeds locally but not in CI, compare filesystem layout and runtime configuration.",
        ],
        nextAction: [
          "Correct the verified path in the pipeline or configuration.",
          "Rerun the read-only inventory checks.",
          "Proceed only after the target list is correct.",
        ],
        risk: "READ_ONLY",
      },
    ],
    rootCauses: [
      {
        id: "AZH-002-RC1",
        title: "Relative path resolves from the wrong directory",
        symptoms: [
          "Inventory file exists in the repository.",
          "CI cannot find the relative path.",
        ],
        evidence: [
          "The pipeline's pwd output differs from the expected repository root.",
          "The inventory file is present at a different verified path.",
        ],
        diagnosis: [
          "Compare the job working directory with the path used by -i.",
          "Check the pipeline's checkout and directory-change steps.",
        ],
        remediation: [
          "Set the pipeline working directory correctly or use a verified inventory path.",
          "Keep the path change narrowly scoped to the affected job.",
        ],
        verification: [
          "Run ansible-inventory --graph with the corrected path.",
          "Run ansible-playbook --list-hosts and confirm the target count.",
        ],
        prevention: [
          "Add a preflight assertion for the inventory file.",
          "Document the expected repository layout.",
        ],
      },
    ],
    prevention: [
      "Validate inventory paths in every CI execution environment.",
      "Keep inventory path conventions consistent across pipeline templates.",
      "Log the working directory without exposing secrets.",
    ],
  },

  {
    id: "AZH-003",
    title: "Playbook group name does not match inventory",
    category: "Host pattern matching",
    severity: "SEV2",
    summary:
      "Hosts exist in the inventory, but the playbook references a group that does not exist or is empty.",
    symptoms: [
      "ansible-inventory --list shows hosts.",
      "The target group shown in the playbook is missing from the inventory graph.",
      "The playbook selects zero hosts despite a populated inventory.",
      "The incident follows a group rename or inventory refactor.",
    ],
    diagnosticSteps: [
      {
        id: "AZH-003-01",
        title: "Compare inventory groups with playbook patterns",
        purpose:
          "Determine whether the configured host pattern matches a real inventory group.",
        commands: [
          "ansible-inventory -i ./inventory/production.ini --graph",
          "grep -nE '^[[:space:]]*hosts:' deploy.yml",
          "ansible-playbook -i ./inventory/production.ini deploy.yml --list-hosts",
        ],
        expectedOutput: [
          "The graph lists groups and their members.",
          "The playbook shows its hosts expression.",
          "The selected host list includes the intended application hosts.",
        ],
        interpretation: [
          "A singular/plural mismatch can reference a different group.",
          "A group can exist while having no direct members.",
          "A parent group may contain hosts indirectly through child groups.",
          "Pattern semantics must be checked against the actual inventory graph.",
        ],
        nextAction: [
          "Confirm the intended group name with the inventory owner.",
          "Update the playbook or inventory only after the desired target scope is established.",
          "Repeat --list-hosts before any deployment run.",
        ],
        risk: "READ_ONLY",
      },
    ],
    rootCauses: [
      {
        id: "AZH-003-RC1",
        title: "Group renamed without updating the playbook",
        symptoms: [
          "The inventory contains a similarly named group.",
          "The playbook still refers to the previous group name.",
        ],
        evidence: [
          "The latest Git diff shows a group rename.",
          "The inventory graph and playbook pattern differ.",
        ],
        diagnosis: [
          "Compare the current inventory with the last successful commit.",
          "Identify which name represents the approved deployment scope.",
        ],
        remediation: [
          "Synchronize the group name in the appropriate configuration source.",
          "Avoid adding duplicate groups solely to hide the mismatch.",
        ],
        verification: [
          "Run inventory graph and playbook host-list checks.",
          "Review the selected hosts with the deployment owner.",
        ],
        prevention: [
          "Validate important group names in CI.",
          "Review inventory and playbook changes together.",
        ],
      },
    ],
    prevention: [
      "Add automated checks for required groups.",
      "Require review for production inventory renames.",
      "Keep group naming conventions documented.",
    ],
  },

  {
    id: "AZH-004",
    title: "Ansible --limit excludes every host",
    category: "Execution scope",
    severity: "SEV2",
    summary:
      "The base inventory contains hosts, but the runtime limit excludes them all.",
    symptoms: [
      "Inventory discovery works without a limit.",
      "The pipeline command contains --limit or -l.",
      "The limited host list is empty.",
      "The issue occurs only for a specific pipeline variable or environment.",
    ],
    diagnosticSteps: [
      {
        id: "AZH-004-01",
        title: "Compare unrestricted and limited host selection",
        purpose:
          "Identify whether the limit expression is responsible for the empty target list.",
        commands: [
          "ansible all -i ./inventory/production.ini --list-hosts",
          "ansible all -i ./inventory/production.ini --limit 'APP_GROUP' --list-hosts",
          "ansible-playbook -i ./inventory/production.ini deploy.yml --limit 'APP_GROUP' --list-hosts",
        ],
        expectedOutput: [
          "The unrestricted listing displays inventory hosts.",
          "The limited listing displays only hosts matching the limit.",
          "The playbook listing shows the final target scope.",
        ],
        interpretation: [
          "If the unrestricted list is populated and the limited list is empty, inspect the limit expression.",
          "The APP_GROUP text is a placeholder and must be replaced with a verified group or host pattern.",
          "Do not remove the limit in production as a quick fix.",
          "An empty limit can be caused by an incorrect variable passed by the pipeline.",
        ],
        nextAction: [
          "Record the exact limit value passed to Ansible.",
          "Compare the value with the intended group or host pattern.",
          "Correct the source of the limit and validate the resulting host list.",
        ],
        risk: "READ_ONLY",
      },
    ],
    rootCauses: [
      {
        id: "AZH-004-RC1",
        title: "Pipeline variable expands to an incorrect limit",
        symptoms: [
          "The deployment works in one environment but not another.",
          "The pipeline injects a variable into -l or --limit.",
        ],
        evidence: [
          "The expanded command contains an unexpected group or hostname.",
          "The selected host list becomes empty when the limit is applied.",
        ],
        diagnosis: [
          "Inspect the pipeline template and variable mapping.",
          "Compare the expanded value with the approved environment inventory.",
        ],
        remediation: [
          "Correct the environment-to-limit mapping.",
          "Keep the intended production restriction in place.",
          "Validate the corrected expression before retrying.",
        ],
        verification: [
          "Run --list-hosts with the corrected limit.",
          "Confirm the final target list with the release owner.",
        ],
        prevention: [
          "Validate allowed limit values before execution.",
          "Reject empty or unknown environment mappings.",
        ],
      },
    ],
    prevention: [
      "Log the non-secret effective limit value.",
      "Test every supported environment mapping.",
      "Require an explicit target-count check before production execution.",
    ],
  },
] as const satisfies readonly Record<string, unknown>[];
