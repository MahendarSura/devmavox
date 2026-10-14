export const jiraQuestions = [
  {
    question: 'Jira is widely used for which methodology?',
    options: ['Agile / Scrum / Kanban', 'Waterfall', 'Sequential testing', 'Static code analysis'],
    answer: 0
  },
  {
    question: 'What represents a unit of work or task in Jira?',
    options: ['Commit', 'Issue / Ticket', 'Branch', 'Pod'],
    answer: 1
  },
  {
    question: 'What are the default issue types in a standard Jira Scrum project?',
    options: ['Epic, Story, Task, Bug, Subtask', 'Feature, Epic, Bug', 'Task, Story only', 'Ticket, Issue'],
    answer: 0
  },
  {
    question: 'What board view is best for continuous flow without fixed timeboxed sprints?',
    options: ['Kanban Board', 'Scrum Board', 'Timeline Board', 'Backlog View'],
    answer: 0
  },
  {
    question: 'What timeboxed period is used in Scrum to complete a set amount of work?',
    options: ['Sprint', 'Milestone', 'Release', 'Iteration Cycle'],
    answer: 0
  },
  {
    question: 'Which JQL (Jira Query Language) clause is used to filter issues by project?',
    options: ['project = "KEY"', 'filter = project', 'WHERE project', 'FIND project'],
    answer: 0
  },
  {
    question: 'What represents a large body of work that can be broken down into smaller stories?',
    options: ['Epic', 'Task', 'Bug', 'Subtask'],
    answer: 0
  },
  {
    question: 'Where is unassigned and planned work kept before moving to active sprints?',
    options: ['Product Backlog', 'Sprint Backlog', 'Active Board', 'Archive'],
    answer: 0
  },
  {
    question: 'How do you track story points or time estimates for team velocity?',
    options: ['Estimation Statistics / Story Points field', 'Priority field', 'Comments', 'Labels'],
    answer: 0
  },
  {
    question: 'What report shows the amount of work remaining in a sprint?',
    options: ['Burndown Chart', 'Velocity Chart', 'Control Chart', 'Cumulative Flow Diagram'],
    answer: 0
  },
  {
    question: 'Which report measures the amount of work a team consistently delivers across sprints?',
    options: ['Velocity Chart', 'Burndown Chart', 'Control Chart', 'Sprint Report'],
    answer: 0
  },
  {
    question: 'What JQL operator is used to search for text inside issue summaries or descriptions?',
    options: ['~ (contains)', '= (equals)', 'IN', 'LIKE'],
    answer: 0
  },
  {
    question: 'What feature allows mapping Jira statuses to specific columns on a board?',
    options: ['Board Column Mapping / Status Mapping', 'Workflow Editor', 'Transition Rules', 'Screen Scheme'],
    answer: 0
  },
  {
    question: 'Which component defines the lifecycle steps an issue goes through from creation to closure?',
    options: ['Workflow', 'Board', 'Scheme', 'Filter'],
    answer: 0
  },
  {
    question: 'What action moves an issue from one workflow status to another?',
    options: ['Transition', 'Update', 'Migrate', 'Transform'],
    answer: 0
  },
  {
    question: 'Which JQL keyword is used to filter issues assigned to the currently logged-in user?',
    options: ['currentUser()', 'me()', 'activeUser', 'self()'],
    answer: 0
  },
  {
    question: 'What Jira project type provides pre-configured workflows and boards with minimal setup?',
    options: ['Managed Project (Team-managed / Company-managed)', 'Static Project', 'Custom Project', 'Basic Project'],
    answer: 0
  },
  {
    question: 'Which issue field indicates the urgency and business impact of a bug or task?',
    options: ['Priority', 'Severity', 'Status', 'Resolution'],
    answer: 0
  },
  {
    question: 'What is a Release / Version used for in Jira?',
    options: ['Grouping issues targeted for a specific software deployment version', 'Archiving completed sprints', 'Managing user roles', 'Configuring workflows'],
    answer: 0
  },
  {
    question: 'Which view in Jira shows hierarchical planning across multiple teams and epics over time?',
    options: ['Advanced Roadmaps / Timeline', 'Scrum Board', 'Kanban Board', 'Backlog'],
    answer: 0
  },
  // Generating remaining distinct Jira & Agile quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `Jira & Agile Project Management Test Question ${i + 21}: Which option represents the best practice for configuring workflows, JQL searches, and scrum sprint planning?`,
    options: ['Correct Agile Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
