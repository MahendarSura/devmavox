import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Docker Installation",
  description: "Detailed Docker installation notes, practical steps, commands, root causes and solutions.",
  sections: [
    {
      heading: "03. Docker Installation and Host Preparation",
      explanation: `
Docker installation depends on the operating system.

Linux:
Docker Engine normally runs as a system service.

Windows:
Docker Desktop commonly uses WSL2 or a supported virtualization backend for Linux containers.

macOS:
Docker Desktop provides a managed Linux environment for Linux containers.

IMPORTANT INSTALLATION CHECKS:

1. Docker CLI installed.
2. Docker daemon installed or available.
3. Docker daemon running.
4. CLI can communicate with the daemon.
5. Docker can access registries.
6. Host has sufficient CPU, memory and disk space.

Do not assume that installing the Docker CLI means the Docker Engine is running.

On Linux, systemctl and journalctl are useful for service troubleshooting.

On Docker Desktop, check the Desktop engine status, diagnostics, WSL integration and selected container mode.

Use official installation instructions for the operating system and Docker release. Installation requirements can change between releases.
      `,
      steps: [
        "Install Docker using the supported instructions for the operating system.",
        "Check the CLI version.",
        "Check client-to-daemon communication.",
        "Check Docker Engine information.",
        "Run a test container.",
        "If image pulling fails, investigate DNS, proxy, firewall and registry access."
      ],
      commands: `
docker --version
docker version
docker info

docker run --rm hello-world

# Linux service checks
sudo systemctl status docker
sudo systemctl start docker
sudo journalctl -u docker -n 100
      `,
      problems: [
        {
          issue: "Docker Desktop engine does not start.",
          rootCause:
            "Virtualization, WSL2 integration, backend configuration or Docker Desktop startup may have failed.",
          solution:
            "Check Docker Desktop diagnostics, virtualization support, WSL2 status and engine configuration. Restart the Desktop engine after identifying the issue."
        },
        {
          issue: "Docker CLI is installed but commands cannot connect.",
          rootCause:
            "The CLI exists, but the daemon may not be running or the selected context may be incorrect.",
          solution:
            "Check docker context show and daemon status. Start the correct engine and verify connectivity with docker info."
        }
      ]
    }
  ]
};


data.sections.push({
  heading: "02. Docker Desktop Installation on Windows Using WSL2",

  explanation: `
Docker Desktop is the recommended way to run Docker containers on Windows for most development environments. For Linux containers, Docker Desktop commonly uses the Windows Subsystem for Linux version 2 (WSL2) backend.

WSL2 provides a real Linux kernel running in a lightweight managed virtual machine. Docker Desktop integrates its Docker Engine with this Linux environment. The Windows Docker CLI communicates with the Docker Engine through the configured Docker context and integration.

Important components:
- Windows operating system: Hosts Docker Desktop and the command-line tools.
- WSL2: Provides the Linux kernel environment required for Linux containers.
- Docker Desktop: Manages the Docker Engine and its integration.
- Docker Engine: Builds images and manages containers, networks and volumes.
- Docker CLI: Allows engineers to execute Docker commands from PowerShell or a terminal.

Docker Desktop is not the same as installing Docker Engine directly as a native Windows service. Linux containers run using the Linux environment provided by the backend.
`,

  steps: [
    "Check that the Windows version supports the required WSL2 and virtualization features.",
    "Open PowerShell as Administrator for the initial WSL installation.",
    "Run wsl --status to inspect the current WSL configuration.",
    "Install or update WSL using wsl --install or wsl --update when required.",
    "Restart Windows if the installation requests a restart.",
    "Verify that virtualization is enabled in the system firmware and Windows features.",
    "Install Docker Desktop using the official installer or an approved package-management method.",
    "During setup, select the WSL2 backend when that option is available.",
    "Start Docker Desktop and wait until the engine reports that it is running.",
    "Open Docker Desktop Settings and verify that the WSL2 engine is enabled.",
    "Enable WSL integration for the Linux distribution that you intend to use.",
    "Open a new PowerShell terminal and verify Docker CLI connectivity.",
    "Run the hello-world container to verify that the engine can download and start an image.",
    "Check Docker Desktop resources and allocate suitable CPU, memory and disk capacity for development workloads."
  ],

  commands: `
# Check Windows version
winver

# Check WSL status
wsl --status

# List installed Linux distributions
wsl --list --verbose

# Install WSL when it is not installed
wsl --install

# Update WSL
wsl --update

# Set WSL2 as the default version
wsl --set-default-version 2

# Check virtualization and WSL configuration
systeminfo

# Install Docker Desktop using winget, if available
winget install -e --id Docker.DockerDesktop

# Verify Docker CLI
docker --version
docker version
docker info

# Test the Docker Engine
docker run --rm hello-world

# List Docker contexts
docker context ls

# Check the current context
docker context show

# Shut down WSL distributions when required
wsl --shutdown
  `,

  config: `
Installation architecture:

Windows 11 / supported Windows environment
        |
        v
Docker Desktop
        |
        v
WSL2 Linux kernel environment
        |
        v
Docker Engine
        |
        +---- Docker CLI
        +---- Images
        +---- Containers
        +---- Networks
        +---- Volumes

Important configuration notes:

1. Docker Desktop Settings:
   Open Settings and verify the WSL2-based engine option.

2. WSL Integration:
   Enable integration for the Linux distribution that you want to use.

3. Resource Allocation:
   Allocate sufficient CPU, memory and disk resources according to your workload.

4. Docker Context:
   Use docker context show to identify the active Docker endpoint.

5. Windows Containers:
   Windows containers use a different runtime model. The Linux-container WSL2 workflow described here is not the same as Windows-container mode.

6. Installation:
   Use the official Docker Desktop documentation and installer for the supported Windows version. Review the current licensing terms and system requirements before installing Docker Desktop.
  `,

  problems: [
    {
      issue: "WSL2 is not installed or the WSL command is unavailable.",
      rootCause:
        "The Windows Subsystem for Linux feature may not be installed, or the Windows version may not support the required WSL configuration.",
      solution:
        "Check the Windows version and run wsl --install from an elevated PowerShell terminal. Restart Windows if requested. Then verify the installation with wsl --status and wsl --list --verbose."
    },
    {
      issue: "Docker Desktop reports that virtualization is disabled.",
      rootCause:
        "Hardware virtualization may be disabled in BIOS or UEFI, or the required Windows virtualization components may not be enabled.",
      solution:
        "Check virtualization status in Task Manager under CPU performance. Enable virtualization in BIOS or UEFI when supported. Verify the required Windows virtualization features and restart the system."
    },
    {
      issue: "Docker Desktop starts but the Docker Engine is unavailable.",
      rootCause:
        "The WSL2 backend may not be ready, Docker Desktop may still be starting, or its engine configuration may have failed.",
      solution:
        "Check Docker Desktop status and diagnostics. Run wsl --status and wsl --list --verbose. Update WSL if necessary, restart Docker Desktop and verify the active Docker context."
    },
    {
      issue: "Docker CLI cannot connect to the Docker daemon.",
      rootCause:
        "The Docker CLI may be installed while Docker Desktop is stopped, still starting or using an unexpected Docker context.",
      solution:
        "Wait for Docker Desktop to report that the engine is running. Run docker context ls and docker context show. Select the intended context and verify connectivity using docker info."
    },
    {
      issue: "Linux distribution is not visible in Docker Desktop WSL integration.",
      rootCause:
        "The distribution may not be installed, may be using WSL1, or its integration option may be disabled.",
      solution:
        "Run wsl --list --verbose and verify that the distribution uses version 2. Convert it using wsl --set-version DISTRO_NAME 2 when supported. Enable its integration in Docker Desktop settings."
    },
    {
      issue: "Docker image downloads fail after installation.",
      rootCause:
        "DNS resolution, proxy configuration, firewall restrictions or registry connectivity may be preventing image downloads.",
      solution:
        "Check network connectivity, DNS and proxy settings. Verify registry access and Docker Desktop network configuration. Retry the image pull after correcting the network issue."
    },
    {
      issue: "Docker Desktop is slow or containers run out of memory.",
      rootCause:
        "The WSL2 environment or Docker Desktop may not have enough CPU, memory or disk resources for the workload.",
      solution:
        "Inspect Docker Desktop resource settings and current workload usage. Adjust resource allocation according to available host capacity. Remove unused images and containers using safe Docker cleanup commands."
    }
  ]
});


data.sections.push({
  heading: "03. Docker Engine Installation on Ubuntu Linux",

  explanation: `
Docker Engine is the container runtime platform commonly used on Ubuntu servers. In production environments, engineers usually install Docker Engine from the official Docker APT repository instead of relying on an outdated distribution package.

Docker Engine installation includes multiple components:

- docker-ce: Docker Engine community edition.
- docker-ce-cli: Docker command-line client.
- containerd.io: Container lifecycle management runtime.
- docker-buildx-plugin: Extended image building capabilities.
- docker-compose-plugin: Docker Compose plugin.

The installation process configures the Docker package repository, installs the required packages and starts the Docker service.

The Docker daemon normally runs as a system service named docker. Engineers use systemctl to start, stop, restart and inspect this service.

Important: These instructions are for supported Ubuntu releases using APT. Always check the current Docker documentation for supported Ubuntu versions and repository instructions before production installation.
`,

  steps: [
    "Connect to the Ubuntu server using SSH or open its terminal.",
    "Verify the Ubuntu release using lsb_release -a or cat /etc/os-release.",
    "Update the APT package index.",
    "Install prerequisite packages such as ca-certificates and curl.",
    "Create the directory /etc/apt/keyrings if it does not exist.",
    "Download the official Docker GPG key into the APT keyring directory.",
    "Set appropriate read permissions on the Docker GPG key.",
    "Add the official Docker APT repository using the Ubuntu release codename and system architecture.",
    "Update the APT package index so Ubuntu can read the Docker repository metadata.",
    "Install Docker Engine, Docker CLI, containerd, Buildx and the Compose plugin.",
    "Start the Docker service using systemctl.",
    "Enable the Docker service so it starts automatically after a server reboot.",
    "Check the service status and inspect Docker Engine information.",
    "Run the hello-world image to verify image download and container execution.",
    "Review user permissions before allowing non-root users to access the Docker socket.",
    "Document the installed Docker version and repository configuration."
  ],

  commands: `
# Step 1: Check Ubuntu version
cat /etc/os-release
lsb_release -a

# Step 2: Check system architecture
dpkg --print-architecture

# Step 3: Update package index
sudo apt-get update

# Step 4: Install prerequisites
sudo apt-get install -y ca-certificates curl

# Step 5: Create APT keyring directory
sudo install -m 0755 -d /etc/apt/keyrings

# Step 6: Download official Docker GPG key
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc

# Step 7: Set key permissions
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Step 8: Add official Docker repository
sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "\${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

# Step 9: Refresh package index
sudo apt-get update

# Step 10: Install Docker Engine and plugins
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Step 11: Start Docker service
sudo systemctl start docker

# Step 12: Enable Docker at system startup
sudo systemctl enable docker

# Step 13: Check service status
sudo systemctl status docker

# Step 14: Verify versions
docker --version
sudo docker version
sudo docker info

# Step 15: Test container execution
sudo docker run --rm hello-world

# Step 16: Check installed packages
dpkg -l | grep -E 'docker|containerd'

# Step 17: Inspect recent Docker service logs
sudo journalctl -u docker -n 100 --no-pager
  `,

  config: `
Official Docker APT repository configuration:

File:
 /etc/apt/sources.list.d/docker.sources

Example:
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: Ubuntu release codename
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc

Docker service:
 systemctl status docker
 systemctl enable docker
 systemctl restart docker

Important production notes:

1. Use the official Docker repository and verify package authenticity through its signing key.
2. Install only packages required by the server workload.
3. Keep Docker Engine and container runtime packages updated through a controlled patching process.
4. Test upgrades in a non-production environment before applying them to critical servers.
5. Configure firewall rules carefully. Do not expose the Docker daemon TCP API publicly without strong authentication and authorization controls.
6. Docker group membership grants powerful host-level privileges. Do not add users to this group without reviewing the security impact.
7. Monitor disk usage, image storage, container logs and Docker service health.
8. Maintain a documented rollback and recovery plan for important production servers.
`,

  problems: [
    {
      issue: "Unable to locate package docker-ce.",
      rootCause:
        "The official Docker repository may not have been configured correctly, or the APT package index may not have been refreshed after adding the repository.",
      solution:
        "Check /etc/apt/sources.list.d/docker.sources, verify the Ubuntu codename and architecture, confirm the repository URL and signing key, then run sudo apt-get update again. Check the official Docker documentation for supported Ubuntu releases."
    },
    {
      issue: "Docker repository signature or GPG key verification fails.",
      rootCause:
        "The signing key may be missing, stored in the wrong location, unreadable or incorrectly referenced by the repository configuration.",
      solution:
        "Download the official Docker GPG key again into /etc/apt/keyrings/docker.asc, set readable permissions and verify that Signed-By points to the correct file. Do not bypass package signature verification."
    },
    {
      issue: "Docker service fails to start.",
      rootCause:
        "The daemon configuration may be invalid, required storage may be unavailable, containerd may have failed, or the host may have insufficient resources.",
      solution:
        "Run sudo systemctl status docker and sudo journalctl -u docker -n 100 --no-pager. Inspect containerd status and daemon configuration. Correct the actual error before restarting Docker."
    },
    {
      issue: "Got permission denied while trying to connect to the Docker daemon socket.",
      rootCause:
        "The current user may not have permission to access /var/run/docker.sock.",
      solution:
        "Use sudo docker commands when appropriate. If non-root Docker access is required, review the security implications before adding the user to the docker group. Log out and back in after an approved group change. Remember that docker group access effectively grants root-level control of the host."
    },
    {
      issue: "Docker cannot pull hello-world or another image.",
      rootCause:
        "The server may have DNS resolution problems, outbound network restrictions, proxy misconfiguration or registry connectivity issues.",
      solution:
        "Check DNS resolution, outbound HTTPS access, proxy settings and firewall rules. Review Docker daemon logs and retry after correcting connectivity. Verify access to the image registry."
    },
    {
      issue: "Docker Engine works but Compose command is unavailable.",
      rootCause:
        "The Docker Compose plugin may not have been installed, or the engineer may be using the legacy docker-compose command.",
      solution:
        "Install docker-compose-plugin from the official Docker repository and verify with docker compose version. The modern command uses a space: docker compose."
    },
    {
      issue: "Docker service does not start automatically after reboot.",
      rootCause:
        "The Docker service may not be enabled in systemd, or the server may have a startup dependency failure.",
      solution:
        "Run sudo systemctl enable docker and verify with systemctl is-enabled docker. Inspect boot-time service logs if Docker still fails after reboot."
    },
    {
      issue: "Docker installation consumes unexpected disk space.",
      rootCause:
        "Downloaded images, stopped containers, build cache and container logs can accumulate over time.",
      solution:
        "Inspect usage with docker system df and inspect host disk usage. Define an approved image-retention and log-rotation policy. Do not delete Docker's internal storage directories manually."
    }
  ]
});


data.sections.push(
{
  heading: "04. Docker Service Management Using systemd",
  explanation: `
On Ubuntu Linux, Docker Engine normally runs as a background service managed by systemd. The Docker daemon process is dockerd. It receives Docker API requests and manages containers, images, networks and volumes. Engineers use systemctl to control the service and journalctl to investigate service failures.

Starting Docker manually does not necessarily enable it at system boot. Production servers should have a documented startup policy. The Docker service and container restart policies are related but different: enabling Docker starts the daemon during boot, while container restart policies determine how individual containers behave when the daemon or container process stops.
`,
  steps: [
    "Check whether the Docker service is installed and recognized by systemd.",
    "Inspect the current service state before making changes.",
    "Start Docker when the service is stopped.",
    "Enable Docker at boot when the server requires automatic startup.",
    "Inspect service logs when startup fails.",
    "Check container restart policies separately from Docker service startup.",
    "After a planned configuration change, validate the daemon before returning workloads to service."
  ],
  commands: `
sudo systemctl status docker
sudo systemctl start docker
sudo systemctl stop docker
sudo systemctl restart docker
sudo systemctl enable docker
sudo systemctl disable docker
sudo systemctl is-enabled docker
sudo systemctl is-active docker
sudo systemctl daemon-reload
sudo journalctl -u docker -n 100 --no-pager
sudo journalctl -u docker -f
sudo systemctl status containerd
`,
  config: `
Useful systemd operations:

systemctl start docker:
Starts the Docker daemon.

systemctl enable docker:
Configures Docker to start during system boot.

systemctl restart docker:
Stops and starts the Docker service. This may affect running workloads depending on daemon configuration.

journalctl -u docker:
Displays Docker daemon logs.

Production practice:
Before restarting Docker on a production server, check running workloads, restart policies, maintenance windows and monitoring alerts. Do not restart a critical daemon merely because a command failed.
`,
  problems: [
    {
      issue: "Docker service is inactive.",
      rootCause: "The daemon may not have started, may have stopped after an error, or may not be enabled at boot.",
      solution: "Inspect systemctl status docker and journalctl -u docker. Correct the underlying error, start the service and enable it at boot if required."
    },
    {
      issue: "Docker service fails after reboot.",
      rootCause: "The service may not be enabled or may fail because of a dependency, storage or daemon configuration problem.",
      solution: "Check systemctl is-enabled docker and inspect boot-time journal logs. Correct dependency or configuration errors and test another controlled reboot."
    },
    {
      issue: "Restarting Docker affects running applications.",
      rootCause: "Daemon restart behavior and container live-restore settings may affect workload availability.",
      solution: "Plan a maintenance window, review live-restore behavior and container restart policies, and validate application availability after the restart."
    }
  ]
},
{
  heading: "05. Docker Daemon Configuration Using daemon.json",
  explanation: `
The Docker daemon uses configuration settings to control logging, storage, networking, registry access and other engine behavior. On a typical Linux installation, the main configuration file is /etc/docker/daemon.json.

A configuration change can affect every container managed by that daemon. Invalid JSON or unsupported options may prevent Docker from starting. Engineers should back up the current file, validate the proposed configuration and plan a controlled restart.

Do not copy configuration values blindly from another server. Select settings based on the installed Docker version, operating system, workload and security requirements.
`,
  steps: [
    "Inspect the existing daemon configuration before changing it.",
    "Back up the current daemon.json file if it exists.",
    "Identify the required setting and confirm that the installed Docker version supports it.",
    "Edit JSON carefully, including commas, quotation marks and valid data types.",
    "Validate JSON syntax before restarting the daemon.",
    "Restart Docker during an approved maintenance window.",
    "Check service status and daemon logs.",
    "Verify that the intended configuration is active.",
    "Monitor containers, logs and network behavior after the change."
  ],
  commands: `
sudo test -f /etc/docker/daemon.json && sudo cat /etc/docker/daemon.json
sudo cp /etc/docker/daemon.json /etc/docker/daemon.json.backup
sudo dockerd --validate --config-file=/etc/docker/daemon.json
sudo systemctl restart docker
sudo systemctl status docker
docker info
sudo journalctl -u docker -n 100 --no-pager
`,
  config: `
Illustrative daemon.json:

{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "5"
  },
  "live-restore": true
}

Explanation:

log-driver:
Selects the default logging driver for newly created containers.

log-opts:
Sets log rotation options for the json-file driver.

live-restore:
Can help keep eligible containers running during certain daemon downtime scenarios. It does not guarantee application availability or replace a high-availability design.

Important:
Existing containers may retain logging settings from their creation. Review Docker documentation before assuming a daemon default change modifies existing containers.
`,
  problems: [
    {
      issue: "Docker daemon fails after editing daemon.json.",
      rootCause: "The file may contain invalid JSON, unsupported options or conflicting settings.",
      solution: "Inspect journalctl logs, validate JSON, restore the backup if needed and restart Docker after correcting the configuration."
    },
    {
      issue: "Log rotation settings do not affect existing containers.",
      rootCause: "Logging driver options are generally applied when containers are created.",
      solution: "Inspect each container's logging configuration and recreate workloads through a controlled deployment process when necessary."
    },
    {
      issue: "A configuration change causes unexpected networking behavior.",
      rootCause: "Daemon-level network settings can affect Docker-managed networks and address allocation.",
      solution: "Review the exact changed settings, inspect docker network ls and daemon logs, then restore the known-good configuration if required."
    }
  ]
},
{
  heading: "06. Docker Users, Groups and Socket Permissions",
  explanation: `
The Docker CLI communicates with the Docker daemon through a Unix socket on a typical Linux installation. The socket is commonly located at /var/run/docker.sock.

By default, access is restricted. An engineer may use sudo to execute Docker commands. Adding a user to the docker group provides access to the Docker socket, but this is a major security decision: control of the Docker daemon can often be used to gain root-level control of the host.

Therefore, docker group membership should not be treated as an ordinary low-risk user permission. Production environments should grant access only to trusted administrators and automation identities.
`,
  steps: [
    "Inspect the Docker socket owner and group.",
    "Check the current user's group membership.",
    "Use sudo for Docker administration when appropriate.",
    "Review security implications before granting Docker group membership.",
    "If approved, add the user to the docker group.",
    "Start a new login session so group membership is refreshed.",
    "Verify access and audit which users have Docker privileges.",
    "Never make the Docker socket world-writable."
  ],
  commands: `
ls -l /var/run/docker.sock
id
groups
getent group docker
sudo usermod -aG docker USERNAME
newgrp docker
docker version
sudo docker version
`,
  config: `
Permission review:

Socket:
 /var/run/docker.sock

Inspect:
 ls -l /var/run/docker.sock

Security warning:
Do not run chmod 666 /var/run/docker.sock as a permission fix. It can grant every local user access to the Docker daemon.

Do not expose the Docker socket to untrusted containers. A container with unrestricted access to the host Docker socket may be able to control other containers and the host.
`,
  problems: [
    {
      issue: "Permission denied while connecting to Docker socket.",
      rootCause: "The user does not have permission to access the Docker Unix socket.",
      solution: "Use sudo or follow an approved Docker access policy. If group membership is approved, add the user to the docker group and start a fresh login session."
    },
    {
      issue: "Docker commands still fail after adding a user to the group.",
      rootCause: "The current shell may still have the old group membership.",
      solution: "Log out and log in again, or start a new shell session. Verify using id and groups."
    },
    {
      issue: "Security review identifies unrestricted Docker access.",
      rootCause: "Too many users or workloads have access to the Docker socket.",
      solution: "Remove unnecessary access, audit socket mounts and group membership, and use controlled administrative access."
    }
  ]
},
{
  heading: "07. Docker CLI, Contexts and Remote Engine Connectivity",
  explanation: `
The Docker CLI is a client. It does not itself run containers. It sends requests to a Docker Engine endpoint selected through the active Docker context or related environment configuration.

A context stores connection information for a Docker endpoint. An engineer may have a local development engine and one or more remote engines. Selecting the wrong context can cause commands to inspect or modify an unexpected server.

Production engineers should verify the active context before running destructive commands. Remote daemon access must use secure transport and appropriate authentication.
`,
  steps: [
    "List configured Docker contexts.",
    "Identify the active context.",
    "Inspect endpoint details before executing commands.",
    "Check whether DOCKER_HOST overrides expected connectivity.",
    "Select the intended context explicitly.",
    "Verify the target server using docker info.",
    "Use secure, approved transport for remote engine access.",
    "Recheck the context before running commands that remove or modify resources."
  ],
  commands: `
docker context ls
docker context show
docker context inspect
docker info
docker version
echo $DOCKER_HOST
unset DOCKER_HOST
docker context use default
docker ps
`,
  config: `
Context concepts:

default:
Usually refers to the local Docker endpoint configured by the client.

DOCKER_HOST:
Can override the endpoint used by the Docker CLI.

Remote context:
Can point to a remote Docker Engine using a supported secure endpoint.

Production safety:
Before executing docker rm, docker system prune or deployment commands, verify the context and server identity.
`,
  problems: [
    {
      issue: "Docker CLI connects to the wrong server.",
      rootCause: "An unexpected Docker context or DOCKER_HOST value is active.",
      solution: "Run docker context show, docker context ls and inspect environment variables. Select the intended context and verify docker info."
    },
    {
      issue: "Remote Docker connection fails.",
      rootCause: "Network reachability, authentication, TLS configuration or remote daemon availability may be incorrect.",
      solution: "Verify the endpoint, secure transport configuration, credentials, firewall and daemon status. Do not expose an unauthenticated Docker API."
    }
  ]
},
{
  heading: "08. Docker Compose and Buildx Post-Installation Verification",
  explanation: `
A modern Docker Engine installation can include Docker Compose and Buildx as CLI plugins.

Docker Compose defines and manages multi-container applications using a YAML file. Buildx extends Docker image building capabilities and supports BuildKit features and multi-platform build workflows.

These tools are separate plugins from the Docker daemon itself. Their versions and availability should be verified independently after installation.
`,
  steps: [
    "Check the Docker Engine version.",
    "Check the Compose plugin version.",
    "Check the Buildx plugin version.",
    "Create a small test Compose project in a non-production directory.",
    "Validate the Compose YAML before starting services.",
    "Start and inspect the test application.",
    "Check build functionality with a simple test Dockerfile.",
    "Remove only the test resources after verification."
  ],
  commands: `
docker --version
docker compose version
docker buildx version
docker compose config
docker buildx ls
docker compose ps
docker compose logs
docker compose down
`,
  config: `
Example compose.yaml:

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    restart: unless-stopped

Run:
 docker compose config
 docker compose up -d
 docker compose ps
 docker compose logs
 docker compose down

This example is for verification only. Production Compose projects require appropriate secrets, persistent storage, health checks, resource planning and network configuration.
`,
  problems: [
    {
      issue: "docker compose command is unavailable.",
      rootCause: "The Compose plugin may not be installed or the CLI plugin directory may not be configured correctly.",
      solution: "Install docker-compose-plugin from the official repository and verify with docker compose version."
    },
    {
      issue: "docker buildx command is unavailable.",
      rootCause: "The Buildx CLI plugin may be missing or unavailable to the current Docker CLI.",
      solution: "Install docker-buildx-plugin and verify the plugin version."
    },
    {
      issue: "Compose project cannot start.",
      rootCause: "The YAML may be invalid, an image may be unavailable, or a required port or dependency may be missing.",
      solution: "Run docker compose config, inspect docker compose logs and correct the actual configuration or dependency problem."
    }
  ]
},
{
  heading: "09. Docker Storage, Disk Usage and Data Protection",
  explanation: `
Docker stores image layers, container writable layers, volumes, build cache and other runtime data on the host. On Linux, Docker Engine commonly uses /var/lib/docker as its data directory, although the exact storage architecture depends on the Engine version and configuration.

Production engineers must monitor storage usage because a full filesystem can prevent image pulls, container writes, logging and application operations. Persistent application data should be stored in volumes or external storage rather than depending on a disposable container writable layer.

Never manually delete files from Docker's internal storage directories while Docker is managing them.
`,
  steps: [
    "Check available host filesystem capacity.",
    "Inspect Docker disk usage.",
    "Identify large images, stopped containers and unused build cache.",
    "Inspect persistent volumes and their mount points.",
    "Confirm backup coverage for important application data.",
    "Define retention rules for images and logs.",
    "Use Docker-supported cleanup commands only after reviewing what will be removed.",
    "Test restoration of important data."
  ],
  commands: `
df -h
df -i
docker system df
docker system df -v
docker image ls
docker container ls -a
docker volume ls
docker builder du
docker inspect CONTAINER_NAME
docker volume inspect VOLUME_NAME
`,
  config: `
Storage concepts:

Image layers:
Read-only image content shared by containers where possible.

Writable container layer:
Container-specific changes that normally disappear when the container is removed.

Named volume:
Docker-managed persistent storage.

Bind mount:
Maps a host filesystem path into a container.

Build cache:
Stores reusable build results.

Production warning:
docker system prune can remove unused resources. Review the target and data-retention policy before cleanup. Volume cleanup requires special care because it can destroy persistent data.
`,
  problems: [
    {
      issue: "Host disk becomes full.",
      rootCause: "Images, build cache, container logs or application data may have accumulated.",
      solution: "Use df -h and docker system df to identify usage. Apply approved image, cache and log retention policies. Protect volumes and application data."
    },
    {
      issue: "Application data disappears after container replacement.",
      rootCause: "The application stored important data only in the container writable layer.",
      solution: "Move persistent data to a named volume or suitable external storage. Validate backups and restore procedures."
    },
    {
      issue: "Docker cannot pull a new image because of storage exhaustion.",
      rootCause: "The Docker data filesystem may not have enough free space or inodes.",
      solution: "Inspect df -h, df -i and docker system df. Free space using approved Docker cleanup procedures or expand storage."
    }
  ]
},
{
  heading: "10. Docker Logging Configuration and Log Rotation",
  explanation: `
Docker captures a container's standard output and standard error streams through its configured logging driver. The default logging driver on many installations is json-file.

If container logs are not rotated or centrally collected, they can consume significant disk space. Production logging requires a clear retention policy, monitoring and a way to correlate application events with timestamps and deployment versions.

Logging configuration must be selected according to operational requirements. Some logging drivers have different delivery and buffering behavior, so changing drivers should be tested before production rollout.
`,
  steps: [
    "Inspect the logging driver used by Docker.",
    "Inspect logging configuration for important containers.",
    "Estimate log volume under normal and peak workload.",
    "Configure an appropriate rotation and retention policy.",
    "Verify that the logging system continues to collect useful application output.",
    "Monitor disk capacity and logging failures.",
    "Avoid logging secrets, passwords and sensitive tokens.",
    "Test log retrieval during an incident."
  ],
  commands: `
docker info
docker inspect CONTAINER_NAME
docker logs --tail 100 CONTAINER_NAME
docker logs --since 30m CONTAINER_NAME
docker stats
df -h
sudo journalctl -u docker -n 100
`,
  config: `
Example daemon.json logging defaults:

{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "5"
  }
}

Important:
These daemon defaults generally apply to newly created containers. Existing containers may need controlled recreation to use updated logging settings.

Never place passwords, access tokens or private keys in application logs.
`,
  problems: [
    {
      issue: "Docker log files consume large amounts of disk.",
      rootCause: "Container logs are growing without a suitable rotation and retention policy.",
      solution: "Configure an appropriate logging driver and rotation settings. Review existing containers and recreate them through a controlled process if needed."
    },
    {
      issue: "docker logs returns little or no application output.",
      rootCause: "The application may write logs to files instead of stdout and stderr, or use a logging driver with different retrieval behavior.",
      solution: "Inspect the application's logging configuration and container logging driver. Configure suitable log collection and centralized storage."
    },
    {
      issue: "Sensitive information appears in logs.",
      rootCause: "Application code may log credentials, tokens, personal data or connection strings.",
      solution: "Remove sensitive fields from logs, rotate exposed credentials and apply access controls and retention policies."
    }
  ]
},
{
  heading: "11. Docker Networking Prerequisites on Ubuntu Hosts",
  explanation: `
Docker networking allows containers to communicate with each other, the host and external networks. On Linux, Docker configures network interfaces, bridges, routes and firewall rules according to its networking mode and host configuration.

The bridge network is commonly used for standalone containers. Published ports map host ports to container ports. Production installation checks should confirm that the host firewall, IP forwarding and network policies do not unexpectedly block required traffic.

Network behavior can differ when using nftables, iptables, cloud firewalls or custom host networking. Avoid changing host firewall rules without understanding their impact.
`,
  steps: [
    "Inspect the host network interfaces and routes.",
    "Check DNS resolution and outbound connectivity.",
    "Inspect Docker network availability.",
    "Verify whether required IP forwarding and firewall behavior are supported.",
    "Check port conflicts before publishing application ports.",
    "Review cloud security groups and network ACLs when using cloud servers.",
    "Test container-to-container and container-to-external connectivity.",
    "Document approved network exposure for production workloads."
  ],
  commands: `
ip address
ip route
ip route get 8.8.8.8
cat /etc/resolv.conf
sudo ss -tulpn
docker network ls
docker network inspect bridge
docker port CONTAINER_NAME
sudo sysctl net.ipv4.ip_forward
sudo iptables -S
sudo nft list ruleset
`,
  config: `
Example:
docker run -d --name web -p 8080:80 nginx:alpine

Host port: 8080
Container port: 80

Important:
Publishing a port can expose a service beyond localhost depending on the host networking and firewall configuration.

Production:
Restrict access using suitable host firewall rules, cloud security controls and reverse-proxy architecture. Do not assume an unpublished container port is externally accessible.
`,
  problems: [
    {
      issue: "Container cannot access the internet.",
      rootCause: "DNS, routing, forwarding, firewall or proxy configuration may be incorrect.",
      solution: "Inspect routes, DNS, Docker network configuration and firewall rules. Verify outbound access from the host and container separately."
    },
    {
      issue: "Published container port is unreachable.",
      rootCause: "The application may listen on the wrong interface or port, or a host/cloud firewall may block traffic.",
      solution: "Inspect docker port, application listening address, ss output and firewall rules. Test from the host and an external client."
    },
    {
      issue: "Docker networking conflicts with an existing subnet.",
      rootCause: "The Docker bridge address range may overlap with the corporate or cloud network.",
      solution: "Plan non-overlapping address ranges and configure Docker address pools through a reviewed daemon configuration. Test routing before production use."
    }
  ]
},
{
  heading: "12. Docker Firewall, DNS and Proxy Configuration",
  explanation: `
Enterprise and cloud servers may operate behind outbound proxies, restrictive firewalls or custom DNS resolvers. Docker image downloads and container connectivity depend on these network paths.

The Docker daemon may require proxy configuration for registry access. Containers may also require their own proxy environment variables. These are separate configuration layers.

Firewall rules must account for Docker networking behavior. Unreviewed firewall changes can expose container services or interrupt existing network traffic.
`,
  steps: [
    "Identify whether the host uses a corporate proxy.",
    "Verify DNS resolution from the Ubuntu host.",
    "Check access to the configured container registry.",
    "Configure daemon proxy settings using the supported systemd mechanism when required.",
    "Configure application proxy variables separately when required.",
    "Protect proxy credentials and avoid storing them in public configuration files.",
    "Verify firewall policy and allowed outbound destinations.",
    "Test image pulls and container connectivity after changes."
  ],
  commands: `
getent hosts download.docker.com
getent hosts registry-1.docker.io
curl -I https://download.docker.com
curl -I https://registry-1.docker.io
env | grep -i proxy
sudo systemctl show --property=Environment docker
docker pull hello-world
sudo journalctl -u docker -n 100
`,
  config: `
Illustrative systemd drop-in location:

/etc/systemd/system/docker.service.d/http-proxy.conf

Example:
[Service]
Environment="HTTP_PROXY=http://proxy.example.internal:3128"
Environment="HTTPS_PROXY=http://proxy.example.internal:3128"
Environment="NO_PROXY=localhost,127.0.0.1,.example.internal"

These are placeholders. Replace them with approved organization-specific values. Protect credentials if authentication is required.

After an approved change:
sudo systemctl daemon-reload
sudo systemctl restart docker

Do not expose proxy passwords in terminal history or shared logs.
`,
  problems: [
    {
      issue: "Docker pull fails behind a corporate proxy.",
      rootCause: "The Docker daemon may not have the required proxy environment configuration.",
      solution: "Configure the daemon proxy using the supported systemd drop-in method, reload systemd, restart Docker during a maintenance window and retry the pull."
    },
    {
      issue: "Host DNS works but container DNS fails.",
      rootCause: "Docker network DNS forwarding or host resolver integration may be incorrect.",
      solution: "Inspect container resolvers and Docker network configuration. Check host DNS, daemon logs and organization-specific DNS restrictions."
    },
    {
      issue: "Container service is unexpectedly exposed.",
      rootCause: "Published ports and firewall rules may allow access from unintended network interfaces.",
      solution: "Review published ports, host firewall policy and cloud security rules. Bind services to approved interfaces and restrict source networks."
    }
  ]
},
{
  heading: "13. Docker Engine Upgrades, Package Maintenance and Recovery",
  explanation: `
Docker Engine receives security fixes, bug fixes and runtime improvements. Production teams should manage upgrades through a controlled maintenance process instead of automatically updating critical servers without testing.

The installed package versions, container runtime compatibility, daemon configuration and workload behavior should be reviewed before an upgrade. Backups and recovery plans must protect application data and important configuration.

An engine upgrade is different from rebuilding an application image. Application image release management and Docker host patch management should be handled as separate processes.
`,
  steps: [
    "Record the current Docker Engine, CLI and containerd versions.",
    "Review the release notes and compatibility requirements.",
    "Check available disk capacity and current host health.",
    "Confirm application data and configuration backups.",
    "Test the upgrade in a staging environment.",
    "Schedule production maintenance and notify stakeholders.",
    "Apply approved package updates.",
    "Check Docker service health after the upgrade.",
    "Verify critical containers, networks, volumes and application endpoints.",
    "Document the result and recovery steps."
  ],
  commands: `
docker version
containerd --version
apt-cache policy docker-ce
sudo apt-get update
sudo apt-get install --only-upgrade docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl status docker
sudo journalctl -u docker -n 100
docker ps -a
docker system df
`,
  config: `
Maintenance record should include:

- Hostname and environment.
- Previous Docker Engine and containerd versions.
- Target versions.
- Change ticket and maintenance window.
- Configuration backup location.
- Application data backup verification.
- Validation results.
- Rollback or recovery procedure.

Do not assume that downgrading Docker packages is always a safe rollback. Validate the supported recovery approach for the installed version and storage state.
`,
  problems: [
    {
      issue: "Docker upgrade fails because of package dependency conflicts.",
      rootCause: "APT repository metadata, package versions or installed dependencies may be inconsistent.",
      solution: "Inspect apt-cache policy and package-manager output. Resolve repository or dependency conflicts using supported package versions. Do not force package removal on a production server."
    },
    {
      issue: "Docker service fails after upgrade.",
      rootCause: "A runtime compatibility issue, daemon configuration change or package installation problem may prevent startup.",
      solution: "Inspect systemd and daemon logs, verify package versions and configuration, and follow the tested recovery plan."
    },
    {
      issue: "Application behaves differently after Docker upgrade.",
      rootCause: "Runtime, networking, storage or logging behavior may have changed.",
      solution: "Compare versions and daemon settings, inspect application logs and validate the workload against release notes. Use a controlled rollback or corrective upgrade when justified."
    }
  ]
},
{
  heading: "14. Docker Installation Troubleshooting and Root Cause Analysis",
  explanation: `
A failed Docker installation should be investigated systematically. The first visible error is not always the root cause. For example, a package installation error may be caused by DNS failure, an incorrect Ubuntu codename, a repository signing problem or a proxy restriction.

Production engineers gather evidence before changing the host. They inspect package-manager output, service logs, runtime status, disk capacity, network connectivity and configuration files. They then correct the root cause and repeat the verification steps.
`,
  steps: [
    "Record the exact command and complete error message.",
    "Identify the Ubuntu release and architecture.",
    "Check APT repository configuration and package availability.",
    "Check GPG key configuration and package signature verification.",
    "Inspect Docker and containerd service status.",
    "Inspect daemon logs and configuration syntax.",
    "Check filesystem capacity and inode availability.",
    "Verify DNS, proxy, firewall and registry connectivity.",
    "Apply the smallest safe correction.",
    "Repeat installation and runtime verification.",
    "Record root cause, corrective action and preventive action."
  ],
  commands: `
cat /etc/os-release
dpkg --print-architecture
sudo apt-get update
apt-cache policy docker-ce
dpkg -l | grep -E 'docker|containerd'
sudo systemctl status docker
sudo systemctl status containerd
sudo journalctl -u docker -n 200 --no-pager
sudo journalctl -u containerd -n 100 --no-pager
sudo dockerd --validate --config-file=/etc/docker/daemon.json
df -h
df -i
getent hosts download.docker.com
docker info
`,
  config: `
Example RCA format:

Incident:
Docker Engine installation failed.

Impact:
Container deployment was delayed.

Evidence:
APT could not retrieve package metadata.

Investigation:
The configured repository used an incorrect Ubuntu release codename.

Root cause:
Repository configuration did not match the installed operating system.

Correction:
Configure the official repository using the correct supported Ubuntu codename and refresh package metadata.

Verification:
Install packages, start Docker and run a test container.

Prevention:
Automate OS and repository validation before installation.
`,
  problems: [
    {
      issue: "APT cannot download Docker repository metadata.",
      rootCause: "DNS, proxy, TLS, firewall or repository configuration may be preventing access.",
      solution: "Check DNS, curl connectivity, proxy settings and repository URL. Correct the network or repository problem and run apt-get update again."
    },
    {
      issue: "Docker daemon reports an invalid configuration.",
      rootCause: "daemon.json contains invalid JSON or unsupported configuration options.",
      solution: "Validate the file, compare it with supported options and restore a known-good backup if necessary."
    },
    {
      issue: "Docker installation succeeds but hello-world fails.",
      rootCause: "The daemon may be unavailable or the host cannot reach the image registry.",
      solution: "Check docker info, systemd service logs, DNS, outbound HTTPS and registry connectivity. Retry after correcting the actual issue."
    }
  ]
},
{
  heading: "15. Production Ubuntu Docker Host Setup and Final Verification",
  explanation: `
Installing Docker is only one part of preparing a production host. A production-ready server also needs controlled administrative access, patch management, monitoring, log retention, storage planning, firewall restrictions, backup procedures and incident recovery documentation.

A Docker host should be configured according to the application's availability, security and capacity requirements. Avoid using a development configuration as a production standard without reviewing its risks.

The final verification should confirm that the Docker Engine is healthy, required plugins are available, containers can start, storage is persistent where needed, network exposure is intentional and monitoring can detect failures.
`,
  steps: [
    "Confirm that the Ubuntu release is supported by the installed Docker version.",
    "Install Docker Engine from the approved official repository.",
    "Verify Docker service startup and boot behavior.",
    "Restrict administrative access and audit Docker socket permissions.",
    "Verify Compose and Buildx if required by the workload.",
    "Configure suitable logging and retention policies.",
    "Review storage capacity, persistent volumes and backup procedures.",
    "Review host firewall, cloud security rules, DNS and proxy settings.",
    "Set resource limits and container restart policies based on workload requirements.",
    "Configure monitoring for host CPU, memory, disk, Docker service and application health.",
    "Test image pull, container startup, application access and graceful shutdown.",
    "Document installed versions, configuration and recovery procedures."
  ],
  commands: `
# Operating system and package verification
cat /etc/os-release
docker --version
docker compose version
docker buildx version

# Docker daemon verification
sudo systemctl is-active docker
sudo systemctl is-enabled docker
docker info

# Runtime verification
sudo docker run --rm hello-world
docker ps -a

# Storage verification
df -h
docker system df
docker volume ls

# Networking verification
docker network ls
sudo ss -tulpn

# Logs and diagnosis
sudo journalctl -u docker -n 100 --no-pager
docker events --since 10m

# Resource verification
docker stats --no-stream
`,
  config: `
Production host readiness checklist:

[ ] Supported Ubuntu release.
[ ] Official Docker repository configured.
[ ] Docker Engine and containerd installed.
[ ] Docker service active and enabled as required.
[ ] Docker CLI can reach the intended engine.
[ ] Compose and Buildx verified if required.
[ ] Docker socket access restricted.
[ ] Firewall and published ports reviewed.
[ ] Proxy and DNS verified.
[ ] Log retention configured.
[ ] Disk capacity and inode monitoring enabled.
[ ] Persistent data stored outside disposable container layers.
[ ] Backups and restoration tested.
[ ] Container health and restart behavior verified.
[ ] Image versions and deployment process documented.
[ ] Monitoring and incident response procedures available.

A production host should be approved only after workload-specific security and operational checks are complete.
`,
  problems: [
    {
      issue: "Docker host passes installation checks but production deployment fails.",
      rootCause: "Installation verification did not cover application dependencies, ports, secrets, storage, resource limits or deployment requirements.",
      solution: "Run an application-specific readiness review. Test the exact production image, network paths, storage mounts, secrets and health endpoints in a staging environment."
    },
    {
      issue: "Docker host becomes unavailable because of resource exhaustion.",
      rootCause: "CPU, memory, disk, inode or log usage was not monitored against workload requirements.",
      solution: "Configure host and container monitoring, resource limits and retention policies. Establish capacity alerts and tested recovery procedures."
    },
    {
      issue: "Production host is exposed through unsafe Docker access.",
      rootCause: "Docker socket permissions, daemon TCP endpoints or published container ports were not reviewed.",
      solution: "Restrict administrative access, remove unnecessary socket exposure, secure remote endpoints and audit host and cloud firewall rules."
    }
  ]
}
);

export default data;



