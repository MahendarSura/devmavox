// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "ansible-doc COLLECTION.MODULE",
    "ansible-playbook -i inventory.ini site.yml --syntax-check"
  ],
  "prevent": [
    "Pin collection versions in requirements.yml",
    "Install dependencies in CI before running playbooks"
  ],
  "fix": [
    "Correct the module name",
    "Use the fully qualified collection name when required",
    "Install the required collection from a trusted requirements.yml",
    "Ensure the controller uses the intended Ansible environment"
  ],
  "title": "Ansible Module Not Found",
  "diagnosis": [
    "ansible --version",
    "ansible-galaxy collection list",
    "ansible-doc ansible.builtin.copy"
  ],
  "causes": [
    "Collection is not installed",
    "Wrong fully qualified collection name",
    "Typo in module name"
  ],
  "symptoms": [
    "Could not resolve module/action",
    "Module or collection is unavailable"
  ]
} as const;

export default guide;
