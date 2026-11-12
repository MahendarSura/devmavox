export interface InterviewQA {
  question: string;
  answer: string;
}

export const ansibleQuestions: InterviewQA[] = [
  {
    question: "1. What is Ansible?",
    answer: `Ansible is an open-source automation and configuration management tool used to automate infrastructure provisioning, software installation, application deployment, and server administration.

It allows DevOps engineers to manage multiple servers from a central control machine without manually connecting to every server. Ansible uses YAML-based playbooks to describe the tasks that must be performed.

For example, an organization may have 50 Linux servers that require Java installation and configuration. Instead of connecting to each server individually, an engineer can create an Ansible playbook and execute the installation across all servers.

Ansible improves operational consistency, reduces manual effort, and supports repeatable infrastructure automation.`
  },
  {
    question: "2. Why is Ansible used in DevOps?",
    answer: `Ansible is used in DevOps to automate repetitive infrastructure and application management activities. It helps teams configure servers, install packages, deploy applications, manage users, and maintain consistent environments.

Manual server configuration becomes difficult when an organization manages hundreds of servers. Small configuration differences can also create unexpected application failures.

For example, a DevOps team can use Ansible to configure development, testing, and production servers with the same packages, services, and security settings.

Ansible supports reliable automation and helps organizations reduce configuration errors throughout the software delivery lifecycle.`
  },
  {
    question: "3. What is Ansible Architecture?",
    answer: `Ansible architecture is based on a control node that manages remote managed nodes through automation instructions.

The control node contains Ansible, inventory information, playbooks, and configuration files. Managed nodes are the servers or devices on which Ansible performs tasks. For Linux systems, Ansible commonly connects through SSH.

For example, an engineer can run a playbook from an Ansible control node to install Nginx on several remote Linux servers. The managed servers do not normally require a continuously running Ansible agent.

This agentless architecture makes Ansible relatively simple to install and operate across different infrastructure environments.`
  },
  {
    question: "4. What is an Ansible Control Node?",
    answer: `An Ansible control node is the machine from which Ansible commands and playbooks are executed. It stores automation files and communicates with managed nodes.

The control node requires Ansible and the necessary connection credentials or authentication configuration. It can be a Linux server, a virtual machine, or an approved automation environment.

For example, a DevOps team may maintain a dedicated Linux control node that executes playbooks against application and database servers.

Centralizing automation execution helps teams manage infrastructure consistently and control where automation activities are initiated.`
  },
  {
    question: "5. What are Managed Nodes in Ansible?",
    answer: `Managed nodes are the remote systems that Ansible controls and configures through automation tasks.

These systems may include Linux servers, Windows machines, cloud instances, network devices, and other supported infrastructure. Ansible communicates with them using suitable connection methods such as SSH or WinRM.

For example, an organization may have ten web servers and five database servers registered in its Ansible inventory. A playbook can target only the web servers when installing an updated web server package.

Managed nodes allow administrators to automate operations across many systems from a central control node.`
  },
  {
    question: "6. What is an Ansible Inventory?",
    answer: `An Ansible inventory is a file or collection of sources that identifies the managed hosts and groups that Ansible can control.

Inventory information can include hostnames, IP addresses, connection details, and group variables. It can be written in INI or YAML format, or obtained dynamically from supported infrastructure sources.

For example, an inventory can contain separate groups named webservers, databases, and applicationservers. A playbook can target only the database group when performing database-related configuration.

Inventory makes infrastructure organization easier and allows automation to target the correct systems.`
  },
  {
    question: "7. What is a Static Inventory?",
    answer: `A static inventory is an inventory file in which managed hosts and groups are defined manually.

It is commonly used in small or stable environments where server addresses do not change frequently. Administrators can define hostnames, IP addresses, and group membership directly in the inventory.

For example, an engineer can create a static inventory containing three development servers and five production servers. Playbooks can then target the required group.

Static inventories are simple to understand and maintain, but they may require frequent updates when infrastructure changes dynamically.`
  },
  {
    question: "8. What is a Dynamic Inventory?",
    answer: `A dynamic inventory obtains host information automatically from an external infrastructure source instead of depending entirely on a manually maintained host list.

It is useful in cloud environments where virtual machines may be created, terminated, or replaced frequently. Dynamic inventory plugins can retrieve information from supported platforms such as AWS.

For example, an organization can use AWS EC2 inventory information to identify running instances based on tags such as Environment=Production.

Dynamic inventory helps Ansible work with changing infrastructure and reduces manual inventory maintenance.`
  },
  {
    question: "9. What is an Ansible Playbook?",
    answer: `An Ansible playbook is a YAML file that defines a sequence of automation activities to be performed on selected managed nodes.

A playbook contains plays, target hosts, variables, tasks, and optionally handlers and other configuration elements. Each task generally calls an Ansible module to perform a specific operation.

For example, a playbook can update Linux packages, install Nginx, copy a configuration file, and start the Nginx service on web servers.

Playbooks make automation repeatable, readable, version-controllable, and easier for teams to review and maintain.`
  },
  {
    question: "10. What is an Ansible Task?",
    answer: `An Ansible task is an individual unit of work inside a playbook. It describes an operation that Ansible should perform on the targeted managed nodes.

Tasks commonly use modules to install packages, manage services, copy files, create directories, or execute supported operations. Each task has a descriptive name and the required module parameters.

For example, a task named Install Nginx can use the package module to ensure that Nginx is installed on a Linux server.

Breaking automation into individual tasks makes playbooks easier to understand, troubleshoot, and maintain.`
  },
  {
    question: "11. What is an Ansible Module?",
    answer: `An Ansible module is a reusable component that performs a specific operation on a managed node or another supported resource.

Ansible provides modules for package management, file operations, service management, users, cloud infrastructure, networking, and many other activities.

For example, the package module can install software, the service module can manage services, and the copy module can transfer files to managed systems.

Modules reduce the need to write custom shell commands for common administrative tasks and provide a structured way to automate infrastructure operations.`
  },
  {
    question: "12. What is Idempotency in Ansible?",
    answer: `Idempotency means that running the same automation repeatedly should produce the same desired final state without introducing unnecessary changes.

Ansible modules are generally designed to check the current state before making changes. If the managed system already matches the requested configuration, the task normally reports that no change is required.

For example, if a playbook ensures that Nginx is installed, running it again should not reinstall the package unnecessarily when it is already present.

Idempotency makes automation safer, more predictable, and suitable for regular infrastructure configuration management.`
  },
  {
    question: "13. What is an Ansible Handler?",
    answer: `An Ansible handler is a special task that runs only when it is notified by another task that reports a change.

Handlers are commonly used for actions that should happen after configuration changes, such as restarting or reloading a service.

For example, a playbook may update the Nginx configuration file and notify a handler named Restart Nginx. The handler runs when the configuration task changes the file.

Handlers prevent unnecessary service restarts and help ensure that services respond to updated configuration when required.`
  },
  {
    question: "14. What is a Variable in Ansible?",
    answer: `An Ansible variable is a named value used to make automation playbooks flexible and reusable.

Variables can represent package names, application versions, usernames, directory paths, port numbers, environment settings, and other configuration values. They can be defined in several supported locations, including playbooks, inventory files, and variable files.

For example, the same application deployment playbook can use different application versions for development and production through variables.

Variables reduce hardcoded values and make it easier to reuse automation across multiple environments.`
  },
  {
    question: "15. What is Ansible Facts?",
    answer: `Ansible facts are system information collected from managed nodes when fact gathering is enabled.

They can include operating system details, IP addresses, memory information, CPU information, disk information, and other host properties. Playbooks can use these facts to make decisions based on the actual managed system.

For example, a playbook can identify whether a server runs Ubuntu or Red Hat Enterprise Linux and choose the appropriate package-management operation.

Facts help automation adapt to different server configurations without requiring every detail to be manually defined.`
  },
  {
    question: "16. What is Ansible Galaxy?",
    answer: `Ansible Galaxy is a platform and command-line ecosystem for discovering, downloading, and sharing Ansible roles and collections.

It allows automation developers to reuse community or organization-maintained automation content instead of creating every component from the beginning.

For example, a team can find an existing role for configuring Nginx, review its documentation, and include it in its automation project.

Ansible Galaxy supports code reuse and helps teams organize automation into reusable components.`
  },
  {
    question: "17. What is an Ansible Role?",
    answer: `An Ansible role is a standardized directory structure used to organize related automation tasks, variables, handlers, templates, files, and other resources.

Roles help divide large playbooks into smaller reusable components. A role can focus on one responsibility, such as configuring Nginx, installing Java, or setting up a monitoring agent.

For example, an organization can maintain separate roles for common Linux configuration, application deployment, and security hardening. Multiple playbooks can reuse those roles.

Roles improve automation organization, maintainability, collaboration, and reuse across projects.`
  },
  {
    question: "18. What is Ansible Vault?",
    answer: `Ansible Vault is a feature used to encrypt sensitive information stored in Ansible automation files.

It can protect passwords, API tokens, private keys, and other confidential values. Encrypted variables or files can be used by playbooks when the correct vault password or supported password source is supplied.

For example, a database deployment playbook may need a database password. The team can store that sensitive value in an encrypted variables file instead of keeping it in plain text.

Ansible Vault helps reduce accidental exposure of secrets in automation repositories, although access to vault passwords must also be protected.`
  },
  {
    question: "19. What is the difference between Ansible and Puppet?",
    answer: `Ansible and Puppet are configuration management and infrastructure automation tools, but they use different management approaches.

Ansible commonly uses an agentless architecture and communicates with Linux systems through SSH. Puppet traditionally uses an agent-based model in which agents communicate with a Puppet server to maintain configuration.

For example, Ansible can execute a playbook to install and configure packages on selected servers. Puppet agents can periodically apply the configuration defined by Puppet manifests.

The choice depends on infrastructure requirements, operational preferences, existing skills, and the desired configuration management model.`
  },
  {
    question: "20. What is the difference between Ansible and Terraform?",
    answer: `Ansible and Terraform are both widely used in DevOps, but they focus on different areas of infrastructure management.

Terraform is primarily used for provisioning and managing infrastructure resources such as virtual machines, networks, and cloud services through declarative configuration. Ansible is commonly used for configuring operating systems, installing software, and deploying applications.

For example, Terraform can create AWS EC2 instances and networking resources. Ansible can then connect to those instances and install Java, configure Nginx, and deploy an application.

The tools can be used together to automate both infrastructure provisioning and configuration management.`
  },
  {
    question: "21. What is Ansible Ad-Hoc Command?",
    answer: `An Ansible ad-hoc command is a one-time command used to perform a quick operation on one or more managed nodes without creating a complete playbook.

Ad-hoc commands are useful for simple administrative activities such as checking connectivity, gathering information, or managing a service across selected hosts.

For example, an engineer can use the Ansible ping module to verify whether a group of Linux servers is reachable through the configured connection method.

Ad-hoc commands are convenient for quick tasks, while playbooks are generally better for repeatable and complex automation workflows.`
  },
  {
    question: "22. What is Ansible Configuration File?",
    answer: `The Ansible configuration file controls default behavior and settings used by Ansible commands and automation runs.

It can define values such as the default inventory path, remote user, connection settings, privilege escalation behavior, and other execution options.

For example, an organization can configure a project-specific ansible.cfg file to use its inventory file and common connection settings.

Centralized configuration reduces repeated command-line options and helps teams maintain consistent automation behavior.`
  },
  {
    question: "23. What is the purpose of ansible.cfg?",
    answer: `The ansible.cfg file is the main configuration file used to customize Ansible behavior for a particular execution environment or project.

It can specify the inventory location, default remote user, roles path, privilege escalation settings, and other supported configuration options.

For example, a project can use ansible.cfg to point Ansible to a dedicated inventory file so that engineers do not need to specify the inventory path with every command.

Maintaining a clear configuration file makes automation easier to execute consistently across a team.`
  },
  {
    question: "24. What is Privilege Escalation in Ansible?",
    answer: `Privilege escalation allows Ansible to execute selected tasks with elevated permissions on managed nodes.

On Linux systems, this is commonly implemented using sudo through Ansible's become functionality. It is required for operations such as installing system packages, modifying protected configuration files, and managing system services.

For example, an automation user may connect to a server through SSH and use become to install Nginx with administrator privileges.

Privilege escalation should be configured carefully and granted only where required to follow the principle of least privilege.`
  },
  {
    question: "25. What is the difference between become and become_user?",
    answer: `The become setting enables privilege escalation for an Ansible task or play, while become_user specifies the account under which the elevated operation should run.

On Linux systems, become is commonly used with sudo. If become_user is not specified, the escalation usually targets the configured default privileged account.

For example, a playbook may use become to perform an administrative package installation. Another task may use become_user to execute a command as a specific application account.

These options help administrators control the permissions and execution identity used by automation tasks.`
  },
  {
    question: "26. What is an Ansible Template?",
    answer: `An Ansible template is a file containing variable expressions that Ansible processes to generate configuration files for managed nodes.

Ansible commonly uses the Jinja2 templating language. Templates can include variables, conditional expressions, and loops to create configuration files based on host or environment information.

For example, an engineer can maintain one Nginx configuration template and generate different server names and application ports for development and production systems.

Templates reduce duplicated configuration files and help maintain consistent application and infrastructure settings.`
  },
  {
    question: "27. What is the difference between copy and template modules?",
    answer: `The copy module transfers a file from the control node to a managed node without processing it as a variable-based template. The template module processes a Jinja2 template before creating the destination file.

Copy is appropriate when the same file content should be transferred to every target. Template is useful when configuration values must change according to variables or host information.

For example, a static certificate file can be transferred using copy, while an Nginx configuration containing environment-specific server names can be generated using template.

Choosing the correct module makes file management simpler and more maintainable.`
  },
  {
    question: "28. How does Ansible connect to Linux servers?",
    answer: `Ansible commonly connects to Linux managed nodes through SSH from the control node.

The connection requires network reachability, a valid remote username, and suitable authentication such as an SSH private key or an approved password-based method. The remote account must also have the permissions needed for the requested operations.

For example, an engineer can configure an inventory with the private IP addresses of application servers and use an SSH key to execute a playbook.

SSH-based communication allows Ansible to manage Linux infrastructure without requiring a persistent Ansible agent on each managed server.`
  },
  {
    question: "29. How does Ansible manage Windows servers?",
    answer: `Ansible can manage Windows servers using supported Windows modules and remote connection methods, commonly WinRM.

The control node sends automation instructions to Windows hosts through the configured connection. Windows-specific modules can manage services, users, packages, files, and other supported system settings.

For example, an organization can automate Windows service configuration and install required application components across multiple Windows servers.

Windows automation requires appropriate connectivity, authentication, permissions, and host configuration. It allows teams to manage mixed Linux and Windows infrastructure using a common automation platform.`
  },
  {
    question: "30. What is Check Mode in Ansible?",
    answer: `Check mode is an Ansible execution option that allows supported tasks to simulate changes without applying them to managed systems.

It is useful for reviewing the potential impact of a playbook before running it against important infrastructure. Ansible reports predicted changes where the modules support check mode.

For example, an engineer can run a configuration playbook in check mode against production servers to review which package or configuration changes may occur.

Check mode helps reduce deployment risk, but it is a simulation and should not be treated as a guarantee that every task will behave exactly as expected during a real execution.`
  },
  {
    question: "31. What is Ansible Parallel Execution?",
    answer: `Ansible parallel execution allows tasks to be performed across multiple managed nodes at the same time instead of processing every server sequentially.

Ansible uses execution controls such as forks to determine how many hosts can be handled concurrently. The actual execution behavior also depends on task strategy, connection availability, and infrastructure capacity.

For example, an engineer can install a monitoring agent across 40 Linux servers using parallel execution rather than connecting to each server individually.

Parallel execution reduces total automation time, but concurrency should be adjusted carefully to avoid overloading systems or shared dependencies.`
  },
  {
    question: "32. How do you troubleshoot an Ansible SSH connection failure?",
    answer: `An Ansible SSH connection failure can occur because of incorrect host addresses, network restrictions, SSH key permissions, authentication problems, or an unavailable SSH service.

The engineer should first verify that the managed host is reachable and that SSH access works independently. Next, the inventory username, private key path, firewall rules, and SSH configuration should be checked.

For example, if an EC2 instance is reachable but Ansible reports permission denied, the engineer should verify the SSH username and matching private key.

Using Ansible's verbose execution options can provide additional connection details and help identify the actual failure point.`
  },
  {
    question: "33. How do you troubleshoot an Ansible playbook failure?",
    answer: `An Ansible playbook failure may result from incorrect YAML syntax, invalid module parameters, missing variables, permission problems, connection failures, or application configuration errors.

The engineer should identify the failed task in the playbook output and examine its error message. YAML indentation, variable definitions, inventory targeting, and module documentation should then be reviewed.

For example, if a package installation task fails, the engineer should check the target operating system, package name, repository availability, and privilege escalation configuration.

Running focused tasks and enabling verbose output can help isolate the problem without repeatedly executing the entire automation workflow.`
  },
  {
    question: "34. How is Ansible used in a CI/CD pipeline?",
    answer: `Ansible can be integrated into CI/CD pipelines to automate application deployment and environment configuration after an application has been built and tested.

A pipeline can retrieve source code, build an artifact, execute automated tests, and then trigger an Ansible playbook to deploy the approved release to target servers.

For example, Jenkins can build a Java application and invoke Ansible to copy the JAR file, update configuration, and restart the application service on selected Linux servers.

This integration makes deployments repeatable and reduces manual work between the build stage and production release.`
  },
  {
    question: "35. What are Ansible best practices in production?",
    answer: `Ansible production best practices focus on making automation secure, reusable, predictable, and easy to maintain.

Teams should organize automation using roles, maintain playbooks and inventory files in version control, use variables instead of hardcoded environment values, and protect credentials with Ansible Vault or an approved secrets platform. Tasks should be designed to be idempotent and tested before production execution.

For example, an organization can maintain separate inventories for development, staging, and production while reusing the same tested application deployment role.

Code reviews, limited privilege escalation, clear task names, and controlled execution help improve the reliability of production automation.`
  }
];
