
export interface ZombieCommand {
  title: string;
  command: string;
  purpose: string;
  interpretation: string;
}

export interface ZombieStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands?: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface ZombieRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface ZombieIncident {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxZombieRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  objective: string;
  symptoms: string[];
  businessImpact: string[];
  rootCauses: string[];
  diagnosticCommands: ZombieCommand[];
  troubleshootingSteps: ZombieStep[];
  rootCauseScenarios: ZombieRootCause[];
  incidentScenario: ZombieIncident;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxZombieProcesses: LinuxZombieRunbook = {
  id: "linux-zombie-processes",
  title: "Zombie Processes Consuming Process Table Entries",
  category: "Linux Troubleshooting",
  severity: "Low / Medium / High / Critical",

  summary:
    "A zombie process is a process that has finished execution but still has an entry " +
    "in the process table because its parent has not collected its exit status using " +
    "wait(), waitpid(), or an equivalent mechanism. Zombies do not execute instructions " +
    "and normally consume very little memory, but large numbers can exhaust process-table " +
    "entries or contribute to PID exhaustion in extreme situations.",

  objective:
    "Identify zombie processes, determine which parent process is failing to reap them, " +
    "restore reliable process management, and prevent recurring zombie accumulation.",

  symptoms: [
    "The process listing contains processes marked Z or <defunct>.",
    "The zombie process count increases over time.",
    "A service repeatedly creates child processes but does not collect their exit statuses.",
    "New process creation may fail if the system reaches a process or PID limit.",
    "A container reports process-creation errors.",
    "Application logs contain fork, spawn, or resource-unavailable errors.",
    "A service's process-management logic becomes unstable under heavy workloads.",
  ],

  businessImpact: [
    "Large zombie populations can consume process-table entries.",
    "Severe process or PID exhaustion can prevent new processes from starting.",
    "Application workers, scheduled jobs, and service restarts may fail.",
    "Repeated child-process failures can degrade service reliability.",
    "Operational troubleshooting becomes harder when zombie accumulation is ignored.",
  ],

  rootCauses: [
    "A parent process fails to call wait() or waitpid() after child processes exit.",
    "Application code mishandles child-process exit events.",
    "A custom worker manager does not reap completed subprocesses.",
    "Signal handling is incorrect or interrupted by application logic.",
    "A shell script launches background processes without proper lifecycle management.",
    "A supervisor or application has a process-management bug.",
    "A software defect becomes visible only under high concurrency.",
  ],

  diagnosticCommands: [
    {
      title: "1. List zombie processes",
      command: "ps -eo pid,ppid,stat,etime,comm,args | awk '$3 ~ /^Z/'",
      purpose:
        "Display processes whose state begins with Z, including their PID and parent PID.",
      interpretation:
        "A Z state indicates a zombie. The PPID helps identify the parent responsible for collecting the child's exit status. Review the actual output before taking action.",
    },
    {
      title: "2. Count zombie processes",
      command: "ps -eo stat= | awk '$1 ~ /^Z/ { count++ } END { print count+0 }'",
      purpose:
        "Count processes in zombie state.",
      interpretation:
        "Compare the count over time. A small, stable count is not automatically an incident; a steadily growing count deserves investigation.",
    },
    {
      title: "3. Inspect process hierarchy",
      command: "ps -eo pid,ppid,stat,comm,args --forest",
      purpose:
        "Display a process tree to help trace child processes back to their parents.",
      interpretation:
        "Locate the zombie and identify the parent PID. The parent usually needs to collect the child's exit status.",
    },
    {
      title: "4. Inspect a specific process",
      command: "ps -p <PID> -o pid,ppid,stat,lstart,etime,comm,args",
      purpose:
        "Show details for a process under investigation.",
      interpretation:
        "Replace <PID> with the actual numeric process ID. Check the state, parent PID, and elapsed time.",
    },
    {
      title: "5. Inspect the parent process",
      command: "ps -p <PPID> -o pid,ppid,stat,%cpu,%mem,etime,comm,args",
      purpose:
        "Inspect the parent responsible for reaping the child.",
      interpretation:
        "Replace <PPID> with the actual parent PID. Check whether the parent is alive, blocked, unhealthy, or repeatedly spawning children.",
    },
    {
      title: "6. Inspect parent process details",
      command: "cat /proc/<PPID>/status",
      purpose:
        "Read the parent's Linux process status information.",
      interpretation:
        "Replace <PPID> with the real parent PID. Inspect state, thread count, and other available process details. Access may be restricted by system permissions.",
    },
    {
      title: "7. Review service logs",
      command: "sudo journalctl -u myapp.service --since '-30 min' --no-pager",
      purpose:
        "Find child-process failures, worker errors, restarts, or process-management warnings.",
      interpretation:
        "Replace myapp.service with the real unit. Correlate log events with the increase in zombie count.",
    },
    {
      title: "8. Check service health",
      command: "systemctl status myapp.service --no-pager -l",
      purpose:
        "Inspect service status, recent failures, and restart activity.",
      interpretation:
        "An active service can still have a child-process management bug. Review logs and the process tree.",
    },
    {
      title: "9. Inspect process limits",
      command: "ulimit -u",
      purpose:
        "Display the current shell's maximum user-process limit where supported.",
      interpretation:
        "This limit is not a direct zombie count and may not represent the affected service's effective limits. Check the service user, cgroup PID limits, and system configuration too.",
    },
    {
      title: "10. Inspect system PID capacity",
      command: "cat /proc/sys/kernel/pid_max",
      purpose:
        "Read the system-wide PID allocation range limit.",
      interpretation:
        "This is not the number of currently available process slots. Inspect actual process counts and cgroup limits when investigating PID exhaustion.",
    },
    {
      title: "11. Inspect cgroup PID usage",
      command: "cat /sys/fs/cgroup/pids.current; cat /sys/fs/cgroup/pids.max",
      purpose:
        "On cgroup v2 systems, inspect current PID usage and the configured PID limit for the current cgroup.",
      interpretation:
        "Paths and values depend on cgroup layout. For a container or service, inspect its actual cgroup rather than assuming the current shell is in the same cgroup.",
    },
    {
      title: "12. Review kernel messages",
      command: "sudo journalctl -k --since '-30 min' --no-pager",
      purpose:
        "Look for process-creation failures or related kernel messages.",
      interpretation:
        "Correlate relevant errors with the time zombie counts increased. Not every zombie accumulation produces an explicit kernel warning.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Confirm that zombie processes exist",
      objective:
        "Distinguish zombies from running, sleeping, or stopped processes.",
      actions: [
        "List process states and identify entries marked Z or <defunct>.",
        "Count zombies and record the current timestamp.",
        "Repeat the count after a suitable interval to determine whether the number is increasing.",
        "Check whether the application is experiencing a user-visible impact.",
      ],
      commands: [
        "ps -eo pid,ppid,stat,etime,comm,args | awk '$3 ~ /^Z/'",
        "ps -eo stat= | awk '$1 ~ /^Z/ { count++ } END { print count+0 }'",
      ],
      expectedResult:
        "Zombie processes are confirmed, and their count and trend are documented.",
      precautions: [
        "Do not assume every zombie indicates a production outage.",
      ],
    },
    {
      step: 2,
      title: "Identify the parent PID",
      objective:
        "Find which process is responsible for collecting the zombie's exit status.",
      actions: [
        "Record the zombie PID and PPID.",
        "Inspect the parent process details.",
        "Inspect the process hierarchy to understand how the child was created.",
        "Determine whether multiple zombies share the same parent.",
      ],
      commands: [
        "ps -eo pid,ppid,stat,comm,args --forest",
        "ps -p <PPID> -o pid,ppid,stat,etime,comm,args",
      ],
      expectedResult:
        "The responsible parent process or process manager is identified.",
      precautions: [
        "Replace placeholders with actual numeric process IDs.",
        "PIDs can be reused after a process exits; verify the current process identity before taking action.",
      ],
    },
    {
      step: 3,
      title: "Check the parent process health",
      objective:
        "Determine why the parent is not reaping completed children.",
      actions: [
        "Check whether the parent is running normally.",
        "Review CPU, memory, and process state.",
        "Inspect application logs for child-process or signal-handling errors.",
        "Determine whether the parent is blocked, overloaded, or stuck in a wait operation.",
        "Check whether the problem started after a recent deployment.",
      ],
      commands: [
        "ps -p <PPID> -o pid,ppid,stat,%cpu,%mem,etime,comm,args",
        "sudo journalctl -u myapp.service --since '-30 min' --no-pager",
      ],
      expectedResult:
        "Evidence identifies whether the parent is unhealthy or its process-management logic is defective.",
    },
    {
      step: 4,
      title: "Check for process or PID exhaustion",
      objective:
        "Determine whether zombie accumulation is preventing new processes from being created.",
      actions: [
        "Check application logs for fork or spawn failures.",
        "Inspect current process counts and effective service limits.",
        "Check the relevant cgroup PID usage and maximum.",
        "Determine whether failures affect one service, one container, or the whole host.",
      ],
      commands: [
        "ps -e --no-headers | wc -l",
        "cat /proc/sys/kernel/pid_max",
        "cat /sys/fs/cgroup/pids.current",
        "cat /sys/fs/cgroup/pids.max",
      ],
      expectedResult:
        "Process exhaustion is confirmed or ruled out using relevant limits and error evidence.",
      precautions: [
        "The cgroup commands shown assume cgroup v2 and the current shell's cgroup.",
        "A system-wide PID maximum is not the same as a service's PID limit.",
      ],
    },
    {
      step: 5,
      title: "Choose a safe remediation",
      objective:
        "Restore process lifecycle management without causing an unnecessary outage.",
      actions: [
        "If the parent is a custom application, correct its child-reaping logic.",
        "If a known software defect is responsible, apply a reviewed patch or approved rollback.",
        "If immediate mitigation is required, assess a controlled restart of the responsible service.",
        "Confirm the service's restart impact, redundancy, and recovery procedure first.",
        "Capture logs and process information before changing the service.",
      ],
      expectedResult:
        "The parent resumes proper child-process handling or the affected process tree is safely replaced.",
      precautions: [
        "Sending SIGKILL to a zombie itself will not remove it because the process has already exited.",
        "Do not kill arbitrary parent processes without understanding their role and impact.",
        "A parent restart may cause its orphaned children to be adopted and reaped, but behavior depends on the process tree and init/subreaper implementation.",
      ],
    },
    {
      step: 6,
      title: "Fix the application process-management logic",
      objective:
        "Prevent completed child processes from remaining unreaped.",
      actions: [
        "Ensure child exit events are handled by the application runtime.",
        "Use wait(), waitpid(), or the language runtime's equivalent where appropriate.",
        "Handle SIGCHLD correctly when writing native process-management code.",
        "Avoid conflicting signal handlers that prevent child exit statuses from being collected.",
        "Add tests for normal exit, failed exit, rapid child creation, and concurrent subprocesses.",
      ],
      expectedResult:
        "Completed children are consistently reaped, including under concurrency and error conditions.",
      precautions: [
        "Signal-handling and subprocess changes should be tested in a non-production environment before release.",
      ],
    },
    {
      step: 7,
      title: "Verify recovery",
      objective:
        "Confirm that the zombie population is stable or decreasing and that process creation works normally.",
      actions: [
        "Repeat the zombie count at regular intervals.",
        "Check whether new zombies appear after the mitigation.",
        "Verify that the application can create and complete new child processes.",
        "Check service health, logs, and user-facing requests.",
        "Confirm that process-limit errors have stopped.",
      ],
      commands: [
        "ps -eo stat= | awk '$1 ~ /^Z/ { count++ } END { print count+0 }'",
        "systemctl status myapp.service --no-pager -l",
      ],
      expectedResult:
        "The zombie count no longer grows unexpectedly, process creation works, and the service is healthy.",
    },
    {
      step: 8,
      title: "Prevent recurrence",
      objective:
        "Improve process lifecycle management and alerting.",
      actions: [
        "Add regression tests for child-process handling.",
        "Monitor zombie count and its rate of change.",
        "Alert on process-limit errors and repeated service restarts.",
        "Review application changes that create subprocesses.",
        "Document the root cause, mitigation, and permanent corrective action.",
      ],
      expectedResult:
        "The service has a repeatable prevention plan and clear operational ownership.",
    },
  ],

  rootCauseScenarios: [
    {
      cause: "Parent application does not reap children",
      symptoms: [
        "Zombie processes share one parent PID.",
        "The zombie count increases after child jobs finish.",
        "The parent remains running.",
      ],
      investigation: [
        "Inspect PPIDs and process hierarchy.",
        "Review application subprocess and signal-handling logic.",
        "Correlate zombie creation with application logs.",
      ],
      resolution: [
        "Fix the application's child-reaping logic.",
        "Add tests covering concurrent subprocess completion.",
        "Deploy the fix through the approved release process.",
      ],
    },
    {
      cause: "A shell script mishandles background jobs",
      symptoms: [
        "Zombies appear after scheduled scripts run.",
        "The issue correlates with background commands or repeated job execution.",
      ],
      investigation: [
        "Inspect the script and its child-process lifecycle.",
        "Review cron or systemd timer logs.",
        "Identify which process is the parent of the zombies.",
      ],
      resolution: [
        "Use appropriate wait handling for background jobs.",
        "Avoid uncontrolled subprocess creation.",
        "Test script completion and failure paths.",
      ],
    },
    {
      cause: "Container or service reaches its PID limit",
      symptoms: [
        "New process creation fails.",
        "A container or service reports resource-unavailable errors.",
        "The parent process has accumulated many child processes or zombies.",
      ],
      investigation: [
        "Inspect the relevant cgroup PID usage and maximum.",
        "Identify the process responsible for creating children.",
        "Check service and container logs.",
      ],
      resolution: [
        "Address the process leak or zombie-reaping defect.",
        "Adjust the PID limit only when justified by capacity and security requirements.",
        "Verify that process creation succeeds after remediation.",
      ],
    },
    {
      cause: "Parent process is unhealthy",
      symptoms: [
        "Zombie processes share an unresponsive or malfunctioning parent.",
        "Application logs show stalled worker management.",
        "The issue begins after a software change or resource pressure event.",
      ],
      investigation: [
        "Inspect the parent's state and resource consumption.",
        "Review service logs and recent deployments.",
        "Determine whether the parent is blocked or unable to handle child exits.",
      ],
      resolution: [
        "Resolve the parent process's underlying issue.",
        "Use a controlled service restart only when approved and appropriate.",
        "Fix the underlying defect to prevent another accumulation.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative scenario: a Linux server runs a worker service that launches subprocesses to process queued jobs.",

    incident:
      "The worker service begins accumulating zombie processes during a high-volume job period.",

    impact: [
      "The zombie count increases steadily.",
      "Some new worker processes fail to start after the service reaches its PID limit.",
      "Queue processing slows and job completion time increases.",
    ],

    investigation: [
      "The engineer lists zombie processes and finds that many share the same parent PID.",
      "The parent belongs to the worker service.",
      "Application logs show child jobs finishing without corresponding exit-status collection.",
      "The service's cgroup PID usage approaches its configured limit.",
    ],

    rootCause:
      "The worker's subprocess-management code does not reliably collect child exit statuses under concurrency. This scenario is illustrative.",

    resolution: [
      "The team captures diagnostic evidence and applies an approved mitigation.",
      "The affected service is recovered using its documented restart procedure if required.",
      "The subprocess-management defect is corrected.",
      "Tests verify that completed children are reaped under concurrent workloads.",
    ],

    prevention: [
      "Add regression tests for subprocess lifecycle management.",
      "Monitor zombie count and cgroup PID utilization.",
      "Alert on process-creation failures.",
      "Review worker concurrency and subprocess cleanup behavior.",
    ],
  },

  verification: [
    "Zombie process count is stable or returns to the expected baseline.",
    "No unexpected increase in zombies occurs during representative workload.",
    "The parent service is healthy.",
    "New child processes start and exit successfully.",
    "Process-limit errors are no longer observed.",
    "Queue processing or application response times recover.",
    "Monitoring remains stable after the mitigation.",
  ],

  prevention: [
    "Use reliable subprocess APIs and correctly collect child exit statuses.",
    "Handle SIGCHLD appropriately in native applications.",
    "Test child processes that exit successfully, fail, or exit concurrently.",
    "Review shell scripts that create background processes.",
    "Monitor zombie count and cgroup PID utilization.",
    "Alert on fork failures and repeated worker restarts.",
    "Review PID limits and capacity requirements.",
    "Include process-lifecycle checks in application code reviews.",
  ],

  monitoring: [
    "Zombie process count and rate of increase.",
    "Total process count and thread count.",
    "Cgroup PID usage compared with its maximum.",
    "Application fork or spawn failures.",
    "Parent process health and restart count.",
    "Worker queue depth and job completion time.",
    "Service logs containing child-process or signal-handling errors.",
  ],

  safetyRules: [
    "Zombie processes have already exited; SIGKILL cannot make a zombie execute or terminate again.",
    "Identify the parent PID before choosing a remediation.",
    "Do not kill PID 1 or an arbitrary parent process as a routine cleanup step.",
    "A restart can affect active jobs and connections; assess impact first.",
    "Do not increase PID limits without understanding the cause and capacity implications.",
    "Preserve diagnostic logs before restarting a failing service.",
    "Use approved change control for production process-management changes.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time detected:",
    "Affected host or container:",
    "Affected service:",
    "Zombie count at detection:",
    "Zombie count trend:",
    "Zombie PIDs and parent PIDs:",
    "Process or cgroup PID limits:",
    "Application impact:",
    "Confirmed root cause:",
    "Mitigation applied:",
    "Recovery verification:",
    "Permanent fix:",
    "Owner and target date:",
  ],

  troubleshootingChecklist: [
    "Confirmed process state is Z or <defunct>.",
    "Recorded zombie count and trend.",
    "Identified the responsible parent PID.",
    "Inspected parent process health and logs.",
    "Checked process limits and cgroup PID usage.",
    "Captured diagnostic evidence before remediation.",
    "Applied an approved mitigation.",
    "Verified new child processes can start and exit normally.",
    "Confirmed the zombie count is no longer growing unexpectedly.",
    "Documented preventive actions.",
  ],
};

export default linuxZombieProcesses;
