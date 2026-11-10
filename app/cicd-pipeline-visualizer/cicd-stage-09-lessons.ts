export type ECRSection = {
  title: string;
  content: string;
  code?: string;
  practicalNotes?: string[];
};

export type ECRLesson = {
  title: string;
  description: string;
  sections: ECRSection[];
  exercise: string;
};

const section = (
  title: string,
  content: string,
  code?: string,
  practicalNotes?: string[]
): ECRSection => ({ title, content, code, practicalNotes });

export const stageNineLessonOverrides: Record<string, ECRLesson> = {
  "Amazon ECR Fundamentals": {
    title: "Amazon ECR Fundamentals",
    description: "Understand Amazon Elastic Container Registry and how it stores, secures, and distributes container images for AWS workloads.",
    sections: [
      section("What Amazon ECR Is", "Amazon Elastic Container Registry (ECR) is a managed container image registry provided by AWS. Teams use it to store Docker and OCI-compatible images and distribute them to services such as Amazon ECS, Amazon EKS, AWS CodeBuild, and other container platforms."),
      section("Why Organizations Use ECR", "ECR removes the need to operate and maintain a separate registry server. It integrates with AWS Identity and Access Management, supports private repositories, image scanning, encryption, lifecycle policies, and cross-region or cross-account distribution."),
      section("Private and Public Registries", "ECR provides private repositories for controlled organizational image storage and Amazon ECR Public for publicly accessible images. Private registries use AWS account and region-specific registry endpoints. Public repositories are designed for images intended for broad distribution."),
      section("Repository and Image Concepts", "A repository is a logical container for related images. Each image can have one or more tags and a content digest. A tag is a human-readable reference, while a digest identifies a specific image manifest by its content hash."),
      section("ECR in a CI/CD Pipeline", "A CI pipeline builds an application image, runs tests and security checks, authenticates to ECR, and pushes an approved image. A deployment pipeline then retrieves that same image for ECS or EKS. Recording the digest preserves artifact traceability."),
      section("AWS CLI Fundamentals", "The AWS CLI is commonly used to inspect registries, create repositories, authenticate Docker, and manage image metadata. Configure a valid AWS identity and region before running ECR commands.", "aws sts get-caller-identity\naws configure get region\naws ecr describe-repositories --region ap-south-1"),
      section("ECR Pricing and Operational Considerations", "ECR costs can include image storage, data transfer, and applicable scanning or related service charges. Remove obsolete images through carefully designed lifecycle policies and monitor repository growth."),
      section("Hands-on Exercise", "Identify the AWS account and region, inspect existing ECR repositories, and explain how a built image moves from a CI pipeline into a deployment environment.")
    ],
    exercise: "Use AWS CLI to identify your account, inspect ECR repositories in ap-south-1, and document how a Docker image is built, stored, and deployed using ECR."
  },

  "ECR Registry Architecture": {
    title: "ECR Registry Architecture",
    description: "Understand ECR registry endpoints, repositories, manifests, image layers, authentication, and AWS service integration.",
    sections: [
      section("Registry Architecture Overview", "An ECR private registry belongs to an AWS account and region. It contains repositories, and each repository stores image manifests and their associated layers. Clients communicate with the registry through authenticated HTTPS requests."),
      section("Registry URI Structure", "A private ECR registry URI normally follows ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com. The account ID identifies the owning AWS account and the region identifies the registry location.", "aws sts get-caller-identity\naws ecr get-authorization-token --region ap-south-1"),
      section("Repository and Manifest Structure", "A repository contains image references. An image manifest describes the configuration and filesystem layers required to retrieve an image. Multi-platform images may use an image index or manifest list that references platform-specific manifests."),
      section("Image Layer Storage", "Container images are composed of reusable layers. When a client pulls an image, it retrieves the required manifest and layers. Shared layers can reduce repeated transfer when multiple images use common base images."),
      section("Authentication and Authorization Flow", "A client first obtains an ECR authorization token using an AWS identity. Docker uses that temporary authorization to communicate with the registry. IAM permissions control AWS-side operations such as obtaining the token and accessing repository images."),
      section("AWS Service Integration", "ECS tasks, EKS worker nodes, managed node groups, Fargate workloads, and build services can retrieve images from ECR when their execution identity has the required permissions and network connectivity."),
      section("Regional Architecture", "ECR repositories are regional resources. A workload in another region may need a replicated repository or a deliberate cross-region image distribution strategy to reduce latency and improve regional availability."),
      section("Architecture Diagnostics", "When image access fails, identify the registry account, region, repository, image tag or digest, caller identity, and client network path. Check whether the problem is authentication, authorization, repository existence, or connectivity."),
      section("Hands-on Exercise", "Draw the path from a Jenkins build agent to an ECR repository and then to an EKS worker node. Identify the identities and permissions required at each point.")
    ],
    exercise: "Document the ECR registry URI for your AWS account and region. Trace authentication, repository authorization, manifest retrieval, and image layer download."
  },

  "Repository Creation": {
    title: "Repository Creation",
    description: "Create and configure ECR repositories with appropriate naming, encryption, scanning, tag mutability, and operational settings.",
    sections: [
      section("Repository Naming Strategy", "Use repository names that identify the application, service, or team. Consistent naming makes access policies, lifecycle rules, automation, and operational ownership easier to manage."),
      section("Creating a Repository", "The create-repository command creates a private repository in the selected AWS region. Repository names must follow ECR naming rules, and the caller needs permission to create repositories.", "aws ecr create-repository --repository-name payment-service --region ap-south-1"),
      section("Repository Configuration", "Repository settings include encryption configuration, image tag mutability, image scanning configuration, and access policies. Choose these settings according to the organization's security and release requirements."),
      section("Encryption Configuration", "ECR encrypts images at rest. Depending on the configuration, repository encryption can use an AWS-managed key or a customer-managed AWS KMS key. Customer-managed keys provide additional control over key policies and lifecycle."),
      section("Tag Mutability Configuration", "Mutable tags can be updated to point to another image. Immutable tag settings prevent accidental reuse of existing tags, helping protect release traceability. Select a mode compatible with the release process."),
      section("Scanning Configuration", "Configure the repository's image scanning behavior according to the account's supported ECR scanning configuration. Validate whether scanning occurs on push or through enhanced scanning workflows."),
      section("Inspecting Repository Settings", "Describe repositories to confirm URI, encryption, mutability, and scanning configuration. Do not assume the requested configuration was applied until the returned settings are inspected.", "aws ecr describe-repositories --repository-names payment-service --region ap-south-1"),
      section("Repository Deletion Safety", "Deleting a repository can remove its images and disrupt deployments or rollback procedures. Confirm ownership, image usage, retention requirements, and approval before deleting a production repository."),
      section("Hands-on Exercise", "Create a development repository, inspect its URI and configuration, and compare its settings with the requirements for a production repository.")
    ],
    exercise: "Create an ECR repository named devmavox/payment-service, inspect its settings, and document the encryption, tag mutability, and scanning decisions."
  },

  "AWS IAM Permissions": {
    title: "AWS IAM Permissions",
    description: "Configure least-privilege IAM permissions for ECR authentication, image publishing, image retrieval, and repository administration.",
    sections: [
      section("IAM and ECR Authorization", "IAM determines which AWS API actions an identity can perform. ECR access commonly involves permissions to obtain an authorization token and repository-specific permissions for image upload or download."),
      section("Authentication Versus Authorization", "Authentication establishes which AWS identity is making the request. Authorization determines whether that identity can perform the requested operation. A successful AWS login does not automatically grant permission to push or pull every ECR repository."),
      section("Push Permissions", "A publishing identity generally needs ecr:GetAuthorizationToken and repository-scoped upload actions such as InitiateLayerUpload, UploadLayerPart, CompleteLayerUpload, BatchCheckLayerAvailability, and PutImage."),
      section("Pull Permissions", "A pulling identity commonly needs ecr:GetAuthorizationToken and repository actions such as BatchGetImage and GetDownloadUrlForLayer. Restrict repository access to the images required by the workload."),
      section("Example Push Policy", "The following illustrative identity policy grants ECR authentication and image upload operations to one repository. Replace the account, region, and repository values before use.", "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": \"ecr:GetAuthorizationToken\",\n      \"Resource\": \"*\"\n    },\n    {\n      \"Effect\": \"Allow\",\n      \"Action\": [\n        \"ecr:BatchCheckLayerAvailability\",\n        \"ecr:InitiateLayerUpload\",\n        \"ecr:UploadLayerPart\",\n        \"ecr:CompleteLayerUpload\",\n        \"ecr:PutImage\"\n      ],\n      \"Resource\": \"arn:aws:ecr:ap-south-1:123456789012:repository/payment-service\"\n    }\n  ]\n}"),
      section("IAM Roles for CI/CD", "Prefer IAM roles, workload identity, or temporary credentials for Jenkins and other CI systems. Avoid long-lived access keys embedded in Jenkinsfiles, source repositories, or Docker configuration."),
      section("ECS and EKS Image Pull Identities", "ECS image retrieval commonly uses the task execution role. EKS image retrieval depends on the node or Fargate execution identity and the configured AWS access model. Verify the actual identity used by the runtime rather than assuming the application service account performs the pull."),
      section("Policy Evaluation and Explicit Deny", "An explicit Deny overrides an Allow. Resource policies, identity policies, permissions boundaries, service control policies, and session policies can all affect the final authorization decision."),
      section("IAM Troubleshooting", "Use the exact denied action and resource from the error message. Check the caller identity, region, repository ARN, trust relationship, policy conditions, and organization-level restrictions."),
      section("Hands-on Exercise", "Create separate push and pull roles or policies for a test repository. Verify that the pull identity cannot upload images and the push identity cannot administer unrelated repositories.")
    ],
    exercise: "Design least-privilege IAM permissions for a CI image publisher and an EKS image consumer. Validate the identities and document the required repository-scoped actions."
  },

  "Docker Authentication": {
    title: "Docker Authentication",
    description: "Authenticate Docker clients to ECR securely using AWS credentials and temporary registry authorization tokens.",
    sections: [
      section("Why Docker Authentication Is Required", "Docker needs registry credentials to push private images and retrieve private images. ECR uses AWS IAM to issue an authorization token that Docker can use for registry operations."),
      section("AWS Identity Verification", "Before obtaining an ECR token, verify the AWS identity and active profile. This prevents publishing to an unintended account or region.", "aws sts get-caller-identity\naws configure list"),
      section("ECR Login Command", "The AWS CLI retrieves a temporary ECR password and passes it directly to Docker through standard input. This avoids placing the password directly in the command text.", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com"),
      section("Temporary Token Behavior", "ECR authorization tokens are temporary and have a limited validity period. Automation should obtain a fresh token when required rather than depending on old credentials stored on a build agent."),
      section("Jenkins Authentication", "A Jenkins pipeline should assume an approved AWS role or use an approved credential integration. The login command should execute only after the job has established the intended AWS identity and region."),
      section("Docker Credential Storage", "Docker may store registry credentials in its configuration directory or delegate storage to a credential helper. Protect the agent workspace and home directory, and avoid printing credential contents in logs."),
      section("Non-interactive CI Authentication", "Use password-stdin for automation. Avoid interactive login prompts in pipeline jobs because they can hang or fail when no terminal is available."),
      section("Authentication Failure Diagnosis", "Common problems include expired AWS credentials, wrong region, incorrect registry hostname, missing GetAuthorizationToken permission, Docker daemon problems, and proxy or DNS failures."),
      section("Hands-on Exercise", "Authenticate to a test ECR registry using AWS CLI, verify the Docker login result, and confirm that no password is printed in the CI console output.")
    ],
    exercise: "Authenticate Docker to your ECR registry using get-login-password and password-stdin. Verify the AWS identity and registry region before attempting a test push."
  },

  "Image Tagging": {
    title: "Image Tagging",
    description: "Create consistent image references using application versions, Git commits, environment labels, and registry repository names.",
    sections: [
      section("Image Reference Structure", "An ECR image reference contains the registry URI, repository name, and optional tag. The registry account and region must match the intended destination."),
      section("Tagging a Local Image", "Docker tag creates another reference to an existing local image. It does not rebuild the image or change its underlying content.", "docker tag payment-service:latest 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.0.0"),
      section("Semantic Versioning", "Use release tags such as 1.0.0 or 2.1.3 to communicate application release versions. Define how major, minor, and patch versions are assigned so that tags remain meaningful."),
      section("Git Commit Tags", "A short Git commit identifier can connect an image to the exact source revision. This is useful for debugging, audit trails, and reproducing a build."),
      section("Environment Tags", "Labels such as dev, staging, and production can be useful for workflow organization, but mutable environment tags should not replace immutable release identity. Promote approved digests between environments."),
      section("Tagging in Jenkins", "A pipeline can calculate the commit identifier, build the image once, and assign both a release tag and a commit tag. Store the tag as a build artifact or deployment output."),
      section("Tag Verification", "Inspect local image tags and remote repository image details to confirm that the intended reference exists. Verify the digest when the exact image content matters.", "docker image ls\naws ecr describe-images --repository-name payment-service --region ap-south-1"),
      section("Tagging Mistakes", "Common mistakes include pushing to the wrong account, using an incorrect region, reusing release tags, and confusing local image tags with remote registry tags."),
      section("Hands-on Exercise", "Build one application image and assign a semantic release tag and a Git commit tag. Verify both references before publishing.")
    ],
    exercise: "Tag an application image with a release version and a Git commit identifier. Confirm the full ECR image URI and explain how each tag supports traceability."
  },

  "Image Push Workflow": {
    title: "Image Push Workflow",
    description: "Build, tag, authenticate, and publish container images to ECR with reliable CI/CD controls.",
    sections: [
      section("Push Workflow Overview", "A normal push workflow verifies the AWS identity, confirms the repository, authenticates Docker, builds or selects an image, tags it with the ECR URI, and pushes it to the registry."),
      section("Pre-push Validation", "Check the account ID, region, repository name, image version, and local image existence before publishing. Validate that the pipeline is using the expected AWS role."),
      section("Build the Application Image", "Build the image from the approved source revision. Use a reproducible Dockerfile and a controlled build context. Run tests before pushing the release artifact.", "docker build -t payment-service:1.0.0 ."),
      section("Tag for ECR", "Apply the full registry and repository reference to the local image. This ensures Docker sends the image to the intended ECR repository.", "docker tag payment-service:1.0.0 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.0.0"),
      section("Authenticate and Push", "Authenticate using the AWS CLI and then push the tagged image. The identity needs token permission and the repository upload actions.", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com\ndocker push 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.0.0"),
      section("Jenkins Pipeline Integration", "A Jenkins stage should fail immediately if identity verification, authentication, build, or push fails. Capture the resulting image URI and digest for downstream deployment stages."),
      section("Push Verification", "After the push, describe the image in ECR and confirm its tag, digest, and push timestamp. A successful local Docker command should be followed by remote verification."),
      section("Retry and Idempotency", "Network interruptions may cause a push to fail partway through. Retry only after checking the repository state and ensuring the same intended image reference is being published."),
      section("Hands-on Exercise", "Create a test image, tag it for ECR, authenticate, push it, and verify that the remote repository contains the expected tag and digest.")
    ],
    exercise: "Implement a complete image push workflow with identity verification, Docker authentication, build, tag, push, and remote digest verification."
  },

  "Image Pull Workflow": {
    title: "Image Pull Workflow",
    description: "Retrieve private ECR images securely and understand how ECS, EKS, and other clients access registry artifacts.",
    sections: [
      section("Pull Workflow Overview", "A pull operation resolves the image reference, authenticates to the registry, retrieves the manifest, and downloads the required image layers. The client then makes the image available locally for container execution."),
      section("Manual Docker Pull", "A developer or operator can authenticate to ECR and pull a specific repository tag. Use the complete registry URI so the request targets the intended account and region.", "docker pull 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.0.0"),
      section("Pull by Digest", "Pulling by digest identifies exact image content and avoids ambiguity caused by mutable tags. Record the digest produced by the approved build and use it in deployment definitions where supported."),
      section("ECS Image Retrieval", "ECS commonly uses the task execution role to retrieve images from ECR. Verify that the role has the required ECR permissions and that the task can reach the registry."),
      section("EKS Image Retrieval", "EKS image pulls are performed by the node or Fargate execution environment, not automatically by the application process. Verify the node role or applicable image credential configuration and the cluster's network path."),
      section("Private Subnet Connectivity", "Private workloads may require NAT connectivity or appropriate VPC endpoints and endpoint policies for ECR API, registry access, and image layer storage. Validate the complete network path, including DNS and security rules."),
      section("Pull Verification", "Check the local image list and inspect image metadata after pulling. For production deployment, verify that the pulled image digest matches the approved release digest.", "docker image ls\naws ecr describe-images --repository-name payment-service --region ap-south-1"),
      section("Pull Failure Recovery", "Investigate ImagePullBackOff, authorization failures, missing tags, DNS errors, and network timeouts separately. Confirm the runtime identity and exact image URI before changing permissions."),
      section("Hands-on Exercise", "Pull an ECR image using Docker and then describe how an EKS node retrieves the same image in a private subnet.")
    ],
    exercise: "Pull a private ECR image, verify its digest, and document the IAM permissions and network connectivity required for an EKS node to retrieve it."
  },

  "Immutable Image Tags": {
    title: "Immutable Image Tags",
    description: "Protect release traceability by preventing existing ECR tags from being overwritten and defining controlled release naming.",
    sections: [
      section("Mutable and Immutable Tags", "A mutable tag can be moved to point to a different image. An immutable tag prevents an existing tag from being overwritten, reducing the risk that a release reference silently changes."),
      section("Why Immutability Matters", "Immutable release references support reproducible deployments, incident investigations, compliance evidence, and rollback. They help ensure that a version such as 1.0.0 continues to identify the same image."),
      section("Enabling Tag Immutability", "Configure repository tag mutability when creating the repository or update the repository configuration using the supported ECR API and CLI options.", "aws ecr put-image-tag-mutability --repository-name payment-service --image-tag-mutability IMMUTABLE --region ap-south-1"),
      section("Exclusion Filters", "Where supported, ECR mutability exclusion filters allow selected tag patterns to retain different behavior. Design exceptions carefully and verify the exact repository configuration before relying on them."),
      section("Release Tagging Strategy", "Use unique release tags based on semantic versions or build identifiers. If a build must be replaced, publish a new version rather than attempting to overwrite an immutable release tag."),
      section("Handling Tag Collision", "A push that attempts to reuse an immutable tag can fail. Treat this as a release process issue: verify the existing image, determine whether the build is a duplicate, and allocate a new unique tag when appropriate."),
      section("Verifying Immutability", "Inspect repository configuration and test the behavior using a non-production repository. Confirm that a second push using an existing tag is rejected."),
      section("Hands-on Exercise", "Enable immutable tags on a test repository, push an image, and attempt to reuse its tag. Record the expected behavior and design a safe release naming convention.")
    ],
    exercise: "Enable immutable tags for a test ECR repository, verify the setting, and demonstrate how a pipeline handles a duplicate release tag without overwriting an existing artifact."
  },

  "Image Digests": {
    title: "Image Digests",
    description: "Use image content digests for immutable artifact identification, deployment verification, and release promotion.",
    sections: [
      section("What an Image Digest Is", "An image digest is a cryptographic content identifier for an image manifest or image index. It identifies specific registry content and is more reliable than a mutable human-readable tag."),
      section("Tags Compared with Digests", "A tag is a named reference that may be changed unless protected by immutability settings. A digest identifies a particular manifest content and is suitable for exact artifact references."),
      section("Retrieving ECR Digests", "Use ECR image description commands to retrieve image tags, digests, and push timestamps. Store the digest as a pipeline output after successful publication.", "aws ecr describe-images --repository-name payment-service --region ap-south-1 --query 'imageDetails[*].[imageTags,imageDigest,imagePushedAt]'"),
      section("Pulling by Digest", "A digest-based image reference uses the repository URI followed by @sha256 and the digest. This ensures the client requests the exact manifest identified by that digest.", "docker pull 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service@sha256:REPLACE_WITH_DIGEST"),
      section("Multi-platform Image Digests", "A multi-platform image index can reference different platform-specific manifests. Understand whether the recorded digest represents the index or a platform-specific manifest when investigating architecture-dependent behavior."),
      section("Digest Promotion Between Environments", "Build and test an image once, record its digest, and promote that same digest through staging and production. Avoid rebuilding the application separately for each environment."),
      section("Deployment Verification", "After deployment, inspect the image reference used by the workload and compare it with the approved digest. This provides evidence that the intended artifact was deployed."),
      section("Digest-based Rollback", "Keep the previous approved digest available so a rollback can restore the exact earlier image. Retention policies must preserve images required by active deployments and rollback procedures."),
      section("Hands-on Exercise", "Publish an image, retrieve its digest, pull it by digest, and document how that digest is passed from a CI build stage into an EKS deployment.")
    ],
    exercise: "Capture an ECR image digest after push, deploy using the digest rather than a mutable tag, and verify the deployed workload references the approved artifact."
  },

  "Lifecycle Policies": {
    title: "Lifecycle Policies",
    description: "Control ECR storage growth using lifecycle rules that expire obsolete images while preserving active releases and rollback artifacts.",
    sections: [
      section("Purpose of Lifecycle Policies", "ECR lifecycle policies automate the expiration of images that meet defined criteria. They help control storage usage and reduce repository clutter without requiring manual cleanup."),
      section("Policy Evaluation Concepts", "Rules can target image tags, tag prefixes, untagged images, image age, or image count depending on the supported rule configuration. Rule priority determines how overlapping rules are evaluated."),
      section("Tagged Image Retention", "Retain a defined number of recent release or production images. The correct retention count should account for deployment frequency, rollback requirements, and audit obligations."),
      section("Untagged Image Cleanup", "Untagged images may remain after tag updates or failed release workflows. A policy can expire eligible untagged images after a suitable period, but ensure that no required manifest or deployment process depends on them."),
      section("Example Lifecycle Policy", "This example retains a limited number of recent tagged release images. Validate the repository's actual tag naming convention before applying any policy.", "{\n  \"rules\": [\n    {\n      \"rulePriority\": 1,\n      \"description\": \"Retain recent production release images\",\n      \"selection\": {\n        \"tagStatus\": \"tagged\",\n        \"tagPrefixList\": [\"release-\"],\n        \"countType\": \"imageCountMoreThan\",\n        \"countNumber\": 20\n      },\n      \"action\": { \"type\": \"expire\" }\n    }\n  ]\n}"),
      section("Applying a Lifecycle Policy", "Store lifecycle policy JSON in source control, validate its syntax, and apply it to the intended repository. Review the policy preview before enabling expiration.", "aws ecr put-lifecycle-policy --repository-name payment-service --lifecycle-policy-text file://lifecycle-policy.json --region ap-south-1"),
      section("Lifecycle Policy Preview", "Use the lifecycle policy preview operation to understand which images are eligible for expiration before relying on the policy. Preview results should be reviewed against production rollback and compliance requirements."),
      section("Protecting Production Images", "Do not expire images that are currently deployed, required for disaster recovery, or needed for an approved rollback window. Align retention with release and incident management processes."),
      section("Hands-on Exercise", "Write a lifecycle policy for a test repository, preview the affected images, and explain why the proposed retention window is safe.")
    ],
    exercise: "Create and preview an ECR lifecycle policy that retains recent release images and expires eligible old artifacts. Document how active production and rollback images are protected."
  },

  "Encryption and Access Control": {
    title: "Encryption and Access Control",
    description: "Protect ECR images at rest and in transit through encryption settings, KMS key policies, IAM, repository policies, and network controls.",
    sections: [
      section("ECR Security Layers", "ECR security combines AWS identity permissions, repository resource policies, encryption, TLS-protected communication, network controls, and image governance. No single setting replaces the others."),
      section("Encryption at Rest", "ECR encrypts stored image data at rest. Repository encryption configuration can use an AWS-managed key or a customer-managed KMS key, depending on the repository configuration and supported options."),
      section("Customer-managed KMS Keys", "Customer-managed keys provide control over key policies, grants, rotation, and administrative access. Restrict key administration separately from routine image publishing and pulling."),
      section("KMS Key Policy Dependencies", "A repository may become inaccessible if its required KMS key is disabled, scheduled for deletion, or has an incompatible key policy. Coordinate key lifecycle changes with repository owners."),
      section("Encryption in Transit", "Use the registry's HTTPS endpoint and preserve TLS certificate validation. Do not disable certificate checks to work around proxy or trust-store problems."),
      section("IAM and Repository Policies", "IAM identity policies grant permissions to users and roles. ECR repository policies can grant repository access to other principals, including supported cross-account use cases. Review both policy types together."),
      section("Least-privilege Repository Access", "Separate image publisher, image consumer, and repository administrator permissions. Scope repository actions to the required ARN and avoid broad wildcard access where a narrower policy is practical."),
      section("Network Security", "For private workloads, control access through VPC networking, endpoints, security groups, DNS, and endpoint policies where applicable. Confirm that both ECR API and image data retrieval paths are reachable."),
      section("Security Audit and Monitoring", "Use AWS CloudTrail and relevant AWS monitoring services to investigate registry API activity and access changes. Review unexpected image pushes, policy modifications, and repository configuration changes."),
      section("Hands-on Exercise", "Review a test repository's encryption configuration, KMS key policy, IAM policy, and repository policy. Identify excessive permissions and propose safer controls.")
    ],
    exercise: "Design a secure ECR repository with encryption, least-privilege push and pull access, protected KMS key permissions, and controlled network access."
  },

  "Image Vulnerability Scanning": {
    title: "Image Vulnerability Scanning",
    description: "Identify vulnerabilities in container images using ECR scanning capabilities and integrate remediation into CI/CD release gates.",
    sections: [
      section("Why Image Scanning Matters", "Container images may include vulnerable operating-system packages, language libraries, and application dependencies. Scanning helps teams identify known security issues before deployment."),
      section("Basic and Enhanced Scanning", "ECR supports different image scanning capabilities. Basic scanning focuses on operating-system vulnerabilities, while enhanced scanning integrates with Amazon Inspector for broader supported scanning coverage. Availability and behavior depend on account and region configuration."),
      section("Scan Configuration", "Review registry-level scanning configuration and repository-level settings. Ensure the selected scanning mode matches the organization's security requirements and the AWS features enabled in the account."),
      section("Scan on Push", "Scan-on-push workflows evaluate an image after it is published. This allows a CI pipeline to use scan findings as an input to release approval."),
      section("Retrieving Scan Findings", "Use the appropriate ECR image scan finding APIs or AWS console views for the configured scanning mode. Record the repository, image digest, finding severity, package, and available fix information."),
      section("Severity and Risk Prioritization", "Prioritize vulnerabilities using severity, exploitability, exposure, affected package, fix availability, and application context. A critical rating should trigger investigation, but risk decisions should be based on the full finding context."),
      section("CI/CD Security Gate", "A pipeline can evaluate scan findings and block promotion when policy thresholds are exceeded. Define exceptions through an approved process with an owner, reason, and expiration date."),
      section("Remediation Workflow", "Update vulnerable base images or application dependencies, rebuild the image, rerun tests, and scan the new digest. Do not assume that changing a tag alone removes a vulnerability."),
      section("Continuous Monitoring", "New vulnerabilities may be disclosed after an image was originally scanned. Enhanced scanning workflows can support ongoing visibility for configured resources. Establish a process to review newly identified findings."),
      section("Hands-on Exercise", "Push a test image, inspect its scan status and findings, identify one package requiring remediation, and describe the rebuild and rescan workflow.")
    ],
    exercise: "Enable the appropriate ECR scanning configuration for a test repository, inspect findings for a published image, and design a severity-based CI/CD release gate."
  },

  "Cross-account Access": {
    title: "Cross-account Access",
    description: "Allow approved AWS accounts and deployment roles to retrieve or publish ECR images through resource policies and IAM trust.",
    sections: [
      section("Cross-account ECR Use Cases", "Organizations may build images in a central tooling account and deploy them into separate development, staging, and production accounts. Cross-account access avoids unnecessary image duplication when the architecture permits shared access."),
      section("Identity and Resource Policies", "Cross-account authorization normally requires the source principal to have suitable identity permissions and the repository owner to grant access through an ECR repository policy. Both sides must permit the requested operation."),
      section("Repository Policy Structure", "A repository policy identifies principals and allowed repository actions. Restrict access to named AWS account roots or specific roles rather than granting access to every principal."),
      section("Example Repository Policy", "This illustrative policy allows a role in another account to retrieve images. Replace the account and role identifiers with approved values.", "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"AllowProductionPull\",\n      \"Effect\": \"Allow\",\n      \"Principal\": {\n        \"AWS\": \"arn:aws:iam::210987654321:role/EKSImagePullRole\"\n      },\n      \"Action\": [\n        \"ecr:BatchGetImage\",\n        \"ecr:GetDownloadUrlForLayer\"\n      ]\n    }\n  ]\n}"),
      section("Applying a Repository Policy", "Apply the repository policy using the ECR CLI and inspect the returned policy. Confirm that the repository name and AWS region are correct.", "aws ecr set-repository-policy --repository-name payment-service --policy-text file://repository-policy.json --region ap-south-1"),
      section("Cross-account Authentication", "The consuming workload must authenticate to the registry using an AWS identity that is allowed to retrieve the image. A repository policy alone does not replace the required ECR authorization-token permission."),
      section("EKS Cross-account Image Pulls", "An EKS node in another account needs an appropriate image-pull identity and repository access. Validate node role permissions, repository policy, network access, and the exact registry URI used by the Pod."),
      section("Cross-account Security Controls", "Restrict principals, actions, and repositories. Monitor access and remove obsolete account grants when teams or environments are decommissioned."),
      section("Cross-account Troubleshooting", "Check the actual caller identity, principal ARN, repository policy, identity policy, region, registry URI, and organization restrictions. Distinguish token authorization errors from repository access denials."),
      section("Hands-on Exercise", "Configure a test repository policy that allows a designated role from a second account to pull an image and verify that unrelated principals remain denied.")
    ],
    exercise: "Create a controlled cross-account ECR pull design. Configure the repository policy and consuming IAM role, then verify access using the intended role."
  },

  "Registry Replication": {
    title: "Registry Replication",
    description: "Distribute ECR images across AWS regions or accounts to support regional deployment, disaster recovery, and centralized artifact delivery.",
    sections: [
      section("Why Registry Replication Is Used", "Replication copies images from a source ECR registry to configured destination registries. It supports regional workloads, disaster recovery, and organizational image distribution without requiring every pipeline to publish independently."),
      section("Replication Architecture", "A replication rule defines destination registry information and repository filters. When eligible images are pushed to the source, ECR replicates them to the configured destinations."),
      section("Cross-region Replication", "Cross-region replication places images closer to workloads in another AWS region. This can reduce image retrieval latency and improve deployment readiness during regional operations."),
      section("Cross-account Replication", "Cross-account replication distributes images to a different AWS account. The destination account must establish the required registry permissions and replication configuration."),
      section("Replication Configuration", "Configure registry-level replication rules with destination account and region values. Use repository filters to control which images are distributed.", "aws ecr put-replication-configuration --replication-configuration file://replication.json --region ap-south-1"),
      section("Destination Registry Permissions", "Cross-account replication requires the destination registry to allow the source registry to replicate eligible images. Validate destination permissions and source account details before testing."),
      section("Replication Monitoring", "Verify that the destination repository contains the expected image tag and digest after replication. Monitor failed replication events and distinguish delayed replication from a configuration or permission failure."),
      section("Replication and Release Promotion", "Replication distributes an image but does not itself approve the image for production. Maintain separate security scanning, release approval, and deployment controls at the destination."),
      section("Disaster Recovery Design", "Keep critical release artifacts available in a recovery region and document how workloads authenticate and retrieve them during a regional incident. Test the process instead of assuming replication alone provides complete recovery."),
      section("Hands-on Exercise", "Design a source-to-destination replication rule for a test repository. Verify the destination image and document how the deployment pipeline uses the replicated artifact.")
    ],
    exercise: "Configure a test ECR replication rule for a second region or account, verify the replicated image, and explain how the design supports regional recovery."
  },

  "Troubleshooting": {
    title: "Troubleshooting",
    description: "Diagnose ECR authentication, authorization, image push, pull, scanning, lifecycle, encryption, and replication failures.",
    sections: [
      section("Evidence-first Troubleshooting", "Record the AWS account, region, repository URI, image tag or digest, caller identity, command, timestamp, and full error message. Avoid changing IAM policies or deleting images before identifying the failure category."),
      section("AccessDeniedException", "An access-denied error may result from missing identity permissions, repository policy restrictions, KMS key permissions, permission boundaries, service control policies, or explicit Deny statements. Identify the denied API action and resource."),
      section("Docker Login Failure", "Check AWS credentials, active profile, account, region, registry hostname, and ecr:GetAuthorizationToken permission. Confirm that Docker is running and that the login command uses password-stdin."),
      section("Image Push Failure", "A push may fail because of missing upload actions, an incorrect repository URI, an immutable tag collision, insufficient local disk space, or a network interruption. Inspect the first failing operation and verify the target repository."),
      section("Image Pull and ImagePullBackOff", "For ECS or EKS pull failures, check the image URI, tag or digest, runtime identity, repository policy, token permissions, and network access. Do not assume that the application's own IAM role is used for image retrieval."),
      section("Repository Not Found", "A repository-not-found response may indicate a wrong repository name, account ID, or region. Verify the active AWS identity and list repositories in the intended region before creating a replacement."),
      section("TLS, DNS, and Network Problems", "Check registry hostname resolution, outbound connectivity, proxy configuration, certificate trust, and required ECR endpoints. Private subnets may need suitable endpoints or NAT connectivity for the full image retrieval path."),
      section("KMS Encryption Errors", "Investigate the repository encryption configuration, KMS key state, key policy, grants, and caller permissions. Avoid disabling encryption as a shortcut for an authorization problem."),
      section("Scanning and Replication Issues", "Check scanning configuration, image status, supported scanning mode, destination permissions, replication rules, and event details. A missing finding or delayed replica does not automatically mean the image was never published."),
      section("Safe Recovery and Prevention", "Restore access through narrowly scoped policy corrections, republish only when necessary, preserve known-good digests, and test the fix with the intended identity. Add pipeline checks to catch account, region, and repository mistakes."),
      section("Hands-on Exercise", "Simulate an invalid repository name or insufficient permission in a test environment. Collect evidence, identify the root cause, correct the configuration, and verify successful image access.")
    ],
    exercise: "Troubleshoot one ECR authentication failure and one image pull failure. Record the exact error, caller identity, missing permission or network dependency, recovery action, and verification."
  },

  "Production Hands-on Lab": {
    title: "Production Hands-on Lab",
    description: "Build a secure end-to-end ECR workflow that publishes an approved application image and makes it available for production deployment.",
    sections: [
      section("Production Scenario and Architecture", "A payment-service application is built by Jenkins and published to a central ECR repository. The image is tested and scanned, assigned an immutable release reference, and promoted to an EKS deployment using its digest."),
      section("AWS Account and Region Validation", "The pipeline must verify its AWS identity and selected region before creating or publishing any artifact. This prevents accidental publication into the wrong environment.", "aws sts get-caller-identity\naws configure get region"),
      section("Repository and Security Preparation", "Create the production repository with approved encryption, tag mutability, and scanning configuration. Define separate publishing and pulling permissions and document repository ownership."),
      section("Jenkins AWS Identity", "Configure Jenkins to assume an approved IAM role or use a supported workload identity integration. Avoid permanent access keys in source control and limit the role to the repositories required by the pipeline."),
      section("Build and Tag the Application", "Build the application image from a reviewed source revision. Assign a release tag and a Git commit tag so that the artifact can be traced to its source and build record.", "docker build -t payment-service:1.0.0 .\ndocker tag payment-service:1.0.0 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.0.0"),
      section("Authenticate and Publish", "Authenticate using the pipeline's AWS role and publish the tested image to ECR. Capture the push output and verify the image exists remotely.", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com\ndocker push 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.0.0"),
      section("Scan and Approve the Image", "Inspect the configured ECR scan results and evaluate vulnerabilities according to the organization's release policy. Remediate unacceptable findings, rebuild, and scan the new artifact before approval."),
      section("Capture the Approved Digest", "Retrieve the image digest from ECR and save it as a pipeline artifact. The digest becomes the immutable reference used by later deployment stages.", "aws ecr describe-images --repository-name payment-service --region ap-south-1 --query 'imageDetails[?contains(imageTags, `1.0.0`)].imageDigest'"),
      section("EKS Deployment Integration", "Configure the EKS workload to use the approved ECR image URI and digest. Ensure the node or Fargate execution identity can retrieve the image and that private subnet connectivity is available."),
      section("Lifecycle and Replication Governance", "Define retention rules that preserve active and rollback releases. Configure replication where regional or cross-account distribution is required and verify destination availability."),
      section("Production Monitoring and Incident Response", "Monitor image pull failures, deployment rollout status, repository access changes, and scan findings. Keep the previous approved digest available for controlled rollback."),
      section("Release Evidence and Audit", "Record the Git commit, build number, image tag, image digest, scan findings, IAM role, repository, approval, and deployment result. This evidence supports traceability and incident investigation."),
      section("Hands-on Exercise", "Complete the workflow in a non-production AWS account: create a repository, configure IAM, build and scan an image, push it, capture its digest, and deploy or simulate retrieval from an EKS workload.")
    ],
    exercise: "Implement an end-to-end ECR release workflow with Jenkins, least-privilege IAM, immutable image tags, vulnerability scanning, digest capture, and EKS image retrieval. Submit the commands, configuration, and validation evidence."
  }
};
