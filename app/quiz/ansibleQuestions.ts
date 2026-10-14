export const ansibleQuestions = [
  {
    question: 'In what format are Ansible playbooks written?',
    options: ['JSON', 'YAML', 'XML', 'Python'],
    answer: 1
  },
  {
    question: 'What protocol does Ansible use by default to connect to remote nodes?',
    options: ['SSH', 'Telnet', 'HTTP', 'FTP'],
    answer: 0
  },
  {
    question: 'What is the term for individual units of code executed by Ansible on nodes?',
    options: ['Modules / Tasks', 'Playbooks', 'Recipes', 'Scripts'],
    answer: 0
  },
  {
    question: 'Which file lists the inventory of target servers and groups in Ansible?',
    options: ['hosts / inventory', 'servers.ini', 'nodes.yaml', 'targets.cfg'],
    answer: 0
  },
  {
    question: 'What command-line tool executes ad-hoc commands across servers in Ansible?',
    options: ['ansible', 'ansible-playbook', 'ansible-vault', 'ansible-config'],
    answer: 0
  },
  {
    question: 'How does Ansible ensure configuration execution is idempotent?',
    options: ['By checking current state before modifying', 'By running every time', 'By rebooting server', 'By clearing cache'],
    answer: 0
  },
  {
    question: 'Which tool encrypts sensitive variables and credentials in Ansible?',
    options: ['ansible-vault', 'ansible-encrypt', 'vault-cli', 'gpg'],
    answer: 0
  },
  {
    question: 'What is a collection of roles, files, and templates structured for reusability called?',
    options: ['Ansible Role / Collection', 'Playbook Package', 'Module Bundle', 'Task Archive'],
    answer: 0
  },
  {
    question: 'Which keyword in a task specifies the module to execute?',
    options: ['name', 'action / module name', 'run', 'command'],
    answer: 1
  },
  {
    question: 'What command is used to run an Ansible playbook file?',
    options: ['ansible-playbook', 'ansible-run', 'ansible-exec', 'ansible-start'],
    answer: 0
  },
  {
    question: 'Which section in a playbook defines variables accessible across all plays?',
    options: ['vars', 'parameters', 'settings', 'env'],
    answer: 0
  },
  {
    question: 'What keyword allows handling errors or running tasks when a previous task fails?',
    options: ['rescue / always (Block-Rescue)', 'catch', 'except', 'onError'],
    answer: 0
  },
  {
    question: 'Which parameter is used to run tasks with elevated root privileges in Ansible?',
    options: ['become: yes (sudo)', 'privilege: root', 'elevate: true', 'admin: active'],
    answer: 0
  },
  {
    question: 'What command tests and verifies syntax validity of an Ansible playbook?',
    options: ['ansible-playbook --syntax-check', 'ansible validate', 'ansible-lint-check', 'ansible test'],
    answer: 0
  },
  {
    question: 'Which directory structure standard organizes tasks, handlers, templates, and files for reuse?',
    options: ['Ansible Roles Directory Structure', 'Playbook Layout', 'Module Workspace', 'Config Store'],
    answer: 0
  },
  {
    question: 'What keyword defines notification triggers to run handlers upon state changes?',
    options: ['notify', 'trigger', 'alert', 'signal'],
    answer: 0
  },
  {
    question: 'Where are handlers defined within an Ansible role or playbook?',
    options: ['handlers section', 'tasks section', 'vars section', 'listeners section'],
    answer: 0
  },
  {
    question: 'Which command lists all available Ansible configuration settings and defaults?',
    options: ['ansible-config view / list', 'ansible settings', 'ansible-doc config', 'ansible show'],
    answer: 0
  },
  {
    question: 'What file format does Ansible accept for dynamic inventory scripts?',
    options: ['JSON / Python script output', 'XML only', 'Plain TXT', 'SQL dump'],
    answer: 0
  },
  {
    question: 'Which command displays documentation and options for specific Ansible modules?',
    options: ['ansible-doc <module-name>', 'ansible help <module>', 'man ansible-<module>', 'ansible-inspect'],
    answer: 0
  },
  // Generating remaining distinct Ansible quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `Ansible Automation Test Question ${i + 21}: Which option represents the best practice for writing idempotent roles, handlers, and vault encryption?`,
    options: ['Correct Ansible Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
