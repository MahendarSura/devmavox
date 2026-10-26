

export interface CronCommand {
  title: string;
  command: string;
  purpose: string;
  expectedResult: string;
}

export interface CronStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface CronRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface CronIncident {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxCronRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  objective: string;
  symptoms: string[];
  rootCauses: string[];
  diagnosticCommands: CronCommand[];
  troubleshootingSteps: CronStep[];
  rootCauseScenarios: CronRootCause[];
  incidentScenario: CronIncident;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxCronJobNotExecuting: LinuxCronRunbook = {
  id: "linux-cron-job-not-executing",
  title: "Linux Cron Job Not Executing",
  category: "Linux Troubleshooting",
  severity: "Medium / High / Critical",

  summary:
    "A cron job may fail to execute because the cron service is stopped, the schedule is incorrect, " +
    "the script lacks permissions, environment variables are missing, paths are incorrect, " +
    "or the job fails without logging its output. Diagnose the scheduler and the command separately.",

  objective:
    "Identify why a scheduled task is not running or completing successfully, restore reliable execution, " +
    "and add logging and monitoring to detect future failures.",

  symptoms: [
    "A scheduled backup does not run.",
    "A cleanup script leaves old files behind.",
    "An application task runs manually but fails under cron.",
    "A report or database export is missing.",
    "A cron job runs at an unexpected time.",
    "A script starts but does not finish.",
    "No output or error message is available.",
    "The job runs as the wrong user or cannot access required files.",
    "The same job runs more than once or overlaps with a previous run.",
  ],

  rootCauses: [
    "The cron service is stopped or unhealthy.",
    "The cron expression is incorrect.",
    "The job is installed in the wrong user's crontab.",
    "The script path or working directory is incorrect.",
    "The script is not executable or its interpreter is missing.",
    "Cron uses a limited environment and PATH.",
    "Required environment variables are unavailable.",
    "File permissions or ownership prevent access.",
    "The command depends on an unavailable network, mount, or service.",
    "The job fails but stdout and stderr are not captured.",
    "Timezone differences cause the job to run at an unexpected time.",
    "The task takes longer than its interval and overlapping executions occur.",
    "Access-control policies or cron allow/deny rules prevent execution.",
  ],

  diagnosticCommands: [
    {
      title: "1. Check the cron service",
      command: "systemctl status cron --no-pager -l",
      purpose: "Check whether the cron daemon is active on Debian or Ubuntu.",
      expectedResult:
        "The service is active and its logs show no relevant startup errors. On other distributions the service may be named crond.",
    },
    {
      title: "2. Check the current user's crontab",
      command: "crontab -l",
      purpose: "List scheduled jobs for the current user.",
      expectedResult:
        "The expected job and schedule are present under the intended user.",
    },
    {
      title: "3. Check root's crontab",
      command: "sudo crontab -l",
      purpose: "Inspect root's scheduled jobs when the task is expected to run as root.",
      expectedResult:
        "The expected job appears in root's crontab if root is the intended owner.",
    },
    {
      title: "4. Inspect cron logs on systemd systems",
      command: "sudo journalctl -u cron --since '-1 hour' --no-pager",
      purpose: "Find scheduler messages and evidence of job dispatch.",
      expectedResult:
        "Logs show whether the daemon started and whether the job was dispatched, depending on system logging configuration.",
    },
    {
      title: "5. Inspect cron logs on RHEL-like systems",
      command: "sudo journalctl -u crond --since '-1 hour' --no-pager",
      purpose: "Review cron daemon messages on systems using crond.",
      expectedResult:
        "Relevant scheduler messages are visible if the service and journal logging are configured.",
    },
    {
      title: "6. Check traditional cron log files",
      command: "sudo grep -i cron /var/log/syslog",
      purpose: "Search cron-related messages on systems that log to syslog.",
      expectedResult:
        "Relevant job execution records may appear. The log location differs by distribution.",
    },
    {
      title: "7. Check script permissions",
      command: "ls -l /opt/scripts/backup.sh",
      purpose: "Inspect file ownership and permission bits.",
      expectedResult:
        "The intended cron user can read the script and execute it when direct execution is required.",
    },
    {
      title: "8. Check the interpreter",
      command: "head -n 1 /opt/scripts/backup.sh",
      purpose: "Inspect the script's shebang line.",
      expectedResult:
        "The interpreter path exists and is valid for the script.",
    },
    {
      title: "9. Check command locations",
      command: "command -v bash; command -v python3; command -v tar",
      purpose: "Find executable paths in the current diagnostic shell.",
      expectedResult:
        "The required executables are located. Configure explicit paths or PATH for cron rather than assuming this shell's environment is identical.",
    },
    {
      title: "10. Check system time and timezone",
      command: "timedatectl",
      purpose: "Inspect the system clock and configured timezone.",
      expectedResult:
        "The clock and timezone are understood and match the expected schedule.",
    },
    {
      title: "11. Inspect cron access rules",
      command: "sudo ls -l /etc/cron.allow /etc/cron.deny",
      purpose: "Check whether cron access-control files exist.",
      expectedResult:
        "Access restrictions are reviewed if the user cannot install or run cron jobs. Missing files may be normal.",
    },
    {
      title: "12. Inspect the cron environment",
      command: "env",
      purpose: "Review environment variables in a shell for comparison with the cron environment.",
      expectedResult:
        "The output helps identify dependencies, but the interactive shell environment is not the same as cron's environment.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Confirm the expected schedule and impact",
      objective: "Establish what should run and when.",
      actions: [
        "Record the job command, intended user, and expected execution time.",
        "Determine whether the job never starts, starts but fails, or completes without the expected result.",
        "Check when the issue began and whether a recent deployment changed the script.",
        "Confirm whether the job is business-critical, such as a backup or data-processing task.",
      ],
      commands: [
        "date",
        "timedatectl",
        "crontab -l",
      ],
      expectedResult:
        "The expected execution time, job owner, and failure symptoms are documented.",
    },
    {
      step: 2,
      title: "Check the cron daemon",
      objective: "Verify that the scheduler is running.",
      actions: [
        "Identify the distribution and cron service name.",
        "Inspect the service state and recent logs.",
        "If stopped, determine why before starting it.",
        "Follow the approved service recovery procedure.",
      ],
      commands: [
        "systemctl status cron --no-pager -l",
        "systemctl status crond --no-pager -l",
      ],
      expectedResult:
        "The correct cron daemon is running and able to dispatch jobs.",
      precautions: [
        "The service name varies by Linux distribution.",
        "Do not assume both cron and crond are installed.",
      ],
    },
    {
      step: 3,
      title: "Verify the crontab entry",
      objective: "Ensure the job is scheduled for the intended user and time.",
      actions: [
        "List the relevant user's crontab.",
        "Check the system crontab or /etc/cron.d entry if applicable.",
        "Verify that the command is on the correct line and that fields are separated correctly.",
        "Check that the user specified in /etc/cron.d or /etc/crontab is valid.",
      ],
      commands: [
        "crontab -l",
        "sudo crontab -l",
        "sudo cat /etc/crontab",
      ],
      expectedResult:
        "The job exists in the intended scheduling location and is syntactically correct.",
      precautions: [
        "Do not replace an entire production crontab with a single example entry.",
        "Back up existing schedules before editing them.",
      ],
    },
    {
      step: 4,
      title: "Validate the cron expression",
      objective: "Confirm that the job's schedule matches the intended time.",
      actions: [
        "Review minute, hour, day-of-month, month, and day-of-week fields.",
        "Check the interaction between day-of-month and day-of-week according to the cron implementation.",
        "Confirm timezone expectations.",
        "Verify whether the job should run on weekends or month boundaries.",
      ],
      commands: [
        "date",
        "timedatectl",
        "crontab -l",
      ],
      expectedResult:
        "The schedule matches the required execution frequency and timezone.",
      precautions: [
        "Cron implementations differ; validate special syntax against the installed implementation.",
      ],
    },
    {
      step: 5,
      title: "Test the command manually as the correct user",
      objective: "Separate script failures from scheduler failures.",
      actions: [
        "Run the command under the same user that owns the cron job.",
        "Use the intended working directory when the script relies on relative paths.",
        "Capture stdout and stderr during the test.",
        "Check exit status and confirm the expected output was produced.",
      ],
      commands: [
        "sudo -u appuser /bin/bash -lc '/opt/scripts/backup.sh'",
        "echo $?",
      ],
      expectedResult:
        "The command runs successfully under the intended account, or produces an actionable error.",
      precautions: [
        "Replace appuser and the script path with actual values.",
        "Run manual tests only when their side effects are safe; a backup or cleanup job may modify production data.",
      ],
    },
    {
      step: 6,
      title: "Check paths and permissions",
      objective: "Ensure cron can execute the script and access its dependencies.",
      actions: [
        "Use absolute paths for scripts, commands, input files, and output files.",
        "Inspect directory permissions as well as file permissions.",
        "Verify script ownership and interpreter availability.",
        "Check access to mounted filesystems and secret files.",
      ],
      commands: [
        "ls -l /opt/scripts/backup.sh",
        "namei -l /opt/scripts/backup.sh",
        "head -n 1 /opt/scripts/backup.sh",
        "command -v bash",
      ],
      expectedResult:
        "The cron user can traverse required directories and access the files and executables needed by the task.",
      precautions: [
        "Do not use chmod 777 as a shortcut.",
        "Avoid making secret files readable to unrelated users.",
      ],
    },
    {
      step: 7,
      title: "Fix environment and working-directory differences",
      objective: "Account for the minimal environment cron provides.",
      actions: [
        "Set a known PATH in the crontab or use absolute executable paths.",
        "Set required environment variables explicitly and securely.",
        "Change to the expected working directory inside the script.",
        "Avoid relying on interactive shell profiles being loaded.",
        "Use a protected environment file or secret manager for sensitive credentials.",
      ],
      commands: [
        "cd /opt/myapp && /usr/bin/python3 /opt/scripts/job.py",
      ],
      expectedResult:
        "The job uses predictable paths, configuration, and environment settings.",
      precautions: [
        "Do not place passwords, API keys, or other secrets directly in a world-readable crontab or log.",
      ],
    },
    {
      step: 8,
      title: "Capture stdout, stderr, and exit status",
      objective: "Make silent failures visible.",
      actions: [
        "Add a dedicated log destination with suitable ownership and permissions.",
        "Redirect standard output and standard error.",
        "Record the start time, end time, and exit status where appropriate.",
        "Rotate logs or send output to a centralized logging system.",
      ],
      commands: [
        "/opt/scripts/backup.sh >> /var/log/backup-cron.log 2>&1",
      ],
      expectedResult:
        "The job's output and errors can be inspected after execution.",
      precautions: [
        "Ensure the cron user can write to the log destination.",
        "Prevent log files from growing without limits.",
      ],
    },
    {
      step: 9,
      title: "Check dependencies and overlapping runs",
      objective: "Find failures caused by unavailable services or long-running jobs.",
      actions: [
        "Check database, network, mounted storage, and other dependencies.",
        "Verify the job's timeout and runtime.",
        "Determine whether the next scheduled run begins before the previous run finishes.",
        "If overlap is unsafe, use a suitable locking mechanism such as flock.",
      ],
      commands: [
        "ps -ef",
        "systemctl status myapp.service --no-pager -l",
        "df -h",
      ],
      expectedResult:
        "Required dependencies are available and overlapping execution is handled safely.",
      precautions: [
        "Use a lock only when it matches the job's intended concurrency behavior.",
        "Avoid introducing a lock that silently skips critical work without monitoring.",
      ],
    },
    {
      step: 10,
      title: "Verify the fix and monitor the next run",
      objective: "Prove that the job executes and completes as intended.",
      actions: [
        "Check the scheduler logs for a new execution.",
        "Review the job's exit status and output.",
        "Validate the actual business result, such as a backup file or report.",
        "Confirm that the next scheduled run is expected to work.",
        "Document the root cause and corrective action.",
      ],
      commands: [
        "sudo journalctl -u cron --since '-1 hour' --no-pager",
        "sudo journalctl -u crond --since '-1 hour' --no-pager",
        "tail -n 100 /var/log/backup-cron.log",
      ],
      expectedResult:
        "The job executes successfully, produces the expected result, and has enough logging to diagnose future failures.",
    },
  ],

  rootCauseScenarios: [
    {
      cause: "Cron service is stopped",
      symptoms: [
        "Multiple scheduled tasks stop running.",
        "The expected job has no recent execution.",
        "The cron daemon is inactive or failed.",
      ],
      investigation: [
        "Inspect the correct cron service.",
        "Review service logs and system boot history.",
        "Check whether the issue affects all users and jobs.",
      ],
      resolution: [
        "Fix the reason the daemon stopped.",
        "Start the correct service through the approved recovery procedure.",
        "Verify that expected jobs resume.",
      ],
    },
    {
      cause: "The job works manually but fails under cron",
      symptoms: [
        "Interactive execution succeeds.",
        "Cron execution reports command-not-found or missing-file errors.",
        "Configuration or credentials are unavailable to the scheduled process.",
      ],
      investigation: [
        "Compare PATH and environment variables.",
        "Inspect working-directory assumptions.",
        "Run the task as the cron user.",
        "Review stdout, stderr, and scheduler logs.",
      ],
      resolution: [
        "Use absolute paths.",
        "Set required non-sensitive environment variables explicitly.",
        "Use secure credential management.",
        "Make the script independent of interactive shell startup files.",
      ],
    },
    {
      cause: "Incorrect schedule or timezone",
      symptoms: [
        "The job runs at a different time than expected.",
        "The job is absent on certain dates.",
        "Execution changes around daylight-saving transitions or timezone changes.",
      ],
      investigation: [
        "Review the crontab fields.",
        "Check the host timezone and relevant scheduler settings.",
        "Confirm the intended calendar behavior.",
      ],
      resolution: [
        "Correct the schedule.",
        "Document the timezone.",
        "Test month boundaries and other important schedule transitions.",
      ],
    },
    {
      cause: "The script runs but fails silently",
      symptoms: [
        "The scheduler records execution but the expected output is missing.",
        "No useful error is available.",
        "The script exits with a non-zero status.",
      ],
      investigation: [
        "Capture stdout and stderr.",
        "Inspect the script's exit status.",
        "Check output directories, permissions, and dependencies.",
      ],
      resolution: [
        "Add structured logging and explicit error handling.",
        "Return meaningful exit codes.",
        "Alert on failed or missing executions.",
      ],
    },
    {
      cause: "Overlapping executions",
      symptoms: [
        "Two instances process the same data.",
        "Files or database records are duplicated.",
        "The job's runtime exceeds its schedule interval.",
      ],
      investigation: [
        "Measure job duration.",
        "Inspect concurrent process instances.",
        "Review the consequences of simultaneous execution.",
      ],
      resolution: [
        "Optimize the task or adjust the schedule.",
        "Use appropriate locking when concurrent runs are unsafe.",
        "Monitor skipped, delayed, or failed executions.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative scenario: a Linux server runs a nightly backup script using cron.",

    incident:
      "The expected backup file is missing even though the cron entry exists.",

    impact: [
      "The latest backup is unavailable.",
      "Recovery-point objectives may be at risk.",
      "The team cannot rely on the backup schedule until the cause is resolved.",
    ],

    investigation: [
      "The engineer verifies the crontab entry and cron daemon.",
      "Scheduler logs show that the job was dispatched.",
      "The script log reveals a command-not-found error.",
      "The script used a command available in the interactive shell PATH but absent from cron's environment.",
    ],

    rootCause:
      "The script depended on an executable being found through the interactive shell's PATH. The cron environment did not contain the same path.",

    resolution: [
      "The engineer configures the correct absolute executable path.",
      "The script is tested safely as the intended user.",
      "Output and errors are redirected to a protected log.",
      "A controlled backup run completes and its output is verified.",
    ],

    prevention: [
      "Use absolute paths in scheduled scripts.",
      "Log exit status and execution duration.",
      "Alert when a required backup is missing or invalid.",
      "Periodically test backup restoration, not just backup creation.",
    ],
  },

  verification: [
    "The correct cron daemon is active.",
    "The job is present under the intended user.",
    "The schedule and timezone are correct.",
    "The command works safely under the cron user's identity.",
    "All required paths and permissions are valid.",
    "The job's output and errors are captured.",
    "The expected output or business result exists and is valid.",
    "The exit status indicates success.",
    "Monitoring detects failed or missing executions.",
  ],

  prevention: [
    "Use absolute paths in scripts and crontab entries.",
    "Document each job's owner, purpose, schedule, and dependencies.",
    "Capture stdout and stderr.",
    "Set secure, predictable environment variables.",
    "Use appropriate permissions and protected credential storage.",
    "Monitor execution success, duration, and missed runs.",
    "Prevent unsafe overlapping runs.",
    "Test backup restoration and other critical outputs.",
    "Review scheduled tasks after deployments and operating-system changes.",
  ],

  monitoring: [
    "Cron daemon health.",
    "Last successful execution time.",
    "Job exit status.",
    "Execution duration and timeout events.",
    "Missing backup or report artifacts.",
    "Repeated failures and overlapping runs.",
    "Disk capacity for output and log destinations.",
    "Dependency availability.",
  ],

  safetyRules: [
    "Test production jobs with awareness of their side effects.",
    "Do not expose credentials in command lines, crontabs, or logs.",
    "Do not weaken file permissions to bypass access errors.",
    "Back up existing crontabs before modifying them.",
    "Use the intended service account and least privilege.",
    "Do not assume a dispatched job completed successfully.",
    "Verify actual outputs and recovery requirements for critical backups.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time:",
    "Affected host:",
    "Job name and command:",
    "Cron owner:",
    "Expected schedule and timezone:",
    "Last successful execution:",
    "Observed error and exit status:",
    "User or business impact:",
    "Confirmed root cause:",
    "Corrective action:",
    "Output verification:",
    "Monitoring and prevention:",
    "Owner and target date:",
  ],

  troubleshootingChecklist: [
    "Confirmed the expected schedule and timezone.",
    "Checked cron or crond service health.",
    "Verified the correct user's crontab.",
    "Validated schedule syntax and command path.",
    "Tested the command safely as the intended user.",
    "Checked file permissions and interpreter.",
    "Reviewed environment variables and working directory.",
    "Captured stdout and stderr.",
    "Checked dependencies and overlapping runs.",
    "Verified the actual output and exit status.",
    "Added monitoring for failures and missed executions.",
    "Documented root cause and prevention.",
  ],
};

export default linuxCronJobNotExecuting;
