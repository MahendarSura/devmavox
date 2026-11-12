import Link from "next/link";
import type { ArchitectureTopicContent } from "./architecture-topic-content";
import Image from "next/image";
const DEVMAVOX_ARCHITECTURE_IMAGE_MAP: Record<string, string> = {
  "AWS Architecture": "/architecture-diagrams/aws-architecture-visual.svg",
  "Azure Architecture": "/architecture-diagrams/azure-architecture-visual.svg",
  "GCP Architecture": "/architecture-diagrams/gcp-architecture-visual.svg",
  "Hybrid Cloud": "/architecture-diagrams/hybrid-architecture-visual.svg",
  "Multi-Cloud": "/architecture-diagrams/multicloud-architecture-visual.svg",
  "Amazon VPC Architecture": "/architecture-diagrams/vpc-architecture-visual.svg",
  "Public and Private Subnet Architecture": "/architecture-diagrams/public-and-private-subnets-architecture-visual.svg",
  "AWS VPC Route Table Architecture": "/architecture-diagrams/route-tables-architecture-visual.svg",
  "AWS Internet Gateway Architecture": "/architecture-diagrams/internet-gateway-architecture-visual.svg",
  "AWS NAT Gateway Architecture": "/architecture-diagrams/nat-gateway-architecture-visual.svg",
  "Amazon EC2 Compute Architecture": "/architecture-diagrams/ec2-architecture-visual.svg",
  "AWS Application Load Balancer Architecture": "/architecture-diagrams/application-load-balancer-architecture-visual.svg",
  "AWS Auto Scaling Architecture": "/architecture-diagrams/auto-scaling-architecture-visual.svg",
  "Amazon S3 Storage Architecture": "/architecture-diagrams/s3-architecture-visual.svg",
  "Docker Container Architecture": "/architecture-diagrams/docker-architecture-visual.svg",
  "Docker Compose Architecture": "/architecture-diagrams/docker-compose-architecture-visual.svg",
  "Amazon ECS Architecture": "/architecture-diagrams/ecs-architecture-visual.svg",
  "Amazon EKS Architecture": "/architecture-diagrams/eks-architecture-visual.svg",
  "Kubernetes Cluster Architecture": "/architecture-diagrams/kubernetes-architecture-visual.svg",
  "Jenkins CI/CD Architecture": "/architecture-diagrams/jenkins-architecture-visual.svg",
  "GitHub Actions Architecture": "/architecture-diagrams/github-actions-architecture-visual.svg",
  "GitLab CI Architecture": "/architecture-diagrams/gitlab-ci-architecture-visual.svg",
  "Argo CD GitOps Architecture": "/architecture-diagrams/argo-cd-architecture-visual.svg",
  "Terraform Infrastructure as Code Architecture": "/architecture-diagrams/terraform-architecture-visual.svg",
  "Ansible Configuration Management Architecture": "/architecture-diagrams/ansible-architecture-visual.svg",
  "AWS CloudFormation Architecture": "/architecture-diagrams/cloudformation-architecture-visual.svg",
  "Three-Tier Architecture": "/architecture-diagrams/three-tier-architecture-architecture-visual.svg",
  "Microservices": "/architecture-diagrams/microservices-architecture-visual.svg",
  "Serverless": "/architecture-diagrams/serverless-architecture-visual.svg",
  "Event-Driven Architecture": "/architecture-diagrams/event-driven-architecture-architecture-visual.svg",
  "High Availability": "/architecture-diagrams/high-availability-architecture-visual.svg",
  "Disaster Recovery": "/architecture-diagrams/disaster-recovery-architecture-visual.svg",
  "Multi-AZ Architecture": "/architecture-diagrams/multi-az-architecture-visual.svg",
  "Multi-Region Architecture": "/architecture-diagrams/multi-region-architecture-visual.svg",
  "Monitoring Architecture": "/architecture-diagrams/monitoring-architecture-architecture-visual.svg",
  "Logging Architecture": "/architecture-diagrams/logging-architecture-architecture-visual.svg",
  "IAM Architecture": "/architecture-diagrams/iam-architecture-architecture-visual.svg",
  "Network Security": "/architecture-diagrams/network-security-architecture-visual.svg",
};


export default function ArchitectureTopicPage({
  content,
  categoryName,
  subcategoryName,
  categorySlug,
  subcategorySlug
}: {
  content: ArchitectureTopicContent;
  categoryName: string;
  subcategoryName: string;
  categorySlug: string;
  subcategorySlug: string;
}) {
  return (
    <main className="min-h-screen bg-[#080d18] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-slate-400">
          <Link href="/architecture-diagram-library" className="hover:text-cyan-300">
            Architecture Diagram Library
          </Link>
          <span>/</span>
          <Link href={`/architecture-diagram-library/${categorySlug}`} className="hover:text-cyan-300">
            {categoryName}
          </Link>
          <span>/</span>
          <Link href={`/architecture-diagram-library/${categorySlug}/${subcategorySlug}`} className="hover:text-cyan-300">
            {subcategoryName}
          </Link>
          <span>/</span>
          <span className="text-slate-200">{content.title}</span>
        </nav>

        <header className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-[#101a2d] to-cyan-950/30 p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
            DevMavox Architecture Atlas · Production Design
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-3 text-lg font-semibold text-cyan-100">{content.subtitle}</p>
          <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300 sm:text-base">
            {content.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200">
              {content.sections.length} Technical Sections
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
              Production Architecture
            </span>
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-xs text-violet-200">
              Practical Engineering
            </span>
          </div>
        </header>
        <section className="mt-8 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 p-4 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Production architecture diagram
            </p>
            <h2 className="mt-2 text-xl font-bold text-white">
              {content.title} — Component Architecture
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Topic-specific architecture visualization showing the system components and their relationships.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-white p-2 sm:p-4">
            <Image
              src={DEVMAVOX_ARCHITECTURE_IMAGE_MAP[content.title]}
              alt={`${content.title} architecture diagram`}
              width={1600}
              height={1000}
              className="h-auto w-full"
              unoptimized
              priority
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-bold text-white">Learning objectives</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {content.objectives.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
                <span className="font-black text-emerald-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Technical learning path</p>
            <h2 className="mt-2 text-2xl font-black text-white">Architecture deep dive</h2>
          </div>

          <div className="space-y-5">
            {content.sections.map((section, index) => (
              <article key={section.title} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
                <div className="border-b border-slate-800 bg-slate-900 p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                    Technical section {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold leading-8 text-white">{section.title}</h3>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                  <div>
                    <h4 className="text-sm font-bold text-cyan-200">Architecture explanation</h4>
                    <p className="mt-3 text-sm leading-8 text-slate-300">{section.explanation}</p>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
                      <h4 className="font-bold text-white">Component responsibilities</h4>
                      <ul className="mt-3 space-y-3">
                        {section.responsibilities.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-7 text-slate-300">
                            <span className="text-cyan-400">•</span><span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-5">
                      <h4 className="font-bold text-white">Implementation workflow</h4>
                      <ol className="mt-3 space-y-3">
                        {section.implementation.map((item, itemIndex) => (
                          <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                            <span className="font-bold text-cyan-400">{itemIndex + 1}.</span><span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                      <h4 className="font-bold text-emerald-200">Production engineering considerations</h4>
                      <ul className="mt-3 space-y-2">
                        {section.productionConsiderations.map((item) => (
                          <li key={item} className="text-sm leading-7 text-slate-300">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">
                      <h4 className="font-bold text-rose-200">Failure modes to understand</h4>
                      <ul className="mt-3 space-y-2">
                        {section.failureModes.map((item) => (
                          <li key={item} className="text-sm leading-7 text-slate-300">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Hands-on engineering exercise</p>
                    <p className="mt-3 text-sm leading-8 text-slate-200">{section.practicalTask}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-violet-500/25 bg-violet-500/5 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Architecture decision records</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Important design choices</h2>
          <div className="mt-5 space-y-4">
            {content.architectureDecisions.map((item) => (
              <div key={item.decision} className="rounded-xl border border-violet-500/15 bg-slate-950/60 p-4">
                <h3 className="font-bold text-violet-100">{item.decision}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{item.guidance}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Interview preparation</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Architecture questions and answers</h2>
          <div className="mt-5 space-y-4">
            {content.interviewQuestions.map((item, index) => (
              <div key={item.question} className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-xs font-bold text-cyan-400">QUESTION {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-bold leading-7 text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-8 text-slate-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white">Continue learning with DevMavox</h2>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            Use the architecture exercises to create your own diagram, document network boundaries, test failure scenarios and explain design trade-offs as you would in a production engineering review.
          </p>
          <Link
            href={`/architecture-diagram-library/${categorySlug}/${subcategorySlug}`}
            className="mt-5 inline-flex rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
          >
            ← Back to {subcategoryName}
          </Link>
        </footer>
      </div>
    </main>
  );
}

