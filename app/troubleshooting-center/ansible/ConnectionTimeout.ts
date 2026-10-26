// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "ansible all -i inventory.ini -m ansible.builtin.ping"
  ],
  "prevent": [
    "Monitor SSH availability",
    "Keep inventory addresses and network rules reviewed"
  ],
  "fix": [
    "Verify the host address and SSH port in inventory",
    "Check routing, security groups and firewalls",
    "Verify sshd is running on the target",
    "Set the correct ansible_port if SSH uses a custom port"
  ],
  "title": "Ansible Connection Timeout",
  "diagnosis": [
    "ansible all -i inventory.ini -m ansible.builtin.ping -vvv",
    "ssh -vvv user@HOST",
    "Test-NetConnection HOST -Port 22"
  ],
  "causes": [
    "Firewall blocks TCP port 22",
    "Wrong host address or routing",
    "SSH service is down"
  ],
  "symptoms": [
    "SSH connection times out",
    "Ansible cannot establish a session"
  ]
} as const;

export default guide;
