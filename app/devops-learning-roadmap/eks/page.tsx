
'use client';

import { useMemo, useState } from 'react';

type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Production';

type Module = {
  id: number;
  title: string;
  level: Level;
  duration: string;
  topics: string[];
  task: string;
};

const modules: Module[] = [
  {
    id: 1,
    title: 'AWS EKS Fundamentals',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['What is Amazon EKS?', 'Managed Kubernetes concepts', 'EKS architecture', 'Control plane and data plane', 'EKS vs self-managed Kubernetes'],
    task: 'Draw an EKS architecture diagram showing the control plane, worker nodes and application Pods.',
  },
  {
    id: 2,
    title: 'AWS Account, IAM and CLI Setup',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['AWS account basics', 'IAM users and roles', 'AWS CLI installation', 'Configure AWS CLI profiles', 'Verify identity using STS'],
    task: 'Configure a development AWS profile and verify the identity with aws sts get-caller-identity.',
  },
  {
    id: 3,
    title: 'VPC and Networking Fundamentals',
    level: 'Beginner',
    duration: '3 hours',
    topics: ['VPC and subnets', 'Public and private subnets', 'Route tables', 'Internet and NAT gateways', 'Security groups'],
    task: 'Design a VPC layout for an EKS cluster with worker nodes in private subnets.',
  },
  {
    id: 4,
    title: 'Create an EKS Cluster',
    level: 'Beginner',
    duration: '3 hours',
    topics: ['EKS cluster prerequisites', 'Cluster networking', 'Control plane configuration', 'Cluster endpoint access', 'Cluster creation options'],
    task: 'Plan a small test EKS cluster and document its networking and access requirements before creating resources.',
  },
  {
    id: 5,
    title: 'EKS Node Groups',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Managed node groups', 'EC2 worker nodes', 'Node IAM role', 'Instance types and scaling', 'Node labels and taints'],
    task: 'Create or simulate a managed node group configuration for a non-production cluster.',
  },
  {
    id: 6,
    title: 'Connect kubectl to EKS',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Update kubeconfig', 'AWS CLI EKS commands', 'kubectl get nodes', 'Kubernetes contexts', 'Troubleshoot access failures'],
    task: 'Configure kubeconfig for a test cluster and verify node and namespace access.',
  },
  {
    id: 7,
    title: 'EKS Authentication and Access',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['IAM authentication', 'EKS access entries', 'Kubernetes RBAC', 'Access policies', 'Least-privilege permissions'],
    task: 'Design separate read-only and deployment access for a development team.',
  },
  {
    id: 8,
    title: 'Deploy Applications on EKS',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Deployments and Pods', 'Services', 'Namespaces', 'Container images', 'Rollout status and rollback'],
    task: 'Deploy a sample application to a test namespace and verify its rollout.',
  },
  {
    id: 9,
    title: 'Load Balancing and Ingress',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['AWS Load Balancer Controller', 'Application Load Balancer', 'Network Load Balancer', 'Ingress resources', 'Target group health checks'],
    task: 'Plan how an application in private EKS subnets can be exposed through a controlled load balancer.',
  },
  {
    id: 10,
    title: 'ECR Container Registry Integration',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Amazon ECR repositories', 'Build and tag images', 'Push images to ECR', 'Image pull permissions', 'Image versioning'],
    task: 'Build a test container image and publish it to a private ECR repository.',
  },
  {
    id: 11,
    title: 'EKS Storage',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['PersistentVolumes and PVCs', 'StorageClasses', 'EBS CSI driver', 'Persistent application data', 'Storage troubleshooting'],
    task: 'Deploy a test workload using persistent storage and verify that data survives Pod recreation.',
  },
  {
    id: 12,
    title: 'Autoscaling and Capacity',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Horizontal Pod Autoscaler', 'Cluster Autoscaler concepts', 'Karpenter concepts', 'Resource requests and limits', 'Node capacity planning'],
    task: 'Design an autoscaling strategy for a workload with changing traffic.',
  },
  {
    id: 13,
    title: 'Helm on EKS',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Install Helm', 'Chart values', 'Release management', 'Helm upgrades and rollback', 'Environment-specific configuration'],
    task: 'Deploy a sample application to a test EKS cluster using a Helm chart.',
  },
  {
    id: 14,
    title: 'EKS with Terraform',
    level: 'Advanced',
    duration: '4 hours',
    topics: ['Terraform AWS provider', 'VPC and EKS modules', 'Managed node groups', 'State management', 'Plan and apply workflow'],
    task: 'Create a Terraform plan for a disposable EKS lab and review costs before applying it.',
  },
  {
    id: 15,
    title: 'CI/CD Deployment to EKS',
    level: 'Production',
    duration: '4 hours',
    topics: ['Jenkins or GitHub Actions', 'Build and test stages', 'Publish images to ECR', 'Deployment credentials', 'Rollout verification'],
    task: 'Design a pipeline that builds an image, publishes it to ECR and deploys to a test EKS cluster.',
  },
  {
    id: 16,
    title: 'Monitoring and Logging',
    level: 'Production',
    duration: '3 hours',
    topics: ['CloudWatch integration', 'Control plane logs', 'Container Insights concepts', 'Prometheus and Grafana', 'Alerting and dashboards'],
    task: 'Define monitoring and alerting for node health, Pod restarts and application availability.',
  },
  {
    id: 17,
    title: 'EKS Security Best Practices',
    level: 'Production',
    duration: '3 hours',
    topics: ['Private cluster networking', 'IAM least privilege', 'Pod security controls', 'Secrets management', 'Network policies and image scanning'],
    task: 'Review a sample cluster design and list improvements for identity, network and workload security.',
  },
  {
    id: 18,
    title: 'EKS Upgrades and Maintenance',
    level: 'Production',
    duration: '3 hours',
    topics: ['Kubernetes version compatibility', 'Control plane upgrades', 'Node group upgrades', 'Add-on compatibility', 'Maintenance planning'],
    task: 'Prepare a version upgrade checklist for a non-production EKS environment.',
  },
  {
    id: 19,
    title: 'Production Troubleshooting',
    level: 'Production',
    duration: '4 hours',
    topics: ['Nodes failing to join', 'CrashLoopBackOff', 'ImagePullBackOff', 'Networking and DNS issues', 'IAM and RBAC errors'],
    task: 'Troubleshoot a simulated workload failure using kubectl events, logs and AWS diagnostics.',
  },
  {
    id: 20,
    title: 'Production Capstone and Interview Prep',
    level: 'Production',
    duration: '4 hours',
    topics: ['Secure EKS architecture', 'Deployment and rollback strategy', 'Autoscaling', 'Monitoring and incident response', 'Cost and reliability review'],
    task: 'Document a production-style EKS architecture with networking, deployment, security, monitoring and recovery plans.',
  },
];

const projects = [
  {
    title: 'Project 1 — First EKS Deployment',
    level: 'Beginner',
    tools: 'AWS EKS, kubectl, Docker',
    details: 'Deploy a sample container application and verify its Pods, Services and rollout status.',
  },
  {
    title: 'Project 2 — ECR to EKS Pipeline',
    level: 'Intermediate',
    tools: 'Amazon ECR, EKS, GitHub Actions or Jenkins',
    details: 'Build an image, publish it to ECR and deploy a versioned image to a test cluster.',
  },
  {
    title: 'Project 3 — Public Application Entry',
    level: 'Intermediate',
    tools: 'EKS, AWS Load Balancer Controller',
    details: 'Expose a test application through a load balancer with health checks and controlled network access.',
  },
  {
    title: 'Project 4 — Infrastructure as Code',
    level: 'Advanced',
    tools: 'Terraform, AWS VPC, EKS',
    details: 'Define reusable infrastructure configuration and document state, access and cleanup procedures.',
  },
  {
    title: 'Project 5 — Production-Ready EKS Design',
    level: 'Advanced',
    tools: 'EKS, IAM, CloudWatch, Prometheus, Grafana',
    details: 'Design a secure and observable cluster with access controls, autoscaling, alerting and recovery procedures.',
  },
];

const interviewQuestions = [
  'What is Amazon EKS?',
  'What is the difference between the EKS control plane and worker nodes?',
  'How do you connect kubectl to an EKS cluster?',
  'How do IAM and Kubernetes RBAC work together?',
  'What are EKS managed node groups?',
  'How does EKS integrate with Amazon ECR?',
  'How can you expose an EKS application using an ALB?',
  'What is the AWS Load Balancer Controller?',
  'How does persistent storage work on EKS?',
  'How do HPA and cluster autoscaling differ?',
  'How do you deploy Helm charts to EKS?',
  'How do you provision EKS using Terraform?',
  'How do you monitor EKS workloads?',
  'How do you troubleshoot nodes that fail to join a cluster?',
  'How do you plan a safe EKS version upgrade?',
];

const levels: Array<'All' | Level> = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Production',
];

export default function EKSRoadmapPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<'All' | Level>('All');
  const [expanded, setExpanded] = useState<number[]>([1]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showProjects, setShowProjects] = useState(true);
  const [showInterview, setShowInterview] = useState(false);

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules.filter((module) => {
      const matchesLevel = level === 'All' || module.level === level;
      const searchableText = [
        module.title,
        module.level,
        ...module.topics,
        module.task,
      ]
        .join(' ')
        .toLowerCase();

      return matchesLevel && searchableText.includes(query);
    });
  }, [search, level]);

  const progress = Math.round((completed.length / modules.length) * 100);

  function toggleExpanded(id: number) {
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleCompleted(id: number) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-orange-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/40 p-6 shadow-2xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              DevOps Learning Roadmap
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Master <span className="text-orange-400">AWS EKS</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Learn managed Kubernetes on AWS, cluster networking, IAM access,
              ECR, Helm, Terraform, CI/CD, monitoring, security and production
              troubleshooting through practical projects.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ['20', 'Learning Modules'],
                ['5', 'Real-World Projects'],
                ['15', 'Interview Questions'],
                ['4', 'Learning Levels'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-3xl font-black text-orange-300">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Your Learning Progress</h2>
              <p className="mt-1 text-sm text-slate-400">
                Mark each module complete after finishing its practical task.
              </p>
            </div>
            <span className="text-2xl font-black text-orange-300">
              {progress}%
            </span>
          </div>

          <div
            className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Learning progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {completed.length} of {modules.length} modules completed. Progress
            lasts only for the current page session and is not saved permanently.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">
                Learning Modules
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Follow the roadmap from AWS fundamentals to production EKS.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search modules or topics..."
                aria-label="Search modules"
                className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition focus:border-orange-400 sm:w-72"
              />

              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as 'All' | Level)
                }
                aria-label="Filter by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-orange-400"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item === 'All' ? 'All Levels' : item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {filteredModules.map((module) => {
              const isExpanded = expanded.includes(module.id);
              const isCompleted = completed.includes(module.id);

              return (
                <article
                  key={module.id}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isCompleted
                      ? 'border-emerald-500/30 bg-emerald-950/10'
                      : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <button
                      type="button"
                      onClick={() => toggleExpanded(module.id)}
                      aria-expanded={isExpanded}
                      className="flex min-w-0 flex-1 items-start gap-4 text-left"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isCompleted
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-orange-400/10 text-orange-300'
                        }`}
                      >
                        {isCompleted ? '✓' : String(module.id).padStart(2, '0')}
                      </span>

                      <span className="min-w-0">
                        <span className="block font-bold text-slate-100">
                          {module.title}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">
                            {module.level}
                          </span>
                          <span className="text-slate-500">
                            {module.duration}
                          </span>
                        </span>
                      </span>
                    </button>

                    <div className="flex items-center gap-3 sm:pl-4">
                      <button
                        type="button"
                        onClick={() => toggleCompleted(module.id)}
                        className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                          isCompleted
                            ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExpanded(module.id)}
                        aria-label={
                          isExpanded ? 'Collapse module' : 'Expand module'
                        }
                        className="rounded-lg px-2 py-2 text-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 px-5 py-5 sm:px-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-orange-300">
                        Topics to Learn
                      </h3>

                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-0.5 text-orange-400">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-xl border border-orange-400/15 bg-orange-400/5 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-orange-300">
                          Hands-on Task
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {module.task}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                <h3 className="font-bold">No modules found</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Try another search term or choose a different level.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setLevel('All');
                  }}
                  className="mt-4 rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-orange-400"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <button
            type="button"
            onClick={() => setShowProjects((value) => !value)}
            aria-expanded={showProjects}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
          >
            <span>
              <span className="block text-2xl font-black">Real-World Projects</span>
              <span className="mt-1 block text-sm text-slate-400">
                Practise AWS Kubernetes deployment workflows.
              </span>
            </span>
            <span className="text-2xl text-orange-300">
              {showProjects ? '−' : '+'}
            </span>
          </button>

          {showProjects && (
            <div className="grid gap-4 border-t border-slate-800 p-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                    {project.level}
                  </span>
                  <h3 className="mt-3 font-bold leading-6">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {project.details}
                  </p>
                  <p className="mt-4 border-t border-slate-800 pt-3 text-xs leading-5 text-slate-500">
                    Tools: {project.tools}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <button
            type="button"
            onClick={() => setShowInterview((value) => !value)}
            aria-expanded={showInterview}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
          >
            <span>
              <span className="block text-2xl font-black">
                Interview Preparation
              </span>
              <span className="mt-1 block text-sm text-slate-400">
                Practise common EKS and Kubernetes interview questions.
              </span>
            </span>
            <span className="text-2xl text-orange-300">
              {showInterview ? '−' : '+'}
            </span>
          </button>

          {showInterview && (
            <ol className="space-y-3 border-t border-slate-800 p-5 sm:p-6">
              {interviewQuestions.map((question, index) => (
                <li
                  key={question}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-xs font-bold text-orange-300">
                    {index + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-orange-400/20 bg-gradient-to-r from-orange-950/30 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-black">
            Ready for Production EKS?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Complete the modules and projects. Practise cluster access,
            deployment troubleshooting, secure networking and monitoring.
            AWS resources can incur charges, so review estimated costs and
            delete disposable lab resources when finished.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setCompleted([]);
                setExpanded([1]);
                setSearch('');
                setLevel('All');
              }}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-orange-400/50"
            >
              Reset Learning Progress
            </button>
            <button
              type="button"
              onClick={() => {
                setCompleted(modules.map((module) => module.id));
                setExpanded([]);
              }}
              className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
            >
              Mark All Complete
            </button>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          DevMavox · AWS EKS Learning Roadmap · Build, Deploy, Scale
        </footer>
      </div>
    </main>
  );
}
