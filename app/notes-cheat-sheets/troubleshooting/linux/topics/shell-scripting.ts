import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Linux Shell Scripting and Bash Automation",
  description: "Complete practical Bash scripting guide covering shell fundamentals, variables, quoting, conditions, loops, functions, arrays, input handling, exit codes, error handling, logging, file operations, process automation, cron integration, security, debugging, and production automation projects.",

  sections: [
    {
      heading: "1. Introduction to Linux Shell Scripting",
      explanation: "Shell scripting is the process of writing commands into a file so that Linux tasks can execute automatically. Bash is widely used for administration, deployment automation, backups, log analysis, monitoring, and maintenance. A script can combine commands, variables, conditions, loops, functions, and error handling into a repeatable workflow. Production scripts should be predictable, readable, secure, and safe to rerun. They should validate inputs, handle failures, record useful logs, and avoid destructive operations without explicit safeguards.",
      steps: [
        "Identify the task that needs automation.",
        "Choose Bash or another suitable scripting language.",
        "Create a script with a valid interpreter line.",
        "Add commands in the required execution order.",
        "Validate inputs and required dependencies.",
        "Handle errors and unexpected conditions.",
        "Test in a non-production environment.",
        "Schedule or integrate the script after approval."
      ],
      commands: [
        "bash --version",
        "which bash",
        "pwd",
        "nano script.sh",
        "cat script.sh",
        "bash script.sh",
        "chmod +x script.sh",
        "./script.sh"
      ],
      problems: [
        {
          issue: "A shell script does not execute.",
          rootCause: "The file may lack a valid shebang, execute permission, or the expected interpreter.",
          solution: "Check the first line, run bash -n script.sh, verify permissions, and execute with bash script.sh to isolate the issue."
        },
        {
          issue: "A script works manually but fails in automation.",
          rootCause: "The scheduled environment may have a different PATH, working directory, permissions, or environment variables.",
          solution: "Use explicit paths, define required environment settings, log the working directory, and test under the same execution account."
        }
      ]
    },
    {
      heading: "2. Bash Shell Architecture and Script Execution",
      explanation: "A shell reads commands, expands variables, performs substitutions, applies redirections, and executes commands. A Bash script normally starts with a shebang such as #!/usr/bin/env bash or #!/bin/bash. The operating system uses this interpreter declaration when the script is executed directly. Running bash script.sh explicitly selects Bash regardless of the executable bit. Shell syntax differs from other languages, so scripts should declare their interpreter and avoid relying on whichever shell happens to invoke them.",
      steps: [
        "Identify the required shell interpreter.",
        "Add the correct shebang.",
        "Check the script's file format.",
        "Validate syntax before execution.",
        "Set appropriate file permissions.",
        "Run with controlled environment variables.",
        "Capture output and exit status.",
        "Review execution logs."
      ],
      commands: [
        "head -n 1 script.sh",
        "file script.sh",
        "bash -n script.sh",
        "bash -x script.sh",
        "chmod 750 script.sh",
        "env bash script.sh",
        "echo $SHELL",
        "ps -p $$ -o comm="
      ],
      problems: [
        {
          issue: "A script produces an interpreter error.",
          rootCause: "The shebang points to a missing interpreter or contains an invalid path.",
          solution: "Verify the interpreter with command -v bash and correct the shebang."
        },
        {
          issue: "A script reports unexpected token errors after being edited on Windows.",
          rootCause: "The file may contain Windows CRLF line endings.",
          solution: "Inspect the file format and convert it to Unix LF line endings using an approved editor or dos2unix."
        }
      ]
    },
    {
      heading: "3. Variables and Environment Variables",
      explanation: "Variables store values that scripts can reuse. Bash variable assignment does not allow spaces around the equals sign. Variables are referenced with a dollar sign and should normally be enclosed in double quotes when passed as arguments. Environment variables are inherited by child processes when exported. Local shell variables are not automatically visible to external commands. Sensitive values should not be hardcoded into scripts or printed in logs.",
      steps: [
        "Choose meaningful variable names.",
        "Assign values without spaces around equals.",
        "Reference variables using dollar syntax.",
        "Quote variables to preserve spaces.",
        "Export values only when child processes need them.",
        "Validate required environment variables.",
        "Avoid logging secret values.",
        "Unset temporary variables when no longer required."
      ],
      commands: [
        "name='DevMavox'",
        "echo \"$name\"",
        "export APP_ENV=production",
        "printenv APP_ENV",
        "env",
        "unset name",
        "readonly VERSION='1.0'",
        "printf 'Environment: %s\\n' \"$APP_ENV\""
      ],
      problems: [
        {
          issue: "A variable appears empty inside a child command.",
          rootCause: "The variable was assigned locally but not exported.",
          solution: "Export the variable when child processes require it and verify the environment without exposing secrets."
        },
        {
          issue: "A filename containing spaces is treated as multiple arguments.",
          rootCause: "The variable expansion was not quoted.",
          solution: "Use double quotes around variable references, such as \"$filename\", and test with filenames containing spaces."
        }
      ]
    },
    {
      heading: "4. Quoting, Expansion, and Command Substitution",
      explanation: "Bash quoting controls how special characters and variable expansions are interpreted. Single quotes preserve literal content. Double quotes allow variable and command substitutions while preventing ordinary word splitting and pathname expansion. Backslash escapes individual characters. Command substitution captures command output using $(command). Arithmetic expansion uses $((expression)). Correct quoting is essential for scripts that handle filenames, user input, paths, and external command output.",
      steps: [
        "Use single quotes for literal strings.",
        "Use double quotes around variables.",
        "Use command substitution for command output.",
        "Use arithmetic expansion for numeric calculations.",
        "Avoid unnecessary eval.",
        "Handle filenames containing whitespace.",
        "Validate input before using it in commands.",
        "Test quoting with unusual but valid values."
      ],
      commands: [
        "name='Linux Server'",
        "echo \"$name\"",
        "today=$(date +%F)",
        "files=$(find /var/log -type f)",
        "count=$((5 + 3))",
        "printf '%s\\n' \"$today\"",
        "printf '%q\\n' \"$name\"",
        "bash -c 'printf \"%s\\n\" \"$HOME\"'"
      ],
      problems: [
        {
          issue: "A command processes a path as several separate arguments.",
          rootCause: "Unquoted variable expansion allows word splitting.",
          solution: "Quote the variable and use arrays when constructing command arguments."
        },
        {
          issue: "Command substitution removes expected trailing newlines.",
          rootCause: "Bash command substitution strips trailing newline characters.",
          solution: "Use a file, read loop, or another suitable method when exact trailing whitespace must be preserved."
        }
      ]
    },
    {
      heading: "5. User Input and Script Arguments",
      explanation: "Bash scripts receive positional arguments through $1, $2, and other parameters. $# reports the argument count, $@ represents all arguments, and $0 identifies the script name. The read command accepts interactive input. Production scripts should validate the number, type, and allowed values of arguments before executing operations. User-provided values must not be passed unsafely into commands. Scripts should display usage information and return a meaningful non-zero exit status for invalid input.",
      steps: [
        "Define the required arguments.",
        "Check the argument count.",
        "Validate each supplied value.",
        "Quote positional parameters.",
        "Display usage information for invalid input.",
        "Read interactive input only when appropriate.",
        "Avoid evaluating untrusted input as shell code.",
        "Return a clear status."
      ],
      commands: [
        "echo \"$0\"",
        "echo \"$1\"",
        "echo \"$#\"",
        "printf '%s\\n' \"$@\"",
        "read -r username",
        "read -r -p 'Enter environment: ' environment",
        "getopts ':e:u:' option",
        "printf 'Argument: %s\\n' \"$1\""
      ],
      problems: [
        {
          issue: "A script crashes when an argument is missing.",
          rootCause: "The script accesses a positional parameter without validating the argument count.",
          solution: "Check $# at startup, display usage, and exit before running dependent commands."
        },
        {
          issue: "An input containing special characters changes command behavior.",
          rootCause: "Untrusted input is evaluated or expanded without safe quoting and validation.",
          solution: "Treat input as data, validate allowed values, quote arguments, and avoid eval."
        }
      ]
    },
    {
      heading: "6. Conditional Statements and Decision Making",
      explanation: "Conditional statements allow a script to choose actions based on test results. Bash supports if, elif, else, and case. Tests can evaluate strings, integers, files, directories, and command exit statuses. The [[ ]] syntax is generally preferred for Bash-specific conditional expressions because it avoids several traditional test parsing issues. Conditions should be written clearly, and command success should be checked using exit status rather than fragile text matching.",
      steps: [
        "Identify the condition required for the task.",
        "Choose the appropriate file, string, or numeric test.",
        "Use clear if and else branches.",
        "Handle unexpected values explicitly.",
        "Use case for multiple known choices.",
        "Check command exit statuses.",
        "Provide meaningful error messages.",
        "Test both success and failure paths."
      ],
      commands: [
        "if [[ -f /etc/passwd ]]; then echo 'File exists'; fi",
        "if [[ -d /var/log ]]; then echo 'Directory exists'; fi",
        "if [[ -n \"$USER\" ]]; then echo 'User set'; fi",
        "if [[ \"$ENV\" == 'production' ]]; then echo 'Production'; fi",
        "if (( count > 10 )); then echo 'High'; fi",
        "case \"$ENV\" in dev) echo 'Development' ;; prod) echo 'Production' ;; *) echo 'Unknown' ;; esac",
        "if command -v curl >/dev/null 2>&1; then echo 'curl available'; fi",
        "test -r /etc/hosts"
      ],
      problems: [
        {
          issue: "A condition always evaluates as true or false unexpectedly.",
          rootCause: "Incorrect quoting, comparison operators, empty variables, or test syntax.",
          solution: "Use [[ ]] for Bash conditions, quote string values, and print safe diagnostic information."
        },
        {
          issue: "A file check succeeds but the application cannot use the file.",
          rootCause: "The script checked only file existence rather than ownership, permissions, or readability.",
          solution: "Check the exact required property using -r, -w, stat, and the actual service identity."
        }
      ]
    },
    {
      heading: "7. Loops and Repeated Automation",
      explanation: "Loops execute a block of commands repeatedly. Bash provides for, while, and until loops. A for loop is useful for iterating over a known list. A while loop can process input line by line or continue while a condition remains true. Loops are common in server inventory, health checks, backup validation, and deployment tasks. Scripts must avoid uncontrolled infinite loops, excessive parallel work, and unsafe word splitting. Use a clear exit condition and sensible delay for repeated monitoring.",
      steps: [
        "Identify the items or condition to process.",
        "Choose for, while, or until.",
        "Use arrays or safe line-reading techniques.",
        "Define a clear termination condition.",
        "Add limits or delays when polling.",
        "Handle failures for individual items.",
        "Record progress and results.",
        "Test empty and large input sets."
      ],
      commands: [
        "for host in server1 server2; do echo \"$host\"; done",
        "for file in /var/log/*.log; do printf '%s\\n' \"$file\"; done",
        "while IFS= read -r line; do echo \"$line\"; done < hosts.txt",
        "count=1; while (( count <= 5 )); do echo \"$count\"; ((count++)); done",
        "until [[ -f /tmp/ready.flag ]]; do sleep 2; done",
        "break",
        "continue",
        "seq 1 10"
      ],
      problems: [
        {
          issue: "A loop never terminates.",
          rootCause: "The loop condition is never updated or the expected completion event never occurs.",
          solution: "Review the condition, add a bounded retry count or timeout, and log the reason for each iteration."
        },
        {
          issue: "A loop skips filenames containing spaces.",
          rootCause: "Unquoted iteration over command output causes word splitting.",
          solution: "Use safe arrays or find with null-delimited output and read entries using a null delimiter."
        }
      ]
    },
    {
      heading: "8. Functions and Reusable Script Components",
      explanation: "Functions group reusable commands under a meaningful name. They improve readability and reduce duplicated logic. Bash functions can receive arguments using positional parameters. A function's return status is an exit code, not a general-purpose string result. Text output can be captured through command substitution, but it should be separated from diagnostic logging. Functions are useful for validation, logging, backups, health checks, and deployment steps. Reusable functions should have documented inputs and predictable side effects.",
      steps: [
        "Identify repeated operations.",
        "Create a function with a descriptive name.",
        "Accept arguments through positional parameters.",
        "Validate function inputs.",
        "Return meaningful exit statuses.",
        "Keep diagnostic messages separate from captured output.",
        "Avoid hidden global state where possible.",
        "Test functions independently."
      ],
      commands: [
        "greet() { printf 'Hello %s\\n' \"$1\"; }",
        "greet 'Linux'",
        "check_file() { [[ -f \"$1\" ]]; }",
        "check_file /etc/passwd",
        "deploy() { echo 'Deployment step'; return 0; }",
        "deploy",
        "declare -f greet",
        "type greet"
      ],
      problems: [
        {
          issue: "A function returns a text value incorrectly.",
          rootCause: "The script uses return as though it returns arbitrary strings.",
          solution: "Use printf for textual output and command substitution to capture it; use return for numeric status codes."
        },
        {
          issue: "A function unexpectedly changes variables used elsewhere.",
          rootCause: "The function modifies global variables or shares mutable state.",
          solution: "Use local variables, explicit arguments, and clearly documented output and side effects."
        }
      ]
    },
    {
      heading: "9. Arrays and Structured Data",
      explanation: "Bash indexed arrays store ordered values, while associative arrays store key-value mappings. Arrays are useful for lists of servers, packages, directories, and deployment targets. Quoted array expansion preserves each element as a separate argument. Scripts should not treat arbitrary command output as a safely formatted data structure. For complex structured data, use a dedicated parser such as jq for JSON rather than relying on fragile text manipulation.",
      steps: [
        "Choose indexed or associative arrays.",
        "Initialize array values clearly.",
        "Quote array expansions.",
        "Use array length when iterating.",
        "Validate each item.",
        "Avoid unsafe parsing of arbitrary output.",
        "Use JSON tools for structured API responses.",
        "Test empty and unusual array values."
      ],
      commands: [
        "servers=(web01 web02 db01)",
        "printf '%s\\n' \"${servers[@]}\"",
        "echo \"${#servers[@]}\"",
        "servers+=(web03)",
        "unset 'servers[1]'",
        "declare -A ports=([ssh]=22 [https]=443)",
        "echo \"${ports[https]}\"",
        "jq -r '.items[].name' response.json"
      ],
      problems: [
        {
          issue: "Array elements containing spaces are split.",
          rootCause: "The array was expanded without quotes.",
          solution: "Use \"${array[@]}\" when passing each element as a separate argument."
        },
        {
          issue: "A script fails when an API response changes field order.",
          rootCause: "The script relies on fixed text positions instead of parsing structured data.",
          solution: "Use a JSON parser such as jq and validate required fields before processing."
        }
      ]
    },
    {
      heading: "10. Exit Codes and Error Handling",
      explanation: "Every command returns an exit status. Zero normally indicates success, while a non-zero status indicates failure or another result. Bash stores the most recent command status in $?. Scripts should check important operations and stop or recover appropriately. set -e can terminate a script after certain unhandled failures, but it has context-dependent behavior and should not replace deliberate error handling. set -u detects some unset variable references, and pipefail makes a pipeline report failure when an earlier command fails. Robust scripts use explicit checks for critical operations.",
      steps: [
        "Understand the exit status of each important command.",
        "Check critical operations immediately.",
        "Use set -o pipefail when pipelines must report failures.",
        "Use set -u when appropriate.",
        "Choose a deliberate error policy.",
        "Capture errors with useful context.",
        "Return meaningful status codes.",
        "Test failure scenarios."
      ],
      commands: [
        "echo $?",
        "command_that_may_fail || echo 'Command failed'",
        "set -o pipefail",
        "set -u",
        "set -e",
        "if cp source destination; then echo 'Copy successful'; else echo 'Copy failed'; exit 1; fi",
        "exit 0",
        "exit 1"
      ],
      problems: [
        {
          issue: "A script reports success even though an earlier pipeline command failed.",
          rootCause: "The default pipeline status may reflect only the last command.",
          solution: "Enable set -o pipefail and check the pipeline status."
        },
        {
          issue: "set -e causes a script to exit unexpectedly.",
          rootCause: "A command returned non-zero in a context where errexit applies.",
          solution: "Inspect the failing command and use explicit conditional handling for expected non-zero results."
        }
      ]
    },
    {
      heading: "11. Logging and Script Observability",
      explanation: "Logging makes automation understandable and supportable. Production scripts should record timestamps, execution stages, important outcomes, and failure context. Logs should distinguish normal progress from warnings and errors. Sensitive values such as passwords, tokens, and private keys must never be written to logs. A script should use a controlled log location with appropriate ownership, permissions, and retention. Standard output and standard error can be redirected separately so automation platforms can capture results and failures.",
      steps: [
        "Choose an approved log location.",
        "Create a timestamped logging function.",
        "Separate informational and error messages.",
        "Capture important command failures.",
        "Avoid printing secrets.",
        "Set appropriate log permissions.",
        "Rotate or centralize logs.",
        "Test log behavior during failure."
      ],
      commands: [
        "LOG_FILE=/var/log/my-script.log",
        "date '+%Y-%m-%d %H:%M:%S'",
        "printf '%s INFO %s\\n' \"$(date -Is)\" 'Started' >> \"$LOG_FILE\"",
        "echo 'Error occurred' >&2",
        "bash script.sh >output.log 2>error.log",
        "bash script.sh >>combined.log 2>&1",
        "logger -t my-script 'Automation started'",
        "tail -f /var/log/my-script.log"
      ],
      problems: [
        {
          issue: "A scheduled script fails but no one knows why.",
          rootCause: "The script does not capture standard error or record execution stages.",
          solution: "Add timestamped logs, capture exit status, and configure the scheduler to retain output."
        },
        {
          issue: "A log file becomes excessively large.",
          rootCause: "Logging is unbounded and no rotation or retention policy exists.",
          solution: "Configure logrotate or centralized logging with an appropriate retention policy."
        }
      ]
    },
    {
      heading: "12. File Operations and Safe Directory Processing",
      explanation: "Shell scripts frequently inspect, create, copy, move, and process files. File automation must account for missing paths, permissions, symbolic links, special filenames, and partial failures. Use quoted paths and validate the target directory before performing changes. For large file collections, find is more reliable than parsing ls output. Destructive operations should have explicit target validation, a dry-run mode, and an approval process. Scripts should avoid broad deletion patterns and protect important production directories.",
      steps: [
        "Validate source and destination paths.",
        "Check file and directory permissions.",
        "Use find for recursive file discovery.",
        "Quote filenames and paths.",
        "Use a dry-run mode for risky operations.",
        "Check each copy or move result.",
        "Record changed files.",
        "Validate the final output."
      ],
      commands: [
        "test -f /etc/passwd",
        "test -d /var/log",
        "mkdir -p /backup/application",
        "cp -p source.conf destination.conf",
        "find /var/log -type f -name '*.log'",
        "find /data -type f -mtime -1",
        "stat /path/to/file",
        "du -sh /backup/application"
      ],
      problems: [
        {
          issue: "A file-processing script skips some files.",
          rootCause: "Unsafe filename parsing, permission errors, or an incorrect find expression.",
          solution: "Use null-delimited find output where needed, inspect permissions, and log each processed path."
        },
        {
          issue: "A cleanup script targets the wrong directory.",
          rootCause: "A path variable is empty, incorrect, or not validated.",
          solution: "Require an explicit approved directory, verify it is not a protected root path, and support a dry-run mode before deletion."
        }
      ]
    },
    {
      heading: "13. Process Management and Background Jobs",
      explanation: "Bash scripts can start foreground and background processes, wait for child jobs, and collect exit statuses. Background execution is useful for independent tasks but introduces concurrency and resource-management concerns. A script should track process identifiers, wait for completion, handle signals, and clean up only processes it owns. nohup can allow a process to continue after terminal disconnection, while systemd is generally preferable for long-running production services because it provides supervision and logging.",
      steps: [
        "Determine whether a task needs foreground or background execution.",
        "Start the process with explicit arguments.",
        "Capture its PID when needed.",
        "Wait for completion and check status.",
        "Handle termination signals.",
        "Limit parallel workload.",
        "Avoid killing unrelated processes.",
        "Use systemd for persistent production services."
      ],
      commands: [
        "sleep 10 &",
        "pid=$!",
        "wait \"$pid\"",
        "jobs -l",
        "ps -p \"$pid\"",
        "nohup ./worker.sh >worker.log 2>&1 &",
        "kill -TERM \"$pid\"",
        "trap 'echo Interrupted' INT TERM"
      ],
      problems: [
        {
          issue: "A script exits while background work is still running.",
          rootCause: "The script does not wait for its child processes.",
          solution: "Track process identifiers and use wait, checking each exit status."
        },
        {
          issue: "A script starts too many concurrent jobs.",
          rootCause: "There is no concurrency limit or resource-aware scheduling.",
          solution: "Use a bounded worker pattern, queue tasks, and monitor system resource usage."
        }
      ]
    },
    {
      heading: "14. Scheduling Scripts with Cron",
      explanation: "Cron schedules recurring tasks using a time-based expression. User crontabs and system-level cron configuration have different ownership and execution contexts. Scheduled jobs normally run with a limited environment and may not load interactive shell startup files. Scripts should use absolute paths, set their required environment, log output, and avoid overlapping executions. Time zones, daylight-saving changes, server clock synchronization, and missed runs must be considered for business-critical jobs.",
      steps: [
        "Identify the job owner.",
        "Define the required schedule.",
        "Use absolute executable and file paths.",
        "Set required environment variables.",
        "Configure output logging.",
        "Prevent overlapping executions where necessary.",
        "Verify the scheduler service.",
        "Test the job under its actual execution account."
      ],
      commands: [
        "crontab -l",
        "crontab -e",
        "crontab -u appuser -l",
        "systemctl status cron",
        "systemctl status crond",
        "date",
        "timedatectl status",
        "flock -n /var/lock/my-job.lock /opt/scripts/job.sh"
      ],
      problems: [
        {
          issue: "A cron job works manually but fails on schedule.",
          rootCause: "Cron uses a restricted environment, different working directory, or different permissions.",
          solution: "Use absolute paths, define PATH and required environment variables, and inspect scheduler logs."
        },
        {
          issue: "A scheduled backup starts while the previous backup is still running.",
          rootCause: "The schedule does not account for long execution time.",
          solution: "Use a lock mechanism such as flock, record job duration, and adjust the schedule or workload."
        }
      ]
    },
    {
      heading: "15. Automation with SSH and Multiple Servers",
      explanation: "Bash can automate administration across multiple Linux servers using SSH. Common tasks include checking disk usage, validating service status, collecting system information, and deploying approved configuration. Remote automation requires protected authentication, host key verification, controlled account permissions, and reliable error reporting. A multi-server script must distinguish unreachable hosts from failed commands and should not silently ignore errors. Parallel execution must be bounded to avoid overwhelming production infrastructure.",
      steps: [
        "Maintain an approved server inventory.",
        "Use dedicated automation identities.",
        "Protect private keys and verify host keys.",
        "Test connectivity to each host.",
        "Execute only approved remote commands.",
        "Capture per-host output and status.",
        "Limit parallel operations.",
        "Review failed hosts and retry safely."
      ],
      commands: [
        "ssh -o BatchMode=yes user@server hostname",
        "ssh user@server 'uptime'",
        "ssh user@server 'df -h'",
        "ssh user@server 'systemctl is-active nginx'",
        "scp report.txt user@server:/tmp/",
        "ssh-keygen -t ed25519",
        "ssh -o ConnectTimeout=5 user@server true",
        "printf '%s\\n' server1 server2 > hosts.txt"
      ],
      problems: [
        {
          issue: "Remote automation prompts for a password and hangs.",
          rootCause: "Non-interactive authentication is not configured or the command expects a terminal.",
          solution: "Use an approved SSH key or automation identity, configure non-interactive execution, and apply a connection timeout."
        },
        {
          issue: "A multi-server script reports success despite one host failing.",
          rootCause: "The script does not track exit status separately for each host.",
          solution: "Record a result per host, aggregate failures, and return a non-zero final status when required."
        }
      ]
    },
    {
      heading: "16. Production Backup and Maintenance Automation",
      explanation: "Bash scripts can automate backup preparation, file collection, checksum generation, retention reporting, and maintenance checks. A backup script should validate the source, destination, available space, and command exit status. A completed copy is not proof of a recoverable backup. Teams must test restoration and protect backups from unauthorized modification. Retention and deletion policies should be explicit and approved. For database backups, use database-aware backup mechanisms rather than blindly copying active database files.",
      steps: [
        "Define backup scope and ownership.",
        "Validate source directories.",
        "Check destination availability and free space.",
        "Create backups using an appropriate tool.",
        "Generate checksums or manifests.",
        "Record completion status and duration.",
        "Apply approved retention policies.",
        "Perform scheduled restoration tests."
      ],
      commands: [
        "df -h /backup",
        "du -sh /var/www",
        "tar -czf application-backup.tar.gz /var/www",
        "tar -tzf application-backup.tar.gz",
        "sha256sum application-backup.tar.gz",
        "rsync -av --dry-run /var/www/ /backup/www/",
        "rsync -av /var/www/ /backup/www/",
        "date -Is"
      ],
      problems: [
        {
          issue: "A backup script reports success but the archive is incomplete.",
          rootCause: "The script ignores command exit status or does not validate archive contents.",
          solution: "Check every critical command, inspect the archive, generate checksums, and run restoration tests."
        },
        {
          issue: "A backup job fails because the destination is full.",
          rootCause: "Available capacity and retention were not checked before backup execution.",
          solution: "Check free space, review retention, alert the owner, and use approved capacity or storage remediation."
        }
      ]
    },
    {
      heading: "17. Script Security and Secure Coding",
      explanation: "Shell scripts often run with elevated permissions and can affect critical infrastructure. Secure coding requires careful input validation, safe quoting, controlled PATH, trusted executable paths, protected files, and restricted privileges. Avoid eval with untrusted data, unsafe temporary filenames, and world-writable script directories. Scripts should not contain passwords or API tokens. A script that executes as root should be reviewed more carefully because an input or path mistake can affect the entire system.",
      steps: [
        "Run scripts with the least required privilege.",
        "Use a trusted and controlled execution environment.",
        "Quote all external input.",
        "Validate paths and allowed values.",
        "Avoid eval and unsafe command construction.",
        "Protect scripts and configuration files.",
        "Use secure temporary-file handling.",
        "Review secrets and audit execution."
      ],
      commands: [
        "umask 077",
        "chmod 750 /opt/scripts/backup.sh",
        "stat /opt/scripts/backup.sh",
        "command -v bash",
        "command -v tar",
        "mktemp",
        "shellcheck script.sh",
        "bash -n script.sh"
      ],
      problems: [
        {
          issue: "An attacker can modify a privileged automation script.",
          rootCause: "The script or one of its parent directories is writable by unauthorized users.",
          solution: "Review ownership and directory permissions, restrict write access, and monitor integrity of privileged scripts."
        },
        {
          issue: "A script executes an unexpected command from PATH.",
          rootCause: "An untrusted directory appears earlier in PATH or a command name resolves to an unexpected executable.",
          solution: "Use a controlled PATH, trusted executable paths where appropriate, and verify command resolution."
        }
      ]
    },
    {
      heading: "18. Debugging, Testing, and Code Quality",
      explanation: "Shell scripts should be tested before production use. bash -n checks syntax without executing the script. bash -x displays execution traces and helps identify expansion and control-flow issues, but traces can reveal secrets and should be handled carefully. ShellCheck detects common scripting problems, quoting mistakes, and portability issues. Testing should cover normal operation, invalid input, missing files, unavailable dependencies, permission errors, and interrupted execution. Code review and version control help maintain reliable automation.",
      steps: [
        "Run syntax validation.",
        "Use ShellCheck for static analysis.",
        "Test in an isolated environment.",
        "Test both success and failure paths.",
        "Review command exit statuses.",
        "Inspect logs and output.",
        "Avoid exposing secrets in debug traces.",
        "Store reviewed scripts in version control."
      ],
      commands: [
        "bash -n script.sh",
        "bash -x script.sh",
        "shellcheck script.sh",
        "set -x",
        "set +x",
        "command -v shellcheck",
        "git diff -- script.sh",
        "git status --short"
      ],
      problems: [
        {
          issue: "A script passes syntax validation but fails at runtime.",
          rootCause: "Syntax checks do not validate permissions, external dependencies, network access, or application behavior.",
          solution: "Test the script with representative inputs and validate its dependencies and failure paths."
        },
        {
          issue: "Debug traces expose credentials.",
          rootCause: "Tracing prints expanded commands and sensitive values.",
          solution: "Disable tracing around sensitive operations, use secret stores, and protect any existing debug logs."
        }
      ]
    },
    {
      heading: "19. Real-World Production Automation Project",
      explanation: "Consider an operations team managing several Linux application servers. The team needs a daily health report containing hostname, uptime, filesystem capacity, memory usage, and critical service status. A Bash script reads an approved host inventory, connects using a dedicated SSH identity, runs a limited set of diagnostic commands, and records each host's result. It applies connection timeouts, captures failures, and creates a timestamped report. The job runs through cron or a systemd timer. Monitoring alerts when a host is unreachable or a critical service is inactive. The script is reviewed, tested, and stored in version control before production scheduling.",
      steps: [
        "Create a controlled server inventory.",
        "Define the approved diagnostic commands.",
        "Configure secure SSH authentication.",
        "Implement per-host validation and timeouts.",
        "Collect uptime, disk, memory, and service status.",
        "Record timestamped results.",
        "Track failed hosts separately.",
        "Schedule the job using cron or a systemd timer.",
        "Review the generated report.",
        "Test failure handling and alert delivery."
      ],
      commands: [
        "hostname",
        "uptime",
        "df -h",
        "free -h",
        "systemctl is-active nginx",
        "ssh -o BatchMode=yes -o ConnectTimeout=5 user@server uptime",
        "bash -n health-check.sh",
        "shellcheck health-check.sh",
        "crontab -l",
        "journalctl -u cron"
      ],
      problems: [
        {
          issue: "The health report contains data for only some servers.",
          rootCause: "Some hosts are unreachable, SSH authentication fails, or the script exits before processing all entries.",
          solution: "Track per-host status, use connection timeouts, continue after individual failures, and include failed hosts in the report."
        },
        {
          issue: "The scheduled report is empty.",
          rootCause: "The scheduler environment, output redirection, working directory, or execution permissions are incorrect.",
          solution: "Run under the scheduled account, use absolute paths, capture standard error, and verify the scheduler logs."
        }
      ]
    },
    {
      heading: "20. Shell Scripting Interview Questions and Answers",
      explanation: "Shell scripting interviews assess command automation, Bash syntax, input handling, control flow, functions, arrays, exit codes, error handling, logging, scheduling, and production safety. Strong answers demonstrate both scripting knowledge and operational judgment. Explain how you validate input, handle failures, protect secrets, and test scripts before deployment.",
      steps: [
        "Explain the script's objective.",
        "Identify the interpreter and execution environment.",
        "Validate arguments and dependencies.",
        "Explain control flow and error handling.",
        "Describe logging and security controls.",
        "Demonstrate testing and debugging.",
        "Explain how the automation is deployed and monitored."
      ],
      commands: [
        "bash --version",
        "bash -n script.sh",
        "shellcheck script.sh",
        "bash -x script.sh",
        "echo $?",
        "set -o pipefail",
        "crontab -l",
        "chmod 750 script.sh"
      ],
      interviewQuestions: [
        {
          question: "1. What is shell scripting?",
          answer: "Shell scripting is writing a sequence of shell commands in a file to automate Linux administration, deployment, monitoring, and maintenance tasks."
        },
        {
          question: "2. What is Bash?",
          answer: "Bash is a command interpreter and scripting language commonly used on Linux systems."
        },
        {
          question: "3. What is a shebang?",
          answer: "A shebang is the first line of a script that identifies the interpreter, such as #!/bin/bash."
        },
        {
          question: "4. How do you execute a shell script?",
          answer: "I can execute it using bash script.sh or give it executable permission and run it directly with ./script.sh."
        },
        {
          question: "5. How do you check Bash script syntax?",
          answer: "I use bash -n script.sh. It checks syntax without executing the script."
        },
        {
          question: "6. What is the difference between a variable and an environment variable?",
          answer: "A shell variable belongs to the current shell. An exported environment variable is inherited by child processes."
        },
        {
          question: "7. Why should variables be quoted?",
          answer: "Quoting prevents unwanted word splitting and pathname expansion, especially when values contain spaces or special characters."
        },
        {
          question: "8. What is command substitution?",
          answer: "Command substitution captures command output using syntax such as result=$(date +%F)."
        },
        {
          question: "9. What are positional parameters?",
          answer: "They represent script arguments. $1 is the first argument, $2 is the second, $# is the argument count, and $@ represents all arguments."
        },
        {
          question: "10. What is the difference between $@ and $*?",
          answer: "When quoted, \"$@\" preserves each positional argument as a separate word. \"$*\" joins the arguments into one word using the first character of IFS."
        },
        {
          question: "11. What is the purpose of if and case?",
          answer: "if evaluates conditions and selects a branch. case selects a branch based on pattern matching, which is useful for multiple known options."
        },
        {
          question: "12. What are the main Bash loop types?",
          answer: "Bash provides for, while, and until loops for iterating over values or repeating work based on a condition."
        },
        {
          question: "13. What is the difference between break and continue?",
          answer: "break exits the current loop. continue skips the remaining commands in the current iteration and moves to the next iteration."
        },
        {
          question: "14. What is a shell function?",
          answer: "A function is a reusable block of commands that helps organize scripts and avoid duplicated logic."
        },
        {
          question: "15. How does a Bash function return a result?",
          answer: "It uses return for an exit status. Text output can be produced with printf and captured using command substitution."
        },
        {
          question: "16. What is an array in Bash?",
          answer: "An array stores multiple values in one variable. Bash supports indexed arrays and associative arrays."
        },
        {
          question: "17. What does $? represent?",
          answer: "It contains the exit status of the most recently executed command. Zero normally means success and non-zero indicates failure or another result."
        },
        {
          question: "18. What is set -e?",
          answer: "It enables errexit behavior, causing the shell to exit after certain unhandled command failures. Its context-dependent behavior means explicit error handling is still important."
        },
        {
          question: "19. What is set -u?",
          answer: "It treats expansion of unset variables as an error in many contexts, helping detect missing variable assignments."
        },
        {
          question: "20. What is set -o pipefail?",
          answer: "It makes a pipeline return a failure status when a command in the pipeline fails, rather than reporting only the last command's status."
        },
        {
          question: "21. How do you redirect output and errors?",
          answer: "I use > for standard output, 2> for standard error, and 2>&1 to combine standard error with standard output."
        },
        {
          question: "22. How do you debug a Bash script?",
          answer: "I use bash -x for execution tracing, bash -n for syntax checks, and ShellCheck for static analysis. I protect debug output because it may expose secrets."
        },
        {
          question: "23. What is ShellCheck?",
          answer: "ShellCheck is a static analysis tool that identifies common shell scripting mistakes and suggests improvements."
        },
        {
          question: "24. How do you schedule a shell script?",
          answer: "I can use cron or a systemd timer. I configure absolute paths, required environment variables, logging, permissions, and overlap protection."
        },
        {
          question: "25. Why does a cron job fail while manual execution succeeds?",
          answer: "Cron runs with a different environment, working directory, and possibly different permissions. I use absolute paths and inspect scheduler logs."
        },
        {
          question: "26. How do you process filenames containing spaces?",
          answer: "I quote filenames and variables. For recursive file processing, I use find with null-delimited output and read entries safely."
        },
        {
          question: "27. How do you make a backup script reliable?",
          answer: "I validate source and destination, check available space, verify every command's exit status, generate checksums, log completion, and test restoration."
        },
        {
          question: "28. How do you handle errors in a production script?",
          answer: "I validate inputs, check critical exit codes, use controlled error handling, log the failure context, and return a meaningful non-zero status."
        },
        {
          question: "29. How do you secure a shell script?",
          answer: "I use least privilege, safe quoting, input validation, controlled PATH, protected permissions, secure secret storage, and code review."
        },
        {
          question: "30. Explain a real-time shell scripting project.",
          answer: "I can create a server health-check automation that connects to approved hosts, collects uptime, disk, memory, and service status, logs per-host results, and sends an operational report on a schedule."
        }
      ]
    }
  ]
};

export default data;
