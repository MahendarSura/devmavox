// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "ssh USER@HOST",
    "ansible HOST -i inventory.ini -m ansible.builtin.ping"
  ],
  "prevent": [
    "Manage keys securely",
    "Rotate keys through an approved process",
    "Maintain trusted host-key records"
  ],
  "fix": [
    "Set the correct ansible_user and private-key configuration",
    "Check key permissions and authorized_keys",
    "Verify sshd is running and reachable",
    "Verify host identity securely; do not disable host-key checking as a permanent fix"
  ],
  "title": "Ansible SSH Connection Failure",
  "diagnosis": [
    "ssh -vvv USER@HOST",
    "ansible HOST -i inventory.ini -m ansible.builtin.ping -vvv",
    "Check SSH service status on the target"
  ],
  "causes": [
    "Wrong username or private key",
    "SSH service is unavailable",
    "Host key changed or is not trusted"
  ],
  "symptoms": [
    "Permission denied publickey",
    "Host key verification failed",
    "SSH connection is refused"
  ]
} as const;

export default guide;
