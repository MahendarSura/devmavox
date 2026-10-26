
'use client';

import { useMemo, useState } from 'react';

type Module = {
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Production';
  duration: string;
  topics: string[];
  outcome: string;
};

const modules: Module[] = [
  {
    title: 'Apache Tomcat Fundamentals',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'What Apache Tomcat is and where it fits in web application hosting',
      'Web server vs application server concepts',
      'Servlet container and Jakarta Servlet fundamentals',
      'Tomcat use cases in Java-based applications',
      'Understand Tomcat versions and Java compatibility',
    ],
    outcome: 'Explain Tomcat architecture and when a Java application needs it.',
  },
  {
    title: 'Java and Web Application Prerequisites',
    level: 'Beginner',
    duration: '1–2 days',
    topics: [
      'JDK and Java runtime fundamentals',
      'Set and verify JAVA_HOME where required',
      'Understand environment variables and PATH',
      'HTTP, HTTPS, DNS and TCP ports',
      'WAR, JAR and EAR packaging concepts',
    ],
    outcome: 'Prepare a system for running a Java web application on Tomcat.',
  },
  {
    title: 'Tomcat Installation and Directory Structure',
    level: 'Beginner',
    duration: '1–2 days',
    topics: [
      'Install Tomcat on a Linux test machine',
      'Understand CATALINA_HOME and CATALINA_BASE',
      'Explore bin, conf, lib, logs, webapps, temp and work',
      'Start and stop Tomcat using supported scripts or service management',
      'Verify installation and review startup logs',
    ],
    outcome: 'Install Tomcat and identify the purpose of its main directories.',
  },
  {
    title: 'Tomcat Configuration',
    level: 'Beginner',
    duration: '1–2 days',
    topics: [
      'Understand server.xml, web.xml and context configuration',
      'Configure connectors and listening ports',
      'Understand Host, Engine, Service and Context',
      'Manage configuration without overwriting required defaults',
      'Validate changes and restart safely',
    ],
    outcome: 'Understand the key configuration files and how they affect Tomcat.',
  },
  {
    title: 'Deploying Java Web Applications',
    level: 'Beginner',
    duration: '2 days',
    topics: [
      'Understand WAR file deployment',
      'Deploy and remove applications using supported methods',
      'Understand automatic deployment and deployment descriptors',
      'Configure application context paths',
      'Verify deployments using HTTP requests and logs',
      'Understand deployment behavior across Tomcat versions',
    ],
    outcome: 'Deploy a Java web application and verify that it responds correctly.',
  },
  {
    title: 'HTTP Connectors and Request Handling',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Understand HTTP and HTTPS connectors',
      'Configure connector ports and connection properties',
      'Understand request threads, connection limits and timeouts',
      'Diagnose port conflicts and connection failures',
      'Review request and access logs',
      'Understand reverse proxy integration',
    ],
    outcome: 'Diagnose common request-handling and connectivity problems.',
  },
  {
    title: 'Application Configuration and Contexts',
    level: 'Intermediate',
    duration: '1–2 days',
    topics: [
      'Configure application context paths',
      'Understand context.xml and application configuration',
      'Externalize environment-specific settings',
      'Manage application resource configuration',
      'Understand class loading and shared libraries',
      'Avoid unsafe configuration changes across applications',
    ],
    outcome: 'Manage application settings without unnecessary application changes.',
  },
  {
    title: 'Logging and Troubleshooting',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Understand catalina and application logs',
      'Configure and interpret access logs',
      'Investigate startup and deployment exceptions',
      'Diagnose HTTP 404, 500 and 503 responses',
      'Investigate Java exceptions and missing dependencies',
      'Correlate request timestamps with application events',
    ],
    outcome: 'Use logs and HTTP behavior to narrow down application failures.',
  },
  {
    title: 'Memory, JVM and Garbage Collection',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Understand heap, stack, metaspace and garbage collection',
      'Configure JVM options using the supported startup environment',
      'Investigate OutOfMemoryError and excessive memory usage',
      'Read thread dumps and heap-dump basics',
      'Monitor garbage collection behavior',
      'Distinguish JVM issues from application memory leaks',
    ],
    outcome: 'Recognize common JVM resource problems affecting Tomcat.',
  },
  {
    title: 'Thread Pools and Performance Tuning',
    level: 'Advanced',
    duration: '2–3 days',
    topics: [
      'Understand request-processing threads and executor configuration',
      'Identify thread saturation and long-running requests',
      'Review connection timeouts and queueing behavior',
      'Measure response time and throughput',
      'Use load tests to establish a baseline',
      'Change tuning parameters incrementally and validate results',
    ],
    outcome: 'Use evidence to investigate performance bottlenecks.',
  },
  {
    title: 'HTTPS and TLS Configuration',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Understand TLS certificates, private keys and certificate chains',
      'Configure HTTPS connectors using supported settings',
      'Understand Java keystores and certificate formats',
      'Troubleshoot expired certificates and hostname mismatches',
      'Plan certificate renewal and secure protocol settings',
      'Consider TLS termination at a reverse proxy or load balancer',
    ],
    outcome: 'Understand secure transport options and common certificate failures.',
  },
  {
    title: 'Tomcat Security Hardening',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Run Tomcat with a dedicated least-privilege operating-system account',
      'Restrict Manager and administrative application access',
      'Remove unused example applications and unnecessary components',
      'Protect configuration files and secret material',
      'Keep Tomcat and Java patched using approved processes',
      'Review security advisories and supported version lifecycles',
    ],
    outcome: 'Create a practical baseline for securing a Tomcat deployment.',
  },
  {
    title: 'Reverse Proxy and Load Balancer Integration',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Place NGINX or Apache HTTP Server in front of Tomcat',
      'Understand forwarding headers and client IP handling',
      'Configure HTTPS termination at the appropriate layer',
      'Understand load-balancing and health-check concepts',
      'Investigate proxy timeout and upstream connection errors',
      'Understand session persistence requirements and trade-offs',
    ],
    outcome: 'Integrate Tomcat into a common production web architecture.',
  },
  {
    title: 'Tomcat as a Linux System Service',
    level: 'Intermediate',
    duration: '1–2 days',
    topics: [
      'Manage Tomcat with systemd where appropriate',
      'Configure service users, environment and startup behavior',
      'Review systemctl status and journal logs',
      'Configure restart policies carefully',
      'Apply file permissions and resource limits',
      'Validate service recovery after a controlled restart',
    ],
    outcome: 'Operate Tomcat consistently through the operating system service manager.',
  },
  {
    title: 'CI/CD with Jenkins and Maven',
    level: 'Advanced',
    duration: '2–3 days',
    topics: [
      'Build a Java web application using Maven',
      'Run automated tests before packaging',
      'Create a versioned WAR artifact',
      'Publish artifacts to a repository',
      'Deploy to a test Tomcat environment from Jenkins',
      'Add health verification, approvals and rollback planning',
    ],
    outcome: 'Understand a repeatable build-and-deploy pipeline for Tomcat applications.',
  },
  {
    title: 'Containers and Tomcat',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Understand official Tomcat container images and supported tags',
      'Build a container image for a Java web application',
      'Copy or package application artifacts into the image',
      'Configure ports, environment variables and health checks',
      'Use logs and container resource limits appropriately',
      'Avoid embedding secrets in image layers',
    ],
    outcome: 'Package and run a Tomcat application in a container environment.',
  },
  {
    title: 'Monitoring and Health Checks',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Monitor process availability and HTTP response health',
      'Understand JMX and its operational security considerations',
      'Track JVM memory, threads and request performance',
      'Integrate suitable metrics with a monitoring platform',
      'Define useful alerts and service-level indicators',
      'Create dashboards and incident runbooks',
    ],
    outcome: 'Build a monitoring approach for application and JVM health.',
  },
  {
    title: 'Production Troubleshooting and Recovery',
    level: 'Production',
    duration: '2–3 days',
    topics: [
      'Investigate failed startups and invalid configuration',
      'Diagnose deployment failures and missing dependencies',
      'Troubleshoot high CPU, memory pressure and thread exhaustion',
      'Investigate 502 and 503 errors through proxy and application layers',
      'Plan rollback, backup and configuration recovery',
      'Capture useful diagnostic evidence before changing production',
    ],
    outcome: 'Use a structured approach to restore service and reduce repeat incidents.',
  },
  {
    title: 'High Availability and Release Management',
    level: 'Production',
    duration: '2–3 days',
    topics: [
      'Understand multiple Tomcat instances behind a load balancer',
      'Plan rolling deployments and health-based traffic removal',
      'Understand session management and external session stores',
      'Manage configuration and artifacts by version',
      'Plan upgrades, compatibility tests and rollback',
      'Document recovery objectives and operational ownership',
    ],
    outcome: 'Plan releases and availability for production Java web services.',
  },
  {
    title: 'Production Readiness and Interview Preparation',
    level: 'Production',
    duration: '2 days',
    topics: [
      'Explain Tomcat architecture and request lifecycle',
      'Compare WAR deployment and container-based deployment',
      'Explain JVM memory, thread pools and connector tuning',
      'Describe HTTPS, reverse proxies and load balancing',
      'Walk through real troubleshooting scenarios',
      'Document architecture, monitoring and recovery procedures',
    ],
    outcome: 'Explain Tomcat operational decisions with practical examples.',
  },
];

const projects = [
  {
    title: 'Project 1 — Deploy a Java Web Application',
    level: 'Beginner',
    details:
      'Install Tomcat on a Linux test server, deploy a sample WAR and verify the application using HTTP requests and logs.',
    deliverable: 'Installation notes, deployment steps and verification results.',
  },
  {
    title: 'Project 2 — Configure HTTPS',
    level: 'Intermediate',
    details:
      'Configure a test HTTPS endpoint using a suitable certificate and document certificate validation and renewal considerations.',
    deliverable: 'Connector configuration and a TLS troubleshooting checklist.',
  },
  {
    title: 'Project 3 — NGINX Reverse Proxy',
    level: 'Advanced',
    details:
      'Place NGINX in front of Tomcat, configure upstream routing and verify application health through the proxy.',
    deliverable: 'Architecture diagram, proxy configuration and test results.',
  },
  {
    title: 'Project 4 — Jenkins to Tomcat CI/CD',
    level: 'Advanced',
    details:
      'Build and test a Java application with Maven, package a WAR, and deploy it to a non-production Tomcat instance.',
    deliverable: 'Pipeline definition, versioned artifact and deployment verification.',
  },
  {
    title: 'Project 5 — Production Monitoring and Recovery',
    level: 'Production',
    details:
      'Monitor HTTP availability and JVM health, define alerts, document common failure scenarios and create a recovery runbook.',
    deliverable: 'Dashboard plan, alert definitions and incident runbook.',
  },
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Production'] as const;

export default function TomcatRoadmapPage() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<(typeof levels)[number]>('All');
  const [completed, setCompleted] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number[]>([0]);

  const filteredModules = useMemo(() => {
    const q = query.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, index }))
      .filter((module) => level === 'All' || module.level === level)
      .filter(
        (module) =>
          !q ||
          module.title.toLowerCase().includes(q) ||
          module.topics.some((topic) => topic.toLowerCase().includes(q)) ||
          module.outcome.toLowerCase().includes(q),
      );
  }, [query, level]);

  const toggleCompleted = (index: number) => {
    setCompleted((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const toggleExpanded = (index: number) => {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const progress = Math.round((completed.length / modules.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/40 p-6 shadow-2xl sm:p-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-300">
              DEVOPS LEARNING ROADMAP
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Beginner to Production
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Apache Tomcat Roadmap
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Learn Java application deployment, Tomcat configuration, JVM
            troubleshooting, security, reverse proxies, CI/CD and production
            operations through a structured learning path.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Learning modules</p>
              <p className="mt-1 text-3xl font-bold">{modules.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Portfolio projects</p>
              <p className="mt-1 text-3xl font-bold">{projects.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Your progress</p>
              <p className="mt-1 text-3xl font-bold">{progress}%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-orange-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
          <h2 className="text-xl font-bold">How to use this roadmap</h2>
          <ol className="mt-3 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
            <li>1. Follow the modules in order, from fundamentals to production.</li>
            <li>2. Practise deployments in a test environment first.</li>
            <li>3. Mark modules complete as you finish learning them.</li>
            <li>4. Build the projects and document your troubleshooting steps.</li>
          </ol>
          <p className="mt-3 text-sm text-slate-400">
            Progress is held in the current page session and may reset when you
            refresh or leave the page.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Learning path</h2>
              <p className="mt-1 text-sm text-slate-400">
                Search concepts or filter by skill level.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search topics..."
                aria-label="Search roadmap topics"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-orange-400 sm:w-64"
              />
              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as (typeof levels)[number])
                }
                aria-label="Filter modules by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-orange-400"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item === 'All' ? 'All levels' : item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {filteredModules.map((module) => {
              const isExpanded = expanded.includes(module.index);
              const isCompleted = completed.includes(module.index);

              return (
                <article
                  key={module.title}
                  className={`overflow-hidden rounded-2xl border bg-slate-900/80 transition ${
                    isCompleted
                      ? 'border-emerald-700/70'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 font-bold text-orange-300">
                        {String(module.index + 1).padStart(2, '0')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold">{module.title}</h3>
                          <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                            {module.level}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">
                          Suggested time: {module.duration}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {module.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => toggleCompleted(module.index)}
                          className="h-4 w-4 accent-emerald-500"
                        />
                        Done
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleExpanded(module.index)}
                        aria-expanded={isExpanded}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-sm transition hover:border-orange-400"
                      >
                        {isExpanded ? 'Hide topics' : 'View topics'}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 bg-slate-950/40 px-5 py-5 sm:pl-20">
                      <h4 className="text-sm font-semibold text-orange-300">
                        Concepts to cover
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex gap-3 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
                <p className="font-semibold">No matching modules</p>
                <p className="mt-2 text-sm text-slate-400">
                  Try another search term or select All levels.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setLevel('All');
                  }}
                  className="mt-4 rounded-lg bg-orange-400 px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12">
          <div>
            <h2 className="text-2xl font-bold">Portfolio projects</h2>
            <p className="mt-1 text-sm text-slate-400">
              Build these after learning the related modules.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold">{project.title}</h3>
                  <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 text-xs text-orange-300">
                    {project.level}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {project.details}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-slate-200">
                    Deliverable:
                  </span>{' '}
                  {project.deliverable}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-orange-400/20 bg-orange-400/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Interview preparation checklist</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Practise explaining each concept with a real example, a failure
            scenario and the steps used to verify the result.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              'Tomcat architecture and servlet container',
              'JAVA_HOME and Tomcat directory structure',
              'WAR deployment and context paths',
              'server.xml and connector configuration',
              'HTTP 404, 500 and 503 troubleshooting',
              'JVM heap, garbage collection and thread dumps',
              'Thread pools and performance bottlenecks',
              'HTTPS, certificates and reverse proxies',
              'Tomcat security hardening',
              'Jenkins and Maven deployment pipeline',
              'Container-based Tomcat deployment',
              'Monitoring, rollback and production recovery',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm text-slate-300"
              >
                <span className="text-orange-300">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-10 border-t border-slate-800 pt-5 text-sm text-slate-500">
          DevMavox · Apache Tomcat Learning Roadmap · Learn, deploy, monitor and improve.
        </footer>
      </div>
    </main>
  );
}
