
import type { DevOpsTool } from "./command-types";

type CommandLevel = DevOpsTool["commands"][number]["level"];

const makeCommands = (
  level: CommandLevel,
  rows: [string, string, string][]
) =>
  rows.map(([command, english, telugu]) => ({
    command,
    level,
    english,
    telugu,
  }));

export const jenkinsTool: DevOpsTool = {
  name: "Jenkins",
  category: "CI/CD",

  commands: [
    // BASIC - 7
    ...makeCommands("Basic", [
      [
        "java -version",
        "Display the installed Java version.",
        "Install ayina Java version choodu.",
      ],
      [
        'curl -fsSLo jenkins-cli.jar "$JENKINS_URL/jnlpJars/jenkins-cli.jar"',
        "Download the Jenkins CLI client from the controller.",
        "Jenkins controller nunchi CLI jar download cheyyi.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" help',
        "Display available Jenkins CLI commands.",
        "Available Jenkins CLI commands choodu.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" list-jobs',
        "List Jenkins jobs available to the authenticated user.",
        "Jenkins jobs list choodu.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" -auth "$JENKINS_USER_ID:$JENKINS_API_TOKEN" who-am-i',
        "Display the authenticated Jenkins user and permissions.",
        "Login ayina Jenkins user, permissions choodu.",
      ],
      [
        "jenkins-plugin-cli --list",
        "List installed and bundled Jenkins plugins.",
        "Install ayina, bundled Jenkins plugins list choodu.",
      ],
      [
        "df -h /var/lib/jenkins",
        "Check disk space available on the Jenkins home filesystem.",
        "Jenkins home filesystem disk space check cheyyi.",
      ],
    ]),

    // INTERMEDIATE - 9
    ...makeCommands("Intermediate", [
      [
        'curl -fsS --user "$JENKINS_USER_ID:$JENKINS_API_TOKEN" "$JENKINS_URL/api/json"',
        "Retrieve Jenkins controller information through the JSON API.",
        "Jenkins controller details JSON API dwara choodu.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" build <job-name>',
        "Trigger a Jenkins job or Pipeline build.",
        "Jenkins job or Pipeline build trigger cheyyi.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" console <job-name>',
        "Display console output for the latest build.",
        "Latest build console output choodu.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" install-plugin <plugin-id>',
        "Install a plugin from the configured Jenkins Update Center.",
        "Jenkins Update Center nunchi plugin install cheyyi.",
      ],
      [
        "du -sh /var/lib/jenkins/workspace/*",
        "Inspect the disk usage of Jenkins workspace directories.",
        "Jenkins workspaces disk usage check cheyyi.",
      ],
      [
        "find /var/lib/jenkins -type f -name '*.log' -mtime -1",
        "Find Jenkins log files modified within the last 24 hours.",
        "Last 24 hours lo modify ayina Jenkins log files vetuku.",
      ],
      [
        'curl -fsS --user "$JENKINS_USER_ID:$JENKINS_API_TOKEN" "$JENKINS_URL/job/<job-name>/lastBuild/api/json"',
        "Retrieve JSON details of the latest build for a job.",
        "Job latest build details JSON API nunchi choodu.",
      ],
      [
        "find /var/lib/jenkins/jobs -name config.xml",
        "Locate job configuration files in a standard Jenkins home directory.",
        "Jenkins jobs configuration files locate cheyyi.",
      ],
      [
        "grep -n 'executor' /var/lib/jenkins/config.xml",
        "Find executor configuration entries in Jenkins configuration.",
        "Jenkins executor configuration entries search cheyyi.",
      ],
    ]),

    // ADVANCED - 7
    ...makeCommands("Advanced", [
      [
        'curl -fsS --user "$JENKINS_USER_ID:$JENKINS_API_TOKEN" "$JENKINS_URL/api/json?tree=jobs[name,color]"',
        "Retrieve Jenkins job names and status colors through the API.",
        "Jenkins jobs names, status colors API dwara choodu.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" build <job-name> -s -v',
        "Trigger a build, wait for completion, and display console output.",
        "Build trigger chesi complete ayye varaku wait chesi output choodu.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" build <job-name> -c',
        "Poll SCM changes before deciding whether to trigger a build.",
        "Build trigger cheyyadaniki mundu SCM changes check cheyyi.",
      ],
      [
        'java -jar jenkins-cli.jar -s "$JENKINS_URL" install-plugin <plugin-id> -restart',
        "Install a plugin and restart Jenkins after installation.",
        "Plugin install chesi Jenkins restart cheyyi.",
      ],
      [
        "sudo systemctl restart jenkins",
        "Restart the Jenkins service.",
        "Jenkins service restart cheyyi.",
      ],
      [
        "sudo systemctl daemon-reload",
        "Reload systemd unit definitions after service configuration changes.",
        "Service configuration changes tarvata systemd definitions reload cheyyi.",
      ],
      [
        "sudo systemctl cat jenkins",
        "Display the Jenkins systemd service unit and overrides.",
        "Jenkins systemd service configuration choodu.",
      ],
    ]),

    // TROUBLESHOOTING - 9
    ...makeCommands("Troubleshooting", [
      [
        "sudo systemctl status jenkins",
        "Check whether the Jenkins service is running.",
        "Jenkins service running lo undo ledo check cheyyi.",
      ],
      [
        "sudo journalctl -u jenkins -n 100 --no-pager",
        "Inspect the latest 100 Jenkins service log entries.",
        "Jenkins latest 100 service logs choodu.",
      ],
      [
        "sudo journalctl -u jenkins -f",
        "Follow Jenkins service logs in real time.",
        "Jenkins service logs real-time lo monitor cheyyi.",
      ],
      [
        "sudo systemctl start jenkins",
        "Start the Jenkins service.",
        "Jenkins service start cheyyi.",
      ],
      [
        'curl -sS -o /dev/null -w "%{http_code}\\n" "$JENKINS_URL/login"',
        "Check the HTTP status code returned by the Jenkins login endpoint.",
        "Jenkins login endpoint HTTP status code check cheyyi.",
      ],
      [
        "grep -Rni 'ERROR' /var/log/jenkins/",
        "Search Jenkins log files for error messages.",
        "Jenkins log files lo ERROR messages search cheyyi.",
      ],
      [
        'curl -fsS --user "$JENKINS_USER_ID:$JENKINS_API_TOKEN" "$JENKINS_URL/job/<job-name>/lastBuild/consoleText"',
        "Retrieve console output for the latest build using the Jenkins API.",
        "Latest build console output API dwara choodu.",
      ],
      [
        'curl -fsS --user "$JENKINS_USER_ID:$JENKINS_API_TOKEN" "$JENKINS_URL/queue/api/json"',
        "Inspect Jenkins builds waiting in the queue.",
        "Jenkins build queue lo wait avutunna jobs inspect cheyyi.",
      ],
      [
        "curl -I http://localhost:8080/login",
        "Inspect HTTP response headers from the local Jenkins login endpoint.",
        "Local Jenkins login endpoint response headers check cheyyi.",
      ],
    ]),
  ],
};
