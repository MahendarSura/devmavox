// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "Run a harmless id command with the intended become settings"
  ],
  "prevent": [
    "Review sudoers changes",
    "Never store escalation passwords in plaintext"
  ],
  "fix": [
    "Enable become at the correct play or task scope",
    "Use the approved privilege escalation account",
    "Configure the required password through Ansible Vault or a secret manager",
    "Grant only the minimum required sudo privileges"
  ],
  "title": "Ansible Privilege Escalation Failure",
  "diagnosis": [
    "ansible HOST -i inventory.ini -m ansible.builtin.command -a 'id' -vvv",
    "Check sudo policy on the target host",
    "Review playbook become and become_user settings"
  ],
  "causes": [
    "Incorrect become configuration",
    "Account lacks sudo rights",
    "Privilege escalation password is missing or wrong"
  ],
  "symptoms": [
    "sudo password required",
    "Become failed or permission denied"
  ]
} as const;

export default guide;
