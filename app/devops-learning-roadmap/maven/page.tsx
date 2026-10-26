
"use client";

import { useMemo, useState } from "react";

type Lesson = {
  title: string;
  purpose: string;
  topics: string[];
};

type Module = {
  title: string;
  level: "Foundation" | "Beginner" | "Intermediate" | "Advanced" | "Production";
  duration: string;
  description: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "01. Build Automation Fundamentals",
    level: "Foundation",
    duration: "1–2 days",
    description: "Understand build systems and Maven's role in Java application development.",
    lessons: [
      {
        title: "Build automation concepts",
        purpose: "Understand why software projects need repeatable build processes.",
        topics: [
          "Software compilation and packaging",
          "Manual builds versus automated builds",
          "Source code, compiled classes and artifacts",
          "Build automation in the software development lifecycle",
          "Dependency management fundamentals",
          "Build reproducibility",
          "Maven versus Gradle",
          "Maven's role in CI/CD pipelines",
        ],
      },
      {
        title: "Introduction to Apache Maven",
        purpose: "Understand Maven's architecture and project-management approach.",
        topics: [
          "What is Apache Maven?",
          "Convention over configuration",
          "Project Object Model (POM)",
          "Maven coordinates and artifact identity",
          "Local, central and remote repositories",
          "Maven plugins and goals",
          "Maven Wrapper",
          "Common Maven use cases and limitations",
        ],
      },
    ],
  },
  {
    title: "02. Installation and Configuration",
    level: "Beginner",
    duration: "1–2 days",
    description: "Understand Maven installation, Java compatibility and command-line configuration.",
    lessons: [
      {
        title: "Java and Maven setup",
        purpose: "Understand the runtime requirements for Maven builds.",
        topics: [
          "JDK versus JRE",
          "Supported Java and Maven versions",
          "JAVA_HOME configuration",
          "PATH environment variable",
          "Maven installation on Linux",
          "Maven installation on Windows",
          "Checking Java and Maven versions",
          "Maven Wrapper and project-specific Maven versions",
        ],
      },
      {
        title: "Maven settings and environment",
        purpose: "Understand user-level and machine-level Maven configuration.",
        topics: [
          "MAVEN_HOME and installation directories",
          "settings.xml location",
          "User settings versus global settings",
          "Local repository configuration",
          "Mirror configuration",
          "Proxy settings",
          "Repository authentication",
          "Environment-specific configuration",
        ],
      },
    ],
  },
  {
    title: "03. Maven Project Structure and POM",
    level: "Beginner",
    duration: "2–3 days",
    description: "Learn the standard Maven directory layout and the configuration that defines a project.",
    lessons: [
      {
        title: "Standard project structure",
        purpose: "Understand where source files, tests and build outputs belong.",
        topics: [
          "src/main/java",
          "src/main/resources",
          "src/test/java",
          "src/test/resources",
          "The target directory",
          "Standard versus custom directory layouts",
          "Compiled classes and packaged artifacts",
          "Resource filtering concepts",
        ],
      },
      {
        title: "POM fundamentals",
        purpose: "Understand the main configuration file used by Maven.",
        topics: [
          "pom.xml structure",
          "modelVersion",
          "groupId, artifactId and version",
          "Packaging types",
          "Project name and description",
          "Properties",
          "Dependencies",
          "Build plugins",
          "Repositories and distribution management",
          "Parent POM and inheritance",
        ],
      },
      {
        title: "Maven coordinates and versioning",
        purpose: "Understand how Maven identifies and resolves project artifacts.",
        topics: [
          "Group ID and artifact ID",
          "Release and snapshot versions",
          "Artifact coordinates",
          "Classifier and packaging",
          "Version naming conventions",
          "Snapshot metadata",
          "Dependency version selection",
          "Artifact naming and traceability",
        ],
      },
    ],
  },
  {
    title: "04. Maven Commands and Build Lifecycle",
    level: "Beginner",
    duration: "2–3 days",
    description: "Understand Maven's command-line interface and the order in which build phases execute.",
    lessons: [
      {
        title: "Essential Maven commands",
        purpose: "Understand the commands commonly used by developers and DevOps engineers.",
        topics: [
          "mvn --version",
          "mvn validate",
          "mvn compile",
          "mvn test",
          "mvn package",
          "mvn verify",
          "mvn install",
          "mvn deploy",
          "mvn clean",
          "Command-line properties with -D",
          "Offline mode and batch mode",
        ],
      },
      {
        title: "Build lifecycles and phases",
        purpose: "Understand how Maven coordinates a complete build.",
        topics: [
          "Default lifecycle",
          "Clean lifecycle",
          "Site lifecycle",
          "validate and compile",
          "test and package",
          "verify, install and deploy",
          "Phase execution order",
          "Difference between a lifecycle, phase, plugin and goal",
          "Why later phases execute earlier phases",
        ],
      },
      {
        title: "Goals and execution",
        purpose: "Understand how plugins provide the actual build operations.",
        topics: [
          "Plugin goals",
          "Direct goal invocation",
          "Goals bound to lifecycle phases",
          "Plugin prefixes",
          "Execution IDs",
          "Multiple plugin executions",
          "Command-line goal parameters",
          "Build ordering and execution behaviour",
        ],
      },
    ],
  },
  {
    title: "05. Dependency Management",
    level: "Intermediate",
    duration: "3–4 days",
    description: "Understand how Maven resolves libraries and controls dependency versions.",
    lessons: [
      {
        title: "Dependency fundamentals",
        purpose: "Understand direct and transitive libraries used by an application.",
        topics: [
          "Declaring dependencies in POM",
          "Direct dependencies",
          "Transitive dependencies",
          "Compile, provided, runtime and test scopes",
          "System scope limitations",
          "Optional dependencies",
          "Dependency exclusions",
          "Test-only dependencies",
        ],
      },
      {
        title: "Dependency resolution",
        purpose: "Understand how Maven chooses the libraries used during a build.",
        topics: [
          "Transitive dependency graph",
          "Nearest-definition mediation",
          "Dependency version conflicts",
          "Dependency convergence",
          "Dependency tree analysis",
          "Direct versus transitive version control",
          "BOM imports",
          "DependencyManagement versus dependencies",
          "Excluding unwanted transitive libraries",
        ],
      },
      {
        title: "Dependency repositories",
        purpose: "Understand how dependencies are downloaded, cached and shared.",
        topics: [
          "Local Maven repository",
          "Maven Central",
          "Remote repositories",
          "Repository mirrors",
          "Private artifact repositories",
          "Repository authentication",
          "Snapshot versus release repositories",
          "Offline dependency availability",
          "Repository precedence and resolution issues",
        ],
      },
    ],
  },
  {
    title: "06. Plugins and Build Customization",
    level: "Intermediate",
    duration: "3–4 days",
    description: "Understand how Maven plugins compile code, run tests and produce release artifacts.",
    lessons: [
      {
        title: "Plugin fundamentals",
        purpose: "Understand how plugins extend Maven's build lifecycle.",
        topics: [
          "Plugin coordinates",
          "Plugin goals and lifecycle bindings",
          "Plugin versions",
          "Plugin configuration in POM",
          "Execution phases",
          "Execution IDs",
          "Default plugin behaviour",
          "Plugin documentation and compatibility",
        ],
      },
      {
        title: "Important build plugins",
        purpose: "Understand the plugins commonly found in Java application builds.",
        topics: [
          "Maven Compiler Plugin",
          "Maven Surefire Plugin",
          "Maven Failsafe Plugin",
          "Maven Resources Plugin",
          "Maven Clean Plugin",
          "Maven JAR Plugin",
          "Maven WAR Plugin",
          "Maven Assembly Plugin",
          "Maven Shade Plugin",
          "Maven Dependency Plugin",
          "Maven Deploy Plugin",
        ],
      },
      {
        title: "Plugin configuration and compatibility",
        purpose: "Understand how to maintain predictable builds across environments.",
        topics: [
          "Compiler source and target settings",
          "Java release configuration",
          "Plugin version pinning",
          "Plugin parameter configuration",
          "Skipping selected plugin executions",
          "Plugin repositories",
          "Deprecated plugin parameters",
          "Plugin and Maven version compatibility",
        ],
      },
    ],
  },
  {
    title: "07. Java Compilation, Testing and Packaging",
    level: "Intermediate",
    duration: "3–4 days",
    description: "Understand how Maven turns source code into tested and distributable artifacts.",
    lessons: [
      {
        title: "Compilation and resources",
        purpose: "Understand Java compilation and application resource handling.",
        topics: [
          "Compiler Plugin configuration",
          "Java release and bytecode compatibility",
          "Source and target compatibility",
          "Resource copying and filtering",
          "Classpath construction",
          "Compilation errors versus dependency errors",
          "Generated source directories",
          "Annotation processors",
        ],
      },
      {
        title: "Automated testing",
        purpose: "Understand how test execution affects build success.",
        topics: [
          "Unit testing with JUnit",
          "TestNG integration concepts",
          "Surefire Plugin",
          "Failsafe Plugin and integration-test phases",
          "Test discovery and naming conventions",
          "Test reports",
          "Test failure versus test error",
          "Skipping tests versus skipping test compilation",
          "Parallel test execution",
          "Flaky tests and environment-specific failures",
        ],
      },
      {
        title: "Packaging and artifacts",
        purpose: "Understand how build outputs become deployable files.",
        topics: [
          "JAR packaging",
          "WAR packaging",
          "POM packaging",
          "Executable JAR concepts",
          "Manifest configuration",
          "Dependency inclusion and shaded JARs",
          "Artifact naming",
          "Versioned release artifacts",
          "Checksums and artifact integrity",
        ],
      },
    ],
  },
  {
    title: "08. Profiles and Environment Configuration",
    level: "Intermediate",
    duration: "2–3 days",
    description: "Understand how Maven supports different build configurations without duplicating projects.",
    lessons: [
      {
        title: "Maven profiles",
        purpose: "Understand conditional project configuration for different environments.",
        topics: [
          "Profile definitions in POM",
          "Activation by property",
          "Activation by JDK and operating system",
          "Explicit profile activation",
          "Active profiles",
          "Profile-specific properties",
          "Profile-specific dependencies and plugins",
          "Profile precedence and effective configuration",
        ],
      },
      {
        title: "Environment-aware builds",
        purpose: "Understand safe separation of build configuration from deployment configuration.",
        topics: [
          "Development, staging and production build settings",
          "Build-time versus runtime configuration",
          "Environment variables and system properties",
          "Resource filtering trade-offs",
          "Externalized configuration",
          "Avoiding credentials in POM files",
          "Reproducible output across environments",
          "Why Maven profiles are not a complete deployment strategy",
        ],
      },
    ],
  },
  {
    title: "09. Parent POMs, Inheritance and Multi-Module Projects",
    level: "Advanced",
    duration: "3–4 days",
    description: "Understand how large Java repositories share configuration and build related modules.",
    lessons: [
      {
        title: "POM inheritance",
        purpose: "Understand how child projects inherit common build configuration.",
        topics: [
          "Parent and child POMs",
          "Inherited properties and dependencies",
          "DependencyManagement",
          "PluginManagement",
          "Plugin inheritance",
          "Relative parent paths",
          "Effective POM",
          "Overriding inherited configuration",
        ],
      },
      {
        title: "Multi-module architecture",
        purpose: "Understand how Maven builds related modules in a coordinated project.",
        topics: [
          "Aggregator POM",
          "The modules element",
          "Parent POM versus aggregator POM",
          "Inter-module dependencies",
          "Reactor build",
          "Reactor dependency ordering",
          "Building selected modules",
          "Resume-from and make options",
          "Shared dependency and plugin versions",
        ],
      },
      {
        title: "Enterprise build organization",
        purpose: "Understand patterns for consistent builds across many repositories.",
        topics: [
          "Corporate parent POMs",
          "Shared build standards",
          "Centralized dependency version management",
          "Internal repository policies",
          "Build conventions and governance",
          "Parent POM release management",
          "Compatibility across application teams",
          "Managing configuration changes safely",
        ],
      },
    ],
  },
  {
    title: "10. Advanced Dependency and Repository Management",
    level: "Advanced",
    duration: "3–4 days",
    description: "Understand dependency hygiene, repository policies and supply-chain reliability.",
    lessons: [
      {
        title: "Dependency analysis",
        purpose: "Understand which libraries a project uses and where risks may exist.",
        topics: [
          "Dependency Plugin",
          "Dependency tree and analysis",
          "Unused and undeclared dependencies",
          "Dependency convergence",
          "Duplicate and conflicting libraries",
          "BOM-based version alignment",
          "Version ranges and reproducibility risks",
          "Dependency upgrade planning",
        ],
      },
      {
        title: "Repository management",
        purpose: "Understand how organizations manage internal artifacts and external dependencies.",
        topics: [
          "Nexus Repository concepts",
          "JFrog Artifactory concepts",
          "Hosted, proxy and group repositories",
          "Mirroring Maven Central",
          "Release and snapshot repository policies",
          "Repository credentials and access control",
          "Artifact retention and cleanup",
          "Repository availability and caching",
        ],
      },
      {
        title: "Supply-chain security",
        purpose: "Understand how dependency integrity affects application security.",
        topics: [
          "Dependency vulnerability scanning",
          "Software Composition Analysis",
          "Untrusted dependency risks",
          "Dependency provenance concepts",
          "Checksums and signature verification",
          "Dependency pinning and update policies",
          "Software Bill of Materials concepts",
          "Managing vulnerable transitive dependencies",
        ],
      },
    ],
  },
  {
    title: "11. Maven in Jenkins and CI/CD",
    level: "Advanced",
    duration: "3–4 days",
    description: "Understand how Maven builds integrate with continuous integration and delivery pipelines.",
    lessons: [
      {
        title: "Maven build pipeline",
        purpose: "Understand the sequence from source checkout to published artifacts.",
        topics: [
          "Git checkout and revision selection",
          "Java and Maven tool configuration",
          "Maven Wrapper in CI",
          "Compilation and test stages",
          "Packaging and artifact archiving",
          "Quality gates",
          "Build result handling",
          "Artifact versioning",
          "Publishing build metadata",
        ],
      },
      {
        title: "Jenkins integration",
        purpose: "Understand how Jenkins executes and reports Maven builds.",
        topics: [
          "Invoking Maven from Jenkins Pipeline",
          "Jenkins agents and Maven installations",
          "Tool and environment configuration",
          "JUnit report publishing",
          "Repository credentials",
          "Dependency caching on agents",
          "Build parameters and profiles",
          "Publishing artifacts to repositories",
          "Pipeline failure handling",
        ],
      },
      {
        title: "Reliable CI builds",
        purpose: "Understand how to make builds predictable across machines and runs.",
        topics: [
          "Pinned tool versions",
          "Consistent Java runtimes",
          "Reproducible build inputs",
          "Offline versus online dependency resolution",
          "Caching and cache invalidation",
          "Build isolation",
          "Parallel builds and resource contention",
          "Quality and security gates",
          "Build provenance and traceability",
        ],
      },
    ],
  },
  {
    title: "12. Maven and Docker",
    level: "Advanced",
    duration: "2–3 days",
    description: "Understand how Maven artifacts fit into container image build and release workflows.",
    lessons: [
      {
        title: "Container image build flow",
        purpose: "Understand how a Maven-built application becomes a container image.",
        topics: [
          "Compile and package before image creation",
          "JAR and WAR deployment models",
          "Multi-stage Docker builds",
          "Maven dependency caching in image builds",
          "Build context and artifact copying",
          "Image tags and immutable digests",
          "Runtime configuration",
          "Image vulnerability scanning",
        ],
      },
      {
        title: "Container build reliability",
        purpose: "Understand how to keep image builds efficient and maintainable.",
        topics: [
          "BuildKit cache mounts",
          "Docker build arguments versus runtime environment variables",
          "Avoiding credentials in image layers",
          "JDK build image versus runtime image",
          "Non-root runtime users",
          "Image size optimization",
          "Reproducible application packaging",
          "CI artifact reuse versus rebuilding inside Docker",
        ],
      },
    ],
  },
  {
    title: "13. Maven with Application Servers and Cloud Deployment",
    level: "Advanced",
    duration: "2–3 days",
    description: "Understand how Maven packages applications for deployment to servers and cloud platforms.",
    lessons: [
      {
        title: "Application deployment packaging",
        purpose: "Understand packaging choices for Java applications.",
        topics: [
          "JAR versus WAR",
          "Servlet container deployment concepts",
          "Apache Tomcat integration",
          "Application server dependencies",
          "Provided dependency scope",
          "External configuration",
          "Artifact promotion",
          "Application version identification",
        ],
      },
      {
        title: "Cloud and Kubernetes delivery",
        purpose: "Understand Maven's place in modern deployment pipelines.",
        topics: [
          "Building Java artifacts for container workloads",
          "Publishing artifacts to a repository",
          "Container image creation and publication",
          "Kubernetes deployment manifests",
          "Helm-based application delivery concepts",
          "Environment-specific runtime configuration",
          "Release verification and rollback",
          "Separation of build and deployment responsibilities",
        ],
      },
    ],
  },
  {
    title: "14. Maven Performance and Build Optimization",
    level: "Advanced",
    duration: "2–3 days",
    description: "Understand why builds become slow and which optimizations are safe.",
    lessons: [
      {
        title: "Build performance",
        purpose: "Understand how to locate bottlenecks in Maven builds.",
        topics: [
          "Build phase duration",
          "Dependency download latency",
          "Plugin execution overhead",
          "Test execution time",
          "Multi-module build performance",
          "Parallel build options",
          "Incremental build limitations",
          "Build logs and profiling concepts",
        ],
      },
      {
        title: "Caching and parallel execution",
        purpose: "Understand how to improve throughput without compromising correctness.",
        topics: [
          "Local repository caching",
          "CI dependency caches",
          "Cache keys and invalidation",
          "Maven parallel build options",
          "Thread safety of plugins",
          "Parallel test execution",
          "Memory and CPU allocation",
          "Avoiding unsafe shared cache behaviour",
        ],
      },
    ],
  },
  {
    title: "15. Maven Release and Version Management",
    level: "Advanced",
    duration: "2–3 days",
    description: "Understand how project versions and artifacts are managed across development and releases.",
    lessons: [
      {
        title: "Versioning and release lifecycle",
        purpose: "Understand how teams identify and publish software versions.",
        topics: [
          "Release and snapshot versions",
          "Semantic versioning concepts",
          "Version updates across multi-module projects",
          "Maven Release Plugin concepts",
          "SCM tagging and release preparation",
          "Release metadata",
          "Artifact immutability",
          "Release repository policies",
        ],
      },
      {
        title: "Release governance",
        purpose: "Understand how to maintain traceable and recoverable releases.",
        topics: [
          "Approved release versions",
          "Build provenance",
          "Checksums and signatures",
          "Release notes and change history",
          "Dependency version alignment",
          "Promoting the same artifact across environments",
          "Rollback and previous-version selection",
          "Release audit trails",
        ],
      },
    ],
  },
  {
    title: "16. Maven Troubleshooting and Root Cause Analysis",
    level: "Production",
    duration: "Ongoing learning",
    description: "Understand common build failures and how to interpret Maven diagnostic information.",
    lessons: [
      {
        title: "Installation and environment failures",
        purpose: "Understand problems caused by incompatible tools or incorrect configuration.",
        topics: [
          "mvn command not found",
          "JAVA_HOME misconfiguration",
          "Unsupported Java or Maven version",
          "Compiler source and target mismatch",
          "Maven Wrapper execution failures",
          "Incorrect settings.xml",
          "Proxy and network configuration",
        ],
      },
      {
        title: "Dependency and repository failures",
        purpose: "Understand why Maven cannot resolve required artifacts.",
        topics: [
          "Dependency resolution failure",
          "Artifact not found",
          "401 or 403 repository errors",
          "Connection timeout and DNS failure",
          "TLS and certificate errors",
          "Cached failed resolution",
          "Repository mirror misconfiguration",
          "Snapshot metadata problems",
          "Dependency version conflicts",
        ],
      },
      {
        title: "Compilation, testing and packaging failures",
        purpose: "Understand build errors across the application lifecycle.",
        topics: [
          "Compilation errors",
          "Missing symbols and classes",
          "Test failures versus test execution errors",
          "Tests not discovered",
          "Surefire and Failsafe configuration problems",
          "Packaging failures",
          "Missing resources",
          "Multi-module reactor failures",
          "Plugin resolution and execution failures",
          "Out-of-memory and disk space issues",
        ],
      },
      {
        title: "CI/CD-specific failures",
        purpose: "Understand why a build may work locally but fail in Jenkins.",
        topics: [
          "Different Java versions between local and CI",
          "Missing environment variables",
          "Agent permissions and workspace issues",
          "Missing credentials",
          "Dependency cache differences",
          "Network restrictions",
          "Artifact publishing failures",
          "Build timeout and resource contention",
          "Diagnosing failures with Maven debug output",
        ],
      },
    ],
  },
  {
    title: "17. Maven Configuration, Extensibility and Advanced Features",
    level: "Advanced",
    duration: "2–3 days",
    description: "Understand Maven's advanced configuration and extension mechanisms.",
    lessons: [
      {
        title: "Effective configuration",
        purpose: "Understand the final configuration Maven applies to a project.",
        topics: [
          "Effective POM",
          "Effective settings",
          "Inherited configuration",
          "Active profiles",
          "Plugin configuration merging",
          "Property precedence",
          "Debugging configuration differences",
          "Maven help plugin concepts",
        ],
      },
      {
        title: "Extensions and custom build logic",
        purpose: "Understand how specialized build behaviour can be integrated.",
        topics: [
          "Core extensions",
          "Build extensions",
          "Custom Maven plugins",
          "Mojo concepts",
          "Plugin descriptors",
          "Plugin testing and documentation",
          "Extension compatibility",
          "Risks of excessive custom build logic",
        ],
      },
    ],
  },
  {
    title: "18. Build Reproducibility and Software Supply Chain",
    level: "Production",
    duration: "Ongoing learning",
    description: "Understand how to make software builds traceable, consistent and safer.",
    lessons: [
      {
        title: "Reproducible builds",
        purpose: "Understand how teams reduce unexpected differences between build runs.",
        topics: [
          "Pinned dependency versions",
          "Pinned plugin versions",
          "Java toolchain consistency",
          "Build timestamps and reproducible archives",
          "Deterministic build inputs",
          "Dependency locking limitations and alternatives",
          "Repository availability",
          "Build environment documentation",
        ],
      },
      {
        title: "Supply-chain controls",
        purpose: "Understand how to identify and reduce risks in dependencies and artifacts.",
        topics: [
          "Software Bill of Materials concepts",
          "Dependency vulnerability analysis",
          "Artifact checksums and signatures",
          "Repository access control",
          "Build provenance",
          "Dependency source validation",
          "Release integrity",
          "Security policy enforcement in CI/CD",
        ],
      },
    ],
  },
  {
    title: "19. Production Build Architecture and Governance",
    level: "Production",
    duration: "Ongoing learning",
    description: "Understand the operating standards used to manage Maven across large engineering teams.",
    lessons: [
      {
        title: "Enterprise build architecture",
        purpose: "Understand how repositories, build agents and artifact storage work together.",
        topics: [
          "Source repositories and branch strategy",
          "Build agents and toolchain management",
          "Local and remote dependency caches",
          "Artifact repository architecture",
          "Corporate parent POMs",
          "Multi-module project organization",
          "Build isolation and concurrency",
          "Repository resilience and availability",
        ],
      },
      {
        title: "Governance and operations",
        purpose: "Understand how to maintain consistent and secure build practices.",
        topics: [
          "Approved Java and Maven versions",
          "Plugin and dependency update policies",
          "Build standards and templates",
          "Quality gates and security policies",
          "Artifact retention and cleanup",
          "Build monitoring and failure trends",
          "Change management and compatibility",
          "Operational ownership and documentation",
        ],
      },
    ],
  },
  {
    title: "20. Maven Interview and Career Readiness",
    level: "Production",
    duration: "Ongoing revision",
    description: "Organize the concepts required to explain Maven builds and investigate real build failures.",
    lessons: [
      {
        title: "Core interview concepts",
        purpose: "Explain the most important Maven behaviours and configuration choices.",
        topics: [
          "What is Maven and what is POM?",
          "Maven lifecycle phases",
          "Lifecycle versus phase versus goal",
          "Dependencies versus DependencyManagement",
          "PluginManagement versus plugins",
          "Compile versus runtime versus test scope",
          "Maven profiles",
          "Parent POM versus aggregator POM",
          "JAR versus WAR packaging",
          "Maven install versus deploy",
        ],
      },
      {
        title: "Advanced scenario-based knowledge",
        purpose: "Explain the root cause and trade-offs behind complex build failures.",
        topics: [
          "Why a dependency cannot be downloaded",
          "How to resolve dependency conflicts",
          "How to investigate slow builds",
          "Why tests pass locally but fail in CI",
          "How to manage multi-module builds",
          "How to publish artifacts securely",
          "How to improve build reproducibility",
          "How to investigate plugin compatibility",
          "How to manage Maven repository outages",
          "How to design an enterprise build pipeline",
        ],
      },
      {
        title: "Career progression",
        purpose: "Connect Maven skills to common software delivery responsibilities.",
        topics: [
          "Junior DevOps Engineer: Maven commands and POM basics",
          "DevOps Engineer: Jenkins integration and artifact publishing",
          "Senior DevOps Engineer: dependency governance and build optimization",
          "Build Engineer: multi-module builds and repository architecture",
          "Platform Engineer: reusable build standards and developer workflows",
          "Release Engineer: versioning, provenance and release governance",
          "Explaining technical decisions and operational trade-offs",
        ],
      },
    ],
  },
];

const levelStyles: Record<Module["level"], string> = {
  Foundation: "bg-slate-100 text-slate-700",
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-violet-100 text-violet-800",
  Production: "bg-orange-100 text-orange-800",
};

export default function MavenRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [completed, setCompleted] = useState<string[]>([]);

  const allLessons = modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      id: `${moduleIndex}-${lessonIndex}`,
      title: lesson.title,
    })),
  );

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, originalIndex: index }))
      .filter((module) => level === "All" || module.level === level)
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) => {
          const searchableText = [
            module.title,
            module.description,
            lesson.title,
            lesson.purpose,
            ...lesson.topics,
          ]
            .join(" ")
            .toLowerCase();

          return !query || searchableText.includes(query);
        }),
      }))
      .filter((module) => module.lessons.length > 0);
  }, [search, level]);

  const progress = Math.round((completed.length / allLessons.length) * 100);

  function toggleModule(index: number) {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function toggleLesson(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <p className="mb-4 inline-flex rounded-full border border-blue-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
            DevMavox · DevOps Learning Roadmap
          </p>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Apache Maven Learning Roadmap
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
            Learn Maven from build automation fundamentals to advanced
            dependency management, multi-module projects, CI/CD integration,
            build security, reproducibility and production build architecture.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["20", "Learning modules"],
              ["5", "Learning levels"],
              ["Builds", "Core focus"],
              ["Production", "Final destination"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <p className="text-xl font-bold sm:text-2xl">{value}</p>
                <p className="mt-1 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Your learning progress</h2>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-600">Lessons completed</span>
              <span className="font-bold">
                {completed.length}/{allLessons.length}
              </span>
            </div>

            <div
              className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Roadmap completion"
            >
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {progress}% of roadmap lessons completed
            </p>

            <button
              type="button"
              onClick={() => setCompleted([])}
              className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Reset progress
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">Recommended learning order</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>1. Build fundamentals and POM</li>
              <li>2. Commands and lifecycle</li>
              <li>3. Dependencies and plugins</li>
              <li>4. Testing and packaging</li>
              <li>5. Profiles and multi-module builds</li>
              <li>6. Repository and release management</li>
              <li>7. Jenkins, Docker and deployment integration</li>
              <li>8. Security and production build governance</li>
            </ol>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h2 className="font-bold text-blue-950">Prerequisites</h2>
            <p className="mt-2 text-sm leading-6 text-blue-900">
              Basic Java, command-line usage, file-system navigation and Git
              knowledge will help. Linux and CI/CD fundamentals are useful
              for understanding production build workflows.
            </p>
          </section>
        </aside>

        <section className="min-w-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Complete learning path
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Expand any module to explore its lessons, learning purpose and
              detailed subtopics. Mark lessons complete as you study them.
            </p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Maven topics..."
              aria-label="Search roadmap topics"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              aria-label="Filter by learning level"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              {[
                "All",
                "Foundation",
                "Beginner",
                "Intermediate",
                "Advanced",
                "Production",
              ].map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All levels" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredModules.map((module) => {
              const index = module.originalIndex;
              const isExpanded = expanded.includes(index);

              return (
                <article
                  key={module.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(index)}
                    aria-expanded={isExpanded}
                    className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-slate-50 sm:p-6"
                  >
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold sm:text-lg">
                          {module.title}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${levelStyles[module.level]}`}
                        >
                          {module.level}
                        </span>
                      </span>

                      <span className="mt-2 block text-sm leading-6 text-slate-600">
                        {module.description}
                      </span>

                      <span className="mt-3 block text-xs font-medium text-slate-500">
                        {module.lessons.length} lessons · {module.duration}
                      </span>
                    </span>

                    <span aria-hidden="true" className="shrink-0 text-xl text-slate-400">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="space-y-4 border-t border-slate-100 p-4 sm:p-6">
                      {module.lessons.map((lesson) => {
                        const lessonIndex = modules[index].lessons.findIndex(
                          (item) => item.title === lesson.title,
                        );
                        const id = `${index}-${lessonIndex}`;
                        const isComplete = completed.includes(id);

                        return (
                          <section
                            key={lesson.title}
                            className="rounded-xl border border-slate-200 p-4 sm:p-5"
                          >
                            <label className="flex cursor-pointer items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isComplete}
                                onChange={() => toggleLesson(id)}
                                className="mt-1 h-4 w-4 accent-blue-600"
                              />

                              <span className="min-w-0 flex-1">
                                <span
                                  className={`block font-bold ${
                                    isComplete
                                      ? "text-slate-400 line-through"
                                      : "text-slate-900"
                                  }`}
                                >
                                  {lesson.title}
                                </span>

                                <span className="mt-2 block text-sm leading-6 text-slate-600">
                                  {lesson.purpose}
                                </span>
                              </span>
                            </label>

                            <div className="mt-4 border-t border-slate-100 pt-4">
                              <h3 className="text-sm font-bold text-slate-700">
                                Topics to understand
                              </h3>

                              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                                {lesson.topics.map((topic) => (
                                  <li
                                    key={topic}
                                    className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                                  >
                                    <span className="mt-0.5 text-blue-600">•</span>
                                    <span>{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h3 className="font-bold">No matching topics found</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Try another search term or select a different learning level.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setLevel("All");
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold">
              What should you understand by the end?
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Explain Maven's project structure and build lifecycle.",
                "Understand dependencies, scopes and version conflicts.",
                "Understand plugins and build configuration.",
                "Understand tests, packaging and artifact management.",
                "Understand parent POMs and multi-module projects.",
                "Understand repository management and supply-chain risks.",
                "Explain Maven integration with Jenkins and Docker.",
                "Investigate build failures and improve reproducibility.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                >
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Learning durations are estimates. Maven behaviour depends on
            the Maven and Java versions, plugin versions and repository
            configuration. The completion checklist tracks progress in the
            current page session; persistent progress storage is not
            implemented in this page.
          </p>
        </section>
      </div>
    </main>
  );
}
