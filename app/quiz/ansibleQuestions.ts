export interface AnsibleQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const ansibleQuestions: AnsibleQuestion[] = [
  {
    question: "What is Ansible primarily used for?",
    options: [
      "Database management only",
      "IT automation and configuration management",
      "Frontend development",
      "Operating system compilation"
    ],
    answer: 1
  },
  {
    question: "Which architecture does Ansible primarily use to manage Linux hosts?",
    options: [
      "Mandatory agent-based architecture",
      "Browser-based architecture",
      "Agentless architecture using SSH",
      "Database-driven architecture"
    ],
    answer: 2
  },
  {
    question: "Which command displays the installed Ansible version?",
    options: [
      "ansible --version",
      "ansible --status",
      "ansible version --all",
      "ansible show-version"
    ],
    answer: 0
  },
  {
    question: "Which file is commonly used to configure Ansible settings?",
    options: [
      "ansible.json",
      "inventory.yml",
      "playbook.cfg",
      "ansible.cfg"
    ],
    answer: 3
  },
  {
    question: "Which command executes an Ansible playbook?",
    options: [
      "ansible-run site.yml",
      "ansible-playbook site.yml",
      "ansible-execute site.yml",
      "ansible-config site.yml"
    ],
    answer: 1
  },
  {
    question: "What is an Ansible inventory?",
    options: [
      "A collection of Python libraries",
      "A log of completed tasks",
      "A list or definition of managed hosts and groups",
      "A directory containing only roles"
    ],
    answer: 2
  },
  {
    question: "How is a host group commonly declared in an INI inventory?",
    options: [
      "[webservers]",
      "{webservers}",
      "<webservers>",
      "group: webservers"
    ],
    answer: 0
  },
  {
    question: "Which command tests Ansible connectivity to hosts in the webservers group?",
    options: [
      "ansible-playbook webservers -m ping",
      "ansible-ping webservers",
      "ansible webservers --connect",
      "ansible webservers -m ping"
    ],
    answer: 3
  },
  {
    question: "What does the -i option specify in an Ansible command?",
    options: [
      "Python interpreter",
      "Inventory source",
      "Input password",
      "Installation directory"
    ],
    answer: 1
  },
  {
    question: "Which inventory group contains all inventory hosts?",
    options: [
      "global",
      "all_hosts",
      "all",
      "every_host"
    ],
    answer: 2
  },
  {
    question: "Which file format is commonly used for Ansible playbooks?",
    options: [
      "YAML",
      "PDF",
      "EXE",
      "SQL"
    ],
    answer: 0
  },
  {
    question: "Which keyword identifies the target hosts in a play?",
    options: [
      "targets",
      "machines",
      "inventory",
      "hosts"
    ],
    answer: 3
  },
  {
    question: "What does gather_facts: false do?",
    options: [
      "Disables all task execution",
      "Skips automatic fact gathering for that play",
      "Disables the inventory",
      "Prevents handlers from running"
    ],
    answer: 1
  },
  {
    question: "Which module is commonly used to install packages across supported package managers?",
    options: [
      "service",
      "copy",
      "package",
      "template"
    ],
    answer: 2
  },
  {
    question: "Which module manages services such as starting, stopping, and enabling them?",
    options: [
      "service",
      "file",
      "debug",
      "fetch"
    ],
    answer: 0
  },
  {
    question: "Which module manages file and directory permissions and state?",
    options: [
      "command",
      "setup",
      "uri",
      "file"
    ],
    answer: 3
  },
  {
    question: "Which module copies a local file to a managed host?",
    options: [
      "fetch",
      "copy",
      "get_url",
      "stat"
    ],
    answer: 1
  },
  {
    question: "Which module renders a Jinja2 template and transfers the resulting file to a managed host?",
    options: [
      "replace",
      "assemble",
      "template",
      "lineinfile"
    ],
    answer: 2
  },
  {
    question: "Which module executes a command without using a shell?",
    options: [
      "command",
      "shell",
      "script",
      "raw"
    ],
    answer: 0
  },
  {
    question: "Which module executes a command through the remote shell?",
    options: [
      "command",
      "package",
      "file",
      "shell"
    ],
    answer: 3
  },
  {
    question: "Which module ensures that a particular line is present in a file?",
    options: [
      "copy",
      "lineinfile",
      "stat",
      "find"
    ],
    answer: 1
  },
  {
    question: "Which module retrieves metadata about a file?",
    options: [
      "fetch",
      "file",
      "stat",
      "setup"
    ],
    answer: 2
  },
  {
    question: "Which module downloads a file from a URL to a managed host?",
    options: [
      "get_url",
      "copy",
      "template",
      "unarchive"
    ],
    answer: 0
  },
  {
    question: "Which module extracts archive files on a managed host?",
    options: [
      "archive",
      "package",
      "assemble",
      "unarchive"
    ],
    answer: 3
  },
  {
    question: "Which module retrieves a file from a managed host to the control node?",
    options: [
      "copy",
      "fetch",
      "get_url",
      "template"
    ],
    answer: 1
  },
  {
    question: "Which module displays debugging messages or variable values?",
    options: [
      "assert",
      "fail",
      "debug",
      "pause"
    ],
    answer: 2
  },
  {
    question: "Which module explicitly fails a task with a custom message?",
    options: [
      "fail",
      "debug",
      "set_fact",
      "include_vars"
    ],
    answer: 0
  },
  {
    question: "Which module verifies that specified conditions are true?",
    options: [
      "wait_for",
      "debug",
      "meta",
      "assert"
    ],
    answer: 3
  },
  {
    question: "Which syntax references an Ansible variable in a Jinja2 expression?",
    options: [
      "$(variable)",
      "{{ variable }}",
      "{variable}",
      "<variable>"
    ],
    answer: 1
  },
  {
    question: "Which keyword defines variables directly within a play?",
    options: [
      "values",
      "parameters",
      "vars",
      "definitions"
    ],
    answer: 2
  },
  {
    question: "Which keyword prompts the user for variable values when running a playbook interactively?",
    options: [
      "vars_prompt",
      "input_vars",
      "ask_variables",
      "interactive"
    ],
    answer: 0
  },
  {
    question: "Which module can define a variable for use in subsequent tasks?",
    options: [
      "setup",
      "include_tasks",
      "add_host",
      "set_fact"
    ],
    answer: 3
  },
  {
    question: "Which module loads variables from an external YAML or JSON file?",
    options: [
      "template",
      "include_vars",
      "copy",
      "fetch"
    ],
    answer: 1
  },
  {
    question: "Which special variable identifies the current inventory hostname?",
    options: [
      "ansible_host",
      "hostvars",
      "inventory_hostname",
      "groups"
    ],
    answer: 2
  },
  {
    question: "Which special variable provides access to inventory groups and their hosts?",
    options: [
      "groups",
      "hostvars",
      "group_names",
      "inventory_hostname"
    ],
    answer: 0
  },
  {
    question: "What information does the hostvars variable provide?",
    options: [
      "Only controller configuration",
      "Only Vault passwords",
      "Only role names",
      "Variables and facts associated with inventory hosts"
    ],
    answer: 3
  },
  {
    question: "Which keyword iterates a task over a list of items?",
    options: [
      "foreach",
      "loop",
      "repeat",
      "iterate"
    ],
    answer: 1
  },
  {
    question: "Which keyword conditionally executes a task?",
    options: [
      "unless",
      "if_task",
      "when",
      "condition"
    ],
    answer: 2
  },
  {
    question: "Which keyword stores a task's result in a variable?",
    options: [
      "register",
      "capture",
      "save_result",
      "result"
    ],
    answer: 0
  },
  {
    question: "What is the primary purpose of an Ansible role?",
    options: [
      "To replace the inventory",
      "To encrypt every playbook",
      "To create SSH connections automatically",
      "To organize reusable automation content"
    ],
    answer: 3
  },
  {
    question: "Which directory in a role conventionally contains task files?",
    options: [
      "commands/",
      "tasks/",
      "playbooks/",
      "executables/"
    ],
    answer: 1
  },
  {
    question: "Which directory conventionally contains a role's default variables?",
    options: [
      "settings/",
      "config/",
      "defaults/",
      "variables_default/"
    ],
    answer: 2
  },
  {
    question: "Which directory conventionally contains a role's handler definitions?",
    options: [
      "handlers/",
      "events/",
      "callbacks/",
      "notifications/"
    ],
    answer: 0
  },
  {
    question: "Which keyword invokes roles within a play?",
    options: [
      "role_files",
      "include_role_only",
      "collections",
      "roles"
    ],
    answer: 3
  },
  {
    question: "What normally triggers a handler to run?",
    options: [
      "Every successful task",
      "A task reporting a change and notifying the handler",
      "Every debug message",
      "The start of fact gathering"
    ],
    answer: 1
  },
  {
    question: "When do notified handlers normally run?",
    options: [
      "Before every task",
      "Immediately after every task",
      "At the end of the play's task section, unless flushed earlier",
      "Only when a task fails"
    ],
    answer: 2
  },
  {
    question: "Which command creates a new Ansible Vault-encrypted file?",
    options: [
      "ansible-vault create",
      "ansible-vault lock",
      "ansible-config encrypt",
      "ansible-playbook --vault-create"
    ],
    answer: 0
  },
  {
    question: "Which command encrypts an existing plaintext file with Ansible Vault?",
    options: [
      "ansible-vault encode",
      "ansible-vault secure",
      "ansible-playbook --encrypt",
      "ansible-vault encrypt"
    ],
    answer: 3
  },
  {
    question: "Which command edits a Vault-encrypted file using an editor?",
    options: [
      "ansible-vault modify",
      "ansible-vault edit",
      "ansible-vault update",
      "ansible-config edit"
    ],
    answer: 1
  },
  {
    question: "Which option supplies a Vault password file to ansible-playbook?",
    options: [
      "--vault-secret",
      "--encrypt-file",
      "--vault-password-file",
      "--private-key-file"
    ],
    answer: 2
  },
  {
    question: "Which keyword enables privilege escalation for a task or play?",
    options: [
      "sudo_mode",
      "root_access",
      "become",
      "admin"
    ],
    answer: 2
  },
  {
    question: "Which keyword specifies the user account to become during privilege escalation?",
    options: [
      "become_user",
      "remote_user",
      "login_user",
      "admin_user"
    ],
    answer: 0
  },
  {
    question: "Which command prompts for the privilege-escalation password when running a playbook?",
    options: [
      "ansible-playbook --ask-password site.yml",
      "ansible-playbook --sudo site.yml",
      "ansible-playbook --root-pass site.yml",
      "ansible-playbook --ask-become-pass site.yml"
    ],
    answer: 3
  },
  {
    question: "Which command checks playbook syntax without executing its tasks?",
    options: [
      "ansible-playbook --validate site.yml",
      "ansible-playbook --syntax-check site.yml",
      "ansible-config --check site.yml",
      "ansible-playbook --dry-parse site.yml"
    ],
    answer: 1
  },
  {
    question: "What does check mode generally do when supported by the tasks and modules?",
    options: [
      "Encrypts all files before execution",
      "Runs every task twice",
      "Simulates changes where supported without intentionally applying normal changes",
      "Automatically rolls back all changes"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of the --diff option?",
    options: [
      "To display differences in file content for supported tasks",
      "To display SSH passwords",
      "To list all installed collections",
      "To compare inventory group names only"
    ],
    answer: 0
  },
  {
    question: "Which keyword defines a custom condition for determining whether a task reports a change?",
    options: [
      "failed_when",
      "changed_if",
      "force_changed",
      "changed_when"
    ],
    answer: 3
  },
  {
    question: "Which keyword defines a custom condition under which a task is considered failed?",
    options: [
      "changed_when",
      "failed_when",
      "rescue_when",
      "error_when"
    ],
    answer: 1
  },
  {
    question: "What does ignore_errors: true do when an ordinary task fails?",
    options: [
      "Retries the task forever",
      "Converts the failure into a changed result",
      "Allows execution to continue after the handled task failure",
      "Disables error handling for the entire Ansible installation"
    ],
    answer: 2
  },
  {
    question: "Which block section executes when a task in the block fails and Ansible can handle the failure?",
    options: [
      "rescue",
      "always",
      "finally",
      "rollback"
    ],
    answer: 0
  },
  {
    question: "Which block section is intended to run whether the block succeeds or fails, subject to normal execution conditions?",
    options: [
      "rescue",
      "catch",
      "cleanup_only",
      "always"
    ],
    answer: 3
  },
  {
    question: "Which keyword specifies how many retries Ansible should make for a task used with until?",
    options: [
      "attempts",
      "retries",
      "repeat_count",
      "max_runs"
    ],
    answer: 1
  },
  {
    question: "Which keyword specifies the delay in seconds between retries?",
    options: [
      "interval",
      "wait",
      "delay",
      "sleep"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of the until keyword?",
    options: [
      "To retry a task until a specified condition is satisfied",
      "To stop all plays after the first task",
      "To run tasks only on localhost",
      "To disable task retries"
    ],
    answer: 0
  },
  {
    question: "Which keyword limits how many hosts are processed in each batch of a play?",
    options: [
      "forks",
      "batch",
      "host_limit",
      "serial"
    ],
    answer: 3
  },
  {
    question: "What does the forks setting control?",
    options: [
      "The number of roles loaded",
      "The maximum number of parallel worker processes used to manage hosts",
      "The number of tasks in a play",
      "The number of inventory groups"
    ],
    answer: 1
  },
  {
    question: "Which execution strategy runs tasks across hosts in lockstep by default?",
    options: [
      "free",
      "host_pinned",
      "linear",
      "parallel_only"
    ],
    answer: 2
  },
  {
    question: "What is a key characteristic of the free strategy?",
    options: [
      "Each host can progress through tasks without waiting for other hosts to finish the same task",
      "Only one host can execute at a time",
      "Handlers are permanently disabled",
      "Every task must run on localhost"
    ],
    answer: 0
  },
  {
    question: "Which keyword sets the maximum percentage of failed hosts allowed before a play is aborted?",
    options: [
      "max_failures",
      "failure_limit",
      "abort_percentage",
      "max_fail_percentage"
    ],
    answer: 3
  },
  {
    question: "Which keyword runs a task on a specified host rather than the current inventory host?",
    options: [
      "run_on",
      "delegate_to",
      "execute_host",
      "target_host"
    ],
    answer: 1
  },
  {
    question: "What does run_once: true generally do?",
    options: [
      "Runs a task only when it fails",
      "Runs a task on every host exactly once per playbook invocation",
      "Runs a task once for the current batch instead of independently on every host",
      "Caches the task result permanently"
    ],
    answer: 2
  },
  {
    question: "Which keyword enables asynchronous execution of a task with a specified time limit?",
    options: [
      "async",
      "background",
      "parallel_task",
      "async_task"
    ],
    answer: 0
  },
  {
    question: "Which keyword controls how frequently Ansible polls an asynchronous task for its result?",
    options: [
      "interval",
      "wait",
      "async_wait",
      "poll"
    ],
    answer: 3
  },
  {
    question: "Which option restricts a playbook to selected inventory hosts?",
    options: [
      "--hosts",
      "--limit",
      "--inventory-filter",
      "--target-only"
    ],
    answer: 1
  },
  {
    question: "Which option runs tasks that match a specified tag?",
    options: [
      "--task-name",
      "--only-task",
      "--tags",
      "--filter-tasks"
    ],
    answer: 2
  },
  {
    question: "Which option skips tasks associated with specified tags?",
    options: [
      "--skip-tags",
      "--exclude-tasks",
      "--ignore-tasks",
      "--omit-tags"
    ],
    answer: 0
  },
  {
    question: "What is an Ansible collection?",
    options: [
      "A database of managed host passwords",
      "A list of active SSH sessions",
      "A replacement for YAML syntax",
      "A distributable package containing related Ansible content such as modules, plugins, and roles"
    ],
    answer: 3
  },
  {
    question: "Which command installs an Ansible collection?",
    options: [
      "ansible-role collection install",
      "ansible-galaxy collection install",
      "ansible-playbook --install-collection",
      "ansible-config collection add"
    ],
    answer: 1
  },
  {
    question: "What does community.general.timezone represent?",
    options: [
      "An inventory group",
      "A playbook filename",
      "A timezone module in the community.general collection",
      "A Vault password variable"
    ],
    answer: 2
  },
  {
    question: "Which command initializes a new Ansible role directory structure?",
    options: [
      "ansible-galaxy role init",
      "ansible-role create",
      "ansible-playbook --new-role",
      "ansible-config role init"
    ],
    answer: 0
  },
  {
    question: "Which command initializes a new Ansible collection skeleton?",
    options: [
      "ansible-collection create",
      "ansible-playbook collection init",
      "ansible-config collection create",
      "ansible-galaxy collection init"
    ],
    answer: 3
  },
  {
    question: "Which plugin type can obtain hosts dynamically from an external cloud provider?",
    options: [
      "Callback plugin",
      "Inventory plugin",
      "Filter plugin",
      "Lookup plugin only"
    ],
    answer: 1
  },
  {
    question: "How can Ansible automate cloud infrastructure such as virtual machines and networks?",
    options: [
      "Only through the debug module",
      "Only by editing local text files",
      "Through provider APIs and suitable modules or collections",
      "Only through ICMP ping"
    ],
    answer: 2
  },
  {
    question: "What is the primary purpose of a Jinja2 template in Ansible?",
    options: [
      "To generate files using variables and template expressions",
      "To replace SSH authentication",
      "To compile Python into machine code",
      "To encrypt every inventory automatically"
    ],
    answer: 0
  },
  {
    question: "Which Jinja2 control structure iterates over a list?",
    options: [
      "{{ each item }}",
      "{% when item %}",
      "{# for item in items #}",
      "{% for item in items %}"
    ],
    answer: 3
  },
  {
    question: "Which Jinja2 filter provides a fallback for an undefined variable?",
    options: [
      "fallback_value()",
      "default('value')",
      "otherwise('value')",
      "undefined_to('value')"
    ],
    answer: 1
  },
  {
    question: "Which module gathers system facts from a managed host?",
    options: [
      "debug",
      "vars",
      "setup",
      "fact_collector"
    ],
    answer: 2
  },
  {
    question: "Which variable can specify the Python interpreter on a managed host?",
    options: [
      "ansible_python_interpreter",
      "ansible_shell_interpreter_only",
      "ansible_remote_python_path",
      "python_executable"
    ],
    answer: 0
  },
  {
    question: "Which command runs a playbook locally using an inline localhost inventory?",
    options: [
      "ansible-playbook --remote localhost site.yml",
      "ansible-playbook --connection ssh site.yml",
      "ansible localhost -m playbook",
      "ansible-playbook -i localhost, -c local site.yml"
    ],
    answer: 3
  },
  {
    question: "What does the trailing comma in -i localhost, indicate?",
    options: [
      "That localhost is a group name",
      "That the inventory is specified inline as a host list",
      "That Vault encryption is enabled",
      "That the SSH connection is disabled automatically"
    ],
    answer: 1
  },
  {
    question: "Which keyword specifies the remote login account for a play?",
    options: [
      "become_user",
      "login_account",
      "remote_user",
      "ssh_account"
    ],
    answer: 2
  },
  {
    question: "Which connection type is commonly used for network devices that do not provide a conventional shell?",
    options: [
      "Connection plugins such as network_cli or httpapi",
      "Only the local connection",
      "Only the database connection",
      "Browser connection"
    ],
    answer: 0
  },
  {
    question: "Which module is designed to interact with HTTP and HTTPS endpoints?",
    options: [
      "service",
      "stat",
      "package",
      "uri"
    ],
    answer: 3
  },
  {
    question: "Which keyword controls the order in which hosts are processed within a play?",
    options: [
      "host_sequence",
      "order",
      "execution_order",
      "inventory_priority"
    ],
    answer: 1
  },
  {
    question: "What does any_errors_fatal: true generally do?",
    options: [
      "Ignores all failures",
      "Retries failed tasks indefinitely",
      "Stops the play across hosts after a fatal task failure",
      "Disables error reporting"
    ],
    answer: 2
  },
  {
    question: "Which module can wait for a port to become available or a supported condition to be met?",
    options: [
      "wait_for",
      "debug",
      "set_fact",
      "meta"
    ],
    answer: 0
  },
  {
    question: "Which keyword can force Ansible to run notified handlers immediately at a specific point in a play?",
    options: [
      "flush_handlers: true",
      "run_handlers_now: true",
      "handlers_immediate: true",
      "meta: flush_handlers"
    ],
    answer: 3
  },
  {
    question: "Which command lists installed Ansible Galaxy roles?",
    options: [
      "ansible-playbook --list-roles-installed",
      "ansible-galaxy role list",
      "ansible-config roles",
      "ansible role --show"
    ],
    answer: 1
  },
  {
    question: "What does idempotency mean in Ansible automation?",
    options: [
      "Every task must run twice",
      "Every task must run as root",
      "Repeated runs converge to the desired state without unnecessary changes once that state is reached",
      "Playbooks can target only one host"
    ],
    answer: 2
  }
];
