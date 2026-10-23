export interface JiraQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const jiraQuestions: JiraQuestion[] = [
  {
    question: "1. A production deployment fails. How can a DevOps team use Jira to track the issue?",
    options: [
      "Create a new Kubernetes cluster directly in Jira",
      "Create an incident or bug issue, assign ownership, record impact, and track resolution",
      "Delete the failed deployment logs",
      "Use Jira as a container registry"
    ],
    answer: 1
  },
  {
    question: "2. A critical production incident is reported. Which Jira practice helps ensure accountability?",
    options: [
      "Leave the issue unassigned",
      "Move the issue directly to Done",
      "Assign an owner, set priority, document impact, and track status",
      "Create duplicate issues without linking them"
    ],
    answer: 2
  },
  {
    question: "3. A developer fixes a bug, but the issue remains in To Do. What should happen?",
    options: [
      "Update the issue through the appropriate workflow transition and record the fix details",
      "Delete the Jira project",
      "Change the reporter to the project administrator",
      "Close the entire sprint"
    ],
    answer: 0
  },
  {
    question: "4. A team wants to track work from development through testing and production. What should they configure?",
    options: [
      "Only a project description",
      "Only a user profile",
      "Only a dashboard background",
      "A suitable workflow with statuses and transitions representing the delivery process"
    ],
    answer: 3
  },
  {
    question: "5. What is the main purpose of a Jira workflow?",
    options: [
      "To store Docker images",
      "To define issue statuses and the transitions between them",
      "To execute Kubernetes Pods",
      "To replace Git branching"
    ],
    answer: 1
  },
  {
    question: "6. A team cannot move an issue from In Progress to Done. What should you investigate?",
    options: [
      "Only the issue summary",
      "Only the user's browser theme",
      "Available workflow transitions, conditions, validators, permissions, and required fields",
      "The Docker image registry"
    ],
    answer: 2
  },
  {
    question: "7. What is the difference between a Jira status and a transition?",
    options: [
      "A status represents the current state; a transition moves an issue between states",
      "A status is a user account; a transition is a project",
      "They always mean exactly the same thing",
      "A transition is a dashboard gadget"
    ],
    answer: 0
  },
  {
    question: "8. A production bug must be fixed urgently without waiting for the next sprint. What is a sensible Jira approach?",
    options: [
      "Delete the current sprint",
      "Hide the bug from the team",
      "Mark every issue as complete",
      "Create or update the bug, set its priority, assign ownership, and follow the team's urgent-work process"
    ],
    answer: 3
  },
  {
    question: "9. What is the purpose of a Jira issue priority?",
    options: [
      "To specify the Git repository URL",
      "To indicate the relative urgency or importance of an issue",
      "To configure the Kubernetes namespace",
      "To store deployment credentials"
    ],
    answer: 1
  },
  {
    question: "10. Is issue priority always the same as issue severity?",
    options: [
      "Yes, in every Jira configuration",
      "Yes, because Jira cannot distinguish them",
      "No; severity describes impact, while priority helps determine how urgently work should be addressed",
      "No; priority is only used for user accounts"
    ],
    answer: 2
  },
  {
    question: "11. What is the purpose of a Jira Epic?",
    options: [
      "To group related work that contributes to a larger objective",
      "To replace all project workflows",
      "To store pipeline passwords",
      "To execute a Jenkins build"
    ],
    answer: 0
  },
  {
    question: "12. A DevOps team is migrating applications to Kubernetes. How can Jira help organize the work?",
    options: [
      "Create one issue and never update it",
      "Track everything only in email",
      "Use every task as a separate project",
      "Create an Epic and link related stories, tasks, risks, and migration work"
    ],
    answer: 3
  },
  {
    question: "13. What is the purpose of linking Jira issues?",
    options: [
      "To automatically merge their Git branches",
      "To express relationships such as blocks, is blocked by, or relates to",
      "To give every user administrator access",
      "To change every issue into an Epic"
    ],
    answer: 1
  },
  {
    question: "14. A database migration must finish before an application deployment. How should the dependency be represented?",
    options: [
      "Assign both issues the same summary",
      "Create unrelated duplicate issues",
      "Link the issues with an appropriate dependency relationship such as blocks / is blocked by",
      "Change both issue types to Bug"
    ],
    answer: 2
  },
  {
    question: "15. What is a Jira sub-task useful for?",
    options: [
      "Breaking a parent issue into smaller pieces of work",
      "Creating a new Jira organization",
      "Replacing a release",
      "Storing a complete Docker image"
    ],
    answer: 0
  },
  {
    question: "16. A team needs to track who reported a production issue and who is fixing it. Which fields are relevant?",
    options: [
      "Only Sprint",
      "Only Labels",
      "Only Resolution",
      "Reporter and Assignee"
    ],
    answer: 3
  },
  {
    question: "17. What does the Resolution field generally represent in Jira?",
    options: [
      "The issue's current assignee",
      "The outcome or reason an issue was resolved",
      "The project's URL",
      "The number of comments"
    ],
    answer: 1
  },
  {
    question: "18. An issue is reopened but still has a resolved outcome recorded. What should you check?",
    options: [
      "Only the dashboard layout",
      "Only the project avatar",
      "Whether the workflow correctly clears the Resolution field when reopening",
      "The Docker daemon configuration"
    ],
    answer: 2
  },
  {
    question: "19. What is a Jira board primarily used for?",
    options: [
      "Visualizing and managing work items through a workflow",
      "Storing application container layers",
      "Replacing the source code repository",
      "Running infrastructure commands"
    ],
    answer: 0
  },
  {
    question: "20. What is the difference between a Scrum board and a Kanban board?",
    options: [
      "Scrum boards cannot display issues",
      "Kanban boards require every task to have story points",
      "Scrum boards are only for security incidents",
      "Scrum boards support sprint-based work; Kanban boards focus on continuous flow and work-in-progress"
    ],
    answer: 3
  },
  {
    question: "21. A team repeatedly carries unfinished work into the next sprint. What should they examine?",
    options: [
      "Only the Jira project name",
      "Sprint capacity, estimation, dependencies, scope changes, and blockers",
      "Only the board background",
      "Only the number of project administrators"
    ],
    answer: 1
  },
  {
    question: "22. What is the purpose of a sprint retrospective?",
    options: [
      "To deploy every issue to production",
      "To change all issues into bugs",
      "To identify what went well and what the team can improve",
      "To replace sprint planning"
    ],
    answer: 2
  },
  {
    question: "23. What does a burndown chart typically show?",
    options: [
      "Remaining work over time during a sprint or release",
      "Only the number of Jira users",
      "Container CPU utilization",
      "The number of Git repositories"
    ],
    answer: 0
  },
  {
    question: "24. What does a cumulative flow diagram help identify?",
    options: [
      "Expired user passwords only",
      "The exact cause of every production outage",
      "The Docker image digest",
      "Work distribution across workflow states and possible bottlenecks"
    ],
    answer: 3
  },
  {
    question: "25. What is the purpose of a WIP limit on a Kanban board?",
    options: [
      "To increase the number of active tasks without restriction",
      "To limit work in progress and help expose bottlenecks",
      "To prevent all issues from being assigned",
      "To force every task into Done"
    ],
    answer: 1
  },
  {
    question: "26. What does velocity commonly measure in Scrum?",
    options: [
      "The server's network bandwidth",
      "The number of Jenkins agents",
      "The amount of estimated work completed in a sprint",
      "The number of Jira administrators"
    ],
    answer: 2
  },
  {
    question: "27. Should velocity be used as a direct performance comparison between different teams?",
    options: [
      "No; estimation scales and team contexts differ, so velocity is mainly useful for a team's own planning",
      "Yes; every team estimates identically",
      "Yes; velocity measures production uptime",
      "No; velocity cannot support sprint planning"
    ],
    answer: 0
  },
  {
    question: "28. What is a sprint goal?",
    options: [
      "A list of every possible future feature",
      "A list of Jenkins credentials",
      "A report of all closed bugs",
      "The shared objective the team aims to achieve during the sprint"
    ],
    answer: 3
  },
  {
    question: "29. What is a good way to manage a blocker discovered during a sprint?",
    options: [
      "Wait until the sprint ends before informing anyone",
      "Record the blocker, communicate it, identify an owner, and track resolution",
      "Delete the blocked issue",
      "Change its status to Done without completing it"
    ],
    answer: 1
  },
  {
    question: "30. What is the purpose of a Definition of Done?",
    options: [
      "To specify the Jira administrator's duties",
      "To replace all acceptance criteria",
      "To establish shared completion criteria for work",
      "To automatically approve production changes"
    ],
    answer: 2
  },
  {
    question: "31. What is JQL used for?",
    options: [
      "Searching and filtering Jira issues using structured query expressions",
      "Executing shell commands on agents",
      "Building Docker images",
      "Creating Kubernetes namespaces"
    ],
    answer: 0
  },
  {
    question: "32. Which JQL query finds issues assigned to the current user that are not Done?",
    options: [
      "assignee = everyone AND status = Done",
      "project = current AND resolution = all",
      "user = current AND task = open",
      "assignee = currentUser() AND statusCategory != Done"
    ],
    answer: 3
  },
  {
    question: "33. Which JQL query finds unresolved issues in a project named DEVOPS?",
    options: [
      "project = DEVOPS AND status = Done",
      "project = DEVOPS AND resolution IS EMPTY",
      "project = DEVOPS AND assignee IS EMPTY",
      "project = DEVOPS AND priority IS EMPTY"
    ],
    answer: 1
  },
  {
    question: "34. Which JQL query searches for high-priority unresolved issues?",
    options: [
      "priority = Low AND resolution IS NOT EMPTY",
      "status = Done AND priority = High",
      "priority = High AND resolution IS EMPTY",
      "assignee = High AND status = Open"
    ],
    answer: 2
  },
  {
    question: "35. Which JQL query finds issues updated during the last seven days?",
    options: [
      "updated >= -7d",
      "updated = lastweekonly()",
      "modified > seven_days",
      "updated IN lastSevenDays"
    ],
    answer: 0
  },
  {
    question: "36. Which JQL query finds issues created by the current user?",
    options: [
      "assignee = currentUser()",
      "reporter = myself",
      "creator = loggedInUser",
      "reporter = currentUser()"
    ],
    answer: 3
  },
  {
    question: "37. What does `ORDER BY priority DESC` do in JQL?",
    options: [
      "Deletes low-priority issues",
      "Sorts results by priority in descending order",
      "Changes every issue's priority",
      "Filters only completed issues"
    ],
    answer: 1
  },
  {
    question: "38. Which JQL operator checks whether a field has no value?",
    options: [
      "EMPTY()",
      "NULL ONLY",
      "IS EMPTY",
      "WITHOUT"
    ],
    answer: 2
  },
  {
    question: "39. What does the JQL `IN` operator commonly do?",
    options: [
      "Matches a field against multiple specified values",
      "Creates a new issue",
      "Moves an issue to another workflow status",
      "Assigns issues to every user"
    ],
    answer: 0
  },
  {
    question: "40. A saved JQL filter returns no issues unexpectedly. What should you check?",
    options: [
      "Only the Jira logo",
      "Only the number of board columns",
      "Only the user's display name",
      "Project scope, field values, query syntax, permissions, and selected filters"
    ],
    answer: 3
  },
  {
    question: "41. What is the purpose of a saved Jira filter?",
    options: [
      "To store a production database backup",
      "To save a reusable issue search for reports, dashboards, or boards",
      "To execute an Ansible playbook",
      "To replace project permissions"
    ],
    answer: 1
  },
  {
    question: "42. A colleague cannot access a shared Jira filter. What should you investigate?",
    options: [
      "The colleague's Docker version",
      "The sprint's story-point total",
      "The filter's sharing settings and the colleague's project permissions",
      "The Jenkins controller's memory"
    ],
    answer: 2
  },
  {
    question: "43. What is a Jira dashboard used for?",
    options: [
      "Displaying selected reports and gadgets for monitoring work",
      "Executing Kubernetes deployments directly by default",
      "Replacing Jira issue workflows",
      "Storing Git repository contents"
    ],
    answer: 0
  },
  {
    question: "44. A manager wants a dashboard of open production incidents by priority. What is a suitable approach?",
    options: [
      "Create one issue per dashboard",
      "Use a Docker container to store issue descriptions",
      "Disable issue permissions",
      "Create an appropriate JQL filter and display it using a suitable dashboard gadget"
    ],
    answer: 3
  },
  {
    question: "45. Why might a Jira dashboard gadget show fewer issues for one user than another?",
    options: [
      "Jira randomly removes issues from dashboards",
      "Users may have different issue permissions or filter-sharing access",
      "The dashboard color changes issue visibility",
      "Jira dashboards cannot use filters"
    ],
    answer: 1
  },
  {
    question: "46. What is the purpose of a Jira component in a software project?",
    options: [
      "To define a Jenkins executor",
      "To store container registry passwords",
      "To categorize issues by product or system area within a project",
      "To create a Git commit"
    ],
    answer: 2
  },
  {
    question: "47. How can labels help a DevOps team in Jira?",
    options: [
      "They provide flexible tags for grouping and filtering related issues",
      "They automatically deploy applications",
      "They replace all issue types",
      "They create Kubernetes Secrets"
    ],
    answer: 0
  },
  {
    question: "48. What is the risk of creating many inconsistent labels?",
    options: [
      "Labels automatically remove issue history",
      "Labels prevent all JQL searches",
      "Labels disable workflows",
      "Reporting and filtering become harder because similar work is tagged inconsistently"
    ],
    answer: 3
  },
  {
    question: "49. What is the purpose of Jira issue types?",
    options: [
      "To define the Git hosting provider",
      "To classify work, such as Bug, Task, Story, Epic, or a configured incident type",
      "To determine the Kubernetes node size",
      "To configure Jenkins agent labels"
    ],
    answer: 1
  },
  {
    question: "50. A team needs a dedicated issue type for change requests. What should an administrator consider?",
    options: [
      "Changing every existing issue to Bug",
      "Creating a separate Jira instance for every request",
      "Configuring an appropriate issue type and its screens, workflow, and permissions as needed",
      "Using a dashboard gadget instead of an issue type"
    ],
    answer: 2
  },
  {
    question: "51. How can Jira integrate with Jenkins in a CI/CD workflow?",
    options: [
      "Through a suitable integration, app, or API that links builds and deployment activity to Jira issues",
      "By using Jira as the Jenkins operating system",
      "By replacing every Jenkinsfile with a Jira comment",
      "By storing Jenkins agents as Jira users"
    ],
    answer: 0
  },
  {
    question: "52. What helps Jenkins or another CI system associate a build with a Jira issue?",
    options: [
      "Using the same dashboard color",
      "Naming every build `production`",
      "Changing the Jira project icon",
      "Including a recognizable Jira issue key in commit messages or branch names, with a compatible integration"
    ],
    answer: 3
  },
  {
    question: "53. A Jira issue does not show development or build information. What should you check?",
    options: [
      "Only the issue's priority",
      "Integration configuration, repository connection, issue-key references, and user permissions",
      "Only the sprint start date",
      "Only the dashboard layout"
    ],
    answer: 1
  },
  {
    question: "54. Why should a CI pipeline update Jira issue status carefully?",
    options: [
      "Every successful build means the issue is fully complete",
      "Jira status cannot be automated",
      "A build event may not mean the work satisfies testing, review, or release requirements",
      "Every pipeline should close all open issues"
    ],
    answer: 2
  },
  {
    question: "55. What is a suitable way to record a deployment in Jira?",
    options: [
      "Use an appropriate deployment integration or API and link the deployment to relevant issues and versions",
      "Only change the issue summary to Deployed",
      "Delete the deployment logs",
      "Create duplicate Jira projects for every build"
    ],
    answer: 0
  },
  {
    question: "56. What is a Jira Version or Fix Version commonly used for?",
    options: [
      "To identify the Jenkins version",
      "To configure the issue's browser",
      "To set the project's administrator password",
      "To associate issues with a planned or delivered product release"
    ],
    answer: 3
  },
  {
    question: "57. A release contains several unresolved high-priority bugs. What should the team do?",
    options: [
      "Delete those issues before releasing",
      "Review release readiness, impact, risk acceptance, and the agreed release criteria",
      "Automatically mark them as fixed",
      "Remove the release version from Jira"
    ],
    answer: 1
  },
  {
    question: "58. What is the purpose of a release report in Jira?",
    options: [
      "To provision cloud infrastructure",
      "To replace the test suite",
      "To summarize release-related work and its completion state",
      "To store Git credentials"
    ],
    answer: 2
  },
  {
    question: "59. What is the benefit of linking a production incident to the change or deployment that caused it?",
    options: [
      "It improves traceability and supports investigation of change-related failures",
      "It guarantees there will be no further incidents",
      "It deletes the original incident history",
      "It disables monitoring alerts"
    ],
    answer: 0
  },
  {
    question: "60. How can Jira support a post-incident review?",
    options: [
      "By automatically proving who is at fault",
      "By replacing application logs",
      "By removing all incident comments",
      "By tracking impact, timeline, root-cause findings, follow-up actions, and owners"
    ],
    answer: 3
  },
  {
    question: "61. What is Jira Automation used for?",
    options: [
      "Running every shell command on the production server",
      "Automating issue actions using triggers, conditions, and actions",
      "Replacing the Kubernetes control plane",
      "Compiling application source code by default"
    ],
    answer: 1
  },
  {
    question: "62. A team wants to notify an issue's assignee when a high-priority bug is created. What can help?",
    options: [
      "A manual dashboard refresh only",
      "A Git merge strategy",
      "A Jira Automation rule with an issue-created trigger and appropriate conditions/actions",
      "A Docker health check"
    ],
    answer: 2
  },
  {
    question: "63. What is a trigger in a Jira Automation rule?",
    options: [
      "The event that starts the rule",
      "The issue's project icon",
      "The user's password",
      "A permanent replacement for issue status"
    ],
    answer: 0
  },
  {
    question: "64. What is the purpose of a condition in Jira Automation?",
    options: [
      "To create a new Jira organization",
      "To change every issue's assignee",
      "To execute a Docker build",
      "To determine whether the rule should continue based on specified criteria"
    ],
    answer: 3
  },
  {
    question: "65. A Jira automation rule updates an issue, which triggers the same rule repeatedly. What should you investigate?",
    options: [
      "Only the dashboard's title",
      "Rule triggers, conditions, self-trigger settings, and safeguards against recursive updates",
      "Only the sprint name",
      "The Jenkins agent operating system"
    ],
    answer: 1
  },
  {
    question: "66. What is a smart value in Jira Automation?",
    options: [
      "A paid user license",
      "A Kubernetes resource limit",
      "A placeholder expression that accesses contextual data during rule execution",
      "A Git repository permission"
    ],
    answer: 2
  },
  {
    question: "67. What should you do when a Jira Automation rule fails unexpectedly?",
    options: [
      "Inspect the rule's audit log, execution details, permissions, and failed action",
      "Delete the entire Jira project immediately",
      "Disable every workflow permanently",
      "Change all issue types to Task"
    ],
    answer: 0
  },
  {
    question: "68. Why might an automation rule fail to transition an issue?",
    options: [
      "Jira issues cannot change status",
      "The issue has a long summary",
      "The dashboard is private",
      "The transition may be unavailable, or the rule actor may lack permissions or required fields"
    ],
    answer: 3
  },
  {
    question: "69. What is the purpose of the Jira REST API?",
    options: [
      "To replace the Jira database with a spreadsheet",
      "To let authorized applications interact with Jira resources programmatically",
      "To run Kubernetes Pods directly",
      "To build Docker images without a build tool"
    ],
    answer: 1
  },
  {
    question: "70. A script receives HTTP 401 when calling the Jira API. What should you check?",
    options: [
      "Only the issue's sprint",
      "Only the dashboard permissions",
      "Authentication credentials, authentication method, and token validity",
      "Only the Jira issue type"
    ],
    answer: 2
  },
  {
    question: "71. A Jira API request returns HTTP 403. What is a likely area to investigate?",
    options: [
      "The authenticated identity's permissions and access to the requested resource",
      "Only the issue's title",
      "Only the browser's screen resolution",
      "The Docker image's entrypoint"
    ],
    answer: 0
  },
  {
    question: "72. A Jira API request returns HTTP 429. What should a well-designed client do?",
    options: [
      "Immediately send unlimited additional requests",
      "Delete all saved filters",
      "Disable authentication",
      "Respect rate limits and retry with suitable backoff, following server guidance"
    ],
    answer: 3
  },
  {
    question: "73. Why should API tokens be stored outside scripts committed to Git?",
    options: [
      "Tokens cannot be sent in HTTP requests",
      "This reduces the risk of exposing credentials in source control and logs",
      "Jira requires tokens in source files",
      "It improves the dashboard color scheme"
    ],
    answer: 1
  },
  {
    question: "74. What is a sensible way to handle paginated Jira API results?",
    options: [
      "Assume every response contains every issue",
      "Request the same first page forever",
      "Follow the API's pagination fields until the required results are retrieved",
      "Disable all API limits"
    ],
    answer: 2
  },
  {
    question: "75. Why should API integrations avoid making unnecessary repeated requests?",
    options: [
      "To reduce latency, load, and the chance of hitting rate limits",
      "Because Jira cannot process JSON",
      "Because every API call creates a new project",
      "Because APIs cannot return issue details"
    ],
    answer: 0
  },
  {
    question: "76. What is a good approach when a Jira integration must create many issues?",
    options: [
      "Retry every request forever without checking its result",
      "Expose API credentials in build output",
      "Create duplicate issues on every retry",
      "Use supported bulk operations where appropriate, handle errors, and make retries safe"
    ],
    answer: 3
  },
  {
    question: "77. What is a Jira permission scheme?",
    options: [
      "A template for Docker images",
      "A configuration that defines permissions granted to users, groups, or project roles",
      "A list of Kubernetes nodes",
      "A Jenkins pipeline stage"
    ],
    answer: 1
  },
  {
    question: "78. A user can browse a project but cannot edit an issue. What should you investigate?",
    options: [
      "Only the issue's priority",
      "Only the release version",
      "Edit Issues permission, project role/group membership, issue security, and applicable restrictions",
      "The Docker registry's access policy"
    ],
    answer: 2
  },
  {
    question: "79. What is issue security used for?",
    options: [
      "Restricting visibility of specific issues to permitted users or groups",
      "Encrypting every Jira database automatically",
      "Replacing all project permissions",
      "Running automatic deployments"
    ],
    answer: 0
  },
  {
    question: "80. Why should Jira administrators review project permissions regularly?",
    options: [
      "To ensure every user becomes an administrator",
      "To eliminate the need for issue tracking",
      "To make every project publicly accessible",
      "To reduce excessive access and keep permissions aligned with team responsibilities"
    ],
    answer: 3
  },
  {
    question: "81. What is the purpose of a Jira notification scheme?",
    options: [
      "To define Kubernetes network routes",
      "To configure which events send notifications to relevant recipients",
      "To store build artifacts",
      "To set Docker resource limits"
    ],
    answer: 1
  },
  {
    question: "82. A user does not receive expected Jira notifications. What should you check?",
    options: [
      "Only the user's avatar",
      "Only the sprint's start date",
      "Notification scheme, recipient permissions, user notification settings, and delivery issues",
      "The Kubernetes Deployment strategy"
    ],
    answer: 2
  },
  {
    question: "83. Why is assigning every issue to a single team lead a poor practice?",
    options: [
      "It can create bottlenecks and hide actual ownership of work",
      "Jira does not support assignees",
      "It automatically deletes all issues",
      "It prevents all users from commenting"
    ],
    answer: 0
  },
  {
    question: "84. What is a good practice for issue descriptions in DevOps work?",
    options: [
      "Use only the word urgent for every issue",
      "Avoid recording evidence",
      "Store credentials in the description",
      "Include impact, reproduction steps, expected and actual behavior, evidence, and acceptance criteria as appropriate"
    ],
    answer: 3
  },
  {
    question: "85. What is the purpose of acceptance criteria?",
    options: [
      "To select the Jenkins controller",
      "To describe the conditions that must be met for a work item to be accepted",
      "To define the Jira password policy",
      "To choose the Kubernetes cluster region"
    ],
    answer: 1
  },
  {
    question: "86. A bug report says only 'deployment failed'. What information would improve it?",
    options: [
      "Only a new issue label",
      "Only the reporter's display name",
      "Environment, deployment version, error logs, reproduction steps, impact, and timing",
      "Only the dashboard URL"
    ],
    answer: 2
  },
  {
    question: "87. What is the value of adding logs or screenshots to a Jira issue?",
    options: [
      "They provide evidence that can help investigation, provided sensitive data is removed",
      "They guarantee an immediate fix",
      "They automatically change the workflow",
      "They replace the need to describe the problem"
    ],
    answer: 0
  },
  {
    question: "88. Before attaching production logs to Jira, what should you consider?",
    options: [
      "Make all attachments public",
      "Include passwords to simplify debugging",
      "Disable access control",
      "Remove or protect secrets, tokens, personal data, and other sensitive information"
    ],
    answer: 3
  },
  {
    question: "89. What is a useful approach for tracking recurring incidents in Jira?",
    options: [
      "Close every incident without analysis",
      "Link related incidents and track root-cause or problem-management work",
      "Create unrelated projects for every occurrence",
      "Remove historical incident data"
    ],
    answer: 1
  },
  {
    question: "90. Why should a post-incident action have a clear owner and due date?",
    options: [
      "To guarantee the issue cannot recur",
      "To replace technical monitoring",
      "To make follow-up work accountable and easier to track",
      "To remove the need for a post-incident review"
    ],
    answer: 2
  },
  {
    question: "91. A Jira board does not display an issue that exists in the project. What should you check?",
    options: [
      "The board's saved filter, column/status mapping, quick filters, and issue permissions",
      "Only the issue's comments",
      "Only the browser theme",
      "Only the Jenkins build number"
    ],
    answer: 0
  },
  {
    question: "92. A workflow status exists, but issues in that status do not appear in the expected board column. What is a likely cause?",
    options: [
      "Jira cannot display custom statuses",
      "The issue has no description",
      "The reporter is not an administrator",
      "The status may not be mapped to a board column"
    ],
    answer: 3
  },
  {
    question: "93. What is a common reason a Jira report shows incorrect sprint results?",
    options: [
      "Jira reports never use issue data",
      "Incorrect sprint scope, issue estimation, status mapping, or data updates may affect the report",
      "The Jira logo is outdated",
      "The project's URL is too short"
    ],
    answer: 1
  },
  {
    question: "94. How can a DevOps team use Jira to improve change traceability?",
    options: [
      "Record deployments only in private chat messages",
      "Avoid linking issues to code changes",
      "Link issues to commits, pull requests, builds, releases, and deployments through appropriate integrations",
      "Delete issue history after each release"
    ],
    answer: 2
  },
  {
    question: "95. What is an effective way to track infrastructure changes using Jira?",
    options: [
      "Create change tasks with scope, risk, approvals, implementation steps, validation, and rollback plans",
      "Store all infrastructure secrets in Jira comments",
      "Mark changes Done before implementation",
      "Avoid recording affected environments"
    ],
    answer: 0
  },
  {
    question: "96. A production change requires approval before implementation. What should the team use?",
    options: [
      "A public issue with no access controls",
      "A dashboard gadget alone",
      "An issue label without a workflow",
      "An appropriate change-management workflow with required approvals and permission controls"
    ],
    answer: 3
  },
  {
    question: "97. Why should a Jira workflow avoid unnecessary statuses and transitions?",
    options: [
      "More statuses always improve delivery speed",
      "Excessive workflow complexity can confuse users and make reporting and automation harder",
      "Jira supports only three statuses",
      "Every transition must create a new project"
    ],
    answer: 1
  },
  {
    question: "98. How should teams handle a Jira automation rule that changes issue fields unexpectedly?",
    options: [
      "Delete every issue affected without investigating",
      "Give the rule unrestricted permissions",
      "Review its audit history, trigger, conditions, actions, and recent configuration changes",
      "Disable all issue notifications permanently"
    ],
    answer: 2
  },
  {
    question: "99. Which Jira practice best supports DevOps collaboration between developers and operations?",
    options: [
      "Shared visibility of work, clear ownership, linked delivery records, and timely communication",
      "Keeping incidents invisible to developers",
      "Tracking every deployment outside all team systems",
      "Preventing operations engineers from commenting"
    ],
    answer: 0
  },
  {
    question: "100. Which approach best describes effective Jira use in a production DevOps environment?",
    options: [
      "Use Jira only as a list of unassigned tasks",
      "Automatically close all issues after every build",
      "Track incidents without owners, evidence, or follow-up",
      "Use clear workflows, actionable issues, JQL reporting, controlled automation, CI/CD traceability, and permission management"
    ],
    answer: 3
  }
];
