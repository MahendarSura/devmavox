"use client";

import { useState } from "react";
import { parseDocument } from "yaml";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type Lesson = {
  title: string;
  description: string;
  purpose: string;
  concepts: string[];
  example: string;
  practice: string[];
  mistakes: string[];
  incident: string;
  recovery: string[];
  quiz: Question[];
};

const lessons: Record<string, Lesson> = {
  "Ansible Playbook": {
    title: "Ansible Playbook — Declarative Infrastructure Automation",
    description:
      "An Ansible Playbook is a YAML document that defines a sequence of automation tasks to execute against selected managed hosts. Playbooks describe the desired configuration or operational workflow using plays, tasks, modules, variables, handlers, conditions, loops and roles. Ansible connects to managed nodes, normally over SSH for Linux systems, executes the required modules and reports whether each task changed the system.",
    purpose:
      "Playbooks help DevOps teams automate repeatable infrastructure operations such as installing packages, configuring services, creating users, deploying applications, managing files and performing controlled maintenance. They make operational procedures reviewable in source control and reduce manual configuration differences between environments.",
    concepts: [
      "A playbook is a YAML document containing one or more plays. Each play maps a group of hosts to a set of automation tasks.",
      "hosts selects the inventory group or host pattern against which a play runs. Incorrect host patterns can cause tasks to target the wrong machines.",
      "name provides readable labels for plays and tasks. Useful names make execution logs easier to investigate.",
      "tasks contains the ordered list of actions executed by the play. Tasks should have a clear operational purpose.",
      "Ansible modules perform work such as package installation, file management, service control, user creation and command execution.",
      "The ansible.builtin namespace makes built-in module references explicit and reduces ambiguity.",
      "become enables privilege escalation for tasks that require elevated operating-system permissions. Use least privilege.",
      "become_user selects the target account used for privilege escalation, commonly root for system administration.",
      "vars defines play-level variables. Variable precedence determines which value wins when the same variable is defined in multiple places.",
      "vars_files loads external variable files. Sensitive variable files should be protected and encrypted or retrieved securely.",
      "roles package reusable tasks, handlers, defaults, variables, templates and files into a consistent structure.",
      "handlers are notified by changed tasks and normally run at the end of a play when notified. They are useful for restarting services after configuration changes.",
      "notify connects a task to a named handler. A handler typically runs only when the notifying task reports a change.",
      "when applies a conditional expression so a task runs only when its condition is true.",
      "loop repeats a task over a list of items. Each iteration can use the item variable.",
      "register stores a task result in a variable for later conditions, debugging or reporting.",
      "changed_when and failed_when customize how Ansible interprets command results. Incorrect expressions can hide real failures.",
      "block, rescue and always provide structured error-handling behavior for related task groups.",
      "tags allow selected plays or tasks to be included or skipped during execution. Skipping tasks can leave an application partially configured.",
      "gather_facts collects host information before task execution. Disabling it can improve performance when facts are unnecessary.",
      "serial controls how many hosts are processed in each batch, helping reduce the blast radius of rolling changes.",
      "strategy controls task execution behavior across hosts. The default linear strategy runs tasks in a synchronized task sequence.",
      "check mode previews many supported changes without applying them, but not every module supports check mode completely.",
      "diff mode displays differences for supported modules and helps reviewers understand configuration changes.",
      "Ansible Vault encrypts sensitive variable files or other supported data. Protect vault passwords and retrieval processes.",
      "Templates use Jinja2 expressions to generate configuration files from variables and host facts.",
      "Idempotency means repeating a playbook with unchanged inputs should not continually change a correctly configured system.",
      "The command module executes commands but generally provides less idempotent behavior than purpose-built modules.",
      "The shell module executes commands through a shell and should be reserved for cases that require shell features.",
      "Ansible lint, syntax checking and controlled test runs help catch mistakes before production execution."
    ],
    example: `---
- name: Configure a web application server
  hosts: webservers
  become: true
  gather_facts: true

  vars:
    web_package: nginx
    web_service: nginx
    application_message: "Managed by Ansible"

  tasks:
    - name: Install web server package
      ansible.builtin.package:
        name: "{{ web_package }}"
        state: present

    - name: Deploy application landing page
      ansible.builtin.copy:
        dest: /var/www/html/index.html
        content: "{{ application_message }}\\n"
        owner: root
        group: root
        mode: "0644"
      notify: Restart web service

    - name: Ensure web service is enabled and running
      ansible.builtin.service:
        name: "{{ web_service }}"
        state: started
        enabled: true

  handlers:
    - name: Restart web service
      ansible.builtin.service:
        name: "{{ web_service }}"
        state: restarted`,
    practice: [
      "Create a playbook with a name, hosts selector, become setting and tasks. Explain how the play targets inventory hosts.",
      "Use ansible.builtin.package to install a package with state present and explain why this is preferable to an unconditional shell command.",
      "Create a file using ansible.builtin.copy and specify owner, group and file mode.",
      "Configure a service to be enabled and running. Explain the difference between service startup and service enablement at boot.",
      "Create a handler and notify it only when a configuration file changes.",
      "Define variables at play level and override them through an external variables file in a controlled test.",
      "Use when to execute a task only on a selected operating system family or host condition.",
      "Use loop to create several directories or users from a list of values.",
      "Register a command result and use its return code in a later conditional task.",
      "Use block, rescue and always to perform recovery or cleanup around a group of related tasks.",
      "Run ansible-playbook --syntax-check before executing the playbook.",
      "Run ansible-playbook in check mode and inspect which tasks support predictive behavior.",
      "Use --diff for supported file and template tasks to inspect proposed changes.",
      "Create a reusable role with defaults, tasks, handlers, templates and files.",
      "Use Ansible Vault to protect a sensitive variable file and avoid storing plaintext credentials in source control.",
      "Use serial to deploy a change in small host batches and explain how it reduces operational risk.",
      "Run the same playbook twice and investigate whether the second execution reports unnecessary changes.",
      "Use tags to execute a targeted operational workflow and explain the risk of skipping prerequisite tasks."
    ],
    mistakes: [
      "Using an incorrect hosts pattern and targeting more or fewer systems than intended.",
      "Running privileged tasks without become when the managed account lacks the required permissions.",
      "Using become for every task when only a few operations require elevated privileges.",
      "Using shell or command for work that a purpose-built idempotent Ansible module can perform.",
      "Writing a handler name in notify that does not match the actual handler name.",
      "Expecting handlers to execute immediately after every notifying task.",
      "Using a variable name inconsistently or misunderstanding variable precedence.",
      "Using an undefined variable or referencing a result before its task has executed.",
      "Writing a when expression with incorrect syntax or quoting.",
      "Using changed_when to hide real changes and create misleading execution reports.",
      "Using failed_when incorrectly and accidentally treating a failed command as successful.",
      "Assuming check mode simulates every module with complete accuracy.",
      "Skipping required tasks with tags and leaving a system partially configured.",
      "Using plaintext passwords or tokens in playbooks and committed variable files.",
      "Assuming a successful syntax check proves that remote hosts are reachable and modules will succeed.",
      "Applying a disruptive change to every production host simultaneously instead of using a controlled rollout.",
      "Ignoring idempotency and creating unnecessary service restarts on every run.",
      "Using unpinned dependencies or collections without a deliberate compatibility strategy."
    ],
    incident:
      "An Ansible deployment playbook is executed against a production web-server group. Package installation succeeds, but the service restart handler fails because its name does not match the notify reference. The configuration file has already changed on several hosts, leaving the fleet in an inconsistent state. The team must identify changed hosts, correct the handler, and recover in controlled batches.",
    recovery: [
      "Stop further broad rollout execution and identify the exact inventory pattern and limit used by the failed run.",
      "Capture the playbook output and determine which hosts completed each task and which hosts failed.",
      "Use the Ansible recap to identify changed, failed, unreachable and skipped host counts.",
      "Inspect the task name, notify value and handler name for exact matching.",
      "Run ansible-playbook --syntax-check to catch structural errors after correcting the handler.",
      "Run a limited check-mode execution against a disposable or approved test host.",
      "Confirm the target service name and the operating-system-specific service behavior.",
      "Use a small serial batch or explicit host limit to resume the rollout safely.",
      "Verify the configuration file contents, ownership and permissions on the affected hosts.",
      "Confirm the service is enabled and running after the handler or recovery task completes.",
      "Run the playbook again and verify that unchanged hosts do not report unnecessary changes.",
      "Check application health, logs and endpoint availability independently of Ansible task success.",
      "Record the affected hosts, failed handler, correction and preventive validation steps."
    ],
    quiz: [
      {
        question: "What does the hosts field select in an Ansible play?",
        options: ["The YAML parser", "The inventory hosts targeted by the play", "The Git branch", "The Ansible controller's package directory"],
        answer: 1,
        explanation: "The hosts pattern selects the inventory hosts or groups against which the play's tasks are executed."
      },
      {
        question: "When does a handler normally execute?",
        options: ["Before every task", "When notified by a changed task, normally at the end of the play", "Only when gather_facts is false", "Whenever an inventory file is loaded"],
        answer: 1,
        explanation: "A handler is notified by a task that reports a change and normally runs at the end of the play."
      },
      {
        question: "What is the purpose of become?",
        options: ["Privilege escalation", "YAML indentation", "Git checkout", "Image building"],
        answer: 0,
        explanation: "become allows Ansible to execute tasks using an elevated identity when required."
      },
      {
        question: "What is idempotency in Ansible?",
        options: ["Running a task only once ever", "Repeated runs converge without unnecessary changes when desired state is already achieved", "Disabling all handlers", "Using only shell commands"],
        answer: 1,
        explanation: "Idempotent automation can be repeated safely without continually changing an already-correct system."
      }
    ]
  },

  "Ansible Inventory": {
    title: "Ansible Inventory — Managed Host and Group Organization",
    description:
      "An Ansible inventory defines the managed hosts and groups that automation can target. It can be written in INI or YAML format, generated dynamically from infrastructure providers, or assembled from inventory plugins. Inventory data can also contain host-specific and group-specific variables such as connection settings, ports, users, operating-system options and environment metadata.",
    purpose:
      "A well-designed inventory gives infrastructure teams a consistent way to organize development, staging and production systems. Groups make playbook targeting easier, while host and group variables reduce duplication and allow automation to adapt to different server roles and environments.",
    concepts: [
      "Inventory sources identify managed hosts and groups. Ansible can use one or multiple inventory sources.",
      "INI inventory is a compact text format with host entries and group sections.",
      "YAML inventory represents hosts, children and variables through nested mappings.",
      "A host can be identified by a hostname, IP address or inventory alias.",
      "Group sections organize hosts by function, environment, location or another operational boundary.",
      "The all group contains every inventory host, while ungrouped represents hosts that do not belong to another group.",
      "The children field creates nested group relationships, allowing environment and role groups to be combined.",
      "Host variables define settings for a particular inventory host, such as ansible_host or a host-specific connection port.",
      "Group variables define shared settings for members of a group and help reduce repeated host configuration.",
      "The host alias is the inventory identifier; ansible_host can specify the actual network address used to connect.",
      "ansible_user selects the remote connection account.",
      "ansible_port selects the SSH port for applicable SSH connections.",
      "ansible_connection selects the connection plugin used to reach the managed host.",
      "ansible_become and related settings control privilege escalation behavior when configured.",
      "ansible_python_interpreter can specify the Python interpreter used by modules on managed nodes.",
      "Inventory patterns select hosts by name, group, intersection, exclusion and other supported matching rules.",
      "The --limit option restricts a playbook run to a subset of the inventory. It should be reviewed carefully before production execution.",
      "The --list-hosts option previews which hosts a playbook pattern will target without executing tasks.",
      "The ansible-inventory command displays, validates and inspects inventory data.",
      "Dynamic inventory plugins query infrastructure sources and generate inventory from current provider data.",
      "Cloud inventory plugins commonly require credentials and permissions to read infrastructure metadata. Use secure credential management.",
      "Inventory plugin configuration controls source behavior, filters and grouping. Plugin-specific schemas and requirements differ.",
      "Inventory caching can reduce repeated provider API calls but may cause stale host data if cache refresh behavior is misunderstood.",
      "Group and host variables are subject to Ansible variable precedence. A more specific source does not automatically win against every higher-precedence input.",
      "The inventory directory convention can separate hosts and group variables into host_vars and group_vars directories.",
      "Ansible Vault can protect sensitive inventory variables and files.",
      "A production inventory should separate environments and restrict accidental cross-environment targeting.",
      "Inventory aliases can improve readability but should remain unique and consistently named.",
      "Connectivity checks such as ansible all -m ping test Ansible connectivity and module execution; they do not necessarily test ICMP network reachability.",
      "An inventory can be syntactically valid while still containing unreachable hosts, invalid credentials or incorrect connection settings."
    ],
    example: `all:
  children:
    production:
      children:
        webservers:
          hosts:
            web-01:
              ansible_host: 10.10.1.11
              ansible_user: deploy
            web-02:
              ansible_host: 10.10.1.12
              ansible_user: deploy

        databases:
          hosts:
            db-01:
              ansible_host: 10.10.2.21
              ansible_user: deploy

    staging:
      hosts:
        stage-web-01:
          ansible_host: 10.20.1.11
          ansible_user: deploy

  vars:
    ansible_connection: ssh
    ansible_port: 22
    ansible_python_interpreter: auto_silent`,
    practice: [
      "Create an INI inventory with webservers and databases groups and add two hosts to each group.",
      "Create the equivalent YAML inventory and compare how group nesting is represented.",
      "Use a readable inventory alias and set ansible_host to the actual IP address.",
      "Configure ansible_user and ansible_port for a host that uses a non-default SSH account or port.",
      "Create production and staging parent groups with child groups for web and database roles.",
      "Define a shared value in group_vars and a host-specific override in host_vars, then inspect the resolved variable.",
      "Run ansible-inventory -i inventory.yml --graph to visualize the host and group hierarchy.",
      "Run ansible-inventory -i inventory.yml --list to inspect the parsed inventory structure.",
      "Use ansible all -i inventory.yml --list-hosts to preview target selection.",
      "Use a group pattern to target only webservers and explain how nested groups influence membership.",
      "Use --limit to restrict a playbook run to a single disposable host.",
      "Configure a dynamic inventory plugin in a test environment and identify its authentication requirements.",
      "Enable inventory caching in a test setup and observe how host discovery changes after infrastructure updates.",
      "Protect sensitive inventory variables with Ansible Vault and verify the vault password is not committed.",
      "Investigate an unreachable host by checking DNS, routing, SSH credentials, firewall rules and remote Python availability."
    ],
    mistakes: [
      "Using an incorrect inventory source path and unintentionally executing against an empty or unexpected inventory.",
      "Confusing an inventory alias with the actual connection address.",
      "Using duplicate host aliases and making host selection ambiguous.",
      "Placing shared variables in a location that Ansible does not load for the intended group.",
      "Misunderstanding variable precedence and expecting group variables to override every other input.",
      "Using an invalid YAML indentation level in nested children and hosts mappings.",
      "Using an INI syntax while naming the file as YAML, or vice versa.",
      "Selecting the wrong parent group and accidentally including production hosts in a staging run.",
      "Using --limit incorrectly and excluding hosts that were expected to be managed.",
      "Assuming ansible ping tests ICMP echo requests rather than Ansible connectivity and module execution.",
      "Assuming inventory syntax validation proves SSH authentication and remote execution will succeed.",
      "Leaving cloud inventory credentials in plaintext configuration files.",
      "Using stale dynamic inventory cache data and targeting hosts that have been replaced or removed.",
      "Failing to restrict dynamic inventory queries and retrieving unintended infrastructure environments.",
      "Ignoring host key verification or weakening SSH security to bypass connectivity problems.",
      "Using a remote account without the required permissions for the intended automation tasks."
    ],
    incident:
      "A production maintenance playbook unexpectedly targets staging and production servers together. The inventory uses nested groups, and a broad host pattern matches more hosts than the operator expected. In a separate execution, one server is marked unreachable because its inventory alias points to an outdated IP address and its SSH port differs from the configured default.",
    recovery: [
      "Stop further playbook execution and preserve the command line, inventory source and execution output.",
      "Run ansible-inventory -i inventory.yml --graph to inspect parent and child group membership.",
      "Run ansible-inventory -i inventory.yml --list to inspect the fully parsed host variables.",
      "Use ansible all -i inventory.yml --list-hosts to preview the target set before another run.",
      "Identify whether the broad host pattern includes nested production and staging groups.",
      "Correct the inventory grouping or use a narrowly scoped target pattern and explicit limit.",
      "Inspect the affected host's inventory alias, ansible_host, ansible_user and ansible_port values.",
      "Verify DNS resolution, network routes, firewall rules and SSH connectivity from the Ansible controller.",
      "Check SSH authentication and remote account permissions without exposing passwords in logs.",
      "Run an Ansible ping module against one approved test host to verify Ansible connectivity.",
      "Use a disposable host to validate the corrected group structure and host connection settings.",
      "Introduce separate environment inventory sources or explicit environment safeguards for production workflows.",
      "Re-run the playbook only after confirming the exact target list and approval process.",
      "Record the targeting error, affected hosts and controls added to prevent recurrence."
    ],
    quiz: [
      {
        question: "What is the main purpose of an Ansible inventory?",
        options: ["Define container images", "Identify and organize managed hosts and groups", "Compile application code", "Store Kubernetes secrets"],
        answer: 1,
        explanation: "An inventory identifies the systems Ansible can manage and organizes them into groups with associated variables."
      },
      {
        question: "What is the difference between an inventory alias and ansible_host?",
        options: ["They are always identical", "The alias identifies the inventory host while ansible_host can specify its connection address", "ansible_host defines a Git branch", "The alias is an SSH password"],
        answer: 1,
        explanation: "An inventory alias is the logical host identifier. ansible_host can define the actual address used for the connection."
      },
      {
        question: "What does ansible-inventory --graph display?",
        options: ["A rendered Kubernetes Deployment", "The inventory's group and host hierarchy", "A Git commit graph", "Container image layers"],
        answer: 1,
        explanation: "The graph view helps inspect group relationships and the hosts included in each group."
      },
      {
        question: "What does ansible all -m ping primarily test?",
        options: ["ICMP echo only", "Ansible connectivity and module execution against the selected hosts", "HTTP application health only", "Database replication"],
        answer: 1,
        explanation: "The Ansible ping module checks whether Ansible can communicate and execute its module on the managed host. It is not simply an ICMP ping."
      }
    ]
  }
};


export default function YamlAutomationConfigurationsWorkspace({
  topic,
  tab
}: {
  topic: string;
  tab: string;
}) {
  const lesson = lessons[topic] ?? lessons["Ansible Playbook"];
  const activeTab = tab || "Learn";
  const [source, setSource] = useState(lesson.example);
  const [validation, setValidation] = useState("");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const correct = lesson.quiz.filter((question, index) => answers[index] === question.answer).length;

  function restoreExample() {
    setSource(lesson.example);
    setValidation("");
  }

  function validateSource() {
    try {
      const document = parseDocument(source, { uniqueKeys: true });

      if (document.errors.length) {
        setValidation(document.errors.map(error => error.message).join("\n"));
        return;
      }

      const parsed = document.toJS();
      const issues: string[] = [];

      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        issues.push("The YAML document must contain a root mapping.");
      } else if (topic === "Ansible Playbook") {
        if (!Array.isArray(parsed)) {
          issues.push("An Ansible playbook must be a YAML sequence of plays.");
        } else {
          parsed.forEach((play: any, index: number) => {
            if (!play || typeof play !== "object" || Array.isArray(play)) {
              issues.push(`Play ${index + 1} must be a mapping.`);
              return;
            }
            if (!play.hosts || typeof play.hosts !== "string") {
              issues.push(`Play ${index + 1}: hosts must be a non-empty pattern.`);
            }
            if (play.tasks !== undefined && !Array.isArray(play.tasks)) {
              issues.push(`Play ${index + 1}: tasks must be a sequence.`);
            }
            if (play.handlers !== undefined && !Array.isArray(play.handlers)) {
              issues.push(`Play ${index + 1}: handlers must be a sequence.`);
            }
          });
        }
      } else {
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          issues.push("Inventory must be a YAML mapping.");
        } else if (!parsed.all && !parsed.children && !parsed.hosts) {
          issues.push("Inventory does not contain a recognizable all, children or hosts structure.");
        }

        if (parsed.all && typeof parsed.all !== "object") {
          issues.push("The all inventory group must be a mapping.");
        }
      }

      setValidation(
        issues.length
          ? "YAML syntax is valid, but structural checks found:\n" + issues.join("\n")
          : "PASS: YAML syntax and basic " + topic + " structure checks passed. Run ansible-playbook --syntax-check or ansible-inventory against your actual Ansible environment for authoritative validation."
      );
    } catch (error) {
      setValidation(error instanceof Error ? error.message : "Unknown validation error.");
    }
  }

  return (
    <section className="w-full space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Automation Configurations Learning Workspace
        </span>
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.description}</p>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4">
          <h3 className="font-semibold mb-2">Purpose in real DevOps workflows</h3>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.purpose}</p>
        </div>
      </div>


      {activeTab === "Learn" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Core Concepts and Architecture</h3>
          {lesson.concepts.map((item, index) => (
            <div key={index} className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <span className="font-bold text-blue-600">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-7">{item}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Examples" && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Complete Configuration Example</h3>
          <pre className="overflow-x-auto rounded-xl bg-slate-950 text-green-300 p-5 text-sm leading-7">
            <code>{lesson.example}</code>
          </pre>
          <button onClick={restoreExample} className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm">
            Load example into editor
          </button>
        </div>
      )}

      {activeTab === "Practice" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Hands-on Ansible Exercises</h3>
          {lesson.practice.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="font-semibold text-sm">Exercise {index + 1}</p>
              <p className="mt-2 text-sm leading-7">{item}</p>
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
            <h4 className="font-semibold">Useful Ansible commands</h4>
            <pre className="overflow-x-auto text-xs leading-7 mt-2">
              <code>{topic === "Ansible Playbook"
                ? `ansible-playbook --syntax-check site.yml
ansible-playbook site.yml --list-hosts
ansible-playbook site.yml --list-tasks
ansible-playbook site.yml --check --diff
ansible-playbook site.yml --limit web-01
ansible-playbook site.yml --tags configure`
                : `ansible-inventory -i inventory.yml --graph
ansible-inventory -i inventory.yml --list
ansible all -i inventory.yml --list-hosts
ansible all -i inventory.yml -m ping
ansible webservers -i inventory.yml --list-hosts
ansible-inventory -i inventory.yml --host web-01`}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === "Debug" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Common Ansible Configuration Failures</h3>
          {lesson.mistakes.map((item, index) => (
            <div key={index} className="rounded-xl border border-amber-200 dark:border-amber-900 p-4">
              <p className="text-sm leading-7"><strong>Issue {index + 1}:</strong> {item}</p>
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4 space-y-2">
            <h4 className="font-semibold">Investigation commands</h4>
            <pre className="overflow-x-auto text-xs leading-7">
              <code>{topic === "Ansible Playbook"
                ? `ansible-playbook --syntax-check site.yml
ansible-playbook site.yml --list-hosts
ansible-playbook site.yml --list-tasks
ansible-playbook site.yml --check --diff -vvv
ansible-playbook site.yml --limit web-01 -vvv`
                : `ansible-inventory -i inventory.yml --graph
ansible-inventory -i inventory.yml --list
ansible-inventory -i inventory.yml --host web-01
ansible all -i inventory.yml --list-hosts
ansible all -i inventory.yml -m ping -vvv`}</code>
            </pre>
          </div>
        </div>
      )}

      {activeTab === "Validate" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Ansible Configuration Editor</h3>
          <p className="text-sm text-slate-500">
            YAML syntax and basic topic-specific structure checks. This does not execute Ansible or validate remote connectivity.
          </p>
          <textarea
            value={source}
            onChange={event => {
              setSource(event.target.value);
              setValidation("");
            }}
            spellCheck={false}
            className="w-full min-h-[440px] rounded-xl bg-slate-950 text-green-300 p-5 font-mono text-sm leading-6"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={validateSource} className="rounded-lg bg-green-700 text-white px-5 py-2 text-sm font-semibold">
              Validate Configuration
            </button>
            <button onClick={restoreExample} className="rounded-lg border border-slate-300 px-5 py-2 text-sm">
              Restore Example
            </button>
          </div>
          {validation && (
            <pre className="whitespace-pre-wrap rounded-xl border border-slate-300 dark:border-slate-700 p-4 text-sm leading-6">
              {validation}
            </pre>
          )}
        </div>
      )}

      {activeTab === "Scenarios" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Production Incident Simulation</h3>
          <div className="rounded-xl border border-red-200 dark:border-red-900 p-5 space-y-3">
            <span className="text-xs font-semibold uppercase text-red-600">Incident scenario</span>
            <p className="text-sm leading-7">{lesson.incident}</p>
          </div>
          <h4 className="font-semibold">Investigation and recovery workflow</h4>
          {lesson.recovery.map((item, index) => (
            <div key={index} className="flex gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
              <span className="rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-7 h-7 flex items-center justify-center text-xs font-bold shrink-0">
                {index + 1}
              </span>
              <p className="text-sm leading-7">{item}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Quiz" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-semibold">Ansible Engineering Assessment</h3>
            <p className="text-sm text-slate-500 mt-1">Select an answer and review the explanation.</p>
          </div>
          {lesson.quiz.map((item, index) => (
            <div key={index} className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
              <p className="font-semibold text-sm">{index + 1}. {item.question}</p>
              {item.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center gap-3 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={`ansible-quiz-${topic}-${index}`}
                    checked={answers[index] === optionIndex}
                    onChange={() => setAnswers(current => ({ ...current, [index]: optionIndex }))}
                  />
                  {option}
                </label>
              ))}
              {answers[index] !== undefined && (
                <div className={`rounded-lg p-3 text-sm ${
                  answers[index] === item.answer
                    ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"
                    : "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                }`}>
                  <strong>{answers[index] === item.answer ? "Correct" : "Review this answer"}</strong>
                  <p className="mt-1">{item.explanation}</p>
                </div>
              )}
            </div>
          ))}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
            <p className="font-semibold">Answered: {Object.keys(answers).length}/{lesson.quiz.length}</p>
            <p className="text-sm mt-1">Correct answers: {correct}/{lesson.quiz.length}</p>
            <button onClick={() => setAnswers({})} className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm">
              Reset assessment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
