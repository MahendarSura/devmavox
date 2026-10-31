import type { DevOpsTool } from "./command-types";

export const jiraTool: DevOpsTool = {
    name: "Jira",
    category: "Collaboration",
    commands: [
      { command: "curl -I <jira-url>", level: "Basic", english: "to check whether the Jira endpoint responds", telugu: "Jira URL response ఇస్తుందో చూడటానికి." },
      { command: "curl -u <email>:<api-token> <jira-url>/rest/api/3/myself", level: "Intermediate", english: "to verify Jira API authentication", telugu: "Jira API authentication తనిఖీ చేయటానికి." },
      { command: "curl -u <email>:<api-token> <jira-url>/rest/api/3/issue/<issue-key>", level: "Advanced", english: "to retrieve issue details using the Jira API", telugu: "Jira API ద్వారా issue వివరాలు చూడటానికి." },
      { command: "curl -I <jira-url>/rest/api/3/serverInfo", level: "Troubleshooting", english: "to check the Jira server information endpoint", telugu: "Jira server information endpoint తనిఖీ చేయటానికి." },
    ],
  };
