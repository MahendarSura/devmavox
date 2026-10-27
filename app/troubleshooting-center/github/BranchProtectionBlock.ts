export interface BranchProtectionBlockGuide {
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

export const branchProtectionBlockGuide: BranchProtectionBlockGuide = {
  title: "GitHub Branch Protection Block — Production Troubleshooting",
  category: "GitHub Administration / Repository Governance / CI/CD",
  severity: "SEV-2 or SEV-3 depending on deployment impact",

  overview: `
Branch protection prevents unauthorized or unsafe changes from reaching
important branches such as main, master, release/* and production.

A pull request can remain blocked even when a developer believes the code
is correct. The actual blocker may be a failed required status check,
missing approval, stale approval, unresolved review conversation, CODEOWNERS
requirement, signed-commit policy, merge queue, deployment requirement,
restricted push permission, branch ruleset, or an outdated feature branch.

The objective is not to disable protection just to merge code. It is to
identify the exact enforcement rule, collect evidence, fix the underlying
condition, validate the result, and preserve production safeguards.

Important distinction:
- Branch protection rules and repository/org rulesets are separate
  enforcement mechanisms.
- Classic branch protection generally applies only one matching rule
  to a branch, while rulesets can layer multiple applicable rules.
- A repository administrator may still be restricted by rulesets,
  organization policy, or explicit no-bypass configuration.
- A green check on an older commit does not necessarily satisfy the
  check requirement for the latest commit.
`,

  incidentScenario: `
Production incident:

A developer opens PR #482 to merge feature/payment-timeout into main.
All code changes have been reviewed locally, but GitHub displays
"Review required" and "Required status checks have not passed".

The CI workflow was renamed last week. The branch protection rule still
expects the previous check name. Another workflow is skipped because
its path filter excludes the changed files. The PR also falls behind
main after another release is merged.

The release team cannot merge the PR. A scheduled production deployment
is delayed, and stakeholders are asking whether the team can temporarily
disable protection.

The correct response is to identify each independent blocker, determine
whether the deployment deadline is genuinely at risk, preserve the
required controls, and recover through the approved change process.
Do not delete the protection rule or force-push to main as a shortcut.
`,

  impactAssessment: [
    "Identify the exact repository, organization, pull request number, base branch, head branch and target environment.",
    "Determine whether only one PR is blocked or every PR targeting main or release branches is affected.",
    "Check whether a production deployment is waiting, a release window is closing, or an already-running deployment is affected.",
    "Determine whether any commit has already merged or whether the incident is limited to merge authorization.",
    "Identify the blocking category: review, CI status, branch freshness, signing, conversations, deployment protection, merge queue, permissions or rulesets.",
    "Check whether the incident began after a workflow rename, repository transfer, team permission change, ruleset update, GitHub App change or organization policy update.",
    "Assign an incident owner and a repository administrator or platform engineer with the appropriate permissions.",
    "Escalate severity when a critical patch, security fix or production release is delayed. A blocked PR alone does not automatically mean production is down."
  ],

  safetyChecks: [
    "Confirm repository identity with gh repo view OWNER/REPO before running any administrative command.",
    "Confirm the PR base branch is actually main or the intended release branch.",
    "Check gh auth status and ensure the authenticated identity is the intended operator.",
    "Use read-only diagnostics first. Do not modify branch protection, rulesets, repository permissions or bypass lists before collecting evidence.",
    "Never paste personal access tokens, GitHub App private keys, deployment secrets or Authorization headers into logs or incident reports.",
    "Do not run git push --force against a protected production branch as a troubleshooting shortcut.",
    "Do not lower required approvals or remove a required security scan simply to make a PR green.",
    "Before a policy change, obtain the required production/change-management approval and document the current configuration.",
    "Check whether an organization ruleset, enterprise policy or merge queue is also enforcing the branch.",
    "If a temporary exception is formally approved, make it narrowly scoped, time-bound, auditable and reversible.",
    "Use a test repository or non-production branch to validate policy changes where practical.",
    "Remember that GitHub CLI and API commands require sufficient permissions; a 403 response can indicate authorization or policy limitations, not necessarily a broken branch rule."
  ],

  evidenceCollection: [
    "Incident start time in UTC and the timestamp of the last known successful merge.",
    "Repository owner/name, PR number, base/head branch names, head commit SHA and base commit SHA.",
    "Exact GitHub merge-block message and the status of every required check.",
    "Review decision, approval count, reviewer identities where appropriate, dismissed approvals and outstanding requested changes.",
    "Required check names, their latest run IDs, conclusion, triggering event and source GitHub App.",
    "Branch protection configuration returned by the API, including review requirements and required status checks.",
    "Applicable repository, organization and enterprise rulesets, including enforcement state and bypass actors.",
    "CODEOWNERS file path and the teams or users expected to review the changed paths.",
    "Commit-signature verification results and the configured signing requirement.",
    "Whether the PR is behind the base branch or waiting in a merge queue.",
    "Recent audit-log events and configuration changes, where the organization's plan and permissions provide access.",
    "Relevant workflow YAML, path filters, branch filters, job-level conditions and merge_group triggers.",
    "Before-and-after configuration snapshots for any approved policy change."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Verify repository, authentication and PR identity",
      objective: "Rule out an incorrect repository, account, branch or PR before investigating policy.",
      commands: [
        "gh auth status",
        "gh repo view OWNER/REPO",
        "gh pr view 482 --repo OWNER/REPO --json number,title,state,baseRefName,headRefName,headRefOid,baseRefOid,isDraft,mergeStateStatus,reviewDecision,statusCheckRollup,url",
        "git status --short --branch",
        "git remote -v"
      ],
      interpretOutput: [
        "Wrong repository or unexpected remote: stop; do not modify any policy.",
        "Wrong base branch: the PR may be targeting a different protection rule or ruleset.",
        "CLOSED or MERGED PR: investigate the actual current incident rather than treating the old PR as blocked.",
        "A dirty local working tree is evidence about the workstation, not proof that GitHub protection is misconfigured.",
        "mergeStateStatus provides useful merge-state context, but it does not replace inspection of individual rules and checks."
      ],
      nextAction: "Record the PR number, base branch, head SHA, repository identity and exact merge-block message."
    },
    {
      step: 2,
      title: "Read the effective classic branch protection configuration",
      objective: "Determine which requirements are configured for the target branch.",
      commands: [
        "gh api repos/OWNER/REPO/branches/main/protection",
        "gh api repos/OWNER/REPO/branches/main/protection/required_status_checks",
        "gh api repos/OWNER/REPO/branches/main/protection/required_pull_request_reviews"
      ],
      interpretOutput: [
        "200 response: inspect the returned requirements and compare them with the PR's actual state.",
        "404 response: the classic protection endpoint may have no applicable rule, the branch may not exist, or the caller may not be able to inspect it. Check the repository and permissions before concluding protection is absent.",
        "403 response: inspect the authenticated user's permissions, organization policies and endpoint access.",
        "Required check names differ from actual CI job/check names: investigate a stale or mismatched status-check requirement.",
        "Review count or code-owner requirement differs from the PR: investigate review eligibility and CODEOWNERS."
      ],
      nextAction: "Save the read-only JSON output securely. Continue to rulesets because classic branch protection is not the only possible enforcement layer."
    },
    {
      step: 3,
      title: "Inspect repository and organization rulesets",
      objective: "Find layered rules that may block merging even when classic protection looks correct.",
      commands: [
        "gh api repos/OWNER/REPO/rulesets",
        "gh api repos/OWNER/REPO/rules/branches/main",
        "gh api orgs/ORG/rulesets"
      ],
      interpretOutput: [
        "Repository rulesets endpoint: enumerate available repository rulesets, then inspect each relevant ruleset by ID.",
        "The effective-rules endpoint can show rules applying to a branch, subject to endpoint support and permissions.",
        "An organization ruleset may apply to repositories across the organization and may require organization-level access to inspect.",
        "A ruleset configured for evaluation or disabled enforcement may behave differently from an active enforcement rule.",
        "A 404 or empty response from one endpoint does not prove that no organization or enterprise policy applies."
      ],
      nextAction: "Identify every applicable active rule and its enforcement/bypass configuration. If access is insufficient, request read access from the repository or organization administrator."
    },
    {
      step: 4,
      title: "Identify the precise merge blocker",
      objective: "Avoid changing the wrong setting when multiple independent requirements fail.",
      commands: [
        "gh pr view 482 --repo OWNER/REPO --json reviewDecision,mergeStateStatus,statusCheckRollup",
        "gh pr checks 482 --repo OWNER/REPO",
        "gh pr view 482 --repo OWNER/REPO --comments",
        "gh run list --repo OWNER/REPO --branch feature/payment-timeout --limit 20"
      ],
      interpretOutput: [
        "Review required: inspect approval count, eligible reviewers, requested changes and CODEOWNERS.",
        "Expected check missing: inspect workflow triggers, filters, job names, event type and check source.",
        "Check failure: inspect the specific run logs rather than rerunning every workflow blindly.",
        "Branch out of date: inspect the base branch and determine whether strict required checks are enabled.",
        "Merge queue required: use the queue workflow and investigate merge_group support.",
        "No single clear blocker: inspect all applicable rulesets and deployment requirements. Several conditions may fail simultaneously."
      ],
      nextAction: "Create a list of blockers with evidence, owner and corrective action. Resolve each requirement without weakening unrelated controls."
    },
    {
      step: 5,
      title: "Investigate required status-check names and sources",
      objective: "Determine why a CI job is not satisfying the exact required check.",
      commands: [
        "gh run list --repo OWNER/REPO --limit 30",
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run view RUN_ID --repo OWNER/REPO --log-failed",
        "gh api repos/OWNER/REPO/commits/HEAD_SHA/check-runs",
        "gh api repos/OWNER/REPO/commits/HEAD_SHA/status"
      ],
      interpretOutput: [
        "Replace HEAD_SHA with the PR's actual head commit SHA; do not use the literal placeholder.",
        "The configured required check must match the actual check name, and the latest commit must have an acceptable result.",
        "If a check is restricted to a specific GitHub App, verify that the expected App supplied the check.",
        "A check and a commit status with the same required name can both need to pass.",
        "A successful result on an older commit may not satisfy the requirement for the current commit.",
        "Workflow job names should be unique across workflows when they are used as required status checks."
      ],
      nextAction: "Correct the workflow/check configuration or the required-check selection using the approved change process. Then verify the new check on the current commit."
    },
    {
      step: 6,
      title: "Investigate workflows that never report a required check",
      objective: "Find skipped or incorrectly triggered CI workflows.",
      commands: [
        "git grep -n -E 'pull_request|pull_request_target|push|merge_group|paths:|branches:|if:' .github/workflows",
        "git log -10 --oneline -- .github/workflows",
        "gh run list --repo OWNER/REPO --limit 30"
      ],
      interpretOutput: [
        "Path filters can skip an entire workflow, leaving a required check pending.",
        "A job-level condition can skip a job even when the workflow runs.",
        "A workflow triggered only by workflow_dispatch may not produce a check eligible for the required PR check.",
        "A merge queue requires the appropriate merge_group trigger for GitHub Actions checks.",
        "If the workflow YAML was renamed, inspect the new job name and the required check configured in protection.",
        "A missing run is different from a failed run; inspect the event and filter before diagnosing test failure."
      ],
      nextAction: "Make the required workflow report a check for the relevant PR or merge-queue event. Avoid making a mandatory check optional merely to clear the queue."
    },
    {
      step: 7,
      title: "Check review approvals, CODEOWNERS and stale approvals",
      objective: "Establish whether the review requirement is genuinely satisfied.",
      commands: [
        "gh pr view 482 --repo OWNER/REPO --json reviewDecision,latestReviews,reviewRequests,files",
        "git ls-tree -r HEAD --name-only | findstr /I CODEOWNERS",
        "git show HEAD:.github/CODEOWNERS"
      ],
      interpretOutput: [
        "A CODEOWNERS file may exist at the repository root, .github/CODEOWNERS or docs/CODEOWNERS; inspect the applicable file in the PR's branch.",
        "A code-owner review may be required for specific changed paths even if general approvals exist.",
        "A review from the PR author does not count as an independent approval.",
        "A review from a person without the necessary repository write permissions may not satisfy the configured requirement.",
        "New commits or base-branch changes can dismiss stale approvals when the relevant option is enabled.",
        "A required most-recent-push approval may require a different reviewer to approve after the latest reviewable push.",
        "Check whether the PR is marked as a draft or has outstanding requested changes."
      ],
      nextAction: "Request review from an eligible reviewer or correct the ownership/approval configuration through the approved process. Do not manufacture or reuse approvals."
    },
    {
      step: 8,
      title: "Investigate signed commits and linear history",
      objective: "Resolve commit-policy failures without rewriting protected history recklessly.",
      commands: [
        "git log --show-signature -10",
        "git verify-commit HEAD",
        "git status --short --branch",
        "gh pr view 482 --repo OWNER/REPO --json headRefOid,baseRefOid,mergeStateStatus"
      ],
      interpretOutput: [
        "An unsigned or unverified commit may violate a required-signature rule.",
        "A local verification failure can also be caused by missing public keys or local trust configuration; compare with GitHub's commit verification display.",
        "Linear-history requirements may reject merge commits or a merge strategy incompatible with repository settings.",
        "Do not rewrite shared commits without coordinating with collaborators and assessing the effects on reviews and CI."
      ],
      nextAction: "Use the team's approved signing configuration and supported merge strategy. Re-run checks after any history change."
    },
    {
      step: 9,
      title: "Check branch freshness and merge conflicts",
      objective: "Determine whether strict status checks require the head branch to catch up with the base branch.",
      commands: [
        "git fetch origin",
        "git rev-list --left-right --count origin/main...HEAD",
        "git merge-base HEAD origin/main",
        "git merge-tree $(git merge-base HEAD origin/main) origin/main HEAD"
      ],
      interpretOutput: [
        "Run these local Git comparisons only after confirming HEAD is the intended PR branch.",
        "A branch behind main can fail strict required status checks even when earlier CI runs passed.",
        "A merge conflict is separate from a required-check failure and may require resolving the source changes.",
        "merge-tree output depends on the installed Git version; if unsupported, use a temporary worktree to test the merge safely."
      ],
      nextAction: "Update the feature branch using the team's approved merge or rebase workflow, resolve conflicts, push normally and wait for checks on the resulting commit."
    },
    {
      step: 10,
      title: "Check restricted push access and branch targeting",
      objective: "Distinguish a merge requirement from a direct-push authorization failure.",
      commands: [
        "gh api repos/OWNER/REPO/branches/main",
        "gh api repos/OWNER/REPO/collaborators/USERNAME/permission",
        "gh api repos/OWNER/REPO/rules/branches/main"
      ],
      interpretOutput: [
        "A developer may have read or triage access without write access.",
        "A push restriction may allow only selected users, teams or GitHub Apps.",
        "Having permission to push does not necessarily allow direct pushes when pull requests are required.",
        "Do not infer an actor's effective access from one permission response alone; organization membership, teams and rulesets may also matter."
      ],
      nextAction: "Use the intended PR-based workflow or request the minimum required permission from the repository owner."
    },
    {
      step: 11,
      title: "Inspect deployment requirements and merge queues",
      objective: "Identify gates that occur after ordinary CI or review checks.",
      commands: [
        "gh pr view 482 --repo OWNER/REPO --json mergeStateStatus,statusCheckRollup",
        "gh run list --repo OWNER/REPO --limit 30",
        "gh api repos/OWNER/REPO/deployments"
      ],
      interpretOutput: [
        "A deployment protection rule may require successful deployment to a named environment before merging.",
        "A merge queue can create a temporary merge-group commit that must receive its own checks.",
        "Passing the feature branch's ordinary PR checks does not guarantee that merge-group checks have passed.",
        "Deployment listing is supporting evidence; inspect the configured branch rule or ruleset to identify the actual required environment."
      ],
      nextAction: "Restore the missing deployment/check integration or follow the configured merge queue. Do not mark a deployment successful without evidence."
    },
    {
      step: 12,
      title: "Correlate the incident with recent policy changes",
      objective: "Find whether a recent settings change caused a new merge block.",
      commands: [
        "gh api repos/OWNER/REPO/events",
        "gh api repos/OWNER/REPO/commits/main",
        "gh run list --repo OWNER/REPO --limit 50"
      ],
      interpretOutput: [
        "Repository events are not a complete audit log and may not expose all administrative settings changes.",
        "Compare workflow commits, rule configuration snapshots, PR history and incident timestamps.",
        "For organization audit logs, use the organization's approved audit-log interface/API and required permissions.",
        "If the evidence points to a ruleset or protection change, ask the administrator to confirm the audit event and actor."
      ],
      nextAction: "Record the change, actor, timestamp and impact. Restore a known-good policy only through an approved, auditable operation."
    },
    {
      step: 13,
      title: "Validate recovery and confirm normal enforcement",
      objective: "Ensure the PR can merge for the right reason, with all required controls intact.",
      commands: [
        "gh pr checks 482 --repo OWNER/REPO",
        "gh pr view 482 --repo OWNER/REPO --json reviewDecision,mergeStateStatus,statusCheckRollup,headRefOid",
        "gh run list --repo OWNER/REPO --limit 20"
      ],
      interpretOutput: [
        "Every mandatory requirement should be satisfied for the current PR/commit.",
        "Confirm no protection setting was unintentionally weakened.",
        "Confirm the required checks ran for the intended event and from the expected source.",
        "A green check alone is not sufficient evidence if review, signature, queue or deployment requirements remain unsatisfied."
      ],
      nextAction: "Use the approved merge path, monitor the subsequent deployment and close the incident only after validation."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Required status check is missing or pending",
      likelyCause: "Workflow did not run, path/branch filter excluded the PR, job was skipped, or check name changed.",
      evidence: "No relevant run exists, run uses a different event, job is skipped, or configured check name differs from the actual job/check.",
      resolution: "Fix workflow triggers/conditions or update the required check to the correct stable check name."
    },
    {
      symptom: "Required status check failed",
      likelyCause: "Build, test, lint, security scan or deployment validation failed.",
      evidence: "Failed step and error in the run logs for the latest relevant commit.",
      resolution: "Fix the underlying build/test/security issue and rerun the required workflow."
    },
    {
      symptom: "Check passed but GitHub still blocks merging",
      likelyCause: "Check belongs to an older commit, expected GitHub App differs, duplicate names exist, or merge-group check is missing.",
      evidence: "Compare head SHA, check run SHA, check source and required check configuration.",
      resolution: "Produce the required check for the current commit/event and remove ambiguous naming through a controlled workflow update."
    },
    {
      symptom: "Review required despite existing approval",
      likelyCause: "Insufficient approvals, stale approval, code-owner review missing or latest-push approval required.",
      evidence: "PR review decision, requested reviewers, changed file paths and CODEOWNERS patterns.",
      resolution: "Obtain the required eligible review after the latest relevant change."
    },
    {
      symptom: "Direct push to main rejected",
      likelyCause: "Pull request requirement, push restriction, signed commits, status checks or another applicable rule.",
      evidence: "Exact GH006/GH013 message and effective rule configuration.",
      resolution: "Use the intended PR workflow and satisfy the applicable requirements."
    },
    {
      symptom: "PR says branch must be up to date",
      likelyCause: "Strict required status checks and a head branch behind the base branch.",
      evidence: "Base/head SHAs, branch comparison and protection configuration.",
      resolution: "Merge or rebase the latest base branch using the approved workflow, then rerun checks."
    },
    {
      symptom: "CODEOWNERS approval never appears",
      likelyCause: "Wrong CODEOWNERS file location, malformed pattern, team access problem or changed file outside the expected pattern.",
      evidence: "Applicable CODEOWNERS file, changed paths, review requests and team permissions.",
      resolution: "Correct the ownership mapping or request an eligible code-owner review."
    },
    {
      symptom: "Commit rejected due to signature",
      likelyCause: "Commit is unsigned or GitHub cannot verify the signature.",
      evidence: "Commit verification details and the branch's signed-commit requirement.",
      resolution: "Use the approved signing method and create a verified commit without unsafe history rewriting."
    },
    {
      symptom: "PR cannot merge after CI succeeds",
      likelyCause: "Merge queue, deployment requirement, unresolved conversation or another ruleset requirement.",
      evidence: "Merge-block UI, applicable rulesets and deployment/queue state.",
      resolution: "Satisfy the missing requirement through its intended workflow."
    },
    {
      symptom: "Protection settings look correct but behavior is unexpected",
      likelyCause: "Organization or enterprise ruleset, incorrect branch pattern, stale assumptions or insufficient visibility.",
      evidence: "Effective rules, repository branch patterns, organization rulesets and audit events.",
      resolution: "Ask the authorized organization/enterprise administrator to inspect the effective policy and correct its scope."
    }
  ],

  recoveryProcedures: [
    {
      scenario: "Required check name changed after a workflow refactor",
      actions: [
        "Record the current required check name and the actual name reported by GitHub Actions.",
        "Verify the new check runs reliably on pull_request and, where applicable, merge_group.",
        "Update the required check configuration through a reviewed change.",
        "Keep equivalent or stronger quality and security coverage; do not remove the requirement without a replacement."
      ],
      validation: [
        "Open a test PR and confirm the expected check appears.",
        "Verify the check reports success on the latest relevant commit.",
        "Confirm the PR remains blocked if the required check fails."
      ],
      rollbackDecision: "If the new check is unreliable, restore the previous workflow/check mapping through an approved change while keeping a valid required gate."
    },
    {
      scenario: "Approval or CODEOWNERS requirement blocks a release",
      actions: [
        "Identify the exact changed files and applicable ownership rules.",
        "Request approval from an eligible reviewer or code owner.",
        "Resolve requested changes and confirm whether new commits dismissed previous approvals.",
        "Escalate to the designated review owner if the expected team is unavailable."
      ],
      validation: [
        "Verify the PR review decision satisfies the configured approval count.",
        "Verify required code-owner and latest-push reviews are complete.",
        "Confirm all requested changes and conversation requirements are resolved."
      ],
      rollbackDecision: "Do not relax production review requirements because a reviewer is unavailable. Use the organization's approved emergency-review procedure."
    },
    {
      scenario: "Feature branch is behind main",
      actions: [
        "Fetch the latest base branch.",
        "Review incoming commits and identify possible conflicts.",
        "Use the team's established merge or rebase approach.",
        "Run tests locally where useful and push the updated feature branch normally."
      ],
      validation: [
        "Confirm the PR uses the expected base and head branches.",
        "Wait for required checks on the updated commit.",
        "Verify that the strict up-to-date requirement is satisfied."
      ],
      rollbackDecision: "If the update introduces regressions or conflicts, restore the feature branch to a known-good state using normal version-control procedures and investigate before merging."
    },
    {
      scenario: "A ruleset or protection policy was changed incorrectly",
      actions: [
        "Collect the current rule configuration and relevant audit evidence.",
        "Identify the last known-good configuration from an approved record.",
        "Obtain administrator and change approval.",
        "Apply the smallest correction to the correct rule and branch scope.",
        "Record who changed the rule and why."
      ],
      validation: [
        "Re-read the rule configuration.",
        "Test a permitted PR and a deliberately noncompliant test PR where safe.",
        "Confirm expected restrictions remain enforced."
      ],
      rollbackDecision: "Restore the known-good policy if the correction creates unintended access or blocks unrelated critical workflows. Do not globally disable enforcement as a first response."
    },
    {
      scenario: "Urgent production hotfix is blocked",
      actions: [
        "Declare the appropriate incident/change process and identify the release owner.",
        "Identify the exact missing requirement and whether it can be satisfied quickly.",
        "Prioritize obtaining an eligible reviewer and restoring a reliable check.",
        "If an emergency exception is explicitly authorized, scope it to the minimum actor, branch and time window supported by the platform.",
        "Document the exception, risk acceptance, approval and expiration/reversal plan."
      ],
      validation: [
        "Verify the hotfix commit, test evidence, security impact and intended deployment target.",
        "Verify the resulting deployment health and monitor key service indicators.",
        "Confirm the normal branch protections are restored and tested."
      ],
      rollbackDecision: "Rollback the application release if service health or error rates breach the incident's rollback criteria. Policy rollback and application rollback are separate decisions."
    }
  ],

  advancedScenarios: [
    {
      title: "Required check is successful on the PR but missing in the merge queue",
      symptoms: [
        "Ordinary PR checks are green.",
        "The PR cannot merge after entering the merge queue.",
        "A required check remains pending for the temporary merge-group commit."
      ],
      investigation: [
        "Inspect the ruleset/branch configuration to confirm merge queue is required.",
        "Inspect workflow on events and verify merge_group is configured.",
        "Inspect the run event, commit SHA and check name for the queued merge group.",
        "Confirm that the workflow's branch/path filters do not unintentionally exclude merge-group events."
      ],
      resolution: [
        "Add the required merge_group trigger to the relevant workflow while preserving pull_request checks.",
        "Test the workflow through a real test merge queue.",
        "Verify that required checks are reported for the merge-group commit."
      ]
    },
    {
      title: "Path-filtered workflow causes a permanent pending check",
      symptoms: [
        "PR changes files outside the workflow's configured paths.",
        "A required workflow is skipped entirely.",
        "GitHub continues waiting for the mandatory check."
      ],
      investigation: [
        "Inspect workflow-level paths and paths-ignore filters.",
        "Compare changed PR files against the filters.",
        "Distinguish a skipped workflow from a skipped job.",
        "Check whether the required check is expected to run for every PR."
      ],
      resolution: [
        "Ensure mandatory check reporting is consistent for all applicable PRs.",
        "Consider running a lightweight always-present gate that evaluates whether expensive jobs are needed.",
        "Keep substantive tests and security checks mandatory where they are required."
      ]
    },
    {
      title: "Required check name is duplicated across workflows",
      symptoms: [
        "Different workflows report a check with the same display name.",
        "The PR intermittently remains blocked despite one green run.",
        "The behavior changes after workflow refactoring."
      ],
      investigation: [
        "List workflow files and their job names.",
        "Inspect check runs on the latest PR commit.",
        "Compare each check's source, name, conclusion and SHA."
      ],
      resolution: [
        "Use unique, stable job names for mandatory checks.",
        "Update required-check configuration through review.",
        "Validate the naming convention across all workflows that target the protected branch."
      ]
    },
    {
      title: "GitHub App or integration no longer satisfies a required check",
      symptoms: [
        "The required check reports that it was not set by the expected GitHub App.",
        "A CI migration or app reinstallation occurred.",
        "A similarly named check appears from another source."
      ],
      investigation: [
        "Inspect the check run's app/source metadata.",
        "Inspect required status-check configuration and the selected expected source.",
        "Review recent app installation, permission and workflow changes."
      ],
      resolution: [
        "Restore the expected integration or intentionally update the required check source after validating the replacement.",
        "Ensure the new integration has only the permissions it needs.",
        "Re-run the PR checks and verify the expected source."
      ]
    },
    {
      title: "Approval becomes stale after the base branch changes",
      symptoms: [
        "A previously approved PR becomes blocked after another PR merges.",
        "The review count appears sufficient but the review decision is not approved.",
        "The repository requires dismissal of stale approvals or approval after the latest push."
      ],
      investigation: [
        "Compare the current base/head SHAs with the SHAs at approval time.",
        "Inspect the configured review requirements.",
        "Review dismissed approvals and latest-push review requirements."
      ],
      resolution: [
        "Update the feature branch if strict checks require it.",
        "Request the necessary fresh review from an eligible reviewer.",
        "Wait for the required checks to pass against the updated commit."
      ]
    },
    {
      title: "A repository administrator cannot bypass a block",
      symptoms: [
        "An administrator sees a merge-block message despite elevated repository permissions.",
        "A direct push or merge is rejected.",
        "A policy seems stronger than the classic branch settings suggest."
      ],
      investigation: [
        "Inspect applicable repository and organization rulesets.",
        "Check enforcement mode, bypass actors and no-bypass requirements.",
        "Confirm the user's actual permissions and the policy's scope.",
        "Inspect enterprise-level policy if the organization cannot fully explain the behavior."
      ],
      resolution: [
        "Use the intended approval and merge process.",
        "If an exception is necessary, have the authorized policy owner approve a narrowly scoped exception.",
        "Record and review the exception after the incident."
      ]
    },
    {
      title: "A direct push fails with GH006 or GH013",
      symptoms: [
        "Git push is rejected with a protected-branch or repository-rule violation.",
        "The error may identify a failed check, missing review, signature or another policy."
      ],
      investigation: [
        "Capture the full rejection message.",
        "Identify whether it names a classic protection requirement or a repository ruleset violation.",
        "Compare the attempted commit and branch with the required rules.",
        "Check whether the team expects changes to enter main only through pull requests."
      ],
      resolution: [
        "Push the changes to a feature branch.",
        "Open or update the PR and satisfy the required controls.",
        "Avoid force-pushing or deleting the protection rule as a workaround."
      ]
    },
    {
      title: "Branch protection was accidentally weakened",
      symptoms: [
        "A critical branch becomes mergeable without its usual checks.",
        "A required review, status check or force-push restriction disappears.",
        "An unexpected policy change appears in the incident timeline."
      ],
      investigation: [
        "Compare current configuration with the approved baseline.",
        "Inspect relevant audit-log events and recent administrative changes.",
        "Determine whether any unauthorized commit or release occurred during the exposure window."
      ],
      resolution: [
        "Restore the approved configuration with an authorized change.",
        "Review recent commits and deployments for unauthorized or unsafe changes.",
        "Rotate credentials only if evidence indicates credential exposure or compromise."
      ]
    }
  ],

  prevention: [
    "Define a standard protection baseline for main, release and production branches.",
    "Use required PR reviews, appropriate code-owner approvals and required CI checks for critical repositories.",
    "Use organization rulesets where centralized policy is appropriate and verify their effective scope.",
    "Keep required check names stable and unique across workflows.",
    "Ensure required workflows report a check for every intended PR event and merge-queue event.",
    "Avoid making a mandatory workflow disappear because of broad path filters or job conditions.",
    "Test branch protection and ruleset changes in a non-production repository before broad rollout.",
    "Review CODEOWNERS patterns, team membership and reviewer eligibility periodically.",
    "Enable signed-commit and linear-history requirements where they fit the team's threat model and Git workflow.",
    "Document the expected merge method, merge queue behavior and emergency change procedure.",
    "Restrict policy-editing permissions to authorized repository or platform administrators.",
    "Use least-privilege GitHub Apps and review their check-source permissions.",
    "Alert on unexpected protection/ruleset changes where audit-log integrations support it.",
    "Maintain a known-good configuration snapshot and a tested recovery procedure.",
    "Run periodic negative tests to verify that missing approvals or failed required checks actually block merging.",
    "Review branch patterns to ensure release branches and newly created production branches are covered."
  ],

  monitoring: [
    "Track PR merge-block duration and the number of PRs waiting on required checks.",
    "Alert on a sustained increase in pending or failed mandatory CI checks.",
    "Monitor merge queue age, queue failures and missing merge_group check reports.",
    "Track workflow failure rates after CI configuration or job-name changes.",
    "Audit changes to branch protection, rulesets, bypass actors and repository permissions.",
    "Track CODEOWNERS review delays for critical code paths.",
    "Correlate policy incidents with deployment schedules and release delays.",
    "Do not alert only on failed builds; missing required checks and skipped workflows can be equally disruptive.",
    "Use a documented threshold and escalation owner for blocked production hotfixes.",
    "Keep logs free of tokens, secrets and unnecessary personal information."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Start/end time (UTC):",
    "Repository and organization:",
    "Affected PR and base branch:",
    "Head/base commit SHAs:",
    "Production or release impact:",
    "Exact GitHub error message:",
    "Applicable protection rules/rulesets:",
    "Evidence collected:",
    "Root cause and proof:",
    "Corrective action:",
    "Checks and reviews revalidated:",
    "Deployment validation and rollback decision:",
    "Temporary exceptions and approvals:",
    "Prevention action, owner and due date:",
    "Lessons learned:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Required status check mismatch",
      objective: "Understand how a changed job name can block a PR.",
      steps: [
        "Use a disposable repository and create a protected test branch.",
        "Configure a required check and verify that a PR cannot merge without it.",
        "Change the workflow job name in a test commit.",
        "Inspect the resulting check name and protection configuration.",
        "Correct the required-check mapping using a reviewed change."
      ],
      successCriteria: [
        "The failure is reproduced without touching production.",
        "The exact check-name mismatch is documented.",
        "The corrected workflow reports the expected required check."
      ]
    },
    {
      title: "Lab 2 — CODEOWNERS and review requirements",
      objective: "Verify that code-owner approval is enforced for selected files.",
      steps: [
        "Create a test CODEOWNERS entry for a sample directory.",
        "Configure the test branch to require code-owner review.",
        "Open a PR that changes a file in that directory.",
        "Inspect the review request and merge-block state.",
        "Obtain an eligible code-owner approval and validate the merge gate."
      ],
      successCriteria: [
        "The PR is blocked until the required review is satisfied.",
        "The correct owner is requested.",
        "The test branch permits merging only after all required gates pass."
      ]
    },
    {
      title: "Lab 3 — Ruleset and classic protection investigation",
      objective: "Learn to distinguish different enforcement layers.",
      steps: [
        "Create a disposable repository with a test branch protection rule.",
        "Inspect the classic protection API output.",
        "If available, create a separate test ruleset and inspect its scope.",
        "Compare the effective requirements with the PR's merge-block message.",
        "Document which rule controls each observed restriction."
      ],
      successCriteria: [
        "The investigator identifies the relevant enforcement layer.",
        "Read-only diagnostics are captured.",
        "No production policy is modified."
      ]
    },
    {
      title: "Lab 4 — Merge queue check failure",
      objective: "Understand why ordinary PR checks may not satisfy merge queue checks.",
      steps: [
        "Use a disposable repository with merge queue enabled, if available.",
        "Inspect the workflow's pull_request and merge_group triggers.",
        "Observe the check status for a queued merge-group commit.",
        "Update the test workflow to report the necessary check.",
        "Verify the queue can proceed after the required checks pass."
      ],
      successCriteria: [
        "The missing event trigger is identified.",
        "Checks report for the intended merge-group commit.",
        "Normal PR checks remain enabled."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is GitHub branch protection?",
      answer: "It is a set of branch-level controls that can require pull requests, reviews, status checks, signed commits, linear history, deployment success and other restrictions before changes are accepted."
    },
    {
      question: "A PR's CI is green but merging is blocked. What do you do?",
      answer: "Inspect the exact merge-block message, PR review decision, current head SHA, required check names and sources, branch freshness, deployment gates, merge queue and all applicable rulesets. Green CI alone does not prove every requirement is satisfied."
    },
    {
      question: "What is the difference between branch protection and rulesets?",
      answer: "Classic branch protection is a branch-specific rule mechanism. Rulesets provide another policy layer that can apply to branches and multiple repositories. A repository may have both, so troubleshoot the effective requirements rather than inspecting only one configuration."
    },
    {
      question: "Why can a successful check still be pending for a PR?",
      answer: "The success may belong to an earlier commit, a different check name, an unexpected GitHub App, an ineligible workflow event or the normal PR commit rather than the required merge-group commit."
    },
    {
      question: "How do path filters create branch-protection problems?",
      answer: "A workflow-level path filter can prevent the workflow from running, leaving a required check pending. A mandatory check should report consistently for the PRs to which the policy applies."
    },
    {
      question: "What is the difference between strict and loose required status checks?",
      answer: "Strict checks require the head branch to be up to date with the base branch. Loose checks do not require that condition, although incompatible changes can still create integration failures."
    },
    {
      question: "Why does CODEOWNERS matter?",
      answer: "When code-owner review is required, changes to files covered by ownership rules need an eligible owner approval in addition to any other configured review requirements."
    },
    {
      question: "Why might an administrator still be blocked?",
      answer: "Organization or enterprise rulesets, explicit no-bypass controls, repository permissions or other active requirements may still apply. Elevated permissions do not automatically mean every policy can be bypassed."
    },
    {
      question: "What should you do when a production hotfix is blocked?",
      answer: "Assess the business impact, identify the precise blocker, obtain eligible review and restore the required checks. If an exception is unavoidable, follow the formal emergency-change process and keep it narrow, approved, auditable and reversible."
    },
    {
      question: "How do you safely change a required status check?",
      answer: "Verify the actual check name and source, update the mapping through a reviewed configuration change, test on a disposable or non-production PR, confirm both passing and failing behavior, and preserve equivalent or stronger quality controls."
    },
    {
      question: "What is GH006 versus GH013?",
      answer: "They are commonly encountered rejection codes for protected-branch updates and repository-rule violations. Always read the complete server message because the code alone does not identify the exact failing requirement."
    },
    {
      question: "How do you prove the root cause instead of guessing?",
      answer: "Correlate the exact PR and commit SHAs, required rule configuration, check run metadata, review state, workflow event and relevant audit evidence. Record the evidence that eliminates alternative causes."
    },
    {
      question: "How do you validate recovery?",
      answer: "Confirm the latest commit has the required successful checks, eligible reviews are present, other applicable rules are satisfied, the merge uses the approved method and production health is monitored after deployment."
    },
    {
      question: "What metrics help detect branch-protection incidents?",
      answer: "PR merge-block duration, missing or pending required checks, CI failure rate, merge queue age, review wait time, deployment gate failures and unexpected policy changes."
    }
  ],

  officialReferences: [
    "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
    "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule",
    "https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks",
    "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets",
    "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets",
    "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners",
    "https://cli.github.com/manual/gh_pr_view",
    "https://cli.github.com/manual/gh_pr_checks",
    "https://cli.github.com/manual/gh_api"
  ]
};
