
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

export const githubTool: DevOpsTool = {
  name: "GitHub CLI",
  category: "Version Control & Collaboration",
  commands: [
    // BASIC - 8
    ...makeCommands("Basic", [
      [
        "gh --version",
        "Displays the installed GitHub CLI version.",
        "Install ayina GitHub CLI version chupistundi.",
      ],
      [
        "gh auth status",
        "Displays the current GitHub authentication status.",
        "Current GitHub authentication status chupistundi.",
      ],
      [
        "gh repo list",
        "Lists repositories belonging to the authenticated user.",
        "Authenticated user repositories list chestundi.",
      ],
      [
        "gh repo view",
        "Displays information about the current GitHub repository.",
        "Current GitHub repository details chupistundi.",
      ],
      [
        "gh issue list",
        "Lists issues in the current repository.",
        "Current repository lo issues list chestundi.",
      ],
      [
        "gh pr list",
        "Lists pull requests in the current repository.",
        "Current repository lo pull requests list chestundi.",
      ],
      [
        "gh workflow list",
        "Lists GitHub Actions workflows in the current repository.",
        "Current repository GitHub Actions workflows list chestundi.",
      ],
      [
        "gh run list",
        "Lists recent GitHub Actions workflow runs.",
        "Recent GitHub Actions workflow runs list chestundi.",
      ],
    ]),

    // INTERMEDIATE - 10
    ...makeCommands("Intermediate", [
      [
        "gh auth login",
        "Authenticates the GitHub CLI with a GitHub account.",
        "GitHub CLI ni GitHub account tho authenticate chestundi.",
      ],
      [
        "gh browse",
        "Opens the current repository in a web browser.",
        "Current repository ni browser lo open chestundi.",
      ],
      [
        "gh repo create my-project --public",
        "Creates a public GitHub repository.",
        "Public GitHub repository create chestundi.",
      ],
      [
        "gh repo fork owner/repo",
        "Creates a fork of the specified repository.",
        "Specified repository ki fork create chestundi.",
      ],
      [
        "gh issue create --title \"Bug report\" --body \"Describe the issue\"",
        "Creates an issue in the current repository.",
        "Current repository lo issue create chestundi.",
      ],
      [
        "gh issue view 123",
        "Displays details of a specific issue.",
        "Specific issue details chupistundi.",
      ],
      [
        "gh pr create --fill",
        "Creates a pull request using information from commits.",
        "Commits information use chesi pull request create chestundi.",
      ],
      [
        "gh pr view 123",
        "Displays details of a specific pull request.",
        "Specific pull request details chupistundi.",
      ],
      [
        "gh release list",
        "Lists releases in the current repository.",
        "Current repository releases list chestundi.",
      ],
      [
        "gh search repos \"devops\"",
        "Searches GitHub repositories matching the specified query.",
        "Specified query ki match ayye GitHub repositories search chestundi.",
      ],
    ]),

    // ADVANCED - 8
    ...makeCommands("Advanced", [
      [
        "gh api repos/{owner}/{repo}",
        "Retrieves repository information through the GitHub REST API.",
        "GitHub REST API dwara repository information retrieve chestundi.",
      ],
      [
        "gh api repos/{owner}/{repo}/branches --paginate",
        "Retrieves all repository branches across API pages.",
        "API pages anni nundi repository branches retrieve chestundi.",
      ],
      [
        "gh api repos/{owner}/{repo}/issues -f title=\"Task\" -f body=\"Task details\"",
        "Creates a repository issue through the GitHub REST API.",
        "GitHub REST API dwara repository issue create chestundi.",
      ],
      [
        "gh workflow run deploy.yml --ref main",
        "Manually triggers a workflow using the specified branch or tag.",
        "Specified branch leda tag use chesi workflow manually trigger chestundi.",
      ],
      [
        "gh run download 123456789 --dir ./artifacts",
        "Downloads artifacts from a workflow run into the specified directory.",
        "Workflow run artifacts ni specified directory loki download chestundi.",
      ],
      [
        "gh secret list",
        "Lists repository Actions secrets.",
        "Repository Actions secrets list chestundi.",
      ],
      [
        "gh variable list",
        "Lists repository Actions variables.",
        "Repository Actions variables list chestundi.",
      ],
      [
        "gh release create v1.0.0 --generate-notes",
        "Creates a GitHub release and generates release notes automatically.",
        "GitHub release create chesi release notes automatic ga generate chestundi.",
      ],
    ]),

    // TROUBLESHOOTING - 10
    ...makeCommands("Troubleshooting", [
      [
        "gh auth status",
        "Checks whether GitHub CLI authentication is valid.",
        "GitHub CLI authentication valid ga undo check chestundi.",
      ],
      [
        "gh auth refresh",
        "Refreshes the stored GitHub authentication credentials.",
        "Stored GitHub authentication credentials refresh chestundi.",
      ],
      [
        "gh repo view owner/repo",
        "Checks whether a repository can be accessed.",
        "Repository access avuthundo ledo check chestundi.",
      ],
      [
        "gh pr checks 123",
        "Displays CI checks associated with a pull request.",
        "Pull request ki sambandhinchina CI checks chupistundi.",
      ],
      [
        "gh pr checks 123 --watch",
        "Watches pull request checks until they complete.",
        "Pull request checks complete ayye varaku watch chestundi.",
      ],
      [
        "gh run view 123456789",
        "Displays details and status of a workflow run.",
        "Workflow run details mariyu status chupistundi.",
      ],
      [
        "gh run view 123456789 --log-failed",
        "Displays logs for failed steps in a workflow run.",
        "Workflow run lo failed steps logs chupistundi.",
      ],
      [
        "gh run rerun 123456789 --failed",
        "Reruns only failed jobs in a workflow run.",
        "Workflow run lo failed jobs matrame rerun chestundi.",
      ],
      [
        "gh run cancel 123456789",
        "Cancels a running GitHub Actions workflow run.",
        "Running GitHub Actions workflow run cancel chestundi.",
      ],
      [
        "gh workflow enable deploy.yml",
        "Re-enables a disabled GitHub Actions workflow.",
        "Disabled GitHub Actions workflow ni malli enable chestundi.",
      ],
    ]),
  ],
};
