import type { AtoZLesson } from "../lessons";

export const mavenAtoZLessons: Record<string, AtoZLesson> = {
  "maven/maven-introduction": {
    "summary": "Apache Maven is a build automation and dependency management tool commonly used for Java projects.",
    "diagram": {
      "title": "Maven Introduction build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Apache Maven is a build automation and dependency management tool commonly used for Java projects.",
          "This capability makes maven introduction repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Introduction in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn -version\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Apache Maven is a build automation and dependency management tool commonly used for Java projects. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Introduction with a practical Java DevOps example.",
        "answer": "Apache Maven is a build automation and dependency management tool commonly used for Java projects. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/maven-architecture": {
    "summary": "Maven resolves project configuration, lifecycle phases, plugins and dependencies to execute a repeatable build.",
    "diagram": {
      "title": "Maven Architecture build flow",
      "nodes": [
        "pom.xml",
        "Maven model and effective POM",
        "lifecycle phase",
        "plugin goal",
        "dependency resolution",
        "artifact"
      ],
      "explanation": "pom.xml → Maven model and effective POM → lifecycle phase → plugin goal → dependency resolution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven resolves project configuration, lifecycle phases, plugins and dependencies to execute a repeatable build.",
          "This capability makes maven architecture repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Architecture in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "pom.xml → Maven model and effective POM → lifecycle phase → plugin goal → dependency resolution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven resolves project configuration, lifecycle phases, plugins and dependencies to execute a repeatable build. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Architecture with a practical Java DevOps example.",
        "answer": "Maven resolves project configuration, lifecycle phases, plugins and dependencies to execute a repeatable build. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/maven-installation": {
    "summary": "Maven installation configures a compatible Java runtime and Maven executable for local and CI builds.",
    "diagram": {
      "title": "Maven Installation build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven installation configures a compatible Java runtime and Maven executable for local and CI builds.",
          "This capability makes maven installation repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Installation in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "java -version\nmvn -version",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven installation configures a compatible Java runtime and Maven executable for local and CI builds. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Installation with a practical Java DevOps example.",
        "answer": "Maven installation configures a compatible Java runtime and Maven executable for local and CI builds. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/project-object-model": {
    "summary": "The Project Object Model is Maven's project metadata model represented by the POM and inherited configuration.",
    "diagram": {
      "title": "Project Object Model build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Project Object Model is Maven's project metadata model represented by the POM and inherited configuration.",
          "This capability makes project object model repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Project Object Model in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Project Object Model is Maven's project metadata model represented by the POM and inherited configuration. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Project Object Model with a practical Java DevOps example.",
        "answer": "The Project Object Model is Maven's project metadata model represented by the POM and inherited configuration. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/pom-xml": {
    "summary": "pom.xml is the XML project descriptor that defines coordinates, dependencies, build settings, plugins and profiles.",
    "diagram": {
      "title": "pom.xml build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "pom.xml is the XML project descriptor that defines coordinates, dependencies, build settings, plugins and profiles.",
          "This capability makes pom.xml repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use pom.xml in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn validate",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "pom.xml is the XML project descriptor that defines coordinates, dependencies, build settings, plugins and profiles. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain pom.xml with a practical Java DevOps example.",
        "answer": "pom.xml is the XML project descriptor that defines coordinates, dependencies, build settings, plugins and profiles. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/maven-coordinates": {
    "summary": "Maven coordinates uniquely identify an artifact using groupId, artifactId, version and optional classifier/type.",
    "diagram": {
      "title": "Maven Coordinates build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven coordinates uniquely identify an artifact using groupId, artifactId, version and optional classifier/type.",
          "This capability makes maven coordinates repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Coordinates in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven coordinates uniquely identify an artifact using groupId, artifactId, version and optional classifier/type. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Coordinates with a practical Java DevOps example.",
        "answer": "Maven coordinates uniquely identify an artifact using groupId, artifactId, version and optional classifier/type. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/groupid-artifactid-version": {
    "summary": "groupId, artifactId and version identify a Maven artifact and determine its repository path and dependency identity.",
    "diagram": {
      "title": "GroupId ArtifactId Version build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "groupId, artifactId and version identify a Maven artifact and determine its repository path and dependency identity.",
          "This capability makes groupid artifactid version repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use GroupId ArtifactId Version in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "groupId, artifactId and version identify a Maven artifact and determine its repository path and dependency identity. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain GroupId ArtifactId Version with a practical Java DevOps example.",
        "answer": "groupId, artifactId and version identify a Maven artifact and determine its repository path and dependency identity. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/dependencies": {
    "summary": "Dependencies declare external libraries required to compile, test or run a Maven project.",
    "diagram": {
      "title": "Dependencies build flow",
      "nodes": [
        "POM dependency declaration",
        "repository resolution",
        "transitive dependency graph",
        "classpath"
      ],
      "explanation": "POM dependency declaration → repository resolution → transitive dependency graph → classpath. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Dependencies declare external libraries required to compile, test or run a Maven project.",
          "This capability makes dependencies repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dependencies in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "POM dependency declaration → repository resolution → transitive dependency graph → classpath. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn dependency:tree",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Dependencies declare external libraries required to compile, test or run a Maven project. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dependencies with a practical Java DevOps example.",
        "answer": "Dependencies declare external libraries required to compile, test or run a Maven project. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/dependency-scopes": {
    "summary": "Dependency scopes control which classpaths and packaging stages include a declared dependency.",
    "diagram": {
      "title": "Dependency Scopes build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Dependency scopes control which classpaths and packaging stages include a declared dependency.",
          "This capability makes dependency scopes repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dependency Scopes in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn dependency:tree -Dverbose",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Dependency scopes control which classpaths and packaging stages include a declared dependency. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dependency Scopes with a practical Java DevOps example.",
        "answer": "Dependency scopes control which classpaths and packaging stages include a declared dependency. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/transitive-dependencies": {
    "summary": "Transitive dependencies are libraries brought in by the dependencies your project directly declares.",
    "diagram": {
      "title": "Transitive Dependencies build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Transitive dependencies are libraries brought in by the dependencies your project directly declares.",
          "This capability makes transitive dependencies repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Transitive Dependencies in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Transitive dependencies are libraries brought in by the dependencies your project directly declares. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Transitive Dependencies with a practical Java DevOps example.",
        "answer": "Transitive dependencies are libraries brought in by the dependencies your project directly declares. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/dependency-management": {
    "summary": "dependencyManagement centralizes dependency versions and configuration for child modules without automatically adding every dependency.",
    "diagram": {
      "title": "Dependency Management build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "dependencyManagement centralizes dependency versions and configuration for child modules without automatically adding every dependency.",
          "This capability makes dependency management repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Dependency Management in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "dependencyManagement centralizes dependency versions and configuration for child modules without automatically adding every dependency. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Dependency Management with a practical Java DevOps example.",
        "answer": "dependencyManagement centralizes dependency versions and configuration for child modules without automatically adding every dependency. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/repositories": {
    "summary": "Maven repositories store and distribute project artifacts and metadata for dependency resolution.",
    "diagram": {
      "title": "Repositories build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven repositories store and distribute project artifacts and metadata for dependency resolution.",
          "This capability makes repositories repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Repositories in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-settings",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven repositories store and distribute project artifacts and metadata for dependency resolution. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Repositories with a practical Java DevOps example.",
        "answer": "Maven repositories store and distribute project artifacts and metadata for dependency resolution. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/local-repository": {
    "summary": "The local repository caches downloaded artifacts and locally installed project packages on a developer or CI machine.",
    "diagram": {
      "title": "Local Repository build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The local repository caches downloaded artifacts and locally installed project packages on a developer or CI machine.",
          "This capability makes local repository repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Local Repository in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:evaluate -Dexpression=settings.localRepository -q -DforceStdout",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The local repository caches downloaded artifacts and locally installed project packages on a developer or CI machine. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Local Repository with a practical Java DevOps example.",
        "answer": "The local repository caches downloaded artifacts and locally installed project packages on a developer or CI machine. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/central-repository": {
    "summary": "Maven Central is a public repository hosting Java libraries and build artifacts.",
    "diagram": {
      "title": "Central Repository build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven Central is a public repository hosting Java libraries and build artifacts.",
          "This capability makes central repository repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Central Repository in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven Central is a public repository hosting Java libraries and build artifacts. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Central Repository with a practical Java DevOps example.",
        "answer": "Maven Central is a public repository hosting Java libraries and build artifacts. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/internal-repository": {
    "summary": "An internal Maven repository manager proxies external repositories and hosts private company artifacts.",
    "diagram": {
      "title": "Internal Repository build flow",
      "nodes": [
        "Maven client",
        "internal repository manager",
        "cache/proxy or hosted artifact",
        "dependency download"
      ],
      "explanation": "Maven client → internal repository manager → cache/proxy or hosted artifact → dependency download. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "An internal Maven repository manager proxies external repositories and hosts private company artifacts.",
          "This capability makes internal repository repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Internal Repository in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Maven client → internal repository manager → cache/proxy or hosted artifact → dependency download. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An internal Maven repository manager proxies external repositories and hosts private company artifacts. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Internal Repository with a practical Java DevOps example.",
        "answer": "An internal Maven repository manager proxies external repositories and hosts private company artifacts. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/build-lifecycle": {
    "summary": "A Maven lifecycle is an ordered sequence of phases that perform project validation, compilation, testing, packaging and installation.",
    "diagram": {
      "title": "Build Lifecycle build flow",
      "nodes": [
        "mvn command",
        "lifecycle phase sequence",
        "bound plugin goals",
        "compiled/tested/package output"
      ],
      "explanation": "mvn command → lifecycle phase sequence → bound plugin goals → compiled/tested/package output. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Maven lifecycle is an ordered sequence of phases that perform project validation, compilation, testing, packaging and installation.",
          "This capability makes build lifecycle repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Build Lifecycle in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "mvn command → lifecycle phase sequence → bound plugin goals → compiled/tested/package output. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Maven lifecycle is an ordered sequence of phases that perform project validation, compilation, testing, packaging and installation. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Build Lifecycle with a practical Java DevOps example.",
        "answer": "A Maven lifecycle is an ordered sequence of phases that perform project validation, compilation, testing, packaging and installation. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/phases-and-goals": {
    "summary": "Lifecycle phases define build stages while plugin goals perform concrete tasks bound to those phases.",
    "diagram": {
      "title": "Phases and Goals build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Lifecycle phases define build stages while plugin goals perform concrete tasks bound to those phases.",
          "This capability makes phases and goals repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Phases and Goals in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:describe -Dcmd=package -Ddetail",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Lifecycle phases define build stages while plugin goals perform concrete tasks bound to those phases. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Phases and Goals with a practical Java DevOps example.",
        "answer": "Lifecycle phases define build stages while plugin goals perform concrete tasks bound to those phases. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/plugins": {
    "summary": "Maven plugins provide goals that perform compilation, testing, packaging, reporting and other build operations.",
    "diagram": {
      "title": "Plugins build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven plugins provide goals that perform compilation, testing, packaging, reporting and other build operations.",
          "This capability makes plugins repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Plugins in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven plugins provide goals that perform compilation, testing, packaging, reporting and other build operations. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Plugins with a practical Java DevOps example.",
        "answer": "Maven plugins provide goals that perform compilation, testing, packaging, reporting and other build operations. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/plugin-configuration": {
    "summary": "Plugin configuration supplies parameters that control how a plugin goal executes.",
    "diagram": {
      "title": "Plugin Configuration build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Plugin configuration supplies parameters that control how a plugin goal executes.",
          "This capability makes plugin configuration repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Plugin Configuration in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Plugin configuration supplies parameters that control how a plugin goal executes. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Plugin Configuration with a practical Java DevOps example.",
        "answer": "Plugin configuration supplies parameters that control how a plugin goal executes. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/maven-profiles": {
    "summary": "Maven profiles activate alternative project configuration based on properties, JDK, OS or explicit activation.",
    "diagram": {
      "title": "Maven Profiles build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven profiles activate alternative project configuration based on properties, JDK, OS or explicit activation.",
          "This capability makes maven profiles repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Profiles in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:active-profiles\nmvn help:all-profiles",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven profiles activate alternative project configuration based on properties, JDK, OS or explicit activation. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Profiles with a practical Java DevOps example.",
        "answer": "Maven profiles activate alternative project configuration based on properties, JDK, OS or explicit activation. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/properties": {
    "summary": "Maven properties define reusable values referenced throughout the POM and plugin configuration.",
    "diagram": {
      "title": "Properties build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven properties define reusable values referenced throughout the POM and plugin configuration.",
          "This capability makes properties repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Properties in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:evaluate -Dexpression=project.version -q -DforceStdout",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven properties define reusable values referenced throughout the POM and plugin configuration. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Properties with a practical Java DevOps example.",
        "answer": "Maven properties define reusable values referenced throughout the POM and plugin configuration. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/multi-module-projects": {
    "summary": "Multi-module Maven projects build related modules together under a parent aggregator POM.",
    "diagram": {
      "title": "Multi-module Projects build flow",
      "nodes": [
        "parent aggregator POM",
        "reactor module graph",
        "module lifecycle execution",
        "module artifacts"
      ],
      "explanation": "parent aggregator POM → reactor module graph → module lifecycle execution → module artifacts. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Multi-module Maven projects build related modules together under a parent aggregator POM.",
          "This capability makes multi-module projects repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Multi-module Projects in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "parent aggregator POM → reactor module graph → module lifecycle execution → module artifacts. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn -pl module-a -am clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Multi-module Maven projects build related modules together under a parent aggregator POM. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Multi-module Projects with a practical Java DevOps example.",
        "answer": "Multi-module Maven projects build related modules together under a parent aggregator POM. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/parent-pom": {
    "summary": "A parent POM centralizes shared dependency, plugin and build configuration inherited by child projects.",
    "diagram": {
      "title": "Parent POM build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A parent POM centralizes shared dependency, plugin and build configuration inherited by child projects.",
          "This capability makes parent pom repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Parent POM in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A parent POM centralizes shared dependency, plugin and build configuration inherited by child projects. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Parent POM with a practical Java DevOps example.",
        "answer": "A parent POM centralizes shared dependency, plugin and build configuration inherited by child projects. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/build-plugins": {
    "summary": "Build plugins add executable tasks to Maven lifecycle phases, such as compiler, resources and packaging operations.",
    "diagram": {
      "title": "Build Plugins build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Build plugins add executable tasks to Maven lifecycle phases, such as compiler, resources and packaging operations.",
          "This capability makes build plugins repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Build Plugins in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn help:effective-pom\nmvn dependency:tree\nmvn clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Build plugins add executable tasks to Maven lifecycle phases, such as compiler, resources and packaging operations. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Build Plugins with a practical Java DevOps example.",
        "answer": "Build plugins add executable tasks to Maven lifecycle phases, such as compiler, resources and packaging operations. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/surefire-plugin": {
    "summary": "Maven Surefire Plugin runs unit tests during the test phase and reports results.",
    "diagram": {
      "title": "Surefire Plugin build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven Surefire Plugin runs unit tests during the test phase and reports results.",
          "This capability makes surefire plugin repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Surefire Plugin in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn test",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven Surefire Plugin runs unit tests during the test phase and reports results. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Surefire Plugin with a practical Java DevOps example.",
        "answer": "Maven Surefire Plugin runs unit tests during the test phase and reports results. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/failsafe-plugin": {
    "summary": "Maven Failsafe Plugin runs integration tests in the integration-test and verify phases.",
    "diagram": {
      "title": "Failsafe Plugin build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven Failsafe Plugin runs integration tests in the integration-test and verify phases.",
          "This capability makes failsafe plugin repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Failsafe Plugin in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven Failsafe Plugin runs integration tests in the integration-test and verify phases. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Failsafe Plugin with a practical Java DevOps example.",
        "answer": "Maven Failsafe Plugin runs integration tests in the integration-test and verify phases. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/packaging": {
    "summary": "Maven packaging creates outputs such as JAR, WAR or other configured artifact types.",
    "diagram": {
      "title": "Packaging build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven packaging creates outputs such as JAR, WAR or other configured artifact types.",
          "This capability makes packaging repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Packaging in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn clean package",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven packaging creates outputs such as JAR, WAR or other configured artifact types. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Packaging with a practical Java DevOps example.",
        "answer": "Maven packaging creates outputs such as JAR, WAR or other configured artifact types. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/maven-wrapper": {
    "summary": "Maven Wrapper pins and bootstraps a project-specific Maven distribution without requiring a global Maven installation.",
    "diagram": {
      "title": "Maven Wrapper build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven Wrapper pins and bootstraps a project-specific Maven distribution without requiring a global Maven installation.",
          "This capability makes maven wrapper repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Wrapper in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "./mvnw -version\n./mvnw clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven Wrapper pins and bootstraps a project-specific Maven distribution without requiring a global Maven installation. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Wrapper with a practical Java DevOps example.",
        "answer": "Maven Wrapper pins and bootstraps a project-specific Maven distribution without requiring a global Maven installation. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/maven-with-jenkins": {
    "summary": "Jenkins pipelines can execute Maven goals to compile, test, package and publish Java artifacts.",
    "diagram": {
      "title": "Maven with Jenkins build flow",
      "nodes": [
        "Git checkout",
        "Jenkins agent with JDK/Maven",
        "mvn verify",
        "test reports and artifact"
      ],
      "explanation": "Git checkout → Jenkins agent with JDK/Maven → mvn verify → test reports and artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins pipelines can execute Maven goals to compile, test, package and publish Java artifacts.",
          "This capability makes maven with jenkins repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven with Jenkins in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git checkout → Jenkins agent with JDK/Maven → mvn verify → test reports and artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "mvn -B -ntp clean verify",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins pipelines can execute Maven goals to compile, test, package and publish Java artifacts. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven with Jenkins with a practical Java DevOps example.",
        "answer": "Jenkins pipelines can execute Maven goals to compile, test, package and publish Java artifacts. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  },
  "maven/maven-troubleshooting": {
    "summary": "Maven troubleshooting checks Java and Maven versions, POM validity, dependency resolution, plugin execution and test failures.",
    "diagram": {
      "title": "Maven Troubleshooting build flow",
      "nodes": [
        "source code + pom.xml",
        "Maven model",
        "dependency and plugin resolution",
        "lifecycle execution",
        "artifact"
      ],
      "explanation": "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven uses project metadata and plugin goals to create a reproducible build; inspect the effective POM and dependency tree when behavior differs from expectation."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven troubleshooting checks Java and Maven versions, POM validity, dependency resolution, plugin execution and test failures.",
          "This capability makes maven troubleshooting repeatable across developer machines and CI agents. Maven standardizes project metadata, dependency resolution and lifecycle execution so teams can reproduce builds and publish traceable artifacts."
        ],
        "bullets": [
          "Keep POM changes in version control.",
          "Pin important plugin and dependency versions.",
          "Use the Maven Wrapper for consistent build tooling."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Troubleshooting in Java application development and CI/CD. A typical pipeline checks out code, runs mvn clean verify, publishes test reports and archives the resulting JAR or WAR only when required checks pass.",
          "Use internal repository managers for private artifacts and controlled dependency proxying in enterprise environments."
        ],
        "bullets": [
          "Development: compile and test locally.",
          "CI: run clean verify on every relevant change.",
          "Release: package, sign and publish versioned artifacts to an approved repository."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "source code + pom.xml → Maven model → dependency and plugin resolution → lifecycle execution → artifact. Maven reads the POM and inherited configuration, resolves dependencies and plugins, then executes goals bound to the requested lifecycle phase. Build results and test reports are written to the target directory.",
          "A successful compile does not prove integration correctness. Run the appropriate test phases and verify the produced artifact and dependency graph."
        ],
        "bullets": [
          "POM defines project metadata and build configuration.",
          "Repositories supply dependencies and plugins.",
          "Lifecycle phases invoke plugin goals.",
          "Artifact coordinates identify the published output."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run these commands from a Java project containing pom.xml. Use the Maven Wrapper when the repository provides it. Inspect dependency and effective-POM output when investigating unexpected versions."
        ],
        "code": "java -version\nmvn -version\nmvn -U -e -X validate",
        "note": "Do not commit repository passwords or tokens in settings.xml. Use CI secret stores and repository-manager credentials with least privilege."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Pin plugin versions, use reproducible dependency versions, enforce checksums and use internal repositories where required. Keep build logs and test reports available for diagnosis and artifact provenance.",
          "Use dependency scanning, license policy and controlled artifact publishing. Build once and promote the same immutable artifact instead of rebuilding separately for each environment."
        ],
        "bullets": [
          "Use mvn clean verify as a standard CI validation baseline.",
          "Use Maven Wrapper to standardize Maven version.",
          "Inspect dependency:tree for transitive conflicts.",
          "Keep credentials in secure settings or CI secrets.",
          "Publish versioned artifacts and retain provenance."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with java -version and mvn -version. Check POM syntax, effective POM, active profiles, dependency tree, repository connectivity and plugin compatibility. Use -e for stack traces and -X only when deeper diagnostics are needed.",
          "For test failures, inspect Surefire or Failsafe reports and reproduce the failing test locally using the same JDK and Maven configuration."
        ],
        "bullets": [
          "Dependency resolution error: verify coordinates, repository URL and credentials.",
          "Plugin error: check plugin version and JDK compatibility.",
          "Compilation failure: inspect compiler release/source/target and JDK version.",
          "Test failure: inspect test reports and environment-dependent assumptions.",
          "Slow build: inspect dependency downloads, caching and parallelism."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven troubleshooting checks Java and Maven versions, POM validity, dependency resolution, plugin execution and test failures. In CI, I would run a controlled Maven lifecycle, verify tests, inspect dependencies and publish an immutable artifact to the repository manager."
        ],
        "bullets": [
          "Explain POM, coordinates and dependency scopes.",
          "Describe lifecycle phases and plugin goals.",
          "Explain local, central and internal repositories."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Troubleshooting with a practical Java DevOps example.",
        "answer": "Maven troubleshooting checks Java and Maven versions, POM validity, dependency resolution, plugin execution and test failures. A team can use this in a Maven project whose POM is version-controlled, validate with clean verify in CI, inspect test reports and publish the versioned artifact to an internal repository."
      },
      {
        "question": "How do you troubleshoot a Maven build failure?",
        "answer": "Verify Java and Maven versions, inspect the POM and effective POM, check active profiles and dependency tree, then validate repository connectivity and plugin versions. For test failures, inspect Surefire/Failsafe reports and reproduce with the same toolchain."
      }
    ],
    "handsOn": [
      "Create a small Java Maven project and inspect pom.xml and effective POM.",
      "Add one dependency and inspect its transitive dependency tree.",
      "Run clean test, package and verify; inspect the target artifact and test reports.",
      "Introduce a safe dependency or test failure, diagnose it and document the fix."
    ]
  }
};
