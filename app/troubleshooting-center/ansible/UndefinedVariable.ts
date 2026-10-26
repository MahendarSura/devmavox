// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "Run the affected play against a test host",
    "Confirm the resolved value is correct without exposing secrets"
  ],
  "prevent": [
    "Use consistent variable naming",
    "Lint playbooks and test required variables"
  ],
  "fix": [
    "Correct variable spelling",
    "Load the intended variable file",
    "Define the variable in the correct scope",
    "Use default only when a fallback is logically safe"
  ],
  "title": "Ansible Undefined Variable",
  "diagnosis": [
    "ansible-inventory -i inventory.ini --host HOST",
    "ansible-playbook -i inventory.ini site.yml --syntax-check",
    "Review vars_files, group_vars, host_vars and role defaults"
  ],
  "causes": [
    "Variable misspelled",
    "Variable file not loaded",
    "Unexpected variable scope or precedence"
  ],
  "symptoms": [
    "'variable is undefined' error",
    "Template or task cannot resolve a variable"
  ]
} as const;

export default guide;
