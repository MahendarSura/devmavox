import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Templates – Complete DevOps Engineer Technical Notes",
  description: "My detailed personal study notes covering Jinja2 templates, template architecture, variables, filters, loops, conditionals, dynamic configuration generation, configuration management, Nginx and application deployment, production workflows, validation, security, troubleshooting, root cause analysis and senior DevOps engineering practices.",
  sections: [
    {
      heading: "1. My Technical Notes – Understanding Ansible Templates",
      explanation: `Ansible templates are used to generate configuration files dynamically.

In real-time DevOps projects, different servers often require slightly different configuration values.

For example, a company may have:
- Development servers.
- Testing servers.
- Staging servers.
- Production servers.

Each environment may require different:
- Application ports.
- Database hostnames.
- Server names.
- Environment variables.
- Log directories.
- API endpoints.
- Worker counts.
- Resource limits.

Maintaining separate hardcoded configuration files for every environment creates duplication and maintenance problems.

Ansible solves this using templates.

Ansible templates normally use the Jinja2 templating language.

A template file commonly uses the .j2 extension.

Example:

nginx.conf.j2

Inside the template, variables and expressions are written using Jinja2 syntax.

Example:

server_name {{ server_name }};

When Ansible processes the template, it replaces the variable with the value supplied through inventory, group variables, host variables, role defaults, or playbook variables.

If server_name is example.com, the generated configuration becomes:

server_name example.com;

The generated file is then copied to the managed server using the template module.

Important difference:

The copy module transfers an existing file without rendering Jinja2 variables.

The template module renders Jinja2 content and transfers the generated result.

Templates are useful for:
- Nginx configuration.
- Apache virtual hosts.
- Application configuration.
- System service configuration.
- Monitoring configuration.
- Database configuration.
- Environment files.
- Kubernetes manifests.
- Reverse proxy configuration.

A template is not simply a text file. It is a reusable configuration generator.

The same template can generate different output for different hosts based on their variables.`,
      steps: [
        "Identify the configuration file that needs dynamic values.",
        "Create a Jinja2 template with a .j2 extension.",
        "Define required variables.",
        "Store environment-specific values in inventory or variable files.",
        "Use the Ansible template module.",
        "Render the template.",
        "Copy the generated configuration to the target.",
        "Validate the configuration before restarting services."
      ],
      commands: `# Display Ansible version
ansible --version

# Check template module documentation
ansible-doc ansible.builtin.template

# Check copy module documentation
ansible-doc ansible.builtin.copy

# Validate playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Run a template deployment
ansible-playbook -i inventory.ini nginx.yml

# Run against one server
ansible-playbook -i inventory.ini nginx.yml --limit web01

# Run with detailed output
ansible-playbook -i inventory.ini nginx.yml -vvv`,
      config: `# templates/nginx.conf.j2

server {
    listen {{ nginx_port }};
    server_name {{ server_name }};

    root {{ document_root }};

    location / {
        try_files $uri $uri/ =404;
    }
}

# Example variables:
# nginx_port: 80
# server_name: example.com
# document_root: /var/www/html

# Ansible renders the Jinja2 expressions before deployment.`,
      problems: [
        {
          issue: "The deployed configuration still contains {{ variable_name }}.",
          rootCause: "The file may have been copied using the copy module instead of the template module, or the file may not have been processed by Ansible.",
          solution: "Use ansible.builtin.template with the correct source path and destination path. Verify the deployed file after execution."
        },
        {
          issue: "A template deployment generates incorrect values.",
          rootCause: "The variable may be undefined, overridden by another variable source, or assigned to the wrong host group.",
          solution: "Inspect inventory, group_vars, host_vars, role defaults, and variable precedence. Run with verbose output and verify the effective value."
        }
      ]
    },
    {
      heading: "2. Jinja2 Template Architecture and Internal Working",
      explanation: `Jinja2 is the templating engine used by Ansible for rendering templates and evaluating expressions.

Ansible processes a template on the control node.

The managed server normally receives the rendered result, not the original unprocessed Jinja2 template.

Internal workflow:

1. Ansible loads the playbook.
2. Ansible identifies the template task.
3. Ansible loads the source .j2 file from the control node.
4. Ansible gathers the required variable values.
5. Jinja2 evaluates expressions, filters, loops, and conditions.
6. Ansible generates the final configuration content.
7. Ansible transfers the rendered content to the managed host.
8. Ansible checks whether the destination changed.
9. If changed, Ansible reports the task as changed.
10. A handler can restart or reload the service.

This is important for understanding idempotency.

If the generated configuration is identical to the existing file, the template task normally reports ok rather than changed.

If the variable values change and the rendered configuration changes, the template task reports changed.

Handlers are useful because a service should generally be reloaded only when its configuration actually changes.

The template module supports ownership, permissions, backup, validation, and other file-management parameters.

The source template should be maintained in version control.

Never store production passwords or API tokens directly inside a template.

Use Ansible Vault or an approved secret-management system for sensitive values.

A template should be readable and maintainable. Avoid putting complex business logic into a large Jinja2 file when that logic can be handled through variables, tasks, or dedicated plugins.`,
      steps: [
        "Keep templates on the Ansible control node.",
        "Load variables from the appropriate sources.",
        "Render the template through Jinja2.",
        "Inspect the generated configuration.",
        "Transfer the rendered file to the managed host.",
        "Validate the destination configuration.",
        "Trigger handlers only when required.",
        "Verify the application or service after deployment."
      ],
      commands: `# Inspect template module options
ansible-doc ansible.builtin.template

# Validate playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Execute a template task with detailed output
ansible-playbook -i inventory.ini site.yml -vvv

# Check a target host's deployed configuration
ansible web01 -i inventory.ini -m ansible.builtin.command -a "cat /etc/nginx/conf.d/app.conf"

# Check Nginx configuration
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"

# Check Nginx service status
ansible web01 -i inventory.ini -b -m ansible.builtin.service -a "name=nginx state=started"`,
      config: `# project structure
ansible-project/
  inventory.ini
  site.yml
  group_vars/
    webservers.yml
  host_vars/
  templates/
    nginx.conf.j2
    app.env.j2
  handlers/
  roles/

# group_vars/webservers.yml
nginx_port: 80
server_name: app.example.com
document_root: /var/www/app

# templates/nginx.conf.j2
server {
    listen {{ nginx_port }};
    server_name {{ server_name }};
    root {{ document_root }};
}

# Ansible evaluates the template on the control node.
# The managed server receives the rendered configuration.`,
      problems: [
        {
          issue: "The template task reports changed on every execution.",
          rootCause: "The rendered content may contain changing values, unstable ordering, timestamps, or inconsistent whitespace.",
          solution: "Remove unnecessary dynamic values, stabilize generated content, and compare the rendered configuration between executions."
        },
        {
          issue: "A template is rendered correctly but the service does not use the new configuration.",
          rootCause: "The service may not have been reloaded, the wrong configuration file may have been updated, or the service may read another configuration path.",
          solution: "Verify the service configuration path, validate the deployed file, and notify the correct reload or restart handler."
        }
      ]
    },
    {
      heading: "3. Jinja2 Variables, Expressions and Template Syntax",
      explanation: `Variables allow a single template to generate different configuration output.

The basic Jinja2 expression syntax is:

{{ variable_name }}

Example:

server_name {{ server_name }};

Ansible can supply values from:
- Inventory variables.
- Group variables.
- Host variables.
- Playbook variables.
- Role defaults.
- Role variables.
- Registered task results.
- Facts.
- Extra variables.

A template can use nested dictionary values.

Example:

{{ application.database.host }}

It can also use list indexes.

Example:

{{ application_ports[0] }}

Jinja2 supports expressions.

Example:

{{ nginx_port + 1 }}

Boolean comparisons can also be used.

Example:

{{ environment == 'production' }}

Use variable names that clearly explain their purpose.

Good variable names:
- nginx_port.
- application_name.
- database_host.
- deployment_environment.
- log_directory.

Avoid unclear names such as:
- x.
- value1.
- temp.
- abc.

Use defaults carefully.

Example:

{{ application_port | default(8080) }}

The default filter supplies a fallback value if the variable is undefined.

A template should fail clearly when an essential production variable is missing rather than silently generating an incorrect configuration.

For mandatory values, validate variables before deployment.

Variable values should be stored in the correct inventory or role variable files.

Avoid hardcoding environment-specific values inside the template itself.`,
      steps: [
        "Define meaningful variable names.",
        "Store variables in the correct scope.",
        "Reference variables using double curly braces.",
        "Use nested dictionary values when needed.",
        "Use filters for default and transformation behavior.",
        "Validate mandatory values.",
        "Render the template.",
        "Inspect the generated configuration."
      ],
      commands: `# Inspect inventory variables
ansible-inventory -i inventory.ini --list

# Inspect inventory graph
ansible-inventory -i inventory.ini --graph

# Execute with a variable override
ansible-playbook -i inventory.ini site.yml -e "nginx_port=8080"

# Pass multiple extra variables
ansible-playbook -i inventory.ini site.yml -e "environment=staging nginx_port=8080"

# Execute for one host
ansible-playbook -i inventory.ini site.yml --limit web01

# Display detailed task information
ansible-playbook -i inventory.ini site.yml -vvv`,
      config: `# group_vars/webservers.yml
application:
  name: payment-service
  port: 8080
  environment: production
  database:
    host: db.internal.example
    port: 5432

# templates/application.conf.j2
application_name={{ application.name }}
application_port={{ application.port }}
application_environment={{ application.environment }}
database_host={{ application.database.host }}
database_port={{ application.database.port }}

# Jinja2 supports nested dictionary access.
# Keep variable structures consistent across environments.`,
      problems: [
        {
          issue: "Ansible reports that a variable is undefined.",
          rootCause: "The variable is missing, incorrectly named, stored under a different scope, or unavailable for the current host.",
          solution: "Check the inventory and variable files, verify spelling and scope, and define mandatory variables before running the template task."
        },
        {
          issue: "The template renders an unexpected default value.",
          rootCause: "The expected variable is not available in the current host context, so the default filter is being used.",
          solution: "Inspect the effective variable values and confirm the correct inventory group or host variables are applied."
        }
      ]
    },
    {
      heading: "4. Jinja2 Filters and Data Transformation",
      explanation: `Jinja2 filters transform data before it is written into the generated configuration.

The pipe symbol is used to apply a filter.

Example:

{{ application_name | upper }}

This converts text to uppercase.

Commonly used filters include:

default:
Provides a fallback value.

upper:
Converts text to uppercase.

lower:
Converts text to lowercase.

trim:
Removes surrounding whitespace.

replace:
Replaces matching text.

join:
Combines list values into a string.

length:
Returns the length of a sequence.

to_json:
Converts data to JSON.

to_yaml:
Converts data to YAML.

bool:
Converts values to boolean form according to Ansible's supported behavior.

int:
Converts a value to an integer.

string:
Converts a value to a string.

A filter can be chained with other filters.

Example:

{{ application_name | default('my-app') | upper }}

Ansible also provides additional filters through its built-in and collection plugin systems.

The exact available filters depend on the Ansible installation and installed collections.

When generating JSON or YAML, use serialization filters rather than manually concatenating complex data structures.

This reduces formatting and quoting errors.

Be careful with quoting when generating configuration files.

A value containing spaces, special characters, or quotes may produce invalid output if it is inserted without proper serialization.

Do not assume every configuration format uses the same escaping rules.

Always validate the generated configuration using the relevant application's validator.`,
      steps: [
        "Identify the required output data type.",
        "Select an appropriate Jinja2 filter.",
        "Apply filters using the pipe operator.",
        "Chain filters only when the result is clear.",
        "Use serialization filters for structured data.",
        "Render the configuration.",
        "Validate the generated output.",
        "Test special characters and empty values."
      ],
      commands: `# Inspect template module documentation
ansible-doc ansible.builtin.template

# Inspect debug module documentation
ansible-doc ansible.builtin.debug

# Check playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Execute with a test value
ansible-playbook -i inventory.ini site.yml -e "application_name=payment-service"

# Validate JSON using Python on a suitable target
python -m json.tool application.json

# Validate YAML using an approved YAML parser
python -c "import yaml; yaml.safe_load(open('config.yml'))"`,
      config: `# group_vars/all.yml
application_name: payment-service
environment: production
allowed_origins:
  - https://app.example.com
  - https://admin.example.com

# templates/application.json.j2
{
  "application": "{{ application_name | default('unknown') }}",
  "environment": "{{ environment | lower }}",
  "allowedOrigins": {{ allowed_origins | to_json }}
}

# templates/application.env.j2
APP_NAME={{ application_name | default('unknown') }}
APP_ENV={{ environment | lower }}
APP_NAME_UPPER={{ application_name | upper }}

# For production JSON, prefer serialization for complete structures.
# Review escaping rules for strings containing special characters.`,
      problems: [
        {
          issue: "Generated JSON contains invalid syntax.",
          rootCause: "Values may have been manually inserted without correct JSON escaping or serialization.",
          solution: "Use to_json for structured values, validate the generated file with a JSON parser, and avoid manually constructing complex JSON strings."
        },
        {
          issue: "A filter is not recognized.",
          rootCause: "The filter may be misspelled, unavailable in the current Ansible version, or provided by a collection that is not installed.",
          solution: "Inspect the filter documentation, verify the installed collection, and use a supported filter name."
        }
      ]
    },
    {
      heading: "5. Loops, Conditionals and Dynamic Template Generation",
      explanation: `Templates can generate repeated configuration blocks using Jinja2 loops.

A loop begins with:

{% for item in items %}

It ends with:

{% endfor %}

Example:

{% for port in application_ports %}
listen {{ port }};
{% endfor %}

This allows one template to generate multiple configuration entries.

Conditionals use:

{% if condition %}

{% else %}

{% endif %}

For example, a production environment may require additional security settings.

A development environment may use different logging behavior.

Jinja2 supports elif for multiple conditions.

Whitespace control is important.

Templates can accidentally generate blank lines or incorrect indentation if block tags are placed carelessly.

Jinja2 whitespace-control characters can help control whitespace.

For example, {%- and -%} can trim whitespace around template blocks.

Use whitespace control carefully because removing too much whitespace can make configuration output difficult to read or even invalid.

For YAML configuration, indentation is significant.

A template that generates YAML must preserve correct indentation.

For Nginx and Apache configuration, block structure and braces must be balanced.

For systemd configuration, section headers and key-value formatting must be correct.

Dynamic generation should remain understandable.

Do not build an unnecessarily complicated template with deeply nested conditions.

If the configuration becomes difficult to understand, split the logic into smaller templates or use clearer variables.`,
      steps: [
        "Define the list or dictionary used by the template.",
        "Create a Jinja2 for loop.",
        "Generate the required repeated configuration entries.",
        "Add conditions for environment-specific settings.",
        "Check whitespace and indentation.",
        "Render the template.",
        "Validate the generated configuration.",
        "Test each supported environment."
      ],
      commands: `# Validate playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Execute for development
ansible-playbook -i inventory.ini site.yml -e "environment=development"

# Execute for staging
ansible-playbook -i inventory.ini site.yml -e "environment=staging"

# Execute for production
ansible-playbook -i inventory.ini site.yml -e "environment=production"

# Inspect the deployed output
ansible web01 -i inventory.ini -m ansible.builtin.command -a "cat /etc/nginx/conf.d/app.conf"

# Validate Nginx configuration
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"`,
      config: `# group_vars/all.yml
application_ports:
  - 8080
  - 8081
  - 8082

environment: production
enable_https: true

# templates/upstream.conf.j2
upstream application_backend {
{% for port in application_ports %}
    server 127.0.0.1:{{ port }};
{% endfor %}
}

{% if enable_https | bool %}
server {
    listen 443 ssl;
    server_name app.example.com;
}
{% else %}
server {
    listen 80;
    server_name app.example.com;
}
{% endif %}

# Verify that all generated blocks are valid.
# The example is a simplified configuration illustration.`,
      problems: [
        {
          issue: "Generated configuration contains incorrect indentation.",
          rootCause: "Jinja2 loops or conditional blocks may introduce whitespace or indentation that does not match the target format.",
          solution: "Review the template structure, control whitespace deliberately, and validate the generated YAML or application configuration."
        },
        {
          issue: "A required configuration block is missing.",
          rootCause: "The condition evaluates to false or the variable value does not match the expected data type.",
          solution: "Inspect the variable value and condition, use explicit boolean conversion when appropriate, and test every environment."
        }
      ]
    },
    {
      heading: "6. Template Module – Parameters, Ownership, Permissions and Validation",
      explanation: `The ansible.builtin.template module renders a Jinja2 template and places the resulting file on a managed host.

Important parameters:

src:
The source template path on the control node.

dest:
The destination file path on the managed host.

owner:
The destination file owner.

group:
The destination file group.

mode:
The destination file permissions.

backup:
Creates a backup before replacing an existing file when supported by the module.

validate:
Runs a validation command against a temporary candidate file before replacing the destination.

force:
Controls whether the destination is replaced when content differs.

unsafe_writes:
Controls whether Ansible can use less safe write behavior when atomic operations are not possible.

The template module is commonly used for system configuration.

Example:

ansible.builtin.template:
  src: nginx.conf.j2
  dest: /etc/nginx/conf.d/app.conf
  owner: root
  group: root
  mode: '0644'

File permissions matter.

Configuration files containing secrets should use restrictive permissions such as 0600 where appropriate.

Do not use overly permissive permissions for credentials or private keys.

The validate parameter is particularly useful for production operations.

For Nginx, a validation command can run nginx -t against the temporary candidate configuration.

The validation command must be compatible with the target application and its configuration path.

A valid configuration should be deployed before a reload or restart.

Use handlers to reload services only when the template changes.

This improves efficiency and avoids unnecessary service disruption.`,
      steps: [
        "Select the source Jinja2 template.",
        "Select the destination configuration path.",
        "Define owner and group.",
        "Set the correct file mode.",
        "Enable backup where useful.",
        "Configure application-specific validation.",
        "Deploy the rendered template.",
        "Notify the appropriate handler.",
        "Verify the running service."
      ],
      commands: `# Inspect template module options
ansible-doc ansible.builtin.template

# Deploy a template using a playbook
ansible-playbook -i inventory.ini nginx.yml

# Validate Nginx configuration on the target
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"

# Check destination file permissions
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "stat -c '%U %G %a %n' /etc/nginx/conf.d/app.conf"

# Check service status
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl status nginx"

# Run the playbook with verbose output
ansible-playbook -i inventory.ini nginx.yml -vv`,
      config: `# tasks/main.yml
- name: Deploy Nginx virtual host
  ansible.builtin.template:
    src: nginx.conf.j2
    dest: /etc/nginx/conf.d/app.conf
    owner: root
    group: root
    mode: '0644'
    backup: true
    validate: 'nginx -t -c %s'
  notify: Reload Nginx

# handlers/main.yml
- name: Reload Nginx
  ansible.builtin.service:
    name: nginx
    state: reloaded

# The validation command must match the target application's
# supported configuration validation behavior.
# Ensure required parent configuration is available for validation.`,
      problems: [
        {
          issue: "Template deployment fails with a permission denied error.",
          rootCause: "The Ansible connection user may not have permission to write to the destination directory.",
          solution: "Use privilege escalation where appropriate, verify destination directory permissions, and check the target user's sudo permissions."
        },
        {
          issue: "The template module reports that validation failed.",
          rootCause: "The rendered configuration is invalid or the validation command cannot execute against the temporary candidate file.",
          solution: "Inspect the generated configuration, correct syntax errors, and verify that the validation command is appropriate for the target application."
        }
      ]
    },
    {
      heading: "7. Real-Time Company Scenario – Nginx Configuration Management",
      explanation: `Consider an organization running a web application behind Nginx.

The application has three environments.

Development:
app-dev.example.com

Staging:
app-stage.example.com

Production:
app.example.com

The company wants one reusable Nginx template.

The environment-specific values are maintained in separate group variable files.

Ansible renders the same template differently for each environment.

For example, the production configuration may enable HTTPS and use a production application endpoint.

The development environment may use a different backend port.

The template is stored in the project's templates directory.

The template task deploys the generated configuration to the Nginx configuration directory.

After the file changes, Ansible notifies the Nginx reload handler.

The handler executes only when required.

A safe production workflow includes:
1. Validate playbook syntax.
2. Check inventory and variables.
3. Render the intended configuration.
4. Validate the generated Nginx configuration.
5. Deploy the file.
6. Reload Nginx.
7. Verify the service.
8. Test HTTP or HTTPS connectivity.
9. Review logs.

For production, avoid directly restarting services when a reload is sufficient.

A reload is generally less disruptive when the service supports it and the new configuration is valid.

Always check the application's official operational behavior before selecting reload or restart.`,
      steps: [
        "Create separate development, staging, and production inventories.",
        "Create environment-specific group variables.",
        "Create one reusable Nginx Jinja2 template.",
        "Create the template deployment task.",
        "Validate the configuration before deployment.",
        "Notify the Nginx reload handler.",
        "Run the playbook against development.",
        "Promote the same template to staging.",
        "Deploy to production after approval.",
        "Verify HTTP response and application availability."
      ],
      commands: `# Check Nginx installation
ansible webservers -i inventory/dev.ini -b -m ansible.builtin.package -a "name=nginx state=present"

# Validate playbook syntax
ansible-playbook -i inventory/dev.ini nginx.yml --syntax-check

# Deploy development configuration
ansible-playbook -i inventory/dev.ini nginx.yml

# Deploy staging configuration
ansible-playbook -i inventory/staging.ini nginx.yml

# Deploy production configuration after approval
ansible-playbook -i inventory/production.ini nginx.yml

# Validate Nginx configuration
ansible webservers -i inventory/production.ini -b -m ansible.builtin.command -a "nginx -t"

# Check Nginx service
ansible webservers -i inventory/production.ini -b -m ansible.builtin.service -a "name=nginx state=started"

# Check application response from a suitable test machine
curl -I https://app.example.com`,
      config: `# group_vars/development.yml
environment: development
server_name: app-dev.example.com
nginx_port: 8080
backend_host: 127.0.0.1
backend_port: 8081
enable_https: false

# group_vars/staging.yml
environment: staging
server_name: app-stage.example.com
nginx_port: 80
backend_host: 127.0.0.1
backend_port: 8082
enable_https: true

# group_vars/production.yml
environment: production
server_name: app.example.com
nginx_port: 80
backend_host: 127.0.0.1
backend_port: 8080
enable_https: true

# templates/app.conf.j2
server {
    listen {{ nginx_port }};
    server_name {{ server_name }};

    location / {
        proxy_pass http://{{ backend_host }}:{{ backend_port }};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# This is a simplified reverse-proxy example.
# Production TLS configuration should include approved certificates,
# protocols, ciphers, and security settings.`,
      problems: [
        {
          issue: "Nginx returns HTTP 502 after deploying a template.",
          rootCause: "The generated proxy_pass address or port may be incorrect, or the backend application may not be running.",
          solution: "Inspect the generated Nginx configuration, verify backend host and port, check application health, run nginx -t, and inspect Nginx error logs."
        },
        {
          issue: "The wrong environment hostname appears in production.",
          rootCause: "The production inventory may not load the intended group variables or another variable source may override the hostname.",
          solution: "Verify inventory group membership, inspect effective variables, and run the deployment with the correct production inventory."
        }
      ]
    },
    {
      heading: "8. End-to-End Application Configuration Deployment Workflow",
      explanation: `Templates are commonly used in complete application deployment workflows.

A DevOps engineer may need to:
- Install application dependencies.
- Create directories.
- Deploy application files.
- Generate configuration.
- Create service definitions.
- Configure Nginx.
- Start the application.
- Validate service health.

The template module can generate an application environment file.

Example values:
- APP_ENV.
- APP_PORT.
- DATABASE_HOST.
- DATABASE_PORT.
- LOG_LEVEL.

The same template can be reused across environments.

Secrets should not be printed in task output.

Use Ansible Vault or an approved secret manager to protect credentials.

The application service can be configured using a systemd unit template.

A systemd template may define:
- Description.
- User.
- Working directory.
- Environment file.
- ExecStart.
- Restart policy.
- Service dependencies.

After deploying a changed service definition, Ansible should reload the systemd daemon.

Then it can restart the application service.

The order matters.

A correct deployment sequence is:

1. Create application directories.
2. Deploy application files.
3. Generate environment configuration.
4. Validate configuration.
5. Deploy the systemd unit.
6. Reload systemd.
7. Restart the application.
8. Verify service status.
9. Run a health check.

Use handlers or explicit task ordering to ensure configuration changes are applied correctly.

A production deployment should include rollback planning.

Backups of important configuration files and version-controlled templates help restore the previous state.`,
      steps: [
        "Prepare application variables.",
        "Create the application directory.",
        "Deploy application files.",
        "Generate the environment configuration.",
        "Set restrictive permissions for sensitive files.",
        "Deploy the systemd service template.",
        "Reload systemd.",
        "Restart the application.",
        "Check service health.",
        "Review application logs."
      ],
      commands: `# Validate the deployment playbook
ansible-playbook -i inventory.ini deploy.yml --syntax-check

# Execute the deployment
ansible-playbook -i inventory.ini deploy.yml

# Check application service
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl status payment-service"

# Reload systemd
ansible appservers -i inventory.ini -b -m ansible.builtin.systemd_service -a "daemon_reload=true"

# Check application logs
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u payment-service -n 100 --no-pager"

# Check listening ports
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "ss -lntp"

# Run the playbook against one host
ansible-playbook -i inventory.ini deploy.yml --limit app01`,
      config: `# templates/application.env.j2
APP_NAME={{ application_name }}
APP_ENV={{ environment }}
APP_PORT={{ application_port }}
DATABASE_HOST={{ database_host }}
DATABASE_PORT={{ database_port }}
LOG_LEVEL={{ log_level }}

# templates/payment-service.service.j2
[Unit]
Description=Payment Application
After=network.target

[Service]
Type=simple
User={{ application_user }}
WorkingDirectory={{ application_directory }}
EnvironmentFile={{ application_directory }}/.env
ExecStart={{ application_start_command }}
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target

# tasks/main.yml
- name: Create application directory
  ansible.builtin.file:
    path: "{{ application_directory }}"
    state: directory
    owner: "{{ application_user }}"
    group: "{{ application_group }}"
    mode: '0750'

- name: Deploy environment file
  ansible.builtin.template:
    src: application.env.j2
    dest: "{{ application_directory }}/.env"
    owner: "{{ application_user }}"
    group: "{{ application_group }}"
    mode: '0600'
  no_log: true
  notify: Restart payment service

- name: Deploy systemd service
  ansible.builtin.template:
    src: payment-service.service.j2
    dest: /etc/systemd/system/payment-service.service
    owner: root
    group: root
    mode: '0644'
  notify:
    - Reload systemd
    - Restart payment service

# handlers/main.yml
- name: Reload systemd
  ansible.builtin.systemd_service:
    daemon_reload: true

- name: Restart payment service
  ansible.builtin.systemd_service:
    name: payment-service
    state: restarted

# Adapt application commands, users and paths to the actual project.
# Use no_log for tasks that may expose sensitive rendered values.`,
      problems: [
        {
          issue: "The application service starts but cannot connect to the database.",
          rootCause: "The generated environment file may contain the wrong database hostname, port, credentials, or environment selection.",
          solution: "Verify the rendered non-secret connection settings, confirm network connectivity and database health, and validate secret injection without printing credentials."
        },
        {
          issue: "The application service does not recognize an updated service definition.",
          rootCause: "The systemd daemon may not have reloaded the changed unit file.",
          solution: "Run daemon_reload, restart the application service when required, and verify the active unit configuration."
        }
      ]
    },
    {
      heading: "9. Templates for Kubernetes, Monitoring and Infrastructure Configuration",
      explanation: `Templates are useful beyond traditional Linux configuration files.

They can generate Kubernetes manifests, monitoring configuration, application gateway settings, and other infrastructure files.

For Kubernetes, a template may generate:
- Deployment manifests.
- Service manifests.
- ConfigMaps.
- Ingress resources.
- Environment-specific resource names.
- Replica counts.
- Image versions.

A Kubernetes manifest is structured YAML, so indentation and data types must be correct.

For Prometheus, a template may generate scrape targets or job configuration.

For Grafana-related automation, templates may generate configuration files or provisioning data.

For database services, templates may generate connection settings and access configuration.

The same principles apply:
- Keep variables separate from the template.
- Generate valid output.
- Validate before applying.
- Deploy in controlled stages.
- Verify the resulting service.

For Kubernetes manifests, use the appropriate validation tools and inspect the final rendered manifest.

For example, a rendered Kubernetes YAML file can be checked using kubectl's client-side validation capabilities.

For Prometheus, use the Prometheus configuration validation tool where available.

Do not assume that successful Jinja2 rendering means the resulting application configuration is valid.

Template rendering validates the generation process, not necessarily the target application's syntax or semantics.`,
      steps: [
        "Identify the target configuration format.",
        "Define environment-specific variables.",
        "Create the template.",
        "Generate the final YAML or configuration.",
        "Check formatting and data types.",
        "Run the target application's validation tool.",
        "Deploy the configuration.",
        "Verify the running workload or service."
      ],
      commands: `# Validate Ansible playbook
ansible-playbook -i inventory.ini kubernetes.yml --syntax-check

# Inspect Kubernetes manifest after generation
kubectl apply --dry-run=client -f deployment.yml

# Inspect Kubernetes deployment
kubectl get deployments

# Inspect Kubernetes pods
kubectl get pods -o wide

# Inspect Prometheus configuration if promtool is installed
promtool check config prometheus.yml

# Inspect Nginx configuration
nginx -t

# Execute the Ansible deployment
ansible-playbook -i inventory.ini infrastructure.yml`,
      config: `# group_vars/kubernetes.yml
application_name: payment-api
container_image: registry.example.com/payment-api:v1.5.0
replica_count: 3
container_port: 8080

# templates/deployment.yml.j2
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ application_name }}
spec:
  replicas: {{ replica_count }}
  selector:
    matchLabels:
      app: {{ application_name }}
  template:
    metadata:
      labels:
        app: {{ application_name }}
    spec:
      containers:
        - name: {{ application_name }}
          image: {{ container_image }}
          ports:
            - containerPort: {{ container_port }}

# Render and validate before applying.
# Use approved image references and resource limits in production.
# Add probes, security context, and resource requests/limits
# according to the application's operational requirements.`,
      problems: [
        {
          issue: "Kubernetes rejects the generated manifest.",
          rootCause: "The template may generate invalid YAML, incorrect indentation, wrong data types, or an unsupported Kubernetes API version.",
          solution: "Inspect the rendered manifest, validate YAML syntax, use kubectl validation, and check the resource schema for the target cluster."
        },
        {
          issue: "Prometheus fails to load generated configuration.",
          rootCause: "The generated scrape configuration may contain invalid fields, indentation, target values, or unsupported configuration syntax.",
          solution: "Run promtool check config against the rendered file, correct the invalid configuration, and reload Prometheus safely."
        }
      ]
    },
    {
      heading: "10. Production Operations, Idempotency, Performance and Best Practices",
      explanation: `Production template management requires more than generating a file.

The generated configuration must be correct, secure, maintainable, and safe to deploy.

Idempotency:
Running the same playbook repeatedly with unchanged variables should not repeatedly modify the configuration.

Use handlers:
Reload or restart services only when configuration changes require it.

Validation:
Validate the generated configuration before replacing the active file whenever the target application supports safe validation.

Permissions:
Use the minimum required file permissions.

Secrets:
Do not expose passwords, tokens, private keys, or database credentials in normal task output.

Version control:
Store templates and non-secret configuration variables in Git.

Environment separation:
Maintain separate values for development, staging, and production.

Testing:
Test all supported combinations of variables and configuration modes.

Performance:
Avoid unnecessarily rendering huge files repeatedly.

Maintainability:
Use descriptive variable names and readable template structure.

Reliability:
Back up critical configurations where appropriate.

Rollback:
Keep the previous known-good configuration available through version control or controlled backups.

Monitoring:
After deployment, verify service health, logs, ports, and application responses.

A configuration deployment should be treated as a production change.

A successful Ansible task does not prove that the application is healthy.

The final verification must check the actual service behavior.`,
      steps: [
        "Review the template changes in version control.",
        "Check variable definitions.",
        "Validate the playbook.",
        "Run tests in development.",
        "Validate generated configuration.",
        "Check file ownership and permissions.",
        "Deploy using a controlled change window where needed.",
        "Use handlers to reload or restart services.",
        "Verify application health.",
        "Monitor logs and performance.",
        "Keep a rollback plan."
      ],
      commands: `# Validate playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Check playbook execution behavior without applying changes
ansible-playbook -i inventory.ini site.yml --check

# Show proposed differences
ansible-playbook -i inventory.ini site.yml --check --diff

# Limit execution to one host
ansible-playbook -i inventory.ini site.yml --limit web01

# Inspect Nginx configuration
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"

# Inspect service status
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl status nginx"

# Inspect logs
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u nginx -n 100 --no-pager"

# Review the final configuration
ansible web01 -i inventory.ini -m ansible.builtin.command -a "cat /etc/nginx/conf.d/app.conf"

# Note: check mode support depends on the module and task behavior.`,
      config: `# Production-oriented template task
- name: Deploy production Nginx configuration
  ansible.builtin.template:
    src: nginx.conf.j2
    dest: /etc/nginx/conf.d/application.conf
    owner: root
    group: root
    mode: '0644'
    backup: true
    validate: 'nginx -t -c %s'
  notify: Reload Nginx

# Example sensitive environment file
- name: Deploy protected application environment
  ansible.builtin.template:
    src: application.env.j2
    dest: /opt/application/.env
    owner: application
    group: application
    mode: '0600'
  no_log: true
  notify: Restart application

# Keep credentials encrypted or inject them from a secret manager.
# Validate target application behavior after every production change.
# The validation command must be tested for the actual target system.`,
      problems: [
        {
          issue: "Ansible reports changed every time even when configuration appears identical.",
          rootCause: "Generated timestamps, variable ordering, random values, whitespace differences, or unstable data can change the rendered output.",
          solution: "Remove unnecessary dynamic values, stabilize input data, control whitespace, and compare the actual generated file between executions."
        },
        {
          issue: "A production service becomes unavailable after template deployment.",
          rootCause: "An invalid or incompatible configuration was deployed, or the application could not reload the new settings.",
          solution: "Restore the last known-good configuration, validate the corrected template in staging, review service logs, and redeploy through controlled validation."
        }
      ]
    },
    {
      heading: "11. Advanced Troubleshooting, Logs and Root Cause Analysis",
      explanation: `Template troubleshooting should follow a systematic process.

First identify the failing stage.

Stage 1: Source file problem.

The template file may be missing or incorrectly referenced.

Stage 2: Variable problem.

A required variable may be undefined or incorrectly scoped.

Stage 3: Rendering problem.

Jinja2 expressions, filters, loops, or conditions may produce unexpected output.

Stage 4: Transfer problem.

The managed server may reject the file write because of permissions or filesystem issues.

Stage 5: Validation problem.

The generated file may be invalid for the target application.

Stage 6: Service activation problem.

The application may not reload or restart correctly.

Stage 7: Runtime problem.

The service may start but fail because of incorrect endpoints, credentials, or application settings.

Use verbose Ansible output to identify the failing task.

Use the application configuration validator to isolate syntax problems.

Compare the rendered configuration with the last known-good version.

Inspect system logs and application logs.

Do not expose sensitive configuration values in shared troubleshooting logs.

When using --diff, remember that rendered configuration differences can contain secrets.

Use no_log for sensitive tasks and apply an appropriate operational logging policy.

Root cause analysis should identify why the incorrect configuration was generated, not just how to restart the service.

Permanent fixes often involve correcting variable sources, adding validation, improving tests, and controlling environment-specific values.`,
      steps: [
        "Identify the exact failing template task.",
        "Read Ansible error output.",
        "Check the source template path.",
        "Verify required variable values.",
        "Inspect the rendered configuration.",
        "Check target file permissions.",
        "Run the application's configuration validator.",
        "Inspect service logs.",
        "Restore a known-good configuration if necessary.",
        "Correct the source cause.",
        "Add a regression test.",
        "Verify a repeated deployment."
      ],
      commands: `# Run with detailed diagnostics
ansible-playbook -i inventory.ini site.yml -vvv

# Check syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Inspect inventory
ansible-inventory -i inventory.ini --graph

# Inspect host variables
ansible-inventory -i inventory.ini --host web01

# Compare proposed changes carefully
ansible-playbook -i inventory.ini site.yml --check --diff

# Validate Nginx
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"

# Check system logs
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "journalctl -xe --no-pager"

# Check Nginx logs
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "tail -n 100 /var/log/nginx/error.log"

# Inspect the deployed file
ansible web01 -i inventory.ini -m ansible.builtin.command -a "cat /etc/nginx/conf.d/application.conf"`,
      config: `# Example safe pre-deployment validation
- name: Verify required template variables
  ansible.builtin.assert:
    that:
      - server_name is defined
      - nginx_port is defined
      - backend_host is defined
      - backend_port is defined
    fail_msg: "Required Nginx template variables are missing"

- name: Verify Nginx port range
  ansible.builtin.assert:
    that:
      - nginx_port | int >= 1
      - nginx_port | int <= 65535
    fail_msg: "Invalid Nginx port"

- name: Deploy configuration
  ansible.builtin.template:
    src: nginx.conf.j2
    dest: /etc/nginx/conf.d/application.conf
    owner: root
    group: root
    mode: '0644'
    validate: 'nginx -t -c %s'
  notify: Reload Nginx

# Assertions catch missing or invalid input before deployment.
# Add application-specific validation for other settings.`,
      problems: [
        {
          issue: "Ansible template task fails with an undefined variable error.",
          rootCause: "The required variable is missing or not available in the current host execution context.",
          solution: "Inspect host and group variables, add assertions for required values, and verify inventory membership."
        },
        {
          issue: "The rendered configuration is valid but the service fails after reload.",
          rootCause: "The configuration may reference an unavailable backend, invalid certificate, missing file, or unsupported runtime setting.",
          solution: "Inspect application logs, validate dependencies and file paths, restore the last known-good configuration if needed, and add runtime verification to the deployment."
        }
      ]
    },
    {
      heading: "12. Interview Questions, Verification Checklist and Senior Engineer Knowledge",
      explanation: `Ansible templates are a frequently discussed topic in DevOps interviews because configuration management is a core infrastructure automation responsibility.

A junior engineer should understand the template module and basic Jinja2 syntax.

A mid-level engineer should understand variables, filters, loops, conditions, handlers, environment separation, and configuration validation.

A senior engineer should understand:
- Variable precedence.
- Template security.
- Idempotency.
- Configuration validation.
- Change management.
- Rollback.
- CI/CD integration.
- Execution environments.
- Production troubleshooting.
- Secret handling.
- Configuration drift.

Interview question: What is an Ansible template?

Answer: A Jinja2-based file used to generate dynamic configuration content using Ansible variables and expressions.

Interview question: What is the difference between copy and template?

Answer: Copy transfers an existing file, while template renders Jinja2 expressions before transferring the generated file.

Interview question: Where is a template processed?

Answer: Normally on the Ansible control node, and the rendered result is transferred to the managed host.

Interview question: What is the .j2 extension?

Answer: A commonly used filename extension for Jinja2 template files.

Interview question: What is the difference between {{ }} and {% %}?

Answer: Double curly braces output expressions, while the percent-delimited syntax controls template logic such as loops and conditions.

Interview question: What is a Jinja2 filter?

Answer: A transformation applied to a value, such as upper, lower, default, or to_json.

Interview question: How do you restart Nginx only when its configuration changes?

Answer: Notify a handler from the template task and let the handler reload Nginx when the file changes.

Interview question: How do you protect secrets in a template?

Answer: Use Ansible Vault or a secret manager, restrictive file permissions, and no_log where task output could expose sensitive values.

Interview question: How do you validate an Nginx configuration before deployment?

Answer: Use the template module's validate capability with an appropriate Nginx validation command.

Interview question: Why is idempotency important?

Answer: It allows repeated automation runs without unnecessary configuration changes or service disruption.

Interview question: Why can a template task report changed every time?

Answer: Dynamic values, timestamps, unstable data ordering, or whitespace differences can cause different rendered output.

Interview question: How do you troubleshoot an incorrect production configuration?

Answer: Check the source template, variable values, rendered output, destination permissions, application validation, service logs, and runtime dependencies.

Senior engineer verification checklist:

1. Correct template source.
2. Correct inventory.
3. Correct environment variables.
4. Required variables validated.
5. Jinja2 expressions correct.
6. Filters and loops tested.
7. Correct indentation and formatting.
8. Correct destination path.
9. Correct file ownership.
10. Correct permissions.
11. Sensitive values protected.
12. Application configuration validated.
13. Handler behavior tested.
14. Idempotency verified.
15. Runtime health checked.
16. Rollback plan available.

The final objective is to make configuration deployments predictable, repeatable, secure, and easy to troubleshoot.

A good DevOps engineer does not stop after seeing a successful template task. The engineer verifies the generated configuration and confirms that the real application is healthy.`,
      steps: [
        "Understand Jinja2 syntax.",
        "Explain copy versus template.",
        "Understand variable sources and precedence.",
        "Use filters, loops, and conditions.",
        "Deploy configuration using the template module.",
        "Use handlers for controlled service reloads.",
        "Validate generated files.",
        "Protect sensitive data.",
        "Test idempotency.",
        "Verify application health.",
        "Document rollback and recovery procedures."
      ],
      commands: `# Verify Ansible version
ansible --version

# Verify template module documentation
ansible-doc ansible.builtin.template

# Verify playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Test execution without applying changes
ansible-playbook -i inventory.ini site.yml --check

# Inspect proposed differences carefully
ansible-playbook -i inventory.ini site.yml --check --diff

# Execute the deployment
ansible-playbook -i inventory.ini site.yml

# Verify deployed configuration
ansible web01 -i inventory.ini -m ansible.builtin.command -a "cat /etc/nginx/conf.d/application.conf"

# Validate Nginx configuration
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"

# Verify service
ansible web01 -i inventory.ini -b -m ansible.builtin.service -a "name=nginx state=started"

# Inspect service logs
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u nginx -n 50 --no-pager"`,
      config: `# Final recommended project structure
ansible-project/
  ansible.cfg
  inventory/
    development.ini
    staging.ini
    production.ini
  group_vars/
    all.yml
    webservers.yml
  host_vars/
  templates/
    nginx.conf.j2
    application.env.j2
    application.service.j2
  playbooks/
    nginx.yml
    application.yml
    site.yml
  roles/
  requirements.yml
  README.md

# Final deployment principles:
# 1. Keep templates in Git.
# 2. Keep environment values separate.
# 3. Keep secrets encrypted or externally managed.
# 4. Validate before activating configuration.
# 5. Use handlers for service reloads.
# 6. Verify idempotency.
# 7. Verify the running application.
# 8. Maintain rollback capability.`,
      problems: [
        {
          issue: "The template deployment succeeds but the application is unhealthy.",
          rootCause: "A successful file transfer does not guarantee that the generated configuration is valid for the application's runtime dependencies.",
          solution: "Add configuration validation, service checks, application health checks, and log inspection to the deployment workflow."
        },
        {
          issue: "Sensitive values appear in Ansible task output.",
          rootCause: "A task handling secret values is logging arguments, diffs, or returned content.",
          solution: "Use no_log for sensitive tasks, protect destination file permissions, avoid exposing secret values in debug output, and use approved secret-management mechanisms."
        }
      ]
    }
  ]
};

export default noteData;
