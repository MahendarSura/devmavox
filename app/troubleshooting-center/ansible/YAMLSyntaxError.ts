// Auto-generated Ansible troubleshooting guide.
// Commands are diagnostic examples; replace HOST, USER, inventory.ini and site.yml
// with values appropriate to your environment. Review before production use.
export const guide = {
  "verify": [
    "ansible-playbook -i inventory.ini site.yml --syntax-check"
  ],
  "prevent": [
    "Use editor YAML validation",
    "Run yamllint and syntax checks in CI"
  ],
  "fix": [
    "Use spaces instead of tabs",
    "Align list items and mapping keys consistently",
    "Quote strings containing YAML-special characters when necessary",
    "Correct the exact line identified by the parser"
  ],
  "title": "Ansible YAML Syntax Error",
  "diagnosis": [
    "ansible-playbook -i inventory.ini site.yml --syntax-check",
    "yamllint site.yml"
  ],
  "causes": [
    "Incorrect indentation",
    "Tabs used for indentation",
    "Missing colon, quote or list marker"
  ],
  "symptoms": [
    "Playbook parsing fails",
    "Mapping values or indentation errors"
  ]
} as const;

export default guide;
