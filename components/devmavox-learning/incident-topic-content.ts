export type IncidentCommand = {
  command: string;
  purpose: string;
  expected: string;
};

export type IncidentQuestion = { question: string; answer: string };

export type IncidentLesson = {
  title: string;
  overview: string;
  severity: "SEV-1" | "SEV-2" | "SEV-3";
  impact: string;
  environment: string;
  symptoms: string[];
  investigation: IncidentCommand[];
  rootCauses: string[];
  recovery: string[];
  verification: string[];
  prevention: string[];
  simulation: string[];
  questions: IncidentQuestion[];
};

const lesson = (
  title: string,
  overview: string,
  severity: IncidentLesson["severity"],
  impact: string,
  environment: string,
  symptoms: string[],
  investigation: IncidentCommand[],
  rootCauses: string[],
  recovery: string[],
  verification: string[],
  prevention: string[],
  simulation: string[],
  questions: IncidentQuestion[],
): IncidentLesson => ({
  title, overview, severity, impact, environment, symptoms, investigation,
  rootCauses, recovery, verification, prevention, simulation, questions,
});

export const incidentLessons: Record<string, IncidentLesson> = {
  "high-cpu-usage": lesson(
    "Linux High CPU Usage",
    "A production Linux host is responding slowly because one or more processes are consuming most available CPU time. The objective is to identify the exact process and workload before changing or stopping anything.",
    "SEV-2",
    "API latency rises, health checks may time out, queues grow and SSH can become sluggish. A busy CPU is a symptom, not proof that the process is defective; traffic spikes, garbage collection and kernel work must also be considered.",
    "Ubuntu or Amazon Linux application VM running a web service, a worker and a node exporter. Run diagnostics with an authorized account and capture timestamps before remediation.",
    ["CPU utilization remains above the service threshold for several minutes","Application latency and request timeouts increase","Load average grows and interactive commands respond slowly"],
    [
      { command: "date -Is; uptime", purpose: "Record the incident time and compare load average with the number of CPU cores.", expected: "An ISO timestamp followed by load averages such as 8.2, 7.9, 7.1. Interpret these against the host's vCPU count." },
      { command: "top -b -n 1 | head -25", purpose: "Identify processes with the highest CPU and distinguish user, system, idle and I/O wait time.", expected: "A process list sorted by CPU. A high %us suggests application work; high %sy suggests kernel work; high %wa points toward I/O wait." },
      { command: "ps -eo pid,ppid,comm,%cpu,%mem,etime --sort=-%cpu | head -15", purpose: "Capture a repeatable process snapshot with parent PID and elapsed time.", expected: "The responsible PID and its parent are visible; compare repeated snapshots to see whether usage is sustained." },
      { command: "pidstat -u 1 5", purpose: "Observe per-process CPU over five one-second samples when sysstat is installed.", expected: "A stable high %CPU identifies a sustained consumer; a one-time spike may be transient." }
    ],
    ["A runaway application loop or expensive query","A sudden traffic increase without sufficient horizontal capacity","A deployment introduced inefficient code or excessive worker concurrency","CPU throttling or noisy-neighbour contention in a virtualized environment"],
    ["Confirm the affected host and process with the service owner; preserve the process list and relevant application logs.","If a recent release correlates with the start time, use the approved deployment rollback procedure rather than killing random processes.","If a worker is demonstrably stuck, drain its queue or remove it from service, then restart only that managed unit using systemctl after checking restart policy.","If traffic is the cause, apply the documented rate limit or scale-out action; do not disable monitoring or security agents to free CPU."],
    ["Repeat top or pidstat and confirm sustained CPU returns to the normal operating band.","Check systemctl status for the affected service and inspect its recent journal entries.","Run a local health check and an external synthetic request; confirm latency and error rate recover.","Watch the host and service for at least one normal traffic cycle to detect recurrence."],
    ["Alert on sustained CPU together with latency and saturation, not a single short spike.","Set realistic worker concurrency and resource limits; load-test expensive code paths.","Keep deployment markers in dashboards and retain process-level telemetry.","Document a safe rollback and scale-out runbook."],
    ["Create a controlled CPU stress process only on a disposable lab VM, never on a production host.","Observe the alert, capture uptime/top/ps/pidstat output and identify the lab PID.","Stop only the lab process, confirm CPU recovery and write a short incident timeline."],
    [{ question: "Why should you not immediately kill the highest-CPU process?", answer: "It may be a legitimate database, backup or application workload. Identify ownership, impact and the parent service first; capture evidence and use the service manager or approved rollback." }, { question: "What does high load average with low CPU utilization suggest?", answer: "Tasks may be blocked on I/O or uninterruptible waits. Check I/O wait, disk latency and process state instead of assuming CPU saturation." }]
  ),
  "memory-exhaustion": lesson(
    "Linux Memory Exhaustion",
    "Available memory is critically low and the kernel may reclaim cache, swap heavily or invoke the OOM killer. Diagnose memory consumers and distinguish application leaks from normal Linux page cache.",
    "SEV-1",
    "Processes can be killed, services restart, latency becomes severe and the host may become unreachable. Memory pressure can affect every workload on the same machine.",
    "Linux VM hosting one or more services, with systemd and optional swap. Capture evidence before restarting a process because restart may erase the leak signature.",
    ["MemAvailable approaches zero","Swap usage and major page faults rise","Kernel logs report out-of-memory kills or services restart unexpectedly"],
    [
      { command: "free -h; vmstat 1 5", purpose: "Check available memory, swap and whether the host is actively swapping.", expected: "Low available memory and sustained si/so values indicate memory pressure; Linux buff/cache is reclaimable and should not be mistaken for application usage." },
      { command: "ps -eo pid,comm,rss,%mem --sort=-rss | head -15", purpose: "Find processes with the largest resident memory footprint.", expected: "Top RSS consumers with PIDs; compare against expected workload size and historical baselines." },
      { command: "journalctl -k --since '-30 min' | grep -iE 'oom|out of memory|killed process'", purpose: "Look for kernel OOM killer evidence.", expected: "OOM messages identify the killed process and memory context when the kernel invoked the OOM killer." }
    ],
    ["Application memory leak or unbounded cache","Traffic or batch concurrency increased beyond capacity","A container or service has an incorrect memory limit","A workload allocates large temporary buffers or memory-mapped files"],
    ["Protect critical traffic first: remove unhealthy instances from the load balancer or scale out if capacity is available.","Capture process RSS, service logs and OOM messages before restarting the affected service.","Restart or roll back only the confirmed leaking workload using its service manager and approved change procedure.","If the host is still under pressure, stop or defer non-critical batch work after owner approval; do not blindly drop caches or disable safeguards."],
    ["Confirm MemAvailable and swap-in/swap-out return to expected levels.","Verify the affected service remains active and passes its health check.","Check kernel logs for fresh OOM events and monitor memory growth over time."],
    ["Add memory and OOM alerts with workload-specific thresholds.","Set service/container memory limits based on measured peak usage and safe headroom.","Profile heap growth and bound caches, queues and batch concurrency.","Load-test memory behavior before release."],
    ["In an isolated VM, run a bounded memory stress test with a strict duration and allocation limit.","Capture free, vmstat, ps and kernel logs while the test runs.","Stop the lab process, verify memory recovery and explain why page cache is reclaimable."],
    [{ question: "Does Linux using most RAM mean the server is out of memory?", answer: "No. Linux uses spare RAM for page cache. MemAvailable is a better indicator of memory available to new workloads than the used column alone." }, { question: "What evidence confirms an OOM kill?", answer: "Kernel journal messages identify the OOM killer action and often name the killed process, PID and memory context." }]
  ),
  "disk-full": lesson(
    "Linux Disk Full",
    "A filesystem has exhausted available blocks or inodes. Applications may fail to write logs, temporary files, database data or deployment artifacts even when the host itself is still reachable.",
    "SEV-1",
    "Writes fail, databases may become read-only or unhealthy, deployments fail and logs stop recording useful evidence. A full root filesystem can destabilize unrelated services.",
    "Linux server with separate or shared filesystems for root, logs, application data and temporary files.",
    ["df reports a filesystem at or near 100%","Applications report No space left on device","Logs, sockets, databases or deployments fail to write"],
    [
      { command: "df -hT; df -ih", purpose: "Check block capacity, filesystem type and inode exhaustion.", expected: "A mount may have 100% Use% or IUse%; inode exhaustion can block file creation even when bytes remain." },
      { command: "sudo du -xhd1 /var 2>/dev/null | sort -h", purpose: "Find large directories without crossing into other mounted filesystems.", expected: "Large log, cache or application-data directories are identified for deeper inspection." },
      { command: "sudo find /var/log -type f -size +100M -printf '%s %p\n' 2>/dev/null | sort -n | tail", purpose: "Locate unusually large log files without deleting them.", expected: "Large files are listed with byte sizes and paths; correlate them with service owners and retention." }
    ],
    ["Unrotated application or system logs","Core dumps, package caches or temporary artifacts accumulated","A runaway process writes repeated data","Inode exhaustion from millions of tiny files","Deleted files remain open by a process and still consume blocks"],
    ["Identify the exact full mount and obtain owner approval before changing data.","Preserve evidence and check whether a deleted-but-open file is holding space with lsof +L1.","Use the service's supported log rotation or retention process; truncate only a confirmed regenerable log after coordinating with its owner.","Move or remove only known disposable artifacts according to retention policy; never delete database files or unknown files to make space.","If capacity is genuinely insufficient, expand the filesystem using the platform-specific approved procedure."],
    ["df -hT and df -ih show adequate free blocks and inodes.","Affected applications can write a controlled test record and pass health checks.","Check logs for continuing ENOSPC errors and confirm the growth rate is normal."],
    ["Configure logrotate and application log retention.","Alert on filesystem growth rate and inode usage before critical thresholds.","Set quotas and lifecycle policies for artifacts and backups.","Ensure deleted-but-open files are visible in operational checks."],
    ["Fill a disposable loopback filesystem or temporary lab volume with test data, not the host root filesystem.","Observe df and application write failures; identify the largest test directory.","Remove only the lab data and verify free blocks/inodes return."],
    [{ question: "Why can a disk-full incident happen when df -h shows free space?", answer: "The filesystem may have exhausted inodes, reserved blocks may be unavailable to an unprivileged process, or a deleted file may still be held open." }, { question: "What does du -x help with?", answer: "It prevents du from traversing other mounted filesystems, keeping the investigation scoped to the affected filesystem." }]
  ),
  "service-down": lesson(
    "Linux Service Down",
    "A systemd-managed production service is inactive, repeatedly restarting or failing to bind its expected port. The response must establish whether the failure is caused by configuration, dependency, permissions, resources or a bad release.",
    "SEV-1",
    "Requests fail or are routed to fewer healthy instances. Restarting without reading logs can hide the first failure and create a restart loop.",
    "Linux VM running a systemd unit behind a load balancer or reverse proxy.",
    ["systemctl reports failed or inactive","Health checks fail and the expected TCP port is not listening","Journal shows exit codes, dependency failures or repeated restarts"],
    [
      { command: "systemctl status <service> --no-pager -l", purpose: "Inspect unit state, recent log lines and the last exit status.", expected: "The unit's Active state, Main PID, exit code and recent failure context are shown." },
      { command: "journalctl -u <service> --since '-20 min' --no-pager", purpose: "Read service-specific logs around the first failure.", expected: "The earliest actionable error often identifies config, permission, dependency or runtime failure." },
      { command: "sudo ss -lntp", purpose: "Confirm whether the expected port is listening and which process owns it.", expected: "A listener on the expected address/port or evidence that the service never bound successfully." }
    ],
    ["Invalid configuration or missing environment variable","Recent release introduced a startup regression","Port conflict or missing dependency","Filesystem permission, certificate or secret access failure","Resource exhaustion or repeated crash"],
    ["Check the service's dependency and recent deployment history before restarting.","Validate configuration with the application's supported check command and inspect secrets without printing their values.","If a release caused the outage, roll back through the deployment system.","After correcting the confirmed cause, start or restart the unit once and watch its journal; avoid repeated blind restarts."],
    ["systemctl is-active reports active and systemctl is-enabled remains as expected.","The process listens on the correct port and local health endpoint succeeds.","Load-balancer health checks pass and external synthetic requests succeed.","No repeated restart or new error appears in journalctl."],
    ["Add startup and restart-loop alerts.","Validate configuration and dependencies in CI before deployment.","Use readiness checks and staged rollouts.","Keep tested rollback instructions and service ownership metadata."],
    ["In a disposable VM, create a test systemd unit with an intentional invalid executable path.","Use status and journalctl to find the failure, fix the unit and start it.","Verify active state and document the difference between enable and start."],
    [{ question: "What is the difference between systemctl start and enable?", answer: "start activates a unit now; enable configures it to start during boot. A service can be enabled but currently inactive, or active but not enabled." }, { question: "Why inspect journalctl before restarting?", answer: "The first failure message may be lost or obscured by repeated restart attempts. Logs provide the evidence needed to choose a safe fix." }]
  ),

  "container-exited": lesson("Docker Container Exited",
    "A container process terminated and Docker reports an exited state. Determine the exit code, configured command, application logs and container lifecycle before recreating it.",
    "SEV-2","The service disappears from the container network or load balancer. Restart loops can hide a deterministic application startup error.",
    "Docker Engine host running an application container, optionally managed by Compose or an orchestrator.",
    ["docker ps -a shows Exited","The application endpoint is unavailable","Restart policy may repeatedly relaunch the failing process"],
    [
      {command:"docker ps -a --no-trunc",purpose:"Capture container status, exit code and container identity.",expected:"The affected container appears as Exited with a status such as Exited (1)."},
      {command:"docker logs --timestamps --tail 200 <container>",purpose:"Read stdout/stderr from the failed process.",expected:"The application startup error, missing dependency or shutdown message is visible."},
      {command:"docker inspect <container> --format '{{.State.ExitCode}} {{.State.OOMKilled}} {{.Config.Entrypoint}} {{.Config.Cmd}}'",purpose:"Inspect exit state, OOM flag and configured process.",expected:"Exit code and OOMKilled flag distinguish application exit from memory termination."}
    ],
    ["Application process completed or crashed","Wrong entrypoint, command or environment","Missing mounted configuration or secret","Dependency unavailable during startup","Container was OOM-killed"],
    ["Capture logs and inspect state before removing or recreating the container.","Validate the image tag, entrypoint, environment variable names and mounted paths.","Fix the image/configuration in source control and redeploy through Compose or the approved release pipeline.","Use docker restart only when the root cause is transient and the restart policy is understood."],
    ["docker inspect reports Running and health status is healthy when a health check exists.","Application port responds from the expected network path.","Logs show successful startup and no repeated exit."],
    ["Use immutable image tags and validate startup commands in CI.","Add health checks and alert on restart count.","Keep configuration and secret mounts versioned and reviewed.","Set restart policies intentionally; a restart policy is not a fix for a crash."],
    ["Run a disposable container with an invalid command, inspect its exit code and logs, correct the command and recreate it.","Verify it remains running and record the evidence."],
    [{question:"What does exit code 0 mean?",answer:"The main process completed successfully. For a long-running service, exit code 0 may still indicate the container stopped because its foreground process ended."},{question:"Why use docker inspect as well as docker logs?",answer:"Logs explain what the process printed; inspect exposes runtime state, exit code, OOM status, mounts, command and configuration."}]
  ),
  "oomkilled": lesson("Docker OOMKilled",
    "The container exceeded its effective memory allowance or the host entered memory pressure and the kernel killed a container process. Confirm the OOM flag and compare observed usage with configured limits.",
    "SEV-1","The container exits or restarts, causing request failures and possible data loss for in-memory work. Other containers may also be affected if host memory is exhausted.",
    "Docker host with memory limits configured through docker run or Compose.",
    ["Container exits and inspect reports OOMKilled=true","Docker stats shows memory near the configured limit","Kernel logs may contain memory cgroup or OOM kill messages"],
    [
      {command:"docker inspect <container> --format '{{.State.OOMKilled}} {{.State.ExitCode}} {{.HostConfig.Memory}}'",purpose:"Confirm OOM status and configured memory limit in bytes.",expected:"true indicates Docker recorded an OOM kill; a zero memory limit can mean no explicit container limit."},
      {command:"docker stats --no-stream",purpose:"Compare current memory use and percentage across containers.",expected:"The affected container's memory usage is close to its limit or host capacity."},
      {command:"journalctl -k --since '-30 min' | grep -iE 'oom|killed process|memory cgroup'",purpose:"Correlate container failure with kernel memory events.",expected:"Kernel OOM or cgroup messages may identify the killed process and memory cgroup."}
    ],
    ["Container memory limit is lower than the real workload requirement","Memory leak or unbounded in-process cache","Sudden traffic or worker concurrency increase","Host-level memory pressure from several containers"],
    ["Preserve inspect output, container logs and memory metrics before recreating the workload.","Reduce incoming load or worker concurrency if safe and supported.","Correct the memory limit based on measured demand and host capacity; do not set unlimited memory blindly.","Fix leaks or roll back the release, then redeploy through the normal pipeline."],
    ["Container remains running without fresh OOM events.","Memory usage stabilizes below the limit during representative load.","Service health and request latency recover."],
    ["Set per-container memory reservations/limits appropriate to the host.","Profile heap and cache growth; test peak traffic.","Alert on memory working set and restart count.","Leave host headroom for system daemons and sidecars."],
    ["Run a memory-bounded test container in a disposable environment, observe docker stats and OOM state, then remove the test container.","Compare the configured limit with observed peak use."],
    [{question:"Does increasing the memory limit always fix OOMKilled?",answer:"No. It may hide a leak or move the failure to the host. Confirm the workload's expected peak, host capacity and competing containers first."},{question:"Where can you confirm Docker recorded an OOM kill?",answer:"Use docker inspect and check .State.OOMKilled, then correlate with container and kernel telemetry."}]
  ),
  "container-network-failure": lesson("Docker Container Network Failure",
    "A container cannot reach another container, a host service or an external endpoint. Diagnose DNS, network membership, routes, published ports and firewall rules separately.",
    "SEV-2","Requests between services fail, causing retries, queue growth and partial application outages.",
    "Docker bridge network or user-defined Compose network with multiple application services.",
    ["Connection refused, timeout or name-resolution errors","Container can reach some destinations but not others","Host port works while container-to-container traffic fails, or vice versa"],
    [
      {command:"docker network ls; docker network inspect <network>",purpose:"Check network existence, driver, subnet and attached containers.",expected:"Both communicating containers should be attached to the intended user-defined network."},
      {command:"docker exec <container> getent hosts <service-name>",purpose:"Test service-name DNS resolution from inside the source container.",expected:"A service IP is returned; failure suggests wrong network or DNS/name issue."},
      {command:"docker exec <container> sh -c 'ip route; cat /etc/resolv.conf'",purpose:"Inspect routes and resolver configuration inside the container.",expected:"A default route and Docker-provided resolver are normally present on bridge networks."}
    ],
    ["Containers are attached to different user-defined networks","Application uses localhost instead of the peer service name","Target process listens only on loopback inside its container","Host firewall, routing or published-port mapping is incorrect"],
    ["Confirm the intended traffic direction, port and source/destination before changing firewall rules.","Attach services to the correct shared user-defined network through Compose configuration.","Change application URLs from localhost to the service DNS name when connecting across containers.","Publish host ports only when host access is required; do not expose internal service ports unnecessarily."],
    ["Resolve service DNS from the caller container.","Use a TCP client or application health check to confirm the target port is reachable.","Verify the service works after container recreation and network policy remains least-privilege."],
    ["Define networks declaratively in Compose and review network boundaries.","Use service names instead of dynamic container IPs.","Add connectivity checks and monitor DNS errors/timeouts.","Document required ports and traffic direction."],
    ["Create two disposable containers on separate networks, reproduce failed name resolution, attach them to a shared lab network and verify connectivity."],
    [{question:"Why should containers not use localhost to reach another container?",answer:"localhost refers to the current container's own network namespace. Use the peer service name on a shared user-defined network."},{question:"What is the difference between EXPOSE and ports?",answer:"EXPOSE documents a container port; Compose ports publishes a host-to-container port mapping."}]
  ),

  "crashloopbackoff": lesson("Kubernetes CrashLoopBackOff",
    "A Pod container repeatedly starts, exits and is delayed by Kubernetes exponential backoff. The Pod condition is a symptom; inspect previous logs, events, probes and configuration to find the actual failure.",
    "SEV-1","Replicas become unavailable, deployments fail readiness and user traffic may be served by fewer Pods.",
    "Kubernetes Deployment with application containers, ConfigMaps/Secrets, probes and resource limits.",
    ["kubectl get pods shows CrashLoopBackOff","Restart count increases over time","Deployment available replicas fall below desired replicas"],
    [
      {command:"kubectl get pods -n <namespace> -o wide",purpose:"Identify affected Pods, nodes, restart counts and placement.",expected:"Affected Pod shows CrashLoopBackOff and a growing RESTARTS count."},
      {command:"kubectl describe pod <pod> -n <namespace>",purpose:"Read container state, last termination reason, probes, mounts and Events.",expected:"Events and Last State may show probe failure, OOMKilled, missing config or scheduling context."},
      {command:"kubectl logs <pod> -n <namespace> -c <container> --previous --timestamps",purpose:"Read logs from the previous crashed container instance.",expected:"The last process output often contains the startup exception or missing dependency."},
      {command:"kubectl get deploy <deployment> -n <namespace> -o yaml",purpose:"Review image, command, environment, probes and resource configuration.",expected:"The deployed spec can be compared with the last known-good revision."}
    ],
    ["Application exits because of a startup exception or invalid configuration","Liveness probe is too aggressive or points to the wrong path","Container is OOMKilled due to insufficient memory","Required Secret, ConfigMap or dependency is missing","Incorrect command, arguments or image version"],
    ["Capture describe output, previous logs and rollout history before changing the Pod.","If a recent release introduced the issue, use kubectl rollout undo deployment/<name> -n <namespace> after confirming the target revision and change policy.","Otherwise correct the source manifest or Helm values; do not patch a generated Pod that will be recreated.","Adjust probes only when evidence shows the probe is incorrect; do not simply increase delays to hide a real crash."],
    ["kubectl rollout status deployment/<name> -n <namespace> completes successfully.","Desired and available replicas match; Pods stay Ready without increasing restart counts.","Service endpoints contain healthy Pod IPs and synthetic requests pass."],
    ["Add startup probes for slow initialization and realistic liveness/readiness checks.","Validate required config and secrets before rollout.","Set memory requests/limits from measured usage.","Use canary or progressive rollout and retain known-good revisions."],
    ["In a disposable namespace, deploy a Pod with an intentional invalid startup command.","Use get, describe and logs --previous to identify it, correct the manifest and verify rollout."],
    [{question:"Why is kubectl logs --previous important?",answer:"It retrieves logs from the last terminated container instance. Current logs may be empty after the container restarts."},{question:"Should you delete a CrashLoopBackOff Pod immediately?",answer:"No. A controller may recreate it with the same failure, while deletion loses useful context. Inspect events and previous logs first."}]
  ),
  "imagepullbackoff": lesson("Kubernetes ImagePullBackOff",
    "The kubelet cannot pull the requested image and progressively backs off retries. Check the exact image reference, registry reachability, credentials and node-level access.",
    "SEV-2","New Pods cannot start, rollout availability drops and deployments may stall.",
    "Kubernetes Deployment pulling from a public or private OCI registry.",
    ["Pod status shows ErrImagePull or ImagePullBackOff","Events show manifest unknown, unauthorized or timeout","Existing Pods may continue serving while new replicas fail"],
    [
      {command:"kubectl describe pod <pod> -n <namespace>",purpose:"Read the exact image pull event and container image reference.",expected:"Events distinguish authentication, missing tag, DNS, TLS or network failures."},
      {command:"kubectl get pod <pod> -n <namespace> -o jsonpath='{.spec.containers[*].image}'",purpose:"Confirm the exact repository and tag Kubernetes is requesting.",expected:"The image reference matches the intended registry, repository and immutable tag."},
      {command:"kubectl get serviceaccount <service-account> -n <namespace> -o yaml",purpose:"Check whether the workload ServiceAccount references the expected imagePullSecrets.",expected:"The required pull secret is referenced when the cluster uses namespace-scoped registry credentials."}
    ],
    ["Image tag or repository does not exist","Private registry credentials are missing, expired or in the wrong namespace","Registry DNS, TLS or network path is unavailable","Node identity lacks registry permissions"],
    ["Do not place registry passwords in shell history or manifests committed to source control.","Correct the image name/tag or publish the intended image first.","For private registries, use an approved secret or workload/node identity mechanism with least privilege.","Restart the rollout only after fixing the pull cause; avoid repeated restarts while credentials or registry access remain broken."],
    ["Pod events no longer show pull errors and container reaches Running/Ready.","Verify the pulled image digest matches the intended release.","Deployment rollout completes and service endpoints recover."],
    ["Use immutable image tags or digests and validate image existence in CI.","Rotate registry credentials and automate secret expiry alerts.","Prefer cloud workload identity where supported.","Monitor registry availability and node egress/DNS."],
    ["Use a disposable namespace and deliberately reference a nonexistent image tag.","Inspect Events, correct the tag and verify the Pod pulls successfully."],
    [{question:"Why is an imagePullSecret namespace-specific?",answer:"Kubernetes Secrets referenced by a Pod must exist in the same namespace as that Pod. A secret in another namespace is not automatically available."},{question:"What does ImagePullBackOff mean?",answer:"The image pull failed and kubelet is delaying subsequent retries. The underlying event explains whether the cause is auth, tag, DNS, TLS or connectivity."}]
  ),
  "pending-pods": lesson("Kubernetes Pending Pods",
    "A Pod remains Pending because it has not been scheduled or its required volumes and prerequisites are not ready. Identify whether the scheduler, storage provisioner, taints or resource requests are blocking placement.",
    "SEV-2","Workload replicas do not become available; rollouts stall and capacity-sensitive services may lose redundancy.",
    "Kubernetes cluster with worker nodes, scheduler, resource requests, taints and optionally dynamic persistent volumes.",
    ["kubectl get pods shows Pending for an extended period","Pod Events report insufficient CPU/memory, untolerated taint or unbound PVC","No node is assigned or volume provisioning remains incomplete"],
    [
      {command:"kubectl describe pod <pod> -n <namespace>",purpose:"Read scheduler Events and scheduling conditions.",expected:"Events commonly identify Insufficient cpu, Insufficient memory, untolerated taint or unbound immediate PersistentVolumeClaims."},
      {command:"kubectl get nodes; kubectl describe nodes",purpose:"Check node readiness, allocatable resources, taints and current pressure.",expected:"At least one eligible Ready node has enough allocatable resources and matching tolerations."},
      {command:"kubectl get pvc -n <namespace>",purpose:"Check whether required persistent volume claims are Bound.",expected:"A required PVC should be Bound; Pending claims need storage-class and provisioner investigation."}
    ],
    ["Resource requests exceed available allocatable capacity","Node taints have no matching Pod toleration","Node selector or affinity excludes all nodes","PVC cannot bind or storage class/provisioner is unavailable","Cluster autoscaler cannot add capacity"],
    ["Use Events to identify the exact scheduling predicate; do not lower requests without understanding application needs.","Scale the node group or reduce non-critical workload demand using the approved capacity process.","Correct node affinity, tolerations or storage configuration in source manifests when they are wrong.","For PVC issues, inspect StorageClass and provisioner events before recreating claims."],
    ["Pod receives a node assignment and transitions to Running/Ready.","PVC is Bound and mounted successfully.","Deployment desired and available replicas match."],
    ["Capacity-plan requests and limits; keep node headroom.","Validate affinity, taints and storage classes in pre-production.","Alert on Pending duration and unschedulable events.","Test autoscaler permissions and maximum node-group limits."],
    ["In a lab namespace, request more CPU than available or add a taint without a toleration.","Read scheduler Events, correct the request/toleration and confirm scheduling."],
    [{question:"What is the first command for a Pending Pod?",answer:"kubectl describe pod is usually the best first step because Events explain scheduler and volume-binding decisions."},{question:"Why should CPU requests not be reduced blindly?",answer:"Requests influence scheduling and resource guarantees. Reducing them can overpack nodes and create CPU contention under load."}]
  ),
  "node-notready": lesson("Kubernetes Node NotReady",
    "The control plane marks a worker node NotReady because its kubelet heartbeat or node conditions are unhealthy. Determine whether the cause is host failure, kubelet, container runtime, networking or resource pressure.",
    "SEV-1","Pods on the node may become unavailable or be rescheduled after tolerations expire. Cluster capacity and availability decrease.",
    "Kubernetes worker node running kubelet and container runtime, connected to the API server.",
    ["kubectl get nodes reports NotReady","Node conditions show MemoryPressure, DiskPressure or Unknown","Pods on the node become unreachable or are evicted"],
    [
      {command:"kubectl describe node <node>",purpose:"Inspect conditions, taints, heartbeat and recent node Events.",expected:"Conditions and messages identify pressure, kubelet heartbeat loss or runtime-related problems."},
      {command:"kubectl get pods -A -o wide --field-selector spec.nodeName=<node>",purpose:"List workloads placed on the affected node.",expected:"The output identifies affected workloads and whether critical replicas exist elsewhere."},
      {command:"sudo systemctl status kubelet containerd --no-pager",purpose:"On the node, check kubelet and runtime service health.",expected:"Both services should be active; status reveals crashes, dependency or configuration errors."},
      {command:"sudo journalctl -u kubelet -u containerd --since '-20 min' --no-pager",purpose:"Read node-agent and runtime errors.",expected:"Logs may show API connectivity, certificate, disk, runtime socket or cgroup issues."}
    ],
    ["Node lost network connectivity to the API server","Kubelet or container runtime stopped or became unhealthy","Disk, memory or PID pressure","Certificate, clock or configuration problem","Underlying VM or cloud instance failure"],
    ["Check cluster-wide impact and ensure enough healthy replicas exist before maintenance.","If the node is reachable, inspect system resources and kubelet/runtime logs; repair the confirmed cause.","Cordon the node before planned maintenance; drain only after checking PodDisruptionBudgets, local storage and workload impact.","For an irrecoverable cloud VM, replace it through the managed node-group process rather than manually deleting state."],
    ["Node returns Ready and remains stable through several heartbeat intervals.","Critical Pods are Ready and service endpoints are healthy.","No repeated kubelet/runtime failures or pressure conditions appear."],
    ["Monitor node conditions, kubelet heartbeat and runtime health.","Maintain spare cluster capacity and tested node replacement procedures.","Use PodDisruptionBudgets and anti-affinity for critical replicas.","Patch and upgrade nodes using a controlled rollout."],
    ["In a disposable cluster, stop kubelet on a worker and observe the NotReady transition.","Restore kubelet, confirm Ready, then document the events and recovery timeline."],
    [{question:"What does cordon do?",answer:"kubectl cordon marks a node unschedulable for new Pods but does not evict existing Pods."},{question:"Why is drain more disruptive than cordon?",answer:"drain evicts eligible Pods from a node and must respect PodDisruptionBudgets, local storage and workload availability."}]
  ),

  "jenkins-build-failure": lesson("Jenkins Build Failure",
    "A Jenkins pipeline run fails during checkout, dependency resolution, build, test, packaging or artifact publication. Identify the first failing stage and distinguish application failures from Jenkins infrastructure failures.",
    "SEV-2","A release is delayed or blocked; repeated retries can consume executors and hide a deterministic code or dependency problem.",
    "Jenkins controller with one or more agents, Pipeline-as-Code and an artifact repository.",
    ["Pipeline stage turns red and build result is FAILURE","Console output contains a non-zero exit code or missing dependency","Several jobs may fail together if the agent or shared service is unhealthy"],
    [
      {command:"Inspect the failed stage and first ERROR in the Jenkins console log",purpose:"Find the earliest meaningful failure, not the final pipeline summary.",expected:"A concrete failing command, test, checkout or dependency error is identified."},
      {command:"Check the build's SCM revision, parameters and environment",purpose:"Compare the failed run with the last successful build.",expected:"The commit, branch, tool versions and build parameters are known."},
      {command:"On the agent, verify required tools and disk: java -version; mvn -version; df -h",purpose:"Check runtime prerequisites and workspace capacity.",expected:"Toolchain matches the pipeline requirement and the workspace filesystem has free space."}
    ],
    ["Code or unit test regression","Dependency repository outage or changed artifact","Agent missing toolchain or disk capacity","Credentials expired or SCM checkout failed","Pipeline script or shared library regression"],
    ["Preserve the console log, build number, commit SHA and failing stage.","Determine whether other jobs on the same agent or dependency service are also failing.","Fix source/test defects or restore the approved toolchain/dependency/credential configuration.","Retry only after the root cause is addressed; use a known-good commit rollback if a release regression is confirmed."],
    ["A new build completes all required stages and publishes the expected artifact.","Verify artifact coordinates, checksum and provenance.","Confirm downstream deployment consumes the intended build, not an older artifact."],
    ["Pin tool versions and use reproducible build images.","Cache dependencies safely and monitor artifact repositories.","Add pipeline validation and clear stage-level timeouts.","Keep credentials in Jenkins credentials store and rotate them."],
    ["Create a sample pipeline with a deliberately failing test or missing tool.","Read the console output, identify the failing stage, correct the cause and rerun."],
    [{question:"Why focus on the first error in console output?",answer:"Later failures are often consequences of the first failure. The earliest actionable error usually reveals the real root cause."},{question:"When should you retry a failed Jenkins build?",answer:"Retry after confirming a transient dependency or infrastructure issue. Repeating deterministic code or configuration failures wastes capacity and does not fix the cause."}]
  ),
  "agent-offline": lesson("Jenkins Agent Offline",
    "The Jenkins controller cannot use an agent because the agent process, network path, SSH connection, remoting channel or node configuration is unavailable.",
    "SEV-2","Jobs remain queued or fail to allocate an executor. Builds may be concentrated on fewer agents, increasing wait times.",
    "Jenkins controller connected to Linux agents through SSH or inbound agent remoting.",
    ["Node page shows agent offline or temporarily offline","Queue reports no available executor with the required label","Controller logs show SSH, remoting or handshake failures"],
    [
      {command:"Jenkins UI → Manage Jenkins → Nodes → <agent>",purpose:"Check agent status, labels, executors and connection log.",expected:"The connection log identifies launch, authentication, Java or remoting failure."},
      {command:"From the controller, test authorized connectivity: ssh -v <agent-user>@<agent-host>",purpose:"Validate DNS, TCP/22 and SSH authentication for SSH-launched agents.",expected:"SSH reaches the expected host and authenticates using the configured credential."},
      {command:"On the agent: systemctl status jenkins-agent --no-pager; df -h",purpose:"Check agent service and workspace capacity when the host is reachable.",expected:"Agent process is active and workspace filesystem is not full."}
    ],
    ["Agent VM stopped or network route/security group changed","SSH key or credential rotated without updating Jenkins","Java runtime incompatible with the agent remoting version","Agent disk full or remoting process crashed","Node label or launch configuration changed"],
    ["Check whether one agent or all agents are offline to isolate controller-wide versus host-specific failure.","Restore host/network reachability and validate credentials using the approved secret store.","Confirm supported Java and remoting versions; restart the managed agent service after correcting the cause.","Re-enable the node and run a small labeled test job before releasing the queue."],
    ["Agent is online with expected labels and executors.","A test job runs on that exact agent and workspace operations succeed.","Queued production jobs begin and no new channel errors appear."],
    ["Monitor agent online state, queue age and disk space.","Use configuration-as-code and controlled credential rotation.","Maintain agent images and supported Java versions.","Keep spare agents for critical labels."],
    ["Stop a disposable lab agent service, observe it go offline, inspect connection logs and restore the service."],
    [{question:"What is the difference between an agent and an executor?",answer:"An agent is the machine or runtime that performs work. An executor is a concurrency slot on that agent that can run one build task at a time."},{question:"Why can an agent be online but a job remain queued?",answer:"The job may require a label the agent does not have, all executors may be busy, or other scheduling restrictions may prevent assignment."}]
  ),
  "deployment-failure": lesson("CI/CD Deployment Failure",
    "A pipeline built or tested successfully but the deployment stage failed or the target environment did not reach the expected release state. Separate artifact, authorization, rollout and health-check failures.",
    "SEV-1","The environment may remain on an old release, become partially updated or serve a mixture of versions.",
    "Jenkins or another CI/CD runner deploying an immutable artifact to Kubernetes or virtual machines.",
    ["Deployment stage fails after build success","Target environment reports unhealthy or mixed versions","Rollback or promotion step may also be blocked"],
    [
      {command:"Record pipeline run, artifact digest, target environment and deployment revision",purpose:"Establish exactly what was deployed and where.",expected:"The release can be traced to a commit and immutable artifact."},
      {command:"For Kubernetes: kubectl rollout status deployment/<name> -n <namespace>; kubectl get rs,pods -n <namespace>",purpose:"Check whether the rollout progressed and which ReplicaSet is active.",expected:"Events and ReplicaSets reveal scheduling, readiness, image or application startup failure."},
      {command:"Inspect deployment logs and target-side events around the release timestamp",purpose:"Correlate CI output with the deployment platform's own evidence.",expected:"Authorization, admission, health-check or runtime errors are visible."}
    ],
    ["Wrong artifact or image tag","Deployment credentials or RBAC permissions changed","Readiness checks fail because the new application is unhealthy","Environment configuration or secret differs from expectations","Infrastructure quota or capacity prevents rollout"],
    ["Pause further promotions and identify the last known-good release.","If user impact is active, follow the approved rollback or traffic-shift procedure using the known-good artifact.","Correct the failing manifest, credential or environment configuration in source control; avoid untracked production-only patches.","Resume promotion only after a controlled validation in the target environment."],
    ["All desired replicas or hosts run the intended release digest.","Readiness and external synthetic checks pass.","Error rate and latency return to baseline; no stale or mixed versions remain."],
    ["Use immutable artifacts, environment parity and deployment prechecks.","Apply progressive delivery with automatic abort thresholds.","Test rollback regularly and retain release metadata.","Use least-privilege deployment identities."],
    ["Deploy a known test release to a disposable namespace, introduce a failing readiness probe, observe the pipeline failure and roll back."],
    [{question:"Why record an artifact digest?",answer:"A digest identifies the exact artifact content and avoids ambiguity caused by mutable tags such as latest."},{question:"What is the difference between deployment success and application health?",answer:"The deployment tool may successfully apply resources while the application remains unready or returns errors. Validate runtime health and user-facing behavior separately."}]
  ),

  "ec2-unreachable": lesson("EC2 Instance Unreachable",
    "An EC2 instance cannot be reached through SSH, RDP or its application endpoint. Determine whether the problem is instance state, guest OS, network path, security controls or application health.",
    "SEV-1","Administration and application traffic may be unavailable. Incorrect recovery actions can destroy forensic evidence or worsen data loss.",
    "EC2 instance in a VPC subnet with security groups, network ACLs, route tables and optional load balancer.",
    ["SSH/RDP times out or connection is refused","EC2 status checks fail or instance system log reports boot errors","Load balancer target health becomes unhealthy"],
    [
      {command:"AWS Console/CLI: aws ec2 describe-instance-status --instance-ids <id> --include-all-instances",purpose:"Check instance and system status checks.",expected:"Both instance and system status checks should be passed; failed checks narrow the fault domain."},
      {command:"aws ec2 describe-instances --instance-ids <id>",purpose:"Confirm state, subnet, security groups, private/public IP and attached profile.",expected:"The instance is running and network identity matches the expected target."},
      {command:"Review security group, NACL, route table and Internet/NAT path for the source and destination",purpose:"Validate each network hop and return path.",expected:"Required protocol/port is allowed in both directions and the subnet has the intended route."}
    ],
    ["Instance or underlying host status-check failure","Security group or NACL rule changed","Route, public IP, NAT or VPN path is missing","Guest OS firewall, sshd or disk failure","Application is down although the instance is reachable"],
    ["Confirm impact and preserve instance status, system log and recent change history.","Use EC2 serial console, Systems Manager Session Manager or approved recovery tooling where available.","Correct the specific route, security rule, OS service or boot issue; do not open SSH to the entire internet as a quick fix.","If AWS status checks indicate host impairment, follow AWS-recommended stop/start or recovery procedure with data and instance-store implications reviewed."],
    ["Instance and system status checks pass.","Authorized administration access succeeds from the approved network.","Application health and load balancer target checks pass."],
    ["Use Systems Manager instead of unrestricted public SSH where possible.","Monitor status checks and application health separately.","Apply infrastructure changes through reviewed IaC.","Maintain tested snapshots, backups and recovery runbooks."],
    ["In a sandbox VPC, remove a lab-only inbound rule, diagnose timeout using status and route/security checks, restore the rule and verify access."],
    [{question:"What is the difference between system and instance status checks?",answer:"System checks monitor AWS infrastructure; instance checks monitor the guest operating system and network reachability from the platform perspective."},{question:"Why should you avoid opening SSH to 0.0.0.0/0?",answer:"It exposes the management port to the entire IPv4 internet. Restrict source ranges or use managed session access."}]
  ),
  "eks-cluster-failure": lesson("Amazon EKS Cluster Failure",
    "Operators or workloads cannot use an EKS cluster normally. Isolate control-plane/API access, authentication, node health, networking, add-ons and AWS service dependencies before changing resources.",
    "SEV-1","Deployments and operations may stop; workloads can continue running temporarily while control-plane operations fail.",
    "Amazon EKS control plane with managed or self-managed nodes, VPC networking, IAM authentication and cluster add-ons.",
    ["kubectl commands time out or return unauthorized","Nodes or CoreDNS/CNI add-ons become unhealthy","Workloads cannot schedule or reach services"],
    [
      {command:"aws eks describe-cluster --name <cluster> --region <region>",purpose:"Check cluster status, endpoint, version, VPC and identity configuration.",expected:"Cluster status is ACTIVE and endpoint/VPC details match the expected environment."},
      {command:"aws eks update-kubeconfig --name <cluster> --region <region>; kubectl get nodes",purpose:"Refresh local kubeconfig and test authenticated API access.",expected:"kubectl reaches the intended cluster and lists nodes; verify context before running changes."},
      {command:"kubectl get pods -n kube-system -o wide; kubectl get events -A --sort-by=.lastTimestamp",purpose:"Inspect DNS, CNI, proxy and recent cluster events.",expected:"Core add-ons should be Ready; events identify image, networking, permissions or capacity errors."}
    ],
    ["IAM identity mapping or access policy changed","VPC endpoint, route or security group blocks API access","Node group capacity or kubelet health failure","VPC CNI, CoreDNS or kube-proxy add-on regression","Cluster upgrade or AWS service-side issue"],
    ["Confirm AWS account, region and kubectl context before any operation.","Check AWS Health and EKS cluster status; capture add-on and node-group states.","Restore access policy or network path only after confirming the intended identity and source.","For node/add-on failures, use supported EKS update or rollback procedures and preserve workload availability.","Do not delete and recreate the cluster as an initial troubleshooting step."],
    ["EKS cluster reports ACTIVE and intended IAM principals can authenticate.","Nodes are Ready and system add-ons are healthy.","DNS, Pod networking, scheduling and application synthetic tests pass."],
    ["Test cluster upgrades in a representative staging cluster.","Manage access, add-ons and node groups declaratively.","Monitor API errors, node health, CNI IP capacity and CoreDNS.","Keep multiple healthy nodes and tested disaster recovery."],
    ["Use a sandbox cluster and simulate a wrong kubeconfig context or restricted test identity.","Diagnose cluster identity and access, restore the correct context/policy and verify nodes."],
    [{question:"Why confirm AWS account and kubectl context first?",answer:"The same cluster or resource name can exist in multiple accounts and regions. A wrong context can cause investigation or remediation against the wrong environment."},{question:"Can workloads keep running when kubectl access is broken?",answer:"Yes. Existing nodes may continue running workloads while operators cannot reach the API, depending on the failure. Control-plane access and workload health must be checked separately."}]
  ),
  "iam-access-denied": lesson("AWS IAM Access Denied",
    "An AWS API or application request is rejected because the effective identity lacks permission or an explicit deny applies. Determine the caller identity and evaluate identity, resource, boundary, organization and session policies.",
    "SEV-2","Deployments, automation or application workflows fail. Broad permission grants can create a security incident while attempting to restore service.",
    "AWS workload or engineer identity using IAM roles, STS sessions and resource-based policies.",
    ["AWS API returns AccessDenied or AccessDeniedException","A previously working pipeline or application loses access","CloudTrail records denied API calls"],
    [
      {command:"aws sts get-caller-identity",purpose:"Identify the exact account and principal making the request.",expected:"Account, ARN and user ID match the expected role/session."},
      {command:"Inspect the denied CloudTrail event for eventName, userIdentity, resource and errorCode",purpose:"Identify the API action, caller and resource that were denied.",expected:"The event records the exact principal, action, resource and time."},
      {command:"Review role policy, resource policy, permissions boundary, session policy and SCP",purpose:"Evaluate all policy layers for explicit deny or missing allow.",expected:"The missing permission or explicit deny is identified without granting unrelated actions."}
    ],
    ["Required action is absent from identity policy","Resource-based policy does not trust the principal","Permissions boundary, session policy or SCP limits access","Role trust policy or external ID is incorrect","Pipeline uses a different role than expected"],
    ["Confirm caller identity and exact denied action/resource from CloudTrail.","Identify the policy layer responsible; explicit deny overrides an allow.","Add only the required action on the narrowest resource ARN, with required conditions and approval.","If trust is broken, correct the trust relationship rather than attaching broad administrator access.","Re-run the minimum failing operation and record the policy change."],
    ["The intended principal can perform the required action and cannot access unrelated resources.","CloudTrail shows successful call under the expected identity.","Pipeline or application health recovers."],
    ["Use least privilege and policy-as-code reviews.","Alert on unusual AccessDenied spikes and role assumption failures.","Test roles in staging and periodically review unused permissions.","Avoid long-lived access keys; prefer short-lived role sessions."],
    ["Use a sandbox role with one deliberately missing permission, inspect caller identity and denied event, add the minimum permission and verify."],
    [{question:"Does an Allow in an IAM identity policy always grant access?",answer:"No. Explicit denies and restrictions from resource policies, permissions boundaries, session policies and service control policies can still block access."},{question:"What is the safest response to AccessDenied?",answer:"Identify the exact principal, action and resource, then add only the missing permission at the narrowest scope. Do not attach AdministratorAccess as a shortcut."}]
  ),

  "dns-failure": lesson("DNS Failure",
    "Clients cannot resolve a hostname or receive an incorrect DNS answer. Establish whether failure is local resolver configuration, authoritative records, recursive resolver availability, split-horizon DNS or caching.",
    "SEV-1","Services appear unreachable even when their IP endpoints are healthy. Multiple applications may fail simultaneously if they share DNS infrastructure.",
    "Linux clients and services using internal DNS, cloud DNS zones or public DNS resolvers.",
    ["Name resolution returns NXDOMAIN, SERVFAIL or timeout","IP connectivity works while hostname-based requests fail","Only one network/VPC or resolver path is affected"],
    [
      {command:"getent hosts <hostname>; resolvectl status",purpose:"Check the system resolver result and configured DNS servers.",expected:"The hostname resolves to the expected address and resolver configuration points to approved servers."},
      {command:"dig <hostname> A; dig @<resolver-ip> <hostname> A",purpose:"Compare default resolver behavior with a specific resolver.",expected:"Answer, status, TTL and responding server help isolate resolver versus record problems."},
      {command:"dig +trace <public-hostname>",purpose:"For public DNS investigation, trace delegation from root toward authoritative servers.",expected:"The trace identifies the delegation point where resolution fails; use only when network policy permits."}
    ],
    ["Record deleted or incorrect","Authoritative DNS or recursive resolver outage","Wrong search domain or resolver configuration","Network path/firewall blocks UDP or TCP 53","Stale cache or split-horizon zone mismatch"],
    ["Confirm the affected hostname, record type, source network and expected answer.","Compare multiple resolvers and inspect authoritative zone changes.","Restore the correct record or resolver path through approved DNS management; avoid creating duplicate conflicting records.","If cache is stale, use the supported cache flush after correcting the authoritative source."],
    ["Queries from affected networks return the correct record and TTL.","Application requests succeed by hostname from each required network.","Monitor for SERVFAIL, NXDOMAIN and timeout recurrence."],
    ["Manage DNS records as code with review and rollback.","Monitor resolver latency and authoritative health.","Use appropriate TTLs and redundant resolvers.","Test split-horizon records from each network segment."],
    ["In a disposable lab, query a test hostname with a missing record, compare resolvers, add the record in the lab zone and verify resolution."],
    [{question:"What is the difference between NXDOMAIN and SERVFAIL?",answer:"NXDOMAIN means the queried name does not exist according to the DNS response. SERVFAIL means the resolver could not complete resolution, often due to upstream or DNSSEC problems."},{question:"Why test DNS from the affected host?",answer:"A laptop or another subnet may use a different resolver, search domain, route or cache and therefore not reproduce the same failure."}]
  ),
  "connection-timeout": lesson("Connection Timeout",
    "A TCP client does not receive a successful connection within the configured timeout. Trace the path from source to destination and distinguish dropped packets, routing failures, overloaded listeners and security controls.",
    "SEV-2","Requests queue or fail after waiting, causing retries and cascading load across dependent services.",
    "Application client connecting to a service over VPC, data-center or container network.",
    ["Client reports connect timeout rather than immediate refusal","Only certain source networks or destinations are affected","Packet loss, route changes or overloaded service may correlate with the start time"],
    [
      {command:"getent hosts <host>; ip route get <destination-ip>",purpose:"Confirm name resolution and the route selected by the source host.",expected:"Destination resolves correctly and route uses the expected interface/gateway."},
      {command:"nc -vz -w 3 <host> <port>; curl -v --connect-timeout 3 https://<host>/health",purpose:"Test TCP connection and application-level handshake.",expected:"The output distinguishes connection timeout, refusal, TLS failure and HTTP response."},
      {command:"ss -s; ss -ant state syn-sent",purpose:"Inspect socket pressure and outbound connections stuck during handshake.",expected:"Large SYN-SENT counts may indicate unreachable destinations or network filtering."}
    ],
    ["Security group, firewall or NACL silently drops packets","Route table, VPN or peering path is missing","Destination listener is overloaded or backlog exhausted","MTU or asymmetric routing issue","Connection pool exhaustion or retry storm"],
    ["Identify exact source IP, destination IP, protocol and port.","Trace routes and inspect both outbound and return-path controls with network owners.","Restore the smallest required route or firewall rule; do not open broad network ranges.","If the destination is overloaded, reduce retries/concurrency and scale or recover the service."],
    ["TCP handshake completes from the original source network.","Application health endpoint responds within the service SLO.","Connection pool and retry metrics return to normal."],
    ["Use explicit connect/read timeouts and bounded exponential backoff with jitter.","Monitor network drops, connection saturation and service queue depth.","Review security and route changes through IaC.","Avoid retry storms with circuit breakers and bulkheads."],
    ["Use two lab VMs or containers, block a test port in an isolated lab firewall, diagnose timeout with nc and route inspection, restore the rule."],
    [{question:"How is connection refused different from timeout?",answer:"Refused usually means a reachable host actively rejected the connection or no process is listening. Timeout often means packets or replies are being dropped or the path is stalled."},{question:"Why inspect the return path?",answer:"TCP requires traffic in both directions. A valid outbound route with a blocked or asymmetric return path can still cause a timeout."}]
  ),
  "port-unreachable": lesson("Port Unreachable",
    "A client receives an immediate refusal or an ICMP port-unreachable response. Confirm whether the destination host is reachable, whether the expected process is listening and whether a firewall is actively rejecting traffic.",
    "SEV-2","A specific service or protocol becomes unavailable while other ports on the same host may continue working.",
    "Linux service host, container port mapping or cloud load balancer target.",
    ["Connection is refused immediately","ICMP reports destination or port unreachable","Host responds but the expected service port does not"],
    [
      {command:"nc -vz -w 3 <host> <port>",purpose:"Test whether the TCP port accepts a connection.",expected:"Succeeded indicates listener reachable; refused indicates no listener or active reject; timeout indicates a different path problem."},
      {command:"sudo ss -lntup | grep ':<port>'",purpose:"Check whether the service is listening on the expected address and port.",expected:"A listener should be bound to the intended interface, not only 127.0.0.1 when remote clients need access."},
      {command:"systemctl status <service> --no-pager; journalctl -u <service> -n 100 --no-pager",purpose:"Check service health and startup/bind errors.",expected:"The service is active and logs show successful bind to the intended port."}
    ],
    ["Service stopped or crashed","Application binds to loopback or a different port","Container port not published or Kubernetes Service targetPort wrong","Firewall actively rejects the port","Configuration changed the listener port"],
    ["Confirm the protocol, destination and expected listener with the service owner.","Start or repair the service only after understanding its startup failure.","Correct bind address, container mapping or Service targetPort in source configuration.","Adjust firewall policy narrowly if a reject rule is the confirmed cause."],
    ["Listener appears on the expected address/port.","A test from the original client network succeeds.","Health checks and application requests recover."],
    ["Monitor listener health and service restarts.","Validate ports and bind addresses during deployment.","Keep container and Kubernetes port mappings consistent.","Document network ownership and approved firewall rules."],
    ["Start a lab web server on one port, test an incorrect port, inspect ss output and then test the correct port."],
    [{question:"What does connection refused usually indicate?",answer:"The destination was reachable enough to reject the TCP attempt, commonly because no process is listening or a firewall actively rejects it."},{question:"Why can a service listening on 127.0.0.1 be unreachable remotely?",answer:"127.0.0.1 is loopback inside the host or container. Remote clients need the service bound to an appropriate interface."}]
  ),

  "http-500": lesson("HTTP 500 Internal Server Error",
    "The application server encountered an unexpected condition while processing a request. Correlate request IDs, application exceptions, dependency health and the release timeline; do not assume the load balancer is the root cause.",
    "SEV-1","Users receive failed requests, transaction completion may be uncertain and retries can duplicate non-idempotent operations.",
    "Web application behind a reverse proxy or load balancer, with database and downstream APIs.",
    ["HTTP 500 rate rises above baseline","Application logs show uncaught exceptions or failed dependencies","Errors may affect one endpoint, tenant or release"],
    [
      {command:"curl -sS -D - -o /dev/null https://<host>/<path>",purpose:"Capture status, response headers and request correlation ID.",expected:"HTTP/1.1 500 or HTTP/2 500 plus trace/request identifier."},
      {command:"Search application logs by request ID and timestamp",purpose:"Find the server-side exception and stack trace for the exact failed request.",expected:"A concrete exception, failed query or downstream response is correlated to the request."},
      {command:"Compare error rate by endpoint, release and dependency",purpose:"Determine whether the issue is broad or isolated to a specific code path.",expected:"A clear correlation to a release, route, tenant or dependency emerges."}
    ],
    ["Unhandled application exception or null/invalid input path","Database query or downstream API failure","Configuration/secret mismatch after deployment","Connection pool or thread exhaustion","Data migration incompatible with application version"],
    ["Capture request IDs and representative logs while protecting personal and secret data.","Check whether the 500s began after a release or infrastructure change.","If release-related, roll back using the approved deployment process after checking database compatibility.","If dependency-related, restore dependency health or use a documented degraded-mode response; avoid retrying unsafe writes blindly."],
    ["Synthetic requests for affected endpoints return expected status and payload.","Error rate returns to baseline and latency is within SLO.","Check transaction integrity and duplicate operations for affected workflows."],
    ["Use structured logs, correlation IDs and exception metrics.","Add contract and migration compatibility tests.","Use timeouts, bulkheads and safe retry semantics for dependencies.","Deploy gradually and monitor per-version error rates."],
    ["Create a local test endpoint that deliberately throws an exception, correlate the request ID with logs, then handle the exception and verify HTTP 200."],
    [{question:"Why is a request ID useful during HTTP 500 investigation?",answer:"It connects a user-visible failure to the exact application logs and distributed traces without relying only on approximate timestamps."},{question:"Should every HTTP 500 be retried?",answer:"No. A failed write may have partially completed. Retry only when the operation is idempotent or protected by an idempotency key."}]
  ),
  "http-502": lesson("HTTP 502 Bad Gateway",
    "A gateway or reverse proxy received an invalid response from an upstream server. Investigate gateway-to-upstream connectivity, protocol, TLS, upstream process health and timeout behavior.",
    "SEV-1","Requests fail at the edge even when the gateway itself is healthy. A subset of upstream instances may cause intermittent errors.",
    "Nginx, ingress controller or cloud load balancer proxying to application backends.",
    ["Clients receive 502 responses from gateway","Gateway logs show upstream reset, premature close or invalid response","Direct backend tests may succeed or fail depending on path"],
    [
      {command:"curl -sv https://<host>/<path> -o /dev/null",purpose:"Capture gateway response and headers.",expected:"HTTP 502 with gateway identification and request timing."},
      {command:"Inspect reverse-proxy/ingress logs for upstream address and error reason",purpose:"Identify which backend failed and whether connection was refused, reset or malformed.",expected:"Logs show upstream host, port and failure detail."},
      {command:"From the gateway network, curl -sv http://<upstream>:<port>/health",purpose:"Test the exact upstream path and protocol from the proxy's network context.",expected:"The backend responds with a valid HTTP response using the configured protocol."}
    ],
    ["Upstream process is down or listening on wrong port","Gateway upstream protocol or TLS settings mismatch","Backend closes connections due to overload or crash","Service discovery points to stale or unhealthy endpoint","Proxy timeout or response framing issue"],
    ["Identify the failing upstream instance and compare healthy peers.","Restore backend process or correct service discovery/port/protocol configuration.","Remove only confirmed unhealthy targets from rotation and preserve enough capacity.","Adjust proxy timeouts only when measured application behavior justifies the change; do not mask a stuck backend."],
    ["Gateway returns expected status and upstream logs show successful requests.","All registered targets are healthy and traffic is balanced.","502 rate and upstream reset metrics return to baseline."],
    ["Use readiness checks and target health gates.","Monitor upstream connect time, response time and reset counts.","Keep proxy/backend protocol configuration tested.","Capacity-test backends and use graceful shutdown/draining."],
    ["In a lab, point Nginx to a stopped test upstream, observe 502 and error logs, start the upstream and verify 200."],
    [{question:"What does 502 indicate?",answer:"The gateway could not obtain a valid response from its upstream. The fault may be in the upstream service or the connection/protocol between proxy and backend."},{question:"Why test the backend from the gateway network?",answer:"A backend reachable from an administrator laptop may still be blocked or misrouted from the proxy's subnet or container network."}]
  ),
  "http-503": lesson("HTTP 503 Service Unavailable",
    "The service or gateway is temporarily unable to handle requests, often because there are no healthy backends, capacity is exhausted or maintenance mode is active.",
    "SEV-1","A large portion of user requests fail. Retry storms can amplify overload and prevent recovery.",
    "Application behind load balancer, ingress or service mesh with health checks and autoscaling.",
    ["HTTP 503 responses rise sharply","Load balancer reports zero healthy targets or ingress has no endpoints","Queue depth, concurrency or resource saturation increases"],
    [
      {command:"Check load balancer target health or ingress/service endpoints",purpose:"Determine whether traffic has any healthy destination.",expected:"At least one healthy backend/endpoint should be registered."},
      {command:"kubectl get endpoints,endpointslices -n <namespace>; kubectl get pods -n <namespace>",purpose:"For Kubernetes, verify ready Pod IPs are published to the Service.",expected:"Ready Pods appear in endpoints; empty endpoints indicate selector or readiness issues."},
      {command:"Inspect request rate, queue depth, CPU, memory and connection pool saturation",purpose:"Identify whether the service is unavailable due to capacity or dependency pressure.",expected:"Metrics show the saturated resource or the absence of healthy backends."}
    ],
    ["All backends fail readiness or are removed from rotation","Traffic spike exceeds capacity","Database or downstream dependency saturation","Maintenance mode or circuit breaker is active","Autoscaling cannot add capacity"],
    ["Protect the remaining healthy capacity and reduce non-essential traffic if approved.","Restore healthy backends by fixing readiness, dependencies or failed deployment.","Scale capacity only after checking downstream limits; adding app instances can overload a database.","Use controlled rollback if a release removed all targets from service."],
    ["At least one healthy backend serves the synthetic request.","503 rate, queue depth and saturation return to normal.","Autoscaling and circuit-breaker behavior stabilize without oscillation."],
    ["Set capacity limits and load-test peak traffic.","Use autoscaling with realistic metrics and warm-up time.","Monitor healthy target count and empty endpoint conditions.","Use bounded retries, backpressure and dependency bulkheads."],
    ["In a test environment, mark all test backends unhealthy, observe 503, restore one healthy backend and verify requests succeed."],
    [{question:"Why can adding more application replicas make 503 worse?",answer:"If the database or another shared dependency is already saturated, more replicas can increase concurrent connections and worsen the bottleneck."},{question:"What is the first thing to check when a load balancer returns 503?",answer:"Check target health and whether any healthy backend is registered, then investigate why targets failed health checks."}]
  ),
  "database-connectivity-failure": lesson("Database Connectivity Failure",
    "An application cannot establish or maintain database connections. Separate network reachability, authentication, TLS, connection exhaustion, database availability and query-level failures.",
    "SEV-1","Transactions fail, request queues grow and applications may return 500/503. Aggressive reconnect loops can overload a recovering database.",
    "Application service connecting to managed or self-hosted relational database through private networking and connection pools.",
    ["Application reports connection refused, timeout or authentication failure","Database connection count reaches configured maximum","Database health or failover events correlate with application errors"],
    [
      {command:"Resolve database hostname and test TCP: getent hosts <db-host>; nc -vz -w 3 <db-host> <db-port>",purpose:"Validate DNS and network path without exposing credentials.",expected:"Hostname resolves and TCP connection succeeds from the application network."},
      {command:"Inspect application pool metrics: active, idle, pending and timeout counts",purpose:"Determine whether the pool is exhausted or connections are leaking.",expected:"Pool metrics show whether all connections are busy or connection creation is failing."},
      {command:"Review database service events, connection limits and authentication logs",purpose:"Check server-side availability, failover, max connections and rejected sessions.",expected:"Database-side evidence confirms availability and the exact rejection or limit."}
    ],
    ["Network/security group path changed","Database endpoint failover or DNS cache stale","Credentials rotated or secret version mismatch","Connection pool leak or max connections reached","Database CPU, storage or connection capacity exhausted"],
    ["Confirm database endpoint, account, port and TLS mode without printing secrets.","Check database health and recent failover/maintenance events.","Restore the network path or update the secret reference through the approved secret manager.","If pool exhaustion is confirmed, reduce concurrency and fix connection lifecycle; do not simply raise max connections without capacity analysis.","Use bounded retry with jitter and avoid restarting every application replica simultaneously."],
    ["Application establishes a connection using the intended identity and TLS settings.","Pool pending count returns to normal and test transaction succeeds.","Database connection count, CPU and latency remain within safe limits."],
    ["Use connection pooling with bounded sizes and timeouts.","Rotate credentials through automated secret refresh.","Monitor database connections, saturation and failover.","Test application behavior during database failover and network interruption."],
    ["Use a local disposable database, stop it to reproduce connection failure, inspect application logs and pool metrics, restart it and verify recovery."],
    [{question:"Why is increasing the connection pool not always the right fix?",answer:"The database has finite connection and memory capacity. A larger pool can increase contention and worsen database saturation if the real problem is slow queries or leaked connections."},{question:"Why use exponential backoff with jitter?",answer:"It spreads reconnect attempts over time and avoids every application instance retrying simultaneously after a database outage."}]
  ),

  "exposed-secrets": lesson("Exposed Secrets",
    "A credential, token, private key or other secret may have been exposed in source control, logs, an artifact, chat or a public endpoint. Treat it as compromised until evidence proves otherwise.",
    "SEV-1","An attacker may access cloud resources, repositories, production systems or customer data. Deleting the visible secret does not invalidate copies already taken.",
    "Production engineering environment using cloud IAM, CI/CD credentials, application secrets and source control.",
    ["Secret appears in a public repository, build log or artifact","Secret-scanning alert identifies a credential pattern","Unexpected authentication or API activity follows exposure"],
    [
      {command:"Record the secret type, exposure location, first/last known exposure time and affected systems without copying the value",purpose:"Scope the incident while preventing further disclosure.",expected:"A sanitized incident record identifies owners, systems and exposure window."},
      {command:"Review provider audit logs for use of the affected identity during the exposure window",purpose:"Determine whether the credential was used unexpectedly.",expected:"Authentication and API events can be correlated to source, action and time."},
      {command:"Search repositories and artifact/log stores using approved secret-scanning tools",purpose:"Find copies and propagation paths without printing secret values.",expected:"All known exposure locations and downstream consumers are identified."}
    ],
    ["Credential committed to a public or broadly accessible repository","Secret printed by CI pipeline or application debug logging","Artifact or container image contains an embedded credential","Access-controlled secret store was misconfigured"],
    ["Declare the incident and notify security/credential owners immediately; do not paste the secret into tickets or chat.","Revoke or rotate the exposed credential at the provider, prioritizing high-privilege credentials; create replacement credentials through the approved secret manager.","Review audit logs for use, persistence, privilege changes and affected resources.","Remove exposed copies from repositories/logs where feasible, but treat the old value as compromised even after history cleanup.","Update workloads and pipelines to consume the new secret, then verify old credentials fail."],
    ["Old credential is revoked and cannot authenticate.","New credential works only for intended workloads and has least privilege.","Audit logs show no continuing suspicious use; affected artifacts and logs are addressed.","Security owner accepts the scope and closure evidence."],
    ["Use secret scanning and push protection.","Never bake secrets into images or source code.","Use short-lived workload identity and least-privilege credentials.","Redact logs and restrict artifact access; rotate secrets on exposure."],
    ["Use a dummy lab token only. Commit it to a private disposable repository, trigger a scanner, revoke it and confirm the old token fails."],
    [{question:"Is deleting a leaked secret from the latest commit enough?",answer:"No. The value may remain in Git history, forks, caches, logs or clones. Revoke/rotate it first, then clean copies and investigate use."},{question:"What is the first priority after confirming a secret leak?",answer:"Contain the credential by revoking or rotating it and assess possible use. Do not delay revocation while attempting repository cleanup."}]
  ),
  "unauthorized-access": lesson("Unauthorized Access",
    "An identity or session accesses a system or resource without approved authorization. Determine whether this is a misconfiguration, compromised account, excessive privilege or policy bypass.",
    "SEV-1","Confidentiality, integrity or availability may be affected. Evidence must be preserved while access is contained.",
    "Cloud account, Linux fleet, Kubernetes cluster or CI/CD platform with centralized identity and audit logging.",
    ["Unexpected successful login or denied access spike","New users, keys, roles or privilege assignments appear","Access originates from unusual source, time or device"],
    [
      {command:"Preserve relevant identity-provider, CloudTrail, Linux auth and Kubernetes audit events",purpose:"Build a time-ordered record of principal, source, action and target.",expected:"Events identify successful and failed access, session IDs and privilege changes."},
      {command:"Identify the principal, session issuer, source IP/device and accessed resources",purpose:"Distinguish legitimate automation from an unknown or compromised identity.",expected:"The activity can be tied to an owner and expected workflow or marked suspicious."},
      {command:"Review recent IAM, group membership, SSH key, token and role changes",purpose:"Find persistence mechanisms and privilege escalation.",expected:"Unexpected credentials or policy changes are identified for containment."}
    ],
    ["Compromised password, token or SSH key","Overly broad role or group membership","Misconfigured trust relationship or public resource policy","Stolen session or persistence credential","Automation identity used outside its intended scope"],
    ["Activate the security incident process and preserve logs before making destructive changes.","Contain the affected identity by disabling sessions, rotating credentials or restricting access according to the response plan.","Remove unauthorized keys, sessions, policies or persistence only after evidence is captured and ownership confirmed.","Review accessed data and actions; involve legal/privacy teams if required.","Restore legitimate access through verified identities and least-privilege roles."],
    ["Suspicious sessions are revoked and unauthorized credentials no longer work.","Expected users and workloads retain approved access.","Audit logs show no new suspicious activity and persistence checks are clean."],
    ["Enforce MFA and short-lived credentials.","Review privileged access and role assignments regularly.","Centralize audit logs with retention and alerting.","Use conditional access and just-in-time privilege elevation."],
    ["In a sandbox account, create a test role with an unexpected permission change, detect it through audit logs, revert the change and validate normal access."],
    [{question:"Why should you preserve logs before deleting an unauthorized account?",answer:"Deleting first can remove context or complicate attribution. Capture identity, session, source and action evidence, then contain using the approved process."},{question:"What is the difference between authentication and authorization?",answer:"Authentication establishes who the principal is. Authorization determines which actions that authenticated principal may perform."}]
  ),
  "suspicious-activity": lesson("Suspicious Activity",
    "Monitoring detects behavior that may indicate reconnaissance, malware, data exfiltration or abuse of a legitimate identity. Validate signals with context before declaring compromise, while preserving evidence.",
    "SEV-1","A false negative can allow persistence or data loss; an uncontrolled response can disrupt critical services. Coordinate security, operations and business owners.",
    "Production cloud and Linux workloads with centralized logs, endpoint telemetry, network flow logs and identity audit trails.",
    ["Unusual outbound traffic, process execution or API calls","Unexpected privilege escalation or authentication pattern","Endpoint or cloud security alert indicates suspicious behavior"],
    [
      {command:"Record alert ID, detection time, affected asset, principal and source/destination metadata",purpose:"Create a stable incident reference and initial scope.",expected:"A sanitized event record is available for correlation."},
      {command:"Correlate identity audit, host process, DNS and network flow events around the detection time",purpose:"Build a timeline across identity, compute and network layers.",expected:"Related actions, processes and destinations form a coherent or disproven hypothesis."},
      {command:"Compare activity with approved deployment, backup, scanning and automation schedules",purpose:"Eliminate known operational activity without dismissing unexplained behavior.",expected:"The event is attributed to an approved owner or escalated as unexplained."}
    ],
    ["Compromised credential or workload identity","Malicious process or persistence mechanism","Misconfigured automation producing unusual traffic","Legitimate scanner or deployment misclassified as suspicious","Data exfiltration or command-and-control behavior"],
    ["Follow the security incident severity and escalation policy; do not investigate alone if active compromise is plausible.","Preserve relevant volatile and durable evidence according to forensic procedures.","Contain affected identity, host or network path using approved isolation controls while considering business impact.","Hunt for related indicators across other assets and credentials.","Eradicate confirmed persistence, restore from trusted sources and rotate affected credentials."],
    ["Security monitoring shows no recurrence of the indicator.","Affected assets pass integrity and vulnerability checks.","Credentials and access paths are rotated or validated.","Security owner approves return to service and incident closure."],
    ["Tune detections with asset and identity context while retaining meaningful coverage.","Centralize time-synchronized logs and protect them from tampering.","Use endpoint protection, egress controls and least privilege.","Run tabletop exercises and validate incident escalation contacts."],
    ["Use synthetic benign indicators in a lab dataset, practice event correlation and write a containment decision; never execute malware or attack production systems."],
    [{question:"Why should suspicious activity be correlated across multiple data sources?",answer:"A single alert may be noisy or incomplete. Identity, process, DNS and network events together help establish scope, intent and whether the behavior is legitimate."},{question:"Should an engineer immediately shut down a suspicious production server?",answer:"Not automatically. Follow the incident response plan and security lead's direction; isolation may be safer than shutdown because volatile evidence and business-critical services can be lost."}]
  )
};


/**
 * Provides a complete, safe first-response lab for newly catalogued scenarios.
 * Existing hand-authored lessons always take precedence.
 */
export function getIncidentLesson(
  slug: string,
  topic: string,
  categoryName: string,
  subcategoryName: string,
): IncidentLesson {
  const existing = incidentLessons[slug];
  if (existing) return existing;

  const domain = categoryName.replace(/ Incidents?$/i, "");
  const lower = `${categoryName} ${subcategoryName} ${topic}`.toLowerCase();
  let commands: IncidentCommand[] = [
    { command: "date -Is; hostname; uptime", purpose: "Timestamp the exercise and record the host's basic health before changing anything.", expected: "A timestamp, host identity and current load are captured for the incident timeline." },
    { command: "journalctl --since '-15 min' --no-pager | tail -80", purpose: "Review recent system events around the reported symptom.", expected: "Recent warnings and errors can be correlated with the incident start time." },
    { command: "ss -s; df -h; free -h", purpose: "Check basic socket, filesystem and memory pressure indicators.", expected: "A compact baseline helps rule out common host-level resource constraints." },
  ];

  if (lower.includes("kubernetes") || lower.includes("pod") || lower.includes("kube") || lower.includes("eks")) {
    commands = [
      { command: "kubectl get nodes -o wide", purpose: "Check node readiness and identify affected worker nodes.", expected: "Nodes show Ready status or expose the node with a scheduling or health issue." },
      { command: "kubectl get pods -A -o wide", purpose: "Find affected workloads, restart counts, placement and current pod states.", expected: "The failing namespace, pod and node are visible without modifying the cluster." },
      { command: "kubectl get events -A --sort-by=.lastTimestamp", purpose: "Read recent scheduler, kubelet, image, volume and networking events.", expected: "Events provide timestamped evidence such as FailedMount, BackOff or FailedScheduling." },
      { command: "kubectl describe pod <pod> -n <namespace>", purpose: "Inspect conditions, container state, probes, mounts and recent events for the selected pod.", expected: "The describe output narrows the failure to a specific dependency or lifecycle stage." },
      { command: "kubectl logs <pod> -n <namespace> --all-containers --tail=100", purpose: "Read recent application logs from the affected workload.", expected: "Logs show the application-side error or confirm that failure occurs before startup." },
    ];
  } else if (lower.includes("docker") || lower.includes("container") || lower.includes("image") || lower.includes("volume")) {
    commands = [
      { command: "docker ps -a --no-trunc", purpose: "Inspect container state, exit status and restart behavior.", expected: "The affected container and its current lifecycle state are identified." },
      { command: "docker inspect <container>", purpose: "Read exit code, health status, mounts, network settings and configured limits.", expected: "Inspect metadata reveals the exact runtime configuration without changing it." },
      { command: "docker logs --timestamps --tail 150 <container>", purpose: "Correlate container output with the incident start time.", expected: "Recent logs expose startup, dependency or runtime errors when the process emitted them." },
      { command: "docker stats --no-stream", purpose: "Check current CPU and memory consumption across running containers.", expected: "Resource usage helps identify pressure or an outlier container." },
    ];
  } else if (lower.includes("database") || lower.includes("postgres") || lower.includes("mysql") || lower.includes("mongo") || lower.includes("sql") || lower.includes("replication")) {
    commands = [
      { command: "date -Is; uptime; df -h", purpose: "Record timing and check host load and storage capacity.", expected: "The baseline shows whether host pressure or a full filesystem may affect the database." },
      { command: "ss -lntp", purpose: "Check whether the expected database listener is bound and accepting connections.", expected: "The listener state and port are visible; absence may indicate service or bind failure." },
      { command: "systemctl status <database-service> --no-pager", purpose: "Inspect service state and recent failure reason.", expected: "The service manager reports active, failed or restarting state." },
      { command: "journalctl -u <database-service> --since '-20 min' --no-pager", purpose: "Review database service logs around the failure window.", expected: "Database errors, resource warnings or recovery messages are available for analysis." },
    ];
  } else if (lower.includes("dns") || lower.includes("network") || lower.includes("routing") || lower.includes("tls") || lower.includes("certificate") || lower.includes("connection") || lower.includes("firewall") || lower.includes("port")) {
    commands = [
      { command: "ip route; ip addr", purpose: "Inspect local interfaces and route selection.", expected: "The source interface, address and expected next hop are visible." },
      { command: "getent hosts <hostname>; dig <hostname>", purpose: "Compare system name resolution with DNS response details.", expected: "Resolved addresses and DNS status help isolate name-resolution failures." },
      { command: "ss -lntup", purpose: "Inspect local listening sockets and transport endpoints.", expected: "The expected service port is listening or its absence is confirmed." },
      { command: "curl -vk --connect-timeout 5 https://<endpoint>/health", purpose: "Test connection, TLS negotiation and HTTP response from the lab client.", expected: "The verbose trace separates DNS, TCP, TLS and application-layer failure." },
    ];
  } else if (lower.includes("aws") || lower.includes("ec2") || lower.includes("iam") || lower.includes("vpc") || lower.includes("s3") || lower.includes("load balancer") || lower.includes("cloud")) {
    commands = [
      { command: "aws sts get-caller-identity", purpose: "Confirm which AWS identity the diagnostic session is using.", expected: "Account and principal identity are known before interpreting access errors." },
      { command: "aws ec2 describe-instance-status --include-all-instances", purpose: "Read EC2 instance and system status checks where applicable.", expected: "Status checks distinguish guest OS issues from underlying host or reachability problems." },
      { command: "aws cloudwatch describe-alarms --state-value ALARM", purpose: "Review active CloudWatch alarms for related resources.", expected: "Alarm names and states help establish scope and incident timing." },
      { command: "aws cloudtrail lookup-events --max-results 20", purpose: "Review recent control-plane activity for relevant changes.", expected: "Recent API events can identify a configuration or identity change; access depends on permissions." },
    ];
  } else if (lower.includes("prometheus") || lower.includes("grafana") || lower.includes("monitor") || lower.includes("alert") || lower.includes("logging") || lower.includes("trace")) {
    commands = [
      { command: "systemctl status prometheus --no-pager", purpose: "Check collector service state where Prometheus is self-managed.", expected: "Service status confirms whether the collector is running or failing." },
      { command: "curl -fsS http://localhost:9090/-/ready", purpose: "Check the local Prometheus readiness endpoint in a lab environment.", expected: "A successful readiness response indicates the server is ready to serve requests." },
      { command: "curl -fsS http://localhost:9090/api/v1/targets", purpose: "Inspect scrape target health and scrape error details.", expected: "Target health distinguishes collection failures from dashboard presentation issues." },
      { command: "journalctl -u prometheus --since '-20 min' --no-pager", purpose: "Correlate collector logs with the alert or missing-metrics window.", expected: "Recent logs expose scrape, storage or configuration errors." },
    ];
  } else if (lower.includes("kafka") || lower.includes("rabbitmq") || lower.includes("redis") || lower.includes("queue") || lower.includes("message") || lower.includes("event") || lower.includes("webhook")) {
    commands = [
      { command: "ss -lntp", purpose: "Confirm the expected broker or cache listener is present.", expected: "The listener and configured port are visible for follow-up checks." },
      { command: "systemctl status <broker-service> --no-pager", purpose: "Inspect broker service health where it is self-managed.", expected: "Service state and recent failure information are recorded." },
      { command: "journalctl -u <broker-service> --since '-20 min' --no-pager", purpose: "Review broker logs for connection, disk, leader or queue errors.", expected: "Logs provide evidence for broker-side failure versus client-side problems." },
      { command: "df -h; free -h; uptime", purpose: "Check broker host capacity and saturation.", expected: "Disk, memory and load constraints can be correlated with backlog or availability symptoms." },
    ];
  }

  return lesson(
    topic,
    `A simulated ${topic} incident affecting the ${domain} domain. Work through detection, evidence collection, fault isolation and controlled recovery. Treat every command as a read-only diagnostic example unless the step explicitly says otherwise; replace placeholders with values from the disposable lab environment.`,
    /down|unavailable|corruption|security|unauthorized|compromise|full|failure/i.test(topic) ? "SEV-2" : "SEV-3",
    `Users or dependent services may experience degraded availability, failed operations, delayed processing or reduced reliability. Establish the affected scope, start time and business impact before selecting a severity; the suggested training severity is not a production classification.`,
    `Disposable ${domain} training environment with synthetic workloads, sample telemetry and no connection to production credentials or infrastructure.`,
    [`Monitoring or a user report indicates ${topic.toLowerCase()}.`, "The symptom is reproducible for at least one test request or synthetic workload.", "A dependent service or workflow reports errors, delays or degraded health."],
    commands,
    [`A recent configuration, release or infrastructure change affected ${topic.toLowerCase()}.`, "A dependency, identity, network path or external service became unavailable.", "Capacity, resource limits or workload growth exceeded the tested operating range.", "A transient platform fault or an incorrect health signal obscured the real failure."],
    ["Declare the training incident, record the timestamp and identify the affected service boundary.","Preserve command output, relevant logs, metrics and recent change history before remediation.","Choose the narrowest reversible mitigation in the disposable lab; avoid broad restarts or destructive cleanup.","If the exercise models a bad release, use the documented rollback path and record the exact version change.","Escalate to the owning platform or service team when evidence points outside the current boundary."],
    ["Repeat the original failing test and confirm the expected successful result.","Check service health, error rate, latency and dependent workflow completion.","Confirm no new critical events or resource saturation appear during the observation window.","Record the recovery timestamp and the evidence used to close the exercise."],
    ["Add a detection signal tied to user impact and a clear runbook link.","Add regression, load or failure-mode tests for the identified trigger.","Document ownership, escalation boundaries, rollback criteria and recovery verification.","Review capacity, access, dependency and configuration drift on a regular schedule."],
    [`In an isolated lab, introduce a reversible fault that reproduces ${topic.toLowerCase()} using synthetic data only.`, "Capture the initial symptom, execute the read-only investigation commands and identify the most likely failure boundary.","Apply one controlled remediation, rerun the same test and compare before/after evidence.","Write a concise incident timeline, root cause statement and one preventive action."],
    [{ question: "Why do we collect evidence before remediation?", answer: "A restart or configuration change can erase the failure state and make the root cause harder to prove. Timestamped logs, metrics, events and command output preserve a defensible incident timeline." }, { question: "How do you know the incident is really resolved?", answer: "The original failing user journey must pass, service health and dependent workflows must recover, and telemetry must remain stable through an observation period. A green process status alone is not enough." }]
  );
}
