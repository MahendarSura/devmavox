import type { AtoZLesson } from "../lessons";

export const nexusAtoZLessons: Record<string, AtoZLesson> = {
  "nexus/artifact-repository-fundamentals": {
    "summary": "An artifact repository stores versioned build outputs and dependencies so teams can share, promote and retrieve trusted software packages.",
    "diagram": {
      "title": "Artifact Repository Fundamentals artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "An artifact repository stores versioned build outputs and dependencies so teams can share, promote and retrieve trusted software packages.",
          "This capability supports artifact repository fundamentals in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Artifact Repository Fundamentals when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An artifact repository stores versioned build outputs and dependencies so teams can share, promote and retrieve trusted software packages. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Artifact Repository Fundamentals with a DevOps pipeline example.",
        "answer": "An artifact repository stores versioned build outputs and dependencies so teams can share, promote and retrieve trusted software packages. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/nexus-repository-introduction": {
    "summary": "Sonatype Nexus Repository is a repository manager for hosting, proxying and grouping software artifacts and package formats.",
    "diagram": {
      "title": "Nexus Repository Introduction artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Sonatype Nexus Repository is a repository manager for hosting, proxying and grouping software artifacts and package formats.",
          "This capability supports nexus repository introduction in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Nexus Repository Introduction when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -fsS http://localhost:8081/service/rest/v1/status",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Sonatype Nexus Repository is a repository manager for hosting, proxying and grouping software artifacts and package formats. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Nexus Repository Introduction with a DevOps pipeline example.",
        "answer": "Sonatype Nexus Repository is a repository manager for hosting, proxying and grouping software artifacts and package formats. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/nexus-architecture": {
    "summary": "Nexus Repository combines repository configuration, blob storage, metadata, security controls and HTTP endpoints.",
    "diagram": {
      "title": "Nexus Architecture artifact flow",
      "nodes": [
        "Maven/npm/Docker client",
        "Nexus repository endpoint",
        "auth and repository routing",
        "blob store and metadata",
        "artifact response"
      ],
      "explanation": "Maven/npm/Docker client → Nexus repository endpoint → auth and repository routing → blob store and metadata → artifact response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Nexus Repository combines repository configuration, blob storage, metadata, security controls and HTTP endpoints.",
          "This capability supports nexus architecture in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Nexus Architecture when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Maven/npm/Docker client → Nexus repository endpoint → auth and repository routing → blob store and metadata → artifact response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Nexus Repository combines repository configuration, blob storage, metadata, security controls and HTTP endpoints. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Nexus Architecture with a DevOps pipeline example.",
        "answer": "Nexus Repository combines repository configuration, blob storage, metadata, security controls and HTTP endpoints. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/installation": {
    "summary": "Nexus installation deploys the repository manager with persistent data storage, JVM resources and secure network access.",
    "diagram": {
      "title": "Installation artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Nexus installation deploys the repository manager with persistent data storage, JVM resources and secure network access.",
          "This capability supports installation in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Installation when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -I http://localhost:8081/\nsystemctl status nexus",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Nexus installation deploys the repository manager with persistent data storage, JVM resources and secure network access. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Installation with a DevOps pipeline example.",
        "answer": "Nexus installation deploys the repository manager with persistent data storage, JVM resources and secure network access. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/repository-types": {
    "summary": "Nexus supports hosted, proxy and group repositories to manage internal packages and external dependency sources.",
    "diagram": {
      "title": "Repository Types artifact flow",
      "nodes": [
        "client request",
        "hosted / proxy / group repository",
        "component lookup or remote fetch",
        "response"
      ],
      "explanation": "client request → hosted / proxy / group repository → component lookup or remote fetch → response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Nexus supports hosted, proxy and group repositories to manage internal packages and external dependency sources.",
          "This capability supports repository types in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Repository Types when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "client request → hosted / proxy / group repository → component lookup or remote fetch → response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Nexus supports hosted, proxy and group repositories to manage internal packages and external dependency sources. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Repository Types with a DevOps pipeline example.",
        "answer": "Nexus supports hosted, proxy and group repositories to manage internal packages and external dependency sources. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/hosted-repositories": {
    "summary": "Hosted repositories store artifacts published by an organization or build pipeline.",
    "diagram": {
      "title": "Hosted Repositories artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Hosted repositories store artifacts published by an organization or build pipeline.",
          "This capability supports hosted repositories in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Hosted Repositories when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Hosted repositories store artifacts published by an organization or build pipeline. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Hosted Repositories with a DevOps pipeline example.",
        "answer": "Hosted repositories store artifacts published by an organization or build pipeline. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/proxy-repositories": {
    "summary": "Proxy repositories cache artifacts from remote repositories and provide controlled access to external dependencies.",
    "diagram": {
      "title": "Proxy Repositories artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Proxy repositories cache artifacts from remote repositories and provide controlled access to external dependencies.",
          "This capability supports proxy repositories in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Proxy Repositories when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Proxy repositories cache artifacts from remote repositories and provide controlled access to external dependencies. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Proxy Repositories with a DevOps pipeline example.",
        "answer": "Proxy repositories cache artifacts from remote repositories and provide controlled access to external dependencies. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/group-repositories": {
    "summary": "Group repositories combine multiple hosted and proxy repositories behind one client-facing endpoint.",
    "diagram": {
      "title": "Group Repositories artifact flow",
      "nodes": [
        "client group URL",
        "member repository search order",
        "hosted/proxy member",
        "artifact result"
      ],
      "explanation": "client group URL → member repository search order → hosted/proxy member → artifact result. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Group repositories combine multiple hosted and proxy repositories behind one client-facing endpoint.",
          "This capability supports group repositories in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Group Repositories when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "client group URL → member repository search order → hosted/proxy member → artifact result. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Group repositories combine multiple hosted and proxy repositories behind one client-facing endpoint. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Group Repositories with a DevOps pipeline example.",
        "answer": "Group repositories combine multiple hosted and proxy repositories behind one client-facing endpoint. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/maven-repositories": {
    "summary": "Maven repositories store POM metadata and Java artifacts addressed through Maven coordinates.",
    "diagram": {
      "title": "Maven Repositories artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven repositories store POM metadata and Java artifacts addressed through Maven coordinates.",
          "This capability supports maven repositories in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Repositories when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven repositories store POM metadata and Java artifacts addressed through Maven coordinates. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Repositories with a DevOps pipeline example.",
        "answer": "Maven repositories store POM metadata and Java artifacts addressed through Maven coordinates. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/npm-repositories": {
    "summary": "npm repositories host private JavaScript packages, proxy public npm packages or group multiple npm sources.",
    "diagram": {
      "title": "npm Repositories artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "npm repositories host private JavaScript packages, proxy public npm packages or group multiple npm sources.",
          "This capability supports npm repositories in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use npm Repositories when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "npm repositories host private JavaScript packages, proxy public npm packages or group multiple npm sources. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain npm Repositories with a DevOps pipeline example.",
        "answer": "npm repositories host private JavaScript packages, proxy public npm packages or group multiple npm sources. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/docker-registries": {
    "summary": "Docker repositories store container image manifests and layers for build and deployment systems.",
    "diagram": {
      "title": "Docker Registries artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker repositories store container image manifests and layers for build and deployment systems.",
          "This capability supports docker registries in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Docker Registries when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker repositories store container image manifests and layers for build and deployment systems. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Docker Registries with a DevOps pipeline example.",
        "answer": "Docker repositories store container image manifests and layers for build and deployment systems. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/raw-repositories": {
    "summary": "Raw repositories store files that do not require a specialized package format.",
    "diagram": {
      "title": "Raw Repositories artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Raw repositories store files that do not require a specialized package format.",
          "This capability supports raw repositories in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Raw Repositories when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Raw repositories store files that do not require a specialized package format. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Raw Repositories with a DevOps pipeline example.",
        "answer": "Raw repositories store files that do not require a specialized package format. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/repository-policies": {
    "summary": "Repository policies control artifact release/snapshot behavior, validation and retention expectations.",
    "diagram": {
      "title": "Repository Policies artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Repository policies control artifact release/snapshot behavior, validation and retention expectations.",
          "This capability supports repository policies in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Repository Policies when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Repository policies control artifact release/snapshot behavior, validation and retention expectations. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Repository Policies with a DevOps pipeline example.",
        "answer": "Repository policies control artifact release/snapshot behavior, validation and retention expectations. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/blob-stores": {
    "summary": "Blob stores hold the binary content of repository assets and are separate from repository metadata.",
    "diagram": {
      "title": "Blob Stores artifact flow",
      "nodes": [
        "repository component metadata",
        "blob store reference",
        "binary asset storage"
      ],
      "explanation": "repository component metadata → blob store reference → binary asset storage. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Blob stores hold the binary content of repository assets and are separate from repository metadata.",
          "This capability supports blob stores in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Blob Stores when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "repository component metadata → blob store reference → binary asset storage. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/blobstores",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Blob stores hold the binary content of repository assets and are separate from repository metadata. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Blob Stores with a DevOps pipeline example.",
        "answer": "Blob stores hold the binary content of repository assets and are separate from repository metadata. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/cleanup-policies": {
    "summary": "Cleanup policies identify obsolete or unused components for storage reclamation according to retention rules.",
    "diagram": {
      "title": "Cleanup Policies artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Cleanup policies identify obsolete or unused components for storage reclamation according to retention rules.",
          "This capability supports cleanup policies in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Cleanup Policies when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Cleanup policies identify obsolete or unused components for storage reclamation according to retention rules. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Cleanup Policies with a DevOps pipeline example.",
        "answer": "Cleanup policies identify obsolete or unused components for storage reclamation according to retention rules. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/repository-routing": {
    "summary": "Repository routing rules restrict which paths or components can be accessed through a repository.",
    "diagram": {
      "title": "Repository Routing artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Repository routing rules restrict which paths or components can be accessed through a repository.",
          "This capability supports repository routing in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Repository Routing when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Repository routing rules restrict which paths or components can be accessed through a repository. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Repository Routing with a DevOps pipeline example.",
        "answer": "Repository routing rules restrict which paths or components can be accessed through a repository. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/user-management": {
    "summary": "User management defines identities that authenticate to Nexus and access repository functions.",
    "diagram": {
      "title": "User Management artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "User management defines identities that authenticate to Nexus and access repository functions.",
          "This capability supports user management in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use User Management when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "User management defines identities that authenticate to Nexus and access repository functions. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain User Management with a DevOps pipeline example.",
        "answer": "User management defines identities that authenticate to Nexus and access repository functions. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/roles-and-privileges": {
    "summary": "Roles and privileges grant fine-grained permissions for repository browsing, publishing and administration.",
    "diagram": {
      "title": "Roles and Privileges artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Roles and privileges grant fine-grained permissions for repository browsing, publishing and administration.",
          "This capability supports roles and privileges in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Roles and Privileges when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Roles and privileges grant fine-grained permissions for repository browsing, publishing and administration. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Roles and Privileges with a DevOps pipeline example.",
        "answer": "Roles and privileges grant fine-grained permissions for repository browsing, publishing and administration. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/ldap-integration": {
    "summary": "LDAP integration connects Nexus authentication to a central directory service.",
    "diagram": {
      "title": "LDAP Integration artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "LDAP integration connects Nexus authentication to a central directory service.",
          "This capability supports ldap integration in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use LDAP Integration when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "LDAP integration connects Nexus authentication to a central directory service. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain LDAP Integration with a DevOps pipeline example.",
        "answer": "LDAP integration connects Nexus authentication to a central directory service. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/ssl-and-certificates": {
    "summary": "SSL and certificates protect repository traffic with TLS and trusted server identity.",
    "diagram": {
      "title": "SSL and Certificates artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "SSL and certificates protect repository traffic with TLS and trusted server identity.",
          "This capability supports ssl and certificates in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use SSL and Certificates when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "SSL and certificates protect repository traffic with TLS and trusted server identity. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain SSL and Certificates with a DevOps pipeline example.",
        "answer": "SSL and certificates protect repository traffic with TLS and trusted server identity. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/uploading-artifacts": {
    "summary": "Uploading artifacts publishes build outputs into hosted repositories using supported clients or APIs.",
    "diagram": {
      "title": "Uploading Artifacts artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Uploading artifacts publishes build outputs into hosted repositories using supported clients or APIs.",
          "This capability supports uploading artifacts in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Uploading Artifacts when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "mvn deploy\n# Configure distributionManagement and credentials in settings.xml",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Uploading artifacts publishes build outputs into hosted repositories using supported clients or APIs. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Uploading Artifacts with a DevOps pipeline example.",
        "answer": "Uploading artifacts publishes build outputs into hosted repositories using supported clients or APIs. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/downloading-dependencies": {
    "summary": "Downloading dependencies retrieves packages from hosted, proxy or group repositories during builds.",
    "diagram": {
      "title": "Downloading Dependencies artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Downloading dependencies retrieves packages from hosted, proxy or group repositories during builds.",
          "This capability supports downloading dependencies in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Downloading Dependencies when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "mvn -U dependency:resolve",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Downloading dependencies retrieves packages from hosted, proxy or group repositories during builds. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Downloading Dependencies with a DevOps pipeline example.",
        "answer": "Downloading dependencies retrieves packages from hosted, proxy or group repositories during builds. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/maven-integration": {
    "summary": "Maven integration configures settings.xml and POM repositories so Maven resolves and deploys artifacts through Nexus.",
    "diagram": {
      "title": "Maven Integration artifact flow",
      "nodes": [
        "Maven settings.xml",
        "Nexus group URL",
        "dependency resolution",
        "hosted release deployment"
      ],
      "explanation": "Maven settings.xml → Nexus group URL → dependency resolution → hosted release deployment. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven integration configures settings.xml and POM repositories so Maven resolves and deploys artifacts through Nexus.",
          "This capability supports maven integration in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Integration when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Maven settings.xml → Nexus group URL → dependency resolution → hosted release deployment. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "mvn -s settings.xml -U clean verify",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven integration configures settings.xml and POM repositories so Maven resolves and deploys artifacts through Nexus. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Maven Integration with a DevOps pipeline example.",
        "answer": "Maven integration configures settings.xml and POM repositories so Maven resolves and deploys artifacts through Nexus. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/npm-integration": {
    "summary": "npm integration configures registry URLs and authentication so JavaScript projects install and publish packages through Nexus.",
    "diagram": {
      "title": "npm Integration artifact flow",
      "nodes": [
        "npm config registry",
        "Nexus npm group/hosted endpoint",
        "package metadata and tarball"
      ],
      "explanation": "npm config registry → Nexus npm group/hosted endpoint → package metadata and tarball. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "npm integration configures registry URLs and authentication so JavaScript projects install and publish packages through Nexus.",
          "This capability supports npm integration in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use npm Integration when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "npm config registry → Nexus npm group/hosted endpoint → package metadata and tarball. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "npm config get registry\nnpm install",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "npm integration configures registry URLs and authentication so JavaScript projects install and publish packages through Nexus. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain npm Integration with a DevOps pipeline example.",
        "answer": "npm integration configures registry URLs and authentication so JavaScript projects install and publish packages through Nexus. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/docker-integration": {
    "summary": "Docker integration configures Docker clients and build pipelines to authenticate and push or pull images from Nexus registries.",
    "diagram": {
      "title": "Docker Integration artifact flow",
      "nodes": [
        "Docker client login",
        "Nexus registry endpoint",
        "image manifest/layers",
        "pull or push"
      ],
      "explanation": "Docker client login → Nexus registry endpoint → image manifest/layers → pull or push. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker integration configures Docker clients and build pipelines to authenticate and push or pull images from Nexus registries.",
          "This capability supports docker integration in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Docker Integration when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Docker client login → Nexus registry endpoint → image manifest/layers → pull or push. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "docker login YOUR_NEXUS_REGISTRY\n docker pull YOUR_NEXUS_REGISTRY/YOUR_IMAGE:TAG",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker integration configures Docker clients and build pipelines to authenticate and push or pull images from Nexus registries. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Docker Integration with a DevOps pipeline example.",
        "answer": "Docker integration configures Docker clients and build pipelines to authenticate and push or pull images from Nexus registries. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/jenkins-integration": {
    "summary": "Jenkins integration publishes build artifacts to Nexus and retrieves dependencies through repository endpoints.",
    "diagram": {
      "title": "Jenkins Integration artifact flow",
      "nodes": [
        "Jenkins build",
        "package artifact",
        "Nexus hosted repository",
        "versioned artifact retrieval"
      ],
      "explanation": "Jenkins build → package artifact → Nexus hosted repository → versioned artifact retrieval. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins integration publishes build artifacts to Nexus and retrieves dependencies through repository endpoints.",
          "This capability supports jenkins integration in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Jenkins Integration when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Jenkins build → package artifact → Nexus hosted repository → versioned artifact retrieval. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "mvn -B -s settings.xml clean deploy",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins integration publishes build artifacts to Nexus and retrieves dependencies through repository endpoints. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Jenkins Integration with a DevOps pipeline example.",
        "answer": "Jenkins integration publishes build artifacts to Nexus and retrieves dependencies through repository endpoints. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/repository-backup": {
    "summary": "Repository backup protects blob data, metadata and configuration using a consistent supported backup strategy.",
    "diagram": {
      "title": "Repository Backup artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Repository backup protects blob data, metadata and configuration using a consistent supported backup strategy.",
          "This capability supports repository backup in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Repository Backup when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Repository backup protects blob data, metadata and configuration using a consistent supported backup strategy. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Repository Backup with a DevOps pipeline example.",
        "answer": "Repository backup protects blob data, metadata and configuration using a consistent supported backup strategy. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/high-availability": {
    "summary": "High availability reduces repository service downtime through supported clustered deployment and resilient storage architecture.",
    "diagram": {
      "title": "High Availability artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "High availability reduces repository service downtime through supported clustered deployment and resilient storage architecture.",
          "This capability supports high availability in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use High Availability when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "High availability reduces repository service downtime through supported clustered deployment and resilient storage architecture. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain High Availability with a DevOps pipeline example.",
        "answer": "High availability reduces repository service downtime through supported clustered deployment and resilient storage architecture. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/security-and-hardening": {
    "summary": "Nexus security hardening protects admin access, anonymous access, credentials, TLS, repository privileges and software supply chain.",
    "diagram": {
      "title": "Security and Hardening artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Nexus security hardening protects admin access, anonymous access, credentials, TLS, repository privileges and software supply chain.",
          "This capability supports security and hardening in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Security and Hardening when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -u USER:PASS http://localhost:8081/service/rest/v1/repositories\n# Check the relevant repository configuration in the Nexus UI.",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Nexus security hardening protects admin access, anonymous access, credentials, TLS, repository privileges and software supply chain. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Security and Hardening with a DevOps pipeline example.",
        "answer": "Nexus security hardening protects admin access, anonymous access, credentials, TLS, repository privileges and software supply chain. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  },
  "nexus/troubleshooting-nexus": {
    "summary": "Nexus troubleshooting checks service health, repository status, authentication, storage, client configuration and request logs.",
    "diagram": {
      "title": "Troubleshooting Nexus artifact flow",
      "nodes": [
        "CI client",
        "Nexus endpoint",
        "authentication and repository policy",
        "metadata/blob storage",
        "package response"
      ],
      "explanation": "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Repository configuration controls package routing while blob storage holds binary content; inspect both service health and client configuration."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Nexus troubleshooting checks service health, repository status, authentication, storage, client configuration and request logs.",
          "This capability supports troubleshooting nexus in a controlled software supply chain. A repository manager reduces direct dependency access, centralizes artifact retention and gives teams a traceable place to publish and promote build outputs."
        ],
        "bullets": [
          "Use immutable versioned artifacts for releases.",
          "Separate release and snapshot policies where relevant.",
          "Keep repository access controlled by role and project ownership."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Troubleshooting Nexus when developers and CI systems need a trusted source for packages, dependencies or container images. A common flow is CI resolving dependencies through a group repository, building an artifact and publishing it to a hosted release repository.",
          "For production, define cleanup and backup policies, secure admin endpoints, and ensure repository availability and storage capacity meet build and deployment needs."
        ],
        "bullets": [
          "Development: resolve dependencies through a configured group endpoint.",
          "CI: publish build outputs to hosted repositories.",
          "Release: promote immutable artifacts and retain provenance."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "CI client → Nexus endpoint → authentication and repository policy → metadata/blob storage → package response. Nexus authenticates the client, applies repository privileges and routes the request to the configured repository. Proxy repositories may retrieve and cache remote content; hosted repositories store internally published assets.",
          "A client can receive 401/403 from authentication or privileges, 404 from coordinates/path mismatch, or 5xx from service/storage problems. Diagnose the layer before changing repository configuration."
        ],
        "bullets": [
          "Hosted: stores internal artifacts.",
          "Proxy: caches remote components.",
          "Group: provides a combined client endpoint.",
          "Blob store: stores binary content referenced by repository metadata."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Run client commands against a lab Nexus instance. Replace endpoints, repository names and credentials with your own values. Use a credential helper or secure settings file instead of putting passwords directly into shell history."
        ],
        "code": "curl -fsS http://localhost:8081/service/rest/v1/status\ncurl -I http://localhost:8081/",
        "note": "Never commit Nexus passwords or tokens. Use least-privilege publishing identities and TLS for client connections."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Separate admin, read and publish roles; disable anonymous access unless deliberately required; enforce TLS; and monitor disk, blob-store capacity, request errors and service health. Use supported backup procedures that keep metadata and blob data consistent.",
          "Proxy only trusted upstreams, review package provenance and retention policies, and avoid overwriting immutable release versions."
        ],
        "bullets": [
          "Use hosted/proxy/group repository patterns intentionally.",
          "Protect blob stores and metadata with tested backups.",
          "Apply cleanup policies only after validating retention requirements.",
          "Use scoped service accounts for CI publishing.",
          "Monitor storage growth, repository status and request logs."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with service health and the exact client response. Check repository URL, format, port, TLS certificate, credentials and role privileges. Then inspect repository status, proxy remote connectivity, blob-store capacity and server request logs.",
          "For Maven/npm/Docker failures, compare the client configuration with the exact repository endpoint and authentication method expected by that package format."
        ],
        "bullets": [
          "401: credentials missing or invalid.",
          "403: authenticated user lacks required privilege.",
          "404: wrong repository, coordinates, tag or path.",
          "Proxy cache miss/failure: verify remote URL, DNS and outbound access.",
          "Upload failure: check hosted repository policy, write privilege and storage capacity."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Nexus troubleshooting checks service health, repository status, authentication, storage, client configuration and request logs. In production, I would use controlled repository types, secure client authentication, immutable artifact versions, retention policies and tested backups."
        ],
        "bullets": [
          "Explain hosted, proxy and group repositories.",
          "Describe how CI publishes and retrieves artifacts.",
          "Explain blob storage, cleanup and access control."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Troubleshooting Nexus with a DevOps pipeline example.",
        "answer": "Nexus troubleshooting checks service health, repository status, authentication, storage, client configuration and request logs. A pipeline can retrieve dependencies through a controlled Nexus endpoint, publish a versioned build output to a hosted repository and later promote that same artifact to deployment environments."
      },
      {
        "question": "How do you troubleshoot a Nexus artifact download or upload failure?",
        "answer": "Verify Nexus health, exact repository URL and package coordinates, then check authentication and role privileges. Inspect repository type and policy, proxy remote connectivity, blob-store capacity and server logs. Confirm the client uses the correct format-specific configuration."
      }
    ],
    "handsOn": [
      "Create a disposable Nexus repository configuration for a package format used in your lab.",
      "Configure a client to download through a group/proxy endpoint and publish a test artifact to a hosted endpoint.",
      "Verify repository metadata and artifact retrieval using the client tool.",
      "Simulate a wrong endpoint or insufficient permission and diagnose the response; document secure credential handling and backup considerations."
    ]
  }
};
