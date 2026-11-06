import type { GlossaryTerm } from "./glossary-data";

export const devsecopsSecurityGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "role": {
    purpose: "An IAM role provides a trusted identity with a defined set of permissions. Applications, cloud services, and authorized users assume the role to access resources without sharing long-lived credentials. Roles support temporary credentials, controlled trust relationships, and auditable access.",
    project: "An application running on Amazon EKS needs permission to read objects from a specific S3 bucket. The team creates an IAM role for the workload and associates it with the Kubernetes service account using IAM Roles for Service Accounts (IRSA).",
    workflow: ["Define the workload identity and required actions.", "Create a role with a trust policy for the approved identity.", "Attach a narrowly scoped permissions policy.", "Associate the role with the workload.", "Verify access and review CloudTrail activity."],
    commands: ["aws iam get-role --role-name AppS3ReadRole", "aws iam list-attached-role-policies --role-name AppS3ReadRole", "aws sts get-caller-identity", "kubectl get serviceaccount -n production"],
    mistakes: ["Granting administrator access to an application role.", "Using an incorrect trust relationship.", "Confusing a role trust policy with its permissions policy.", "Sharing static access keys instead of assuming a role."],
    configuration: ["Trust policy identifies who can assume the role.", "Permissions policy defines allowed API actions and resources.", "Use conditions such as account, audience, and external ID where applicable.", "Associate workload roles through the cloud provider's supported identity mechanism."],
    troubleshooting: ["Check the role ARN and trust policy.", "Verify the caller is the expected identity.", "Inspect AccessDenied events in CloudTrail.", "Confirm the attached policy allows the requested action on the target resource."],
    bestPractices: ["Use one role per workload or responsibility.", "Grant only required actions and resource ARNs.", "Prefer temporary credentials and role assumption.", "Review role usage and remove unused permissions."],
    securityConsiderations: ["Protect trust policies from unauthorized principals.", "Avoid wildcard principals and broad permissions.", "Use conditions to restrict role assumption.", "Monitor role assumption events and rotate or revoke compromised access."]
  },
  "encryption": {
    purpose: "Encryption converts readable information into ciphertext using cryptographic algorithms and keys. It protects confidentiality when data is stored or transferred. Decryption is possible only for parties with the required key material and authorization.",
    project: "A DevOps platform stores customer reports in S3 and exchanges service traffic over TLS. The team enables server-side encryption with AWS KMS and enforces HTTPS for service communication.",
    workflow: ["Classify data and identify where it is stored or transmitted.", "Choose an approved encryption algorithm and key-management approach.", "Enable encryption at rest and in transit.", "Restrict key usage through policies and roles.", "Monitor key access and test recovery procedures."],
    commands: ["aws kms list-aliases", "aws kms describe-key --key-id alias/application-key", "openssl version", "openssl enc -aes-256-cbc -salt -in input.txt -out encrypted.bin"],
    mistakes: ["Hardcoding encryption keys in source code.", "Assuming encryption removes the need for access controls.", "Losing key material or recovery access.", "Using outdated algorithms or insecure key storage."],
    configuration: ["Use managed key services where suitable.", "Define key administrators separately from key users.", "Enable encryption defaults on storage services.", "Document key rotation, backup, and recovery requirements."],
    troubleshooting: ["Check whether the resource supports the selected encryption mode.", "Verify the caller has permission to use the key.", "Inspect key state and policy conditions.", "Confirm the application uses the correct key identifier and encryption configuration."],
    bestPractices: ["Use modern, approved cryptographic algorithms.", "Separate key management from application deployment.", "Automate encryption policy enforcement.", "Test restoration of encrypted backups."],
    securityConsiderations: ["Restrict key access and audit every sensitive operation.", "Never commit keys or plaintext secrets to Git.", "Use authenticated encryption for application-level encryption.", "Plan for compromised keys and controlled rotation."]
  },
  "tls": {
    purpose: "Transport Layer Security (TLS) protects network communication through encryption, integrity checks, and server authentication. It helps prevent attackers from reading or modifying data exchanged between clients, APIs, load balancers, and services.",
    project: "A Kubernetes application exposes an HTTPS endpoint through an ingress controller. A certificate issued by an approved certificate authority is configured on the ingress so browsers and API clients can validate the server.",
    workflow: ["Obtain a certificate and private key from an approved source.", "Configure the TLS listener or ingress secret.", "Ensure the certificate covers the requested hostname.", "Test the handshake and certificate chain.", "Monitor expiration and renew certificates before they expire."],
    commands: ["openssl s_client -connect example.com:443 -servername example.com", "openssl x509 -in server.crt -noout -dates -subject -issuer", "curl -Iv https://example.com", "kubectl describe secret tls-secret -n production"],
    mistakes: ["Using expired certificates.", "Omitting intermediate certificates.", "Disabling certificate validation.", "Serving a certificate for the wrong hostname."],
    configuration: ["Use TLS 1.2 or TLS 1.3 according to organizational policy.", "Configure trusted certificate chains.", "Protect private keys with restricted permissions.", "Automate certificate renewal and reload."],
    troubleshooting: ["Inspect certificate dates and subject alternative names.", "Check DNS and SNI hostname configuration.", "Review ingress or load-balancer TLS settings.", "Inspect handshake errors and certificate-chain validation."],
    bestPractices: ["Automate certificate lifecycle management.", "Use strong cipher suites and secure protocol versions.", "Monitor certificate expiry.", "Test TLS configuration after ingress or proxy changes."],
    securityConsiderations: ["Never expose private keys in logs or repositories.", "Do not bypass certificate verification in production.", "Disable obsolete TLS versions and weak ciphers.", "Use mutual TLS where service identity verification is required."]
  },
  "https": {
    purpose: "HTTPS is HTTP communication protected by TLS. It provides an encrypted connection and allows clients to verify the server certificate, protecting credentials, tokens, and application data while they travel across networks.",
    project: "A CI/CD pipeline deploys a web application behind an HTTPS load balancer. The pipeline checks that HTTP requests redirect to HTTPS and that the certificate matches the public application hostname.",
    workflow: ["Configure a valid certificate on the endpoint.", "Enable HTTPS on the load balancer, proxy, or ingress.", "Redirect HTTP traffic to HTTPS.", "Update application callbacks and API URLs.", "Test redirects, certificate validity, and security headers."],
    commands: ["curl -I https://example.com", "curl -IL http://example.com", "openssl s_client -connect example.com:443 -servername example.com", "curl -sS -o /dev/null -w '%{http_code}\\n' https://example.com"],
    mistakes: ["Leaving login pages accessible over HTTP.", "Loading scripts or images over insecure HTTP.", "Using invalid or mismatched certificates.", "Assuming HTTPS alone prevents application vulnerabilities."],
    configuration: ["Enable HTTPS listeners and valid certificate chains.", "Set secure cookie attributes.", "Redirect HTTP to HTTPS.", "Configure HSTS after confirming HTTPS works across required subdomains."],
    troubleshooting: ["Check DNS resolution and listener configuration.", "Inspect certificate hostname and expiration.", "Look for mixed-content browser errors.", "Check reverse-proxy forwarded protocol headers and redirect loops."],
    bestPractices: ["Use HTTPS for every production endpoint.", "Automate certificate renewal.", "Use secure cookies and appropriate security headers.", "Validate TLS configuration in deployment checks."],
    securityConsiderations: ["Never transmit credentials over plaintext HTTP.", "Use HSTS carefully after testing.", "Avoid exposing sensitive data in URLs.", "Keep TLS termination and internal service encryption aligned with the threat model."]
  },
  "secrets-management": {
    purpose: "Secrets management is the controlled process of storing, distributing, rotating, and auditing sensitive values such as passwords, API tokens, database credentials, and private keys. It prevents secrets from being embedded in application code or ordinary configuration files.",
    project: "A deployment pipeline retrieves a database password from AWS Secrets Manager at runtime. The application workload receives access through an IAM role rather than a password stored in Git or a pipeline script.",
    workflow: ["Identify credentials and classify their sensitivity.", "Store each secret in an approved secret manager.", "Grant access to the exact workload identity.", "Retrieve secrets securely at runtime.", "Rotate credentials and audit access."],
    commands: ["aws secretsmanager list-secrets", "aws secretsmanager describe-secret --secret-id production/database", "aws secretsmanager get-secret-value --secret-id production/database", "kubectl get secrets -n production"],
    mistakes: ["Committing credentials to Git.", "Printing secret values in CI logs.", "Sharing one credential across unrelated applications.", "Never rotating long-lived credentials."],
    configuration: ["Use a managed secret store or approved vault.", "Restrict read access using workload identities.", "Enable encryption and audit logging.", "Define rotation schedules and secret version handling."],
    troubleshooting: ["Verify secret identifier and region.", "Check the workload identity permissions.", "Confirm network access to the secret service.", "Inspect access-denied events without printing secret values."],
    bestPractices: ["Retrieve secrets at runtime.", "Use short-lived credentials where possible.", "Automate rotation and revocation.", "Keep secret values out of logs, images, and source control."],
    securityConsiderations: ["Restrict secret access by workload and environment.", "Audit retrieval and modification events.", "Rotate secrets immediately after suspected exposure.", "Protect backups and prevent unauthorized secret export."]
  },
  "secret": {
    purpose: "A secret is sensitive information used to authenticate or authorize access, including passwords, tokens, certificates, and private keys. Applications need secrets to communicate with protected systems, but exposure can allow attackers to impersonate users or services.",
    project: "A Kubernetes application needs a database password. The platform team stores it in an approved external secret manager and synchronizes it into the namespace using a controlled integration.",
    workflow: ["Identify the credential and its owner.", "Store it in an approved secret manager.", "Grant access to the required application only.", "Mount or inject it using a secure runtime method.", "Rotate it and verify the application uses the new version."],
    commands: ["kubectl get secrets -n production", "kubectl describe secret app-db -n production", "aws secretsmanager describe-secret --secret-id production/database", "git grep -n -I -E 'password|api_key|secret'"],
    mistakes: ["Putting secrets in Dockerfiles or image layers.", "Printing environment variables in logs.", "Using ConfigMaps for confidential values.", "Sharing production credentials with development environments."],
    configuration: ["Use secret stores with encryption and access policies.", "Restrict Kubernetes RBAC for Secret objects.", "Mount only required secrets into containers.", "Avoid exposing secret values in deployment manifests."],
    troubleshooting: ["Check whether the secret object exists in the correct namespace.", "Verify service-account permissions.", "Confirm key names and mount paths.", "Check rotation synchronization and application reload behavior."],
    bestPractices: ["Use unique credentials per application.", "Prefer mounted secret files when supported.", "Scan repositories and images for accidental exposure.", "Revoke credentials that are no longer required."],
    securityConsiderations: ["Treat encoded Kubernetes Secret data as sensitive, not encrypted by default.", "Enable encryption at rest for Kubernetes secrets.", "Restrict read and list permissions.", "Never paste real production secrets into tickets or chat."]
  },
  "vulnerability-scanning": {
    purpose: "Vulnerability scanning checks software, operating-system packages, dependencies, and infrastructure configurations for known security weaknesses. It helps teams identify risks before deployment and prioritize remediation using severity, exploitability, and business impact.",
    project: "A CI pipeline scans application dependencies and container images before publishing a release. Critical findings block promotion until the team fixes the issue or approves a documented exception.",
    workflow: ["Select the source to scan: code, dependencies, image, or infrastructure.", "Run an up-to-date scanner.", "Review findings and affected versions.", "Prioritize exploitable and business-critical issues.", "Patch, rebuild, rescan, and record exceptions."],
    commands: ["npm audit", "trivy fs --scanners vuln,misconfig .", "trivy image myapp:latest", "grype myapp:latest"],
    mistakes: ["Ignoring scanner database age.", "Treating every finding as equally exploitable.", "Scanning only after production release.", "Suppressing findings without an owner or expiry."],
    configuration: ["Run scans in pull requests and release pipelines.", "Set severity thresholds appropriate to the environment.", "Keep scanner databases updated.", "Store machine-readable reports as build artifacts."],
    troubleshooting: ["Check scanner database connectivity and freshness.", "Verify the correct image digest or source directory.", "Review package manifests and lockfiles.", "Investigate false positives with evidence and documented exceptions."],
    bestPractices: ["Scan continuously throughout the SDLC.", "Prioritize reachable vulnerabilities and known exploited issues.", "Rebuild images after patching base packages.", "Track remediation ownership and due dates."],
    securityConsiderations: ["Protect scan reports because they reveal attack surface.", "Do not assume a clean scan proves software is secure.", "Use signed artifacts and trusted registries.", "Validate exceptions and compensating controls regularly."]
  },
  "cve": {
    purpose: "CVE stands for Common Vulnerabilities and Exposures. It is a standardized identifier assigned to a publicly disclosed cybersecurity vulnerability. A CVE ID helps security teams, vendors, and scanners refer to the same issue when assessing affected products and versions.",
    project: "A container scanner reports a CVE affecting a library installed in the application image. The team checks the affected version range, available fixed version, exploitability, and whether the library is actually used.",
    workflow: ["Capture the CVE identifier from the scanner report.", "Read the vendor advisory and affected version range.", "Identify affected packages and deployed artifacts.", "Prioritize using severity, exploitability, and exposure.", "Patch or mitigate, rebuild, and verify the finding is resolved."],
    commands: ["npm audit --json", "trivy image --scanners vuln myapp:latest", "grype myapp:latest", "docker image inspect myapp:latest"],
    mistakes: ["Assuming the CVE score alone determines business risk.", "Patching without confirming the affected dependency.", "Ignoring transitive dependencies.", "Closing a finding without rescanning the final artifact."],
    configuration: ["Integrate vulnerability feeds into approved scanners.", "Record CVE IDs with affected package and image digest.", "Define remediation SLAs by risk.", "Track accepted exceptions with owner and expiry."],
    troubleshooting: ["Check package version and distribution backports.", "Compare scanner data with the vendor advisory.", "Verify the image digest being assessed.", "Confirm the patched artifact was rebuilt and redeployed."],
    bestPractices: ["Use vendor advisories as well as scanner output.", "Prioritize known exploited vulnerabilities.", "Maintain a software bill of materials.", "Document mitigation when an immediate patch is unavailable."],
    securityConsiderations: ["CVE publication does not prove a system is exploitable.", "Assess network exposure and runtime reachability.", "Avoid disclosing unpatched vulnerabilities publicly without coordination.", "Keep remediation evidence for audits."]
  },
  "container-image-scanning": {
    purpose: "Container image scanning examines operating-system packages, application dependencies, and image configuration for known vulnerabilities, exposed secrets, and policy violations. It helps prevent insecure images from entering registries or production clusters.",
    project: "A CI pipeline scans a Docker image with Trivy before pushing it to a private registry. The release stage blocks images containing unapproved critical vulnerabilities.",
    workflow: ["Build the image from a trusted base.", "Scan the exact image tag or digest.", "Review OS and application dependency findings.", "Apply patches or replace vulnerable base images.", "Rebuild, rescan, and publish the approved image."],
    commands: ["trivy image myapp:1.0.0", "trivy image --severity HIGH,CRITICAL --exit-code 1 myapp:1.0.0", "docker image inspect myapp:1.0.0", "docker image ls"],
    mistakes: ["Scanning a different tag from the deployed image.", "Ignoring vulnerabilities in base-image packages.", "Using outdated scanner databases.", "Treating a successful build as proof of image security."],
    configuration: ["Add scanning to CI before registry publication.", "Pin base images by digest where appropriate.", "Define severity gates and exception handling.", "Retain scan reports with image digests."],
    troubleshooting: ["Confirm the image exists locally or can be pulled.", "Check scanner database updates.", "Compare the scanned digest with the release digest.", "Inspect package versions and available fixed releases."],
    bestPractices: ["Use minimal trusted base images.", "Rebuild regularly to consume security updates.", "Scan images before promotion and periodically afterward.", "Generate an SBOM and sign approved artifacts."],
    securityConsiderations: ["Do not publish images with embedded credentials.", "Protect registry write permissions.", "Verify image provenance and signatures.", "Treat scan reports as sensitive operational information."]
  },
  "docker-image": {
    purpose: "A Docker image is an immutable, layered package containing an application, its dependencies, and the filesystem configuration required to run a container. Images make application delivery consistent across developer machines, CI systems, test environments, and production platforms.",
    project: "A team builds a Node.js application image in CI, scans it, tags it with the commit identifier, and pushes it to a private registry for deployment to Kubernetes.",
    workflow: ["Create a Dockerfile using a trusted base image.", "Install dependencies and copy application files.", "Build the image with a versioned tag.", "Scan and test the resulting image.", "Push the approved image and deploy its immutable digest."],
    commands: ["docker build -t myapp:1.0.0 .", "docker image ls", "docker image inspect myapp:1.0.0", "docker history myapp:1.0.0", "docker push registry.example.com/team/myapp:1.0.0"],
    mistakes: ["Using the latest tag as the only release identifier.", "Copying secrets into image layers.", "Running containers as root unnecessarily.", "Using oversized base images and unnecessary packages."],
    configuration: ["Use a .dockerignore file.", "Apply multi-stage builds.", "Pin trusted base-image versions or digests.", "Set a non-root runtime user and explicit health checks."],
    troubleshooting: ["Inspect build logs and failed layers.", "Check image architecture compatibility.", "Verify registry authentication and image tag.", "Inspect entrypoint, command, environment, and filesystem permissions."],
    bestPractices: ["Use reproducible builds and immutable tags.", "Keep runtime images minimal.", "Scan and sign release images.", "Promote the same tested digest across environments."],
    securityConsiderations: ["Never bake credentials into image layers.", "Use trusted registries and verify provenance.", "Patch base images regularly.", "Restrict image publishing and pulling permissions."]
  },
  "least-privilege": {
    purpose: "Least privilege is a security principle that gives each user, application, and service only the minimum permissions needed to perform its approved tasks. It reduces the impact of compromised credentials, accidental changes, and malicious activity.",
    project: "A Kubernetes deployment service can update deployments only in the application namespace. Its service account cannot read secrets or modify cluster-wide resources unless explicitly required.",
    workflow: ["List the exact operations required by the workload.", "Create a narrowly scoped role or policy.", "Bind permissions to the correct identity.", "Test allowed and denied operations.", "Review permissions as application responsibilities change."],
    commands: ["kubectl auth can-i get pods -n production --as=system:serviceaccount:production:deployer", "kubectl auth can-i '*' '*' -n production --as=system:serviceaccount:production:deployer", "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:role/AppRole --action-names s3:GetObject", "aws iam list-attached-role-policies --role-name AppRole"],
    mistakes: ["Granting administrator access to avoid permission troubleshooting.", "Using wildcard actions and resources.", "Sharing one powerful service account across applications.", "Failing to review old permissions."],
    configuration: ["Use scoped IAM policies and Kubernetes RBAC roles.", "Separate read-only and write permissions.", "Restrict access by namespace and resource.", "Use conditions for environment and identity boundaries."],
    troubleshooting: ["Identify the exact denied API action.", "Check identity, role bindings, and policy evaluation.", "Verify resource ARN and namespace scope.", "Add only the missing permission rather than broad administrator access."],
    bestPractices: ["Start with no access and add required permissions.", "Use separate identities for CI, runtime, and administration.", "Review permissions periodically.", "Automate policy checks in infrastructure pipelines."],
    securityConsiderations: ["Minimize blast radius for compromised identities.", "Protect privileged roles and approval paths.", "Audit policy changes and access events.", "Remove temporary permissions after their approved purpose ends."]
  },
  "iam": {
    purpose: "Identity and Access Management (IAM) controls who can authenticate and which actions they can perform on resources. IAM combines identities, roles, policies, and trust relationships to enforce access boundaries across cloud accounts and services.",
    project: "A DevOps team uses separate IAM roles for CI deployment, application runtime, and platform administration. Each role has only the permissions needed for its responsibility and all privileged actions are logged.",
    workflow: ["Create identities or roles for users and workloads.", "Define authentication and trust requirements.", "Attach least-privilege permissions policies.", "Enable audit logging and access reviews.", "Remove unused identities and credentials."],
    commands: ["aws sts get-caller-identity", "aws iam list-users", "aws iam list-roles", "aws iam get-account-summary", "aws iam list-attached-role-policies --role-name DeploymentRole"],
    mistakes: ["Using root credentials for daily operations.", "Sharing access keys between team members.", "Attaching administrator policies to deployment roles.", "Leaving unused users and access keys active."],
    configuration: ["Use federated identity and MFA for human access.", "Use roles and temporary credentials for workloads.", "Separate trust policies from permissions policies.", "Enable CloudTrail and periodic access reviews."],
    troubleshooting: ["Confirm the active identity with get-caller-identity.", "Check policy evaluation and explicit denies.", "Review trust relationships and permission boundaries.", "Inspect CloudTrail for denied or unexpected API calls."],
    bestPractices: ["Prefer roles and short-lived credentials.", "Enforce MFA for privileged human access.", "Apply least privilege and separation of duties.", "Review access keys, roles, and policies regularly."],
    securityConsiderations: ["Protect root and administrator identities.", "Monitor privilege escalation and policy changes.", "Use permission boundaries or organization controls where suitable.", "Revoke compromised credentials immediately."]
  },
  "authentication": {
    purpose: "Authentication verifies the identity of a user, application, or service before access is granted. It commonly uses passwords, certificates, API tokens, multi-factor authentication, or federated identity providers.",
    project: "A DevOps engineer signs in to AWS through an organization's identity provider with MFA. CI/CD workloads use trusted machine identities instead of personal credentials.",
    workflow: ["Identify the user or workload requesting access.", "Select an approved authentication mechanism.", "Validate credentials or identity tokens.", "Apply MFA or workload identity verification where required.", "Record authentication events and investigate suspicious attempts."],
    commands: ["aws sts get-caller-identity", "kubectl auth whoami", "ssh -v user@server", "openssl s_client -connect example.com:443 -servername example.com"],
    mistakes: ["Treating authentication as authorization.", "Sharing user accounts between engineers.", "Using permanent credentials for automation.", "Disabling MFA for privileged accounts."],
    configuration: ["Integrate with an approved identity provider.", "Enable MFA for human users.", "Use short-lived credentials for workloads.", "Configure secure session duration and token validation."],
    troubleshooting: ["Verify username and identity-provider configuration.", "Check token expiry, audience, and issuer.", "Inspect MFA enrollment and authentication logs.", "Confirm system time synchronization when validating time-based tokens."],
    bestPractices: ["Use centralized identity management.", "Prefer federation and temporary credentials.", "Require MFA for privileged access.", "Review inactive accounts and authentication failures."],
    securityConsiderations: ["Protect passwords, private keys, and tokens.", "Use rate limiting and suspicious-login detection.", "Revoke compromised credentials immediately.", "Never log authentication secrets."]
  },
  "authorization": {
    purpose: "Authorization determines which operations an authenticated identity is allowed to perform on a resource. It evaluates permissions, policies, roles, and resource boundaries before allowing an action.",
    project: "A production support engineer can view Kubernetes Pods and logs but cannot delete deployments or read application secrets. These permissions are enforced through Kubernetes RBAC.",
    workflow: ["Authenticate the requesting identity.", "Identify the requested action and target resource.", "Evaluate assigned roles and policies.", "Allow or deny the operation.", "Audit permission changes and access decisions."],
    commands: ["kubectl auth can-i get pods -n production", "kubectl auth can-i delete deployments -n production", "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:role/ReadOnlyRole --action-names s3:GetObject", "aws sts get-caller-identity"],
    mistakes: ["Assuming successful login grants unrestricted access.", "Granting wildcard permissions unnecessarily.", "Ignoring explicit deny policies.", "Failing to separate production and development permissions."],
    configuration: ["Define permissions through IAM policies or RBAC.", "Scope access to required actions and resources.", "Use separate roles for read and write operations.", "Review inherited permissions and policy boundaries."],
    troubleshooting: ["Identify the exact denied action and resource.", "Verify the active identity.", "Inspect role bindings and attached policies.", "Check explicit denies, conditions, and resource-level restrictions."],
    bestPractices: ["Apply least privilege.", "Separate duties between engineering roles.", "Review access regularly.", "Test both permitted and denied operations."],
    securityConsiderations: ["Prevent privilege escalation.", "Audit privileged access and policy modifications.", "Restrict access to sensitive resources.", "Remove unnecessary permissions promptly."]
  },
  "rbac": {
    purpose: "Role-Based Access Control assigns permissions through roles rather than granting every permission directly to individual users. Users, groups, or service accounts receive role assignments that define which resources and operations they can access.",
    project: "A Kubernetes platform team creates a namespace Role that allows developers to view Pods, Services, and Deployments in the development namespace without granting cluster-wide administrative access.",
    workflow: ["Identify user groups and application identities.", "Define roles containing required permissions.", "Bind roles to approved users, groups, or service accounts.", "Test access with authorized and unauthorized identities.", "Review bindings when responsibilities change."],
    commands: ["kubectl get roles,rolebindings -n development", "kubectl get clusterroles,clusterrolebindings", "kubectl describe rolebinding developer-access -n development", "kubectl auth can-i get pods -n development --as=system:serviceaccount:development:developer"],
    mistakes: ["Using ClusterRoleBinding when namespace-level access is sufficient.", "Binding users to cluster-admin unnecessarily.", "Creating roles with wildcard resources and verbs.", "Forgetting to remove outdated role bindings."],
    configuration: ["Use Role and RoleBinding for namespace-scoped access.", "Use ClusterRole and ClusterRoleBinding only for required cluster-level permissions.", "Bind service accounts to workload-specific roles.", "Manage RBAC manifests through reviewed Git changes."],
    troubleshooting: ["Check whether the RoleBinding exists in the correct namespace.", "Verify the subject name and kind.", "Inspect the referenced Role or ClusterRole.", "Use kubectl auth can-i to test the exact operation."],
    bestPractices: ["Create roles based on job responsibilities.", "Prefer namespace-scoped permissions.", "Keep permissions minimal and reusable.", "Review role bindings during access reviews."],
    securityConsiderations: ["Protect cluster-admin access.", "Restrict permissions to read Kubernetes Secrets.", "Audit RBAC changes.", "Prevent workloads from modifying their own access controls."]
  },};


