// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "Run the playbook in check mode where supported",
    "Inspect the rendered file for expected values"
  ],
  "prevent": [
    "Version-control templates",
    "Add linting and representative test variables"
  ],
  "fix": [
    "Correct Jinja2 braces, filters and control blocks",
    "Define required variables with appropriate defaults where valid",
    "Escape literal template delimiters when needed",
    "Test rendered output in staging before deployment"
  ],
  "title": "Ansible Template Rendering Error",
  "diagnosis": [
    "ansible-playbook -i inventory.ini site.yml --syntax-check",
    "ansible-playbook -i inventory.ini site.yml --check -vvv",
    "Inspect the referenced .j2 template and variable files"
  ],
  "causes": [
    "Invalid Jinja2 syntax",
    "Missing variable",
    "Incorrect template delimiters"
  ],
  "symptoms": [
    "Template task fails",
    "Jinja2 syntax or rendering error"
  ]
} as const;

export default guide;
