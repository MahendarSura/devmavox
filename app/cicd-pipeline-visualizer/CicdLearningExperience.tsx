"use client";

import React, { useEffect, useMemo, useState } from "react";

type Topic = { title: string; input: string; process: string; output: string; detail: string };
type Stage = { id: number; name: string; tool: string; topics: Topic[] };

const sections = [
  "Definition", "Purpose", "Architecture", "Production Workflow",
  "Real-time Example", "Commands", "Configuration", "Failures",
  "Troubleshooting", "Best Practices", "Hands-on Exercise"
];

const stages: Stage[] = [
  { id: 1, name: "Developer Code", tool: "Java / Spring Boot", topics: [
    { title: "Java Project Structure", input: "Payment service requirements", process: "Organize source, packages, resources and tests", output: "Maintainable Java project", detail: "Explore src/main/java, src/main/resources and src/test/java. Understand how package names, application configuration and test classes are organized in a Spring Boot project." },
    { title: "Spring Boot Application", input: "Java source files and dependencies", process: "Start the Spring application context and embedded server", output: "Running payment-service application", detail: "Learn the main application class, dependency injection, controllers, services and repositories. Follow a payment request from an HTTP endpoint through business logic to its response." },
    { title: "Dependencies & Git Commit", input: "Application code and dependency list", process: "Resolve libraries, review changes and commit source", output: "Version-controlled source commit", detail: "Understand Maven dependencies, transitive libraries, dependency versions, Git staging and commit history. Keep secrets and generated build output out of source control." }
  ]},
  { id: 2, name: "Pull Request & Merge", tool: "GitHub", topics: [
    { title: "Branching Strategy", input: "Main branch and assigned development work", process: "Create and update an isolated feature branch", output: "Reviewable feature branch", detail: "Compare feature branches, short-lived branches and release branches. Keep changes focused, synchronize with the target branch and use meaningful commit messages." },
    { title: "PR Review & Approval", input: "Feature branch and proposed changes", process: "Review diff, run required checks and approve", output: "Approved pull request", detail: "Learn reviewers, required status checks, protected branches, review comments and approval rules. Merge only after required checks and team policies pass." },
    { title: "Merge Conflicts & Webhooks", input: "Pull request and repository events", process: "Resolve conflicting changes and deliver webhook events", output: "Merged commit and repository event", detail: "Understand conflict markers, base and incoming changes, webhook payloads, delivery attempts and signature validation. A webhook notifies Jenkins; it does not itself build the application." }
  ]},
  { id: 3, name: "Pipeline Trigger", tool: "Jenkins", topics: [
    { title: "Jenkins Architecture & Agents", input: "Pipeline request and available build capacity", process: "Controller schedules work on an eligible agent", output: "Allocated pipeline workspace", detail: "Distinguish Jenkins controller responsibilities from agent execution. Review executors, labels, workspaces, tool installations, network access and least-privilege agent permissions." },
    { title: "Webhook Integration", input: "GitHub push or pull request event", process: "Validate event and trigger the configured job", output: "Jenkins build execution", detail: "Trace a GitHub webhook from repository settings to Jenkins endpoint, job trigger and checkout. Diagnose delivery failures, incorrect credentials and branch filters." },
    { title: "Jenkinsfile & Pipeline Execution", input: "Repository source and Jenkinsfile", process: "Evaluate stages, steps, conditions and post actions", output: "Recorded pipeline result and logs", detail: "Read declarative pipeline syntax, agent selection, environment variables, credentials binding, stage conditions and post actions. Failed tests should block downstream release stages." }
  ]},
  { id: 4, name: "Maven Build", tool: "Apache Maven", topics: [
    { title: "POM & Dependencies", input: "pom.xml and Java source", process: "Resolve project metadata, plugins and libraries", output: "Resolved build dependency graph", detail: "Understand groupId, artifactId, version, repositories, dependency scopes and plugin configuration. Pin versions and review dependency sources for reproducible builds." },
    { title: "Maven Lifecycle & Plugins", input: "Project model and build command", process: "Run lifecycle phases such as validate, compile and test", output: "Compiled and verified project", detail: "Learn lifecycle ordering and the difference between phases and plugin goals. mvn clean verify runs the configured lifecycle through verification, including tests." },
    { title: "JAR Packaging & Build Artifacts", input: "Compiled classes and resources", process: "Package application and verify generated artifact", output: "target/payment-service.jar", detail: "Understand executable Spring Boot JAR packaging, artifact naming, checksums and retention. Publish the exact tested artifact rather than rebuilding different bytes later." }
  ]},
  { id: 5, name: "Automated Tests", tool: "JUnit / Integration Tests", topics: [
    { title: "JUnit Unit Testing", input: "Application classes and test cases", process: "Execute isolated tests against individual units", output: "Unit test results", detail: "Learn test methods, assertions, setup, teardown and mocking. Unit tests should be fast and deterministic so developers can identify regressions early." },
    { title: "Integration Testing", input: "Application components and test dependencies", process: "Verify interactions across component boundaries", output: "Integration test results", detail: "Test database, HTTP and messaging interactions using controlled test infrastructure. Separate test configuration from production credentials and external services." },
    { title: "Test Reports & Coverage", input: "Test execution results", process: "Generate reports and evaluate coverage", output: "Reports and quality evidence", detail: "Read Maven Surefire and Failsafe reports, distinguish tests run from coverage, and investigate skipped or flaky tests. Coverage is useful evidence, not proof of correctness." }
  ]},
  { id: 6, name: "Quality Gate", tool: "SonarQube", topics: [
    { title: "SonarQube Architecture & Scanner", input: "Source code, build metadata and scanner settings", process: "Analyze code and publish analysis results", output: "SonarQube analysis", detail: "Understand scanner, server, project key, analysis task and quality profile. Configure analysis after compilation where required by the language analyzer." },
    { title: "Bugs, Vulnerabilities & Code Smells", input: "Static analysis findings", process: "Classify reliability, security and maintainability issues", output: "Prioritized code findings", detail: "Distinguish a bug from a vulnerability and a code smell. Review issue severity, affected lines, remediation guidance and false-positive handling." },
    { title: "Quality Gate & Coverage Conditions", input: "Analysis measures and configured thresholds", process: "Evaluate quality gate conditions", output: "Passed or failed quality gate", detail: "Learn quality gates, new-code conditions, coverage thresholds and pipeline enforcement. A failed required quality gate should prevent promotion to release stages." }
  ]},
  { id: 7, name: "Security Scanning", tool: "Trivy", topics: [
    { title: "Trivy Architecture & Configuration", input: "Repository, filesystem or container image", process: "Select scanners and vulnerability databases", output: "Security scan findings", detail: "Understand Trivy targets, vulnerability database updates, severity filters, ignore policies and exit codes. Keep scan configuration version-controlled and review exceptions." },
    { title: "Dependency & Image Vulnerability Scanning", input: "Dependency manifests and built image", process: "Identify vulnerable packages and operating-system libraries", output: "Dependency and image scan reports", detail: "Scan source dependencies before image creation and scan the final image after Docker build. These checks cover different attack surfaces and should both be considered." },
    { title: "CVE Analysis & Remediation", input: "CVE identifiers, package versions and severity", process: "Assess exploitability, reachability and available fixes", output: "Remediation decision and verified scan", detail: "Understand CVE identifiers, fixed versions, severity and exceptions. Upgrade affected dependencies or base images, rebuild, rescan and retain the evidence." }
  ]},
  { id: 8, name: "Docker Build", tool: "Docker / BuildKit", topics: [
    { title: "Dockerfile & Image Layers", input: "Tested payment-service.jar and Dockerfile", process: "Execute Dockerfile instructions and create image layers", output: "Versioned container image", detail: "A Dockerfile describes how to assemble an image. COPY adds the tested JAR, EXPOSE documents the application port, and ENTRYPOINT defines the process started by the container." },
    { title: "BuildKit & Build Cache", input: "Docker build context and Dockerfile", process: "Solve build steps and reuse valid cached results", output: "Efficient image build", detail: "BuildKit is Docker's build engine. Cache reuse depends on build inputs and instruction dependencies. Use cache mounts for package managers where appropriate and avoid putting secrets in build arguments." },
    { title: "Multi-stage Builds & Image Optimization", input: "Build tools, source and application artifact", process: "Build in one stage and copy runtime output into a smaller stage", output: "Smaller production image", detail: "Use a build stage for compilation and a runtime stage containing only required files. Select trusted base images, run as a non-root user and keep image contents minimal." }
  ]},
  { id: 9, name: "Push to Registry", tool: "Amazon ECR", topics: [
    { title: "ECR Repository & Authentication", input: "Built image and AWS identity", process: "Authenticate Docker to the target ECR registry", output: "Authorized registry session", detail: "Understand ECR repositories, registry endpoints, IAM permissions and short-lived authorization tokens. Prefer workload roles over long-lived access keys." },
    { title: "Image Tagging & Push", input: "Verified local image", process: "Tag image and push layers to ECR", output: "Published registry image", detail: "Use traceable release tags, but deploy by immutable digest. Verify account, region, repository and tag before pushing. A successful push does not prove the image is safe." },
    { title: "Image Digest & Lifecycle Policies", input: "Published image manifest", process: "Record digest and apply retention policy", output: "Immutable image reference", detail: "An image digest identifies exact image content. Promote the same digest between environments and configure lifecycle policies carefully so active release artifacts are not deleted." }
  ]},
  { id: 10, name: "Kubernetes Deployment", tool: "Kubernetes / EKS", topics: [
    { title: "EKS Cluster & Kubernetes Resources", input: "Image digest and Kubernetes manifests", process: "Submit desired resources to the Kubernetes API", output: "Declared application resources", detail: "Understand EKS control plane, worker capacity, namespaces, API server, Deployment, Service and ConfigMap. Kubernetes controllers continuously work toward declared desired state." },
    { title: "Deployments, Pods & Services", input: "Deployment specification and container image", process: "Schedule Pods and expose them through a Service", output: "Running application workload", detail: "A Deployment manages ReplicaSets and Pods. A Service provides stable network discovery for changing Pod addresses. Readiness and resource settings affect safe traffic handling." },
    { title: "Probes, Rollouts & Deployment Validation", input: "Updated Deployment and application health endpoints", process: "Check startup, readiness and liveness; monitor rollout", output: "Validated rollout or detected failure", detail: "Startup probes protect slow initialization, readiness controls traffic eligibility, and liveness detects stuck processes. Validate rollout status, events and application health." }
  ]},
  { id: 11, name: "Release Management", tool: "Helm / Argo CD", topics: [
    { title: "Helm Charts & Values", input: "Kubernetes templates and environment values", process: "Render and manage parameterized release manifests", output: "Rendered Kubernetes resources", detail: "A Helm chart packages Kubernetes templates. values.yaml supplies configurable values such as image digest, replica count and resource limits for each environment." },
    { title: "Argo CD GitOps & Sync", input: "Git desired state and live cluster state", process: "Compare differences and reconcile resources", output: "Synchronized application state", detail: "Argo CD observes Git and compares desired configuration with the cluster. Helm can render chart templates while Argo CD manages synchronization and drift reconciliation." },
    { title: "Release Rollback & Recovery", input: "Failed rollout and known-good release revision", process: "Assess health and restore a verified version", output: "Recovered release", detail: "Choose rollback based on application and data compatibility. Reverting manifests does not automatically reverse database migrations or external side effects; verify service health after recovery." }
  ]},
  { id: 12, name: "Production Monitoring", tool: "Prometheus / Grafana", topics: [
    { title: "Prometheus & Exporters", input: "Application and infrastructure metrics endpoints", process: "Scrape and store time-series measurements", output: "Queryable metrics", detail: "Prometheus scrapes configured targets and stores timestamped samples. Exporters expose metrics for systems that do not provide Prometheus-format metrics directly." },
    { title: "PromQL & Grafana Dashboards", input: "Prometheus time-series data", process: "Query, aggregate and visualize measurements", output: "Operational dashboards", detail: "Use PromQL to calculate rates, error ratios and latency distributions. Grafana dashboards turn those queries into panels that help engineers understand service behavior." },
    { title: "Alerting & Incident Response", input: "Service-level signals and alert rules", process: "Evaluate thresholds and route actionable alerts", output: "Incident notification and response", detail: "Define alerts around user impact, investigate dashboards and logs, identify root cause, mitigate safely and verify recovery. Use SLI, SLO and error-budget concepts to guide priorities." }
  ]}
];

const beginner = [
  ["What is an Application?", "An application is software that performs a task for a user. Payment Service is an application that accepts and processes payment requests."],
  ["What is Software Development?", "Software development is the process of planning, writing, testing and maintaining programs that solve a problem."],
  ["What is a Developer?", "A developer is a person who designs, writes, tests and improves software code."],
  ["What happens after code is written?", "Code is reviewed, built, tested, checked for quality and security, packaged and prepared for deployment."],
  ["What is a Server?", "A server is a computer or process that receives requests and provides services or responses to clients."],
  ["What is Cloud Computing?", "Cloud computing provides computing, storage and networking resources through managed services over a network."],
  ["What is DevOps?", "DevOps is a set of practices that improves collaboration and automation between software development and operations."],
  ["What is CI?", "Continuous Integration means frequently integrating code changes and automatically building and testing them."],
  ["What is CD?", "Continuous Delivery keeps software ready for release; Continuous Deployment automatically releases qualifying changes to production."],
  ["What is a CI/CD Pipeline?", "A CI/CD pipeline is an automated workflow that validates source changes and delivers software through controlled stages."],
  ["Why do companies use CI/CD?", "Companies use CI/CD to find defects earlier, reduce manual work, improve repeatability and deliver changes more safely."],
  ["What are the 12 stages?", "This visualizer follows code, pull request, Jenkins, Maven, tests, quality, security, Docker, ECR, Kubernetes, release management and monitoring."]
] as const;

const nav = [
  "Start Here", "Pipeline Overview", "Learn the 12 Stages",
  "Interactive Pipeline Simulator", "Hands-on Practice Lab",
  "Production Troubleshooting", "End-to-End Production Project",
  "Knowledge Check & Progress"
];

export default function CicdLearningExperience() {
  const [active, setActive] = useState(nav[0]);
  const [stageIndex, setStageIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState<"success" | "failure">("success");
  const [completed, setCompleted] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("devmavox-cicd-progress");
      if (saved) setCompleted(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("devmavox-cicd-progress", JSON.stringify(completed)); } catch {}
  }, [completed]);

  const stage = stages[stageIndex];
  const topic = stage.topics[topicIndex];
  const topicKey = `${stage.id}-${topicIndex}`;
  const isDone = completed.includes(topicKey);
  const total = stages.length * 3;
  const progress = Math.round(completed.length / total * 100);

  const markDone = () => setCompleted(old => old.includes(topicKey) ? old : [...old, topicKey]);
  const moveTopic = (direction: number) => {
    const next = stageIndex * 3 + topicIndex + direction;
    if (next < 0 || next >= total) return;
    setStageIndex(Math.floor(next / 3));
    setTopicIndex(next % 3);
    setSectionIndex(0);
  };

  const simulatorSteps = [
    ["Git checkout", "Jenkins checks out the selected source commit.", "Source workspace ready"],
    ["Maven build", "The agent runs mvn clean verify and creates the application JAR.", "target/payment-service.jar"],
    ["Automated tests", "JUnit and integration tests execute against the application.", scenario === "failure" ? "FAILED · Test assertion failed" : "PASSED · Test reports generated"],
    ["Quality and security", "Quality gate and dependency checks evaluate the change.", "Analysis and scan reports"],
    ["Docker build", "Docker builds an image from the verified application artifact.", "payment-service:1.0.0"],
    ["ECR push", "The verified image is pushed and its digest recorded.", "Registry image digest"],
    ["EKS deployment", "Kubernetes rolls out the selected immutable image.", "Deployment rollout status"],
    ["Monitoring", "Prometheus metrics and Grafana dashboards verify service health.", "Service health signals"]
  ];
  const stopped = scenario === "failure" && step >= 3;

  return (
    <main className="space-y-6 text-slate-100">
      <header className="rounded-2xl border border-cyan-500/20 bg-slate-950 p-6">
        <p className="text-xs font-semibold tracking-[.25em] text-cyan-300">DEVMAVOX · END-TO-END CI/CD</p>
        <h1 className="mt-2 text-3xl font-bold">CI/CD Pipeline Visualizer</h1>
        <p className="mt-2 text-slate-400">Learn · Understand · Visualize · Practice · Troubleshoot</p>
        <p className="mt-4 text-sm text-slate-400">Learning progress: {completed.length} / 36 topics · {progress}%</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-cyan-400" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <nav className="flex flex-wrap gap-2">
        {nav.map(item => <button key={item} onClick={() => setActive(item)}
          className={`rounded-xl border px-3 py-2 text-sm ${active === item ? "border-cyan-400 bg-cyan-400/15 text-cyan-200" : "border-slate-700 bg-slate-900 text-slate-300"}`}>
          {item}
        </button>)}
      </nav>

      {active === "Start Here" && <section className="space-y-4">
        <h2 className="text-2xl font-bold">CI/CD for Absolute Beginners</h2>
        <p className="text-slate-400">Start with these 12 concepts before entering the technical stages.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {beginner.map(([title, description], index) => <article key={title} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-xs text-cyan-300">CONCEPT {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
            <p className="mt-2 text-xs text-slate-500">Why learn this? It prepares you to understand the next step in the software delivery process.</p>
          </article>)}
        </div>
      </section>}

      {active === "Pipeline Overview" && <section className="space-y-4">
        <h2 className="text-2xl font-bold">12-Stage Production Pipeline</h2>
        <p className="text-sm text-slate-400">Illustrative architecture for the same Java Spring Boot payment-service. Real organizations may use different tools and ordering.</p>
        <div className="grid gap-3 md:grid-cols-3">
          {stages.map((item, index) => <button key={item.id} onClick={() => { setStageIndex(index); setTopicIndex(0); setActive("Learn the 12 Stages"); }}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-left hover:border-cyan-500">
            <p className="text-xs text-cyan-300">STAGE {String(item.id).padStart(2, "0")} / 12</p>
            <h3 className="mt-2 font-semibold">{item.name}</h3>
            <p className="mt-1 text-sm text-slate-400">{item.tool}</p>
            <p className="mt-3 text-xs text-slate-500">Input → Process → Output</p>
          </button>)}
        </div>
        <aside className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-100">
          Production note: unit tests, code analysis and dependency scans can run in parallel. Dependency scanning can happen before image creation; image scanning happens after the image is built. Helm defines release configuration, Argo CD reconciles Git desired state, and Kubernetes runs workloads.
        </aside>
      </section>}

      {active === "Learn the 12 Stages" && <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs text-cyan-300">STAGE {stage.id} / 12 · {stage.tool}</p><h2 className="text-2xl font-bold">{stage.name}</h2></div>
          <select value={stageIndex} onChange={e => { setStageIndex(Number(e.target.value)); setTopicIndex(0); setSectionIndex(0); }} className="rounded-lg border border-slate-700 bg-slate-900 p-2">
            {stages.map((s, i) => <option key={s.id} value={i}>Stage {s.id}: {s.name}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {stage.topics.map((t, i) => <button key={t.title} onClick={() => { setTopicIndex(i); setSectionIndex(0); }} className={`rounded-lg border px-3 py-2 text-sm ${topicIndex === i ? "border-cyan-400 bg-cyan-400/10" : "border-slate-700 bg-slate-900"}`}>{i + 1}. {t.title}</button>)}
        </div>
        <article className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-xs text-cyan-300">TOPIC {topicIndex + 1} / 3 · {isDone ? "COMPLETED" : "IN PROGRESS"}</p>
          <h3 className="mt-2 text-2xl font-bold">{topic.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {sections.map((s, i) => <button key={s} onClick={() => setSectionIndex(i)} className={`rounded-lg px-3 py-2 text-xs ${sectionIndex === i ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-slate-300"}`}>{String(i + 1).padStart(2, "0")} · {s}</button>)}
          </div>
          <div className="mt-5 rounded-xl bg-slate-900 p-5">
            <p className="text-xs font-semibold tracking-widest text-cyan-300">{sections[sectionIndex].toUpperCase()}</p>
            {sectionIndex === 0 && <><h4 className="mt-3 text-lg font-semibold">Simple explanation</h4><p className="mt-2 leading-7 text-slate-300">{topic.detail}</p><h4 className="mt-4 font-semibold">Technical meaning</h4><p className="mt-2 leading-7 text-slate-300">{topic.title} is part of {stage.tool} in the payment-service delivery workflow. It receives {topic.input.toLowerCase()}, performs {topic.process.toLowerCase()}, and produces {topic.output.toLowerCase()}.</p></>}
            {sectionIndex === 1 && <><h4 className="mt-3 font-semibold">Why this is needed</h4><p className="mt-2 leading-7 text-slate-300">This topic helps the team {topic.process.toLowerCase()}. Without this control, changes can move forward without reliable evidence, increasing delivery risk and making failures harder to isolate.</p></>}
            {sectionIndex === 2 && <><h4 className="mt-3 font-semibold">Component architecture</h4><div className="mt-4 grid gap-2 md:grid-cols-3"><div className="rounded-lg border border-slate-700 p-3"><p className="text-xs text-slate-500">INPUT</p>{topic.input}</div><div className="rounded-lg border border-cyan-500/40 p-3"><p className="text-xs text-cyan-300">PROCESS</p>{topic.process}</div><div className="rounded-lg border border-slate-700 p-3"><p className="text-xs text-slate-500">OUTPUT</p>{topic.output}</div></div></>}
            {sectionIndex === 3 && <><h4 className="mt-3 font-semibold">Production workflow</h4><ol className="mt-3 list-inside list-decimal space-y-2 text-slate-300"><li>Confirm the input and its version.</li><li>Validate permissions, configuration and environment.</li><li>{topic.process}.</li><li>Capture logs and generated evidence.</li><li>Verify the output before allowing the next stage.</li></ol></>}
            {sectionIndex === 4 && <><h4 className="mt-3 font-semibold">Payment Service example</h4><p className="mt-2 leading-7 text-slate-300">The team changes the payment-service application. During this topic, {topic.detail} The team records the result and passes {topic.output.toLowerCase()} to the next appropriate activity.</p></>}
            {sectionIndex === 5 && <><h4 className="mt-3 font-semibold">Commands and verification</h4><pre className="mt-3 overflow-x-auto rounded-lg bg-black p-4 text-sm text-emerald-300">{stage.id === 4 ? "mvn clean verify\nGet-ChildItem .\\target\\*.jar" : stage.id === 8 ? "docker build -t payment-service:1.0.0 .\ndocker images payment-service\ndocker inspect payment-service:1.0.0" : stage.id === 10 ? "kubectl get deployments,pods,services\nkubectl rollout status deployment/payment-service\nkubectl describe deployment payment-service" : stage.id === 12 ? "kubectl get pods\nkubectl logs deployment/payment-service" : `git status\ngit log -1 --oneline\n# Use the ${stage.tool} CLI or UI for this stage`}</pre><p className="mt-3 text-sm text-slate-400">Run commands only in the appropriate project directory and authenticated environment. Compare actual output with the expected result: {topic.output}.</p></>}
            {sectionIndex === 6 && <><h4 className="mt-3 font-semibold">Configuration to inspect</h4><p className="mt-2 leading-7 text-slate-300">Review the configuration that controls {topic.title.toLowerCase()}. Keep environment-specific values outside source code, protect credentials, validate syntax and review changes before applying them.</p><pre className="mt-3 overflow-x-auto rounded-lg bg-black p-4 text-sm text-emerald-300"># payment-service delivery configuration{"\n"}# Set environment-specific values in a protected configuration store{"\n"}# Validate configuration before deployment</pre></>}
            {sectionIndex === 7 && <><h4 className="mt-3 font-semibold">Common failure patterns</h4><ul className="mt-3 list-inside list-disc space-y-2 text-slate-300"><li>Invalid or missing input: {topic.input}.</li><li>Execution problem during: {topic.process}.</li><li>Output missing or not matching: {topic.output}.</li><li>Permission, network, version or environment mismatch.</li></ul></>}
            {sectionIndex === 8 && <><h4 className="mt-3 font-semibold">Diagnosis and recovery order</h4><ol className="mt-3 list-inside list-decimal space-y-2 text-slate-300"><li>Capture the exact error, timestamp and affected release.</li><li>Inspect stage logs and confirm the input version.</li><li>Check credentials, permissions, network and tool version.</li><li>Reproduce safely and confirm the root cause.</li><li>Apply the smallest safe fix and rerun validation.</li><li>Verify the output and record the incident evidence.</li></ol></>}
            {sectionIndex === 9 && <><h4 className="mt-3 font-semibold">Production best practices</h4><ul className="mt-3 list-inside list-disc space-y-2 text-slate-300"><li>Use version-controlled, reviewed configuration.</li><li>Apply least-privilege access and protect secrets.</li><li>Keep logs and traceable release evidence.</li><li>Validate before promotion and retain a recovery path.</li><li>Promote the same tested artifact or immutable image digest.</li></ul></>}
            {sectionIndex === 10 && <><h4 className="mt-3 font-semibold">Hands-on exercise</h4><p className="mt-2 leading-7 text-slate-300">Task: practise {topic.title} using the payment-service example. First identify {topic.input.toLowerCase()}; then perform or inspect {topic.process.toLowerCase()}; finally verify {topic.output.toLowerCase()}.</p><p className="mt-2 text-sm text-slate-400">Record the command or configuration used, expected result, actual result and cleanup performed. Do not create billable cloud resources unless you understand the cost and permissions.</p></>}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button onClick={() => moveTopic(-1)} disabled={stageIndex === 0 && topicIndex === 0} className="rounded-lg border border-slate-700 px-4 py-2 disabled:opacity-30">Previous Topic</button>
            <button onClick={markDone} className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-950">{isDone ? "Completed ✓" : "Mark as Completed"}</button>
            <button onClick={() => moveTopic(1)} disabled={stageIndex === 11 && topicIndex === 2} className="rounded-lg border border-slate-700 px-4 py-2 disabled:opacity-30">Next Topic</button>
          </div>
        </article>
      </section>}

      {active === "Interactive Pipeline Simulator" && <section className="space-y-4">
        <h2 className="text-2xl font-bold">Payment Service · Build #104</h2>
        <p className="text-xs text-amber-300">SIMULATION ONLY · No real Jenkins, AWS or Kubernetes resources are executed.</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setStep(0); setScenario("success"); }} className="rounded-lg border border-slate-700 px-3 py-2">Run Successful Scenario</button>
          <button onClick={() => { setStep(0); setScenario("failure"); }} className="rounded-lg border border-rose-500/50 px-3 py-2">Run Failed Scenario</button>
          <button onClick={() => setStep(s => Math.min(s + 1, simulatorSteps.length - 1))} className="rounded-lg bg-cyan-400 px-3 py-2 text-slate-950">Next Step</button>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} className="rounded-lg border border-slate-700 px-3 py-2">Previous Step</button>
          <button onClick={() => setStep(0)} className="rounded-lg border border-slate-700 px-3 py-2">Reset</button>
        </div>
        <article className="rounded-xl border border-slate-800 bg-slate-950 p-5">
          <p className="text-xs text-cyan-300">CURRENT ACTIVITY · STEP {step + 1} / {simulatorSteps.length}</p>
          <h3 className="mt-2 text-xl font-bold">{simulatorSteps[step][0]}</h3>
          <p className="mt-2 text-slate-300">{simulatorSteps[step][1]}</p>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-black p-4 text-sm text-emerald-300">{`[SIMULATED] ${simulatorSteps[step][2]}`}</pre>
          {stopped && <p className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-rose-200">Pipeline blocked: test failure prevents Docker build, ECR push and deployment. Configured post/cleanup actions may still run.</p>}
          <div className="mt-4 grid gap-2 md:grid-cols-4">
            {simulatorSteps.map((s, i) => <div key={s[0]} className={`rounded-lg border p-3 text-xs ${i < step ? "border-emerald-500/40 bg-emerald-500/10" : i === step ? "border-cyan-400 bg-cyan-400/10" : "border-slate-800"}`}>{i + 1}. {s[0]}</div>)}
          </div>
        </article>
      </section>}

      {active === "Hands-on Practice Lab" && <section className="space-y-4">
        <h2 className="text-2xl font-bold">Hands-on Practice Lab</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Beginner", "Explore Java project structure, Git branches, commits and a sample Jenkinsfile.", "Use a local Java project and a local Git repository. No cloud account required."],
            ["Intermediate", "Run Maven builds and JUnit tests, inspect SonarQube results, scan dependencies and build Docker images.", "Use local Maven and Docker. Run security tools in a disposable development environment."],
            ["Production Practice", "Connect Jenkins, publish to ECR, deploy to EKS, manage Helm values, sync Argo CD and monitor Prometheus/Grafana.", "Cloud resources can incur charges. Check IAM permissions, budgets and cleanup steps before creating resources."]
          ].map(([level, task, setup]) => <article key={level} className="rounded-xl border border-slate-800 bg-slate-900 p-5"><h3 className="text-lg font-bold">{level}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{task}</p><p className="mt-3 text-xs leading-5 text-amber-200">{setup}</p><ol className="mt-4 list-inside list-decimal space-y-1 text-sm text-slate-400"><li>Objective and prerequisites</li><li>Prepare required files</li><li>Follow the steps and commands</li><li>Compare expected output</li><li>Verify result and clean up</li></ol></article>)}
        </div>
      </section>}

      {active === "Production Troubleshooting" && <section className="space-y-4">
        <h2 className="text-2xl font-bold">Production Troubleshooting</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {stages.map(s => <article key={s.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4"><h3 className="font-semibold">{s.id}. {s.name}</h3><p className="mt-1 text-xs text-slate-400">{s.tool}</p><p className="mt-2 text-sm text-slate-300">Investigate input validity, stage logs, permissions, connectivity, configuration and output verification for {s.name.toLowerCase()}.</p></article>)}
        </div>
        <article className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-5">
          <h3 className="text-xl font-bold">Incident: Payment Service Production Down</h3>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-6 text-slate-300">
            <li>Confirm user impact and incident severity.</li><li>Check Prometheus alerts and Grafana error-rate and latency panels.</li>
            <li>Inspect application logs and correlate timestamps.</li><li>Check Kubernetes Pod status, events, probes and rollout history.</li>
            <li>Identify the root cause using evidence, not assumptions.</li><li>Apply a safe fix or roll back to a known-good release.</li>
            <li>Verify requests, readiness, error rate and latency recover.</li><li>Record preventive actions and incident findings.</li>
          </ol>
        </article>
      </section>}

      {active === "End-to-End Production Project" && <section className="space-y-4">
        <h2 className="text-2xl font-bold">End-to-End Project · payment-service</h2>
        <p className="text-slate-400">Follow one Java Spring Boot application through the entire delivery lifecycle.</p>
        <div className="grid gap-3 md:grid-cols-2">
          {stages.map(s => <article key={s.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs text-cyan-300">STAGE {s.id}</p><h3 className="mt-1 font-semibold">{s.name}</h3><p className="mt-1 text-sm text-slate-400">{s.tool}</p><p className="mt-2 text-sm text-slate-300">{s.topics.map(t => t.title).join(" · ")}</p></article>)}
        </div>
      </section>}

      {active === "Knowledge Check & Progress" && <section className="space-y-4">
        <h2 className="text-2xl font-bold">Knowledge Check & Progress</h2>
        <p className="text-slate-300">Completed topics: {completed.length} / 36 ({progress}%). Progress is saved in this browser.</p>
        <div className="space-y-3">
          {stages.map(s => <article key={s.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4"><h3 className="font-semibold">Stage {s.id} · {s.name}</h3><p className="mt-1 text-xs text-slate-400">{s.topics.filter((_, i) => completed.includes(`${s.id}-${i}`)).length} / 3 topics completed</p><div className="mt-3 flex flex-wrap gap-2">{s.topics.map((t, i) => <button key={t.title} onClick={() => { setStageIndex(s.id - 1); setTopicIndex(i); setActive("Learn the 12 Stages"); }} className="rounded-lg border border-slate-700 px-2 py-1 text-xs">{completed.includes(`${s.id}-${i}`) ? "✓ " : ""}{t.title}</button>)}</div></article>)}
        </div>
        <article className="rounded-xl border border-cyan-500/30 bg-slate-950 p-5">
          <h3 className="font-semibold">Scenario Question</h3>
          <p className="mt-2 text-sm text-slate-300">Jenkins reports that Maven tests failed. Should Docker image publishing and Kubernetes deployment continue?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => { setAnswer("yes"); setChecked(true); }} className={`rounded-lg border px-3 py-2 text-sm ${answer === "yes" ? "border-cyan-400" : "border-slate-700"}`}>Yes, continue</button>
            <button onClick={() => { setAnswer("no"); setChecked(true); }} className={`rounded-lg border px-3 py-2 text-sm ${answer === "no" ? "border-cyan-400" : "border-slate-700"}`}>No, block downstream release stages</button>
          </div>
          {checked && <p className="mt-3 text-sm leading-6 text-slate-300">{answer === "no" ? "Correct. A failed required test stage should block image publishing and deployment. Configured post and cleanup actions may still execute." : "Not quite. A failed required test stage should prevent the artifact from being promoted to deployment."}</p>}
        </article>
      </section>}
    </main>
  );
}
