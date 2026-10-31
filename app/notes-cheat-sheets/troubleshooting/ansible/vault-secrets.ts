import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Vault and Production Secrets Management – Complete DevOps Engineer Technical Notes",
  description: "My detailed personal study notes covering secret management, Ansible Vault architecture, encryption and decryption, encrypted variables, Vault IDs, password files, external secret managers, HashiCorp Vault, AWS Secrets Manager, CI/CD integration, credential rotation, production security, auditing, incident response, troubleshooting, RCA and senior DevOps engineering practices.",
  sections: [
    {
      heading: "1. My Technical Notes – Why Secrets Management Is Important in DevOps",
      explanation: `Secrets are sensitive values used by applications, infrastructure, automation systems, and deployment pipelines.

Examples include:

- Linux user passwords.
- SSH private keys.
- Database usernames and passwords.
- Application API tokens.
- AWS access credentials.
- Cloud service credentials.
- TLS private keys.
- Kubernetes credentials.
- Third-party service tokens.
- Ansible Vault passwords.

In a real company, Ansible may connect to hundreds of servers and configure many applications.

Those applications may need database passwords, service credentials, or API tokens.

A common beginner mistake is writing sensitive values directly inside playbooks.

Example of an unsafe approach:

database_password: MyDatabasePassword123

If this file is committed to GitHub, anyone with repository access may be able to read the password.

Even after deleting the line, the secret may remain in Git history.

This creates a serious security problem.

Secrets management provides a controlled way to store, access, use, rotate, and audit sensitive information.

Ansible provides Ansible Vault to encrypt sensitive data.

Ansible Vault can encrypt:
- Complete YAML files.
- Individual variable files.
- Individual strings.
- Files containing certificates or other sensitive material.

When an authorized playbook runs, Ansible decrypts the required values using an approved Vault credential.

The application receives the required value without requiring the engineer to store it in plaintext in the repository.

Important principle:

Encryption protects stored data, but it does not automatically protect every place where a secret may appear.

A secret can still leak through:
- Debug output.
- Verbose logs.
- CI/CD logs.
- Temporary files.
- Shell command arguments.
- Process inspection.
- Unprotected backups.
- Application configuration permissions.
- Debugging tools.

Production secrets management must protect the complete lifecycle of a secret.

That lifecycle includes creation, storage, distribution, access, usage, rotation, revocation, and deletion.

A senior DevOps engineer should understand both Ansible Vault and external secret-management systems.`,
      steps: [
        "Identify all sensitive values used by infrastructure and applications.",
        "Classify secrets according to their sensitivity.",
        "Choose an approved secret-management method.",
        "Encrypt secrets before committing them to Git.",
        "Restrict access to encryption credentials.",
        "Prevent secrets from appearing in logs.",
        "Use separate credentials for each environment.",
        "Rotate credentials regularly.",
        "Revoke credentials when they are compromised.",
        "Audit secret access and automation execution."
      ],
      commands: `# Check Ansible version
ansible --version

# Check Ansible Vault help
ansible-vault --help

# Create an encrypted file
ansible-vault create secrets.yml

# Encrypt an existing file
ansible-vault encrypt secrets.yml

# Check whether a file is encrypted
head -n 1 secrets.yml

# List configured Ansible settings
ansible-config dump --only-changed

# Check installed collections
ansible-galaxy collection list`,
      config: `# UNSAFE: Never store real production credentials like this.
database_user: appuser
database_password: plaintext-password
api_token: example-token

# BETTER: Keep sensitive variables in an encrypted Vault file.
# group_vars/production/vault.yml

database_user: appuser
database_password: encrypted-value-managed-by-ansible-vault
api_token: encrypted-value-managed-by-ansible-vault

# The values shown above are explanatory placeholders.
# Generate real encrypted files with ansible-vault.
# Never commit actual plaintext production credentials.`,
      problems: [
        {
          issue: "A developer accidentally commits a production password to GitHub.",
          rootCause: "Sensitive credentials were stored directly in a source-controlled file without encryption or secret-scanning controls.",
          solution: "Immediately rotate the exposed credential, review repository and access logs, remove the secret from current files, assess Git history exposure, and introduce Vault or an approved external secret manager."
        },
        {
          issue: "An application password is visible in Ansible output.",
          rootCause: "A task may display a sensitive variable through debug, module output, verbose logging, or command execution.",
          solution: "Use no_log on sensitive tasks, remove debug statements, restrict log access, and rotate the credential if exposure may have occurred."
        }
      ]
    },
    {
      heading: "2. Ansible Vault Architecture and Internal Working",
      explanation: `Ansible Vault is the built-in mechanism for encrypting sensitive Ansible data.

It allows engineers to keep encrypted secrets in an automation repository.

The encryption process works conceptually as follows:

1. The engineer creates a sensitive YAML file.
2. The engineer executes ansible-vault encrypt.
3. Ansible requests an encryption password or uses an approved password source.
4. Vault encrypts the file.
5. The encrypted file is stored in the repository.
6. The authorized automation process receives the Vault password.
7. Ansible decrypts the required content during execution.
8. Tasks use the resulting variable values.
9. Sensitive task output is protected where appropriate.

The encrypted file normally begins with a Vault header.

Example:

$ANSIBLE_VAULT;1.1;AES256

The header identifies the Vault format and encryption information.

Encrypted content should not be manually edited.

Use ansible-vault edit to modify encrypted files.

Ansible Vault protects data at rest.

It does not replace:
- SSH security.
- CI/CD credential protection.
- Operating system permissions.
- Access control.
- Audit logging.
- Secret rotation.
- Runtime application security.

A production architecture may use Vault files for repository-managed secrets and an external secret manager for dynamically retrieved credentials.

The correct choice depends on the organization's security architecture.

Ansible Vault is useful when encrypted values are maintained with the automation code.

External secret managers are often useful when credentials need centralized lifecycle management, access policies, dynamic credentials, or automated rotation.

Both approaches can be used together.`,
      steps: [
        "Create a secret file.",
        "Encrypt the file using Ansible Vault.",
        "Store only encrypted content in Git.",
        "Configure authorized Vault credential access.",
        "Execute the playbook.",
        "Allow Ansible to decrypt the required values.",
        "Protect sensitive task output.",
        "Verify the application configuration.",
        "Audit the automation execution."
      ],
      commands: `# Create an encrypted file
ansible-vault create vault.yml

# Encrypt an existing file
ansible-vault encrypt vault.yml

# View encrypted file contents
ansible-vault view vault.yml

# Edit an encrypted file
ansible-vault edit vault.yml

# Run a playbook using a password prompt
ansible-playbook site.yml --ask-vault-pass

# Run using a password file
ansible-playbook site.yml --vault-password-file /secure/path/vault-password

# Check encrypted file syntax
ansible-vault view vault.yml`,
      config: `# Example encrypted file structure
$ANSIBLE_VAULT;1.1;AES256
ENCRYPTED_CONTENT_PLACEHOLDER

# Example project structure
ansible-project/
  ansible.cfg
  inventory/
    production.ini
  group_vars/
    production/
      vault.yml
  playbooks/
    site.yml
  roles/
  requirements.yml

# The actual encrypted file is generated by Ansible.
# Do not manually create a fake Vault header.
# Do not place the real Vault password beside the encrypted file.`,
      problems: [
        {
          issue: "Ansible reports that the file is not a valid Vault encrypted file.",
          rootCause: "The file may have been manually edited, corrupted, truncated, or encrypted using an unsupported format.",
          solution: "Check the Vault header, inspect the file using ansible-vault view, restore a valid encrypted version from source control, and avoid manually editing encrypted content."
        },
        {
          issue: "The playbook cannot decrypt an encrypted variable file.",
          rootCause: "The automation process may not have received the correct Vault password or Vault ID.",
          solution: "Verify the authorized credential source, Vault ID configuration, and execution environment before retrying."
        }
      ]
    },
    {
      heading: "3. Creating, Encrypting, Decrypting and Editing Vault Files",
      explanation: `The most common Ansible Vault workflow is managing encrypted YAML files.

An engineer may maintain a file called vault.yml containing database credentials and application tokens.

The file is created with ansible-vault create.

Ansible asks for a Vault password and opens an editor.

After saving, Ansible writes the encrypted result.

To encrypt an existing file, use ansible-vault encrypt.

To inspect the contents, use ansible-vault view.

To safely edit encrypted content, use ansible-vault edit.

To change the encryption password, use ansible-vault rekey.

Decryption should be used carefully.

The ansible-vault decrypt command converts an encrypted file into plaintext.

That plaintext must not be committed to Git or left in an uncontrolled location.

Use a secure temporary workspace if decryption is absolutely necessary.

In normal production automation, the playbook should consume the encrypted file directly.

Avoid decrypting files manually just to run a playbook.

The password prompt is suitable for interactive use.

CI/CD environments should use their approved secret credential mechanisms.

A Vault password file can be used, but it must be protected by operating system permissions and must not be committed to source control.

A password file is not secure merely because its name contains the word secure.

Its access must be restricted.

For multiple environments, use different Vault credentials wherever practical.`,
      steps: [
        "Create the YAML file containing sensitive variables.",
        "Encrypt the file using ansible-vault encrypt.",
        "Verify the Vault header.",
        "Commit only the encrypted file.",
        "Use ansible-vault edit for future changes.",
        "Use ansible-vault view only when authorized.",
        "Rekey the file when the encryption password must change.",
        "Avoid unnecessary plaintext decryption.",
        "Secure the Vault password source.",
        "Verify that no plaintext copy remains in the repository."
      ],
      commands: `# Create a new encrypted file
ansible-vault create secrets.yml

# Encrypt an existing YAML file
ansible-vault encrypt secrets.yml

# View the encrypted file's decrypted contents
ansible-vault view secrets.yml

# Edit the encrypted file
ansible-vault edit secrets.yml

# Change the encryption password
ansible-vault rekey secrets.yml

# Decrypt the file to plaintext
ansible-vault decrypt secrets.yml

# Encrypt multiple files
ansible-vault encrypt database.yml application.yml

# Run a playbook with an interactive Vault password
ansible-playbook site.yml --ask-vault-pass`,
      config: `# Plaintext source before encryption
database:
  host: db.internal.example
  port: 5432
  username: application_user
  password: CHANGE_ME

application:
  api_token: CHANGE_ME

# Save this as a temporary source file.
# Encrypt it:
# ansible-vault encrypt secrets.yml

# After encryption, only the encrypted version should be stored in Git.
# Use actual secret values only in an authorized secure environment.
# Remove uncontrolled plaintext copies securely according to company policy.`,
      problems: [
        {
          issue: "ansible-vault edit cannot open the editor.",
          rootCause: "The configured editor may not exist, the EDITOR environment variable may be incorrect, or the user may not have access to the temporary directory.",
          solution: "Configure a supported editor, verify EDITOR or VISUAL, check filesystem permissions, and retry using the approved workstation."
        },
        {
          issue: "An encrypted file becomes plaintext after a maintenance operation.",
          rootCause: "A decrypt command or custom script may have modified the tracked file.",
          solution: "Restore the encrypted version, verify repository status, re-encrypt the correct content, and add checks that reject plaintext secret files."
        }
      ]
    },
    {
      heading: "4. Encrypting Individual Variables with Encrypt String",
      explanation: `Sometimes an entire file does not need encryption.

Ansible Vault can encrypt a single variable value using encrypt_string.

This is useful when a configuration file contains both normal settings and sensitive values.

Example:

application_port: 8080
database_user: appuser
database_password: encrypted_value

The port and username may be ordinary configuration values, while the database password is encrypted.

The encrypt_string command creates an encrypted variable representation.

The resulting content can be inserted into a YAML file.

This makes it possible to keep the overall configuration readable while protecting selected values.

However, file-level encryption is often simpler for teams when many sensitive variables are stored together.

Do not choose individual-variable encryption just because it looks more advanced.

Choose the method that is easiest to review and maintain safely.

When encrypting a value from the command line, remember that shell history and process arguments can create exposure risks depending on how the command is constructed and executed.

For sensitive production values, prefer a secure interactive input method or an approved secret-management workflow.

Do not place actual passwords directly into shell commands that may be recorded.

The resulting encrypted variable must be valid YAML and must be included in the correct variable scope.

Ansible must be able to load the variable before the task that consumes it executes.`,
      steps: [
        "Identify the variable that contains sensitive data.",
        "Choose individual-variable or complete-file encryption.",
        "Use a secure method to supply the value.",
        "Generate encrypted YAML using encrypt_string.",
        "Place the encrypted value in the correct variable file.",
        "Validate YAML syntax.",
        "Execute a controlled test playbook.",
        "Verify that the value is not exposed in output."
      ],
      commands: `# Basic encrypt-string command pattern
ansible-vault encrypt_string 'example-value' --name 'api_token'

# Interactive input pattern
ansible-vault encrypt_string --stdin-name 'database_password'

# Supply a Vault password interactively when required
ansible-vault encrypt_string --stdin-name 'database_password' --ask-vault-pass

# Run the playbook
ansible-playbook site.yml --ask-vault-pass

# Inspect the encrypted variable file
ansible-vault view group_vars/production/secrets.yml

# Avoid putting real production values directly in shell history.`,
      config: `# Example structure of an encrypted variable
database_host: db.internal.example
database_port: 5432
database_user: appuser

database_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  ENCRYPTED_CONTENT_PLACEHOLDER

# Example application use
- name: Configure application
  ansible.builtin.template:
    src: application.env.j2
    dest: /opt/application/.env
    owner: application
    group: application
    mode: '0600'
  no_log: true

# The placeholder is not a real encrypted value.
# Generate a valid value using ansible-vault encrypt_string.
# The task should not expose the decrypted password in logs.`,
      problems: [
        {
          issue: "Ansible reports an error while parsing an encrypted string.",
          rootCause: "The encrypted block may have incorrect indentation, an incomplete Vault payload, or invalid YAML structure.",
          solution: "Regenerate the encrypted variable using ansible-vault encrypt_string, preserve the YAML indentation, and validate the file before execution."
        },
        {
          issue: "An encrypted variable is not available inside a role.",
          rootCause: "The variable file may not be loaded automatically or the variable may be outside the role's expected scope.",
          solution: "Load the file using vars_files or place it in the appropriate group_vars or host_vars directory, then verify variable resolution."
        }
      ]
    },
    {
      heading: "5. Vault Password Files, Vault IDs and Multiple Environments",
      explanation: `Companies often maintain separate secret sets for development, staging, and production.

Using one encryption password for every environment increases the impact of a credential compromise.

Vault IDs help identify which Vault password should be used for particular encrypted content.

Example labels:

dev
staging
production

An encrypted file may be associated with a Vault ID.

Ansible can use multiple Vault credentials during execution.

This is useful when a playbook loads encrypted files protected by different passwords.

The --vault-id option accepts a label and a password source.

A password source may be a prompt or an approved password file.

Example:

--vault-id production@prompt

This asks for the production Vault password.

A password file can be supplied using a path.

Protect password files with restrictive permissions.

Never commit Vault password files to Git.

A common production pattern is to store encrypted variables in the repository and provide the corresponding Vault credential through a protected CI/CD credential store.

The pipeline retrieves the credential only for an authorized production job.

Different environments should use separate credentials and access permissions.

Vault IDs improve organization, but they do not automatically enforce environment authorization.

Access control must also be implemented by the CI/CD platform, automation platform, and operating system.

Use meaningful Vault labels and document which encrypted files they protect.`,
      steps: [
        "Define environment-specific Vault labels.",
        "Create separate encrypted files.",
        "Encrypt development secrets with the development Vault credential.",
        "Encrypt staging secrets with the staging credential.",
        "Encrypt production secrets with the production credential.",
        "Store credentials in an approved secure system.",
        "Configure the execution environment.",
        "Run the playbook with the required Vault IDs.",
        "Verify that unauthorized jobs cannot access production secrets."
      ],
      commands: `# Create an encrypted file using a Vault ID
ansible-vault create --vault-id dev@prompt dev-vault.yml

# Create production encrypted content
ansible-vault create --vault-id production@prompt production-vault.yml

# Edit a production Vault file
ansible-vault edit --vault-id production@prompt production-vault.yml

# Run with one Vault ID
ansible-playbook site.yml --vault-id production@prompt

# Run with multiple Vault IDs
ansible-playbook site.yml --vault-id dev@prompt --vault-id production@prompt

# Use a protected password file
ansible-playbook site.yml --vault-id production@/secure/path/production-password

# Re-encrypt using a new Vault ID
ansible-vault rekey --vault-id production@prompt --new-vault-id production@prompt production-vault.yml`,
      config: `# group_vars/development/vault.yml
# Encrypted using the dev Vault ID.
database_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  DEV_ENCRYPTED_PLACEHOLDER

# group_vars/staging/vault.yml
# Encrypted using the staging Vault ID.
database_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  STAGING_ENCRYPTED_PLACEHOLDER

# group_vars/production/vault.yml
# Encrypted using the production Vault ID.
database_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  PRODUCTION_ENCRYPTED_PLACEHOLDER

# Placeholders are illustrative only.
# Generate each file with its corresponding Vault ID.
# Keep the actual Vault credentials outside the repository.`,
      problems: [
        {
          issue: "Ansible cannot find a password for an encrypted Vault ID.",
          rootCause: "The execution command may not include the required Vault ID or the configured credential source may be unavailable.",
          solution: "Check the Vault ID label, confirm the corresponding credential is accessible, and pass the required --vault-id argument."
        },
        {
          issue: "The staging pipeline can decrypt production secrets.",
          rootCause: "Environment credentials may be shared or production secret access may not be restricted by the pipeline.",
          solution: "Use separate Vault credentials, restrict production credentials to protected jobs, and review automation permissions."
        }
      ]
    },
    {
      heading: "6. Using Vault Variables in Playbooks, Roles and Templates",
      explanation: `Encrypting a file is only one part of secret management.

The next step is loading the encrypted values into the automation workflow.

Ansible can load variable files through:

- group_vars.
- host_vars.
- vars_files.
- Role variables and defaults.
- Other supported variable-loading mechanisms.

A common production approach is to keep encrypted variables in group_vars.

For example:

group_vars/production/vault.yml

Ansible automatically loads suitable group_vars files when inventory groups match.

A playbook can also explicitly load a Vault file through vars_files.

Once the encrypted values are available, tasks and templates can use them.

Example:

database_password: "{{ vault_database_password }}"

The application configuration template can reference that variable.

The generated configuration file must have strict permissions.

A common permission mode for a file containing a database password is 0600, with an appropriate service owner.

Do not display the decrypted variable using debug.

Do not pass secrets to shell commands unless necessary.

Where possible, use modules that accept structured parameters instead of constructing shell commands.

Set no_log: true on sensitive tasks when the task output could reveal secret values.

Be aware that no_log can also make debugging more difficult.

Use safe diagnostic information that does not expose the secret.

A secret should be available only to the tasks that need it.

Avoid loading production secrets globally into every play when only one role needs them.`,
      steps: [
        "Create the encrypted variable file.",
        "Choose the correct inventory group or host scope.",
        "Load the Vault file.",
        "Reference variables by their approved names.",
        "Render application configuration securely.",
        "Set correct file owner and permissions.",
        "Protect sensitive tasks using no_log.",
        "Verify service behavior without displaying secret values.",
        "Check logs for accidental credential exposure."
      ],
      commands: `# Run a playbook that loads encrypted group variables
ansible-playbook -i inventory/production.ini site.yml --ask-vault-pass

# Run a playbook with an explicitly loaded Vault file
ansible-playbook -i inventory/production.ini deploy.yml --ask-vault-pass

# Check inventory groups
ansible-inventory -i inventory/production.ini --graph

# Inspect the encrypted file through Vault
ansible-vault view group_vars/production/vault.yml

# Check generated file metadata
ansible appservers -i inventory/production.ini -b -m ansible.builtin.stat -a "path=/opt/application/.env"

# Avoid commands that print the actual secret contents.`,
      config: `# group_vars/production/main.yml
database_host: db.internal.example
database_port: 5432
database_user: application_user

# group_vars/production/vault.yml
vault_database_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  ENCRYPTED_PLACEHOLDER

# deploy.yml
---
- name: Deploy application configuration
  hosts: appservers
  become: true
  vars_files:
    - ../group_vars/production/vault.yml

  tasks:
    - name: Create protected application environment file
      ansible.builtin.template:
        src: application.env.j2
        dest: /opt/application/.env
        owner: application
        group: application
        mode: '0600'
      no_log: true

# application.env.j2
DATABASE_HOST={{ database_host }}
DATABASE_PORT={{ database_port }}
DATABASE_USER={{ database_user }}
DATABASE_PASSWORD={{ vault_database_password }}

# Use the actual project directory and correct variable-loading method.
# Protect rendered files and restrict access to the application identity.`,
      problems: [
        {
          issue: "Ansible says a Vault variable is undefined.",
          rootCause: "The encrypted file may not be loaded, the inventory group may not match, or the variable name may be incorrect.",
          solution: "Verify the inventory hierarchy, file path, vars_files configuration, and variable name. Test with a non-sensitive diagnostic that confirms variable presence without printing its value."
        },
        {
          issue: "The application cannot read its generated secret file.",
          rootCause: "The file owner, group, permissions, directory permissions, or service identity may be incorrect.",
          solution: "Set the correct application owner and group, restrict file permissions, and verify access using the application service identity."
        }
      ]
    },
    {
      heading: "7. Protecting Secrets in Tasks, Logs and Runtime Execution",
      explanation: `A secret can be encrypted in Git and still leak during execution.

This is one of the most important production security lessons.

Example of a risky task:

- name: Print password
  debug:
    var: database_password

The decrypted password may appear in output.

Another risk is constructing a shell command with a secret.

Command arguments may be visible through process inspection, audit systems, or logs.

Prefer native Ansible modules and secure interfaces.

Use no_log: true for tasks that process sensitive values.

Example:

- name: Configure database credential
  template:
    src: database.conf.j2
    dest: /etc/application/database.conf
    mode: '0600'
  no_log: true

The no_log option suppresses normal task output for the protected task.

It is not a complete security boundary.

It does not prevent every possible leak in the operating system, application, external tool, or custom callback plugin.

Sensitive files must also have correct permissions.

Avoid copying secrets to world-readable temporary directories.

Use secure directories with restricted access.

Be careful with --diff.

A configuration change may contain secret values, and diff output may expose them.

Do not enable broad debug logging during a sensitive production deployment without reviewing its implications.

Centralized log platforms should have access restrictions and retention policies.

If a secret is exposed, rotate it rather than assuming that deleting the log entry is sufficient.

Production engineers should understand the difference between protecting encrypted storage and protecting runtime secret handling.`,
      steps: [
        "Identify tasks that handle sensitive variables.",
        "Remove secret debug statements.",
        "Use no_log on sensitive operations.",
        "Prefer native modules over shell commands.",
        "Set restrictive file permissions.",
        "Protect temporary directories.",
        "Review callback plugin behavior.",
        "Review CI/CD logs.",
        "Avoid unsafe diff and debug output.",
        "Rotate credentials after confirmed exposure."
      ],
      commands: `# Run a normal controlled deployment
ansible-playbook -i inventory/production.ini site.yml --ask-vault-pass

# Avoid adding broad debug verbosity to secret-handling tasks.

# Check file permissions
ansible appservers -i inventory/production.ini -b -m ansible.builtin.stat -a "path=/opt/application/.env"

# Check application service state
ansible appservers -i inventory/production.ini -b -m ansible.builtin.service -a "name=application state=started"

# Inspect recent service logs without printing secret files
ansible appservers -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u application -n 50 --no-pager"

# Check whether sensitive files are accidentally tracked
git status --short

# Review repository changes before committing
git diff --stat`,
      config: `# Example sensitive task
- name: Write protected database configuration
  ansible.builtin.template:
    src: database.conf.j2
    dest: /etc/application/database.conf
    owner: root
    group: application
    mode: '0640'
  no_log: true

# Example application environment file
- name: Create application secret file
  ansible.builtin.copy:
    content: "{{ application_environment_content }}"
    dest: /opt/application/.env
    owner: application
    group: application
    mode: '0600'
  no_log: true

# Avoid debug statements that display:
# database_password
# api_token
# private_key
# access_key

# Review all custom logging and callback integrations.`,
      problems: [
        {
          issue: "A secret appears in Jenkins or GitHub Actions logs.",
          rootCause: "The pipeline may print environment variables, enable shell tracing, display Ansible output, or execute commands that expose secret arguments.",
          solution: "Disable unsafe command tracing, use protected credentials, suppress sensitive task output, restrict log access, and rotate exposed credentials."
        },
        {
          issue: "A secret file has permissions 0644.",
          rootCause: "The deployment task did not apply restrictive permissions or another process changed the file mode.",
          solution: "Set the required owner, group, and restrictive mode through Ansible, then validate the final file metadata."
        }
      ]
    },
    {
      heading: "8. External Secret Managers – HashiCorp Vault and AWS Secrets Manager",
      explanation: `Ansible Vault is useful for encrypted secrets stored with automation code.

Large organizations may need centralized secret-management platforms.

Examples include:

HashiCorp Vault:
Provides centralized secret storage, access policies, authentication methods, auditing, and dynamic secret capabilities.

AWS Secrets Manager:
Provides managed secret storage and supports rotation integrations for supported services.

Other enterprise systems may provide similar capabilities.

Why use an external secret manager?

Centralized control:
Secrets can be managed separately from the application repository.

Access policies:
Different teams and workloads can receive different permissions.

Rotation:
Supported credentials can be rotated according to an approved policy.

Audit:
Secret access can be logged and reviewed.

Dynamic credentials:
Some systems can issue temporary credentials rather than relying on long-lived passwords.

Ansible can integrate with external secret managers through supported lookup plugins, modules, collections, and authentication mechanisms.

The exact integration depends on the platform and installed collection version.

For HashiCorp Vault, an Ansible project may use the appropriate community.hashi_vault collection and lookup plugins.

For AWS Secrets Manager, an automation project may use supported AWS collection modules or lookup mechanisms.

Do not assume a collection is installed simply because the plugin name appears in documentation.

Pin the required collection version and install its dependencies.

External secret managers also require secure authentication.

Do not hardcode a long-lived AWS access key just to retrieve another secret.

Prefer supported workload identities, instance roles, or other short-lived authentication mechanisms.

The external secret manager must have a clear access policy for each environment.

Production credentials should not be available to development jobs.`,
      steps: [
        "Select the approved external secret manager.",
        "Create environment-specific secret paths or identifiers.",
        "Configure secure authentication.",
        "Install the required Ansible collection.",
        "Pin and test collection dependencies.",
        "Grant least-privilege secret access.",
        "Retrieve secrets only when required.",
        "Protect task output.",
        "Verify application configuration.",
        "Audit access and rotation."
      ],
      commands: `# Example collection installation
ansible-galaxy collection install community.hashi_vault

# Example AWS collection installation
ansible-galaxy collection install amazon.aws

# Review installed collections
ansible-galaxy collection list

# Inspect AWS identity in an approved environment
aws sts get-caller-identity

# Check that the required AWS region is configured
aws configure get region

# Example AWS secret metadata lookup
aws secretsmanager describe-secret --secret-id production/application/database --region ap-south-1

# Avoid printing the actual SecretString into terminal or pipeline logs.
# Use an approved identity and minimum required permissions.`,
      config: `# Example requirements.yml
collections:
  - name: community.hashi_vault
    version: "PIN_A_TESTED_VERSION"

  - name: amazon.aws
    version: "PIN_A_TESTED_VERSION"

# Example external secret reference concept
application_secret_path: "secret/data/production/application"

# Example AWS secret identifier
aws_secret_id: "production/application/database"
aws_region: "ap-south-1"

# Actual retrieval tasks depend on the selected plugin or module.
# Configure authentication outside source-controlled plaintext files.
# Replace version placeholders with tested versions before installation.`,
      problems: [
        {
          issue: "Ansible cannot retrieve a secret from HashiCorp Vault.",
          rootCause: "The Vault endpoint, authentication method, token, namespace, secret path, policy, or collection dependency may be incorrect.",
          solution: "Verify the approved authentication mechanism, endpoint, path, policy permissions, and installed collection version without printing tokens."
        },
        {
          issue: "AWS Secrets Manager returns AccessDenied.",
          rootCause: "The automation identity may not have secretsmanager:GetSecretValue permission for the requested secret or may lack required KMS permissions.",
          solution: "Check the active IAM identity, secret resource policy, KMS permissions, region, and least-privilege policy configuration."
        }
      ]
    },
    {
      heading: "9. CI/CD Secret Management and Production Credential Rotation",
      explanation: `CI/CD systems execute automation without an engineer manually entering every credential.

This creates a special secret-management requirement.

Examples include:
- Jenkins credentials.
- GitHub Actions secrets.
- GitLab protected variables.
- Ansible Automation Platform credentials.
- Cloud workload identities.

A pipeline may need:
- SSH authentication.
- Ansible Vault password.
- Cloud identity.
- External secret-manager authentication.
- Artifact repository credentials.

These values must not be stored directly in pipeline YAML.

Instead, use the CI/CD platform's protected credential mechanism.

Restrict production credentials to trusted branches and protected environments.

A pull request from an untrusted contributor should not automatically receive production access.

Credential rotation is another important responsibility.

A password should not remain valid forever.

Rotation may be required because:
- Company policy requires periodic changes.
- An employee leaves the organization.
- A credential is exposed.
- A service identity is replaced.
- A security incident occurs.
- A third-party integration changes.

A safe rotation process should avoid breaking the application.

Typical process:

1. Create a new credential.
2. Add it to the approved secret manager.
3. Update the application or automation configuration.
4. Deploy the new credential.
5. Validate application connectivity.
6. Revoke the old credential.
7. Audit the change.

Some systems support overlapping old and new credentials during rotation.

That can reduce downtime.

The correct procedure depends on the database, API, or service.

Do not revoke an old credential before confirming that the application successfully uses the new credential.

For Ansible Vault, rekey changes the encryption password for the Vault-encrypted file.

It does not automatically rotate the database password stored inside the file.

This distinction is important.

Encryption-key rotation and application-credential rotation are separate operations.`,
      steps: [
        "Identify credentials required by the pipeline.",
        "Store them in protected CI/CD credentials.",
        "Restrict access to trusted deployment workflows.",
        "Separate production and non-production credentials.",
        "Create a rotation schedule.",
        "Generate a new application credential.",
        "Update the approved secret source.",
        "Deploy and validate the new credential.",
        "Revoke the old credential.",
        "Record and audit the rotation."
      ],
      commands: `# Re-encrypt a Vault file using a new Vault password
ansible-vault rekey production-vault.yml

# Use an interactive Vault password
ansible-playbook -i inventory/production.ini site.yml --ask-vault-pass

# Use a protected password source in CI/CD
ansible-playbook -i inventory/production.ini site.yml --vault-password-file /secure/credentials/vault-password

# Check the current Git branch
git branch --show-current

# Review changed files before committing
git status --short

# Inspect recent commits
git log --oneline -10

# Validate a pipeline deployment in staging before production.`,
      config: `# Generic CI/CD workflow concept
steps:
  - name: Checkout trusted automation repository
    run: git checkout main

  - name: Install tested Ansible dependencies
    run: ansible-galaxy collection install -r requirements.yml

  - name: Execute staging deployment
    run: ansible-playbook -i inventory/staging.ini site.yml

  - name: Production deployment
    run: ansible-playbook -i inventory/production.ini site.yml

# Production Vault password should be injected by the CI platform.
# Do not define:
# VAULT_PASSWORD: plaintext-value
#
# Protect the production environment.
# Require approved deployment authorization.
# Do not expose credentials to untrusted pull-request workflows.`,
      problems: [
        {
          issue: "A CI/CD pipeline cannot decrypt the production Vault file.",
          rootCause: "The production credential may not be attached to the job, the password source may be incorrect, or the Vault ID may not match.",
          solution: "Verify protected environment configuration, credential permissions, Vault ID labels, and password-file availability."
        },
        {
          issue: "Credential rotation causes application downtime.",
          rootCause: "The old credential may have been revoked before every application instance switched to the new credential.",
          solution: "Use an overlap period where supported, deploy the new credential in a controlled sequence, validate every instance, and revoke the old credential only after successful verification."
        }
      ]
    },
    {
      heading: "10. Production Secret Access, Auditing and Compliance",
      explanation: `Production secrets should have controlled ownership.

A company should know:

- Who created a secret.
- Which application uses it.
- Which team owns it.
- Where it is stored.
- Which systems can access it.
- When it was last rotated.
- When it expires.
- Whether it has been revoked.

Secret access should follow least privilege.

For example:

A web application should not automatically receive access to database administration credentials.

A monitoring agent should not receive access to deployment signing keys.

A development pipeline should not receive production database credentials.

Separate identities by application, environment, and operational responsibility.

Auditing is important for incident investigation.

If an API token is exposed, audit logs can help determine which identity accessed it and when.

The exact audit capabilities depend on the selected secret manager.

Ansible Vault by itself does not provide a centralized secret-access audit service comparable to a dedicated secret-management platform.

Repository access, CI/CD execution logs, operating system audit logs, and external secret-manager audit logs may all be needed.

Compliance programs may require:
- Access reviews.
- Secret rotation.
- Encryption at rest.
- Encryption in transit.
- Retention policies.
- Approval workflows.
- Incident reporting.
- Evidence collection.

Do not assume that encrypting a file automatically makes the complete deployment compliant.

Review the whole system.

A production secret should have an owner and a documented recovery or revocation procedure.

Unused secrets should be removed according to the organization's retention and security policy.`,
      steps: [
        "Assign an owner to every production secret.",
        "Document the application and environment using it.",
        "Restrict secret access by identity and role.",
        "Enable available audit logging.",
        "Review access records regularly.",
        "Rotate credentials according to policy.",
        "Revoke unused and compromised credentials.",
        "Maintain an incident response process.",
        "Retain required compliance evidence.",
        "Perform periodic access reviews."
      ],
      commands: `# Inspect Git history for unexpected secret-related changes
git log --all --oneline -- secrets/

# Inspect current repository status
git status --short

# Check Ansible execution configuration
ansible-config dump --only-changed

# Review installed collection dependencies
ansible-galaxy collection list

# Verify AWS identity in an approved environment
aws sts get-caller-identity

# Inspect AWS secret metadata
aws secretsmanager describe-secret --secret-id production/application/database

# Review external secret-manager audit records through its approved platform.

# Never print secret values while collecting audit evidence.`,
      config: `# Example secret ownership record
secret_name: production/application/database
owner_team: application-platform
environment: production
purpose: application database authentication
storage: approved-secret-manager
rotation_policy: company-approved
access_scope:
  - application-production-identity
  - approved-deployment-identity
audit_required: true

# This is metadata, not the secret itself.
# Do not store the credential value in this record.
# Maintain the record in an approved documentation or governance system.`,
      problems: [
        {
          issue: "The company cannot determine who accessed a production secret.",
          rootCause: "Secret access auditing may not be enabled, or credentials may be shared among multiple users and jobs.",
          solution: "Use individual identities, enable supported audit logs, restrict access, and correlate secret-manager events with CI/CD execution records."
        },
        {
          issue: "An application still uses an old credential after rotation.",
          rootCause: "The application may have cached the old value, a deployment may not have reached every instance, or an unmanaged configuration file may remain.",
          solution: "Identify every consumer, update the approved secret source, reload or restart applications as required, validate all instances, and revoke the old credential only after confirming migration."
        }
      ]
    },
    {
      heading: "11. Troubleshooting Vault, Secret Retrieval and Authentication Failures",
      explanation: `Production secret-management failures can prevent deployments and application startup.

The first step is to classify the failure.

Vault password failure:
Ansible cannot decrypt an encrypted file.

Variable loading failure:
The encrypted file is valid, but the variable is not available to the playbook.

External secret-manager authentication failure:
The automation identity cannot authenticate to the secret platform.

Authorization failure:
Authentication succeeds, but the identity lacks permission to retrieve the requested secret.

Runtime configuration failure:
The secret is retrieved, but the application cannot use it.

Permission failure:
The application cannot read the generated configuration file.

Credential rotation failure:
Some application instances still use an old credential.

A systematic diagnosis avoids unnecessary changes.

Start with the exact failed task.

Do not print the secret to debug it.

Check the source path, Vault ID, authentication identity, environment, and permission policy.

For external services, verify endpoint, region, namespace, and network connectivity.

For AWS, verify the active identity and required IAM permissions.

For HashiCorp Vault, verify the approved authentication method and secret path.

For generated files, check file metadata and service identity.

For application failures, inspect logs without exposing secret-bearing configuration.

If the secret is confirmed compromised, prioritize rotation and containment rather than spending time trying to hide the exposed value.

Document the failure and permanent fix.`,
      steps: [
        "Identify the failed task and environment.",
        "Determine whether the issue is encryption, authentication, authorization, or runtime use.",
        "Verify the Vault ID and credential source.",
        "Check the secret file path and inventory scope.",
        "Verify external secret-manager connectivity.",
        "Check IAM or Vault policy permissions.",
        "Inspect generated file permissions.",
        "Validate application connectivity.",
        "Rotate credentials if exposure is suspected.",
        "Record the root cause and corrective action."
      ],
      commands: `# Inspect Vault metadata without displaying plaintext secrets
head -n 1 group_vars/production/vault.yml

# Verify an encrypted file using the authorized credential
ansible-vault view group_vars/production/vault.yml

# Check inventory structure
ansible-inventory -i inventory/production.ini --graph

# Validate playbook syntax
ansible-playbook -i inventory/production.ini site.yml --syntax-check

# Check managed-node connectivity
ansible appservers -i inventory/production.ini -m ansible.builtin.ping

# Verify AWS caller identity
aws sts get-caller-identity

# Check secret metadata without requesting the secret value
aws secretsmanager describe-secret --secret-id production/application/database

# Inspect application service logs
ansible appservers -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u application -n 100 --no-pager"`,
      config: `# Example diagnostic playbook
---
- name: Diagnose application secret configuration
  hosts: appservers
  become: true

  tasks:
    - name: Check protected environment file metadata
      ansible.builtin.stat:
        path: /opt/application/.env
      register: environment_file
      changed_when: false

    - name: Verify file existence and permissions
      ansible.builtin.assert:
        that:
          - environment_file.stat.exists
          - environment_file.stat.mode == '0600'
        fail_msg: "Application environment file is missing or has incorrect permissions"

    - name: Check application service
      ansible.builtin.service:
        name: application
        state: started

# Do not read and print the contents of the secret file.
# Adapt expected permissions and service identity to the real environment.`,
      problems: [
        {
          issue: "Ansible reports Decryption failed or incorrect password.",
          rootCause: "The supplied Vault password is wrong, the file is damaged, or the required Vault ID was not provided.",
          solution: "Confirm the correct authorized credential, inspect the Vault header, verify the Vault ID, and restore a valid encrypted file if corruption is confirmed."
        },
        {
          issue: "AWS Secrets Manager returns ResourceNotFoundException.",
          rootCause: "The secret identifier, account, region, or environment may be incorrect, or the secret may have been deleted.",
          solution: "Verify the active AWS account, region, exact secret identifier, and secret lifecycle state."
        },
        {
          issue: "Application authentication fails after a successful secret retrieval.",
          rootCause: "The secret may be outdated, the application may use the wrong username, or the destination service may not accept the credential.",
          solution: "Validate the application identity and destination service configuration, perform an approved credential rotation, and confirm successful authentication without logging the secret."
        }
      ]
    },
    {
      heading: "12. Senior DevOps Engineer Checklist, Best Practices and Interview Questions",
      explanation: `A senior DevOps engineer must understand that secret management is a complete security process.

Ansible Vault is one component of that process.

Important production practices:

1. Never store plaintext production secrets in Git.
2. Encrypt repository-managed secrets.
3. Use separate credentials for environments.
4. Restrict Vault password access.
5. Prefer managed identities where supported.
6. Use external secret managers where required.
7. Avoid printing secrets in task output.
8. Protect generated configuration files.
9. Use least-privilege permissions.
10. Rotate credentials safely.
11. Audit access.
12. Revoke compromised credentials quickly.
13. Protect CI/CD environments.
14. Pin secret-management dependencies.
15. Test recovery procedures.
16. Review repository history for accidental exposure.
17. Use dedicated identities for automation.
18. Document secret ownership and expiration.

Interview questions:

Q: What is Ansible Vault?

A: Ansible Vault is a feature used to encrypt sensitive Ansible data such as passwords, tokens, and variable files.

Q: What is the difference between ansible-vault encrypt and encrypt_string?

A: encrypt protects an entire file, while encrypt_string encrypts an individual value for use in a YAML variable.

Q: How do you create a Vault file?

A: Use ansible-vault create filename.yml.

Q: How do you edit an encrypted file?

A: Use ansible-vault edit filename.yml.

Q: How do you view encrypted content?

A: Use ansible-vault view filename.yml with the correct Vault credential.

Q: What is a Vault ID?

A: A label used to identify which Vault credential should be used for encrypted content.

Q: What is no_log?

A: A task option that suppresses normal task output to help prevent sensitive information from appearing in logs.

Q: Does no_log encrypt a secret?

A: No. It suppresses task output. Encryption and access control must be handled separately.

Q: Does Vault encryption automatically rotate a database password?

A: No. Rekey changes the encryption password for Vault content. Application credential rotation is a separate operation.

Q: What is the difference between Ansible Vault and HashiCorp Vault?

A: Ansible Vault encrypts Ansible data. HashiCorp Vault is an external secret-management platform that supports centralized secret storage, policies, and other secret lifecycle capabilities.

Q: How do you prevent production secrets from reaching development pipelines?

A: Use separate environment credentials, protected CI/CD environments, least-privilege identities, and restricted secret-manager policies.

Q: What do you do if a production secret is exposed?

A: Contain the exposure, rotate or revoke the credential, investigate access logs, assess impact, and implement preventive controls.

Final verification checklist:

- Vault files are encrypted.
- Vault passwords are not committed.
- Environment credentials are separated.
- CI/CD credentials are protected.
- Production access is restricted.
- Sensitive tasks use appropriate no_log settings.
- Generated files have correct permissions.
- External secret-manager policies are least-privilege.
- Rotation procedures are documented.
- Audit logging is available.
- Compromised credentials can be revoked.
- Recovery procedures are tested.

The main objective is to ensure that infrastructure automation can use sensitive values without exposing them to unauthorized users or systems.`,
      steps: [
        "Review all secret sources.",
        "Check encrypted repository files.",
        "Verify environment separation.",
        "Review CI/CD credential permissions.",
        "Check task logging and no_log usage.",
        "Verify generated file permissions.",
        "Review external secret-manager policies.",
        "Validate credential rotation.",
        "Inspect audit evidence.",
        "Test recovery and revocation procedures.",
        "Document ownership and operational responsibilities."
      ],
      commands: `# Check Ansible version
ansible --version

# Validate inventory
ansible-inventory -i inventory/production.ini --graph

# Check managed-node connectivity
ansible all -i inventory/production.ini -m ansible.builtin.ping

# Validate playbook syntax
ansible-playbook -i inventory/production.ini site.yml --syntax-check

# Inspect encrypted file
ansible-vault view group_vars/production/vault.yml

# Run using an approved Vault credential
ansible-playbook -i inventory/production.ini site.yml --ask-vault-pass

# Review repository status
git status --short

# Check AWS identity if AWS is used
aws sts get-caller-identity

# Final verification must confirm that secrets are not printed in execution logs.`,
      config: `# Recommended repository structure
ansible-project/
  ansible.cfg
  requirements.yml
  inventory/
    development.ini
    staging.ini
    production.ini
  group_vars/
    development/
      main.yml
      vault.yml
    staging/
      main.yml
      vault.yml
    production/
      main.yml
      vault.yml
  host_vars/
  playbooks/
    site.yml
    deploy.yml
    secret-validation.yml
  roles/
    application/
    database/
    security/
  templates/
    application.env.j2
  tests/
  README.md

# Final security principles:
# Encrypted secrets in source control.
# Vault passwords outside source control.
# Separate credentials for each environment.
# Least-privilege automation identities.
# no_log for sensitive operations.
# Strict permissions for generated files.
# Controlled CI/CD credential access.
# Regular credential rotation.
# Centralized audit where available.
# Tested revocation and recovery procedures.`,
      problems: [
        {
          issue: "Secret-management practices differ across teams and environments.",
          rootCause: "There is no common security standard, ownership model, credential lifecycle policy, or approved automation pattern.",
          solution: "Create a shared secrets-management standard, reusable Ansible roles, approved credential integrations, access reviews, and mandatory production deployment checks."
        },
        {
          issue: "The team cannot recover after losing a Vault password.",
          rootCause: "The Vault credential was not managed through an approved recovery process or no authorized recovery copy exists.",
          solution: "Use an approved enterprise credential escrow or recovery process, maintain access ownership, and test recovery procedures without exposing the password."
        }
      ]
    }
  ]
};

export default noteData;
