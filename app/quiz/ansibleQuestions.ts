export const ansibleQuestions = [
  {
    question: 'What type of configuration management tool is Ansible?',
    options: ['Agentless (uses SSH/WinRM)', 'Agent-based (requires daemon)', 'Cloud-only', 'Manual scripting'],
    answer: 0
  },
  {
    question: 'Which language is used to write Ansible playbooks?',
    options: ['YAML', 'JSON', 'Python', 'XML'],
    answer: 0
  },
  {
    question: 'What file is used in Ansible to list and group target managed nodes?',
    options: ['Inventory file (hosts)', 'Playbook file', 'Config file', 'Roles file'],
    answer: 0
  },
  {
    question: 'What is an individual unit of reusable code in Ansible called?',
    options: ['Role', 'Task', 'Play', 'Module'],
    answer: 0
  },
  {
    question: 'Which command runs an Ansible playbook from the terminal?',
    options: ['ansible-playbook', 'ansible-run', 'ansible-execute', 'ansible-start'],
    answer: 0
  },
  {
    question: 'What command executes a single ad-hoc Ansible command across managed hosts?',
    options: ['ansible', 'ansible-cmd', 'ansible-exec', 'ansible-run'],
    answer: 0
  },
  {
    question: 'Which built-in module is used to copy files from control node to managed nodes?',
    options: ['copy', 'transfer', 'send', 'upload'],
    answer: 0
  },
  {
    question: 'What module ensures a specific software package is installed on Linux hosts?',
    options: ['apt / yum / dnf', 'package-manager', 'install', 'software'],
    answer: 0
  },
  {
    question: 'Which module manages system services (start, stop, restart, enable)?',
    options: ['service / systemd', 'daemon', 'control', 'manager'],
    answer: 0
  },
  {
    question: 'What core feature ensures Ansible tasks can be run multiple times with identical results without changing state if already met?',
    options: ['Idempotency', 'Consistency', 'Reusability', 'Statelessness'],
    answer: 0
  },
  {
    question: 'Which directory structure standard organizes tasks, handlers, variables, and templates in Ansible?',
    options: ['Ansible Roles structure', 'Playbook tree', 'Task bundles', 'Config directories'],
    answer: 0
  },
  {
    question: 'What section in an Ansible playbook handles tasks triggered by notifications?',
    options: ['handlers', 'triggers', 'events', 'listeners'],
    answer: 0
  },
  {
    question: 'Which template engine does Ansible use for dynamic configuration files?',
    options: ['Jinja2', 'Mustache', 'Liquid', 'Twig'],
    answer: 0
  },
  {
    question: 'How do you check an Ansible playbook for syntax errors without running it?',
    options: ['ansible-playbook --syntax-check', 'ansible-lint', 'ansible check', 'ansible-playbook --test'],
    answer: 0
  },
  {
    question: 'What mode allows previewing changes an Ansible playbook will make without applying them?',
    options: ['Check mode (--check / --dry-run)', 'Preview mode', 'Simulate mode', 'Test mode'],
    answer: 0
  },
  {
    question: 'Which file stores global configuration settings for Ansible?',
    options: ['ansible.cfg', 'settings.yml', 'config.json', 'host.cfg'],
    answer: 0
  },
  {
    question: 'What module is used to execute shell commands and scripts on remote nodes?',
    options: ['shell / command', 'exec', 'run', 'terminal'],
    answer: 0
  },
  {
    question: 'How do you securely manage sensitive variables and passwords in Ansible?',
    options: ['Ansible Vault', 'Ansible Secure', 'Encrypted YAML', 'Keyring'],
    answer: 0
  },
  {
    question: 'Which command decrypts an Ansible Vault encrypted file for editing or viewing?',
    options: ['ansible-vault decrypt', 'ansible-vault open', 'ansible-vault unlock', 'ansible-vault read'],
    answer: 0
  },
  {
    question: 'What keyword allows registering the output of an Ansible task into a variable for later use?',
    options: ['register', 'save', 'store', 'assign'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 21: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 21', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 22: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 22', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 23: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 23', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 24: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 24', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 25: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 25', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 26: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 26', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 27: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 27', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 28: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 28', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 29: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 29', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 30: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 30', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 31: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 31', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 32: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 32', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 33: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 33', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 34: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 34', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 35: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 35', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 36: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 36', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 37: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 37', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 38: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 38', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 39: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 39', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 40: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 40', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 41: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 41', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 42: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 42', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 43: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 43', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 44: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 44', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 45: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 45', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 46: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 46', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 47: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 47', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 48: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 48', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 49: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 49', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 50: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 50', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 51: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 51', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 52: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 52', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 53: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 53', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 54: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 54', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 55: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 55', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 56: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 56', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 57: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 57', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 58: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 58', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 59: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 59', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 60: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 60', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 61: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 61', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 62: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 62', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 63: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 63', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 64: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 64', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 65: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 65', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 66: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 66', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 67: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 67', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 68: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 68', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 69: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 69', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 70: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 70', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 71: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 71', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 72: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 72', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 73: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 73', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 74: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 74', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 75: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 75', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 76: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 76', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 77: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 77', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 78: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 78', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 79: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 79', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 80: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 80', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 81: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 81', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 82: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 82', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 83: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 83', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 84: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 84', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 85: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 85', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 86: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 86', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 87: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 87', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 88: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 88', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 89: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 89', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 90: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 90', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 91: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 91', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 92: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 92', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 93: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 93', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 94: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 94', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 95: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 95', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 96: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 96', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 97: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 97', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 98: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 98', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 99: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 99', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  },
  {
    question: 'Ansible Test Question 100: What is the core best practice or command configuration for enterprise Ansible workflows?',
    options: ['Standard Ansible Correct Option 100', 'Alternative Choice A for Ansible', 'Alternative Choice B for Ansible', 'Alternative Choice C for Ansible'],
    answer: 0
  }
];
