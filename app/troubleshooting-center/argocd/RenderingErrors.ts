```typescript
/**
 * Argo CD Rendering Errors
 * Target: app/troubleshooting-center/argocd/RenderingErrors.ts
 *
 * Real production troubleshooting guide:
 * Git source -> Manifest generation -> Validation -> Sync -> Kubernetes health
 *
 * Safety:
 * - Start with read-only investigation.
 * - Confirm the application, repository, revision, path, and environment.
 * - Never expose credentials or Secret values.
 * - Validate generated manifests before production synchronization.
 * - A successful render does not guarantee a successful deployment.
 */

export interface RenderingDiagnostic {
  title: string;
  purpose: string;
  command: string;
  expectedResult: string;
  failureMeaning: string;
  nextStep: string;
}

export interface RenderingRootCause {
  cause: string;
  symptoms: string[];
  evidence: string[];
  investigation: string[];
  resolution: string[];
  verification: string[];
}

export interface RenderingInterviewQuestion {
  question: string;
  answer: string;
}

export const renderingErrorsGuide = {
  id: "argocd-rendering-errors",
  title: "Argo CD Manifest Rendering Errors",
  category: "Argo CD",
  difficulty: "Intermediate to Advanced",
  estimatedTime: "60–90 minutes",

  description:
    "Learn how to troubleshoot Argo CD manifest-generation failures involving " +
    "Helm, Kustomize, YAML, Git repositories, plugins, dependencies, and " +
    "environment-specific configuration in real production environments.",

  learningObjectives: [
    "Understand how Argo CD generates Kubernetes manifests.",
    "Distinguish rendering failures from Kubernetes synchronization failures.",
    "Investigate Helm, Kustomize, YAML, and repository errors.",
    "Interpret repo-server errors and compare local rendering with Argo CD rendering.",
    "Validate generated manifests before production deployment.",
    "Recover safely from broken GitOps configuration.",
    "Prevent repeated rendering failures through CI and release controls.",
  ],

  prerequisites: [
    "Basic Git and GitHub knowledge.",
    "Basic Kubernetes YAML knowledge.",
    "Basic Helm chart and values knowledge.",
    "Basic Kustomize knowledge.",
    "Familiarity with Argo CD Applications and GitOps workflows.",
  ],

  overview: {
    definition:
      "Manifest rendering is the process of converting configuration stored in Git " +
      "into Kubernetes resource manifests that Argo CD can compare with live cluster " +
      "resources. Depending on the Application source, rendering may use plain YAML, " +
      "Helm, Kustomize, Jsonnet, or a configured config-management plugin.",

    simplifiedFlow: [
      "1. Argo CD identifies the repository, target revision, and source path.",
      "2. The repository server obtains the source content.",
      "3. The configured renderer processes charts, overlays, templates, and values.",
      "4. Generated manifests are returned for comparison.",
      "5. Argo CD calculates synchronization differences.",
      "6. An approved sync operation applies the desired resources.",
      "7. Kubernetes controllers reconcile the resources and workloads become healthy.",
    ],

    criticalDistinction:
      "A rendering error means Argo CD cannot successfully generate the desired " +
      "manifest set. A synchronization error means generated resources could not " +
      "be applied or processed successfully. A runtime error means resources may " +
      "have been applied, but the workload or application is not operating correctly.",

    failureStages: [
      {
        stage: "Source retrieval",
        example: "Repository authentication failure or unavailable Git revision.",
        effect:
          "Argo CD cannot obtain the intended source content.",
      },
      {
        stage: "Manifest generation",
        example: "Helm template failure, missing values file, or Kustomize error.",
        effect:
          "Desired Kubernetes manifests cannot be generated.",
      },
      {
        stage: "Manifest validation",
        example: "Unsupported API version or invalid resource schema.",
        effect:
          "Generated YAML may not be accepted by the target Kubernetes API.",
      },
      {
        stage: "Synchronization",
        example: "Forbidden, admission rejection, or failed resource creation.",
        effect:
          "Generated resources cannot be fully applied.",
      },
      {
        stage: "Runtime health",
        example: "CrashLoopBackOff, readiness failure, or missing Service endpoints.",
        effect:
          "Resources may exist but the application does not function correctly.",
      },
    ],
  },

  productionIncident: {
    title: "Incident: Production Rendering Fails Immediately After a Merge",

    scenario:
      "A pull request is merged into the production GitOps repository. Shortly " +
      "afterward, Argo CD reports a manifest-generation error. The Application " +
      "cannot calculate the expected resource differences. The team discovers " +
      "that a new Helm values file was referenced by the chart configuration, " +
      "but that file is missing from the production overlay.",

    impactQuestions: [
      "Is this only a development application or a critical production service?",
      "Is the currently deployed version still serving traffic?",
      "Did the failure happen before synchronization, or did another operation already apply changes?",
      "Are other Applications using the same repository server or shared configuration?",
      "Does the failed commit affect a shared Helm chart or Kustomize base?",
      "Is a release promotion or deployment deadline blocked?",
      "Could a rollback conflict with database migrations or external side effects?",
    ],

    severityGuidance: [
      {
        level: "Critical",
        condition:
          "The incident causes a major production outage, blocks an urgent recovery, " +
          "or creates a critical operational risk.",
        response:
          "Activate incident management and prioritize service protection.",
      },
      {
        level: "High",
        condition:
          "A critical production release is blocked or several services are affected.",
        response:
          "Assign an owner and investigate the shared failure path.",
      },
      {
        level: "Moderate",
        condition:
          "A single non-critical deployment is blocked without major customer impact.",
        response:
          "Correct the source configuration and prevent unsafe promotion.",
      },
      {
        level: "Low",
        condition:
          "A development-only rendering failure has no production impact.",
        response:
          "Fix and validate the change through the normal development workflow.",
      },
    ],

    timeline: [
      {
        time: "T+00",
        action: "Alert or deployment failure is detected.",
        evidence: "Alert time, Application name, environment, and release commit.",
      },
      {
        time: "T+03",
        action: "Impact and deployment state are checked.",
        evidence: "Application status, active version, and customer-facing metrics.",
      },
      {
        time: "T+06",
        action: "Rendering error is captured.",
        evidence: "Application conditions and relevant repo-server logs.",
      },
      {
        time: "T+10",
        action: "Source and rendering configuration are inspected.",
        evidence: "Repository revision, source path, Helm values, or Kustomize files.",
      },
      {
        time: "T+15",
        action: "Root cause is confirmed.",
        evidence: "A reproducible rendering error tied to a specific file or configuration.",
      },
      {
        time: "T+20",
        action: "Validated correction is committed.",
        evidence: "Successful render and passing CI checks.",
      },
      {
        time: "T+30",
        action: "Argo CD recovery is verified.",
        evidence: "Expected revision, generated resources, healthy rollout, and application checks.",
      },
    ],
  },

  productionWorkflow: [
    {
      stage: "1. Detect and acknowledge",
      actions: [
        "Record when the rendering failure first appeared.",
        "Identify the affected Argo CD Application and environment.",
        "Record the latest commit, branch, tag, or target revision.",
        "Determine whether this is an isolated application failure or a shared platform incident.",
        "Assign an incident owner and communicate the current status.",
      ],
      exitCriteria: [
        "The affected Application and environment are known.",
        "The incident has an owner.",
        "The last known-good revision is recorded.",
      ],
    },
    {
      stage: "2. Assess impact and severity",
      actions: [
        "Check whether the existing workload is still serving traffic.",
        "Determine whether rendering failed before a new sync operation.",
        "Inspect whether another sync operation may already have applied resources.",
        "Identify other Applications that depend on the same chart, base, or plugin.",
        "Check service-level indicators such as availability, latency, and HTTP errors.",
        "Determine whether a shared source change blocks multiple production releases.",
      ],
      exitCriteria: [
        "Customer impact and release risk are understood.",
        "The investigation distinguishes deployment blockage from an existing application outage.",
      ],
    },
    {
      stage: "3. Safety checks",
      actions: [
        "Confirm the Argo CD server and exact Application name.",
        "Confirm the repository URL, target revision, and source path.",
        "Confirm whether the environment is production, staging, or development.",
        "Check the configured source type and renderer.",
        "Check automated sync, self-heal, pruning, and any active operation.",
        "Check production approval and change-freeze rules.",
        "Do not trigger a sync simply to test whether rendering works.",
      ],
      exitCriteria: [
        "The intended source and environment are confirmed.",
        "The investigation is read-only unless a change is approved.",
      ],
    },
    {
      stage: "4. Collect evidence",
      actions: [
        "Capture the exact Application error message.",
        "Record the repository revision and path.",
        "Inspect the source configuration and changed files.",
        "Capture relevant repo-server logs around the failure time.",
        "Record Helm chart versions, values file names, or Kustomize overlay paths.",
        "Compare the failing commit with the last known-good revision.",
        "Redact credentials, tokens, and Secret data before storing evidence.",
      ],
      exitCriteria: [
        "The original error and source revision are documented.",
        "Evidence is sufficient to reproduce or narrow down the failure.",
      ],
    },
    {
      stage: "5. Diagnose in order",
      actions: [
        "Inspect Application conditions and source configuration.",
        "Verify repository and target revision access.",
        "Verify that the configured path exists at that revision.",
        "Identify the rendering tool and exact error.",
        "Check Helm values, Kustomize overlays, YAML syntax, and dependencies as applicable.",
        "Render the source locally using matching tool versions and configuration.",
        "Compare local results with Argo CD output and logs.",
      ],
      exitCriteria: [
        "The failure is narrowed to a specific source, renderer, dependency, or platform issue.",
      ],
    },
    {
      stage: "6. Isolate the root cause",
      actions: [
        "Distinguish a missing file from a repository access error.",
        "Distinguish a Helm template error from Kubernetes API schema rejection.",
        "Distinguish invalid YAML from unsupported resource API versions.",
        "Distinguish a local tool-version mismatch from an actual repository defect.",
        "Determine whether the failure is specific to one Application or affects shared rendering infrastructure.",
        "Use a minimal reproducible example when a complex chart or plugin is involved.",
      ],
      exitCriteria: [
        "The root cause is supported by specific evidence.",
        "Alternative explanations have been checked.",
      ],
    },
    {
      stage: "7. Fix and recover",
      actions: [
        "Make the smallest correction that addresses the confirmed cause.",
        "Validate the change locally and in CI.",
        "Review the rendered resources for unexpected changes or deletions.",
        "Commit the correction through the approved Git workflow.",
        "Confirm Argo CD resolves the intended corrected revision.",
        "Review the resulting diff before synchronization.",
        "Use the approved synchronization or rollback procedure.",
        "Verify workload readiness and application behavior.",
      ],
      exitCriteria: [
        "Rendering succeeds.",
        "The desired resources match the reviewed change.",
        "The application remains healthy and user impact is resolved.",
      ],
    },
    {
      stage: "8. Prevent recurrence",
      actions: [
        "Add render checks for every supported environment.",
        "Validate required Helm values and overlay files in CI.",
        "Pin renderer and chart versions where appropriate.",
        "Add alerts for sustained manifest-generation failures.",
        "Document the failure signature and recovery steps.",
        "Track follow-up actions with owners and due dates.",
      ],
      exitCriteria: [
        "The incident report is complete.",
        "Preventive controls are assigned and tracked.",
      ],
    },
  ],

  diagnosticCommands: [
    {
      title: "1. Inspect the Application",
      purpose:
        "Find the exact rendering error, source configuration, revision, and destination.",
      command:
        "argocd app get <app-name>",
      expectedResult:
        "The Application status, source, destination, revision, and conditions are displayed.",
      failureMeaning:
        "A connection or lookup error may indicate incorrect CLI context, authentication, or Application name.",
      nextStep:
        "Confirm the Argo CD server, account, and Application name before continuing.",
    },
    {
      title: "2. Inspect Application details in JSON",
      purpose:
        "Capture structured status for detailed incident analysis.",
      command:
        "argocd app get <app-name> -o json",
      expectedResult:
        "Application metadata and status are returned in JSON.",
      failureMeaning:
        "The command may fail because of authentication, lookup, or CLI-version differences.",
      nextStep:
        "Use supported output options and capture the source, revision, conditions, and operation fields.",
    },
    {
      title: "3. Confirm the Git revision",
      purpose:
        "Determine which commit or revision Argo CD is using.",
      command:
        "git log -5 --oneline",
      expectedResult:
        "The latest local commits are displayed.",
      failureMeaning:
        "The local repository may not be on the same revision that Argo CD is rendering.",
      nextStep:
        "Check out or fetch the intended revision in a separate investigation workspace and compare it with the Application status.",
    },
    {
      title: "4. Verify the configured source path",
      purpose:
        "Check whether the referenced chart, overlay, or manifest directory exists.",
      command:
        "git ls-tree -r --name-only <revision> -- <path>",
      expectedResult:
        "Files tracked under the requested path are listed.",
      failureMeaning:
        "An empty result or missing file can indicate a wrong path, missing commit, or file that is not tracked at that revision.",
      nextStep:
        "Compare the configured source path with the repository tree at the exact target revision.",
    },
    {
      title: "5. Check changed files",
      purpose:
        "Identify recent source changes that may have introduced the error.",
      command:
        "git diff <last-known-good-revision>..<failing-revision> --",
      expectedResult:
        "The changes between the two revisions are shown.",
      failureMeaning:
        "Unexpected file removals, renamed values files, or chart changes may explain the failure.",
      nextStep:
        "Inspect the changed files and narrow the comparison to the failing renderer inputs.",
    },
    {
      title: "6. Check Helm chart metadata",
      purpose:
        "Confirm chart metadata and dependency declarations.",
      command:
        "helm show chart <chart-path>",
      expectedResult:
        "Chart metadata is displayed if the path identifies a readable chart.",
      failureMeaning:
        "The path may not identify a chart, metadata may be invalid, or the chart may be unavailable.",
      nextStep:
        "Verify Chart.yaml, chart version, source path, and dependency configuration.",
    },
    {
      title: "7. Lint a Helm chart",
      purpose:
        "Find chart and template issues before deployment.",
      command:
        "helm lint <chart-path> -f <values-file>",
      expectedResult:
        "Helm reports lint results and any detected chart issues.",
      failureMeaning:
        "A failure can indicate chart metadata problems, invalid templates, or configuration issues.",
      nextStep:
        "Read the first actionable error and fix the relevant chart or values entry.",
    },
    {
      title: "8. Render a Helm chart",
      purpose:
        "Reproduce manifest generation using the intended chart and values.",
      command:
        "helm template <release-name> <chart-path> -f <values-file>",
      expectedResult:
        "Rendered Kubernetes manifests are printed.",
      failureMeaning:
        "Template execution errors, missing values, invalid functions, or malformed chart files may be responsible.",
      nextStep:
        "Compare the error with Argo CD's message and confirm that the same chart and values are used.",
    },
    {
      title: "9. Render a specific Helm environment",
      purpose:
        "Check an environment-specific values file.",
      command:
        "helm template <release-name> <chart-path> -f values.yaml -f values-production.yaml",
      expectedResult:
        "The chart renders using the supplied values files in order.",
      failureMeaning:
        "A missing file or invalid value can cause local rendering to fail.",
      nextStep:
        "Confirm the values files exist and their order matches the intended deployment configuration.",
    },
    {
      title: "10. Inspect Helm values",
      purpose:
        "Understand chart defaults and identify value-name mismatches.",
      command:
        "helm show values <chart-path>",
      expectedResult:
        "The chart's default values are displayed.",
      failureMeaning:
        "The path or chart may be invalid, or the chart source may be unavailable.",
      nextStep:
        "Compare the actual values keys with the chart's documented schema and templates.",
    },
    {
      title: "11. Inspect a Kustomize overlay",
      purpose:
        "Confirm that the overlay can be rendered into resources.",
      command:
        "kubectl kustomize <overlay-path>",
      expectedResult:
        "The Kustomize-generated YAML is printed.",
      failureMeaning:
        "Missing resources, invalid patches, or incorrect Kustomize configuration may prevent generation.",
      nextStep:
        "Inspect the exact failing resource path, patch target, and overlay configuration.",
    },
    {
      title: "12. Inspect Kustomize configuration",
      purpose:
        "Review resource references, patches, components, and image transformations.",
      command:
        "git show <revision>:<overlay-path>/kustomization.yaml",
      expectedResult:
        "The tracked Kustomize configuration at the requested revision is displayed.",
      failureMeaning:
        "The file may not exist at that revision or the path may be wrong.",
      nextStep:
        "Confirm the overlay directory and every referenced resource exist in the repository.",
    },
    {
      title: "13. Check YAML syntax",
      purpose:
        "Find malformed YAML before rendering or deployment.",
      command:
        "yamllint <manifest-file>",
      expectedResult:
        "The YAML lint tool reports any formatting or syntax issues covered by its rules.",
      failureMeaning:
        "A reported issue may be syntax-related or a lint rule violation; not every lint warning is a Kubernetes API error.",
      nextStep:
        "Fix actual syntax errors and review lint rules appropriate to the repository.",
    },
    {
      title: "14. Validate generated manifests",
      purpose:
        "Check whether the API server accepts a rendered manifest without persisting it.",
      command:
        "kubectl apply --dry-run=server -f <rendered-manifest-file>",
      expectedResult:
        "The API server validates the resource without persisting the changes.",
      failureMeaning:
        "Schema, authorization, admission, or missing API dependency issues may be reported.",
      nextStep:
        "Correct the specific validation error. This check does not prove that the application will run successfully.",
    },
    {
      title: "15. Inspect Argo CD repository-server logs",
      purpose:
        "Investigate repository retrieval, manifest generation, and renderer failures.",
      command:
        "kubectl logs deployment/argocd-repo-server -n <argocd-namespace> --since=30m",
      expectedResult:
        "Recent repository-server logs are shown if the deployment name, namespace, permissions, and logging setup are correct.",
      failureMeaning:
        "The Deployment name may differ, logs may be unavailable, or the issue may not be visible in the selected time window.",
      nextStep:
        "Check the actual repo-server workload and correlate logs with the Application failure timestamp.",
    },
    {
      title: "16. Inspect Argo CD component health",
      purpose:
        "Determine whether the rendering failure is isolated or part of a platform-wide problem.",
      command:
        "kubectl get pods -n <argocd-namespace>",
      expectedResult:
        "Argo CD component Pods and their statuses are displayed.",
      failureMeaning:
        "Restarting or unavailable repository-server Pods may indicate a shared platform problem.",
      nextStep:
        "Inspect the affected Pod's events, resource usage, and logs before making platform changes.",
    },
    {
      title: "17. Compare tool versions",
      purpose:
        "Detect local and server-side rendering differences.",
      command:
        "helm version",
      expectedResult:
        "The installed local Helm version is displayed.",
      failureMeaning:
        "A local version mismatch may produce different rendering behavior from the configured Argo CD environment.",
      nextStep:
        "Check the Argo CD version, configured Helm version, and relevant tool compatibility.",
    },
    {
      title: "18. Inspect Git repository status",
      purpose:
        "Ensure local testing uses a known source state.",
      command:
        "git status --short",
      expectedResult:
        "Modified, staged, and untracked files are displayed.",
      failureMeaning:
        "Local uncommitted files can make a local render differ from the repository content Argo CD actually sees.",
      nextStep:
        "Reproduce the test in a clean workspace at the exact failing revision.",
    },
  ] as RenderingDiagnostic[],

  rootCauses: [
    {
      cause: "Incorrect Application source path",
      symptoms: [
        "Argo CD cannot find the expected chart or manifests.",
        "The configured directory does not contain the required rendering files.",
      ],
      evidence: [
        "Application source path and repository tree do not match.",
        "The expected file is absent from the failing Git revision.",
      ],
      investigation: [
        "Inspect the Application source path.",
        "Check the repository tree at the exact target revision.",
        "Review recent directory renames and file moves.",
      ],
      resolution: [
        "Correct the source path in the approved Application configuration.",
        "Restore a required file if it was accidentally removed.",
        "Validate the source using the same repository revision.",
      ],
      verification: [
        "Argo CD can access the configured source path.",
        "Manifest generation succeeds.",
        "The generated resources match the intended application.",
      ],
    },
    {
      cause: "Missing Helm values file",
      symptoms: [
        "Rendering fails with a missing values file error.",
        "Only one environment fails while other environments render successfully.",
      ],
      evidence: [
        "The configured values file is absent from the repository revision.",
        "The file path or filename differs in case or spelling.",
      ],
      investigation: [
        "Inspect the Application Helm configuration.",
        "List the tracked files at the exact revision.",
        "Compare development, staging, and production values references.",
      ],
      resolution: [
        "Restore the intended values file or correct its reference.",
        "Validate required values in CI for every environment.",
        "Review whether a renamed file was correctly updated in all references.",
      ],
      verification: [
        "Helm renders with the intended environment values.",
        "Generated resource names, image references, and replica counts are correct.",
      ],
    },
    {
      cause: "Helm template references an invalid value",
      symptoms: [
        "Rendering fails when a particular value is missing or has an unexpected type.",
        "A template references a key that does not exist in the values structure.",
      ],
      evidence: [
        "Helm error output identifies a template file and line.",
        "The values file does not match the template's expected structure.",
      ],
      investigation: [
        "Inspect the exact template expression.",
        "Compare the values file with chart defaults.",
        "Review recent chart and values changes.",
        "Check whether required values have explicit validation.",
      ],
      resolution: [
        "Correct the key, type, or template expression.",
        "Provide a safe default only when a default is semantically valid.",
        "Add values schema validation where supported.",
      ],
      verification: [
        "Helm lint and template rendering succeed.",
        "The rendered resource contains the intended values.",
      ],
    },
    {
      cause: "Invalid Helm chart metadata or dependencies",
      symptoms: [
        "Chart loading or dependency processing fails.",
        "The chart works in one workspace but fails in a clean environment.",
      ],
      evidence: [
        "Chart.yaml metadata is invalid or a declared dependency is unavailable.",
        "The expected packaged dependency is missing.",
      ],
      investigation: [
        "Inspect Chart.yaml and the dependency declarations.",
        "Check the committed chart structure and dependency versions.",
        "Reproduce the build in a clean CI workspace.",
      ],
      resolution: [
        "Correct chart metadata.",
        "Vendor or retrieve required dependencies through the approved build process.",
        "Pin dependency versions and validate the packaged chart.",
      ],
      verification: [
        "A clean environment can load and render the chart.",
        "The intended dependency versions are reproducible.",
      ],
    },
    {
      cause: "Kustomize resource or patch reference is invalid",
      symptoms: [
        "Kustomize cannot find a referenced resource.",
        "A patch does not match the intended resource.",
      ],
      evidence: [
        "The overlay references a missing file or directory.",
        "A patch target no longer matches a resource name, kind, or API group.",
      ],
      investigation: [
        "Inspect kustomization.yaml.",
        "Check all resource and component paths.",
        "Inspect the patch target and generated resource names.",
        "Compare the overlay with the last known-good revision.",
      ],
      resolution: [
        "Correct resource paths and patch targets.",
        "Update overlays when a resource has been renamed.",
        "Add CI checks for every maintained overlay.",
      ],
      verification: [
        "Kustomize renders the overlay successfully.",
        "The generated resources contain the intended patches.",
      ],
    },
    {
      cause: "Malformed YAML or duplicate/conflicting configuration",
      symptoms: [
        "A parser reports indentation, mapping, or syntax errors.",
        "A generated resource has unexpected values or structure.",
      ],
      evidence: [
        "The error identifies a YAML file and line or column.",
        "The failing change introduced malformed indentation or duplicate keys.",
      ],
      investigation: [
        "Inspect the exact line and nearby YAML structure.",
        "Run the repository's YAML lint checks.",
        "Render the full application rather than checking only one fragment.",
      ],
      resolution: [
        "Correct YAML structure and duplicate or conflicting keys.",
        "Use consistent validation rules in CI.",
        "Review generated manifests rather than assuming valid source fragments guarantee valid output.",
      ],
      verification: [
        "YAML parsing succeeds.",
        "Generated resource structure and values are correct.",
      ],
    },
    {
      cause: "Git revision or repository content mismatch",
      symptoms: [
        "Local rendering succeeds but Argo CD fails.",
        "The expected correction is not visible in Argo CD.",
      ],
      evidence: [
        "The local workspace contains uncommitted changes.",
        "Argo CD resolves a different branch, tag, or commit.",
      ],
      investigation: [
        "Inspect the Application's target revision.",
        "Compare the resolved revision with the intended commit.",
        "Use a clean workspace and test the exact revision.",
      ],
      resolution: [
        "Commit the required files through the approved workflow.",
        "Correct the target revision or source reference.",
        "Avoid testing only a developer's uncommitted local files.",
      ],
      verification: [
        "Local CI and Argo CD use the same source revision.",
        "The same source generates the expected manifests.",
      ],
    },
    {
      cause: "Argo CD and local renderer versions differ",
      symptoms: [
        "Local rendering succeeds but server-side rendering fails.",
        "Different Helm or Kustomize behavior appears across environments.",
      ],
      evidence: [
        "Tool versions or build flags differ.",
        "The failing feature depends on renderer-version behavior.",
      ],
      investigation: [
        "Record local tool versions.",
        "Identify the configured renderer version used by Argo CD.",
        "Check relevant chart, plugin, and tool compatibility.",
      ],
      resolution: [
        "Align CI validation with the supported rendering version.",
        "Upgrade renderer components only through the approved platform process.",
        "Test compatibility before rolling changes into production.",
      ],
      verification: [
        "The supported renderer produces consistent output.",
        "CI and Argo CD rendering checks pass.",
      ],
    },
    {
      cause: "Config-management plugin failure",
      symptoms: [
        "Argo CD reports a plugin execution or generation error.",
        "Rendering works only in an environment with extra tools or environment variables.",
      ],
      evidence: [
        "The configured plugin command exits unsuccessfully.",
        "A required executable, environment variable, or dependency is missing.",
      ],
      investigation: [
        "Identify the configured plugin and its execution environment.",
        "Inspect the plugin error and relevant repo-server logs.",
        "Check executable availability, permissions, and dependency versions.",
        "Review required environment variables without revealing secret values.",
      ],
      resolution: [
        "Restore the approved plugin dependency or configuration.",
        "Package required tools reproducibly.",
        "Remove reliance on undocumented local environment state.",
        "Review plugin permissions and input handling.",
      ],
      verification: [
        "The plugin runs in a clean supported environment.",
        "The generated output is deterministic and valid.",
      ],
    },
    {
      cause: "Shared repo-server resource or infrastructure problem",
      symptoms: [
        "Several unrelated Applications fail to render at the same time.",
        "Rendering becomes slow or repository-server Pods restart.",
      ],
      evidence: [
        "Multiple Applications share the same time window and error pattern.",
        "Repo-server logs show resource, dependency, timeout, or process failures.",
      ],
      investigation: [
        "Compare failure times across Applications.",
        "Inspect repo-server health, resource limits, restarts, and logs.",
        "Check repository access and shared plugin dependencies.",
        "Determine whether the problem is isolated to one chart or shared infrastructure.",
      ],
      resolution: [
        "Address the confirmed resource or platform configuration problem.",
        "Use the platform team's recovery procedure.",
        "Avoid repeatedly restarting shared components without evidence.",
      ],
      verification: [
        "Repo-server components remain healthy.",
        "Multiple affected Applications render successfully.",
      ],
    },
    {
      cause: "Environment-specific configuration is missing or inconsistent",
      symptoms: [
        "Development renders successfully while production fails.",
        "A required value, overlay, or dependency exists in only some environments.",
      ],
      evidence: [
        "Environment-specific files or required keys differ unexpectedly.",
        "A recent release added configuration without updating every environment.",
      ],
      investigation: [
        "Compare the environment-specific source paths and values.",
        "Identify required keys and configuration dependencies.",
        "Review the release promotion process.",
      ],
      resolution: [
        "Update the missing environment configuration.",
        "Validate all supported environments in CI.",
        "Promote reviewed, consistent artifacts and configuration.",
      ],
      verification: [
        "Every supported environment renders successfully.",
        "Differences between environments are intentional and documented.",
      ],
    },
  ] as RenderingRootCause[],

  safeRecovery: [
    {
      step: "1. Preserve evidence",
      actions: [
        "Capture the original rendering error.",
        "Record the failing and last known-good revisions.",
        "Save relevant logs and configuration diffs.",
      ],
    },
    {
      step: "2. Reproduce the failure",
      actions: [
        "Use a clean workspace.",
        "Check out the exact failing revision.",
        "Use matching chart values, overlays, and supported tool versions.",
        "Do not use uncommitted local files as proof of a successful production render.",
      ],
    },
    {
      step: "3. Make a focused correction",
      actions: [
        "Correct the confirmed file, template, value, dependency, or plugin problem.",
        "Avoid unrelated refactoring during an active incident.",
        "Submit the change through the approved review process.",
      ],
    },
    {
      step: "4. Validate before promotion",
      actions: [
        "Run YAML validation.",
        "Run Helm lint and template rendering where applicable.",
        "Run Kustomize rendering where applicable.",
        "Validate generated resources against the intended cluster APIs.",
        "Review the generated diff for unexpected deletions and configuration changes.",
      ],
    },
    {
      step: "5. Restore the intended GitOps state",
      actions: [
        "Commit and merge the correction or use the approved known-good revision.",
        "Confirm Argo CD resolves the intended source revision.",
        "Inspect the resulting Application diff.",
        "Obtain required production approval before synchronization.",
      ],
    },
    {
      step: "6. Verify recovery",
      actions: [
        "Confirm manifest generation succeeds.",
        "Confirm synchronization reaches the expected state.",
        "Inspect workload readiness and relevant Kubernetes events.",
        "Run application smoke tests.",
        "Check customer-facing metrics and alerts.",
      ],
    },
  ],

  prevention: {
    ciValidation: [
      "Run Helm lint for every chart.",
      "Render every supported environment's values combination.",
      "Run Kustomize build checks for every maintained overlay.",
      "Validate YAML and Kubernetes resource schemas.",
      "Test source paths and required files.",
      "Check required values and reject invalid configuration early.",
      "Use clean, reproducible CI workspaces.",
      "Align CI renderer versions with supported Argo CD behavior.",
      "Fail pull requests when rendering or policy checks fail.",
    ],

    gitOpsControls: [
      "Protect production branches and require reviewed changes.",
      "Pin chart and dependency versions where appropriate.",
      "Use immutable image references for reproducible releases.",
      "Keep development, staging, and production configuration differences explicit.",
      "Use a documented source-of-truth ownership model.",
      "Review generated manifests for unexpected changes before high-risk releases.",
    ],

    monitoring: [
      "Alert on sustained Application manifest-generation errors.",
      "Monitor repository-server availability and restarts.",
      "Track rendering duration and repeated failures.",
      "Identify shared failures across multiple Applications.",
      "Link alerts to the source revision and troubleshooting runbook.",
      "Track time to detect, time to recover, and repeat incident frequency.",
    ],
  },

  commonMistakes: [
    {
      mistake: "Assuming every Argo CD error is a Kubernetes deployment error.",
      correction:
        "Identify whether the failure is in source retrieval, rendering, validation, synchronization, or runtime health.",
    },
    {
      mistake: "Testing only the local working directory.",
      correction:
        "Reproduce the issue using a clean workspace and the exact revision Argo CD uses.",
    },
    {
      mistake: "Changing several Helm values at once.",
      correction:
        "Make one evidence-based correction and review the resulting manifests.",
    },
    {
      mistake: "Ignoring environment-specific values files.",
      correction:
        "Render every supported environment configuration in CI.",
    },
    {
      mistake: "Assuming valid YAML guarantees valid Kubernetes resources.",
      correction:
        "Run schema and API validation against the intended Kubernetes version.",
    },
    {
      mistake: "Restarting the repo-server immediately.",
      correction:
        "First determine whether the problem is shared infrastructure or an application-specific rendering error.",
    },
    {
      mistake: "Triggering sync repeatedly after a render failure.",
      correction:
        "Fix the rendering problem first and inspect the diff before applying resources.",
    },
    {
      mistake: "Rolling back without checking changes already applied.",
      correction:
        "Inspect the operation history and live resources before choosing recovery.",
    },
  ],

  incidentReportTemplate: {
    incidentId: "",
    summary: "",
    severity: "",
    affectedEnvironment: "",
    affectedApplications: [] as string[],
    repository: "",
    targetRevision: "",
    lastKnownGoodRevision: "",
    sourcePath: "",
    renderer: "",
    firstObservedAt: "",
    restoredAt: "",
    customerImpact: "",
    exactError: "",
    evidence: [] as string[],
    rootCause: "",
    correctiveChange: "",
    validationResults: [] as string[],
    syncResults: [] as string[],
    serviceVerification: [] as string[],
    rollbackRequired: false,
    preventionActions: [
      {
        action: "",
        owner: "",
        dueDate: "",
        status: "Open",
      },
    ],
    lessonsLearned: [] as string[],
  },

  runbookChecklist: [
    "Identify the incident owner and severity.",
    "Confirm the affected Application and environment.",
    "Confirm repository, revision, and source path.",
    "Determine whether existing workloads still serve traffic.",
    "Capture the exact rendering error.",
    "Check whether other Applications are affected.",
    "Identify the renderer: plain YAML, Helm, Kustomize, Jsonnet, or plugin.",
    "Verify referenced files and dependencies exist at the target revision.",
    "Reproduce rendering in a clean workspace.",
    "Compare local and Argo CD tool versions where relevant.",
    "Identify the root cause with supporting evidence.",
    "Apply the smallest approved correction.",
    "Run CI rendering and schema checks.",
    "Review generated resource differences and deletions.",
    "Confirm Argo CD resolves the intended revision.",
    "Follow the approved sync or rollback procedure.",
    "Verify Kubernetes health and application behavior.",
    "Complete the incident report.",
    "Assign preventive actions and owners.",
  ],

  interviewQuestions: [
    {
      question: "What is manifest rendering in Argo CD?",
      answer:
        "It is the process of generating Kubernetes resource manifests from the configured source, using the appropriate renderer such as Helm, Kustomize, Jsonnet, or a plugin.",
    },
    {
      question: "How is a rendering error different from a sync error?",
      answer:
        "A rendering error prevents Argo CD from generating the desired manifests. A sync error occurs when an operation cannot successfully apply or process the generated resources.",
    },
    {
      question: "Why can Helm work locally but fail in Argo CD?",
      answer:
        "The local environment may use different chart versions, values files, tool versions, dependencies, environment variables, or uncommitted files.",
    },
    {
      question: "How do you troubleshoot a missing values file?",
      answer:
        "Check the Application source configuration, target revision, repository tree, exact file path, filename case, and environment-specific values references.",
    },
    {
      question: "How do you debug a Kustomize build failure?",
      answer:
        "Inspect the overlay configuration, resource paths, patch targets, components, and referenced files, then reproduce the build at the exact Git revision.",
    },
    {
      question: "What is the role of argocd-repo-server?",
      answer:
        "It obtains repository content and generates manifests using the configured source type and rendering tools.",
    },
    {
      question: "Does successful rendering mean the application is healthy?",
      answer:
        "No. Successful rendering only means the desired manifests were generated. Synchronization, scheduling, container startup, readiness, networking, and application checks can still fail.",
    },
    {
      question: "How do you prevent rendering failures from reaching production?",
      answer:
        "Run reproducible Helm, Kustomize, YAML, schema, and policy validation in CI for every supported environment, and require review before production promotion.",
    },
    {
      question: "What should you check when several Applications fail rendering together?",
      answer:
        "Investigate shared dependencies such as repository access, repo-server health, renderer versions, plugins, resource pressure, and common chart or base changes.",
    },
    {
      question: "Why should you inspect generated manifests before syncing?",
      answer:
        "A valid render can still contain incorrect values, unintended resource changes, or dangerous deletions. Reviewing the output reduces deployment risk.",
    },
  ] as RenderingInterviewQuestion[],

  finalLearningOutcome: [
    "Identify the stage at which Argo CD manifest generation fails.",
    "Reproduce rendering problems using the exact Git revision.",
    "Troubleshoot Helm, Kustomize, YAML, repository, and plugin failures.",
    "Distinguish local tooling issues from server-side failures.",
    "Validate generated manifests before production changes.",
    "Recover through reviewed GitOps changes and verify application health.",
    "Write a useful incident report and prevent repeated failures.",
  ],
};

export default renderingErrorsGuide;
```
