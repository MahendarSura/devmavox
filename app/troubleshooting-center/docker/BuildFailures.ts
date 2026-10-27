export interface BuildFailureDiagnostic {
  id: string;
  title: string;
  purpose: string;
  command: string;
  exampleOutput: string;
  interpretation: string[];
  nextStep: string;
  risk: "read-only" | "low" | "moderate" | "high";
}

export interface BuildFailureRootCause {
  id: string;
  cause: string;
  symptoms: string[];
  confirmationSteps: string[];
  resolution: string[];
  verification: string[];
  prevention: string[];
}

export interface BuildFailureScenario {
  title: string;
  environment: string;
  severity: "SEV-1" | "SEV-2" | "SEV-3" | "SEV-4";
  impact: string[];
  timeline: Array<{
    time: string;
    observation: string;
    action: string;
  }>;
  rootCause: string;
  recovery: string[];
  lessonsLearned: string[];
}

export interface BuildFailureInterviewQuestion {
  question: string;
  answer: string;
  followUp?: string;
}

export interface BuildFailureExercise {
  title: string;
  symptoms: string[];
  task: string[];
  expectedFindings: string[];
  solution: string[];
}

export const buildFailuresGuide = {
  id: "docker-build-failures",
  title: "Docker Build Failures",
  tool: "Docker",
  category: "Containerization Troubleshooting",
  difficulty: "Intermediate to Advanced",

  summary:
    "A production-oriented guide for investigating, isolating, fixing, and preventing Docker image build failures across local development, CI/CD pipelines, build agents, and production release workflows.",

  objectives: [
    "Understand the Docker image build lifecycle and BuildKit execution.",
    "Distinguish Dockerfile errors from application compilation, dependency, network, storage, registry, and CI runner failures.",
    "Collect evidence before changing the build environment.",
    "Follow a safe, ordered diagnostic workflow.",
    "Identify the actual failing build stage and instruction.",
    "Fix the specific root cause instead of repeatedly rerunning the pipeline.",
    "Verify image integrity, reproducibility, security, and release readiness.",
    "Prevent recurring failures through CI validation, observability, and controlled build practices.",
  ],

  environmentPlaceholders: {
    image: "my-service",
    tag: "build-123",
    dockerfile: "Dockerfile",
    context: ".",
    containerRegistry: "registry.example.com",
    gitRevision: "<commit-sha>",
    buildPlatform: "linux/amd64",
    buildxBuilder: "<builder-name>",
    ciJob: "<pipeline-job-name>",
    namespace: "<deployment-namespace>",
    note:
      "Replace every placeholder with the actual project, registry, builder, commit, and environment. Example registry names and outputs in this guide are illustrative, not evidence from a real incident.",
  },

  overview: {
    definition:
      "A Docker build failure occurs when Docker cannot successfully produce the requested image from the Dockerfile, build context, base images, build arguments, mounted secrets, external dependencies, and builder configuration.",

    lifecycle: [
      {
        step: 1,
        name: "Build request",
        explanation:
          "The CLI or CI pipeline submits the Dockerfile path, build context, image tag, build arguments, target stage, and platform to the selected builder.",
      },
      {
        step: 2,
        name: "Context preparation",
        explanation:
          "Docker determines which files are available to COPY and ADD. The .dockerignore file can exclude files that the Dockerfile expects.",
      },
      {
        step: 3,
        name: "Base image resolution",
        explanation:
          "The builder resolves FROM images, tags, platform compatibility, and registry access.",
      },
      {
        step: 4,
        name: "Instruction execution",
        explanation:
          "Instructions such as RUN, COPY, ADD, WORKDIR, and package-manager commands are processed. BuildKit can execute independent stages concurrently.",
      },
      {
        step: 5,
        name: "Application compilation",
        explanation:
          "Commands inside the Dockerfile install dependencies, compile code, run tests, and generate build artifacts when configured to do so.",
      },
      {
        step: 6,
        name: "Image assembly",
        explanation:
          "Successful layers and filesystem changes are assembled into an image for the selected target stage and platform.",
      },
      {
        step: 7,
        name: "Tagging and publishing",
        explanation:
          "The pipeline may tag and push the resulting image to a registry. A successful build does not guarantee that a push or deployment will succeed.",
      },
    ],

    criticalDistinctions: [
      {
        symptom: "Dockerfile syntax error",
        meaning:
          "The Dockerfile cannot be parsed or contains an invalid instruction.",
        direction:
          "Inspect the Dockerfile, line number, syntax directive, and build command.",
      },
      {
        symptom: "COPY failed or file not found",
        meaning:
          "A source path may be absent from the build context, excluded by .dockerignore, incorrectly cased, or referenced from the wrong location.",
        direction:
          "Check the context, repository contents, ignore rules, and exact path.",
      },
      {
        symptom: "RUN command failed",
        meaning:
          "A command executed inside a build stage returned a nonzero exit code.",
        direction:
          "Inspect the complete command output, shell behavior, dependencies, and the relevant stage.",
      },
      {
        symptom: "Base image pull failed",
        meaning:
          "The builder may not be able to resolve, authenticate to, or download the requested base image.",
        direction:
          "Check image reference, registry connectivity, credentials, rate limits, and platform compatibility.",
      },
      {
        symptom: "Build context or source files missing",
        meaning:
          "The build command may be using the wrong context directory or the CI workspace may not contain the expected revision.",
        direction:
          "Verify the current directory, Git revision, checkout result, and Docker build command.",
      },
      {
        symptom: "Build succeeds locally but fails in CI",
        meaning:
          "Local and CI environments may differ in architecture, cache, filesystem case sensitivity, credentials, tool versions, network, or environment variables.",
        direction:
          "Compare the exact commit, Docker version, Buildx version, builder, platform, context, and build arguments.",
      },
      {
        symptom: "Image builds successfully but push fails",
        meaning:
          "The image build and registry publishing are separate stages.",
        direction:
          "Investigate registry authentication, permissions, tag policy, network, and storage independently.",
      },
      {
        symptom: "Build succeeds but deployment fails",
        meaning:
          "The failure may be in image pulling, runtime configuration, health checks, or orchestration rather than image creation.",
        direction:
          "Confirm the published digest and inspect the deployment system's events and runtime logs.",
      },
    ],
  },

  severityAssessment: [
    {
      level: "SEV-1",
      criteria:
        "A release-blocking build failure is causing a critical customer-facing outage, or the incident prevents a required emergency fix from being released.",
      actions: [
        "Engage the incident commander and responsible application/platform teams.",
        "Confirm customer impact and the current production state.",
        "Preserve logs and identify a safe recovery or mitigation path.",
        "Use the approved emergency change process.",
      ],
    },
    {
      level: "SEV-2",
      criteria:
        "A critical production release is blocked, multiple services cannot be released, or a shared build platform failure is affecting several teams.",
      actions: [
        "Escalate to the CI/CD and platform owners.",
        "Check whether the failure is project-specific or affects a shared builder.",
        "Identify the last known-good image and safe release options.",
      ],
    },
    {
      level: "SEV-3",
      criteria:
        "A single application pipeline is blocked without a current customer-facing outage.",
      actions: [
        "Collect build logs and identify the failing instruction.",
        "Create a reproducible diagnosis and targeted fix.",
        "Verify the fix in a controlled build.",
      ],
    },
    {
      level: "SEV-4",
      criteria:
        "A non-blocking build warning, optimization issue, or intermittent failure has a documented workaround and no immediate release impact.",
      actions: [
        "Record the evidence.",
        "Create a tracked improvement.",
        "Monitor for recurrence and assess whether the warning creates a future risk.",
      ],
    },
  ],

  incidentResponseWorkflow: [
    {
      step: 1,
      title: "Detect and acknowledge",
      actions: [
        "Identify the failed pipeline, build job, image, commit, and first failure timestamp.",
        "Record the exact error message and failing Dockerfile instruction.",
        "Check whether one pipeline or a shared builder is affected.",
        "Determine whether a production deployment or emergency patch is blocked.",
      ],
      decision:
        "If multiple unrelated repositories fail at the same time, investigate shared infrastructure, registry, network, or builder health before changing individual Dockerfiles.",
    },
    {
      step: 2,
      title: "Assess impact and severity",
      actions: [
        "Identify the affected application and environment.",
        "Determine whether the failure blocks a new release or affects an active production service.",
        "Check whether an image was already built, tagged, or pushed before the failure.",
        "Confirm whether downstream deployment jobs have already started.",
        "Check for other builds queued on the same runner or builder.",
      ],
      decision:
        "Do not assume that a failed pipeline means no image was published or no deployment changes occurred. Inspect completed pipeline stages and actual registry/deployment state.",
    },
    {
      step: 3,
      title: "Perform safety checks",
      actions: [
        "Confirm the correct repository and Git revision.",
        "Confirm the working directory and Dockerfile path.",
        "Confirm the selected Docker context and Buildx builder.",
        "Confirm the intended image repository and tag.",
        "Check production change approval and release freeze rules.",
        "Do not print registry passwords, tokens, or secret build arguments.",
        "Avoid deleting shared caches or restarting shared builders until their scope and impact are understood.",
      ],
      decision:
        "If the current context, image destination, or target environment is uncertain, stop before running commands that modify, publish, or deploy artifacts.",
    },
    {
      step: 4,
      title: "Collect evidence",
      actions: [
        "Save the full build log, not only the final error line.",
        "Record the first failing instruction and all preceding warnings.",
        "Record the Dockerfile, .dockerignore, package manifests, lockfiles, and relevant CI configuration.",
        "Record the commit SHA, runner image, Docker version, Buildx version, target platform, and builder driver.",
        "Record whether the failure is repeatable and whether it happens on another clean builder.",
        "Redact secrets before attaching logs to an incident ticket.",
      ],
      decision:
        "Use the first causal error rather than treating every downstream failure as a separate root cause.",
    },
    {
      step: 5,
      title: "Run ordered diagnostics",
      actions: [
        "Validate the repository revision and workspace.",
        "Inspect Docker and Buildx versions and builder selection.",
        "Check the Dockerfile and build context.",
        "Run a diagnostic build with plain progress output.",
        "Investigate the exact failing instruction.",
        "Check registry, network, storage, architecture, cache, or permissions when evidence points to those areas.",
      ],
      decision:
        "Every next command should answer a specific question raised by the previous output.",
    },
    {
      step: 6,
      title: "Isolate root cause",
      actions: [
        "Separate source/configuration defects from shared infrastructure failures.",
        "Reproduce the failure using the same commit and equivalent build parameters.",
        "Compare a known-good build with the failed build.",
        "Change one relevant variable at a time.",
        "Record evidence that confirms or rules out each candidate cause.",
      ],
      decision:
        "If the error is not reproducible, preserve the original evidence and investigate transient infrastructure conditions before declaring the incident resolved.",
    },
    {
      step: 7,
      title: "Fix and recover",
      actions: [
        "Make the smallest correction supported by evidence.",
        "Review the code or Dockerfile diff.",
        "Run appropriate static validation and a controlled build.",
        "Verify the image's expected metadata and contents.",
        "Push only after registry, tag, approval, and release policies are confirmed.",
        "Use the normal deployment approval and rollback procedures.",
      ],
      decision:
        "Do not bypass tests or security controls simply to make the pipeline green.",
    },
    {
      step: 8,
      title: "Verify and close",
      actions: [
        "Confirm that the build succeeds for the intended commit and platform.",
        "Confirm the expected image tag and digest.",
        "Verify that the registry contains the intended artifact.",
        "Confirm downstream deployment and application health if deployment was part of the incident.",
        "Record root cause, evidence, corrective action, and prevention tasks.",
      ],
      decision:
        "A successful local build is not sufficient proof if the production CI builder, registry push, or deployment path remains unverified.",
    },
  ],

  diagnostics: [
    {
      id: "D01",
      title: "Confirm repository, commit, and workspace",
      purpose:
        "Determine whether the build is using the intended source revision and expected files.",
      command: [
        "git status --short",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "git log -1 --oneline",
        "pwd",
        "ls -la",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nHEAD: 8f31a2c\nDockerfile: present\n.dockerignore: present\npackage-lock.json: present",
      interpretation: [
        "Compare the commit SHA with the failed CI job.",
        "Check whether the Dockerfile and lockfile are present in the expected directory.",
        "Look for uncommitted local changes that could explain a local-versus-CI difference.",
        "A clean Git status does not prove that all expected build inputs are present.",
        "On Windows, use PowerShell equivalents such as Get-Location, Get-ChildItem, and git rev-parse.",
      ],
      nextStep:
        "If the workspace or commit is wrong, correct the checkout/workspace problem before diagnosing Dockerfile instructions.",
      risk: "read-only",
    },
    {
      id: "D02",
      title: "Confirm Docker client and server",
      purpose:
        "Check whether the CLI can reach the intended Docker daemon and identify version differences.",
      command: [
        "docker version",
        "docker info",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nClient: Docker Engine - Community\nServer: Docker Engine - Community\nServer Version: 27.x",
      interpretation: [
        "A client-only response or daemon connection error may indicate a wrong Docker context or unavailable daemon.",
        "Compare server and client versions with the last known-good builder.",
        "Inspect storage driver, architecture, and available disk information in docker info.",
        "Review the output before sharing it because environment details can be sensitive.",
      ],
      nextStep:
        "If the daemon is reachable, inspect Buildx and builder selection. If it is not, diagnose daemon access and context first.",
      risk: "read-only",
    },
    {
      id: "D03",
      title: "Inspect Docker context",
      purpose:
        "Ensure the build is not targeting an unintended daemon.",
      command: [
        "docker context show",
        "docker context ls",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\ndefault\nNAME        DESCRIPTION\n* default   Current DOCKER_HOST based configuration",
      interpretation: [
        "The current context controls which Docker endpoint the CLI uses.",
        "A CI job may target a remote builder while a developer's laptop uses a local daemon.",
        "A remote context can have different architecture, cache, credentials, and network access.",
      ],
      nextStep:
        "If the context differs from the expected environment, verify the approved endpoint before switching it.",
      risk: "read-only",
    },
    {
      id: "D04",
      title: "Inspect Buildx builders",
      purpose:
        "Determine which builder and driver execute the build.",
      command: [
        "docker buildx version",
        "docker buildx ls",
        "docker buildx inspect",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nName: default\nDriver: docker\nStatus: running\nPlatforms: linux/amd64, linux/arm64",
      interpretation: [
        "Builder drivers may expose different capabilities and cache behavior.",
        "A missing target platform may cause a platform-specific failure.",
        "A builder can be unavailable even when the Docker CLI itself works.",
        "Do not create or switch a shared builder during an incident without understanding its impact.",
      ],
      nextStep:
        "If builder selection and platform are correct, capture the failing build with plain progress output.",
      risk: "read-only",
    },
    {
      id: "D05",
      title: "Inspect the Dockerfile and ignore rules",
      purpose:
        "Check whether build inputs are correctly named and included in the context.",
      command: [
        "sed -n '1,240p' Dockerfile",
        "cat .dockerignore",
        "find . -maxdepth 2 -type f | sort | head -200",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nDockerfile contains: COPY package*.json ./\n.dockerignore contains: package*.json",
      interpretation: [
        "The example shows a contradiction: the ignore file excludes files that the Dockerfile expects to copy.",
        "Check exact capitalization because Linux build environments are case-sensitive.",
        "Check whether generated files exist before the Docker build starts.",
        "Do not dump .env files or secret material into diagnostic output.",
        "The sample uses Unix shell commands; use equivalent commands in PowerShell when needed.",
      ],
      nextStep:
        "If an expected file is missing from the context, inspect the build command and ignore rules before modifying application code.",
      risk: "read-only",
    },
    {
      id: "D06",
      title: "Reproduce with detailed build output",
      purpose:
        "Identify the exact failing instruction and obtain full diagnostic output.",
      command:
        "docker build --progress=plain -f Dockerfile -t my-service:diagnostic .",
      exampleOutput:
        "Illustrative output:\n[build 4/8] RUN npm ci\nnpm ERR! code EUSAGE\nnpm ERR! npm ci can only install packages when package.json and package-lock.json are in sync\nERROR: failed to solve: process ... did not complete successfully: exit code: 1",
      interpretation: [
        "The first causal failure is in the dependency installation stage, not necessarily in Docker itself.",
        "The command creates or uses a local diagnostic image tag if successful.",
        "Use the same commit, platform, build arguments, and target stage as the failed pipeline where practical.",
        "If the original command uses secrets or private registries, reproduce it only with the approved secret mechanism.",
        "Avoid sharing verbose output before redacting tokens and private registry credentials.",
      ],
      nextStep:
        "Investigate the failing instruction and its immediate dependencies. Do not clean caches or rebuild unrelated components without evidence.",
      risk: "low",
    },
    {
      id: "D07",
      title: "Check image references and registry reachability",
      purpose:
        "Determine whether a FROM image is missing, inaccessible, or unavailable for the requested platform.",
      command: [
        "docker image inspect alpine:3.20",
        "docker manifest inspect alpine:3.20",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nmanifest inspection succeeds for the selected image reference",
      interpretation: [
        "Replace the sample image with the exact FROM reference when diagnosing a real failure.",
        "A manifest inspection can reveal a missing tag or unsupported platform, but it does not prove that every build request can pull the image.",
        "Private registries may require authentication and may return authorization errors instead of not-found errors.",
        "A registry outage or rate limit may affect many repositories at once.",
      ],
      nextStep:
        "If the image reference is valid, check authentication, registry status, network access, and platform compatibility.",
      risk: "read-only",
    },
    {
      id: "D08",
      title: "Inspect build platform and architecture",
      purpose:
        "Determine whether a platform mismatch causes base image, package, or compilation failures.",
      command: [
        "docker info --format '{{.OSType}}/{{.Architecture}}'",
        "docker buildx inspect",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nlinux/x86_64\nBuilder supports linux/amd64",
      interpretation: [
        "The builder's host architecture and target image platform are related but not identical.",
        "An ARM runner building an amd64 image may need emulation or a native builder.",
        "Architecture mismatches can surface as exec format errors or missing platform manifests.",
        "Do not force a target platform without checking native dependencies and release requirements.",
      ],
      nextStep:
        "Compare the intended target platform with the builder's supported platforms and the failing stage.",
      risk: "read-only",
    },
    {
      id: "D09",
      title: "Inspect available disk space",
      purpose:
        "Check whether the build fails because the runner filesystem or Docker storage is full.",
      command: [
        "df -h",
        "df -i",
        "docker system df",
      ].join("\n"),
      exampleOutput:
        "Illustrative output:\nFilesystem  Size  Used  Avail Use%\n/dev/sda1    40G   39G   1G    98%",
      interpretation: [
        "A filesystem close to full may prevent layer extraction, package installation, or image assembly.",
        "Inode exhaustion can cause file creation failures even when byte capacity remains.",
        "docker system df shows Docker-managed storage, which may differ from the runner's overall disk usage.",
        "Identify whether the affected filesystem is the runner workspace, Docker data root, or a mounted cache.",
      ],
      nextStep:
        "If storage is exhausted, identify the largest safe-to-remove data and follow the runner cleanup procedure.",
      risk: "read-only",
    },
    {
      id: "D10",
      title: "Inspect build cache behavior",
      purpose:
        "Determine whether a stale or invalidated cache contributes to the failure.",
      command: [
        "docker buildx du",
        "docker buildx build --progress=plain -f Dockerfile -t my-service:diagnostic .",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nA dependency installation step is reused from cache on one builder but executes and fails on another.",
      interpretation: [
        "Cache differences may expose a dependency or network issue that was previously hidden by cached layers.",
        "A cache miss is not itself proof that the cache is corrupt.",
        "A no-cache build is expensive and can increase network load; use it only when the evidence justifies the test.",
        "Compare the same source revision and builder configuration before concluding that cache caused the incident.",
      ],
      nextStep:
        "If cache behavior is implicated, reproduce in a controlled build and compare the failing instruction with the cached path.",
      risk: "low",
    },
    {
      id: "D11",
      title: "Check application dependency installation",
      purpose:
        "Investigate failures from npm, pnpm, yarn, pip, Maven, Gradle, or operating-system package managers.",
      command: [
        "git diff -- package.json package-lock.json pnpm-lock.yaml yarn.lock",
        "git status --short",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\npackage.json changed, but package-lock.json was not updated.",
      interpretation: [
        "The correct lockfile depends on the application's package manager.",
        "A lockfile mismatch can cause deterministic installation commands to fail.",
        "Private package registry authentication, DNS, TLS, rate limits, and unavailable mirrors can produce different errors.",
        "Do not replace a deterministic install with an unconstrained install just to bypass a lockfile error.",
      ],
      nextStep:
        "Use the package manager's documented validation and lockfile-generation workflow, then rebuild using the reviewed change.",
      risk: "read-only",
    },
    {
      id: "D12",
      title: "Check runtime user and file permissions in build stages",
      purpose:
        "Determine whether a RUN, COPY, or artifact-writing operation fails because of filesystem permissions.",
      command: [
        "id",
        "ls -ld .",
        "git ls-files",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nA build script attempts to write into a directory owned by root while running as a non-root user.",
      interpretation: [
        "The commands above inspect the current shell, not the user inside every Docker build stage.",
        "Inspect the relevant USER, WORKDIR, COPY --chown, and RUN instructions.",
        "Avoid fixing permission errors by making every directory world-writable.",
        "Build-time permissions and runtime container permissions are separate concerns.",
      ],
      nextStep:
        "Confirm which stage and user execute the failing command, then make the smallest permission correction.",
      risk: "read-only",
    },
    {
      id: "D13",
      title: "Inspect CI pipeline command and build context",
      purpose:
        "Find differences between the local build and the actual pipeline build command.",
      command: [
        "git grep -n -E 'docker build|buildx build|dockerfile|context:' -- . ':!package-lock.json'",
        "git status --short",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nLocal: docker build -f services/api/Dockerfile services/api\nCI: docker build -f services/api/Dockerfile .",
      interpretation: [
        "The final argument to docker build determines the context directory.",
        "Changing the context can change which files COPY can access.",
        "A Dockerfile path and build context are separate parameters.",
        "Check CI working-directory settings and generated artifacts before modifying the Dockerfile.",
      ],
      nextStep:
        "Reproduce the exact CI command and compare the context and available files.",
      risk: "read-only",
    },
    {
      id: "D14",
      title: "Inspect build-time secret usage",
      purpose:
        "Determine whether private dependency downloads fail because of missing or incorrectly scoped credentials.",
      command: [
        "docker buildx build --help",
        "git grep -n -E 'RUN --mount=type=secret|--secret|--ssh' -- Dockerfile",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nA private package installation step expects a BuildKit secret mount, but the CI build does not provide the configured secret.",
      interpretation: [
        "BuildKit secret mounts provide a safer mechanism than embedding credentials in Dockerfile instructions.",
        "Never use echo, set -x, env dumps, or build arguments to print secret values.",
        "Check secret names, mount targets, CI permissions, and whether BuildKit is enabled.",
        "A secret mount is available only to the instructions configured to consume it.",
      ],
      nextStep:
        "Verify secret presence through approved metadata or access checks without exposing its value, then correct the secret wiring.",
      risk: "read-only",
    },
    {
      id: "D15",
      title: "Inspect build output and stage selection",
      purpose:
        "Determine whether the intended target stage and required artifacts are actually being built.",
      command: [
        "grep -nE '^(FROM|AS|COPY|RUN|WORKDIR|USER)' Dockerfile",
        "docker buildx build --help",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nThe CI pipeline selects --target runtime, but the required artifact is generated only in a different stage that is not copied into runtime.",
      interpretation: [
        "Multi-stage builds can hide dependencies and artifacts when stage boundaries are incorrect.",
        "A successful intermediate stage does not guarantee that the final stage contains the expected application.",
        "Inspect COPY --from references and the configured target stage.",
      ],
      nextStep:
        "Correct the stage dependency or artifact-copy configuration and validate the final image, not just an intermediate stage.",
      risk: "read-only",
    },
    {
      id: "D16",
      title: "Inspect published image identity",
      purpose:
        "Verify that a successfully built and published image corresponds to the intended release.",
      command: [
        "docker image inspect my-service:build-123",
        "docker buildx imagetools inspect registry.example.com/my-service:build-123",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nThe local image exists, but the registry reference resolves to an unexpected digest or an older manifest.",
      interpretation: [
        "Local image IDs, registry digests, and multi-platform manifest-list digests are different concepts.",
        "A tag can be overwritten unless registry policy prevents it.",
        "Verify the commit label, image metadata, tag, and digest against the release record.",
        "Do not publish or deploy an artifact until its intended identity is confirmed.",
      ],
      nextStep:
        "If the artifact identity is wrong, stop the release and follow the approved tagging and publishing correction process.",
      risk: "read-only",
    },
    {
      id: "D17",
      title: "Inspect Docker daemon and builder logs",
      purpose:
        "Investigate failures that appear to originate from the daemon, BuildKit worker, or host infrastructure.",
      command: [
        "docker info",
        "docker buildx inspect",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nBuild worker reports an execution or storage error while processing an otherwise valid instruction.",
      interpretation: [
        "CLI output alone may not reveal the full cause of a builder infrastructure failure.",
        "Use the CI platform's runner logs or the approved builder logging mechanism.",
        "If the builder runs in a container or remote service, inspect that service's logs using its actual deployment method.",
        "Do not assume that systemctl or a specific container name exists on every CI runner.",
      ],
      nextStep:
        "Correlate builder logs with the build timestamp and failing step. Escalate if the shared builder appears unhealthy.",
      risk: "read-only",
    },
    {
      id: "D18",
      title: "Check whether the failure is shared or application-specific",
      purpose:
        "Determine whether multiple projects are affected by the same infrastructure dependency.",
      command: [
        "docker buildx ls",
        "docker info",
        "git rev-parse HEAD",
      ].join("\n"),
      exampleOutput:
        "Illustrative finding:\nSeveral unrelated repositories fail to pull the same base image at approximately the same time.",
      interpretation: [
        "Correlated failures can indicate registry, DNS, proxy, certificate, storage, or builder incidents.",
        "Compare timestamps and error classes across jobs.",
        "Do not change application Dockerfiles to compensate for a shared infrastructure outage without evidence.",
      ],
      nextStep:
        "Escalate to the registry/network/platform owner when independent repositories show the same failure signature.",
      risk: "read-only",
    },
  ] satisfies BuildFailureDiagnostic[],

  rootCauses: [
    {
      id: "RC01",
      cause: "Wrong Docker build context",
      symptoms: [
        "COPY reports that a file does not exist.",
        "A file exists locally but is unavailable during the CI build.",
        "The same Dockerfile behaves differently with different build commands.",
      ],
      confirmationSteps: [
        "Inspect the exact build command and final context argument.",
        "Verify the current directory and repository root.",
        "Check whether the expected file is inside the selected context.",
        "Compare the CI command with the known-good local command.",
      ],
      resolution: [
        "Correct the build context or Dockerfile path.",
        "Update the pipeline working directory if it is wrong.",
        "Keep the context as narrow as practical while including all required files.",
      ],
      verification: [
        "Repeat the exact CI build command.",
        "Confirm that the required file is copied into the intended stage.",
        "Run the relevant build and tests.",
      ],
      prevention: [
        "Define the context explicitly in CI.",
        "Validate expected build inputs before the build starts.",
        "Use a consistent repository layout and documented build command.",
      ],
    },
    {
      id: "RC02",
      cause: "Required files excluded by .dockerignore",
      symptoms: [
        "COPY cannot locate a tracked file.",
        "A package manifest is present in Git but absent from the build context.",
        "The failure begins after an ignore-file change.",
      ],
      confirmationSteps: [
        "Inspect .dockerignore and relevant Dockerfile COPY instructions.",
        "Check Git history for recent ignore-rule changes.",
        "Confirm the file is inside the build context.",
      ],
      resolution: [
        "Remove or narrow only the ignore rule that excludes a required input.",
        "Keep secrets, local credentials, build outputs, and unrelated files excluded.",
        "Review the resulting diff before merging.",
      ],
      verification: [
        "Re-run the build with plain progress output.",
        "Confirm that the expected input reaches the correct stage.",
      ],
      prevention: [
        "Review .dockerignore changes alongside Dockerfile changes.",
        "Add CI checks for mandatory build inputs.",
      ],
    },
    {
      id: "RC03",
      cause: "Dockerfile syntax or instruction error",
      symptoms: [
        "Docker reports a parse error or invalid instruction.",
        "The failure occurs before the expected build stage executes.",
        "A recent Dockerfile edit introduced a malformed continuation or instruction.",
      ],
      confirmationSteps: [
        "Inspect the reported line and surrounding instructions.",
        "Check the Dockerfile syntax directive and required BuildKit features.",
        "Compare the changed lines with the last known-good revision.",
      ],
      resolution: [
        "Correct the syntax or instruction ordering.",
        "Use supported syntax for the selected builder version.",
        "Avoid unrelated refactoring during incident recovery.",
      ],
      verification: [
        "Run the same build using the target builder.",
        "Verify that parsing succeeds and the intended stage begins.",
      ],
      prevention: [
        "Validate Dockerfiles in CI.",
        "Pin and periodically review builder versions.",
        "Test Dockerfile changes before merging.",
      ],
    },
    {
      id: "RC04",
      cause: "Base image missing or inaccessible",
      symptoms: [
        "A FROM instruction fails during manifest resolution or image pull.",
        "The error contains not found, unauthorized, rate limit, TLS, or timeout details.",
        "Several builds fail on the same base image.",
      ],
      confirmationSteps: [
        "Inspect the exact image name, registry, and tag.",
        "Check registry availability and authentication using approved methods.",
        "Compare the requested platform with available image manifests.",
        "Check whether the base-image publisher changed or removed the tag.",
      ],
      resolution: [
        "Correct a mistyped image reference.",
        "Use an approved existing image version when the requested tag is unavailable.",
        "Restore authorized registry access or address the network issue.",
        "Do not replace a trusted base image with an unverified image merely to make the build pass.",
      ],
      verification: [
        "Resolve and pull the intended base image.",
        "Run the complete build and verify the selected platform.",
      ],
      prevention: [
        "Use maintained, approved base images.",
        "Track base-image changes and registry availability.",
        "Use controlled image update automation and review.",
      ],
    },
    {
      id: "RC05",
      cause: "Dependency manifest and lockfile mismatch",
      symptoms: [
        "A deterministic package installation command fails.",
        "A dependency was changed without updating the lockfile.",
        "The failure appears after a package-manager or manifest change.",
      ],
      confirmationSteps: [
        "Inspect the package manifest and matching lockfile diff.",
        "Run the package manager's documented lockfile validation.",
        "Compare the package-manager version with the project requirement.",
      ],
      resolution: [
        "Regenerate the correct lockfile through the approved package-manager workflow.",
        "Review dependency changes and security implications.",
        "Commit the manifest and lockfile together.",
      ],
      verification: [
        "Run the deterministic install in a clean environment.",
        "Build the image again using the same commit.",
      ],
      prevention: [
        "Enforce lockfile consistency in CI.",
        "Pin supported package-manager versions.",
        "Review dependency changes before merging.",
      ],
    },
    {
      id: "RC06",
      cause: "Registry authentication or private dependency access failure",
      symptoms: [
        "A private base image or package download returns authorization errors.",
        "A developer build succeeds while a CI build fails.",
        "The failure follows a credential rotation or permissions change.",
      ],
      confirmationSteps: [
        "Identify whether the failure concerns a base image, package registry, or image push.",
        "Check the relevant service account permissions and credential availability without printing secret values.",
        "Inspect secret names, mounts, scopes, expiry, and rotation history.",
      ],
      resolution: [
        "Restore the minimum required permissions.",
        "Correct the approved CI secret binding or BuildKit secret mount.",
        "Rotate compromised credentials through the organization's secret-management process.",
      ],
      verification: [
        "Repeat the access check without exposing the credential.",
        "Run a controlled build and confirm the private dependency resolves.",
      ],
      prevention: [
        "Use short-lived credentials where supported.",
        "Separate pull and push permissions.",
        "Audit secret rotation and registry access.",
      ],
    },
    {
      id: "RC07",
      cause: "Network, DNS, TLS, proxy, or registry outage",
      symptoms: [
        "Dependency downloads time out or fail name resolution.",
        "TLS certificate validation fails.",
        "Multiple unrelated builds fail at similar times.",
      ],
      confirmationSteps: [
        "Inspect the exact hostname and error class in the failing step.",
        "Check approved DNS, proxy, certificate, and registry health diagnostics.",
        "Compare affected and unaffected runners.",
        "Correlate failures with infrastructure changes and incident timestamps.",
      ],
      resolution: [
        "Repair the affected DNS, proxy, trust configuration, or registry path.",
        "Use bounded retries only for errors known to be transient.",
        "Do not disable TLS verification as a workaround.",
      ],
      verification: [
        "Confirm stable access to the required endpoint.",
        "Run the affected dependency step and then the full build.",
      ],
      prevention: [
        "Monitor registry and network dependencies.",
        "Use approved mirrors or caching proxies where appropriate.",
        "Maintain and test certificate renewal procedures.",
      ],
    },
    {
      id: "RC08",
      cause: "Insufficient disk space or inode capacity",
      symptoms: [
        "Layer extraction, package installation, or image assembly fails.",
        "Logs report no space left on device.",
        "The issue affects multiple jobs on the same runner.",
      ],
      confirmationSteps: [
        "Inspect filesystem capacity and inode usage.",
        "Inspect Docker-managed storage usage.",
        "Identify whether workspace, cache, or Docker data storage is full.",
        "Check recent large image builds and retained artifacts.",
      ],
      resolution: [
        "Use the approved cleanup process for disposable runner data.",
        "Increase capacity or adjust retention if demand exceeds available storage.",
        "Avoid deleting shared or running containers and volumes without ownership checks.",
      ],
      verification: [
        "Confirm adequate capacity and inode availability.",
        "Repeat the failed build and observe storage consumption.",
      ],
      prevention: [
        "Monitor storage thresholds.",
        "Set cache and artifact retention policies.",
        "Schedule safe cleanup of disposable build resources.",
      ],
    },
    {
      id: "RC09",
      cause: "Architecture or target-platform mismatch",
      symptoms: [
        "The build fails with exec format errors.",
        "A base image has no matching platform manifest.",
        "Native dependencies compile on one runner but not another.",
      ],
      confirmationSteps: [
        "Inspect the builder platform and requested target platform.",
        "Check base image manifest availability.",
        "Inspect native package and compiler requirements.",
      ],
      resolution: [
        "Build for the intended platform using an appropriate builder.",
        "Use a compatible base image and toolchain.",
        "Configure emulation only when supported and acceptable for the workload.",
      ],
      verification: [
        "Inspect the resulting image manifest.",
        "Run architecture-appropriate tests.",
      ],
      prevention: [
        "Declare release platforms explicitly.",
        "Test every supported architecture in CI.",
        "Record the platform in build metadata.",
      ],
    },
    {
      id: "RC10",
      cause: "Build cache hides a dependency or reproducibility problem",
      symptoms: [
        "A cached build succeeds but a clean build fails.",
        "A failure appears after a builder change or cache eviction.",
        "A dependency step unexpectedly starts executing again.",
      ],
      confirmationSteps: [
        "Compare cached and uncached execution of the relevant stage.",
        "Inspect dependency pinning and lockfiles.",
        "Check whether the build relies on mutable external state.",
      ],
      resolution: [
        "Fix missing dependency declarations or non-reproducible build inputs.",
        "Use a controlled clean build to confirm the diagnosis.",
        "Adjust cache configuration only when evidence shows it is incorrect.",
      ],
      verification: [
        "Build on a clean approved builder.",
        "Repeat the build with normal caching and confirm consistent results.",
      ],
      prevention: [
        "Pin dependencies and base images appropriately.",
        "Avoid relying on undeclared files or mutable external resources.",
        "Monitor cache behavior and build reproducibility.",
      ],
    },
    {
      id: "RC11",
      cause: "Multi-stage build omits a required artifact",
      symptoms: [
        "An intermediate stage succeeds but the final image is incomplete.",
        "The final stage cannot find a binary or static asset.",
        "The wrong target stage is selected by CI.",
      ],
      confirmationSteps: [
        "Inspect all FROM ... AS stages.",
        "Check COPY --from references and generated artifact paths.",
        "Compare the configured --target with the intended final stage.",
      ],
      resolution: [
        "Correct the artifact path or stage dependency.",
        "Ensure the build stage runs before the artifact is copied.",
        "Keep build tools out of the runtime image when they are unnecessary.",
      ],
      verification: [
        "Build the final target.",
        "Inspect the image contents and run the expected startup check.",
      ],
      prevention: [
        "Test the final target in CI.",
        "Add artifact-existence checks.",
        "Keep stage names and responsibilities clear.",
      ],
    },
    {
      id: "RC12",
      cause: "Permissions or user mismatch during build",
      symptoms: [
        "A build script cannot write generated files.",
        "Package installation fails with permission denied.",
        "The issue appears after changing USER or COPY ownership.",
      ],
      confirmationSteps: [
        "Inspect USER and WORKDIR instructions.",
        "Inspect directory ownership and write permissions inside the relevant stage.",
        "Identify which command actually needs write access.",
      ],
      resolution: [
        "Create or assign ownership to the required application directory.",
        "Use COPY --chown when appropriate.",
        "Grant only the minimum permissions needed.",
      ],
      verification: [
        "Run the failing command as the intended build user.",
        "Verify the final image uses the intended runtime user.",
      ],
      prevention: [
        "Test builds with the intended user.",
        "Avoid blanket world-writable permissions.",
        "Separate build-time and runtime privileges.",
      ],
    },
    {
      id: "RC13",
      cause: "Build arguments or required generated artifacts are missing",
      symptoms: [
        "A build script receives an empty or unexpected configuration value.",
        "COPY cannot locate an artifact generated by a previous pipeline step.",
        "The local build uses files that CI does not generate.",
      ],
      confirmationSteps: [
        "Inspect the declared ARG values and build command.",
        "Verify whether the relevant files exist before Docker starts.",
        "Check pipeline dependencies and artifact-download steps.",
        "Do not print secrets while checking argument wiring.",
      ],
      resolution: [
        "Correct non-secret build argument wiring.",
        "Generate or download required artifacts in a documented pipeline step.",
        "Use secret mounts for sensitive values rather than embedding them in image layers.",
      ],
      verification: [
        "Confirm required inputs exist before the build.",
        "Repeat the build using the intended CI workflow.",
      ],
      prevention: [
        "Declare required inputs explicitly.",
        "Validate pipeline dependencies.",
        "Keep secrets out of image metadata and build history.",
      ],
    },
    {
      id: "RC14",
      cause: "Shared builder or CI runner failure",
      symptoms: [
        "Multiple projects fail with similar low-level errors.",
        "The Docker daemon or BuildKit worker becomes unavailable.",
        "The issue persists despite correct source and Dockerfile configuration.",
      ],
      confirmationSteps: [
        "Correlate failures across independent jobs.",
        "Inspect builder status, runner capacity, disk, memory, and platform logs.",
        "Compare with a known-good isolated builder when approved.",
      ],
      resolution: [
        "Follow the platform team's recovery procedure.",
        "Drain or replace an unhealthy runner only through the approved process.",
        "Preserve job logs and builder evidence before recycling infrastructure.",
      ],
      verification: [
        "Run a controlled test build on the recovered builder.",
        "Confirm representative pipelines recover.",
      ],
      prevention: [
        "Monitor runner and builder health.",
        "Use capacity and failure alerts.",
        "Maintain a tested runner replacement and recovery procedure.",
      ],
    },
    {
      id: "RC15",
      cause: "Dockerfile build command runs tests or compilation that fails",
      symptoms: [
        "A RUN instruction exits with a nonzero status.",
        "Compiler, unit test, lint, or packaging output identifies an application defect.",
        "The failure follows a source-code change.",
      ],
      confirmationSteps: [
        "Identify the exact RUN instruction and executable.",
        "Read the first compiler or test failure rather than only the final exit code.",
        "Reproduce the command using the same dependency versions and environment.",
      ],
      resolution: [
        "Fix the application or build configuration defect.",
        "Run the relevant test suite and compilation step.",
        "Do not disable tests merely to produce an image.",
      ],
      verification: [
        "Confirm the failing command passes.",
        "Build the complete image and run required quality gates.",
      ],
      prevention: [
        "Run fast validation before image assembly.",
        "Keep tests deterministic.",
        "Publish test results and build logs in CI.",
      ],
    },
  ] satisfies BuildFailureRootCause[],

  incidentScenarios: [
    {
      title: "Production release blocked by a dependency installation failure",
      environment: "Production release pipeline; failure occurs before image publication.",
      severity: "SEV-2",
      impact: [
        "The intended release cannot be published.",
        "The currently running production version may continue serving traffic.",
        "An urgent fix could be delayed if no approved recovery path exists.",
      ],
      timeline: [
        {
          time: "09:02",
          observation:
            "The CI pipeline starts a build for a reviewed application commit.",
          action:
            "Record the job URL, commit SHA, image tag, and start time.",
        },
        {
          time: "09:04",
          observation:
            "The dependency installation RUN instruction exits with code 1.",
          action:
            "Save the complete plain-progress build log and identify the first causal error.",
        },
        {
          time: "09:06",
          observation:
            "The log indicates a package manifest and lockfile mismatch.",
          action:
            "Inspect the manifest and lockfile diff rather than clearing the Docker cache.",
        },
        {
          time: "09:12",
          observation:
            "The reviewed source change updated a dependency but did not update the lockfile.",
          action:
            "Regenerate the lockfile with the project's package manager and review the resulting dependency changes.",
        },
        {
          time: "09:20",
          observation:
            "The controlled build succeeds with the corrected revision.",
          action:
            "Run tests, inspect image metadata, and confirm the image corresponds to the intended commit.",
        },
        {
          time: "09:28",
          observation:
            "The release image is ready for publication.",
          action:
            "Continue through the approved registry-push and deployment workflow.",
        },
      ],
      rootCause:
        "Illustrative confirmed cause: the dependency manifest changed without a matching lockfile update. The exact cause must be confirmed from the real pipeline logs and Git diff.",
      recovery: [
        "Preserve the original failed log and commit.",
        "Review the package manifest and lockfile changes.",
        "Regenerate and commit the correct lockfile.",
        "Run deterministic dependency installation and the full image build.",
        "Publish only after the expected tests and release checks pass.",
      ],
      lessonsLearned: [
        "The final exit code alone does not identify the root cause.",
        "Clearing caches would not correct an inconsistent lockfile.",
        "A failed image build does not automatically imply a production outage.",
        "Lockfile validation can prevent recurrence.",
      ],
    },
    {
      title: "Multiple services fail to pull a shared base image",
      environment: "Shared CI runners across multiple repositories.",
      severity: "SEV-2",
      impact: [
        "Several unrelated releases are blocked.",
        "The current production workloads may remain healthy.",
        "A common registry or network dependency may be unavailable.",
      ],
      timeline: [
        {
          time: "14:10",
          observation:
            "One service reports a base image pull timeout.",
          action:
            "Record the image reference and error type.",
        },
        {
          time: "14:13",
          observation:
            "Other independent repositories show similar pull failures.",
          action:
            "Compare timestamps and affected registries.",
        },
        {
          time: "14:17",
          observation:
            "Application-specific Dockerfile changes do not explain the correlated failures.",
          action:
            "Check approved registry, DNS, proxy, and platform health information.",
        },
        {
          time: "14:25",
          observation:
            "The platform team identifies a registry connectivity incident.",
          action:
            "Follow the shared infrastructure incident process and preserve evidence.",
        },
        {
          time: "14:42",
          observation:
            "Registry access recovers.",
          action:
            "Run controlled builds and verify that the affected repositories recover.",
        },
      ],
      rootCause:
        "Illustrative scenario: a shared registry connectivity problem affects unrelated builds. Confirm with infrastructure evidence before declaring this root cause.",
      recovery: [
        "Escalate to the registry or network owner.",
        "Avoid unnecessary application Dockerfile changes.",
        "Use only approved mirrors or fallback registries.",
        "Retry affected builds after the dependency is confirmed healthy.",
      ],
      lessonsLearned: [
        "Correlated failures across unrelated repositories are evidence of a possible shared dependency issue.",
        "Blind retries can increase pressure on an unhealthy registry.",
        "Infrastructure health and application configuration should be investigated separately.",
      ],
    },
    {
      title: "Docker build succeeds locally but fails in CI",
      environment: "Developer workstation and Linux CI runner.",
      severity: "SEV-3",
      impact: [
        "The release pipeline is blocked.",
        "The developer may not be able to reproduce the issue locally.",
        "Repeated commits without evidence can delay recovery.",
      ],
      timeline: [
        {
          time: "10:00",
          observation:
            "The local build succeeds.",
          action:
            "Record the exact local build command and commit SHA.",
        },
        {
          time: "10:05",
          observation:
            "The CI build fails on a COPY instruction.",
          action:
            "Compare the CI context path and .dockerignore with the local environment.",
        },
        {
          time: "10:11",
          observation:
            "The required file is outside the context selected by CI.",
          action:
            "Verify the intended repository layout and approved context.",
        },
        {
          time: "10:18",
          observation:
            "The build command is corrected.",
          action:
            "Run the exact CI build and verify the resulting image.",
        },
      ],
      rootCause:
        "Illustrative confirmed cause: local and CI builds used different build contexts.",
      recovery: [
        "Compare build commands and working directories.",
        "Correct the context or file layout.",
        "Rebuild using the same CI command and target platform.",
      ],
      lessonsLearned: [
        "A successful local build does not prove the CI build is equivalent.",
        "The Docker build context is part of the build input.",
      ],
    },
  ] satisfies BuildFailureScenario[],

  decisionTree: [
    {
      symptom: "Docker daemon cannot be reached",
      evidence: "docker version or docker info reports a daemon connection error.",
      likelyCause: "Wrong context, unavailable daemon, or runner access problem.",
      nextAction:
        "Verify the Docker context and runner/daemon health before inspecting the Dockerfile.",
    },
    {
      symptom: "Dockerfile cannot be parsed",
      evidence: "The build reports a syntax or instruction error before executing the expected stage.",
      likelyCause: "Invalid syntax, unsupported feature, or malformed instruction.",
      nextAction:
        "Inspect the reported line, builder version, and recent Dockerfile changes.",
    },
    {
      symptom: "COPY or ADD fails",
      evidence: "The required source path is missing from the build context.",
      likelyCause: "Wrong context, incorrect path/case, or .dockerignore exclusion.",
      nextAction:
        "Compare the context, file layout, ignore rules, and CI command.",
    },
    {
      symptom: "FROM image pull fails",
      evidence: "Manifest, authorization, timeout, or TLS errors appear during base-image resolution.",
      likelyCause: "Invalid reference, registry permissions, platform mismatch, or network failure.",
      nextAction:
        "Validate the image reference, registry access, and target platform.",
    },
    {
      symptom: "RUN dependency installation fails",
      evidence: "Package manager reports a missing package, lockfile mismatch, authorization error, or network timeout.",
      likelyCause: "Dependency configuration, registry access, or external service failure.",
      nextAction:
        "Use the package manager's error details to distinguish configuration from connectivity.",
    },
    {
      symptom: "Build fails with no space left on device",
      evidence: "Filesystem or inode capacity is exhausted.",
      likelyCause: "Runner workspace or Docker storage capacity.",
      nextAction:
        "Identify the affected filesystem and follow safe cleanup or capacity-expansion procedures.",
    },
    {
      symptom: "Multiple unrelated builds fail",
      evidence: "Similar errors occur across independent repositories and jobs.",
      likelyCause: "Shared registry, network, runner, or builder issue.",
      nextAction:
        "Correlate timestamps and escalate to the shared platform owner.",
    },
    {
      symptom: "Build succeeds but image push fails",
      evidence: "Image creation completes; registry push reports authentication, permission, or network errors.",
      likelyCause: "Publishing-stage issue rather than Dockerfile execution.",
      nextAction:
        "Inspect push permissions, registry policy, image destination, and network.",
    },
    {
      symptom: "Build succeeds but deployment fails",
      evidence: "The image exists, but the deployment cannot pull or start it.",
      likelyCause: "Wrong image reference, runtime configuration, architecture, permissions, or health-check failure.",
      nextAction:
        "Verify the image digest and investigate the deployment/runtime layer separately.",
    },
  ],

  safeRecoveryProcedure: {
    principles: [
      "Preserve logs and the failed commit before making changes.",
      "Confirm the affected environment and whether any downstream release steps already ran.",
      "Use the smallest fix supported by evidence.",
      "Review the diff and run the required tests before building again.",
      "Do not bypass security scanning, required tests, or production approval.",
      "Do not expose credentials in build logs, shell history, image layers, or incident reports.",
      "Do not assume that deleting caches will fix an application or dependency defect.",
    ],

    workflow: [
      {
        step: 1,
        action: "Preserve evidence",
        verification:
          "The incident record contains the failed build log, commit SHA, command, builder, and first causal error.",
      },
      {
        step: 2,
        action: "Apply a targeted correction",
        verification:
          "The code/configuration diff addresses the confirmed root cause without unrelated changes.",
      },
      {
        step: 3,
        action: "Validate inputs",
        verification:
          "The correct Dockerfile, context, lockfiles, build arguments, target, and platform are selected.",
      },
      {
        step: 4,
        action: "Run a controlled build",
        verification:
          "The intended stage completes using the expected commit and builder configuration.",
      },
      {
        step: 5,
        action: "Verify the artifact",
        verification:
          "Image metadata, architecture, expected files, and test results match the release requirements.",
      },
      {
        step: 6,
        action: "Publish under the approved workflow",
        verification:
          "The registry tag and digest correspond to the intended build and are recorded in the release system.",
      },
      {
        step: 7,
        action: "Verify downstream deployment",
        verification:
          "If deployment is in scope, confirm the intended digest is deployed and the application passes health checks.",
      },
      {
        step: 8,
        action: "Document and prevent recurrence",
        verification:
          "The incident report records the cause, evidence, resolution, and owner for preventive actions.",
      },
    ],

    highRiskOperations: [
      {
        operation: "docker system prune -a --volumes",
        risk:
          "High. It can remove unused images, build cache, networks, and volumes. Data or shared build resources may be lost.",
        saferApproach:
          "Inspect docker system df first. Identify resource ownership and use the approved targeted cleanup procedure.",
      },
      {
        operation: "docker builder prune --all",
        risk:
          "Moderate to high depending on the builder. It can remove reusable build cache and increase subsequent build time, network use, and registry load.",
        saferApproach:
          "Inspect builder usage and use targeted cache management only when evidence supports it.",
      },
      {
        operation: "docker push",
        risk:
          "Moderate to high. It publishes an artifact to a registry and may overwrite a mutable tag depending on registry policy.",
        saferApproach:
          "Verify the registry, repository, tag, image identity, credentials, approval, and release policy before publishing.",
      },
      {
        operation: "Restarting or replacing a shared builder",
        risk:
          "High when other pipelines depend on the builder. Active jobs may fail or lose state.",
        saferApproach:
          "Use the platform team's maintenance or recovery procedure and check active workloads first.",
      },
    ],
  },

  prevention: {
    sourceControl: [
      "Review Dockerfile and .dockerignore changes together.",
      "Commit the correct dependency lockfile with dependency-manifest changes.",
      "Use reviewed commits and record source revisions in image metadata.",
      "Keep secrets, credentials, and local configuration out of the build context.",
    ],

    buildReliability: [
      "Use deterministic dependency installation and pinned tool versions where appropriate.",
      "Define the build context, Dockerfile path, target, and target platform explicitly.",
      "Use BuildKit and cache configuration consistently across CI jobs.",
      "Test the final image target rather than only an intermediate build stage.",
      "Use bounded retries for genuinely transient failures; do not hide deterministic errors with retries.",
      "Validate the image on a clean builder periodically to detect hidden cache dependencies.",
    ],

    security: [
      "Use trusted base images and a documented update process.",
      "Use BuildKit secret mounts or the approved secret-management mechanism for private dependencies.",
      "Avoid embedding credentials in ARG values, ENV instructions, copied files, or image layers.",
      "Scan dependencies and images according to the organization's policy.",
      "Use least-privilege registry credentials and separate pull and push permissions.",
      "Generate software bills of materials and provenance when required by the release process.",
    ],

    observability: [
      "Capture complete build logs and the first failing instruction.",
      "Monitor build success rate, duration, queue time, and failure categories.",
      "Alert on correlated failures across repositories.",
      "Monitor registry reachability, runner capacity, disk usage, and builder health.",
      "Track flaky external dependencies and recurring failure signatures.",
    ],

    releaseManagement: [
      "Use immutable image digests for production deployment when supported.",
      "Record image tag, digest, source commit, target platform, and build job in the release record.",
      "Require approval for production publication or deployment where policy requires it.",
      "Maintain a known-good artifact and documented rollback procedure.",
      "Verify the deployed digest instead of relying only on a mutable tag.",
    ],
  },

  commonMistakes: [
    {
      mistake: "Reading only the final ERROR line",
      whyItFails:
        "The final line often contains only a wrapper error or exit code, not the underlying cause.",
      betterApproach:
        "Inspect the first causal error and the surrounding output from the failing instruction.",
    },
    {
      mistake: "Running a no-cache build immediately",
      whyItFails:
        "It can make the build slower, increase network traffic, and obscure whether the failure is deterministic.",
      betterApproach:
        "Use cache comparison only when the evidence suggests cache-related behavior.",
    },
    {
      mistake: "Changing the Dockerfile before checking the build context",
      whyItFails:
        "The Dockerfile may be correct while CI invokes it from the wrong directory.",
      betterApproach:
        "Compare the exact build command, context, and available files first.",
    },
    {
      mistake: "Disabling TLS verification to fix a registry error",
      whyItFails:
        "It weakens security and can expose the build to interception or untrusted artifacts.",
      betterApproach:
        "Correct the certificate trust, proxy, or endpoint configuration through the approved process.",
    },
    {
      mistake: "Using latest tags for all dependencies",
      whyItFails:
        "Mutable references can introduce unexpected dependency changes and reduce reproducibility.",
      betterApproach:
        "Use controlled versions or immutable digests where appropriate.",
    },
    {
      mistake: "Making every directory world-writable",
      whyItFails:
        "It can introduce security risks without addressing the actual ownership problem.",
      betterApproach:
        "Correct ownership and grant the minimum required permissions.",
    },
    {
      mistake: "Printing environment variables to debug credentials",
      whyItFails:
        "It may expose tokens and passwords in persistent CI logs.",
      betterApproach:
        "Validate secret availability and authorization without printing secret values.",
    },
    {
      mistake: "Assuming build success means release success",
      whyItFails:
        "Image publishing, image pulling, deployment, startup, and application health are separate stages.",
      betterApproach:
        "Verify each downstream stage and the final deployed image identity.",
    },
    {
      mistake: "Deleting all Docker resources on a shared runner",
      whyItFails:
        "It can remove needed resources or affect other jobs and cause additional failures.",
      betterApproach:
        "Inspect usage, ownership, and active jobs before targeted cleanup.",
    },
  ],

  incidentReportTemplate: {
    incidentId: "<incident-id>",
    startTime: "<UTC timestamp>",
    detectionSource: "<CI alert / engineer / release monitor>",
    affectedRepository: "<repository>",
    affectedCommit: "<commit-sha>",
    affectedImage: "<image:tag and digest if available>",
    affectedEnvironment: "<development / staging / production>",
    customerImpact: "<actual observed impact>",
    severity: "<SEV-1 / SEV-2 / SEV-3 / SEV-4>",
    firstFailingInstruction: "<Dockerfile stage and instruction>",
    observedError: "<redacted error message>",
    confirmedRootCause: "<evidence-supported explanation>",
    contributingFactors: ["<factor>"],
    recoveryActions: ["<action and timestamp>"],
    verificationEvidence: ["<successful build/test/push/deployment evidence>"],
    rollbackDecision: "<not required / performed / pending approval>",
    preventionActions: [
      {
        action: "<preventive task>",
        owner: "<team or role>",
        dueDate: "<date>",
        status: "<open / in progress / complete>",
      },
    ],
    lessonsLearned: ["<lesson>"],
  },

  productionRunbook: [
    {
      phase: "Detection",
      checklist: [
        "Identify the failed job and first causal error.",
        "Record the repository, commit, image tag, and timestamp.",
        "Check whether the failure is isolated or shared.",
      ],
    },
    {
      phase: "Acknowledgement and impact",
      checklist: [
        "Determine which release or service is affected.",
        "Check whether a production deployment or emergency patch is blocked.",
        "Assign the incident owner and severity.",
      ],
    },
    {
      phase: "Safety",
      checklist: [
        "Confirm the correct repository, Docker context, builder, and environment.",
        "Check change approval before publication or deployment.",
        "Protect secrets and preserve logs.",
      ],
    },
    {
      phase: "Investigation",
      checklist: [
        "Capture the full plain-progress build log.",
        "Identify the first failing instruction.",
        "Inspect context, Dockerfile, dependencies, registry, platform, and storage as indicated by evidence.",
        "Record confirmed facts separately from hypotheses.",
      ],
    },
    {
      phase: "Mitigation and recovery",
      checklist: [
        "Apply the smallest evidence-based correction.",
        "Review the change and run the required tests.",
        "Rebuild using the intended commit and platform.",
        "Publish only through the approved release process.",
      ],
    },
    {
      phase: "Verification",
      checklist: [
        "Confirm the build succeeds.",
        "Verify the image tag, digest, metadata, and expected contents.",
        "Confirm registry publication.",
        "If deployment was affected, verify the deployed image and application health.",
      ],
    },
    {
      phase: "Closure",
      checklist: [
        "Document the root cause and supporting evidence.",
        "Record the recovery and any rollback decision.",
        "Assign preventive actions with owners and due dates.",
        "Update the runbook when a new failure pattern is discovered.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is the difference between a Docker build failure and a container runtime failure?",
      answer:
        "A build failure occurs while creating the image. A runtime failure occurs after a container is started from an image. The failing stage, logs, and diagnostic commands differ, so first identify whether an image was successfully produced.",
      followUp:
        "If the build succeeds but the container exits, inspect its startup command, configuration, logs, and runtime dependencies.",
    },
    {
      question: "Why can COPY fail when a file exists in the repository?",
      answer:
        "The file may be outside the build context, excluded by .dockerignore, incorrectly cased, absent from the CI checkout, or generated only after the build step.",
    },
    {
      question: "How do you troubleshoot a Docker build that succeeds locally but fails in CI?",
      answer:
        "Compare the commit, working directory, build command, context, Dockerfile, builder and platform, dependency versions, credentials, network, and cache. Reproduce the exact CI command before changing the application.",
    },
    {
      question: "What does a nonzero exit code from RUN mean?",
      answer:
        "A command inside that build stage failed. The exit code does not by itself identify the cause. Inspect the command output and the earliest meaningful error.",
    },
    {
      question: "When should you use a no-cache build?",
      answer:
        "Use it when a controlled comparison is needed to investigate cache-related behavior or hidden build dependencies. It should not be the default response to every failure.",
    },
    {
      question: "How do you investigate a base image pull failure?",
      answer:
        "Check the exact image reference, registry availability, authentication, rate limits, DNS/TLS/network errors, and target-platform manifests.",
    },
    {
      question: "How do you debug a build that fails with no space left on device?",
      answer:
        "Check filesystem and inode usage, Docker storage usage, and the affected runner or builder. Identify safe-to-remove resources and follow the approved cleanup procedure.",
    },
    {
      question: "Why is embedding secrets in Dockerfile ARG or ENV unsafe?",
      answer:
        "Build arguments and environment settings can be exposed through image metadata, build records, or layers depending on how they are used. Use an approved secret mount or secret-management mechanism instead.",
    },
    {
      question: "What should you verify before pushing a production image?",
      answer:
        "Verify the intended repository, tag, source commit, test and scan results, target platform, approval, and image identity. Record the digest so the release can be traced to the exact artifact.",
    },
    {
      question: "What do you do if several repositories fail at the same time?",
      answer:
        "Compare timestamps and error signatures. Investigate shared registries, DNS, proxies, builder health, runner capacity, and storage before making application-specific changes.",
    },
    {
      question: "Why can a Docker build succeed but the deployment fail?",
      answer:
        "The image may not have been pushed, the deployed reference may be wrong, the cluster may lack registry access, the architecture may be incompatible, or the application may fail during startup.",
    },
    {
      question: "How do you decide whether to retry a failed build?",
      answer:
        "Retry when evidence supports a transient issue and the retry is bounded. Fix deterministic syntax, source, dependency, or configuration errors instead of repeatedly rerunning the same build.",
    },
  ] satisfies BuildFailureInterviewQuestion[],

  handsOnExercises: [
    {
      title: "Exercise 1: Missing file during COPY",
      symptoms: [
        "The Docker build fails at COPY package.json ./.",
        "The package manifest exists in the repository.",
      ],
      task: [
        "Inspect the build context.",
        "Inspect .dockerignore.",
        "Compare the Dockerfile path with the context directory.",
      ],
      expectedFindings: [
        "The file may be excluded or outside the selected context.",
        "The current working directory may differ between local and CI builds.",
      ],
      solution: [
        "Correct the context or narrow the ignore rule.",
        "Repeat the exact CI build command.",
        "Verify that required inputs are present in the appropriate build stage.",
      ],
    },
    {
      title: "Exercise 2: npm ci fails in CI",
      symptoms: [
        "The Docker build fails during RUN npm ci.",
        "The error indicates that package.json and package-lock.json are not synchronized.",
      ],
      task: [
        "Inspect the manifest and lockfile diff.",
        "Check the package-manager version.",
        "Determine whether the failure is configuration-related or caused by registry access.",
      ],
      expectedFindings: [
        "The lockfile may not include the latest dependency change.",
        "A deterministic install is correctly detecting an inconsistent dependency definition.",
      ],
      solution: [
        "Regenerate the lockfile using the project's intended package-manager version.",
        "Review and commit the matching manifest and lockfile changes.",
        "Run a clean dependency installation and rebuild.",
      ],
    },
    {
      title: "Exercise 3: Base image pull fails",
      symptoms: [
        "Several builds fail while resolving a base image.",
        "The log reports a registry timeout.",
      ],
      task: [
        "Identify the exact registry and image reference.",
        "Compare failures across unrelated jobs.",
        "Inspect registry and network health.",
      ],
      expectedFindings: [
        "A shared network or registry problem may explain correlated failures.",
        "An isolated invalid image reference would affect only builds using that reference.",
      ],
      solution: [
        "Escalate shared infrastructure failures to the responsible owner.",
        "Retry only after service recovery is confirmed.",
        "Verify that the intended base image is used.",
      ],
    },
    {
      title: "Exercise 4: Build works locally but fails on Linux",
      symptoms: [
        "A file-copy step works on a developer workstation.",
        "The Linux CI runner reports that the file cannot be found.",
      ],
      task: [
        "Check exact path capitalization.",
        "Inspect the CI context and checkout.",
        "Compare the local and CI build commands.",
      ],
      expectedFindings: [
        "Case sensitivity or a different build context may explain the discrepancy.",
      ],
      solution: [
        "Correct the path or context.",
        "Test on a Linux-compatible builder.",
        "Keep the build inputs consistent across environments.",
      ],
    },
    {
      title: "Exercise 5: Disk capacity exhausted",
      symptoms: [
        "A build fails during layer extraction.",
        "The runner reports no space left on device.",
      ],
      task: [
        "Inspect filesystem capacity and inode usage.",
        "Inspect Docker storage usage.",
        "Identify active jobs and resource ownership.",
      ],
      expectedFindings: [
        "The workspace or Docker storage may have exhausted available capacity.",
      ],
      solution: [
        "Perform approved, targeted cleanup or expand capacity.",
        "Repeat the build.",
        "Add monitoring and retention policies to prevent recurrence.",
      ],
    },
  ] satisfies BuildFailureExercise[],

  finalVerificationChecklist: [
    "The exact failing instruction and root cause have been identified.",
    "The root cause is supported by logs or reproducible evidence.",
    "The source or configuration fix is reviewed.",
    "The build succeeds using the intended commit and builder.",
    "The intended target stage and platform are verified.",
    "Required tests and security checks pass.",
    "No secret was exposed in logs, image layers, or metadata.",
    "The image tag and digest are recorded.",
    "Registry publication is confirmed if required.",
    "Deployment health is confirmed if deployment was part of the incident.",
    "The incident report and prevention actions are recorded.",
  ],
} satisfies {
  id: string;
  title: string;
  tool: string;
  category: string;
  difficulty: string;
  summary: string;
  objectives: string[];
  environmentPlaceholders: Record<string, string>;
  overview: {
    definition: string;
    lifecycle: Array<{
      step: number;
      name: string;
      explanation: string;
    }>;
    criticalDistinctions: Array<{
      symptom: string;
      meaning: string;
      direction: string;
    }>;
  };
  severityAssessment: Array<{
    level: "SEV-1" | "SEV-2" | "SEV-3" | "SEV-4";
    criteria: string;
    actions: string[];
  }>;
  incidentResponseWorkflow: Array<{
    step: number;
    title: string;
    actions: string[];
    decision: string;
  }>;
  diagnostics: BuildFailureDiagnostic[];
  rootCauses: BuildFailureRootCause[];
  incidentScenarios: BuildFailureScenario[];
  decisionTree: Array<{
    symptom: string;
    evidence: string;
    likelyCause: string;
    nextAction: string;
  }>;
  safeRecoveryProcedure: {
    principles: string[];
    workflow: Array<{
      step: number;
      action: string;
      verification: string;
    }>;
    highRiskOperations: Array<{
      operation: string;
      risk: string;
      saferApproach: string;
    }>;
  };
  prevention: {
    sourceControl: string[];
    buildReliability: string[];
    security: string[];
    observability: string[];
    releaseManagement: string[];
  };
  commonMistakes: Array<{
    mistake: string;
    whyItFails: string;
    betterApproach: string;
  }>;
  incidentReportTemplate: {
    incidentId: string;
    startTime: string;
    detectionSource: string;
    affectedRepository: string;
    affectedCommit: string;
    affectedImage: string;
    affectedEnvironment: string;
    customerImpact: string;
    severity: string;
    firstFailingInstruction: string;
    observedError: string;
    confirmedRootCause: string;
    contributingFactors: string[];
    recoveryActions: string[];
    verificationEvidence: string[];
    rollbackDecision: string;
    preventionActions: Array<{
      action: string;
      owner: string;
      dueDate: string;
      status: string;
    }>;
    lessonsLearned: string[];
  };
  productionRunbook: Array<{
    phase: string;
    checklist: string[];
  }>;
  interviewQuestions: BuildFailureInterviewQuestion[];
  handsOnExercises: BuildFailureExercise[];
  finalVerificationChecklist: string[];
};

export default buildFailuresGuide;
