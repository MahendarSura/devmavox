import type { DevOpsTool } from "./command-types";

export const jenkinsTool: DevOpsTool = {
    name: "Jenkins",
    category: "CI/CD",
    commands: [
      { command: "java -version", level: "Basic", english: "to check the installed Java version", telugu: "Install అయిన Java version చూడటానికి." },
      { command: "systemctl status jenkins", level: "Intermediate", english: "to check the Jenkins service status on Linux", telugu: "Linux లో Jenkins service status చూడటానికి." },
      { command: "jenkins-cli -s <jenkins-url> list-jobs", level: "Advanced", english: "to list Jenkins jobs using the CLI", telugu: "CLI ద్వారా Jenkins jobs చూడటానికి." },
      { command: "journalctl -u jenkins -n 100 --no-pager", level: "Troubleshooting", english: "to inspect recent Jenkins service logs", telugu: "Jenkins service యొక్క చివరి logs చూడటానికి." },
      {
        command: "journalctl -u jenkins -f",
        level: "Troubleshooting",
        english: "Follow Jenkins service logs live.",
        telugu: "Jenkins service logs live ga monitor cheyyataniki.",
      },
      {
        command: "curl -I http://localhost:8080/login",
        level: "Troubleshooting",
        english: "Check whether the Jenkins login endpoint responds.",
        telugu: "Jenkins local login endpoint respond avutundo test cheyyataniki.",
      },
      {
        command: "curl -s http://localhost:8080/api/json",
        level: "Intermediate",
        english: "Query the Jenkins JSON API endpoint.",
        telugu: "Jenkins API response verify cheyyataniki; authentication/security settings consider cheyyali.",
      },
      {
        command: "jenkins-plugin-cli --list",
        level: "Intermediate",
        english: "List installed Jenkins plugins when the CLI is available.",
        telugu: "Jenkins plugins list inspect cheyyataniki.",
      },
      {
        command: "find /var/lib/jenkins/jobs -name config.xml",
        level: "Advanced",
        english: "Locate job configuration files on a standard Jenkins installation.",
        telugu: "Jenkins jobs configuration files locate cheyyataniki.",
      },
      {
        command: "df -h /var/lib/jenkins",
        level: "Basic",
        english: "Check disk space for the Jenkins home filesystem.",
        telugu: "Jenkins home filesystem disk space check cheyyataniki.",
      },
      {
        command: "du -sh /var/lib/jenkins/workspace/*",
        level: "Intermediate",
        english: "Inspect workspace directory sizes.",
        telugu: "Jenkins workspaces lo disk ekkuva use chesedi identify cheyyataniki.",
      },
      {
        command: "grep -Rni 'ERROR' /var/log/jenkins/",
        level: "Troubleshooting",
        english: "Search Jenkins logs for error messages.",
        telugu: "Jenkins logs lo errors search cheyyataniki.",
      },
      {
        command: "curl -s -u '<user>:<api-token>' 'http://localhost:8080/api/json?tree=jobs[name,color]'",
        level: "Advanced",
        english: "Query Jenkins job names and status colors through the API.",
        telugu: "Jenkins jobs status API dwara chudataniki; API token ni expose cheyyakudadhu.",
      },
      {
        command: "curl -s -u '<user>:<api-token>' 'http://localhost:8080/job/<job>/lastBuild/api/json'",
        level: "Intermediate",
        english: "Fetch details for the latest build of a job.",
        telugu: "Job latest build details API nunchi pondataniki; token safe ga handle cheyyali.",
      },
      {
        command: "curl -s -u '<user>:<api-token>' 'http://localhost:8080/job/<job>/lastBuild/consoleText",
        level: "Troubleshooting",
        english: "Fetch console output for the latest build.",
        telugu: "Latest build console log chudataniki; authentication required avvachu.",
      },
      {
        command: "sudo systemctl restart jenkins",
        level: "Advanced",
        english: "Restart the Jenkins service.",
        telugu: "Jenkins restart cheyyataniki; running jobs impact assess chesi maintenance window plan cheyyali.",
      },
      {
        command: "sudo systemctl reload jenkins",
        level: "Advanced",
        english: "Request a service reload where supported.",
        telugu: "Service reload request cheyyataniki; Jenkins/systemd setup support chestundo verify cheyyali.",
      },
      {
        command: "curl -s -o /dev/null -w '%{http_code}\\n' http://localhost:8080/login",
        level: "Troubleshooting",
        english: "Print only the HTTP status code for the login endpoint.",
        telugu: "Jenkins endpoint HTTP status code quick ga verify cheyyataniki.",
      },
      {
        command: "find /var/lib/jenkins -type f -name '*.log' -mtime -1",
        level: "Intermediate",
        english: "Find Jenkins log files changed in the last day.",
        telugu: "Last 24 hours lo modify ayina Jenkins log files vetakataniki.",
      },
      {
        command: "grep -n 'executor' /var/lib/jenkins/config.xml",
        level: "Advanced",
        english: "Locate executor configuration entries in Jenkins configuration.",
        telugu: "Jenkins executor configuration inspect cheyyataniki; config format version batti vary avvachu.",
      },
      {
        command: "curl -s -u '<user>:<api-token>' 'http://localhost:8080/queue/api/json'",
        level: "Troubleshooting",
        english: "Inspect queued Jenkins builds through the API.",
        telugu: "Build queue lo jobs enduku wait avutunnayo inspect cheyyataniki.",
      },
    ],
  };
