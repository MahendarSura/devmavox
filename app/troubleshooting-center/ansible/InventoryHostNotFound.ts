// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "ansible TARGET_GROUP -i inventory.ini --list-hosts"
  ],
  "prevent": [
    "Validate inventory changes in CI",
    "Use consistent group naming"
  ],
  "fix": [
    "Pass the correct inventory file with -i",
    "Correct the host or group name in the playbook",
    "Fix INI or YAML inventory syntax",
    "Check group membership and children definitions"
  ],
  "title": "Ansible Inventory Host Not Found",
  "diagnosis": [
    "ansible-inventory -i inventory.ini --graph",
    "ansible-inventory -i inventory.ini --list",
    "ansible all -i inventory.ini --list-hosts"
  ],
  "causes": [
    "Incorrect inventory path",
    "Host alias or group name mismatch",
    "Inventory syntax error"
  ],
  "symptoms": [
    "No hosts matched",
    "Provided hosts list is empty"
  ]
} as const;

export default guide;
