// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "ansible TARGET_GROUP -i inventory.ini -m ansible.builtin.ping"
  ],
  "prevent": [
    "Monitor host reachability",
    "Validate inventory and connectivity before deployment"
  ],
  "fix": [
    "Correct inventory address and connection settings",
    "Restore network access and target management service",
    "Verify credentials and host identity",
    "Check firewall and security-group rules"
  ],
  "title": "Ansible Hosts Unreachable",
  "diagnosis": [
    "ansible-inventory -i inventory.ini --graph",
    "ansible HOST -i inventory.ini -m ansible.builtin.ping -vvv",
    "Test DNS, route and the configured management port"
  ],
  "causes": [
    "Network or DNS failure",
    "Invalid credentials",
    "SSH or WinRM service unavailable"
  ],
  "symptoms": [
    "UNREACHABLE! result",
    "Some hosts are skipped due to connection errors"
  ]
} as const;

export default guide;
