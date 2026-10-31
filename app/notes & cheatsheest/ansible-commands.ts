import type { DevOpsTool } from "./command-types";

export const ansibleTool: DevOpsTool = {
  name: "Ansible",
  category: "Configuration Management",
  commands: [

    // ==================== BASIC - 50 ====================

    {
      command: "ansible --version",
      level: "Basic",
      english: "Displays the installed Ansible version and configuration paths.",
      telugu: "Install అయిన Ansible version మరియు configuration paths చూపిస్తుంది."
    },
    {
      command: "ansible --help",
      level: "Basic",
      english: "Displays help for the Ansible ad-hoc command.",
      telugu: "Ansible ad-hoc command కి సంబంధించిన help చూపిస్తుంది."
    },
    {
      command: "ansible-playbook --version",
      level: "Basic",
      english: "Displays the Ansible Playbook version.",
      telugu: "Ansible Playbook version చూపిస్తుంది."
    },
    {
      command: "ansible-playbook --help",
      level: "Basic",
      english: "Displays available Ansible Playbook options.",
      telugu: "Ansible Playbook options చూపిస్తుంది."
    },
    {
      command: "ansible-config --version",
      level: "Basic",
      english: "Displays the Ansible configuration utility version.",
      telugu: "Ansible configuration utility version చూపిస్తుంది."
    },
    {
      command: "ansible-doc --help",
      level: "Basic",
      english: "Displays help for the Ansible documentation utility.",
      telugu: "Ansible documentation utility help చూపిస్తుంది."
    },
    {
      command: "ansible localhost -m ping",
      level: "Basic",
      english: "Tests Ansible connectivity with the local machine.",
      telugu: "Local machine తో Ansible connectivity test చేస్తుంది."
    },
    {
      command: "ansible all -m ping",
      level: "Basic",
      english: "Checks connectivity with all inventory hosts.",
      telugu: "Inventory లోని అన్ని hosts connectivity check చేస్తుంది."
    },
    {
      command: "ansible webservers -m ping",
      level: "Basic",
      english: "Tests connectivity with hosts in the webservers group.",
      telugu: "Webservers group లోని hosts connectivity test చేస్తుంది."
    },
    {
      command: "ansible all --list-hosts",
      level: "Basic",
      english: "Lists all hosts in the inventory.",
      telugu: "Inventory లోని అన్ని hosts list చేస్తుంది."
    },
    {
      command: "ansible webservers --list-hosts",
      level: "Basic",
      english: "Lists hosts belonging to the webservers group.",
      telugu: "Webservers group లోని hosts చూపిస్తుంది."
    },
    {
      command: "ansible-inventory --list",
      level: "Basic",
      english: "Displays the inventory in JSON format.",
      telugu: "Inventory ని JSON format లో చూపిస్తుంది."
    },
    {
      command: "ansible-inventory --graph",
      level: "Basic",
      english: "Displays inventory groups and hosts as a graph.",
      telugu: "Inventory groups మరియు hosts ని graph రూపంలో చూపిస్తుంది."
    },
    {
      command: "ansible-inventory --list -i inventory.ini",
      level: "Basic",
      english: "Displays hosts from a specified inventory file.",
      telugu: "Specified inventory file లోని hosts చూపిస్తుంది."
    },
    {
      command: "ansible all -i inventory.ini -m ping",
      level: "Basic",
      english: "Tests all hosts using a specified inventory file.",
      telugu: "Specified inventory file ఉపయోగించి అన్ని hosts ని test చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"hostname\"",
      level: "Basic",
      english: "Runs the hostname command on all managed hosts.",
      telugu: "అన్ని managed hosts పై hostname command run చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"uptime\"",
      level: "Basic",
      english: "Displays uptime information from all managed hosts.",
      telugu: "అన్ని managed hosts uptime information చూపిస్తుంది."
    },
    {
      command: "ansible all -m shell -a \"whoami\"",
      level: "Basic",
      english: "Displays the current user on managed hosts.",
      telugu: "Managed hosts లో current user ఎవరో చూపిస్తుంది."
    },
    {
      command: "ansible all -m setup",
      level: "Basic",
      english: "Collects system facts from managed hosts.",
      telugu: "Managed hosts నుంచి system facts collect చేస్తుంది."
    },
    {
      command: "ansible all -m setup -a \"filter=ansible_os_family\"",
      level: "Basic",
      english: "Collects operating system family information.",
      telugu: "Operating system family information collect చేస్తుంది."
    },
    {
      command: "ansible all -m setup -a \"filter=ansible_hostname\"",
      level: "Basic",
      english: "Collects hostname facts from managed hosts.",
      telugu: "Managed hosts hostname facts collect చేస్తుంది."
    },
    {
      command: "ansible all -m setup -a \"filter=ansible_distribution\"",
      level: "Basic",
      english: "Collects Linux distribution information.",
      telugu: "Linux distribution information collect చేస్తుంది."
    },
    {
      command: "ansible all -m setup -a \"filter=ansible_default_ipv4\"",
      level: "Basic",
      english: "Displays default IPv4 network facts.",
      telugu: "Default IPv4 network facts చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"date\"",
      level: "Basic",
      english: "Displays the current date on managed hosts.",
      telugu: "Managed hosts లో current date చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"free -h\"",
      level: "Basic",
      english: "Displays memory usage on managed hosts.",
      telugu: "Managed hosts లో memory usage చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"df -h\"",
      level: "Basic",
      english: "Displays filesystem disk usage.",
      telugu: "Managed hosts లో disk usage చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"ls /tmp\"",
      level: "Basic",
      english: "Lists files in the temporary directory.",
      telugu: "Managed hosts లో temporary directory files చూపిస్తుంది."
    },
    {
      command: "ansible all -m file -a \"path=/tmp/demo state=directory\"",
      level: "Basic",
      english: "Creates a directory on managed hosts.",
      telugu: "Managed hosts లో directory create చేస్తుంది."
    },
    {
      command: "ansible all -m file -a \"path=/tmp/demo state=absent\"",
      level: "Basic",
      english: "Removes a specified file or directory.",
      telugu: "Specified file లేదా directory remove చేస్తుంది."
    },
    {
      command: "ansible all -m file -a \"path=/tmp/demo state=touch\"",
      level: "Basic",
      english: "Creates an empty file or updates its timestamp.",
      telugu: "Empty file create చేస్తుంది లేదా timestamp update చేస్తుంది."
    },
    {
      command: "ansible all -m copy -a \"src=app.conf dest=/tmp/app.conf\"",
      level: "Basic",
      english: "Copies a file from the control node to managed hosts.",
      telugu: "Control node నుంచి managed hosts కి file copy చేస్తుంది."
    },
    {
      command: "ansible all -m fetch -a \"src=/etc/hostname dest=./backups/\"",
      level: "Basic",
      english: "Copies a file from managed hosts to the control node.",
      telugu: "Managed hosts నుంచి control node కి file తీసుకొస్తుంది."
    },
    {
      command: "ansible all -m file -a \"path=/tmp/app.conf mode=0644\"",
      level: "Basic",
      english: "Sets file permissions on managed hosts.",
      telugu: "Managed hosts లో file permissions set చేస్తుంది."
    },
    {
      command: "ansible all -m file -a \"path=/tmp/app.conf owner=ubuntu\"",
      level: "Basic",
      english: "Changes the owner of a file.",
      telugu: "File owner ని మార్చుతుంది."
    },
    {
      command: "ansible all -m file -a \"path=/tmp/app.conf group=ubuntu\"",
      level: "Basic",
      english: "Changes the group ownership of a file.",
      telugu: "File group ownership మార్చుతుంది."
    },
    {
      command: "ansible all -m user -a \"name=devops state=present\"",
      level: "Basic",
      english: "Creates a user on managed hosts.",
      telugu: "Managed hosts లో user create చేస్తుంది."
    },
    {
      command: "ansible all -m user -a \"name=devops state=absent\"",
      level: "Basic",
      english: "Removes a user from managed hosts.",
      telugu: "Managed hosts నుంచి user remove చేస్తుంది."
    },
    {
      command: "ansible all -m group -a \"name=developers state=present\"",
      level: "Basic",
      english: "Creates a group on managed hosts.",
      telugu: "Managed hosts లో group create చేస్తుంది."
    },
    {
      command: "ansible all -m service -a \"name=nginx state=started\"",
      level: "Basic",
      english: "Starts the Nginx service.",
      telugu: "Nginx service start చేస్తుంది."
    },
    {
      command: "ansible all -m service -a \"name=nginx state=stopped\"",
      level: "Basic",
      english: "Stops the Nginx service.",
      telugu: "Nginx service stop చేస్తుంది."
    },
    {
      command: "ansible all -m service -a \"name=nginx state=restarted\"",
      level: "Basic",
      english: "Restarts the Nginx service.",
      telugu: "Nginx service restart చేస్తుంది."
    },
    {
      command: "ansible all -m service -a \"name=nginx state=reloaded\"",
      level: "Basic",
      english: "Reloads the Nginx service.",
      telugu: "Nginx service reload చేస్తుంది."
    },
    {
      command: "ansible all -m apt -a \"name=nginx state=present\" --become",
      level: "Basic",
      english: "Installs Nginx on Debian-based hosts.",
      telugu: "Debian-based hosts లో Nginx install చేస్తుంది."
    },
    {
      command: "ansible all -m apt -a \"name=nginx state=absent\" --become",
      level: "Basic",
      english: "Removes Nginx from Debian-based hosts.",
      telugu: "Debian-based hosts నుంచి Nginx remove చేస్తుంది."
    },
    {
      command: "ansible all -m yum -a \"name=httpd state=present\" --become",
      level: "Basic",
      english: "Installs Apache on RHEL-based hosts.",
      telugu: "RHEL-based hosts లో Apache install చేస్తుంది."
    },
    {
      command: "ansible all -m dnf -a \"name=git state=present\" --become",
      level: "Basic",
      english: "Installs Git using the DNF package manager.",
      telugu: "DNF package manager ఉపయోగించి Git install చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"git --version\"",
      level: "Basic",
      english: "Checks the Git version on managed hosts.",
      telugu: "Managed hosts లో Git version check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"docker --version\"",
      level: "Basic",
      english: "Checks the Docker version on managed hosts.",
      telugu: "Managed hosts లో Docker version check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"systemctl status nginx\"",
      level: "Basic",
      english: "Checks the Nginx service status.",
      telugu: "Nginx service status check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"cat /etc/os-release\"",
      level: "Basic",
      english: "Displays operating system release information.",
      telugu: "Operating system release information చూపిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml",
      level: "Basic",
      english: "Executes an Ansible playbook.",
      telugu: "Ansible playbook execute చేస్తుంది."
    },

    // ==================== INTERMEDIATE - 60 ====================

    {
      command: "ansible-playbook -i inventory.ini site.yml",
      level: "Intermediate",
      english: "Runs a playbook using a specific inventory file.",
      telugu: "Specific inventory file ఉపయోగించి playbook run చేస్తుంది."
    },
    {
      command: "ansible-playbook -i inventory.ini site.yml --syntax-check",
      level: "Intermediate",
      english: "Checks playbook syntax without executing tasks.",
      telugu: "Tasks execute చేయకుండా playbook syntax check చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --list-hosts",
      level: "Intermediate",
      english: "Lists hosts targeted by a playbook.",
      telugu: "Playbook target చేసే hosts చూపిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --list-tasks",
      level: "Intermediate",
      english: "Lists tasks in a playbook.",
      telugu: "Playbook లోని tasks అన్నింటినీ చూపిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --list-tags",
      level: "Intermediate",
      english: "Lists tags defined in a playbook.",
      telugu: "Playbook లో define చేసిన tags చూపిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --check",
      level: "Intermediate",
      english: "Runs a playbook in check mode to preview changes.",
      telugu: "Changes preview చేయడానికి check mode లో playbook run చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --diff",
      level: "Intermediate",
      english: "Displays file differences made by playbook tasks.",
      telugu: "Playbook tasks చేసే file differences చూపిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml -v",
      level: "Intermediate",
      english: "Runs a playbook with verbose output.",
      telugu: "Verbose output తో playbook run చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml -vv",
      level: "Intermediate",
      english: "Runs a playbook with increased verbosity.",
      telugu: "మరింత detailed output తో playbook run చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml -vvv",
      level: "Intermediate",
      english: "Displays detailed debugging information during execution.",
      telugu: "Execution సమయంలో detailed debugging information చూపిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml -vvvv",
      level: "Intermediate",
      english: "Enables maximum verbosity for connection debugging.",
      telugu: "Connection debugging కోసం maximum verbosity enable చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --limit webservers",
      level: "Intermediate",
      english: "Restricts playbook execution to a specific host group.",
      telugu: "Specific host group కి మాత్రమే playbook execution పరిమితం చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --limit server1",
      level: "Intermediate",
      english: "Runs a playbook on one selected host.",
      telugu: "ఎంచుకున్న ఒక host పై playbook run చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --tags install",
      level: "Intermediate",
      english: "Executes tasks marked with the install tag.",
      telugu: "Install tag ఉన్న tasks మాత్రమే execute చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --skip-tags configure",
      level: "Intermediate",
      english: "Skips tasks marked with the configure tag.",
      telugu: "Configure tag ఉన్న tasks ని skip చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --start-at-task=\"Install Nginx\"",
      level: "Intermediate",
      english: "Starts execution from a named task.",
      telugu: "పేరు ఇచ్చిన task నుంచి execution ప్రారంభిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --step",
      level: "Intermediate",
      english: "Prompts before executing each task.",
      telugu: "ప్రతి task execute చేసే ముందు confirmation అడుగుతుంది."
    },
    {
      command: "ansible-playbook site.yml --flush-cache",
      level: "Intermediate",
      english: "Clears cached facts before running the playbook.",
      telugu: "Playbook run చేసే ముందు cached facts clear చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --force-handlers",
      level: "Intermediate",
      english: "Runs notified handlers even when a task fails.",
      telugu: "ఒక task fail అయినా notified handlers run అయ్యేలా చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --forks 20",
      level: "Intermediate",
      english: "Sets the number of parallel host processes.",
      telugu: "Parallel గా manage చేసే hosts సంఖ్య set చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml -e \"env=dev\"",
      level: "Intermediate",
      english: "Passes an extra variable to a playbook.",
      telugu: "Playbook కి extra variable pass చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml -e @vars.yml",
      level: "Intermediate",
      english: "Loads extra variables from a YAML file.",
      telugu: "YAML file నుంచి extra variables load చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --vault-password-file .vault_pass",
      level: "Intermediate",
      english: "Uses a password file to decrypt Ansible Vault data.",
      telugu: "Ansible Vault data decrypt చేయడానికి password file ఉపయోగిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --ask-vault-pass",
      level: "Intermediate",
      english: "Prompts for the Ansible Vault password.",
      telugu: "Ansible Vault password అడుగుతుంది."
    },
    {
      command: "ansible all -m command -a \"uptime\" -b",
      level: "Intermediate",
      english: "Runs a command with privilege escalation.",
      telugu: "Privilege escalation తో command run చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"whoami\" -b -K",
      level: "Intermediate",
      english: "Prompts for the become password before privileged execution.",
      telugu: "Privileged execution ముందు become password అడుగుతుంది."
    },
    {
      command: "ansible all -m ping -u ubuntu",
      level: "Intermediate",
      english: "Connects to managed hosts using the ubuntu user.",
      telugu: "Ubuntu user ఉపయోగించి managed hosts కి connect అవుతుంది."
    },
    {
      command: "ansible all -m ping -u ec2-user",
      level: "Intermediate",
      english: "Tests connectivity using the ec2-user account.",
      telugu: "EC2 user account తో connectivity test చేస్తుంది."
    },
    {
      command: "ansible all -m ping --private-key ~/.ssh/id_rsa",
      level: "Intermediate",
      english: "Uses a specified SSH private key for authentication.",
      telugu: "Authentication కోసం specified SSH private key ఉపయోగిస్తుంది."
    },
    {
      command: "ansible all -m ping -e \"ansible_port=2222\"",
      level: "Intermediate",
      english: "Connects using a custom SSH port variable.",
      telugu: "Custom SSH port variable ఉపయోగించి connect అవుతుంది."
    },
    {
      command: "ansible all -m command -a \"id\" --become",
      level: "Intermediate",
      english: "Displays the privileged execution identity.",
      telugu: "Privilege escalation తర్వాత execution identity చూపిస్తుంది."
    },
    {
      command: "ansible all -m shell -a \"echo $HOME\"",
      level: "Intermediate",
      english: "Displays the home directory through a shell command.",
      telugu: "Shell command ద్వారా home directory చూపిస్తుంది."
    },
    {
      command: "ansible all -m lineinfile -a \"path=/tmp/app.conf line='enabled=true' state=present\"",
      level: "Intermediate",
      english: "Ensures a specific line exists in a file.",
      telugu: "File లో specified line ఉందని ensure చేస్తుంది."
    },
    {
      command: "ansible all -m replace -a \"path=/tmp/app.conf regexp='old' replace='new'\"",
      level: "Intermediate",
      english: "Replaces matching text in a file.",
      telugu: "File లో matching text ని replace చేస్తుంది."
    },
    {
      command: "ansible all -m blockinfile -a \"path=/tmp/app.conf block='server=true'\"",
      level: "Intermediate",
      english: "Adds or updates a managed block in a file.",
      telugu: "File లో managed block add లేదా update చేస్తుంది."
    },
    {
      command: "ansible all -m stat -a \"path=/etc/hosts\"",
      level: "Intermediate",
      english: "Retrieves file information and metadata.",
      telugu: "File information మరియు metadata retrieve చేస్తుంది."
    },
    {
      command: "ansible all -m uri -a \"url=https://example.com return_content=no\"",
      level: "Intermediate",
      english: "Checks an HTTP endpoint using the URI module.",
      telugu: "URI module ద్వారా HTTP endpoint check చేస్తుంది."
    },
    {
      command: "ansible all -m get_url -a \"url=https://example.com/file.tar.gz dest=/tmp/file.tar.gz\"",
      level: "Intermediate",
      english: "Downloads a file from a URL to managed hosts.",
      telugu: "URL నుంచి managed hosts కి file download చేస్తుంది."
    },
    {
      command: "ansible all -m archive -a \"path=/var/log dest=/tmp/logs.tar.gz format=gz\"",
      level: "Intermediate",
      english: "Creates an archive from a directory.",
      telugu: "Directory నుంచి archive create చేస్తుంది."
    },
    {
      command: "ansible all -m unarchive -a \"src=/tmp/app.tar.gz dest=/opt/app remote_src=yes\"",
      level: "Intermediate",
      english: "Extracts an archive on managed hosts.",
      telugu: "Managed hosts లో archive extract చేస్తుంది."
    },
    {
      command: "ansible all -m cron -a \"name='backup' minute=0 hour=2 job='/opt/backup.sh'\"",
      level: "Intermediate",
      english: "Creates a scheduled cron job.",
      telugu: "Scheduled cron job create చేస్తుంది."
    },
    {
      command: "ansible all -m mount -a \"path=/mnt/data src=/dev/sdb1 fstype=ext4 state=mounted\"",
      level: "Intermediate",
      english: "Mounts a filesystem on managed hosts.",
      telugu: "Managed hosts లో filesystem mount చేస్తుంది."
    },
    {
      command: "ansible all -m sysctl -a \"name=net.ipv4.ip_forward value=1 state=present\"",
      level: "Intermediate",
      english: "Configures a Linux kernel sysctl parameter.",
      telugu: "Linux kernel sysctl parameter configure చేస్తుంది."
    },
    {
      command: "ansible all -m authorized_key -a \"user=ubuntu key='ssh-rsa AAAA...' state=present\"",
      level: "Intermediate",
      english: "Adds an SSH public key to a user's authorized keys.",
      telugu: "User authorized_keys లో SSH public key add చేస్తుంది."
    },
    {
      command: "ansible all -m known_hosts -a \"name=github.com key='github.com ssh-ed25519 AAAA...' state=present\"",
      level: "Intermediate",
      english: "Manages SSH known-host entries.",
      telugu: "SSH known-host entries manage చేస్తుంది."
    },
    {
      command: "ansible-galaxy collection list",
      level: "Intermediate",
      english: "Lists installed Ansible collections.",
      telugu: "Install అయిన Ansible collections చూపిస్తుంది."
    },
    {
      command: "ansible-galaxy role list",
      level: "Intermediate",
      english: "Lists installed Ansible roles.",
      telugu: "Install అయిన Ansible roles చూపిస్తుంది."
    },
    {
      command: "ansible-galaxy role install geerlingguy.nginx",
      level: "Intermediate",
      english: "Installs an Ansible role from Galaxy.",
      telugu: "Ansible Galaxy నుంచి role install చేస్తుంది."
    },
    {
      command: "ansible-galaxy collection install community.general",
      level: "Intermediate",
      english: "Installs a collection from Ansible Galaxy.",
      telugu: "Ansible Galaxy నుంచి collection install చేస్తుంది."
    },
    {
      command: "ansible-galaxy collection download community.general",
      level: "Intermediate",
      english: "Downloads a collection without installing it.",
      telugu: "Collection ని install చేయకుండా download చేస్తుంది."
    },
    {
      command: "ansible-doc -l",
      level: "Intermediate",
      english: "Lists available Ansible module documentation.",
      telugu: "Available Ansible modules documentation list చేస్తుంది."
    },
    {
      command: "ansible-doc ansible.builtin.copy",
      level: "Intermediate",
      english: "Displays documentation for the copy module.",
      telugu: "Copy module documentation చూపిస్తుంది."
    },
    {
      command: "ansible-doc -s ansible.builtin.service",
      level: "Intermediate",
      english: "Displays a short example of service module usage.",
      telugu: "Service module usage కి short example చూపిస్తుంది."
    },
    {
      command: "ansible-config list",
      level: "Intermediate",
      english: "Lists available Ansible configuration settings.",
      telugu: "Available Ansible configuration settings చూపిస్తుంది."
    },
    {
      command: "ansible-config dump",
      level: "Intermediate",
      english: "Displays the active Ansible configuration.",
      telugu: "Active Ansible configuration చూపిస్తుంది."
    },
    {
      command: "ansible-config view",
      level: "Intermediate",
      english: "Displays the current Ansible configuration file.",
      telugu: "Current Ansible configuration file చూపిస్తుంది."
    },
    {
      command: "ansible-console all",
      level: "Intermediate",
      english: "Opens an interactive Ansible console for all hosts.",
      telugu: "అన్ని hosts కోసం interactive Ansible console open చేస్తుంది."
    },
    {
      command: "ansible-pull -U https://github.com/user/repo.git site.yml",
      level: "Intermediate",
      english: "Pulls a playbook repository and executes it locally.",
      telugu: "Playbook repository pull చేసి local machine లో execute చేస్తుంది."
    },
    {
      command: "ansible-inventory --host server1",
      level: "Intermediate",
      english: "Displays variables for a specific inventory host.",
      telugu: "Specific inventory host కి సంబంధించిన variables చూపిస్తుంది."
    },
    {
      command: "ansible-inventory --export",
      level: "Intermediate",
      english: "Exports inventory data in a simplified format.",
      telugu: "Inventory data ని simplified format లో export చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --vault-id dev@prompt",
      level: "Intermediate",
      english: "Uses a named Vault ID and prompts for its password.",
      telugu: "Named Vault ID ఉపయోగించి password prompt చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --list-hosts --limit staging",
      level: "Intermediate",
      english: "Lists only staging hosts targeted by the playbook.",
      telugu: "Playbook target చేసే staging hosts మాత్రమే చూపిస్తుంది."
    },

    // ==================== ADVANCED - 50 ====================

    {
      command: "ansible-playbook site.yml --forks 50",
      level: "Advanced",
      english: "Runs playbook tasks with up to 50 parallel forks.",
      telugu: "50 parallel forks తో playbook tasks run చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --serial 10",
      level: "Advanced",
      english: "Processes hosts in batches of ten.",
      telugu: "Hosts ని ఒక్కో batch లో పది చొప్పున process చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --timeout 30",
      level: "Advanced",
      english: "Sets the connection timeout for the playbook.",
      telugu: "Playbook కోసం connection timeout set చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --connection ssh",
      level: "Advanced",
      english: "Explicitly selects SSH as the connection plugin.",
      telugu: "Connection plugin గా SSH ని select చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --private-key ~/.ssh/deploy_key",
      level: "Advanced",
      english: "Uses a dedicated private key for playbook connections.",
      telugu: "Playbook connections కోసం dedicated private key ఉపయోగిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --user deploy",
      level: "Advanced",
      english: "Runs remote connections using a specified user.",
      telugu: "Specified user తో remote connections చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --become --become-user root",
      level: "Advanced",
      english: "Escalates privileges to the root user.",
      telugu: "Root user కి privilege escalation చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --become-method sudo",
      level: "Advanced",
      english: "Selects sudo as the privilege escalation method.",
      telugu: "Privilege escalation method గా sudo select చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --become-method su",
      level: "Advanced",
      english: "Uses su for privilege escalation.",
      telugu: "Privilege escalation కోసం su ఉపయోగిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --syntax-check -i production.ini",
      level: "Advanced",
      english: "Validates playbook syntax against a production inventory.",
      telugu: "Production inventory తో playbook syntax validate చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --check --diff --limit staging",
      level: "Advanced",
      english: "Previews configuration changes on staging hosts.",
      telugu: "Staging hosts లో configuration changes ని preview చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --force-handlers --flush-cache",
      level: "Advanced",
      english: "Forces handlers and clears cached facts before execution.",
      telugu: "Handlers force చేసి execution ముందు cached facts clear చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --vault-id prod@.vault_pass",
      level: "Advanced",
      english: "Uses a production Vault ID with a password file.",
      telugu: "Production Vault ID తో password file ఉపయోగిస్తుంది."
    },
    {
      command: "ansible-vault create secrets.yml",
      level: "Advanced",
      english: "Creates a new encrypted Ansible Vault file.",
      telugu: "కొత్త encrypted Ansible Vault file create చేస్తుంది."
    },
    {
      command: "ansible-vault encrypt secrets.yml",
      level: "Advanced",
      english: "Encrypts an existing YAML file.",
      telugu: "Existing YAML file ని encrypt చేస్తుంది."
    },
    {
      command: "ansible-vault decrypt secrets.yml",
      level: "Advanced",
      english: "Decrypts an encrypted Vault file.",
      telugu: "Encrypted Vault file ని decrypt చేస్తుంది."
    },
    {
      command: "ansible-vault edit secrets.yml",
      level: "Advanced",
      english: "Edits an encrypted Vault file securely.",
      telugu: "Encrypted Vault file ని secure గా edit చేస్తుంది."
    },
    {
      command: "ansible-vault view secrets.yml",
      level: "Advanced",
      english: "Displays the decrypted contents of a Vault file.",
      telugu: "Vault file లోని decrypted contents చూపిస్తుంది."
    },
    {
      command: "ansible-vault rekey secrets.yml",
      level: "Advanced",
      english: "Changes the password used to encrypt a Vault file.",
      telugu: "Vault file encryption password మార్చుతుంది."
    },
    {
      command: "ansible-vault encrypt_string 'MySecret' --name 'db_password'",
      level: "Advanced",
      english: "Encrypts a string for use as a protected variable.",
      telugu: "Protected variable గా ఉపయోగించడానికి string encrypt చేస్తుంది."
    },
    {
      command: "ansible-vault encrypt_string --stdin-name api_key",
      level: "Advanced",
      english: "Reads a value from standard input and encrypts it.",
      telugu: "Standard input నుంచి value తీసుకుని encrypt చేస్తుంది."
    },
    {
      command: "ansible-galaxy init nginx_role",
      level: "Advanced",
      english: "Creates a new Ansible role directory structure.",
      telugu: "కొత్త Ansible role directory structure create చేస్తుంది."
    },
    {
      command: "ansible-galaxy init --init-path roles nginx_role",
      level: "Advanced",
      english: "Creates a role in a specified roles directory.",
      telugu: "Specified roles directory లో role create చేస్తుంది."
    },
    {
      command: "ansible-galaxy collection init company.platform",
      level: "Advanced",
      english: "Creates a new Ansible collection structure.",
      telugu: "కొత్త Ansible collection structure create చేస్తుంది."
    },
    {
      command: "ansible-galaxy collection build",
      level: "Advanced",
      english: "Builds a collection archive from its source directory.",
      telugu: "Collection source directory నుంచి archive build చేస్తుంది."
    },
    {
      command: "ansible-galaxy collection publish company-platform-1.0.0.tar.gz",
      level: "Advanced",
      english: "Publishes a collection archive to Ansible Galaxy.",
      telugu: "Collection archive ని Ansible Galaxy కి publish చేస్తుంది."
    },
    {
      command: "ansible-galaxy role import username repository",
      level: "Advanced",
      english: "Imports a role from a source repository into Galaxy.",
      telugu: "Source repository నుంచి role ని Galaxy లోకి import చేస్తుంది."
    },
    {
      command: "ansible-inventory -i inventory.yml --graph --vars",
      level: "Advanced",
      english: "Displays inventory groups, hosts, and their variables.",
      telugu: "Inventory groups, hosts మరియు variables చూపిస్తుంది."
    },
    {
      command: "ansible-inventory -i inventory.yml --list --yaml",
      level: "Advanced",
      english: "Displays inventory data in YAML format.",
      telugu: "Inventory data ని YAML format లో చూపిస్తుంది."
    },
    {
      command: "ansible-inventory -i inventory.yml --host web01",
      level: "Advanced",
      english: "Displays resolved variables for a particular host.",
      telugu: "ఒక particular host కి resolved variables చూపిస్తుంది."
    },
    {
      command: "ansible-config dump --only-changed",
      level: "Advanced",
      english: "Displays only configuration values that differ from defaults.",
      telugu: "Default values నుంచి మారిన configuration settings మాత్రమే చూపిస్తుంది."
    },
    {
      command: "ansible-config list --format yaml",
      level: "Advanced",
      english: "Lists configuration options in YAML format.",
      telugu: "Configuration options ని YAML format లో చూపిస్తుంది."
    },
    {
      command: "ansible-config init --disabled",
      level: "Advanced",
      english: "Generates a configuration template with settings disabled.",
      telugu: "Settings disabled గా ఉన్న configuration template generate చేస్తుంది."
    },
    {
      command: "ansible-doc -t connection -l",
      level: "Advanced",
      english: "Lists available connection plugins.",
      telugu: "Available connection plugins list చేస్తుంది."
    },
    {
      command: "ansible-doc -t callback -l",
      level: "Advanced",
      english: "Lists available callback plugins.",
      telugu: "Available callback plugins list చేస్తుంది."
    },
    {
      command: "ansible-doc -t lookup -l",
      level: "Advanced",
      english: "Lists available lookup plugins.",
      telugu: "Available lookup plugins list చేస్తుంది."
    },
    {
      command: "ansible-doc -t filter -l",
      level: "Advanced",
      english: "Lists available filter plugins.",
      telugu: "Available filter plugins list చేస్తుంది."
    },
    {
      command: "ansible-doc -t inventory -l",
      level: "Advanced",
      english: "Lists available inventory plugins.",
      telugu: "Available inventory plugins list చేస్తుంది."
    },
    {
      command: "ansible-doc -t strategy -l",
      level: "Advanced",
      english: "Lists available strategy plugins.",
      telugu: "Available strategy plugins list చేస్తుంది."
    },
    {
      command: "ansible-test sanity --docker default",
      level: "Advanced",
      english: "Runs sanity tests for an Ansible collection in Docker.",
      telugu: "Docker లో Ansible collection sanity tests run చేస్తుంది."
    },
    {
      command: "ansible-test units",
      level: "Advanced",
      english: "Runs unit tests for an Ansible collection.",
      telugu: "Ansible collection కోసం unit tests run చేస్తుంది."
    },
    {
      command: "ansible-test integration",
      level: "Advanced",
      english: "Runs integration tests for an Ansible collection.",
      telugu: "Ansible collection కోసం integration tests run చేస్తుంది."
    },
    {
      command: "ansible-test sanity --list-tests",
      level: "Advanced",
      english: "Lists available sanity tests.",
      telugu: "Available sanity tests list చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --diff --check --limit webservers",
      level: "Advanced",
      english: "Previews changes in check mode for webservers.",
      telugu: "Webservers కోసం check mode లో changes preview చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --tags deploy --limit production",
      level: "Advanced",
      english: "Runs deployment-tagged tasks on production hosts.",
      telugu: "Production hosts పై deploy tag ఉన్న tasks run చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --skip-tags database",
      level: "Advanced",
      english: "Excludes database-tagged tasks from execution.",
      telugu: "Database tag ఉన్న tasks ని execution నుంచి skip చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --syntax-check --list-tasks",
      level: "Advanced",
      english: "Validates playbook syntax and lists its tasks.",
      telugu: "Playbook syntax validate చేసి tasks list చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --limit 'webservers:&production'",
      level: "Advanced",
      english: "Targets hosts common to webservers and production groups.",
      telugu: "Webservers మరియు production groups రెండింటిలో ఉన్న hosts ని target చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --limit 'webservers:!web02'",
      level: "Advanced",
      english: "Targets webservers while excluding web02.",
      telugu: "Webservers target చేసి web02 ని exclude చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --list-tasks --list-tags",
      level: "Advanced",
      english: "Displays both task names and available tags.",
      telugu: "Task names మరియు available tags రెండింటినీ చూపిస్తుంది."
    },

    // ==================== TROUBLESHOOTING - 60 ====================

    {
      command: "ansible all -m ping -vvv",
      level: "Troubleshooting",
      english: "Provides detailed output while testing host connectivity.",
      telugu: "Host connectivity test సమయంలో detailed output చూపిస్తుంది."
    },
    {
      command: "ansible all -m ping -vvvv",
      level: "Troubleshooting",
      english: "Enables maximum verbosity for connection troubleshooting.",
      telugu: "Connection troubleshooting కోసం maximum verbosity enable చేస్తుంది."
    },
    {
      command: "ansible all -m ping --timeout 10",
      level: "Troubleshooting",
      english: "Sets a short timeout for connectivity tests.",
      telugu: "Connectivity tests కోసం short timeout set చేస్తుంది."
    },
    {
      command: "ansible all -m ping -i inventory.ini -u ubuntu",
      level: "Troubleshooting",
      english: "Tests connectivity using a specified inventory and SSH user.",
      telugu: "Specified inventory మరియు SSH user తో connectivity test చేస్తుంది."
    },
    {
      command: "ansible all -m ping --ask-pass",
      level: "Troubleshooting",
      english: "Prompts for the SSH connection password.",
      telugu: "SSH connection password అడుగుతుంది."
    },
    {
      command: "ansible all -m ping --ask-become-pass",
      level: "Troubleshooting",
      english: "Prompts for the privilege escalation password.",
      telugu: "Privilege escalation password అడుగుతుంది."
    },
    {
      command: "ansible all -m ping -e \"ansible_ssh_common_args='-o StrictHostKeyChecking=no'\"",
      level: "Troubleshooting",
      english: "Temporarily disables strict SSH host-key checking for the connection.",
      telugu: "Connection కోసం strict SSH host-key checking ని temporary గా disable చేస్తుంది."
    },
    {
      command: "ansible all -m ping -e \"ansible_python_interpreter=/usr/bin/python3\"",
      level: "Troubleshooting",
      english: "Specifies the Python interpreter on managed hosts.",
      telugu: "Managed hosts లో Python interpreter path specify చేస్తుంది."
    },
    {
      command: "ansible all -m setup --tree /tmp/ansible-facts",
      level: "Troubleshooting",
      english: "Stores collected host facts in separate files.",
      telugu: "Collect చేసిన host facts ని separate files లో store చేస్తుంది."
    },
    {
      command: "ansible all -m setup -a \"filter=ansible_memtotal_mb\"",
      level: "Troubleshooting",
      english: "Checks total memory facts on managed hosts.",
      telugu: "Managed hosts లో total memory facts check చేస్తుంది."
    },
    {
      command: "ansible all -m setup -a \"filter=ansible_processor_vcpus\"",
      level: "Troubleshooting",
      english: "Checks the number of available virtual CPUs.",
      telugu: "Available virtual CPUs సంఖ్య check చేస్తుంది."
    },
    {
      command: "ansible all -m setup -a \"filter=ansible_mounts\"",
      level: "Troubleshooting",
      english: "Checks mounted filesystem facts.",
      telugu: "Mounted filesystem facts check చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --syntax-check",
      level: "Troubleshooting",
      english: "Finds syntax errors before playbook execution.",
      telugu: "Playbook execute చేయడానికి ముందు syntax errors కనుగొంటుంది."
    },
    {
      command: "ansible-playbook site.yml --check --diff",
      level: "Troubleshooting",
      english: "Previews intended changes without applying them.",
      telugu: "Changes apply చేయకుండా వాటిని preview చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml -vvv --step",
      level: "Troubleshooting",
      english: "Runs tasks step by step with detailed output.",
      telugu: "Detailed output తో tasks ఒక్కొక్కటిగా run చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --start-at-task=\"Configure Nginx\"",
      level: "Troubleshooting",
      english: "Resumes playbook execution from a specified task.",
      telugu: "Specified task నుంచి playbook execution ప్రారంభిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --limit web01",
      level: "Troubleshooting",
      english: "Isolates execution to one host for debugging.",
      telugu: "Debugging కోసం ఒక host కి execution పరిమితం చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --flush-cache",
      level: "Troubleshooting",
      english: "Clears cached facts when stale facts cause issues.",
      telugu: "Old cached facts వల్ల సమస్య వస్తే వాటిని clear చేస్తుంది."
    },
    {
      command: "ansible-config dump --only-changed",
      level: "Troubleshooting",
      english: "Identifies non-default configuration values.",
      telugu: "Default కాని configuration values గుర్తిస్తుంది."
    },
    {
      command: "ansible-config view",
      level: "Troubleshooting",
      english: "Checks the active Ansible configuration file.",
      telugu: "Active Ansible configuration file check చేస్తుంది."
    },
    {
      command: "ansible-inventory --list -i inventory.ini",
      level: "Troubleshooting",
      english: "Checks whether inventory data can be parsed.",
      telugu: "Inventory data సరిగ్గా parse అవుతుందో check చేస్తుంది."
    },
    {
      command: "ansible-inventory --graph -i inventory.ini",
      level: "Troubleshooting",
      english: "Checks inventory group and host relationships.",
      telugu: "Inventory group మరియు host relationships check చేస్తుంది."
    },
    {
      command: "ansible-inventory --host web01 -i inventory.ini",
      level: "Troubleshooting",
      english: "Inspects resolved variables for a host.",
      telugu: "ఒక host కి resolved అయిన variables inspect చేస్తుంది."
    },
    {
      command: "ansible all --list-hosts -i inventory.ini",
      level: "Troubleshooting",
      english: "Verifies that expected hosts are included in inventory.",
      telugu: "Expected hosts inventory లో ఉన్నాయో verify చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"python3 --version\"",
      level: "Troubleshooting",
      english: "Checks Python availability on managed hosts.",
      telugu: "Managed hosts లో Python availability check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"which python3\"",
      level: "Troubleshooting",
      english: "Finds the Python 3 executable path.",
      telugu: "Python 3 executable path కనుగొంటుంది."
    },
    {
      command: "ansible all -m command -a \"id\"",
      level: "Troubleshooting",
      english: "Checks the remote user and group identity.",
      telugu: "Remote user మరియు group identity check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"hostname -f\"",
      level: "Troubleshooting",
      english: "Checks the fully qualified hostname.",
      telugu: "Fully qualified hostname check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"systemctl is-active sshd\"",
      level: "Troubleshooting",
      english: "Checks whether the SSH daemon is active.",
      telugu: "SSH daemon active గా ఉందో check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"systemctl is-enabled sshd\"",
      level: "Troubleshooting",
      english: "Checks whether the SSH service is enabled at boot.",
      telugu: "Boot సమయంలో SSH service enabled గా ఉందో check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"ss -tlnp\"",
      level: "Troubleshooting",
      english: "Checks listening TCP ports on managed hosts.",
      telugu: "Managed hosts లో listening TCP ports check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"ip route\"",
      level: "Troubleshooting",
      english: "Displays network routing information.",
      telugu: "Network routing information చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"getent hosts github.com\"",
      level: "Troubleshooting",
      english: "Checks hostname resolution on managed hosts.",
      telugu: "Managed hosts లో hostname resolution check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"curl -I https://example.com\"",
      level: "Troubleshooting",
      english: "Checks HTTP response headers from a remote endpoint.",
      telugu: "Remote endpoint నుంచి HTTP response headers check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"journalctl -u nginx -n 50\"",
      level: "Troubleshooting",
      english: "Displays recent Nginx service logs.",
      telugu: "Nginx service కి సంబంధించిన recent logs చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"journalctl -u sshd -n 50\"",
      level: "Troubleshooting",
      english: "Displays recent SSH daemon logs.",
      telugu: "SSH daemon కి సంబంధించిన recent logs చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"systemctl --failed\"",
      level: "Troubleshooting",
      english: "Lists failed systemd services.",
      telugu: "Failed అయిన systemd services list చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"df -i\"",
      level: "Troubleshooting",
      english: "Checks filesystem inode usage.",
      telugu: "Filesystem inode usage check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"free -m\"",
      level: "Troubleshooting",
      english: "Displays memory usage in megabytes.",
      telugu: "Memory usage ని megabytes లో చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"ps aux\"",
      level: "Troubleshooting",
      english: "Displays running processes on managed hosts.",
      telugu: "Managed hosts లో running processes చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"ls -ld /etc/ansible\"",
      level: "Troubleshooting",
      english: "Checks permissions and ownership of the Ansible directory.",
      telugu: "Ansible directory permissions మరియు ownership check చేస్తుంది."
    },
    {
      command: "ansible all -m stat -a \"path=/etc/ansible/ansible.cfg\"",
      level: "Troubleshooting",
      english: "Checks whether a configuration file exists and its metadata.",
      telugu: "Configuration file ఉందో లేదో మరియు metadata check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"ls -l /tmp\"",
      level: "Troubleshooting",
      english: "Checks temporary directory contents and permissions.",
      telugu: "Temporary directory contents మరియు permissions check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"mount\"",
      level: "Troubleshooting",
      english: "Displays currently mounted filesystems.",
      telugu: "ప్రస్తుతం mount అయిన filesystems చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"timedatectl status\"",
      level: "Troubleshooting",
      english: "Checks system clock and time synchronization status.",
      telugu: "System clock మరియు time synchronization status check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"ulimit -a\"",
      level: "Troubleshooting",
      english: "Displays resource limits for the remote execution user.",
      telugu: "Remote execution user resource limits చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"getenforce\"",
      level: "Troubleshooting",
      english: "Checks the SELinux enforcement mode.",
      telugu: "SELinux enforcement mode check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"firewall-cmd --state\"",
      level: "Troubleshooting",
      english: "Checks the firewalld service state.",
      telugu: "Firewalld service state check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"iptables -L -n\"",
      level: "Troubleshooting",
      english: "Displays firewall rules configured with iptables.",
      telugu: "Iptables లో configure చేసిన firewall rules చూపిస్తుంది."
    },
    {
      command: "ansible all -m command -a \"rpm -qa ansible\"",
      level: "Troubleshooting",
      english: "Checks whether the Ansible package is installed on RPM-based systems.",
      telugu: "RPM-based systems లో Ansible package install అయిందో check చేస్తుంది."
    },
    {
      command: "ansible all -m command -a \"dpkg -l ansible\"",
      level: "Troubleshooting",
      english: "Checks Ansible package installation on Debian-based systems.",
      telugu: "Debian-based systems లో Ansible package installation check చేస్తుంది."
    },
    {
      command: "ansible-galaxy collection list --format yaml",
      level: "Troubleshooting",
      english: "Checks installed collection versions in YAML format.",
      telugu: "Install అయిన collection versions ని YAML format లో check చేస్తుంది."
    },
    {
      command: "ansible-galaxy role list --roles-path ./roles",
      level: "Troubleshooting",
      english: "Checks roles installed in a specific directory.",
      telugu: "Specific directory లో install అయిన roles check చేస్తుంది."
    },
    {
      command: "ansible-doc -t module ansible.builtin.command",
      level: "Troubleshooting",
      english: "Checks documentation for the command module.",
      telugu: "Command module documentation check చేస్తుంది."
    },
    {
      command: "ansible-doc -t module ansible.builtin.shell",
      level: "Troubleshooting",
      english: "Checks documentation for the shell module.",
      telugu: "Shell module documentation check చేస్తుంది."
    },
    {
      command: "ansible-doc -t module ansible.builtin.copy",
      level: "Troubleshooting",
      english: "Checks supported parameters of the copy module.",
      telugu: "Copy module supported parameters check చేస్తుంది."
    },
    {
      command: "ansible-doc -t module ansible.builtin.template",
      level: "Troubleshooting",
      english: "Checks documentation for the template module.",
      telugu: "Template module documentation check చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --list-tasks --limit webservers",
      level: "Troubleshooting",
      english: "Inspects tasks that will run against webservers.",
      telugu: "Webservers పై run అయ్యే tasks inspect చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --list-tags",
      level: "Troubleshooting",
      english: "Checks the tags available for selective execution.",
      telugu: "Selective execution కోసం available tags check చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --list-hosts --limit production",
      level: "Troubleshooting",
      english: "Verifies the production hosts selected for execution.",
      telugu: "Execution కోసం select అయిన production hosts verify చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --check --limit web01",
      level: "Troubleshooting",
      english: "Tests the expected changes on one host without applying them.",
      telugu: "ఒక host పై changes apply చేయకుండా test చేస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --diff --limit web01",
      level: "Troubleshooting",
      english: "Displays configuration differences for a single host.",
      telugu: "ఒక host కి సంబంధించిన configuration differences చూపిస్తుంది."
    },
    {
      command: "ansible-playbook site.yml --syntax-check -vvv",
      level: "Troubleshooting",
      english: "Provides detailed output while checking playbook syntax.",
      telugu: "Playbook syntax check సమయంలో detailed output చూపిస్తుంది."
    }
  ]
};
