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
};
