export type AtoZLesson = {
  summary: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[]; code?: string; note?: string }[];
  imageQuery?: string;
  diagram?: { title: string; nodes: string[]; explanation: string };
  interview: { question: string; answer: string }[];
  handsOn: string[];
};

export const atoZLessons: Record<string, AtoZLesson> = {
  "linux/linux-introduction": {
    diagram: { title: "Linux request path", nodes: ["User / DevOps engineer", "Bash shell and CLI command", "User-space program and libraries", "System call boundary", "Linux kernel: process · memory · filesystem · network", "Virtual / physical hardware"], explanation: "User command shell lo parse avuthundi; user-space program kernel system calls dwara request chesthundi. Kernel permissions and resources manage chesi hardware operations complete chesthundi." },
    summary: "Linux anedi open-source operating system kernel meeda build ayina operating system family. Servers, cloud virtual machines, containers, networking devices and developer systems lo Linux widely use chestharu.",
    imageQuery: "Linux operating system architecture user applications shell system libraries kernel hardware labeled diagram",
    sections: [
      { heading: "1. Linux ante enti?", paragraphs: [
        "Linux anedi open-source, Unix-like operating system kernel. Practical ga manam Linux ani cheppinappudu Ubuntu, Debian, Red Hat Enterprise Linux, Rocky Linux lanti complete operating system distributions ni refer chestham. Kernel hardware resources ni manage chesthundi; distribution kernel tho paatu shell, system tools, package manager and other utilities provide chesthundi.",
        "Simple example: Windows laptop lo Windows OS applications ni run cheyadaniki platform istundi. Alage Linux server lo web server, database, Docker, Kubernetes agents and monitoring tools run avvadaniki platform provide chesthundi."
      ], bullets: ["Open-source: source code ni license terms prakaram inspect, modify and distribute cheyochu.", "Kernel: CPU, memory, devices and processes madhya core manager.", "Distribution: Linux kernel + system utilities + package manager + default tools collection."] },
      { heading: "2. Linux enduku create chesaru? Enduku use chestham?", paragraphs: [
        "Linux development goal reliable, portable, multi-user and multitasking operating system environment provide cheyadam. Servers ki stability, automation, remote administration and flexible configuration important. Linux ee requirements ni support chesthundi.",
        "DevOps lo Linux important endukante cloud servers, container images, Kubernetes worker nodes, CI/CD runners and most production workloads Linux environments meeda run avuthayi. Engineer ki services, processes, permissions, storage, networking and logs ni command line dwara manage cheyadam teliyali."
      ], bullets: ["Server workloads ni run cheyadaniki.", "Shell scripts tho repetitive operations automate cheyadaniki.", "SSH dwara remote machines administer cheyadaniki.", "Docker containers and Kubernetes nodes ki base environment ga."] },
      { heading: "3. Linux ekkada use chestham?", paragraphs: [
        "AWS EC2 instance lo Nginx web server install cheyadam, Kubernetes worker node lo container runtime run cheyadam, Jenkins agent lo build execute cheyadam, database server lo MySQL host cheyadam common examples.",
        "Embedded devices, routers, network appliances, Android platform components and high-performance computing systems lo kuda Linux technologies use avuthayi."
      ], bullets: ["Cloud: Amazon EC2, Azure Virtual Machines, Google Compute Engine.", "Containers: Docker host and container base images.", "CI/CD: Jenkins agents and GitHub Actions self-hosted runners.", "Orchestration: Kubernetes control-plane and worker-node environments."] },
      { heading: "4. Linux ela work avuthundi?", paragraphs: [
        "User command enter chesthe shell aa command ni parse chesi required program ni execute chesthundi. Program system calls dwara kernel ni request chesthundi. Kernel CPU scheduling, memory, file access and device operations manage chesi result ni process ki return chesthundi.",
        "Example: ls command directory contents request chesthundi. Shell ls program ni start chesthundi; program kernel file-system interfaces use chesi entries read chesi output terminal lo display chesthundi."
      ], bullets: ["User: command run chese person or application.", "Shell: command interpreter, example Bash.", "Kernel: hardware and system resources manager.", "Hardware: CPU, RAM, disks and network interfaces."] },
      { heading: "5. Important Linux concepts", paragraphs: ["Linux nerchukune appudu ee foundational concepts clear ga undali."], bullets: ["Multi-user: multiple user accounts independent permissions tho system use cheyochu.", "Multitasking: multiple processes concurrent ga execute avvagalavu.", "Filesystem: files and directories ni hierarchical structure lo organize chesthundi.", "Permissions: read, write, execute access ni user/group/others basis meeda control chesthayi.", "Process: currently running program instance.", "Service: background lo run ayye managed process, example sshd or nginx."] },
      { heading: "6. Practical DevOps example", paragraphs: [
        "Scenario: team AWS EC2 Ubuntu server create chesindi. Application deploy cheyadaniki engineer SSH dwara server ki connect ayi OS details verify chesthadu, packages update chesthadu, Nginx install chesthadu, service status check chesthadu and logs inspect chesthadu.",
        "Ee workflow lo Linux commands direct ga production operations ki use avuthayi. Commands run cheyadaniki mundu target server correct aa, permissions enti, production impact untunda ani verify cheyali."
      ], code: "whoami\nhostname\nuname -a\ncat /etc/os-release\nuptime\nfree -h\ndf -h\nsystemctl status ssh", note: "systemctl service names distribution batti vary avvachu. Production server lo package updates or service restarts mundu change approval and maintenance window follow avvali." },
      { heading: "7. Advantages and limitations", paragraphs: ["Linux flexible and automation-friendly, kani every distribution ki same package manager or configuration path undadu."], bullets: ["Advantages: open-source ecosystem, strong CLI, automation support, server stability, granular permissions.", "Limitations: command-line learning curve, distribution differences, driver/application compatibility checks avasaram, secure configuration responsibility administrator meeda untundi."] },
      { heading: "8. Linux vs Linux distribution", paragraphs: ["Linux kernel operating system core. Ubuntu or RHEL lanti distribution kernel ni system utilities, package manager, installer and support model tho combine chesthundi."], bullets: ["Kernel example: Linux kernel.", "Distribution examples: Ubuntu Server, Debian, RHEL, Rocky Linux, Amazon Linux."] },
      { heading: "9. Interview question and answer", paragraphs: ["Interview lo definition tho paatu DevOps usage explain cheyali."], bullets: ["Question: What is Linux and why is it important in DevOps?", "Answer: Linux is an open-source, Unix-like operating system kernel used by many server distributions. It is important in DevOps because cloud servers, containers, Kubernetes nodes and CI/CD agents commonly run on Linux. Its command-line tools, permissions, process management, networking utilities and scripting capabilities help engineers automate and troubleshoot infrastructure."] },
      { heading: "10. Hands-on practice", paragraphs: ["Mee local Linux machine, WSL, or disposable Linux virtual machine lo ee tasks perform cheyandi."], bullets: ["OS distribution and kernel version identify cheyandi.", "Current username and hostname print cheyandi.", "Disk and memory usage inspect cheyandi.", "SSH service status check cheyandi.", "Each command output lo one useful detail explain cheyandi."] }
    ],
    interview: [
      { question: "Is Linux an operating system or a kernel?", answer: "Technically Linux is the kernel. In everyday usage, Linux usually refers to a complete distribution that combines the kernel with system utilities and applications." },
      { question: "Why do DevOps engineers learn Linux?", answer: "Because cloud VMs, containers, Kubernetes nodes and CI/CD agents commonly use Linux, and engineers need Linux skills for automation, deployments, access control and troubleshooting." }
    ],
    handsOn: ["Run uname -r and identify the kernel version.", "Run cat /etc/os-release and identify the distribution.", "Run df -h and free -h; explain disk and memory usage."]
  },
  "linux/linux-architecture": {
    diagram: { title: "Linux layered architecture", nodes: ["Applications: Nginx · MySQL · Docker", "Shell and system utilities", "Libraries and system-call interface", "Kernel: scheduler · memory · VFS · network · drivers", "Hardware: CPU · RAM · disk · NIC"], explanation: "Application direct ga hardware ni control cheyyadu. Kernel privileged operations handle chesthundi; libraries and system calls user space ki controlled interface provide chesthayi." },
    summary: "Linux architecture layers user applications, shell and system libraries above the kernel, with hardware resources below it. The kernel manages processes, memory, filesystems, devices and networking.",
    imageQuery: "Linux system architecture layered diagram hardware kernel system call interface shell libraries user applications labeled",
    sections: [
      { heading: "1. Linux Architecture ante enti?", paragraphs: [
        "Linux architecture ante user applications nundi hardware varaku requests ela travel avuthayo explain chese layered design. User direct ga hardware ni access cheyyadu. Applications system libraries and system calls dwara kernel services request chesthayi.",
        "Ee separation valla applications hardware details nundi independent ga untayi, kernel resources ni centrally manage chesthundi."
      ], bullets: ["Hardware layer: CPU, RAM, disk, NIC and peripherals.", "Kernel layer: process, memory, filesystem, device and network management.", "System call interface: user-space programs kernel services request chese boundary.", "System libraries and utilities: common functions and command tools.", "Shell and applications: users interact chese command interpreter and programs."] },
      { heading: "2. Architecture enduku important?", paragraphs: [
        "Troubleshooting time lo issue application lo unda, permissions lo unda, kernel resource pressure lo unda, disk/device lo unda ani layer-wise isolate cheyadaniki architecture understanding help chesthundi.",
        "Example: application slow ga undi. CPU usage high aithe process scheduling or workload issue investigate chestham; memory exhausted aithe memory and OOM logs check chestham; disk full aithe filesystem usage inspect chestham."
      ] },
      { heading: "3. Main components and responsibilities", paragraphs: ["Prati layer responsibility clear ga telusukunte commands output ni correct ga interpret cheyochu."], bullets: ["Hardware: physical or virtual compute resources.", "Kernel: CPU scheduling, virtual memory, drivers, networking stack and filesystem interfaces.", "System calls: open, read, write, fork, exec and socket lanti kernel entry points.", "Libraries: applications ki reusable functions provide chesthayi.", "Shell: Bash lanti command interpreter.", "Utilities/applications: ls, ps, systemctl, Nginx, database and custom services."] },
      { heading: "4. Linux request flow ela work avuthundi?", paragraphs: [
        "Example: application file read cheyali anukuntundi. Application library function call chesthundi; library system call interface ni use chesi kernel ni request chesthundi. Kernel permissions verify chesi filesystem and storage driver dwara data retrieve chesthundi. Result application ki return avuthundi.",
        "Command-line example: user ls /var/log run chesthe shell ls process ni launch chesthundi. ls directory entries read chesi formatted output terminal ki print chesthundi."
      ], code: "strace -e openat,read ls /var/log", note: "strace system calls observe cheyadaniki useful. Output lo many calls ravachu; production process meeda tracing performance impact consider cheyali." },
      { heading: "5. DevOps real-time example", paragraphs: [
        "Kubernetes worker node lo containerized application run avuthundi. Container process CPU and memory request chesthundi; Linux kernel scheduler CPU time allocate chesthundi, memory subsystem pages manage chesthundi, network stack packets process chesthundi, filesystem layer container files access provide chesthundi.",
        "Pod lo application crash avuthunte engineer container logs tho paatu node-level CPU, memory, disk and kernel events kuda inspect chesthadu. Architecture knowledge valla correct layer lo diagnosis start cheyochu."
      ], code: "top\nfree -h\ndf -h\ndmesg -T | tail -50\njournalctl -k -n 50" },
      { heading: "6. Useful commands", paragraphs: ["Ee commands system architecture lo different areas ni observe cheyadaniki help chesthayi."], bullets: ["uname -a — kernel and system information.", "lscpu — CPU architecture and processor details.", "free -h — memory summary.", "lsblk — block storage devices.", "ip addr — network interfaces and addresses.", "ps aux — running processes.", "mount — mounted filesystems.", "dmesg — kernel ring-buffer messages."] },
      { heading: "7. Advantages and limitations", paragraphs: ["Layered architecture responsibilities separate chesthundi, kani user-space and kernel-space boundaries understand cheyakunda every issue ni application issue ani assume cheyyakudadhu."], bullets: ["Advantages: resource isolation, hardware abstraction, modular drivers, reusable system interfaces and easier diagnostics.", "Limitations: kernel-level faults affect many workloads; low-level tracing needs care; distribution and kernel versions batti tools or behavior differ avvachu."] },
      { heading: "8. Related concepts comparison", paragraphs: ["User space lo normal applications run avuthayi; kernel space lo privileged kernel code execute avuthundi. User-space process direct privileged hardware operations cheyyakunda system calls use chesthundi."] },
      { heading: "9. Interview question and answer", paragraphs: ["Question: Explain Linux architecture.", "Answer: Linux follows a layered architecture. Hardware provides CPU, memory and devices. The kernel manages processes, memory, filesystems, device drivers and networking. User-space libraries and utilities expose common functionality, while the shell and applications provide user interaction. Applications request privileged kernel operations through system calls. This separation supports resource management, security boundaries and portability."] },
      { heading: "10. Hands-on practice", paragraphs: ["Disposable Linux VM lo commands run chesi output ni architecture layer tho map cheyandi."], bullets: ["lscpu output lo CPU details identify cheyandi.", "ps aux output lo one service process identify cheyandi.", "ip addr output lo active network interface identify cheyandi.", "dmesg -T output lo recent kernel messages inspect cheyandi.", "One application command system call use chese flow ni own words lo explain cheyandi."] }
    ],
    interview: [
      { question: "What is the role of the Linux kernel?", answer: "The kernel manages system resources such as CPU, memory, processes, devices, filesystems and networking, and provides controlled services to user-space applications." },
      { question: "What is a system call?", answer: "A system call is a controlled interface through which a user-space program requests a privileged service from the kernel, such as reading a file or creating a process." }
    ],
    handsOn: ["Run lscpu, free -h, lsblk and ip addr.", "Use ps aux to identify a running service.", "Use strace on a simple command and identify file-related system calls."]
  }

  "linux/linux-distributions": {
    summary: "Linux distribution (distro) ante Linux kernel ni system utilities, package manager, installer, default configuration and support model tho combine chesina complete operating system. DevOps engineer ki Ubuntu, Debian, RHEL, Rocky Linux and Amazon Linux madhya differences teliyali, endukante package commands, support lifecycle and production hardening distro batti maruthayi.",
    diagram: { title: "Linux distribution components", nodes: ["Linux kernel", "System libraries · GNU utilities · systemd", "Package manager · repositories", "Installer · default configuration · security updates", "Complete distribution: Ubuntu / Debian / RHEL / Amazon Linux"], explanation: "Kernel core resource management chesthundi. Distribution maintainers tested packages, repositories, installer and release lifecycle provide chestharu. Same application different distro lo package manager and file paths valla different setup steps require cheyochu." },
    sections: [
      { heading: "1. Linux Distribution ante enti?", paragraphs: ["Linux kernel okkate complete user-ready operating system kaadu. Daaniki shell, core commands, libraries, service manager, package manager, installer and update repositories avasaram. Ee components ni integrate chesi release chesedi Linux distribution.", "Example: Ubuntu Server and Red Hat Enterprise Linux rendu Linux kernel use chesthayi. Kani package management, default repositories, support contracts, lifecycle and administration conventions different ga untayi."] , bullets: ["Kernel: hardware and process resources manage chesthundi.", "System utilities: ls, cp, grep, user-management tools provide chesthayi.", "Package manager: software install, update and remove chesthundi.", "Repositories: trusted package versions and metadata host chesthayi.", "Release lifecycle: security maintenance and end-of-support dates define chesthundi."] },
      { heading: "2. Distributions enduku avasaram?", paragraphs: ["Organizations ki kernel tho paatu tested software collection, security updates, predictable release process and support kavali. Distribution maintainers packages ni integrate chesi compatibility test chestharu; administrators ki repeatable installation and patching process dorukuthundi.", "Production lo random binaries download cheyyadam badulu approved repositories use cheyadam supply-chain risk ni taggistundi and patch tracking easy chesthundi."] },
      { heading: "3. Eppudu ye distribution select cheyali?", paragraphs: ["New cloud VM create chesthunappudu application vendor support matrix, organization standard, security lifecycle, team skills and package availability compare cheyali. Existing production fleet ni reason lekunda distro change cheyyakudadhu.", "Ubuntu LTS common cloud workloads ki popular. RHEL enterprise support and ecosystem avasaram unna organizations lo use avuthundi. Debian stable minimal and conservative package policy kosam choose chestharu. Amazon Linux AWS environments kosam AWS-maintained option."] , bullets: ["Vendor certification and application compatibility first verify cheyyali.", "Support end date and upgrade path document cheyyali.", "Required packages official repositories lo unnayo check cheyyali.", "Golden image and patch baseline organization standard tho align cheyyali."] },
      { heading: "4. Common Linux distributions", paragraphs: ["Ubuntu/Debian family lo APT and .deb packages common. RHEL family lo DNF/YUM and RPM packages common. Amazon Linux versions ki dnf or yum availability version batti vary avuthundi. Package manager commands ni distro identify chesaka matrame run cheyyali."], bullets: ["Ubuntu Server: cloud, application hosting and general-purpose servers.", "Debian: stable base systems and minimal server environments.", "RHEL: enterprise production, vendor certification and support.", "Rocky Linux / AlmaLinux: RHEL-compatible enterprise Linux alternatives.", "Amazon Linux: AWS EC2 and AWS-integrated server workloads."] },
      { heading: "5. Distribution ni ela identify cheyali?", paragraphs: ["Server access vachaka first OS identity and kernel version collect cheyyali. /etc/os-release distribution identity fields istundi; uname kernel details istundi. Ee rendu same information kaavu: distro version and kernel version separate ga record cheyyali."], code: "cat /etc/os-release\nuname -r\nuname -m\ncommand -v apt\ncommand -v dnf\ncommand -v yum", note: "Production automation lo package manager ni blindly assume cheyyakandi. OS family detect chesi correct module or package command use cheyyandi." },
      { heading: "6. Package management practical examples", paragraphs: ["Ubuntu/Debian lo package index refresh chesi package install chestharu. RHEL-family lo DNF repositories metadata use chesi package install chesthundi. Package names and available versions repository batti differ avvachu."], code: "# Ubuntu / Debian\nsudo apt update\nsudo apt install nginx\napt-cache policy nginx\n\n# RHEL / Rocky / AlmaLinux\nsudo dnf makecache\nsudo dnf install nginx\ndnf info nginx", note: "Production lo package update mundu change approval, repository trust, maintenance window and rollback plan follow avvali." },
      { heading: "7. Real-time DevOps scenario", paragraphs: ["Company AWS lo Ubuntu-based application servers and RHEL-based legacy middleware servers maintain chesthundi. Ansible playbook rendu OS families meeda Nginx install cheyyali. Engineer OS facts detect chesi Debian family ki apt module, RedHat family ki dnf module use chesthadu. Ila distro-aware automation reliable ga untundi."], code: "ansible all -m setup -a 'filter=ansible_os_family'\n# Playbook lo: ansible.builtin.package: name=nginx state=present" },
      { heading: "8. Advantages and limitations", paragraphs: ["Distribution package integration, tested updates and consistent baseline provide chesthundi. Kani distro differences valla scripts, package names, service defaults and configuration paths vary avvachu."], bullets: ["Advantages: tested package ecosystem, security updates, release lifecycle, repeatable installation.", "Limitations: version fragmentation, package lag in stable releases, vendor-specific support and migration effort."] },
      { heading: "9. Ubuntu vs Debian vs RHEL", paragraphs: ["Ubuntu Debian base meeda build ayina distribution and frequent LTS enterprise usage kaligi untundi. Debian community-driven stable releases and conservative package changes ki known. RHEL commercial enterprise support, certification and lifecycle policies provide chesthundi. Selection workload requirements meeda depend avuthundi."] },
      { heading: "10. Interview answer and important points", paragraphs: ["Interview answer: A Linux distribution is a complete operating system built around the Linux kernel. It bundles system utilities, libraries, package management, repositories, installer and a release/support model. Examples include Ubuntu, Debian, RHEL, Rocky Linux and Amazon Linux. In DevOps, distribution knowledge is important for package installation, patching, automation, security baselines and production compatibility.", "Important point: Linux kernel version, distribution name and distribution release version ni separate ga identify cheyyali."] }
    ],
    interview: [
      { question: "What is a Linux distribution?", answer: "A Linux distribution combines the Linux kernel with system utilities, libraries, package manager, repositories, installer and release policies to provide a complete operating system. Ubuntu, Debian, RHEL and Amazon Linux are examples." },
      { question: "Why do package commands differ between Linux distributions?", answer: "Different distributions use different package formats and package managers. Debian-based systems commonly use APT with DEB packages, while RHEL-based systems commonly use DNF or YUM with RPM packages." },
      { question: "How do you identify a Linux distribution in automation?", answer: "Read /etc/os-release or use configuration-management facts such as Ansible ansible_os_family. Then select the correct package module and validate package availability." }
    ],
    handsOn: ["Run cat /etc/os-release and record NAME, VERSION and ID.", "Run uname -r and explain why it is different from the distribution version.", "Check whether apt, dnf or yum exists using command -v.", "In a disposable VM, install Nginx using the correct package manager and verify its package version."]
  },
  "linux/filesystem-hierarchy": {
    summary: "Linux filesystem hierarchy ante files and directories ni predictable directory tree lo organize chese standard layout. /etc configuration, /var/log logs, /home user data, /usr installed programs, /tmp temporary files and /proc runtime kernel/process information kosam use avuthayi. Production troubleshooting lo correct path teliyadam chala important.",
    diagram: { title: "Linux filesystem hierarchy", nodes: ["/  Root of the entire filesystem", "/etc  system configuration  ·  /usr  programs and libraries", "/var  changing data and logs  ·  /home  user files", "/tmp  temporary files  ·  /opt  optional application software", "/proc and /sys  kernel/process/device runtime views  ·  /dev devices"], explanation: "Root directory nundi remaining paths branch avuthayi. Directories purpose-based ga separate chestharu; logs kosam /var/log, service configuration kosam /etc, user files kosam /home inspect cheyyali." },
    sections: [
      { heading: "1. Filesystem hierarchy ante enti?", paragraphs: ["Linux lo Windows laga separate drive letters default ga use cheyyaru. Filesystem single root directory / nundi start avuthundi. Disks and partitions vere directories ki mount avvachu, kani user ki unified directory tree la kanipisthundi.", "Filesystem Hierarchy Standard (FHS) common directories ki conventional purpose define chesthundi. Every distribution exact ga same files install cheyyakapovachu, kani main directory meanings similar ga untayi."] },
      { heading: "2. Ee structure enduku important?", paragraphs: ["Engineer application config ekkada untundo, logs ekkada store avuthayo, temporary data ekkada untundo telusukunte troubleshooting fast avuthundi. Example: /var full aithe logs or cache grow ayyaya inspect cheyyali; /etc lo service config changes audit cheyyali.", "Backup policy kuda path purpose meeda depend avuthundi. /home and application data backup avasaram undachu; /proc runtime virtual filesystem kabatti normal backup target kaadu."] },
      { heading: "3. Important directories and their purpose", paragraphs: ["Prati directory ni production examples tho gurthupettukovali."], bullets: ["/: entire filesystem tree root.", "/etc: system-wide configuration; examples /etc/ssh/sshd_config and /etc/fstab.", "/var: frequently changing data; /var/log, /var/lib, /var/cache.", "/home: normal users personal directories.", "/root: root administrator home directory.", "/usr: user-space applications, libraries and shared resources.", "/bin and /sbin: essential commands; modern distributions lo /usr ki symlink ayi undavachu.", "/tmp: temporary files; cleanup policy apply avvachu.", "/opt: optional third-party application installations.", "/proc: process and kernel information virtual filesystem.", "/sys: devices and kernel subsystem information.", "/dev: device files such as disks and terminals.", "/mnt and /media: temporary and removable filesystem mount points."] },
      { heading: "4. Paths ni inspect cheyadam", paragraphs: ["pwd current directory chupisthundi. ls -la hidden files and permissions chupisthundi. df -h mounted filesystems capacity chupisthundi; du -sh directory actual disk usage estimate chesthundi."], code: "ls -la /\nls -lah /var/log\ndf -hT\ndu -sh /var/log\nfind /etc -maxdepth 2 -type f | head -30" },
      { heading: "5. Real-time DevOps troubleshooting", paragraphs: ["Scenario: Nginx server requests fail avuthunnayi. Engineer service status check chesi /etc/nginx configuration inspect chesthadu, /var/log/nginx/error.log lo error chusthadu, disk full issue unda df -h tho verify chesthadu. Root filesystem full aithe log rotation and application data retention investigate chesthadu.", "Logs delete cheyyadam immediate fix laga anipinchina, active log file unlink ayina process disk blocks hold cheyochu. Correct logrotate or service-aware cleanup follow cheyyali."], code: "sudo nginx -t\nsudo systemctl status nginx\nsudo tail -n 100 /var/log/nginx/error.log\ndf -hT\nsudo du -xhd1 /var 2>/dev/null | sort -h" },
      { heading: "6. Configuration and data safety", paragraphs: ["/etc lo files modify cheyyadaniki mundu backup and syntax validation cheyyali. /var/lib lo database or application state undachu; manual deletion data loss cause chesthundi. /proc and /sys virtual interfaces ni normal files laga edit cheyyakudadhu."], bullets: ["Config changes ki version control or backup maintain cheyyali.", "Disk cleanup mundu large directory owner and purpose identify cheyyali.", "Mount points and filesystem type verify cheyyali.", "Application data directories ni delete cheyyadaniki mundu backup and service owner approval teesukovali."] },
      { heading: "7. Advantages and limitations", paragraphs: ["Standard paths administration predictable chesthayi. Kani distributions and packages config locations lo variations kaligi undavachu; application documentation verify cheyyali."], bullets: ["Advantages: predictable layout, easier automation, clear separation of config/logs/user data.", "Limitations: distro-specific paths, symlinks, mount namespaces and container filesystem differences confusion create cheyochu."] },
      { heading: "8. Interview answer and key points", paragraphs: ["Interview answer: Linux filesystem hierarchy organizes files under one root directory /. Standard locations include /etc for configuration, /var for changing data and logs, /home for user files, /usr for programs and libraries, /tmp for temporary files, and /proc and /sys for runtime kernel information. Understanding these paths helps DevOps engineers troubleshoot services, storage and configuration safely.", "Remember: df filesystem capacity chupisthundi; du directory usage chupisthundi. Rendu different questions ki answer isthayi."] }
    ],
    interview: [
      { question: "What is the root directory in Linux?", answer: "The root directory / is the top of the Linux filesystem tree. All files, directories and mounted filesystems appear beneath this single hierarchy." },
      { question: "Where are Linux logs stored?", answer: "Many system and service logs are stored under /var/log, although applications can use custom locations and journald may store logs in its journal." },
      { question: "What is the difference between /etc and /var?", answer: "/etc primarily stores system configuration, while /var stores variable data that changes during system operation, such as logs, caches, spool files and application state." }
    ],
    handsOn: ["List root directories using ls -la / and explain at least eight names.", "Inspect /etc/os-release and /etc/ssh without changing files.", "Compare df -hT with du -sh /var/log.", "Find the largest first-level directories under /var using du, and explain which are safe or unsafe to clean."]
  },
  "linux/files-and-directories": {
    summary: "Linux lo files data ni store chesthayi; directories files and subdirectories ni organize chesthayi. Absolute/relative paths, create, copy, move, rename, search and safe deletion commands daily DevOps administration lo essential.",
    diagram: { title: "Linux directory and file operations", nodes: ["Current working directory (pwd)", "Path resolution: absolute /var/log or relative ./logs", "Directory entries: folders and filenames", "File operations: create · read · copy · move · rename · delete", "Filesystem metadata: owner · permissions · timestamps · storage blocks"], explanation: "Shell path ni current directory or root nundi resolve chesthundi. Commands filesystem operations request chesthayi; permissions and mount state batti kernel operation allow or deny chesthundi." },
    sections: [
      { heading: "1. Files and directories ante enti?", paragraphs: ["File ante data ni store chese filesystem object; text, configuration, logs, scripts and binaries files ga undavachu. Directory ante names and references ni organize chese container. Linux lo almost anni resources files laga expose avuthayi, kani directories, symbolic links and device files special behavior kaligi untayi.", "Absolute path / tho start avuthundi, example /var/log/syslog. Relative path current working directory nundi resolve avuthundi, example ./config/app.yaml."] },
      { heading: "2. Enduku important?", paragraphs: ["Deployment scripts config files copy chesthayi, log files read chesthayi, backup jobs directories archive chesthayi, cleanup jobs old artifacts remove chesthayi. Wrong path or recursive delete production outage/data loss cause cheyochu.", "Automation lo predictable working directory use cheyyali; script lo relative path use chesthe job different directory nundi start ayinappudu fail avvachu."] },
      { heading: "3. Basic navigation and listing", paragraphs: ["pwd current path identify chesthundi. cd directory change chesthundi. ls -lah hidden files, permissions, owner, size and timestamp display chesthundi."], code: "pwd\nls -lah\ncd /var/log\ncd -\nfind . -maxdepth 2 -type d -print" },
      { heading: "4. Create, copy, move and rename", paragraphs: ["mkdir directory create chesthundi; -p parent directories missing unna create chesthundi. touch empty file create chesthundi or existing file timestamp update chesthundi. cp copy, mv move/rename chesthayi."], code: "mkdir -p ~/devmavox/logs/archive\ntouch ~/devmavox/app.log\ncp ~/devmavox/app.log ~/devmavox/logs/\nmv ~/devmavox/logs/app.log ~/devmavox/logs/archive/app-old.log\nls -lR ~/devmavox" },
      { heading: "5. Read and search files", paragraphs: ["cat small files complete ga display chesthundi. less large files page-by-page inspect cheyadaniki useful. head/tail beginning/end lines display chesthayi. find filesystem paths search chesthundi; grep file content lo pattern search chesthundi."], code: "cat /etc/os-release\nless /var/log/syslog\nhead -n 20 app.log\ntail -f app.log\nfind /etc -type f -name '*.conf' 2>/dev/null | head\ngrep -n 'ERROR' app.log" },
      { heading: "6. Safe delete and production precautions", paragraphs: ["rm file delete chesthundi; rm -r directory tree recursively delete chesthundi. rm -rf force and recursive behavior valla dangerous. Command execute mundu pwd, target path, wildcard expansion and variable values verify cheyyali.", "Production cleanup ki fixed allow-listed directory, age threshold, dry-run listing and approval use cheyyali. Root directory or empty variable tho destructive command run avvakunda script guard add cheyyali."], code: "pwd\nfind /tmp/myapp -type f -name '*.tmp' -mtime +7 -print\n# Review output first; only then delete approved files:\nfind /tmp/myapp -type f -name '*.tmp' -mtime +7 -delete", note: "find -delete irreversible. First same command ni -print tho review cheyyandi; backup/retention requirements verify chesaka matrame delete cheyyandi." },
      { heading: "7. Real-time DevOps example", paragraphs: ["CI pipeline build artifact ni /opt/releases/app-2026-11-19 lo create chesthundi, tested artifact ni /opt/app/current ki symlink or deployment strategy dwara promote chesthundi. Logs /var/log/app lo separate ga untayi. Engineer permissions, disk capacity and correct release path verify chesthadu.", "Release directories ni direct ga overwrite cheyyadam badulu versioned release folders and controlled current symlink use chesthe rollback easy avuthundi."], code: "sudo install -d -o appuser -g appgroup /opt/app/releases/2026-11-19\nsudo install -m 0644 app.jar /opt/app/releases/2026-11-19/app.jar\nls -lah /opt/app/releases/2026-11-19\ndf -h /opt/app" },
      { heading: "8. Advantages, limitations and comparison", paragraphs: ["CLI file operations scripts lo automate cheyochu and repeatable workflows create cheyochu. Kani permissions, symlinks, mount boundaries and shell globbing behavior ardham kakapothe unintended files affect avvachu."], bullets: ["cp creates a copy; mv moves or renames; ln -s creates a symbolic link.", "find searches filesystem entries; grep searches text content.", "Absolute paths stable ga untayi; relative paths working directory meeda depend avuthayi."] },
      { heading: "9. Interview answer and key points", paragraphs: ["Interview answer: Linux files store application or system data, while directories organize files in a hierarchical tree. Engineers use commands such as pwd, ls, cd, mkdir, cp, mv, find, grep and rm to navigate and manage files. In production, absolute paths, permissions, backups and reviewed cleanup commands help prevent deployment errors and accidental data loss.", "Important: rm unlink operation chesina process file open ga hold chesthe disk space immediate ga free avvakapovachu."] }
    ],
    interview: [
      { question: "What is the difference between an absolute and relative path?", answer: "An absolute path starts from the root directory / and identifies a location independently of the current directory. A relative path is resolved from the process current working directory." },
      { question: "What is the difference between cp and mv?", answer: "cp creates a copy of a file or directory, while mv moves an entry to another location or renames it. Behavior across filesystems can involve copy-and-delete semantics." },
      { question: "Why is rm -rf dangerous?", answer: "It recursively removes files and directories without interactive confirmation in common usage. A wrong path, wildcard or empty variable can delete important production data, so targets must be validated and reviewed." }
    ],
    handsOn: ["Create a practice tree with mkdir -p and several files using touch.", "Copy one file, rename another and verify results with ls -l.", "Use find to locate .log files and grep to search ERROR lines.", "Create a temporary test directory and practice a reviewed cleanup using find -print before -delete."]
  },
  ...{
    "linux/users-and-groups": {
      "summary": "Linux Users and Groups: User identity, UID/GID, groups, sudo and service accounts. Production lo deploy user SSH dwara connect ayi approved release directory update chesthadu. appsvc non-interactive service account tho application run avuthundi. Developers group shared logs read chesthundi; broad root login share cheyyaru.",
      "diagram": {
        "title": "Linux Users and Groups workflow and decision path",
        "nodes": [
          "User login/process",
          "UID and GID credentials",
          "group membership",
          "filesystem or sudo policy",
          "allow/deny decision"
        ],
        "explanation": "Linux Users and Groups lo ee flow end-to-end ela work avuthundo diagram chupisthundi. UID user ni identify chesthundi; GID group ni identify chesthundi. /etc/passwd account metadata, /etc/shadow protected password hashes, /etc/group group records maintain chesthayi. getent local files tho paatu configured identity sources ni query cheyagaladu. usermod -aG existing supplementary groups ni preserve chesthu group append chesthundi; -a lekunda use chesthe memberships replace avvachu."
      },
      "sections": [
        {
          "heading": "1. Linux Users and Groups ante enti?",
          "paragraphs": [
            "User identity, UID/GID, groups, sudo and service accounts. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: User identity, UID/GID, groups, sudo and service accounts.",
            "DevOps relevance: Production lo deploy user SSH dwara connect ayi approved release directory update chesthadu. appsvc non-interactive service account tho application run avuthundi. Developers group shared logs read chesthundi; broad root login share cheyyaru."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Shared Linux servers lo andariki root access ivvadam dangerous. Separate users and groups valla accountability, ownership and least-privilege access maintain cheyochu.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Cloud VM login, CI/CD deployment account, application service identity, team shared directories.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Production lo deploy user SSH dwara connect ayi approved release directory update chesthadu. appsvc non-interactive service account tho application run avuthundi. Developers group shared logs read chesthundi; broad root login share cheyyaru."
          ]
        },
        {
          "heading": "5. Linux Users and Groups ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "UID user ni identify chesthundi; GID group ni identify chesthundi. /etc/passwd account metadata, /etc/shadow protected password hashes, /etc/group group records maintain chesthayi. getent local files tho paatu configured identity sources ni query cheyagaladu. usermod -aG existing supplementary groups ni preserve chesthu group append chesthundi; -a lekunda use chesthe memberships replace avvachu."
          ],
          "bullets": [
            "1. User login/process",
            "2. UID and GID credentials",
            "3. group membership",
            "4. filesystem or sudo policy",
            "5. allow/deny decision"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "getent passwd deploy\nid deploy\nsudo groupadd appteam\nsudo useradd -m -s /bin/bash deploy\nsudo usermod -aG appteam deploy\ngetent group appteam\nsudo -l -U deploy",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Production lo deploy user SSH dwara connect ayi approved release directory update chesthadu. appsvc non-interactive service account tho application run avuthundi. Developers group shared logs read chesthundi; broad root login share cheyyaru.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "User account = individual UID; group = collection GID. Human account and service account purpose different. sudoers policy ni visudo tho validate cheyyali; RHEL family lo admin group often wheel, Debian/Ubuntu lo sudo.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: -aG supplementary group ni append chesthundi; -a omit chesthe existing supplementary memberships replace avvachu. Production lo accidental group removal service access ni break cheyochu."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: User identity, UID/GID, groups, sudo and service accounts. UID user ni identify chesthundi; GID group ni identify chesthundi. /etc/passwd account metadata, /etc/shadow protected password hashes, /etc/group group records maintain chesthayi. getent local files tho paatu configured identity sources ni query cheyagaladu. usermod -aG existing supplementary groups ni preserve chesthu group append chesthundi; -a lekunda use chesthe memberships replace avvachu.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Disposable VM lo appteam group and deploy user create cheyyandi; id/getent tho verify cheyyandi; non-login service account create chesi shell inspect cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why use usermod -aG?",
          "answer": "-aG supplementary group ni append chesthundi; -a omit chesthe existing supplementary memberships replace avvachu. Production lo accidental group removal service access ni break cheyochu."
        },
        {
          "question": "Linux Users and Groups lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Disposable VM lo appteam group and deploy user create cheyyandi; id/getent tho verify cheyyandi; non-login service account create chesi shell inspect cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/file-permissions": {
      "summary": "Linux File Permissions: Read, write, execute bits, symbolic and numeric modes, umask and directory semantics. Nginx 403 vasthe service user ki file read and every parent directory traverse access unda verify cheyyali. SSH private key world-readable unte SSH reject cheyochu.",
      "diagram": {
        "title": "Linux File Permissions workflow and decision path",
        "nodes": [
          "Process UID/GIDs",
          "inode owner/group/mode",
          "owner/group/others class",
          "permission check",
          "operation allowed or denied"
        ],
        "explanation": "Linux File Permissions lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Numeric mode lo read=4, write=2, execute=1. 640 = owner rw, group r, others none. Directory read lists names, write changes entries, execute/search traverses directory. umask default requested permissions nundi bits remove chesthundi."
      },
      "sections": [
        {
          "heading": "1. Linux File Permissions ante enti?",
          "paragraphs": [
            "Read, write, execute bits, symbolic and numeric modes, umask and directory semantics. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Read, write, execute bits, symbolic and numeric modes, umask and directory semantics.",
            "DevOps relevance: Nginx 403 vasthe service user ki file read and every parent directory traverse access unda verify cheyyali. SSH private key world-readable unte SSH reject cheyochu."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Shared host lo application files ki required access matrame ivvali. Incorrect permissions deployment failures or unauthorized changes cause chesthayi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "SSH key permissions, web root access, deployment scripts, secrets and shared folders.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Nginx 403 vasthe service user ki file read and every parent directory traverse access unda verify cheyyali. SSH private key world-readable unte SSH reject cheyochu."
          ]
        },
        {
          "heading": "5. Linux File Permissions ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Numeric mode lo read=4, write=2, execute=1. 640 = owner rw, group r, others none. Directory read lists names, write changes entries, execute/search traverses directory. umask default requested permissions nundi bits remove chesthundi."
          ],
          "bullets": [
            "1. Process UID/GIDs",
            "2. inode owner/group/mode",
            "3. owner/group/others class",
            "4. permission check",
            "5. operation allowed or denied"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "umask\nstat -c '%A %a %U:%G %n' app.conf\nchmod 640 app.conf\nchmod u+x deploy.sh\nchmod 750 deploy.sh\nnamei -l /var/www/app/index.html",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Nginx 403 vasthe service user ki file read and every parent directory traverse access unda verify cheyyali. SSH private key world-readable unte SSH reject cheyochu.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "chmod permission bits change chesthundi; chown ownership change chesthundi. 777 broad access kabatti production fix ga vadakudadhu. ACL and SELinux additional restrictions apply avvachu.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Owner ki rwx (7), group ki r-x (5), others ki no permissions (0). Deployment script owner execute cheyagaladu; approved group execute/read cheyagaladu."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Read, write, execute bits, symbolic and numeric modes, umask and directory semantics. Numeric mode lo read=4, write=2, execute=1. 640 = owner rw, group r, others none. Directory read lists names, write changes entries, execute/search traverses directory. umask default requested permissions nundi bits remove chesthundi.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Test directory lo 640, 750 modes set chesi stat tho verify cheyyandi; umask 027 test cheyyandi; namei -l tho parent permissions inspect cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What does chmod 750 mean?",
          "answer": "Owner ki rwx (7), group ki r-x (5), others ki no permissions (0). Deployment script owner execute cheyagaladu; approved group execute/read cheyagaladu."
        },
        {
          "question": "Linux File Permissions lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Test directory lo 640, 750 modes set chesi stat tho verify cheyyandi; umask 027 test cheyyandi; namei -l tho parent permissions inspect cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/ownership-and-acl": {
      "summary": "Linux Ownership and ACL: chown, chgrp, setgid directories, POSIX ACLs and default ACL inheritance. Release folder deploy account own chesthundi; runtime group read access ponduthundi; QA user ki ACL dwara read-only access. getfacl output ni access review evidence ga store chestharu.",
      "diagram": {
        "title": "Linux Ownership and ACL workflow and decision path",
        "nodes": [
          "Process identity",
          "inode owner and group",
          "standard mode bits",
          "optional ACL entries and mask",
          "effective permission"
        ],
        "explanation": "Linux Ownership and ACL lo ee flow end-to-end ela work avuthundo diagram chupisthundi. chown user:group ownership change chesthundi. setgid directory new child objects ki parent group inheritance help chesthundi. setfacl named user/group policy add chesthundi; default ACL new children ki inherit avuthundi. ACL mask effective permissions ni limit cheyochu."
      },
      "sections": [
        {
          "heading": "1. Linux Ownership and ACL ante enti?",
          "paragraphs": [
            "chown, chgrp, setgid directories, POSIX ACLs and default ACL inheritance. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: chown, chgrp, setgid directories, POSIX ACLs and default ACL inheritance.",
            "DevOps relevance: Release folder deploy account own chesthundi; runtime group read access ponduthundi; QA user ki ACL dwara read-only access. getfacl output ni access review evidence ga store chestharu."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Basic owner/group/others model sariponi appudu one named user ki specific access ivvali. Ownership and ACLs shared release folders ni safe ga manage chesthayi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Deployment ownership, QA read-only access, shared team workspace, backup restore.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Release folder deploy account own chesthundi; runtime group read access ponduthundi; QA user ki ACL dwara read-only access. getfacl output ni access review evidence ga store chestharu."
          ]
        },
        {
          "heading": "5. Linux Ownership and ACL ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "chown user:group ownership change chesthundi. setgid directory new child objects ki parent group inheritance help chesthundi. setfacl named user/group policy add chesthundi; default ACL new children ki inherit avuthundi. ACL mask effective permissions ni limit cheyochu."
          ],
          "bullets": [
            "1. Process identity",
            "2. inode owner and group",
            "3. standard mode bits",
            "4. optional ACL entries and mask",
            "5. effective permission"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "sudo chown deploy:appteam app.jar\nsudo install -d -o root -g appteam -m 2770 /srv/shared\nsudo setfacl -m u:qa:r-x /srv/shared\nsudo setfacl -m d:u:qa:r-x /srv/shared\ngetfacl /srv/shared\nsudo setfacl -x u:qa /srv/shared",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Release folder deploy account own chesthundi; runtime group read access ponduthundi; QA user ki ACL dwara read-only access. getfacl output ni access review evidence ga store chestharu.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "chmod modes; chown owner/group; setfacl ACL. Recursive chown/chmod mundu target list preview cheyyali. SELinux context and mount options kuda check cheyyali.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Directory default ACL new child objects ki inherited access entries provide chesthundi, creation mode and ACL mask effective access ni influence chesthayi."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: chown, chgrp, setgid directories, POSIX ACLs and default ACL inheritance. chown user:group ownership change chesthundi. setgid directory new child objects ki parent group inheritance help chesthundi. setfacl named user/group policy add chesthundi; default ACL new children ki inherit avuthundi. ACL mask effective permissions ni limit cheyochu.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Shared test directory create chesi setgid enable cheyyandi; QA user ACL grant chesi getfacl verify cheyyandi; child file create chesi default ACL inheritance inspect cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is a default ACL?",
          "answer": "Directory default ACL new child objects ki inherited access entries provide chesthundi, creation mode and ACL mask effective access ni influence chesthayi."
        },
        {
          "question": "Linux Ownership and ACL lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Shared test directory create chesi setgid enable cheyyandi; QA user ACL grant chesi getfacl verify cheyyandi; child file create chesi default ACL inheritance inspect cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/linux-commands": {
      "summary": "Essential Linux Commands: Navigation, system identity, storage, process, network and service inspection commands. Incident start lo engineer host, uptime, disk, memory, top processes and failed services collect chesi ticket lo attach chesthadu. Evidence lekunda restart cheyyadu.",
      "diagram": {
        "title": "Essential Linux Commands workflow and decision path",
        "nodes": [
          "Engineer SSH",
          "inspect identity and host",
          "inspect resource and service state",
          "collect evidence",
          "perform approved change",
          "verify"
        ],
        "explanation": "Essential Linux Commands lo ee flow end-to-end ela work avuthundo diagram chupisthundi. pwd current directory; whoami effective login identity; hostnamectl host/OS info; uname kernel; df filesystem capacity; free memory; ps process snapshot; ip network interfaces; systemctl service manager status. Commands read-only inspection ga start cheyyandi."
      },
      "sections": [
        {
          "heading": "1. Essential Linux Commands ante enti?",
          "paragraphs": [
            "Navigation, system identity, storage, process, network and service inspection commands. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Navigation, system identity, storage, process, network and service inspection commands.",
            "DevOps relevance: Incident start lo engineer host, uptime, disk, memory, top processes and failed services collect chesi ticket lo attach chesthadu. Evidence lekunda restart cheyyadu."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "GUI access leni remote servers lo command line primary administration interface. Commands teliyakunda production diagnosis slow and risky avuthundi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "SSH sessions, cloud VM checks, deployment scripts, incident triage and automation.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Incident start lo engineer host, uptime, disk, memory, top processes and failed services collect chesi ticket lo attach chesthadu. Evidence lekunda restart cheyyadu."
          ]
        },
        {
          "heading": "5. Essential Linux Commands ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "pwd current directory; whoami effective login identity; hostnamectl host/OS info; uname kernel; df filesystem capacity; free memory; ps process snapshot; ip network interfaces; systemctl service manager status. Commands read-only inspection ga start cheyyandi."
          ],
          "bullets": [
            "1. Engineer SSH",
            "2. inspect identity and host",
            "3. inspect resource and service state",
            "4. collect evidence",
            "5. perform approved change",
            "6. verify"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "pwd\nwhoami\nhostnamectl\nuname -r\ncat /etc/os-release\nuptime\ndf -h\nfree -h\nps aux --sort=-%cpu | head\nip addr\nsystemctl --failed",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Incident start lo engineer host, uptime, disk, memory, top processes and failed services collect chesi ticket lo attach chesthadu. Evidence lekunda restart cheyyadu.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "df -h disk capacity; du -sh directory usage. ps snapshot; top live process view. ip addr interface details; ss -lntup listening sockets. Distribution batti command availability vary avvachu.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: hostnamectl, uptime, top or ps, free -h, df -h, iostat if available, and journalctl/service checks. First resource pressure and failing service evidence collect chesthanu."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Navigation, system identity, storage, process, network and service inspection commands. pwd current directory; whoami effective login identity; hostnamectl host/OS info; uname kernel; df filesystem capacity; free memory; ps process snapshot; ip network interfaces; systemctl service manager status. Commands read-only inspection ga start cheyyandi.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Disposable VM lo above commands run chesi each output lo host, CPU, memory, disk, process and network details identify cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Which commands do you run first on a slow Linux server?",
          "answer": "hostnamectl, uptime, top or ps, free -h, df -h, iostat if available, and journalctl/service checks. First resource pressure and failing service evidence collect chesthanu."
        },
        {
          "question": "Essential Linux Commands lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Disposable VM lo above commands run chesi each output lo host, CPU, memory, disk, process and network details identify cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/text-processing": {
      "summary": "Linux Text Processing: cat, less, head, tail, cut, sort, uniq, wc and structured log inspection. Access log lo frequent client IPs identify chesi unusual traffic investigate chestharu. Large file ni memory lo load cheyyakunda tail/grep pipeline use chestharu.",
      "diagram": {
        "title": "Linux Text Processing workflow and decision path",
        "nodes": [
          "Raw text file or stream",
          "select lines/columns",
          "sort/filter/count",
          "evidence summary"
        ],
        "explanation": "Linux Text Processing lo ee flow end-to-end ela work avuthundo diagram chupisthundi. less interactive pager; head first lines; tail last lines; cut delimited fields; sort order; uniq adjacent duplicates collapse chesthundi, so sort often first; wc counts lines/words/bytes. Delimiter assumptions log format batti validate cheyyali."
      },
      "sections": [
        {
          "heading": "1. Linux Text Processing ante enti?",
          "paragraphs": [
            "cat, less, head, tail, cut, sort, uniq, wc and structured log inspection. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: cat, less, head, tail, cut, sort, uniq, wc and structured log inspection.",
            "DevOps relevance: Access log lo frequent client IPs identify chesi unusual traffic investigate chestharu. Large file ni memory lo load cheyyakunda tail/grep pipeline use chestharu."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Logs and configuration files large ga untayi. Full file manually chadavadam badulu targeted extraction and filtering incident diagnosis speed up chesthayi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Application logs, CSV exports, config review, audit records and shell automation.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Access log lo frequent client IPs identify chesi unusual traffic investigate chestharu. Large file ni memory lo load cheyyakunda tail/grep pipeline use chestharu."
          ]
        },
        {
          "heading": "5. Linux Text Processing ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "less interactive pager; head first lines; tail last lines; cut delimited fields; sort order; uniq adjacent duplicates collapse chesthundi, so sort often first; wc counts lines/words/bytes. Delimiter assumptions log format batti validate cheyyali."
          ],
          "bullets": [
            "1. Raw text file or stream",
            "2. select lines/columns",
            "3. sort/filter/count",
            "4. evidence summary"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "less /var/log/syslog\nhead -n 20 app.log\ntail -n 50 app.log\ncut -d' ' -f1 access.log | sort | uniq -c | sort -nr | head\nwc -l app.log",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Access log lo frequent client IPs identify chesi unusual traffic investigate chestharu. Large file ni memory lo load cheyyakunda tail/grep pipeline use chestharu.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "cat displays whole file; less navigates; tail -f follows appended lines. cut simple delimiters ki; JSON logs ki jq better. sort/uniq order and locale behavior consider cheyyali.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: uniq only adjacent equal lines ni combine chesthundi. sort same values ni adjacent ga arrange chesthundi, appudu accurate counts generate avuthayi."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: cat, less, head, tail, cut, sort, uniq, wc and structured log inspection. less interactive pager; head first lines; tail last lines; cut delimited fields; sort order; uniq adjacent duplicates collapse chesthundi, so sort often first; wc counts lines/words/bytes. Delimiter assumptions log format batti validate cheyyali.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Sample access.log create chesi top 10 IPs count cheyyandi; tail -f use chesi new log line append chesi observe cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why sort before uniq -c?",
          "answer": "uniq only adjacent equal lines ni combine chesthundi. sort same values ni adjacent ga arrange chesthundi, appudu accurate counts generate avuthayi."
        },
        {
          "question": "Linux Text Processing lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Sample access.log create chesi top 10 IPs count cheyyandi; tail -f use chesi new log line append chesi observe cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/grep-sed-and-awk": {
      "summary": "Grep, Sed and Awk: Pattern search, stream editing, field extraction and log analytics. Deployment taruvatha logs lo 5xx requests and timeout lines filter chesi time window correlate chestharu. Config replacement mundu backup and diff review cheyyali.",
      "diagram": {
        "title": "Grep, Sed and Awk workflow and decision path",
        "nodes": [
          "Input stream",
          "grep selects matching lines",
          "sed transforms text",
          "awk parses fields and calculates summaries"
        ],
        "explanation": "Grep, Sed and Awk lo ee flow end-to-end ela work avuthundo diagram chupisthundi. grep -E extended regular expressions support chesthundi; -n line numbers; -i case-insensitive. sed -n selected lines print chesthundi; substitution syntax s/old/new/g. awk default whitespace fields $1, $2 and NR line number; CSV quoted fields ki simple awk reliable parser kaadu."
      },
      "sections": [
        {
          "heading": "1. Grep, Sed and Awk ante enti?",
          "paragraphs": [
            "Pattern search, stream editing, field extraction and log analytics. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Pattern search, stream editing, field extraction and log analytics.",
            "DevOps relevance: Deployment taruvatha logs lo 5xx requests and timeout lines filter chesi time window correlate chestharu. Config replacement mundu backup and diff review cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Production logs lo exact error, timestamp or field identify cheyali. grep search, sed text transformation, awk field-based processing provide chesthayi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Incident investigation, config inspection, log summaries and shell scripts.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Deployment taruvatha logs lo 5xx requests and timeout lines filter chesi time window correlate chestharu. Config replacement mundu backup and diff review cheyyali."
          ]
        },
        {
          "heading": "5. Grep, Sed and Awk ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "grep -E extended regular expressions support chesthundi; -n line numbers; -i case-insensitive. sed -n selected lines print chesthundi; substitution syntax s/old/new/g. awk default whitespace fields $1, $2 and NR line number; CSV quoted fields ki simple awk reliable parser kaadu."
          ],
          "bullets": [
            "1. Input stream",
            "2. grep selects matching lines",
            "3. sed transforms text",
            "4. awk parses fields and calculates summaries"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "grep -nE 'ERROR|FATAL' app.log\n grep -i 'timeout' app.log | tail -20\nsed -n '1,40p' app.conf\nsed 's/old-host/new-host/g' hosts.txt\nawk '{print $1}' access.log | sort | uniq -c | sort -nr | head",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Deployment taruvatha logs lo 5xx requests and timeout lines filter chesi time window correlate chestharu. Config replacement mundu backup and diff review cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "grep search; sed stream edit; awk structured field processing. In-place sed -i destructive changes create cheyochu; first output to temp file and diff verify cheyyandi.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: grep matching lines select chesthundi, sed stream-level text transformation chesthundi, awk fields and records process chesi calculations/reporting chesthundi."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Pattern search, stream editing, field extraction and log analytics. grep -E extended regular expressions support chesthundi; -n line numbers; -i case-insensitive. sed -n selected lines print chesthundi; substitution syntax s/old/new/g. awk default whitespace fields $1, $2 and NR line number; CSV quoted fields ki simple awk reliable parser kaadu.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Test log lo ERROR lines count cheyyandi; sed tho output-only hostname replace cheyyandi; awk tho first field counts calculate cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is the difference between grep, sed and awk?",
          "answer": "grep matching lines select chesthundi, sed stream-level text transformation chesthundi, awk fields and records process chesi calculations/reporting chesthundi."
        },
        {
          "question": "Grep, Sed and Awk lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Test log lo ERROR lines count cheyyandi; sed tho output-only hostname replace cheyyandi; awk tho first field counts calculate cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/pipes-and-redirection": {
      "summary": "Linux Pipes and Redirection: stdin, stdout, stderr, pipes, append and command chaining. CI job lo build output and error logs separate ga archive chestharu. Pipeline lo early command fail ayina final command success return ayye risk ni pipefail reduce chesthundi.",
      "diagram": {
        "title": "Linux Pipes and Redirection workflow and decision path",
        "nodes": [
          "Command A stdout",
          "pipe buffer",
          "Command B stdin; stderr separate stream unless redirected"
        ],
        "explanation": "Linux Pipes and Redirection lo ee flow end-to-end ela work avuthundo diagram chupisthundi. stdin FD 0, stdout FD 1, stderr FD 2. > truncate/create chesthundi; >> append chesthundi; 2> stderr redirect; | stdout ni next process stdin ki pass chesthundi. Bash lo set -o pipefail pipeline failure detect cheyadaniki useful."
      },
      "sections": [
        {
          "heading": "1. Linux Pipes and Redirection ante enti?",
          "paragraphs": [
            "stdin, stdout, stderr, pipes, append and command chaining. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: stdin, stdout, stderr, pipes, append and command chaining.",
            "DevOps relevance: CI job lo build output and error logs separate ga archive chestharu. Pipeline lo early command fail ayina final command success return ayye risk ni pipefail reduce chesthundi."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Commands outputs ni files ki save cheyadam, next command ki feed cheyadam and errors separate ga capture cheyadam automation ki essential.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Shell pipelines, CI logs, troubleshooting evidence, scheduled jobs.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "CI job lo build output and error logs separate ga archive chestharu. Pipeline lo early command fail ayina final command success return ayye risk ni pipefail reduce chesthundi."
          ]
        },
        {
          "heading": "5. Linux Pipes and Redirection ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "stdin FD 0, stdout FD 1, stderr FD 2. > truncate/create chesthundi; >> append chesthundi; 2> stderr redirect; | stdout ni next process stdin ki pass chesthundi. Bash lo set -o pipefail pipeline failure detect cheyadaniki useful."
          ],
          "bullets": [
            "1. Command A stdout",
            "2. pipe buffer",
            "3. Command B stdin; stderr separate stream unless redirected"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "command > output.txt\ncommand >> output.txt\ncommand 2> error.log\ncommand > all.log 2>&1\nps aux | grep nginx\ndf -h | sort -k5 -h",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "CI job lo build output and error logs separate ga archive chestharu. Pipeline lo early command fail ayina final command success return ayye risk ni pipefail reduce chesthundi.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "> overwrite; >> append. 2>&1 order matters: first stdout redirect, then stderr stdout destination ki map. |& Bash lo stdout and stderr pipe chesthundi.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: File descriptor 2 (stderr) ni file descriptor 1 (stdout) current destination ki redirect chesthundi. Redirection order result ni affect chesthundi."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: stdin, stdout, stderr, pipes, append and command chaining. stdin FD 0, stdout FD 1, stderr FD 2. > truncate/create chesthundi; >> append chesthundi; 2> stderr redirect; | stdout ni next process stdin ki pass chesthundi. Bash lo set -o pipefail pipeline failure detect cheyadaniki useful.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "stdout and stderr separate files ki redirect cheyyandi; pipefail enable chesi failing first command pipeline exit status observe cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What does 2>&1 mean?",
          "answer": "File descriptor 2 (stderr) ni file descriptor 1 (stdout) current destination ki redirect chesthundi. Redirection order result ni affect chesthundi."
        },
        {
          "question": "Linux Pipes and Redirection lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "stdout and stderr separate files ki redirect cheyyandi; pipefail enable chesi failing first command pipeline exit status observe cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/shell-scripting": {
      "summary": "Linux Shell Scripting: Bash scripts, shebang, exit codes, arguments, functions, safety and automation. Nightly script disk threshold check chesi report generate chesthundi. Production cleanup script delete mundu dry-run list, age threshold and approved path validate cheyyali.",
      "diagram": {
        "title": "Linux Shell Scripting workflow and decision path",
        "nodes": [
          "Script file",
          "interpreter via shebang",
          "arguments/environment",
          "commands/functions",
          "exit status"
        ],
        "explanation": "Linux Shell Scripting lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Shebang interpreter select chesthundi. set -e errors meeda exit behavior enable chesthundi, -u unset variables fail, -o pipefail pipeline failure propagate chesthundi; complex scripts lo traps and expected non-zero commands consciously handle cheyyali. Quote variables to prevent word splitting/globbing."
      },
      "sections": [
        {
          "heading": "1. Linux Shell Scripting ante enti?",
          "paragraphs": [
            "Bash scripts, shebang, exit codes, arguments, functions, safety and automation. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Bash scripts, shebang, exit codes, arguments, functions, safety and automation.",
            "DevOps relevance: Nightly script disk threshold check chesi report generate chesthundi. Production cleanup script delete mundu dry-run list, age threshold and approved path validate cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Repeated manual commands inconsistent and error-prone. Shell scripts repeatable operations automate chesthayi, especially Linux administration and CI/CD.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Backup checks, log rotation helpers, health checks, deployment wrappers and scheduled maintenance.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Nightly script disk threshold check chesi report generate chesthundi. Production cleanup script delete mundu dry-run list, age threshold and approved path validate cheyyali."
          ]
        },
        {
          "heading": "5. Linux Shell Scripting ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Shebang interpreter select chesthundi. set -e errors meeda exit behavior enable chesthundi, -u unset variables fail, -o pipefail pipeline failure propagate chesthundi; complex scripts lo traps and expected non-zero commands consciously handle cheyyali. Quote variables to prevent word splitting/globbing."
          ],
          "bullets": [
            "1. Script file",
            "2. interpreter via shebang",
            "3. arguments/environment",
            "4. commands/functions",
            "5. exit status"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "#!/usr/bin/env bash\nset -Eeuo pipefail\n\nAPP_DIR=\"/opt/myapp\"\nif [[ ! -d \"$APP_DIR\" ]]; then\n  echo \"Missing directory: $APP_DIR\" >&2\n  exit 1\nfi\nprintf 'Checking %s\\n' \"$APP_DIR\"\nfind \"$APP_DIR\" -maxdepth 1 -type f -print\nexit 0",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Nightly script disk threshold check chesi report generate chesthundi. Production cleanup script delete mundu dry-run list, age threshold and approved path validate cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "One-liners quick ad-hoc; script reusable, version controlled and tested. Bash syntax sh ki identical kaadu. ShellCheck static analysis and bats tests useful.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: It makes many scripting failures visible: unset variables, command failures and pipeline failures. It is not a substitute for explicit error handling or testing."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Bash scripts, shebang, exit codes, arguments, functions, safety and automation. Shebang interpreter select chesthundi. set -e errors meeda exit behavior enable chesthundi, -u unset variables fail, -o pipefail pipeline failure propagate chesthundi; complex scripts lo traps and expected non-zero commands consciously handle cheyyali. Quote variables to prevent word splitting/globbing.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "A script create chesi argument accept cheyyandi, invalid path ki non-zero exit ivvandi, ShellCheck run cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why use set -Eeuo pipefail?",
          "answer": "It makes many scripting failures visible: unset variables, command failures and pipeline failures. It is not a substitute for explicit error handling or testing."
        },
        {
          "question": "Linux Shell Scripting lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "A script create chesi argument accept cheyyandi, invalid path ki non-zero exit ivvandi, ShellCheck run cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/bash-variables": {
      "summary": "Bash Variables and Environment: Shell variables, export, environment inheritance, positional parameters and quoting. Same deploy script dev/stage/prod lo APP_ENV and artifact version parameters dwara run avuthundi. Passwords command-line arguments or committed files lo store cheyyakudadhu; secret manager/CI protected secrets use cheyyali.",
      "diagram": {
        "title": "Bash Variables and Environment workflow and decision path",
        "nodes": [
          "Parent shell variable",
          "export environment entry",
          "child process inherits",
          "script reads via parameter expansion"
        ],
        "explanation": "Bash Variables and Environment lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Variable assignment lo spaces around = undakudadhu. export child processes ki environment pass chesthundi. $1 positional argument; $@ all args; \"$@\" argument boundaries preserve chesthundi. ${VAR:-default} default; ${VAR:?message} required variable validation."
      },
      "sections": [
        {
          "heading": "1. Bash Variables and Environment ante enti?",
          "paragraphs": [
            "Shell variables, export, environment inheritance, positional parameters and quoting. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Shell variables, export, environment inheritance, positional parameters and quoting.",
            "DevOps relevance: Same deploy script dev/stage/prod lo APP_ENV and artifact version parameters dwara run avuthundi. Passwords command-line arguments or committed files lo store cheyyakudadhu; secret manager/CI protected secrets use cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Scripts configurable ga undali; hard-coded environment-specific values deployment portability and secret leakage problems create chesthayi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "CI/CD job variables, application paths, environment selection and command arguments.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Same deploy script dev/stage/prod lo APP_ENV and artifact version parameters dwara run avuthundi. Passwords command-line arguments or committed files lo store cheyyakudadhu; secret manager/CI protected secrets use cheyyali."
          ]
        },
        {
          "heading": "5. Bash Variables and Environment ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Variable assignment lo spaces around = undakudadhu. export child processes ki environment pass chesthundi. $1 positional argument; $@ all args; \"$@\" argument boundaries preserve chesthundi. ${VAR:-default} default; ${VAR:?message} required variable validation."
          ],
          "bullets": [
            "1. Parent shell variable",
            "2. export environment entry",
            "3. child process inherits",
            "4. script reads via parameter expansion"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "APP_ENV=staging\nAPP_DIR=\"/opt/my app\"\nprintf '%s\\n' \"$APP_ENV\"\nexport APP_ENV\nbash -c 'printf \"%s\\n\" \"$APP_ENV\"'\nprintf 'script=%s arg1=%s\\n' \"$0\" \"${1:-<missing>}\"\n: \"${APP_ENV:?APP_ENV must be set}\"",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Same deploy script dev/stage/prod lo APP_ENV and artifact version parameters dwara run avuthundi. Passwords command-line arguments or committed files lo store cheyyakudadhu; secret manager/CI protected secrets use cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "Shell variable local shell scope; environment variable exported to child. Single quotes expansion stop chesthayi; double quotes variable expansion allow chesthayi. Unquoted paths with spaces break avvachu.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Shell variable current shell lo available. export chesina variable environment lo child processes ki inherit avuthundi."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Shell variables, export, environment inheritance, positional parameters and quoting. Variable assignment lo spaces around = undakudadhu. export child processes ki environment pass chesthundi. $1 positional argument; $@ all args; \"$@\" argument boundaries preserve chesthundi. ${VAR:-default} default; ${VAR:?message} required variable validation.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Variable export chesi child bash lo print cheyyandi; quoted and unquoted path behavior test cheyyandi; required variable missing appudu script fail cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is the difference between a shell variable and environment variable?",
          "answer": "Shell variable current shell lo available. export chesina variable environment lo child processes ki inherit avuthundi."
        },
        {
          "question": "Bash Variables and Environment lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Variable export chesi child bash lo print cheyyandi; quoted and unquoted path behavior test cheyyandi; required variable missing appudu script fail cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/conditions-and-loops": {
      "summary": "Bash Conditions and Loops: if/case tests, for/while loops, exit status and safe iteration. Deploy script config exists check chesi then service restart execute chesthundi. Batch host list iterate chesi SSH health checks perform chesthundi; failure count and final exit status report cheyyali.",
      "diagram": {
        "title": "Bash Conditions and Loops workflow and decision path",
        "nodes": [
          "Input or command status",
          "condition evaluation",
          "selected branch or loop iteration",
          "action",
          "exit code"
        ],
        "explanation": "Bash Conditions and Loops lo ee flow end-to-end ela work avuthundo diagram chupisthundi. [[ ]] Bash conditional test; -f regular file, -d directory, -x executable. Command success exit code 0; failure non-zero. for iterates values; while repeats while condition true; case handles command choices. Arrays and quoted expansions safer than parsing ls output."
      },
      "sections": [
        {
          "heading": "1. Bash Conditions and Loops ante enti?",
          "paragraphs": [
            "if/case tests, for/while loops, exit status and safe iteration. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: if/case tests, for/while loops, exit status and safe iteration.",
            "DevOps relevance: Deploy script config exists check chesi then service restart execute chesthundi. Batch host list iterate chesi SSH health checks perform chesthundi; failure count and final exit status report cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Automation decisions input, file presence, command success or service health batti change avvali. Conditions and loops scripts ni dynamic ga chesthayi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Multi-server checks, package installation, health probes, deployment validations and batch processing.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Deploy script config exists check chesi then service restart execute chesthundi. Batch host list iterate chesi SSH health checks perform chesthundi; failure count and final exit status report cheyyali."
          ]
        },
        {
          "heading": "5. Bash Conditions and Loops ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "[[ ]] Bash conditional test; -f regular file, -d directory, -x executable. Command success exit code 0; failure non-zero. for iterates values; while repeats while condition true; case handles command choices. Arrays and quoted expansions safer than parsing ls output."
          ],
          "bullets": [
            "1. Input or command status",
            "2. condition evaluation",
            "3. selected branch or loop iteration",
            "4. action",
            "5. exit code"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "if [[ -f /etc/os-release ]]; then\n  . /etc/os-release\n  printf 'Distro: %s\\n' \"$PRETTY_NAME\"\nelse\n  echo 'OS metadata missing' >&2\n  exit 1\nfi\n\nfor host in app01 app02; do\n  printf 'Checking %s\\n' \"$host\"\ndone\n\ncase \"${1:-}\" in\n  start|stop|status) echo \"Action: $1\" ;;\n  *) echo 'Usage: script {start|stop|status}' >&2; exit 2 ;;\nesac",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Deploy script config exists check chesi then service restart execute chesthundi. Batch host list iterate chesi SSH health checks perform chesthundi; failure count and final exit status report cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "if handles boolean branching; case multi-option dispatch; for finite list; while condition-driven repetition. Avoid infinite loops; set timeout/retry limit for health checks.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Every command exit status return chesthundi. Zero means success by convention; non-zero means failure. if command; then syntax status ni directly test chesthundi."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: if/case tests, for/while loops, exit status and safe iteration. [[ ]] Bash conditional test; -f regular file, -d directory, -x executable. Command success exit code 0; failure non-zero. for iterates values; while repeats while condition true; case handles command choices. Arrays and quoted expansions safer than parsing ls output.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "File exists condition, case menu and two-item loop implement cheyyandi; nonexistent file scenario lo expected failure verify cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "How does Bash determine whether a command succeeded?",
          "answer": "Every command exit status return chesthundi. Zero means success by convention; non-zero means failure. if command; then syntax status ni directly test chesthundi."
        },
        {
          "question": "Bash Conditions and Loops lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "File exists condition, case menu and two-item loop implement cheyyandi; nonexistent file scenario lo expected failure verify cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/processes-and-signals": {
      "summary": "Linux Processes and Signals: Process IDs, parent-child relationships, jobs, signals, kill, nice and resource inspection. Deployment lo old process ki SIGTERM pampinchi in-flight requests complete ayye grace period istaru; timeout taruvatha escalation. SIGKILL first choice kaadu because cleanup chance undadu.",
      "diagram": {
        "title": "Linux Processes and Signals workflow and decision path",
        "nodes": [
          "Shell/service starts program",
          "kernel assigns PID",
          "process states and resources",
          "signal requests action",
          "process exits or handles signal"
        ],
        "explanation": "Linux Processes and Signals lo ee flow end-to-end ela work avuthundo diagram chupisthundi. PID process identifier; PPID parent PID. SIGTERM (15) graceful termination request; process cleanup handle cheyochu. SIGKILL (9) immediate kernel termination, catch/ignore cheyyaleru. Zombie already exited but parent not reaped; orphan adopted by init/system manager."
      },
      "sections": [
        {
          "heading": "1. Linux Processes and Signals ante enti?",
          "paragraphs": [
            "Process IDs, parent-child relationships, jobs, signals, kill, nice and resource inspection. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Process IDs, parent-child relationships, jobs, signals, kill, nice and resource inspection.",
            "DevOps relevance: Deployment lo old process ki SIGTERM pampinchi in-flight requests complete ayye grace period istaru; timeout taruvatha escalation. SIGKILL first choice kaadu because cleanup chance undadu."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Application hang, runaway CPU, zombie process or graceful shutdown issue diagnose cheyadaniki process lifecycle knowledge avasaram.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Service debugging, container PID 1 behavior, graceful deploys and resource incidents.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Deployment lo old process ki SIGTERM pampinchi in-flight requests complete ayye grace period istaru; timeout taruvatha escalation. SIGKILL first choice kaadu because cleanup chance undadu."
          ]
        },
        {
          "heading": "5. Linux Processes and Signals ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "PID process identifier; PPID parent PID. SIGTERM (15) graceful termination request; process cleanup handle cheyochu. SIGKILL (9) immediate kernel termination, catch/ignore cheyyaleru. Zombie already exited but parent not reaped; orphan adopted by init/system manager."
          ],
          "bullets": [
            "1. Shell/service starts program",
            "2. kernel assigns PID",
            "3. process states and resources",
            "4. signal requests action",
            "5. process exits or handles signal"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "ps -ef\npgrep -a nginx\ntop\npstree -p\nkill -TERM <PID>\nkill -KILL <PID>\nnice -n 10 command\nrenice 5 -p <PID>",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Deployment lo old process ki SIGTERM pampinchi in-flight requests complete ayye grace period istaru; timeout taruvatha escalation. SIGKILL first choice kaadu because cleanup chance undadu.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "kill sends signal, not necessarily force kill. pkill/pkill patterns careful ga use cheyyali. Process state D uninterruptible sleep ayithe storage/kernel wait investigate cheyyali.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: SIGTERM process ni gracefully stop avvamani request chesthundi and process handle cheyochu. SIGKILL kernel force ga terminate chesthundi and process cleanup handler run avvadu."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Process IDs, parent-child relationships, jobs, signals, kill, nice and resource inspection. PID process identifier; PPID parent PID. SIGTERM (15) graceful termination request; process cleanup handle cheyochu. SIGKILL (9) immediate kernel termination, catch/ignore cheyyaleru. Zombie already exited but parent not reaped; orphan adopted by init/system manager.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "sleep 300 background lo start chesi ps/pstree inspect cheyyandi; kill -TERM use chesi exit observe cheyyandi; disposable process meeda nice test cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "SIGTERM vs SIGKILL?",
          "answer": "SIGTERM process ni gracefully stop avvamani request chesthundi and process handle cheyochu. SIGKILL kernel force ga terminate chesthundi and process cleanup handler run avvadu."
        },
        {
          "question": "Linux Processes and Signals lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "sleep 300 background lo start chesi ps/pstree inspect cheyyandi; kill -TERM use chesi exit observe cheyyandi; disposable process meeda nice test cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/systemd-and-services": {
      "summary": "systemd and Linux Services: systemd units, service lifecycle, enable/start/restart, dependencies and journal. Custom app kosam unit file create chesi User, WorkingDirectory, ExecStart, Restart and environment configure chestharu. Restart mundu config test (e.g. nginx -t), maintenance impact and logs review cheyyali.",
      "diagram": {
        "title": "systemd and Linux Services workflow and decision path",
        "nodes": [
          "systemd PID 1",
          "unit files and dependencies",
          "service process lifecycle",
          "status and journal events"
        ],
        "explanation": "systemd and Linux Services lo ee flow end-to-end ela work avuthundo diagram chupisthundi. start current boot lo start; enable boot-time activation configure chesthundi; restart stop/start; reload service support chesthe config reread. Unit files /etc/systemd/system and vendor paths lo untayi. daemon-reload unit definitions reload chesthundi, service restart kaadu."
      },
      "sections": [
        {
          "heading": "1. systemd and Linux Services ante enti?",
          "paragraphs": [
            "systemd units, service lifecycle, enable/start/restart, dependencies and journal. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: systemd units, service lifecycle, enable/start/restart, dependencies and journal.",
            "DevOps relevance: Custom app kosam unit file create chesi User, WorkingDirectory, ExecStart, Restart and environment configure chestharu. Restart mundu config test (e.g. nginx -t), maintenance impact and logs review cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Production daemons boot time lo start avvali, failures restart policy and dependency order control cheyyali. systemd service management standard interface provide chesthundi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Nginx, Docker, SSH, application daemons and custom system services.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Custom app kosam unit file create chesi User, WorkingDirectory, ExecStart, Restart and environment configure chestharu. Restart mundu config test (e.g. nginx -t), maintenance impact and logs review cheyyali."
          ]
        },
        {
          "heading": "5. systemd and Linux Services ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "start current boot lo start; enable boot-time activation configure chesthundi; restart stop/start; reload service support chesthe config reread. Unit files /etc/systemd/system and vendor paths lo untayi. daemon-reload unit definitions reload chesthundi, service restart kaadu."
          ],
          "bullets": [
            "1. systemd PID 1",
            "2. unit files and dependencies",
            "3. service process lifecycle",
            "4. status and journal events"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "systemctl status nginx\nsudo systemctl start nginx\nsudo systemctl enable nginx\nsudo systemctl restart nginx\nsystemctl is-enabled nginx\nsystemctl list-units --type=service --state=failed\njournalctl -u nginx -n 100 --no-pager",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Custom app kosam unit file create chesi User, WorkingDirectory, ExecStart, Restart and environment configure chestharu. Restart mundu config test (e.g. nginx -t), maintenance impact and logs review cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "systemctl control plane; journalctl logs. enable does not mean currently running; active does not mean enabled at boot. reload and restart different.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: active means service currently running. enabled means configured to start automatically through boot target dependencies; these are independent states."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: systemd units, service lifecycle, enable/start/restart, dependencies and journal. start current boot lo start; enable boot-time activation configure chesthundi; restart stop/start; reload service support chesthe config reread. Unit files /etc/systemd/system and vendor paths lo untayi. daemon-reload unit definitions reload chesthundi, service restart kaadu.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Existing harmless service status inspect cheyyandi; is-enabled compare cheyyandi; journalctl -u output review cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why can a service be active but not enabled?",
          "answer": "active means service currently running. enabled means configured to start automatically through boot target dependencies; these are independent states."
        },
        {
          "question": "systemd and Linux Services lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Existing harmless service status inspect cheyyandi; is-enabled compare cheyyandi; journalctl -u output review cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/package-management": {
      "summary": "Linux Package Management: Repositories, package metadata, install/update/remove, dependencies and verification. Golden VM image build lo approved repositories nundi pinned/approved packages install chesi image scan and patch baseline record chestharu. Production patching staged rollout and rollback plan tho cheyyali.",
      "diagram": {
        "title": "Linux Package Management workflow and decision path",
        "nodes": [
          "Configured repository metadata",
          "package manager dependency resolution",
          "signed package download",
          "install/upgrade database update"
        ],
        "explanation": "Linux Package Management lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Repository package metadata and artifacts host chesthundi. apt update metadata refresh; apt upgrade installed packages upgrade. dnf install dependency resolution chesi RPM package install chesthundi. Package signature verification and repository trust important."
      },
      "sections": [
        {
          "heading": "1. Linux Package Management ante enti?",
          "paragraphs": [
            "Repositories, package metadata, install/update/remove, dependencies and verification. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Repositories, package metadata, install/update/remove, dependencies and verification.",
            "DevOps relevance: Golden VM image build lo approved repositories nundi pinned/approved packages install chesi image scan and patch baseline record chestharu. Production patching staged rollout and rollback plan tho cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Manual binaries update cheyadam version drift and security patch gaps create chesthundi. Package manager dependencies and trusted repositories manage chesthundi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Base image preparation, EC2 patching, CI runners, application host maintenance.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Golden VM image build lo approved repositories nundi pinned/approved packages install chesi image scan and patch baseline record chestharu. Production patching staged rollout and rollback plan tho cheyyali."
          ]
        },
        {
          "heading": "5. Linux Package Management ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Repository package metadata and artifacts host chesthundi. apt update metadata refresh; apt upgrade installed packages upgrade. dnf install dependency resolution chesi RPM package install chesthundi. Package signature verification and repository trust important."
          ],
          "bullets": [
            "1. Configured repository metadata",
            "2. package manager dependency resolution",
            "3. signed package download",
            "4. install/upgrade database update"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "# Debian / Ubuntu\nsudo apt update\napt-cache policy nginx\nsudo apt install nginx\nsudo apt list --upgradable\n# RHEL family\nsudo dnf check-update\nsudo dnf info nginx\nsudo dnf install nginx\nrpm -qi nginx",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Golden VM image build lo approved repositories nundi pinned/approved packages install chesi image scan and patch baseline record chestharu. Production patching staged rollout and rollback plan tho cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "APT/DPKG Debian family; DNF/RPM RHEL family. Package manager package DB update chesthundi; manually delete files cheyadam package state corrupt cheyochu.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: apt update repository package indexes refresh chesthundi. Install decision current metadata and available versions meeda base avuthundi."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Repositories, package metadata, install/update/remove, dependencies and verification. Repository package metadata and artifacts host chesthundi. apt update metadata refresh; apt upgrade installed packages upgrade. dnf install dependency resolution chesi RPM package install chesthundi. Package signature verification and repository trust important.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Disposable VM lo nginx package policy inspect chesi install, package info verify and controlled uninstall practice cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why run apt update before apt install?",
          "answer": "apt update repository package indexes refresh chesthundi. Install decision current metadata and available versions meeda base avuthundi."
        },
        {
          "question": "Linux Package Management lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Disposable VM lo nginx package policy inspect chesi install, package info verify and controlled uninstall practice cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/apt-and-yum-dnf": {
      "summary": "APT and YUM/DNF Commands: Debian package workflows and RPM-family package workflows. Ansible or cloud-init provisioning lo OS family detect chesi package module use cheyyadam raw command hardcode cheyadam kanna portable. Fleet patching before/after package versions capture cheyyali.",
      "diagram": {
        "title": "APT and YUM/DNF Commands workflow and decision path",
        "nodes": [
          "APT: sources",
          "indexes",
          "dependency solver",
          "dpkg; DNF: repo metadata",
          "RPM dependency solver",
          "RPM database"
        ],
        "explanation": "APT and YUM/DNF Commands lo ee flow end-to-end ela work avuthundo diagram chupisthundi. apt update package index refresh; apt-cache policy candidate versions show chesthundi; dpkg -l installed state. DNF makecache metadata refresh; rpm -q installed package query; rpm -V installed files verify. Amazon Linux 2 often yum; newer Amazon Linux 2023 uses dnf."
      },
      "sections": [
        {
          "heading": "1. APT and YUM/DNF Commands ante enti?",
          "paragraphs": [
            "Debian package workflows and RPM-family package workflows. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Debian package workflows and RPM-family package workflows.",
            "DevOps relevance: Ansible or cloud-init provisioning lo OS family detect chesi package module use cheyyadam raw command hardcode cheyadam kanna portable. Fleet patching before/after package versions capture cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Linux distributions package ecosystems different. Correct command use cheyakapothe package install, update or troubleshooting fail avuthundi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Ubuntu/Debian servers and RHEL/Rocky/Alma/Amazon Linux fleets.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Ansible or cloud-init provisioning lo OS family detect chesi package module use cheyyadam raw command hardcode cheyadam kanna portable. Fleet patching before/after package versions capture cheyyali."
          ]
        },
        {
          "heading": "5. APT and YUM/DNF Commands ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "apt update package index refresh; apt-cache policy candidate versions show chesthundi; dpkg -l installed state. DNF makecache metadata refresh; rpm -q installed package query; rpm -V installed files verify. Amazon Linux 2 often yum; newer Amazon Linux 2023 uses dnf."
          ],
          "bullets": [
            "1. APT: sources",
            "2. indexes",
            "3. dependency solver",
            "4. dpkg; DNF: repo metadata",
            "5. RPM dependency solver",
            "6. RPM database"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "# Ubuntu / Debian\nsudo apt update\napt-cache search nginx\napt-cache policy nginx\nsudo apt install nginx\ndpkg -l nginx\n# RHEL / Rocky / Amazon Linux variants\nsudo dnf makecache\ndnf search nginx\nsudo dnf install nginx\nrpm -q nginx\nrpm -V nginx",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Ansible or cloud-init provisioning lo OS family detect chesi package module use cheyyadam raw command hardcode cheyadam kanna portable. Fleet patching before/after package versions capture cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "apt install vs apt update; dnf vs legacy yum. Ansible package module OS-specific manager abstraction provide chesthundi. Repository config and package names distro batti vary avuthayi.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Configuration-management package module such as Ansible ansible.builtin.package use chesthanu, or OS family detect chesi apt/dnf tasks separate ga define chesthanu."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Debian package workflows and RPM-family package workflows. apt update package index refresh; apt-cache policy candidate versions show chesthundi; dpkg -l installed state. DNF makecache metadata refresh; rpm -q installed package query; rpm -V installed files verify. Amazon Linux 2 often yum; newer Amazon Linux 2023 uses dnf.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Ubuntu and RHEL-family disposable VMs lo package metadata refresh, package search and installed-version verification compare cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "How do you write a package install automation across Ubuntu and RHEL?",
          "answer": "Configuration-management package module such as Ansible ansible.builtin.package use chesthanu, or OS family detect chesi apt/dnf tasks separate ga define chesthanu."
        },
        {
          "question": "APT and YUM/DNF Commands lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Ubuntu and RHEL-family disposable VMs lo package metadata refresh, package search and installed-version verification compare cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/disk-and-partition-management": {
      "summary": "Linux Disk and Partition Management: Block devices, partitions, filesystems, capacity and safe disk expansion. EBS volume expand chesaka cloud volume size alone filesystem size ni automatically grow cheyyakapovachu. Partition layout, filesystem type and backup verify chesi growpart + resize2fs or xfs_growfs appropriate ga use cheyyali.",
      "diagram": {
        "title": "Linux Disk and Partition Management workflow and decision path",
        "nodes": [
          "Cloud block volume attached",
          "kernel detects device",
          "partition table (optional)",
          "filesystem created/grown",
          "mount",
          "application writes"
        ],
        "explanation": "Linux Disk and Partition Management lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Block device e.g. /dev/nvme1n1; partition e.g. /dev/nvme1n1p1; filesystem ext4/XFS; mount point directory. df reports filesystem capacity; du reports directory usage. Device names can change across boots/cloud instances; UUIDs more stable."
      },
      "sections": [
        {
          "heading": "1. Linux Disk and Partition Management ante enti?",
          "paragraphs": [
            "Block devices, partitions, filesystems, capacity and safe disk expansion. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Block devices, partitions, filesystems, capacity and safe disk expansion.",
            "DevOps relevance: EBS volume expand chesaka cloud volume size alone filesystem size ni automatically grow cheyyakapovachu. Partition layout, filesystem type and backup verify chesi growpart + resize2fs or xfs_growfs appropriate ga use cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Disk full or new storage attach ayinappudu block device identify, partition and filesystem capacity safely manage cheyyali.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "EC2 EBS volumes, database storage, log partitions and Kubernetes node disks.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "EBS volume expand chesaka cloud volume size alone filesystem size ni automatically grow cheyyakapovachu. Partition layout, filesystem type and backup verify chesi growpart + resize2fs or xfs_growfs appropriate ga use cheyyali."
          ]
        },
        {
          "heading": "5. Linux Disk and Partition Management ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Block device e.g. /dev/nvme1n1; partition e.g. /dev/nvme1n1p1; filesystem ext4/XFS; mount point directory. df reports filesystem capacity; du reports directory usage. Device names can change across boots/cloud instances; UUIDs more stable."
          ],
          "bullets": [
            "1. Cloud block volume attached",
            "2. kernel detects device",
            "3. partition table (optional)",
            "4. filesystem created/grown",
            "5. mount",
            "6. application writes"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "lsblk -f\nsudo fdisk -l\nsudo blkid\ndf -hT\ndu -xhd1 /var | sort -h\nfindmnt\n# Filesystem growth commands depend on filesystem and partition layout",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "EBS volume expand chesaka cloud volume size alone filesystem size ni automatically grow cheyyakapovachu. Partition layout, filesystem type and backup verify chesi growpart + resize2fs or xfs_growfs appropriate ga use cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "Partition table vs filesystem different. mkfs destructive; wrong device select chesthe data loss. lsblk, blkid, findmnt and backups verify before changes.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Deleted files open ga process hold chesthe directory entry gone but blocks allocated remain; lsof +L1 identify cheyochu. Reserved blocks, mount overlays and filesystem metadata also explain differences."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Block devices, partitions, filesystems, capacity and safe disk expansion. Block device e.g. /dev/nvme1n1; partition e.g. /dev/nvme1n1p1; filesystem ext4/XFS; mount point directory. df reports filesystem capacity; du reports directory usage. Device names can change across boots/cloud instances; UUIDs more stable.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Disposable loopback disk/VM lo lsblk and blkid inspect cheyyandi; production disk meeda mkfs/partition commands run cheyyakandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why can df show full disk when du does not explain usage?",
          "answer": "Deleted files open ga process hold chesthe directory entry gone but blocks allocated remain; lsof +L1 identify cheyochu. Reserved blocks, mount overlays and filesystem metadata also explain differences."
        },
        {
          "question": "Linux Disk and Partition Management lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Disposable loopback disk/VM lo lsblk and blkid inspect cheyyandi; production disk meeda mkfs/partition commands run cheyyakandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/lvm": {
      "summary": "Linux Logical Volume Manager (LVM): Physical volumes, volume groups, logical volumes, extents and online resizing. Database volume 95% usage reach ayithe new disk PV ga add chesi VG extend, LV grow and filesystem resize plan chestharu. Snapshot/backup and monitoring before change mandatory.",
      "diagram": {
        "title": "Linux Logical Volume Manager (LVM) workflow and decision path",
        "nodes": [
          "Physical disk/partition",
          "PV",
          "VG storage pool",
          "LV virtual block device",
          "filesystem",
          "mount point"
        ],
        "explanation": "Linux Logical Volume Manager (LVM) lo ee flow end-to-end ela work avuthundo diagram chupisthundi. PV physical volume; VG pool; LV virtual block device. LVM allocates extents from VG to LVs. Filesystem growth command ext4 and XFS ki different; XFS generally grows while mounted and cannot shrink with standard xfs tools."
      },
      "sections": [
        {
          "heading": "1. Linux Logical Volume Manager (LVM) ante enti?",
          "paragraphs": [
            "Physical volumes, volume groups, logical volumes, extents and online resizing. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Physical volumes, volume groups, logical volumes, extents and online resizing.",
            "DevOps relevance: Database volume 95% usage reach ayithe new disk PV ga add chesi VG extend, LV grow and filesystem resize plan chestharu. Snapshot/backup and monitoring before change mandatory."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Traditional partitions fixed layout. LVM storage pools nundi logical volumes create/resize cheyadaniki flexible layer provide chesthundi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Database volumes, application data growth, VM storage expansion and flexible server layouts.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Database volume 95% usage reach ayithe new disk PV ga add chesi VG extend, LV grow and filesystem resize plan chestharu. Snapshot/backup and monitoring before change mandatory."
          ]
        },
        {
          "heading": "5. Linux Logical Volume Manager (LVM) ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "PV physical volume; VG pool; LV virtual block device. LVM allocates extents from VG to LVs. Filesystem growth command ext4 and XFS ki different; XFS generally grows while mounted and cannot shrink with standard xfs tools."
          ],
          "bullets": [
            "1. Physical disk/partition",
            "2. PV",
            "3. VG storage pool",
            "4. LV virtual block device",
            "5. filesystem",
            "6. mount point"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "sudo pvs\nsudo vgs\nsudo lvs\nsudo pvdisplay\nsudo vgdisplay\nsudo lvdisplay\n# Example only after correct PV/VG/LV confirmed:\nsudo lvextend -L +5G /dev/vgdata/lvapp\n# ext4: sudo resize2fs /dev/vgdata/lvapp\n# XFS mounted path: sudo xfs_growfs /data",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Database volume 95% usage reach ayithe new disk PV ga add chesi VG extend, LV grow and filesystem resize plan chestharu. Snapshot/backup and monitoring before change mandatory.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "LVM flexibility provides; RAID and backup replace cheyyadu. LV extend capacity increase; filesystem resize separate step may be needed. Shrinking riskier and filesystem-specific.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: PV is a disk or partition initialized for LVM; VG pools one or more PVs; LV is a virtual block device allocated from the VG and formatted with a filesystem."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Physical volumes, volume groups, logical volumes, extents and online resizing. PV physical volume; VG pool; LV virtual block device. LVM allocates extents from VG to LVs. Filesystem growth command ext4 and XFS ki different; XFS generally grows while mounted and cannot shrink with standard xfs tools.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "VM lo pvs/vgs/lvs inspect cheyyandi; diagram draw chesi PV-to-VG-to-LV relationship explain cheyyandi. Live production volumes modify cheyyakandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is the difference between PV, VG and LV?",
          "answer": "PV is a disk or partition initialized for LVM; VG pools one or more PVs; LV is a virtual block device allocated from the VG and formatted with a filesystem."
        },
        {
          "question": "Linux Logical Volume Manager (LVM) lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "VM lo pvs/vgs/lvs inspect cheyyandi; diagram draw chesi PV-to-VG-to-LV relationship explain cheyyandi. Live production volumes modify cheyyakandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/mounting-and-fstab": {
      "summary": "Linux Mounting and /etc/fstab: Mount points, filesystem mounts, UUIDs, mount options and boot-time mounts. EC2 data volume reboot after same /data path lo mount avvali. fstab update mundu UUID and filesystem type verify chesi mount -a run chesi syntax test cheyyali.",
      "diagram": {
        "title": "Linux Mounting and /etc/fstab workflow and decision path",
        "nodes": [
          "Block/network filesystem",
          "mount command or fstab entry",
          "VFS mount table",
          "directory path access"
        ],
        "explanation": "Linux Mounting and /etc/fstab lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Linux VFS multiple filesystems ni common directory tree lo expose chesthundi. /etc/fstab fields: source, mount point, filesystem type, options, dump, fsck order. UUID device naming changes ki more reliable. nofail may allow boot continue when optional disk absent, but use carefully."
      },
      "sections": [
        {
          "heading": "1. Linux Mounting and /etc/fstab ante enti?",
          "paragraphs": [
            "Mount points, filesystem mounts, UUIDs, mount options and boot-time mounts. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Mount points, filesystem mounts, UUIDs, mount options and boot-time mounts.",
            "DevOps relevance: EC2 data volume reboot after same /data path lo mount avvali. fstab update mundu UUID and filesystem type verify chesi mount -a run chesi syntax test cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Storage device attach ayina filesystem accessible avvalante mount point ki attach cheyyali. Persistent mounts reboot taruvatha kuda available undali.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "EBS data volumes, NFS shares, application data paths and backup mounts.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "EC2 data volume reboot after same /data path lo mount avvali. fstab update mundu UUID and filesystem type verify chesi mount -a run chesi syntax test cheyyali."
          ]
        },
        {
          "heading": "5. Linux Mounting and /etc/fstab ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Linux VFS multiple filesystems ni common directory tree lo expose chesthundi. /etc/fstab fields: source, mount point, filesystem type, options, dump, fsck order. UUID device naming changes ki more reliable. nofail may allow boot continue when optional disk absent, but use carefully."
          ],
          "bullets": [
            "1. Block/network filesystem",
            "2. mount command or fstab entry",
            "3. VFS mount table",
            "4. directory path access"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "lsblk -f\nfindmnt\nsudo mkdir -p /data\nsudo mount UUID=<filesystem-uuid> /data\nfindmnt /data\nsudo umount /data\nsudo blkid",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "EC2 data volume reboot after same /data path lo mount avvali. fstab update mundu UUID and filesystem type verify chesi mount -a run chesi syntax test cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "mount current session; fstab persistent config. umount busy ayithe lsof/fuser inspect. noauto, _netdev, nofail and systemd automount have distinct behavior.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Kernel device names may vary based on discovery order. Filesystem UUID identifies filesystem more consistently, reducing wrong-device mount risk."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Mount points, filesystem mounts, UUIDs, mount options and boot-time mounts. Linux VFS multiple filesystems ni common directory tree lo expose chesthundi. /etc/fstab fields: source, mount point, filesystem type, options, dump, fsck order. UUID device naming changes ki more reliable. nofail may allow boot continue when optional disk absent, but use carefully.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Disposable VM lo UUID identify chesi test fstab entry add cheyyandi; sudo mount -a run chesi findmnt verify cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why prefer UUID in fstab?",
          "answer": "Kernel device names may vary based on discovery order. Filesystem UUID identifies filesystem more consistently, reducing wrong-device mount risk."
        },
        {
          "question": "Linux Mounting and /etc/fstab lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Disposable VM lo UUID identify chesi test fstab entry add cheyyandi; sudo mount -a run chesi findmnt verify cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/networking-commands": {
      "summary": "Linux Networking Commands: ip, ss, ping, traceroute, dig, curl, tcpdump and route diagnostics. Application port 8080 reachable kaakapothe process listening unda ss tho check, local curl, host firewall, cloud security group, route and remote client path compare chestharu.",
      "diagram": {
        "title": "Linux Networking Commands workflow and decision path",
        "nodes": [
          "Name resolution",
          "route selection",
          "interface/link",
          "TCP connection",
          "TLS/HTTP response"
        ],
        "explanation": "Linux Networking Commands lo ee flow end-to-end ela work avuthundo diagram chupisthundi. ip addr interfaces; ip route routing table; ss sockets/listeners; dig DNS query; curl HTTP/TLS behavior; traceroute path; tcpdump packet capture. Ping blocked ayina TCP service healthy undochu; one test result ni final proof ga assume cheyyakudadhu."
      },
      "sections": [
        {
          "heading": "1. Linux Networking Commands ante enti?",
          "paragraphs": [
            "ip, ss, ping, traceroute, dig, curl, tcpdump and route diagnostics. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: ip, ss, ping, traceroute, dig, curl, tcpdump and route diagnostics.",
            "DevOps relevance: Application port 8080 reachable kaakapothe process listening unda ss tho check, local curl, host firewall, cloud security group, route and remote client path compare chestharu."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Service unreachable issue application, DNS, route, firewall, port listener or TLS layer lo undochu. Layer-wise commands isolate root cause.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "EC2 connectivity, Kubernetes node diagnosis, service health checks and incident response.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Application port 8080 reachable kaakapothe process listening unda ss tho check, local curl, host firewall, cloud security group, route and remote client path compare chestharu."
          ]
        },
        {
          "heading": "5. Linux Networking Commands ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "ip addr interfaces; ip route routing table; ss sockets/listeners; dig DNS query; curl HTTP/TLS behavior; traceroute path; tcpdump packet capture. Ping blocked ayina TCP service healthy undochu; one test result ni final proof ga assume cheyyakudadhu."
          ],
          "bullets": [
            "1. Name resolution",
            "2. route selection",
            "3. interface/link",
            "4. TCP connection",
            "5. TLS/HTTP response"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "ip addr\nip route\nss -lntup\nping -c 4 1.1.1.1\ndig example.com\ncurl -v https://example.com\ntraceroute example.com\nsudo tcpdump -ni any port 443",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Application port 8080 reachable kaakapothe process listening unda ss tho check, local curl, host firewall, cloud security group, route and remote client path compare chestharu.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "DNS vs connectivity; ping uses ICMP; curl tests application protocol; ss local sockets; tcpdump packets. Packet capture lo secrets/PII undochu; authorized narrow filters only.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Confirm process listening with ss, test locally with curl/nc, resolve DNS, inspect route, host firewall and cloud network rules, then test from source network and review logs."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: ip, ss, ping, traceroute, dig, curl, tcpdump and route diagnostics. ip addr interfaces; ip route routing table; ss sockets/listeners; dig DNS query; curl HTTP/TLS behavior; traceroute path; tcpdump packet capture. Ping blocked ayina TCP service healthy undochu; one test result ni final proof ga assume cheyyakudadhu.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Local test server port create chesi ss and curl inspect cheyyandi; dig and ip route output interpret cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "How do you troubleshoot a port that is unreachable?",
          "answer": "Confirm process listening with ss, test locally with curl/nc, resolve DNS, inspect route, host firewall and cloud network rules, then test from source network and review logs."
        },
        {
          "question": "Linux Networking Commands lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Local test server port create chesi ss and curl inspect cheyyandi; dig and ip route output interpret cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/ssh-and-scp": {
      "summary": "SSH and SCP: SSH authentication, keys, known_hosts, config, secure copy and tunneling. Engineer bastion host through private EC2 instance ki connect avuthadu. CI runner short-lived deploy key or federated identity use chesthundi; long-lived shared private keys avoid cheyyali.",
      "diagram": {
        "title": "SSH and SCP workflow and decision path",
        "nodes": [
          "SSH client",
          "host key verification",
          "user authentication",
          "encrypted session",
          "remote shell or SCP/SFTP data transfer"
        ],
        "explanation": "SSH and SCP lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Private key client side secret; public key server authorized_keys lo. known_hosts server identity verify chesthundi; host-key warning blindly bypass cheyyakudadhu. chmod 700 ~/.ssh and 600 private key common safe modes. Modern scp uses SFTP protocol in current OpenSSH."
      },
      "sections": [
        {
          "heading": "1. SSH and SCP ante enti?",
          "paragraphs": [
            "SSH authentication, keys, known_hosts, config, secure copy and tunneling. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: SSH authentication, keys, known_hosts, config, secure copy and tunneling.",
            "DevOps relevance: Engineer bastion host through private EC2 instance ki connect avuthadu. CI runner short-lived deploy key or federated identity use chesthundi; long-lived shared private keys avoid cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Remote Linux management ki encrypted authentication and transport kavali. Password sharing and unencrypted file transfer avoid cheyadaniki SSH ecosystem use chestharu.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "EC2 administration, Git SSH access, automation, file copy and secure tunnels.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Engineer bastion host through private EC2 instance ki connect avuthadu. CI runner short-lived deploy key or federated identity use chesthundi; long-lived shared private keys avoid cheyyali."
          ]
        },
        {
          "heading": "5. SSH and SCP ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Private key client side secret; public key server authorized_keys lo. known_hosts server identity verify chesthundi; host-key warning blindly bypass cheyyakudadhu. chmod 700 ~/.ssh and 600 private key common safe modes. Modern scp uses SFTP protocol in current OpenSSH."
          ],
          "bullets": [
            "1. SSH client",
            "2. host key verification",
            "3. user authentication",
            "4. encrypted session",
            "5. remote shell or SCP/SFTP data transfer"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "ssh-keygen -t ed25519 -C 'devops-lab'\nssh-copy-id deploy@server.example\nssh -i ~/.ssh/devops-lab deploy@server.example\nscp ./artifact.tar.gz deploy@server.example:/tmp/\nssh -v deploy@server.example\nssh-keyscan -H server.example",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Engineer bastion host through private EC2 instance ki connect avuthadu. CI runner short-lived deploy key or federated identity use chesthundi; long-lived shared private keys avoid cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "SSH remote shell; SCP file transfer; SFTP interactive file transfer; port forwarding tunnels. Agent forwarding and ProxyJump security implications understand cheyyali.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Private key client daggara secret ga untundi; public key server authorized_keys lo store avuthundi. Authentication challenge response dwara private-key possession prove chesthundi without sending private key."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: SSH authentication, keys, known_hosts, config, secure copy and tunneling. Private key client side secret; public key server authorized_keys lo. known_hosts server identity verify chesthundi; host-key warning blindly bypass cheyyakudadhu. chmod 700 ~/.ssh and 600 private key common safe modes. Modern scp uses SFTP protocol in current OpenSSH.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Disposable VM lo ed25519 key create chesi known_hosts verify cheyyandi; test file scp cheyyandi; verbose SSH output lo auth method identify cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is the difference between public and private SSH keys?",
          "answer": "Private key client daggara secret ga untundi; public key server authorized_keys lo store avuthundi. Authentication challenge response dwara private-key possession prove chesthundi without sending private key."
        },
        {
          "question": "SSH and SCP lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Disposable VM lo ed25519 key create chesi known_hosts verify cheyyandi; test file scp cheyyandi; verbose SSH output lo auth method identify cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/cron-and-scheduling": {
      "summary": "Cron and Linux Job Scheduling: crontab syntax, cron daemon, environment, logs, at and systemd timers. 02:30 backup job run avuthundi; script lock file use chesi overlapping runs prevent chesthundi, logs and exit status capture chesthundi, alert failures send chesthundi.",
      "diagram": {
        "title": "Cron and Linux Job Scheduling workflow and decision path",
        "nodes": [
          "Cron daemon",
          "user crontab schedule match",
          "command in limited environment",
          "output/log/exit status"
        ],
        "explanation": "Cron and Linux Job Scheduling lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Cron five time fields and command accept chesthundi. Environment interactive shell laga undadu; PATH and working directory explicitly set cheyyali. Percent character has special meaning in crontab command; escape if literal. Output mail/log routing configure cheyyali."
      },
      "sections": [
        {
          "heading": "1. Cron and Linux Job Scheduling ante enti?",
          "paragraphs": [
            "crontab syntax, cron daemon, environment, logs, at and systemd timers. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: crontab syntax, cron daemon, environment, logs, at and systemd timers.",
            "DevOps relevance: 02:30 backup job run avuthundi; script lock file use chesi overlapping runs prevent chesthundi, logs and exit status capture chesthundi, alert failures send chesthundi."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Recurring backup, cleanup and report jobs manual ga run cheyadam unreliable. Scheduler defined time lo commands execute chesthundi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Nightly backup, certificate checks, log cleanup, scheduled reports and maintenance tasks.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "02:30 backup job run avuthundi; script lock file use chesi overlapping runs prevent chesthundi, logs and exit status capture chesthundi, alert failures send chesthundi."
          ]
        },
        {
          "heading": "5. Cron and Linux Job Scheduling ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Cron five time fields and command accept chesthundi. Environment interactive shell laga undadu; PATH and working directory explicitly set cheyyali. Percent character has special meaning in crontab command; escape if literal. Output mail/log routing configure cheyyali."
          ],
          "bullets": [
            "1. Cron daemon",
            "2. user crontab schedule match",
            "3. command in limited environment",
            "4. output/log/exit status"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "crontab -l\ncrontab -e\n# minute hour day-of-month month day-of-week\n# 30 2 * * * /usr/local/bin/backup.sh\nsystemctl status cron 2>/dev/null || systemctl status crond\njournalctl -u cron -n 50 --no-pager",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "02:30 backup job run avuthundi; script lock file use chesi overlapping runs prevent chesthundi, logs and exit status capture chesthundi, alert failures send chesthundi.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "Cron recurring; at one-time job; systemd timer calendar and monotonic schedules plus unit dependency/logging provide chesthundi. Timezone and daylight-saving behavior verify cheyyali.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Cron has minimal environment, different PATH, working directory, permissions and shell. Use absolute paths, explicit environment, logging and service account checks."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: crontab syntax, cron daemon, environment, logs, at and systemd timers. Cron five time fields and command accept chesthundi. Environment interactive shell laga undadu; PATH and working directory explicitly set cheyyali. Percent character has special meaning in crontab command; escape if literal. Output mail/log routing configure cheyyali.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Every minute harmless date command log ki write ayye cron entry create chesi verify chesi remove cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why does a cron job work manually but fail in cron?",
          "answer": "Cron has minimal environment, different PATH, working directory, permissions and shell. Use absolute paths, explicit environment, logging and service account checks."
        },
        {
          "question": "Cron and Linux Job Scheduling lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Every minute harmless date command log ki write ayye cron entry create chesi verify chesi remove cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/logs-and-journalctl": {
      "summary": "Linux Logs and journalctl: Syslog, journald, unit logs, kernel logs, rotation and incident timelines. After failed deployment, service logs by unit and time window collect chesi application release timestamp and system events correlate chestharu. Logs lo credentials/PII undakunda redaction and access control implement cheyyali.",
      "diagram": {
        "title": "Linux Logs and journalctl workflow and decision path",
        "nodes": [
          "Application/service",
          "stdout/stderr or syslog",
          "journald/files",
          "query by unit/time/priority",
          "incident timeline"
        ],
        "explanation": "Linux Logs and journalctl lo ee flow end-to-end ela work avuthundo diagram chupisthundi. journalctl -b current boot; -u unit filter; --since time filter; -p priority; -k kernel messages; -f follow. Traditional files /var/log vary by distro. Log rotation and retention controls disk usage."
      },
      "sections": [
        {
          "heading": "1. Linux Logs and journalctl ante enti?",
          "paragraphs": [
            "Syslog, journald, unit logs, kernel logs, rotation and incident timelines. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Syslog, journald, unit logs, kernel logs, rotation and incident timelines.",
            "DevOps relevance: After failed deployment, service logs by unit and time window collect chesi application release timestamp and system events correlate chestharu. Logs lo credentials/PII undakunda redaction and access control implement cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Service failure root cause logs lo evidence ga untundi. Logs ni timestamp and component basis lo correlate cheyadam incident response lo critical.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Boot failures, application errors, SSH access, systemd service failures and kernel events.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "After failed deployment, service logs by unit and time window collect chesi application release timestamp and system events correlate chestharu. Logs lo credentials/PII undakunda redaction and access control implement cheyyali."
          ]
        },
        {
          "heading": "5. Linux Logs and journalctl ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "journalctl -b current boot; -u unit filter; --since time filter; -p priority; -k kernel messages; -f follow. Traditional files /var/log vary by distro. Log rotation and retention controls disk usage."
          ],
          "bullets": [
            "1. Application/service",
            "2. stdout/stderr or syslog",
            "3. journald/files",
            "4. query by unit/time/priority",
            "5. incident timeline"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "journalctl -b\njournalctl -u nginx --since '1 hour ago'\njournalctl -p err -b\njournalctl -k -n 100\njournalctl -f\nsudo tail -n 100 /var/log/syslog",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "After failed deployment, service logs by unit and time window collect chesi application release timestamp and system events correlate chestharu. Logs lo credentials/PII undakunda redaction and access control implement cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "journald structured metadata and boot-aware queries; rsyslog/syslog files forwarding. dmesg kernel ring buffer recent events; journalctl -k persistent journal if configured.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Use journalctl -u service --since/--until or journalctl -b -1 for previous boot, provided persistent journal retention is configured. Check unit status and timestamps together."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Syslog, journald, unit logs, kernel logs, rotation and incident timelines. journalctl -b current boot; -u unit filter; --since time filter; -p priority; -k kernel messages; -f follow. Traditional files /var/log vary by distro. Log rotation and retention controls disk usage.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Known service journal query cheyyandi; error priority filter and previous boot logs available aa verify cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "How do you inspect logs for a service failure after reboot?",
          "answer": "Use journalctl -u service --since/--until or journalctl -b -1 for previous boot, provided persistent journal retention is configured. Check unit status and timestamps together."
        },
        {
          "question": "Linux Logs and journalctl lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Known service journal query cheyyandi; error priority filter and previous boot logs available aa verify cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/memory-and-cpu-monitoring": {
      "summary": "Linux CPU and Memory Monitoring: Load average, CPU utilization, memory, swap, OOM events and performance tools. EC2 app latency increase ayithe CPU utilization, load per core, memory available, swap activity, disk I/O and app thread metrics correlate chestharu before resizing.",
      "diagram": {
        "title": "Linux CPU and Memory Monitoring workflow and decision path",
        "nodes": [
          "Workload",
          "CPU scheduler and memory manager",
          "counters/sampling tools",
          "identify bottleneck",
          "correlate application latency"
        ],
        "explanation": "Linux CPU and Memory Monitoring lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Load average runnable plus uninterruptible tasks average; CPU core count tho compare cheyyali. free available memory includes reclaimable cache. Swap use alone not always failure; sustained swap-in/out and latency indicate pressure. OOM killer logs evidence provide chesthayi."
      },
      "sections": [
        {
          "heading": "1. Linux CPU and Memory Monitoring ante enti?",
          "paragraphs": [
            "Load average, CPU utilization, memory, swap, OOM events and performance tools. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Load average, CPU utilization, memory, swap, OOM events and performance tools.",
            "DevOps relevance: EC2 app latency increase ayithe CPU utilization, load per core, memory available, swap activity, disk I/O and app thread metrics correlate chestharu before resizing."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Slow server ni CPU saturation, memory pressure, swap thrashing or I/O wait cause cheyochu. Correct metric choose cheyyakapothe wrong scaling decision avuthundi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Production incident triage, VM sizing, container node capacity and performance baselines.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "EC2 app latency increase ayithe CPU utilization, load per core, memory available, swap activity, disk I/O and app thread metrics correlate chestharu before resizing."
          ]
        },
        {
          "heading": "5. Linux CPU and Memory Monitoring ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Load average runnable plus uninterruptible tasks average; CPU core count tho compare cheyyali. free available memory includes reclaimable cache. Swap use alone not always failure; sustained swap-in/out and latency indicate pressure. OOM killer logs evidence provide chesthayi."
          ],
          "bullets": [
            "1. Workload",
            "2. CPU scheduler and memory manager",
            "3. counters/sampling tools",
            "4. identify bottleneck",
            "5. correlate application latency"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "uptime\ntop\nfree -h\nvmstat 1 5\nmpstat 1 5\nps -eo pid,comm,%cpu,%mem --sort=-%mem | head\njournalctl -k | grep -i -E 'oom|out of memory'",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "EC2 app latency increase ayithe CPU utilization, load per core, memory available, swap activity, disk I/O and app thread metrics correlate chestharu before resizing.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "top live view; ps snapshot; vmstat system-wide CPU/memory/I/O; iostat storage I/O; sar historical stats if sysstat installed. Container cgroup limits host-level free output kanna different effective limit impose cheyochu.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: It represents average number of runnable and uninterruptible tasks over 1, 5 and 15 minutes. Interpret relative to CPU core count and I/O wait, not as CPU percentage."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Load average, CPU utilization, memory, swap, OOM events and performance tools. Load average runnable plus uninterruptible tasks average; CPU core count tho compare cheyyali. free available memory includes reclaimable cache. Swap use alone not always failure; sustained swap-in/out and latency indicate pressure. OOM killer logs evidence provide chesthayi.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "vmstat 1 5 and free -h run chesi columns explain cheyyandi; OOM messages search cheyyandi; top CPU/memory process identify cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What does load average mean?",
          "answer": "It represents average number of runnable and uninterruptible tasks over 1, 5 and 15 minutes. Interpret relative to CPU core count and I/O wait, not as CPU percentage."
        },
        {
          "question": "Linux CPU and Memory Monitoring lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "vmstat 1 5 and free -h run chesi columns explain cheyyandi; OOM messages search cheyyandi; top CPU/memory process identify cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/linux-security": {
      "summary": "Linux Security Fundamentals: Least privilege, patching, SSH hardening, firewall, MAC controls and audit. New EC2 image publish mundu CIS-aligned baseline scan, approved users, restricted inbound ports, EDR/monitoring agent and patch level verify chestharu. Emergency access path test cheyyali.",
      "diagram": {
        "title": "Linux Security Fundamentals workflow and decision path",
        "nodes": [
          "Threat model",
          "identity and access controls",
          "patch/config hardening",
          "network restrictions",
          "logging/audit",
          "periodic review"
        ],
        "explanation": "Linux Security Fundamentals lo ee flow end-to-end ela work avuthundo diagram chupisthundi. Security baseline includes unique accounts, MFA where possible, key-based SSH, least privilege, timely patches, minimal packages, encrypted transport, log retention and tested backups. SSH effective config sshd -T tho verify cheyyali; config changes reload mundu sshd -t."
      },
      "sections": [
        {
          "heading": "1. Linux Security Fundamentals ante enti?",
          "paragraphs": [
            "Least privilege, patching, SSH hardening, firewall, MAC controls and audit. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Least privilege, patching, SSH hardening, firewall, MAC controls and audit.",
            "DevOps relevance: New EC2 image publish mundu CIS-aligned baseline scan, approved users, restricted inbound ports, EDR/monitoring agent and patch level verify chestharu. Emergency access path test cheyyali."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Linux server exposed ayithe weak accounts, unpatched packages, excess privileges and open ports compromise risk create chesthayi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Cloud VM baseline hardening, production server build, compliance checks and incident response.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "New EC2 image publish mundu CIS-aligned baseline scan, approved users, restricted inbound ports, EDR/monitoring agent and patch level verify chestharu. Emergency access path test cheyyali."
          ]
        },
        {
          "heading": "5. Linux Security Fundamentals ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "Security baseline includes unique accounts, MFA where possible, key-based SSH, least privilege, timely patches, minimal packages, encrypted transport, log retention and tested backups. SSH effective config sshd -T tho verify cheyyali; config changes reload mundu sshd -t."
          ],
          "bullets": [
            "1. Threat model",
            "2. identity and access controls",
            "3. patch/config hardening",
            "4. network restrictions",
            "5. logging/audit",
            "6. periodic review"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "sudo apt update && apt list --upgradable\nsudo ss -lntup\nsudo systemctl --failed\nsudo passwd -S deploy\nsudo sshd -T | grep -E 'permitrootlogin|passwordauthentication'\nsudo journalctl -p warning -b",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "New EC2 image publish mundu CIS-aligned baseline scan, approved users, restricted inbound ports, EDR/monitoring agent and patch level verify chestharu. Emergency access path test cheyyali.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "Authentication vs authorization; firewall vs SELinux/AppArmor; encryption at rest vs transit. Hardening changes lockout risk create cheyochu; out-of-band recovery and staged rollout plan avasaram.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Each user, process or service ki task complete cheyadaniki avasaramaina minimum permissions matrame grant cheyadam. Dedicated service accounts and narrow sudo policies examples."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Least privilege, patching, SSH hardening, firewall, MAC controls and audit. Security baseline includes unique accounts, MFA where possible, key-based SSH, least privilege, timely patches, minimal packages, encrypted transport, log retention and tested backups. SSH effective config sshd -T tho verify cheyyali; config changes reload mundu sshd -t.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Disposable VM security review checklist perform cheyyandi: users, listening ports, pending updates, SSH effective config and failed services inspect cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is least privilege?",
          "answer": "Each user, process or service ki task complete cheyadaniki avasaramaina minimum permissions matrame grant cheyadam. Dedicated service accounts and narrow sudo policies examples."
        },
        {
          "question": "Linux Security Fundamentals lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Disposable VM security review checklist perform cheyyandi: users, listening ports, pending updates, SSH effective config and failed services inspect cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/firewall-basics": {
      "summary": "Linux Firewall Basics: nftables, firewalld, UFW, zones, rules, ports and stateful filtering. EC2 Nginx host lo 80/443 allow, SSH only corporate CIDR nundi allow, database port public ga expose cheyyaru. AWS security groups and host firewall both review chestharu.",
      "diagram": {
        "title": "Linux Firewall Basics workflow and decision path",
        "nodes": [
          "Packet arrives",
          "interface/zone",
          "firewall rules and connection state",
          "allow or drop",
          "application listener"
        ],
        "explanation": "Linux Firewall Basics lo ee flow end-to-end ela work avuthundo diagram chupisthundi. UFW Ubuntu lo simplified frontend; firewalld zones and services abstraction; nftables modern Linux packet filtering framework. Rule order, default policy and established connection handling important. SSH allow rule confirm cheyakunda firewall enable chesthe remote lockout avvachu."
      },
      "sections": [
        {
          "heading": "1. Linux Firewall Basics ante enti?",
          "paragraphs": [
            "nftables, firewalld, UFW, zones, rules, ports and stateful filtering. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: nftables, firewalld, UFW, zones, rules, ports and stateful filtering.",
            "DevOps relevance: EC2 Nginx host lo 80/443 allow, SSH only corporate CIDR nundi allow, database port public ga expose cheyyaru. AWS security groups and host firewall both review chestharu."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Host firewall inbound/outbound traffic ni restrict chesi exposed attack surface reduce chesthundi. Cloud security group alone host-level policy replacement kaadu.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "SSH, web ports, database private access, node services and layered cloud security.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "EC2 Nginx host lo 80/443 allow, SSH only corporate CIDR nundi allow, database port public ga expose cheyyaru. AWS security groups and host firewall both review chestharu."
          ]
        },
        {
          "heading": "5. Linux Firewall Basics ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "UFW Ubuntu lo simplified frontend; firewalld zones and services abstraction; nftables modern Linux packet filtering framework. Rule order, default policy and established connection handling important. SSH allow rule confirm cheyakunda firewall enable chesthe remote lockout avvachu."
          ],
          "bullets": [
            "1. Packet arrives",
            "2. interface/zone",
            "3. firewall rules and connection state",
            "4. allow or drop",
            "5. application listener"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "sudo ufw status verbose\nsudo ufw allow 22/tcp\nsudo ufw allow 80/tcp\nsudo ufw status numbered\nsudo firewall-cmd --state 2>/dev/null || true\nsudo nft list ruleset",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "EC2 Nginx host lo 80/443 allow, SSH only corporate CIDR nundi allow, database port public ga expose cheyyaru. AWS security groups and host firewall both review chestharu.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "Security group cloud virtual firewall; host firewall OS level. TCP port open undadam service listening undani guarantee kaadu; ss and curl too verify cheyyali.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: They enforce controls at different layers. Cloud security group limits traffic reaching instance ENI; host firewall adds local defense-in-depth and workload-specific filtering."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: nftables, firewalld, UFW, zones, rules, ports and stateful filtering. UFW Ubuntu lo simplified frontend; firewalld zones and services abstraction; nftables modern Linux packet filtering framework. Rule order, default policy and established connection handling important. SSH allow rule confirm cheyakunda firewall enable chesthe remote lockout avvachu.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "Disposable VM lo current SSH access confirm chesi only test rule inspect cheyyandi; remote firewall policy changes production lo approval and rollback path lekunda cheyyakandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why use both cloud security groups and host firewall?",
          "answer": "They enforce controls at different layers. Cloud security group limits traffic reaching instance ENI; host firewall adds local defense-in-depth and workload-specific filtering."
        },
        {
          "question": "Linux Firewall Basics lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "Disposable VM lo current SSH access confirm chesi only test rule inspect cheyyandi; remote firewall policy changes production lo approval and rollback path lekunda cheyyakandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    },
    "linux/troubleshooting-linux": {
      "summary": "Linux Troubleshooting Methodology: Layered diagnosis, evidence collection, resource checks, logs and safe remediation. Nginx down incident: systemctl status nginx; nginx -t; journalctl -u nginx; ss -lntp; df -h; config diff. Syntax issue fix chesi controlled reload, local curl and external health check verify chestharu.",
      "diagram": {
        "title": "Linux Troubleshooting Methodology workflow and decision path",
        "nodes": [
          "Define symptom and impact",
          "collect evidence",
          "isolate layer",
          "test hypothesis",
          "approved remediation",
          "verify and document"
        ],
        "explanation": "Linux Troubleshooting Methodology lo ee flow end-to-end ela work avuthundo diagram chupisthundi. First exact host, time, affected service and recent change capture cheyyali. Read-only diagnostics first. One variable at a time change cheyyali; before/after metrics compare cheyyali. Commands distribution and service names batti adapt cheyyali."
      },
      "sections": [
        {
          "heading": "1. Linux Troubleshooting Methodology ante enti?",
          "paragraphs": [
            "Layered diagnosis, evidence collection, resource checks, logs and safe remediation. Simple ga cheppalante, ee concept Linux system lo specific responsibility ni handle chesthundi; administrator command run chesinappudu system state ni ela observe or change chesthundo ardham chesukovali.",
            "Beginner ki important point: command name memorize cheyadam matrame kaadu. Command ye resource ni read/change chesthundi, required privilege enti, output ni ela verify cheyyali anevi kuda teliyali."
          ],
          "bullets": [
            "Core purpose: Layered diagnosis, evidence collection, resource checks, logs and safe remediation.",
            "DevOps relevance: Nginx down incident: systemctl status nginx; nginx -t; journalctl -u nginx; ss -lntp; df -h; config diff. Syntax issue fix chesi controlled reload, local curl and external health check verify chestharu."
          ]
        },
        {
          "heading": "2. Ee concept enduku avasaram?",
          "paragraphs": [
            "Production incidents lo guess-based restarts cause evidence loss and repeat outage. Structured troubleshooting root cause isolate chesi safe recovery support chesthundi.",
            "Ee capability lekunda manual operations inconsistent avuthayi, incident time lo diagnosis slow avuthundi, and production changes lo human error risk peruguthundi. Standard commands and documented workflow repeatable operations create chesthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Service down, high CPU, disk full, SSH failure, DNS issue and boot failure.",
            "Task execute cheyadaniki mundu target host correct aa, command read-only aa destructive aa, sudo avasaram aa, maintenance approval unda ani check cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Cloud Linux VMs, on-prem servers, container hosts, Kubernetes worker nodes, CI/CD runners and automation scripts lo ee topic practical ga apply avuthundi. Exact use case environment and distribution batti maruthundi.",
            "Nginx down incident: systemctl status nginx; nginx -t; journalctl -u nginx; ss -lntp; df -h; config diff. Syntax issue fix chesi controlled reload, local curl and external health check verify chestharu."
          ]
        },
        {
          "heading": "5. Linux Troubleshooting Methodology ela work avuthundi?",
          "paragraphs": [
            "Diagram lo chupinchina flow ni step-by-step follow avvali: 1) input or request identify cheyyali; 2) Linux identity/configuration and current state inspect cheyyali; 3) system relevant policy/resource evaluate chesthundi; 4) operation execute or deny avuthundi; 5) command output, service state or logs dwara result verify cheyyali.",
            "First exact host, time, affected service and recent change capture cheyyali. Read-only diagnostics first. One variable at a time change cheyyali; before/after metrics compare cheyyali. Commands distribution and service names batti adapt cheyyali."
          ],
          "bullets": [
            "1. Define symptom and impact",
            "2. collect evidence",
            "3. isolate layer",
            "4. test hypothesis",
            "5. approved remediation",
            "6. verify and document"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha commands ee topic ni disposable Linux VM lo practice cheyadaniki. First read-only inspection commands run cheyyandi; sudo commands use chese mundu target and impact verify cheyyandi.",
            "Command-by-command ga output ni observe cheyyandi. Distro batti package names, service names and file paths vary avvachu."
          ],
          "code": "date -Is\nhostnamectl\nuptime\nsystemctl --failed\ndf -hT\nfree -h\nps aux --sort=-%cpu | head\nss -lntup\njournalctl -p err -b --no-pager | tail -100\nfindmnt",
          "note": "Production lo destructive command, recursive permission/ownership change, disk formatting, firewall update or service restart mundu backup, approval and rollback plan mandatory."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Nginx down incident: systemctl status nginx; nginx -t; journalctl -u nginx; ss -lntp; df -h; config diff. Syntax issue fix chesi controlled reload, local curl and external health check verify chestharu.",
            "Incident resolution lo before/after evidence capture cheyyali. Change tarvatha expected service health, access, metrics or logs verify cheyyali; only command success message ni complete validation ga consider cheyyakudadhu."
          ]
        },
        {
          "heading": "8. Related concepts, comparison and best practices",
          "paragraphs": [
            "Symptom vs root cause; restart is recovery action not diagnosis. Disk full, permission denied, port conflict and dependency failure have different evidence. Preserve logs before cleanup.",
            "Best practices: least privilege follow cheyyandi; commands ni version-controlled runbooks lo document cheyyandi; environment-specific assumptions verify cheyyandi; secrets terminal history and logs lo leak kakunda chudandi; change taruvatha verification and rollback steps prepare cheyyandi."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, problem solved, internal workflow, real production example and safety considerations explain cheyyandi.",
            "Sample answer: Check systemctl status and journal logs, validate service configuration, inspect port conflicts, permissions, disk/memory, dependencies and recent changes. Apply minimal approved fix and verify health from local and client perspectives."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Layered diagnosis, evidence collection, resource checks, logs and safe remediation. First exact host, time, affected service and recent change capture cheyyali. Read-only diagnostics first. One variable at a time change cheyyali; before/after metrics compare cheyyali. Commands distribution and service names batti adapt cheyyali.",
            "Practice ni disposable VM/container lo perform chesi expected output and failure output compare cheyyandi."
          ],
          "bullets": [
            "One failing service in disposable VM create cheyyandi (invalid test config), systemctl/journalctl evidence collect chesi config restore and service verify cheyyandi.",
            "Command output lo important fields identify chesi own words lo explain cheyyandi.",
            "One failure condition simulate chesi logs/evidence collect cheyyandi.",
            "Change mundu and tarvatha system state compare chesi rollback approach document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "How do you troubleshoot a Linux service that will not start?",
          "answer": "Check systemctl status and journal logs, validate service configuration, inspect port conflicts, permissions, disk/memory, dependencies and recent changes. Apply minimal approved fix and verify health from local and client perspectives."
        },
        {
          "question": "Linux Troubleshooting Methodology lo production safety ela maintain chestharu?",
          "answer": "First read-only checks tho current state and impact collect chesthanu. Least privilege follow chesi exact target verify chesthanu. Destructive changes mundu backup/approval/rollback prepare chesi, change tarvatha service and logs verify chesthanu."
        }
      ],
      "handsOn": [
        "One failing service in disposable VM create cheyyandi (invalid test config), systemctl/journalctl evidence collect chesi config restore and service verify cheyyandi.",
        "Relevant command output ni text file lo capture chesi explanation rayandi.",
        "Failure scenario create chesi safe recovery and verification practice cheyyandi."
      ]
    }
  }
  ...{
    "git-github/version-control-concepts": {
      "summary": "Version Control Concepts: Track file history, compare revisions, collaborate safely and recover earlier states.. A production bug is introduced in a release. Team uses commit history and tags to identify the change, revert it safely and review the fix before redeploying.",
      "diagram": {
        "title": "Version Control Concepts workflow",
        "nodes": [
          "Developer edits files",
          "version control records snapshots or deltas",
          "branches isolate work",
          "review integrates changes",
          "history supports recovery."
        ],
        "explanation": "Version Control Concepts workflow lo ee stages order lo execute avuthayi. Version control can be local or distributed. Git is distributed: each clone contains repository history. A commit records a snapshot reference, metadata and parent relationship; it is not simply a backup of the working directory."
      },
      "sections": [
        {
          "heading": "1. Version Control Concepts ante enti?",
          "paragraphs": [
            "Track file history, compare revisions, collaborate safely and recover earlier states. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Track file history, compare revisions, collaborate safely and recover earlier states.",
            "DevOps use: A production bug is introduced in a release. Team uses commit history and tags to identify the change, revert it safely and review the fix before redeploying."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Teams need a reliable history of who changed code, why it changed and how to restore a known-good version.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Solo development, team collaboration, release management, audit trails and incident rollback.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "A production bug is introduced in a release. Team uses commit history and tags to identify the change, revert it safely and review the fix before redeploying."
          ]
        },
        {
          "heading": "5. Version Control Concepts ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Developer edits files; 2) version control records snapshots or deltas; 3) branches isolate work; 4) review integrates changes; 5) history supports recovery..",
            "Internal behavior: Version control can be local or distributed. Git is distributed: each clone contains repository history. A commit records a snapshot reference, metadata and parent relationship; it is not simply a backup of the working directory."
          ],
          "bullets": [
            "1. Developer edits files",
            "2. version control records snapshots or deltas",
            "3. branches isolate work",
            "4. review integrates changes",
            "5. history supports recovery."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git --version\ngit status\ngit log --oneline --decorate --all\ngit diff\n git diff --staged",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "A production bug is introduced in a release. Team uses commit history and tags to identify the change, revert it safely and review the fix before redeploying.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Centralized VCS depends on a central server for history operations; distributed Git allows local commits and branching. Git does not replace remote backup, code review or CI.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: It records changes over time, enables parallel work, supports review and traceability, and provides controlled ways to compare or restore code."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Track file history, compare revisions, collaborate safely and recover earlier states.. Version control can be local or distributed. Git is distributed: each clone contains repository history. A commit records a snapshot reference, metadata and parent relationship; it is not simply a backup of the working directory.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create a local repository, make two commits, inspect git log and compare versions with git diff.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What problem does version control solve?",
          "answer": "It records changes over time, enables parallel work, supports review and traceability, and provides controlled ways to compare or restore code."
        },
        {
          "question": "Version Control Concepts use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create a local repository, make two commits, inspect git log and compare versions with git diff.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/git-architecture": {
      "summary": "Git Architecture: Understand working tree, index, local repository, objects, refs, HEAD and remote tracking references.. A developer stages only a tested config change while leaving unrelated debug edits unstaged, then commits and pushes the intended snapshot.",
      "diagram": {
        "title": "Git Architecture workflow",
        "nodes": [
          "Working tree edits",
          "index/staging snapshot",
          "commit object in local object database",
          "branch ref and HEAD move",
          "push transfers commits to remote."
        ],
        "explanation": "Git Architecture workflow lo ee stages order lo execute avuthayi. Working tree contains checked-out files; index stores next commit content; object database stores blobs, trees and commits; refs name commits; HEAD identifies current checkout. Remote-tracking refs such as origin/main are local observations of remote branches."
      },
      "sections": [
        {
          "heading": "1. Git Architecture ante enti?",
          "paragraphs": [
            "Understand working tree, index, local repository, objects, refs, HEAD and remote tracking references. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Understand working tree, index, local repository, objects, refs, HEAD and remote tracking references.",
            "DevOps use: A developer stages only a tested config change while leaving unrelated debug edits unstaged, then commits and pushes the intended snapshot."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Knowing Git's internal areas explains why edits, staged files, commits and remote pushes are separate actions.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "When a file appears modified but is not committed, when staging is selective, and when diagnosing branch or remote state.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "A developer stages only a tested config change while leaving unrelated debug edits unstaged, then commits and pushes the intended snapshot."
          ]
        },
        {
          "heading": "5. Git Architecture ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Working tree edits; 2) index/staging snapshot; 3) commit object in local object database; 4) branch ref and HEAD move; 5) push transfers commits to remote..",
            "Internal behavior: Working tree contains checked-out files; index stores next commit content; object database stores blobs, trees and commits; refs name commits; HEAD identifies current checkout. Remote-tracking refs such as origin/main are local observations of remote branches."
          ],
          "bullets": [
            "1. Working tree edits",
            "2. index/staging snapshot",
            "3. commit object in local object database",
            "4. branch ref and HEAD move",
            "5. push transfers commits to remote."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git status\ngit add app.js\ngit diff\ngit diff --staged\ngit commit -m 'Add app feature'\ngit show --stat HEAD\ngit branch -avv",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "A developer stages only a tested config change while leaving unrelated debug edits unstaged, then commits and pushes the intended snapshot.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "git diff compares working tree to index; git diff --staged compares index to HEAD. A branch is a movable ref, not a separate copy of all files.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Working tree is where I edit files, index is where I prepare the exact next commit, and local repository stores committed history and references."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Understand working tree, index, local repository, objects, refs, HEAD and remote tracking references.. Working tree contains checked-out files; index stores next commit content; object database stores blobs, trees and commits; refs name commits; HEAD identifies current checkout. Remote-tracking refs such as origin/main are local observations of remote branches.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Make two file edits, stage only one, compare both diff commands, commit and inspect git show.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Explain Git's three main areas.",
          "answer": "Working tree is where I edit files, index is where I prepare the exact next commit, and local repository stores committed history and references."
        },
        {
          "question": "Git Architecture use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Make two file edits, stage only one, compare both diff commands, commit and inspect git show.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/git-installation-and-configuration": {
      "summary": "Git Installation and Configuration: Install Git and configure identity, default branch, editor, line endings and scoped settings.. A team standardizes main as default branch and configures developer identity. CI jobs set bot identity explicitly for automated commits only when needed.",
      "diagram": {
        "title": "Git Installation and Configuration workflow",
        "nodes": [
          "Install Git package",
          "configure system/global/local settings",
          "verify effective config",
          "initialize or clone repository."
        ],
        "explanation": "Git Installation and Configuration workflow lo ee stages order lo execute avuthayi. System config applies broadly; global config applies to user; local config applies to current repository and overrides broader values. user.name/email are commit metadata, not GitHub authentication credentials. Avoid putting secrets in config."
      },
      "sections": [
        {
          "heading": "1. Git Installation and Configuration ante enti?",
          "paragraphs": [
            "Install Git and configure identity, default branch, editor, line endings and scoped settings. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Install Git and configure identity, default branch, editor, line endings and scoped settings.",
            "DevOps use: A team standardizes main as default branch and configures developer identity. CI jobs set bot identity explicitly for automated commits only when needed."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Git needs a consistent identity and predictable client behavior so commits and collaboration workflows work correctly.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "New developer laptop, CI runner setup, container build image and repository-specific conventions.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "A team standardizes main as default branch and configures developer identity. CI jobs set bot identity explicitly for automated commits only when needed."
          ]
        },
        {
          "heading": "5. Git Installation and Configuration ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Install Git package; 2) configure system/global/local settings; 3) verify effective config; 4) initialize or clone repository..",
            "Internal behavior: System config applies broadly; global config applies to user; local config applies to current repository and overrides broader values. user.name/email are commit metadata, not GitHub authentication credentials. Avoid putting secrets in config."
          ],
          "bullets": [
            "1. Install Git package",
            "2. configure system/global/local settings",
            "3. verify effective config",
            "4. initialize or clone repository."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git --version\ngit config --global user.name 'Dev User'\ngit config --global user.email 'dev@example.com'\ngit config --global init.defaultBranch main\ngit config --list --show-origin\ngit config --local --list",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "A team standardizes main as default branch and configures developer identity. CI jobs set bot identity explicitly for automated commits only when needed.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Git identity vs GitHub login are different. Credential helpers store authentication; user.email appears in commit metadata. core.autocrlf behavior depends on OS and team .gitattributes policy.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: No. It sets commit author/committer metadata. Authentication to GitHub uses HTTPS credentials, a credential manager, SSH keys or supported token/OIDC flows."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Install Git and configure identity, default branch, editor, line endings and scoped settings.. System config applies broadly; global config applies to user; local config applies to current repository and overrides broader values. user.name/email are commit metadata, not GitHub authentication credentials. Avoid putting secrets in config.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Install Git in a lab VM, set global identity, override local identity in one repository and inspect config origin.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Does git config user.email authenticate to GitHub?",
          "answer": "No. It sets commit author/committer metadata. Authentication to GitHub uses HTTPS credentials, a credential manager, SSH keys or supported token/OIDC flows."
        },
        {
          "question": "Git Installation and Configuration use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Install Git in a lab VM, set global identity, override local identity in one repository and inspect config origin.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/repositories": {
      "summary": "Git Repositories: Create, inspect and maintain repositories containing tracked content and commit history.. Team clones one service repository, creates feature branches and uses pull requests to merge reviewed changes to main.",
      "diagram": {
        "title": "Git Repositories workflow",
        "nodes": [
          "Repository directory",
          ".git metadata and object database",
          "working tree checkout",
          "commits and refs evolve."
        ],
        "explanation": "Git Repositories workflow lo ee stages order lo execute avuthayi. A normal repository has a working tree and .git directory. A bare repository has no checked-out working tree and is commonly used as a server-side remote. Clone copies history and checks out a working tree."
      },
      "sections": [
        {
          "heading": "1. Git Repositories ante enti?",
          "paragraphs": [
            "Create, inspect and maintain repositories containing tracked content and commit history. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Create, inspect and maintain repositories containing tracked content and commit history.",
            "DevOps use: Team clones one service repository, creates feature branches and uses pull requests to merge reviewed changes to main."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "A repository creates a boundary for versioned source, history, refs and configuration.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Starting a project, cloning an existing codebase, splitting services and managing multiple environments.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Team clones one service repository, creates feature branches and uses pull requests to merge reviewed changes to main."
          ]
        },
        {
          "heading": "5. Git Repositories ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Repository directory; 2) .git metadata and object database; 3) working tree checkout; 4) commits and refs evolve..",
            "Internal behavior: A normal repository has a working tree and .git directory. A bare repository has no checked-out working tree and is commonly used as a server-side remote. Clone copies history and checks out a working tree."
          ],
          "bullets": [
            "1. Repository directory",
            "2. .git metadata and object database",
            "3. working tree checkout",
            "4. commits and refs evolve."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git init my-app\ncd my-app\ngit rev-parse --show-toplevel\ngit status\nls -la .git\ngit clone https://github.com/ORG/REPO.git",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Team clones one service repository, creates feature branches and uses pull requests to merge reviewed changes to main.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Repository vs working directory: repository includes Git metadata/history; working directory is checked-out files. Monorepo contains multiple projects; polyrepo separates them.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Git metadata including objects, refs, configuration, index and repository state. The working files are checked out separately in a non-bare repository."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Create, inspect and maintain repositories containing tracked content and commit history.. A normal repository has a working tree and .git directory. A bare repository has no checked-out working tree and is commonly used as a server-side remote. Clone copies history and checks out a working tree.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Initialize a repository, inspect .git, create a commit, then clone it to another directory.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is stored inside .git?",
          "answer": "Git metadata including objects, refs, configuration, index and repository state. The working files are checked out separately in a non-bare repository."
        },
        {
          "question": "Git Repositories use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Initialize a repository, inspect .git, create a commit, then clone it to another directory.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/working-tree-and-staging-area": {
      "summary": "Working Tree and Staging Area: Understand untracked, modified, staged and committed file states.. Developer has a feature change and temporary debug logging. They stage only the feature, inspect staged diff and commit it independently.",
      "diagram": {
        "title": "Working Tree and Staging Area workflow",
        "nodes": [
          "File edit",
          "working-tree diff",
          "git add updates index",
          "staged diff review",
          "commit records index snapshot."
        ],
        "explanation": "Working Tree and Staging Area workflow lo ee stages order lo execute avuthayi. Untracked means Git is not tracking the file. Modified means tracked content differs from index. Staged means index differs from HEAD. git restore --staged unstages while preserving working-tree edits."
      },
      "sections": [
        {
          "heading": "1. Working Tree and Staging Area ante enti?",
          "paragraphs": [
            "Understand untracked, modified, staged and committed file states. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Understand untracked, modified, staged and committed file states.",
            "DevOps use: Developer has a feature change and temporary debug logging. They stage only the feature, inspect staged diff and commit it independently."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Staging lets developers choose exactly which changes belong in the next commit, preventing unrelated edits from being bundled.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Before every commit, when reviewing partial changes and when resolving merge conflicts.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Developer has a feature change and temporary debug logging. They stage only the feature, inspect staged diff and commit it independently."
          ]
        },
        {
          "heading": "5. Working Tree and Staging Area ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) File edit; 2) working-tree diff; 3) git add updates index; 4) staged diff review; 5) commit records index snapshot..",
            "Internal behavior: Untracked means Git is not tracking the file. Modified means tracked content differs from index. Staged means index differs from HEAD. git restore --staged unstages while preserving working-tree edits."
          ],
          "bullets": [
            "1. File edit",
            "2. working-tree diff",
            "3. git add updates index",
            "4. staged diff review",
            "5. commit records index snapshot."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git status --short\ngit diff\n git add src/app.ts\ngit diff --cached\ngit restore --staged src/app.ts\ngit status",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Developer has a feature change and temporary debug logging. They stage only the feature, inspect staged diff and commit it independently.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "git add stages content; git commit records staged content. git restore file discards working-tree edits and can destroy work, so inspect first.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: It shows the exact content that will be committed, helping catch secrets, debug code, unrelated edits and accidental file changes."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Understand untracked, modified, staged and committed file states.. Untracked means Git is not tracking the file. Modified means tracked content differs from index. Staged means index differs from HEAD. git restore --staged unstages while preserving working-tree edits.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Edit two files, stage one, compare status and both diff views, then unstage without losing edits.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why review git diff --staged before commit?",
          "answer": "It shows the exact content that will be committed, helping catch secrets, debug code, unrelated edits and accidental file changes."
        },
        {
          "question": "Working Tree and Staging Area use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Edit two files, stage one, compare status and both diff views, then unstage without losing edits.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/git-init-and-clone": {
      "summary": "git init and git clone: Create a new local repository or copy an existing remote repository and its history.. New microservice begins with git init and first commit, then a GitHub remote is created and added. Existing project is cloned for local work.",
      "diagram": {
        "title": "git init and git clone workflow",
        "nodes": [
          "New project: directory",
          "git init",
          "files and commits. Existing project: remote URL",
          "clone",
          "local repository plus checkout."
        ],
        "explanation": "git init and git clone workflow lo ee stages order lo execute avuthayi. git init creates repository metadata; it does not create a GitHub repository. git clone downloads remote history and sets origin by default. Use shallow clone only when reduced history is acceptable for the workflow."
      },
      "sections": [
        {
          "heading": "1. git init and git clone ante enti?",
          "paragraphs": [
            "Create a new local repository or copy an existing remote repository and its history. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Create a new local repository or copy an existing remote repository and its history.",
            "DevOps use: New microservice begins with git init and first commit, then a GitHub remote is created and added. Existing project is cloned for local work."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Developers either start a new project or join an existing project; these commands establish the local Git repository.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Project bootstrap, onboarding, CI checkout and reproducing a bug from a remote repository.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "New microservice begins with git init and first commit, then a GitHub remote is created and added. Existing project is cloned for local work."
          ]
        },
        {
          "heading": "5. git init and git clone ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) New project: directory; 2) git init; 3) files and commits. Existing project: remote URL; 4) clone; 5) local repository plus checkout..",
            "Internal behavior: git init creates repository metadata; it does not create a GitHub repository. git clone downloads remote history and sets origin by default. Use shallow clone only when reduced history is acceptable for the workflow."
          ],
          "bullets": [
            "1. New project: directory",
            "2. git init",
            "3. files and commits. Existing project: remote URL",
            "4. clone",
            "5. local repository plus checkout."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "mkdir demo && cd demo\ngit init -b main\ngit status\ncd ..\ngit clone https://github.com/git/git.git git-source\ngit -C git-source remote -v",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "New microservice begins with git init and first commit, then a GitHub remote is created and added. Existing project is cloned for local work.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "init creates; clone copies an existing remote. Clone URL can be HTTPS or SSH; access permissions still apply.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: No. It initializes a local repository. To publish, create a remote repository, add it with git remote add origin URL, then push a branch."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Create a new local repository or copy an existing remote repository and its history.. git init creates repository metadata; it does not create a GitHub repository. git clone downloads remote history and sets origin by default. Use shallow clone only when reduced history is acceptable for the workflow.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Initialize a local repo and clone a public sample repo; inspect .git and remote -v.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Does git init upload code to GitHub?",
          "answer": "No. It initializes a local repository. To publish, create a remote repository, add it with git remote add origin URL, then push a branch."
        },
        {
          "question": "git init and git clone use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Initialize a local repo and clone a public sample repo; inspect .git and remote -v.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/git-add-and-commit": {
      "summary": "git add and git commit: Stage selected file content and record it as a permanent local history snapshot.. A developer makes one commit for a health-check endpoint and another for documentation so each can be reviewed and reverted separately.",
      "diagram": {
        "title": "git add and git commit workflow",
        "nodes": [
          "Edit files",
          "git add selects snapshot",
          "staged diff review",
          "git commit creates commit object and advances current branch."
        ],
        "explanation": "git add and git commit workflow lo ee stages order lo execute avuthayi. git add path stages current file content. git commit records staged snapshot with author, committer, message, timestamp and parent commit. Commit exists locally until pushed or otherwise shared."
      },
      "sections": [
        {
          "heading": "1. git add and git commit ante enti?",
          "paragraphs": [
            "Stage selected file content and record it as a permanent local history snapshot. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Stage selected file content and record it as a permanent local history snapshot.",
            "DevOps use: A developer makes one commit for a health-check endpoint and another for documentation so each can be reviewed and reverted separately."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "A controlled commit is a small, reviewable unit of change that can be tested, reviewed and reverted.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "After a logical task or bug fix is complete and before pushing a branch.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "A developer makes one commit for a health-check endpoint and another for documentation so each can be reviewed and reverted separately."
          ]
        },
        {
          "heading": "5. git add and git commit ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Edit files; 2) git add selects snapshot; 3) staged diff review; 4) git commit creates commit object and advances current branch..",
            "Internal behavior: git add path stages current file content. git commit records staged snapshot with author, committer, message, timestamp and parent commit. Commit exists locally until pushed or otherwise shared."
          ],
          "bullets": [
            "1. Edit files",
            "2. git add selects snapshot",
            "3. staged diff review",
            "4. git commit creates commit object and advances current branch."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git add README.md\ngit add src/\ngit diff --cached\ngit commit -m 'Document deployment steps'\ngit show --stat --oneline HEAD",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "A developer makes one commit for a health-check endpoint and another for documentation so each can be reviewed and reverted separately.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "git add -p stages selected hunks. Empty commit is possible with --allow-empty but should be intentional. Good messages describe change purpose.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: git add prepares selected content in the index. git commit records the staged snapshot in local repository history."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Stage selected file content and record it as a permanent local history snapshot.. git add path stages current file content. git commit records staged snapshot with author, committer, message, timestamp and parent commit. Commit exists locally until pushed or otherwise shared.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Stage one file, inspect staged diff, commit it, then use git show to verify exact contents.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is the difference between git add and git commit?",
          "answer": "git add prepares selected content in the index. git commit records the staged snapshot in local repository history."
        },
        {
          "question": "git add and git commit use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Stage one file, inspect staged diff, commit it, then use git show to verify exact contents.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/git-status-and-log": {
      "summary": "git status and git log: Inspect current file state, branch divergence and commit history.. Before a release, engineer checks clean worktree, confirms branch and commit ancestry, then compares deployed tag to intended release commit.",
      "diagram": {
        "title": "git status and git log workflow",
        "nodes": [
          "Working tree and index state",
          "git status summary; commit graph and refs",
          "git log history view."
        ],
        "explanation": "git status and git log workflow lo ee stages order lo execute avuthayi. git status reports staged, unstaged, untracked and branch tracking state. git log displays commits; --graph visualizes ancestry; --decorate shows refs; path-limited log filters history touching a path."
      },
      "sections": [
        {
          "heading": "1. git status and git log ante enti?",
          "paragraphs": [
            "Inspect current file state, branch divergence and commit history. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Inspect current file state, branch divergence and commit history.",
            "DevOps use: Before a release, engineer checks clean worktree, confirms branch and commit ancestry, then compares deployed tag to intended release commit."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Before changing or pushing code, developers need to know what is modified and what history exists.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Daily workflow, pre-commit checks, branch debugging and release traceability.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Before a release, engineer checks clean worktree, confirms branch and commit ancestry, then compares deployed tag to intended release commit."
          ]
        },
        {
          "heading": "5. git status and git log ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Working tree and index state; 2) git status summary; commit graph and refs; 3) git log history view..",
            "Internal behavior: git status reports staged, unstaged, untracked and branch tracking state. git log displays commits; --graph visualizes ancestry; --decorate shows refs; path-limited log filters history touching a path."
          ],
          "bullets": [
            "1. Working tree and index state",
            "2. git status summary; commit graph and refs",
            "3. git log history view."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git status --short --branch\ngit log --oneline -10\ngit log --graph --decorate --all --oneline\ngit show HEAD\ngit log -- src/app.ts",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Before a release, engineer checks clean worktree, confirms branch and commit ancestry, then compares deployed tag to intended release commit.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "status is current state; log is history. git show inspects one commit; git diff compares content. A clean status does not mean remote is up to date.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Use git log -- path for commits affecting the file and git blame path for line-level last-change attribution; then inspect the relevant commit with git show."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Inspect current file state, branch divergence and commit history.. git status reports staged, unstaged, untracked and branch tracking state. git log displays commits; --graph visualizes ancestry; --decorate shows refs; path-limited log filters history touching a path.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create several commits, inspect graph, filter log by file and use git status --short --branch.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "How do you find who changed a file and when?",
          "answer": "Use git log -- path for commits affecting the file and git blame path for line-level last-change attribution; then inspect the relevant commit with git show."
        },
        {
          "question": "git status and git log use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create several commits, inspect graph, filter log by file and use git status --short --branch.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/branches": {
      "summary": "Git Branches: Create isolated lines of development and move between named commit references.. One engineer builds login while another fixes a production bug on separate branches; each change is independently tested and reviewed.",
      "diagram": {
        "title": "Git Branches workflow",
        "nodes": [
          "main commit",
          "create feature branch ref",
          "new commits advance feature ref",
          "review and merge back to target branch."
        ],
        "explanation": "Git Branches workflow lo ee stages order lo execute avuthayi. Branch is a lightweight movable reference to a commit. Creating branch does not copy whole repository. Switching updates HEAD and working tree; uncommitted conflicting changes may block checkout."
      },
      "sections": [
        {
          "heading": "1. Git Branches ante enti?",
          "paragraphs": [
            "Create isolated lines of development and move between named commit references. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Create isolated lines of development and move between named commit references.",
            "DevOps use: One engineer builds login while another fixes a production bug on separate branches; each change is independently tested and reviewed."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Parallel features and fixes should not block each other or destabilize the shared main branch.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Feature work, hotfixes, release branches and experimental changes.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "One engineer builds login while another fixes a production bug on separate branches; each change is independently tested and reviewed."
          ]
        },
        {
          "heading": "5. Git Branches ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) main commit; 2) create feature branch ref; 3) new commits advance feature ref; 4) review and merge back to target branch..",
            "Internal behavior: Branch is a lightweight movable reference to a commit. Creating branch does not copy whole repository. Switching updates HEAD and working tree; uncommitted conflicting changes may block checkout."
          ],
          "bullets": [
            "1. main commit",
            "2. create feature branch ref",
            "3. new commits advance feature ref",
            "4. review and merge back to target branch."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git switch -c feature/login\ngit branch --show-current\ngit switch main\ngit branch -avv\ngit switch feature/login",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "One engineer builds login while another fixes a production bug on separate branches; each change is independently tested and reviewed.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Feature branch vs release branch differ by policy and lifetime. Branch names are local refs until pushed; remote branch tracking is configured separately.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: No. A branch is a lightweight reference to a commit. Git reuses shared objects and only new commits add new history objects."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Create isolated lines of development and move between named commit references.. Branch is a lightweight movable reference to a commit. Creating branch does not copy whole repository. Switching updates HEAD and working tree; uncommitted conflicting changes may block checkout.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create feature branch, commit a change, switch to main and back, then inspect branch refs.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Are Git branches full copies of a repository?",
          "answer": "No. A branch is a lightweight reference to a commit. Git reuses shared objects and only new commits add new history objects."
        },
        {
          "question": "Git Branches use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create feature branch, commit a change, switch to main and back, then inspect branch refs.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/merge-strategies": {
      "summary": "Git Merge Strategies: Integrate branch histories using fast-forward, three-way merge and squash workflows.. Team uses squash merge for compact main history or merge commits when retaining branch topology is important. Policy should be consistent and documented.",
      "diagram": {
        "title": "Git Merge Strategies workflow",
        "nodes": [
          "Source and target branch tips",
          "ancestry check",
          "fast-forward or merge commit / squash",
          "integrated target history."
        ],
        "explanation": "Git Merge Strategies workflow lo ee stages order lo execute avuthayi. Fast-forward moves target ref when target is ancestor of source. Three-way merge uses common ancestor and both tips. --no-ff forces merge commit; --squash combines changes without recording source branch ancestry as a merge commit."
      },
      "sections": [
        {
          "heading": "1. Git Merge Strategies ante enti?",
          "paragraphs": [
            "Integrate branch histories using fast-forward, three-way merge and squash workflows. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Integrate branch histories using fast-forward, three-way merge and squash workflows.",
            "DevOps use: Team uses squash merge for compact main history or merge commits when retaining branch topology is important. Policy should be consistent and documented."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Completed work must be integrated while preserving the project's desired history and review conventions.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Feature completion, release integration, hotfix integration and pull request merge settings.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Team uses squash merge for compact main history or merge commits when retaining branch topology is important. Policy should be consistent and documented."
          ]
        },
        {
          "heading": "5. Git Merge Strategies ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Source and target branch tips; 2) ancestry check; 3) fast-forward or merge commit / squash; 4) integrated target history..",
            "Internal behavior: Fast-forward moves target ref when target is ancestor of source. Three-way merge uses common ancestor and both tips. --no-ff forces merge commit; --squash combines changes without recording source branch ancestry as a merge commit."
          ],
          "bullets": [
            "1. Source and target branch tips",
            "2. ancestry check",
            "3. fast-forward or merge commit / squash",
            "4. integrated target history."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git switch main\ngit merge --ff-only feature/login\n# For a merge commit when histories diverged:\ngit merge --no-ff feature/login\n# Squash changes into working tree, then commit:\ngit merge --squash feature/login",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Team uses squash merge for compact main history or merge commits when retaining branch topology is important. Policy should be consistent and documented.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Fast-forward preserves linear history but no merge commit. No-ff records integration point. Squash creates one new commit and loses original branch commit topology from target ancestry.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: When the team wants an explicit merge commit showing that a feature branch was integrated, even when a fast-forward would be possible."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Integrate branch histories using fast-forward, three-way merge and squash workflows.. Fast-forward moves target ref when target is ancestor of source. Three-way merge uses common ancestor and both tips. --no-ff forces merge commit; --squash combines changes without recording source branch ancestry as a merge commit.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create divergent branches and practice fast-forward, no-ff and squash in a disposable repository.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "When would you use --no-ff?",
          "answer": "When the team wants an explicit merge commit showing that a feature branch was integrated, even when a fast-forward would be possible."
        },
        {
          "question": "Git Merge Strategies use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create divergent branches and practice fast-forward, no-ff and squash in a disposable repository.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/rebase": {
      "summary": "Git Rebase: Replay commits onto a new base to create a different, often linear, commit history.. Developer updates their private feature branch on latest origin/main before opening PR, reducing integration surprises.",
      "diagram": {
        "title": "Git Rebase workflow",
        "nodes": [
          "Feature commits A-B",
          "choose latest main commit as new base",
          "replay A and B as new commits",
          "feature branch points to updated history."
        ],
        "explanation": "Git Rebase workflow lo ee stages order lo execute avuthayi. Rebase rewrites commit identities because parent and commit metadata change. Never rebase shared public commits without team agreement. Resolve conflicts per replayed commit; --continue proceeds and --abort restores pre-rebase state."
      },
      "sections": [
        {
          "heading": "1. Git Rebase ante enti?",
          "paragraphs": [
            "Replay commits onto a new base to create a different, often linear, commit history. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Replay commits onto a new base to create a different, often linear, commit history.",
            "DevOps use: Developer updates their private feature branch on latest origin/main before opening PR, reducing integration surprises."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Long-running feature branches become harder to merge as main changes. Rebase updates feature work on latest base before integration.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Updating private feature branches, cleaning local commit history and preparing a pull request.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Developer updates their private feature branch on latest origin/main before opening PR, reducing integration surprises."
          ]
        },
        {
          "heading": "5. Git Rebase ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Feature commits A-B; 2) choose latest main commit as new base; 3) replay A and B as new commits; 4) feature branch points to updated history..",
            "Internal behavior: Rebase rewrites commit identities because parent and commit metadata change. Never rebase shared public commits without team agreement. Resolve conflicts per replayed commit; --continue proceeds and --abort restores pre-rebase state."
          ],
          "bullets": [
            "1. Feature commits A-B",
            "2. choose latest main commit as new base",
            "3. replay A and B as new commits",
            "4. feature branch points to updated history."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git fetch origin\ngit switch feature/login\ngit rebase origin/main\n# If conflicts occur:\ngit status\n# edit files, then:\ngit add <resolved-file>\ngit rebase --continue\n# To cancel:\ngit rebase --abort",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Developer updates their private feature branch on latest origin/main before opening PR, reducing integration surprises.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Merge preserves original ancestry; rebase replays commits and rewrites hashes. Interactive rebase can squash/reword local commits. Avoid rewriting shared protected branch history.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Other developers may already depend on the original commit hashes. Rewriting them creates divergent histories and requires coordination to recover safely."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Replay commits onto a new base to create a different, often linear, commit history.. Rebase rewrites commit identities because parent and commit metadata change. Never rebase shared public commits without team agreement. Resolve conflicts per replayed commit; --continue proceeds and --abort restores pre-rebase state.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create two branches with divergent commits, rebase feature onto main, inspect graph and practice --abort in a separate test.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why should you avoid rebasing a shared branch?",
          "answer": "Other developers may already depend on the original commit hashes. Rewriting them creates divergent histories and requires coordination to recover safely."
        },
        {
          "question": "Git Rebase use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create two branches with divergent commits, rebase feature onto main, inspect graph and practice --abort in a separate test.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/cherry-pick": {
      "summary": "Git Cherry-pick: Apply the change introduced by selected commit(s) onto the current branch as new commit(s).. Critical fix merged to main must also be applied to supported release/1.x; team cherry-picks exact fix commit and runs release tests.",
      "diagram": {
        "title": "Git Cherry-pick workflow",
        "nodes": [
          "Select source commit",
          "switch target branch",
          "apply patch",
          "resolve conflicts if needed",
          "create new commit."
        ],
        "explanation": "Git Cherry-pick workflow lo ee stages order lo execute avuthayi. Cherry-pick copies the changeset into a new commit with a different hash and current branch parent. Repeated cherry-picks can duplicate changes or complicate later merges; record backport references."
      },
      "sections": [
        {
          "heading": "1. Git Cherry-pick ante enti?",
          "paragraphs": [
            "Apply the change introduced by selected commit(s) onto the current branch as new commit(s). Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Apply the change introduced by selected commit(s) onto the current branch as new commit(s).",
            "DevOps use: Critical fix merged to main must also be applied to supported release/1.x; team cherry-picks exact fix commit and runs release tests."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "A specific fix may be needed in a release branch without merging every change from the feature branch.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Backporting security fixes, patching maintained release branches and moving isolated commits.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Critical fix merged to main must also be applied to supported release/1.x; team cherry-picks exact fix commit and runs release tests."
          ]
        },
        {
          "heading": "5. Git Cherry-pick ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Select source commit; 2) switch target branch; 3) apply patch; 4) resolve conflicts if needed; 5) create new commit..",
            "Internal behavior: Cherry-pick copies the changeset into a new commit with a different hash and current branch parent. Repeated cherry-picks can duplicate changes or complicate later merges; record backport references."
          ],
          "bullets": [
            "1. Select source commit",
            "2. switch target branch",
            "3. apply patch",
            "4. resolve conflicts if needed",
            "5. create new commit."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git log --oneline\ngit switch release/1.x\ngit cherry-pick <commit-sha>\n# If conflict:\ngit status\n# resolve, stage, then:\ngit cherry-pick --continue\n# cancel:\ngit cherry-pick --abort",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Critical fix merged to main must also be applied to supported release/1.x; team cherry-picks exact fix commit and runs release tests.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Merge integrates branch history; cherry-pick applies selected commit changes. Revert creates an inverse change commit. Conflict handling is similar but operation state differs.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: No. It creates a new commit on the target branch, normally with a different parent and therefore a different commit hash."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Apply the change introduced by selected commit(s) onto the current branch as new commit(s).. Cherry-pick copies the changeset into a new commit with a different hash and current branch parent. Repeated cherry-picks can duplicate changes or complicate later merges; record backport references.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create fix commit on one branch and cherry-pick it to another; compare hashes and resulting file content.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Does cherry-pick preserve the original commit SHA?",
          "answer": "No. It creates a new commit on the target branch, normally with a different parent and therefore a different commit hash."
        },
        {
          "question": "Git Cherry-pick use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create fix commit on one branch and cherry-pick it to another; compare hashes and resulting file content.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/tags-and-releases": {
      "summary": "Git Tags and Releases: Mark important repository commits with lightweight or annotated tags and connect them to release artifacts.. CI pipeline triggers on v* tag, builds immutable artifact and deploys same artifact through environments with approval gates.",
      "diagram": {
        "title": "Git Tags and Releases workflow",
        "nodes": [
          "Approved commit",
          "create version tag",
          "push tag",
          "CI builds artifact",
          "release publishes notes and artifact."
        ],
        "explanation": "Git Tags and Releases workflow lo ee stages order lo execute avuthayi. Lightweight tag is a simple ref; annotated tag stores tagger, date and message and is preferred for releases. Tags do not move automatically with branch commits. Protect release tags and follow semantic versioning policy."
      },
      "sections": [
        {
          "heading": "1. Git Tags and Releases ante enti?",
          "paragraphs": [
            "Mark important repository commits with lightweight or annotated tags and connect them to release artifacts. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Mark important repository commits with lightweight or annotated tags and connect them to release artifacts.",
            "DevOps use: CI pipeline triggers on v* tag, builds immutable artifact and deploys same artifact through environments with approval gates."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Deployments need stable identifiers so teams can trace exactly which source revision produced a release.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Versioned releases, production deployment references, rollback identification and release notes.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "CI pipeline triggers on v* tag, builds immutable artifact and deploys same artifact through environments with approval gates."
          ]
        },
        {
          "heading": "5. Git Tags and Releases ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Approved commit; 2) create version tag; 3) push tag; 4) CI builds artifact; 5) release publishes notes and artifact..",
            "Internal behavior: Lightweight tag is a simple ref; annotated tag stores tagger, date and message and is preferred for releases. Tags do not move automatically with branch commits. Protect release tags and follow semantic versioning policy."
          ],
          "bullets": [
            "1. Approved commit",
            "2. create version tag",
            "3. push tag",
            "4. CI builds artifact",
            "5. release publishes notes and artifact."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git tag\ngit tag -a v1.2.0 -m 'Release 1.2.0'\ngit show v1.2.0\ngit push origin v1.2.0\ngit ls-remote --tags origin",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "CI pipeline triggers on v* tag, builds immutable artifact and deploys same artifact through environments with approval gates.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Branch moves as commits arrive; tag marks a specific point. Git tag is source reference; GitHub Release adds published notes/assets.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: They include tag metadata and a message, making release markers auditable and easier to understand than an unannotated pointer."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Mark important repository commits with lightweight or annotated tags and connect them to release artifacts.. Lightweight tag is a simple ref; annotated tag stores tagger, date and message and is preferred for releases. Tags do not move automatically with branch commits. Protect release tags and follow semantic versioning policy.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create annotated v0.1.0 tag, inspect with git show, and push only to a test remote if available.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why use annotated tags for releases?",
          "answer": "They include tag metadata and a message, making release markers auditable and easier to understand than an unannotated pointer."
        },
        {
          "question": "Git Tags and Releases use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create annotated v0.1.0 tag, inspect with git show, and push only to a test remote if available.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/remote-repositories": {
      "summary": "Remote Repositories: Configure remote URLs and synchronize local branches with shared repositories.. Developer fetches origin/main, rebases private feature branch and pushes it for review. Protected main rejects direct push by policy.",
      "diagram": {
        "title": "Remote Repositories workflow",
        "nodes": [
          "Local repository",
          "remote URL configuration",
          "fetch downloads refs/objects",
          "pull integrates",
          "push publishes commits."
        ],
        "explanation": "Remote Repositories workflow lo ee stages order lo execute avuthayi. Remote is a named URL configuration, commonly origin. fetch updates remote-tracking refs without merging into current branch. pull fetches then integrates according to configured strategy. Push sends local commits subject to server policy."
      },
      "sections": [
        {
          "heading": "1. Remote Repositories ante enti?",
          "paragraphs": [
            "Configure remote URLs and synchronize local branches with shared repositories. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Configure remote URLs and synchronize local branches with shared repositories.",
            "DevOps use: Developer fetches origin/main, rebases private feature branch and pushes it for review. Protected main rejects direct push by policy."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Local commits are not automatically visible to teammates; remotes provide shared collaboration and distribution.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Team development, fork workflows, backup mirrors and CI checkout.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Developer fetches origin/main, rebases private feature branch and pushes it for review. Protected main rejects direct push by policy."
          ]
        },
        {
          "heading": "5. Remote Repositories ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Local repository; 2) remote URL configuration; 3) fetch downloads refs/objects; 4) pull integrates; 5) push publishes commits..",
            "Internal behavior: Remote is a named URL configuration, commonly origin. fetch updates remote-tracking refs without merging into current branch. pull fetches then integrates according to configured strategy. Push sends local commits subject to server policy."
          ],
          "bullets": [
            "1. Local repository",
            "2. remote URL configuration",
            "3. fetch downloads refs/objects",
            "4. pull integrates",
            "5. push publishes commits."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git remote -v\ngit remote add origin https://github.com/ORG/REPO.git\ngit fetch origin\ngit branch -r\ngit push -u origin main\ngit remote set-url origin git@github.com:ORG/REPO.git",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Developer fetches origin/main, rebases private feature branch and pushes it for review. Protected main rejects direct push by policy.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Remote-tracking branch is local record of remote state, not live connection. fetch is safer inspection step; pull changes current branch.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: fetch downloads objects and updates remote-tracking refs without changing current branch. pull performs fetch followed by merge or rebase integration."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Configure remote URLs and synchronize local branches with shared repositories.. Remote is a named URL configuration, commonly origin. fetch updates remote-tracking refs without merging into current branch. pull fetches then integrates according to configured strategy. Push sends local commits subject to server policy.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Add a local bare repository as remote, push a branch, make a remote commit and fetch it locally.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What does git fetch do compared with git pull?",
          "answer": "fetch downloads objects and updates remote-tracking refs without changing current branch. pull performs fetch followed by merge or rebase integration."
        },
        {
          "question": "Remote Repositories use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Add a local bare repository as remote, push a branch, make a remote commit and fetch it locally.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/github-repositories": {
      "summary": "GitHub Repositories: Host Git repositories on GitHub with access control, issues, settings, automation and collaboration features.. Company repository uses private visibility, team-based least privilege, required PR reviews, status checks and secret scanning.",
      "diagram": {
        "title": "GitHub Repositories workflow",
        "nodes": [
          "Local Git repo",
          "GitHub remote repository",
          "branches and commits",
          "pull requests/issues/actions",
          "protected integration branch."
        ],
        "explanation": "GitHub Repositories workflow lo ee stages order lo execute avuthayi. Git is version-control software; GitHub is a hosted collaboration platform built around Git. Repository visibility, collaborators, teams, branch protection/rulesets, secrets and Actions permissions are configured separately."
      },
      "sections": [
        {
          "heading": "1. GitHub Repositories ante enti?",
          "paragraphs": [
            "Host Git repositories on GitHub with access control, issues, settings, automation and collaboration features. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Host Git repositories on GitHub with access control, issues, settings, automation and collaboration features.",
            "DevOps use: Company repository uses private visibility, team-based least privilege, required PR reviews, status checks and secret scanning."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "A remote Git repository alone does not provide the full team workflow for review, issue tracking, permissions and CI integration.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Open-source projects, company source control, team services and portfolio projects.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Company repository uses private visibility, team-based least privilege, required PR reviews, status checks and secret scanning."
          ]
        },
        {
          "heading": "5. GitHub Repositories ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Local Git repo; 2) GitHub remote repository; 3) branches and commits; 4) pull requests/issues/actions; 5) protected integration branch..",
            "Internal behavior: Git is version-control software; GitHub is a hosted collaboration platform built around Git. Repository visibility, collaborators, teams, branch protection/rulesets, secrets and Actions permissions are configured separately."
          ],
          "bullets": [
            "1. Local Git repo",
            "2. GitHub remote repository",
            "3. branches and commits",
            "4. pull requests/issues/actions",
            "5. protected integration branch."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git remote add origin https://github.com/OWNER/REPO.git\ngit branch -M main\ngit push -u origin main\n# GitHub CLI examples:\ngh repo view\ngh repo clone OWNER/REPO",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Company repository uses private visibility, team-based least privilege, required PR reviews, status checks and secret scanning.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "GitHub vs Git: Git operates locally and tracks history; GitHub hosts repositories and collaboration features. GitHub is not the only Git hosting provider.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Yes. Git is a distributed version-control system and can operate entirely locally or with any compatible remote host such as GitLab, Bitbucket or self-hosted Git."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Host Git repositories on GitHub with access control, issues, settings, automation and collaboration features.. Git is version-control software; GitHub is a hosted collaboration platform built around Git. Repository visibility, collaborators, teams, branch protection/rulesets, secrets and Actions permissions are configured separately.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create a test GitHub repository, push a local commit, inspect branches, issues, settings and access permissions.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Can Git work without GitHub?",
          "answer": "Yes. Git is a distributed version-control system and can operate entirely locally or with any compatible remote host such as GitLab, Bitbucket or self-hosted Git."
        },
        {
          "question": "GitHub Repositories use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create a test GitHub repository, push a local commit, inspect branches, issues, settings and access permissions.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/pull-requests": {
      "summary": "Pull Requests: Propose, review, discuss and merge a branch into a target branch on GitHub.. Terraform change PR includes plan output, reviewer approval and policy checks before merge; production apply remains gated by environment approval.",
      "diagram": {
        "title": "Pull Requests workflow",
        "nodes": [
          "Feature branch push",
          "open PR",
          "automated checks",
          "reviewer comments/approval",
          "required checks pass",
          "merge."
        ],
        "explanation": "Pull Requests workflow lo ee stages order lo execute avuthayi. A PR compares source and base branches, displays changed files and supports discussion, review, status checks and merge options. Required reviewers and checks are repository policy, not guaranteed by opening a PR."
      },
      "sections": [
        {
          "heading": "1. Pull Requests ante enti?",
          "paragraphs": [
            "Propose, review, discuss and merge a branch into a target branch on GitHub. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Propose, review, discuss and merge a branch into a target branch on GitHub.",
            "DevOps use: Terraform change PR includes plan output, reviewer approval and policy checks before merge; production apply remains gated by environment approval."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Direct unreviewed changes to shared branches increase defects and reduce accountability. Pull requests create a controlled integration checkpoint.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Feature delivery, bug fixes, release preparation and infrastructure code review.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Terraform change PR includes plan output, reviewer approval and policy checks before merge; production apply remains gated by environment approval."
          ]
        },
        {
          "heading": "5. Pull Requests ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Feature branch push; 2) open PR; 3) automated checks; 4) reviewer comments/approval; 5) required checks pass; 6) merge..",
            "Internal behavior: A PR compares source and base branches, displays changed files and supports discussion, review, status checks and merge options. Required reviewers and checks are repository policy, not guaranteed by opening a PR."
          ],
          "bullets": [
            "1. Feature branch push",
            "2. open PR",
            "3. automated checks",
            "4. reviewer comments/approval",
            "5. required checks pass",
            "6. merge."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git switch -c feature/readme\n# edit and commit\n git add README.md\ngit commit -m 'Improve setup guide'\ngit push -u origin feature/readme\n# Open PR in GitHub UI or:\ngh pr create --base main --head feature/readme",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Terraform change PR includes plan output, reviewer approval and policy checks before merge; production apply remains gated by environment approval.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "PR is a GitHub collaboration object; merge is Git history integration. Draft PR requests early feedback; required checks enforce policy.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Configured branch rules such as required approvals, resolved conversations, signed commits or required CI status checks. Exact requirements depend on repository policy."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Propose, review, discuss and merge a branch into a target branch on GitHub.. A PR compares source and base branches, displays changed files and supports discussion, review, status checks and merge options. Required reviewers and checks are repository policy, not guaranteed by opening a PR.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create feature branch and PR in a test repository; add review comment, inspect checks and merge using team policy.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What must pass before merging a protected PR?",
          "answer": "Configured branch rules such as required approvals, resolved conversations, signed commits or required CI status checks. Exact requirements depend on repository policy."
        },
        {
          "question": "Pull Requests use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create feature branch and PR in a test repository; add review comment, inspect checks and merge using team policy.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/code-reviews": {
      "summary": "Code Reviews: Evaluate proposed code for correctness, maintainability, security, testing and operational risk.. Reviewer finds Terraform security group exposing database port publicly and requests CIDR restriction plus test evidence before approval.",
      "diagram": {
        "title": "Code Reviews workflow",
        "nodes": [
          "PR diff",
          "reviewer checks behavior and risks",
          "comments/request changes or approve",
          "author updates",
          "final checks and merge."
        ],
        "explanation": "Code Reviews workflow lo ee stages order lo execute avuthayi. Review should focus on behavior, edge cases, security, backward compatibility, observability, tests and rollback. Review comments should be actionable and respectful. Approval should not bypass required checks."
      },
      "sections": [
        {
          "heading": "1. Code Reviews ante enti?",
          "paragraphs": [
            "Evaluate proposed code for correctness, maintainability, security, testing and operational risk. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Evaluate proposed code for correctness, maintainability, security, testing and operational risk.",
            "DevOps use: Reviewer finds Terraform security group exposing database port publicly and requests CIDR restriction plus test evidence before approval."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Automated tests cannot catch every design, access-control, readability or production-impact issue. Human review adds context.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Every meaningful change to application code, infrastructure, pipeline and security configuration.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Reviewer finds Terraform security group exposing database port publicly and requests CIDR restriction plus test evidence before approval."
          ]
        },
        {
          "heading": "5. Code Reviews ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) PR diff; 2) reviewer checks behavior and risks; 3) comments/request changes or approve; 4) author updates; 5) final checks and merge..",
            "Internal behavior: Review should focus on behavior, edge cases, security, backward compatibility, observability, tests and rollback. Review comments should be actionable and respectful. Approval should not bypass required checks."
          ],
          "bullets": [
            "1. PR diff",
            "2. reviewer checks behavior and risks",
            "3. comments/request changes or approve",
            "4. author updates",
            "5. final checks and merge."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git diff origin/main...HEAD\ngh pr view --web\ngh pr diff\ngh pr review --approve",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Reviewer finds Terraform security group exposing database port publicly and requests CIDR restriction plus test evidence before approval.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Review is not only style policing; lint/format automate style. CODEOWNERS can require domain experts for sensitive paths.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: I check correctness, security, secrets, permissions, failure handling, monitoring, environment impact, tests, rollback and whether the change follows team standards."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Evaluate proposed code for correctness, maintainability, security, testing and operational risk.. Review should focus on behavior, edge cases, security, backward compatibility, observability, tests and rollback. Review comments should be actionable and respectful. Approval should not bypass required checks.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Review a sample PR diff and write three actionable comments: one correctness, one security and one operational.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What do you check in a DevOps code review?",
          "answer": "I check correctness, security, secrets, permissions, failure handling, monitoring, environment impact, tests, rollback and whether the change follows team standards."
        },
        {
          "question": "Code Reviews use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Review a sample PR diff and write three actionable comments: one correctness, one security and one operational.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/merge-conflicts": {
      "summary": "Merge Conflicts: Resolve incompatible edits when Git cannot automatically combine branch changes.. Two engineers update same Kubernetes replica count differently. Reviewer checks desired capacity and environment intent, combines correct change and runs manifest validation.",
      "diagram": {
        "title": "Merge Conflicts workflow",
        "nodes": [
          "Two branches edit overlapping content",
          "Git detects conflict",
          "conflict markers appear",
          "developer chooses correct combined result",
          "stage resolution",
          "continue operation."
        ],
        "explanation": "Merge Conflicts workflow lo ee stages order lo execute avuthayi. Conflict markers show HEAD/current side and incoming side, separated by =======. Do not blindly choose ours/theirs; understand intended behavior. git status identifies operation state. Abort command depends on operation."
      },
      "sections": [
        {
          "heading": "1. Merge Conflicts ante enti?",
          "paragraphs": [
            "Resolve incompatible edits when Git cannot automatically combine branch changes. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Resolve incompatible edits when Git cannot automatically combine branch changes.",
            "DevOps use: Two engineers update same Kubernetes replica count differently. Reviewer checks desired capacity and environment intent, combines correct change and runs manifest validation."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Parallel developers may modify the same lines or file structure. Git needs a human decision when intent is ambiguous.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Merge, rebase, cherry-pick and pull operations with overlapping changes.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Two engineers update same Kubernetes replica count differently. Reviewer checks desired capacity and environment intent, combines correct change and runs manifest validation."
          ]
        },
        {
          "heading": "5. Merge Conflicts ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Two branches edit overlapping content; 2) Git detects conflict; 3) conflict markers appear; 4) developer chooses correct combined result; 5) stage resolution; 6) continue operation..",
            "Internal behavior: Conflict markers show HEAD/current side and incoming side, separated by =======. Do not blindly choose ours/theirs; understand intended behavior. git status identifies operation state. Abort command depends on operation."
          ],
          "bullets": [
            "1. Two branches edit overlapping content",
            "2. Git detects conflict",
            "3. conflict markers appear",
            "4. developer chooses correct combined result",
            "5. stage resolution",
            "6. continue operation."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git status\n# open conflicted file and resolve markers\n git diff\n git add path/to/file\n# choose matching operation:\ngit merge --continue\ngit rebase --continue\ngit cherry-pick --continue",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Two engineers update same Kubernetes replica count differently. Reviewer checks desired capacity and environment intent, combines correct change and runs manifest validation.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Merge conflict vs runtime bug: conflict is source integration ambiguity; resolved file still needs tests. ours/theirs semantics can be confusing during rebase.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Inspect status and conflict context, understand both changes, edit final intended content, remove markers, run tests, stage resolution and continue the active merge/rebase/cherry-pick."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Resolve incompatible edits when Git cannot automatically combine branch changes.. Conflict markers show HEAD/current side and incoming side, separated by =======. Do not blindly choose ours/theirs; understand intended behavior. git status identifies operation state. Abort command depends on operation.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create conflicting edits on two branches, merge, resolve manually, run diff and tests, then complete merge.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "How do you resolve a merge conflict safely?",
          "answer": "Inspect status and conflict context, understand both changes, edit final intended content, remove markers, run tests, stage resolution and continue the active merge/rebase/cherry-pick."
        },
        {
          "question": "Merge Conflicts use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create conflicting edits on two branches, merge, resolve manually, run diff and tests, then complete merge.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/reset-revert-and-restore": {
      "summary": "Reset, Revert and Restore: Move branch/index state, create inverse commits, or discard working-tree changes with the correct recovery command.. Production hotfix already shared: use git revert to preserve history. Private local typo commit not pushed: reset may be suitable after checking working tree.",
      "diagram": {
        "title": "Reset, Revert and Restore workflow",
        "nodes": [
          "Identify target state",
          "choose scope: working tree/index/branch history",
          "execute safe undo operation",
          "inspect status and history."
        ],
        "explanation": "Reset, Revert and Restore workflow lo ee stages order lo execute avuthayi. restore changes working tree or index; revert creates a new commit reversing a prior commit; reset moves current branch ref and optionally updates index/worktree. --hard discards tracked uncommitted changes and is destructive."
      },
      "sections": [
        {
          "heading": "1. Reset, Revert and Restore ante enti?",
          "paragraphs": [
            "Move branch/index state, create inverse commits, or discard working-tree changes with the correct recovery command. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Move branch/index state, create inverse commits, or discard working-tree changes with the correct recovery command.",
            "DevOps use: Production hotfix already shared: use git revert to preserve history. Private local typo commit not pushed: reset may be suitable after checking working tree."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Developers need to undo mistakes without damaging shared history or losing uncommitted work.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Local commit correction, public branch rollback, accidental staging and unwanted file edits.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Production hotfix already shared: use git revert to preserve history. Private local typo commit not pushed: reset may be suitable after checking working tree."
          ]
        },
        {
          "heading": "5. Reset, Revert and Restore ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Identify target state; 2) choose scope: working tree/index/branch history; 3) execute safe undo operation; 4) inspect status and history..",
            "Internal behavior: restore changes working tree or index; revert creates a new commit reversing a prior commit; reset moves current branch ref and optionally updates index/worktree. --hard discards tracked uncommitted changes and is destructive."
          ],
          "bullets": [
            "1. Identify target state",
            "2. choose scope: working tree/index/branch history",
            "3. execute safe undo operation",
            "4. inspect status and history."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git restore file.txt\ngit restore --staged file.txt\ngit revert <commit-sha>\n# Local-only history movement; inspect before use:\ngit reset --soft HEAD~1\ngit reset --mixed HEAD~1\ngit reset --hard HEAD~1",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Production hotfix already shared: use git revert to preserve history. Private local typo commit not pushed: reset may be suitable after checking working tree.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Public/shared history: prefer revert. Local unpublished commits: reset may be acceptable. restore is for file/index state, not branch history.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: It adds a new commit that reverses the target change without rewriting existing shared commit history, so teammates can synchronize normally."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Move branch/index state, create inverse commits, or discard working-tree changes with the correct recovery command.. restore changes working tree or index; revert creates a new commit reversing a prior commit; reset moves current branch ref and optionally updates index/worktree. --hard discards tracked uncommitted changes and is destructive.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "In a disposable repo, create a commit and practice restore, revert and soft reset; inspect log/status after each.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why is git revert safer for shared branches?",
          "answer": "It adds a new commit that reverses the target change without rewriting existing shared commit history, so teammates can synchronize normally."
        },
        {
          "question": "Reset, Revert and Restore use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "In a disposable repo, create a commit and practice restore, revert and soft reset; inspect log/status after each.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/stash": {
      "summary": "Git Stash: Temporarily save uncommitted working-tree changes and restore them later.. Developer parks incomplete feature changes, switches to urgent hotfix branch, commits fix, then returns and restores WIP.",
      "diagram": {
        "title": "Git Stash workflow",
        "nodes": [
          "Uncommitted edits",
          "stash snapshot",
          "clean working tree",
          "switch/perform task",
          "apply or pop stash",
          "verify changes."
        ],
        "explanation": "Git Stash workflow lo ee stages order lo execute avuthayi. stash can save tracked changes and optionally untracked files with -u. apply restores but keeps stash; pop applies and removes on success. Conflicts can occur. Stash is local and not a durable shared backup."
      },
      "sections": [
        {
          "heading": "1. Git Stash ante enti?",
          "paragraphs": [
            "Temporarily save uncommitted working-tree changes and restore them later. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Temporarily save uncommitted working-tree changes and restore them later.",
            "DevOps use: Developer parks incomplete feature changes, switches to urgent hotfix branch, commits fix, then returns and restores WIP."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Urgent branch switch or hotfix may be needed before current work is ready to commit.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Switching context, pulling a clean branch and parking experimental edits.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Developer parks incomplete feature changes, switches to urgent hotfix branch, commits fix, then returns and restores WIP."
          ]
        },
        {
          "heading": "5. Git Stash ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Uncommitted edits; 2) stash snapshot; 3) clean working tree; 4) switch/perform task; 5) apply or pop stash; 6) verify changes..",
            "Internal behavior: stash can save tracked changes and optionally untracked files with -u. apply restores but keeps stash; pop applies and removes on success. Conflicts can occur. Stash is local and not a durable shared backup."
          ],
          "bullets": [
            "1. Uncommitted edits",
            "2. stash snapshot",
            "3. clean working tree",
            "4. switch/perform task",
            "5. apply or pop stash",
            "6. verify changes."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "git status\ngit stash push -m 'WIP login form'\ngit stash list\ngit switch main\n# return and restore:\ngit switch feature/login\ngit stash apply stash@{0}\n# after verifying, remove stash:\ngit stash drop stash@{0}",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Developer parks incomplete feature changes, switches to urgent hotfix branch, commits fix, then returns and restores WIP.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Stash vs commit: stash is temporary local shelf, commit is named history. Stash may not include untracked files unless -u; ignored files require -a.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: No. Use git stash push -u to include untracked files. Ignored files require -a and should be handled carefully."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Temporarily save uncommitted working-tree changes and restore them later.. stash can save tracked changes and optionally untracked files with -u. apply restores but keeps stash; pop applies and removes on success. Conflicts can occur. Stash is local and not a durable shared backup.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create tracked and untracked edits, stash normally then with -u, inspect stash list and restore.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Does git stash push include untracked files by default?",
          "answer": "No. Use git stash push -u to include untracked files. Ignored files require -a and should be handled carefully."
        },
        {
          "question": "Git Stash use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create tracked and untracked edits, stash normally then with -u, inspect stash list and restore.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/gitignore": {
      "summary": " .gitignore: Define untracked file patterns Git should ignore in a repository.. Next.js project ignores node_modules, build output and local .env while committing a sanitized .env.example with required variable names only.",
      "diagram": {
        "title": " .gitignore workflow",
        "nodes": [
          "Pattern in .gitignore",
          "Git excludes matching untracked paths from status/add-all",
          "tracked files remain tracked until explicitly removed from index."
        ],
        "explanation": " .gitignore workflow lo ee stages order lo execute avuthayi. Ignore patterns apply to untracked files. Adding a pattern does not untrack files already committed. git rm --cached removes from index but leaves local working copy. Never commit real credentials; rotate if exposed."
      },
      "sections": [
        {
          "heading": "1.  .gitignore ante enti?",
          "paragraphs": [
            "Define untracked file patterns Git should ignore in a repository. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Define untracked file patterns Git should ignore in a repository.",
            "DevOps use: Next.js project ignores node_modules, build output and local .env while committing a sanitized .env.example with required variable names only."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Build outputs, local environment files, logs and secrets should not be committed accidentally.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Node/Python projects, Terraform state, IDE files, local credentials and generated artifacts.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Next.js project ignores node_modules, build output and local .env while committing a sanitized .env.example with required variable names only."
          ]
        },
        {
          "heading": "5.  .gitignore ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) Pattern in .gitignore; 2) Git excludes matching untracked paths from status/add-all; 3) tracked files remain tracked until explicitly removed from index..",
            "Internal behavior: Ignore patterns apply to untracked files. Adding a pattern does not untrack files already committed. git rm --cached removes from index but leaves local working copy. Never commit real credentials; rotate if exposed."
          ],
          "bullets": [
            "1. Pattern in .gitignore",
            "2. Git excludes matching untracked paths from status/add-all",
            "3. tracked files remain tracked until explicitly removed from index."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "cat > .gitignore <<'EOF'\nnode_modules/\n.next/\n.env\n*.log\n!.env.example\nEOF\ngit check-ignore -v .env\ngit status --short\n# If a file is already tracked:\ngit rm --cached .env",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Next.js project ignores node_modules, build output and local .env while committing a sanitized .env.example with required variable names only.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            ".gitignore is repository policy; global excludes apply user-wide. Ignore does not secure a secret already pushed; remove exposure and rotate credentials.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Because it is already tracked. Remove it from the index with git rm --cached and commit that change; the local file remains on disk."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Define untracked file patterns Git should ignore in a repository.. Ignore patterns apply to untracked files. Adding a pattern does not untrack files already committed. git rm --cached removes from index but leaves local working copy. Never commit real credentials; rotate if exposed.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create ignored log and env test files, inspect git check-ignore, then test tracked-file behavior in disposable repo.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why is a file still showing after adding it to .gitignore?",
          "answer": "Because it is already tracked. Remove it from the index with git rm --cached and commit that change; the local file remains on disk."
        },
        {
          "question": " .gitignore use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create ignored log and env test files, inspect git check-ignore, then test tracked-file behavior in disposable repo.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/ssh-keys": {
      "summary": "Git SSH Keys: Authenticate Git operations using public-key cryptography and verified SSH host identity.. Engineer registers public key in account, clones private repo over SSH and uses organization access controls. CI should prefer short-lived credentials or narrowly scoped deploy keys.",
      "diagram": {
        "title": "Git SSH Keys workflow",
        "nodes": [
          "SSH client offers public-key identity",
          "server validates authorized public key",
          "encrypted authenticated session",
          "Git transport operates over SSH."
        ],
        "explanation": "Git SSH Keys workflow lo ee stages order lo execute avuthayi. Private key stays secret on client; public key is registered with hosting account or deploy key. Host key verifies server identity. Use passphrase and agent; never upload private key to GitHub or commit it."
      },
      "sections": [
        {
          "heading": "1. Git SSH Keys ante enti?",
          "paragraphs": [
            "Authenticate Git operations using public-key cryptography and verified SSH host identity. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Authenticate Git operations using public-key cryptography and verified SSH host identity.",
            "DevOps use: Engineer registers public key in account, clones private repo over SSH and uses organization access controls. CI should prefer short-lived credentials or narrowly scoped deploy keys."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Repeated password entry and embedded tokens are poor long-term authentication patterns. SSH keys enable secure, manageable Git remote access.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Developer workstations, automation runners and controlled access to Git hosting.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Engineer registers public key in account, clones private repo over SSH and uses organization access controls. CI should prefer short-lived credentials or narrowly scoped deploy keys."
          ]
        },
        {
          "heading": "5. Git SSH Keys ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) SSH client offers public-key identity; 2) server validates authorized public key; 3) encrypted authenticated session; 4) Git transport operates over SSH..",
            "Internal behavior: Private key stays secret on client; public key is registered with hosting account or deploy key. Host key verifies server identity. Use passphrase and agent; never upload private key to GitHub or commit it."
          ],
          "bullets": [
            "1. SSH client offers public-key identity",
            "2. server validates authorized public key",
            "3. encrypted authenticated session",
            "4. Git transport operates over SSH."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "ssh-keygen -t ed25519 -C 'dev@example.com'\neval \"$(ssh-agent -s)\"\nssh-add ~/.ssh/id_ed25519\ncat ~/.ssh/id_ed25519.pub\nssh -T git@github.com\ngit remote set-url origin git@github.com:OWNER/REPO.git",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Engineer registers public key in account, clones private repo over SSH and uses organization access controls. CI should prefer short-lived credentials or narrowly scoped deploy keys.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "SSH authentication vs commit identity: key proves access; git user.email records commit metadata. Account SSH key and repository deploy key have different scope.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: Only the public key, commonly id_ed25519.pub. The private key id_ed25519 must remain secret and never be shared."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Authenticate Git operations using public-key cryptography and verified SSH host identity.. Private key stays secret on client; public key is registered with hosting account or deploy key. Host key verifies server identity. Use passphrase and agent; never upload private key to GitHub or commit it.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Generate a test key pair, inspect public-key fingerprint, configure SSH agent and test GitHub SSH authentication.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Which SSH key file should be added to GitHub?",
          "answer": "Only the public key, commonly id_ed25519.pub. The private key id_ed25519 must remain secret and never be shared."
        },
        {
          "question": "Git SSH Keys use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Generate a test key pair, inspect public-key fingerprint, configure SSH agent and test GitHub SSH authentication.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    },
    "git-github/github-actions-overview": {
      "summary": "GitHub Actions Overview: Automate repository workflows using events, workflow files, jobs, runners and reusable actions.. Pull request triggers lint/tests/build; merge to main may publish artifact; production deployment can require protected environment approval and OIDC cloud identity.",
      "diagram": {
        "title": "GitHub Actions Overview workflow",
        "nodes": [
          "GitHub event",
          "workflow YAML selected",
          "jobs scheduled on runners",
          "steps execute actions/commands",
          "status and artifacts reported."
        ],
        "explanation": "GitHub Actions Overview workflow lo ee stages order lo execute avuthayi. Workflow files live under .github/workflows and use YAML. Events trigger workflows; jobs run on runners; steps execute actions or shell commands. Pin third-party actions to trusted versions/SHAs, use least-privilege permissions and protect secrets."
      },
      "sections": [
        {
          "heading": "1. GitHub Actions Overview ante enti?",
          "paragraphs": [
            "Automate repository workflows using events, workflow files, jobs, runners and reusable actions. Git and GitHub workflow lo ee topic specific responsibility ni handle chesthundi. Simple ga, code changes ni safe ga create, track, share or integrate cheyadaniki ee concept use avuthundi.",
            "Git local repository lo work chesthundi; GitHub remote collaboration and automation features provide chesthundi. Topic batti command local state ni change chesthunda, remote state ni affect chesthunda ani identify cheyyali."
          ],
          "bullets": [
            "Main purpose: Automate repository workflows using events, workflow files, jobs, runners and reusable actions.",
            "DevOps use: Pull request triggers lint/tests/build; merge to main may publish artifact; production deployment can require protected environment approval and OIDC cloud identity."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Builds, tests and releases should run consistently after code changes instead of relying on manual execution.",
            "Ee practice follow avvakapothe accidental overwrites, unclear history, unreviewed changes, difficult rollback or inconsistent team workflows occur avvachu."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Pull request validation, main branch CI, release tagging, scheduled scans and deployment workflows.",
            "Command run cheyadaniki mundu current branch, working tree status, remote target and whether operation rewrites or deletes history ani verify cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "Developer workstation, GitHub repositories, CI runners, infrastructure-as-code repositories and release pipelines lo ee concept apply avuthundi.",
            "Pull request triggers lint/tests/build; merge to main may publish artifact; production deployment can require protected environment approval and OIDC cloud identity."
          ]
        },
        {
          "heading": "5. GitHub Actions Overview ela work avuthundi?",
          "paragraphs": [
            "Diagram lo flow ni step-by-step chudandi. 1) GitHub event; 2) workflow YAML selected; 3) jobs scheduled on runners; 4) steps execute actions/commands; 5) status and artifacts reported..",
            "Internal behavior: Workflow files live under .github/workflows and use YAML. Events trigger workflows; jobs run on runners; steps execute actions or shell commands. Pin third-party actions to trusted versions/SHAs, use least-privilege permissions and protect secrets."
          ],
          "bullets": [
            "1. GitHub event",
            "2. workflow YAML selected",
            "3. jobs scheduled on runners",
            "4. steps execute actions/commands",
            "5. status and artifacts reported."
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Kindha example ni disposable repository or test branch lo run cheyyandi. Placeholder values (<...>) ni mee lab values tho replace cheyyali. Destructive or history-rewriting commands ni shared branch meeda practice cheyyakandi.",
            "Commands purpose: current state inspect → operation perform → output/history verify."
          ],
          "code": "mkdir -p .github/workflows\ncat > .github/workflows/ci.yml <<'EOF'\nname: CI\non:\n  pull_request:\n  push:\n    branches: [main]\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n      - run: npm ci\n      - run: npm run lint --if-present\n      - run: npm run build\nEOF",
          "note": "Secrets, personal access tokens and private SSH keys ni source code, command history, logs or commits lo store cheyyakandi. Production branch changes ki review and rollback plan follow avvali."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "Pull request triggers lint/tests/build; merge to main may publish artifact; production deployment can require protected environment approval and OIDC cloud identity.",
            "Team workflow lo issue/ticket link, small commits, automated checks, reviewer approval and deployment evidence maintain cheyyadam traceability improve chesthundi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "GitHub Actions vs Jenkins: Actions is GitHub-native hosted/managed workflow system; Jenkins is independently operated automation server. Both need secure runners, secrets and pipeline controls.",
            "Best practices: meaningful branch/commit names, small reviewable changes, clean staged diff, protected default branch, required CI checks, least-privilege credentials and regular remote synchronization."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview answer lo concept definition, why it exists, internal behavior, commands and one production example explain cheyyandi.",
            "Sample answer: A runner is the execution environment that receives a job and runs its steps, commands and actions, then reports logs and results."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Remember: Automate repository workflows using events, workflow files, jobs, runners and reusable actions.. Workflow files live under .github/workflows and use YAML. Events trigger workflows; jobs run on runners; steps execute actions or shell commands. Pin third-party actions to trusted versions/SHAs, use least-privilege permissions and protect secrets.",
            "Lab lo success case tho paatu failure/conflict case kuda observe cheyyandi; final repository status and history clean ga unnayo verify cheyyandi."
          ],
          "bullets": [
            "Create a harmless CI workflow on a test repository, trigger it with a PR and inspect job/step logs.",
            "git status and relevant diff/log output capture cheyyandi.",
            "Same workflow lo one failure condition reproduce chesi safe recovery practice cheyyandi.",
            "Team lo use chese review, permissions and rollback policy document cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "What is the role of a runner?",
          "answer": "A runner is the execution environment that receives a job and runs its steps, commands and actions, then reports logs and results."
        },
        {
          "question": "GitHub Actions Overview use chesthunappudu common risk enti?",
          "answer": "Current repository state and operation impact verify cheyyakunda command run cheyadam. First status/diff/history inspect chesi, shared history or remote state affect ayye changes ki review and recovery plan follow chesthanu."
        }
      ],
      "handsOn": [
        "Create a harmless CI workflow on a test repository, trigger it with a PR and inspect job/step logs.",
        "Commands ni test repository lo execute chesi output explain cheyyandi.",
        "Failure scenario reproduce chesi recovery steps and verification document cheyyandi."
      ]
    }
  }
  ...{
    "git-github/git-flow": {
      "summary": "Git Flow: A branching model using main, develop, feature, release and hotfix branches to coordinate planned releases. A team releases monthly: feature work integrates in develop, QA validates release/2.0, then main receives the release tag. An urgent production fix is handled in a hotfix branch.",
      "diagram": {
        "title": "Git Flow workflow",
        "nodes": [
          "main stable history",
          "develop integration",
          "feature branches",
          "release branch testing",
          "merge and tag main",
          "hotfix for urgent production patch"
        ],
        "explanation": "Feature branches usually start from develop; release branches stabilize a candidate; hotfix branches start from production main and should be merged back into develop too. Exact merge-back policy must be documented. Workflow stages: main stable history → develop integration → feature branches → release branch testing → merge and tag main → hotfix for urgent production patch."
      },
      "sections": [
        {
          "heading": "1. Git Flow ante enti?",
          "paragraphs": [
            "A branching model using main, develop, feature, release and hotfix branches to coordinate planned releases.",
            "Git history and branch behavior ni ardham chesukunte team changes ni safe ga plan, integrate and recover cheyochu."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Teams with scheduled releases need parallel feature development, a stabilization window and a clear emergency-fix path.",
            "Clear branching policy lekapothe merge conflicts, delayed integration and unclear release state increase avuthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Use it when releases are planned and teams maintain release candidates or multiple supported versions.",
            "Operation mundu branch name, working tree, remote state and repository protection policy inspect cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "GitHub repositories, application development, infrastructure code, release engineering and CI/CD pipelines lo use chestharu.",
            "A team releases monthly: feature work integrates in develop, QA validates release/2.0, then main receives the release tag. An urgent production fix is handled in a hotfix branch."
          ]
        },
        {
          "heading": "5. Git Flow ela work avuthundi?",
          "paragraphs": [
            "Flow: 1. main stable history; 2. develop integration; 3. feature branches; 4. release branch testing; 5. merge and tag main; 6. hotfix for urgent production patch.",
            "Feature branches usually start from develop; release branches stabilize a candidate; hotfix branches start from production main and should be merged back into develop too. Exact merge-back policy must be documented."
          ],
          "bullets": [
            "main stable history",
            "develop integration",
            "feature branches",
            "release branch testing",
            "merge and tag main",
            "hotfix for urgent production patch"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Commands ni disposable repository lo practice cheyyandi. Existing team branch policy ni follow cheyyandi; shared history ni force rewrite cheyyakandi."
          ],
          "code": "git switch develop\ngit switch -c feature/payment\n# finish feature and merge through a PR into develop\ngit switch -c release/2.0 develop\n# validate, then merge release into main and tag it\ngit switch main\ngit switch -c hotfix/payment-timeout",
          "note": "Production branches protected ga unchandi; merge mundu tests, review and rollback plan verify cheyyandi."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "A team releases monthly: feature work integrates in develop, QA validates release/2.0, then main receives the release tag. An urgent production fix is handled in a hotfix branch.",
            "Release evidence lo commit SHA, PR link, CI run and artifact version record cheyyandi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Git Flow uses longer-lived branches and release branches. Trunk-based development favors short-lived branches and frequent integration. Git Flow adds coordination overhead.",
            "Small commits, short-lived branches where possible, required checks, protected main and documented recovery steps follow avvali."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, workflow, trade-offs and practical production example explain cheyyandi. Sample answer: It can help teams with scheduled releases, formal stabilization periods and parallel maintenance of production releases, but it adds branch management overhead."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Feature branches usually start from develop; release branches stabilize a candidate; hotfix branches start from production main and should be merged back into develop too. Exact merge-back policy must be documented.",
            "In a disposable repository simulate develop, feature, release and hotfix branches; draw which branches must receive each fix."
          ],
          "bullets": [
            "In a disposable repository simulate develop, feature, release and hotfix branches; draw which branches must receive each fix.",
            "git status and git log output capture cheyyandi.",
            "Failure case simulate chesi safe recovery verify cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "When is Git Flow useful?",
          "answer": "It can help teams with scheduled releases, formal stabilization periods and parallel maintenance of production releases, but it adds branch management overhead."
        }
      ],
      "handsOn": [
        "In a disposable repository simulate develop, feature, release and hotfix branches; draw which branches must receive each fix.",
        "Workflow diagram ni own words lo explain cheyyandi.",
        "One failure scenario create chesi recovery steps document cheyyandi."
      ]
    },
    "git-github/trunk-based-development": {
      "summary": "Trunk-Based Development: A collaboration model where developers integrate small changes frequently into one shared trunk, usually main. A team merges several small PRs daily. Incomplete functionality stays behind a feature flag, so main remains deployable while development continues.",
      "diagram": {
        "title": "Trunk-Based Development workflow",
        "nodes": [
          "Small change on short-lived branch",
          "automated tests",
          "merge quickly",
          "deploy independently or behind feature flag"
        ],
        "explanation": "Trunk-based development emphasizes short-lived branches, small commits, strong CI and feature flags for incomplete functionality. Direct pushes to main are a policy choice, not a requirement. Workflow stages: Small change on short-lived branch → automated tests → merge quickly → deploy independently or behind feature flag."
      },
      "sections": [
        {
          "heading": "1. Trunk-Based Development ante enti?",
          "paragraphs": [
            "A collaboration model where developers integrate small changes frequently into one shared trunk, usually main.",
            "Git history and branch behavior ni ardham chesukunte team changes ni safe ga plan, integrate and recover cheyochu."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Long-lived branches create integration drift and painful merges. Frequent integration keeps changes small and feedback fast.",
            "Clear branching policy lekapothe merge conflicts, delayed integration and unclear release state increase avuthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Use it with continuous integration, reliable automated tests, feature flags and frequent releases.",
            "Operation mundu branch name, working tree, remote state and repository protection policy inspect cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "GitHub repositories, application development, infrastructure code, release engineering and CI/CD pipelines lo use chestharu.",
            "A team merges several small PRs daily. Incomplete functionality stays behind a feature flag, so main remains deployable while development continues."
          ]
        },
        {
          "heading": "5. Trunk-Based Development ela work avuthundi?",
          "paragraphs": [
            "Flow: 1. Small change on short-lived branch; 2. automated tests; 3. merge quickly; 4. deploy independently or behind feature flag.",
            "Trunk-based development emphasizes short-lived branches, small commits, strong CI and feature flags for incomplete functionality. Direct pushes to main are a policy choice, not a requirement."
          ],
          "bullets": [
            "Small change on short-lived branch",
            "automated tests",
            "merge quickly",
            "deploy independently or behind feature flag"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Commands ni disposable repository lo practice cheyyandi. Existing team branch policy ni follow cheyyandi; shared history ni force rewrite cheyyakandi."
          ],
          "code": "git switch main\ngit pull --ff-only origin main\ngit switch -c feature/small-change\n# make a small change\ngit add .\ngit commit -m 'Add small feature'\ngit push -u origin feature/small-change\n# open a fast PR, merge after required checks",
          "note": "Production branches protected ga unchandi; merge mundu tests, review and rollback plan verify cheyyandi."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "A team merges several small PRs daily. Incomplete functionality stays behind a feature flag, so main remains deployable while development continues.",
            "Release evidence lo commit SHA, PR link, CI run and artifact version record cheyyandi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "Compared with Git Flow, trunk-based development reduces long-lived branch complexity but requires reliable automated tests, review discipline and feature-flag practices.",
            "Small commits, short-lived branches where possible, required checks, protected main and documented recovery steps follow avvali."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, workflow, trade-offs and practical production example explain cheyyandi. Sample answer: They reduce divergence from main, make conflicts smaller and provide rapid integration feedback. Automated tests and feature flags help keep the trunk stable."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "Trunk-based development emphasizes short-lived branches, small commits, strong CI and feature flags for incomplete functionality. Direct pushes to main are a policy choice, not a requirement.",
            "Simulate two short-lived feature branches, merge one quickly, update the other and compare conflict size with a long-lived branch."
          ],
          "bullets": [
            "Simulate two short-lived feature branches, merge one quickly, update the other and compare conflict size with a long-lived branch.",
            "git status and git log output capture cheyyandi.",
            "Failure case simulate chesi safe recovery verify cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "Why use short-lived branches in trunk-based development?",
          "answer": "They reduce divergence from main, make conflicts smaller and provide rapid integration feedback. Automated tests and feature flags help keep the trunk stable."
        }
      ],
      "handsOn": [
        "Simulate two short-lived feature branches, merge one quickly, update the other and compare conflict size with a long-lived branch.",
        "Workflow diagram ni own words lo explain cheyyandi.",
        "One failure scenario create chesi recovery steps document cheyyandi."
      ]
    },
    "git-github/git-troubleshooting": {
      "summary": "Git Troubleshooting: Diagnose common Git problems involving authentication, rejected pushes, detached HEAD, conflicts, large files and incorrect history. CI push fails because main is protected. Engineer creates a feature branch and PR instead of force-pushing. For a non-fast-forward rejection, fetch and inspect both sides before integrating.",
      "diagram": {
        "title": "Git Troubleshooting workflow",
        "nodes": [
          "Read exact error",
          "inspect status branch remotes and history",
          "identify mismatch",
          "choose non-destructive repair",
          "verify"
        ],
        "explanation": "A rejected push may mean the remote has commits missing locally or branch protection blocks direct pushes. Detached HEAD means HEAD points directly to a commit; create a branch if new work must be retained. Authentication errors require checking URL, credential helper, SSH key and permissions. Workflow stages: Read exact error → inspect status branch remotes and history → identify mismatch → choose non-destructive repair → verify."
      },
      "sections": [
        {
          "heading": "1. Git Troubleshooting ante enti?",
          "paragraphs": [
            "Diagnose common Git problems involving authentication, rejected pushes, detached HEAD, conflicts, large files and incorrect history.",
            "Git history and branch behavior ni ardham chesukunte team changes ni safe ga plan, integrate and recover cheyochu."
          ]
        },
        {
          "heading": "2. Enduku avasaram?",
          "paragraphs": [
            "Git errors often reflect repository state or remote policy; blindly forcing commands can lose work or overwrite shared commits.",
            "Clear branching policy lekapothe merge conflicts, delayed integration and unclear release state increase avuthayi."
          ]
        },
        {
          "heading": "3. Eppudu use cheyali?",
          "paragraphs": [
            "Use this workflow when clone, fetch, pull, push, checkout, merge or CI checkout behaves unexpectedly.",
            "Operation mundu branch name, working tree, remote state and repository protection policy inspect cheyyali."
          ]
        },
        {
          "heading": "4. Ekkada use chestham?",
          "paragraphs": [
            "GitHub repositories, application development, infrastructure code, release engineering and CI/CD pipelines lo use chestharu.",
            "CI push fails because main is protected. Engineer creates a feature branch and PR instead of force-pushing. For a non-fast-forward rejection, fetch and inspect both sides before integrating."
          ]
        },
        {
          "heading": "5. Git Troubleshooting ela work avuthundi?",
          "paragraphs": [
            "Flow: 1. Read exact error; 2. inspect status branch remotes and history; 3. identify mismatch; 4. choose non-destructive repair; 5. verify.",
            "A rejected push may mean the remote has commits missing locally or branch protection blocks direct pushes. Detached HEAD means HEAD points directly to a commit; create a branch if new work must be retained. Authentication errors require checking URL, credential helper, SSH key and permissions."
          ],
          "bullets": [
            "Read exact error",
            "inspect status branch remotes and history",
            "identify mismatch",
            "choose non-destructive repair",
            "verify"
          ]
        },
        {
          "heading": "6. Practical commands and example",
          "paragraphs": [
            "Commands ni disposable repository lo practice cheyyandi. Existing team branch policy ni follow cheyyandi; shared history ni force rewrite cheyyakandi."
          ],
          "code": "git status --short --branch\ngit remote -v\ngit branch -avv\ngit log --oneline --graph --decorate -15\ngit fetch origin\n# inspect divergence before integrating:\ngit log --oneline HEAD..origin/main\ngit log --oneline origin/main..HEAD",
          "note": "Production branches protected ga unchandi; merge mundu tests, review and rollback plan verify cheyyandi."
        },
        {
          "heading": "7. Real-time DevOps scenario",
          "paragraphs": [
            "CI push fails because main is protected. Engineer creates a feature branch and PR instead of force-pushing. For a non-fast-forward rejection, fetch and inspect both sides before integrating.",
            "Release evidence lo commit SHA, PR link, CI run and artifact version record cheyyandi."
          ]
        },
        {
          "heading": "8. Comparison and best practices",
          "paragraphs": [
            "fetch downloads remote state without integrating; pull integrates it. Force push rewrites remote branch history; normal push does not. Avoid force-push on shared branches; use --force-with-lease only with team approval.",
            "Small commits, short-lived branches where possible, required checks, protected main and documented recovery steps follow avvali."
          ]
        },
        {
          "heading": "9. Interview explanation",
          "paragraphs": [
            "Interview lo definition, workflow, trade-offs and practical production example explain cheyyandi. Sample answer: First inspect status and remote tracking state, then fetch origin and compare local and remote commits. Integrate remote changes with the team's merge or rebase policy, resolve conflicts, run tests and push. If branch protection rejected it, use a PR."
          ]
        },
        {
          "heading": "10. Important points and hands-on practice",
          "paragraphs": [
            "A rejected push may mean the remote has commits missing locally or branch protection blocks direct pushes. Detached HEAD means HEAD points directly to a commit; create a branch if new work must be retained. Authentication errors require checking URL, credential helper, SSH key and permissions.",
            "Use a remote bare repository and two clones to reproduce a non-fast-forward rejection; fetch, inspect divergence and integrate safely."
          ],
          "bullets": [
            "Use a remote bare repository and two clones to reproduce a non-fast-forward rejection; fetch, inspect divergence and integrate safely.",
            "git status and git log output capture cheyyandi.",
            "Failure case simulate chesi safe recovery verify cheyyandi."
          ]
        }
      ],
      "interview": [
        {
          "question": "How do you troubleshoot a rejected Git push?",
          "answer": "First inspect status and remote tracking state, then fetch origin and compare local and remote commits. Integrate remote changes with the team's merge or rebase policy, resolve conflicts, run tests and push. If branch protection rejected it, use a PR."
        }
      ],
      "handsOn": [
        "Use a remote bare repository and two clones to reproduce a non-fast-forward rejection; fetch, inspect divergence and integrate safely.",
        "Workflow diagram ni own words lo explain cheyyandi.",
        "One failure scenario create chesi recovery steps document cheyyandi."
      ]
    }
  }
  "aws/cloud-computing-fundamentals": {
    "summary": "On-demand compute, storage and networking delivered over a network with usage-based pricing",
    "diagram": {
      "title": "Cloud Computing Fundamentals workflow",
      "nodes": [
        "AWS account",
        "region",
        "service API",
        "metered resource"
      ],
      "explanation": "AWS account → region → service API → metered resource. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "On-demand compute, storage and networking delivered over a network with usage-based pricing",
          "Avoid buying and maintaining physical servers; provision capacity when demand changes"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A team launches a test server for two hours and terminates it after validation.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "AWS account → region → service API → metered resource. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "A team launches a test server for two hours and terminates it after validation.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws sts get-caller-identity\naws ec2 describe-regions --output table",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "On-demand compute, storage and networking delivered over a network with usage-based pricing In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Cloud Computing Fundamentals and give a DevOps use case.",
        "answer": "On-demand compute, storage and networking delivered over a network with usage-based pricing I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Cloud Computing Fundamentals?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/aws-global-infrastructure": {
    "summary": "Regions are separate geographic areas; Availability Zones are isolated locations within a Region; edge locations serve content closer to users",
    "diagram": {
      "title": "AWS Global Infrastructure workflow",
      "nodes": [
        "User",
        "Route 53",
        "nearest edge / regional endpoint",
        "AZ-backed workload"
      ],
      "explanation": "User → Route 53 → nearest edge / regional endpoint → AZ-backed workload. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Regions are separate geographic areas; Availability Zones are isolated locations within a Region; edge locations serve content closer to users",
          "Choose geography for latency, data residency, resilience and service availability"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Deploy an application across multiple AZs in Mumbai so one AZ outage does not stop the service.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "User → Route 53 → nearest edge / regional endpoint → AZ-backed workload. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Deploy an application across multiple AZs in Mumbai so one AZ outage does not stop the service.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-regions --all\naws ec2 describe-availability-zones --region ap-south-1",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Regions are separate geographic areas; Availability Zones are isolated locations within a Region; edge locations serve content closer to users In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain AWS Global Infrastructure and give a DevOps use case.",
        "answer": "Regions are separate geographic areas; Availability Zones are isolated locations within a Region; edge locations serve content closer to users I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving AWS Global Infrastructure?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/iam-users-and-roles": {
    "summary": "IAM identities represent people or workloads; roles provide temporary credentials through an assumable trust relationship",
    "diagram": {
      "title": "IAM Users and Roles workflow",
      "nodes": [
        "Human / EC2 workload",
        "identity provider or STS",
        "IAM role",
        "temporary credentials"
      ],
      "explanation": "Human / EC2 workload → identity provider or STS → IAM role → temporary credentials. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "IAM identities represent people or workloads; roles provide temporary credentials through an assumable trust relationship",
          "Avoid sharing root credentials and long-lived keys; grant each operator or workload its own identity"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Attach an instance profile role to an EC2 application instead of storing AWS keys on disk.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Human / EC2 workload → identity provider or STS → IAM role → temporary credentials. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Attach an instance profile role to an EC2 application instead of storing AWS keys on disk.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws sts get-caller-identity\naws iam list-roles",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "IAM identities represent people or workloads; roles provide temporary credentials through an assumable trust relationship In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain IAM Users and Roles and give a DevOps use case.",
        "answer": "IAM identities represent people or workloads; roles provide temporary credentials through an assumable trust relationship I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving IAM Users and Roles?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/iam-policies": {
    "summary": "Policies are JSON permission documents containing Effect, Action, Resource and optional Condition",
    "diagram": {
      "title": "IAM Policies workflow",
      "nodes": [
        "Principal",
        "identity/resource policy evaluation",
        "allow or explicit deny"
      ],
      "explanation": "Principal → identity/resource policy evaluation → allow or explicit deny. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Policies are JSON permission documents containing Effect, Action, Resource and optional Condition",
          "Apply least privilege and make access reviewable rather than granting broad administrator access"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Allow an application role to read only one S3 bucket prefix.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Principal → identity/resource policy evaluation → allow or explicit deny. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Allow an application role to read only one S3 bucket prefix.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws iam get-policy-version --policy-arn arn:aws:iam::123456789012:policy/ReadOnlyApp --version-id v1",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Policies are JSON permission documents containing Effect, Action, Resource and optional Condition In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain IAM Policies and give a DevOps use case.",
        "answer": "Policies are JSON permission documents containing Effect, Action, Resource and optional Condition I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving IAM Policies?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/mfa-and-access-keys": {
    "summary": "MFA adds a second proof of identity; access keys are programmatic credentials consisting of an access key ID and secret",
    "diagram": {
      "title": "MFA and Access Keys workflow",
      "nodes": [
        "User sign-in",
        "password + MFA",
        "session; CLI",
        "credential provider / role",
        "signed API call"
      ],
      "explanation": "User sign-in → password + MFA → session; CLI → credential provider / role → signed API call. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "MFA adds a second proof of identity; access keys are programmatic credentials consisting of an access key ID and secret",
          "Reduce account takeover risk and avoid static credentials where role-based temporary credentials are possible"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Require MFA for privileged human access and rotate/revoke exposed keys immediately.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "User sign-in → password + MFA → session; CLI → credential provider / role → signed API call. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Require MFA for privileged human access and rotate/revoke exposed keys immediately.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws configure list\naws sts get-caller-identity",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "MFA adds a second proof of identity; access keys are programmatic credentials consisting of an access key ID and secret In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain MFA and Access Keys and give a DevOps use case.",
        "answer": "MFA adds a second proof of identity; access keys are programmatic credentials consisting of an access key ID and secret I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving MFA and Access Keys?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/ec2-introduction": {
    "summary": "EC2 provides resizable virtual machine instances with selectable CPU, memory, storage and networking",
    "diagram": {
      "title": "EC2 Introduction workflow",
      "nodes": [
        "AMI",
        "instance type",
        "subnet + security group",
        "EBS",
        "running instance"
      ],
      "explanation": "AMI → instance type → subnet + security group → EBS → running instance. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "EC2 provides resizable virtual machine instances with selectable CPU, memory, storage and networking",
          "Run application servers, build agents, bastions and workloads needing OS-level control"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Launch an Ubuntu instance, install Nginx, verify the health endpoint, then terminate the lab instance.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "AMI → instance type → subnet + security group → EBS → running instance. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Launch an Ubuntu instance, install Nginx, verify the health endpoint, then terminate the lab instance.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-instances --filters Name=instance-state-name,Values=running --query 'Reservations[].Instances[].[InstanceId,InstanceType,State.Name]' --output table",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EC2 provides resizable virtual machine instances with selectable CPU, memory, storage and networking In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EC2 Introduction and give a DevOps use case.",
        "answer": "EC2 provides resizable virtual machine instances with selectable CPU, memory, storage and networking I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving EC2 Introduction?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/ec2-instance-types": {
    "summary": "Instance families are optimized for general purpose, compute, memory, storage or accelerated workloads",
    "diagram": {
      "title": "EC2 Instance Types workflow",
      "nodes": [
        "Workload metrics",
        "instance family/size selection",
        "EC2 capacity"
      ],
      "explanation": "Workload metrics → instance family/size selection → EC2 capacity. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Instance families are optimized for general purpose, compute, memory, storage or accelerated workloads",
          "Match CPU, RAM, network and accelerator needs to measured workload behavior and cost"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Compare a burstable dev server with a compute-optimized worker using CPU metrics and benchmark results.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Workload metrics → instance family/size selection → EC2 capacity. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Compare a burstable dev server with a compute-optimized worker using CPU metrics and benchmark results.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-instance-types --instance-types t3.micro m7i.large --query 'InstanceTypes[].[InstanceType,VCpuInfo.DefaultVCpus,MemoryInfo.SizeInMiB]'",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Instance families are optimized for general purpose, compute, memory, storage or accelerated workloads In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EC2 Instance Types and give a DevOps use case.",
        "answer": "Instance families are optimized for general purpose, compute, memory, storage or accelerated workloads I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving EC2 Instance Types?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/ami-and-launch-templates": {
    "summary": "An AMI is a reusable machine image; a launch template stores versioned EC2 launch settings",
    "diagram": {
      "title": "AMI and Launch Templates workflow",
      "nodes": [
        "Golden AMI + launch template version",
        "Auto Scaling / EC2 launch"
      ],
      "explanation": "Golden AMI + launch template version → Auto Scaling / EC2 launch. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "An AMI is a reusable machine image; a launch template stores versioned EC2 launch settings",
          "Standardize repeatable instance creation and roll out reviewed configuration changes"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Bake approved packages and agents into a golden AMI, then roll out a new launch-template version.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Golden AMI + launch template version → Auto Scaling / EC2 launch. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Bake approved packages and agents into a golden AMI, then roll out a new launch-template version.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-images --owners self\naws ec2 describe-launch-templates",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An AMI is a reusable machine image; a launch template stores versioned EC2 launch settings In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain AMI and Launch Templates and give a DevOps use case.",
        "answer": "An AMI is a reusable machine image; a launch template stores versioned EC2 launch settings I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving AMI and Launch Templates?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/ebs-volumes": {
    "summary": "EBS provides persistent block storage volumes attached to EC2 instances, normally within one AZ",
    "diagram": {
      "title": "EBS Volumes workflow",
      "nodes": [
        "EC2",
        "EBS block device",
        "filesystem mount",
        "application data"
      ],
      "explanation": "EC2 → EBS block device → filesystem mount → application data. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "EBS provides persistent block storage volumes attached to EC2 instances, normally within one AZ",
          "Keep application data separate from ephemeral instance lifecycle and select performance to match I/O"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Attach and mount a data volume; verify filesystem UUID and mount configuration before reboot.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "EC2 → EBS block device → filesystem mount → application data. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Attach and mount a data volume; verify filesystem UUID and mount configuration before reboot.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "lsblk\nlsblk -f\ndf -h\naws ec2 describe-volumes",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EBS provides persistent block storage volumes attached to EC2 instances, normally within one AZ In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EBS Volumes and give a DevOps use case.",
        "answer": "EBS provides persistent block storage volumes attached to EC2 instances, normally within one AZ I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving EBS Volumes?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/ebs-snapshots": {
    "summary": "EBS snapshots are point-in-time, incremental backups stored and managed by AWS",
    "diagram": {
      "title": "EBS Snapshots workflow",
      "nodes": [
        "EBS volume",
        "snapshot",
        "retained backup",
        "restored volume"
      ],
      "explanation": "EBS volume → snapshot → retained backup → restored volume. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "EBS snapshots are point-in-time, incremental backups stored and managed by AWS",
          "Recover from accidental deletion or create reusable volume copies; snapshots alone do not prove application consistency"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Create a snapshot before a risky maintenance operation and test restoring it to a new volume.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "EBS volume → snapshot → retained backup → restored volume. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Create a snapshot before a risky maintenance operation and test restoring it to a new volume.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-snapshots --owner-ids self\naws ec2 create-snapshot --volume-id vol-0123456789abcdef0 --description 'approved-backup'",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EBS snapshots are point-in-time, incremental backups stored and managed by AWS In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EBS Snapshots and give a DevOps use case.",
        "answer": "EBS snapshots are point-in-time, incremental backups stored and managed by AWS I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving EBS Snapshots?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/elastic-load-balancing": {
    "summary": "ELB distributes incoming connections across registered targets and performs health checks; ALB, NLB and GWLB serve different traffic patterns",
    "diagram": {
      "title": "Elastic Load Balancing workflow",
      "nodes": [
        "Client",
        "listener",
        "target group health check",
        "healthy EC2 targets"
      ],
      "explanation": "Client → listener → target group health check → healthy EC2 targets. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "ELB distributes incoming connections across registered targets and performs health checks; ALB, NLB and GWLB serve different traffic patterns",
          "Avoid a single application instance becoming the only entry point and remove unhealthy targets automatically"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Put two web instances behind an ALB and confirm traffic continues when one target is unhealthy.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Client → listener → target group health check → healthy EC2 targets. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Put two web instances behind an ALB and confirm traffic continues when one target is unhealthy.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws elbv2 describe-load-balancers\naws elbv2 describe-target-groups",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "ELB distributes incoming connections across registered targets and performs health checks; ALB, NLB and GWLB serve different traffic patterns In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Elastic Load Balancing and give a DevOps use case.",
        "answer": "ELB distributes incoming connections across registered targets and performs health checks; ALB, NLB and GWLB serve different traffic patterns I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Elastic Load Balancing?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/auto-scaling-groups": {
    "summary": "An ASG maintains desired EC2 capacity and can scale based on schedules or metrics",
    "diagram": {
      "title": "Auto Scaling Groups workflow",
      "nodes": [
        "CloudWatch metric / health signal",
        "scaling policy",
        "ASG",
        "EC2 instances across AZs"
      ],
      "explanation": "CloudWatch metric / health signal → scaling policy → ASG → EC2 instances across AZs. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "An ASG maintains desired EC2 capacity and can scale based on schedules or metrics",
          "Replace failed instances and adjust capacity as demand changes without manually launching servers"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Set minimum, desired and maximum capacity, then test scale-out with a load metric in a lab.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "CloudWatch metric / health signal → scaling policy → ASG → EC2 instances across AZs. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Set minimum, desired and maximum capacity, then test scale-out with a load metric in a lab.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws autoscaling describe-auto-scaling-groups\naws autoscaling describe-scaling-activities",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An ASG maintains desired EC2 capacity and can scale based on schedules or metrics In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Auto Scaling Groups and give a DevOps use case.",
        "answer": "An ASG maintains desired EC2 capacity and can scale based on schedules or metrics I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Auto Scaling Groups?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/vpc-fundamentals": {
    "summary": "A VPC is a logically isolated virtual network with IP address ranges, subnets, routes and network controls",
    "diagram": {
      "title": "VPC Fundamentals workflow",
      "nodes": [
        "VPC CIDR",
        "public/private subnets",
        "route tables",
        "gateways and security controls"
      ],
      "explanation": "VPC CIDR → public/private subnets → route tables → gateways and security controls. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "A VPC is a logically isolated virtual network with IP address ranges, subnets, routes and network controls",
          "Define network boundaries and connectivity for application tiers and environments"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Design separate public load-balancer and private application/database subnets.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "VPC CIDR → public/private subnets → route tables → gateways and security controls. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Design separate public load-balancer and private application/database subnets.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-vpcs\naws ec2 describe-subnets",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A VPC is a logically isolated virtual network with IP address ranges, subnets, routes and network controls In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain VPC Fundamentals and give a DevOps use case.",
        "answer": "A VPC is a logically isolated virtual network with IP address ranges, subnets, routes and network controls I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving VPC Fundamentals?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/subnets-and-route-tables": {
    "summary": "A subnet is an IP range inside one AZ; a route table decides where subnet traffic is sent",
    "diagram": {
      "title": "Subnets and Route Tables workflow",
      "nodes": [
        "Packet destination",
        "subnet route table",
        "local / gateway / peering target"
      ],
      "explanation": "Packet destination → subnet route table → local / gateway / peering target. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "A subnet is an IP range inside one AZ; a route table decides where subnet traffic is sent",
          "Separate public ingress, private application and isolated data tiers with explicit routes"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Check that a private subnet has no direct Internet Gateway default route.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Packet destination → subnet route table → local / gateway / peering target. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Check that a private subnet has no direct Internet Gateway default route.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-route-tables\naws ec2 describe-subnets",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A subnet is an IP range inside one AZ; a route table decides where subnet traffic is sent In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Subnets and Route Tables and give a DevOps use case.",
        "answer": "A subnet is an IP range inside one AZ; a route table decides where subnet traffic is sent I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Subnets and Route Tables?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/internet-and-nat-gateways": {
    "summary": "An Internet Gateway enables eligible public-subnet internet routing; a NAT Gateway lets private IPv4 resources initiate outbound connections",
    "diagram": {
      "title": "Internet and NAT Gateways workflow",
      "nodes": [
        "Public subnet",
        "IGW; private subnet",
        "NAT Gateway in public subnet",
        "IGW"
      ],
      "explanation": "Public subnet → IGW; private subnet → NAT Gateway in public subnet → IGW. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "An Internet Gateway enables eligible public-subnet internet routing; a NAT Gateway lets private IPv4 resources initiate outbound connections",
          "Allow public endpoints where required while keeping private instances unreachable through unsolicited internet connections"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Allow private EC2 instances to download updates through NAT without assigning public IP addresses.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Public subnet → IGW; private subnet → NAT Gateway in public subnet → IGW. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Allow private EC2 instances to download updates through NAT without assigning public IP addresses.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-internet-gateways\naws ec2 describe-nat-gateways",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An Internet Gateway enables eligible public-subnet internet routing; a NAT Gateway lets private IPv4 resources initiate outbound connections In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Internet and NAT Gateways and give a DevOps use case.",
        "answer": "An Internet Gateway enables eligible public-subnet internet routing; a NAT Gateway lets private IPv4 resources initiate outbound connections I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Internet and NAT Gateways?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/security-groups-and-nacls": {
    "summary": "Security groups are stateful instance/network-interface firewalls; network ACLs are stateless subnet-level filters",
    "diagram": {
      "title": "Security Groups and NACLs workflow",
      "nodes": [
        "Packet",
        "subnet NACL",
        "ENI security group",
        "service listener"
      ],
      "explanation": "Packet → subnet NACL → ENI security group → service listener. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Security groups are stateful instance/network-interface firewalls; network ACLs are stateless subnet-level filters",
          "Control allowed traffic at multiple layers and reduce exposed ports"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Allow HTTPS from the load balancer security group to app instances; do not expose SSH to the world.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Packet → subnet NACL → ENI security group → service listener. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Allow HTTPS from the load balancer security group to app instances; do not expose SSH to the world.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ec2 describe-security-groups\naws ec2 describe-network-acls",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Security groups are stateful instance/network-interface firewalls; network ACLs are stateless subnet-level filters In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Security Groups and NACLs and give a DevOps use case.",
        "answer": "Security groups are stateful instance/network-interface firewalls; network ACLs are stateless subnet-level filters I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Security Groups and NACLs?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/s3-buckets": {
    "summary": "S3 is object storage using buckets and keys, suitable for files, logs, artifacts and static assets",
    "diagram": {
      "title": "S3 Buckets workflow",
      "nodes": [
        "Application / CLI",
        "IAM authorization",
        "bucket + object key",
        "S3"
      ],
      "explanation": "Application / CLI → IAM authorization → bucket + object key → S3. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "S3 is object storage using buckets and keys, suitable for files, logs, artifacts and static assets",
          "Store durable unstructured data without managing block devices or file servers"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Upload a build artifact to a private bucket using a role with scoped permissions.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Application / CLI → IAM authorization → bucket + object key → S3. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Upload a build artifact to a private bucket using a role with scoped permissions.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws s3api list-buckets\naws s3 ls s3://YOUR-BUCKET/",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "S3 is object storage using buckets and keys, suitable for files, logs, artifacts and static assets In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain S3 Buckets and give a DevOps use case.",
        "answer": "S3 is object storage using buckets and keys, suitable for files, logs, artifacts and static assets I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving S3 Buckets?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/s3-versioning-and-lifecycle": {
    "summary": "Versioning preserves multiple object versions; lifecycle rules transition or expire objects according to retention policy",
    "diagram": {
      "title": "S3 Versioning and Lifecycle workflow",
      "nodes": [
        "Object write",
        "version history",
        "lifecycle age/filter",
        "transition or expiration"
      ],
      "explanation": "Object write → version history → lifecycle age/filter → transition or expiration. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Versioning preserves multiple object versions; lifecycle rules transition or expire objects according to retention policy",
          "Recover overwritten objects and control storage costs while meeting retention requirements"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Enable versioning and configure a reviewed lifecycle policy for old noncurrent versions.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Object write → version history → lifecycle age/filter → transition or expiration. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Enable versioning and configure a reviewed lifecycle policy for old noncurrent versions.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws s3api get-bucket-versioning --bucket YOUR-BUCKET\naws s3api get-bucket-lifecycle-configuration --bucket YOUR-BUCKET",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Versioning preserves multiple object versions; lifecycle rules transition or expire objects according to retention policy In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain S3 Versioning and Lifecycle and give a DevOps use case.",
        "answer": "Versioning preserves multiple object versions; lifecycle rules transition or expire objects according to retention policy I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving S3 Versioning and Lifecycle?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/efs": {
    "summary": "EFS is managed elastic NFS file storage that can be mounted concurrently by supported clients",
    "diagram": {
      "title": "EFS workflow",
      "nodes": [
        "EC2 / ECS task in VPC",
        "mount target",
        "NFS filesystem"
      ],
      "explanation": "EC2 / ECS task in VPC → mount target → NFS filesystem. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "EFS is managed elastic NFS file storage that can be mounted concurrently by supported clients",
          "Share files between multiple Linux instances or container tasks without copying data between hosts"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Mount shared application uploads from two EC2 instances and verify both see the same file.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "EC2 / ECS task in VPC → mount target → NFS filesystem. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Mount shared application uploads from two EC2 instances and verify both see the same file.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "df -hT\nmount | grep efs\naws efs describe-file-systems",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "EFS is managed elastic NFS file storage that can be mounted concurrently by supported clients In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain EFS and give a DevOps use case.",
        "answer": "EFS is managed elastic NFS file storage that can be mounted concurrently by supported clients I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving EFS?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/rds": {
    "summary": "RDS is a managed relational database service handling common operational tasks such as backups, patching options and monitoring",
    "diagram": {
      "title": "RDS workflow",
      "nodes": [
        "Application private subnet",
        "DB security group",
        "RDS endpoint",
        "database engine"
      ],
      "explanation": "Application private subnet → DB security group → RDS endpoint → database engine. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "RDS is a managed relational database service handling common operational tasks such as backups, patching options and monitoring",
          "Run relational databases without manually operating every database host component"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Keep RDS private and allow inbound database traffic only from the application security group.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Application private subnet → DB security group → RDS endpoint → database engine. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Keep RDS private and allow inbound database traffic only from the application security group.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws rds describe-db-instances --query 'DBInstances[].[DBInstanceIdentifier,Engine,DBInstanceStatus,Endpoint.Address]' --output table",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "RDS is a managed relational database service handling common operational tasks such as backups, patching options and monitoring In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain RDS and give a DevOps use case.",
        "answer": "RDS is a managed relational database service handling common operational tasks such as backups, patching options and monitoring I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving RDS?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/dynamodb": {
    "summary": "DynamoDB is a managed NoSQL key-value/document database with partition and sort key access patterns",
    "diagram": {
      "title": "DynamoDB workflow",
      "nodes": [
        "Application SDK",
        "IAM role",
        "table key lookup/query",
        "DynamoDB"
      ],
      "explanation": "Application SDK → IAM role → table key lookup/query → DynamoDB. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "DynamoDB is a managed NoSQL key-value/document database with partition and sort key access patterns",
          "Serve predictable low-latency lookups and high-scale workloads without managing database servers"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Model a session table around userId as partition key and sessionId as sort key.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Application SDK → IAM role → table key lookup/query → DynamoDB. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Model a session table around userId as partition key and sessionId as sort key.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws dynamodb list-tables\naws dynamodb describe-table --table-name YOUR_TABLE",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "DynamoDB is a managed NoSQL key-value/document database with partition and sort key access patterns In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain DynamoDB and give a DevOps use case.",
        "answer": "DynamoDB is a managed NoSQL key-value/document database with partition and sort key access patterns I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving DynamoDB?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/route-53": {
    "summary": "Route 53 is AWS DNS service for hosted zones, records, health checks and routing policies",
    "diagram": {
      "title": "Route 53 workflow",
      "nodes": [
        "Client DNS query",
        "resolver",
        "hosted zone record",
        "endpoint"
      ],
      "explanation": "Client DNS query → resolver → hosted zone record → endpoint. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Route 53 is AWS DNS service for hosted zones, records, health checks and routing policies",
          "Resolve application names and route users using simple, weighted, latency or failover policies"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Create an alias record to an ALB and validate DNS resolution with dig.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Client DNS query → resolver → hosted zone record → endpoint. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Create an alias record to an ALB and validate DNS resolution with dig.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws route53 list-hosted-zones\naws route53 list-resource-record-sets --hosted-zone-id YOUR_ZONE_ID",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Route 53 is AWS DNS service for hosted zones, records, health checks and routing policies In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Route 53 and give a DevOps use case.",
        "answer": "Route 53 is AWS DNS service for hosted zones, records, health checks and routing policies I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Route 53?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/cloudfront": {
    "summary": "CloudFront is a content delivery network that caches content at edge locations and connects to configured origins",
    "diagram": {
      "title": "CloudFront workflow",
      "nodes": [
        "Viewer",
        "edge cache",
        "cache hit or origin fetch",
        "response"
      ],
      "explanation": "Viewer → edge cache → cache hit or origin fetch → response. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "CloudFront is a content delivery network that caches content at edge locations and connects to configured origins",
          "Reduce latency and origin load for static and cacheable dynamic content"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Serve versioned static assets through CloudFront and invalidate only when necessary.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Viewer → edge cache → cache hit or origin fetch → response. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Serve versioned static assets through CloudFront and invalidate only when necessary.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws cloudfront list-distributions\ncurl -I https://YOUR_DOMAIN",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "CloudFront is a content delivery network that caches content at edge locations and connects to configured origins In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CloudFront and give a DevOps use case.",
        "answer": "CloudFront is a content delivery network that caches content at edge locations and connects to configured origins I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving CloudFront?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/cloudwatch": {
    "summary": "CloudWatch collects metrics, logs and alarms and supports dashboards and operational monitoring",
    "diagram": {
      "title": "CloudWatch workflow",
      "nodes": [
        "AWS service / agent",
        "metrics or log groups",
        "alarm",
        "notification or automation"
      ],
      "explanation": "AWS service / agent → metrics or log groups → alarm → notification or automation. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "CloudWatch collects metrics, logs and alarms and supports dashboards and operational monitoring",
          "Detect resource and application problems before users report them"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Create an alarm for sustained high EC2 CPU and send it to an operations notification path.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "AWS service / agent → metrics or log groups → alarm → notification or automation. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Create an alarm for sustained high EC2 CPU and send it to an operations notification path.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws cloudwatch list-metrics\naws logs describe-log-groups",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "CloudWatch collects metrics, logs and alarms and supports dashboards and operational monitoring In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CloudWatch and give a DevOps use case.",
        "answer": "CloudWatch collects metrics, logs and alarms and supports dashboards and operational monitoring I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving CloudWatch?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/cloudtrail": {
    "summary": "CloudTrail records AWS account activity and API events for auditing and investigation",
    "diagram": {
      "title": "CloudTrail workflow",
      "nodes": [
        "AWS API call",
        "CloudTrail event",
        "event history / trail S3 destination"
      ],
      "explanation": "AWS API call → CloudTrail event → event history / trail S3 destination. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "CloudTrail records AWS account activity and API events for auditing and investigation",
          "Answer who performed an API action, when it happened and which identity or source was involved"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Investigate an unexpected security-group change by filtering CloudTrail events for AuthorizeSecurityGroupIngress.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "AWS API call → CloudTrail event → event history / trail S3 destination. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Investigate an unexpected security-group change by filtering CloudTrail events for AuthorizeSecurityGroupIngress.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws cloudtrail lookup-events --max-results 10",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "CloudTrail records AWS account activity and API events for auditing and investigation In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain CloudTrail and give a DevOps use case.",
        "answer": "CloudTrail records AWS account activity and API events for auditing and investigation I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving CloudTrail?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/systems-manager": {
    "summary": "Systems Manager provides managed operational capabilities such as Session Manager, Run Command, patching and inventory",
    "diagram": {
      "title": "Systems Manager workflow",
      "nodes": [
        "Operator IAM identity",
        "SSM service",
        "managed node agent",
        "command/session"
      ],
      "explanation": "Operator IAM identity → SSM service → managed node agent → command/session. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Systems Manager provides managed operational capabilities such as Session Manager, Run Command, patching and inventory",
          "Administer instances without opening inbound SSH or maintaining bastion access for every task"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Session Manager with audited access instead of exposing SSH to public networks.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Operator IAM identity → SSM service → managed node agent → command/session. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Use Session Manager with audited access instead of exposing SSH to public networks.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ssm describe-instance-information\naws ssm start-session --target i-0123456789abcdef0",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Systems Manager provides managed operational capabilities such as Session Manager, Run Command, patching and inventory In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Systems Manager and give a DevOps use case.",
        "answer": "Systems Manager provides managed operational capabilities such as Session Manager, Run Command, patching and inventory I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Systems Manager?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/lambda": {
    "summary": "Lambda runs event-driven functions without requiring the team to provision or manage servers",
    "diagram": {
      "title": "Lambda workflow",
      "nodes": [
        "Event source",
        "Lambda invocation",
        "execution role",
        "function",
        "downstream service"
      ],
      "explanation": "Event source → Lambda invocation → execution role → function → downstream service. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Lambda runs event-driven functions without requiring the team to provision or manage servers",
          "Execute short-lived event handlers, automation and API backends with scaling managed by the service"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Trigger a function from an S3 object-created event and grant only required bucket permissions.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Event source → Lambda invocation → execution role → function → downstream service. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Trigger a function from an S3 object-created event and grant only required bucket permissions.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws lambda list-functions\naws lambda get-function-configuration --function-name YOUR_FUNCTION",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Lambda runs event-driven functions without requiring the team to provision or manage servers In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Lambda and give a DevOps use case.",
        "answer": "Lambda runs event-driven functions without requiring the team to provision or manage servers I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Lambda?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/ecr": {
    "summary": "ECR is a managed container image registry with repository access controls and image scanning options",
    "diagram": {
      "title": "ECR workflow",
      "nodes": [
        "CI build",
        "image tag/digest",
        "ECR repository",
        "ECS/EKS pull"
      ],
      "explanation": "CI build → image tag/digest → ECR repository → ECS/EKS pull. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "ECR is a managed container image registry with repository access controls and image scanning options",
          "Store, version and distribute container images for ECS, EKS and build pipelines"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Push an immutable release tag and deploy by image digest for reproducible rollbacks.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "CI build → image tag/digest → ECR repository → ECS/EKS pull. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Push an immutable release tag and deploy by image digest for reproducible rollbacks.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ecr describe-repositories\naws ecr list-images --repository-name YOUR_REPOSITORY",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "ECR is a managed container image registry with repository access controls and image scanning options In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain ECR and give a DevOps use case.",
        "answer": "ECR is a managed container image registry with repository access controls and image scanning options I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving ECR?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/ecs": {
    "summary": "ECS orchestrates containers using task definitions, services, clusters and capacity providers",
    "diagram": {
      "title": "ECS workflow",
      "nodes": [
        "Image in ECR",
        "task definition",
        "ECS service",
        "tasks on Fargate or EC2"
      ],
      "explanation": "Image in ECR → task definition → ECS service → tasks on Fargate or EC2. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "ECS orchestrates containers using task definitions, services, clusters and capacity providers",
          "Run containerized applications without operating Kubernetes when ECS fits the workload"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Deploy a service with desired task count two and an ALB health check.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Image in ECR → task definition → ECS service → tasks on Fargate or EC2. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Deploy a service with desired task count two and an ALB health check.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ecs list-clusters\naws ecs describe-services --cluster YOUR_CLUSTER --services YOUR_SERVICE",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "ECS orchestrates containers using task definitions, services, clusters and capacity providers In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain ECS and give a DevOps use case.",
        "answer": "ECS orchestrates containers using task definitions, services, clusters and capacity providers I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving ECS?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/aws-secrets-manager": {
    "summary": "Secrets Manager stores, retrieves and can rotate credentials and other sensitive values",
    "diagram": {
      "title": "AWS Secrets Manager workflow",
      "nodes": [
        "Workload IAM role",
        "Secrets Manager API",
        "encrypted secret",
        "application memory"
      ],
      "explanation": "Workload IAM role → Secrets Manager API → encrypted secret → application memory. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Secrets Manager stores, retrieves and can rotate credentials and other sensitive values",
          "Keep passwords and API tokens out of source code, images and plain environment files"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Grant an application role access to one named secret and retrieve it at runtime.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Workload IAM role → Secrets Manager API → encrypted secret → application memory. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Grant an application role access to one named secret and retrieve it at runtime.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws secretsmanager list-secrets\naws secretsmanager describe-secret --secret-id YOUR_SECRET",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Secrets Manager stores, retrieves and can rotate credentials and other sensitive values In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain AWS Secrets Manager and give a DevOps use case.",
        "answer": "Secrets Manager stores, retrieves and can rotate credentials and other sensitive values I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving AWS Secrets Manager?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/kms": {
    "summary": "KMS manages cryptographic keys and performs or controls cryptographic operations through key policies and grants",
    "diagram": {
      "title": "KMS workflow",
      "nodes": [
        "Service / application",
        "KMS key policy authorization",
        "encrypt/decrypt operation"
      ],
      "explanation": "Service / application → KMS key policy authorization → encrypt/decrypt operation. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "KMS manages cryptographic keys and performs or controls cryptographic operations through key policies and grants",
          "Centralize encryption-key permissions, auditing and lifecycle controls for supported AWS services"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use a customer-managed key for a supported storage service and test key-policy access carefully.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Service / application → KMS key policy authorization → encrypt/decrypt operation. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Use a customer-managed key for a supported storage service and test key-policy access carefully.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws kms list-keys\naws kms describe-key --key-id YOUR_KEY_ID",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "KMS manages cryptographic keys and performs or controls cryptographic operations through key policies and grants In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain KMS and give a DevOps use case.",
        "answer": "KMS manages cryptographic keys and performs or controls cryptographic operations through key policies and grants I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving KMS?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/backup-and-disaster-recovery": {
    "summary": "Backup and disaster recovery combine protected copies, retention, recovery procedures and tested recovery objectives",
    "diagram": {
      "title": "Backup and Disaster Recovery workflow",
      "nodes": [
        "Production data",
        "scheduled backup / cross-account copy",
        "isolated recovery",
        "validation"
      ],
      "explanation": "Production data → scheduled backup / cross-account copy → isolated recovery → validation. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Backup and disaster recovery combine protected copies, retention, recovery procedures and tested recovery objectives",
          "Restore services after deletion, corruption, ransomware or regional failures"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Run a restore drill and measure actual RPO and RTO rather than assuming backups are usable.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Production data → scheduled backup / cross-account copy → isolated recovery → validation. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Run a restore drill and measure actual RPO and RTO rather than assuming backups are usable.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws backup list-backup-vaults\naws backup list-recovery-points-by-backup-vault --backup-vault-name YOUR_VAULT",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Backup and disaster recovery combine protected copies, retention, recovery procedures and tested recovery objectives In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Backup and Disaster Recovery and give a DevOps use case.",
        "answer": "Backup and disaster recovery combine protected copies, retention, recovery procedures and tested recovery objectives I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Backup and Disaster Recovery?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/aws-cli": {
    "summary": "AWS CLI is a command-line client for AWS APIs, using configured profiles or credential providers",
    "diagram": {
      "title": "AWS CLI workflow",
      "nodes": [
        "CLI command",
        "credential resolution",
        "signed AWS API request",
        "JSON response"
      ],
      "explanation": "CLI command → credential resolution → signed AWS API request → JSON response. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "AWS CLI is a command-line client for AWS APIs, using configured profiles or credential providers",
          "Automate repeatable inspection and operations from terminals and CI pipelines"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use named profiles locally and role-based short-lived credentials in CI; never commit access keys.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "CLI command → credential resolution → signed AWS API request → JSON response. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Use named profiles locally and role-based short-lived credentials in CI; never commit access keys.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws --version\naws configure list\naws sts get-caller-identity",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "AWS CLI is a command-line client for AWS APIs, using configured profiles or credential providers In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain AWS CLI and give a DevOps use case.",
        "answer": "AWS CLI is a command-line client for AWS APIs, using configured profiles or credential providers I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving AWS CLI?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/cost-explorer-and-budgets": {
    "summary": "Cost Explorer analyzes spend and usage; Budgets tracks configured thresholds and can notify or trigger supported actions",
    "diagram": {
      "title": "Cost Explorer and Budgets workflow",
      "nodes": [
        "Billing data",
        "Cost Explorer analysis",
        "budget threshold",
        "notification/action"
      ],
      "explanation": "Billing data → Cost Explorer analysis → budget threshold → notification/action. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "Cost Explorer analyzes spend and usage; Budgets tracks configured thresholds and can notify or trigger supported actions",
          "Find unexpected spend, attribute costs and alert teams before budgets are exceeded"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Review spend by service and tag, then create alerts for forecasted budget overruns.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Billing data → Cost Explorer analysis → budget threshold → notification/action. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Review spend by service and tag, then create alerts for forecasted budget overruns.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws ce get-cost-and-usage --time-period Start=2026-11-01,End=2026-11-19 --granularity MONTHLY --metrics UnblendedCost",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Cost Explorer analyzes spend and usage; Budgets tracks configured thresholds and can notify or trigger supported actions In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Cost Explorer and Budgets and give a DevOps use case.",
        "answer": "Cost Explorer analyzes spend and usage; Budgets tracks configured thresholds and can notify or trigger supported actions I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving Cost Explorer and Budgets?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "aws/aws-well-architected-framework": {
    "summary": "The Well-Architected Framework reviews workloads through operational excellence, security, reliability, performance efficiency, cost optimization and sustainability pillars",
    "diagram": {
      "title": "AWS Well-Architected Framework workflow",
      "nodes": [
        "Workload evidence",
        "pillar questions",
        "risks/priorities",
        "improvement plan"
      ],
      "explanation": "Workload evidence → pillar questions → risks/priorities → improvement plan. Each stage has a clear responsibility; verify IAM permissions, network reachability and service health at the boundary where failures occur."
    },
    "sections": [
      {
        "heading": "1. Concept and purpose",
        "paragraphs": [
          "The Well-Architected Framework reviews workloads through operational excellence, security, reliability, performance efficiency, cost optimization and sustainability pillars",
          "Find design risks systematically instead of treating production readiness as only a deployment task"
        ],
        "bullets": [
          "Understand the service boundary and which AWS resources it manages.",
          "Check the Region, account, identity and network context before changing resources."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Review a production workload, record risks, owners and measurable remediation actions.",
          "In a DevOps lifecycle, use this capability during provisioning, deployment, operations, monitoring or recovery as appropriate. Select it based on workload requirements, availability, security and total cost."
        ],
        "bullets": [
          "Development: validate configuration in an isolated account or sandbox.",
          "CI/CD: automate only approved, repeatable actions using scoped roles.",
          "Production: apply change review, monitoring, rollback and ownership procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Workload evidence → pillar questions → risks/priorities → improvement plan. The request is authenticated and authorized before the service performs the operation. Resource configuration, dependencies, quotas and regional availability can affect the result.",
          "For troubleshooting, verify the caller identity first, inspect the resource state, then inspect the relevant logs, metrics, events and network path. Change one variable at a time."
        ],
        "bullets": [
          "Identity and permissions determine who can call the API.",
          "Configuration determines the target resource and behavior.",
          "Monitoring and audit records provide evidence of success or failure."
        ]
      },
      {
        "heading": "4. Practical DevOps example",
        "paragraphs": [
          "Review a production workload, record risks, owners and measurable remediation actions.",
          "Run read-only discovery first. Replace placeholders with your real resource identifiers. The commands below are inspection or lab examples; commands that create, delete, expose or modify resources should be reviewed and run only in a disposable environment."
        ],
        "code": "aws trustedadvisor describe-trusted-advisor-checks --language en",
        "note": "Do not paste account IDs, credentials, secret values or private endpoints into public logs. Confirm the AWS profile and Region before running commands."
      },
      {
        "heading": "5. Benefits, risks and production practices",
        "paragraphs": [
          "The main benefit is managed, repeatable operation with integration into AWS identity, monitoring and automation services.",
          "The service does not remove the need for architecture decisions. Incorrect permissions, public exposure, missing backups, weak retention or untested recovery can still cause incidents."
        ],
        "bullets": [
          "Apply least privilege and prefer temporary role credentials.",
          "Use infrastructure as code and peer review for repeatable configuration.",
          "Enable relevant logging, metrics, alarms and audit trails.",
          "Tag resources, review cost and remove unused lab resources.",
          "Test recovery and rollback procedures before relying on them."
        ]
      },
      {
        "heading": "6. Troubleshooting checklist",
        "paragraphs": [
          "If the workflow fails, start with the exact error and timestamp. Confirm account and Region, caller identity, IAM authorization, resource status, dependencies, quotas and network connectivity. Review CloudTrail for API-level evidence and CloudWatch where service metrics or logs are available."
        ],
        "bullets": [
          "AccessDenied: inspect identity policy, resource policy, permissions boundary and explicit denies.",
          "ResourceNotFound: verify identifier, account and Region.",
          "Timeout or unreachable: inspect routes, security groups, NACLs, DNS and endpoint configuration where applicable.",
          "Unexpected cost or behavior: inspect scaling, retention, tags and recent configuration changes."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Well-Architected Framework reviews workloads through operational excellence, security, reliability, performance efficiency, cost optimization and sustainability pillars In a real DevOps environment, I would use it for the scenario described above, secure it with least-privilege IAM, automate repeatable configuration, monitor its behavior and validate recovery or rollback."
        ],
        "bullets": [
          "What problem does this AWS capability solve?",
          "Which IAM permissions and network dependencies does it require?",
          "How would you monitor, troubleshoot and recover it in production?"
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain AWS Well-Architected Framework and give a DevOps use case.",
        "answer": "The Well-Architected Framework reviews workloads through operational excellence, security, reliability, performance efficiency, cost optimization and sustainability pillars I would introduce it through reviewed infrastructure as code, use a least-privilege IAM role, validate the resource in a non-production environment, monitor the result and document rollback or recovery steps."
      },
      {
        "question": "How do you troubleshoot a failure involving AWS Well-Architected Framework?",
        "answer": "First confirm the AWS account, Region and caller identity. Then inspect the resource state and exact API error, validate IAM policies and dependencies, check network reachability if relevant, and correlate CloudTrail events with CloudWatch logs or metrics. Make the smallest safe correction and verify the outcome."
      }
    ],
    "handsOn": [
      "In a non-production AWS account, identify the service resource relevant to this topic and record its Region, owner, tags and current state.",
      "Run the read-only CLI commands in this lesson using a named profile; explain each output field.",
      "Draw the request path and mark identity, network, dependency and monitoring boundaries.",
      "Create a short runbook with one likely failure, evidence to collect, safe remediation and rollback/cleanup steps."
    ]
  },
  "docker/containerization-fundamentals": {
    "summary": "Containerization packages an application and its runtime dependencies into isolated processes sharing the host kernel.",
    "diagram": {
      "title": "Containerization Fundamentals workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Containerization packages an application and its runtime dependencies into isolated processes sharing the host kernel.",
          "This matters because Containerization Fundamentals addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Containerization Fundamentals while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker ps -a\ndocker inspect YOUR_CONTAINER\ndocker logs --tail 100 YOUR_CONTAINER",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Containerization packages an application and its runtime dependencies into isolated processes sharing the host kernel. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Containerization Fundamentals, and where would you use it?",
        "answer": "Containerization packages an application and its runtime dependencies into isolated processes sharing the host kernel. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Containerization Fundamentals in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Containerization Fundamentals and run the commands above; record the expected and actual output.",
      "Draw the Containerization Fundamentals workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-introduction": {
    "summary": "Docker is a platform for building, distributing and running container images and containers.",
    "diagram": {
      "title": "Docker Introduction workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker is a platform for building, distributing and running container images and containers.",
          "This matters because Docker Introduction addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Introduction while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker version\ndocker info\ndocker run --rm hello-world",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker is a platform for building, distributing and running container images and containers. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Introduction, and where would you use it?",
        "answer": "Docker is a platform for building, distributing and running container images and containers. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Introduction in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Introduction and run the commands above; record the expected and actual output.",
      "Draw the Docker Introduction workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-architecture": {
    "summary": "Docker uses a client-server architecture where CLI requests reach the Engine API and daemon-managed runtime.",
    "diagram": {
      "title": "Docker Architecture workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker uses a client-server architecture where CLI requests reach the Engine API and daemon-managed runtime.",
          "This matters because Docker Architecture addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Architecture while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker context ls\ndocker info\ndocker ps -a",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker uses a client-server architecture where CLI requests reach the Engine API and daemon-managed runtime. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Architecture, and where would you use it?",
        "answer": "Docker uses a client-server architecture where CLI requests reach the Engine API and daemon-managed runtime. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Architecture in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Architecture and run the commands above; record the expected and actual output.",
      "Draw the Docker Architecture workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-engine": {
    "summary": "Docker Engine provides the API and services used to build images and manage containers, networks and volumes.",
    "diagram": {
      "title": "Docker Engine workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker Engine provides the API and services used to build images and manage containers, networks and volumes.",
          "This matters because Docker Engine addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Engine while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker version\nsystemctl status docker",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker Engine provides the API and services used to build images and manage containers, networks and volumes. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Engine, and where would you use it?",
        "answer": "Docker Engine provides the API and services used to build images and manage containers, networks and volumes. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Engine in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Engine and run the commands above; record the expected and actual output.",
      "Draw the Docker Engine workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-client": {
    "summary": "The Docker CLI is a client that sends commands to a local or remote Docker Engine endpoint.",
    "diagram": {
      "title": "Docker Client workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Docker CLI is a client that sends commands to a local or remote Docker Engine endpoint.",
          "This matters because Docker Client addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Client while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker context ls\ndocker ps",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Docker CLI is a client that sends commands to a local or remote Docker Engine endpoint. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Client, and where would you use it?",
        "answer": "The Docker CLI is a client that sends commands to a local or remote Docker Engine endpoint. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Client in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Client and run the commands above; record the expected and actual output.",
      "Draw the Docker Client workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-daemon": {
    "summary": "dockerd is the background service that manages Docker objects and coordinates container lifecycle operations.",
    "diagram": {
      "title": "Docker Daemon workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "dockerd is the background service that manages Docker objects and coordinates container lifecycle operations.",
          "This matters because Docker Daemon addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Daemon while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "systemctl status docker\njournalctl -u docker --since '15 minutes ago'",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "dockerd is the background service that manages Docker objects and coordinates container lifecycle operations. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Daemon, and where would you use it?",
        "answer": "dockerd is the background service that manages Docker objects and coordinates container lifecycle operations. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Daemon in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Daemon and run the commands above; record the expected and actual output.",
      "Draw the Docker Daemon workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-registry": {
    "summary": "A container registry stores image manifests and layers so teams can publish and retrieve versioned artifacts.",
    "diagram": {
      "title": "Docker Registry workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A container registry stores image manifests and layers so teams can publish and retrieve versioned artifacts.",
          "This matters because Docker Registry addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Registry while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker image ls\ndocker manifest inspect nginx:stable",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A container registry stores image manifests and layers so teams can publish and retrieve versioned artifacts. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Registry, and where would you use it?",
        "answer": "A container registry stores image manifests and layers so teams can publish and retrieve versioned artifacts. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Registry in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Registry and run the commands above; record the expected and actual output.",
      "Draw the Docker Registry workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-hub": {
    "summary": "Docker Hub is a hosted registry used to discover, pull and publish public or private container images.",
    "diagram": {
      "title": "Docker Hub workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker Hub is a hosted registry used to discover, pull and publish public or private container images.",
          "This matters because Docker Hub addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Hub while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker pull nginx:stable\ndocker image ls nginx",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker Hub is a hosted registry used to discover, pull and publish public or private container images. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Hub, and where would you use it?",
        "answer": "Docker Hub is a hosted registry used to discover, pull and publish public or private container images. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Hub in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Hub and run the commands above; record the expected and actual output.",
      "Draw the Docker Hub workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-images": {
    "summary": "An image is an immutable layered template from which containers are created.",
    "diagram": {
      "title": "Docker Images workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "An image is an immutable layered template from which containers are created.",
          "This matters because Docker Images addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Images while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker image ls\ndocker image inspect nginx:stable\ndocker history nginx:stable",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An image is an immutable layered template from which containers are created. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Images, and where would you use it?",
        "answer": "An image is an immutable layered template from which containers are created. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Images in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Images and run the commands above; record the expected and actual output.",
      "Draw the Docker Images workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-containers": {
    "summary": "A container is an isolated runtime instance of an image with process, filesystem and resource configuration.",
    "diagram": {
      "title": "Docker Containers workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A container is an isolated runtime instance of an image with process, filesystem and resource configuration.",
          "This matters because Docker Containers addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Containers while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker run -d --name web-lab -p 8080:80 nginx:stable\ndocker ps\ndocker logs web-lab\ndocker rm -f web-lab",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A container is an isolated runtime instance of an image with process, filesystem and resource configuration. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Containers, and where would you use it?",
        "answer": "A container is an isolated runtime instance of an image with process, filesystem and resource configuration. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Containers in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Containers and run the commands above; record the expected and actual output.",
      "Draw the Docker Containers workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/dockerfile": {
    "summary": "A Dockerfile declares the instructions used by a builder to create a reproducible container image.",
    "diagram": {
      "title": "Dockerfile workflow",
      "nodes": [
        "Dockerfile",
        "build context",
        "builder instructions",
        "image layers",
        "tagged artifact"
      ],
      "explanation": "Dockerfile → build context → builder instructions → image layers → tagged artifact. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Dockerfile declares the instructions used by a builder to create a reproducible container image.",
          "This matters because Dockerfile addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Dockerfile while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Dockerfile → build context → builder instructions → image layers → tagged artifact. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "mkdir -p site\necho 'hello' > site/index.html\ncat > Dockerfile <<'EOF'\nFROM nginx:stable-alpine\nCOPY site/ /usr/share/nginx/html/\nEXPOSE 80\nEOF\ndocker build -t web-lab:1.0 .",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Dockerfile declares the instructions used by a builder to create a reproducible container image. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Dockerfile, and where would you use it?",
        "answer": "A Dockerfile declares the instructions used by a builder to create a reproducible container image. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Dockerfile in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Dockerfile and run the commands above; record the expected and actual output.",
      "Draw the Dockerfile workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/building-images": {
    "summary": "Image building turns a Dockerfile and build context into a tagged artifact suitable for testing and deployment.",
    "diagram": {
      "title": "Building Images workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Image building turns a Dockerfile and build context into a tagged artifact suitable for testing and deployment.",
          "This matters because Building Images addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Building Images while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker build --pull -t web-lab:1.0 .\ndocker image inspect web-lab:1.0",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Image building turns a Dockerfile and build context into a tagged artifact suitable for testing and deployment. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Building Images, and where would you use it?",
        "answer": "Image building turns a Dockerfile and build context into a tagged artifact suitable for testing and deployment. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Building Images in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Building Images and run the commands above; record the expected and actual output.",
      "Draw the Building Images workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/image-layers-and-cache": {
    "summary": "Image layers are reusable read-only filesystem changes; build cache avoids repeating unchanged build steps.",
    "diagram": {
      "title": "Image Layers and Cache workflow",
      "nodes": [
        "Dockerfile step",
        "cache lookup",
        "reused/new layer",
        "final image"
      ],
      "explanation": "Dockerfile step → cache lookup → reused/new layer → final image. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Image layers are reusable read-only filesystem changes; build cache avoids repeating unchanged build steps.",
          "This matters because Image Layers and Cache addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Image Layers and Cache while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Dockerfile step → cache lookup → reused/new layer → final image. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker history nginx:stable\ndocker build --progress=plain -t web-lab:cache .",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Image layers are reusable read-only filesystem changes; build cache avoids repeating unchanged build steps. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Image Layers and Cache, and where would you use it?",
        "answer": "Image layers are reusable read-only filesystem changes; build cache avoids repeating unchanged build steps. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Image Layers and Cache in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Image Layers and Cache and run the commands above; record the expected and actual output.",
      "Draw the Image Layers and Cache workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-volumes": {
    "summary": "Named volumes are Docker-managed persistent storage mounted into containers independently of container writable layers.",
    "diagram": {
      "title": "Docker Volumes workflow",
      "nodes": [
        "container mount point",
        "Docker volume",
        "host-managed persistent data"
      ],
      "explanation": "container mount point → Docker volume → host-managed persistent data. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Named volumes are Docker-managed persistent storage mounted into containers independently of container writable layers.",
          "This matters because Docker Volumes addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Volumes while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container mount point → Docker volume → host-managed persistent data. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker volume create app-data\ndocker run --rm -v app-data:/data alpine sh -c 'echo saved > /data/demo.txt'\ndocker run --rm -v app-data:/data alpine cat /data/demo.txt\ndocker volume rm app-data",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Named volumes are Docker-managed persistent storage mounted into containers independently of container writable layers. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Volumes, and where would you use it?",
        "answer": "Named volumes are Docker-managed persistent storage mounted into containers independently of container writable layers. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Volumes in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Volumes and run the commands above; record the expected and actual output.",
      "Draw the Docker Volumes workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/bind-mounts": {
    "summary": "Bind mounts map an explicit host file or directory into a container path.",
    "diagram": {
      "title": "Bind Mounts workflow",
      "nodes": [
        "host path",
        "bind mount mapping",
        "container path"
      ],
      "explanation": "host path → bind mount mapping → container path. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Bind mounts map an explicit host file or directory into a container path.",
          "This matters because Bind Mounts addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Bind Mounts while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "host path → bind mount mapping → container path. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "mkdir -p site\necho 'hello' > site/index.html\ndocker run --rm -p 8080:80 -v \"$PWD/site:/usr/share/nginx/html:ro\" nginx:stable",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Bind mounts map an explicit host file or directory into a container path. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Bind Mounts, and where would you use it?",
        "answer": "Bind mounts map an explicit host file or directory into a container path. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Bind Mounts in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Bind Mounts and run the commands above; record the expected and actual output.",
      "Draw the Bind Mounts workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/tmpfs-mounts": {
    "summary": "tmpfs mounts provide temporary memory-backed filesystem storage that is not persisted as a normal volume.",
    "diagram": {
      "title": "tmpfs Mounts workflow",
      "nodes": [
        "container path",
        "memory-backed filesystem",
        "data discarded on container stop"
      ],
      "explanation": "container path → memory-backed filesystem → data discarded on container stop. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "tmpfs mounts provide temporary memory-backed filesystem storage that is not persisted as a normal volume.",
          "This matters because tmpfs Mounts addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses tmpfs Mounts while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container path → memory-backed filesystem → data discarded on container stop. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker run --rm --tmpfs /run:rw,noexec,nosuid,size=64m alpine sh -c 'mount | grep /run'",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "tmpfs mounts provide temporary memory-backed filesystem storage that is not persisted as a normal volume. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is tmpfs Mounts, and where would you use it?",
        "answer": "tmpfs mounts provide temporary memory-backed filesystem storage that is not persisted as a normal volume. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot tmpfs Mounts in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for tmpfs Mounts and run the commands above; record the expected and actual output.",
      "Draw the tmpfs Mounts workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-networking": {
    "summary": "Docker networking connects containers through network drivers and provides controlled connectivity and service discovery.",
    "diagram": {
      "title": "Docker Networking workflow",
      "nodes": [
        "container network namespace",
        "selected driver",
        "peer or external network"
      ],
      "explanation": "container network namespace → selected driver → peer or external network. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker networking connects containers through network drivers and provides controlled connectivity and service discovery.",
          "This matters because Docker Networking addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Networking while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container network namespace → selected driver → peer or external network. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker network ls\ndocker network inspect bridge",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker networking connects containers through network drivers and provides controlled connectivity and service discovery. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Networking, and where would you use it?",
        "answer": "Docker networking connects containers through network drivers and provides controlled connectivity and service discovery. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Networking in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Networking and run the commands above; record the expected and actual output.",
      "Draw the Docker Networking workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/bridge-network": {
    "summary": "The bridge driver connects containers on one Docker host through a virtual bridge and isolated network.",
    "diagram": {
      "title": "Bridge Network workflow",
      "nodes": [
        "container veth",
        "Linux bridge",
        "peer container or NAT route"
      ],
      "explanation": "container veth → Linux bridge → peer container or NAT route. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The bridge driver connects containers on one Docker host through a virtual bridge and isolated network.",
          "This matters because Bridge Network addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Bridge Network while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container veth → Linux bridge → peer container or NAT route. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker network create app-net\ndocker run -d --name web --network app-net nginx:stable\ndocker run --rm --network app-net alpine wget -qO- http://web\ndocker rm -f web\ndocker network rm app-net",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The bridge driver connects containers on one Docker host through a virtual bridge and isolated network. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Bridge Network, and where would you use it?",
        "answer": "The bridge driver connects containers on one Docker host through a virtual bridge and isolated network. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Bridge Network in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Bridge Network and run the commands above; record the expected and actual output.",
      "Draw the Bridge Network workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/host-network": {
    "summary": "Host networking places a container in the host network namespace, removing normal network namespace isolation.",
    "diagram": {
      "title": "Host Network workflow",
      "nodes": [
        "container process",
        "host network namespace",
        "host interfaces and ports"
      ],
      "explanation": "container process → host network namespace → host interfaces and ports. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Host networking places a container in the host network namespace, removing normal network namespace isolation.",
          "This matters because Host Network addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Host Network while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container process → host network namespace → host interfaces and ports. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker run --rm --network host nginx:stable",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Host networking places a container in the host network namespace, removing normal network namespace isolation. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Host Network, and where would you use it?",
        "answer": "Host networking places a container in the host network namespace, removing normal network namespace isolation. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Host Network in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Host Network and run the commands above; record the expected and actual output.",
      "Draw the Host Network workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/none-network": {
    "summary": "The none driver leaves a container without an external network interface, apart from loopback.",
    "diagram": {
      "title": "None Network workflow",
      "nodes": [
        "container network namespace",
        "loopback only"
      ],
      "explanation": "container network namespace → loopback only. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The none driver leaves a container without an external network interface, apart from loopback.",
          "This matters because None Network addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses None Network while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container network namespace → loopback only. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker run --rm --network none alpine ip addr",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The none driver leaves a container without an external network interface, apart from loopback. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is None Network, and where would you use it?",
        "answer": "The none driver leaves a container without an external network interface, apart from loopback. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot None Network in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for None Network and run the commands above; record the expected and actual output.",
      "Draw the None Network workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/overlay-network": {
    "summary": "Overlay networking connects container endpoints across Docker hosts through a virtual multi-host network.",
    "diagram": {
      "title": "Overlay Network workflow",
      "nodes": [
        "node A container",
        "overlay tunnel",
        "node B container"
      ],
      "explanation": "node A container → overlay tunnel → node B container. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Overlay networking connects container endpoints across Docker hosts through a virtual multi-host network.",
          "This matters because Overlay Network addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Overlay Network while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "node A container → overlay tunnel → node B container. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker network ls --filter driver=overlay",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Overlay networking connects container endpoints across Docker hosts through a virtual multi-host network. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Overlay Network, and where would you use it?",
        "answer": "Overlay networking connects container endpoints across Docker hosts through a virtual multi-host network. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Overlay Network in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Overlay Network and run the commands above; record the expected and actual output.",
      "Draw the Overlay Network workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/macvlan-network": {
    "summary": "Macvlan gives a container its own MAC address and direct Layer-2 presence on a physical network.",
    "diagram": {
      "title": "Macvlan Network workflow",
      "nodes": [
        "container virtual interface",
        "parent NIC",
        "physical LAN"
      ],
      "explanation": "container virtual interface → parent NIC → physical LAN. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Macvlan gives a container its own MAC address and direct Layer-2 presence on a physical network.",
          "This matters because Macvlan Network addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Macvlan Network while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container virtual interface → parent NIC → physical LAN. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker network ls --filter driver=macvlan",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Macvlan gives a container its own MAC address and direct Layer-2 presence on a physical network. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Macvlan Network, and where would you use it?",
        "answer": "Macvlan gives a container its own MAC address and direct Layer-2 presence on a physical network. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Macvlan Network in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Macvlan Network and run the commands above; record the expected and actual output.",
      "Draw the Macvlan Network workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-compose": {
    "summary": "Docker Compose defines and runs a multi-container application using a declarative YAML model.",
    "diagram": {
      "title": "Docker Compose workflow",
      "nodes": [
        "compose.yaml",
        "Compose model",
        "service containers",
        "project network and volumes"
      ],
      "explanation": "compose.yaml → Compose model → service containers → project network and volumes. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker Compose defines and runs a multi-container application using a declarative YAML model.",
          "This matters because Docker Compose addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Compose while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "compose.yaml → Compose model → service containers → project network and volumes. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker compose version\ndocker compose config\ndocker compose up -d\ndocker compose ps\ndocker compose logs --tail=50\ndocker compose down",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker Compose defines and runs a multi-container application using a declarative YAML model. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Compose, and where would you use it?",
        "answer": "Docker Compose defines and runs a multi-container application using a declarative YAML model. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Compose in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Compose and run the commands above; record the expected and actual output.",
      "Draw the Docker Compose workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/compose-yaml": {
    "summary": "compose.yaml is the version-controlled Compose configuration describing services, networks, volumes and runtime settings.",
    "diagram": {
      "title": "compose.yaml workflow",
      "nodes": [
        "YAML file",
        "interpolation and validation",
        "resolved Compose model",
        "Engine API"
      ],
      "explanation": "YAML file → interpolation and validation → resolved Compose model → Engine API. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "compose.yaml is the version-controlled Compose configuration describing services, networks, volumes and runtime settings.",
          "This matters because compose.yaml addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses compose.yaml while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "YAML file → interpolation and validation → resolved Compose model → Engine API. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker compose -f compose.yaml config",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "compose.yaml is the version-controlled Compose configuration describing services, networks, volumes and runtime settings. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is compose.yaml, and where would you use it?",
        "answer": "compose.yaml is the version-controlled Compose configuration describing services, networks, volumes and runtime settings. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot compose.yaml in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for compose.yaml and run the commands above; record the expected and actual output.",
      "Draw the compose.yaml workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/compose-services": {
    "summary": "A Compose service describes how one application component is built or run and connected to other services.",
    "diagram": {
      "title": "Compose Services workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Compose service describes how one application component is built or run and connected to other services.",
          "This matters because Compose Services addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Compose Services while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker compose ps\ndocker compose logs api\ndocker compose exec api sh",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Compose service describes how one application component is built or run and connected to other services. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Compose Services, and where would you use it?",
        "answer": "A Compose service describes how one application component is built or run and connected to other services. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Compose Services in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Compose Services and run the commands above; record the expected and actual output.",
      "Draw the Compose Services workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/environment-variables": {
    "summary": "Environment variables provide runtime configuration separately from the container image.",
    "diagram": {
      "title": "Environment Variables workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Environment variables provide runtime configuration separately from the container image.",
          "This matters because Environment Variables addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Environment Variables while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker compose config\ndocker compose exec app printenv",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Environment variables provide runtime configuration separately from the container image. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Environment Variables, and where would you use it?",
        "answer": "Environment variables provide runtime configuration separately from the container image. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Environment Variables in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Environment Variables and run the commands above; record the expected and actual output.",
      "Draw the Environment Variables workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-secrets": {
    "summary": "Docker secrets provide controlled delivery of sensitive values to supported services without baking them into images.",
    "diagram": {
      "title": "Docker Secrets workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker secrets provide controlled delivery of sensitive values to supported services without baking them into images.",
          "This matters because Docker Secrets addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Secrets while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker secret ls\ndocker service inspect --pretty YOUR_SERVICE",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker secrets provide controlled delivery of sensitive values to supported services without baking them into images. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Secrets, and where would you use it?",
        "answer": "Docker secrets provide controlled delivery of sensitive values to supported services without baking them into images. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Secrets in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Secrets and run the commands above; record the expected and actual output.",
      "Draw the Docker Secrets workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/multi-stage-builds": {
    "summary": "Multi-stage builds separate compilation and runtime stages so the final image can omit build tools.",
    "diagram": {
      "title": "Multi-stage Builds workflow",
      "nodes": [
        "builder stage",
        "compiled artifact",
        "minimal runtime stage"
      ],
      "explanation": "builder stage → compiled artifact → minimal runtime stage. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Multi-stage builds separate compilation and runtime stages so the final image can omit build tools.",
          "This matters because Multi-stage Builds addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Multi-stage Builds while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "builder stage → compiled artifact → minimal runtime stage. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker build --target builder -t app:builder .\ndocker build -t app:runtime .",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Multi-stage builds separate compilation and runtime stages so the final image can omit build tools. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Multi-stage Builds, and where would you use it?",
        "answer": "Multi-stage builds separate compilation and runtime stages so the final image can omit build tools. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Multi-stage Builds in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Multi-stage Builds and run the commands above; record the expected and actual output.",
      "Draw the Multi-stage Builds workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/image-optimization": {
    "summary": "Image optimization reduces image size, build time, pull time and unnecessary attack surface.",
    "diagram": {
      "title": "Image Optimization workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Image optimization reduces image size, build time, pull time and unnecessary attack surface.",
          "This matters because Image Optimization addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Image Optimization while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker image ls\ndocker history YOUR_IMAGE\ndocker scout quickview YOUR_IMAGE",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Image optimization reduces image size, build time, pull time and unnecessary attack surface. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Image Optimization, and where would you use it?",
        "answer": "Image optimization reduces image size, build time, pull time and unnecessary attack surface. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Image Optimization in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Image Optimization and run the commands above; record the expected and actual output.",
      "Draw the Image Optimization workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/container-health-checks": {
    "summary": "Health checks test application readiness or liveness rather than assuming a running process is healthy.",
    "diagram": {
      "title": "Container Health Checks workflow",
      "nodes": [
        "container process",
        "health command",
        "health status",
        "operator/orchestrator response"
      ],
      "explanation": "container process → health command → health status → operator/orchestrator response. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Health checks test application readiness or liveness rather than assuming a running process is healthy.",
          "This matters because Container Health Checks addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Container Health Checks while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container process → health command → health status → operator/orchestrator response. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker inspect --format '{{.State.Health.Status}}' YOUR_CONTAINER",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Health checks test application readiness or liveness rather than assuming a running process is healthy. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Container Health Checks, and where would you use it?",
        "answer": "Health checks test application readiness or liveness rather than assuming a running process is healthy. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Container Health Checks in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Container Health Checks and run the commands above; record the expected and actual output.",
      "Draw the Container Health Checks workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/resource-limits": {
    "summary": "CPU and memory limits constrain container resource consumption using host kernel controls.",
    "diagram": {
      "title": "Resource Limits workflow",
      "nodes": [
        "container process",
        "cgroups CPU/memory controls",
        "host kernel scheduler"
      ],
      "explanation": "container process → cgroups CPU/memory controls → host kernel scheduler. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "CPU and memory limits constrain container resource consumption using host kernel controls.",
          "This matters because Resource Limits addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Resource Limits while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "container process → cgroups CPU/memory controls → host kernel scheduler. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker run --rm --memory=256m --cpus=0.5 alpine sh -c 'cat /sys/fs/cgroup/memory.max'",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "CPU and memory limits constrain container resource consumption using host kernel controls. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Resource Limits, and where would you use it?",
        "answer": "CPU and memory limits constrain container resource consumption using host kernel controls. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Resource Limits in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Resource Limits and run the commands above; record the expected and actual output.",
      "Draw the Resource Limits workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/container-logging": {
    "summary": "Container logging captures stdout and stderr through a configured logging driver or platform collector.",
    "diagram": {
      "title": "Container Logging workflow",
      "nodes": [
        "application stdout/stderr",
        "logging driver",
        "log collector/backend"
      ],
      "explanation": "application stdout/stderr → logging driver → log collector/backend. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Container logging captures stdout and stderr through a configured logging driver or platform collector.",
          "This matters because Container Logging addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Container Logging while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "application stdout/stderr → logging driver → log collector/backend. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker logs --since 10m --tail 100 YOUR_CONTAINER\ndocker inspect --format '{{.HostConfig.LogConfig.Type}}' YOUR_CONTAINER",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Container logging captures stdout and stderr through a configured logging driver or platform collector. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Container Logging, and where would you use it?",
        "answer": "Container logging captures stdout and stderr through a configured logging driver or platform collector. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Container Logging in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Container Logging and run the commands above; record the expected and actual output.",
      "Draw the Container Logging workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-security": {
    "summary": "Docker security combines trusted images, least privilege, isolation, secret handling and runtime hardening.",
    "diagram": {
      "title": "Docker Security workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker security combines trusted images, least privilege, isolation, secret handling and runtime hardening.",
          "This matters because Docker Security addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Security while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker inspect --format '{{.HostConfig.Privileged}} {{.Config.User}}' YOUR_CONTAINER\ndocker scout quickview nginx:stable",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker security combines trusted images, least privilege, isolation, secret handling and runtime hardening. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Security, and where would you use it?",
        "answer": "Docker security combines trusted images, least privilege, isolation, secret handling and runtime hardening. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Security in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Security and run the commands above; record the expected and actual output.",
      "Draw the Docker Security workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/docker-swarm": {
    "summary": "Docker Swarm is Docker's native cluster orchestration mode for scheduling services and maintaining replicas.",
    "diagram": {
      "title": "Docker Swarm workflow",
      "nodes": [
        "manager desired state",
        "scheduler",
        "worker tasks",
        "service endpoint"
      ],
      "explanation": "manager desired state → scheduler → worker tasks → service endpoint. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker Swarm is Docker's native cluster orchestration mode for scheduling services and maintaining replicas.",
          "This matters because Docker Swarm addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Docker Swarm while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "manager desired state → scheduler → worker tasks → service endpoint. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker info --format '{{.Swarm.LocalNodeState}}'\ndocker node ls\ndocker service ls",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker Swarm is Docker's native cluster orchestration mode for scheduling services and maintaining replicas. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Swarm, and where would you use it?",
        "answer": "Docker Swarm is Docker's native cluster orchestration mode for scheduling services and maintaining replicas. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Docker Swarm in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Docker Swarm and run the commands above; record the expected and actual output.",
      "Draw the Docker Swarm workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
  "docker/container-troubleshooting": {
    "summary": "Container troubleshooting diagnoses startup, process, image, network, storage, health and resource failures using runtime evidence.",
    "diagram": {
      "title": "Container Troubleshooting workflow",
      "nodes": [
        "Docker CLI",
        "Docker Engine API",
        "container runtime",
        "host kernel"
      ],
      "explanation": "Docker CLI → Docker Engine API → container runtime → host kernel. Check each boundary in order when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Container troubleshooting diagnoses startup, process, image, network, storage, health and resource failures using runtime evidence.",
          "This matters because Container Troubleshooting addresses a specific container lifecycle requirement. Knowing its responsibility helps select the correct Docker feature instead of applying unrelated settings."
        ],
        "bullets": [
          "Understand the feature's role in the image-to-runtime lifecycle.",
          "Keep application configuration and persistent data separate from disposable containers."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "A DevOps team uses Container Troubleshooting while building, testing or operating a containerized application. For example, validate the behavior in a disposable local environment, record the expected result, then apply the same reviewed configuration in CI or the deployment platform.",
          "Use it in local development, CI validation and production only after confirming platform support, security requirements, resource needs and operational ownership."
        ],
        "bullets": [
          "Development: reproduce the application environment locally.",
          "CI: validate image and runtime configuration consistently.",
          "Production: use reviewed settings, observability and rollback procedures."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Docker CLI → Docker Engine API → container runtime → host kernel. The Docker client or Compose project submits the requested configuration to the Engine. The daemon and runtime create or inspect the relevant Docker objects, while the host kernel enforces process and resource isolation.",
          "For troubleshooting, inspect actual runtime state rather than relying only on the YAML or Dockerfile. Compare the desired configuration with docker inspect output, logs and health status."
        ],
        "bullets": [
          "Image: reusable template made from layers.",
          "Container: runtime process and filesystem view created from an image.",
          "Host: supplies the kernel, CPU, memory, storage and network interfaces."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands in a disposable lab. Replace YOUR_CONTAINER or YOUR_IMAGE with real values. Commands that create resources should be followed by cleanup; do not run destructive commands against production workloads."
        ],
        "code": "docker ps -a\ndocker inspect YOUR_CONTAINER\ndocker logs --tail 100 YOUR_CONTAINER\ndocker events --since 10m",
        "note": "Never bake credentials into Dockerfiles or image layers. Avoid privileged mode and Docker socket mounts unless explicitly justified and reviewed."
      },
      {
        "heading": "5. Production practices and trade-offs",
        "paragraphs": [
          "Use trusted, maintained base images; pin versions or digests; scan images; run as a non-root user where possible; and keep unnecessary packages and capabilities out of runtime images.",
          "Containers share the host kernel, so container isolation is not identical to a separate virtual machine. Protect the host and daemon as critical infrastructure."
        ],
        "bullets": [
          "Set CPU and memory limits based on observed workload behavior.",
          "Use named volumes for required persistent data and test backup/restore.",
          "Centralize logs and define retention.",
          "Use least privilege, read-only mounts and minimal capabilities.",
          "Promote the same tested image between environments."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with docker ps -a, docker inspect and docker logs. Check image reference, entrypoint, exit code, health status, port mapping, network attachment, mount source and available host resources.",
          "If the container works locally but fails in CI or production, compare architecture, environment variables, secrets delivery, filesystem permissions, DNS and runtime versions."
        ],
        "bullets": [
          "Image pull error: verify registry, tag/digest, credentials and network.",
          "Container exits: inspect exit code, command, entrypoint and logs.",
          "Connection error: inspect listener binding, published ports, DNS and network driver.",
          "Missing data: verify mount source, destination and ownership.",
          "Unhealthy status: run the health-check command manually and inspect dependencies."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Container troubleshooting diagnoses startup, process, image, network, storage, health and resource failures using runtime evidence. In a DevOps workflow, I would use it to make container builds and operations repeatable, validate the result in CI, secure runtime permissions, monitor health and document recovery."
        ],
        "bullets": [
          "Explain the feature's purpose and architecture path.",
          "Give one practical application example and one limitation.",
          "Describe the evidence and commands used to diagnose failure."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Container Troubleshooting, and where would you use it?",
        "answer": "Container troubleshooting diagnoses startup, process, image, network, storage, health and resource failures using runtime evidence. I would use it in a container workflow where its capability is needed, validate it in a test environment, and promote the reviewed configuration with monitoring and rollback."
      },
      {
        "question": "How would you troubleshoot Container Troubleshooting in production?",
        "answer": "Capture the exact error and timestamp. Inspect container state, exit code, logs and effective configuration; validate image, network, storage and resource settings as relevant; compare with the last known-good release; then make a reversible correction and verify application health."
      }
    ],
    "handsOn": [
      "Create a disposable lab for Container Troubleshooting and run the commands above; record the expected and actual output.",
      "Draw the Container Troubleshooting workflow and label client, daemon, runtime and host boundaries where relevant.",
      "Introduce one safe configuration error, gather evidence using inspect/logs/events, and correct it.",
      "Write a short runbook with validation, rollback and cleanup steps."
    ]
  },
};