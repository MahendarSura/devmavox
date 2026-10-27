export interface PRCheckFailureGuide {
  title: string;
  category: string;
  severity: string;
  overview: string;
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretOutput: string[];
    nextAction: string;
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCause: string;
    evidence: string;
    resolution: string;
  }[];
  recoveryProcedures: {
    scenario: string;
    actions: string[];
    validation: string[];
    rollbackDecision: string;
  }[];
  advancedScenarios: {
    title: string;
    symptoms: string[];
    investigation: string[];
    resolution: string[];
  }[];
  prevention: string[];
  monitoring: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  officialReferences: string[];
}

export const prCheckFailureGuide: PRCheckFailureGuide = {
  title: "GitHub Pull Request Check Failure — Production Troubleshooting",
  category: "GitHub Actions / CI/CD / Pull Request Quality Gates",
  severity: "SEV-2 or SEV-3 depending on release and service impact",

  overview: `
A PR check failure occurs when a required or optional validation fails,
remains pending, is skipped unexpectedly, or never reports a result for
the pull request's current commit.

PR checks can include unit tests, integration tests, linting, type checking,
builds, security scans, dependency validation, container image scans,
infrastructure validation, deployment previews and policy checks.

A red check does not automatically mean the application code is wrong.
The failure may come from application code, a test, runner capacity,
permissions, a dependency outage, a GitHub API problem, missing secrets,
an invalid workflow, a cache issue or a downstream service.

The objective is to identify the failing layer using evidence, restore
the required validation, and merge only when the intended quality gates
have genuinely passed.

Important distinctions:
- Failed check: a check ran and returned a failure.
- Missing/pending check: a required result has not arrived or is not
  recognized for the relevant commit.
- Skipped check: a workflow or job did not execute due to its event,
  filters, conditions or dependencies.
- Cancelled check: execution was interrupted or explicitly cancelled.
- Flaky test: the same test behaves inconsistently under comparable
  conditions.
- Merge queue failure: the merge-group commit failed even if ordinary
  PR checks passed.
`,

  incidentScenario: `
Production scenario:

PR #617 updates a payment-service dependency and changes a timeout setting.
The PR's required CI check suddenly fails. The release is planned for
the evening, and three other PRs are now waiting behind the same workflow.

The failure log shows an integration test timing out while connecting to
a test database. A developer reruns the job and it passes once, but a
subsequent run fails again. Another workflow reports a missing check
because a path filter prevented it from running.

The team must establish whether the incident is caused by a real code
regression, an unstable test environment, runner/network instability,
dependency behavior or workflow configuration.

Do not mark checks as successful manually or remove required checks just
to release. Identify the failure, restore reliable validation, and use
the approved release or emergency-change process if production is at risk.
`,

  impactAssessment: [
    "Identify the repository, PR number, base branch, head branch, latest head SHA and target environment.",
    "Determine whether the problem affects one PR, all PRs in a repository, a specific workflow, or multiple repositories.",
    "Identify the failed check name, workflow name, job name, run ID, attempt number and failure timestamp.",
    "Determine whether the check is required for merging or is an optional informational check.",
    "Check whether production deployment is delayed, a release window is at risk, or an existing production service is actually degraded.",
    "Determine whether the failing code has already merged or deployed. A blocked PR and a production outage are different incidents.",
    "Check whether the issue started after a commit, workflow change, dependency upgrade, runner-image update, secret rotation or GitHub App permission change.",
    "Assess whether the failure could conceal a security vulnerability, broken migration, data corruption risk or deployment regression.",
    "Assign an incident owner and the appropriate application, CI platform, security or infrastructure owner.",
    "Establish a baseline: last known successful commit, successful run, recent failure rate and affected PR count."
  ],

  safetyChecks: [
    "Verify the exact repository and PR before executing diagnostic commands.",
    "Confirm the intended base branch and latest head commit SHA.",
    "Use read-only diagnostics first; do not change repository policy while the root cause is unknown.",
    "Never print tokens, private keys, passwords, database URLs or secret environment variables into workflow logs.",
    "Do not use echo, env, printenv or similar commands to dump the entire environment in a production workflow.",
    "Do not disable required tests, security scans or approval gates simply to make a PR green.",
    "Do not rerun deployment jobs blindly if they may modify production resources.",
    "Check whether the workflow uses production credentials or only isolated test credentials.",
    "Before cancelling or rerunning a job, confirm whether it is performing deployments, migrations, releases or other side effects.",
    "Do not clear all caches or rotate all credentials without evidence; these actions can create a second incident.",
    "Use approved change management before changing workflow permissions, secrets, runner groups or branch protection.",
    "Use a disposable branch or test repository for experiments that change CI configuration."
  ],

  evidenceCollection: [
    "Incident ID, start time and timestamps in UTC.",
    "Repository, PR number, base/head branches and exact commit SHA.",
    "Workflow run URL, run ID, attempt number, event type and actor.",
    "Exact failing step, exit code, exception or error message.",
    "Runner type, operating system, image/version, architecture and runner labels.",
    "Dependency lockfile changes, package versions and dependency registry status.",
    "Relevant workflow YAML, reusable workflow references and composite actions.",
    "Test reports, JUnit XML, coverage output, lint/type-check results and build logs.",
    "Job duration, queue duration, retry history and recent failure rate.",
    "Cache hit/miss information, artifact upload/download status and artifact identifiers.",
    "Network/DNS/TLS evidence for dependencies or test services, with secrets redacted.",
    "Relevant permissions, environment protection rules and required-check configuration.",
    "Recent workflow edits, runner updates, secret rotations and third-party service incidents.",
    "Comparison between the last successful run and the first failing run."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm repository, authentication and PR identity",
      objective: "Make sure the investigation targets the correct repository and current commit.",
      commands: [
        "gh auth status",
        "gh repo view OWNER/REPO",
        "gh pr view 617 --repo OWNER/REPO --json number,title,state,baseRefName,headRefName,headRefOid,baseRefOid,mergeStateStatus,reviewDecision,statusCheckRollup,url",
        "git status --short --branch",
        "git remote -v"
      ],
      interpretOutput: [
        "Unexpected repository or remote: stop and correct the investigation target.",
        "Record headRefOid because a new commit can make earlier results irrelevant.",
        "Check whether the PR is open and targets the intended base branch.",
        "A dirty local tree does not prove that the remote CI failure is caused by local changes.",
        "A blocked merge may have multiple causes beyond the failed check."
      ],
      nextAction: "Record repository, PR, head SHA, base SHA and the exact check currently blocking progress."
    },
    {
      step: 2,
      title: "Classify the check state",
      objective: "Distinguish a failed execution from a missing, skipped, pending or cancelled check.",
      commands: [
        "gh pr checks 617 --repo OWNER/REPO",
        "gh pr view 617 --repo OWNER/REPO --json statusCheckRollup,mergeStateStatus",
        "gh run list --repo OWNER/REPO --limit 30"
      ],
      interpretOutput: [
        "Failure: inspect the specific failing job and step.",
        "Pending with no corresponding run: inspect workflow triggers, event filters and check reporting.",
        "Skipped: inspect workflow-level filters, job-level if conditions and dependency outcomes.",
        "Cancelled: determine whether cancellation was intentional, caused by concurrency settings or triggered by a newer run.",
        "A successful check on an older SHA may not satisfy the required check for the current SHA."
      ],
      nextAction: "Choose the diagnostic branch matching the observed state rather than rerunning every workflow."
    },
    {
      step: 3,
      title: "Inspect the exact workflow run and failing step",
      objective: "Identify the first meaningful failure instead of treating later errors as the root cause.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run view RUN_ID --repo OWNER/REPO --log-failed",
        "gh run view RUN_ID --repo OWNER/REPO --json conclusion,status,event,headSha,attempt,createdAt,updatedAt"
      ],
      interpretOutput: [
        "Replace RUN_ID with the actual run ID.",
        "Identify the earliest causal error; later cleanup failures may be secondary.",
        "Compare event, headSha and attempt to confirm that the run belongs to the expected PR commit.",
        "If logs are unavailable, inspect permissions, retention, run status and whether the run was deleted or is still executing.",
        "Redact sensitive values before sharing logs outside the authorized team."
      ],
      nextAction: "Classify the failure as code/test, build/toolchain, runner, dependency/network, permission/secret, artifact, workflow logic or external service."
    },
    {
      step: 4,
      title: "Find the workflow and the relevant trigger",
      objective: "Determine which workflow file and event should produce the required check.",
      commands: [
        "git ls-files .github/workflows",
        "git grep -n -E 'on:|pull_request:|pull_request_target:|push:|workflow_call:|workflow_run:|merge_group:|paths:|branches:|if:' .github/workflows",
        "git log -10 --oneline -- .github/workflows"
      ],
      interpretOutput: [
        "Check that the workflow triggers for the actual event type.",
        "A workflow configured only for push may not run for a pull_request event.",
        "Path and branch filters can prevent the workflow from running.",
        "A job-level condition can skip a job even when the workflow runs.",
        "A workflow renamed or moved may produce different check names or no longer satisfy a configured required check.",
        "When using reusable workflows, inspect the called workflow and caller inputs as well."
      ],
      nextAction: "Confirm the expected workflow is triggered for the current PR and that its mandatory check is reported consistently."
    },
    {
      step: 5,
      title: "Check required status checks and the source of each check",
      objective: "Verify that GitHub is waiting for the correct check on the correct commit.",
      commands: [
        "gh api repos/OWNER/REPO/branches/main/protection/required_status_checks",
        "gh api repos/OWNER/REPO/commits/HEAD_SHA/check-runs",
        "gh api repos/OWNER/REPO/commits/HEAD_SHA/status"
      ],
      interpretOutput: [
        "Replace HEAD_SHA with the actual PR head SHA.",
        "Compare configured required check names with the check names reported on the current commit.",
        "Check whether a required check is restricted to a specific GitHub App.",
        "A missing check can result from an untriggered workflow, a skipped job, a changed job name or a wrong event.",
        "A successful commit status and a check run are related but distinct reporting mechanisms.",
        "A 403 or 404 must be interpreted with endpoint permissions, repository identity and branch existence in mind."
      ],
      nextAction: "Correct the workflow/check mapping only after confirming the intended source and check semantics."
    },
    {
      step: 6,
      title: "Investigate unit tests, integration tests and flaky tests",
      objective: "Determine whether the code is broken or the test itself is nondeterministic.",
      commands: [
        "npm ci",
        "npm test -- --runInBand",
        "npm run lint",
        "npm run typecheck",
        "pytest -q",
        "pytest -q --maxfail=1"
      ],
      interpretOutput: [
        "These are examples only; run commands that match the repository's actual package manager and test framework.",
        "npm ci should use the committed lockfile; do not replace it with an uncontrolled dependency install during an incident.",
        "A deterministic assertion failure usually points to code, test expectations or changed requirements.",
        "Timeouts, connection resets, port conflicts and intermittent failures may point to test infrastructure or timing dependencies.",
        "A single passing retry does not prove the problem is fixed.",
        "Repeated failures on the same commit with different outcomes suggest nondeterminism, resource contention or external dependency instability."
      ],
      nextAction: "Reproduce the specific failing test in a controlled environment, compare repeated runs and capture test reports before changing code."
    },
    {
      step: 7,
      title: "Check build, type-check and toolchain failures",
      objective: "Identify incompatible compiler, runtime, package manager or build configuration.",
      commands: [
        "node --version",
        "npm --version",
        "npm ci",
        "npm run build",
        "git diff -- package.json package-lock.json pnpm-lock.yaml yarn.lock",
        "git diff -- .nvmrc .node-version"
      ],
      interpretOutput: [
        "Use the commands matching the repository's actual stack; do not run every package-manager command indiscriminately.",
        "A local/CI runtime mismatch can explain a failure that does not reproduce locally.",
        "A lockfile inconsistency can cause different dependency trees or a clean-install failure.",
        "A build error may be the first failure while later test jobs fail only because the build artifact was never created.",
        "Pin supported runtime and toolchain versions where the project requires reproducibility."
      ],
      nextAction: "Align the CI runtime with the project's supported toolchain and reproduce the clean build using the committed dependency lockfile."
    },
    {
      step: 8,
      title: "Investigate dependency registry, DNS, TLS and outbound network",
      objective: "Find failures caused by external services or runner network configuration.",
      commands: [
        "nslookup registry.npmjs.org",
        "curl -I --max-time 10 https://registry.npmjs.org/",
        "npm config get registry",
        "npm cache verify"
      ],
      interpretOutput: [
        "Use only where the runner environment provides these utilities and outbound network access is expected.",
        "DNS lookup failure suggests resolver or network trouble, but does not alone identify the responsible component.",
        "TLS certificate errors may indicate certificate trust, proxy interception or incorrect system time.",
        "HTTP 401/403 can indicate authentication, registry authorization or policy restrictions.",
        "HTTP 429 suggests rate limiting; HTTP 5xx may indicate a registry or upstream service problem.",
        "Do not print registry credentials or proxy URLs containing secrets."
      ],
      nextAction: "Compare a failing runner with a healthy runner, inspect the relevant service status and fix the specific DNS, TLS, authentication, proxy or registry issue."
    },
    {
      step: 9,
      title: "Inspect GitHub-hosted and self-hosted runner health",
      objective: "Determine whether the runner is unavailable, overloaded or incorrectly configured.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh api repos/OWNER/REPO/actions/runners",
        "gh api orgs/ORG/actions/runners",
        "gh api repos/OWNER/REPO/actions/runs/RUN_ID"
      ],
      interpretOutput: [
        "The runner-list endpoints require appropriate access and are most useful for self-hosted runner investigation.",
        "A long queue may indicate runner capacity, labels, concurrency limits or organization usage limits.",
        "An offline self-hosted runner may have a stopped service, network issue, expired registration or infrastructure problem.",
        "An unavailable runner can prevent a job from starting; it does not necessarily mean the code or test failed.",
        "Check the run's runner labels and job requirements against the available runner pool."
      ],
      nextAction: "Restore the correct runner service/capacity or fix label/group targeting. Do not run untrusted PR code on a privileged production runner."
    },
    {
      step: 10,
      title: "Investigate secrets, permissions and protected environments",
      objective: "Identify authorization failures without exposing sensitive credentials.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh api repos/OWNER/REPO/actions/permissions",
        "gh api repos/OWNER/REPO/actions/permissions/workflow"
      ],
      interpretOutput: [
        "A missing secret may be intentional for forked pull requests or unavailable in a protected environment.",
        "GITHUB_TOKEN permissions may be read-only or insufficient for the API operation.",
        "A 401 commonly indicates missing or invalid authentication; a 403 commonly indicates authorization or policy restrictions, but inspect the full response.",
        "Workflow permissions endpoints expose configuration and require sufficient permissions.",
        "Never solve an authorization failure by granting broad write-all permissions without a specific documented need.",
        "Forked PR workflows should not receive privileged secrets merely to make the check pass."
      ],
      nextAction: "Request the minimum necessary permission, correct secret/environment configuration, or redesign the workflow to validate untrusted PR code safely."
    },
    {
      step: 11,
      title: "Inspect artifacts, caches and job dependencies",
      objective: "Identify failures caused by missing outputs, corrupted caches or incorrect job dependencies.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run download RUN_ID --repo OWNER/REPO",
        "git diff -- .github/workflows"
      ],
      interpretOutput: [
        "Artifact download can fail if the artifact was never uploaded, expired, was deleted or uses an incorrect name.",
        "A downstream job may run even though its expected output was not produced if dependencies and conditions are incorrectly defined.",
        "Cache misses usually affect performance; a cache miss alone should not cause correctness failures.",
        "A corrupted or incompatible cache can be a cause, but prove it before clearing caches.",
        "Artifact names, retention settings, paths and upload/download steps should agree."
      ],
      nextAction: "Fix the producing job, artifact contract or dependency condition. Retry without the suspect cache only when evidence supports that test."
    },
    {
      step: 12,
      title: "Inspect workflow concurrency, cancellation and timeouts",
      objective: "Determine why a run was cancelled, stuck or terminated before completing.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO",
        "git grep -n -E 'concurrency:|cancel-in-progress:|timeout-minutes:|strategy:|fail-fast:' .github/workflows"
      ],
      interpretOutput: [
        "Concurrency settings can cancel older runs when a newer run in the same group starts.",
        "A timeout may indicate a hang, slow test, blocked network call or insufficient resources.",
        "Matrix fail-fast behavior can cancel sibling jobs after an earlier failure.",
        "Cancellation is not the same as a test failure; identify who or what cancelled the run.",
        "For deployment jobs, ensure cancellation cannot leave partially applied infrastructure or application changes."
      ],
      nextAction: "Adjust concurrency or timeout only when the observed behavior is unintended. Preserve safe serialization for deployments and migrations."
    },
    {
      step: 13,
      title: "Investigate merge queue and merge-group checks",
      objective: "Determine whether the merge-group commit is missing its own required CI results.",
      commands: [
        "gh pr view 617 --repo OWNER/REPO --json mergeStateStatus,statusCheckRollup",
        "gh run list --repo OWNER/REPO --limit 30",
        "git grep -n -E 'merge_group:|pull_request:' .github/workflows"
      ],
      interpretOutput: [
        "The merge queue may validate a temporary merge-group commit rather than only the PR head commit.",
        "A workflow that supports pull_request but not merge_group may fail to report a required check for queued merges.",
        "A green PR head check does not prove that the combined merge-group commit passed.",
        "Confirm the workflow actually runs for the queue event and reports the expected check."
      ],
      nextAction: "Add or correct merge_group support where needed, validate it with a test PR and confirm all queue-required checks pass."
    },
    {
      step: 14,
      title: "Compare the last successful run with the first failed run",
      objective: "Narrow down the change or external event that introduced the failure.",
      commands: [
        "git log -20 --oneline",
        "git diff GOOD_SHA BAD_SHA -- .github/workflows package.json package-lock.json",
        "git diff GOOD_SHA BAD_SHA --",
        "gh run list --repo OWNER/REPO --limit 50"
      ],
      interpretOutput: [
        "Replace GOOD_SHA and BAD_SHA with real commit IDs; quote arguments appropriately in PowerShell if necessary.",
        "Compare workflow, code, dependency and configuration changes separately.",
        "If the code did not change but CI began failing, investigate runner images, registries, secrets, permissions and external services.",
        "A temporal correlation is useful but not sufficient proof of root cause.",
        "Check whether the first failed run used a different event, runner image, dependency resolution or workflow revision."
      ],
      nextAction: "Document the evidence supporting the most likely cause and test the smallest corrective change."
    },
    {
      step: 15,
      title: "Recover and verify the required checks",
      objective: "Restore a reliable check result for the current commit without bypassing safeguards.",
      commands: [
        "gh pr checks 617 --repo OWNER/REPO",
        "gh pr view 617 --repo OWNER/REPO --json headRefOid,statusCheckRollup,reviewDecision,mergeStateStatus",
        "gh run list --repo OWNER/REPO --limit 20"
      ],
      interpretOutput: [
        "Confirm that all required checks report against the intended commit.",
        "Check the exact final conclusion rather than relying on a single green badge.",
        "Confirm that required reviews, security gates, deployment approvals and merge queue requirements remain satisfied.",
        "If a new commit was pushed, wait for the relevant checks for that new SHA.",
        "Do not close the incident while the check is still missing, skipped unexpectedly or intermittently failing."
      ],
      nextAction: "Use the approved merge path, monitor deployment health and document the recovery evidence."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Unit test fails consistently",
      likelyCause: "Application regression, changed requirements, invalid test data or broken assertion.",
      evidence: "Same assertion or exception fails repeatedly on the same commit in a controlled environment.",
      resolution: "Fix the code or correct the test expectation with appropriate review, then rerun the suite."
    },
    {
      symptom: "Test passes on retry but fails intermittently",
      likelyCause: "Race condition, shared test state, timing dependency, resource contention or unstable external service.",
      evidence: "Repeated runs on the same commit produce different results; logs identify timing or shared-resource behavior.",
      resolution: "Make the test deterministic, isolate shared state and use explicit readiness checks. Do not treat retries as the permanent fix."
    },
    {
      symptom: "Workflow check remains pending",
      likelyCause: "Workflow did not trigger, job was skipped, check name changed or status was not reported for the current SHA.",
      evidence: "No relevant run, incorrect event, filtered path, skipped job or name/SHA mismatch.",
      resolution: "Correct workflow triggers, conditions and required-check configuration."
    },
    {
      symptom: "npm ci or dependency installation fails",
      likelyCause: "Lockfile mismatch, incompatible runtime, registry outage, authentication issue or network failure.",
      evidence: "Package manager output, runtime version, lockfile diff and registry/network response.",
      resolution: "Restore lockfile consistency or fix the specific runtime, registry, network or authentication problem."
    },
    {
      symptom: "Build passes locally but fails in CI",
      likelyCause: "Different runtime/toolchain, missing environment configuration, case-sensitive paths, clean-install differences or OS-specific behavior.",
      evidence: "Version differences, clean build results and OS/path-specific error details.",
      resolution: "Reproduce the CI environment and align supported runtime versions, dependencies and build configuration."
    },
    {
      symptom: "Runner job stays queued",
      likelyCause: "No matching runner, offline self-hosted runner, concurrency restriction or capacity shortage.",
      evidence: "Queue duration, runner status, labels and job requirements.",
      resolution: "Restore runner capacity or correct the labels/group targeting."
    },
    {
      symptom: "Workflow fails with 401 or 403",
      likelyCause: "Invalid credentials, insufficient token permissions, unavailable fork secrets or organization policy.",
      evidence: "Redacted response details, workflow permissions and authentication context.",
      resolution: "Fix the specific credential or permission requirement using least privilege."
    },
    {
      symptom: "Artifact cannot be downloaded",
      likelyCause: "Upload step failed, artifact name/path mismatch, artifact expired or workflow dependency is incorrect.",
      evidence: "Producer logs, artifact list, configured name/path and downstream job logs.",
      resolution: "Repair artifact production and consumption, then rerun the affected pipeline."
    },
    {
      symptom: "Only merge queue checks fail",
      likelyCause: "Workflow lacks merge_group support or the combined merge-group commit exposes an integration issue.",
      evidence: "Event type, temporary merge-group SHA and check results.",
      resolution: "Correct the event trigger or fix the integration regression and validate the queue."
    },
    {
      symptom: "Many repositories fail simultaneously",
      likelyCause: "GitHub service incident, shared reusable workflow defect, runner-image change, shared registry outage or organization-wide permission change.",
      evidence: "Correlated timestamps, common dependency, shared workflow revision and official service status.",
      resolution: "Mitigate the shared cause, communicate impact and validate recovery across representative repositories."
    },
    {
      symptom: "Security scan suddenly fails",
      likelyCause: "New vulnerability finding, scanner database update, expired token, changed policy or scanner service outage.",
      evidence: "Scanner report, policy result, authentication response and recent configuration changes.",
      resolution: "Determine whether the finding is valid and remediate it, or restore the scanner integration without disabling required security controls."
    },
    {
      symptom: "Build succeeds but PR is still blocked",
      likelyCause: "Another mandatory check failed or is missing, review requirement is incomplete, branch is stale or deployment/queue policy applies.",
      evidence: "Complete PR status rollup, review decision and effective branch/ruleset configuration.",
      resolution: "Resolve every independent gate; do not assume the build is the only merge condition."
    }
  ],

  recoveryProcedures: [
    {
      scenario: "A real code regression causes a required test to fail",
      actions: [
        "Identify the first failing assertion and reproduce it using the exact failing commit.",
        "Compare the change against the last known-good implementation.",
        "Fix the regression or revert the offending change through the approved PR workflow.",
        "Run targeted tests, the relevant regression suite and required security checks."
      ],
      validation: [
        "The previously failing test passes on the corrected commit.",
        "Related regression tests pass.",
        "All mandatory PR checks complete successfully on the current SHA.",
        "The approved merge and deployment workflow completes without unexpected errors."
      ],
      rollbackDecision: "If the regression has already deployed and service indicators breach established rollback thresholds, follow the application rollback runbook. Do not confuse reverting application code with changing branch protection."
    },
    {
      scenario: "An intermittent test failure blocks a release",
      actions: [
        "Collect logs and preserve the failing run ID and attempt number.",
        "Repeat the test in a controlled environment to determine reproducibility.",
        "Investigate race conditions, shared resources, timing, test ordering and external dependencies.",
        "Fix the nondeterminism and add evidence-based readiness checks or test isolation.",
        "Use a documented, approved quarantine mechanism only if the project supports it and the release risk is explicitly accepted."
      ],
      validation: [
        "Repeated runs are stable on the same commit.",
        "The fix does not merely hide assertion failures.",
        "Required checks remain meaningful and enforce the intended quality gate."
      ],
      rollbackDecision: "If stability cannot be established, hold the risky release or use the approved emergency-change process with explicit risk acceptance. Never silently mark a required test as passed."
    },
    {
      scenario: "A workflow is missing its required check",
      actions: [
        "Confirm the intended event, branch, paths and current head SHA.",
        "Inspect workflow-level filters, job conditions and reusable workflow configuration.",
        "Check the actual job/check name and source.",
        "Fix the trigger or stable check reporting through a reviewed change."
      ],
      validation: [
        "A test PR reliably produces the required check.",
        "The check reports against the current commit.",
        "The PR remains blocked when the required check fails."
      ],
      rollbackDecision: "If the workflow update removes a critical validation, restore the previous working workflow or use an approved equivalent gate before allowing the release."
    },
    {
      scenario: "A shared runner or dependency registry is unavailable",
      actions: [
        "Determine whether the issue affects one job or multiple repositories.",
        "Check official service status and the organization's runner/registry telemetry.",
        "Compare the failing environment with a known healthy environment.",
        "Restore runner capacity, network access or registry authentication using the infrastructure team's runbook.",
        "Avoid broad credential rotations or cache deletion without supporting evidence."
      ],
      validation: [
        "The runner can reach required endpoints.",
        "A clean dependency installation succeeds.",
        "Representative workflows recover and required checks report normally."
      ],
      rollbackDecision: "If a runner image or infrastructure change introduced the problem, restore the last known-good image/configuration through the approved rollback procedure."
    },
    {
      scenario: "A production hotfix is delayed by a required check",
      actions: [
        "Declare the appropriate incident/change process and confirm the actual production risk.",
        "Identify whether the blocker is a real regression, missing check or unavailable infrastructure.",
        "Prioritize restoring the intended validation and obtaining required reviews.",
        "If an emergency exception is authorized, document the risk owner, scope, compensating tests and expiration.",
        "Preserve an audit trail and a plan to restore normal controls."
      ],
      validation: [
        "The exact hotfix commit is validated.",
        "Required or explicitly approved compensating checks are recorded.",
        "The resulting deployment is monitored against the service's health criteria.",
        "Normal CI enforcement is restored after the emergency."
      ],
      rollbackDecision: "Rollback the application if the deployed change breaches defined health or error-rate thresholds. Keep that decision separate from a CI policy rollback."
    }
  ],

  advancedScenarios: [
    {
      title: "GitHub Actions check fails only for forked pull requests",
      symptoms: [
        "Internal PRs pass, but external contributor PRs fail.",
        "The failing step expects a repository secret.",
        "The workflow attempts to write a comment, publish an artifact or access a private registry."
      ],
      investigation: [
        "Inspect the PR event type and whether the head repository is a fork.",
        "Identify the exact missing credential or denied API operation without printing secret values.",
        "Inspect GITHUB_TOKEN permissions and organization fork workflow policies.",
        "Determine whether the workflow runs untrusted code."
      ],
      resolution: [
        "Design fork PR checks to run safely without privileged secrets.",
        "Separate untrusted validation from trusted publishing/deployment workflows.",
        "Grant only the permissions required for the specific operation.",
        "Do not switch to pull_request_target and execute untrusted PR code with privileged secrets."
      ]
    },
    {
      title: "Workflow is cancelled whenever a new commit is pushed",
      symptoms: [
        "Older PR runs end with cancelled status.",
        "A newer run starts for the same PR.",
        "The required check appears pending while the newest run is still executing."
      ],
      investigation: [
        "Inspect the workflow's concurrency group and cancel-in-progress configuration.",
        "Compare the head SHA and timestamps of cancelled and active runs.",
        "Determine whether cancellation is expected for tests or unsafe for deployments."
      ],
      resolution: [
        "Keep cancellation for redundant validation where appropriate.",
        "Use safe serialization and deployment-specific concurrency controls for side-effecting jobs.",
        "Ensure the latest run reliably reports the required check."
      ]
    },
    {
      title: "Cache restore makes a build fail after a dependency update",
      symptoms: [
        "The failure begins after a lockfile or runtime change.",
        "A clean environment succeeds while the cached build fails, or vice versa.",
        "The logs show incompatible generated files or package contents."
      ],
      investigation: [
        "Compare cache keys with the lockfile and runtime version.",
        "Inspect whether generated outputs or mutable state are being cached incorrectly.",
        "Test a cache bypass in an isolated run without deleting shared state globally."
      ],
      resolution: [
        "Include relevant lockfile and runtime inputs in the cache key.",
        "Cache package-manager data rather than unsafe build outputs where appropriate.",
        "Invalidate only the affected cache scope when evidence confirms corruption."
      ]
    },
    {
      title: "Integration test fails because a dependent service is not ready",
      symptoms: [
        "Connection refused, DNS errors or database readiness timeouts occur.",
        "Unit tests pass while integration tests fail.",
        "The failure is sensitive to runner speed or execution order."
      ],
      investigation: [
        "Inspect service-container health and startup logs.",
        "Check connection hostnames, ports, network aliases and test environment variables without exposing credentials.",
        "Confirm the service is healthy before tests start.",
        "Compare the service startup time with the test timeout."
      ],
      resolution: [
        "Add an explicit readiness probe or bounded retry with a clear timeout.",
        "Correct service networking and configuration.",
        "Use isolated test data and clean up resources after the test."
      ]
    },
    {
      title: "Reusable workflow change breaks multiple repositories",
      symptoms: [
        "Several repositories fail after one shared workflow revision.",
        "Failures have similar step names and error messages.",
        "Application code changes do not explain the common failure."
      ],
      investigation: [
        "Identify the shared workflow reference and the exact revision used.",
        "Compare a failing run with the last known-good run.",
        "Inspect changes to inputs, outputs, permissions, runner labels and action versions."
      ],
      resolution: [
        "Pin critical reusable workflow dependencies to a reviewed immutable revision where appropriate.",
        "Restore a known-good shared workflow revision if the new one is defective.",
        "Test the shared workflow against representative repositories before broad rollout."
      ]
    },
    {
      title: "Merge queue fails even though ordinary PR checks are green",
      symptoms: [
        "The PR passes normal pull_request checks.",
        "The queued merge-group commit reports a failure or missing check.",
        "The failure occurs only after the queue combines changes."
      ],
      investigation: [
        "Inspect the merge-group event and commit SHA.",
        "Confirm that required workflows support merge_group.",
        "Check whether the combined changes introduce a conflict or integration failure."
      ],
      resolution: [
        "Correct merge-group triggers and check reporting.",
        "Fix genuine combined-change failures rather than relying on isolated PR results.",
        "Verify the queue can merge only after its required checks pass."
      ]
    },
    {
      title: "Security scan blocks a PR after a scanner update",
      symptoms: [
        "A previously passing PR fails after a vulnerability database or scanner update.",
        "The report identifies a new vulnerability or policy violation.",
        "Other checks may remain green."
      ],
      investigation: [
        "Inspect the exact finding, affected package/image and severity.",
        "Determine whether the scan ran against the correct commit and artifact.",
        "Check the scanner version, vulnerability database timestamp and policy configuration.",
        "Distinguish a genuine finding from scanner authentication or service failure."
      ],
      resolution: [
        "Upgrade, patch or replace the affected dependency where feasible.",
        "Use a documented exception only through the security risk-acceptance process.",
        "Restore scanner connectivity if the failure is operational rather than a security finding."
      ]
    },
    {
      title: "Checks fail after runner image or toolchain update",
      symptoms: [
        "Multiple jobs fail after a hosted image or self-hosted image update.",
        "The same commit worked previously.",
        "Logs show compiler, OS package, architecture or runtime incompatibility."
      ],
      investigation: [
        "Compare the runner image and toolchain versions across runs.",
        "Inspect upstream image release notes and the first failing timestamp.",
        "Reproduce with the previous supported image where permitted."
      ],
      resolution: [
        "Pin or explicitly select a supported toolchain version.",
        "Fix deprecated tool usage or restore the last known-good image through change control.",
        "Add an upgrade test before rolling runner changes across all repositories."
      ]
    },
    {
      title: "A required check passes but the PR is still blocked",
      symptoms: [
        "Build or unit-test status is green.",
        "The merge button remains disabled or another check is pending.",
        "Review, security, deployment or merge queue controls may still apply."
      ],
      investigation: [
        "Inspect the complete statusCheckRollup and reviewDecision.",
        "Inspect branch protection and all applicable rulesets.",
        "Check required deployments, conversations, signatures and merge queue requirements."
      ],
      resolution: [
        "Satisfy every applicable gate.",
        "Correct stale or mismatched required-check configuration only with an approved change.",
        "Do not assume the first green check means the PR is mergeable."
      ]
    }
  ],

  prevention: [
    "Require reproducible clean installs and commit dependency lockfiles.",
    "Pin runtime versions and critical build tools.",
    "Keep required check names stable and unique.",
    "Ensure mandatory checks report consistently for intended pull_request and merge_group events.",
    "Avoid overly broad path filters that suppress required checks.",
    "Separate untrusted PR validation from privileged release and deployment workflows.",
    "Use least-privilege GITHUB_TOKEN permissions and short-lived credentials where supported.",
    "Use protected environments and explicit approvals for production deployment.",
    "Use bounded retries only for genuinely transient operations; never retry every failure indiscriminately.",
    "Make tests deterministic by isolating state, controlling time and using reliable service readiness checks.",
    "Publish machine-readable test reports and retain logs/artifacts for a defined period.",
    "Monitor runner queue time, failure rate, cancellation rate and workflow duration.",
    "Test reusable workflows and runner-image changes before organization-wide rollout.",
    "Keep CI configuration changes reviewed and version-controlled.",
    "Maintain a tested procedure for recovering a broken shared workflow.",
    "Use controlled cache keys and avoid caching mutable state that affects correctness.",
    "Perform periodic tests to confirm that failed required checks genuinely block merges.",
    "Document emergency release criteria, compensating tests and restoration of normal gates."
  ],

  monitoring: [
    "Track failed, pending, skipped and cancelled required checks separately.",
    "Measure workflow success rate by repository, workflow, branch and runner type.",
    "Monitor queue time separately from execution time.",
    "Alert on sudden multi-repository failure spikes.",
    "Track flaky test frequency and repeated failure signatures.",
    "Monitor runner offline state, capacity, job starvation and disk/memory pressure.",
    "Track artifact upload/download failures and cache hit/miss trends.",
    "Monitor dependency registry availability and authentication failures.",
    "Track security scan failures separately from operational scanner errors.",
    "Alert when required check names disappear or workflow events stop reporting results.",
    "Monitor merge queue age and PR merge-block duration.",
    "Use official GitHub service status and correlate incidents with relevant external dependencies.",
    "Ensure alerts contain run IDs and repository links but no secrets or sensitive payloads."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Start/end time (UTC):",
    "Repository and PR:",
    "Affected branches and commit SHA:",
    "Affected environment/release:",
    "Failing workflow/job/step:",
    "Run ID and attempt:",
    "Impact and severity:",
    "Evidence and log references:",
    "Root cause and proof:",
    "Corrective action:",
    "Validation results:",
    "Deployment outcome and rollback decision:",
    "Preventive action, owner and due date:",
    "Lessons learned:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Reproduce a failing unit test",
      objective: "Learn to isolate a deterministic test failure.",
      steps: [
        "Create a disposable branch and introduce a controlled test failure.",
        "Run the relevant test locally and in CI.",
        "Capture the exact assertion and run ID.",
        "Correct the defect in a new commit.",
        "Verify that the required check passes on the new SHA."
      ],
      successCriteria: [
        "The first failing assertion is identified.",
        "The correction is validated by a regression test.",
        "The PR check passes on the corrected commit."
      ]
    },
    {
      title: "Lab 2 — Diagnose a missing required check",
      objective: "Understand the difference between failed and unreported checks.",
      steps: [
        "Use a disposable repository with a test branch protection rule.",
        "Create a workflow that reports a stable required check.",
        "Modify a test workflow trigger or job condition in the disposable branch.",
        "Observe the missing/skipped check behavior.",
        "Restore the workflow and confirm the check is reported."
      ],
      successCriteria: [
        "The missing check is distinguished from a failed check.",
        "The event/filter problem is identified.",
        "The corrected workflow reports the required result."
      ]
    },
    {
      title: "Lab 3 — Investigate an intermittent integration test",
      objective: "Separate application defects from service-readiness problems.",
      steps: [
        "Run an integration test against a disposable database or service container.",
        "Collect startup logs and timestamps.",
        "Introduce a controlled readiness delay in the test environment.",
        "Observe whether the test fails before the service is ready.",
        "Add a bounded readiness check and repeat the test."
      ],
      successCriteria: [
        "The failure is reproduced safely.",
        "The service-readiness condition is demonstrated with evidence.",
        "Repeated runs are stable after the correction."
      ]
    },
    {
      title: "Lab 4 — Diagnose a dependency installation failure",
      objective: "Investigate lockfiles, runtime versions and registry connectivity.",
      steps: [
        "Run a clean install using the project's committed lockfile.",
        "Record runtime and package-manager versions.",
        "Inspect the failure without printing credentials.",
        "Compare with a known healthy environment.",
        "Fix the demonstrated cause and rerun the clean build."
      ],
      successCriteria: [
        "The cause is tied to reproducible evidence.",
        "The lockfile remains consistent.",
        "The clean install and required checks succeed."
      ]
    },
    {
      title: "Lab 5 — Validate merge queue checks",
      objective: "Verify that required CI runs for the merge-group event.",
      steps: [
        "Use a disposable repository with merge queue enabled, if available.",
        "Inspect pull_request and merge_group triggers.",
        "Observe the check results for the queued merge-group commit.",
        "Correct the test workflow if the required event is missing.",
        "Verify that the queue proceeds only after required checks pass."
      ],
      successCriteria: [
        "The workflow reports checks for the correct event and SHA.",
        "The ordinary PR validation remains enabled.",
        "The merge queue enforces the intended gates."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is a GitHub PR check?",
      answer: "A status result reported by CI or another integration to indicate whether a validation such as tests, build, lint, security scanning or deployment validation succeeded."
    },
    {
      question: "What is the first step when a PR check fails?",
      answer: "Confirm the repository, PR, head SHA, workflow run and exact failed step. Then classify the result as failure, missing, pending, skipped or cancelled before choosing diagnostics."
    },
    {
      question: "How do you distinguish a code issue from an infrastructure issue?",
      answer: "Reproduce the failure on the exact commit, inspect the first causal error, compare with a healthy environment and correlate runtime, runner, network and dependency evidence."
    },
    {
      question: "What is a flaky test?",
      answer: "A test that produces inconsistent results under comparable conditions. Investigate races, timing, shared state, resource contention and external services instead of treating a successful retry as a fix."
    },
    {
      question: "Why does a required check remain pending?",
      answer: "The workflow may not have triggered, the job may be skipped, the check name or source may have changed, or the result may not exist for the current commit."
    },
    {
      question: "Why can a local build pass while CI fails?",
      answer: "Different runtimes, toolchains, OS behavior, environment configuration, clean dependency installation, permissions or external services can produce different results."
    },
    {
      question: "How do you troubleshoot a runner that is offline?",
      answer: "Inspect the job queue, runner status, labels, service state, network connectivity and runner logs. Restore the matching runner capacity and avoid running untrusted code on privileged infrastructure."
    },
    {
      question: "How should you handle a 401 or 403 from a CI step?",
      answer: "Inspect the redacted API response, authentication context, token permissions, secret availability and organization policy. Apply the minimum necessary permission instead of granting broad access."
    },
    {
      question: "Why are forked pull requests different?",
      answer: "Fork workflows are treated as untrusted and normally have restricted access to secrets and write permissions. Separate safe validation from trusted publishing or deployment workflows."
    },
    {
      question: "What causes merge queue checks to fail when PR checks are green?",
      answer: "The merge-group commit may need its own checks. The workflow may not support merge_group, or the combined changes may reveal an integration failure."
    },
    {
      question: "What is the danger of blindly rerunning a failed job?",
      answer: "The failure may be deterministic or the job may have side effects. Repeated reruns waste resources and can repeat deployments or migrations without fixing the underlying cause."
    },
    {
      question: "How do you troubleshoot a missing artifact?",
      answer: "Inspect the producer job, upload path and name, artifact retention and downstream download configuration. Fix the producer-consumer contract and validate the complete pipeline."
    },
    {
      question: "How do you investigate a failure across many repositories?",
      answer: "Correlate timestamps and common dependencies, reusable workflows, runner images, registries and organization policy changes. Validate the shared cause before applying a broad fix."
    },
    {
      question: "What is the safe response when a production hotfix is blocked?",
      answer: "Assess the real production impact, identify the blocker, restore required validation and obtain approvals. Use an emergency exception only through formal authorization with explicit risk acceptance and an expiration plan."
    },
    {
      question: "How do you prove recovery?",
      answer: "Confirm required checks pass on the current commit, reviews and policy gates are satisfied, the approved merge succeeds and post-deployment service health remains within established limits."
    }
  ],

  officialReferences: [
    "https://docs.github.com/en/actions",
    "https://docs.github.com/en/actions/how-tos/monitor-workflows",
    "https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow",
    "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/troubleshooting-required-status-checks",
    "https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication",
    "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions",
    "https://docs.github.com/en/actions/using-workflows/reusing-workflows",
    "https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs",
    "https://cli.github.com/manual/gh_run_view",
    "https://cli.github.com/manual/gh_pr_checks",
    "https://www.githubstatus.com/"
  ]
};
