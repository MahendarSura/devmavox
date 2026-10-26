// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "Check installed package version on the target host",
    "Re-run the package task and confirm it is unchanged on the second run"
  ],
  "prevent": [
    "Use distribution-aware variables",
    "Test repository and package changes in staging"
  ],
  "fix": [
    "Confirm package name for the target distribution",
    "Restore repository connectivity and valid repository configuration",
    "Refresh metadata using the OS-appropriate package module options",
    "Wait for a legitimate package-manager lock to clear; do not delete active locks blindly"
  ],
  "title": "Ansible Package Task Failure",
  "diagnosis": [
    "ansible HOST -i inventory.ini -m ansible.builtin.package_facts",
    "Check the target OS and package manager",
    "Inspect the target host package-manager logs"
  ],
  "causes": [
    "Wrong package name",
    "Repository metadata is stale",
    "Package manager lock or repository outage"
  ],
  "symptoms": [
    "Package installation task fails",
    "Package manager reports unavailable package or lock"
  ]
} as const;

export default guide;
