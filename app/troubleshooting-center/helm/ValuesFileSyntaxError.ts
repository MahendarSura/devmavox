
export interface ValuesSyntaxDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  interpretResults: string[];
  nextDecision: string;
  safetyNote?: string;
}

export interface ValuesSyntaxFailureCase {
  symptom: string;
  likelyCauses: string[];
  proveTheCause: string[];
  fix: string[];
  validate: string[];
  prevention: string[];
}

export interface ValuesSyntaxProductionIncident {
  scenario: string;
  impact: string;
  investigation: string[];
  recovery: string[];
  prevention: string[];
}

export interface ValuesFileSyntaxErrorGuide {
  title: string;
  slug: string;
  category: string;
  overview: string;
  severity: string[];
  symptoms: string[];
  objectives: string[];
  safetyChecks: string[];
  diagnosticWorkflow: ValuesSyntaxDiagnosticStep[];
  failureCases: ValuesSyntaxFailureCase[];
  productionIncidents: ValuesSyntaxProductionIncident[];
  recoveryRunbook: string[];
  preventionChecklist: string[];
  ciPipelineChecks: string[];
  handsOnLabs: { title: string; task: string; successCriteria: string[] }[];
  incidentReportTemplate: string[];
  interviewQuestions: { question: string; answer: string }[];
  officialReferences: { title: string; url: string }[];
}

export const valuesFileSyntaxErrorGuide: ValuesFileSyntaxErrorGuide = {
  title: "Helm Values File Syntax Errors — Production Troubleshooting",
  slug: "values-file-syntax-error",
  category: "Helm",

  overview:
    "Helm values files are YAML inputs used to configure chart templates. A malformed values file can stop manifest generation before a deployment begins. Other errors look similar but occur at different layers: valid YAML with the wrong data type, a missing required key, a values schema violation, an incorrect override, a chart rendering failure, or Kubernetes API rejection. Production troubleshooting must distinguish these layers, preserve evidence, validate the exact release inputs, and recover through the approved deployment process.",

  severity: [
    "SEV-1: An active production incident cannot be mitigated because the approved recovery chart or values cannot be rendered, or a wider release process is affecting critical services.",
    "SEV-2: A production release or critical hotfix is blocked, with a time-sensitive recovery requirement.",
    "SEV-3: A single application or non-production deployment is blocked.",
    "SEV-4: A non-blocking configuration-quality issue or a defect caught before release."
  ],

  symptoms: [
    "YAML parse error while loading values.yaml.",
    "did not find expected key.",
    "mapping values are not allowed in this context.",
    "found character that cannot start any token.",
    "could not find expected ':'.",
    "error converting YAML to JSON.",
    "duplicate mapping key or unexpected duplicate configuration.",
    "values do not meet the specifications of the schema.",
    "wrong type for value; expected string; got map.",
    "nil pointer evaluating interface while rendering a template.",
    "A chart works locally but fails in a CI/CD pipeline.",
    "The default values work, but production-specific values fail.",
    "A deployment succeeds with one values file but fails when another is added.",
    "Sensitive values accidentally appear in debug logs or rendered artifacts."
  ],

  objectives: [
    "Determine the exact affected release, environment, source revision, and deployment impact.",
    "Preserve the failed pipeline output and identify the exact values files and overrides used.",
    "Distinguish YAML syntax errors from schema, type, template, and Kubernetes validation errors.",
    "Reproduce the failure without changing production resources.",
    "Locate the first invalid line or incompatible value and prove the root cause.",
    "Correct the minimum necessary configuration and validate every supported environment.",
    "Recover through an approved, controlled release and verify application health.",
    "Prevent recurrence with YAML linting, chart schema validation, rendering tests, and artifact controls."
  ],

  safetyChecks: [
    "Confirm repository, branch, commit SHA, chart directory, release name, namespace, and environment.",
    "Record the last known good release and the exact failed job timestamp.",
    "List every values file in the command and preserve its ordering.",
    "Record --set, --set-string, --set-file, and --set-json overrides without exposing secret values.",
    "Determine whether the failed step was lint, template, install, upgrade, or part of a multi-stage pipeline.",
    "Do not assume a failed values parse means no earlier pipeline step changed the environment; inspect the complete deployment timeline.",
    "Use a clean working tree or clean CI checkout to reproduce the issue.",
    "Do not print complete production values files or Kubernetes Secret manifests into shared logs.",
    "Avoid editing live Kubernetes resources to compensate for a malformed Git configuration.",
    "Obtain production approval before changing release values, promoting a chart, or initiating rollback.",
    "Do not replace the entire production values file with defaults merely to make rendering succeed.",
    "Keep the original failing configuration and the approved correction available for incident review."
  ],

  diagnosticWorkflow: [
    {
      id: "1",
      title: "Establish the incident boundary",
      objective:
        "Confirm the environment, release, and actual impact before troubleshooting.",
      commands: [
        "git status --short",
        "git rev-parse HEAD",
        "helm version --short",
        "helm list -A",
        "kubectl config current-context"
      ],
      interpretResults: [
        "An unexpected commit or dirty working tree means local tests may not match the release artifact.",
        "A wrong context or namespace can cause the investigation to focus on the wrong environment.",
        "helm list -A helps identify releases but does not prove workload health.",
        "A failed values parsing step generally blocks that Helm invocation before its manifests can be applied; earlier pipeline stages may still have changed resources."
      ],
      nextDecision:
        "Identify the exact failed job and release. If customer traffic is affected, initiate incident mitigation while preserving diagnostic evidence.",
      safetyNote:
        "Use approved credentials and avoid sharing full release metadata or secret values."
    },
    {
      id: "2",
      title: "Capture the first error and the exact command",
      objective:
        "Find the first meaningful parse error rather than debugging the last pipeline message.",
      commands: [
        "helm lint ./chart -f values.yaml",
        "helm template demo ./chart -n staging -f values.yaml",
        "git diff --check"
      ],
      interpretResults: [
        "The first YAML line/column reported is the starting point, not always the actual location of the mistake.",
        "A missing quote or colon on an earlier line may cause the parser to report an error several lines later.",
        "If helm lint and helm template fail with the same parse error, inspect the values input before inspecting application runtime.",
        "If parsing succeeds but rendering fails, move to values types, chart schema, and template expressions."
      ],
      nextDecision:
        "Reproduce with the same chart and values file order used in CI. Record the command, error, commit, and tool version."
    },
    {
      id: "3",
      title: "Verify the working directory and file path",
      objective:
        "Rule out a missing or incorrect values file.",
      commands: [
        "pwd",
        "git status --short",
        "git ls-files '*values*.yaml' '*values*.yml'",
        "helm show values ./chart"
      ],
      interpretResults: [
        "A path error is different from a YAML syntax error.",
        "A generated file may exist locally but be absent from the CI workspace.",
        "A similarly named file in another directory may contain different configuration.",
        "The chart's default values are not necessarily the environment values used by the release."
      ],
      nextDecision:
        "Use explicit relative paths from the verified repository root and confirm the required file exists before Helm runs."
    },
    {
      id: "4",
      title: "Validate YAML syntax independently",
      objective:
        "Separate malformed YAML from Helm-specific problems.",
      commands: [
        "python -c \"import yaml; yaml.safe_load(open('chart/values.yaml', encoding='utf-8')); print('YAML syntax OK')\"",
        "yamllint chart/values.yaml",
        "helm lint ./chart -f chart/values.yaml"
      ],
      interpretResults: [
        "A YAML parser error points to syntax, indentation, quoting, or structure.",
        "yamllint may also report style issues; distinguish warnings from the blocking parse error.",
        "YAML syntax can be valid even when the chart rejects the value types or required fields.",
        "The Python command requires PyYAML to be installed; use the project's pinned validation environment."
      ],
      nextDecision:
        "If YAML parsing fails, fix the reported structure first. If parsing passes, continue with chart schema and expected value types.",
      safetyNote:
        "Run syntax checks locally or in CI. Do not upload production values files to public online YAML validators."
    },
    {
      id: "5",
      title: "Inspect indentation, tabs, and nested mappings",
      objective:
        "Find structural errors in nested configuration.",
      commands: [
        "git diff -- chart/values.yaml",
        "git diff --check",
        "yamllint chart/values.yaml"
      ],
      interpretResults: [
        "YAML indentation expresses nesting; visually aligned text can still represent a different structure.",
        "Tabs used for indentation are invalid YAML indentation.",
        "A list item aligned at the wrong level can change a list into a mapping or vice versa.",
        "A key at the wrong indentation can silently move a setting into a different parent when the YAML remains valid."
      ],
      nextDecision:
        "Compare the failing section against the chart's documented structure and verify the parsed data type after correction."
    },
    {
      id: "6",
      title: "Check quotes, colons, booleans, and special characters",
      objective:
        "Identify values that YAML interprets differently from the author's intent.",
      commands: [
        "git diff -- chart/values.yaml",
        "python -c \"import yaml; print(type(yaml.safe_load(open('chart/values.yaml', encoding='utf-8'))).__name__)\""
      ],
      interpretResults: [
        "A colon followed by a space can be interpreted as a mapping delimiter in an unquoted scalar.",
        "Special characters such as # may begin a comment outside quotes.",
        "Values that look like booleans or numbers may be parsed as non-string types.",
        "An invalid escape sequence or unmatched quote can cause a parse failure."
      ],
      nextDecision:
        "Quote values that are intended to be strings and use the correct YAML scalar style for multiline content. Validate again with the same parser used by the deployment toolchain."
    },
    {
      id: "7",
      title: "Detect duplicate keys and accidental overrides",
      objective:
        "Find configuration that parses but produces unexpected results.",
      commands: [
        "yamllint chart/values.yaml",
        "git diff -- chart/values.yaml"
      ],
      interpretResults: [
        "Duplicate mapping keys may be rejected, warned about, or interpreted differently by parsers.",
        "A duplicated key can cause an earlier intended value to be ignored.",
        "The final effective value may be changed again by another values file or command-line override.",
        "A successful parse is not sufficient evidence that the correct configuration will be used."
      ],
      nextDecision:
        "Remove accidental duplicates and confirm the intended value precedence using the exact Helm command."
    },
    {
      id: "8",
      title: "Verify chart schema and expected value types",
      objective:
        "Distinguish valid YAML from invalid chart configuration.",
      commands: [
        "helm lint ./chart -f values.yaml",
        "helm template demo ./chart -n staging -f values.yaml"
      ],
      interpretResults: [
        "A chart schema error means the values do not satisfy the chart's declared contract.",
        "A string supplied where a map or list is expected can parse successfully but break the chart.",
        "A missing mandatory value can produce a schema or template error rather than a YAML parser error.",
        "If the chart has no values.schema.json, some incorrect types may not be caught until template rendering."
      ],
      nextDecision:
        "Compare the input against values.yaml, values.schema.json, and the exact template expression. Fix the contract mismatch instead of disabling validation."
    },
    {
      id: "9",
      title: "Trace values-file precedence",
      objective:
        "Explain why a value is correct in one file but wrong in the final render.",
      commands: [
        "helm template demo ./chart -n staging -f values.yaml -f values-staging.yaml",
        "helm show values ./chart"
      ],
      interpretResults: [
        "Later -f values files override earlier files for overlapping keys.",
        "Command-line overrides can supersede file values.",
        "An environment file can replace a nested object or change a value's type.",
        "Testing one values file in isolation does not prove that the complete release command will succeed."
      ],
      nextDecision:
        "Reproduce the exact order and override flags from CI. Correct the file or override that introduces the mismatch."
    },
    {
      id: "10",
      title: "Inspect multiline values and embedded configuration",
      objective:
        "Validate certificates, scripts, configuration snippets, and block scalars.",
      commands: [
        "git diff -- chart/values.yaml",
        "yamllint chart/values.yaml",
        "helm template demo ./chart -n staging -f values.yaml"
      ],
      interpretResults: [
        "Incorrect indentation in a block scalar can change or invalidate embedded content.",
        "Literal and folded block styles have different newline behavior.",
        "A YAML file can parse successfully while an embedded script or application configuration remains invalid.",
        "Certificate and private-key material must not be printed during debugging."
      ],
      nextDecision:
        "Validate the YAML container first, then validate the embedded content with its own parser or tool using safe test fixtures."
    },
    {
      id: "11",
      title: "Compare local and CI execution",
      objective:
        "Determine why the same change behaves differently across environments.",
      commands: [
        "helm version --short",
        "git rev-parse HEAD",
        "git status --short",
        "helm dependency list ./chart"
      ],
      interpretResults: [
        "Different commits, chart packages, generated files, or Helm versions can explain inconsistent behavior.",
        "A local untracked values file may conceal a missing-file problem in CI.",
        "The CI pipeline may merge multiple values files that were not used locally.",
        "Dependency generation and custom plugins may differ between the developer workstation and CI container."
      ],
      nextDecision:
        "Reproduce inside the same pinned CI image with a clean checkout and the exact non-secret command inputs."
    },
    {
      id: "12",
      title: "Validate the corrected configuration and rendered manifests",
      objective:
        "Prove that the correction works before any production mutation.",
      commands: [
        "helm lint ./chart -f values-staging.yaml",
        "helm template demo ./chart -n staging -f values-staging.yaml > rendered.yaml",
        "kubectl apply --dry-run=client -f rendered.yaml",
        "kubectl apply --dry-run=server -f rendered.yaml"
      ],
      interpretResults: [
        "A successful lint and render prove that the tested chart and values can generate manifests.",
        "Client dry-run is not a complete substitute for API-server validation.",
        "Server-side dry-run can reveal API schema, admission, and permission problems but requires cluster connectivity and appropriate authorization.",
        "Neither dry-run proves the application will become healthy after deployment."
      ],
      nextDecision:
        "Review the output and diff, promote the same tested artifact through the approved pipeline, and verify runtime health after deployment.",
      safetyNote:
        "Use an approved non-production cluster for server-side checks. Rendered files may contain secrets and should be handled accordingly."
    }
  ],

  failureCases: [
    {
      symptom: "YAML parser reports 'did not find expected key'",
      likelyCauses: [
        "Incorrect indentation.",
        "A missing colon or malformed mapping.",
        "An unclosed quote on an earlier line.",
        "A list item placed at the wrong level."
      ],
      proveTheCause: [
        "Inspect the reported line and the preceding lines.",
        "Run the same YAML parser against the file.",
        "Compare the affected structure with the expected chart values shape."
      ],
      fix: [
        "Correct the indentation and mapping/list structure.",
        "Add the missing delimiter or close the intended quoted scalar.",
        "Keep the original file and apply a minimal diff."
      ],
      validate: [
        "Run yamllint and the project's YAML parser.",
        "Run helm lint and helm template with the affected values file."
      ],
      prevention: [
        "Add YAML linting to CI.",
        "Use editor YAML validation and consistent indentation.",
        "Review the final diff before release."
      ]
    },
    {
      symptom: "YAML parser reports 'mapping values are not allowed in this context'",
      likelyCauses: [
        "An unquoted string contains a colon followed by a space.",
        "A key/value pair is malformed.",
        "A multiline value is incorrectly indented."
      ],
      proveTheCause: [
        "Inspect the line and surrounding mapping.",
        "Quote the intended scalar in a temporary test and re-run the parser.",
        "Check whether the same content is generated from a template or pipeline substitution."
      ],
      fix: [
        "Quote the intended string where appropriate.",
        "Correct malformed mappings or block scalar indentation.",
        "Avoid constructing YAML by unsafe string concatenation."
      ],
      validate: [
        "Parse the values file.",
        "Render the chart and inspect the resulting field type."
      ],
      prevention: [
        "Use proper YAML serializers when generating files.",
        "Test values containing colons and special characters."
      ]
    },
    {
      symptom: "YAML parser reports 'found character that cannot start any token'",
      likelyCauses: [
        "A tab character is used for indentation.",
        "An invalid token or unexpected character is present.",
        "A quote or special character was inserted incorrectly."
      ],
      proveTheCause: [
        "Inspect the exact line in an editor that displays whitespace.",
        "Review recent generated-file or variable-substitution steps.",
        "Compare the file with the last known good commit."
      ],
      fix: [
        "Replace indentation tabs with spaces.",
        "Correct the malformed token or quoting.",
        "Fix the generation step if it reintroduces the invalid character."
      ],
      validate: [
        "Run YAML lint and Helm render checks.",
        "Repeat generation from a clean workspace."
      ],
      prevention: [
        "Use a consistent editor configuration.",
        "Lint generated and hand-written values files."
      ]
    },
    {
      symptom: "The values file parses but Helm rejects a value's type",
      likelyCauses: [
        "A string is provided where a map or list is expected.",
        "A number or boolean is supplied where a string is required.",
        "A values override changes the shape of a nested object."
      ],
      proveTheCause: [
        "Inspect values.yaml and values.schema.json.",
        "Check the template's expected access pattern.",
        "Render with each values file separately, then with the exact combined command."
      ],
      fix: [
        "Restore the documented type and structure.",
        "Correct the override that changes the value shape.",
        "Update the chart schema only if the intended contract has genuinely changed."
      ],
      validate: [
        "Run lint and rendering with every supported environment configuration.",
        "Test the boundary values expected by the chart."
      ],
      prevention: [
        "Maintain values.schema.json.",
        "Use typed values fixtures in CI.",
        "Review breaking chart configuration changes."
      ]
    },
    {
      symptom: "A key exists but Helm behaves as though it is missing",
      likelyCauses: [
        "A different values file is being used.",
        "A later values file or command-line flag overrides the key.",
        "The key is nested under the wrong parent.",
        "The chart is a subchart with a different values scope."
      ],
      proveTheCause: [
        "Inspect the exact release command and file order.",
        "Compare the values key path with the chart and subchart contract.",
        "Use a safe non-secret fixture to identify the rendered branch."
      ],
      fix: [
        "Correct the key path or nesting.",
        "Correct values-file precedence or command-line overrides.",
        "Update documentation if the chart's configuration contract changed."
      ],
      validate: [
        "Run the complete production-equivalent render command.",
        "Inspect the intended non-secret field in the rendered manifest."
      ],
      prevention: [
        "Document override precedence.",
        "Keep environment overrides small and reviewed.",
        "Validate all supported values files."
      ]
    },
    {
      symptom: "Local rendering works but CI fails",
      likelyCauses: [
        "A local untracked values file is missing from CI.",
        "Different working directory or relative path.",
        "Different Helm version or dependency state.",
        "A CI variable substitution produces malformed YAML."
      ],
      proveTheCause: [
        "Compare commit SHA, exact command, tool version, and file existence.",
        "Inspect the CI generation step without printing secret values.",
        "Reproduce inside the same container with a clean checkout."
      ],
      fix: [
        "Use explicit paths and verify required files before rendering.",
        "Pin the toolchain and dependencies.",
        "Correct the generation step or input contract."
      ],
      validate: [
        "Re-run the complete pipeline validation from a clean workspace.",
        "Confirm the same immutable artifact is used for deployment."
      ],
      prevention: [
        "Pin CI images and tool versions.",
        "Store artifact digests.",
        "Fail early when required configuration files are missing."
      ]
    },
    {
      symptom: "Duplicate keys produce unexpected configuration",
      likelyCauses: [
        "A key was copied and edited without removing the original.",
        "A merge or generation process emits the same key more than once.",
        "The parser and lint rules handle duplicate keys differently."
      ],
      proveTheCause: [
        "Run YAML lint.",
        "Search for repeated occurrences of the key in the affected mapping.",
        "Inspect the parsed result using the project's actual YAML parser."
      ],
      fix: [
        "Remove unintended duplicate keys.",
        "Define one authoritative value in the correct mapping.",
        "Correct the generator if duplicates are created automatically."
      ],
      validate: [
        "Run lint and render validation.",
        "Verify the final effective value."
      ],
      prevention: [
        "Enable duplicate-key lint rules.",
        "Review generated configuration diffs.",
        "Avoid merging raw YAML fragments without validation."
      ]
    },
    {
      symptom: "Multiline script or certificate value breaks YAML",
      likelyCauses: [
        "Block scalar indentation is incorrect.",
        "The wrong literal or folded block style is used.",
        "A pipeline replaces newlines or injects special characters.",
        "Sensitive content was copied into the wrong YAML context."
      ],
      proveTheCause: [
        "Reproduce with a harmless fixture using the same generation process.",
        "Validate YAML structure separately from the embedded script or certificate.",
        "Check whether the original newline and indentation structure was preserved."
      ],
      fix: [
        "Use an appropriate literal block scalar or a safe serializer.",
        "Preserve the intended newlines and indentation.",
        "Store production credentials in an approved secret manager rather than embedding them in ordinary values files."
      ],
      validate: [
        "Run YAML lint and Helm rendering.",
        "Validate the embedded script or application configuration using its own tool."
      ],
      prevention: [
        "Use secret-management integrations.",
        "Test multiline fixtures in CI.",
        "Redact sensitive material from pipeline output."
      ]
    },
    {
      symptom: "Helm reports a values schema validation error",
      likelyCauses: [
        "A required property is absent.",
        "A value has the wrong type or violates an enum or pattern.",
        "The values file follows an old chart contract."
      ],
      proveTheCause: [
        "Inspect the schema error and the chart's values.schema.json.",
        "Compare the failed values with the versioned chart contract.",
        "Determine whether the change is an intended breaking change."
      ],
      fix: [
        "Supply a value matching the documented schema.",
        "Migrate environment configuration as part of the reviewed chart upgrade.",
        "Update the schema only when the supported contract should actually change."
      ],
      validate: [
        "Run helm lint and helm template against all supported environment values.",
        "Test upgrade compatibility with a last-known-good fixture."
      ],
      prevention: [
        "Version the chart configuration contract.",
        "Keep migration notes for renamed or removed values.",
        "Validate values against schemas in CI."
      ]
    },
    {
      symptom: "A values file parses but rendered Kubernetes manifests are invalid",
      likelyCauses: [
        "The template emits an invalid field type.",
        "The selected value produces malformed manifest structure.",
        "The target cluster API schema rejects the resource.",
        "An admission policy rejects the manifest."
      ],
      proveTheCause: [
        "Render the chart and inspect the failing object.",
        "Validate the rendered YAML independently.",
        "Use an approved server-side dry-run to capture API validation errors."
      ],
      fix: [
        "Correct the values contract or template output.",
        "Use API versions supported by the target cluster.",
        "Address admission policy violations rather than bypassing them."
      ],
      validate: [
        "Run lint, rendering, schema validation, and approved server-side dry-run.",
        "After deployment, verify rollout and application health."
      ],
      prevention: [
        "Test rendered manifests against supported Kubernetes versions.",
        "Add schema and policy validation to CI.",
        "Keep chart and cluster compatibility documented."
      ]
    }
  ],

  productionIncidents: [
    {
      scenario:
        "A production release suddenly fails because the environment-specific values file has malformed YAML.",
      impact:
        "The release is blocked. The existing application may still be running, but the planned change cannot be promoted. Earlier pipeline stages must be checked for side effects.",
      investigation: [
        "Record the failed commit, release candidate, exact Helm command, and job timestamp.",
        "Compare the failing values file with the last known good version.",
        "Run the same YAML parser against the exact file used by the pipeline.",
        "Inspect the reported line and preceding lines for indentation, quotes, missing colons, or list structure.",
        "Confirm whether any earlier pipeline stage applied infrastructure or cluster changes."
      ],
      recovery: [
        "Make a minimal correction in the correct source file.",
        "Run YAML lint, Helm lint, and rendering using the complete environment-specific inputs.",
        "Review the rendered diff and obtain required production approval.",
        "Promote the tested artifact through the normal pipeline.",
        "Verify rollout, endpoints, error rate, and critical application flows."
      ],
      prevention: [
        "Run YAML and Helm validation on every pull request.",
        "Test every supported environment values file.",
        "Require review for production values changes.",
        "Retain the last known good chart and values artifact."
      ]
    },
    {
      scenario:
        "A CI variable substitution turns a previously valid values file into invalid YAML.",
      impact:
        "A release fails only in CI, often after a secret, image tag, hostname, or generated configuration was injected.",
      investigation: [
        "Compare the committed values template with the generated CI file.",
        "Identify which substitution step produced the malformed output.",
        "Reproduce using harmless sample values with the same generation logic.",
        "Check for unescaped colons, comment markers, quotes, newline loss, or unexpected empty values.",
        "Avoid logging the actual production secret or token."
      ],
      recovery: [
        "Correct the generator to serialize values safely rather than performing unsafe text replacement.",
        "Validate the generated file before invoking Helm.",
        "Re-run the complete pipeline with approved inputs.",
        "Verify that the intended value reaches the rendered manifest without leaking secrets."
      ],
      prevention: [
        "Use a YAML serializer or structured values-generation method.",
        "Use secret-management integrations.",
        "Add generated-file parsing tests and secret scanning.",
        "Keep secret values out of CI logs and build artifacts."
      ]
    },
    {
      scenario:
        "The YAML is valid, but the production chart rejects a field because the environment values use an outdated structure.",
      impact:
        "The chart upgrade is blocked even though syntax validation passes.",
      investigation: [
        "Compare the current chart's values schema with the environment values.",
        "Inspect recent changes to key names, types, required properties, and nested objects.",
        "Render the same values against the last known good chart and the proposed chart.",
        "Determine whether the schema change is intentional and backward compatible."
      ],
      recovery: [
        "Migrate the environment values to the approved chart contract.",
        "Test all environments and render the final manifests.",
        "Promote only after compatibility checks and change approval.",
        "If the new chart is unsafe and a compatible rollback artifact exists, use the approved rollback plan."
      ],
      prevention: [
        "Version chart configuration contracts.",
        "Keep values schemas and migration guides.",
        "Test upgrades against previous environment fixtures.",
        "Avoid unannounced breaking changes to shared charts."
      ]
    },
    {
      scenario:
        "An emergency rollback is delayed because the historical chart or values inputs are unavailable.",
      impact:
        "Recovery takes longer during a production incident and teams may be tempted to deploy untested defaults.",
      investigation: [
        "Identify the last known good release revision and chart artifact.",
        "Determine which values files and tool versions were used by that release.",
        "Check artifact retention, repository history, and release metadata.",
        "Evaluate whether a rollback would be safe for database migrations and external dependencies."
      ],
      recovery: [
        "Restore the exact historical artifact and required configuration where available.",
        "Validate rendering and recovery steps in an approved environment when time and incident conditions permit.",
        "Use the documented rollback or forward-fix strategy after impact and risk review.",
        "Verify service health and data integrity after recovery."
      ],
      prevention: [
        "Retain immutable chart packages and configuration revision identifiers.",
        "Test rollback regularly.",
        "Document irreversible migrations and external side effects.",
        "Keep recovery artifacts accessible under least-privilege controls."
      ]
    }
  ],

  recoveryRunbook: [
    "Declare severity and identify the release, environment, and incident owner.",
    "Record the failed command, job timestamp, commit SHA, chart version, and exact values-file order.",
    "Preserve the original error output and compare against the last known good revision.",
    "Reproduce the error without making production changes.",
    "Classify the issue as YAML syntax, file/path, duplicate key, values precedence, schema/type, template rendering, or Kubernetes validation.",
    "Prove the root cause using parser output, a minimal reproducer, or a controlled comparison.",
    "Apply the smallest reviewed fix in the source of truth.",
    "Run YAML lint, Helm lint, rendering, and rendered-manifest validation.",
    "Review the release diff, change approval, and rollback risks.",
    "Promote the same tested artifact through the approved pipeline.",
    "Validate rollout health, endpoints, application requests, logs, and service-level indicators.",
    "Record the timeline, evidence, root cause, remediation, and preventive actions."
  ],

  preventionChecklist: [
    "Use consistent spaces and YAML editor validation.",
    "Run yamllint and the project's actual YAML parser in CI.",
    "Run helm lint and helm template with every supported values file.",
    "Maintain values.schema.json for chart configuration contracts.",
    "Test absent, null, false, zero, empty, and populated values where relevant.",
    "Check duplicate keys and unexpected type changes.",
    "Validate exact values-file order and command-line overrides.",
    "Pin Helm, chart dependencies, and CI toolchain versions.",
    "Use clean workspaces and immutable chart artifacts.",
    "Use safe serializers for generated YAML.",
    "Keep credentials in an approved secret-management system.",
    "Redact secret material from logs and rendered files.",
    "Retain last known good artifacts and test rollback procedures.",
    "Review production configuration changes and validate application health after deployment."
  ],

  ciPipelineChecks: [
    "Verify the chart path and all required values files exist.",
    "Record the commit SHA, Helm version, and chart version.",
    "Run YAML syntax validation and linting.",
    "Build dependencies from the declared lock file where applicable.",
    "Run helm lint against each supported environment values file.",
    "Run helm template with the exact release context, file order, and non-secret overrides.",
    "Validate the generated YAML and Kubernetes schemas.",
    "Use approved server-side dry-run checks where practical.",
    "Detect accidental duplicate keys and unexpected configuration type changes.",
    "Redact secrets from logs and avoid publishing sensitive rendered manifests.",
    "Store immutable artifacts and their digests.",
    "Require approval for production promotions and destructive changes.",
    "Run post-deployment rollout and application smoke tests.",
    "Retain release metadata and the last known good artifact."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Indentation failure",
      task:
        "Create a harmless test values file with a nested image configuration at the wrong indentation level. Run YAML validation and repair it.",
      successCriteria: [
        "The parser identifies the malformed structure.",
        "The correction is minimal and reviewed in a diff.",
        "YAML lint and Helm rendering pass."
      ]
    },
    {
      title: "Lab 2 — Values precedence",
      task:
        "Create two non-production values files that set the same key. Render using both file orders and observe the final result.",
      successCriteria: [
        "The later file's precedence is understood.",
        "The exact CI order is documented.",
        "The rendered output matches the intended environment configuration."
      ]
    },
    {
      title: "Lab 3 — Schema/type mismatch",
      task:
        "Provide a scalar where a test chart expects a map. Compare YAML parsing with Helm schema validation.",
      successCriteria: [
        "YAML syntax validation succeeds.",
        "Chart validation identifies the incompatible configuration.",
        "The corrected values satisfy the chart contract."
      ]
    },
    {
      title: "Lab 4 — CI-only generation failure",
      task:
        "Use harmless sample values containing colons, quotes, and newlines to test a values-generation script.",
      successCriteria: [
        "The test reproduces or rules out unsafe substitution.",
        "The generator produces valid YAML.",
        "Logs do not expose sensitive values."
      ]
    },
    {
      title: "Lab 5 — Controlled release validation",
      task:
        "Render a chart using staging values and validate the generated manifests in a test environment.",
      successCriteria: [
        "Lint, rendering, and schema validation pass.",
        "The diff is reviewed before application.",
        "Workload health and application smoke tests are verified after deployment."
      ]
    }
  ],

  incidentReportTemplate: [
    "Incident ID and severity:",
    "Affected service, environment, namespace, and release:",
    "Incident start and detection time:",
    "Last known good commit, chart version, and values artifact:",
    "Exact failing command and first error:",
    "Customer impact and duration:",
    "Evidence collected and diagnostic branches followed:",
    "Confirmed root cause and supporting evidence:",
    "Corrective action and approved recovery:",
    "Validation results and service health after recovery:",
    "Rollback decision and data-integrity considerations:",
    "Preventive CI, monitoring, and documentation changes:",
    "Action owner and due date:"
  ],

  interviewQuestions: [
    {
      question: "What is the difference between a YAML syntax error and a Helm values schema error?",
      answer:
        "A YAML syntax error means the file cannot be parsed into valid YAML data. A schema error means YAML was parsed but its structure or values violate the chart's declared configuration contract."
    },
    {
      question: "Why can a YAML parser report an error several lines after the actual mistake?",
      answer:
        "An unmatched quote, missing delimiter, or incorrect indentation earlier in the file can change how subsequent lines are interpreted. Inspect the reported location and the preceding lines."
    },
    {
      question: "Why does Helm work locally but fail in CI?",
      answer:
        "The CI job may use a different working directory, commit, values-file order, generated file, Helm version, dependency state, or variable substitution. Reproduce in the same pinned container with a clean checkout."
    },
    {
      question: "How do multiple values files interact?",
      answer:
        "Later -f files override earlier files for overlapping values. Command-line overrides can take precedence as well. Test the complete release command rather than validating each file in isolation."
    },
    {
      question: "What is values.schema.json used for?",
      answer:
        "It declares the expected structure, data types, required fields, and other constraints for chart values. It can detect configuration mistakes that ordinary YAML parsing cannot."
    },
    {
      question: "How do you troubleshoot duplicate YAML keys?",
      answer:
        "Run duplicate-key lint checks, inspect the mapping, remove unintended duplicates, and validate the final parsed configuration with the project's actual parser."
    },
    {
      question: "How should multiline scripts or certificates be stored in values?",
      answer:
        "Use appropriate YAML block scalars or structured serialization, validate the embedded content separately, and avoid placing production secrets in ordinary values files or logs."
    },
    {
      question: "Does helm lint prove that a production deployment will work?",
      answer:
        "No. Lint and rendering catch chart/configuration problems but do not prove Kubernetes admission, scheduling, networking, storage, or application health. Validate manifests and test the running service separately."
    },
    {
      question: "What should be done first when a production values file fails to parse?",
      answer:
        "Establish impact, preserve the failed job and exact inputs, identify the affected release, reproduce without changing production, and prove the root cause before applying a minimal reviewed fix."
    },
    {
      question: "Why should secrets not be printed during troubleshooting?",
      answer:
        "CI logs and rendered artifacts may be retained or shared. Exposing tokens, passwords, or private keys creates a security incident unrelated to the original deployment failure."
    }
  ],

  officialReferences: [
    {
      title: "Helm Debugging Templates",
      url: "https://helm.sh/docs/chart_template_guide/debugging/"
    },
    {
      title: "Helm Values Files",
      url: "https://helm.sh/docs/chart_template_guide/values_files/"
    },
    {
      title: "Helm Chart Structure",
      url: "https://helm.sh/docs/topics/charts/"
    },
    {
      title: "Helm Chart Best Practices",
      url: "https://helm.sh/docs/chart_best_practices/"
    },
    {
      title: "Helm Commands",
      url: "https://helm.sh/docs/helm/"
    },
    {
      title: "YAML Specification",
      url: "https://yaml.org/spec/"
    }
  ]
};
