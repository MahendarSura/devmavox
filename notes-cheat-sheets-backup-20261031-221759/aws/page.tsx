import Link from "next/link";

const topics = [
  { title: "AWS Auto Scaling", slug: "auto-scaling" },
  { title: "AWS Cloudwatch", slug: "cloudwatch" },
  { title: "AWS Ec2", slug: "ec2" },
  { title: "AWS Ecr", slug: "ecr" },
  { title: "AWS Eks", slug: "eks" },
  { title: "AWS Fundamentals", slug: "fundamentals" },
  { title: "AWS Iam", slug: "iam" },
  { title: "AWS Lambda", slug: "lambda" },
  { title: "AWS Load Balancers", slug: "load-balancers" },
  { title: "AWS Networking", slug: "networking" },
  { title: "AWS Production", slug: "production" },
  { title: "AWS Rds Databases", slug: "rds-databases" },
  { title: "AWS Route53", slug: "route53" },
  { title: "AWS S3", slug: "s3" },
  { title: "AWS Security Groups Nacls", slug: "security-groups-nacls" },
  { title: "AWS Security", slug: "security" },
  { title: "AWS Storage Backup", slug: "storage-backup" },
  { title: "AWS Vpc", slug: "vpc" },
];

export default function ToolTopicsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/notes-cheat-sheets/troubleshooting"
          className="text-sm text-cyan-300 hover:underline"
        >
          ← All Troubleshooting Tools
        </Link>

        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">
          Troubleshooting Notes
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          AWS Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/aws/" + topic.slug}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-cyan-500 hover:bg-slate-800"
            >
              <p className="text-xs text-cyan-400">
                TOPIC {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-cyan-200">
                {topic.title} →
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

