import type { GlossaryTerm } from "./glossary-data";

export const fundamentalsGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "devops": {
    purpose: "DevOps is a culture and engineering approach that connects software development and IT operations through collaboration, automation, continuous feedback, and shared responsibility. It helps teams deliver software changes more frequently and reliably. DevOps is not a single tool or job title; it combines practices such as version control, CI/CD, infrastructure automation, monitoring, and incident learning.",
    project: "A team maintains an e-commerce application. Developers commit code to Git, Jenkins runs automated tests, Docker packages the application, and Kubernetes deploys it. Monitoring tools track application health after release. Developers and operations engineers share responsibility for investigating failures and improving the delivery process.",
    workflow: [
      "Plan work with developers, testers, security engineers, and operations teams.",
      "Store application code and infrastructure definitions in version control.",
      "Review changes through pull requests and automated quality checks.",
      "Build and test application artifacts through a CI pipeline.",
      "Package applications consistently and publish versioned artifacts or images.",
      "Deploy through controlled environments using automation and approved release strategies.",
      "Monitor application health, logs, metrics, traces, and user experience.",
      "Use incidents and feedback to improve code, automation, reliability, and collaboration."
    ],
    commands: [
      "git status",
      "git add .",
      "git commit -m 'Add application change'",
      "docker build -t myapp:1.0 .",
      "docker run -d -p 8080:8080 myapp:1.0",
      "kubectl get deployments -n production",
      "kubectl rollout status deployment/myapp -n production"
    ],
    mistakes: [
      "Treating DevOps as only a collection of tools instead of a culture and operating model.",
      "Keeping development and operations responsibilities completely separated.",
      "Automating deployment without automated testing or rollback planning.",
      "Measuring success only by deployment frequency while ignoring reliability and customer impact.",
      "Failing to monitor applications after production deployment.",
      "Creating pipelines that expose secrets or allow unreviewed production changes."
    ],
    configuration: [
      "Maintain shared Git repositories and documented branching and review practices.",
      "Configure CI pipelines for compilation, testing, quality checks, and artifact creation.",
      "Use infrastructure as code for repeatable environment provisioning.",
      "Store deployment configuration separately from application secrets.",
      "Configure environment-specific approvals and controlled production access.",
      "Integrate monitoring, alerting, and incident-management workflows.",
      "Define delivery and reliability measurements such as deployment frequency, change failure rate, and recovery time."
    ],
    troubleshooting: [
      "If builds fail, inspect pipeline logs, dependency versions, and compilation errors.",
      "If deployments fail, check artifact versions, environment configuration, permissions, and health checks.",
      "If an application works locally but fails in production, compare runtime dependencies and environment settings.",
      "If releases cause incidents, inspect deployment history, logs, metrics, and recent configuration changes.",
      "If teams cannot identify ownership, clarify service responsibilities and escalation paths.",
      "If automation behaves differently across environments, standardize tooling and configuration."
    ],
    bestPractices: [
      "Build a culture of shared ownership and blameless incident learning.",
      "Automate repeatable tasks while retaining appropriate review and approval controls.",
      "Keep pipelines version-controlled, reusable, and observable.",
      "Promote the same tested artifact through environments whenever practical.",
      "Use small, reversible releases and maintain tested rollback procedures.",
      "Measure delivery speed together with reliability and customer outcomes.",
      "Continuously improve through feedback, retrospectives, and operational evidence."
    ],
    securityConsiderations: [
      "Integrate security checks into code review, build, dependency, and deployment stages.",
      "Use least-privilege access for developers, pipeline agents, and production systems.",
      "Store credentials in approved secret-management systems rather than source code.",
      "Scan application dependencies and container images for known vulnerabilities.",
      "Protect build artifacts and verify their provenance before deployment.",
      "Audit privileged production changes and pipeline execution."
    ]
  },
  "sdlc": {
    purpose: "The Software Development Life Cycle (SDLC) is a structured process for creating, delivering, maintaining, and eventually retiring software. Its common stages include requirements, design, development, testing, deployment, and maintenance. DevOps practices strengthen the SDLC by introducing automation, continuous feedback, infrastructure management, and operational monitoring throughout the lifecycle.",
    project: "A company develops an online shopping application. Business teams define requirements, architects design its components, developers implement features, testers validate functionality, and operations engineers deploy and monitor releases. Feedback from production helps the team prioritize future improvements.",
    workflow: [
      "Collect business requirements and define measurable acceptance criteria.",
      "Design application architecture, interfaces, data models, and security controls.",
      "Develop features using version control and agreed coding standards.",
      "Build the application and run unit, integration, and security tests.",
      "Deploy to staging and perform functional, performance, and acceptance testing.",
      "Release an approved version to production using a controlled deployment process.",
      "Monitor performance, errors, availability, and customer feedback.",
      "Maintain, patch, improve, or retire the application according to business needs."
    ],
    commands: [
      "git clone <repository-url>",
      "git checkout -b feature/new-functionality",
      "git diff",
      "mvn clean test",
      "npm run build",
      "docker build -t shopping-app:1.0 .",
      "kubectl rollout status deployment/shopping-app -n production"
    ],
    mistakes: [
      "Skipping requirements clarification and building features with incorrect assumptions.",
      "Treating testing as a final stage instead of validating changes throughout development.",
      "Deploying unreviewed changes directly to production.",
      "Ignoring security, performance, and maintainability requirements.",
      "Failing to collect feedback from production users and operations teams.",
      "Using inconsistent environments that produce different behavior between testing and production."
    ],
    configuration: [
      "Maintain requirements and acceptance criteria in a traceable work-management system.",
      "Define repository, branch protection, code review, and release policies.",
      "Configure automated build, unit-test, integration-test, and security-test stages.",
      "Maintain separate development, testing, staging, and production configurations.",
      "Version application artifacts and deployment definitions.",
      "Configure production monitoring and maintenance ownership."
    ],
    troubleshooting: [
      "If requirements are unclear, review acceptance criteria with the business owner.",
      "If a feature fails testing, reproduce it with the same application version and test data.",
      "If staging and production differ, compare configuration, dependencies, permissions, and runtime versions.",
      "If releases introduce regressions, inspect the change set and automated test coverage.",
      "If production defects are missed, improve test scenarios using real incident evidence."
    ],
    bestPractices: [
      "Use incremental delivery and keep requirements connected to implementation and tests.",
      "Automate repeatable validation as early as possible.",
      "Use peer review and consistent coding standards.",
      "Maintain traceability from requirements to code, tests, and releases.",
      "Collect operational feedback throughout the lifecycle.",
      "Keep dependencies, documentation, and maintenance plans current."
    ],
    securityConsiderations: [
      "Include threat modeling and security requirements during design.",
      "Perform code, dependency, and infrastructure security checks.",
      "Protect test data and avoid using unmasked production personal information.",
      "Apply access controls to source code, build systems, and deployment environments.",
      "Maintain security patching and vulnerability remediation processes."
    ]
  },
  "agile": {
    purpose: "Agile is an iterative approach to software development that delivers work in small increments and uses frequent feedback to adapt to changing requirements. Teams prioritize valuable work, collaborate with stakeholders, and continuously improve how they deliver software. Agile can work alongside DevOps by connecting short development iterations with automated testing and reliable deployment.",
    project: "An online retail team develops a new checkout experience. Instead of waiting for a complete redesign, the team delivers address validation first, payment improvements next, and order confirmation afterward. Feedback from users and production monitoring helps determine the next improvements.",
    workflow: [
      "Create and prioritize a product backlog based on business value.",
      "Break large requirements into smaller user stories with acceptance criteria.",
      "Select a realistic set of work for the current iteration.",
      "Develop, review, and test small changes continuously.",
      "Demonstrate completed work and collect stakeholder feedback.",
      "Release validated increments through the delivery pipeline.",
      "Review team performance and identify process improvements.",
      "Reprioritize the backlog using feedback and changing business needs."
    ],
    commands: [
      "git status",
      "git switch -c feature/user-story-123",
      "git add .",
      "git commit -m 'Implement checkout validation'",
      "git push -u origin feature/user-story-123"
    ],
    mistakes: [
      "Treating Agile as having no planning, documentation, or accountability.",
      "Adding more work to an iteration than the team can realistically complete.",
      "Changing priorities continuously without communicating the impact.",
      "Measuring individual activity instead of delivered value and team outcomes.",
      "Skipping testing to meet an iteration deadline.",
      "Holding retrospectives without tracking improvement actions."
    ],
    configuration: [
      "Maintain a prioritized backlog with clear acceptance criteria.",
      "Define iteration length, planning practices, and review responsibilities.",
      "Use work-management boards to show status and blockers.",
      "Connect code changes and pull requests to work items.",
      "Integrate automated tests and build checks into the delivery pipeline.",
      "Track work-in-progress, cycle time, escaped defects, and delivery outcomes."
    ],
    troubleshooting: [
      "If work repeatedly spills over, review estimation, dependencies, and team capacity.",
      "If requirements change frequently, improve stakeholder alignment and backlog prioritization.",
      "If quality decreases, inspect test coverage, review practices, and delivery pressure.",
      "If work remains blocked, identify external dependencies and assign clear owners.",
      "If retrospectives produce no improvement, track actions and review them in the next iteration."
    ],
    bestPractices: [
      "Deliver small increments that can be reviewed and validated.",
      "Keep the backlog prioritized and acceptance criteria understandable.",
      "Collaborate frequently with users and stakeholders.",
      "Maintain engineering quality through automated testing and peer review.",
      "Limit work in progress to improve focus and flow.",
      "Use retrospectives to make measurable process improvements."
    ],
    securityConsiderations: [
      "Include security requirements in user stories and acceptance criteria.",
      "Do not postpone vulnerability fixes simply because they are not visible product features.",
      "Include security review in design and code review.",
      "Protect customer data in demonstrations and test environments.",
      "Track security defects with owners and remediation deadlines."
    ]
  },
  "scrum": {
    purpose: "Scrum is an Agile framework that organizes product development into fixed-length iterations called sprints. It defines accountabilities such as Product Owner, Scrum Master, and Developers, along with events including Sprint Planning, Daily Scrum, Sprint Review, and Sprint Retrospective. Scrum helps teams inspect progress and adapt their work regularly.",
    project: "A DevOps team uses two-week sprints to improve deployment automation. The Product Owner prioritizes pipeline improvements, developers and operations engineers implement backlog items, and the team reviews the working pipeline at the sprint review before identifying process improvements.",
    workflow: [
      "The Product Owner maintains and orders the Product Backlog.",
      "The team conducts Sprint Planning and agrees on a Sprint Goal.",
      "Developers select work and create a plan to deliver the sprint increment.",
      "The team holds Daily Scrum meetings to inspect progress and adapt the plan.",
      "Completed work meets the agreed Definition of Done.",
      "The team demonstrates the increment during Sprint Review and gathers feedback.",
      "The team conducts a Sprint Retrospective and selects improvement actions.",
      "The next sprint begins using the updated backlog and lessons learned."
    ],
    commands: [
      "git status",
      "git log --oneline -10",
      "git branch --show-current",
      "git diff --stat"
    ],
    mistakes: [
      "Treating the Daily Scrum as a manager-only status meeting.",
      "Changing the Sprint Goal without understanding the impact.",
      "Starting work without clear acceptance criteria.",
      "Declaring incomplete or untested work as done.",
      "Using velocity as a target for comparing individual engineers.",
      "Ignoring retrospective actions after the meeting."
    ],
    configuration: [
      "Define sprint duration and a consistent team event schedule.",
      "Maintain a visible Product Backlog with ordered work items.",
      "Agree on Definition of Done and quality expectations.",
      "Configure a sprint board with clear workflow states and ownership.",
      "Connect work items to pull requests, builds, and release evidence.",
      "Track sprint progress without using metrics to pressure individuals."
    ],
    troubleshooting: [
      "If sprint work is not completed, inspect dependencies, capacity, and backlog refinement.",
      "If the team lacks a clear goal, revisit Sprint Planning and expected outcomes.",
      "If daily coordination is ineffective, focus on progress toward the Sprint Goal and blockers.",
      "If work repeatedly fails acceptance, improve refinement and Definition of Done.",
      "If the same blockers return, assign improvement actions and review them in retrospectives."
    ],
    bestPractices: [
      "Keep sprint goals focused on valuable outcomes.",
      "Refine backlog items before they enter sprint planning.",
      "Include testing, documentation, and operational readiness in the Definition of Done.",
      "Encourage collaboration between development and operations specialists.",
      "Use reviews for feedback and retrospectives for continuous improvement.",
      "Treat velocity as a planning aid for the team, not an individual performance score."
    ],
    securityConsiderations: [
      "Include security work in the Product Backlog and sprint planning.",
      "Apply secure coding and peer-review standards to sprint work.",
      "Protect credentials and sensitive data in development and demonstrations.",
      "Track security defects and verify remediation before release.",
      "Include security testing in the Definition of Done where appropriate."
    ]
  },
  "continuous-integration": {
    purpose: "Continuous Integration (CI) is the practice of frequently integrating code changes into a shared repository and automatically validating them through builds and tests. It helps detect integration problems early, keeps the main branch in a healthier state, and provides fast feedback to developers before changes progress toward release.",
    project: "Developers working on a Java application create pull requests throughout the day. Jenkins checks out the code, runs Maven compilation and unit tests, performs code-quality checks, and reports results. A failed check prevents the change from being merged until the issue is corrected.",
    workflow: [
      "Developers create small changes on feature branches.",
      "They commit code and push changes to the shared repository.",
      "A pull request or commit event triggers the CI pipeline.",
      "The pipeline checks out the exact source revision and resolves dependencies.",
      "Compilation, unit tests, linting, and security checks execute automatically.",
      "The pipeline publishes test results and build status.",
      "Reviewers merge only changes that satisfy required checks.",
      "The validated source revision becomes the input for artifact creation and delivery."
    ],
    commands: [
      "git status",
      "git add .",
      "git commit -m 'Add payment validation'",
      "git push origin feature/payment-validation",
      "mvn clean verify",
      "npm test",
      "git log --oneline -5"
    ],
    mistakes: [
      "Running builds only before a release instead of after frequent code changes.",
      "Allowing unstable tests to create unreliable pipeline results.",
      "Building from an unpinned or unclear source revision.",
      "Skipping automated tests to make pipelines appear faster.",
      "Keeping secrets in pipeline files or repository variables without protection.",
      "Ignoring failed checks and merging code into the shared branch."
    ],
    configuration: [
      "Configure repository webhooks or polling to trigger CI on relevant changes.",
      "Define repeatable pipeline stages for checkout, dependency installation, build, and tests.",
      "Use pinned tool and dependency versions for consistent builds.",
      "Publish test reports and preserve useful build logs.",
      "Require successful checks before protected-branch merges.",
      "Cache dependencies carefully without reusing unsafe or stale build outputs."
    ],
    troubleshooting: [
      "If a pipeline does not start, inspect repository webhook delivery and CI trigger configuration.",
      "If dependency downloads fail, inspect repository access, network connectivity, and version availability.",
      "If tests fail only in CI, compare environment variables, runtime versions, and test data.",
      "If builds are inconsistent, verify source revision, dependency locking, and agent configuration.",
      "If a pipeline is slow, inspect stage duration and optimize safe caching or parallel execution."
    ],
    bestPractices: [
      "Integrate changes frequently and keep pull requests small.",
      "Make builds repeatable and tests reliable.",
      "Fail fast when compilation or essential quality checks fail.",
      "Preserve test results and build provenance.",
      "Protect the main branch with required checks and reviews.",
      "Keep pipeline definitions version-controlled with the application."
    ],
    securityConsiderations: [
      "Use short-lived or narrowly scoped credentials for pipeline integrations.",
      "Never print secret values in build logs.",
      "Scan source code and dependencies for vulnerabilities.",
      "Restrict who can modify pipeline definitions and protected branches.",
      "Use trusted build agents and protect generated artifacts."
    ]
  },
  "continuous-delivery": {
    purpose: "Continuous Delivery is a software delivery practice in which every change that passes the required build, test, and quality checks is kept in a deployable state. The production release may still require a human approval or business decision. It reduces release risk by making deployment preparation routine and repeatable.",
    project: "A banking application uses an automated pipeline to compile code, run tests, build a container image, and deploy it to staging. After validation, an authorized release manager approves production deployment. The same tested artifact is promoted instead of being rebuilt separately.",
    workflow: [
      "Commit reviewed source changes to the shared repository.",
      "Run automated compilation, unit tests, and integration tests.",
      "Perform security, quality, and artifact validation checks.",
      "Create a versioned release artifact or container image.",
      "Deploy the artifact to a staging or pre-production environment.",
      "Run smoke tests, acceptance checks, and deployment readiness validation.",
      "Obtain the required production release approval.",
      "Promote the validated artifact and monitor production health."
    ],
    commands: [
      "git rev-parse HEAD",
      "mvn clean verify",
      "docker build -t registry.example.com/banking-api:1.4.0 .",
      "docker push registry.example.com/banking-api:1.4.0",
      "kubectl set image deployment/banking-api banking-api=registry.example.com/banking-api:1.4.0 -n staging",
      "kubectl rollout status deployment/banking-api -n staging"
    ],
    mistakes: [
      "Confusing continuous delivery with automatic production deployment.",
      "Rebuilding a different artifact for production instead of promoting the tested artifact.",
      "Allowing manual testing to become the only quality gate.",
      "Using inconsistent environment configuration across staging and production.",
      "Skipping release approval or traceability where business controls require it.",
      "Failing to define rollback and post-deployment verification."
    ],
    configuration: [
      "Create automated build, test, security, packaging, and staging deployment stages.",
      "Version and identify artifacts with immutable tags or digests.",
      "Separate environment configuration from application binaries.",
      "Configure approval gates for production where required.",
      "Maintain deployment manifests and release metadata in version control.",
      "Configure smoke tests, health checks, and rollback procedures."
    ],
    troubleshooting: [
      "If staging deployment fails, inspect image availability, deployment permissions, and environment settings.",
      "If production approval is unavailable, inspect pipeline gate configuration and authorized approvers.",
      "If staging passes but production fails, compare configuration, dependencies, and access policies.",
      "If artifact versions differ, verify the artifact identifier and promotion process.",
      "If release validation fails, inspect health checks, smoke-test output, and application logs."
    ],
    bestPractices: [
      "Keep software deployable through frequent automated validation.",
      "Promote the same immutable artifact through all environments.",
      "Automate repetitive release preparation and verification.",
      "Use explicit production approval controls when required.",
      "Maintain tested rollback and release communication procedures.",
      "Track release quality and deployment outcomes."
    ],
    securityConsiderations: [
      "Require authorization for production promotion.",
      "Sign or verify artifacts where supported and maintain provenance.",
      "Protect pipeline secrets and deployment credentials.",
      "Scan artifacts before promotion and restrict registry write access.",
      "Maintain an auditable record of approvals and release changes."
    ]
  },
  "continuous-deployment": {
    purpose: "Continuous Deployment is the practice of automatically releasing every change that passes the defined validation and release controls into production. It depends on reliable automated testing, safe deployment mechanisms, observability, and rapid rollback or mitigation. Unlike continuous delivery, production deployment does not wait for a separate manual release approval for each qualifying change.",
    project: "A SaaS team updates a small API endpoint. The CI/CD pipeline runs unit, integration, security, and compatibility tests. If all required checks pass, the pipeline deploys the version using a progressive rollout and monitors error rates before completing the release.",
    workflow: [
      "Commit a small reviewed change to the protected main branch.",
      "Run automated build, unit, integration, and security tests.",
      "Create and verify a versioned immutable artifact.",
      "Deploy automatically using a controlled release strategy.",
      "Run health checks and synthetic tests against the new version.",
      "Monitor errors, latency, and service-level indicators during rollout.",
      "Automatically halt or roll back when defined safety conditions fail.",
      "Record deployment evidence and continue monitoring production."
    ],
    commands: [
      "git rev-parse HEAD",
      "mvn clean verify",
      "docker build -t registry.example.com/api:2.0.0 .",
      "docker push registry.example.com/api:2.0.0",
      "kubectl rollout status deployment/api -n production",
      "kubectl rollout undo deployment/api -n production",
      "kubectl get pods -n production"
    ],
    mistakes: [
      "Enabling automatic production deployment without adequate automated test coverage.",
      "Deploying large, difficult-to-reverse changes in one release.",
      "Ignoring database migration compatibility and backward compatibility.",
      "Failing to monitor production after deployment.",
      "Using automatic rollback rules that react to noisy or misleading metrics.",
      "Allowing unreviewed pipeline changes to control production deployments."
    ],
    configuration: [
      "Define mandatory build, test, security, and policy checks before deployment.",
      "Use immutable artifacts and traceable source revisions.",
      "Configure progressive rollout strategies such as canary or rolling deployment.",
      "Define health checks and metric thresholds for rollout decisions.",
      "Implement automated halt or rollback behavior with safe boundaries.",
      "Use feature flags for controlled exposure of risky functionality.",
      "Maintain compatible database migration and recovery procedures."
    ],
    troubleshooting: [
      "If deployment does not trigger, inspect branch events and pipeline conditions.",
      "If automated tests fail, review test reports and block production promotion.",
      "If a rollout stalls, inspect pod readiness, resource limits, and deployment events.",
      "If errors rise after release, compare version-specific metrics and initiate the approved rollback.",
      "If rollback cannot reverse a database change, use a forward-fix or documented data recovery plan."
    ],
    bestPractices: [
      "Deploy small changes frequently rather than large batches.",
      "Use comprehensive automated tests and production-like staging validation.",
      "Apply canary or progressive delivery for high-impact services.",
      "Monitor service-level indicators and define clear halt conditions.",
      "Use backward-compatible database and API changes.",
      "Practice rollback and feature-flag disablement before relying on them."
    ],
    securityConsiderations: [
      "Protect production deployment credentials and pipeline permissions.",
      "Require code review and policy checks even when deployment is automated.",
      "Verify artifact provenance and scan dependencies and images.",
      "Audit automated production changes and retain deployment records.",
      "Use least privilege and separate approval for exceptional emergency changes."
    ]
  },
  "automation": {
    purpose: "Automation uses scripts, configuration management, pipelines, and orchestration tools to execute repeatable tasks with reduced manual effort. In DevOps, it is used for builds, tests, infrastructure provisioning, deployments, backups, monitoring, and routine operations. Good automation improves consistency while providing logs, validation, error handling, and controlled permissions.",
    project: "An engineering team automates application delivery. A pipeline checks out source code, runs tests, builds a Docker image, pushes it to a registry, and updates a Kubernetes deployment. A separate infrastructure workflow uses Terraform to provision required cloud resources.",
    workflow: [
      "Identify repetitive tasks and document their current manual steps.",
      "Define expected inputs, outputs, permissions, and failure conditions.",
      "Choose a suitable tool such as Bash, PowerShell, Python, Ansible, or a CI platform.",
      "Write reusable automation with validation and error handling.",
      "Test the automation in a non-production environment.",
      "Integrate it into the approved pipeline or operational workflow.",
      "Log execution results and notify owners when failures occur.",
      "Review and maintain automation as systems and requirements change."
    ],
    commands: [
      "bash deploy.sh",
      "chmod +x deploy.sh",
      "python3 automation.py",
      "ansible-playbook -i inventory.ini deploy.yml",
      "terraform plan",
      "terraform apply",
      "kubectl apply -f deployment.yaml"
    ],
    mistakes: [
      "Automating an unclear or unstable manual process without standardizing it first.",
      "Writing scripts without input validation or meaningful error handling.",
      "Hardcoding passwords, tokens, or environment-specific values.",
      "Running destructive automation without review or confirmation.",
      "Failing to make automation repeatable and safe to execute again.",
      "Ignoring logs, notifications, and failure recovery."
    ],
    configuration: [
      "Store scripts and automation definitions in version control.",
      "Separate environment-specific variables from reusable logic.",
      "Use approved secret stores and scoped execution identities.",
      "Configure timeouts, retries, logging, and explicit failure handling.",
      "Make tasks idempotent where possible so repeated runs converge safely.",
      "Test automation with representative inputs before production use.",
      "Document prerequisites, expected results, and recovery procedures."
    ],
    troubleshooting: [
      "If a script fails, inspect its exit code, logs, input values, and execution environment.",
      "If automation works manually but fails in CI, compare user permissions and environment variables.",
      "If repeated runs cause unwanted changes, inspect idempotency and state handling.",
      "If a task times out, check dependency availability and execution limits.",
      "If results differ across environments, standardize tool versions and configuration."
    ],
    bestPractices: [
      "Automate stable, repeatable processes with measurable benefits.",
      "Use small reusable scripts and modules rather than one oversized script.",
      "Validate inputs and stop safely when prerequisites are missing.",
      "Use meaningful exit codes and structured logs.",
      "Review changes and test destructive operations before production execution.",
      "Monitor automation health and periodically remove obsolete workflows."
    ],
    securityConsiderations: [
      "Never embed secrets directly in scripts or source repositories.",
      "Use least-privilege identities and short-lived credentials.",
      "Review commands that modify or delete production resources.",
      "Protect automation runners and restrict who can execute privileged jobs.",
      "Audit execution history and prevent sensitive values from appearing in logs."
    ]
  },
  "collaboration": {
    purpose: "Collaboration is the practice of sharing information, responsibilities, and decisions across people and teams working toward a common delivery or operational goal. In DevOps, developers, testers, security specialists, and operations engineers coordinate changes, share feedback, and jointly resolve incidents. Effective collaboration reduces handoff delays and improves service ownership.",
    project: "A production release requires application, database, security, and platform changes. The teams review the deployment plan together, agree on compatibility requirements, validate the release in staging, and coordinate production monitoring. When an alert occurs, responders use a shared incident channel and timeline.",
    workflow: [
      "Define shared goals, service ownership, and responsibilities.",
      "Document requirements, dependencies, and expected outcomes.",
      "Use shared work items and version-controlled changes to maintain visibility.",
      "Review technical changes with the relevant teams before implementation.",
      "Coordinate testing, release readiness, and operational handover.",
      "Share production metrics and incident evidence across service owners.",
      "Conduct reviews that focus on system improvements rather than personal blame.",
      "Track decisions and follow-up actions to completion."
    ],
    commands: [
      "git status",
      "git branch -a",
      "git log --oneline --graph -10",
      "git diff",
      "git pull --rebase origin main"
    ],
    mistakes: [
      "Keeping important operational knowledge inside individual teams or private messages.",
      "Assuming another team owns a dependency without confirming responsibility.",
      "Making production changes without informing affected service owners.",
      "Blaming individuals instead of investigating system and process failures.",
      "Holding meetings without recording decisions and accountable actions.",
      "Ignoring feedback from support teams and production users."
    ],
    configuration: [
      "Define service ownership and escalation contacts.",
      "Use shared issue tracking, documentation, and incident communication channels.",
      "Connect work items with pull requests, deployment records, and operational incidents.",
      "Maintain clear change-management and release communication practices.",
      "Provide access to relevant dashboards and runbooks based on team responsibilities.",
      "Record decisions, risks, dependencies, and action owners."
    ],
    troubleshooting: [
      "If work is delayed between teams, identify the handoff and clarify its owner.",
      "If conflicting changes occur, review repository history and agree on integration responsibilities.",
      "If incident communication is fragmented, establish one shared coordination channel.",
      "If repeated issues cross team boundaries, review service ownership and dependency documentation.",
      "If decisions are forgotten, maintain a searchable decision record and action tracker."
    ],
    bestPractices: [
      "Encourage shared responsibility for service quality and reliability.",
      "Communicate changes early and use concise, actionable updates.",
      "Keep documentation accessible and current.",
      "Use peer reviews and cross-functional planning for important changes.",
      "Share lessons learned from incidents and successful improvements.",
      "Respect different technical perspectives and resolve disagreements using evidence."
    ],
    securityConsiderations: [
      "Share sensitive operational information only with authorized participants.",
      "Use role-based access to shared repositories and communication systems.",
      "Do not post credentials or customer data in collaboration channels.",
      "Follow approved processes when sharing incident evidence.",
      "Review access when team responsibilities change."
    ]
  },
  "version-control": {
    purpose: "Version Control is a system for recording and managing changes to source code, configuration, and other project files. It allows teams to review history, collaborate through branches, compare revisions, and restore earlier states. Distributed systems such as Git let developers work locally and share changes through remote repositories.",
    project: "Several developers maintain a microservices application. Each developer creates a feature branch, commits focused changes, and opens a pull request. Reviewers inspect the differences and automated CI checks run before the change is merged into the main branch.",
    workflow: [
      "Create or clone a repository containing the project files.",
      "Create a branch for an isolated feature or fix.",
      "Modify files and inspect the changes before committing.",
      "Create meaningful commits that explain the change.",
      "Push the branch to the shared remote repository.",
      "Open a pull request and complete code review and automated checks.",
      "Merge approved changes using the team's repository policy.",
      "Use tags and release records to identify delivered versions."
    ],
    commands: [
      "git init",
      "git clone <repository-url>",
      "git status",
      "git switch -c feature/login",
      "git add <file>",
      "git commit -m 'Add login validation'",
      "git push -u origin feature/login",
      "git log --oneline --graph --all"
    ],
    mistakes: [
      "Committing secrets, credentials, or generated files into a repository.",
      "Using vague commit messages that make history difficult to understand.",
      "Making large unrelated changes in one commit.",
      "Force-pushing shared branches without understanding the impact.",
      "Ignoring merge conflicts or resolving them without testing.",
      "Failing to protect important branches and review production changes."
    ],
    configuration: [
      "Configure a remote repository and approved branch naming conventions.",
      "Add a suitable .gitignore file for generated files and local secrets.",
      "Protect main and release branches with review and status-check requirements.",
      "Configure repository access using least-privilege permissions.",
      "Use tags and release conventions to identify stable versions.",
      "Configure CI triggers and retain build evidence for important revisions."
    ],
    troubleshooting: [
      "If a push is rejected, inspect remote changes and integrate them using the approved workflow.",
      "If merge conflicts occur, inspect conflict markers and validate the final combined result.",
      "If a commit contains an unwanted file, use an appropriate corrective commit or approved history-rewrite procedure.",
      "If authentication fails, verify remote URL, credential configuration, and repository permissions.",
      "If the wrong branch is checked out, inspect git status and git branch before making further changes.",
      "If a release cannot be traced, inspect tags, commit history, and artifact metadata."
    ],
    bestPractices: [
      "Commit small, logically related changes with clear messages.",
      "Use feature branches and pull requests for collaborative review.",
      "Keep the main branch in a buildable and testable state.",
      "Use tags and immutable artifact references for releases.",
      "Review diffs before committing and before merging.",
      "Document branching, merge, and emergency correction policies."
    ],
    securityConsiderations: [
      "Never store passwords, API tokens, or private keys in source control.",
      "Use secret scanning and rotate credentials if a secret is committed.",
      "Restrict repository and branch administration permissions.",
      "Protect signed release tags and verify trusted artifacts where appropriate.",
      "Audit access and changes to critical repositories."
    ]
  }
};
