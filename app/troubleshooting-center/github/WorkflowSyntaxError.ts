export interface WorkflowSyntaxErrorGuide {
  title: string;
  slug: string;
  category: string;
  severity: string[];
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
    interpretation: string[];
    nextAction: string;
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCause: string;
    proof: string;
    resolution: string;
  }[];
  recoveryProcedures: {
    scenario: string;
    steps: string[];
    validation: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    investigation: string[];
    resolution: string[];
  }[];
  prevention: string[];
  monitoringAndAlerting: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    lab: string;
    steps: string[];
    expectedResult: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  officialReferences: {
    title: string;
    url: string;
  }[];
}

export const workflowSyntaxErrorGuide: WorkflowSyntaxErrorGuide = {
  title: "GitHub Actions Workflow Syntax Error — Production Troubleshooting",
  slug: "workflow-syntax-error",
  category: "GitHub Actions / CI-CD Troubleshooting",

  severity: [
    "SEV-1: Production deployment is blocked during a critical release or an invalid workflow has already caused a production-impacting change.",
    "SEV-2: Important CI/CD pipelines are failing across multiple services or environments.",
    "SEV-3: A single repository workflow is invalid, but an alternative release path exists.",
    "SEV-4: Non-critical validation, scheduled, or development workflow failure."
  ],

  overview: `
A GitHub Actions workflow syntax error occurs when GitHub cannot correctly
parse, validate, or evaluate a workflow definition stored under
.github/workflows/*.yml or .github/workflows/*.yaml.

A workflow can fail before any runner starts. This is different from a job
that starts and later fails because of a shell command, missing secret,
network problem, permissions issue, or deployment error.

Common causes include:

- Invalid YAML indentation or malformed YAML structures.
- Incorrect workflow keys, job definitions, or step definitions.
- Invalid expressions inside \${{ }}.
- Incorrect use of if conditions, needs, matrix, outputs, or environment.
- Invalid reusable workflow references or incorrect inputs.
- Incorrect action references or unsupported action configuration.
- YAML values interpreted as booleans, numbers, or null instead of strings.
- Incorrect quoting, colons, multiline scripts, or special characters.
- A workflow that works on one branch but is invalid on the default branch.
- A workflow file changed by a pull request or automated release process.
- Incorrect assumptions about GitHub context values or event payloads.

Important distinction:
YAML validity, GitHub workflow schema validity, expression evaluation, action
execution, and deployment success are separate stages. Identify the stage
that failed before changing the workflow.
`,

  incidentScenario: `
INCIDENT: A production release is scheduled, but GitHub Actions reports
"Invalid workflow file", "The workflow is not valid", "Unexpected value",
"Unrecognized named-value", or a similar validation error.

The team recently modified a deployment workflow to add a new environment,
matrix, conditional deployment, or reusable workflow.

Observed symptoms:
- No runner starts for the affected workflow.
- A new commit or pull request introduces a workflow validation error.
- The Actions UI displays an annotation pointing to a workflow file and line.
- A previously working workflow stops being triggered or becomes invalid.
- Developers attempt random indentation changes without confirming the error.
- The release deadline is approaching and the team considers rerunning jobs.

Production objective:
Restore the last known-good CI/CD behavior, preserve deployment safety,
identify the exact invalid expression or YAML structure, validate the fix,
and prevent recurrence without exposing secrets or bypassing approval controls.
`,

  impactAssessment: [
    "Identify the exact repository, branch, workflow file, commit SHA, event type, and affected environment.",
    "Determine whether only CI validation failed or whether a deployment job had already started.",
    "Check whether production has changed despite the failed workflow. A workflow validation error usually prevents that workflow run from starting, but another workflow or external deployment mechanism may have acted independently.",
    "Identify whether pull request checks, merge queues, scheduled jobs, release workflows, or deployment approvals are blocked.",
    "Check whether the failure affects one workflow, multiple workflows using a shared reusable workflow, or multiple repositories consuming a shared action.",
    "Establish the last known-good commit and the first commit containing the invalid change.",
    "Check whether a release window, incident response, security patch, or customer-facing service is affected.",
    "Do not classify the incident as resolved merely because the YAML file parses. The workflow must also validate and execute safely.",
    "Record the incident start time, detection time, affected SHA, owner, and current deployment state."
  ],

  safetyChecks: [
    "Confirm the organization, repository, branch, workflow filename, and commit SHA before editing.",
    "Use the actual failing run URL and error annotation rather than guessing which workflow is broken.",
    "Inspect the diff against the last known-good commit before changing the file.",
    "Confirm the deployment environment and target account, cluster, cloud project, or server before any manual recovery.",
    "Do not run an unreviewed production deployment merely to test whether syntax has been fixed.",
    "Do not disable required checks, branch protection, environment reviewers, or security scanning to get a green status.",
    "Do not print secrets, tokens, environment variables containing credentials, or complete process environments into logs.",
    "Do not replace a pinned action version or reusable workflow reference with an untrusted branch merely to bypass an error.",
    "Keep the failing workflow file, error message, commit SHA, and diagnostic logs for the incident record.",
    "If the pipeline may have partially deployed changes, inspect the target environment before rerunning it.",
    "Prefer a small, reviewable correction over rewriting the entire workflow during a production incident.",
    "For a critical release, use the approved release process and obtain the required production approval."
  ],

  evidenceCollection: [
    "GitHub Actions run URL and run ID.",
    "Exact validation error text, including file path, line, column, and annotation.",
    "Repository name, event type, source branch, base branch, commit SHA, and actor.",
    "Workflow files under .github/workflows/ and any referenced reusable workflows.",
    "The diff between the failing commit and the last known-good commit.",
    "Whether a runner was assigned and whether any step executed.",
    "Recent changes to action versions, reusable workflows, environments, secrets, permissions, and matrix definitions.",
    "Workflow dispatch inputs or event payload fields used by expressions, with sensitive values redacted.",
    "Results from YAML parsing and GitHub Actions-specific linting.",
    "Status of required checks, merge queue, deployment approvals, and target environment.",
    "Whether the same reusable workflow or action is consumed by other repositories.",
    "A timeline of commits, workflow runs, validation failures, attempted fixes, and recovery actions."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the exact failing workflow and incident scope",
      objective:
        "Separate a workflow validation failure from a job or deployment failure.",
      commands: [
        "gh auth status",
        "gh repo view OWNER/REPO",
        "gh run list --repo OWNER/REPO --limit 20",
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run view RUN_ID --repo OWNER/REPO --json name,workflowName,event,status,conclusion,headBranch,headSha,url,createdAt,updatedAt"
      ],
      interpretation: [
        "Replace OWNER, REPO, and RUN_ID with the real values.",
        "If gh auth status fails, verify the correct GitHub account and repository access before continuing.",
        "Use the run URL and validation annotation to identify the exact workflow and commit.",
        "If no runner or job started, investigate workflow validation, triggers, and event configuration first.",
        "If a runner started and a step failed, investigate that step's logs; do not assume every workflow error is a YAML syntax error.",
        "If the run is absent, verify the event trigger, branch, repository, workflow file location, and whether the workflow was enabled."
      ],
      nextAction:
        "Record the failing SHA, event type, workflow path, and exact error before editing anything."
    },
    {
      step: 2,
      title: "Confirm the repository and inspect the working tree",
      objective:
        "Avoid fixing a different repository, branch, or local copy.",
      commands: [
        "git rev-parse --show-toplevel",
        "git status --short",
        "git branch --show-current",
        "git remote -v",
        "git log -5 --oneline --decorate",
        "git diff -- .github/workflows/",
        "git diff --cached -- .github/workflows/"
      ],
      interpretation: [
        "The repository root must be the intended project.",
        "Unexpected local changes may be the real source of the problem.",
        "A clean working tree does not prove that the remote workflow is valid.",
        "Review both staged and unstaged workflow changes.",
        "Do not discard unrelated user changes with git reset --hard or git clean -fd."
      ],
      nextAction:
        "Switch to the correct branch or worktree only after confirming the intended target and preserving unrelated changes."
    },
    {
      step: 3,
      title: "Inspect the workflow file and the last known-good version",
      objective:
        "Locate the smallest change that introduced the validation failure.",
      commands: [
        "git ls-files .github/workflows",
        "git diff LAST_GOOD_SHA..FAILING_SHA -- .github/workflows/",
        "git show FAILING_SHA:.github/workflows/deploy.yml",
        "git show LAST_GOOD_SHA:.github/workflows/deploy.yml",
        "git log --oneline --follow -- .github/workflows/deploy.yml"
      ],
      interpretation: [
        "Replace deploy.yml with the actual workflow filename.",
        "Replace LAST_GOOD_SHA and FAILING_SHA with real commit SHAs.",
        "A change to a reusable workflow can break several consumer workflows even when their local YAML is unchanged.",
        "A change in the default branch may behave differently from a pull request branch.",
        "If the file was renamed, use git log and git diff to track the rename rather than assuming the old path exists."
      ],
      nextAction:
        "Identify the exact changed block and compare it with the workflow schema and intended behavior."
    },
    {
      step: 4,
      title: "Read the error annotation before running validators",
      objective:
        "Use GitHub's reported location to narrow the search.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO --log-failed",
        "gh run view RUN_ID --repo OWNER/REPO --json jobs,conclusion,status",
        "git diff --check"
      ],
      interpretation: [
        "A workflow rejected before runner allocation may not have downloadable job logs. The Actions UI or pull request annotation may contain the most useful error.",
        "An error reported at a line can be caused by an indentation or quoting mistake earlier in the same YAML block.",
        "git diff --check catches whitespace problems in the diff; it does not validate YAML or GitHub's workflow schema.",
        "An error mentioning an unexpected value usually points to an invalid key, wrong nesting, or an unsupported value.",
        "An unrecognized named-value often indicates an invalid expression context or misspelled property.",
        "An error about a required property can indicate a missing runs-on, steps, uses, or another required field."
      ],
      nextAction:
        "Classify the message as YAML parsing, workflow schema, expression, action input, trigger, permission, or runtime failure."
    },
    {
      step: 5,
      title: "Validate YAML syntax locally",
      objective:
        "Catch indentation, quoting, mapping, and sequence errors before pushing.",
      commands: [
        "python -m pip show PyYAML",
        "python -c \"import yaml; print(yaml.__version__)\"",
        "python -c \"import yaml; from pathlib import Path; p=Path('.github/workflows/deploy.yml'); yaml.safe_load(p.read_text(encoding='utf-8')); print('YAML parsed successfully')\""
      ],
      interpretation: [
        "Install PyYAML in an isolated development environment if it is missing; follow your team's dependency policy.",
        "Replace deploy.yml with the actual file.",
        "A parser error with a line and column often indicates malformed indentation, quoting, a missing colon, or an incorrectly formatted list.",
        "A successful YAML parse proves only that a generic YAML parser accepted the document. It does not prove that GitHub Actions accepts its keys or expressions.",
        "YAML parsers may interpret values such as on, true, false, and null differently depending on the YAML version and schema.",
        "Avoid treating a generic YAML parser's representation as the definitive GitHub Actions workflow model."
      ],
      nextAction:
        "If YAML parsing fails, correct the smallest malformed structure. If parsing succeeds, continue to GitHub-specific validation."
    },
    {
      step: 6,
      title: "Run GitHub Actions-specific linting",
      objective:
        "Check workflow structure and expressions beyond generic YAML parsing.",
      commands: [
        "actionlint .github/workflows/deploy.yml",
        "actionlint .github/workflows/*.yml",
        "actionlint .github/workflows/*.yaml",
        "git diff --check"
      ],
      interpretation: [
        "Install actionlint through your approved package manager if it is not available.",
        "Run the command from the repository root and check the exit code.",
        "A successful actionlint run is strong local evidence but does not replace GitHub's server-side validation.",
        "Linting may reveal expression type mismatches, invalid keys, unknown contexts, or incorrect action inputs.",
        "Some custom actions, dynamically generated values, or organization-specific behavior may require additional validation.",
        "If the wildcard matches no files in your shell, use explicit filenames or list the tracked workflow files first."
      ],
      nextAction:
        "Resolve actionable errors one at a time, then rerun linting across every affected workflow."
    },
    {
      step: 7,
      title: "Inspect YAML indentation and structural nesting",
      objective:
        "Ensure jobs, steps, conditions, and inputs are under the correct parent keys.",
      commands: [
        "Get-Content .github/workflows/deploy.yml",
        "git diff --word-diff=plain -- .github/workflows/deploy.yml",
        "git diff LAST_GOOD_SHA..FAILING_SHA -- .github/workflows/deploy.yml"
      ],
      interpretation: [
        "In PowerShell, Get-Content displays the workflow file; use the actual path.",
        "The jobs mapping must contain job identifiers, and each job must contain valid job-level configuration.",
        "A steps list belongs inside a normal runner job, not directly beside jobs.",
        "A job using a reusable workflow through uses has different allowed fields from a job that defines runs-on and steps.",
        "A key placed one indentation level too deep can become a step input instead of a job property.",
        "Check tabs, multiline blocks, and trailing characters if the visible indentation looks correct."
      ],
      nextAction:
        "Compare the nesting with the official GitHub Actions workflow syntax and keep the correction minimal."
    },
    {
      step: 8,
      title: "Check expressions, contexts, and conditional logic",
      objective:
        "Detect invalid expression syntax and unavailable context properties.",
      commands: [
        "Select-String -Path .github/workflows/*.yml -Pattern '\\$\\{\\{','if:','needs:','matrix.','github.event'",
        "actionlint .github/workflows/deploy.yml"
      ],
      interpretation: [
        "The PowerShell command is a search aid, not a complete expression validator.",
        "Check matching braces, quotes, property names, and expression operators.",
        "Verify that a context is available at the location where it is used; not every context is available in every field.",
        "Check that needs.job_id.outputs.output_name refers to an existing job output.",
        "Check that matrix references are used only when a matrix is configured.",
        "An if condition may have special expression handling in GitHub Actions; follow the documented syntax for the specific field.",
        "A valid expression can still evaluate to false, causing a job or step to be skipped. That is a logic issue, not necessarily a syntax error."
      ],
      nextAction:
        "Validate the expression against the documented context availability and intended event payload."
    },
    {
      step: 9,
      title: "Validate triggers and event-specific assumptions",
      objective:
        "Distinguish a malformed trigger from a workflow that simply did not run.",
      commands: [
        "Get-Content .github/workflows/deploy.yml",
        "gh workflow list --repo OWNER/REPO",
        "gh api repos/OWNER/REPO/actions/workflows",
        "gh api repos/OWNER/REPO/actions/runs?per_page=20"
      ],
      interpretation: [
        "Check the on section for push, pull_request, workflow_dispatch, schedule, or workflow_call configuration.",
        "Verify that branch filters, path filters, tags, and event types match the event that actually occurred.",
        "If a workflow_dispatch trigger is configured, confirm the workflow is available on the default branch for manual dispatch as required by GitHub.",
        "If no run exists, inspect trigger configuration and repository Actions settings instead of assuming a parser error.",
        "Be careful with PowerShell parsing of URLs containing query strings; quote arguments if the shell interprets special characters.",
        "API responses may contain repository metadata. Share only the relevant redacted fields when seeking help."
      ],
      nextAction:
        "Correct the trigger only if evidence shows the event or filter is wrong; do not broaden production triggers unnecessarily."
    },
    {
      step: 10,
      title: "Validate jobs, dependencies, and outputs",
      objective:
        "Check job IDs, needs relationships, outputs, and dependency graphs.",
      commands: [
        "Select-String -Path .github/workflows/deploy.yml -Pattern '^jobs:','needs:','outputs:','outputs\\.'",
        "actionlint .github/workflows/deploy.yml",
        "git diff LAST_GOOD_SHA..FAILING_SHA -- .github/workflows/deploy.yml"
      ],
      interpretation: [
        "Job IDs are identifiers, not display names; needs must reference the job ID.",
        "Check for misspelled job IDs and circular dependencies.",
        "Verify that referenced outputs are declared by the producing job and exposed through the correct step output.",
        "A job that depends on a skipped job may also be skipped depending on its condition and dependency logic.",
        "A dependency graph error can prevent the expected job sequence even if the YAML parses.",
        "Do not remove needs merely to make a deployment job run; that may bypass required build, test, or approval stages."
      ],
      nextAction:
        "Correct the dependency or output reference while preserving the intended order of build, test, security checks, and deployment."
    },
    {
      step: 11,
      title: "Validate reusable workflow calls",
      objective:
        "Check workflow_call definitions, references, inputs, outputs, and secret forwarding.",
      commands: [
        "Get-Content .github/workflows/deploy.yml",
        "Select-String -Path .github/workflows/*.yml -Pattern 'workflow_call:','uses:','secrets:','with:'",
        "actionlint .github/workflows/deploy.yml"
      ],
      interpretation: [
        "A reusable workflow is called at the job level using uses, not as an ordinary step action.",
        "Check that the referenced file exists at the referenced repository, path, and ref.",
        "Confirm the target reusable workflow declares every required input and secret.",
        "Verify that boolean, number, and string input types match the caller's values.",
        "Check secrets: inherit versus explicitly mapped secrets according to the trust boundary and repository design.",
        "For cross-repository reusable workflows, check access settings and the reference format.",
        "A syntactically valid call can still fail because the referenced workflow is inaccessible or a required input is missing."
      ],
      nextAction:
        "Validate the caller and reusable workflow together, ideally at a pinned, reviewed commit or release reference."
    },
    {
      step: 12,
      title: "Validate action references and action inputs",
      objective:
        "Separate invalid workflow syntax from an action configuration or runtime problem.",
      commands: [
        "Select-String -Path .github/workflows/*.yml -Pattern 'uses:','with:','run:'",
        "actionlint .github/workflows/deploy.yml",
        "git diff LAST_GOOD_SHA..FAILING_SHA -- .github/workflows/"
      ],
      interpretation: [
        "A normal step uses an action through uses or runs shell commands through run; their allowed fields differ.",
        "Check that each action reference and version exists and that its documented inputs are spelled correctly.",
        "Local composite actions should reference the correct relative path.",
        "A typo in an action input may be reported by linting or only when the action executes, depending on the action metadata.",
        "A missing action version or inaccessible reference is not always a YAML parser error.",
        "Do not change third-party action versions during an incident without reviewing compatibility, provenance, and security impact."
      ],
      nextAction:
        "Correct only the unsupported key, incorrect input, or invalid reference proven by the error."
    },
    {
      step: 13,
      title: "Review matrix, strategy, and dynamic configuration",
      objective:
        "Find malformed matrix definitions and invalid references to matrix values.",
      commands: [
        "Select-String -Path .github/workflows/deploy.yml -Pattern 'strategy:','matrix:','include:','exclude:','fail-fast:','max-parallel:'",
        "actionlint .github/workflows/deploy.yml"
      ],
      interpretation: [
        "Check that matrix values have valid YAML types and the expected list or mapping structure.",
        "Verify that include and exclude entries use the expected keys and values.",
        "Confirm matrix variables are referenced only in jobs configured with a matrix.",
        "A large matrix can create unexpected runner demand, but that is different from a syntax error.",
        "Dynamic matrices produced through job outputs need valid JSON and correct output wiring.",
        "Do not remove matrix combinations without confirming which platforms and environments are required."
      ],
      nextAction:
        "Validate the matrix structure and output data; test a small non-production matrix before expanding to all targets."
    },
    {
      step: 14,
      title: "Check permissions and environment configuration",
      objective:
        "Identify whether configuration errors are being confused with authorization or approval failures.",
      commands: [
        "gh api repos/OWNER/REPO/actions/permissions",
        "gh api repos/OWNER/REPO/environments",
        "gh api repos/OWNER/REPO/branches/main/protection"
      ],
      interpretation: [
        "These API requests require sufficient repository permissions and may return an authorization error.",
        "An API permission error is evidence about the caller's access, not proof that the workflow YAML is invalid.",
        "Check that permissions uses the supported scope and permission values.",
        "Confirm that environment names match the configured environment and that required reviewers or wait timers are understood.",
        "Environment protection rules can pause a deployment even when workflow syntax is valid.",
        "Do not weaken token permissions or remove required reviewers just to restore a green check."
      ],
      nextAction:
        "Fix a demonstrated permission or environment mismatch separately from any YAML or expression correction."
    },
    {
      step: 15,
      title: "Check branch-specific and merge-specific behavior",
      objective:
        "Determine why the same workflow appears valid on one branch but fails on another.",
      commands: [
        "git fetch origin",
        "git diff origin/main...HEAD -- .github/workflows/",
        "git log --oneline --decorate -- .github/workflows/",
        "gh pr view PR_NUMBER --repo OWNER/REPO",
        "gh pr checks PR_NUMBER --repo OWNER/REPO"
      ],
      interpretation: [
        "Replace main and PR_NUMBER with the actual branch and pull request.",
        "A pull request may contain a workflow change that is not present in the base branch.",
        "Required checks may be attached to a particular workflow name or expected status.",
        "Merge queue events may require a merge_group trigger for the relevant checks.",
        "A workflow can be syntactically valid but not run because the event or branch filters do not match.",
        "Avoid merging around a required validation check unless an explicitly approved emergency process authorizes the exception."
      ],
      nextAction:
        "Reproduce the failing change in a reviewable branch and validate the exact commit intended for merge."
    },
    {
      step: 16,
      title: "Reproduce the issue in a controlled branch",
      objective:
        "Prove that the correction fixes the failure without exposing production to an unreviewed deployment.",
      commands: [
        "git switch -c fix/workflow-syntax",
        "actionlint .github/workflows/deploy.yml",
        "git diff --check",
        "git diff -- .github/workflows/deploy.yml",
        "git status --short"
      ],
      interpretation: [
        "Use a unique branch name and preserve unrelated changes.",
        "The commands above validate local changes; they do not themselves trigger a GitHub Actions run.",
        "Review the diff to ensure the correction does not remove security checks, environment protection, or required dependencies.",
        "Use a pull request to validate the same commit that reviewers will approve.",
        "If the workflow deploys to production on push or pull_request, verify trigger safety before pushing the test branch."
      ],
      nextAction:
        "Open a pull request or use the approved validation process, then inspect the exact resulting workflow run."
    },
    {
      step: 17,
      title: "Validate the fix in GitHub",
      objective:
        "Confirm server-side workflow validation and expected check execution.",
      commands: [
        "gh pr checks PR_NUMBER --repo OWNER/REPO",
        "gh run list --repo OWNER/REPO --branch BRANCH_NAME --limit 10",
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run view RUN_ID --repo OWNER/REPO --log-failed"
      ],
      interpretation: [
        "Use the actual PR number, branch, and run ID.",
        "Confirm that the intended workflow was triggered for the intended event.",
        "If validation passes but a job fails, investigate the failing step as a separate issue.",
        "If the workflow remains absent, inspect trigger filters, default-branch requirements, workflow enablement, and repository settings.",
        "If checks pass but deployment remains pending, inspect environment approvals and concurrency.",
        "A green CI result is not sufficient to declare a production deployment healthy."
      ],
      nextAction:
        "Proceed only when workflow validation, required checks, and release approvals match the intended release process."
    },
    {
      step: 18,
      title: "Recover safely and assess rollback",
      objective:
        "Restore release capability while protecting the production environment.",
      commands: [
        "gh run list --repo OWNER/REPO --limit 20",
        "gh run view RUN_ID --repo OWNER/REPO",
        "git diff LAST_GOOD_SHA..FAILING_SHA -- .github/workflows/",
        "git status --short"
      ],
      interpretation: [
        "Determine whether the workflow failed before execution or after a deployment step started.",
        "If no deployment occurred, restoring the last known-good workflow or correcting the invalid block may be sufficient.",
        "If deployment partially occurred, inspect actual application and infrastructure state before rerunning.",
        "Do not use gh run rerun as a substitute for fixing invalid workflow configuration.",
        "If the workflow definition itself is invalid, a new valid commit or a safe revert is usually needed before a new run can execute.",
        "A rollback decision must consider database migrations, irreversible infrastructure changes, and application compatibility."
      ],
      nextAction:
        "Use the approved recovery plan, validate the target state, and document whether a rollback, forward fix, or no rollback was appropriate."
    },
    {
      step: 19,
      title: "Close the incident with evidence",
      objective:
        "Ensure the issue is fixed, the release is safe, and recurrence is less likely.",
      commands: [
        "actionlint .github/workflows/*.yml",
        "actionlint .github/workflows/*.yaml",
        "git diff --check",
        "git status --short",
        "gh pr checks PR_NUMBER --repo OWNER/REPO"
      ],
      interpretation: [
        "Run the checks that apply to the repository and its shell environment.",
        "Confirm every affected workflow, not only the first file that failed.",
        "Verify production health and the release SHA independently of CI status.",
        "Record the cause, evidence, correction, validation results, impact duration, and follow-up owners.",
        "Remove temporary diagnostic changes and ensure no credentials or sensitive event payloads were committed."
      ],
      nextAction:
        "Publish the incident summary and add the missing automated validation or review control."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "YAML parser reports a mapping or indentation error",
      likelyCause: "Incorrect indentation, missing colon, malformed list, quote, or multiline scalar",
      proof: "The YAML parser reports a line/column and the changed block contains a malformed structure",
      resolution: "Correct the structure, rerun YAML parsing, then run actionlint"
    },
    {
      symptom: "Unexpected value or unrecognized workflow property",
      likelyCause: "Unsupported key, wrong nesting, typo, or job/step configuration used at the wrong level",
      proof: "GitHub annotation or actionlint identifies the invalid key or location",
      resolution: "Move or rename the key according to the workflow schema"
    },
    {
      symptom: "Unrecognized named-value in an expression",
      likelyCause: "Misspelled context, invalid property, or context unavailable in that field",
      proof: "The error points to an expression using a context or property not supported there",
      resolution: "Use the documented context and property available at that evaluation point"
    },
    {
      symptom: "Workflow does not trigger after a push",
      likelyCause: "Trigger missing, branch/path filter mismatch, wrong event, or workflow not enabled",
      proof: "No matching run exists and the trigger configuration does not match the event",
      resolution: "Correct the specific trigger or filter; avoid broadening production triggers without review"
    },
    {
      symptom: "A job is skipped even though workflow syntax is valid",
      likelyCause: "if condition evaluates false, a dependency was skipped, or event data differs",
      proof: "The workflow run exists and job-level conclusions or expression values explain the skip",
      resolution: "Correct the condition or dependency logic while preserving required checks"
    },
    {
      symptom: "Reusable workflow call is invalid",
      likelyCause: "Wrong uses reference, missing workflow_call declaration, invalid input, or incorrect nesting",
      proof: "The caller reference and callee inputs/outputs do not match",
      resolution: "Fix the caller and callee contract and validate both files together"
    },
    {
      symptom: "Unknown action input or action reference cannot be resolved",
      likelyCause: "Misspelled input, wrong action version, bad path, or inaccessible repository",
      proof: "Action metadata, repository path, or run logs show the mismatch",
      resolution: "Use a valid documented input and reviewed action reference"
    },
    {
      symptom: "A matrix job fails validation",
      likelyCause: "Malformed matrix shape, invalid include/exclude entry, or wrong matrix reference",
      proof: "The strategy block or referenced matrix expression fails schema validation",
      resolution: "Correct the matrix structure and validate all intended combinations"
    },
    {
      symptom: "Required check is missing or merge is blocked",
      likelyCause: "Workflow did not trigger, check name changed, merge queue event is unsupported, or job was skipped",
      proof: "PR checks, branch protection, workflow triggers, and job conclusions show the missing check",
      resolution: "Restore the expected validation path without bypassing branch protection"
    },
    {
      symptom: "Workflow validates but deployment is denied",
      likelyCause: "Token permissions, environment protection, cloud identity, or deployment policy",
      proof: "The workflow starts successfully and a job or deployment step reports an authorization or approval failure",
      resolution: "Fix the specific access or approval issue separately from YAML syntax"
    },
    {
      symptom: "Workflow works locally but GitHub rejects it",
      likelyCause: "Generic YAML validation does not enforce the GitHub workflow schema or expression rules",
      proof: "Local YAML parsing succeeds but GitHub or actionlint identifies a workflow-specific error",
      resolution: "Use GitHub-specific linting and server-side validation"
    },
    {
      symptom: "Several repositories fail after a shared workflow change",
      likelyCause: "A shared reusable workflow or action contract changed incompatibly",
      proof: "The failures begin after the shared reference changed and consumer workflows use that version",
      resolution: "Restore a known-good shared reference or publish a compatible, validated version"
    }
  ],

  recoveryProcedures: [
    {
      scenario: "Workflow is rejected before any runner starts",
      steps: [
        "Capture the error annotation, workflow path, branch, and commit SHA.",
        "Compare the failing workflow with the last known-good version.",
        "Correct the proven syntax, schema, or expression issue in a small change.",
        "Run YAML parsing and actionlint locally.",
        "Submit the change through the normal review process.",
        "Confirm GitHub accepts the workflow before attempting a deployment."
      ],
      validation: [
        "GitHub no longer reports the invalid workflow.",
        "The expected validation workflow starts for the intended event.",
        "Required security, test, and approval checks remain enabled.",
        "No production changes occurred during the failed run."
      ]
    },
    {
      scenario: "A workflow was accidentally changed on the default branch",
      steps: [
        "Identify the commit that introduced the invalid configuration.",
        "Assess whether the commit contains unrelated or required changes.",
        "Prepare a targeted fix or an approved revert in a new commit.",
        "Do not rewrite shared history unless the repository's incident procedure explicitly allows it.",
        "Review the corrected workflow and validate it before merging.",
        "Notify release owners if required checks or deployments are blocked."
      ],
      validation: [
        "The default branch contains a valid workflow definition.",
        "The corrected workflow runs as expected.",
        "The incident record identifies the bad commit and recovery commit.",
        "Unrelated source changes have been preserved."
      ]
    },
    {
      scenario: "Workflow syntax is fixed but deployment state is uncertain",
      steps: [
        "Inspect the deployment job history and logs.",
        "Check the actual application, cloud, cluster, or infrastructure state using approved read-only commands.",
        "Compare the deployed version with the intended release SHA.",
        "Determine whether database migrations or infrastructure changes partially completed.",
        "Choose a controlled forward fix or approved rollback based on actual state.",
        "Do not rerun a non-idempotent deployment until duplicate actions and partial changes are understood."
      ],
      validation: [
        "Application health checks pass.",
        "The deployed version matches the approved release target.",
        "Infrastructure and database state are consistent.",
        "The recovery has been recorded and approved where required."
      ]
    },
    {
      scenario: "A shared reusable workflow breaks multiple repositories",
      steps: [
        "List consumer repositories and the shared workflow reference they use.",
        "Compare the shared workflow contract before and after the change.",
        "Identify which consumers use incompatible inputs, outputs, or secret mappings.",
        "Pin consumers to a known-good reviewed reference when that is the approved recovery strategy.",
        "Publish a compatible change and test representative consumers before broad rollout.",
        "Communicate the change and migration plan to repository owners."
      ],
      validation: [
        "Affected consumer workflows validate successfully.",
        "Required inputs, outputs, and secrets match the shared contract.",
        "The change is versioned and documented.",
        "No consumer bypasses required security checks."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Expressions behave differently for pull requests and push events",
      investigation: [
        "Inspect github.event_name, github.ref, github.sha, and the relevant event payload fields.",
        "Confirm the expression uses fields available for that event type.",
        "Check whether a pull request uses a merge ref or the expected head SHA.",
        "Verify that conditional deployment logic does not accidentally treat a pull request as a production release.",
        "Review fork pull request restrictions and ensure untrusted event data is not passed directly into shell commands."
      ],
      resolution: [
        "Use event-appropriate conditions and documented contexts.",
        "Separate validation workflows from deployment workflows when their trust requirements differ.",
        "Use safe quoting and environment-variable handling for untrusted values.",
        "Test push, pull request, and manual dispatch events independently where applicable."
      ]
    },
    {
      scenario: "A multiline shell command is mistaken for invalid YAML",
      investigation: [
        "Inspect the run block and confirm that each command is nested beneath run.",
        "Check block scalar markers such as | and >.",
        "Look for indentation that causes a shell line to become a new YAML key.",
        "Check colons, quotation marks, dollar signs, and embedded JSON.",
        "Determine whether the error is from the YAML parser or from the shell after a runner starts."
      ],
      resolution: [
        "Use a correctly indented multiline block.",
        "Quote shell strings appropriately for the runner's shell.",
        "Use a separate script file when a command is complex enough to be difficult to review inline.",
        "Run shell linting such as ShellCheck where applicable."
      ]
    },
    {
      scenario: "A matrix is generated from a previous job's JSON output",
      investigation: [
        "Check that the producing job writes a valid JSON string to the declared output.",
        "Confirm the step output is mapped to the job output.",
        "Verify that the consumer job references the correct needs job and output name.",
        "Inspect the JSON structure without exposing secrets.",
        "Check empty lists, missing properties, and unexpected data types."
      ],
      resolution: [
        "Validate generated JSON before exposing it as a job output.",
        "Use fromJSON only with valid, expected JSON.",
        "Add explicit checks for an empty or malformed matrix.",
        "Limit dynamic matrix inputs to trusted, bounded values."
      ]
    },
    {
      scenario: "Reusable workflow input or secret contract changes",
      investigation: [
        "Compare the caller's with and secrets mappings against the callee's on.workflow_call definition.",
        "Check required flags, declared input types, outputs, and secret names.",
        "Review whether secrets: inherit is permitted and appropriate for the trust boundary.",
        "Inspect all consumer repositories before changing a shared interface."
      ],
      resolution: [
        "Maintain backward compatibility or version the breaking change.",
        "Add a contract validation workflow for callers and callees.",
        "Avoid forwarding all secrets when only a small explicit set is needed.",
        "Pin references to reviewed versions according to organization policy."
      ]
    },
    {
      scenario: "A workflow is valid but required checks never appear",
      investigation: [
        "Review on triggers, branch and path filters, and event types.",
        "Check whether the workflow was disabled or renamed.",
        "Inspect branch protection and required status check configuration.",
        "For merge queues, check whether the required workflow handles the relevant merge_group event.",
        "Check whether a job was skipped due to if or dependency behavior."
      ],
      resolution: [
        "Restore the intended event coverage.",
        "Coordinate changes to required check names with repository administrators.",
        "Preserve security and test gates.",
        "Test the workflow against the same event that was missing the check."
      ]
    },
    {
      scenario: "A YAML parser accepts a value that GitHub interprets differently",
      investigation: [
        "Inspect values such as on, off, yes, no, true, false, and null.",
        "Check whether the local parser follows YAML 1.1 or YAML 1.2 behavior.",
        "Compare the parsed representation with the actual GitHub workflow syntax.",
        "Use actionlint and GitHub validation instead of relying only on a generic parser."
      ],
      resolution: [
        "Quote values intended to be strings when appropriate.",
        "Use the GitHub Actions schema and examples for trigger and expression fields.",
        "Add repository-level linting so the discrepancy is caught before merge."
      ]
    },
    {
      scenario: "A production deployment is triggered by an unsafe condition",
      investigation: [
        "Inspect push, pull_request, workflow_run, workflow_dispatch, and reusable workflow triggers.",
        "Check if conditions that select production environments.",
        "Review whether untrusted pull request content can influence a privileged job.",
        "Check permissions, environment protection, and concurrency settings.",
        "Review whether a workflow_run consumer downloads or executes artifacts produced by an untrusted workflow."
      ],
      resolution: [
        "Separate untrusted validation from privileged deployment.",
        "Use least-privilege permissions and protected environments.",
        "Avoid executing untrusted code with production credentials.",
        "Require reviewed commits and appropriate approvals for production deployment.",
        "Add security review and regression tests for trigger and permission changes."
      ]
    }
  ],

  prevention: [
    "Run actionlint against every workflow file in pull requests.",
    "Validate workflow changes before merge and require review for production workflow changes.",
    "Use a consistent YAML formatter and editor configuration.",
    "Protect .github/workflows/ with CODEOWNERS and required reviews where appropriate.",
    "Use branch protection and required checks instead of relying on manual review alone.",
    "Keep workflow files small and extract repeated behavior into reviewed reusable workflows when appropriate.",
    "Version reusable workflow interfaces and document required inputs, outputs, and secrets.",
    "Pin third-party actions to reviewed immutable commit SHAs when required by security policy.",
    "Use least-privilege GITHUB_TOKEN permissions at workflow and job levels.",
    "Use protected environments and required reviewers for production deployment.",
    "Test relevant event types, including pull_request, push, workflow_dispatch, and merge_group where used.",
    "Validate matrix definitions and generated JSON outputs.",
    "Avoid dynamic shell execution of untrusted event data.",
    "Add CI checks for workflow syntax, action references, shell scripts, and deployment manifests.",
    "Maintain a known-good release workflow revision and an approved rollback process.",
    "Document how to identify validation errors and distinguish them from runtime failures.",
    "Review workflow changes for security impact, not only whether they pass syntax validation.",
    "Track recurring workflow failures and add regression tests for the actual root cause."
  ],

  monitoringAndAlerting: [
    "Alert on repeated CI failures for critical repositories or release branches.",
    "Track deployment workflow success rate, failure rate, and time to recover.",
    "Notify release owners when required production validation checks fail or disappear.",
    "Monitor scheduled workflows for missing expected runs, not only failed runs.",
    "Track changes to reusable workflow versions and shared action references.",
    "Use GitHub audit logs and repository history to investigate workflow configuration changes where available.",
    "Record the workflow name, repository, event, branch, commit SHA, run URL, failure class, and incident owner.",
    "Avoid alerts that include secrets, tokens, complete environment dumps, or sensitive event payloads.",
    "Separate syntax validation failures, runner failures, authorization failures, test failures, and deployment health failures in dashboards.",
    "Measure mean time to detect and mean time to recover for release-blocking pipeline incidents."
  ],

  incidentReportTemplate: [
    "Incident title: GitHub Actions workflow validation failure",
    "Incident ID:",
    "Repository and workflow path:",
    "Affected branch and commit SHA:",
    "First detected at:",
    "Detected by:",
    "Severity and business impact:",
    "Affected environments and releases:",
    "Exact error message and annotation:",
    "Last known-good commit:",
    "Root cause supported by evidence:",
    "Diagnostic commands and results:",
    "Corrective change and review link:",
    "Validation and regression test results:",
    "Production state and rollback decision:",
    "Recovery time:",
    "Prevention action, owner, and due date:"
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Detect an indentation error safely",
      steps: [
        "Create a test branch in a non-production repository.",
        "Introduce an incorrect indentation level in a disposable workflow.",
        "Run actionlint against the file.",
        "Run a YAML parser to compare the error output.",
        "Correct the indentation and run both checks again.",
        "Open a pull request and verify that CI accepts the workflow."
      ],
      expectedResult:
        "You can identify the invalid structure, distinguish generic YAML parsing from GitHub-specific validation, and prove the fix."
    },
    {
      lab: "Lab 2 — Find a broken expression",
      steps: [
        "Create a test-only workflow with a misspelled context property.",
        "Run actionlint and inspect its expression diagnostic.",
        "Compare the property with GitHub's documented contexts.",
        "Correct the property and test the workflow on the intended event.",
        "Confirm that the condition produces the expected result."
      ],
      expectedResult:
        "You can distinguish invalid expression references from a valid condition that evaluates to false."
    },
    {
      lab: "Lab 3 — Validate a reusable workflow contract",
      steps: [
        "Create a test reusable workflow that declares workflow_call inputs.",
        "Create a caller workflow that references it.",
        "Deliberately mismatch one input name or type in the test branch.",
        "Run actionlint and inspect the caller/callee contract.",
        "Correct the contract and validate both files."
      ],
      expectedResult:
        "You can find input and reusable workflow configuration errors before deployment."
    },
    {
      lab: "Lab 4 — Simulate a release-blocking incident",
      steps: [
        "Use a non-production repository and a disposable deployment workflow.",
        "Record a known-good commit and workflow run.",
        "Introduce a syntax error in a separate branch.",
        "Capture the validation annotation and run local checks.",
        "Prepare a small correction, review the diff, and open a pull request.",
        "Verify the workflow is valid and that required checks remain enabled.",
        "Write a short incident report with root cause, evidence, and prevention."
      ],
      expectedResult:
        "You can recover a broken pipeline through a controlled review and validation process without bypassing production safeguards."
    }
  ],

  interviewQuestions: [
    {
      question: "What is a GitHub Actions workflow syntax error?",
      answer:
        "It is an error in the workflow definition, its schema, or its expressions that prevents GitHub from accepting or correctly evaluating the workflow. It differs from a command failure after a runner starts."
    },
    {
      question: "What is the difference between YAML validation and actionlint?",
      answer:
        "A YAML parser checks general YAML structure. actionlint also checks GitHub Actions-specific workflow syntax, common expression problems, and configuration mistakes. Neither replaces server-side GitHub validation."
    },
    {
      question: "Why can a line number in a YAML error be misleading?",
      answer:
        "The malformed structure may begin earlier. Incorrect indentation, quoting, or a missing delimiter can cause the parser to report the location where it finally became impossible to parse the document."
    },
    {
      question: "What do you do when no runner starts?",
      answer:
        "I inspect the GitHub annotation, workflow path, event, branch, commit SHA, and workflow configuration. I determine whether the failure occurred during validation or trigger evaluation before investigating runner-level commands."
    },
    {
      question: "How do you validate a workflow locally?",
      answer:
        "I inspect the diff, run a YAML parser, run actionlint, check whitespace with git diff --check, and validate the exact commit on GitHub through the normal pull request process."
    },
    {
      question: "What is the difference between a syntax error and a skipped job?",
      answer:
        "A syntax error prevents the workflow from being accepted or evaluated correctly. A skipped job generally means a valid workflow condition or dependency caused the job not to run."
    },
    {
      question: "How do you troubleshoot an invalid reusable workflow call?",
      answer:
        "I verify the referenced repository, path, and ref; check the callee's workflow_call declaration; compare input types, required inputs, outputs, and secret mappings; then validate both files together."
    },
    {
      question: "How do you investigate a missing required check?",
      answer:
        "I inspect workflow triggers, branch and path filters, event coverage, job conditions, merge queue configuration, workflow enablement, and branch protection. I do not bypass required checks as the first response."
    },
    {
      question: "What is your safe recovery strategy for a broken production workflow?",
      answer:
        "I establish the failing commit and production state, identify the smallest proven correction or approved revert, validate it locally, obtain required review, verify the GitHub run, and independently confirm deployment health."
    },
    {
      question: "Why is rerunning a failed workflow not always the correct fix?",
      answer:
        "A workflow rejected during validation cannot be repaired by rerunning it. Even when a job executed, rerunning may repeat a non-idempotent deployment or duplicate partial changes."
    },
    {
      question: "How do you prevent workflow syntax errors from reaching the default branch?",
      answer:
        "I use actionlint in CI, required pull request checks, CODEOWNERS for workflow files, review of workflow diffs, controlled reusable workflow versioning, and tests for relevant events."
    },
    {
      question: "What do you check if a workflow is valid but deployment fails?",
      answer:
        "I move to the runtime failure stage and investigate the failed step, logs, token permissions, environment approvals, cloud identity, network access, and target health. I do not keep changing YAML without evidence."
    },
    {
      question: "How do you troubleshoot a dynamic matrix?",
      answer:
        "I validate the producer's JSON, step and job output mapping, needs reference, fromJSON usage, matrix schema, and empty-input behavior."
    },
    {
      question: "What are the risks of changing a workflow during a production incident?",
      answer:
        "A rushed change can bypass security checks, expose credentials, deploy the wrong commit, or repeat partial changes. I preserve evidence, minimize the diff, maintain approvals, and validate the actual target state."
    },
    {
      question: "What information belongs in the incident report?",
      answer:
        "The workflow and commit, exact error, impact, last known-good version, evidence-backed root cause, corrective change, validation results, recovery time, rollback decision, and prevention owner."
    }
  ],

  officialReferences: [
    {
      title: "GitHub Actions workflow syntax",
      url: "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions"
    },
    {
      title: "GitHub Actions contexts",
      url: "https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs"
    },
    {
      title: "Expressions in GitHub Actions",
      url: "https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/evaluate-expressions-in-workflows-and-actions"
    },
    {
      title: "Reusable workflows",
      url: "https://docs.github.com/en/actions/sharing-automations/reusing-workflows"
    },
    {
      title: "Workflow validation with actionlint",
      url: "https://github.com/rhysd/actionlint"
    },
    {
      title: "GitHub Actions security hardening",
      url: "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions"
    },
    {
      title: "GitHub CLI manual",
      url: "https://cli.github.com/manual/"
    }
  ]
};
