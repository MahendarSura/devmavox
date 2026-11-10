const makeLesson = (
  overview: string,
  purpose: string,
  architecture: string,
  workflow: string[],
  example: string,
  commands: string[],
  configuration: string,
  failures: string[],
  recovery: string[],
  bestPractices: string[],
  exercise: string
) => ({
  overview,
  purpose,
  architecture,
  workflow,
  example,
  commands,
  configuration,
  failures,
  recovery,
  bestPractices,
  exercise,
});

export const stageNineLessonOverrides = {
  "9|Amazon ECR Fundamentals": makeLesson(
    "Amazon Elastic Container Registry (ECR) is AWS's managed container image registry. It stores Docker and OCI images so CI/CD systems and runtime platforms can securely publish and retrieve application images.",
    "ECR provides a central, private registry for application images. A Spring Boot payment service can publish a tested image to ECR and allow Amazon EKS nodes to pull the same approved artifact during deployment.",
    "A developer builds an image locally or in Jenkins. Docker authenticates with AWS ECR, pushes image layers to an ECR repository, and EKS retrieves the image using an authorized IAM role. ECR stores the manifest, layers, tags, and digest.",
    ["Create an ECR repository in the target AWS account and region.", "Grant the CI identity permission to authenticate and push images.", "Build the payment-service Docker image.", "Authenticate Docker against the ECR registry.", "Tag and push the image to the repository.", "Configure Kubernetes to deploy the published image."],
    "Jenkins builds payment-service:1.4.0, tags it as 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.0, and pushes it to ECR. The deployment references that exact registry image.",
    ["aws sts get-caller-identity", "aws ecr describe-repositories --region ap-south-1", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com", "docker build -t payment-service:1.4.0 ."],
    "Use the correct AWS account ID, region, and repository name. Keep the registry URI separate from the image tag. Jenkins should obtain AWS credentials through an approved IAM role or credential integration rather than hardcoding access keys.",
    ["Using the wrong AWS region or account.", "Trying to push before creating the repository.", "Using an expired or unauthorized AWS identity.", "Confusing the repository URI with a complete image reference."],
    ["Confirm the active AWS identity and region.", "Verify the repository exists in the intended account.", "Refresh the ECR login token and authenticate again.", "Check IAM permissions and retry the push."],
    ["Use private repositories for internal application images.", "Use IAM roles with least privilege.", "Promote tested image artifacts instead of rebuilding separately for each environment.", "Record image tags and digests in deployment evidence."],
    "Create an ECR repository for payment-service, authenticate Docker, tag a locally built image with the registry URI, and verify that the repository contains the pushed image."
  ),

  "9|ECR Registry Architecture": makeLesson(
    "An ECR registry is associated with an AWS account and region. It contains repositories, and each repository stores image manifests, layers, tags, and image digests.",
    "Understanding the registry hierarchy helps engineers construct correct image names, manage permissions, and troubleshoot cross-account or cross-region image access.",
    "The registry endpoint identifies the AWS account and region. A repository identifies the application image collection. A tag is a human-readable reference to an image manifest, while a digest identifies the exact content.",
    ["Identify the AWS account and region.", "Locate the registry endpoint.", "Create or select an application repository.", "Build an image and tag it with the full repository path.", "Push the image manifest and layers.", "Inspect repository images and their digests."],
    "The payment-service repository in account 123456789012 and ap-south-1 has an image reference such as 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.0.",
    ["aws sts get-caller-identity", "aws ecr describe-registry --region ap-south-1", "aws ecr describe-repositories --region ap-south-1", "aws ecr list-images --repository-name payment-service --region ap-south-1"],
    "The standard private registry URI follows ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com. Append the repository name and then an optional tag or digest when referring to an image.",
    ["Using an endpoint from another account.", "Using a repository name that does not exist.", "Pushing to the wrong region.", "Assuming a tag is the same as an immutable digest."],
    ["Inspect the registry account and region.", "Confirm the repository name and URI.", "Compare the configured image reference with the ECR repository details.", "Use the digest to verify the exact artifact."],
    ["Keep account, region, repository, and tag values explicit in pipeline variables.", "Avoid embedding production account details throughout scripts.", "Use digests for deployment traceability.", "Separate development and production repositories or accounts according to governance."],
    "Draw the registry-to-repository-to-image hierarchy and identify the account, region, repository, tag, and digest for a payment-service image."
  ),

  "9|Repository Creation": makeLesson(
    "An ECR repository is the storage location for a container image family. A team normally creates a repository for each application or clearly defined image purpose.",
    "Creating repositories before a pipeline push avoids repository-not-found failures and allows teams to define scanning, encryption, and tag-mutability settings.",
    "An AWS account and region host the registry. Within it, the payment-service repository stores image manifests and layers. Repository settings control image scanning, encryption, and tag behavior.",
    ["Choose the AWS account and region.", "Select a repository naming convention.", "Create the repository with the required security settings.", "Retrieve its URI.", "Configure the CI pipeline to publish to that URI.", "Verify repository settings and image availability."],
    "Create a private repository named payment-service before Jenkins publishes the Spring Boot image.",
    ["aws ecr create-repository --repository-name payment-service --region ap-south-1 --image-tag-mutability IMMUTABLE", "aws ecr describe-repositories --repository-names payment-service --region ap-south-1", "aws ecr get-repository-policy --repository-name payment-service --region ap-south-1"],
    "Choose encryption, tag mutability, and image scanning settings based on organizational policy. Repository names should be predictable and avoid embedding secrets or environment credentials.",
    ["RepositoryAlreadyExistsException when automation assumes the repository is new.", "Invalid repository name.", "Creating the repository in the wrong region.", "Insufficient permission to create repositories."],
    ["Describe the repository before attempting creation.", "Use an idempotent pipeline step that creates only when missing.", "Check the active account, region, and IAM policy.", "Use the returned repository URI in subsequent stages."],
    ["Manage repositories through infrastructure as code where practical.", "Apply consistent naming and security policies.", "Restrict repository administration.", "Keep repository creation separate from routine image publishing."],
    "Create a payment-service repository with immutable tags, inspect its URI, and verify its encryption and scanning settings."
  ),

  "9|AWS IAM Permissions": makeLesson(
    "IAM controls which users, roles, and services can access ECR operations. Image publishing and image pulling require different permission sets.",
    "Least-privilege IAM prevents an application pipeline from gaining unnecessary control over the AWS registry. Jenkins generally needs push permissions, while EKS worker identities need pull permissions.",
    "The CI role receives ECR authorization-token access and repository upload actions. The node or workload identity used for image retrieval receives the required download actions. Repository policies can additionally grant cross-account access.",
    ["Identify the IAM principal used by Jenkins.", "Identify the principal used by the EKS nodes.", "Assign only the required ECR actions.", "Authenticate using the intended principal.", "Test a push using the CI role.", "Test a pull using the runtime identity."],
    "The Jenkins role can upload payment-service images, but it should not automatically receive permission to administer every ECR repository in the account.",
    ["aws sts get-caller-identity", "aws iam get-role --role-name JenkinsECRPushRole", "aws ecr get-login-password --region ap-south-1", "aws ecr describe-images --repository-name payment-service --region ap-south-1"],
    "Common push actions include ecr:BatchCheckLayerAvailability, ecr:InitiateLayerUpload, ecr:UploadLayerPart, ecr:CompleteLayerUpload, and ecr:PutImage. Authentication also requires ecr:GetAuthorizationToken. Pull permissions include actions such as ecr:BatchGetImage and ecr:GetDownloadUrlForLayer.",
    ["AccessDeniedException during login or push.", "Jenkins assumes an unexpected role.", "EKS nodes cannot retrieve private images.", "A policy allows authentication but denies repository upload."],
    ["Check aws sts get-caller-identity.", "Review identity policies and repository policies.", "Verify the correct region and repository resource ARN.", "Test push and pull permissions separately."],
    ["Use IAM roles instead of long-lived access keys.", "Scope repository actions to specific repository ARNs where supported.", "Keep push and pull responsibilities separate.", "Review permission changes and CloudTrail events."],
    "Create or inspect a restricted Jenkins ECR push role and explain why GetAuthorizationToken and repository upload permissions serve different purposes."
  ),

  "9|Docker Authentication": makeLesson(
    "Docker authentication establishes a session with a private ECR registry. AWS generates a temporary authorization token, and Docker stores the login session for subsequent registry operations.",
    "Without successful authentication, Docker cannot push to a private ECR repository. The pipeline must authenticate in the same environment where the Docker push runs.",
    "The AWS CLI uses the active IAM identity to request an ECR password. The password is passed to docker login through standard input. Docker then uses the registry session for push and pull operations.",
    ["Confirm the AWS CLI is configured with the intended identity.", "Select the repository region.", "Request an ECR authorization token.", "Pass the token securely to Docker login.", "Verify the login result.", "Push or pull the image."],
    "A Jenkins agent authenticates to the ap-south-1 ECR registry immediately before publishing payment-service:1.4.0.",
    ["aws sts get-caller-identity", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com", "docker info"],
    "The registry hostname must match the region and account of the target repository. Do not print the token or store it in source control. ECR authorization tokens are temporary and should be refreshed when needed.",
    ["no basic auth credentials.", "Expired ECR authorization token.", "Docker login targets the wrong registry hostname.", "AWS CLI cannot obtain credentials."],
    ["Reconfirm the AWS identity.", "Request a fresh token for the correct region.", "Run login on the same Jenkins agent that performs the push.", "Check network access and Docker daemon availability."],
    ["Use --password-stdin to avoid exposing the password in command arguments.", "Authenticate immediately before registry operations.", "Never echo authorization tokens into build logs.", "Use short-lived role credentials."],
    "Authenticate Docker to the correct ECR endpoint and verify that a test image can be pushed without exposing the token in terminal output."
  ),

  "9|Image Tagging": makeLesson(
    "An image tag is a readable label attached to an image reference. ECR image names combine the registry endpoint, repository name, and tag.",
    "Consistent tagging makes it possible to identify which source revision, build, and release an image represents. It also prevents teams from deploying an ambiguous image.",
    "Docker tags a local image with a fully qualified ECR repository path. The push operation publishes the tagged reference. The tag points to an image manifest, while the digest identifies its exact content.",
    ["Build the application image.", "Choose a release or commit-based tag.", "Construct the complete ECR image reference.", "Apply the tag to the local image.", "Push the tag.", "Record the resulting digest."],
    "A pipeline can publish payment-service:1.4.0 and payment-service:git-a82f91c so a release can be connected to its source commit.",
    ["docker build -t payment-service:1.4.0 .", "docker tag payment-service:1.4.0 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.0", "docker images", "docker push 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.0"],
    "Use a controlled tag format such as semantic-version plus build metadata or a Git commit SHA. Replace example account IDs, regions, and version numbers with actual project values.",
    ["Invalid image reference format.", "Tag points to an older local image.", "Two builds overwrite the same mutable tag.", "Pipeline constructs a tag from an empty variable."],
    ["Inspect docker images and the full image name.", "Rebuild or retag the intended image.", "Use a unique build identifier.", "Verify the remote image digest after pushing."],
    ["Avoid relying only on latest.", "Include source revision or build identity.", "Use immutable release tags when required.", "Keep tag naming consistent across environments."],
    "Tag a payment-service image with both a release version and Git commit identifier, then compare the resulting image references."
  ),

  "9|Image Push Workflow": makeLesson(
    "The image push workflow uploads a locally built container image to an ECR repository. Docker sends the image manifest and any missing layers to the registry.",
    "Publishing a single verified artifact allows deployment environments to consume the same tested image rather than rebuilding it independently.",
    "The CI agent builds the image, authenticates to ECR, applies the full registry reference, and pushes the manifest and layers. ECR stores the image and returns a successful registry operation.",
    ["Run unit tests and build the application.", "Build the Docker image.", "Authenticate Docker to ECR.", "Tag the image with the repository URI.", "Push the image.", "Inspect the repository and capture its digest."],
    "After Maven tests pass, Jenkins builds payment-service, tags it with the Git commit SHA, and publishes it to the ECR payment-service repository.",
    ["docker build -t payment-service:$env:BUILD_NUMBER .", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com", "docker tag payment-service:$env:BUILD_NUMBER 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:$env:BUILD_NUMBER", "docker push 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:$env:BUILD_NUMBER", "aws ecr describe-images --repository-name payment-service --region ap-south-1"],
    "The Jenkins pipeline should fail immediately when tests, authentication, tagging, or pushing fails. Use a unique build tag and retain the final image digest as a build artifact.",
    ["denied: User is not authorized to perform the requested operation.", "name unknown: repository does not exist.", "Layer upload fails because of network interruption.", "The pipeline pushes a different tag than the deployment expects."],
    ["Check repository and IAM permissions.", "Retry after confirming the registry connection.", "Verify the exact tag in ECR.", "Capture and compare the published digest."],
    ["Push only after required quality and security checks pass.", "Use unique immutable release identifiers.", "Keep build logs and digest metadata.", "Do not rebuild an already approved release artifact."],
    "Create a pipeline sequence that tests, builds, tags, authenticates, pushes, and verifies a payment-service image in ECR."
  ),

  "9|Image Pull Workflow": makeLesson(
    "The image pull workflow retrieves an image from ECR to a Docker host or Kubernetes worker node. The caller needs network connectivity and the required ECR download permissions.",
    "EKS nodes must retrieve the application image before starting containers. A correct image reference and pull permissions prevent ImagePullBackOff failures.",
    "The runtime identity obtains access to ECR. The container runtime contacts the regional registry, downloads the manifest and required layers, and makes the image available to the node.",
    ["Confirm the image exists in ECR.", "Check the node or Docker host identity.", "Verify ECR pull permissions.", "Use the full repository image reference.", "Pull the image.", "Inspect the local image and digest."],
    "An EKS worker node pulls the payment-service image from the private ECR repository when Kubernetes schedules a new pod.",
    ["aws ecr describe-images --repository-name payment-service --region ap-south-1", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com", "docker pull 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.0", "docker image inspect 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.0"],
    "Use the exact repository URI and tag or digest. In EKS, configure the appropriate node IAM role or supported workload identity and ensure the cluster can reach ECR endpoints.",
    ["ImagePullBackOff.", "pull access denied.", "Image not found for the requested tag.", "Worker nodes cannot reach the ECR registry or layer storage endpoints."],
    ["Inspect pod events and the requested image name.", "Check node IAM permissions and repository policies.", "Verify the image exists in the correct region.", "Check DNS, routes, security rules, and required endpoints."],
    ["Validate pull access before production rollout.", "Keep runtime identities read-only where possible.", "Use immutable image references for releases.", "Monitor image pull failures during deployments."],
    "Pull a private ECR image from an authorized host and explain which permissions are needed by the runtime compared with Jenkins push permissions."
  ),

  "9|Immutable Image Tags": makeLesson(
    "ECR tag mutability controls whether an existing image tag can be overwritten. Immutable tags prevent a published tag from being silently reused for different image content.",
    "Immutability improves release traceability and protects production deployments from unexpected changes when a pipeline publishes the same version label again.",
    "A repository configured for immutable tags rejects attempts to overwrite an existing tag. New builds must use a new tag, while the image digest provides content-level identity.",
    ["Choose a tag naming convention.", "Create or update repository mutability settings.", "Push an image with a new tag.", "Attempt to reuse the same tag.", "Observe the rejected overwrite.", "Publish the next build using a new identifier."],
    "The payment-service:1.4.0 tag is published once. A later build must use 1.4.1 or a new commit-based tag instead of replacing 1.4.0.",
    ["aws ecr describe-repositories --repository-names payment-service --region ap-south-1", "aws ecr create-repository --repository-name payment-service --image-tag-mutability IMMUTABLE --region ap-south-1", "aws ecr describe-images --repository-name payment-service --region ap-south-1"],
    "Set imageTagMutability to IMMUTABLE for release repositories. If an existing repository uses mutable tags, update its configuration through an approved change process.",
    ["Image push fails because the tag already exists.", "A pipeline repeatedly uses latest or a fixed release tag.", "Developers mistake a tag for a guaranteed immutable artifact."],
    ["Generate a new unique build or release tag.", "Inspect the repository mutability setting.", "Compare image digests before deployment.", "Update pipeline version generation rather than disabling immutability to bypass the error."],
    ["Prefer immutable tags for production releases.", "Use commit SHA or unique build numbers.", "Keep a documented release naming policy.", "Deploy by digest where strict artifact identity is required."],
    "Configure an immutable ECR repository and demonstrate why a second push using the same release tag should be rejected."
  ),

  "9|Image Digests": makeLesson(
    "An image digest is a content-addressed SHA-256 identifier for an image manifest. Unlike a human-readable tag, a digest identifies the exact manifest content.",
    "Digests allow teams to verify that staging and production use the same image artifact, even if tags are moved or renamed in a mutable repository.",
    "ECR stores image manifests and calculates a digest. Docker and Kubernetes can reference an image by repository plus @sha256 digest, allowing exact artifact selection.",
    ["Push an image to ECR.", "Retrieve its digest from repository metadata.", "Record the digest with the build output.", "Use the digest in a deployment manifest.", "Verify the running workload references the approved artifact."],
    "After publishing payment-service:1.4.0, the pipeline records its SHA-256 digest and deploys the image using the digest rather than relying only on the tag.",
    ["aws ecr describe-images --repository-name payment-service --region ap-south-1", "docker image inspect 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.0", "kubectl get deployment payment-service -o jsonpath='{.spec.template.spec.containers[*].image}'"],
    "A digest reference looks like ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/REPOSITORY@sha256:... . Copy the real digest from ECR output; never invent or manually calculate a placeholder digest.",
    ["The deployment references a digest that does not exist.", "The pipeline records a tag but not the digest.", "Teams compare tags and assume the content is identical.", "A manifest uses a malformed digest reference."],
    ["Retrieve the digest using describe-images.", "Compare the digest with build metadata.", "Correct the Kubernetes image reference.", "Confirm the running pod uses the intended image."],
    ["Store digests as pipeline artifacts.", "Promote the same digest between environments.", "Use signatures and provenance controls where available.", "Keep human-readable tags for convenience but use digest verification for release identity."],
    "Retrieve a payment-service image digest from ECR and update a Kubernetes deployment to reference that exact digest."
  ),

  "9|Lifecycle Policies": makeLesson(
    "An ECR lifecycle policy automatically expires or archives images according to configured rules. Rules can select images by tag status, tag prefix, or age.",
    "Lifecycle policies control registry storage growth and reduce clutter from temporary CI builds while preserving approved release images according to retention requirements.",
    "A lifecycle policy evaluates repository images against ordered rules. Matching images become eligible for expiration or transition based on the configured action and policy evaluation.",
    ["Identify images that must be retained.", "Define retention rules for temporary and release tags.", "Create a lifecycle policy JSON document.", "Apply the policy to the repository.", "Preview the policy where supported.", "Review lifecycle events and retained images."],
    "Keep the latest 20 development builds but retain production release tags according to the organization's audit and rollback policy.",
    ["aws ecr get-lifecycle-policy --repository-name payment-service --region ap-south-1", "aws ecr put-lifecycle-policy --repository-name payment-service --lifecycle-policy-text file://lifecycle-policy.json --region ap-south-1", "aws ecr describe-images --repository-name payment-service --region ap-south-1"],
    "Lifecycle policy rules use JSON and should be reviewed carefully. Test selection criteria against real tag patterns and protect release artifacts required for rollback or compliance.",
    ["A policy expires a production image unexpectedly.", "Rule priority or tag prefix is incorrect.", "Untagged images accumulate.", "An image needed for rollback has already expired."],
    ["Review the policy text and image selection criteria.", "Restore a required image from a retained backup or rebuild from the approved source if available.", "Adjust rule priorities and tag filters.", "Document retention and rollback requirements before reapplying."],
    ["Use separate patterns for development and release images.", "Protect compliance-required artifacts.", "Review lifecycle behavior regularly.", "Do not delete images solely based on age without understanding deployment and rollback dependencies."],
    "Write a lifecycle policy that retains recent development builds while protecting production release images, then explain how you would validate its impact."
  ),

  "9|Encryption and Access Control": makeLesson(
    "ECR protects stored container images using encryption at rest and supports IAM and repository policies to control registry access. Network and identity controls add further protection.",
    "Images may contain proprietary application code and configuration artifacts. Encryption and strict access policies reduce the risk of unauthorized access or exposure.",
    "ECR encrypts image data at rest using AWS-managed encryption or a configured customer-managed KMS key. IAM identity policies and repository policies determine who can push, pull, or administer repositories.",
    ["Select the required encryption approach.", "Create the repository with approved encryption settings.", "Define IAM permissions for CI and runtime identities.", "Add repository policies only when required.", "Verify authorized push and pull operations.", "Audit access and key usage."],
    "The payment-service production repository uses an approved KMS key and allows the Jenkins release role to push while the EKS node role can pull.",
    ["aws ecr describe-repositories --repository-names payment-service --region ap-south-1", "aws ecr get-repository-policy --repository-name payment-service --region ap-south-1", "aws kms describe-key --key-id alias/ecr-production --region ap-south-1"],
    "For customer-managed KMS encryption, verify that the key policy and IAM permissions allow the required ECR service operations. Avoid broad wildcard access in repository policies.",
    ["KMS key access is denied.", "A repository policy unintentionally grants public or cross-account access.", "A CI role can pull but cannot push.", "Encryption configuration does not meet the required policy."],
    ["Inspect repository encryption configuration.", "Review KMS key state and key policy.", "Validate both identity and repository policies.", "Apply a reviewed least-privilege policy and retest access."],
    ["Use approved encryption settings for sensitive repositories.", "Separate production and non-production permissions.", "Audit policy changes.", "Never store credentials or secrets inside container image layers."],
    "Inspect ECR encryption and repository access settings, then design separate push and pull permissions for Jenkins and EKS."
  ),

  "9|Image Vulnerability Scanning": makeLesson(
    "ECR image scanning checks container images for known software vulnerabilities. Findings help teams identify vulnerable operating-system packages and application dependencies.",
    "Scanning before deployment gives the CI/CD pipeline security evidence and allows teams to block releases that violate an agreed vulnerability policy.",
    "ECR scanning analyzes image contents and produces findings associated with image metadata. Teams review severity, affected package, vulnerability identifier, and available remediation information.",
    ["Enable the required ECR scanning configuration.", "Push a test image.", "Start a scan if using scan-on-push or an applicable manual workflow.", "Retrieve scan findings.", "Evaluate findings against release policy.", "Patch vulnerable packages and publish a new image."],
    "A payment-service image containing an outdated base operating-system package is flagged. Jenkins stops the release until the team updates the base image and rebuilds.",
    ["aws ecr put-image-scanning-configuration --repository-name payment-service --image-scanning-configuration scanOnPush=true --region ap-south-1", "aws ecr describe-image-scan-findings --repository-name payment-service --image-id imageTag=1.4.0 --region ap-south-1", "aws ecr describe-images --repository-name payment-service --region ap-south-1"],
    "ECR scanning capabilities and configuration can vary by scanning mode and account settings. Confirm the selected enhanced or basic scanning behavior and integrate findings with the organization's severity thresholds.",
    ["No scan findings are returned because scanning has not completed.", "A vulnerable package is not detected by the configured scanner.", "The pipeline ignores critical findings.", "The image tag supplied to the scan command is incorrect."],
    ["Check repository and registry scanning configuration.", "Wait for scan completion and retrieve findings again.", "Verify the image tag or digest.", "Patch or replace vulnerable packages and publish a new image."],
    ["Scan images before production release.", "Set clear severity-based policies.", "Rebuild from maintained base images.", "Track accepted exceptions with an owner and expiry date."],
    "Enable the appropriate ECR scanning mode, inspect findings for a payment-service image, and define a policy for critical vulnerabilities."
  ),

  "9|Cross-account Access": makeLesson(
    "Cross-account ECR access allows an authorized principal in one AWS account to access a repository owned by another account. Both identity permissions and repository access controls must be correct.",
    "Organizations often separate build, test, and production accounts. Cross-account access lets a deployment account pull approved images without copying credentials between accounts.",
    "The source account contains the ECR repository and its repository policy. The destination account provides an IAM principal whose identity policy permits the requested ECR operations. The two policy layers must allow the operation.",
    ["Identify source and destination AWS accounts.", "Create or select the destination IAM role.", "Add the required source repository policy.", "Grant the destination role the required identity permissions.", "Authenticate against the source registry.", "Test pulling the approved image."],
    "A shared-services account publishes payment-service images. The production EKS account receives pull access to the approved repository.",
    ["aws sts get-caller-identity", "aws ecr get-repository-policy --repository-name payment-service --region ap-south-1", "aws ecr set-repository-policy --repository-name payment-service --policy-text file://repository-policy.json --region ap-south-1", "aws ecr describe-images --repository-name payment-service --registry-id 123456789012 --region ap-south-1"],
    "Use the source registry account ID and repository ARN in the policy. The destination identity must have the required ECR pull permissions and authenticate to the source registry endpoint.",
    ["AccessDeniedException from the source repository.", "Repository policy trusts the wrong account or role.", "Destination identity policy is missing pull permissions.", "The image reference uses the destination account registry by mistake."],
    ["Verify both account IDs and the assumed role ARN.", "Inspect repository and identity policies.", "Authenticate to the source registry endpoint.", "Test access with a specific image before production deployment."],
    ["Trust specific roles rather than entire accounts where practical.", "Keep cross-account access read-only for deployment consumers.", "Review trust relationships regularly.", "Avoid sharing long-lived credentials between accounts."],
    "Design a cross-account policy that allows a production role to pull payment-service images from a shared-services ECR repository."
  ),

  "9|Registry Replication": makeLesson(
    "ECR replication copies images from a source registry to destination repositories in other AWS regions or accounts according to configured replication rules.",
    "Replication improves regional availability, supports disaster recovery, and makes approved images available close to deployment environments.",
    "A registry replication configuration defines source matching rules and destination account and region targets. When qualifying images are pushed, ECR replicates them to the configured destination.",
    ["Choose source and destination regions or accounts.", "Create destination permissions when cross-account replication is needed.", "Configure registry replication rules.", "Push a qualifying image to the source repository.", "Inspect the destination repository.", "Verify the replicated image digest."],
    "The build account publishes payment-service in ap-south-1 and ECR replicates it to ap-southeast-1 for a regional deployment environment.",
    ["aws ecr put-replication-configuration --replication-configuration file://replication.json --region ap-south-1", "aws ecr describe-registry --region ap-south-1", "aws ecr describe-images --repository-name payment-service --region ap-southeast-1"],
    "Replication configuration is registry-level and uses explicit destination regions and optional account permissions. Validate destination repository naming and regional access requirements.",
    ["Destination repository is not created or accessible.", "Cross-account replication permissions are missing.", "The source repository does not match the replication filter.", "The team deploys before replication has completed."],
    ["Inspect registry replication configuration.", "Verify destination account permissions and region.", "Check whether the source repository matches the rule.", "Confirm image availability and digest in the destination before deployment."],
    ["Use replication for approved artifacts only.", "Verify digests after replication.", "Include replication readiness in release automation.", "Document regional failover procedures."],
    "Configure a replication design for payment-service and verify that the destination image is available before a regional deployment."
  ),

  "9|Troubleshooting": makeLesson(
    "ECR troubleshooting starts by identifying whether the failure occurs during AWS authentication, Docker login, repository lookup, image tagging, upload, scanning, or image retrieval.",
    "Breaking the workflow into stages avoids random changes to IAM policies or Docker configuration. The exact error message usually points to the failing layer.",
    "The pipeline depends on the AWS identity, IAM permissions, registry endpoint, repository configuration, Docker daemon, network path, and image reference. A failure in any dependency can stop image publishing or pulling.",
    ["Capture the complete failing command and error.", "Confirm AWS identity and region.", "Check repository existence and image tag.", "Verify ECR permissions and Docker authentication.", "Inspect network and endpoint connectivity.", "Retry only after correcting the identified cause."],
    "A Jenkins payment-service build reports no basic auth credentials. The engineer checks the agent identity, refreshes the ECR login token, and verifies the registry hostname before retrying the push.",
    ["aws sts get-caller-identity", "aws ecr describe-repositories --region ap-south-1", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com", "docker push 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.0", "aws ecr describe-images --repository-name payment-service --region ap-south-1"],
    "Record the account ID, region, repository, tag, identity ARN, and full error message. Do not expose authorization tokens or secret values in diagnostic logs.",
    ["AccessDeniedException.", "no basic auth credentials.", "repository does not exist.", "Image tag already exists in an immutable repository.", "Network timeout during layer upload or download.", "ImagePullBackOff on Kubernetes nodes."],
    ["Correct the AWS account, region, or repository reference.", "Repair the minimum required IAM or repository policy.", "Refresh Docker authentication.", "Use a new tag when immutability blocks an overwrite.", "Check DNS, routes, firewall rules, and VPC endpoints.", "Inspect Kubernetes pod events for pull failures."],
    ["Troubleshoot one layer at a time.", "Keep diagnostic commands in the runbook.", "Never fix access errors by granting unrestricted administrator permissions.", "Capture the final image digest and deployment reference."],
    "Simulate an ECR authentication failure and a repository permission failure. Diagnose each using identity, repository, and Docker commands."
  ),

  "9|Production Hands-on Lab": makeLesson(
    "This lab builds a complete image publishing workflow for a Spring Boot payment service using Docker, Jenkins, AWS IAM, and Amazon ECR.",
    "The lab demonstrates how a tested application becomes a versioned, secured, traceable container artifact that can later be deployed to Amazon EKS.",
    "Jenkins checks out source code, runs Maven tests, builds the Docker image, authenticates to ECR through an IAM role, pushes a unique image tag, and records the resulting digest. EKS later pulls the approved image.",
    ["Create or verify the payment-service ECR repository.", "Configure a Jenkins IAM role with least-privilege push access.", "Run Maven tests and build the Docker image.", "Authenticate the Jenkins agent to ECR.", "Tag the image with the Git commit or build number.", "Push the image and inspect ECR metadata.", "Record the digest for the next deployment stage."],
    "A release pipeline publishes payment-service using a tag such as git-a82f91c. The pipeline stores the ECR URI and digest so the Kubernetes deployment stage can consume the same artifact.",
    ["mvn clean test", "docker build -t payment-service:$env:GIT_COMMIT .", "aws sts get-caller-identity", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com", "docker tag payment-service:$env:GIT_COMMIT 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:$env:GIT_COMMIT", "docker push 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:$env:GIT_COMMIT", "aws ecr describe-images --repository-name payment-service --region ap-south-1"],
    "Replace example account IDs, regions, repository names, and environment variables with actual values. Store AWS access through an IAM role or approved Jenkins credential integration. Configure immutable tags and scanning according to the release policy.",
    ["Maven tests fail before image creation.", "Docker build cannot find the Dockerfile.", "AWS identity lacks ECR upload permissions.", "Docker login targets the wrong region.", "Push uses a duplicate immutable tag.", "The published image digest is missing from pipeline evidence."],
    ["Fix test or Docker build failures before publishing.", "Verify the Jenkins agent workspace and Docker daemon.", "Correct the IAM role and registry endpoint.", "Generate a unique release tag.", "Retrieve and archive the digest after a successful push."],
    ["Publish only tested images.", "Use least-privilege IAM and immutable tags.", "Scan images and enforce release thresholds.", "Record source commit, build number, image URI, and digest.", "Promote the same artifact into later environments."],
    "Build and publish a Spring Boot payment-service image to ECR from Jenkins. Verify the repository, tag, scan status, and digest, then prepare the image reference for the Kubernetes deployment stage."
  ),
};