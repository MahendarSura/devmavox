export type AtoZLesson = {
  summary: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[]; code?: string; note?: string }[];
  imageQuery?: string;
  interview: { question: string; answer: string }[];
  handsOn: string[];
};

export const atoZLessons: Record<string, AtoZLesson> = {
  "linux/linux-introduction": {
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
};
