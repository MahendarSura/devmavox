import type { AtoZLesson } from "../lessons";

export const jenkinsAtoZLessons: Record<string, AtoZLesson> = {
  "jenkins/jenkins-introduction": {
    "summary": "Jenkins is an automation server used to build, test and deliver software through repeatable pipelines.",
    "diagram": {
      "title": "Jenkins Introduction pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins is an automation server used to build, test and deliver software through repeatable pipelines.",
          "This capability helps standardize jenkins introduction across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Jenkins Introduction when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "systemctl status jenkins\njava -version\ncurl -I http://localhost:8080/login",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins is an automation server used to build, test and deliver software through repeatable pipelines. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Jenkins Introduction in Jenkins and how have you used it?",
        "answer": "Jenkins is an automation server used to build, test and deliver software through repeatable pipelines. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Jenkins Introduction; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/jenkins-architecture": {
    "summary": "Jenkins uses a controller to coordinate jobs and agents to execute build workloads.",
    "diagram": {
      "title": "Jenkins Architecture pipeline flow",
      "nodes": [
        "Developer / SCM event",
        "Jenkins controller",
        "queue and scheduler",
        "agent executor",
        "build result"
      ],
      "explanation": "Developer / SCM event → Jenkins controller → queue and scheduler → agent executor → build result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins uses a controller to coordinate jobs and agents to execute build workloads.",
          "This capability helps standardize jenkins architecture across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Jenkins Architecture when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Developer / SCM event → Jenkins controller → queue and scheduler → agent executor → build result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "systemctl status jenkins\ncurl -s http://localhost:8080/api/json?tree=mode,numExecutors",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins uses a controller to coordinate jobs and agents to execute build workloads. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Jenkins Architecture in Jenkins and how have you used it?",
        "answer": "Jenkins uses a controller to coordinate jobs and agents to execute build workloads. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Jenkins Architecture; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/controller-and-agents": {
    "summary": "The controller schedules work and manages configuration while agents provide execution environments for jobs.",
    "diagram": {
      "title": "Controller and Agents pipeline flow",
      "nodes": [
        "SCM trigger",
        "controller queue",
        "agent label match",
        "executor workspace",
        "pipeline step"
      ],
      "explanation": "SCM trigger → controller queue → agent label match → executor workspace → pipeline step. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The controller schedules work and manages configuration while agents provide execution environments for jobs.",
          "This capability helps standardize controller and agents across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Controller and Agents when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM trigger → controller queue → agent label match → executor workspace → pipeline step. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "curl -s http://localhost:8080/computer/api/json?tree=computer[displayName,offline,temporarilyOffline]",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The controller schedules work and manages configuration while agents provide execution environments for jobs. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Controller and Agents in Jenkins and how have you used it?",
        "answer": "The controller schedules work and manages configuration while agents provide execution environments for jobs. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Controller and Agents; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/installation": {
    "summary": "Jenkins installation deploys the automation server with a supported Java runtime, persistent home directory and network access.",
    "diagram": {
      "title": "Installation pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins installation deploys the automation server with a supported Java runtime, persistent home directory and network access.",
          "This capability helps standardize installation across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Installation when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "java -version\nsudo systemctl status jenkins\nsudo journalctl -u jenkins -n 80 --no-pager",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins installation deploys the automation server with a supported Java runtime, persistent home directory and network access. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Installation in Jenkins and how have you used it?",
        "answer": "Jenkins installation deploys the automation server with a supported Java runtime, persistent home directory and network access. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Installation; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/initial-setup-and-security": {
    "summary": "Initial setup establishes the administrator identity, unlock process, plugin baseline and secure access controls.",
    "diagram": {
      "title": "Initial Setup and Security pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Initial setup establishes the administrator identity, unlock process, plugin baseline and secure access controls.",
          "This capability helps standardize initial setup and security across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Initial Setup and Security when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "sudo systemctl status jenkins\nsudo journalctl -u jenkins -n 50 --no-pager",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Initial setup establishes the administrator identity, unlock process, plugin baseline and secure access controls. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Initial Setup and Security in Jenkins and how have you used it?",
        "answer": "Initial setup establishes the administrator identity, unlock process, plugin baseline and secure access controls. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Initial Setup and Security; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/freestyle-jobs": {
    "summary": "Freestyle projects are UI-configured Jenkins jobs that run build steps and post-build actions.",
    "diagram": {
      "title": "Freestyle Jobs pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Freestyle projects are UI-configured Jenkins jobs that run build steps and post-build actions.",
          "This capability helps standardize freestyle jobs across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Freestyle Jobs when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# Inspect the job's Console Output and pipeline stage logs.\n# Verify the agent is online and the required tool is installed.",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Freestyle projects are UI-configured Jenkins jobs that run build steps and post-build actions. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Freestyle Jobs in Jenkins and how have you used it?",
        "answer": "Freestyle projects are UI-configured Jenkins jobs that run build steps and post-build actions. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Freestyle Jobs; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/pipeline-jobs": {
    "summary": "Pipeline jobs execute a version-controlled or configured workflow made of stages and steps.",
    "diagram": {
      "title": "Pipeline Jobs pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Pipeline jobs execute a version-controlled or configured workflow made of stages and steps.",
          "This capability helps standardize pipeline jobs across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pipeline Jobs when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# Inspect the job's Console Output and pipeline stage logs.\n# Verify the agent is online and the required tool is installed.",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Pipeline jobs execute a version-controlled or configured workflow made of stages and steps. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Pipeline Jobs in Jenkins and how have you used it?",
        "answer": "Pipeline jobs execute a version-controlled or configured workflow made of stages and steps. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Pipeline Jobs; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/declarative-pipeline": {
    "summary": "Declarative Pipeline provides a structured Jenkinsfile syntax with pipeline, agent, stages and post sections.",
    "diagram": {
      "title": "Declarative Pipeline pipeline flow",
      "nodes": [
        "pipeline block",
        "agent",
        "stages",
        "steps",
        "post conditions"
      ],
      "explanation": "pipeline block → agent → stages → steps → post conditions. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Declarative Pipeline provides a structured Jenkinsfile syntax with pipeline, agent, stages and post sections.",
          "This capability helps standardize declarative pipeline across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Declarative Pipeline when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "pipeline block → agent → stages → steps → post conditions. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "cat > Jenkinsfile <<'EOF'\npipeline {\n  agent any\n  options { timestamps() }\n  stages {\n    stage('Build') { steps { sh 'make build' } }\n    stage('Test') { steps { sh 'make test' } }\n  }\n  post { always { echo 'Pipeline finished' } }\n}\nEOF",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Declarative Pipeline provides a structured Jenkinsfile syntax with pipeline, agent, stages and post sections. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Declarative Pipeline in Jenkins and how have you used it?",
        "answer": "Declarative Pipeline provides a structured Jenkinsfile syntax with pipeline, agent, stages and post sections. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Declarative Pipeline; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/scripted-pipeline": {
    "summary": "Scripted Pipeline uses Groovy-based flow control for flexible pipeline logic.",
    "diagram": {
      "title": "Scripted Pipeline pipeline flow",
      "nodes": [
        "Groovy script",
        "node allocation",
        "stage blocks",
        "steps",
        "result"
      ],
      "explanation": "Groovy script → node allocation → stage blocks → steps → result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Scripted Pipeline uses Groovy-based flow control for flexible pipeline logic.",
          "This capability helps standardize scripted pipeline across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Scripted Pipeline when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Groovy script → node allocation → stage blocks → steps → result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "node {\n  stage('Build') { sh 'make build' }\n  stage('Test') { sh 'make test' }\n}",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Scripted Pipeline uses Groovy-based flow control for flexible pipeline logic. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Scripted Pipeline in Jenkins and how have you used it?",
        "answer": "Scripted Pipeline uses Groovy-based flow control for flexible pipeline logic. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Scripted Pipeline; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/jenkinsfile": {
    "summary": "A Jenkinsfile stores pipeline definition as code alongside the application repository.",
    "diagram": {
      "title": "Jenkinsfile pipeline flow",
      "nodes": [
        "Git commit",
        "Jenkinsfile checkout",
        "pipeline parser",
        "stages",
        "agents",
        "artifacts"
      ],
      "explanation": "Git commit → Jenkinsfile checkout → pipeline parser → stages → agents → artifacts. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A Jenkinsfile stores pipeline definition as code alongside the application repository.",
          "This capability helps standardize jenkinsfile across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Jenkinsfile when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Git commit → Jenkinsfile checkout → pipeline parser → stages → agents → artifacts. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "cat > Jenkinsfile <<'EOF'\npipeline {\n  agent any\n  stages {\n    stage('Build') { steps { sh 'echo Build started' } }\n    stage('Test') { steps { sh 'echo Tests passed' } }\n  }\n}\nEOF",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A Jenkinsfile stores pipeline definition as code alongside the application repository. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Jenkinsfile in Jenkins and how have you used it?",
        "answer": "A Jenkinsfile stores pipeline definition as code alongside the application repository. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Jenkinsfile; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/pipeline-stages-and-steps": {
    "summary": "Stages group pipeline work into visible phases and steps execute individual operations within those phases.",
    "diagram": {
      "title": "Pipeline Stages and Steps pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Stages group pipeline work into visible phases and steps execute individual operations within those phases.",
          "This capability helps standardize pipeline stages and steps across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pipeline Stages and Steps when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# Inspect the job's Console Output and pipeline stage logs.\n# Verify the agent is online and the required tool is installed.",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Stages group pipeline work into visible phases and steps execute individual operations within those phases. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Pipeline Stages and Steps in Jenkins and how have you used it?",
        "answer": "Stages group pipeline work into visible phases and steps execute individual operations within those phases. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Pipeline Stages and Steps; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/parameters": {
    "summary": "Build parameters allow users or automation to supply validated inputs when starting a job.",
    "diagram": {
      "title": "Parameters pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Build parameters allow users or automation to supply validated inputs when starting a job.",
          "This capability helps standardize parameters across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Parameters when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "parameters { choice(name: 'ENVIRONMENT', choices: ['dev','stage'], description: 'Target environment') }",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Build parameters allow users or automation to supply validated inputs when starting a job. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Parameters in Jenkins and how have you used it?",
        "answer": "Build parameters allow users or automation to supply validated inputs when starting a job. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Parameters; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/environment-variables": {
    "summary": "Jenkins environment variables pass build metadata and configuration to pipeline steps.",
    "diagram": {
      "title": "Environment Variables pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins environment variables pass build metadata and configuration to pipeline steps.",
          "This capability helps standardize environment variables across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Environment Variables when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "sh 'echo BUILD_NUMBER=$BUILD_NUMBER'\nsh 'printenv | sort'",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins environment variables pass build metadata and configuration to pipeline steps. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Environment Variables in Jenkins and how have you used it?",
        "answer": "Jenkins environment variables pass build metadata and configuration to pipeline steps. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Environment Variables; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/credentials-management": {
    "summary": "Jenkins Credentials securely stores secrets and grants jobs controlled access to them.",
    "diagram": {
      "title": "Credentials Management pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins Credentials securely stores secrets and grants jobs controlled access to them.",
          "This capability helps standardize credentials management across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Credentials Management when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# Jenkins UI: Manage Jenkins → Credentials → choose the correct scope\n# Use a credential ID; never print the secret value.",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins Credentials securely stores secrets and grants jobs controlled access to them. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Credentials Management in Jenkins and how have you used it?",
        "answer": "Jenkins Credentials securely stores secrets and grants jobs controlled access to them. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Credentials Management; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/credentials-binding": {
    "summary": "Credentials Binding exposes selected credentials to a build step through scoped environment variables or files.",
    "diagram": {
      "title": "Credentials Binding pipeline flow",
      "nodes": [
        "Jenkins credential store",
        "credential ID lookup",
        "scoped binding",
        "process environment/file",
        "cleanup"
      ],
      "explanation": "Jenkins credential store → credential ID lookup → scoped binding → process environment/file → cleanup. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Credentials Binding exposes selected credentials to a build step through scoped environment variables or files.",
          "This capability helps standardize credentials binding across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Credentials Binding when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Jenkins credential store → credential ID lookup → scoped binding → process environment/file → cleanup. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "withCredentials([string(credentialsId: 'api-token', variable: 'API_TOKEN')]) {\n  sh 'set +x; ./deploy.sh'\n}",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Credentials Binding exposes selected credentials to a build step through scoped environment variables or files. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Credentials Binding in Jenkins and how have you used it?",
        "answer": "Credentials Binding exposes selected credentials to a build step through scoped environment variables or files. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Credentials Binding; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/plugins": {
    "summary": "Plugins extend Jenkins with integrations, build steps, SCM providers and reporting capabilities.",
    "diagram": {
      "title": "Plugins pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Plugins extend Jenkins with integrations, build steps, SCM providers and reporting capabilities.",
          "This capability helps standardize plugins across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Plugins when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# Manage Jenkins → Plugins → Installed\n# Review plugin health, compatibility and update center before upgrades.",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Plugins extend Jenkins with integrations, build steps, SCM providers and reporting capabilities. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Plugins in Jenkins and how have you used it?",
        "answer": "Plugins extend Jenkins with integrations, build steps, SCM providers and reporting capabilities. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Plugins; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/shared-libraries": {
    "summary": "Jenkins Shared Libraries package reusable pipeline code for multiple repositories and teams.",
    "diagram": {
      "title": "Shared Libraries pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins Shared Libraries package reusable pipeline code for multiple repositories and teams.",
          "This capability helps standardize shared libraries across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Shared Libraries when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "@Library('company-ci') _\npipeline { agent any; stages { stage('Build') { steps { buildApp() } } } }",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins Shared Libraries package reusable pipeline code for multiple repositories and teams. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Shared Libraries in Jenkins and how have you used it?",
        "answer": "Jenkins Shared Libraries package reusable pipeline code for multiple repositories and teams. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Shared Libraries; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/build-triggers": {
    "summary": "Build triggers start jobs from schedules, SCM changes, webhooks or upstream pipeline events.",
    "diagram": {
      "title": "Build Triggers pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Build triggers start jobs from schedules, SCM changes, webhooks or upstream pipeline events.",
          "This capability helps standardize build triggers across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Build Triggers when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# Configure job triggers in the job settings or use pipeline triggers.\n# Prefer webhooks over frequent SCM polling where supported.",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Build triggers start jobs from schedules, SCM changes, webhooks or upstream pipeline events. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Build Triggers in Jenkins and how have you used it?",
        "answer": "Build triggers start jobs from schedules, SCM changes, webhooks or upstream pipeline events. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Build Triggers; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/webhooks": {
    "summary": "Webhooks let source-control platforms notify Jenkins about repository events without constant polling.",
    "diagram": {
      "title": "Webhooks pipeline flow",
      "nodes": [
        "SCM push event",
        "webhook endpoint",
        "Jenkins job trigger",
        "checkout exact revision"
      ],
      "explanation": "SCM push event → webhook endpoint → Jenkins job trigger → checkout exact revision. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Webhooks let source-control platforms notify Jenkins about repository events without constant polling.",
          "This capability helps standardize webhooks across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Webhooks when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM push event → webhook endpoint → Jenkins job trigger → checkout exact revision. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "curl -I https://JENKINS_URL/github-webhook/",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Webhooks let source-control platforms notify Jenkins about repository events without constant polling. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Webhooks in Jenkins and how have you used it?",
        "answer": "Webhooks let source-control platforms notify Jenkins about repository events without constant polling. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Webhooks; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/git-integration": {
    "summary": "Git integration checks out source code and provides revision metadata to pipeline jobs.",
    "diagram": {
      "title": "Git Integration pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Git integration checks out source code and provides revision metadata to pipeline jobs.",
          "This capability helps standardize git integration across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Git Integration when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "git rev-parse --short HEAD\ngit status --short",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Git integration checks out source code and provides revision metadata to pipeline jobs. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Git Integration in Jenkins and how have you used it?",
        "answer": "Git integration checks out source code and provides revision metadata to pipeline jobs. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Git Integration; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/maven-integration": {
    "summary": "Maven integration lets Jenkins compile, test and package Java applications using controlled Maven toolchains.",
    "diagram": {
      "title": "Maven Integration pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Maven integration lets Jenkins compile, test and package Java applications using controlled Maven toolchains.",
          "This capability helps standardize maven integration across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Maven Integration when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "mvn -B -ntp clean verify",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Maven integration lets Jenkins compile, test and package Java applications using controlled Maven toolchains. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Maven Integration in Jenkins and how have you used it?",
        "answer": "Maven integration lets Jenkins compile, test and package Java applications using controlled Maven toolchains. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Maven Integration; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/docker-integration": {
    "summary": "Docker integration lets pipelines build, scan, publish and run container images.",
    "diagram": {
      "title": "Docker Integration pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Docker integration lets pipelines build, scan, publish and run container images.",
          "This capability helps standardize docker integration across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Docker Integration when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "docker version\ndocker build -t sample-app:${BUILD_NUMBER} .",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Docker integration lets pipelines build, scan, publish and run container images. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Docker Integration in Jenkins and how have you used it?",
        "answer": "Docker integration lets pipelines build, scan, publish and run container images. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Docker Integration; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/kubernetes-agents": {
    "summary": "Kubernetes agents create ephemeral build Pods on demand for isolated pipeline execution.",
    "diagram": {
      "title": "Kubernetes Agents pipeline flow",
      "nodes": [
        "Jenkins controller",
        "Kubernetes plugin",
        "ephemeral agent Pod",
        "executor",
        "Pod cleanup"
      ],
      "explanation": "Jenkins controller → Kubernetes plugin → ephemeral agent Pod → executor → Pod cleanup. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Kubernetes agents create ephemeral build Pods on demand for isolated pipeline execution.",
          "This capability helps standardize kubernetes agents across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Kubernetes Agents when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Jenkins controller → Kubernetes plugin → ephemeral agent Pod → executor → Pod cleanup. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "kubectl get pods -n jenkins\nkubectl describe pod YOUR_AGENT_POD -n jenkins",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Kubernetes agents create ephemeral build Pods on demand for isolated pipeline execution. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Kubernetes Agents in Jenkins and how have you used it?",
        "answer": "Kubernetes agents create ephemeral build Pods on demand for isolated pipeline execution. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Kubernetes Agents; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/distributed-builds": {
    "summary": "Distributed builds spread job execution across multiple agents to improve capacity and isolation.",
    "diagram": {
      "title": "Distributed Builds pipeline flow",
      "nodes": [
        "Controller queue",
        "agent selection",
        "remote executor",
        "workspace",
        "artifact/result return"
      ],
      "explanation": "Controller queue → agent selection → remote executor → workspace → artifact/result return. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Distributed builds spread job execution across multiple agents to improve capacity and isolation.",
          "This capability helps standardize distributed builds across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Distributed Builds when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "Controller queue → agent selection → remote executor → workspace → artifact/result return. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# Jenkins UI: Manage Jenkins → Nodes\n# Inspect agent labels, executors, online state and disk space.",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Distributed builds spread job execution across multiple agents to improve capacity and isolation. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Distributed Builds in Jenkins and how have you used it?",
        "answer": "Distributed builds spread job execution across multiple agents to improve capacity and isolation. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Distributed Builds; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/artifacts": {
    "summary": "Build artifacts are versioned outputs such as JARs, WARs and container image references produced by a pipeline.",
    "diagram": {
      "title": "Artifacts pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Build artifacts are versioned outputs such as JARs, WARs and container image references produced by a pipeline.",
          "This capability helps standardize artifacts across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Artifacts when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "archiveArtifacts artifacts: 'target/*.jar', fingerprint: true",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Build artifacts are versioned outputs such as JARs, WARs and container image references produced by a pipeline. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Artifacts in Jenkins and how have you used it?",
        "answer": "Build artifacts are versioned outputs such as JARs, WARs and container image references produced by a pipeline. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Artifacts; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/test-reports": {
    "summary": "Test reports publish automated test results so teams can track failures and quality trends.",
    "diagram": {
      "title": "Test Reports pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Test reports publish automated test results so teams can track failures and quality trends.",
          "This capability helps standardize test reports across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Test Reports when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "junit 'target/surefire-reports/*.xml'",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Test reports publish automated test results so teams can track failures and quality trends. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Test Reports in Jenkins and how have you used it?",
        "answer": "Test reports publish automated test results so teams can track failures and quality trends. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Test Reports; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/pipeline-notifications": {
    "summary": "Pipeline notifications communicate build and deployment outcomes to teams or incident systems.",
    "diagram": {
      "title": "Pipeline Notifications pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Pipeline notifications communicate build and deployment outcomes to teams or incident systems.",
          "This capability helps standardize pipeline notifications across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pipeline Notifications when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "post { success { echo 'Build succeeded' }; failure { echo 'Build failed' } }",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Pipeline notifications communicate build and deployment outcomes to teams or incident systems. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Pipeline Notifications in Jenkins and how have you used it?",
        "answer": "Pipeline notifications communicate build and deployment outcomes to teams or incident systems. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Pipeline Notifications; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/backup-and-restore": {
    "summary": "Jenkins backup and restore protects controller configuration, job definitions, credentials metadata and required build records.",
    "diagram": {
      "title": "Backup and Restore pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins backup and restore protects controller configuration, job definitions, credentials metadata and required build records.",
          "This capability helps standardize backup and restore across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Backup and Restore when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "sudo systemctl stop jenkins\nsudo tar -czf jenkins-home-backup.tgz /var/lib/jenkins\nsudo systemctl start jenkins",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins backup and restore protects controller configuration, job definitions, credentials metadata and required build records. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Backup and Restore in Jenkins and how have you used it?",
        "answer": "Jenkins backup and restore protects controller configuration, job definitions, credentials metadata and required build records. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Backup and Restore; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/jenkins-security": {
    "summary": "Jenkins security combines authentication, authorization, CSRF protection, plugin governance and secret hygiene.",
    "diagram": {
      "title": "Jenkins Security pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Jenkins security combines authentication, authorization, CSRF protection, plugin governance and secret hygiene.",
          "This capability helps standardize jenkins security across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Jenkins Security when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# Review Manage Jenkins → Security and Matrix/Role-based authorization.\n# Audit users, agent permissions, script approvals and plugin advisories.",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Jenkins security combines authentication, authorization, CSRF protection, plugin governance and secret hygiene. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Jenkins Security in Jenkins and how have you used it?",
        "answer": "Jenkins security combines authentication, authorization, CSRF protection, plugin governance and secret hygiene. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Jenkins Security; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  },
  "jenkins/pipeline-troubleshooting": {
    "summary": "Pipeline troubleshooting uses console logs, stage results, agent state and dependency checks to isolate failures.",
    "diagram": {
      "title": "Pipeline Troubleshooting pipeline flow",
      "nodes": [
        "SCM event or manual run",
        "Jenkins controller",
        "job queue",
        "agent executor",
        "workspace and result"
      ],
      "explanation": "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. The controller coordinates work while the selected agent executes build steps; stage logs and node status identify failures."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Pipeline troubleshooting uses console logs, stage results, agent state and dependency checks to isolate failures.",
          "This capability helps standardize pipeline troubleshooting across repositories and teams. Pipeline-as-code, repeatable toolchains and controlled credentials make automation reviewable and auditable."
        ],
        "bullets": [
          "Keep build logic in version control where possible.",
          "Separate controller administration from build execution.",
          "Use explicit tool versions and reproducible build environments."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Pipeline Troubleshooting when a software delivery workflow needs this capability. A common DevOps example is a Git push triggering a pipeline that checks out code, builds it, runs tests, publishes artifacts and reports the result.",
          "Use isolated agents for untrusted or resource-heavy workloads; keep production deployment credentials restricted to approved jobs and branches."
        ],
        "bullets": [
          "Development: validate pipeline changes on a test branch.",
          "CI: build and test every relevant commit.",
          "Delivery: promote immutable artifacts after approval and quality checks."
        ]
      },
      {
        "heading": "3. How it works",
        "paragraphs": [
          "SCM event or manual run → Jenkins controller → job queue → agent executor → workspace and result. Jenkins loads the job or Jenkinsfile, allocates an eligible agent, executes steps and records logs and status. Plugins provide integrations but also add compatibility and security responsibilities.",
          "A successful pipeline should prove more than command completion: verify tests, artifact identity, security checks and deployment health where applicable."
        ],
        "bullets": [
          "Controller: schedules and coordinates jobs.",
          "Agent: supplies workspace, tools and executor capacity.",
          "Workspace: temporary checkout and build files.",
          "Artifact: output retained or published for downstream delivery."
        ]
      },
      {
        "heading": "4. Practical example and commands",
        "paragraphs": [
          "Use the following commands or pipeline snippet in a non-production job. Replace example paths, tool names and credential IDs with values configured by your team. Review shell quoting and avoid echoing secret values."
        ],
        "code": "# In a failed job: inspect Console Output and stage logs.\n# On controller: sudo journalctl -u jenkins -n 200 --no-pager",
        "note": "Never store passwords, private keys or tokens in Jenkinsfile source. Use Jenkins Credentials with the narrowest scope and mask output; masking is not a substitute for avoiding secret printing."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Keep Jenkins controller protected and lightly loaded; run builds on agents. Pin and regularly review plugins, back up JENKINS_HOME consistently, and test restoration. Use least-privilege authorization and separate credentials by environment.",
          "For release pipelines, build once and promote the same immutable artifact. Add approvals, test reports, artifact fingerprints, notifications and deployment health checks."
        ],
        "bullets": [
          "Use ephemeral or isolated agents for untrusted jobs.",
          "Restrict script approvals and credential access.",
          "Monitor controller disk, memory, queue depth and agent availability.",
          "Test plugin and Jenkins core upgrades in a staging controller.",
          "Document rollback and backup restoration steps."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with the failed stage and exact console output. Determine whether the issue is controller scheduling, agent availability, workspace permissions, missing tools, SCM authentication, network access or a failing test.",
          "Compare the current build with the last successful build and inspect recent changes to Jenkinsfile, plugins, agent image and credentials configuration."
        ],
        "bullets": [
          "Queue stuck: check labels, executors and offline agents.",
          "Checkout failed: verify repository URL, credential ID and network access.",
          "Command not found: inspect agent image and tool installation.",
          "Permission denied: inspect workspace ownership and execution user.",
          "Plugin error: check compatibility, dependencies and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Pipeline troubleshooting uses console logs, stage results, agent state and dependency checks to isolate failures. In a real CI/CD setup, I would configure it as code, run work on controlled agents, secure credentials, publish traceable artifacts and monitor pipeline results."
        ],
        "bullets": [
          "Explain the controller-agent relationship.",
          "Describe a pipeline from commit to artifact.",
          "Explain how secrets, permissions and failures are handled."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Pipeline Troubleshooting in Jenkins and how have you used it?",
        "answer": "Pipeline troubleshooting uses console logs, stage results, agent state and dependency checks to isolate failures. I would apply it in a version-controlled pipeline, execute on an appropriate agent, record build and test evidence, and ensure only authorized jobs can access deployment credentials."
      },
      {
        "question": "How do you troubleshoot a failed Jenkins pipeline?",
        "answer": "Identify the first failed stage, read its console output, verify controller queue and agent state, check workspace permissions and installed tools, then validate SCM connectivity and credential IDs. Reproduce the command on an equivalent agent and fix the root cause before rerunning."
      }
    ],
    "handsOn": [
      "Create a test Jenkins job to demonstrate Pipeline Troubleshooting; record its configuration and output.",
      "Create a small Jenkinsfile with checkout, build, test and post-result stages.",
      "Intentionally break one safe test command, inspect console output and identify the first failing step.",
      "Write a runbook covering agent prerequisites, credential handling, verification and rollback."
    ]
  }
};
