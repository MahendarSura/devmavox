
export interface APIThrottlingGuide {
  title: string;
  slug: string;
  category: string;
  overview: string;
  incidentScenario: string;
  impact: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretation: string[];
    nextActions: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    rootCause: string;
    verification: string[];
    fix: string[];
  }[];
  recoveryProcedure: string[];
  prevention: string[];
  monitoring: string[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const apiThrottlingGuide: APIThrottlingGuide = {
  title: "GitHub API Throttling — Production Troubleshooting",
  slug: "github-api-throttling",
  category: "GitHub",

  overview: `
GitHub API throttling occurs when an application exceeds an applicable API
request quota or triggers secondary traffic-protection controls.

Production integrations may use GitHub APIs to read pull requests, inspect
commits, publish releases, update deployment statuses, synchronize repositories,
and automate CI/CD workflows.

A throttled request can delay deployments, interrupt scheduled automation,
and leave dashboards or external integrations with stale information.

HTTP 403 does not automatically mean rate limiting. Authentication failures,
permission problems, organization policies, and secondary rate limits must be
distinguished using the actual response body and headers.
`,

  incidentScenario: `
At 10:15 UTC, multiple GitHub Actions workflows suddenly fail while retrieving
pull request information and publishing release metadata.

Some requests return HTTP 403 or 429. Automatic retries increase API traffic.
Release reporting becomes delayed, and scheduled repository synchronization
jobs begin accumulating.

The production engineer must identify the failing API identity, inspect
response headers, classify the failure, stop unnecessary traffic, and recover
the workflows without duplicating completed deployments or releases.
`,

  impact: [
    "Production releases may be delayed or blocked.",
    "Pull request checks may remain pending.",
    "Deployment status updates may fail.",
    "Repository synchronization jobs may accumulate a backlog.",
    "Repeated workflow retries may consume runner minutes.",
    "Retried write operations may create duplicate side effects.",
  ],

  safetyChecks: [
    "Confirm the correct GitHub organization, repository, workflow, and environment.",
    "Identify whether the affected integration uses REST or GraphQL.",
    "Confirm which credential type and identity the failing application uses.",
    "Check whether a release or deployment already completed partially.",
    "Obtain production approval before changing critical workflows.",
    "Never print tokens, Authorization headers, or secret environment variables.",
    "Do not create additional tokens or repeatedly retry requests as a speculative fix.",
    "Record incident timestamps in UTC.",
  ],

  evidenceCollection: [
    "Workflow run ID, job name, commit SHA, and repository.",
    "First failure timestamp and last successful request.",
    "HTTP status code, sanitized response body, and API endpoint.",
    "x-ratelimit-limit and x-ratelimit-remaining, when present.",
    "x-ratelimit-reset and x-ratelimit-resource, when present.",
    "retry-after header, when supplied.",
    "Request volume, retry count, concurrency, and pagination behavior.",
    "Authentication type and identity description without secret values.",
    "Recent changes to API clients, workflow schedules, and polling intervals.",
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Identify the failed workflow",
      objective: "Find the exact failed job and the first failing API operation.",
      commands: [
        "gh run list --repo OWNER/REPO --limit 10",
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run view RUN_ID --repo OWNER/REPO --log-failed",
      ],
      interpretation: [
        "One failed job may indicate a local script or endpoint problem.",
        "Several jobs failing simultaneously may indicate shared credentials or excessive request volume.",
        "Repeated calls in logs may reveal a polling loop or retry storm.",
        "If the job failed before making an API request, investigate the earlier failure instead.",
      ],
      nextActions: [
        "Record the workflow ID, endpoint, status code, and timestamp.",
        "Save a sanitized copy of the relevant logs.",
        "Check whether previous workflow steps already changed production state.",
      ],
    },
    {
      step: 2,
      title: "Inspect API rate-limit information",
      objective: "Determine the quota reported for the diagnostic identity.",
      commands: [
        "gh auth status",
        "gh api rate_limit",
        "gh api -i rate_limit",
      ],
      interpretation: [
        "The rate_limit endpoint reports quota information for the identity used by this CLI.",
        "x-ratelimit-remaining equal to zero indicates exhausted primary quota for the reported resource.",
        "A positive remaining value does not rule out secondary rate limiting.",
        "The CLI identity may differ from the identity used by the failing workflow.",
      ],
      nextActions: [
        "Confirm the actual identity used by the failing integration.",
        "Compare the failed response headers with the quota information.",
        "Avoid repeated diagnostic calls while a throttle is active.",
      ],
    },
    {
      step: 3,
      title: "Classify the HTTP response",
      objective: "Separate primary limits, secondary limits, and permission failures.",
      commands: [
        "gh api -i repos/OWNER/REPO",
      ],
      interpretation: [
        "HTTP 401 commonly indicates an authentication problem.",
        "HTTP 403 may indicate throttling, missing permissions, or another restriction.",
        "HTTP 429 commonly indicates that the request was throttled.",
        "The response body and relevant headers provide more evidence than the status code alone.",
        "A repository request is a diagnostic example; it does not reproduce every failing endpoint.",
      ],
      nextActions: [
        "For primary exhaustion, use the applicable x-ratelimit-reset timestamp.",
        "For secondary limiting, reduce traffic and follow Retry-After when supplied.",
        "For permission failures, verify the required permission and repository access.",
        "For authentication failures, inspect token validity and renewal logic securely.",
      ],
    },
    {
      step: 4,
      title: "Check the primary reset time",
      objective: "Determine when exhausted primary quota can become available again.",
      commands: [
        "gh api rate_limit --jq '.resources | with_entries(.value |= {limit, remaining, reset, used})'",
      ],
      interpretation: [
        "remaining equal to zero indicates the reported resource has exhausted its primary quota.",
        "reset is a Unix timestamp representing the applicable reset time.",
        "Different API resources may have different quota states.",
        "This output describes the CLI identity, not necessarily the production application's identity.",
      ],
      nextActions: [
        "Wait until the relevant reset time when primary quota is exhausted.",
        "Reduce unnecessary requests while waiting.",
        "Resume gradually instead of releasing every queued job at once.",
      ],
    },
    {
      step: 5,
      title: "Investigate excessive API requests",
      objective: "Find duplicate requests, polling loops, and request bursts.",
      commands: [
        "git grep -n -E 'gh api|api.github.com|graphql|Octokit|fetch\\('",
        "git log -n 10 --oneline -- .github/workflows/",
        "git diff -- .github/workflows/",
      ],
      interpretation: [
        "API calls inside nested loops may multiply request volume.",
        "Polling frequently for unchanged data may waste quota.",
        "Matrix jobs or overlapping scheduled workflows may generate simultaneous requests.",
        "Recent workflow changes may have introduced additional API calls.",
      ],
      nextActions: [
        "Trace high-volume requests to their source code.",
        "Measure requests per workflow run and per minute.",
        "Check whether multiple integrations share a quota context.",
        "Reduce unnecessary calls before considering architectural changes.",
      ],
    },
    {
      step: 6,
      title: "Inspect REST pagination",
      objective: "Identify repeated full scans and unnecessary page requests.",
      commands: [
        "gh api --paginate 'repos/OWNER/REPO/issues?state=open&per_page=100'",
        "gh api 'repos/OWNER/REPO/pulls?state=open&per_page=100'",
      ],
      interpretation: [
        "Pagination can require multiple requests when many results exist.",
        "A full scan on every polling interval can multiply API usage.",
        "The issues endpoint may return both issues and pull requests.",
        "The commands are diagnostic examples; do not repeatedly run them during an active throttle.",
      ],
      nextActions: [
        "Retrieve only the pages and fields required.",
        "Cache stable repository metadata.",
        "Use conditional requests such as ETags where supported.",
        "Prefer event-driven automation when suitable.",
      ],
    },
    {
      step: 7,
      title: "Investigate GraphQL query cost",
      objective: "Identify expensive or repeated GraphQL queries.",
      commands: [
        "gh api graphql -f query='query { rateLimit { limit remaining used resetAt } }'",
      ],
      interpretation: [
        "The query reports GraphQL quota information for the authenticated context.",
        "The production query may consume more capacity than this diagnostic query.",
        "Nested connections, large result sets, and repeated lookups can increase query cost.",
      ],
      nextActions: [
        "Inspect errors from the actual failing GraphQL operation.",
        "Request only the fields the application needs.",
        "Use cursor pagination and appropriate page sizes.",
        "Avoid concurrent duplicate queries.",
      ],
    },
    {
      step: 8,
      title: "Verify authentication and permissions",
      objective: "Avoid changing credentials when the actual issue is authorization.",
      commands: [
        "gh auth status",
        "gh api user",
      ],
      interpretation: [
        "These commands inspect the CLI authentication context.",
        "A local CLI may use a different identity from a GitHub Actions job or GitHub App.",
        "A 401 often indicates invalid or missing authentication.",
        "A 403 or 404 may reflect insufficient permissions or resource visibility.",
      ],
      nextActions: [
        "Verify the identity through the same credential flow as the failing application.",
        "Check token expiry, repository access, and GitHub App installation scope.",
        "Grant only the required permission after review.",
        "Never print or paste secret values into logs.",
      ],
    },
    {
      step: 9,
      title: "Inspect GitHub Actions concurrency",
      objective: "Find overlapping jobs and synchronized retry storms.",
      commands: [
        "gh run list --repo OWNER/REPO --workflow WORKFLOW_FILE --limit 20",
        "gh run view RUN_ID --repo OWNER/REPO --log-failed",
      ],
      interpretation: [
        "Matrix expansion can multiply the number of API clients.",
        "Scheduled jobs may overlap with earlier runs.",
        "Retries without backoff can generate a burst of requests.",
        "Multiple integrations may access the same resources simultaneously.",
      ],
      nextActions: [
        "Use suitable concurrency groups for jobs that must not overlap.",
        "Reduce unnecessary matrix duplication.",
        "Add bounded retries with jitter.",
        "Do not cancel critical deployment jobs without checking their current state.",
      ],
    },
    {
      step: 10,
      title: "Validate the fix and recover",
      objective: "Apply a controlled correction and verify production recovery.",
      commands: [
        "git diff --check",
        "git status --short",
        "git diff -- .github/workflows/",
      ],
      interpretation: [
        "git diff --check detects whitespace errors, not API correctness.",
        "Review the exact code or workflow changes before merging.",
        "Test request throttling and retry behavior in a controlled environment.",
        "Confirm that earlier write operations did not already succeed.",
      ],
      nextActions: [
        "Obtain the required review and production approval.",
        "Deploy the correction using the normal release process.",
        "Resume API traffic gradually.",
        "Verify workflow success, deployment status, and backlog recovery.",
      ],
    },
  ],

  rootCauseMatrix: [
    {
      symptom: "x-ratelimit-remaining is zero",
      rootCause: "Primary API quota exhausted.",
      verification: [
        "Inspect the failed response headers.",
        "Confirm the identity and resource associated with the request.",
        "Check the reset timestamp.",
      ],
      fix: [
        "Wait for the applicable reset.",
        "Reduce unnecessary calls and repeated scans.",
        "Cache stable data and control request concurrency.",
      ],
    },
    {
      symptom: "403 or 429 with primary quota remaining",
      rootCause: "Possible secondary rate limit or other API restriction.",
      verification: [
        "Inspect the error body for an explicit secondary-limit message.",
        "Check Retry-After when present.",
        "Correlate failures with request bursts and concurrency.",
      ],
      fix: [
        "Reduce request frequency and concurrency.",
        "Honor Retry-After when supplied.",
        "Apply bounded exponential backoff with jitter.",
      ],
    },
    {
      symptom: "Multiple repositories fail simultaneously",
      rootCause: "Shared integration traffic or overlapping automation.",
      verification: [
        "Compare failure timestamps and identities.",
        "Inspect scheduled jobs, matrix jobs, and external integrations.",
        "Measure request volume by integration.",
      ],
      fix: [
        "Coordinate request budgets across clients.",
        "Stagger non-critical jobs.",
        "Prevent unnecessary concurrent runs.",
      ],
    },
    {
      symptom: "Failure starts after a workflow change",
      rootCause: "New polling loop, pagination bug, or duplicate API request.",
      verification: [
        "Compare the latest workflow and application changes.",
        "Measure requests per run before and after the change.",
        "Inspect loops, retries, and scheduled triggers.",
      ],
      fix: [
        "Correct the request multiplier.",
        "Cache repeated data.",
        "Roll back the change if necessary and safe.",
      ],
    },
    {
      symptom: "Only one endpoint fails",
      rootCause: "Endpoint-specific permissions, resource access, or operation behavior.",
      verification: [
        "Inspect the response body and endpoint requirements.",
        "Compare with a known-good request using the same identity.",
        "Check organization policy and repository access.",
      ],
      fix: [
        "Correct the specific permission or configuration.",
        "Avoid broad credential changes without evidence.",
      ],
    },
    {
      symptom: "GraphQL fails while other API calls work",
      rootCause: "GraphQL query-cost or operation-specific issue.",
      verification: [
        "Inspect GraphQL errors and rateLimit information.",
        "Review nested connections and page sizes.",
        "Compare the production query with a minimal diagnostic query.",
      ],
      fix: [
        "Reduce query complexity and repeated lookups.",
        "Use cursor pagination.",
        "Cache stable results where appropriate.",
      ],
    },
    {
      symptom: "401 authentication errors",
      rootCause: "Missing, invalid, or expired credentials.",
      verification: [
        "Inspect the sanitized response body.",
        "Check token expiry and the expected identity.",
        "Review token renewal and secret injection.",
      ],
      fix: [
        "Repair the approved authentication flow.",
        "Renew credentials securely when required.",
        "Retest using the intended identity.",
      ],
    },
    {
      symptom: "Retries make the problem worse",
      rootCause: "Unbounded retries or synchronized retry bursts.",
      verification: [
        "Inspect retry counts and request volume.",
        "Check whether Retry-After is honored.",
        "Review the backoff and concurrency implementation.",
      ],
      fix: [
        "Stop uncontrolled retries.",
        "Use exponential backoff with jitter.",
        "Set a retry budget and circuit breaker.",
      ],
    },
    {
      symptom: "Release workflow fails after an API write",
      rootCause: "A previous operation may have succeeded before the response failed.",
      verification: [
        "Check the release, deployment, comment, or status on GitHub.",
        "Inspect completed workflow steps.",
        "Determine whether the operation is safe to repeat.",
      ],
      fix: [
        "Reconcile remote state before retrying.",
        "Use deduplication where available.",
        "Resume only after confirming partial completion.",
      ],
    },
  ],

  recoveryProcedure: [
    "1. Assign an incident owner and determine the business impact.",
    "2. Capture a representative failure with sanitized headers and response body.",
    "3. Identify the actual API identity and failing endpoint.",
    "4. Classify primary throttling, secondary throttling, authentication, or permissions.",
    "5. Reduce unnecessary request traffic and stop uncontrolled retry loops.",
    "6. Wait for the primary reset or follow the applicable secondary-limit guidance.",
    "7. Check whether previous release or deployment steps already succeeded.",
    "8. Correct the proven cause and validate the change.",
    "9. Resume queued work gradually.",
    "10. Confirm API success, workflow completion, and accurate deployment status.",
    "11. Check for duplicate operations, stale status updates, and backlog.",
    "12. Document the incident, root cause, recovery, and preventive actions.",
  ],

  prevention: [
    "Track API requests per repository, integration, and workflow.",
    "Use bounded concurrency and avoid duplicate scheduled runs.",
    "Prefer event-driven automation over aggressive polling.",
    "Cache stable repository metadata.",
    "Use correct pagination and request only necessary fields.",
    "Use ETags and conditional requests where supported.",
    "Reduce GraphQL query cost and unnecessary nested connections.",
    "Implement bounded retries, exponential backoff, and jitter.",
    "Honor Retry-After and primary reset timestamps.",
    "Reconcile write operations before retrying them.",
    "Keep critical release automation separate from non-critical reporting.",
    "Use least-privilege credentials and secure secret storage.",
    "Test throttling behavior with mocked responses rather than exhausting production quota.",
    "Review API request volume when adding integrations or workflow features.",
    "Maintain an incident runbook with clear ownership and escalation steps.",
  ],

  monitoring: [
    "Monitor HTTP 403 and 429 responses, classifying their actual causes.",
    "Track remaining quota and reset timestamps where available.",
    "Alert on repeated secondary-limit messages.",
    "Track retries, request volume, concurrency, and GraphQL query costs.",
    "Monitor failed workflows, release delays, and deployment status updates.",
    "Track queue depth and the age of the oldest pending job.",
    "Include sanitized request IDs and workflow run IDs in logs.",
    "Never include tokens or sensitive user data in metrics.",
    "Maintain a dashboard for API failure rate, recovery time, and affected integrations.",
  ],

  interviewQuestions: [
    {
      question: "What is GitHub API throttling?",
      answer:
        "It occurs when an integration exceeds an applicable API quota or triggers secondary traffic protections.",
    },
    {
      question: "What is the difference between primary and secondary rate limits?",
      answer:
        "Primary limits govern an applicable request quota. Secondary limits protect the service from certain request patterns and may apply even when primary quota remains.",
    },
    {
      question: "What does x-ratelimit-remaining: 0 mean?",
      answer:
        "The reported primary quota for that resource and identity is exhausted. The client should wait until the applicable reset time.",
    },
    {
      question: "How do you troubleshoot HTTP 403?",
      answer:
        "Inspect the response body, relevant headers, endpoint, and identity. A 403 can indicate throttling, missing permissions, or another restriction.",
    },
    {
      question: "Why is exponential backoff useful?",
      answer:
        "It spaces out retries after transient failures. Random jitter helps prevent many clients from retrying simultaneously.",
    },
    {
      question: "How do you troubleshoot API throttling in GitHub Actions?",
      answer:
        "Inspect the failed run, identity, endpoint, headers, request volume, matrix size, overlapping runs, and retry behavior.",
    },
    {
      question: "Why can GITHUB_TOKEN behave differently from a local CLI token?",
      answer:
        "They can use different identities, permissions, lifetimes, and quota contexts. Diagnose the actual credential path used by the failing integration.",
    },
    {
      question: "How do you troubleshoot GraphQL throttling?",
      answer:
        "Inspect GraphQL errors and rateLimit information, then reduce unnecessary fields, nested connections, repeated queries, and excessive concurrency.",
    },
    {
      question: "Why can pagination cause throttling?",
      answer:
        "Repeatedly fetching every page, especially during frequent polling, can generate excessive requests. Use appropriate pagination, filtering, and caching.",
    },
    {
      question: "Should you create another token to bypass throttling?",
      answer:
        "No. Identify the actual cause and follow GitHub's applicable limits and policies. Additional credentials do not fix a request storm and must not be used to evade restrictions.",
    },
    {
      question: "What should you check before rerunning a failed release?",
      answer:
        "Confirm whether earlier steps already created a release or deployment. Reconcile remote state before retrying to avoid duplicate side effects.",
    },
    {
      question: "How do you prevent API throttling in production?",
      answer:
        "Use caching, efficient pagination, event-driven automation, bounded concurrency, request budgets, safe retries, monitoring, and an incident runbook.",
    },
  ],

  references: [
    {
      title: "GitHub REST API — Rate limits",
      url: "https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api",
    },
    {
      title: "GitHub GraphQL API — Resource limitations",
      url: "https://docs.github.com/en/graphql/overview/resource-limitations",
    },
    {
      title: "GitHub Actions — Workflow syntax",
      url: "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions",
    },
    {
      title: "GitHub CLI — gh api",
      url: "https://cli.github.com/manual/gh_api",
    },
  ],
};
