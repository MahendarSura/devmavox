
export interface PipelineDiagnosticStep {
  id: string;
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  branches: {
    condition: string;
    nextAction: string;
  }[];
  safetyNote?: string;
}

export interface PipelineFailureCase {
  id: string;
  cause: string;
  symptoms: string[];
  evidence: string[];
  diagnosis: string[];
  fix: string[];
  validation: string[];
  prevention: string[];
}

export interface PipelineProductionIncident {
  title: string;
  severity: string;
  scenario: string;
  impact: string[];
  response: string[];
  recovery: string[];
  rollbackCriteria: string[];
}

export interface PipelineFailuresGuide {
  title: string;
  category: string;
  slug: string;
  overview: string;
  symptoms: string[];
  severityMatrix: {
    severity: string;
    condition: string;
    response: string;
  }[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: PipelineDiagnosticStep[];
  failureCases: PipelineFailureCase[];
  productionIncidents: PipelineProductionIncident[];
  commandReference: {
    purpose: string;
    command: string;
    interpretation: string;
  }[];
  recoveryRunbook: string[];
  rollbackPlan: string[];
  prevention: string[];
  monitoring: string[];
  cicdValidation: string[];
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
  references: {
    title: string;
    url: string;
  }[];
}

export const pipelineFailuresGuide: PipelineFailuresGuide = {
  title: "Jenkins Pipeline Failures — Real Production Troubleshooting",
  category: "Jenkins",
  slug: "pipeline-failures",

  overview: `
A Jenkins pipeline can fail because of source-control errors, invalid pipeline
syntax, unavailable agents, queue congestion, shell exit codes, dependency
failures, failed tests, missing artifacts, credential problems, network
timeouts, shared-library defects, plugin regressions, or deployment failures.

Production troubleshooting must identify the first meaningful failure rather
than treating every later error as a separate root cause.

The workflow should establish:
- Which job, build, branch, commit, stage, and environment are affected.
- Whether the pipeline failed before making changes or after changing remote state.
- Whether the failure is isolated to one job, one agent, one repository, or the Jenkins controller.
- Which evidence proves the suspected root cause.
- Whether retrying is safe, whether rollback is necessary, and who must approve recovery.
- What validation proves that the pipeline and deployed service are healthy again.

Never assume that a failed Jenkins build means the deployment failed completely.
A remote deployment may have completed even when Jenkins timed out waiting for it.
`,

  symptoms: [
    "A pipeline suddenly starts failing after previously successful builds.",
    "The build remains in the queue and never starts.",
    "The pipeline waits indefinitely for an executor or agent.",
    "Checkout fails with repository, branch, SSH, or HTTP errors.",
    "A Declarative Pipeline fails validation before execution.",
    "A shell step exits with a non-zero code.",
    "Unit tests pass locally but fail in Jenkins.",
    "A stage times out despite apparently healthy infrastructure.",
    "One parallel branch fails while other branches continue.",
    "A shared-library update breaks several repositories.",
    "A build succeeds but artifact publishing fails.",
    "A deployment stage fails after the application was partially updated.",
    "A previously passing build becomes flaky or intermittently fails.",
    "Jenkins reports missing tools, dependencies, or environment variables.",
    "A plugin or controller update causes widespread failures.",
    "A pipeline is marked successful even though an important verification was skipped.",
    "Retries create duplicate releases or repeat a non-idempotent operation."
  ],

  severityMatrix: [
    {
      severity: "SEV-1",
      condition:
        "A pipeline failure is associated with an active production outage, widespread incorrect deployment, suspected compromise, or exposure of sensitive data.",
      response:
        "Activate the incident process, stop unsafe release activity, notify service and security owners as appropriate, preserve evidence, assess actual production state, and follow the approved recovery plan."
    },
    {
      severity: "SEV-2",
      condition:
        "A critical production release is blocked, a deployment is partially complete, or the wrong release may have reached production.",
      response:
        "Pause further changes, identify the affected environment and revision, inspect deployment state, coordinate recovery, and use the required production approval."
    },
    {
      severity: "SEV-3",
      condition:
        "A non-production pipeline or a limited number of builds fail without major service impact.",
      response:
        "Collect logs and environment evidence, isolate the first failure, apply a targeted fix, and validate in a safe environment."
    },
    {
      severity: "SEV-4",
      condition:
        "An intermittent failure affects a small number of builds and a documented safe workaround exists.",
      response:
        "Record failure frequency, investigate flaky dependencies or agents, and add monitoring or a corrective action."
    }
  ],

  safetyChecks: [
    "Confirm the Jenkins controller, job, folder, build number, branch, commit SHA, and target environment.",
    "Verify whether the affected job is a pull-request build, a scheduled build, or a release pipeline.",
    "Check whether a deployment or infrastructure operation already changed remote state.",
    "Confirm the target cluster, account, region, namespace, server, or deployment environment before recovery.",
    "Do not rerun a production deployment blindly after a timeout.",
    "Do not delete workspaces, artifacts, logs, or controller data before collecting necessary evidence.",
    "Do not disable tests, security checks, certificate validation, or quality gates merely to obtain a green build.",
    "Never print credentials, authorization headers, tokens, or private keys while debugging.",
    "Use read-only diagnostic commands before making production changes.",
    "Use approved access and change-management procedures for production recovery.",
    "Check whether other builds share the same agent, workspace, dependency cache, or deployment target.",
    "Do not terminate an agent or controller process until active work and potential side effects are understood.",
    "Avoid changing several pipeline variables or plugins simultaneously; isolate one cause at a time.",
    "Record the original failure before applying a workaround.",
    "Define a stop condition and rollback decision before rerunning a risky stage."
  ],

  evidenceCollection: [
    "Jenkins job URL, folder, build number, queue time, start time, end time, and result.",
    "Branch, commit SHA, pull-request number, repository URL, and triggering event.",
    "The first meaningful error, preceding warnings, and complete relevant stage log.",
    "Pipeline stage name, parallel branch name, and retry attempt number.",
    "Jenkins core version and relevant plugin versions when a regression is suspected.",
    "Agent name, operating system, executor availability, workspace path, and tool versions.",
    "Jenkinsfile and shared-library revisions.",
    "Build parameters and environment names, excluding secret values.",
    "Checkout revision and dependency lockfile or manifest state.",
    "Test reports, failure counts, and representative sanitized test output.",
    "Artifact coordinates, version, checksum, and repository publication status.",
    "Deployment operation ID, target revision, health checks, and service events.",
    "Network, DNS, TLS, dependency repository, and external service health evidence.",
    "Recent changes to plugins, credentials, agent images, pipelines, libraries, and infrastructure.",
    "Whether the failure reproduces on another agent or with the same commit in a safe environment."
  ],

  diagnosticWorkflow: [
    {
      id: "step-1",
      title: "Establish incident scope and identify the first failure",
      purpose:
        "Determine whether the incident is local to one stage or shared across the Jenkins platform.",
      commands: [
        "Open Jenkins > Job > Build Number > Console Output.",
        "Open the Pipeline Stage View or Blue Ocean view if available.",
        "Record the first meaningful error and the stage where it occurs.",
        "Compare the failing build with the last successful build.",
        "Review recent repository, Jenkinsfile, agent, plugin, and infrastructure changes."
      ],
      expectedEvidence: [
        "The first failing stage and exact error.",
        "The failing commit and last known successful commit.",
        "Whether other jobs or agents are affected.",
        "Whether the build failed before or after deployment began."
      ],
      branches: [
        {
          condition: "Several unrelated jobs fail at the same time.",
          nextAction: "Investigate shared infrastructure such as the controller, agents, plugin changes, network, or external services."
        },
        {
          condition: "Only one repository or commit fails.",
          nextAction: "Investigate its Jenkinsfile, code changes, dependency changes, and repository-specific configuration."
        },
        {
          condition: "The failure occurred during or after deployment.",
          nextAction: "Determine actual remote state before retrying or rolling back."
        },
        {
          condition: "The logs show a secret or suspected unauthorized access.",
          nextAction: "Start the relevant security incident response and restrict unsafe activity."
        }
      ],
      safetyNote:
        "The last line in a console log is not necessarily the root cause. Identify the earliest meaningful failure and its causal context."
    },
    {
      id: "step-2",
      title: "Check queue, executor, and agent availability",
      purpose:
        "Distinguish a pipeline that cannot start from one that starts and fails during execution.",
      commands: [
        "Inspect Jenkins > Build Queue.",
        "Inspect Manage Jenkins > Nodes and Clouds.",
        "Check whether the required label has any online agents.",
        "Inspect agent logs and executor usage.",
        "Compare queue duration with normal job start times."
      ],
      expectedEvidence: [
        "Queue reason and requested label.",
        "Online or offline agent state.",
        "Executor saturation and competing workloads.",
        "Agent connection or provisioning errors."
      ],
      branches: [
        {
          condition: "No agent satisfies the requested label.",
          nextAction: "Correct the label or restore an approved compatible agent."
        },
        {
          condition: "All executors are occupied.",
          nextAction: "Identify long-running jobs, resource contention, and concurrency limits before changing capacity."
        },
        {
          condition: "Agents are repeatedly disconnecting.",
          nextAction: "Investigate agent connectivity, resource pressure, service logs, and provisioning health."
        },
        {
          condition: "The job starts normally.",
          nextAction: "Continue to step-3 and validate source checkout."
        }
      ],
      safetyNote:
        "Do not delete queued builds or terminate active executors without checking business priority and potential side effects."
    },
    {
      id: "step-3",
      title: "Validate Jenkinsfile and shared-library behavior",
      purpose:
        "Identify syntax errors, invalid Declarative Pipeline structure, and shared-library regressions.",
      commands: [
        "Review the Jenkinsfile at the exact failing commit.",
        "Compare the Jenkinsfile with the last successful revision.",
        "Inspect shared-library version or branch selection.",
        "Use the installed Declarative Pipeline linter or an approved validation job.",
        "Review controller logs for pipeline parsing or plugin errors."
      ],
      expectedEvidence: [
        "The pipeline definition used by the failing build.",
        "Any recent changes to stage, agent, options, environment, post, or when blocks.",
        "The shared-library revision actually loaded.",
        "Syntax validation results."
      ],
      branches: [
        {
          condition: "Pipeline parsing or validation fails.",
          nextAction: "Correct the pipeline structure and validate it before execution."
        },
        {
          condition: "A shared-library change caused multiple job failures.",
          nextAction: "Pin or restore the last known-good approved library revision and test representative consumers."
        },
        {
          condition: "The pipeline definition is valid.",
          nextAction: "Continue to step-4 and investigate checkout and source-control access."
        }
      ],
      safetyNote:
        "A linter validates syntax and structure; it does not prove that the pipeline is operationally safe or that every stage will succeed."
    },
    {
      id: "step-4",
      title: "Investigate source checkout and repository access",
      purpose:
        "Determine whether the correct source revision can be fetched from the expected repository.",
      commands: [
        "git status --short",
        "git rev-parse HEAD",
        "git remote -v",
        "git ls-remote <repository-url> <branch-or-ref>"
      ],
      expectedEvidence: [
        "Expected repository and branch.",
        "Resolved commit SHA.",
        "Repository connectivity and ref availability.",
        "Sanitized authentication and checkout errors."
      ],
      branches: [
        {
          condition: "The branch or ref does not exist.",
          nextAction: "Correct the ref or trigger configuration and verify the intended commit."
        },
        {
          condition: "Repository authentication fails.",
          nextAction: "Investigate the approved SCM credential binding and repository permissions."
        },
        {
          condition: "DNS, TLS, or network access fails.",
          nextAction: "Investigate the agent's network and trust configuration."
        },
        {
          condition: "Checkout succeeds.",
          nextAction: "Continue to step-5 and verify toolchain and dependency resolution."
        }
      ],
      safetyNote:
        "Run Git diagnostics only in the relevant workspace or approved diagnostic context. Do not embed access tokens in repository URLs or print credentials."
    },
    {
      id: "step-5",
      title: "Verify agent workspace and toolchain",
      purpose:
        "Detect environment differences, missing executables, disk pressure, and workspace contamination.",
      commands: [
        "id",
        "pwd",
        "df -h",
        "free -h",
        "git status --short",
        "command -v java",
        "command -v mvn",
        "command -v docker",
        "command -v kubectl"
      ],
      expectedEvidence: [
        "Agent account and working directory.",
        "Disk and memory pressure.",
        "Required executables and versions.",
        "Unexpected workspace changes or stale generated files."
      ],
      branches: [
        {
          condition: "A required tool is missing or the wrong version is installed.",
          nextAction: "Restore the approved toolchain through the agent image or build environment configuration."
        },
        {
          condition: "Disk space or memory is exhausted.",
          nextAction: "Identify the responsible workload or retained files, then clean or scale using the approved procedure."
        },
        {
          condition: "The workspace contains stale or unexpected state.",
          nextAction: "Preserve needed evidence and use a controlled clean-workspace test to determine whether state contamination is causal."
        },
        {
          condition: "The environment is healthy.",
          nextAction: "Continue to step-6 and investigate dependencies and build commands."
        }
      ],
      safetyNote:
        "Workspace cleanup can delete diagnostic evidence or files used by active builds. Confirm ownership and activity before cleaning."
    },
    {
      id: "step-6",
      title: "Diagnose dependency and build failures",
      purpose:
        "Distinguish code defects from dependency repository outages, version drift, and build-tool configuration.",
      commands: [
        "java -version",
        "mvn -version",
        "mvn -B -ntp validate",
        "mvn -B -ntp test",
        "npm ci",
        "npm run build"
      ],
      expectedEvidence: [
        "Tool versions and selected runtime.",
        "Dependency resolution errors and repository URLs.",
        "Compiler, test, or packaging failures.",
        "Lockfile and dependency manifest changes."
      ],
      branches: [
        {
          condition: "Dependency resolution fails across several jobs.",
          nextAction: "Check the dependency repository, proxy, DNS, credentials, and service health."
        },
        {
          condition: "The same commit fails deterministically in a clean environment.",
          nextAction: "Investigate code, tests, compiler configuration, and dependency compatibility."
        },
        {
          condition: "The failure occurs only on one agent.",
          nextAction: "Compare toolchain, cache, environment, and workspace state with a healthy agent."
        },
        {
          condition: "Build and tests pass.",
          nextAction: "Continue to step-7 and inspect artifacts and quality gates."
        }
      ],
      safetyNote:
        "Use the build system appropriate to the project. Do not execute every example command blindly; each may trigger dependency downloads or project tasks."
    },
    {
      id: "step-7",
      title: "Analyze test failures, flaky tests, and quality gates",
      purpose:
        "Determine whether a failed stage reflects a product defect, unstable test, test-environment issue, or quality policy.",
      commands: [
        "Inspect the test report and failed test names.",
        "Compare failed tests with the last successful build.",
        "Check test service health, fixtures, test data, and timeouts.",
        "Review coverage, lint, static analysis, and security scan results.",
        "Compare repeated test outcomes without suppressing failed assertions."
      ],
      expectedEvidence: [
        "Failing assertions and stack traces.",
        "Reproducibility on the same commit.",
        "Test service or fixture availability.",
        "Quality-gate thresholds and policy changes."
      ],
      branches: [
        {
          condition: "A deterministic test failure reproduces locally and in CI.",
          nextAction: "Investigate the code defect or incorrect test expectation."
        },
        {
          condition: "A test fails intermittently.",
          nextAction: "Investigate race conditions, shared test data, timing, resource contention, and external dependencies."
        },
        {
          condition: "A quality gate fails despite passing tests.",
          nextAction: "Inspect the specific policy, report, threshold, and scanner availability."
        },
        {
          condition: "All required gates pass.",
          nextAction: "Continue to step-8 and verify artifact creation and publication."
        }
      ],
      safetyNote:
        "Do not disable security scans or mark failed tests as successful merely to unblock a release."
    },
    {
      id: "step-8",
      title: "Verify artifact creation and publication",
      purpose:
        "Determine whether the expected artifact exists, has the correct version, and was published successfully.",
      commands: [
        "find . -maxdepth 4 -type f \\( -name '*.jar' -o -name '*.war' -o -name '*.zip' \\) -print",
        "git rev-parse HEAD",
        "sha256sum <artifact-path>"
      ],
      expectedEvidence: [
        "Artifact path, version, size, and checksum.",
        "Repository publication response and coordinates.",
        "Build commit associated with the artifact.",
        "Whether publication completed before the error."
      ],
      branches: [
        {
          condition: "The artifact is missing.",
          nextAction: "Inspect packaging, output directory, exclusions, and build configuration."
        },
        {
          condition: "The artifact exists but publication fails.",
          nextAction: "Investigate repository availability, authentication, permissions, version conflicts, and upload timeouts."
        },
        {
          condition: "The artifact was published but Jenkins reports failure.",
          nextAction: "Verify remote artifact metadata and reconcile the pipeline result before retrying."
        },
        {
          condition: "The correct artifact is available.",
          nextAction: "Continue to step-9 and validate deployment target and remote state."
        }
      ],
      safetyNote:
        "Avoid overwriting immutable release versions. Verify checksums and remote metadata before republishing."
    },
    {
      id: "step-9",
      title: "Investigate deployment and infrastructure failures",
      purpose:
        "Identify whether the failure occurred before the deployment request, during execution, or during post-deployment validation.",
      commands: [
        "kubectl config current-context",
        "kubectl get deploy,pods,svc -n <namespace>",
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=60s",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      expectedEvidence: [
        "Expected Kubernetes context and namespace.",
        "Current workload state and image version.",
        "Rollout events, readiness failures, and pod status.",
        "Whether the intended release reached the target."
      ],
      branches: [
        {
          condition: "The context or namespace is wrong.",
          nextAction: "Stop the operation and correct the target through the approved deployment configuration."
        },
        {
          condition: "The rollout is unhealthy.",
          nextAction: "Inspect workload events, container logs, probes, image availability, and application health."
        },
        {
          condition: "The rollout succeeded but Jenkins timed out.",
          nextAction: "Verify actual deployment revision and service health before considering a retry."
        },
        {
          condition: "The deployment is partially applied or unhealthy.",
          nextAction: "Use the approved rollout recovery or rollback plan."
        }
      ],
      safetyNote:
        "These commands are Kubernetes-specific and primarily read-only. Verify context and namespace before running any mutating command."
    },
    {
      id: "step-10",
      title: "Investigate timeouts, retries, and parallel branches",
      purpose:
        "Distinguish genuine slow operations from deadlocks, lost agents, overloaded dependencies, and unsafe retry behavior.",
      commands: [
        "Review stage duration against historical build timings.",
        "Inspect timeout configuration and retry count.",
        "Compare parallel branch logs and timestamps.",
        "Check agent CPU, memory, disk, and network metrics.",
        "Inspect the external service's operation ID or audit record where available."
      ],
      expectedEvidence: [
        "Actual duration and normal baseline.",
        "Whether a remote operation continued after Jenkins timed out.",
        "Which parallel branch failed first.",
        "Whether retries duplicated side effects."
      ],
      branches: [
        {
          condition: "The stage consistently exceeds its configured timeout.",
          nextAction: "Find the slow dependency or operation; change the timeout only when supported by evidence and an acceptable service objective."
        },
        {
          condition: "An operation timed out but may have completed remotely.",
          nextAction: "Reconcile remote state before retrying."
        },
        {
          condition: "Only one parallel branch fails.",
          nextAction: "Investigate branch-specific input, agent, dependency, and resource contention."
        },
        {
          condition: "The failure is intermittent across many branches.",
          nextAction: "Investigate shared infrastructure and external dependencies."
        }
      ],
      safetyNote:
        "Retries are not automatically safe for deployments, database migrations, payment operations, release publication, or other non-idempotent actions."
    },
    {
      id: "step-11",
      title: "Validate recovery and close the incident",
      purpose:
        "Prove that the root cause is corrected and the intended system state is healthy.",
      commands: [
        "Record the corrected commit, configuration, or infrastructure change.",
        "Run the smallest representative validation job.",
        "Verify artifact version and checksum where relevant.",
        "Verify deployment revision and application health where relevant.",
        "Review console output for accidental secret exposure.",
        "Compare error rate, build duration, and success rate against baseline."
      ],
      expectedEvidence: [
        "The original failure no longer reproduces.",
        "Required quality gates pass.",
        "The intended artifact or revision is deployed.",
        "No unintended remote changes or duplicate releases occurred.",
        "Monitoring shows service recovery."
      ],
      branches: [
        {
          condition: "All required checks pass and the final state is correct.",
          nextAction: "Resume normal release operations, document root cause, and create prevention actions."
        },
        {
          condition: "The pipeline passes but service health remains degraded.",
          nextAction: "Keep the incident open and investigate application or infrastructure health independently."
        },
        {
          condition: "The root cause remains uncertain.",
          nextAction: "Do not declare permanent resolution; preserve evidence and continue investigation or escalate."
        }
      ]
    }
  ],

  failureCases: [
    {
      id: "pipeline-syntax",
      cause: "Invalid Jenkinsfile syntax or unsupported Declarative Pipeline structure.",
      symptoms: [
        "Pipeline fails before stages execute.",
        "The parser reports an invalid section, directive, or expression."
      ],
      evidence: [
        "Error line and Jenkinsfile revision.",
        "Recent syntax changes.",
        "Declarative Pipeline linter output."
      ],
      diagnosis: [
        "Validate the Jenkinsfile at the failing commit.",
        "Compare with the last successful revision.",
        "Check plugin support for the pipeline feature."
      ],
      fix: [
        "Correct the syntax or unsupported structure.",
        "Validate in a safe job before merging."
      ],
      validation: [
        "The pipeline parses and starts.",
        "Required stages and post conditions execute as intended."
      ],
      prevention: [
        "Use pull-request pipeline validation.",
        "Review Jenkinsfile changes.",
        "Keep pipeline examples aligned with installed plugin versions."
      ]
    },
    {
      id: "agent-offline",
      cause: "The required agent is offline, disconnected, mislabelled, or unable to provision.",
      symptoms: [
        "Build remains queued.",
        "Required agent label has no available executors.",
        "Agent disconnects during a stage."
      ],
      evidence: [
        "Queue reason and label.",
        "Agent connection logs.",
        "Provisioning and resource metrics."
      ],
      diagnosis: [
        "Confirm the label and eligible agents.",
        "Inspect agent process, network, and resource pressure.",
        "Determine whether multiple jobs share the same failed agent."
      ],
      fix: [
        "Restore agent connectivity or approved capacity.",
        "Correct an invalid label or agent configuration.",
        "Move work only to a compatible approved agent."
      ],
      validation: [
        "A test job starts on the expected agent.",
        "The required toolchain and workspace are available."
      ],
      prevention: [
        "Monitor agent availability and queue time.",
        "Use standardized agent images.",
        "Alert on repeated disconnects and provisioning failures."
      ]
    },
    {
      id: "scm-checkout",
      cause: "The repository, branch, credentials, network, or Git configuration prevents checkout.",
      symptoms: [
        "Checkout fails before compilation.",
        "The branch or ref cannot be resolved.",
        "Repository authentication fails."
      ],
      evidence: [
        "Repository URL and expected ref.",
        "Resolved commit SHA.",
        "Sanitized SCM error and access logs."
      ],
      diagnosis: [
        "Verify repository and branch.",
        "Check approved credentials and repository permissions.",
        "Investigate DNS, TLS, and proxy behavior."
      ],
      fix: [
        "Correct the repository or ref.",
        "Restore approved SCM access.",
        "Fix network or trust configuration through the owning team."
      ],
      validation: [
        "The intended commit is checked out.",
        "No credentials are embedded in URLs or logs."
      ],
      prevention: [
        "Validate branch and repository configuration.",
        "Monitor SCM connectivity.",
        "Review credential rotation impact."
      ]
    },
    {
      id: "shell-exit-code",
      cause: "A shell command returns a non-zero exit code or a script handles errors incorrectly.",
      symptoms: [
        "A shell step fails despite earlier commands succeeding.",
        "A command's output looks normal but the stage is marked failed."
      ],
      evidence: [
        "Exact command and exit status.",
        "Shell type and error-handling settings.",
        "Earlier command output and final command result."
      ],
      diagnosis: [
        "Identify the first non-zero exit status.",
        "Check whether the command is expected to return non-zero in normal conditions.",
        "Review pipeline and shell error-handling semantics."
      ],
      fix: [
        "Correct the failing command or input.",
        "Handle expected non-zero statuses explicitly and narrowly.",
        "Do not hide arbitrary failures with blanket success handling."
      ],
      validation: [
        "Real failures still fail the stage.",
        "Expected conditions are handled intentionally."
      ],
      prevention: [
        "Use clear shell scripts and explicit error handling.",
        "Add tests for expected command outcomes.",
        "Review shell behavior across supported operating systems."
      ]
    },
    {
      id: "dependency-resolution",
      cause: "A dependency repository is unavailable or the build uses incompatible or missing dependencies.",
      symptoms: [
        "Build fails while downloading dependencies.",
        "A dependency version cannot be resolved.",
        "Multiple projects fail against the same repository."
      ],
      evidence: [
        "Dependency coordinates and error messages.",
        "Lockfile or manifest changes.",
        "Repository health and network status."
      ],
      diagnosis: [
        "Determine whether the issue is isolated or shared.",
        "Check repository availability and credentials.",
        "Verify dependency version and compatibility."
      ],
      fix: [
        "Restore repository access or correct the dependency declaration.",
        "Use the approved dependency cache or mirror.",
        "Avoid unreviewed version changes in a release pipeline."
      ],
      validation: [
        "A clean or controlled build resolves dependencies.",
        "The build uses the intended dependency versions."
      ],
      prevention: [
        "Use lockfiles or pinned versions where appropriate.",
        "Monitor dependency repositories.",
        "Test dependency updates before release."
      ]
    },
    {
      id: "test-failure",
      cause: "A real code regression, unstable test, test fixture issue, or unavailable test dependency causes failure.",
      symptoms: [
        "Unit, integration, or end-to-end tests fail.",
        "The failure is intermittent or differs from local results."
      ],
      evidence: [
        "Failed assertion and stack trace.",
        "Test report and recent code changes.",
        "Test environment and dependency health."
      ],
      diagnosis: [
        "Reproduce on the same commit.",
        "Compare test environment and tool versions.",
        "Investigate concurrency, shared data, and external service dependencies."
      ],
      fix: [
        "Fix the code or test defect.",
        "Stabilize fixtures and dependencies.",
        "Quarantine a flaky test only through a documented, time-limited exception with an owner."
      ],
      validation: [
        "Required tests pass consistently.",
        "No important assertion or security check has been removed."
      ],
      prevention: [
        "Track flaky-test rates.",
        "Isolate test data.",
        "Keep test environments reproducible."
      ]
    },
    {
      id: "agent-resource-exhaustion",
      cause: "Disk, memory, CPU, file descriptors, or workspace resources are exhausted.",
      symptoms: [
        "Builds fail intermittently under load.",
        "Processes are killed or report out-of-memory errors.",
        "Disk writes or artifact extraction fail."
      ],
      evidence: [
        "Resource metrics at failure time.",
        "Agent system logs.",
        "Workspace and cache usage."
      ],
      diagnosis: [
        "Identify the resource that was exhausted.",
        "Find the process or workload consuming it.",
        "Compare affected and healthy agents."
      ],
      fix: [
        "Remove confirmed stale data using the approved cleanup procedure.",
        "Optimize the build or provision suitable capacity.",
        "Avoid deleting active workspaces or shared caches without assessment."
      ],
      validation: [
        "The workload completes within resource limits.",
        "Resource utilization returns to an acceptable baseline."
      ],
      prevention: [
        "Monitor disk, memory, CPU, and workspace usage.",
        "Set retention policies.",
        "Right-size agent resources."
      ]
    },
    {
      id: "shared-library-regression",
      cause: "A shared Jenkins library change breaks common pipeline behavior.",
      symptoms: [
        "Multiple repositories fail after a shared-library update.",
        "A previously valid step or parameter changes behavior."
      ],
      evidence: [
        "Library revision used by each job.",
        "Failure onset and changed functions.",
        "Affected consumer list."
      ],
      diagnosis: [
        "Compare working and failing library revisions.",
        "Identify the first common failing function.",
        "Reproduce with a representative consumer."
      ],
      fix: [
        "Restore the last known-good approved revision if confirmed.",
        "Correct the library and add a regression test.",
        "Roll out the repaired revision in a controlled manner."
      ],
      validation: [
        "Representative consumers pass.",
        "Other library users do not regress."
      ],
      prevention: [
        "Use versioned shared libraries.",
        "Test library changes against representative jobs.",
        "Use staged rollout and release notes."
      ]
    },
    {
      id: "plugin-regression",
      cause: "A Jenkins core or plugin update introduces incompatibility or changed behavior.",
      symptoms: [
        "Many jobs fail after an upgrade.",
        "Pipeline parsing, credentials, checkout, or agent behavior changes."
      ],
      evidence: [
        "Jenkins and plugin versions.",
        "Controller logs.",
        "Update and failure timestamps."
      ],
      diagnosis: [
        "Compare versions before and after the change.",
        "Check compatibility and release notes.",
        "Determine whether the failures share a plugin dependency."
      ],
      fix: [
        "Use the approved plugin recovery process.",
        "Restore a supported compatible version if the regression is confirmed.",
        "Validate representative pipelines before broad rollout."
      ],
      validation: [
        "Affected pipeline features work in a test job.",
        "Unrelated jobs remain healthy."
      ],
      prevention: [
        "Test plugin upgrades in staging.",
        "Maintain controller backups and change records.",
        "Monitor failures after platform upgrades."
      ]
    },
    {
      id: "artifact-publication",
      cause: "The artifact is missing, incorrectly versioned, or cannot be uploaded to the repository.",
      symptoms: [
        "Build succeeds but publish fails.",
        "Expected artifact cannot be found.",
        "A release version conflicts with an existing immutable artifact."
      ],
      evidence: [
        "Artifact path, version, and checksum.",
        "Repository response and coordinates.",
        "Build commit and publication state."
      ],
      diagnosis: [
        "Verify packaging output.",
        "Check repository access and permissions.",
        "Determine whether publication completed despite a client timeout."
      ],
      fix: [
        "Correct the artifact path or publication configuration.",
        "Restore required permissions.",
        "Use a new version for a new immutable release rather than overwriting an existing version."
      ],
      validation: [
        "The expected artifact exists remotely.",
        "Version and checksum match the build output."
      ],
      prevention: [
        "Verify artifact existence before publication.",
        "Use immutable versioning.",
        "Record checksums and build provenance."
      ]
    },
    {
      id: "deployment-timeout",
      cause: "Jenkins stops waiting before the remote deployment completes or reports its final state.",
      symptoms: [
        "A deployment stage times out.",
        "Jenkins reports failure while the target may be healthy.",
        "A retry risks duplicating a deployment or migration."
      ],
      evidence: [
        "Remote operation ID.",
        "Deployment events and revision.",
        "Application health and target service logs."
      ],
      diagnosis: [
        "Check whether the request was accepted.",
        "Inspect the actual deployed revision.",
        "Determine whether the operation is still running or partially applied."
      ],
      fix: [
        "Reconcile actual state first.",
        "Resume monitoring or complete the operation through the approved method.",
        "Roll back only when health or release criteria require it."
      ],
      validation: [
        "The target revision is correct.",
        "Service health and smoke tests pass.",
        "No duplicate operation was triggered."
      ],
      prevention: [
        "Use operation IDs and explicit health checks.",
        "Choose evidence-based timeouts.",
        "Design deployment operations for safe retry where possible."
      ]
    },
    {
      id: "parallel-stage-failure",
      cause: "One parallel branch fails because of branch-specific inputs, resource contention, shared-state conflicts, or an unavailable dependency.",
      symptoms: [
        "Some branches pass while one branch fails.",
        "The overall pipeline fails after parallel execution.",
        "Failures appear only under concurrency."
      ],
      evidence: [
        "Branch-specific logs and timestamps.",
        "Shared workspace or resource usage.",
        "Dependency and environment differences."
      ],
      diagnosis: [
        "Identify the first failing branch.",
        "Compare its inputs and environment with successful branches.",
        "Check shared mutable state and concurrency limits."
      ],
      fix: [
        "Correct branch-specific configuration or test isolation.",
        "Use separate workspaces where appropriate.",
        "Control concurrency for shared resources."
      ],
      validation: [
        "The failing branch passes repeatedly.",
        "Parallel execution does not introduce conflicting changes."
      ],
      prevention: [
        "Keep parallel stages isolated.",
        "Monitor branch duration and failures.",
        "Test concurrency-sensitive operations."
      ]
    },
    {
      id: "false-green-pipeline",
      cause: "Errors are suppressed, required stages are skipped, or the pipeline reports success before essential validation completes.",
      symptoms: [
        "The build is green but the artifact or deployment is invalid.",
        "A shell command fails while the stage continues.",
        "Post-deployment checks are missing or not enforced."
      ],
      evidence: [
        "Pipeline control flow.",
        "Stage results and skipped-stage reasons.",
        "Artifact and deployment verification records."
      ],
      diagnosis: [
        "Review error handling and conditional stages.",
        "Check whether required test and security gates are enforced.",
        "Verify that the final result depends on deployment health."
      ],
      fix: [
        "Propagate genuine failures.",
        "Make required checks explicit.",
        "Fail the release when mandatory verification fails."
      ],
      validation: [
        "A deliberate test failure causes the expected pipeline result.",
        "A deployment cannot be marked successful without required health checks."
      ],
      prevention: [
        "Add pipeline control-flow tests.",
        "Review failure-suppression logic.",
        "Audit required release gates."
      ]
    }
  ],

  productionIncidents: [
    {
      title: "Critical pipeline suddenly remains queued",
      severity: "SEV-2 if a critical release is blocked",
      scenario:
        "A release pipeline that normally starts immediately remains in the queue because no compatible agent is available.",
      impact: [
        "Release deadlines are missed.",
        "Downstream stages and dependent teams are blocked.",
        "Repeated manual triggering may create duplicate queued work."
      ],
      response: [
        "Confirm the job, label, queue reason, and affected environment.",
        "Check agent availability, executor saturation, and provisioning health.",
        "Determine whether the problem affects one label or the whole platform.",
        "Inspect recent agent image, capacity, and controller changes."
      ],
      recovery: [
        "Restore a compatible agent or correct the verified label issue.",
        "Prioritize the release using approved scheduling controls.",
        "Run a small validation build.",
        "Resume the release and monitor queue time."
      ],
      rollbackCriteria: [
        "No application rollback is needed if deployment never started.",
        "If a separate deployment process changed remote state, reconcile it independently."
      ]
    },
    {
      title: "Production pipeline fails after deployment starts",
      severity: "SEV-1 or SEV-2 depending on service impact",
      scenario:
        "Jenkins reports a timeout or lost agent after submitting a deployment request. The remote system may still be applying changes.",
      impact: [
        "The deployment status is uncertain.",
        "A duplicate retry could create conflicting changes.",
        "The service may be running the old, new, or a partially applied version."
      ],
      response: [
        "Pause additional deployment attempts.",
        "Identify the target environment, release version, and operation ID.",
        "Inspect target-side deployment events and health checks.",
        "Determine whether the deployment completed, is running, or failed partway through.",
        "Notify the release owner if production health or release integrity is at risk."
      ],
      recovery: [
        "Reconcile Jenkins state with the actual remote deployment state.",
        "Complete monitoring if the deployment is still running.",
        "Use the approved recovery or rollback procedure if the service is unhealthy.",
        "Validate the intended version, traffic health, and application smoke tests."
      ],
      rollbackCriteria: [
        "Roll back when the deployed revision is unhealthy or fails release criteria.",
        "Do not roll back solely because the Jenkins client lost contact if the release is healthy.",
        "Require approval where production change policy requires it."
      ]
    },
    {
      title: "Several pipelines fail after a plugin or shared-library change",
      severity: "SEV-2 when critical delivery is broadly blocked",
      scenario:
        "Multiple repositories begin failing after a Jenkins controller, plugin, or shared-library update.",
      impact: [
        "Delivery is blocked across multiple teams.",
        "Individual application changes may be incorrectly blamed.",
        "Uncoordinated local workarounds can create configuration drift."
      ],
      response: [
        "Compare failure timestamps across affected jobs.",
        "Identify the common plugin, library, agent image, or controller change.",
        "Inspect release notes, compatibility information, and startup logs.",
        "Preserve the failing revision and known-good configuration."
      ],
      recovery: [
        "Restore the last known-good compatible version through the approved change process if evidence confirms the regression.",
        "Validate representative pipelines.",
        "Roll out the correction in stages.",
        "Notify affected owners and document the common root cause."
      ],
      rollbackCriteria: [
        "Rollback the platform or shared-library change only when the evidence supports it and the rollback is approved.",
        "Do not revert unrelated application changes without evidence."
      ]
    },
    {
      title: "Build is green but production health checks fail",
      severity: "SEV-1 or SEV-2 depending on service impact",
      scenario:
        "Compilation and tests pass, but the deployed service fails readiness checks, smoke tests, or critical user journeys.",
      impact: [
        "The release may be unusable despite a successful Jenkins result.",
        "Traffic may reach unhealthy instances.",
        "A false-green pipeline may hide a release-quality gap."
      ],
      response: [
        "Verify the actual deployed revision and traffic state.",
        "Inspect service health, application logs, rollout events, and dependency health.",
        "Determine whether the failure is caused by the release, configuration, infrastructure, or an external dependency.",
        "Stop promotion or additional rollout while the incident is assessed."
      ],
      recovery: [
        "Apply the approved rollback or forward-fix decision.",
        "Validate health checks and representative user journeys.",
        "Update pipeline gates so the deployment result reflects required service validation."
      ],
      rollbackCriteria: [
        "Roll back when service health is degraded and rollback is the safest approved recovery.",
        "Use a forward fix when rollback is unsafe or would worsen the incident, subject to approval."
      ]
    },
    {
      title: "Release publication times out and retry may duplicate the release",
      severity: "SEV-2 for a critical release",
      scenario:
        "Jenkins loses the connection during artifact upload or release publication and cannot determine whether the repository accepted the artifact.",
      impact: [
        "The artifact may already exist remotely.",
        "A retry may conflict with immutable version policy.",
        "The release pipeline may report failure despite successful publication."
      ],
      response: [
        "Record artifact coordinates, version, checksum, and request ID.",
        "Inspect repository metadata and publication logs.",
        "Confirm whether the artifact exists and whether its checksum matches.",
        "Check whether the version is immutable."
      ],
      recovery: [
        "If the correct artifact is already published, reconcile pipeline state and continue through approved validation.",
        "If no artifact exists, correct the failure and retry safely.",
        "If a conflicting artifact exists, follow release governance rather than overwriting it."
      ],
      rollbackCriteria: [
        "Do not delete or overwrite a published release without authorization.",
        "If the wrong artifact was promoted, follow the artifact repository and deployment recovery procedures."
      ]
    }
  ],

  commandReference: [
    {
      purpose: "Check the current Git revision",
      command: "git rev-parse HEAD",
      interpretation:
        "Records the commit checked out in the current workspace."
    },
    {
      purpose: "Inspect repository working-tree changes",
      command: "git status --short",
      interpretation:
        "Shows modified and untracked files that may indicate workspace contamination."
    },
    {
      purpose: "Inspect configured remotes",
      command: "git remote -v",
      interpretation:
        "Helps confirm repository configuration. Review output before sharing because URLs may contain sensitive information if configured incorrectly."
    },
    {
      purpose: "Check a branch or ref on a repository",
      command: "git ls-remote <repository-url> <branch-or-ref>",
      interpretation:
        "Checks whether a remote ref is visible. It may require network access and repository permissions."
    },
    {
      purpose: "Check the current execution account",
      command: "id",
      interpretation:
        "Shows the current account and groups on Unix-like agents."
    },
    {
      purpose: "Check the workspace",
      command: "pwd",
      interpretation:
        "Confirms the current working directory."
    },
    {
      purpose: "Check disk capacity",
      command: "df -h",
      interpretation:
        "Helps identify filesystem exhaustion on Unix-like agents."
    },
    {
      purpose: "Check memory availability",
      command: "free -h",
      interpretation:
        "Shows memory usage on Linux agents. Interpret alongside container or cgroup limits."
    },
    {
      purpose: "Check Java version",
      command: "java -version",
      interpretation:
        "Confirms the Java runtime available on the agent."
    },
    {
      purpose: "Check Maven version",
      command: "mvn -version",
      interpretation:
        "Shows Maven and Java details used by the command."
    },
    {
      purpose: "Validate a Maven project",
      command: "mvn -B -ntp validate",
      interpretation:
        "Runs Maven validation. Dependency resolution may still occur."
    },
    {
      purpose: "Run Maven tests",
      command: "mvn -B -ntp test",
      interpretation:
        "Runs Maven test lifecycle stages. Use the project's approved test command."
    },
    {
      purpose: "Check a tool executable",
      command: "command -v <tool-name>",
      interpretation:
        "Shows whether an executable can be found through PATH on a Unix-like agent."
    },
    {
      purpose: "Find packaged artifacts",
      command:
        "find . -maxdepth 4 -type f \\( -name '*.jar' -o -name '*.war' -o -name '*.zip' \\) -print",
      interpretation:
        "Lists likely artifact files in the workspace. Adjust patterns and depth for the project."
    },
    {
      purpose: "Calculate an artifact checksum",
      command: "sha256sum <artifact-path>",
      interpretation:
        "Produces a checksum that can be compared with trusted repository metadata."
    },
    {
      purpose: "Check the current Kubernetes context",
      command: "kubectl config current-context",
      interpretation:
        "Displays the active context. Confirm it is the intended target before running any mutating command."
    },
    {
      purpose: "Inspect workloads in a namespace",
      command: "kubectl get deploy,pods,svc -n <namespace>",
      interpretation:
        "Shows basic deployment, pod, and service state for the selected namespace."
    },
    {
      purpose: "Check deployment rollout status",
      command:
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=60s",
      interpretation:
        "Waits for rollout status up to the specified timeout. A timeout does not prove that the remote rollout stopped."
    },
    {
      purpose: "Inspect recent Kubernetes events",
      command:
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      interpretation:
        "Shows recent namespace events that may explain scheduling, image, probe, or rollout failures."
    }
  ],

  recoveryRunbook: [
    "1. Record the incident start time, Jenkins job, build number, branch, commit, and environment.",
    "2. Classify the failure as queue/agent, pipeline syntax, checkout, build, test, artifact, deployment, external dependency, or platform regression.",
    "3. Identify the first meaningful error and collect relevant logs before changing the system.",
    "4. Compare with the last successful build and inspect recent changes.",
    "5. Determine whether the issue affects one job, one agent, one repository, or multiple pipelines.",
    "6. Verify the target environment and determine whether remote state changed.",
    "7. Isolate one root cause using evidence rather than changing multiple settings at once.",
    "8. Apply the smallest approved fix in a safe environment where possible.",
    "9. Validate the pipeline definition, build, tests, and required quality gates.",
    "10. Validate artifact version and checksum before release publication or promotion.",
    "11. Before retrying a timed-out operation, inspect remote state and determine whether the operation already completed.",
    "12. Execute a controlled recovery under required approvals.",
    "13. Verify final deployment revision, service health, logs, and user-facing behavior.",
    "14. Confirm that credentials and sensitive information were not exposed during troubleshooting.",
    "15. Document root cause, mitigation, validation evidence, prevention actions, owners, and due dates."
  ],

  rollbackPlan: [
    "Determine whether the failure occurred before a remote change, during the change, or after successful completion.",
    "Check actual deployed revision, artifact version, infrastructure state, and service health.",
    "Pause further rollout if the target is incorrect or the current release is unhealthy.",
    "Use the approved application, infrastructure, or artifact recovery process.",
    "Do not assume a failed Jenkins result means the remote operation was rolled back.",
    "Do not rerun a non-idempotent operation until duplicate side effects have been ruled out.",
    "Obtain required production approval before rollback or emergency changes.",
    "Verify health and intended state after recovery.",
    "Record rollback reason, approving owner, timestamps, and remaining risk."
  ],

  prevention: [
    "Validate Jenkinsfiles in pull requests using an appropriate linter or test job.",
    "Use versioned shared libraries and test changes against representative consumers.",
    "Standardize agent images and pin required toolchain versions.",
    "Monitor queue time, agent availability, build duration, and failure rate.",
    "Use reproducible dependency versions and lockfiles where supported.",
    "Keep build, test, security, and quality gates explicit.",
    "Track flaky tests and assign owners to repeated failures.",
    "Keep artifact versions immutable and record checksums and provenance.",
    "Verify deployment identity, target environment, and revision before changes.",
    "Use explicit post-deployment health checks and smoke tests.",
    "Design retry behavior carefully and make operations idempotent where possible.",
    "Avoid blanket error suppression and unreviewed quality-gate bypasses.",
    "Test plugin and controller upgrades in staging.",
    "Keep incident runbooks, service ownership, rollback steps, and escalation contacts current.",
    "Review recurring incidents and convert proven fixes into automated checks."
  ],

  monitoring: [
    "Pipeline success and failure rates by job, repository, branch, and stage.",
    "Queue wait time and executor saturation.",
    "Agent availability, disconnections, provisioning latency, and resource utilization.",
    "Build duration and stage-duration deviations from baseline.",
    "Dependency repository availability, latency, and resolution errors.",
    "Test failure rate, flaky-test frequency, and quality-gate failures.",
    "Artifact publication failures and checksum mismatches.",
    "Deployment duration, rollout failures, and post-deployment health.",
    "Shared-library and plugin changes correlated with pipeline regressions.",
    "Repeated retries, timeouts, and operations with uncertain remote state.",
    "Secret-scanning alerts and suspicious credential usage.",
    "Service health and error rate after a successful release."
  ],

  cicdValidation: [
    "Validate Jenkinsfile syntax before merge.",
    "Confirm required stage definitions and release conditions.",
    "Test shared-library changes against representative jobs.",
    "Check toolchain versions and dependency configuration.",
    "Ensure failed tests and required security checks propagate to the final build result.",
    "Verify artifacts exist and have the expected version before publication.",
    "Record commit SHA and artifact checksum for traceability.",
    "Confirm the intended deployment context and target environment.",
    "Require approvals for production operations where policy demands them.",
    "Use safe timeouts and inspect remote state before retrying uncertain operations.",
    "Run post-deployment smoke tests and health checks.",
    "Verify that a deliberate failure produces a failed pipeline rather than a false-green result.",
    "Check logs and artifacts for accidental secret exposure.",
    "Validate recovery and rollback procedures in non-production."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Severity:",
    "Jenkins job and build number:",
    "Repository and commit SHA:",
    "Branch or pull request:",
    "Affected stage:",
    "Affected environment and service:",
    "Incident start and detection time:",
    "Customer or delivery impact:",
    "First meaningful error:",
    "Last known successful build:",
    "Recent code, pipeline, agent, plugin, or infrastructure changes:",
    "Evidence collected:",
    "Root cause and supporting evidence:",
    "Was remote state changed?:",
    "Immediate mitigation:",
    "Recovery or rollback decision:",
    "Approval and owner:",
    "Validation and service health:",
    "Prevention actions:",
    "Action owners and due dates:",
    "Lessons learned:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a pipeline syntax failure",
      objective:
        "Learn to isolate a Jenkinsfile parsing error before execution.",
      steps: [
        "Create a non-production pipeline with a deliberately invalid syntax change.",
        "Run the appropriate pipeline linter or validation job.",
        "Record the exact validation error.",
        "Correct the syntax and validate again.",
        "Run a harmless test pipeline."
      ],
      successCriteria: [
        "The syntax issue is identified before release execution.",
        "The corrected pipeline parses successfully.",
        "No production job is modified."
      ]
    },
    {
      title: "Lab 2 — Diagnose an agent-label mismatch",
      objective:
        "Understand why a build can remain queued even when Jenkins is online.",
      steps: [
        "Create a test job with a label that has no eligible agent.",
        "Inspect the queue reason and available nodes.",
        "Correct the label or provision an approved test agent.",
        "Run the job and record queue duration."
      ],
      successCriteria: [
        "The queue reason is correctly identified.",
        "The job runs on a compatible agent.",
        "No unrelated agent configuration is changed."
      ]
    },
    {
      title: "Lab 3 — Investigate a flaky test",
      objective:
        "Separate deterministic product defects from intermittent test-environment failures.",
      steps: [
        "Use a non-production test that can reproduce an intermittent failure.",
        "Collect test reports and timestamps.",
        "Repeat the test with controlled inputs.",
        "Inspect shared data, timing, and dependency health.",
        "Fix the cause or document a time-limited quarantine with an owner."
      ],
      successCriteria: [
        "The failure is reproducible or its intermittent nature is demonstrated.",
        "The root cause has supporting evidence.",
        "Required tests are not silently suppressed."
      ]
    },
    {
      title: "Lab 4 — Recover from an uncertain deployment timeout",
      objective:
        "Practice verifying remote state before retrying a timed-out deployment.",
      steps: [
        "Use a non-production deployment environment.",
        "Simulate a client timeout while the remote operation may still be running.",
        "Inspect operation events and the deployed revision.",
        "Determine whether the operation completed, is running, or failed.",
        "Resume monitoring or recover using the documented procedure."
      ],
      successCriteria: [
        "Remote state is verified before retry.",
        "No duplicate deployment is triggered.",
        "The final revision and health checks are recorded."
      ]
    },
    {
      title: "Lab 5 — Prevent a false-green pipeline",
      objective:
        "Verify that real failures cannot be hidden by incorrect error handling.",
      steps: [
        "Create a non-production test stage that intentionally fails.",
        "Observe how the pipeline records the exit status.",
        "Correct any overly broad error suppression.",
        "Add a required verification stage.",
        "Confirm the pipeline fails when mandatory validation fails."
      ],
      successCriteria: [
        "A deliberate required-check failure produces a failed build.",
        "Optional failures are handled explicitly.",
        "The pipeline does not report success without required verification."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "How do you troubleshoot a Jenkins pipeline failure in production?",
      answer:
        "Establish scope and impact, identify the first meaningful error, collect logs and environment evidence, compare with the last successful build, isolate the cause, apply a targeted fix, verify remote state, and validate recovery."
    },
    {
      question: "Why should you investigate the first meaningful error rather than the final log line?",
      answer:
        "Later errors can be consequences of an earlier failure. The first causal error often points to the actual root cause."
    },
    {
      question: "What is the difference between a queued build and a failed stage?",
      answer:
        "A queued build has not started execution because scheduling or resource requirements are unmet. A failed stage has begun execution and encountered an error."
    },
    {
      question: "Why can a Jenkins build remain in the queue?",
      answer:
        "The requested label may have no eligible agent, all executors may be occupied, an agent may be offline, or provisioning may be failing."
    },
    {
      question: "How do you diagnose a Jenkinsfile syntax problem?",
      answer:
        "Validate the Jenkinsfile using the appropriate linter, inspect the exact error and line, compare recent changes, and test the corrected pipeline before execution."
    },
    {
      question: "How do you troubleshoot Git checkout failures?",
      answer:
        "Verify the repository URL and ref, inspect the resolved commit, check approved credentials and permissions, and investigate network, DNS, TLS, or proxy issues."
    },
    {
      question: "What does a non-zero shell exit code mean?",
      answer:
        "It generally indicates that the command reported failure. Interpret it using the command's documented exit-code behavior and avoid hiding genuine errors."
    },
    {
      question: "Why might a build pass locally but fail in Jenkins?",
      answer:
        "The agent may have different tools, runtime versions, environment variables, permissions, filesystem state, dependency cache, network access, or test services."
    },
    {
      question: "How do you troubleshoot flaky tests?",
      answer:
        "Collect test reports, repeat under controlled conditions, inspect timing and concurrency, isolate test data, and investigate external dependencies. Do not simply disable the tests."
    },
    {
      question: "How do you diagnose dependency download failures?",
      answer:
        "Check dependency coordinates, repository availability, credentials, proxy and DNS configuration, version declarations, and whether other builds are affected."
    },
    {
      question: "What is a shared Jenkins library?",
      answer:
        "It is reusable pipeline code shared across jobs. Versioning, testing, and controlled rollout are important because one change can affect many repositories."
    },
    {
      question: "How do plugin updates cause pipeline failures?",
      answer:
        "A plugin update can introduce incompatible behavior, change APIs, or conflict with Jenkins core or other plugins. Test upgrades in staging and retain an approved recovery plan."
    },
    {
      question: "What should you do if an artifact upload times out?",
      answer:
        "Check repository metadata, artifact coordinates, checksum, and publication logs before retrying. The upload may have completed remotely even if Jenkins did not receive the response."
    },
    {
      question: "Why is blindly retrying a deployment dangerous?",
      answer:
        "The remote operation may already have completed or partially changed state. A retry can create duplicate resources, repeat migrations, or overwrite a release."
    },
    {
      question: "How do you troubleshoot a Kubernetes deployment stage?",
      answer:
        "Verify context and namespace, inspect workload state and events, check rollout status, examine pod logs and readiness, and compare the deployed revision with the intended release."
    },
    {
      question: "What is a false-green pipeline?",
      answer:
        "A pipeline reports success despite a failed or skipped mandatory check, suppressed command failure, or unsuccessful deployment validation."
    },
    {
      question: "How do you troubleshoot parallel-stage failures?",
      answer:
        "Identify the first failing branch, compare its inputs and environment with successful branches, and inspect shared state, concurrency, resources, and dependencies."
    },
    {
      question: "When should you roll back a deployment?",
      answer:
        "When the deployed state is incorrect, unhealthy, or fails release criteria and rollback is the safest approved recovery. First verify the actual remote state."
    },
    {
      question: "What metrics help detect Jenkins pipeline problems?",
      answer:
        "Build success rate, queue time, stage duration, agent availability, resource utilization, flaky-test rate, dependency failures, artifact publication errors, and post-deployment health."
    },
    {
      question: "What evidence should an incident report include?",
      answer:
        "Record impact, job and build details, commit, stage, timestamps, sanitized error, root cause, whether remote state changed, mitigation, validation, rollback decision, and prevention owners."
    }
  ],

  references: [
    {
      title: "Jenkins Pipeline",
      url: "https://www.jenkins.io/doc/book/pipeline/"
    },
    {
      title: "Jenkins Pipeline Syntax",
      url: "https://www.jenkins.io/doc/book/pipeline/syntax/"
    },
    {
      title: "Pipeline Steps Reference",
      url: "https://www.jenkins.io/doc/pipeline/steps/"
    },
    {
      title: "Jenkins Managing Nodes",
      url: "https://www.jenkins.io/doc/book/managing/nodes/"
    },
    {
      title: "Jenkins Pipeline Development Best Practices",
      url: "https://www.jenkins.io/doc/book/pipeline/pipeline-best-practices/"
    },
    {
      title: "Jenkins Shared Libraries",
      url: "https://www.jenkins.io/doc/book/pipeline/shared-libraries/"
    },
    {
      title: "Jenkins Pipeline Linter",
      url: "https://www.jenkins.io/doc/book/pipeline/development/"
    },
    {
      title: "Kubernetes Debugging Applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    },
    {
      title: "Git Documentation",
      url: "https://git-scm.com/docs"
    }
  ]
};
