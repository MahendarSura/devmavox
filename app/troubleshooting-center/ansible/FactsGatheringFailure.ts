// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "ansible HOST -i inventory.ini -m ansible.builtin.setup"
  ],
  "prevent": [
    "Standardize Python versions on managed hosts",
    "Test fact gathering after image updates"
  ],
  "fix": [
    "Restore connectivity to the managed host",
    "Install a supported Python interpreter if required",
    "Set ansible_python_interpreter when auto-detection selects the wrong path",
    "Review become settings and permissions"
  ],
  "title": "Ansible Facts Gathering Failure",
  "diagnosis": [
    "ansible HOST -i inventory.ini -m ansible.builtin.ping -vvv",
    "ansible HOST -i inventory.ini -m ansible.builtin.setup -vvv",
    "ansible --version"
  ],
  "causes": [
    "Python unavailable on managed host",
    "SSH or privilege escalation failure",
    "Unsupported fact-gathering environment"
  ],
  "symptoms": [
    "Gathering Facts task fails",
    "Playbook stops before normal tasks"
  ]
} as const;

export default guide;
