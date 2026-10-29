
export const dependencyCycleGuide = {
  id: "terraform-dependency-cycle",
  title: "Terraform Dependency Cycle",
  category: "Terraform",
  summary:
    "Diagnose circular dependencies in Terraform resources, modules, data sources, " +
    "and replacement plans; correct the dependency graph without destabilizing production.",

  incidentScenario: {
    title: "Production infrastructure pipeline fails during planning",
    symptoms: [
      "terraform plan fails with Error: Cycle",
      "A new module or resource reference causes a previously valid plan to fail",
      "A security group, load balancer, IAM role, or compute resource cannot be planned",
      "A module output references another module that indirectly references the first module",
      "A refactor introduces dependencies between resources in both directions",
      "A change to create_before_destroy exposes a lifecycle dependency cycle",
    ],
    commonTriggers: [
      "Mutually referencing resource attributes",
      "Explicit depends_on added without understanding implicit dependencies",
      "Circular module input/output relationships",
      "A data source references a resource that depends on the data source",
      "Security group rules are embedded in resources that depend on each other",
      "IAM policy, role, instance profile, and workload resources are tightly coupled",
      "Conditional count or for_each expressions reference dependent resources",
      "Lifecycle replacement ordering introduces a cycle",
      "A module refactor changes dependency direction",
      "Provider or module version changes alter resource behavior",
    ],
  },

  impactAndSeverity: {
    questions: [
      "Which environment and Terraform root module are affected?",
      "Does the cycle block a new deployment or an urgent production fix?",
      "Is the failure limited to plan, or did an earlier apply already modify resources?",
      "Are any production resources scheduled for replacement or deletion in a previous plan?",
      "Does the cycle affect networking, IAM, databases, DNS, or compute capacity?",
      "Is the problem introduced by a recent commit, module update, or provider upgrade?",
      "Can unaffected services continue operating without the planned change?",
    ],
    severity: {
      SEV1:
        "A critical production recovery is blocked, or an attempted workaround risks " +
        "major outage, security exposure, or data loss.",
      SEV2:
        "An important production change is blocked or a major deployment is delayed.",
      SEV3:
        "A development or staging deployment is blocked with no customer impact.",
    },
    rule:
      "A cycle is usually a configuration or planning failure, not proof that running " +
      "infrastructure is broken. Set severity based on actual impact and urgency.",
  },

  safetyChecks: [
    "Confirm repository, commit SHA, working directory, Terraform version, and root module.",
    "Verify cloud account, region, workspace, and backend before running diagnostics.",
    "Check whether the failure occurred during init, validate, plan, or apply.",
    "Pause duplicate pipelines if they could apply conflicting changes.",
    "Preserve the complete error output and relevant Git diff.",
    "Do not remove dependencies just to make the plan succeed.",
    "Do not apply a workaround without reviewing resource replacement and deletion actions.",
    "Do not change live infrastructure manually unless the approved incident procedure requires it.",
    "Treat state and saved plan files as sensitive artifacts.",
  ],

  evidenceCollection: {
    capture: [
      "Full Terraform error including the resource addresses in the cycle",
      "Pipeline logs and timestamp of the first failing run",
      "Commit SHA and changes to resources, modules, variables, outputs, and lifecycle blocks",
      "Terraform CLI and provider versions",
      "Module source versions and dependency lock-file changes",
      "Root module and workspace used by CI",
      "Last-known-good configuration and plan, if available",
      "Whether any previous apply partially changed infrastructure",
    ],
    commands: [
      "terraform version",
      "terraform workspace show",
      "terraform providers",
      "git rev-parse HEAD",
      "git status --short",
      "git diff --check",
      "git diff --stat",
    ],
    note:
      "Do not print credentials or paste raw state files and sensitive plan artifacts into incident tickets.",
  },

  diagnosticSequence: [
    {
      step: 1,
      name: "Confirm the failure stage",
      commands: [
        "terraform init -lockfile=readonly",
        "terraform validate",
        "terraform plan",
      ],
      interpretation: {
        initFailure:
          "Resolve backend, provider installation, or module initialization issues first.",
        validateFailure:
          "Fix syntax, type, schema, or configuration errors before analyzing a cycle.",
        planCycle:
          "Capture the complete cycle error and identify every listed resource or module.",
      },
      caution:
        "Use the correct backend, workspace, variables, and credentials. A plan can refresh " +
        "remote objects and invoke provider APIs; follow production access policy.",
    },
    {
      step: 2,
      name: "Read the complete cycle path",
      actions: [
        "Copy the full cycle error from CI logs.",
        "List every resource, data source, and module address mentioned.",
        "Trace the order in which Terraform reports the cycle.",
        "Separate direct references from indirect module or lifecycle dependencies.",
      ],
      example:
        "Example only: aws_security_group.app -> aws_instance.app -> " +
        "data.aws_instance.app -> aws_security_group.app",
      interpretation:
        "The cycle path is evidence about the dependency graph. Do not assume the first " +
        "resource named is necessarily the best resource to change.",
    },
    {
      step: 3,
      name: "Search resource and module references",
      commands: [
        "grep -RInE 'depends_on|for_each|count|create_before_destroy' --include='*.tf' .",
        "grep -RInE 'module\\.|data\\.|\\.id|\\.arn|\\.name' --include='*.tf' .",
        "git diff -- '*.tf'",
      ],
      inspect: [
        "Implicit references inside arguments",
        "Explicit depends_on blocks",
        "Module inputs that consume another module's outputs",
        "Module outputs that depend on resources from another module",
        "Data sources that read objects whose creation depends on the data source",
        "Conditional expressions and collection keys",
        "Lifecycle rules and replacement ordering",
      ],
      note:
        "Text searches are a starting point, not a complete parser. Inspect the actual HCL expressions " +
        "and module source, including nested modules.",
    },
    {
      step: 4,
      name: "Build the dependency graph",
      commands: [
        "terraform graph -type=plan > dependency-graph.dot",
        "terraform graph -draw-cycles -type=plan > dependency-cycles.dot",
      ],
      inspect: [
        "Edges between resources and data sources",
        "Module expansion and internal dependencies",
        "The cycle-marked edges, if supported by the installed Terraform version",
        "Whether a dependency is explicit, implicit, or introduced by lifecycle ordering",
      ],
      caution:
        "Graph output may be large and can include implementation details. Keep it in approved " +
        "engineering storage. Graph commands are diagnostic aids; the complete plan error remains important.",
    },
    {
      step: 5,
      name: "Inspect explicit depends_on",
      checks: [
        "Does each depends_on represent a real ordering requirement?",
        "Was depends_on added to a whole module when a narrower reference would suffice?",
        "Does a dependency point back to a resource that already depends on this resource?",
        "Can an unnecessary explicit edge be removed without weakening required ordering?",
      ],
      rule:
        "Do not delete depends_on automatically. First verify that the dependency is redundant and that " +
        "the resulting ordering is safe.",
    },
    {
      step: 6,
      name: "Inspect implicit resource references",
      checks: [
        "Does resource A consume an attribute from B while B also consumes an attribute from A?",
        "Can the shared value be produced by an independent resource or input?",
        "Can one resource be created before the other without violating security or availability requirements?",
        "Are two resource blocks trying to manage the same relationship?",
      ],
      rule:
        "Attribute references create implicit dependencies even when no depends_on block exists.",
    },
    {
      step: 7,
      name: "Investigate module-level cycles",
      checks: [
        "Does module A consume an output from module B?",
        "Does module B indirectly consume an output from module A?",
        "Are modules coupled through security groups, IAM, DNS, or network outputs?",
        "Can a shared prerequisite be moved to a separate foundational module?",
        "Can module inputs use independently known identifiers rather than circular outputs?",
      ],
      rule:
        "A module boundary does not remove dependency cycles. Inspect the expanded resource-level relationships.",
    },
    {
      step: 8,
      name: "Inspect data sources and conditional expressions",
      checks: [
        "Does a data source read a resource that depends on the data source?",
        "Is a resource's count or for_each expression derived from a resource that depends on it?",
        "Are conditional branches creating references that remain part of the dependency graph?",
        "Can the required input be supplied directly or derived from an independent source?",
      ],
      caution:
        "Do not assume count = 0 or an unselected conditional branch will always eliminate a graph cycle.",
    },
    {
      step: 9,
      name: "Inspect lifecycle and replacement behavior",
      checks: [
        "Does create_before_destroy create a new ordering requirement?",
        "Do replacement dependencies conflict with existing dependency edges?",
        "Is a name or unique identifier preventing old and new resources from coexisting?",
        "Could removing a lifecycle rule cause downtime or destroy-before-create behavior?",
      ],
      rule:
        "Lifecycle changes can alter outage and replacement behavior. Review the plan and provider semantics before changing them.",
    },
    {
      step: 10,
      name: "Compare with last-known-good code",
      commands: [
        "git log --oneline -10",
        "git diff LAST_GOOD_COMMIT..HEAD -- '*.tf'",
      ],
      inspect: [
        "New references and depends_on blocks",
        "Module input/output changes",
        "Provider and module version changes",
        "Lifecycle changes",
        "Variable and conditional expression changes",
      ],
      rule:
        "A recent change is a lead, not proof. Confirm the exact edge that closes the cycle.",
    },
    {
      step: 11,
      name: "Make the smallest safe correction",
      actions: [
        "Document the confirmed circular dependency.",
        "Identify the smallest configuration change that removes the unnecessary edge.",
        "Preserve required security and creation ordering.",
        "Run formatting and validation.",
        "Generate a fresh plan using the correct environment inputs.",
        "Review all create, update, delete, and replacement actions.",
      ],
    },
  ],

  rootCauseMatrix: [
    {
      symptom: "Cycle lists two resources referencing each other",
      likelyCause: "Mutual implicit attribute references",
      evidence: "Both resource blocks consume attributes from the other",
      recovery:
        "Break the circular design by introducing an independent input, prerequisite, or separate relationship resource.",
    },
    {
      symptom: "Cycle appears after adding depends_on",
      likelyCause: "Redundant or contradictory explicit ordering",
      evidence: "The new edge closes a path that already leads back to the dependent object",
      recovery:
        "Remove or narrow only the unnecessary edge after verifying the real ordering requirement.",
    },
    {
      symptom: "Cycle includes multiple modules",
      likelyCause: "Circular module input/output contracts",
      evidence: "Module A output feeds B, while B output feeds A directly or indirectly",
      recovery:
        "Move shared prerequisites into a separate foundational module or redesign the module interface.",
    },
    {
      symptom: "Cycle includes a data source",
      likelyCause: "Data source reads an object whose creation depends on the data source",
      evidence: "Data source reference closes a resource dependency path",
      recovery:
        "Use an independent input or remove the unnecessary read-after-create dependency.",
    },
    {
      symptom: "Cycle begins after lifecycle change",
      likelyCause: "Replacement ordering conflicts with existing dependencies",
      evidence: "The plan graph and lifecycle configuration show incompatible ordering",
      recovery:
        "Redesign replacement or naming strategy and review downtime and deletion implications.",
    },
    {
      symptom: "Cycle appears after provider/module upgrade",
      likelyCause: "Changed configuration behavior or newly exposed graph relationship",
      evidence: "Version diff and minimal reproduction identify the change",
      recovery:
        "Confirm the cause, then pin or revert the incompatible change only if that is the approved safe fix.",
    },
  ],

  remediationPatterns: [
    {
      scenario: "Two security groups reference each other",
      unsafeApproach:
        "Blindly remove a security rule or dependency and risk losing required traffic controls.",
      saferApproach:
        "Consider standalone security-group rule resources where appropriate, so both groups can exist before reciprocal rules are attached.",
      validate: [
        "Required traffic direction and ports remain correct",
        "Rules do not duplicate inline and standalone management",
        "Plan contains no unintended security-rule deletion",
      ],
    },
    {
      scenario: "Two modules depend on each other's outputs",
      unsafeApproach:
        "Add more depends_on blocks in both modules.",
      saferApproach:
        "Extract shared prerequisites into a third module, pass independent IDs as inputs, and keep module dependencies one-directional.",
      validate: [
        "The module graph is acyclic",
        "Output contracts are clear",
        "Resource ownership remains unambiguous",
      ],
    },
    {
      scenario: "IAM policy and workload configuration are coupled",
      unsafeApproach:
        "Use a broad dependency or remove required IAM ordering without analysis.",
      saferApproach:
        "Separate role/policy prerequisites from workload resources where feasible and reference the required ARN explicitly.",
      validate: [
        "The workload still receives the intended role",
        "Required policy attachment ordering is preserved",
        "No broad or unintended permissions are introduced",
      ],
    },
    {
      scenario: "Data source reads a resource that depends on it",
      unsafeApproach:
        "Keep both sides and add more dependencies.",
      saferApproach:
        "Use a known input, a direct resource attribute, or an independent discovery step when appropriate.",
      validate: [
        "The data source no longer closes a dependency loop",
        "The value is valid for the selected environment",
        "The plan does not introduce unintended replacement",
      ],
    },
  ],

  recoveryPlan: {
    sequence: [
      "Confirm whether any previous apply changed real infrastructure.",
      "Capture the complete error and current Git diff.",
      "Map the circular path and identify its cause.",
      "Implement the smallest reviewed correction.",
      "Run terraform fmt -check -recursive.",
      "Run terraform init -lockfile=readonly when appropriate.",
      "Run terraform validate.",
      "Run terraform plan with the correct backend, workspace, and variables.",
      "Inspect every planned deletion, replacement, and security-sensitive change.",
      "Obtain production approval before applying.",
      "Apply only the reviewed plan according to the deployment process.",
      "Verify resource health, application behavior, and Terraform state afterward.",
    ],
    rollback:
      "A planning-time cycle generally does not itself require infrastructure rollback. " +
      "If another operation already changed infrastructure, assess that actual change separately. " +
      "Revert configuration only when the last-known-good version is compatible and the resulting " +
      "plan is reviewed; reverting code alone does not undo completed cloud changes.",
    neverDo: [
      "Do not repeatedly apply unchanged configuration expecting the cycle to disappear.",
      "Do not remove arbitrary references without tracing the graph.",
      "Do not weaken security rules to bypass a cycle.",
      "Do not use terraform state rm as a generic cycle fix.",
      "Do not run terraform destroy as a troubleshooting shortcut.",
      "Do not ignore unexpected replacement actions in the recovery plan.",
    ],
  },

  postRecoveryValidation: [
    "terraform validate succeeds.",
    "The plan no longer reports a dependency cycle.",
    "The plan contains only intended actions.",
    "Security group rules, IAM relationships, and network dependencies remain correct.",
    "No unexpected resource replacement or deletion is planned.",
    "The approved deployment completes successfully.",
    "Application health checks and critical service endpoints pass.",
    "Terraform state and real infrastructure remain consistent.",
    "The deployment pipeline stays healthy through the observation window.",
  ],

  prevention: [
    "Keep module dependencies one-directional and module interfaces explicit.",
    "Prefer direct attribute references over unnecessary broad depends_on blocks.",
    "Review dependency graph changes during infrastructure code review.",
    "Run terraform fmt and terraform validate in CI.",
    "Generate and review plans before production apply.",
    "Add linting and policy checks appropriate to the repository.",
    "Pin Terraform/provider/module versions and review upgrades deliberately.",
    "Test shared modules in isolated environments before rollout.",
    "Avoid having multiple Terraform resources manage the same remote relationship.",
    "Document architectural prerequisites and resource ownership.",
    "Keep a last-known-good commit and tested recovery procedure.",
  ],

  incidentReportTemplate: {
    title: "Terraform Dependency Cycle Incident",
    fields: [
      "Incident ID, severity, owner, and timestamps",
      "Environment, workspace, root module, and commit SHA",
      "Terraform/provider/module versions",
      "Complete cycle error and affected resource addresses",
      "Customer or deployment impact",
      "Recent changes and dependency graph findings",
      "Confirmed root cause and supporting evidence",
      "Configuration correction and reviewed plan",
      "Approval and deployment result",
      "Post-deployment validation",
      "Preventive action, owner, and due date",
    ],
  },

  handsOnLabs: [
    {
      title: "Create a minimal circular dependency",
      task:
        "In a disposable local test configuration, create two resources with mutual references, " +
        "observe the cycle error, and document the dependency path.",
      expected:
        "Explain which graph edges form the loop and why Terraform cannot produce a valid order.",
    },
    {
      title: "Fix a module cycle",
      task:
        "Create two test modules with circular input/output dependencies, then extract a shared prerequisite.",
      expected:
        "The resulting module dependency direction is acyclic and its interfaces remain clear.",
    },
    {
      title: "Review a security group design",
      task:
        "Model reciprocal security-group rules and investigate a standalone rule-resource design.",
      expected:
        "A valid plan with correct traffic permissions and no duplicate rule ownership.",
    },
    {
      title: "Build a CI prevention check",
      task:
        "Run format, initialization, validation, and plan checks against a disposable test backend.",
      expected:
        "A cycle fails the pipeline before production approval or apply.",
    },
  ],

  interviewQuestions: [
    {
      question: "What is a Terraform dependency cycle?",
      answer:
        "A directed loop in the dependency graph where Terraform cannot determine a valid ordering for the involved objects.",
    },
    {
      question: "What is the difference between implicit and explicit dependencies?",
      answer:
        "Attribute references create implicit dependencies; depends_on declares explicit ordering requirements.",
    },
    {
      question: "How do you find a cycle?",
      answer:
        "Read the full cycle error, inspect referenced HCL and module contracts, and use terraform graph diagnostics.",
    },
    {
      question: "Can depends_on always fix a cycle?",
      answer:
        "No. It adds ordering edges and can introduce or preserve cycles; the underlying dependency design must be corrected.",
    },
    {
      question: "How do you troubleshoot a cycle spanning modules?",
      answer:
        "Trace module inputs and outputs, identify the circular contract, and move shared prerequisites into an independent module where appropriate.",
    },
    {
      question: "Can a cycle error damage running production infrastructure?",
      answer:
        "A planning-time cycle generally prevents a valid plan, but assess any earlier apply or independent changes separately.",
    },
    {
      question: "What do you check before applying the fix?",
      answer:
        "Correct environment, actual dependency cause, intended resource ordering, security impact, and all planned create/update/delete/replace actions.",
    },
    {
      question: "How do you prevent dependency cycles?",
      answer:
        "Use one-directional module contracts, minimize unnecessary explicit dependencies, validate in CI, and review plan and graph changes.",
    },
  ],
} as const;

export default dependencyCycleGuide;
