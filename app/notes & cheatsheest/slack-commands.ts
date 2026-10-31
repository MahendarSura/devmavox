import type { DevOpsTool } from "./command-types";

export const slackTool: DevOpsTool = {
    name: "Slack",
    category: "Collaboration",
    commands: [
      { command: "curl -s https://slack.com/api/api.test", level: "Basic", english: "to test Slack API connectivity", telugu: "Slack API connectivity పరీక్షించటానికి." },
      { command: "curl -s -H 'Authorization: Bearer <token>' https://slack.com/api/auth.test", level: "Intermediate", english: "to validate a Slack token", telugu: "Slack token valid గా ఉందో చూడటానికి." },
      { command: "curl -s -H 'Authorization: Bearer <token>' https://slack.com/api/conversations.list", level: "Advanced", english: "to list conversations accessible to the token", telugu: "Token కి access ఉన్న conversations చూడటానికి." },
      { command: "curl -s -H 'Authorization: Bearer <token>' https://slack.com/api/auth.test", level: "Troubleshooting", english: "to troubleshoot Slack API authentication", telugu: "Slack API authentication సమస్యలను తనిఖీ చేయటానికి." },
    ],
  };
