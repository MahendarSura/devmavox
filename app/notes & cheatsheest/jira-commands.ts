
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

export const jiraTool: DevOpsTool = {
  name: "Jira",
  category: "Project Management",

  commands: [
    // BASIC - 5
    ...makeCommands("Basic", [
      [
        "acli jira auth status",
        "Display the authentication status of the Jira account.",
        "Jira account authentication status choodu.",
      ],
      [
        "acli jira project list --limit 20",
        "List up to 20 Jira projects visible to the authenticated user.",
        "Authenticated user ki kanipinche 20 Jira projects list choodu.",
      ],
      [
        'acli jira workitem search --jql "project = PROJ" --limit 20',
        "Search for Jira work items in a project using JQL.",
        "JQL use chesi project lo Jira work items search cheyyi.",
      ],
      [
        "acli jira workitem view PROJ-123",
        "Display details of a specific Jira work item.",
        "Specific Jira work item details choodu.",
      ],
      [
        "acli jira workitem search --jql \"assignee = currentUser()\" --limit 20",
        "List work items assigned to the current Jira user.",
        "Current Jira user ki assign ayina work items choodu.",
      ],
    ]),

    // INTERMEDIATE - 7
    ...makeCommands("Intermediate", [
      [
        'acli jira workitem create --summary "New Task" --project "PROJ" --type "Task"',
        "Create a new Jira work item in a project.",
        "Project lo kotha Jira task create cheyyi.",
      ],
      [
        'acli jira workitem edit --key "PROJ-123" --summary "Updated Task"',
        "Update the summary of an existing Jira work item.",
        "Existing Jira task summary update cheyyi.",
      ],
      [
        'acli jira workitem assign --key "PROJ-123" --assignee "@me"',
        "Assign a Jira work item to the current user.",
        "Jira work item ni current user ki assign cheyyi.",
      ],
      [
        'acli jira workitem comment --key "PROJ-123" --body "Investigation completed"',
        "Add a comment to a Jira work item.",
        "Jira work item ki comment add cheyyi.",
      ],
      [
        'acli jira workitem search --jql "project = PROJ" --fields "key,summary,assignee,status" --csv',
        "Export matching Jira work items as CSV with selected fields.",
        "Selected fields tho Jira work items CSV ga export cheyyi.",
      ],
      [
        "acli jira board list-sprints --id 123",
        "List sprints belonging to a Jira board.",
        "Jira board ki sambandhinchina sprints list choodu.",
      ],
      [
        "acli jira workitem view PROJ-123 --fields summary,comment",
        "Retrieve selected fields of a Jira work item.",
        "Jira work item lo selected fields details choodu.",
      ],
    ]),

    // ADVANCED - 6
    ...makeCommands("Advanced", [
      [
        'acli jira workitem search --jql "project = PROJ" --paginate --json',
        "Retrieve all matching work items using pagination in JSON format.",
        "Pagination use chesi matching work items JSON format lo retrieve cheyyi.",
      ],
      [
        'acli jira workitem transition --key "PROJ-123" --status "In Progress"',
        "Transition a Jira work item to a specified status.",
        "Jira work item ni specified status ki move cheyyi.",
      ],
      [
        'acli jira workitem link create --out PROJ-123 --in PROJ-456 --type Blocks',
        "Create a link between two Jira work items.",
        "Rendu Jira work items madhya link create cheyyi.",
      ],
      [
        "acli jira workitem create-bulk --from-json workitems.json",
        "Create multiple Jira work items using a JSON input file.",
        "JSON file use chesi multiple Jira work items create cheyyi.",
      ],
      [
        'acli jira workitem clone --key "PROJ-123"',
        "Create a clone of an existing Jira work item.",
        "Existing Jira work item duplicate create cheyyi.",
      ],
      [
        'acli jira workitem delete --key "PROJ-123"',
        "Delete a Jira work item.",
        "Jira work item delete cheyyi; delete mundu impact verify cheyyi.",
      ],
    ]),

    // TROUBLESHOOTING - 5
    ...makeCommands("Troubleshooting", [
      [
        "acli jira auth status",
        "Check whether the Atlassian CLI has a valid Jira authentication session.",
        "Jira CLI authentication valid ga undo ledo check cheyyi.",
      ],
      [
        "acli jira auth login --web",
        "Re-authenticate to Jira using browser-based authentication.",
        "Browser authentication use chesi Jira login malli cheyyi.",
      ],
      [
        'acli jira workitem search --jql "project = PROJ" --count',
        "Count work items matching a JQL query to verify search results.",
        "JQL query ki match ayina work items count choodu.",
      ],
      [
        "acli jira workitem view PROJ-123 --json",
        "Inspect a Jira work item in JSON format for troubleshooting.",
        "Troubleshooting kosam Jira work item JSON details choodu.",
      ],
      [
        "acli jira auth logout",
        "Sign out of the current Jira CLI authentication session.",
        "Current Jira CLI authentication session nunchi logout avvu.",
      ],
    ]),
  ],
};
