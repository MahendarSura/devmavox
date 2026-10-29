
export interface ArtifactDiagnosticStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  decisionLogic: string[];
  nextAction: string;
  risk: "low" | "medium" | "high";
}

export interface ArtifactFailureCase {
  title: string;
  symptoms: string[];
  likelyCauses: string[];
  diagnosticWorkflow: ArtifactDiagnosticStep[];
  resolution: string[];
  verification: string[];
  prevention: string[];
}

export interface ArtifactIncident {
  title: string;
  severity: string;
  scenario: string;
  impact: string[];
  investigation: string[];
  rootCauseIsolation: string[];
  recovery: string[];
  rollbackDecision: string;
  verification: string[];
}

export interface ArtifactUploadGuide {
  title: string;
  slug: string;
  category: string;
  description: string;
  symptoms: string[];
  severityMatrix: {
    severity: string;
    condition: string;
    response: string;
  }[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: ArtifactDiagnosticStep[];
  failureCases: ArtifactFailureCase[];
  incidentScenarios: ArtifactIncident[];
  commandReference: {
    command: string;
    purpose: string;
    interpretation: string;
  }[];
  recoveryRunbook: string[];
  prevention: string[];
  monitoring: string[];
  cicdValidation: string[];
  incidentReportTemplate: string[];
  labs: {
    title: string;
    objective: string;
    steps: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
    followUp?: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const artifactUploadGuide: ArtifactUploadGuide = {
  title: "Jenkins Artifact Upload - Production Troubleshooting Runbook",
  slug: "artifact-upload",
  category: "Jenkins",
  description:
    "A production-focused guide to diagnosing artifact publication failures across Jenkins, Maven, Gradle, Nexus Repository, JFrog Artifactory, container registries, and S3-compatible storage. Covers missing artifacts, incorrect paths, authentication, permissions, checksums, version conflicts, partial uploads, network failures, storage capacity, artifact provenance, deployment integrity, recovery, and prevention.",

  symptoms: [
    "Jenkins build succeeds but artifact upload fails.",
    "The expected JAR, WAR, ZIP, TAR, or package does not exist.",
    "The upload command reports that no files matched the pattern.",
    "Maven deploy or Gradle publish fails after compilation succeeds.",
    "Nexus or Artifactory returns HTTP 401 or 403.",
    "The repository returns HTTP 400 or 409 for a publication request.",
    "Artifact uploads time out or fail intermittently.",
    "The uploaded artifact has an unexpected size or checksum.",
    "The repository contains an older artifact than the latest successful build.",
    "The upload succeeds but downstream deployment cannot download the package.",
    "A Docker image push fails after the image builds locally.",
    "S3 upload fails because of a bucket policy, role, or KMS permission.",
    "A release artifact is overwritten by another pipeline.",
    "Parallel builds publish the same version.",
    "The artifact is uploaded to the wrong repository or environment.",
    "A retry produces duplicate or ambiguous release records.",
    "The artifact contains an unexpected file or dependency.",
    "A deployment uses a different artifact from the one tested.",
    "Repository storage or quota limits block publication.",
    "Credentials work locally but fail inside Jenkins.",
  ],

  severityMatrix: [
    {
      severity: "SEV-1 - Critical",
      condition:
        "A production release contains a wrong or corrupted artifact, an active rollout is damaging production, or artifact integrity may be compromised.",
      response:
        "Stop further promotion, preserve logs and artifact identifiers, notify the release owner, verify the deployed artifact, and follow the approved rollback or security incident procedure.",
    },
    {
      severity: "SEV-2 - High",
      condition:
        "A critical production release is blocked because publication or download is unavailable.",
      response:
        "Identify the failing publication stage, preserve the build output, investigate repository availability and permissions, and restore publication through a controlled recovery.",
    },
    {
      severity: "SEV-3 - Medium",
      condition:
        "A subset of projects cannot publish artifacts while other releases remain operational.",
      response:
        "Investigate project configuration, repository permissions, package paths, version conflicts, and recent pipeline changes.",
    },
    {
      severity: "SEV-4 - Low",
      condition:
        "An isolated development build fails to publish a non-critical snapshot artifact.",
      response:
        "Collect logs, reproduce the upload in a test repository, correct the configuration, and add a regression check.",
    },
  ],

  safetyChecks: [
    "Confirm the Jenkins controller, folder, job, build number, branch, and commit SHA.",
    "Confirm the intended target: snapshot repository, release repository, container registry, or object storage.",
    "Identify whether the artifact is for development, staging, or production.",
    "Check whether downstream jobs or deployments already consumed the artifact.",
    "Verify the artifact coordinates, package name, version, classifier, and file extension.",
    "Confirm whether the version is immutable or whether repository policy permits redeployment.",
    "Do not overwrite a release artifact merely to make a failed pipeline pass.",
    "Do not disable TLS certificate verification to bypass an HTTPS error.",
    "Do not print passwords, access tokens, signing keys, or secret environment variables.",
    "Do not use broad repository administrator credentials for routine publication.",
    "Do not delete repository content before preserving the artifact identifier and evidence.",
    "Do not assume a timed-out upload failed completely; verify remote state before retrying.",
    "Do not publish an unverified artifact to production as a workaround.",
    "Use approved change control for repository policy, storage, retention, and permission changes.",
    "Preserve the original build output and checksum during incident investigation.",
    "If tampering or credential compromise is suspected, follow the security incident procedure.",
  ],

  evidenceCollection: [
    "Incident ID, detection timestamp, affected team, and release deadline.",
    "Jenkins job name, build number, commit SHA, branch, and build URL.",
    "Build console log from artifact creation through publication.",
    "Exact upload command or Maven/Gradle publication configuration.",
    "Artifact path, file size, modification time, package coordinates, and checksum.",
    "Target repository URL, repository name, package version, and publication endpoint.",
    "HTTP status code, response body with secrets removed, and request timestamp.",
    "Credential ID and scope, without revealing secret values.",
    "Repository service health, storage capacity, quota, and relevant service logs.",
    "Proxy, DNS, TLS, routing, and network evidence when connectivity fails.",
    "Recent Jenkinsfile, build-tool, plugin, repository, and credential changes.",
    "Evidence of whether the remote artifact exists and whether its checksum matches.",
    "Downstream deployment record and the artifact digest actually consumed.",
    "Approved recovery action, validation results, and preventive tasks.",
  ],

  diagnosticWorkflow: [
    {
      title: "1. Confirm the failing stage and incident scope",
      purpose:
        "Determine whether the failure is artifact creation, packaging, publication, or downstream retrieval.",
      commands: [
        "Inspect the Jenkins console log around the packaging and upload stages.",
        "Identify the last successful pipeline stage.",
        "Compare the failed build with the last successful build.",
        "Record the job, build number, commit SHA, artifact name, and target repository.",
      ],
      expectedEvidence: [
        "Compilation can succeed even when packaging or publication fails.",
        "A publication failure does not necessarily mean the artifact was never uploaded.",
        "A downstream download failure may indicate a wrong repository coordinate rather than an upload problem.",
      ],
      decisionLogic: [
        "If packaging failed, investigate the build output and build-tool configuration first.",
        "If the file exists but publication failed, inspect path, authentication, permissions, repository policy, and connectivity.",
        "If publication succeeded but downstream retrieval failed, compare the published coordinates and downstream repository configuration.",
      ],
      nextAction:
        "Identify the exact failing stage before changing credentials or repository configuration.",
      risk: "low",
    },
    {
      title: "2. Verify artifact identity and build output",
      purpose:
        "Prove that the intended file was produced from the intended source revision.",
      commands: [
        "git rev-parse HEAD",
        "git status --short",
        "find <build-output-directory> -maxdepth 3 -type f -print",
        "ls -lh <artifact-path>",
        "sha256sum <artifact-path>",
      ],
      expectedEvidence: [
        "The file should exist at the expected path.",
        "The artifact name and version should match the pipeline configuration.",
        "The commit SHA should match the intended source revision.",
        "The checksum identifies the exact local file being investigated.",
      ],
      decisionLogic: [
        "If the file is missing, inspect the packaging task and its output directory.",
        "If the file exists under another name, inspect naming rules, classifiers, and version variables.",
        "If the commit or version is unexpected, stop publication and correct the source of truth.",
      ],
      nextAction:
        "Record the local artifact path, size, checksum, commit, and expected coordinates.",
      risk: "low",
    },
    {
      title: "3. Validate paths and file selection",
      purpose:
        "Find incorrect working directories, globs, and artifact patterns.",
      commands: [
        "pwd",
        "find . -maxdepth 4 -type f -print",
        "ls -lah <build-output-directory>",
        "git rev-parse --show-toplevel",
      ],
      expectedEvidence: [
        "Jenkins may execute a stage from a different directory than expected.",
        "A glob may match zero files or select multiple unintended files.",
        "A multi-module build may place outputs in module-specific directories.",
      ],
      decisionLogic: [
        "If the file is missing from the expected directory, inspect the build task and working directory.",
        "If multiple files match, narrow the publication pattern to the intended artifact.",
        "If a multi-module build produces several packages, publish each intended module explicitly.",
      ],
      nextAction:
        "Correct the path or file-selection pattern and validate it before publication.",
      risk: "low",
    },
    {
      title: "4. Inspect artifact format and metadata",
      purpose:
        "Check whether the generated package is valid and contains the expected contents.",
      commands: [
        "file <artifact-path>",
        "unzip -t <artifact.zip>",
        "jar tf <artifact.jar>",
        "tar -tf <artifact.tar>",
      ],
      expectedEvidence: [
        "Use only the inspection command matching the actual artifact format.",
        "A failed archive test may indicate a truncated or invalid package.",
        "A JAR or WAR can exist but still omit required classes or resources.",
      ],
      decisionLogic: [
        "If the archive is invalid, inspect the build and packaging stage rather than retrying upload.",
        "If required files are missing, inspect packaging exclusions and module configuration.",
        "If the format is valid, continue to checksum and publication diagnostics.",
      ],
      nextAction:
        "Verify package contents and retain the validated local artifact for comparison.",
      risk: "low",
    },
    {
      title: "5. Check credentials and repository authorization",
      purpose:
        "Separate authentication errors from authorization, repository policy, and connectivity errors.",
      commands: [
        "Inspect the Jenkins credential ID referenced by the pipeline.",
        "Inspect the credential's folder scope and binding type.",
        "Review the upload response code and sanitized error message.",
        "Test the endpoint using an approved non-production credential and repository.",
      ],
      expectedEvidence: [
        "HTTP 401 commonly indicates missing or invalid authentication.",
        "HTTP 403 commonly indicates insufficient permission or an access policy denial.",
        "A valid login does not prove permission to publish to a particular repository.",
      ],
      decisionLogic: [
        "If credentials cannot be resolved, correct the credential ID or scope.",
        "If authentication fails, verify credential validity through the approved secret-management process.",
        "If authentication succeeds but publication is forbidden, inspect repository-level deploy permissions and policy.",
        "If the endpoint cannot be reached, investigate DNS, TLS, proxy, and network separately.",
      ],
      nextAction:
        "Use least-privilege publication credentials and never expose secret values in console output.",
      risk: "medium",
    },
    {
      title: "6. Check repository URL, policy, and version conflicts",
      purpose:
        "Identify wrong endpoints, immutable-release rules, and duplicate publication attempts.",
      commands: [
        "Inspect the effective Maven or Gradle repository configuration.",
        "Inspect the target repository name and package coordinates.",
        "Review the repository response for policy or conflict details.",
        "Query the repository's package metadata using its approved API or UI.",
      ],
      expectedEvidence: [
        "A wrong endpoint may accept a request but place the artifact in an unintended repository.",
        "HTTP 400 may indicate invalid coordinates, request format, or repository-specific validation.",
        "HTTP 409 may indicate a conflict or existing resource, depending on the repository.",
        "Release repositories may prohibit redeployment of an existing version.",
      ],
      decisionLogic: [
        "If the endpoint is wrong, correct the repository configuration before retrying.",
        "If the version already exists and is immutable, publish a new approved version instead of overwriting it.",
        "If the repository rejects metadata or coordinates, validate the exact format required by that repository.",
      ],
      nextAction:
        "Resolve the endpoint or version policy issue using the repository's documented publishing rules.",
      risk: "medium",
    },
    {
      title: "7. Investigate timeout, TLS, and network failures",
      purpose:
        "Determine whether an upload failed before transmission, during transmission, or after remote storage completed.",
      commands: [
        "getent hosts <repository-host>",
        "curl -I --connect-timeout 10 https://<repository-host>/",
        "Inspect the upload client's connection and timeout logs.",
        "Inspect approved proxy and TLS configuration.",
      ],
      expectedEvidence: [
        "DNS failure suggests a name-resolution issue.",
        "Connection timeout suggests a routing, firewall, proxy, or service availability issue.",
        "TLS errors may indicate certificate, trust-chain, hostname, or system-clock problems.",
        "A timeout after data transmission may leave remote publication state uncertain.",
      ],
      decisionLogic: [
        "If DNS fails, validate the configured hostname and DNS path.",
        "If TCP connection fails, check service health and approved network access.",
        "If TLS validation fails, fix the trust or certificate configuration; do not disable verification.",
        "If the upload times out after transmission, query remote state before retrying.",
      ],
      nextAction:
        "Fix the failing network layer and verify whether the remote artifact exists before another upload attempt.",
      risk: "low",
    },
    {
      title: "8. Compare local and remote artifact integrity",
      purpose:
        "Detect truncated, incorrect, or unexpected remote artifacts.",
      commands: [
        "sha256sum <artifact-path>",
        "stat -c '%n %s bytes' <artifact-path>",
        "Download the published artifact using the approved repository client.",
        "sha256sum <downloaded-artifact-path>",
        "stat -c '%n %s bytes' <downloaded-artifact-path>",
      ],
      expectedEvidence: [
        "Local and downloaded sizes should match for the exact same file.",
        "SHA-256 checksums should match when both files are expected to be identical.",
        "Repository-generated metadata or transformed packages may require comparing the actual package object rather than unrelated metadata files.",
      ],
      decisionLogic: [
        "If checksums differ, stop promotion and investigate wrong coordinates, concurrent publication, corruption, or artifact substitution.",
        "If the downloaded file is missing, inspect repository path, permissions, retention, and replication status.",
        "If checksum and size match, continue with downstream deployment validation.",
      ],
      nextAction:
        "Preserve both checksums and the exact artifact coordinates for the incident record.",
      risk: "low",
    },
    {
      title: "9. Validate downstream consumption",
      purpose:
        "Ensure the next pipeline stage retrieves and deploys the same artifact that was built and tested.",
      commands: [
        "Inspect the downstream job's artifact coordinates and repository URL.",
        "Inspect the deployment manifest or release configuration.",
        "Record the deployed artifact version or image digest.",
        "Run the application's approved health checks after deployment.",
      ],
      expectedEvidence: [
        "A successful upload does not prove that the downstream job used that artifact.",
        "Mutable tags such as latest can point to different images over time.",
        "A downstream job may resolve a stale version or a different repository.",
      ],
      decisionLogic: [
        "If the downstream version differs, fix the promotion reference and investigate concurrent publication.",
        "If the correct artifact was deployed but the service is unhealthy, follow the application's deployment incident procedure.",
        "If artifact identity is uncertain, stop further promotion until it is verified.",
      ],
      nextAction:
        "Promote artifacts by immutable version or digest and record that identity across pipeline stages.",
      risk: "medium",
    },
    {
      title: "10. Recover and validate safely",
      purpose:
        "Apply the smallest corrective action and prevent duplicate or incorrect releases.",
      commands: [
        "Re-run local package validation.",
        "Calculate and record the artifact checksum.",
        "Verify target repository and version policy.",
        "Publish a test artifact to a non-production repository when appropriate.",
        "Run a controlled pipeline and confirm remote artifact identity.",
      ],
      expectedEvidence: [
        "The exact failure has a proven cause.",
        "The corrective change addresses the identified cause.",
        "The target repository contains the expected artifact.",
        "The downstream job resolves the same artifact version or digest.",
      ],
      decisionLogic: [
        "If the artifact itself is invalid, rebuild it from the approved source rather than repeatedly uploading it.",
        "If the upload timed out, check remote state before retrying.",
        "If a release version is immutable, use a new approved version.",
        "If the wrong artifact was deployed, follow the service-specific rollback process.",
      ],
      nextAction:
        "Validate one controlled publication before restoring normal release traffic.",
      risk: "medium",
    },
  ],

  failureCases: [
    {
      title: "Artifact file is missing",
      symptoms: [
        "The upload stage reports no files matched.",
        "The build succeeds but the expected package path is empty.",
        "The pipeline tries to upload a file that was never generated.",
      ],
      likelyCauses: [
        "Wrong working directory.",
        "Incorrect glob or output path.",
        "Packaging task was skipped.",
        "Multi-module output path differs from the configured path.",
        "Versioned filename differs from the hard-coded name.",
      ],
      diagnosticWorkflow: [
        {
          title: "Inspect the actual build output",
          purpose: "Find where the package was generated.",
          commands: [
            "pwd",
            "find . -maxdepth 5 -type f -print",
            "ls -lah <build-output-directory>",
            "git rev-parse HEAD",
          ],
          expectedEvidence: [
            "The file may be in a module-specific target or build directory.",
            "The expected path may use the wrong version or classifier.",
          ],
          decisionLogic: [
            "If the file is absent everywhere, inspect the packaging task.",
            "If the file exists elsewhere, correct the upload path.",
            "If multiple files exist, choose the intended package explicitly.",
          ],
          nextAction: "Correct the build or path configuration before publication.",
          risk: "low",
        },
      ],
      resolution: [
        "Fix the package-generation task or output path.",
        "Use explicit artifact selection rather than a broad wildcard.",
        "Validate that exactly the intended files exist before uploading.",
      ],
      verification: [
        "The package exists at the expected location.",
        "The package format and contents are valid.",
        "The upload stage selects the intended file.",
      ],
      prevention: [
        "Add a file-existence check before publication.",
        "Publish the package through the build tool's supported lifecycle.",
        "Test the pipeline against multi-module and versioned output paths.",
      ],
    },
    {
      title: "Maven deploy fails after a successful package build",
      symptoms: [
        "The JAR or WAR is generated successfully.",
        "The Maven deploy goal fails.",
        "The repository contains no new release or snapshot.",
      ],
      likelyCauses: [
        "Incorrect distributionManagement configuration.",
        "Missing or mismatched server ID in Maven settings.",
        "Insufficient repository permissions.",
        "Invalid version or repository policy.",
        "Network or TLS failure.",
      ],
      diagnosticWorkflow: [
        {
          title: "Inspect Maven publication configuration",
          purpose: "Validate target repository and credential mapping.",
          commands: [
            "mvn -version",
            "mvn help:effective-pom",
            "mvn help:effective-settings",
            "mvn -B -e deploy",
          ],
          expectedEvidence: [
            "Effective POM output identifies the resolved project configuration.",
            "Effective settings can help verify server IDs, but handle any credential-bearing output securely.",
            "The deploy error should identify authentication, authorization, policy, or connectivity failure.",
          ],
          decisionLogic: [
            "If the server ID does not match the settings entry, correct the configuration.",
            "If publication is forbidden, verify repository deployment permissions.",
            "If a release version already exists, follow immutable-version policy.",
            "If TLS or network fails, investigate that layer separately.",
          ],
          nextAction: "Correct the identified Maven configuration or repository issue and test against an approved target.",
          risk: "medium",
        },
      ],
      resolution: [
        "Align distributionManagement with the intended repository.",
        "Ensure the Maven server ID matches the credential entry.",
        "Use a dedicated, least-privilege publishing identity.",
        "Follow snapshot and release repository policies.",
      ],
      verification: [
        "The expected coordinates are visible in the target repository.",
        "The published package checksum matches the local package.",
        "A downstream dependency-resolution test succeeds.",
      ],
      prevention: [
        "Validate Maven publication configuration in CI.",
        "Keep secrets outside source-controlled POM files.",
        "Test release version uniqueness before publishing.",
      ],
    },
    {
      title: "Gradle publish task fails",
      symptoms: [
        "Gradle compilation succeeds but publication fails.",
        "The repository returns authentication or policy errors.",
        "The package version or repository path is unexpected.",
      ],
      likelyCauses: [
        "Incorrect Maven publication configuration.",
        "Wrong repository URL.",
        "Credential property is missing.",
        "Publication coordinates are incorrect.",
        "Repository policy rejects the version.",
      ],
      diagnosticWorkflow: [
        {
          title: "Inspect the Gradle publication configuration",
          purpose: "Determine which repository and publication are being used.",
          commands: [
            "./gradlew tasks",
            "./gradlew publish --info",
            "Inspect the publishing and repository blocks in the Gradle build files.",
          ],
          expectedEvidence: [
            "Gradle logs should identify the task and publication stage that failed.",
            "The configured repository and coordinates should match the release plan.",
          ],
          decisionLogic: [
            "If the wrong publication task runs, correct the pipeline task selection.",
            "If authentication fails, verify approved credential properties and scope.",
            "If repository policy rejects the version, follow the repository's versioning rules.",
          ],
          nextAction: "Correct the specific Gradle publication configuration and run a controlled publication test.",
          risk: "medium",
        },
      ],
      resolution: [
        "Correct the repository and publication configuration.",
        "Use protected Jenkins credentials or an approved secret provider.",
        "Validate artifact coordinates before publication.",
      ],
      verification: [
        "Gradle publishes the expected package.",
        "The remote artifact matches the local artifact.",
        "A downstream consumer can resolve the published version.",
      ],
      prevention: [
        "Test publish configuration with a test repository.",
        "Pin Gradle and plugin versions.",
        "Add automated artifact-coordinate validation.",
      ],
    },
    {
      title: "Nexus or Artifactory returns 401 or 403",
      symptoms: [
        "The repository rejects publication.",
        "Credentials work for one job but fail in another.",
        "Downloads succeed while uploads are denied.",
      ],
      likelyCauses: [
        "Invalid or expired credentials.",
        "Credential ID or folder scope mismatch.",
        "Missing deploy permission.",
        "Repository-level access policy.",
        "Wrong repository endpoint.",
      ],
      diagnosticWorkflow: [
        {
          title: "Separate authentication from authorization",
          purpose: "Identify whether the identity or its permissions are incorrect.",
          commands: [
            "Inspect the Jenkins credential ID and folder scope.",
            "Inspect the target repository name and endpoint.",
            "Review the sanitized HTTP response and repository audit logs.",
            "Test with the approved identity against a non-production repository.",
          ],
          expectedEvidence: [
            "401 usually indicates authentication failure.",
            "403 usually indicates an authorization or policy denial, although repository behavior varies.",
            "Successful download permission does not imply publish permission.",
          ],
          decisionLogic: [
            "If the credential cannot be resolved, correct its ID or scope.",
            "If authentication fails, verify credential validity through the approved process.",
            "If authorization fails, grant only the specific required repository permission after approval.",
          ],
          nextAction: "Correct the credential or permission issue without using administrator credentials as a shortcut.",
          risk: "medium",
        },
      ],
      resolution: [
        "Repair credential binding and scope.",
        "Verify the publishing identity has the required repository permission.",
        "Follow the approved secret rotation process when necessary.",
        "Remove secrets from logs and build artifacts if exposure occurred.",
      ],
      verification: [
        "The approved identity can publish to the intended repository.",
        "Read and publish behavior matches the expected permissions.",
        "No secret values are exposed in logs.",
      ],
      prevention: [
        "Use least-privilege publishing identities.",
        "Audit repository permission changes.",
        "Monitor authentication failures and credential expiry.",
      ],
    },
    {
      title: "Upload times out or fails intermittently",
      symptoms: [
        "Large packages fail while smaller packages succeed.",
        "Retries sometimes work.",
        "The pipeline reports a timeout without confirming remote state.",
      ],
      likelyCauses: [
        "Network instability.",
        "Proxy or gateway timeout.",
        "Repository load or storage pressure.",
        "Request timeout too short for large artifacts.",
        "Partial upload or uncertain remote completion.",
      ],
      diagnosticWorkflow: [
        {
          title: "Determine where the upload failed",
          purpose: "Distinguish connection establishment, data transfer, and remote commit failures.",
          commands: [
            "getent hosts <repository-host>",
            "curl -I --connect-timeout 10 https://<repository-host>/",
            "Inspect upload-client timing and timeout logs.",
            "Check repository service health and storage metrics.",
            "Query remote metadata for the exact artifact coordinates.",
          ],
          expectedEvidence: [
            "Repeated connection failures suggest network or endpoint availability.",
            "Failures only for large packages may indicate transfer limits, timeout settings, or storage pressure.",
            "A timeout after transmission does not establish whether the artifact was committed.",
          ],
          decisionLogic: [
            "If connection establishment fails, investigate DNS, routing, firewall, and proxy.",
            "If transfer consistently stops at a similar size, inspect client, proxy, and repository limits.",
            "If remote state is uncertain, query the exact version and checksum before retrying.",
          ],
          nextAction: "Restore the failing layer and retry only after confirming the state of the remote artifact.",
          risk: "medium",
        },
      ],
      resolution: [
        "Repair the network, proxy, or repository capacity issue.",
        "Set appropriate timeouts based on package size and documented infrastructure limits.",
        "Use supported resumable or retry mechanisms where available.",
        "Avoid blind retries that overwrite or duplicate release artifacts.",
      ],
      verification: [
        "A controlled upload completes.",
        "Remote metadata and checksum are correct.",
        "Repository error rates return to normal.",
      ],
      prevention: [
        "Monitor upload duration and failure rates.",
        "Set reasonable transfer timeouts.",
        "Use repository health checks and capacity alerts.",
      ],
    },
    {
      title: "Checksum mismatch or corrupted artifact",
      symptoms: [
        "The remote checksum differs from the local checksum.",
        "A downloaded package fails archive validation.",
        "A deployment fails even though the upload stage succeeded.",
      ],
      likelyCauses: [
        "Wrong artifact downloaded for comparison.",
        "Concurrent publication of the same version.",
        "Incomplete or corrupted transfer.",
        "Artifact mutation after checksum generation.",
        "Incorrect repository coordinates.",
      ],
      diagnosticWorkflow: [
        {
          title: "Establish artifact identity",
          purpose: "Ensure the local and remote files represent the same package.",
          commands: [
            "sha256sum <local-artifact>",
            "stat -c '%n %s bytes' <local-artifact>",
            "sha256sum <downloaded-artifact>",
            "stat -c '%n %s bytes' <downloaded-artifact>",
            "unzip -t <downloaded-artifact.zip>",
          ],
          expectedEvidence: [
            "The downloaded artifact must correspond to the exact coordinates and version under investigation.",
            "Matching sizes alone do not prove matching content.",
            "A checksum mismatch must be investigated before promotion.",
          ],
          decisionLogic: [
            "If the coordinates differ, correct the comparison and downstream reference.",
            "If the coordinates match but checksums differ, stop promotion and investigate overwrite, corruption, or concurrent publication.",
            "If the local package is invalid, rebuild from the approved source.",
          ],
          nextAction: "Preserve both files and checksums, then follow the repository and release integrity process.",
          risk: "high",
        },
      ],
      resolution: [
        "Stop promotion of the affected artifact.",
        "Identify the correct build and approved source revision.",
        "Publish a corrected artifact under an approved version or release process.",
        "If tampering is suspected, escalate to the security incident procedure.",
      ],
      verification: [
        "The intended local and remote artifacts match by SHA-256.",
        "The package passes format validation.",
        "The release record points to the verified artifact.",
      ],
      prevention: [
        "Use immutable release versions.",
        "Generate and record checksums during CI.",
        "Verify artifact identity before deployment.",
      ],
    },
    {
      title: "Artifact version conflict or overwrite risk",
      symptoms: [
        "The repository rejects a duplicate version.",
        "Different builds attempt to publish the same release coordinates.",
        "A downstream deployment resolves an unexpected package.",
      ],
      likelyCauses: [
        "Hard-coded versions.",
        "Parallel builds publish the same coordinates.",
        "Snapshot and release repositories are confused.",
        "A retry attempts to republish an immutable release.",
      ],
      diagnosticWorkflow: [
        {
          title: "Check version uniqueness and repository policy",
          purpose: "Determine whether the version is already present or being published concurrently.",
          commands: [
            "Inspect the package version and build metadata.",
            "Inspect repository metadata for the exact coordinates.",
            "Review concurrent Jenkins builds for the same release.",
            "Inspect the repository's redeployment policy.",
          ],
          expectedEvidence: [
            "The repository may intentionally prevent release overwrites.",
            "Parallel builds may race to publish the same coordinates.",
          ],
          decisionLogic: [
            "If the version already represents a published release, do not overwrite it.",
            "If two builds use the same version, correct version generation or release serialization.",
            "If a snapshot is expected, verify the correct snapshot repository and metadata behavior.",
          ],
          nextAction: "Use the approved versioning process and publish a unique release identity.",
          risk: "medium",
        },
      ],
      resolution: [
        "Generate a unique approved version for a new release.",
        "Serialize release publication where necessary.",
        "Use snapshot repositories only for intended snapshot artifacts.",
        "Never bypass immutability controls merely to make the pipeline green.",
      ],
      verification: [
        "The repository contains the intended version.",
        "The release record maps to one verified build.",
        "Downstream jobs resolve the intended version.",
      ],
      prevention: [
        "Enforce version uniqueness in CI.",
        "Protect release publishing stages.",
        "Use immutable artifact coordinates and provenance metadata.",
      ],
    },
    {
      title: "S3 upload fails",
      symptoms: [
        "AWS CLI upload returns AccessDenied.",
        "Upload fails for a particular bucket or prefix.",
        "An object exists but downstream retrieval fails.",
      ],
      likelyCauses: [
        "Wrong AWS identity or account.",
        "Missing bucket or object permissions.",
        "Bucket policy or organization-level restriction.",
        "KMS permissions missing for encrypted objects.",
        "Wrong region or endpoint.",
        "Network, proxy, or credential-chain issue.",
      ],
      diagnosticWorkflow: [
        {
          title: "Verify identity and target location",
          purpose: "Separate account, bucket, prefix, permission, and encryption problems.",
          commands: [
            "aws sts get-caller-identity",
            "aws s3api get-bucket-location --bucket <bucket-name>",
            "aws s3api head-object --bucket <bucket-name> --key <object-key>",
            "aws s3 cp <artifact-path> s3://<bucket-name>/<object-key> --dryrun",
          ],
          expectedEvidence: [
            "The caller identity should match the intended CI role or account.",
            "The bucket region and object key should match the release configuration.",
            "A dry run helps validate the command shape but does not prove upload authorization or success.",
          ],
          decisionLogic: [
            "If the identity is wrong, correct the approved role or credential chain.",
            "If the object operation is denied, inspect IAM, bucket policy, permission boundaries, and KMS access.",
            "If the object exists after a timeout, verify its metadata and checksum before retrying.",
          ],
          nextAction: "Correct the specific AWS identity, policy, region, or encryption issue with least privilege.",
          risk: "medium",
        },
      ],
      resolution: [
        "Use the approved CI role or credential chain.",
        "Grant only the required object-level permissions.",
        "Check bucket policy, encryption, and KMS permissions.",
        "Verify the correct account, bucket, prefix, and region.",
      ],
      verification: [
        "The intended object is present.",
        "Object metadata and checksum match the release artifact.",
        "The downstream role can retrieve the object.",
      ],
      prevention: [
        "Use short-lived role credentials where possible.",
        "Test bucket access and encryption in CI.",
        "Monitor denied requests and object publication failures.",
      ],
    },
    {
      title: "Docker image push fails or publishes the wrong image",
      symptoms: [
        "The image builds but push fails.",
        "Registry authentication succeeds but the push is denied.",
        "The deployment uses a different image from the tested build.",
      ],
      likelyCauses: [
        "Wrong registry or image name.",
        "Missing repository push permission.",
        "Tag collision or mutable tag reuse.",
        "Registry quota or storage failure.",
        "Incorrect build context or image provenance.",
      ],
      diagnosticWorkflow: [
        {
          title: "Verify image identity and registry target",
          purpose: "Separate local image build, registry authentication, push, and downstream pull.",
          commands: [
            "docker image ls",
            "docker image inspect <image:tag>",
            "docker image inspect --format='{{index .RepoDigests 0}}' <image:tag>",
            "docker login <registry-host>",
            "docker push <registry-host>/<repository>/<image>:<tag>",
          ],
          expectedEvidence: [
            "The local image should have the expected tag and build identity.",
            "Registry authentication should use an approved credential mechanism.",
            "A push result should be followed by digest verification.",
          ],
          decisionLogic: [
            "If the image is missing locally, inspect the build stage.",
            "If push is denied, inspect repository permissions and registry policy.",
            "If a mutable tag was reused, resolve the immutable digest and investigate concurrent builds.",
          ],
          nextAction: "Publish and promote the verified image digest, not merely a mutable tag.",
          risk: "medium",
        },
      ],
      resolution: [
        "Correct the registry and repository reference.",
        "Use approved registry credentials and least-privilege push access.",
        "Publish a unique version tag and record the resulting digest.",
        "Verify the deployment references the intended digest.",
      ],
      verification: [
        "The registry contains the expected image.",
        "The remote digest matches the intended build output.",
        "A downstream deployment resolves the expected image digest.",
      ],
      prevention: [
        "Use immutable image tags or digests for release promotion.",
        "Scan images before publishing.",
        "Record build provenance and image digest.",
      ],
    },
  ],

  incidentScenarios: [
    {
      title: "Production release pipeline cannot publish the artifact",
      severity: "SEV-2, or SEV-1 if a live production release is unhealthy.",
      scenario:
        "Compilation and tests pass, but the publication stage fails just before a scheduled production deployment.",
      impact: [
        "The release is delayed.",
        "Downstream deployment jobs cannot retrieve the expected package.",
        "A partial or timed-out upload may leave remote state uncertain.",
      ],
      investigation: [
        "Confirm the controller, job, commit, environment, artifact coordinates, and target repository.",
        "Identify whether package creation and validation completed.",
        "Record local file size and SHA-256 checksum.",
        "Inspect the exact repository response and sanitized upload logs.",
        "Verify the publishing identity and repository permissions.",
        "Check repository health, storage, quota, DNS, TLS, proxy, and network status as indicated by evidence.",
        "Query the exact remote artifact coordinates to determine whether publication already completed.",
        "Check whether downstream jobs or production deployments consumed the artifact.",
      ],
      rootCauseIsolation: [
        "Missing file: inspect packaging tasks, working directory, output path, and file-selection pattern.",
        "401: inspect authentication and credential binding.",
        "403: inspect repository permissions and access policy.",
        "400 or 409: inspect coordinates, metadata, version uniqueness, and repository policy.",
        "Timeout: distinguish connection failure from an uncertain remote commit.",
        "Checksum mismatch: stop promotion and investigate identity, overwrite, corruption, or tampering.",
        "Repository unavailable: correlate service health and infrastructure logs with the failure time.",
      ],
      recovery: [
        "Preserve the local artifact, checksum, console log, and remote publication evidence.",
        "Correct the proven cause without weakening repository security.",
        "If remote state is uncertain, query the repository before retrying.",
        "Publish to the intended repository under the approved versioning policy.",
        "Download or otherwise verify the published artifact and compare its checksum.",
        "Run a controlled downstream retrieval test.",
        "Resume production deployment only after artifact identity is verified.",
      ],
      rollbackDecision:
        "If the deployment never started, restore publication and continue without unnecessary application rollback. If a wrong or corrupted artifact was deployed, stop further promotion, verify the deployed version, and follow the service's approved rollback or recovery procedure.",
      verification: [
        "The intended artifact exists in the correct repository.",
        "Artifact coordinates, version, size, and checksum are recorded.",
        "The downstream pipeline retrieves the exact artifact.",
        "The production application meets its health criteria after release.",
        "Repository errors and queue delays return to normal.",
      ],
    },
    {
      title: "Artifact upload times out but the repository may have stored the file",
      severity: "SEV-2 when a critical release is blocked.",
      scenario:
        "A large artifact upload times out after data transfer begins. Jenkins marks the stage failed, but the repository may have committed the artifact.",
      impact: [
        "The release pipeline reports failure despite uncertain remote state.",
        "A blind retry may conflict with immutable-version policy.",
        "A downstream job could consume an artifact from an earlier attempt.",
      ],
      investigation: [
        "Capture the exact timeout and upload timestamps.",
        "Record the local artifact's coordinates, size, and checksum.",
        "Query repository metadata for the exact version.",
        "Download the remote artifact using an approved identity if it exists.",
        "Compare remote and local checksum and size.",
        "Inspect repository and proxy logs for completion or interruption evidence.",
      ],
      rootCauseIsolation: [
        "No remote object and a connection failure: investigate transport and endpoint availability.",
        "Remote object exists and checksums match: publication may have completed despite the client timeout.",
        "Remote object exists but checksum differs: stop promotion and investigate the discrepancy.",
        "Repository reports a conflict on retry: determine whether the previous attempt successfully committed the version.",
      ],
      recovery: [
        "Do not immediately retry the same immutable release.",
        "Verify remote artifact identity and integrity.",
        "If the correct artifact exists, update the release record and continue through the approved process.",
        "If the artifact is absent, correct the timeout or network issue and retry according to repository policy.",
        "If the artifact is inconsistent, stop promotion and follow the integrity recovery process.",
      ],
      rollbackDecision:
        "A publication timeout alone does not require application rollback. Roll back only if the target environment is unhealthy or contains an incorrect deployment.",
      verification: [
        "The remote artifact's presence and integrity are known.",
        "The release record identifies the correct artifact.",
        "The pipeline does not publish an unintended duplicate or replacement.",
      ],
    },
    {
      title: "Wrong artifact version reaches production",
      severity: "SEV-1 or SEV-2 depending on customer impact.",
      scenario:
        "The upload stage succeeds, but the deployment pipeline resolves an older package or a different container image.",
      impact: [
        "Production may run code that was not validated by the current pipeline.",
        "Release records may no longer reflect the deployed version.",
        "A rollback may be needed if the deployed artifact is incompatible or unhealthy.",
      ],
      investigation: [
        "Record the intended source commit and artifact version.",
        "Identify the exact artifact coordinate or image digest used by the deployment.",
        "Inspect repository metadata, mutable tags, and concurrent pipeline runs.",
        "Compare the deployed artifact checksum or digest with the tested artifact.",
        "Review the promotion job's artifact resolution logic.",
        "Inspect application health and deployment events.",
      ],
      rootCauseIsolation: [
        "Wrong package version: inspect pipeline variables and dependency coordinates.",
        "Mutable container tag: inspect registry digest and tag update history.",
        "Concurrent publication: inspect parallel builds sharing the same version.",
        "Wrong repository: compare the source repository and target environment configuration.",
      ],
      recovery: [
        "Stop further promotion until artifact identity is known.",
        "Preserve the deployment record and relevant artifact metadata.",
        "Deploy the correct verified artifact or use the approved rollback procedure.",
        "Re-run health checks and verify the resulting version.",
        "Correct promotion logic and add a regression test.",
      ],
      rollbackDecision:
        "Roll back when the wrong artifact creates an unhealthy, insecure, or incompatible production state, following the service's recovery criteria. Do not assume rollback is required if the deployed artifact is verified as safe and the release owner approves a controlled forward fix.",
      verification: [
        "The deployed version or digest matches the approved release record.",
        "Application health checks pass.",
        "Further promotion uses immutable artifact identity.",
      ],
    },
  ],

  commandReference: [
    {
      command: "git rev-parse HEAD",
      purpose: "Identify the checked-out source commit.",
      interpretation: "Compare the commit with the intended release and build record.",
    },
    {
      command: "pwd",
      purpose: "Show the current working directory.",
      interpretation: "Useful for identifying relative-path mistakes in Jenkins stages.",
    },
    {
      command: "find . -maxdepth 4 -type f -print",
      purpose: "Inspect files produced in the workspace.",
      interpretation: "Use a suitable depth and directory to find the intended package.",
    },
    {
      command: "ls -lh <artifact-path>",
      purpose: "Inspect artifact existence and size.",
      interpretation: "A missing file or unexpected size points toward packaging or path issues.",
    },
    {
      command: "sha256sum <artifact-path>",
      purpose: "Calculate the artifact's SHA-256 checksum.",
      interpretation: "Record it for comparison with the exact published artifact.",
    },
    {
      command: "file <artifact-path>",
      purpose: "Identify the file format.",
      interpretation: "Helps detect a file with the wrong format or extension.",
    },
    {
      command: "unzip -t <artifact.zip>",
      purpose: "Test ZIP archive integrity.",
      interpretation: "A failure may indicate an invalid or incomplete archive.",
    },
    {
      command: "jar tf <artifact.jar>",
      purpose: "List the contents of a JAR archive.",
      interpretation: "Check for expected classes and resources.",
    },
    {
      command: "mvn -version",
      purpose: "Inspect the Maven and Java versions.",
      interpretation: "Compare the runtime with the project's supported toolchain.",
    },
    {
      command: "mvn help:effective-pom",
      purpose: "Inspect resolved Maven project configuration.",
      interpretation: "Review repositories, distributionManagement, plugins, and versions.",
    },
    {
      command: "mvn -B -e deploy",
      purpose: "Run Maven deployment with batch output and exception details.",
      interpretation: "Use only against the intended approved repository; do not blindly rerun an immutable release.",
    },
    {
      command: "./gradlew publish --info",
      purpose: "Run Gradle publication with additional diagnostics.",
      interpretation: "Inspect the publication task and sanitized repository error.",
    },
    {
      command: "getent hosts <repository-host>",
      purpose: "Check repository hostname resolution.",
      interpretation: "Incorrect or missing results indicate a possible DNS issue.",
    },
    {
      command: "curl -I --connect-timeout 10 https://<repository-host>/",
      purpose: "Check HTTP endpoint reachability.",
      interpretation: "This does not prove publication authorization or package upload success.",
    },
    {
      command: "aws sts get-caller-identity",
      purpose: "Identify the active AWS identity.",
      interpretation: "Confirm that the expected CI role or account is in use.",
    },
    {
      command: "aws s3api head-object --bucket <bucket-name> --key <object-key>",
      purpose: "Inspect an existing S3 object.",
      interpretation: "A successful lookup does not by itself prove that the object contains the intended artifact.",
    },
    {
      command: "docker image inspect <image:tag>",
      purpose: "Inspect local container image metadata.",
      interpretation: "Verify the expected tag and image details before publishing.",
    },
    {
      command: "docker push <registry-host>/<repository>/<image>:<tag>",
      purpose: "Publish a container image.",
      interpretation: "After success, record and verify the registry digest.",
    },
    {
      command: "kubectl get pods -n <namespace>",
      purpose: "Inspect Kubernetes workloads when artifact delivery uses cluster workloads.",
      interpretation: "Use Pod status and events to determine whether a deployment failure is downstream of publication.",
    },
  ],

  recoveryRunbook: [
    "Declare the incident and assign an owner when the release impact warrants it.",
    "Confirm the job, source commit, target environment, repository, and artifact coordinates.",
    "Determine whether the problem is package creation, publication, download, or deployment.",
    "Preserve logs, local artifacts, checksums, HTTP responses, and repository metadata.",
    "Establish whether the remote artifact already exists, especially after a timeout.",
    "Identify the root cause using the relevant diagnostic branch.",
    "Apply the smallest approved corrective change.",
    "Validate the artifact format and checksum before publication.",
    "Publish to the correct repository using least-privilege credentials and approved versioning.",
    "Verify remote artifact identity by download, checksum, or registry digest.",
    "Confirm that the downstream job retrieves the same artifact that was tested.",
    "Before retrying deployment, verify the current target state.",
    "Follow the service-specific rollback or forward-recovery procedure if required.",
    "Monitor publication success, repository errors, queue delay, and application health.",
    "Document the cause, recovery, validation evidence, and preventive actions.",
  ],

  prevention: [
    "Use immutable versions for release artifacts.",
    "Generate artifact checksums during CI and record them in release metadata.",
    "Promote the same verified artifact between environments instead of rebuilding it for each environment.",
    "Use artifact coordinates or image digests rather than mutable names alone.",
    "Validate artifact existence and archive integrity before publication.",
    "Use least-privilege repository credentials.",
    "Store secrets in Jenkins credentials or an approved secret manager.",
    "Avoid printing credential values or credential-bearing configuration.",
    "Separate snapshot and release repositories.",
    "Enforce unique release versions and controlled publication.",
    "Monitor repository capacity, quotas, upload duration, and failure rates.",
    "Set suitable timeouts and safe retry behavior.",
    "Verify remote state after uncertain upload failures.",
    "Test publication and downstream retrieval in CI.",
    "Scan packages and container images before production promotion.",
    "Maintain a documented artifact recovery and rollback procedure.",
  ],

  monitoring: [
    "Track artifact upload success and failure rates.",
    "Monitor upload duration and timeout frequency.",
    "Alert on repository HTTP 401, 403, 409, and repeated 5xx responses.",
    "Monitor repository health, storage capacity, and quota usage.",
    "Track failed package retrievals in downstream pipelines.",
    "Record package coordinates, build number, commit SHA, and checksum.",
    "Alert when a release version is published more than once unexpectedly.",
    "Monitor container image push failures and image digest changes.",
    "Monitor S3 AccessDenied and KMS authorization failures when applicable.",
    "Track checksum mismatch and package validation failures.",
    "Correlate failures with credential rotation, repository changes, and network deployments.",
    "Alert when a production deployment uses an artifact identity different from its release record.",
  ],

  cicdValidation: [
    "Validate the expected artifact path before upload.",
    "Fail the pipeline if no artifact exists or an unexpected number of files match.",
    "Check package integrity and required files.",
    "Record the source commit and artifact SHA-256 checksum.",
    "Validate version uniqueness before publishing a release.",
    "Validate repository coordinates and target environment.",
    "Use a test repository for publication configuration changes.",
    "Test Maven and Gradle publishing in CI where applicable.",
    "Verify container image digest after push.",
    "Verify S3 object identity and access where applicable.",
    "Ensure credentials are supplied through approved secret bindings.",
    "Scan logs and artifacts for secret exposure.",
    "Add a downstream retrieval test before release promotion.",
    "Require explicit approval for production promotion where mandated.",
    "Verify deployment references the exact tested version or digest.",
    "Use safe retry logic for operations with uncertain remote completion.",
  ],

  incidentReportTemplate: [
    "Incident ID and owner",
    "Detection time and recovery time",
    "Affected Jenkins job, build number, branch, and commit",
    "Affected repository, environment, and artifact coordinates",
    "Severity and business impact",
    "Local artifact path, size, and SHA-256 checksum",
    "Publication command and sanitized repository response",
    "Credential ID and authorization scope, excluding secret values",
    "Repository health, quota, and network evidence",
    "Remote artifact presence, size, and checksum",
    "Downstream artifact version or image digest",
    "Recent pipeline, repository, credential, or infrastructure changes",
    "Confirmed root cause and supporting evidence",
    "Corrective action and change approval",
    "Artifact integrity and downstream validation results",
    "Deployment rollback or recovery decision",
    "Preventive actions, owners, and due dates",
    "Lessons learned",
  ],

  labs: [
    {
      title: "Lab 1: Diagnose a missing artifact",
      objective:
        "Practice finding path and packaging mistakes before publication.",
      steps: [
        "Create a test Jenkins pipeline that builds a sample JAR or ZIP.",
        "Capture the expected artifact path.",
        "Change the test upload path to an incorrect directory.",
        "Use pwd, find, and ls to identify the actual package.",
        "Correct the path and validate the upload selection.",
      ],
    },
    {
      title: "Lab 2: Investigate repository authorization",
      objective:
        "Distinguish authentication errors from repository permission errors.",
      steps: [
        "Use a disposable test repository and non-production identity.",
        "Attempt publication with an identity that has no publish permission.",
        "Record the sanitized response and repository logs.",
        "Grant the required narrow permission through the test setup.",
        "Verify publication and remote retrieval.",
      ],
    },
    {
      title: "Lab 3: Verify artifact integrity",
      objective:
        "Compare the local artifact with the published artifact.",
      steps: [
        "Build a test ZIP or JAR.",
        "Calculate its SHA-256 checksum.",
        "Publish it to a test repository.",
        "Download the exact published version.",
        "Compare checksums and archive integrity.",
      ],
    },
    {
      title: "Lab 4: Simulate an uncertain upload timeout",
      objective:
        "Practice checking remote state before retrying.",
      steps: [
        "Use a disposable repository and a non-production package.",
        "Interrupt or limit the test transfer in a controlled environment.",
        "Inspect whether the remote object exists.",
        "Compare its checksum with the local package.",
        "Retry only according to the test repository's version policy.",
      ],
    },
    {
      title: "Lab 5: Trace an artifact through a release pipeline",
      objective:
        "Ensure the deployed artifact matches the artifact that passed tests.",
      steps: [
        "Build a test package from a known commit.",
        "Record the package version and checksum.",
        "Publish it to a test repository.",
        "Download it in a downstream job and verify the checksum.",
        "Deploy to a test environment.",
        "Record the deployed version and validate application health.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is an artifact in Jenkins?",
      answer:
        "An artifact is a file or package produced by a build, such as a JAR, WAR, ZIP, binary, or container image, that can be stored and consumed by later pipeline stages.",
    },
    {
      question: "What is the difference between archiving and publishing an artifact?",
      answer:
        "Archiving commonly retains build outputs with Jenkins for that build. Publishing sends a package to a repository or registry designed for versioned storage and downstream consumption.",
    },
    {
      question: "Why can a build succeed while artifact upload fails?",
      answer:
        "Compilation and tests may finish successfully while publication fails because of paths, credentials, permissions, repository policy, network errors, or storage limits.",
    },
    {
      question: "How do you troubleshoot a missing artifact?",
      answer:
        "Inspect the working directory, packaging task, actual output files, filename, version, and upload glob. Verify that the intended file exists before publishing.",
    },
    {
      question: "What does HTTP 401 usually mean during publication?",
      answer:
        "It usually indicates an authentication problem, such as missing, invalid, or expired credentials. Repository behavior can vary, so inspect the response and logs.",
    },
    {
      question: "What does HTTP 403 usually mean?",
      answer:
        "It commonly indicates that the identity is not allowed to perform the requested operation, or that an access policy denies it.",
    },
    {
      question: "Why should release artifacts be immutable?",
      answer:
        "Immutability prevents a published version from silently changing after testing and helps ensure that the artifact deployed is the artifact that was approved.",
    },
    {
      question: "How do you verify artifact integrity?",
      answer:
        "Calculate a cryptographic checksum for the local package and compare it with the exact published package downloaded from the repository.",
    },
    {
      question: "What should you do when an upload times out?",
      answer:
        "First determine whether the repository stored the artifact. Verify remote coordinates and checksum before retrying, especially when the release version is immutable.",
    },
    {
      question: "How do Maven and Gradle publish artifacts?",
      answer:
        "Maven commonly uses configured distributionManagement and server credentials with the deploy lifecycle. Gradle uses its configured publishing tasks and repository definitions.",
    },
    {
      question: "How do you troubleshoot a Maven deploy failure?",
      answer:
        "Inspect the effective project configuration, repository endpoint, matching server ID, credentials, permissions, version policy, and exact deploy error.",
    },
    {
      question: "How do you troubleshoot an S3 artifact upload failure?",
      answer:
        "Verify the active AWS identity, bucket and key, region, IAM and bucket policies, encryption/KMS permissions, and remote object state.",
    },
    {
      question: "Why is a container image digest useful?",
      answer:
        "A digest identifies the specific image content. It is more reliable for release identity than a mutable tag that can point to different content later.",
    },
    {
      question: "What is the risk of using latest for production deployments?",
      answer:
        "The tag may be moved to another image, making it unclear which build the deployment will consume. Immutable versions or digests provide better traceability.",
    },
    {
      question: "How can parallel Jenkins builds corrupt release traceability?",
      answer:
        "They may publish the same version or overwrite a mutable tag. Unique version generation and controlled publication prevent ambiguous release identity.",
    },
    {
      question: "How should Jenkins artifact credentials be stored?",
      answer:
        "Use Jenkins credentials or an approved secret manager with narrow scope and permissions. Do not store passwords or tokens in source control or print them in logs.",
    },
    {
      question: "Should you retry every failed artifact upload automatically?",
      answer:
        "No. First classify the error. A retry can help with transient network failures but may conflict with immutable versions or duplicate an operation whose remote state is uncertain.",
    },
    {
      question: "What should happen if a checksum mismatch is detected?",
      answer:
        "Stop promotion, preserve both artifacts and checksums, verify the coordinates, and investigate corruption, wrong versions, concurrent publication, or possible tampering.",
    },
    {
      question: "How do you ensure that the deployed artifact is the tested artifact?",
      answer:
        "Record the artifact version and checksum or image digest, publish the verified artifact, promote that same identity, and verify the deployment record.",
    },
    {
      question: "What evidence belongs in an artifact publication incident report?",
      answer:
        "Include the build and commit, artifact coordinates, local and remote checksums, sanitized errors, repository and credential configuration evidence, root cause, recovery, and preventive actions.",
    },
  ],

  references: [
    {
      title: "Jenkins Pipeline",
      url: "https://www.jenkins.io/doc/book/pipeline/",
    },
    {
      title: "Jenkins Pipeline Syntax",
      url: "https://www.jenkins.io/doc/book/pipeline/syntax/",
    },
    {
      title: "Jenkins Using Credentials",
      url: "https://www.jenkins.io/doc/book/using/using-credentials/",
    },
    {
      title: "Jenkins Artifact Archiving Step",
      url: "https://www.jenkins.io/doc/pipeline/steps/core/",
    },
    {
      title: "Apache Maven Deploy Plugin",
      url: "https://maven.apache.org/plugins/maven-deploy-plugin/",
    },
    {
      title: "Gradle Maven Publish Plugin",
      url: "https://docs.gradle.org/current/userguide/publishing_maven.html",
    },
    {
      title: "Sonatype Nexus Repository Documentation",
      url: "https://help.sonatype.com/",
    },
    {
      title: "JFrog Artifactory Documentation",
      url: "https://jfrog.com/help/",
    },
    {
      title: "AWS CLI S3 Commands",
      url: "https://docs.aws.amazon.com/cli/latest/reference/s3/",
    },
    {
      title: "Docker Image Push",
      url: "https://docs.docker.com/reference/cli/docker/image/push/",
    },
  ],
};
