// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "Check file ownership and mode on the target host",
    "Re-run the task and confirm expected access"
  ],
  "prevent": [
    "Define owner, group and mode explicitly in file tasks",
    "Audit permission changes"
  ],
  "fix": [
    "Use the correct destination path and owner",
    "Apply least-privilege file permissions",
    "Use become only for tasks that need elevated privileges",
    "Avoid broad chmod 777 permissions"
  ],
  "title": "Ansible Task Permission Denied",
  "diagnosis": [
    "ansible HOST -i inventory.ini -m ansible.builtin.command -a 'id'",
    "Inspect destination ownership and permissions on the target host",
    "Run the failing task with -vvv"
  ],
  "causes": [
    "Insufficient file permissions",
    "Wrong owner or destination path",
    "Task requires privilege escalation"
  ],
  "symptoms": [
    "Permission denied while writing a file",
    "Task cannot modify a protected resource"
  ]
} as const;

export default guide;
