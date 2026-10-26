// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "ansible HOST -i inventory.ini -m ansible.builtin.ping"
  ],
  "prevent": [
    "Install Python in base images",
    "Keep interpreter paths consistent across hosts"
  ],
  "fix": [
    "Install a supported Python interpreter using the host's approved provisioning method",
    "Set ansible_python_interpreter to the actual interpreter path",
    "Use raw only for bootstrap tasks when Python is unavailable"
  ],
  "title": "Ansible Python Interpreter Failure",
  "diagnosis": [
    "ansible HOST -i inventory.ini -m ansible.builtin.raw -a 'command -v python3 || command -v python'",
    "ansible HOST -i inventory.ini -m ansible.builtin.ping -vvv"
  ],
  "causes": [
    "Python is missing",
    "Interpreter path is incorrect",
    "Interpreter version is incompatible"
  ],
  "symptoms": [
    "Python interpreter not found",
    "Module execution fails on managed host"
  ]
} as const;

export default guide;
