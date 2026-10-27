
export const repositoryOfflineGuide = {
  title: "Nexus Repository Offline",
  technology: "Sonatype Nexus Repository",
  category: "Nexus",
  severity: "High",
  summary:
    "Diagnose and safely recover a Nexus repository that is offline, " +
    "unreachable, unavailable to package clients, or unable to serve artifacts.",

  incidentScenario: {
    title: "Production artifact repository suddenly goes offline",
    symptoms: [
      "Maven, npm, Docker, NuGet, or other package downloads fail.",
      "CI/CD deployments fail because dependencies cannot be downloaded.",
      "Nexus UI shows a repository as Offline.",
      "A proxy repository reports that its remote is unavailable.",
      "Some cached artifacts work, while uncached artifacts fail.",
      "A repository group works for some package paths but fails for others.",
      "Clients receive HTTP 401, 403, 404, 500, 502, or 503 responses.",
      "The Nexus service is running, but one repository is unhealthy."
    ],
    businessImpact: [
      "Build and release pipelines may be blocked.",
      "Production deployments may miss their release windows.",
      "New builds may fail even while existing workloads remain healthy.",
      "Artifact publishing and dependency resolution may be interrupted.",
      "Repeated client retries may increase Nexus and upstream load."
    ],
    initialQuestions: [
      "Is the entire Nexus service unavailable or only one repository?",
      "Is the affected repository hosted, proxy, or group?",
      "Did the issue start after a deployment, configuration change, or upgrade?",
      "Are existing cached artifacts accessible?",
      "Are new artifacts or uncached dependencies failing?",
      "Does the problem affect every client or only one pipeline?",
      "Is the repository explicitly offline or is its upstream remote unavailable?"
    ]
  },

  severityAndImpact: {
    guidance: [
      {
        severity: "SEV-1",
        condition:
          "Organization-wide artifact access is unavailable and critical production releases or recovery activities are blocked."
      },
      {
        severity: "SEV-2",
        condition:
          "A critical repository, package format, or production delivery path is unavailable with no safe workaround."
      },
      {
        severity: "SEV-3",
        condition:
          "One repository or team is affected and an approved alternative exists."
      },
      {
        severity: "SEV-4",
        condition:
          "Intermittent failures or a non-production repository issue with limited impact."
      }
    ],
    rule:
      "Use the organization's incident policy. Severity is based on actual business impact, not only the HTTP status."
  },

  repositoryTypes: {
    hosted: {
      purpose: "Stores internally published artifacts.",
      checks: [
        "Repository online setting.",
        "Blob store health and available storage.",
        "Write permissions and deployment credentials.",
        "Database writability and recent storage errors."
      ]
    },
    proxy: {
      purpose: "Caches artifacts fetched from an upstream repository.",
      checks: [
        "Remote URL and upstream availability.",
        "Remote authentication, TLS, DNS, and egress connectivity.",
        "Manual blocking and automatic blocking configuration.",
        "Cached versus uncached artifact behavior."
      ]
    },
    group: {
      purpose: "Combines member repositories behind one endpoint.",
      checks: [
        "Group online setting.",
        "Group membership and member repository states.",
        "Member order and format-specific behavior.",
        "Whether the requested artifact exists in an accessible member."
      ]
    },
    warning:
      "A proxy remote being unavailable is not necessarily the same as the repository's own Online setting being disabled."
  },

  safetyChecks: [
    "Confirm the correct Nexus instance, environment, repository name, format, and repository URL.",
    "Identify the incident owner and obtain required production approval.",
    "Record incident start time, last known good time, and recent changes.",
    "Do not delete repositories, components, blobs, or database files during initial diagnosis.",
    "Do not disable TLS verification to work around certificate failures.",
    "Do not expose passwords, bearer tokens, Authorization headers, or private artifact URLs in shared logs.",
    "Before changing repository settings, capture the current configuration and relevant audit evidence.",
    "Before restarting Nexus, inspect active builds, service health, database connectivity, and storage health.",
    "Avoid repeated cache invalidation, mass retries, or restarting every node simultaneously.",
    "For HA deployments, identify affected nodes and follow the supported cluster operating procedure."
  ],

  evidenceCollection: {
    collect: [
      "Exact repository name, type, format, and URL.",
      "Nexus version, deployment model, and affected node or pod.",
      "Client error, HTTP status, timestamp, and sanitized request path.",
      "Nexus application logs around the failure window.",
      "Request logs and reverse-proxy or load-balancer logs.",
      "Repository configuration and group membership.",
      "Recent configuration, certificate, network, upgrade, or deployment changes.",
      "Blob store status, filesystem capacity, inode usage, and mount health.",
      "Database status and writable status.",
      "Upstream URL, DNS results, TLS certificate chain, and upstream response.",
      "Pipeline name, affected environment, and failed artifact coordinates."
    ],
    commands: [
      {
        purpose: "Check repository service response",
        command: "curl -sS -o /dev/null -w '%{http_code}\\n' https://nexus.example.com/",
        interpretation:
          "Tests the HTTP endpoint. A response code alone does not prove that the affected repository is healthy."
      },
      {
        purpose: "Check read readiness",
        command: "curl -i https://nexus.example.com/service/rest/v1/status",
        interpretation:
          "A successful response indicates read readiness according to this endpoint; it does not validate every repository."
      },
      {
        purpose: "Check write readiness",
        command: "curl -i https://nexus.example.com/service/rest/v1/status/writable",
        interpretation:
          "Use the writable status endpoint to check whether Nexus is ready for read and write operations."
      },
      {
        purpose: "Inspect filesystem capacity",
        command: "df -h",
        interpretation:
          "Check the data directory, blob-store mounts, and any separate volumes."
      },
      {
        purpose: "Inspect inode capacity",
        command: "df -i",
        interpretation:
          "A filesystem can fail to create files even when its byte capacity appears sufficient."
      },
      {
        purpose: "Inspect mount state",
        command: "findmnt",
        interpretation:
          "Confirm expected filesystems and blob-store mounts are present. Adapt to the host operating system."
      },
      {
        purpose: "Search recent application errors",
        command: "grep -Ei 'error|exception|offline|unavailable|blobstore|database|read-only|no space left' /path/to/nexus-data/log/nexus.log | tail -n 200",
        interpretation:
          "Replace the path with the real Nexus data directory. Review surrounding timestamps and avoid sharing secrets."
      },
      {
        purpose: "Check service state on systemd Linux",
        command: "systemctl status nexus --no-pager",
        interpretation:
          "Use only when Nexus is managed by a systemd service named nexus. Containers and Kubernetes require their own checks."
      }
    ],
    note:
      "Use the actual Nexus base URL, data directory, service name, and access method. Do not assume every installation has the same paths or deployment model."
  },

  diagnosticSequence: [
    {
      step: 1,
      title: "Confirm the failure and scope",
      actions: [
        "Capture one exact failed artifact request.",
        "Record timestamp, client, HTTP status, repository URL, and artifact coordinates.",
        "Test the same artifact from a second authorized client.",
        "Compare the affected repository with a known-good repository."
      ],
      decision: [
        {
          if: "All repositories and the UI fail.",
          then:
            "Investigate the Nexus service, load balancer, DNS, TLS, database, and storage before focusing on a single repository."
        },
        {
          if: "Only one repository fails.",
          then:
            "Continue with repository state, type, configuration, and backing storage."
        },
        {
          if: "Only one client fails.",
          then:
            "Check client credentials, URL, network path, proxy configuration, and client-side cache."
        }
      ]
    },
    {
      step: 2,
      title: "Verify repository state in the UI",
      actions: [
        "Open Settings > Repository > Repositories.",
        "Find the exact repository and confirm its name, format, type, and status.",
        "Inspect the repository configuration and online setting.",
        "For proxy repositories, inspect remote URL and remote availability indicators.",
        "For group repositories, inspect all member repositories."
      ],
      decision: [
        {
          if: "A hosted or group repository is explicitly Offline.",
          then:
            "Find the configuration or administrative action that disabled it. Verify storage and database health before enabling it."
        },
        {
          if: "A proxy is online but remote unavailable or blocked.",
          then:
            "Investigate upstream connectivity, authentication, TLS, and blocking behavior."
        },
        {
          if: "The UI state looks healthy but clients fail.",
          then:
            "Test the exact repository endpoint and inspect request logs, routing, and permissions."
        }
      ]
    },
    {
      step: 3,
      title: "Check recent changes and audit evidence",
      actions: [
        "Review repository configuration changes.",
        "Review administrator activity and audit logs where available.",
        "Check recent upgrades, certificate rotations, firewall changes, and DNS changes.",
        "Compare current configuration with the last known good configuration."
      ],
      decision: [
        {
          if: "A recent change correlates with the first failure.",
          then:
            "Validate the suspected change with evidence and use the approved rollback or correction process."
        },
        {
          if: "No relevant change is found.",
          then:
            "Continue with health, storage, upstream, and runtime checks."
        }
      ]
    },
    {
      step: 4,
      title: "Separate repository status from service health",
      actions: [
        "Check /service/rest/v1/status.",
        "Check /service/rest/v1/status/writable.",
        "Where supported, inspect /service/rest/v1/status/check with an authorized account.",
        "Review health indicators and metrics from the Nexus UI or monitoring platform."
      ],
      decision: [
        {
          if: "Read readiness fails.",
          then:
            "Investigate general service availability, database access, resource pressure, and startup errors."
        },
        {
          if: "Read readiness succeeds but writable readiness fails.",
          then:
            "Investigate database writability, storage exhaustion, and maintenance or freeze conditions."
        },
        {
          if: "Service readiness succeeds but the repository fails.",
          then:
            "Focus on repository configuration, repository type, permissions, member state, or upstream access."
        }
      ],
      caution:
        "Status endpoint availability and behavior can vary by Nexus version. Confirm support and authentication requirements for the installed version."
    },
    {
      step: 5,
      title: "Check disk space, inodes, and filesystem health",
      actions: [
        "Run df -h and df -i on the Nexus host or relevant container mount.",
        "Check the exact data directory and every filesystem-backed blob store.",
        "Verify expected mounts are present and writable by the Nexus operating-system user.",
        "Review kernel, filesystem, and container volume events for I/O errors.",
        "Check cloud object storage health and access if the blob store is remote."
      ],
      decision: [
        {
          if: "Disk is full or inodes are exhausted.",
          then:
            "Stop uncontrolled writes if necessary, expand capacity or perform approved cleanup, and verify safe free space before recovery."
        },
        {
          if: "A blob store failed to initialize or its mount is missing.",
          then:
            "Restore the correct mount or storage configuration. Do not create an empty replacement directory over a missing production mount."
        },
        {
          if: "Storage is healthy.",
          then:
            "Continue to database, permissions, and repository-specific checks."
        }
      ],
      caution:
        "Do not delete files directly from a blob-store directory. Nexus metadata and binary storage must remain consistent. Use supported retention and blob-store maintenance procedures."
    },
    {
      step: 6,
      title: "Check blob-store health",
      actions: [
        "Open Settings > Blob Stores.",
        "Inspect the blob store assigned to the affected repository.",
        "Check its state, available space, and any reported initialization errors.",
        "Review logs for BlobStoreException, permission denied, connection failures, and I/O errors.",
        "For object storage, verify endpoint, credentials, network connectivity, and bucket permissions."
      ],
      decision: [
        {
          if: "The assigned blob store is Failed.",
          then:
            "Resolve the underlying configuration, storage, or access issue before enabling repository writes."
        },
        {
          if: "Only a shared blob store is affected.",
          then:
            "Assess every repository using that blob store and coordinate recovery across all affected teams."
        },
        {
          if: "Blob store health is normal.",
          then:
            "Continue with database and repository configuration checks."
        }
      ]
    },
    {
      step: 7,
      title: "Check database and writable state",
      actions: [
        "Inspect Nexus logs for database connection failures, read-only state, migration errors, or transaction failures.",
        "For PostgreSQL-backed deployments, verify database availability, connectivity, authentication, capacity, and relevant database logs.",
        "For supported embedded-database deployments, inspect Nexus logs and storage health rather than modifying database files directly.",
        "Check whether the writable status endpoint reports failure."
      ],
      decision: [
        {
          if: "Database connectivity or write operations fail.",
          then:
            "Coordinate with the database owner and restore database health before attempting repository writes."
        },
        {
          if: "Database checks pass.",
          then:
            "Continue with proxy remote, credentials, TLS, and client-access checks."
        }
      ],
      caution:
        "Never manually edit Nexus database files or delete database locks as a routine recovery step."
    },
    {
      step: 8,
      title: "Investigate proxy upstream failures",
      appliesTo: "Proxy repositories",
      actions: [
        "Confirm the configured remote URL is correct.",
        "Resolve the upstream hostname from the Nexus runtime environment.",
        "Test TCP connectivity to the upstream host and port.",
        "Inspect TLS certificate validity and trust chain.",
        "Verify upstream authentication, allowlists, rate limits, and egress proxy settings.",
        "Compare a known-good upstream artifact request with the failing request."
      ],
      exampleCommands: [
        "getent hosts repo.example.org",
        "curl -sS -D - -o /dev/null https://repo.example.org/path/to/artifact",
        "openssl s_client -connect repo.example.org:443 -servername repo.example.org"
      ],
      decision: [
        {
          if: "DNS resolution fails.",
          then:
            "Check DNS configuration and resolution from the Nexus runtime, not only from an administrator workstation."
        },
        {
          if: "TLS validation fails.",
          then:
            "Repair the certificate chain, hostname, expiry, or trusted CA configuration. Do not disable certificate verification."
        },
        {
          if: "Upstream returns 401 or 403.",
          then:
            "Verify upstream credentials, permissions, and access policy."
        },
        {
          if: "Upstream returns 429.",
          then:
            "Investigate rate limits and retry behavior. Reduce request amplification and use approved retry/backoff settings."
        },
        {
          if: "Upstream returns 5xx or times out.",
          then:
            "Correlate upstream incidents, proxy logs, and network telemetry. Escalate to the upstream owner if needed."
        },
        {
          if: "Upstream is healthy but Nexus still fails.",
          then:
            "Inspect Nexus proxy configuration, cache behavior, outbound proxy, and repository logs."
        }
      ],
      caution:
        "Use safe test paths and avoid sending credentials in command-line arguments or shared terminal history."
    },
    {
      step: 9,
      title: "Investigate repository groups and client access",
      actions: [
        "Confirm the client uses the intended group or repository URL.",
        "Verify the group contains the expected member repository.",
        "Check the online status of each relevant member.",
        "Check member ordering and package-format-specific behavior.",
        "Confirm the client identity has the required read privilege.",
        "Compare direct member access with group access when policy permits."
      ],
      decision: [
        {
          if: "A direct member works but the group fails.",
          then:
            "Inspect group membership, ordering, configuration, and request routing."
        },
        {
          if: "Administrator access works but client access fails.",
          then:
            "Inspect repository read privileges, content selectors, anonymous access policy, and client credentials."
        },
        {
          if: "Both direct and group access fail.",
          then:
            "Continue with the member repository, storage, upstream, and service-level investigation."
        }
      ]
    },
    {
      step: 10,
      title: "Correlate Nexus logs and HTTP status",
      actions: [
        "Search nexus.log for the exact time window and relevant exception.",
        "Inspect request.log for status codes, request paths, response times, and repeated failures.",
        "Compare Nexus timestamps with CI/CD, reverse-proxy, and upstream timestamps.",
        "Check whether the failure is generated by Nexus, the reverse proxy, the load balancer, or the upstream server.",
        "Enable additional debug logging only for a specific subsystem and only for the minimum required time."
      ],
      httpStatusGuide: [
        {
          status: "401",
          meaning: "Authentication is missing or invalid.",
          action: "Verify the intended client and credentials."
        },
        {
          status: "403",
          meaning: "The request is forbidden by permissions or policy.",
          action: "Inspect roles, privileges, and upstream access policy."
        },
        {
          status: "404",
          meaning: "The path or artifact may be absent, or routing may be incorrect.",
          action: "Verify coordinates, repository URL, upstream path, and repository format."
        },
        {
          status: "429",
          meaning: "A client or upstream service may be rate limiting requests.",
          action: "Reduce request amplification and coordinate with the service owner."
        },
        {
          status: "500",
          meaning: "An internal server error occurred.",
          action: "Correlate Nexus logs with the exact failing request."
        },
        {
          status: "502 or 503",
          meaning: "A proxy, load balancer, service, or upstream may be unavailable.",
          action: "Identify which network hop generated the response."
        }
      ],
      caution:
        "HTTP codes narrow the investigation but do not prove root cause by themselves."
    },
    {
      step: 11,
      title: "Check runtime, containers, and infrastructure",
      actions: [
        "For systemd deployments, inspect service state and recent journal entries.",
        "For Docker, inspect container state, restart count, logs, resource limits, and mounted volumes.",
        "For Kubernetes, inspect pod readiness, events, restarts, service endpoints, PVCs, and network policies.",
        "Check memory, CPU, JVM garbage collection, thread saturation, and request latency.",
        "Check reverse-proxy routes, TLS termination, load-balancer health checks, and DNS records.",
        "For HA, correlate errors across nodes and verify cluster-wide dependencies."
      ],
      exampleCommands: [
        "journalctl -u nexus --since '30 minutes ago' --no-pager",
        "docker ps",
        "docker logs --since 30m <nexus-container>",
        "kubectl get pods -n <namespace> -o wide",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get endpoints -n <namespace>"
      ],
      caution:
        "Use only the commands matching the actual deployment. Redact sensitive output before sharing it."
    },
    {
      step: 12,
      title: "Determine the root cause before changing state",
      actions: [
        "Build a timestamped timeline of the first failure and relevant changes.",
        "Separate confirmed facts from hypotheses.",
        "Map the failure to repository configuration, storage, database, upstream, authorization, or infrastructure.",
        "Identify the smallest corrective action that addresses the confirmed cause.",
        "Record the rollback plan and validation criteria before any production change."
      ],
      exitCriteria: [
        "A specific failing component or configuration is identified.",
        "Supporting logs, status output, or reproducible tests exist.",
        "The proposed fix addresses the observed failure rather than only its symptom.",
        "Required approvals and rollback steps are ready."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Repository setting is Offline",
      likelyCauses: [
        "Manual administrative change",
        "Automation changed repository configuration",
        "Incorrect repository configuration after maintenance"
      ],
      evidence: [
        "Repository settings",
        "Audit history where available",
        "Configuration change timeline"
      ],
      recovery:
        "After confirming storage, database, and policy health, restore the intended setting using an approved change."
    },
    {
      symptom: "Proxy remote unavailable",
      likelyCauses: [
        "Upstream outage",
        "DNS or network failure",
        "TLS trust issue",
        "Invalid upstream credentials",
        "Remote rate limiting"
      ],
      evidence: [
        "Nexus logs",
        "Remote response",
        "DNS and TLS tests from the Nexus runtime",
        "Upstream status and access logs"
      ],
      recovery:
        "Correct the specific upstream or network issue and validate a real dependency request."
    },
    {
      symptom: "Hosted repository cannot accept uploads",
      likelyCauses: [
        "Database not writable",
        "Blob store failure",
        "Disk or inode exhaustion",
        "Insufficient deployment privileges"
      ],
      evidence: [
        "Writable status endpoint",
        "Blob store status",
        "Filesystem metrics",
        "Authentication and authorization logs"
      ],
      recovery:
        "Restore the underlying dependency or permission and verify a controlled upload."
    },
    {
      symptom: "Only group URL fails",
      likelyCauses: [
        "Incorrect group membership",
        "Member repository offline",
        "Incorrect client URL",
        "Access policy differences"
      ],
      evidence: [
        "Group configuration",
        "Member status",
        "Direct-versus-group request comparison",
        "Request logs"
      ],
      recovery:
        "Correct the verified group configuration or member issue and test through the group URL."
    },
    {
      symptom: "Repository appears healthy but requests fail",
      likelyCauses: [
        "Client credentials or permissions",
        "Reverse-proxy routing",
        "Missing artifact",
        "Format-specific path behavior",
        "Intermittent network failures"
      ],
      evidence: [
        "Exact HTTP response",
        "Request logs",
        "Client configuration",
        "Proxy and network telemetry"
      ],
      recovery:
        "Fix the confirmed access or routing issue and test from the original client."
    }
  ],

  recoveryPlan: {
    phase1: [
      "Announce the incident scope and freeze unrelated repository changes.",
      "Preserve logs, timestamps, configuration evidence, and affected artifact paths.",
      "Confirm the actual failure domain and obtain approval for state-changing actions."
    ],
    phase2: [
      "Correct the root cause: upstream connectivity, repository configuration, credentials, storage, database, or infrastructure.",
      "If an explicitly offline repository must be enabled, confirm it is safe and authorized before changing the setting.",
      "If storage is unhealthy, restore storage and database health before re-enabling writes.",
      "If a proxy remote is blocked, correct the upstream issue first and follow the installed version's supported recovery procedure.",
      "Do not repeatedly restart Nexus or invalidate caches as a substitute for root-cause correction."
    ],
    phase3: [
      "Validate the repository state in the UI.",
      "Test read readiness and writable readiness where relevant.",
      "Fetch an existing artifact using an authorized client.",
      "For proxy repositories, test a known cached artifact and a safe known uncached artifact if appropriate.",
      "For hosted repositories, perform an approved test upload only when safe.",
      "For group repositories, validate through the exact group URL.",
      "Monitor request errors, latency, storage, database, and upstream health.",
      "Notify affected teams and document the recovery timestamp."
    ],
    stopConditions: [
      "Blob store remains failed or storage is still read-only.",
      "Database write failures persist.",
      "TLS or authentication controls would need to be bypassed.",
      "The change could cause data loss or break other repositories sharing the same storage.",
      "The recovery action is not authorized or the rollback path is unknown."
    ]
  },

  prevention: {
    monitoring: [
      "Alert on repository availability and sustained artifact request failures.",
      "Monitor read and writable status endpoints separately.",
      "Track blob-store state, free disk space, inode usage, and storage latency.",
      "Monitor upstream availability, DNS, TLS expiry, rate limits, and response latency.",
      "Track HTTP 401, 403, 429, 5xx rates and artifact download latency.",
      "Alert on unexpected repository configuration changes.",
      "Monitor database health, service restarts, JVM pressure, and container readiness."
    ],
    operationalControls: [
      "Maintain a tested Nexus recovery runbook.",
      "Restrict repository administration to approved roles.",
      "Review configuration changes and maintain an auditable change trail.",
      "Test upgrades and configuration changes in non-production first.",
      "Validate external storage mounts and database connectivity after maintenance.",
      "Use supported cleanup and retention policies instead of direct blob deletion.",
      "Document repository ownership, upstream contacts, and critical dependencies.",
      "Run periodic incident exercises for proxy outages and storage failures."
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    recoveryTimeUtc: "",
    affectedEnvironment: "",
    nexusVersion: "",
    affectedRepositories: [],
    repositoryTypes: [],
    affectedTeamsAndPipelines: [],
    customerImpact: "",
    observedHttpStatuses: [],
    timeline: [],
    rootCause: "",
    supportingEvidence: [],
    correctiveAction: "",
    recoveryValidation: [],
    preventionActions: [],
    actionOwners: [],
    followUpDates: []
  },

  handsOnLabs: [
    {
      title: "Lab 1: Explicitly offline hosted repository",
      objective:
        "Distinguish repository configuration state from Nexus service health.",
      tasks: [
        "Use a disposable test instance.",
        "Inspect the repository's current status.",
        "Capture read and writable readiness.",
        "Change the setting only in the test environment.",
        "Verify repository access and document the result."
      ]
    },
    {
      title: "Lab 2: Proxy upstream outage simulation",
      objective:
        "Identify remote connectivity failures without confusing them with repository offline state.",
      tasks: [
        "Use a disposable proxy repository and controlled test upstream.",
        "Simulate an upstream failure without modifying production DNS or firewall rules.",
        "Capture Nexus logs and the remote HTTP response.",
        "Restore the test upstream and verify artifact retrieval."
      ]
    },
    {
      title: "Lab 3: Storage pressure investigation",
      objective:
        "Recognize disk and inode exhaustion signals safely.",
      tasks: [
        "Use a test filesystem with a limited capacity.",
        "Observe filesystem and Nexus health indicators.",
        "Practice approved capacity remediation.",
        "Verify recovery without deleting blob files manually."
      ]
    },
    {
      title: "Lab 4: Group member failure",
      objective:
        "Compare direct member access with group access.",
      tasks: [
        "Create a test group with disposable repositories.",
        "Record group membership and member states.",
        "Simulate one member issue.",
        "Validate the group endpoint after correcting the test configuration."
      ]
    },
    {
      title: "Lab 5: Incident timeline and root cause",
      objective:
        "Build an evidence-based production incident report.",
      tasks: [
        "Collect synthetic request logs, status responses, and configuration changes.",
        "Create a timestamped timeline.",
        "Separate confirmed facts from hypotheses.",
        "Write a corrective action and measurable prevention plan."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "Does a Nexus repository being offline mean the entire Nexus service is down?",
      answer:
        "No. Repository state, service readiness, and proxy upstream availability are separate conditions."
    },
    {
      question: "How do you distinguish an offline proxy repository from an unavailable upstream?",
      answer:
        "Inspect the repository's own online setting, remote availability indicators, Nexus logs, and upstream connectivity from the Nexus runtime."
    },
    {
      question: "Why check read readiness and writable readiness separately?",
      answer:
        "The service may respond to read requests while being unable to accept writes."
    },
    {
      question: "Why should you avoid deleting files directly from a blob store?",
      answer:
        "Nexus manages artifact binaries and metadata together; manual deletion can create inconsistent or inaccessible content."
    },
    {
      question: "What evidence supports enabling an offline repository?",
      answer:
        "Confirmed intended configuration, identified cause, healthy backing services, approval, a rollback plan, and a validation procedure."
    },
    {
      question: "What is your first step when only one repository fails?",
      answer:
        "Capture the exact failing request and verify repository type, state, URL, and scope before changing configuration."
    },
    {
      question: "How do you prove recovery?",
      answer:
        "Validate repository state, perform real client requests, test relevant read/write paths, and confirm error rates return to normal."
    }
  ],

  completionChecklist: [
    "Incident scope and severity are documented.",
    "Correct Nexus instance and repository are confirmed.",
    "Repository type, state, and configuration are verified.",
    "Logs and request evidence are preserved.",
    "Database, blob store, disk, and inode health are checked.",
    "Proxy upstream, TLS, DNS, and credentials are checked where relevant.",
    "Group membership and access privileges are checked where relevant.",
    "Root cause is supported by evidence.",
    "Corrective action and rollback plan are approved.",
    "Repository and client-level recovery tests pass.",
    "Monitoring confirms stable recovery.",
    "Incident report and prevention actions have owners."
  ],

  officialReferences: [
    {
      title: "Sonatype Repository Management",
      url: "https://help.sonatype.com/en/repository-management.html"
    },
    {
      title: "Sonatype Blob Stores",
      url: "https://help.sonatype.com/en/blob-stores.html"
    },
    {
      title: "Sonatype Logging",
      url: "https://help.sonatype.com/en/logging.html"
    },
    {
      title: "Nexus Repository System Requirements",
      url: "https://help.sonatype.com/en/sonatype-nexus-repository-system-requirements.html"
    },
    {
      title: "Nexus Repository API Reference",
      url: "https://help.sonatype.com/en/api-reference.html"
    },
    {
      title: "System Status and Metrics REST API",
      url: "https://support.sonatype.com/hc/en-us/articles/226254487-System-Status-and-Metrics-REST-API-for-Sonatype-Nexus-Repository"
    },
    {
      title: "Sonatype Troubleshooting Articles",
      url: "https://support.sonatype.com/hc/en-us/sections/203012768-Troubleshooting"
    }
  ]
} as const;

export default repositoryOfflineGuide;
