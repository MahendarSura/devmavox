```typescript
export interface TopicQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const topicQuestions: TopicQuestion[] = [
  {
    id: "python-bash-1",
    question: "Why is Python commonly used in DevOps?",
    options: [
      "For automation, scripting, API integration, and infrastructure tasks",
      "Only for creating HTML pages",
      "Only for managing physical servers",
      "Only for writing database queries"
    ],
    answer: 0
  },
  {
    id: "python-bash-2",
    question: "How do you print text in Python?",
    options: [
      "echo('Hello')",
      "print('Hello')",
      "console.log('Hello')",
      "printf['Hello']"
    ],
    answer: 1
  },
  {
    id: "python-bash-3",
    question: "Which symbol starts a comment in Python?",
    options: ["//", "<!--", "#", "/*"],
    answer: 2
  },
  {
    id: "python-bash-4",
    question: "How do you assign a value to a Python variable?",
    options: [
      "int x := 10",
      "x == 10",
      "let x = 10",
      "x = 10"
    ],
    answer: 3
  },
  {
    id: "python-bash-5",
    question: "Which of these is a Python list?",
    options: ["[1, 2, 3]", "(1, 2, 3)", "{1: 2}", "None"],
    answer: 0
  },
  {
    id: "python-bash-6",
    question: "Which Python data type stores key-value pairs?",
    options: ["list", "dict", "tuple", "str"],
    answer: 1
  },
  {
    id: "python-bash-7",
    question: "What is the data type of True in Python?",
    options: ["str", "int", "bool", "list"],
    answer: 2
  },
  {
    id: "python-bash-8",
    question: "Which keyword defines a function in Python?",
    options: ["function", "func", "define", "def"],
    answer: 3
  },
  {
    id: "python-bash-9",
    question: "Which keyword returns a value from a Python function?",
    options: ["return", "break", "yieldall", "send"],
    answer: 0
  },
  {
    id: "python-bash-10",
    question: "Which function returns the number of items in a list?",
    options: ["countall()", "len()", "size()", "length()"],
    answer: 1
  },
  {
    id: "python-bash-11",
    question: "Which Python statement checks a condition?",
    options: ["when", "check", "if", "select"],
    answer: 2
  },
  {
    id: "python-bash-12",
    question: "Which keyword handles an alternative condition?",
    options: ["otherwise", "elseif", "default", "elif"],
    answer: 3
  },
  {
    id: "python-bash-13",
    question: "Which loop iterates over items in a list?",
    options: ["for", "switch", "case", "select"],
    answer: 0
  },
  {
    id: "python-bash-14",
    question: "What does range(5) produce when iterated?",
    options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5", "5 only"],
    answer: 1
  },
  {
    id: "python-bash-15",
    question: "What does the break statement do inside a loop?",
    options: [
      "Skips only the current iteration",
      "Restarts the loop",
      "Terminates the loop",
      "Defines a function"
    ],
    answer: 2
  },
  {
    id: "python-bash-16",
    question: "What does continue do inside a Python loop?",
    options: [
      "Terminates the entire program",
      "Deletes the loop",
      "Restarts the Python interpreter",
      "Skips to the next iteration"
    ],
    answer: 3
  },
  {
    id: "python-bash-17",
    question: "How do you handle an exception in Python?",
    options: ["try and except", "if and select", "for and while", "import and export"],
    answer: 0
  },
  {
    id: "python-bash-18",
    question: "What is the purpose of a finally block?",
    options: [
      "It runs only when an exception occurs",
      "It normally runs whether an exception occurred or not",
      "It defines a class",
      "It imports a module"
    ],
    answer: 1
  },
  {
    id: "python-bash-19",
    question: "Which keyword imports a Python module?",
    options: ["include", "require", "import", "loadmodule"],
    answer: 2
  },
  {
    id: "python-bash-20",
    question: "What is pip commonly used for?",
    options: [
      "Managing Linux processes",
      "Creating network routes",
      "Running Bash loops",
      "Installing and managing Python packages"
    ],
    answer: 3
  },
  {
    id: "python-bash-21",
    question: "What is a Python virtual environment?",
    options: [
      "An isolated environment for project dependencies",
      "A physical server",
      "A Git branch",
      "A Linux kernel"
    ],
    answer: 0
  },
  {
    id: "python-bash-22",
    question: "Which command creates a Python virtual environment?",
    options: [
      "python install venv",
      "python -m venv .venv",
      "pip create environment",
      "bash --venv"
    ],
    answer: 1
  },
  {
    id: "python-bash-23",
    question: "How can you activate a virtual environment in Linux using Bash?",
    options: [
      "python .venv",
      "pip activate",
      "source .venv/bin/activate",
      "bash install .venv"
    ],
    answer: 2
  },
  {
    id: "python-bash-24",
    question: "Which module is commonly used to work with JSON in Python?",
    options: ["csv", "math", "random", "json"],
    answer: 3
  },
  {
    id: "python-bash-25",
    question: "How do you read a text file safely using a context manager?",
    options: [
      "with open('file.txt', 'r') as f:",
      "read file.txt permanently",
      "openfile('file.txt')",
      "file.start('file.txt')"
    ],
    answer: 0
  },
  {
    id: "python-bash-26",
    question: "Which mode opens a file for writing and truncates an existing file?",
    options: ["'r'", "'w'", "'a'", "'x'"],
    answer: 1
  },
  {
    id: "python-bash-27",
    question: "Which Python module provides functions for interacting with the operating system?",
    options: ["json", "statistics", "os", "html"],
    answer: 2
  },
  {
    id: "python-bash-28",
    question: "What is the purpose of pathlib?",
    options: [
      "Making HTTP requests only",
      "Managing SQL databases",
      "Creating virtual machines",
      "Working with filesystem paths using objects"
    ],
    answer: 3
  },
  {
    id: "python-bash-29",
    question: "Which module is useful for running external commands in Python?",
    options: ["subprocess", "calendar", "turtle", "decimal"],
    answer: 0
  },
  {
    id: "python-bash-30",
    question: "What is the purpose of subprocess.run(..., check=True)?",
    options: [
      "It ignores every command failure",
      "It raises CalledProcessError if the command exits with a nonzero status",
      "It automatically retries forever",
      "It runs only Python functions"
    ],
    answer: 1
  },
  {
    id: "python-bash-31",
    question: "Which Python module is commonly used for HTTP requests?",
    options: ["tkinter", "pickle", "requests", "sqlite3"],
    answer: 2
  },
  {
    id: "python-bash-32",
    question: "What is an environment variable commonly used for?",
    options: [
      "Replacing all application logs",
      "Storing every secret directly in source code",
      "Creating Python classes",
      "Configuring applications outside the code"
    ],
    answer: 3
  },
  {
    id: "python-bash-33",
    question: "How can Python read an environment variable?",
    options: [
      "os.getenv('API_URL')",
      "env.read.API_URL()",
      "python.variable('API_URL')",
      "getfile('API_URL')"
    ],
    answer: 0
  },
  {
    id: "python-bash-34",
    question: "What is the main purpose of Python logging?",
    options: [
      "Automatically fixing every error",
      "Recording application events and diagnostic information",
      "Creating operating system users",
      "Replacing all tests"
    ],
    answer: 1
  },
  {
    id: "python-bash-35",
    question: "What does __name__ == '__main__' commonly indicate?",
    options: [
      "The script has no functions",
      "The script is installed globally",
      "The file is being run as the main program",
      "The program is running as root"
    ],
    answer: 2
  },
  {
    id: "python-bash-36",
    question: "What is a Python dictionary comprehension?",
    options: [
      "A method to install Python",
      "A loop that always deletes dictionary keys",
      "A database backup format",
      "A concise way to construct a dictionary from an iterable"
    ],
    answer: 3
  },
  {
    id: "python-bash-37",
    question: "What is a generator useful for?",
    options: [
      "Producing values lazily, which can reduce memory use",
      "Always storing every result in a list",
      "Creating operating system accounts",
      "Replacing HTTP authentication"
    ],
    answer: 0
  },
  {
    id: "python-bash-38",
    question: "What is the purpose of a Python class?",
    options: [
      "To create only string variables",
      "To define a type that groups data and behavior",
      "To install external packages",
      "To execute shell commands automatically"
    ],
    answer: 1
  },
  {
    id: "python-bash-39",
    question: "Which Python tool is commonly used to run unit tests from the standard library?",
    options: ["pip", "venv", "unittest", "pathlib"],
    answer: 2
  },
  {
    id: "python-bash-40",
    question: "What is the purpose of requirements.txt?",
    options: [
      "Storing all application passwords",
      "Defining Linux users",
      "Recording CPU temperatures",
      "Listing Python package dependencies, often with version constraints"
    ],
    answer: 3
  },
  {
    id: "python-bash-41",
    question: "What is Bash?",
    options: [
      "A Unix shell and command language",
      "A relational database",
      "A container orchestration service",
      "A Python package manager"
    ],
    answer: 0
  },
  {
    id: "python-bash-42",
    question: "What is the first line of a typical executable Bash script?",
    options: ["# bash", "#!/bin/bash", "<bash>", "import bash"],
    answer: 1
  },
  {
    id: "python-bash-43",
    question: "How do you assign a variable in Bash?",
    options: ["$name = John", "var name: John", "name=John", "set name == John"],
    answer: 2
  },
  {
    id: "python-bash-44",
    question: "How do you reference a Bash variable named name?",
    options: ["&name", "%name", "@name", "$name"],
    answer: 3
  },
  {
    id: "python-bash-45",
    question: "Which command prints text in Bash?",
    options: ["echo", "displaytext", "printline", "writeconsole"],
    answer: 0
  },
  {
    id: "python-bash-46",
    question: "How do you read user input into a Bash variable?",
    options: ["input name", "read name", "scan name", "get name"],
    answer: 1
  },
  {
    id: "python-bash-47",
    question: "Which syntax is commonly used for command substitution in Bash?",
    options: ["$(command)", "${command}", "<command>", "{=command}"],
    answer: 0
  },
  {
    id: "python-bash-48",
    question: "How do you check whether a file exists in Bash?",
    options: ["if file exists", "check -file", "testfile filename", "test -f filename"],
    answer: 3
  },
  {
    id: "python-bash-49",
    question: "What does the Bash condition [ -d \"$dir\" ] check?",
    options: [
      "Whether the path is a directory",
      "Whether the path is a regular file",
      "Whether the path is executable",
      "Whether the directory is empty"
    ],
    answer: 0
  },
  {
    id: "python-bash-50",
    question: "Which keyword begins a conditional block in Bash?",
    options: ["when", "if", "check", "condition"],
    answer: 1
  },
  {
    id: "python-bash-51",
    question: "Which syntax correctly closes a Bash if statement?",
    options: ["endif", "end", "fi", "done"],
    answer: 2
  },
  {
    id: "python-bash-52",
    question: "Which keyword closes a Bash for loop?",
    options: ["fi", "endfor", "stop", "done"],
    answer: 3
  },
  {
    id: "python-bash-53",
    question: "What does the Bash command exit 1 generally indicate?",
    options: [
      "The script exits with a nonzero status, commonly indicating failure",
      "The script always succeeds",
      "The script starts a new shell",
      "The script creates a directory"
    ],
    answer: 0
  },
  {
    id: "python-bash-54",
    question: "What does $? contain in Bash?",
    options: [
      "The current username",
      "The exit status of the most recently executed command",
      "The current directory",
      "The number of CPU cores"
    ],
    answer: 1
  },
  {
    id: "python-bash-55",
    question: "What does $1 represent in a Bash script?",
    options: [
      "The script's exit code",
      "The current directory",
      "The first positional argument",
      "The current username"
    ],
    answer: 2
  },
  {
    id: "python-bash-56",
    question: "What does $# represent in Bash?",
    options: [
      "The first argument",
      "The script filename",
      "The exit status",
      "The number of positional arguments"
    ],
    answer: 3
  },
  {
    id: "python-bash-57",
    question: "What does \"$@\" represent in Bash?",
    options: [
      "All positional arguments as separate quoted arguments when expanded correctly",
      "Only the first argument",
      "The current directory",
      "All environment variables"
    ],
    answer: 0
  },
  {
    id: "python-bash-58",
    question: "What does set -u do in Bash?",
    options: [
      "Automatically updates all packages",
      "Treats expansion of unset variables as an error",
      "Ignores every failed command",
      "Enables network access"
    ],
    answer: 1
  },
  {
    id: "python-bash-59",
    question: "What is the effect of set -o pipefail?",
    options: [
      "It disables pipes",
      "It makes every command succeed",
      "A pipeline can return a nonzero status when a command within it fails",
      "It logs all passwords"
    ],
    answer: 2
  },
  {
    id: "python-bash-60",
    question: "What is a potential benefit of set -e in a Bash script?",
    options: [
      "It retries every failed command automatically",
      "It ignores nonzero exit statuses",
      "It encrypts script variables",
      "It can exit on an unhandled nonzero command status in applicable contexts"
    ],
    answer: 3
  },
  {
    id: "python-bash-61",
    question: "Why is set -e not a complete error-handling solution?",
    options: [
      "Its behavior has exceptions depending on command context, so explicit checks may still be needed",
      "It only works on Windows",
      "It converts every error into success",
      "It prevents variables from being used"
    ],
    answer: 0
  },
  {
    id: "python-bash-62",
    question: "How can you make a Bash script executable?",
    options: [
      "run chmod",
      "chmod +x script.sh",
      "bash permission script.sh",
      "execute --file script.sh"
    ],
    answer: 1
  },
  {
    id: "python-bash-63",
    question: "How can you run a Bash script without setting its executable bit?",
    options: [
      "./script.sh only",
      "chmod --run script.sh",
      "bash script.sh",
      "script.sh enable"
    ],
    answer: 2
  },
  {
    id: "python-bash-64",
    question: "What does grep commonly do?",
    options: [
      "Changes file permissions",
      "Creates compressed archives",
      "Displays disk partitions",
      "Searches text for matching patterns"
    ],
    answer: 3
  },
  {
    id: "python-bash-65",
    question: "What does awk commonly do?",
    options: [
      "Processes and analyzes structured text by fields and patterns",
      "Creates Linux users only",
      "Manages Python packages",
      "Starts Docker containers"
    ],
    answer: 0
  },
  {
    id: "python-bash-66",
    question: "What does sed commonly do?",
    options: [
      "Measures CPU usage",
      "Processes text streams, including substitutions",
      "Creates AWS IAM policies",
      "Runs Kubernetes pods"
    ],
    answer: 1
  },
  {
    id: "python-bash-67",
    question: "What is the purpose of sort and uniq in log processing?",
    options: [
      "Encrypting logs",
      "Changing file ownership",
      "Sorting lines and identifying or collapsing adjacent duplicate lines",
      "Creating user accounts"
    ],
    answer: 2
  },
  {
    id: "python-bash-68",
    question: "What does the pipe symbol | do in Bash?",
    options: [
      "Deletes the previous command",
      "Creates a directory",
      "Assigns a variable",
      "Sends one command's standard output to another command's standard input"
    ],
    answer: 3
  },
  {
    id: "python-bash-69",
    question: "What is the difference between > and >> in Bash?",
    options: [
      "> overwrites or creates a file; >> appends or creates a file",
      "> always appends; >> always deletes",
      "Both discard all output",
      "Both read input from a file"
    ],
    answer: 0
  },
  {
    id: "python-bash-70",
    question: "What does 2> error.log do?",
    options: [
      "Sends standard output to error.log",
      "Redirects standard error to error.log",
      "Reads error.log as input",
      "Deletes error.log automatically"
    ],
    answer: 1
  },
  {
    id: "python-bash-71",
    question: "What does the tee command do?",
    options: [
      "Terminates all processes",
      "Changes a file owner",
      "Writes input to standard output and to specified files",
      "Creates a Python virtual environment"
    ],
    answer: 2
  },
  {
    id: "python-bash-72",
    question: "What is cron used for?",
    options: [
      "Compiling Python modules",
      "Managing cloud IAM roles",
      "Creating Docker images",
      "Scheduling commands to run at specified times"
    ],
    answer: 3
  },
  {
    id: "python-bash-73",
    question: "What does this cron schedule mean: 0 2 * * *?",
    options: [
      "Run daily at 02:00 according to the cron environment's configured time basis",
      "Run every two minutes",
      "Run only on Sundays",
      "Run every hour at minute 30"
    ],
    answer: 0
  },
  {
    id: "python-bash-74",
    question: "What is a common purpose of a Bash trap?",
    options: [
      "Install packages",
      "Run cleanup or handling logic when a signal or shell event occurs",
      "Create a DNS record",
      "Compile source code"
    ],
    answer: 1
  },
  {
    id: "python-bash-75",
    question: "Why use mktemp in a script?",
    options: [
      "To change system time",
      "To restart a server",
      "To create a temporary file or directory safely",
      "To grant root permissions"
    ],
    answer: 2
  },
  {
    id: "python-bash-76",
    question: "Why quote variables in Bash, such as \"$filename\"?",
    options: [
      "To make every variable numeric",
      "To disable all special characters everywhere",
      "To force every command to run as root",
      "To prevent unwanted word splitting and pathname expansion"
    ],
    answer: 3
  },
  {
    id: "python-bash-77",
    question: "What is a Bash function used for?",
    options: [
      "Grouping reusable commands under a name",
      "Installing a new kernel automatically",
      "Creating only global variables",
      "Replacing all Linux commands"
    ],
    answer: 0
  },
  {
    id: "python-bash-78",
    question: "What does local do inside a Bash function?",
    options: [
      "Creates a new Linux user",
      "Declares a variable with function-local scope",
      "Changes the machine hostname",
      "Runs a command on a remote host"
    ],
    answer: 1
  },
  {
    id: "python-bash-79",
    question: "What is a here-document in Bash?",
    options: [
      "A compressed archive",
      "A DNS record type",
      "A way to provide a block of input text to a command",
      "A Python exception"
    ],
    answer: 2
  },
  {
    id: "python-bash-80",
    question: "What does the find command do?",
    options: [
      "Searches only Git repositories",
      "Installs system packages",
      "Creates a new shell",
      "Searches filesystem paths using specified criteria"
    ],
    answer: 3
  },
  {
    id: "python-bash-81",
    question: "How can Python execute a shell command more safely?",
    options: [
      "Use subprocess.run with an argument list and avoid shell=True when unnecessary",
      "Concatenate untrusted input into a shell command",
      "Disable command exit-status checking",
      "Store all commands in plaintext passwords"
    ],
    answer: 0
  },
  {
    id: "python-bash-82",
    question: "What is command injection?",
    options: [
      "A technique for improving CPU performance",
      "A vulnerability where untrusted input changes commands executed by a program",
      "A Python package installation method",
      "A method for compressing logs"
    ],
    answer: 1
  },
  {
    id: "python-bash-83",
    question: "Why should API tokens not be hardcoded in scripts?",
    options: [
      "They make scripts execute too quickly",
      "They cannot be used by APIs",
      "They can leak through source control, logs, or shared files",
      "They prevent Python from importing modules"
    ],
    answer: 2
  },
  {
    id: "python-bash-84",
    question: "What is a good practice when calling an external API from Python?",
    options: [
      "Retry every failure forever",
      "Ignore HTTP status codes",
      "Print access tokens in logs",
      "Use timeouts, validate responses, and handle HTTP errors"
    ],
    answer: 3
  },
  {
    id: "python-bash-85",
    question: "How should an HTTP 429 response generally be handled?",
    options: [
      "Respect rate limits and retry according to Retry-After or a bounded backoff policy",
      "Immediately send unlimited requests",
      "Delete the API server",
      "Ignore the response body and loop forever"
    ],
    answer: 0
  },
  {
    id: "python-bash-86",
    question: "What is exponential backoff?",
    options: [
      "Retrying at exactly the same interval forever",
      "Increasing retry delays exponentially, often with jitter",
      "Disabling network retries",
      "Restarting every server every second"
    ],
    answer: 1
  },
  {
    id: "python-bash-87",
    question: "What is idempotency in automation?",
    options: [
      "Running an operation only on Fridays",
      "Making every command destructive",
      "Repeated execution produces the same intended end state without unintended repeated effects",
      "Disabling all error handling"
    ],
    answer: 2
  },
  {
    id: "python-bash-88",
    question: "Why is idempotency important in infrastructure automation?",
    options: [
      "It eliminates the need for access control",
      "It guarantees zero network failures",
      "It makes every deployment instantaneous",
      "It makes repeated runs safer and more predictable"
    ],
    answer: 3
  },
  {
    id: "python-bash-89",
    question: "What is a dry-run mode in an automation script?",
    options: [
      "Showing or validating intended actions without performing the real changes",
      "Deleting all target resources",
      "Running without any output",
      "Disabling all safety checks"
    ],
    answer: 0
  },
  {
    id: "python-bash-90",
    question: "What is the purpose of input validation in a script?",
    options: [
      "To make all input trusted automatically",
      "To reject or handle invalid values before performing operations",
      "To disable error messages",
      "To expose credentials for debugging"
    ],
    answer: 1
  },
  {
    id: "python-bash-91",
    question: "A Python deployment script fails intermittently due to network timeouts. What is a good improvement?",
    options: [
      "Remove all timeout settings",
      "Retry forever without logging",
      "Use bounded retries with backoff, timeouts, and useful logs",
      "Ignore failed deployments"
    ],
    answer: 2
  },
  {
    id: "python-bash-92",
    question: "A Bash script works manually but fails in cron. What should you investigate?",
    options: [
      "Only the monitor resolution",
      "Only the Git repository name",
      "Only the Python comment syntax",
      "PATH, working directory, environment variables, permissions, and logs"
    ],
    answer: 3
  },
  {
    id: "python-bash-93",
    question: "A log-processing script consumes too much memory. What is a sensible improvement?",
    options: [
      "Process data incrementally instead of loading the entire file into memory",
      "Read the file into several duplicate lists",
      "Disable the operating system",
      "Increase logging verbosity without limits"
    ],
    answer: 0
  },
  {
    id: "python-bash-94",
    question: "A Bash deployment script reports success even though a command failed. What should you do?",
    options: [
      "Remove every exit code",
      "Check command statuses, handle failures explicitly, and use suitable strict-mode settings",
      "Redirect all errors to /dev/null",
      "Always end the script with exit 0"
    ],
    answer: 1
  },
  {
    id: "python-bash-95",
    question: "How can a Python script check whether a service is reachable over HTTP?",
    options: [
      "Check only the file extension",
      "Count lines in a Python file",
      "Send a request with a timeout and inspect the response or status",
      "Read the service's source code only"
    ],
    answer: 2
  },
  {
    id: "python-bash-96",
    question: "Why should a script use a lock when duplicate concurrent runs would be unsafe?",
    options: [
      "To increase duplicate execution",
      "To disable all logs",
      "To force every run to use root",
      "To prevent conflicting executions from modifying shared resources simultaneously"
    ],
    answer: 3
  },
  {
    id: "python-bash-97",
    question: "What is the best way to manage script configuration across environments?",
    options: [
      "Use validated configuration and environment variables or a suitable configuration file",
      "Hardcode production credentials in the script",
      "Use different variable names randomly",
      "Print all secrets before each run"
    ],
    answer: 0
  },
  {
    id: "python-bash-98",
    question: "What should a CI/CD pipeline do if an essential Python test fails?",
    options: [
      "Continue deployment without reporting it",
      "Fail the relevant pipeline stage and report actionable test output",
      "Delete the test files",
      "Disable future tests automatically"
    ],
    answer: 1
  },
  {
    id: "python-bash-99",
    question: "What is a good way to test Bash scripts?",
    options: [
      "Run only in production",
      "Ignore syntax errors",
      "Use syntax checks, isolated test environments, and tools such as ShellCheck",
      "Delete error-handling branches"
    ],
    answer: 2
  },
  {
    id: "python-bash-100",
    question: "What makes a production-ready DevOps automation script?",
    options: [
      "Hardcoded credentials and unlimited retries",
      "No logging or error handling",
      "Destructive commands without validation",
      "Secure configuration, input validation, clear logs, bounded retries, safe failure handling, and tests"
    ],
    answer: 3
  }
];
```
