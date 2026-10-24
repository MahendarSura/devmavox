🗺️ Complete Docker Roadmap — 5 Levels, 25 Parts
A structured learning path from Linux and container fundamentals to enterprise container platforms, security, automation, and senior engineering.

🟢 Level 1 — Foundations
Parts 1–5

Linux basics, container fundamentals, Docker architecture, CLI, Dockerfiles, image layers and image lifecycle.

🔵 Level 2 — Application Engineering
Parts 6–10

Linux internals, networking, persistent storage, Compose, resource limits and production operations.

🟣 Level 3 — Advanced Networking and Orchestration
Parts 11–15

Enterprise platforms, real-world troubleshooting, Docker Swarm, packet flow and advanced Compose.

🟠 Level 4 — Enterprise Production Engineering
Parts 16–20

Container security, BuildKit, registries, Docker Desktop/WSL2, GPU workloads, observability and performance.

🔴 Level 5 — Senior and Platform Engineering
Parts 21–25

CI/CD, disaster recovery, platform architecture, senior interviews and end-to-end capstone projects.

COMPLETE LEARNING HANDBOOK
🐳 Docker Mastery
Beginner → Intermediate → Advanced → Enterprise Senior Engineer
!Docker !Linux !Security !Learning

📚 Learning resource	Included
🧩 Complete curriculum	25 Parts
🗺️ Progressive levels	5 Levels
💻 Practical learning	Hands-on Labs
🔐 Enterprise practices	Security and Supply Chain
🚀 Real-world experience	Projects and Troubleshooting
🎯 Career preparation	Senior Interview Scenarios
Mission: Understand how containers work internally, build secure images, deploy reliable applications, troubleshoot production incidents, and design enterprise-grade container platforms.
📑 Table of Contents
How to Use This Handbook
Level 1 — Foundations
Level 2 — Application Engineering
Level 3 — Advanced Networking and Orchestration
Level 4 — Enterprise Production Engineering
Level 5 — Senior and Platform Engineering
Capstone Projects
Final Assessment
Completion Checklist
📖 How to Use This Handbook
Docker nerchukovadam ante commands memorize cheyyadam maatrame kaadu. Application container-lo ela run avuthundi, Linux kernel process-ni ela isolate chesthundi, network traffic ela travel avuthundi, production failures enduku vastayi anevi artham chesukovali.

Every part should be studied in this sequence:

Theory: Concept enti? Enduku avasaram?
Internals: Docker and Linux lopala em jaruguthundi?
Architecture: Components madhya communication ela untundi?
Commands: Command syntax, options and output meaning.
Hands-on Lab: Step-by-step implementation.
Troubleshooting: Failure reproduce chesi root cause identify cheyyadam.
Security: Risk identify chesi appropriate controls implement cheyyadam.
Interview Preparation: Concepts-ni explain cheyyadam and scenario questions solve cheyyadam.
Completion Test: Independent-ga implement and troubleshoot cheyyagalagadam.
Prerequisites
Beginner ayina parvaledu. Ee roadmap-lo concepts gradual-ga introduce chestham.

Basic terminal usage.
Files and directories.
Users and permissions.
IP addresses, ports, DNS and HTTP basics.
Basic Git knowledge.
Application and database fundamentals.
🟢 Level 1 — Foundations
Parts 1–5 | Beginner

Goal: Docker ante enti, containers ela work avuthayi, application images ela build cheyyali ane fundamentals strong-ga develop cheyyadam.

🟢 Part 1 — How Containers Actually Work
1.1 What is a container?
Container anedi application process-ni isolated environment-lo run cheyyadaniki use chese operating-system-level virtualization approach.

Example-ku, nee laptop-lo rendu applications run avuthunnayi anuko:

Application A requires Node.js.
Application B requires Python.
Dependencies, configuration, and filesystem organization manage cheyyadam difficult avvachu. Containers application code and required dependencies-ni separate image-lo package chesi consistent environment provide chesthayi.

Container separate physical machine kaadu. Linux containers generally host Linux kernel-ni share chesthayi, while namespaces and other kernel features process isolation provide chesthayi.

1.2 Virtual machines vs containers
Feature	Virtual machine	Container
Operating system	Usually own guest OS and kernel	Usually shares host kernel
Isolation	Virtual hardware and hypervisor	Kernel isolation mechanisms
Startup	Generally slower	Generally faster
Packaging	VM image	Container image
Resource overhead	Guest OS overhead untundi	Usually lower OS overhead
Best use	Different kernels or stronger VM boundary	Portable application workloads
Containers automatically secure ani assume cheyyakudadhu. Container isolation configuration, host security, kernel vulnerabilities and privileges meeda depend avuthundi.

Architecture diagram
mermaid
flowchart TB
    subgraph VM["Virtual Machine Architecture"]
        H1["Physical Host"]
        HV["Hypervisor"]
        OS1["Guest OS 1"]
        OS2["Guest OS 2"]
        A1["Application A"]
        A2["Application B"]
        H1 --> HV
        HV --> OS1 --> A1
        HV --> OS2 --> A2
    end

    subgraph CT["Container Architecture"]
        H2["Physical Host"]
        K["Shared Linux Kernel"]
        C1["Container A"]
        C2["Container B"]
        P1["Application A"]
        P2["Application B"]
        H2 --> K
        K --> C1 --> P1
        K --> C2 --> P2
    end
1.3 How does a container actually start?
Consider this command:

bash
docker run -d --name web -p 8080:80 nginx
Step-by-step:

Docker CLI request-ni Docker Engine-ku send chesthundi.
Docker image locally available unda ani check chesthundi.
Image lekapothe configured registry nunchi pull chesthundi.
Container configuration and filesystem setup chesthundi.
Runtime required namespaces, mounts, cgroups and security settings configure cheyyadaniki host environment-to interact avuthundi.
NGINX process container environment-lo start avuthundi.
Port publishing configuration valla host port 8080 nunchi container port 80-ku traffic forward avvagaladu.
Exact implementation steps Docker Engine, runtime version and operating system batti vary avvachu.

1.4 Important Docker terms
Term	Meaning
Image	Application and required filesystem content-ku read-only template
Container	Image nunchi create chesina runnable instance
Docker Engine	Containers and images manage chese platform
Docker CLI	Engine-ni control cheyyadaniki command-line client
Registry	Container images store and distribute chese service
Namespace	Process-ku isolated view of selected kernel resources provide chesthundi
cgroups	Process groups resource usage-ni account and limit cheyyadaniki use avuthayi
1.5 Practical commands
bash
docker version
docker info
docker run hello-world
docker pull nginx
docker images
docker ps
docker ps -a
docker run -d --name web -p 8080:80 nginx
docker logs web
docker exec -it web sh
docker stop web
docker start web
docker rm -f web
Command explanation:

docker version — client and server version details.
docker info — Engine configuration and system information.
docker run — container create chesi start chesthundi.
-d — detached mode.
--name web — container-ku readable name.
-p 8080:80 — host port 8080-ni container port 80-to publish chesthundi.
docker logs — container process output inspect chesthundi.
docker exec — running container-lo additional process execute chesthundi.
1.6 Hands-on lab
nginx container run cheyyi.
Browser-lo http://localhost:8080 open cheyyi.
docker ps and docker inspect web execute cheyyi.
Container stop chesi browser behavior observe cheyyi.
Container remove chesi image inka local-ga unda verify cheyyi.
Malli container create chesi difference observe cheyyi.
1.7 Troubleshooting
Problem: Port 8080 already allocated.

Meaning: Host-lo aa port already another process or container use chesthundi.

bash
docker ps
Alternative host port use cheyyi:

bash
docker run -d --name web2 -p 8081:80 nginx
Problem: Container start ayyi immediate-ga exit avuthundi.

bash
docker ps -a
docker logs <container-name>
docker inspect <container-name>
Application logs, exit code, command and configuration inspect cheyyali.

1.8 Interview questions
Q: Container ante lightweight VM aa?

A: Simple analogy-ga ala cheppavachu, kaani technically container and VM same kaavu. Linux container usually host kernel-ni share chese isolated process environment. VM-ku virtual hardware and guest operating system untayi.

Q: Container remove chesthe image kuda delete avuthunda?

A: No. Container and image separate objects. Container remove chesina image normally local-ga remain avuthundi. Persistent volumes kuda separate-ga manage avuthayi.

Q: Containers enduku fast-ga start avuthayi?

A: Conventional VM laga complete guest operating system boot cheyyalsina avasaram generally undadu. Container runtime application process-ni configured isolated environment-lo start chesthundi.

Completion criteria
Image and container difference explain cheyyagalagali.
VM and container architecture compare cheyyagalagali.
NGINX container run and inspect cheyyagalagali.
Container stop, restart and remove cheyyagalagali.
Port publishing meaning explain cheyyagalagali.
🟢 Part 2 — Docker Architecture and Container Lifecycle
2.1 Docker architecture enduku multiple components use chesthundi?
Docker application interface, container lifecycle management, low-level runtime and Linux kernel interactions-ni separate responsibilities-ga organize chesthundi.

Common Linux Docker Engine flow:

mermaid
flowchart TD
    U["Developer / CI"]
    CLI["Docker CLI"]
    API["Docker Engine API"]
    D["dockerd"]
    C["containerd"]
    S["containerd-shim"]
    R["runc"]
    K["Linux Kernel"]
    P["Container Process"]

    U --> CLI --> API --> D --> C --> S --> R --> K --> P

🐳 Part 2 — Docker Architecture and Container Lifecycle
Level 1 · Foundations · Beginner to Intermediate

2.1 Docker architecture enduku multiple components use chesthundi?
Docker-lo application interface, container lifecycle management, low-level runtime, Linux kernel interactions separate responsibilities-ga untayi.

Mundu ee architecture diagram choodu.

Developer / CI Pipeline

Docker commands execute chesthundi

Docker CLI

docker run, build, ps, logs

Docker API request

Docker Engine — dockerd

Images, networks, containers manage chesthundi

containerd

Container lifecycle and runtime coordination

OCI Runtime — runc

Container process environment create/start cheyyadaniki help chesthundi

Linux Kernel

Namespaces · cgroups · capabilities · filesystem

Important: Idi simplified architecture. Actual process flow-lo containerd-shim, snapshotters, networking components lanti additional parts untayi. Prathi Docker command exact-ga ee components anni same sequence-lo invoke cheyyadu.

Main components
1. Docker CLI

Manam terminal-lo use chese client.


bash
docker ps
docker images
docker run nginx
docker logs myapp
CLI direct-ga kernel-ni manage cheyyadu. Docker Engine API dwara request pampisthundi.

2. Docker Engine — dockerd

Docker daemon. Images, containers, networks, volumes lanti Docker objects-ni manage chesthundi.


bash
docker info
docker version
Linux systems-lo daemon status check cheyyadaniki:


bash
sudo systemctl status docker
3. containerd

Container lifecycle operations-ni manage cheyyadaniki use ayye container runtime service. Image transfer and storage-related operations kuda its responsibilities-lo untayi.

4. runc

OCI runtime implementation. Container process-ni required Linux isolation and execution configuration tho start cheyyadaniki use avuthundi.

5. Linux kernel

Actual isolation and resource-control mechanisms kernel provide chesthundi.

Namespaces — process, network, mount and other resource views isolate chesthayi.

cgroups — CPU, memory and other resource usage-ni track/limit cheyyagalavu.

Capabilities — root user-ku traditionally unde privileges-ni smaller units-ga divide chesthayi.

Seccomp — system calls-ni filter cheyyagaladu.

2.2 docker run nginx execute chesthe em jaruguthundi?
Command:


bash
docker run -d --name web -p 8080:80 nginx
Execution flow:

CLI request: Docker CLI command-ni parse chesi Engine API-ku request pampisthundi.

Image resolution: Required nginx image local-ga unda check chesthundi. Lekapothe configured registry nunchi pull cheyyadaniki attempt chesthundi.

Container configuration: Image metadata, command, environment variables, mounts, networking and resource settings use chesi container configuration prepare chesthundi.

Runtime setup: Runtime and kernel mechanisms use chesi required namespaces, mounts, security configuration and process environment prepare chesthayi.

Process start: NGINX main process container environment-lo start avuthundi.

Port publishing: Host port 8080 nunchi container port 80-ku configured networking path create avuthundi.

Status reporting: Docker container status-ni track chesthundi; manam docker ps tho inspect cheyyachu.

Verify cheyyadaniki:


bash
docker run -d --name web -p 8080:80 nginx

docker ps
docker inspect web
docker logs web
curl http://localhost:8080
Expected result: curl request successful ayithe NGINX HTTP response vasthundi.

2.3 Container lifecycle
Container ante just running application kaadu. Daaniki lifecycle states untayi.

Created

Container configuration create ayyindi

Running

Main process execute avuthundi

stop / exit

Stopped / Exited

Container object inka exist avuthundi

Removed

Container object delete ayyindi

Lifecycle commands:


bash
docker create --name test nginx
docker start test
docker stop test
docker start test
docker restart test
docker inspect test
docker rm test
docker rm test execute cheyyadaniki container stopped state-lo undali. Running container-ni force remove cheyyadaniki docker rm -f test use cheyyachu, kaani production-lo careful-ga use cheyyali.

Important difference: stop vs remove
docker stop: Main process stop avuthundi; container object remain avuthundi.

docker start: Existing stopped container-ni malli start chesthundi.

docker rm: Container object remove avuthundi.

docker rmi: Local image reference/image data remove cheyyadaniki use avuthundi, subject to image usage and references.

Container remove chesina image automatically remove avvadu. Named volumes kuda separate lifecycle kaligi untayi.

2.4 Container filesystem and writable layer
Docker image generally layered filesystem structure use chesthundi.

Container writable layer

Runtime changes · temporary files

Image layer 3

Application files

Image layer 2

Dependencies

Image layer 1

Base filesystem

Image layers read-only. Container run ayinappudu writable layer add avuthundi.

Experiment:


bash
docker run -it --name demo alpine sh
Container lopala:


sh
echo "hello Docker" > /tmp/test.txt
cat /tmp/test.txt
exit
Malli container start chesi file check cheyyi:


bash
docker start demo
docker exec demo cat /tmp/test.txt
File usually untundi, endukante ade container writable layer reuse avuthundi.

Ippudu:


bash
docker rm -f demo
docker run --rm alpine cat /tmp/test.txt
New container-lo file undadu. Endukante previous container writable layer remove ayyindi.

Production lesson: Database files, uploads, and important persistent data-ni container writable layer meeda maatrame depend cheyyakudadhu. Volumes or suitable persistent storage use cheyyali.

2.5 Docker inspection commands
Command

Purpose

docker ps

Running containers

docker ps -a

All containers, including stopped

docker inspect web

Detailed container configuration

docker logs web

Main process stdout/stderr logs

docker stats

Live resource usage

docker top web

Container processes

docker events

Docker Engine events

docker diff web

Container filesystem changes

docker image history nginx

Image layer/build history

docker system df

Docker disk usage

Practical investigation:


bash
docker inspect web
docker stats --no-stream web
docker top web
docker diff web
docker system df
docker diff output-lo A, C, D markers respectively added, changed, deleted filesystem paths-ni indicate chesthayi.

2.6 Troubleshooting scenarios
Scenario A: Docker daemon connect avvatledu
Error example:


text
Cannot connect to the Docker daemon
Linux machine-lo:


bash
docker version
sudo systemctl status docker
sudo journalctl -u docker -n 100 --no-pager
Possible causes: daemon stopped, socket permissions, wrong Docker context, or remote Engine connectivity issue.

Blind-ga permissions change cheyyakunda exact error and environment identify cheyyali. Docker socket access itself powerful privilege.

Scenario B: Container immediate-ga exit avuthundi

bash
docker ps -a
docker logs web
docker inspect -f '{{.State.ExitCode}}' web
Common causes:

Application crash.

Invalid command or configuration.

Missing required environment variables.

Main process foreground-lo run kakapovadam.

Dependency connection failure.

Exit code okkate root cause-ni prove cheyyadu; logs and configuration kuda inspect cheyyali.

Scenario C: Container running, but application unreachable

bash
docker ps
docker port web
docker logs web
docker inspect web
curl -v http://localhost:8080
Check cheyyalsina areas:

Correct host port mapping.

Application container port meeda listen chesthunda?

Application 127.0.0.1 meeda maatrame listen chesthunda, leka appropriate interface meeda naa?

Host firewall or Docker networking rules.

Docker Desktop, remote Docker Engine, or Linux environment differences.

2.7 Hands-on lab — Architecture and lifecycle
Ee lab complete cheyyi.

Part 2 Lab Checklist
0/6

NGINX container create and start cheyyi
docker run -d --name lab-web -p 8082:80 nginx

HTTP response verify cheyyi
curl -I http://localhost:8082

Container configuration inspect cheyyi
docker inspect lab-web

Container stop chesi exited state verify cheyyi
docker stop lab-web && docker ps -a

Same container-ni restart cheyyi
docker start lab-web

Container remove cheyyi
docker rm -f lab-web
Note: localhost:8082 mee machine-lo available undali. Port conflict unte another host port select cheyyi.

2.8 Interview preparation
Q1. Docker CLI and Docker daemon madhya difference enti?

CLI user commands-ni Docker Engine API requests-ga pampisthundi. Daemon Docker objects and lifecycle operations manage chesthundi.

Q2. containerd and runc same aa?

Kaadu. containerd container lifecycle and related runtime operations coordinate chesthundi. runc OCI runtime implementation; configured container process-ni create/start cheyyadaniki use avuthundi.

Q3. Container stop chesina writable layer enduku remain avuthundi?

Stop operation process-ni stop chesthundi, container object-ni delete cheyyadu. Container remove chese varaku its writable layer generally remain avuthundi.

Q4. Container process exit ayithe container enduku exited state-lo untundi?

Main process exit ayina container object-ni inspect cheyyadaniki, logs and exit status choodadaniki Docker preserve chesthundi. Automatic cleanup kosam --rm option use cheyyachu.

Q5. Container lopala root ante host machine-lo unrestricted root aa?

Necessary-ga kaadu. Namespaces, capabilities, user namespaces, seccomp and other security controls privileges-ni constrain cheyyagalavu. Kaani privileged containers or dangerous mounts isolation-ni weaken cheyyagalavu.

2.9 Part 2 completion test
Independent-ga ee questions answer cheyyagalagali:

Docker CLI → Engine → runtime → kernel flow explain cheyyagalava?

dockerd, containerd, runc responsibilities distinguish cheyyagalava?

Container lifecycle commands demonstrate cheyyagalava?

Image layers and writable layer difference explain cheyyagalava?

Container exited state root cause investigate cheyyagalava?

Application unreachable ayithe systematic troubleshooting cheyyagalava?

🟢 Part 3 — Linux Fundamentals for Docker
Learning objectives
Level 1
Beginner → Intermediate · Theory + Internals + Labs + Troubleshooting

Linux processes, PID and signals

Users, groups and file permissions

Namespaces and process isolation

cgroups and resource limits

Filesystems, mounts and OverlayFS

PID 1, ENTRYPOINT and CMD

Linux capabilities and seccomp

Practical debugging and interview preparation

3.1 — Linux Processes: Container lopala process actually ela run avuthundi?
3.1.1 Process ante enti?
Linux-lo process ante currently execute avuthunna program instance.

Examples:

nginx — web server process.

python app.py — Python application process.

java -jar app.jar — Java application process.

dockerd — Docker daemon process.

Manam command execute chesthe, Linux process-ni create chesi program execute cheyyadaniki required resources allocate chesthundi.

Prathi process-ku important properties untayi:

Property

Meaning

PID

Process ID

PPID

Parent Process ID

UID

User ID

GID

Primary Group ID

State

Running, sleeping, stopped, etc.

Memory

Process memory usage

File descriptors

Open files, sockets and pipes

Example:


bash
ps -ef
Output sample:


text
UID      PID  PPID  CMD
root       1     0  /sbin/init
root     850     1  /usr/sbin/sshd
app     1200  1180  python app.py
Idi illustrative output. Mee machine-lo PID numbers and commands different-ga untayi.

PID ante process identity. Oka process-ni identify cheyyadaniki Linux PID use chesthundi. Container lopala PID view, host PID view namespaces valla different-ga undavachu.

3.1.2 Parent and child processes
Linux-lo oka process inko process-ni create cheyyagaladu. Appudu parent-child relationship form avuthundi.

Parent process

PID 100

Child process

PID 120

Grandchild process

PID 145

Process details inspect cheyyadaniki:


bash
ps -ef
ps aux
pstree -p
pstree install kakapothe ps -ef use cheyyachu.

Particular process information:


bash
ps -o pid,ppid,user,stat,args -p 1
3.1.3 Process Docker container-lo ela run avuthundi?
NGINX example:


bash
docker run -d --name web nginx
docker exec web ps -ef
Container lopala NGINX process PID 1 ga kanipinchavachu. Host machine-lo ade process-ku vere PID undavachu.

Enduku?

PID namespace container process-ku separate PID view provide chesthundi. Container lopala main process PID 1 ga kanipinchina, host process table-lo adi vere PID-to kanipinchavachu.


bash
docker top web
Ee command host side nunchi container process information choodadaniki help chesthundi.

Linux host-lo process details compare cheyyadaniki:


bash
ps -ef | grep nginx
Windows/macOS Docker Desktop-lo containers Linux VM lopala run avvachu kabatti host process visibility different-ga untundi.

3.1.4 Foreground vs background process
Foreground command:


bash
sleep 300
Terminal aa command complete ayye varaku wait chesthundi.

Background command:


bash
sleep 300 &
& command-ni shell background-lo run cheyyadaniki use chesthundi.

Docker-lo idi important. Container lifecycle generally its configured main process-to tied ayi untundi. Main process exit ayithe container normally exited state-ku velthundi, even if application-ku background processes create cheyyadam intended ayina.

Example:


bash
docker run --name test alpine sh -c 'echo started'
docker ps -a
echo complete ayina taruvatha shell exit avuthundi. Anduke container stopped state-lo kanipisthundi.

Compare:


bash
docker run -d --name web nginx
docker ps
NGINX foreground master process run avuthunnanduna container running state-lo untundi.

3.1.5 Process states
Linux process states-lo common examples:

R — Running or runnable.

S — Interruptible sleep.

D — Uninterruptible sleep, often waiting on kernel I/O.

T — Stopped or traced.

Z — Zombie process.

Check cheyyadaniki:


bash
ps -eo pid,ppid,stat,comm
Production example: Container running-ga kanipinchina application requests respond cheyyakapovachu. Process blocked on I/O, deadlocked, resource-starved or unhealthy-ga undavachu. docker ps okkate application health-ni guarantee cheyyadu.

3.1.6 Hands-on lab — Process inspection
Ee commands execute cheyyi:


bash
docker run -d --name process-lab nginx

docker exec process-lab ps -ef
docker top process-lab
docker inspect -f '{{.State.Pid}}' process-lab

docker stop process-lab
docker ps -a

docker rm process-lab
Observe cheyyalsinavi:

Container lopala NGINX process PID.

Host-side process information.

Container state running nunchi exited-ku change avvadam.

Container remove chesaka docker ps -a output change avvadam.

3.2 — Linux Users, Groups and Permissions
Docker security-lo idi chala important bayya. Container lopala application e user-ga run avuthundi? Files-ni read/write cheyyagalada? Root privileges unnaya? Ee questions production security-ni directly affect chesthayi.

3.2.1 Linux users and groups
Linux-lo prathi process oka user identity and group memberships-to execute avuthundi.


bash
whoami
id
id root
cat /etc/passwd
cat /etc/group
Sample output:


text
uid=1000(app) gid=1000(app) groups=1000(app)
UID — User ID.

GID — Group ID.

groups — User belong ayye groups.

Docker container lopala:


bash
docker run --rm alpine id
docker run --rm --user 1000:1000 alpine id
Default-ga Alpine image-lo root user use avuthadu. Second command-lo UID 1000, GID 1000-to process execute avuthundi, provided image and runtime configuration support it.

3.2.2 Linux file permissions

bash
ls -l
Sample:


text
-rwxr-xr-- 1 app developers 1200 app.sh
Permission structure:

Permission breakdown
Owner

rwx
Read, write, execute

Group

r-x
Read, execute

Others

r--
Read only

Permission values:

Permission

Numeric value

Read (r)

4

Write (w)

2

Execute (x)

1

Examples:


bash
chmod 755 app.sh
chmod 644 config.txt
chown app:developers app.sh
755 ante owner-ku read/write/execute; group and others-ku read/execute. 644 ante owner-ku read/write; group and others-ku read-only.

3.2.3 Docker-lo permission denied enduku vasthundi?
Suppose application UID 1000-to run avuthundi, kani mounted directory root ownership-lo undi and write permission ledu.


bash
docker run --rm \
  --user 1000:1000 \
  -v "$PWD/data:/data" \
  alpine sh -c 'touch /data/test.txt'
data directory permissions allow cheyyakapothe Permission denied ravachu.

Diagnose cheyyadaniki:


bash
id
ls -ld data
ls -ln data
ls -ln numeric UID/GID chupisthundi.

Fix anedi environment batti depend avuthundi: correct ownership, group permissions, ACLs, or suitable volume configuration. Blind-ga chmod -R 777 use cheyyadam bad practice; unnecessary write access isthundi.

3.2.4 Dockerfile-lo non-root user
Production application-ku unnecessary root privileges ivvakudadhu.

Example:


dockerfile
FROM node:22-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

USER node

CMD ["node", "server.js"]
Ee example-lo node user-to application run avuthundi. Actual project-ku Node.js version, lockfile, build process and application requirements verify cheyyali.

Check:


bash
docker build -t demo-app .
docker run --rm demo-app id
Security principle: Application-ku required permissions maatrame ivvali — least privilege.

3.3 — Linux Namespaces: Container Isolation
3.3.1 Namespace ante enti?
Linux namespace ante process-ku selected system resources yokka isolated view provide chese kernel mechanism.

Simple analogy: Oka apartment building-lo multiple flats unnayi anuko. Building infrastructure common, kaani prathi flat-ku separate rooms and views untayi. Containers kuda host kernel share chesthu, selected resources-ku separate views pondhagalavu.

Important namespaces:

Namespace

Em isolate chesthundi?

PID

Process ID view

NET

Network interfaces, routing and network stack view

MNT

Mount points and filesystem mount view

UTS

Hostname and domain-name view

IPC

Inter-process communication resources

USER

User and group ID mappings

CGROUP

cgroup hierarchy view, where supported

TIME

Certain system clocks, where supported

Namespace isolation complete security boundary ani assume cheyyakudadhu. Linux kernel shared-ga untundi; additional security controls kuda important.

3.3.2 PID namespace lab
Rendu containers create cheddam:


bash
docker run -d --name ns-a alpine sleep 600
docker run -d --name ns-b alpine sleep 600
Check:


bash
docker exec ns-a ps
docker exec ns-b ps
Minimal Alpine image-lo ps available lekapothe procps/BusyBox tools use cheyyachu. Usually container lopala sleep process PID 1-ga kanipisthundi.

Host-side comparison:


bash
docker top ns-a
docker top ns-b
Rendu containers-ku different PID namespaces configure chesunte, lopala same PID number kanipinchina host process identities different-ga untayi.

Cleanup:


bash
docker rm -f ns-a ns-b
3.3.3 Network namespace
Prathi container-ku separate network namespace unte, container network interfaces and routes separate-ga untayi.


bash
docker run -d --name net-a alpine sleep 600

docker exec net-a ip addr
docker exec net-a ip route
Minimal image-lo ip command lekapothe iproute2 install cheyyali, or suitable diagnostic image use cheyyali.

Inspect Docker network:


bash
docker network ls
docker inspect net-a
Container-ku network connectivity undadam ante automatic-ga internet access guaranteed ani kaadu. Routing, DNS, firewall rules, network driver and host configuration affect chesthayi.

3.3.4 Namespace internals
Linux host-lo namespaces inspect cheyyadaniki:


bash
lsns
ls -l /proc/1/ns/
Container process PID telisthe:


bash
docker inspect -f '{{.State.Pid}}' net-a
Aa PID-ni host /proc-lo inspect cheyyachu, provided mee environment permissions allow chesthe.


bash
ls -l /proc/<PID>/ns/
<PID> ni actual host PID-to replace cheyyi.

Namespace identifiers compare chesthe processes same namespace-lo unnaya ane clue dorukuthundi. Docker Desktop/macOS/Windows environments-lo Linux host namespace inspection direct-ga available undakapovachu.

3.4 — cgroups: CPU and Memory Resource Control
Namespaces process-ku em kanipisthundo control chesthayi. cgroups process groups resource usage-ni account cheyyadaniki and configure chesina limits enforce cheyyadaniki help chesthayi.

3.4.1 CPU limit

bash
docker run -d \
  --name cpu-lab \
  --cpus="0.5" \
  alpine sh -c 'while :; do :; done'
--cpus="0.5" ante container workload-ku approximately half a CPU core equivalent scheduling capacity limit configure chesthunnam. Idi 50% of the entire host CPU ani universal-ga artham kaadu; host topology and Docker reporting context important.

Observe:


bash
docker stats cpu-lab
Cleanup:


bash
docker rm -f cpu-lab
3.4.2 Memory limit

bash
docker run -d \
  --name memory-lab \
  --memory="128m" \
  --memory-swap="128m" \
  alpine sleep 600
Ee configuration container memory limit-ni 128 MiB-ga set chesthundi. --memory-swap meaning and availability host kernel, swap configuration and Docker implementation batti vary avvachu.

Inspect:


bash
docker inspect -f '{{.HostConfig.Memory}}' memory-lab
docker stats memory-lab
Cleanup:


bash
docker rm -f memory-lab
3.4.3 Memory limit exceed ayithe?
Container memory pressure ekkuva ayithe, kernel OOM (Out Of Memory) handling valla process terminate avvachu. Kaani prathi memory problem automatic-ga OOM kill avuthundani kaadu.

Investigate:


bash
docker inspect -f \
  'OOMKilled={{.State.OOMKilled}} ExitCode={{.State.ExitCode}}' \
  memory-lab

docker stats --no-stream
Linux host-lo permissions and environment batti kernel logs kuda inspect cheyyachu:


bash
sudo journalctl -k --since "30 minutes ago"
Production troubleshooting-lo application heap limit, container memory limit, actual usage, kernel OOM events anni correlate cheyyali.

3.4.4 cgroups v1 vs v2
cgroups v1: Resource controllers separate hierarchies-lo organize avvachu.

cgroups v2: Unified hierarchy model use chesthundi.

Docker Engine and host configuration batti available controllers and reporting differences untayi.

Linux host-lo:


bash
stat -fc %T /sys/fs/cgroup
Common-ga cgroup2fs output cgroups v2-ni indicate chesthundi.

Container resource limits configure cheyyadam important; kani limits set chesina application stable-ga run avuthundani guarantee ledu. Proper load testing and monitoring avasaram.

3.5 — Linux Filesystems, Mounts and OverlayFS
3.5.1 Filesystem ante enti?
Filesystem data-ni files and directories form-lo organize chesthundi. Linux-lo root directory / nunchi filesystem hierarchy start avuthundi.


bash
ls /
ls -lah /etc
df -h
df -i
df -h — filesystem disk space usage.

df -i — inode usage.

du -sh /var/log — specified directory disk usage.

Disk space full avvadam and inode exhaustion rendu different problems.

3.5.2 Docker image layers and OverlayFS
Docker image multiple filesystem layers-to construct avvachu. Linux installations-lo OverlayFS-based storage implementation common, but actual storage driver depends on Docker configuration.

Simplified layered filesystem
Upper layer

Container writable changes

Lower layer 3

Application files

Lower layer 2

Runtime dependencies

Lower layer 1

Base image filesystem

OverlayFS terminology: upperdir, lowerdir and merged view. Actual implementation varies.

OverlayFS behavior-lo important concept copy-up. Lower read-only layer-lo unna file-ni modify cheyyalsi vasthe, relevant file upper writable layer-ku copy avvachu; subsequent modification upper layer-lo jaruguthundi.

Example:


bash
docker run -it --name fs-lab alpine sh
Container lopala:


sh
echo "Docker filesystem lab" > /tmp/example.txt
cat /tmp/example.txt
exit
Container filesystem changes-ni inspect cheyyi:


bash
docker diff fs-lab
3.5.3 Volumes vs bind mounts
Named volume: Docker-managed persistent storage.


bash
docker volume create app-data

docker run -d \
  --name volume-lab \
  -v app-data:/data \
  alpine sh -c 'echo persistent > /data/example.txt; sleep 600'

docker exec volume-lab cat /data/example.txt
docker rm -f volume-lab
Malli volume-ni attach chesi data verify cheyyi:


bash
docker run --rm -v app-data:/data alpine cat /data/example.txt
Cleanup, lab complete ayyaka:


bash
docker volume rm app-data
Bind mount: Host path-ni container path-ku mount chesthundi.


bash
mkdir -p ./app-data

docker run --rm \
  --mount type=bind,source="$(pwd)/app-data",target=/data \
  alpine sh -c 'echo hello > /data/test.txt'
Host directory-lo test.txt create avuthundi.

Feature

Named volume

Bind mount

Storage location

Docker-managed

Explicit host path

Common use

Persistent application data

Development files, selected host files

Host filesystem access

Usually indirect

Direct

Portability

Docker-managed lifecycle helps

Host path dependencies untayi

Production lesson: Container writable layer-ni permanent database storage laga use cheyyaku. Correct volume strategy, backups and restore testing implement cheyyi.

3.6 — Docker PID 1, ENTRYPOINT and CMD
Ee topic interviews-lo kuda chala important bayya.

3.6.1 PID 1 enduku special?
Container PID namespace-lo first process PID 1-ga run avvachu. Linux PID 1-ku signal handling and orphan-process reaping-related special behavior untundi.

Application signal handling correct-ga implement cheyyakapothe, container shutdown slow avvachu or graceful shutdown fail avvachu.

Example Dockerfile:


dockerfile
FROM alpine
CMD ["sh", "-c", "sleep 600"]
Build and run:


bash
docker build -t pid-demo .
docker run -d --name pid-demo pid-demo
docker stop -t 5 pid-demo
Shell process signal-ni ela handle chesthundi, child process-ku forward chesthunda ane behavior shell and command structure batti depend avuthundi.

3.6.2 Shell form vs exec form
Shell form:


dockerfile
CMD node server.js
Exec form:


dockerfile
CMD ["node", "server.js"]
Exec form application-ni direct-ga main process-ga launch cheyyadaniki generally preferred. Shell form additional shell involve cheyyachu, which can affect signal delivery.

Entrypoint example:


dockerfile
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

USER node
ENTRYPOINT ["node"]
CMD ["server.js"]
Ee example-lo:


bash
docker run --rm demo-app
node server.js run avuthundi.

Alternative arguments pass cheyyachu:


bash
docker run --rm demo-app --version
Ikkada image name demo-app actual-ga build chesina image name ayi undali.

3.6.3 ENTRYPOINT vs CMD
Instruction

Purpose

ENTRYPOINT

Main executable or application entrypoint

CMD

Default command or default arguments

docker run IMAGE args

Image configuration-ni batti command/arguments override chesthundi

Exec-form ENTRYPOINT and CMD combination:


dockerfile
ENTRYPOINT ["python", "app.py"]
CMD ["--port", "8080"]
Default:


bash
docker run my-python-app
Equivalent application arguments:


bash
python app.py --port 8080
Override:


bash
docker run my-python-app --port 9090
Ikkada CMD defaults replace avuthayi; ENTRYPOINT remain avuthundi.

3.6.4 Graceful shutdown
Docker stop default-ga configured grace period varaku application shutdown-ku opportunity isthundi; grace period complete ayyaka process terminate cheyyabadavachu.


bash
docker stop -t 20 myapp
Production application-lo SIGTERM receive chesinappudu:

New requests accept cheyyadam stop cheyyali.

In-flight requests complete cheyyadaniki attempt cheyyali.

Database connections and resources clean up cheyyali.

Grace period lopala exit avvali.

Shell wrapper use chesthe exec command important:


sh
#!/bin/sh
set -e
exec node server.js
exec shell-ni application process-to replace chesthundi, signals direct-ga application-ku reach avvadaniki help chesthundi.

3.7 — Linux Capabilities and Seccomp
Container-lo root user-ga run cheyyadam and unrestricted host root-ga run cheyyadam same kaadu. Kaani container root-ni automatically safe ani assume cheyyakudadhu.

Linux capabilities
Traditional root privileges-ni smaller privilege units-ga divide chesthayi.

Examples:

CAP_NET_BIND_SERVICE — privileged network ports bind cheyyadaniki.

CAP_CHOWN — file ownership change cheyyadaniki.

CAP_SYS_ADMIN — broad and powerful operations-ku access ivvagaladu.

Seccomp
Seccomp system-call filtering use chesi process ye Linux system calls execute cheyyagalado restrict cheyyagaladu.

Docker environments-lo default seccomp profile use avvachu, but exact behavior and profile configuration verify cheyyali.

Safer container example:


bash
docker run -d \
  --name secure-lab \
  --user 10001:10001 \
  --read-only \
  --cap-drop ALL \
  --security-opt no-new-privileges:true \
  --tmpfs /tmp \
  alpine sleep 600
Ee example intentionally restrictive. Application-ku write access or additional capabilities avasaram ayithe explicit-ga configure cheyyali. Ee exact command NGINX lanti prathi application-ku direct drop-in replacement kaadu.

Inspect:


bash
docker inspect secure-lab
docker exec secure-lab id
Cleanup:


bash
docker rm -f secure-lab
Security principle: Least privilege — application-ku avasaramaina permissions maatrame ivvali.

3.8 — Troubleshooting lab
Problem 1: Permission denied

bash
docker run --rm \
  --user 10001:10001 \
  -v "$PWD:/data" \
  alpine sh -c 'touch /data/test.txt'
Possible cause: Host directory UID/GID or permissions container user-ku write access ivvatledu.

Investigate:


bash
id
ls -ld .
ls -l
Problem 2: Container OOMKilled

bash
docker inspect -f '{{.State.OOMKilled}}' resource-lab
docker stats --no-stream resource-lab
docker logs resource-lab
OOMKilled=true memory exhaustion-related kill jarigindani indicate chesthundi. Memory limits, application memory usage, host pressure and workload patterns investigate cheyyali.

Problem 3: Container shutdown avvadaniki ekkuva time paduthundi
Investigate:


bash
docker stop -t 5 myapp
docker inspect -f '{{.State.ExitCode}}' myapp
docker logs myapp
Possible causes:

Application SIGTERM handle cheyyakapovadam.

Child processes correctly terminate kakapovadam.

Shutdown hooks block avvadam.

Application cleanup operation slow-ga undadam.

Production fix: Graceful shutdown support, correct signal forwarding, and suitable stop timeout.

3.9 — Interview questions
Q1. Containers enduku lightweight?

Containers generally host kernel-ni share chesthayi; each container-ku separate guest OS boot cheyyalsina avasaram undadu.

Q2. Namespaces and cgroups difference enti?

Namespaces resource views-ni isolate chesthayi. cgroups resource usage-ni account cheyyadaniki and configured limits enforce cheyyadaniki help chesthayi.

Q3. Container PID 1 enduku important?

Main process signals and child-process lifecycle handle cheyyadam important. Incorrect handling graceful shutdown problems create cheyyagaladu.

Q4. --memory=256m and --cpus=0.5 em chesthayi?

Memory limit and CPU capacity quota configure chesthayi. Exact observed behavior workload and host configuration meeda depend avuthundi.

Q5. Named volume and container writable layer difference enti?

Writable layer container lifecycle-to tied untundi. Named volume separate lifecycle kaligi untundi and container recreate chesina data preserve cheyyadaniki useful.

Q6. Container root user safe aa?

Automatic-ga kaadu. Capabilities, seccomp, user namespaces, mounts, privileges, host kernel and runtime configuration anni security-ni affect chesthayi.

3.10 — Part 3 completion checklist
Part 3 — Final Assessment
0/8

Linux process, PID and PID 1 explain cheyyagalanu

Docker container process-ni host process nunchi distinguish cheyyagalanu

Users, groups and file permissions troubleshoot cheyyagalanu

Linux namespaces purpose explain cheyyagalanu

cgroups and CPU/memory limits test cheyyagalanu

Writable layer, bind mount and volume differences explain cheyyagalanu

Capabilities, seccomp and least privilege explain cheyyagalanu

Container shutdown and OOM issues investigate cheyyagalanu

 Part 4 — Docker CLI and Image Management
Learning objectives
Level 1 · Foundations · Beginner → Intermediate

Docker CLI commands and options
Images, layers, tags and digests
Registries, image transfer and distribution
Image verification, cleanup and troubleshooting
4.1 — Docker CLI ante enti?
CLI ante Command-Line Interface. Terminal nunchi Docker Engine-ni control cheyyadaniki manam use chese interface.

Basic syntax:

bash
docker [OPTIONS] COMMAND [ARG...]
Examples:

bash
docker ps
docker images
docker pull nginx
docker inspect nginx
docker image history nginx
Docker commands-ni functionality batti groups-ga organize chesaru.

Command group

Purpose

docker container

Container lifecycle and inspection

docker image

Images manage cheyyadam

docker volume

Persistent storage manage cheyyadam

docker network

Container networking

docker buildx

Advanced image builds

docker system

Disk usage and cleanup

Modern explicit syntax:

bash
docker container ls
docker image ls
docker image pull nginx
docker image inspect nginx
docker image history nginx
Short forms kuda valid:

bash
docker ps
docker images
docker pull nginx
docker inspect nginx
Interview point: docker image ls and docker images basic-ga same image-listing operation-ni perform chesthayi.

4.2 — Essential Docker CLI commands
A. Docker Engine status check cheyyadam
bash
docker version
docker info
docker context ls
docker context show
docker version — Docker client and server versions.

docker info — Engine configuration, storage, runtime and system details.

docker context ls — Available Docker contexts.

docker context show — Current context.

Enduku context important?

Nee laptop-lo Docker Desktop use chesthunnav anuko. Vere environment-lo remote Linux Docker Engine kuda undochu. Docker context batti commands target ayye Engine change avvachu.

B. Container commands
bash
docker container ls
docker container ls -a
docker container create --name demo nginx
docker container start demo
docker container stop demo
docker container logs demo
docker container inspect demo
docker container rm demo
C. Image commands
bash
docker image ls
docker image pull nginx
docker image inspect nginx
docker image history nginx
docker image tag nginx my-nginx:v1
docker image rm my-nginx:v1
D. Help and documentation
Command options marchipothe:

bash
docker --help
docker image --help
docker run --help
docker build --help
Practical habit: Unknown option ni guess cheyyakunda --help check cheyyi.

4.3 — Docker image ante enti?
Docker image anedi application run cheyyadaniki required filesystem content, metadata and configuration-ni package chese immutable-style template.

Example:

bash
docker pull nginx
Ee command default-ga nginx:latest image reference-ni resolve chesthundi.

Image download ayyaka:

bash
docker image ls
Sample output:

text
REPOSITORY   TAG       IMAGE ID       SIZE
nginx        latest    abc123...      ...
Output values illustrative only; actual image ID and size mee machine batti change avuthayi.

Image-lo generally include ayyevi:

Base filesystem.

Application binaries and dependencies.

Image configuration.

Default command or entrypoint metadata.

Environment variable defaults and working directory metadata, if configured.

Image alone running application kaadu. Image nunchi container create chesi start chesthe application process execute avuthundi.

4.4 — Image tags, image IDs and digests
Ee three concepts clear-ga understand chesukovali bayya. Production deployments-lo chaala important.

1. Image tag
Tag anedi image-ni human-readable name tho refer cheyyadaniki use chestham.

bash
docker pull nginx:1.28
docker pull nginx:alpine
docker pull nginx:latest
Image reference structure:

text
[REGISTRY/] [NAMESPACE/] IMAGE_NAME [:TAG] [@DIGEST]
Examples:

text
nginx:alpine
docker.io/library/nginx:alpine
ghcr.io/myteam/api:v1.2.0
registry.example.com/platform/backend:2026.10
Spaces lekunda reference-ni continuous string-ga rayali; brackets notation explanatory only.

Important: latest ante automatically newest version ani guarantee kaadu. Adi oka tag name maatrame.

2. Image ID
Image ID Docker local image object-ni identify chesthundi. Commonly content-derived image configuration digest representation-ga untundi.

bash
docker image ls
docker image inspect nginx:alpine
3. Image digest
Digest image content manifest-ni cryptographic hash dwara identify cheyyadaniki use avuthundi.

Example format:

text
nginx@sha256:0123456789abcdef...
Idi illustrative digest format maatrame, actual pull cheyyadaniki valid digest kaadu.

Feature

Tag

Image ID

Digest

Purpose

Readable reference

Local image identity

Content-addressed reference

Mutable?

Tag vere image-ku move avvachu

Specific image object identity

Specific content object-ni identify chesthundi

Production use

Useful for naming

Local inspection

Reproducible image selection-ku useful

Tag enduku dangerous avvachu?
Suppose deployment config-lo:

text
company/api:production
Ee tag today image A-ni point cheyyachu. Repati roju registry operator ade tag-ni image B-ku update cheyyachu.

Deployment time-lo image resolution change avvachu.

Production example:

bash
docker pull nginx:alpine
docker image inspect nginx:alpine
More deterministic deployment-ku verified digest use cheyyadam better:

bash
docker pull nginx@sha256:YOUR_VERIFIED_DIGEST
YOUR_VERIFIED_DIGEST place-lo actual registry nunchi verify chesina digest pettali. Random digest invent cheyyakudadhu.

Senior engineering lesson: Tag readability istundi; digest exact content reference-ku help chesthundi. Kaani digest pinning okkate image trustworthy ani prove cheyyadu — provenance, vulnerability status and source kuda verify cheyyali.

4.5 — Image layers and caching
Docker images generally layered filesystem representation use chesthayi.

Example Dockerfile:

dockerfile
FROM alpine:3.22

RUN apk add --no-cache curl

WORKDIR /app

COPY app.sh .

CMD ["sh", "app.sh"]
Build cheyyadaniki:

bash
docker build -t demo-app:v1 .
Simplified layer relationship:

Image configuration

CMD · WORKDIR metadata

COPY layer

app.sh

RUN layer

Installed curl files

Base image

Alpine filesystem

Note: WORKDIR and CMD lanti Dockerfile instructions metadata or filesystem changes create cheyyavachu; prathi instruction separate filesystem layer create chesthundi ani assume cheyyakudadhu.

Layer reuse enduku useful?
Suppose two applications same base image use chesthunnayi. Docker already available unna compatible layers-ni reuse cheyyagaladu. Daanivalla duplicate storage and unnecessary downloads reduce avvachu.

Build cache
bash
docker image history demo-app:v1
docker build -t demo-app:v2 .
Docker build cache eligible steps-ni reuse cheyyagaladu. Earlier step inputs change ayithe subsequent steps cache invalidate avvachu.

Bad Dockerfile pattern:

dockerfile
COPY . .
RUN npm install
Source code prathi change ki COPY layer change avvachu, daani tarvatha dependency installation cache invalidate avvachu.

Better pattern:

dockerfile
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
Ila dependency manifest unchanged-ga unte dependency installation cache reuse ayye chance ekkuva.

Important: Ee Node.js example-ku corresponding Node base image and correct working directory kuda Dockerfile-lo configure cheyyali.

Hands-on lab
bash
mkdir docker-image-lab
cd docker-image-lab
Create Dockerfile:

dockerfile
FROM alpine:3.22
RUN apk add --no-cache curl
WORKDIR /app
COPY message.txt .
CMD ["cat", "message.txt"]
Create message.txt:

text
Hello bayya, Docker image layers!
Build and run:

bash
docker build -t image-lab:v1 .
docker run --rm image-lab:v1
docker image history image-lab:v1
docker image inspect image-lab:v1
Expected application output:

text
Hello bayya, Docker image layers!
message.txt change chesi rebuild chesthe build cache behavior observe cheyyi.

4.6 — Docker registries
Registry ante container images store and distribute chese service.

Common examples:

Docker Hub.

GitHub Container Registry (GHCR).

Amazon Elastic Container Registry (ECR).

Azure Container Registry (ACR).

Google Artifact Registry.

Private enterprise registries.

Basic workflow:

Developer machine

Build and tag image

Container registry

Store, distribute, access-control

Production server / CI runner

Pull and run image

Pull an image
bash
docker pull nginx:alpine
Tag for your registry
bash
docker tag nginx:alpine \
  registry.example.com/team/nginx:v1
Login
bash
docker login registry.example.com
Push
bash
docker push registry.example.com/team/nginx:v1
registry.example.com illustrative placeholder. Real registry hostname and repository permissions configure chesukovali.

Private registry-ku push cheyyadaniki authentication, authorization and correct repository access avasaram.

Logout
bash
docker logout registry.example.com
Security tip: Password-ni command-line arguments-lo direct-ga pettakudadhu. CI/CD-lo approved secret manager, short-lived credentials or supported credential helper use cheyyadam better.

4.7 — save, load, export, import difference
Bayya, ee four commands names similar-ga unna use cases different.

A. Save an image
bash
docker image save -o nginx-image.tar nginx:alpine
Docker image-ni archive-ga save chesthundi. Image layers and image metadata preserve cheyyadaniki intended.

B. Load an image
bash
docker image load -i nginx-image.tar
docker image ls
Previously saved image archive-ni Docker image store-loki load chesthundi.

Useful when image-ni offline environment-ku transfer cheyyali.

C. Export a container filesystem
bash
docker create --name export-lab alpine:3.22
docker container export -o container-filesystem.tar export-lab
Container filesystem view-ni tar archive-ga export chesthundi.

D. Import a filesystem archive as an image
bash
docker image import container-filesystem.tar imported-image:v1
docker image ls
Filesystem archive nunchi image create chesthundi. Original image history, layers and full container configuration automatically preserve avvavu.

Command

What it handles

Main use

docker image save

Image archive

Image transfer/backup

docker image load

Saved image archive

Restore images

docker container export

Container filesystem

Filesystem snapshot/export

docker image import

Filesystem archive

New image create cheyyadam

Interview point: Image transfer kosam generally save/load correct choice. export/import image history and original configuration preserve cheyyadaniki replacement kaadu.

Note: Container export persistent volume contents-ni automatically include cheyyadu.

4.8 — Docker disk usage and cleanup
Production environments-lo disk-full issues common. Images, stopped containers, build cache, volumes anni storage consume cheyyagalavu.

Step 1: Usage inspect cheyyi
bash
docker system df
docker system df -v
Step 2: Images list cheyyi
bash
docker image ls
docker image ls -a
Step 3: Build cache inspect cheyyi
bash
docker builder du
docker builder du availability and output builder configuration batti vary avvachu.

Step 4: Safe-ga targeted cleanup
Stopped container remove cheyyadam:

bash
docker container ls -a
docker container rm <stopped-container>
Specific image remove cheyyadam:

bash
docker image rm <image-name>:<tag>
Dangling images cleanup:

bash
docker image prune
Build cache cleanup:

bash
docker builder prune
docker system prune jagratha!
bash
docker system prune
Ee command unused Docker resources-ni clean cheyyagaladu. Exact removal scope options and Docker version batti untundi.

Volumes-ku special attention ivvali. Persistent data unna volumes-ni careless-ga delete chesthe data loss avvachu.

bash
docker system prune --volumes
Ee command-ni blindly production-lo run cheyyaku. Mundu resources, ownership, backups and impact verify cheyyi. Volume cleanup behavior version and volume type batti understand chesukovali.

Senior engineer habit: First inspect → identify unused resources → confirm backup and ownership → targeted cleanup → verify recovered disk space.

4.9 — Image security and supply-chain basics
Image build cheyyadam varake Docker mastery complete kaadu. Image trusted source nunchi vachinda, vulnerabilities unnaya, unnecessary packages unnaya ani kuda choodali.

1. Minimal base images
Unnecessary tools and packages image-lo include cheyyakunda reduce cheyyali.

2. Non-root user
Application support chesthe:

dockerfile
USER 10001:10001
3. Secrets image-lo bake cheyyakudadhu
Bad practice:

dockerfile
ENV DATABASE_PASSWORD=my-secret-password
Ee password image configuration/history or other inspection paths dwara expose avvachu.

Better approach: Runtime secrets management, platform secret integrations, and restricted secret mounts use cheyyadam. Build-time secrets kosam BuildKit secret mounts use cheyyachu.

4. Image scanning
Approved scanner use chesi known vulnerabilities identify cheyyali. Example tools environment batti Trivy or Docker Scout kavachu.

5. Image provenance and signatures
Trusted build source, build provenance, image signature verification and digest pinning supply-chain integrity-ku help chesthayi.

Kaani signed image = vulnerability-free image ani artham kaadu. Signature trust and image security separate checks.

4.10 — Real-world troubleshooting scenarios
Scenario A: manifest unknown
Example:

text
manifest unknown
Possible causes:

Incorrect image tag.

Repository name typo.

Registry-lo aa image/tag lekapovadam.

Wrong repository or namespace.

Investigate:

bash
docker pull nginx:alpine
docker image ls
Private registry case-lo exact repository and tag verify cheyyali.

Scenario B: unauthorized
Example:

text
unauthorized: authentication required
Investigate:

bash
docker login registry.example.com
docker pull registry.example.com/team/app:v1
Possible causes: Missing credentials, expired token, wrong registry hostname, or insufficient repository permissions.

Scenario C: no space left on device
First:

bash
docker system df
docker builder du
df -h
Linux host-lo inode exhaustion kuda possible:

bash
df -i
Docker storage location, host filesystem and build cache inspect chesi targeted cleanup cheyyali. Active containers or important volumes-ni blind-ga delete cheyyakudadhu.

Scenario D: Image tag push ayindi, but wrong version deploy ayyindi
Possible cause: Mutable tag move ayyindi, old local cache use ayyindi, or CI/CD pipeline incorrect artifact-ni push chesindi.

Investigate:

bash
docker image inspect registry.example.com/team/app:v1
docker image ls --digests
Production deployment-ku build artifact digest-ni pipeline nunchi capture chesi, expected digest-to compare cheyyadam reliable practice.

4.11 — Complete hands-on lab
Ee lab-lo image build, inspect, tag, save, load, run and cleanup practice chestham.

Step 1: Project create cheyyi
bash
mkdir docker-part4-lab
cd docker-part4-lab
Dockerfile:

dockerfile
FROM alpine:3.22

LABEL maintainer="docker-learning-lab"

WORKDIR /app

COPY message.txt .

CMD ["cat", "message.txt"]
message.txt:

text
Part 4 image management lab successful!
Step 2: Build the image
bash
docker build -t part4-lab:v1 .
Step 3: Run and verify
bash
docker run --rm part4-lab:v1
Expected output:

text
Part 4 image management lab successful!
Step 4: Inspect image metadata
bash
docker image ls
docker image inspect part4-lab:v1
docker image history part4-lab:v1
Step 5: Tag the image
bash
docker image tag part4-lab:v1 part4-lab:testing
docker image ls
Same image-ku multiple tags undavachu; tags separate image copies ani necessarily artham kaadu.

Step 6: Save and load
bash
docker image save -o part4-lab.tar part4-lab:v1

docker image rm part4-lab:v1

docker image load -i part4-lab.tar

docker image ls
docker run --rm part4-lab:v1
Expected output:

text
Part 4 image management lab successful!
Step 7: Cleanup
bash
docker image rm part4-lab:v1 part4-lab:testing
Archive-ni preserve cheyyali anukunte part4-lab.tar delete cheyyaku. Unnecessary ani confirm ayyaka maatrame remove cheyyi.

🟢 Level 1 — Foundations
Part 5 — Dockerfiles, Image Layers and Image Lifecycle
Goal: Production-ready container images build cheyyadam, image layers ela work avuthayo understand chesukovadam, image size and security improve cheyyadam.

5.1 Dockerfile Ante Enti?
Dockerfile anedi Docker image build cheyyadaniki instructions unna text file.

Example:


dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
Explanation:

FROM — base image select chesthundi.
COPY — build context nunchi files image filesystem-loki copy chesthundi.
EXPOSE — container intended listening port-ni document chesthundi.
EXPOSE use chesinanta matrana host port publish avvadu.
5.2 Docker Image Layers Internals
Docker images generally multiple filesystem layers-to construct avuthayi. Container create chesinappudu image filesystem meeda writable layer add avvachu.


mermaid
flowchart TB
    A["Container Writable Layer"]
    B["Image Layer 3 - Application"]
    C["Image Layer 2 - Dependencies"]
    D["Image Layer 1 - Base Filesystem"]

    A --> B --> C --> D
Important concepts:

Image layers generally read-only.
Container filesystem changes writable layer-lo record avvachu.
Multiple images common layers-ni reuse chesukovachu.
Writable layer data container remove chesinappudu normally lose avuthundi.
Persistent data kosam Docker volumes or bind mounts use cheyyali.
5.3 Docker Build Process
Project structure:


text
docker-lab/
├── Dockerfile
├── index.html
└── .dockerignore
Create index.html:

<!DOCTYPE html>
<html>
<head>
    <title>Docker Lab</title>
</head>
<body>
    <h1>Hello Docker!</h1>
</body>
</html>
Create Dockerfile:


dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
Build image:


bash
docker build -t docker-lab:v1 .
Command breakdown:


Option	Meaning
docker build	Image build process start chesthundi
-t	Image name and tag assign chesthundi
docker-lab	Image repository name
v1	Image tag
.	Current directory build context-ga use avuthundi
5.4 Build Context and .dockerignore
Build context anedi Docker build process-ku available chese files and directories collection.

Unnecessary files context-lo include avvakunda .dockerignore use cheyyali.

Example .dockerignore:


text
.git
node_modules
.env
*.log
coverage
dist
Security note: .dockerignore useful, kaani secrets-ni Dockerfile-lo copy cheyyakunda undadam kuda important. Sensitive build-time credentials kosam BuildKit secrets use cheyyali.

5.5 Build and Run Custom Image

bash
docker build -t docker-lab:v1 .
docker images
docker image inspect docker-lab:v1
docker history docker-lab:v1
Run container:


bash
docker run -d \
  --name docker-lab-web \
  -p 8086:80 \
  docker-lab:v1
Test application:


bash
curl http://localhost:8086
Expected result:

<h1>Hello Docker!</h1>
Browser-lo http://localhost:8086 open chesi verify cheyyachu.

Cleanup:


bash
docker rm -f docker-lab-web
5.6 Docker Build Cache Optimization
Docker build process-lo previous instructions output cache reuse avvachu, cache conditions valid-ga unte.

Less optimal Dockerfile:


dockerfile
FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm ci

CMD ["npm", "start"]
Problem: Application source files change ayina dependency installation layer invalidate avvachu.

Improved Dockerfile:


dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
Dependencies mundu install cheyyadam valla source-only changes vachinappudu dependency layer cache reuse avvadaniki chance untundi.

Note: Node.js version and base image-ni application compatibility and security support prakaram select cheyyali.
5.7 CMD vs ENTRYPOINT
CMD default command or arguments provide chesthundi.

ENTRYPOINT container primary executable define cheyyadaniki use avuthundi.

Example:


dockerfile
FROM alpine:3.22

ENTRYPOINT ["echo"]
CMD ["Hello Docker"]
Build:


bash
docker build -t my-echo-image .
Run:


bash
docker run --rm my-echo-image
Expected output:


text
Hello Docker
Override arguments:


bash
docker run --rm my-echo-image "Hello Bayya"
Expected output:


text
Hello Bayya
Exec form (["executable", "argument"]) generally preferred because process and signal handling behavior predictable-ga untundi.

5.8 Multi-Stage Builds
Multi-stage builds build dependencies and intermediate artifacts-ni final runtime image nunchi separate cheyyadaniki help chesthayi.

Example:


dockerfile
FROM golang:1.24-alpine AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o /app/server .

FROM alpine:3.22

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY --from=builder /app/server ./server

USER app

EXPOSE 8080

ENTRYPOINT ["./server"]
Benefits:

Final image-lo compiler and build tools include cheyyalsina avasaram tagguthundi.
Image size reduce avvachu.
Attack surface reduce cheyyadaniki help chesthundi.
Build and runtime environments separate-ga manage cheyyachu.
Production use mundu application dependencies, certificates, runtime libraries and file permissions validate cheyyali.

5.9 Image Security Best Practices
Trusted and maintained base images use cheyyali.
Unnecessary packages remove cheyyali.
Possible ayithe application-ni non-root user-ga run cheyyali.
Passwords, API tokens and private keys-ni Dockerfile-lo hardcode cheyyakudadhu.
Vulnerability scanning implement cheyyali.
Image provenance and signatures verify cheyyali.
Base image updates and dependency patches regularly apply cheyyali.
Example:


dockerfile
FROM node:22-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

USER node

CMD ["node", "server.js"]
5.10 Troubleshooting
Problem: COPY file not found


bash
docker build -t myapp:v1 .
Check:

File build context-lo unda?
Filename and path correct-ga unnaya?
.dockerignore file-ni exclude chesthunda?
Problem: Container immediately exit avuthundi


bash
docker ps -a
docker logs <container-name>
docker inspect <container-name>
Primary process terminate ayithe container stop avuthundi. Logs, exit code, command and environment investigate cheyyali.

Problem: Image size ekkuva undi


bash
docker images
docker history myapp:v1
Unnecessary packages, build artifacts, oversized base images and copied dependencies identify cheyyali.

5.11 Interview Questions
Q1. Docker image layers enduku useful?

Layer reuse, caching and efficient image distribution kosam.

Q2. EXPOSE 80 host port 80 publish chesthunda?

No. Host port publishing kosam -p 8080:80 lanti runtime configuration use cheyyali.

Q3. Container writable-layer data permanent aa?

Kaadu. Container remove chesthe writable-layer data normally lose avuthundi. Persistent data kosam volumes or bind mounts use cheyyali.

Q4. Multi-stage builds enduku use chestham?

Build tools and intermediate artifacts-ni final image nunchi exclude cheyyadaniki.

Q5. Dockerfile-lo secrets enduku pettakudadhu?

Image layers, build cache or metadata dvara credentials leak ayye risk undi.

5.12 Completion Checklist
Dockerfile rayagalagali.
Custom image build and run cheyyagalagali.
Image layers and writable layer difference explain cheyyagalagali.
.dockerignore configure cheyyagalagali.
CMD and ENTRYPOINT difference explain cheyyagalagali.
Build cache optimize cheyyagalagali.
Multi-stage build implement cheyyagalagali.
Non-root execution and secret handling understand chesukovali.
🔵 Level 2 — Application Engineering
Part 6 — Linux Internals for Docker Engineers
Goal: Namespaces, cgroups, processes, capabilities, filesystem mounts and Linux networking fundamentals understand chesukoni containers internals troubleshoot cheyyadam.

6.1 Linux Containers Internals
Linux containers anedi separate kernel unna virtual machines kaavu. Typical Linux container host kernel-ni share chesthundi.

Container isolation and resource control kosam Linux kernel features use chesthundi.


mermaid
flowchart TB
    A["Docker Engine"]
    B["Container Runtime"]
    C["Linux Kernel"]
    D["Namespaces"]
    E["cgroups"]
    F["Capabilities and Security Controls"]
    G["Container Processes"]

    A --> B --> C
    C --> D
    C --> E
    C --> F
    D --> G
    E --> G
    F --> G
6.2 Linux Namespaces
Namespaces processes-ku selected system resources meeda isolated views provide chesthayi.


Namespace	Purpose
PID	Process ID visibility isolate chesthundi
NET	Network interfaces, routes and related networking state isolate chesthundi
MNT	Mount points and filesystem view isolate chesthundi
UTS	Hostname and domain-name view isolate chesthundi
IPC	Interprocess communication resources isolate chesthundi
USER	User and group ID mappings isolate chesthundi
cgroup	cgroup hierarchy view isolate cheyyadaniki use avuthundi
Namespace isolation complete security guarantee kaadu. Other kernel security controls kuda important.

6.3 Inspect Container Processes
Run a container:


bash
docker run -d --name linux-lab nginx:alpine
Inspect processes:


bash
docker top linux-lab
docker inspect linux-lab
Container shell available ayithe:


bash
docker exec -it linux-lab sh
Inside container:


sh
ps
id
hostname
cat /proc/1/status
Exit:


sh
exit
/proc virtual filesystem process and kernel-related information expose chesthundi. Container-lo visible process list, host process list-to same undalsina avasaram ledu.

6.4 cgroups and Resource Limits
cgroups process groups resource usage-ni account cheyyadaniki and supported resources-ku limits apply cheyyadaniki use avuthayi.

Example memory limit:


bash
docker run -d \
  --name memory-lab \
  --memory=128m \
  nginx:alpine
CPU limit:


bash
docker run -d \
  --name cpu-lab \
  --cpus=0.5 \
  nginx:alpine
Inspect resource usage:


bash
docker stats
Container cleanup:


bash
docker rm -f memory-lab cpu-lab linux-lab
Memory limits set chesthe application behavior, OOM events and workload requirements test cheyyali. Resource limits wrong-ga configure chesthe performance degrade avvachu or application terminate avvachu.

6.5 Linux Capabilities and Privileges
Linux capabilities traditionally root user-ku associated unna privileges-ni smaller units-ga divide chesthayi.

Docker security examples:


bash
docker run --rm \
  --cap-drop=ALL \
  nginx:alpine
Ee example restrictive-ga undi; actual NGINX startup-ku required operations environment batti additional capabilities or configuration avasaram avvachu.

General principles:

--privileged unnecessary-ga use cheyyakudadhu.
Required capabilities maatrame grant cheyyali.
Non-root execution prefer cheyyali.
Read-only root filesystem consider cheyyali.
seccomp and AppArmor/SELinux policies use cheyyali where supported.
6.6 Read-Only Root Filesystem
Example:


bash
docker run -d \
  --name readonly-web \
  --read-only \
  --tmpfs /tmp \
  nginx:alpine
Read-only root filesystem application files modify cheyyakunda restrict chesthundi. NGINX configuration, cache, PID files and temporary paths kosam writable mounts avasaram avvachu. Kabatti ee exact example-ni target image and configuration batti test cheyyali.

6.7 Troubleshooting
Container memory-related failure


bash
docker inspect --format '{{.State.OOMKilled}}' <container-name>
docker stats
docker inspect <container-name>
OOMKilled status, memory limits and host-level resource pressure inspect cheyyali.

Permission denied


bash
docker inspect <container-name>
docker exec -it <container-name> id
Investigate:

User ID and group ID.
File ownership and permissions.
Bind mount permissions.
Linux capabilities.
SELinux/AppArmor policies.
Read-only mount restrictions.
6.8 Interview Questions
Q1. Namespace and cgroup madhya difference enti?

Namespaces visibility and isolation provide chesthayi. cgroups resource accounting and supported resource limits-ku use avuthayi.

Q2. Container-ku own kernel untunda?

Typical Linux container host kernel-ni share chesthundi.

Q3. --privileged enduku risky?

Container-ku substantially expanded privileges provide cheyyagaladu, isolation boundary-ni weaken cheyyavachu.

Q4. Container memory limit enduku useful?

Workload resource consumption control cheyyadaniki and host resource exhaustion risk reduce cheyyadaniki.

6.9 Completion Checklist
Namespaces purpose explain cheyyagalagali.
cgroups and resource limits understand chesukovali.
Container processes inspect cheyyagalagali.
Linux capabilities basics explain cheyyagalagali.
Permission and OOM-related failures troubleshoot cheyyagalagali.
Part 7 — Docker Networking Deep Dive
Goal: Bridge networking, port publishing, DNS, routing, firewall behavior and container-to-container communication troubleshoot cheyyadam.

7.1 Docker Network Types

Network type	Use case
Bridge	Same Docker host-lo container communication
Host	Host networking namespace-ni share cheyyadam, supported Linux environments-lo
None	Container-ku ordinary network connectivity disable cheyyadam
Overlay	Multiple Docker hosts madhya network connectivity, supported Swarm deployments-lo
Custom bridge	Application-specific isolated network and automatic service-name DNS
Networking modes and behavior operating system and Docker configuration batti vary avuthayi.

7.2 Default Bridge vs User-Defined Bridge
Create custom network:


bash
docker network create app-network
Start two containers:


bash
docker run -d \
  --name web \
  --network app-network \
  nginx:alpine

docker run -d \
  --name client \
  --network app-network \
  alpine:3.22 \
  sleep 3600
Test service-name resolution:


bash
docker exec client nslookup web
If nslookup utility available lekapothe suitable debugging image use cheyyali.

Test HTTP connectivity:


bash
docker exec client wget -qO- http://web
Custom user-defined bridge networks-lo containers service/container names use chesi communicate cheyyagalavu, subject to configuration.

7.3 Port Publishing

bash
docker run -d \
  --name web-published \
  -p 8088:80 \
  nginx:alpine
Meaning:

Host port: 8088
Container port: 80
Test:


bash
curl http://localhost:8088
-p 8088:80 use cheyyadam valla host port publishing configure avuthundi. Exact packet forwarding and firewall implementation platform batti vary avuthayi.

7.4 Network Inspection

bash
docker network ls
docker network inspect app-network
docker inspect web
docker port web-published
Container cleanup:


bash
docker rm -f web client web-published
docker network rm app-network
7.5 Troubleshooting
Problem: Container-to-container DNS fail avuthundi


bash
docker network inspect app-network
docker exec client nslookup web
Verify both containers same user-defined network-lo unnaya, container name correct-ga unda, and target application listening chesthunda.

Problem: Host nunchi application access avvatledu


bash
docker ps
docker port web-published
docker logs web-published
Verify:

Correct host port publish ayyinda?
Application container port-lo listen chesthunda?
Host firewall rules allow chesthunnaya?
Application expected interface-ku bind ayyinda?
7.6 Interview Questions
Q1. Container-to-container communication-ku port publishing compulsory aa?

Same suitable Docker network-lo direct communication-ku generally host port publishing avasaram ledu.

Q2. Custom bridge network enduku use chestham?

Application isolation and automatic container-name DNS kosam.

Q3. EXPOSE and -p difference enti?

EXPOSE image metadata/documentation. -p runtime port publishing configure chesthundi.

7.7 Completion Checklist
Docker network create and inspect cheyyagalagali.
Containers madhya DNS resolve cheyyagalagali.
Port publishing test cheyyagalagali.
Connectivity failures systematically troubleshoot cheyyagalagali.
Part 8 — Docker Volumes and Persistent Storage
Goal: Container lifecycle-ku independent-ga application data persist cheyyadam, volumes and bind mounts difference understand chesukovadam, database storage manage cheyyadam.

8.1 Container Storage Types

Storage type	Purpose
Writable layer	Container filesystem changes
Named volume	Docker-managed persistent storage
Bind mount	Host path-ni container path-ku mount cheyyadam
tmpfs mount	Memory-backed temporary filesystem, supported platforms-lo
8.2 Named Volume Lab
Create volume:


bash
docker volume create app-data
Write data:


bash
docker run --rm \
  -v app-data:/data \
  alpine:3.22 \
  sh -c 'echo "Persistent Docker Data" > /data/message.txt'
Read data using another container:


bash
docker run --rm \
  -v app-data:/data \
  alpine:3.22 \
  cat /data/message.txt
Expected output:


text
Persistent Docker Data
Inspect volume:


bash
docker volume inspect app-data
docker volume ls
Remove volume after lab completion:


bash
docker volume rm app-data
Warning: Volume remove chesina tarvatha data recover cheyyadam difficult avvachu. Production data-ku deletion mundu backup and retention policies verify cheyyali.

8.3 Bind Mount Example

bash
docker run --rm \
  --mount type=bind,source="$(pwd)",target=/workspace \
  alpine:3.22 \
  ls -la /workspace
Bind mount host directory-ni container-ku expose chesthundi. Host path and permissions correct-ga undali.

8.4 Database Persistence
Database container recreate chesina data persist avvalante database storage directory-ku suitable persistent volume attach cheyyali.

Example pattern:


bash
docker volume create postgres-data
Database image-ku mount configure cheyyadaniki image documentation-lo specified data directory use cheyyali. Database-specific initialization, ownership and version upgrade requirements follow avvali.

8.5 Backup and Restore Principles
A basic file-level volume archive example:


bash
docker run --rm \
  -v app-data:/data:ro \
  -v "$(pwd)":/backup \
  alpine:3.22 \
  tar -czf /backup/app-data.tar.gz -C /data .
Ee command files archive create chesthundi; application-consistent database backup guarantee cheyyadu.

Production databases-ku database-native backup tools, transaction consistency, restore testing and off-host backup storage important.

8.6 Interview Questions
Q1. Volume and bind mount difference enti?

Named volume Docker-managed storage. Bind mount explicit host filesystem path-ni container-ku map chesthundi.

Q2. Container remove chesthe named volume automatic-ga delete avuthunda?

Usually kaadu. Named volumes separate-ga manage avuthayi; volume removal explicit-ga cheyyali.

Q3. Production database backup ante volume archive saripothunda?

Always kaadu. Database-consistent backup and verified restore process avasaram.

8.7 Completion Checklist
Named volumes create and inspect cheyyagalagali.
Bind mounts configure cheyyagalagali.
Container recreate chesina data persistence verify cheyyagalagali.
Backup and restore process test cheyyagalagali.
Part 9 — Docker Compose
Goal: Multi-container applications-ni YAML configuration dvara define, run, inspect and troubleshoot cheyyadam.

9.1 Docker Compose Ante Enti?
Docker Compose anedi multiple services, networks and volumes-ni oka Compose file dvara define and manage cheyyadaniki use chese tool.

Typical application:

Web frontend
API service
Database
Persistent storage
9.2 Example Project
Structure:


text
compose-lab/
├── compose.yaml
└── html/
    └── index.html
Create compose.yaml:


yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8089:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
    restart: unless-stopped
Start:


bash
docker compose up -d
Inspect:


bash
docker compose ps
docker compose logs
docker compose logs -f web
docker compose config
Test:


bash
curl http://localhost:8089
Stop:


bash
docker compose down
docker compose down containers and Compose-created network-ni remove chesthundi. Named volumes normally remain unless explicitly requested for removal.

9.3 Multi-Service Networking
Compose services-ku default network create chesthundi. Services generally service names use chesi communicate cheyyagalavu.

Example:


yaml
services:
  api:
    image: nginx:alpine
    depends_on:
      - database

  database:
    image: postgres:17
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
    volumes:
      - database-data:/var/lib/postgresql/data

volumes:
  database-data:
Security note: Ee example learning kosam maatrame. Production credentials-ni environment variables dvara pass cheyyadam valla exposure risk undavachu. Appropriate secrets management use cheyyali. Database image version and initialization requirements deployment batti validate cheyyali.

depends_on alone application database-ready ani guarantee cheyyadu. Health checks and application-level retry logic consider cheyyali.

9.4 Compose Troubleshooting

bash
docker compose config
docker compose ps
docker compose logs --tail=100
docker compose exec api sh
docker compose down
Common issues:

YAML indentation errors.
Host port conflicts.
Invalid environment variables.
Service DNS or connection errors.
Database readiness and initialization failures.
Volume permission issues.
9.5 Interview Questions
Q1. Compose enduku use chestham?

Multi-container application configuration-ni reproducible and maintainable-ga define cheyyadaniki.

Q2. docker compose up -d meaning enti?

Services-ni create/start chesi terminal background-lo free-ga unchuthundi.

Q3. depends_on database readiness guarantee chesthunda?

Basic dependency ordering alone readiness guarantee kaadu.

9.6 Completion Checklist
Compose YAML rayagalagali.
Services and volumes define cheyyagalagali.
up, down, logs, exec use cheyyagalagali.
Multi-service connectivity troubleshoot cheyyagalagali.
Part 10 — Resource Limits and Production Operations
Goal: CPU, memory, health checks, restart policies, logging and graceful shutdown manage cheyyadam.

10.1 CPU and Memory Limits

bash
docker run -d \
  --name production-lab \
  --memory=256m \
  --cpus=1.0 \
  nginx:alpine
Inspect:


bash
docker stats
docker inspect production-lab
CPU and memory limits workload characteristics batti configure cheyyali. Limits too low ayithe latency increase avvachu or process OOM termination jaragavachu.

10.2 Health Checks
Dockerfile example:


dockerfile
FROM nginx:alpine

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
Health status inspect:


bash
docker inspect \
  --format '{{.State.Health.Status}}' \
  production-lab
Health check process failure-ni detect cheyyadaniki help chesthundi. Health status unhealthy ayinanta matrana Docker automatically container restart chesthundani assume cheyyakudadhu; restart policy and orchestration behavior separate concepts.

10.3 Restart Policies

bash
docker run -d \
  --name restart-lab \
  --restart unless-stopped \
  nginx:alpine
Common policies:

no
on-failure
always
unless-stopped
Restart policy application-level correctness, database consistency or dependency availability-ku replacement kaadu.

10.4 Logging and Operations

bash
docker logs --tail=100 production-lab
docker logs -f production-lab
docker stats --no-stream
docker inspect production-lab
Production operations-lo monitor cheyyalsina metrics:

CPU usage.
Memory consumption.
Restart counts.
Exit codes.
Application latency.
Request error rates.
Disk usage.
Container health.
Log volume and retention.
10.5 Graceful Shutdown
Container stop request vachinappudu Docker configured stop signal pampisthundi. Application signal handle chesi ongoing work complete cheyyagalagali.


bash
docker stop --timeout=30 production-lab
Applications-ku graceful shutdown support implement cheyyali, especially APIs, workers and database clients.

10.6 Interview Questions
Q1. Health check and restart policy same aa?

Kaadu. Health check application/container health status evaluate chesthundi. Restart policy process exit and restart behavior-ni control chesthundi.

Q2. OOMKilled ante enti?

Memory constraints or host-level memory pressure valla process terminate ayina situation-ku indication avvachu.

Q3. Graceful shutdown enduku important?

In-flight requests, transactions and background jobs safely complete cheyyadaniki.

10.7 Completion Checklist
CPU and memory limits configure cheyyagalagali.
Health checks implement cheyyagalagali.
Restart policies explain cheyyagalagali.
Logs and metrics inspect cheyyagalagali.
Graceful shutdown behavior test cheyyagalagali.
🟣 Level 3 — Advanced Networking and Orchestration
Part 11 — Enterprise Container Platforms
Goal: Enterprise container platforms, orchestration concepts, deployment patterns and platform responsibilities understand chesukovadam.

11.1 Container Platform Architecture

mermaid
flowchart TB
    A["Developer"]
    B["CI/CD Pipeline"]
    C["Container Registry"]
    D["Container Platform"]
    E["Application Containers"]
    F["Monitoring and Logging"]

    A --> B --> C --> D --> E
    E --> F
Enterprise environment-lo platform responsibilities:

Application deployment.
Scheduling and placement.
Service discovery.
Health monitoring.
Resource management.
Access control.
Observability.
Image distribution.
Docker Engine, Docker Compose, Docker Swarm and Kubernetes different scope and operating models kaligi untayi. Anni interchangeable tools kaavu.

11.2 Orchestration Enduku?
Single host-lo manual container management simple. Multiple hosts, replicas, rolling updates and automated recovery kosam orchestration helpful.

Important concepts:

Desired state.
Scheduling.
Replicas.
Service discovery.
Health checks.
Rolling deployment.
Secret management.
Resource requests and limits.
11.3 Hands-on Exercise
Single service deployment-ni Compose-lo define cheyyi.


bash
docker compose config
docker compose up -d
docker compose ps
docker compose logs
Deployment configuration, application health and rollback requirements document cheyyi.

11.4 Interview Questions
Container runtime and orchestration platform difference enti?
Desired state ante enti?
Service discovery enduku useful?
Multi-host scheduling enduku avasaram?
11.5 Completion Checklist
Container platform components explain cheyyagalagali.
Orchestration enduku avasaram identify cheyyagalagali.
Deployment and recovery concepts compare cheyyagalagali.
Part 12 — Real-World Troubleshooting
Goal: Production incidents-ni symptoms, evidence, root cause and corrective actions dvara systematically solve cheyyadam.

12.1 Troubleshooting Framework

mermaid
flowchart TD
    A["Incident Detected"]
    B["Collect Evidence"]
    C["Identify Scope"]
    D["Test Hypotheses"]
    E["Find Root Cause"]
    F["Mitigate"]
    G["Verify Recovery"]
    H["Document Prevention"]

    A --> B --> C --> D --> E --> F --> G --> H
12.2 Container Exits Unexpectedly

bash
docker ps -a
docker logs --tail=200 <container>
docker inspect <container>
Check:

Exit code.
Application logs.
Environment configuration.
Startup command.
Resource limits.
Dependency availability.
12.3 Network Failure

bash
docker network ls
docker network inspect <network>
docker inspect <container>
Check DNS resolution, service ports, network membership, firewall and listening interfaces.

12.4 Storage Failure

bash
docker volume ls
docker volume inspect <volume>
docker inspect <container>
Check mount destination, permissions, available disk space and filesystem state.

12.5 Incident Documentation
Prati incident-ku record cheyyalsina details:

Impact and affected services.
Start and recovery times.
Detection method.
Root cause.
Mitigation.
Permanent corrective action.
Prevention and monitoring improvements.
12.6 Completion Checklist
Logs and exit codes analyze cheyyagalagali.
Networking and storage failures troubleshoot cheyyagalagali.
Root cause and symptom difference explain cheyyagalagali.
Incident report prepare cheyyagalagali.
Part 13 — Docker Swarm
Goal: Docker Swarm services, nodes, replicas, scheduling and rolling updates understand chesukovadam.

13.1 Swarm Architecture

mermaid
flowchart TB
    A["Manager Node"]
    B["Worker Node 1"]
    C["Worker Node 2"]
    D["Service Replicas"]

    A --> B
    A --> C
    B --> D
    C --> D
Swarm concepts:

Manager nodes maintain cluster state and orchestration.
Worker nodes run assigned workloads.
Services define desired application state.
Tasks represent scheduled service instances.
Overlay networks enable supported multi-host communication.
13.2 Local Lab
Warning: Swarm commands cluster state-ni change chesthayi. Learning environment-lo execute cheyyi.

Initialize:


bash
docker swarm init
Create service:


bash
docker service create \
  --name web \
  --replicas 2 \
  --publish published=8080,target=80 \
  nginx:alpine
Inspect:


bash
docker node ls
docker service ls
docker service ps web
docker service inspect web
Scale:


bash
docker service scale web=3
Remove service:


bash
docker service rm web
Leave Swarm after lab if appropriate:


bash
docker swarm leave --force
Ee command current node-ni Swarm nunchi remove chesthundi. Shared or production cluster-lo execute cheyyakudadhu.

13.3 Interview Questions
Swarm service and standalone container difference enti?
Manager and worker responsibilities enti?
Replicas enduku use chestham?
Rolling updates-ku preconditions enti?
13.4 Completion Checklist
Swarm initialize cheyyagalagali.
Replicated service deploy cheyyagalagali.
Service scale and inspect cheyyagalagali.
Cluster cleanup safely cheyyagalagali.
Part 14 — Container Packet Flow and Advanced Networking
Goal: Container-to-container traffic and published-port traffic path-ni understand chesukoni network failures debug cheyyadam.

14.1 Published Port Traffic Flow
Linux Docker host-lo common bridge networking scenario:


mermaid
flowchart LR
    A["Client"]
    B["Host Port"]
    C["Firewall / NAT Rules"]
    D["Docker Bridge"]
    E["Container Interface"]
    F["Application Port"]

    A --> B --> C --> D --> E --> F
Exact implementation nftables, iptables, Docker proxy configuration and platform behavior batti vary avvachu.

14.2 Network Inspection Commands

bash
docker network ls
docker network inspect bridge
docker inspect <container>
docker port <container>
Linux host troubleshooting-ku, permissions and tools available unte:


bash
ip addr
ip route
ss -lntp
tcpdump and firewall inspection tools use chesi packets ekkada drop avuthunnayo investigate cheyyachu.

14.3 Troubleshooting Questions
DNS resolve avuthunda?
TCP connection establish avuthunda?
Application correct port-lo listen chesthunda?
Host and container firewall rules allow chesthunnaya?
Routing and return path correct-ga unnaya?
14.4 Completion Checklist
Host-to-container packet path explain cheyyagalagali.
DNS, routing and port publishing troubleshoot cheyyagalagali.
Network inspection tools use cheyyagalagali.
Part 15 — Advanced Docker Compose
Goal: Production-oriented Compose configuration, health checks, secrets, profiles and deployment overrides design cheyyadam.

15.1 Compose Configuration

yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://127.0.0.1/"]
      interval: 30s
      timeout: 5s
      retries: 3

  debug:
    image: alpine:3.22
    command: ["sleep", "3600"]
    profiles:
      - debug
Validate:


bash
docker compose config
docker compose up -d
docker compose ps
Debug profile enable cheyyadam:


bash
docker compose --profile debug up -d
15.2 Production Considerations
Image tags and versions pin cheyyali.
Credentials-ni secure-ga manage cheyyali.
Health checks and restart behavior configure cheyyali.
Resource limits and logging policies define cheyyali.
External dependencies-ku retries and timeouts implement cheyyali.
Production orchestration requirements evaluate cheyyali.
Compose features and deployment support version batti vary avvachu. Production deployment mundu target environment capabilities validate cheyyali.

15.3 Completion Checklist
Health checks configure cheyyagalagali.
Compose profiles use cheyyagalagali.
Configuration validate cheyyagalagali.
Development and production settings separate cheyyagalagali.
🟠 Level 4 — Enterprise Production Engineering
Part 16 — Container Security
Goal: Container attack surface reduce cheyyadam, supply-chain risks manage cheyyadam and secure deployment practices implement cheyyadam.

16.1 Security Layers

mermaid
flowchart TB
    A["Source Code Security"]
    B["Dependency Scanning"]
    C["Trusted Base Images"]
    D["Secure Image Build"]
    E["Image Signing and Provenance"]
    F["Runtime Isolation"]
    G["Monitoring and Incident Response"]

    A --> B --> C --> D --> E --> F --> G
16.2 Security Checklist
Run as non-root where practical.
Avoid unnecessary capabilities.
Avoid --privileged unless justified.
Keep base images patched.
Scan images for vulnerabilities.
Protect build secrets.
Restrict Docker daemon access.
Use trusted registries.
Verify image signatures and provenance where supported.
Apply least-privilege access controls.
16.3 Image Scanning
Docker Scout available ayithe:


bash
docker scout quickview myapp:latest
docker scout cves myapp:latest
Availability and output account, version and service configuration batti vary avvachu. Alternative scanners kuda use cheyyachu.

16.4 Interview Questions
Docker socket access enduku sensitive?
Non-root execution enduku important?
Image vulnerability scan limitations enti?
Image digest and tag difference enti?
Supply-chain security ante enti?
16.5 Completion Checklist
Container hardening principles explain cheyyagalagali.
Image scanning workflow implement cheyyagalagali.
Secrets exposure risks identify cheyyagalagali.
Least privilege and supply-chain controls explain cheyyagalagali.
Part 17 — BuildKit and Advanced Image Builds
Goal: Efficient builds, multi-stage compilation, build secrets, cache management and reproducible image creation implement cheyyadam.

17.1 BuildKit Overview
BuildKit Docker image building-ku advanced capabilities provide chesthundi, including improved caching, parallel build execution and build-secret mounts.

17.2 Build Secrets
Example Dockerfile:


dockerfile
# syntax=docker/dockerfile:1

FROM alpine:3.22

RUN --mount=type=secret,id=api_token \
    test -s /run/secrets/api_token
Build command:


bash
docker build \
  --secret id=api_token,src=./api_token.txt \
  -t secure-build-demo .
Ee example secret file existence verify chesthundi. Real application-lo secret-ni required operation kosam use cheyyali; image layer-lo copy cheyyakudadhu.

Important: Demo secret file-ni Git repository-lo commit cheyyakudadhu.

17.3 Build Cache

bash
docker build --progress=plain -t myapp:v1 .
docker build --no-cache -t myapp:test .
--no-cache build instruction cache reuse-ni disable chesthundi; all external downloads or package registries necessarily bypass avuthayani guarantee kaadu.

17.4 Completion Checklist
Multi-stage builds create cheyyagalagali.
Build cache behavior understand chesukovali.
BuildKit secrets use cheyyagalagali.
Reproducibility and dependency pinning explain cheyyagalagali.
Part 18 — Registries, Image Distribution and Supply Chain
Goal: Images tag, push, pull, scan and verify cheyyadam; registry authentication and artifact integrity manage cheyyadam.

18.1 Image Tagging

bash
docker tag docker-lab:v1 myregistry.example.com/team/docker-lab:v1
Registry login:


bash
docker login myregistry.example.com
Push:


bash
docker push myregistry.example.com/team/docker-lab:v1
Pull:


bash
docker pull myregistry.example.com/team/docker-lab:v1
myregistry.example.com placeholder. Actual organization registry hostname use cheyyali.

18.2 Image Digest
Tags generally mutable references. Digest image content-ni identify cheyyadaniki use avuthundi.


bash
docker image inspect myregistry.example.com/team/docker-lab:v1
Production deployment-lo approved digest pinning consider cheyyali.

18.3 Supply-Chain Controls
Registry authentication.
Access control and repository permissions.
Image vulnerability scanning.
Signed image verification.
Provenance and SBOM generation where supported.
Immutable release references.
Image retention and cleanup policies.
18.4 Completion Checklist
Image tag and push cheyyagalagali.
Registry authentication configure cheyyagalagali.
Tag and digest difference explain cheyyagalagali.
Registry security controls identify cheyyagalagali.
Part 19 — Docker Desktop, WSL2 and Development Environments
Goal: Local Docker development environments, Linux containers on Windows, filesystem integration and networking differences understand chesukovadam.

19.1 Architecture
Windows environment-lo Docker Desktop Linux containers run cheyyadaniki managed Linux environment, commonly WSL2 backend, use cheyyagaladu depending on configuration.


mermaid
flowchart TB
    A["Windows Host"]
    B["Docker Desktop"]
    C["WSL2 / Linux Environment"]
    D["Docker Engine"]
    E["Linux Containers"]

    A --> B --> C --> D --> E
Exact architecture Docker Desktop version, selected backend and settings batti vary avuthundi.

19.2 Useful Commands

bash
docker version
docker context ls
docker info
docker ps
Windows PowerShell-lo:


powershell
wsl --status
wsl --list --verbose
19.3 Common Issues
Docker Desktop Engine unavailable.
WSL2 integration disabled.
Filesystem performance issues.
Port conflicts.
Memory and CPU resource limits.
Line-ending differences.
Bind mount permission or path issues.
19.4 Completion Checklist
Docker Desktop architecture explain cheyyagalagali.
Docker context inspect cheyyagalagali.
WSL2 environment troubleshoot cheyyagalagali.
Host/container filesystem differences understand chesukovali.
Part 20 — GPU Workloads, Observability and Performance
Goal: Container performance measure cheyyadam, logs and metrics collect cheyyadam, supported environments-lo GPU workloads configure cheyyadam.

20.1 Observability Fundamentals
Three important pillars:

Metrics: CPU, memory, latency and error rates.
Logs: Application and system events.
Traces: Request flow across distributed services.
20.2 Basic Performance Commands

bash
docker stats
docker stats --no-stream
docker top <container>
docker inspect <container>
docker logs --tail=100 <container>
20.3 Performance Investigation
Baseline metrics collect cheyyi.
CPU and memory consumption measure cheyyi.
Application latency and error rates inspect cheyyi.
Logs and traces correlate cheyyi.
One change at a time test cheyyi.
Before-and-after results compare cheyyi.
20.4 GPU Workloads
GPU containers-ku compatible host drivers, GPU runtime integration and suitable container images avasaram avvachu.

NVIDIA environments-lo supported configuration unte:


bash
docker run --rm --gpus all nvidia/cuda:<supported-tag> nvidia-smi
<supported-tag> ni compatible CUDA image tag-to replace cheyyali. GPU availability, drivers, Docker configuration and image compatibility verify cheyyakunda command work avuthundani assume cheyyakudadhu.

20.5 Completion Checklist
CPU and memory bottlenecks investigate cheyyagalagali.
Logs and metrics analyze cheyyagalagali.
Performance baseline establish cheyyagalagali.
GPU container prerequisites explain cheyyagalagali.
🔴 Level 5 — Senior and Platform Engineering
Part 21 — CI/CD and Container Delivery
Goal: Automated image builds, testing, scanning and controlled deployments design cheyyadam.

21.1 CI/CD Pipeline

mermaid
flowchart LR
    A["Git Commit"]
    B["Automated Tests"]
    C["Build Image"]
    D["Security Scan"]
    E["Publish Image"]
    F["Deploy"]
    G["Verify"]

    A --> B --> C --> D --> E --> F --> G
21.2 Pipeline Requirements
Reproducible builds.
Automated tests.
Dependency and image scanning.
Secret management.
Image tagging and digest tracking.
Registry access controls.
Deployment approvals where required.
Rollback strategy.
Post-deployment verification.
21.3 Example Build Commands

bash
docker build -t myapp:test .
docker run --rm myapp:test
docker image inspect myapp:test
Actual application-ku suitable test command and test dependencies configure cheyyali.

21.4 Completion Checklist
Build and test stages define cheyyagalagali.
Image scanning integrate cheyyagalagali.
Registry publishing automate cheyyagalagali.
Deployment verification and rollback plan design cheyyagalagali.
Part 22 — Disaster Recovery and Reliability Engineering
Goal: Containerized applications-ku backups, recovery procedures, failure testing and recovery objectives define cheyyadam.

22.1 Key Concepts
RPO: Maximum acceptable data-loss window.
RTO: Target recovery time.
Backup: Data or configuration recovery kosam stored copy.
Restore test: Backup nunchi usable state recover avuthundo verify cheyyadam.
Failover: Alternate system or instance-ku service move cheyyadam.
22.2 Recovery Planning
Prati service-ku identify cheyyalsinavi:

Persistent data locations.
Backup frequency.
Backup retention.
Restore procedure.
Secrets and configuration recovery.
Image and artifact availability.
Dependency recovery order.
RPO and RTO targets.
22.3 Practical Lab
Named volume create cheyyi.
Test data write cheyyi.
Backup archive create cheyyi.
Original test volume remove cheyyi.
New volume create cheyyi.
Backup restore cheyyi.
Restored content verify cheyyi.
Database workloads-ku database-native consistency-aware backups use cheyyali.

22.4 Completion Checklist
RPO and RTO difference explain cheyyagalagali.
Backup and restore procedure document cheyyagalagali.
Recovery drill perform cheyyagalagali.
Data integrity verify cheyyagalagali.
Part 23 — Platform Architecture and Engineering
Goal: Organization-wide container platform design, standardization, security boundaries and developer workflows plan cheyyadam.

23.1 Platform Architecture

mermaid
flowchart TB
    A["Developer Portal"]
    B["Source Control"]
    C["CI/CD"]
    D["Image Registry"]
    E["Container Runtime / Orchestrator"]
    F["Secrets and Identity"]
    G["Metrics, Logs and Traces"]
    H["Policy and Security"]

    A --> B --> C --> D --> E
    F --> E
    E --> G
    H --> C
    H --> E
23.2 Architecture Decisions
Docker Compose vs orchestration platform.
Single host vs multi-host deployment.
Registry and artifact management.
Identity and access control.
Secrets management.
Network segmentation.
Observability stack.
Backup and disaster recovery.
Deployment strategy.
Cost and capacity planning.
23.3 Senior Engineer Responsibilities
Senior engineer responsibilities commands execute cheyyadam varake limited kaavu.

Trade-offs explain cheyyali.
Failure scenarios anticipate cheyyali.
Security boundaries define cheyyali.
Operational ownership establish cheyyali.
Automation and developer experience improve cheyyali.
Incident learnings-ni platform improvements-ga convert cheyyali.
23.4 Completion Checklist
Platform architecture diagram create cheyyagalagali.
Technology choices justify cheyyagalagali.
Security and observability requirements define cheyyagalagali.
Operational ownership and recovery responsibilities document cheyyagalagali.
Part 24 — Senior Docker Interview Preparation
Goal: Container internals, networking, storage, security, CI/CD and production troubleshooting scenarios-ku structured answers prepare cheyyadam.

24.1 Core Questions
Container and VM architectural difference enti?
Docker image layers and writable layer ela work avuthayi?
Docker CLI and Engine madhya communication ela jaruguthundi?
Linux namespaces and cgroups roles enti?
Container DNS resolution fail ayithe ela debug chesthav?
Container memory OOM ayithe investigation ela start chesthav?
Multi-stage build enduku use chesthav?
CMD and ENTRYPOINT difference enti?
Volumes and bind mounts eppudu use chesthav?
depends_on and application readiness difference enti?
Container image-ni secure-ga ela build chesthav?
Docker daemon socket access enduku sensitive?
Image tag and digest difference enti?
Container restart loop-ni ela troubleshoot chesthav?
Graceful shutdown and signal handling enduku important?
24.2 Scenario-Based Questions
Scenario 1: Application container running, kaani request fail avuthundi.

Investigate:


bash
docker ps
docker logs <container>
docker inspect <container>
docker port <container>
Then application listener, network configuration, DNS, host firewall and dependency connectivity verify cheyyi.

Scenario 2: Container memory usage gradually increase avuthundi.

Metrics trend inspect cheyyi.
Application memory profile collect cheyyi.
Memory limits and OOM events review cheyyi.
Leak or workload change identify cheyyi.
Fix tarvatha sustained load test perform cheyyi.
Scenario 3: Production image contains credentials.

Exposure scope identify cheyyi.
Affected credentials revoke or rotate cheyyi.
Image and build history investigate cheyyi.
Secrets handling fix cheyyi.
Clean image rebuild and redeploy cheyyi.
Incident reporting requirements follow avvali.
24.3 Interview Answer Framework
Production scenario answer cheppinappudu ee order follow avvu:

Symptoms and impact.
Initial evidence.
Hypotheses.
Isolation and verification.
Root cause.
Mitigation.
Permanent fix.
Prevention and monitoring.
24.4 Completion Checklist
Container internals explain cheyyagalagali.
Networking and storage scenarios solve cheyyagalagali.
Security trade-offs explain cheyyagalagali.
Root cause analysis structured-ga present cheyyagalagali.
Part 25 — End-to-End Capstone Projects
Goal: Multiple Docker concepts combine chesi practical application deploy, secure, monitor and troubleshoot cheyyadam.

Project 1 — Containerized Web Application
Requirements:

Custom Dockerfile.
Optimized image layers.
Non-root execution where practical.
Published application port.
.dockerignore.
Health check.
Logs and troubleshooting documentation.
Deliverables:


text
project-1/
├── Dockerfile
├── .dockerignore
├── src/
└── README.md
Project 2 — Multi-Container Application
Build:

API service.
Database.
Persistent volume.
Internal service network.
Compose configuration.
Health checks.
Environment-specific settings.
Deliverables:


text
project-2/
├── compose.yaml
├── api/
├── database/
├── .env.example
└── README.md
Secrets-ni .env.example lo placeholders-ga document cheyyi. Real credentials-ni repository-lo commit cheyyakudadhu.

Project 3 — Secure Image Delivery Pipeline
Implement:

Automated image build.
Unit and integration tests.
Vulnerability scanning.
Registry push.
Digest tracking.
Deployment verification.
Rollback procedure.
Deliverables:


text
project-3/
├── Dockerfile
├── compose.yaml
├── tests/
├── ci/
└── README.md
Project 4 — Production Incident Simulation
Simulate:

Wrong application port.
Missing environment variable.
DNS failure.
Volume permission error.
Memory limit issue.
Invalid image configuration.
Prati scenario-ku evidence, root cause, fix and prevention document cheyyi.

Project 5 — Platform Engineering Design
Design a container platform for multiple teams.

Include:

Architecture diagram.
Image build and registry strategy.
Identity and access control.
Secrets management.
Deployment strategy.
Observability.
Backup and recovery.
Capacity and cost considerations.
Operational runbooks.
Capstone Completion Criteria
Application successfully build and deploy avvali.
Persistent data behavior verify cheyyali.
Security controls document cheyyali.
Logs and health checks implement cheyyali.
Failure scenarios troubleshoot cheyyali.
Recovery procedure test cheyyali.
Architecture decisions explain cheyyali.
🎯 Final Assessment
Practical Examination

Domain	Assessment
Linux internals	Namespaces, cgroups and process isolation
Docker fundamentals	CLI, Engine, lifecycle and images
Image engineering	Dockerfiles, caching and multi-stage builds
Networking	DNS, bridge networking and published ports
Storage	Volumes, bind mounts, backup and restore
Compose	Multi-service deployment and troubleshooting
Security	Non-root, capabilities, secrets and image scanning
Operations	Health checks, logging, resource limits and recovery
Automation	CI/CD, registries and release verification
Architecture	Platform design and production trade-offs
Suggested Scoring
90–100%: Strong practical understanding; validate production experience with real projects.
75–89%: Good foundation; revisit weaker domains and repeat hands-on labs.
50–74%: More troubleshooting and implementation practice required.
Below 50%: Revisit foundations and complete the labs independently.
Ee scores learning progress kosam maatrame; professional competency-ku actual practical evidence important.

✅ Completion Checklist
Level 1 — Foundations
Part 1 — Container Fundamentals
Part 2 — Docker Architecture
Part 3 — Docker CLI and Core Concepts
Part 4 — Container Lifecycle and Inspection
Part 5 — Dockerfiles and Image Layers
Level 2 — Application Engineering
Part 6 — Linux Internals
Part 7 — Docker Networking
Part 8 — Persistent Storage
Part 9 — Docker Compose
Part 10 — Resource Limits and Operations
Level 3 — Advanced Networking and Orchestration
Part 11 — Enterprise Container Platforms
Part 12 — Real-World Troubleshooting
Part 13 — Docker Swarm
Part 14 — Packet Flow and Advanced Networking
Part 15 — Advanced Docker Compose
Level 4 — Enterprise Production Engineering
Part 16 — Container Security
Part 17 — BuildKit
Part 18 — Registries and Supply Chain
Part 19 — Docker Desktop and WSL2
Part 20 — GPU, Observability and Performance
Level 5 — Senior and Platform Engineering
Part 21 — CI/CD
Part 22 — Disaster Recovery
Part 23 — Platform Architecture
Part 24 — Senior Interviews
Part 25 — Capstone Projects
🏁 Final Mission
Docker mastery ante commands execute cheyyadam maatrame kaadu.

Application process Linux kernel-lo ela isolate avuthundi, image layers ela build avuthayi, network traffic ela flow avuthundi, persistent data ela protect cheyyali, production incidents ela investigate cheyyali, secure and reliable container platform ela design cheyyali ane concepts practical-ga demonstrate cheyyagalagali.

Learning principle:

Learn the concept → Build it → Break it → Debug it → Secure it → Document it → Automate it.
