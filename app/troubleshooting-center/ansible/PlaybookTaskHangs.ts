// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "Repeat the task in staging and measure completion time",
    "Confirm final service or process state"
  ],
  "prevent": [
    "Set explicit timeouts",
    "Log long-running operations and alert on duration"
  ],
  "fix": [
    "Remove interactive prompts from automation",
    "Use non-interactive command options where supported",
    "Set a suitable timeout for the affected operation",
    "Use async and poll only for genuinely long-running tasks"
  ],
  "title": "Ansible Playbook Task Hangs",
  "diagnosis": [
    "ansible-playbook -i inventory.ini site.yml -vvv",
    "Check target CPU, memory and process state",
    "Inspect the specific command or service logs"
  ],
  "causes": [
    "Remote command waits for interactive input",
    "Network or service call stalls",
    "Long-running operation lacks timeout"
  ],
  "symptoms": [
    "A task runs for a long time",
    "Playbook appears stalled"
  ]
} as const;

export default guide;
