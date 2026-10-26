// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "Run the playbook twice; the second run should be idempotent",
    "Confirm service status on the managed host"
  ],
  "prevent": [
    "Use template or copy modules instead of unconditional shell commands",
    "Test handler behavior in staging"
  ],
  "fix": [
    "Use the exact handler name in notify",
    "Ensure the task changes the target file when content differs",
    "Check when conditions and tags",
    "Use listen only when intentionally grouping handler notifications"
  ],
  "title": "Ansible Handler Not Triggered",
  "diagnosis": [
    "ansible-playbook -i inventory.ini site.yml --list-tasks",
    "ansible-playbook -i inventory.ini site.yml --syntax-check"
  ],
  "causes": [
    "Task reports unchanged",
    "notify name does not match handler name",
    "Task is skipped or fails"
  ],
  "symptoms": [
    "Service restart handler does not run",
    "Configuration changes are not applied"
  ]
} as const;

export default guide;
