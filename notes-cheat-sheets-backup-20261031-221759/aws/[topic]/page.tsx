import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_auto_scaling from "../topics/auto-scaling";
import topic_cloudwatch from "../topics/cloudwatch";
import topic_ec2 from "../topics/ec2";
import topic_ecr from "../topics/ecr";
import topic_eks from "../topics/eks";
import topic_fundamentals from "../topics/fundamentals";
import topic_iam from "../topics/iam";
import topic_lambda from "../topics/lambda";
import topic_load_balancers from "../topics/load-balancers";
import topic_networking from "../topics/networking";
import topic_production from "../topics/production";
import topic_rds_databases from "../topics/rds-databases";
import topic_route53 from "../topics/route53";
import topic_s3 from "../topics/s3";
import topic_security_groups_nacls from "../topics/security-groups-nacls";
import topic_security from "../topics/security";
import topic_storage_backup from "../topics/storage-backup";
import topic_vpc from "../topics/vpc";

const topics = {
  "auto-scaling": topic_auto_scaling,
  "cloudwatch": topic_cloudwatch,
  "ec2": topic_ec2,
  "ecr": topic_ecr,
  "eks": topic_eks,
  "fundamentals": topic_fundamentals,
  "iam": topic_iam,
  "lambda": topic_lambda,
  "load-balancers": topic_load_balancers,
  "networking": topic_networking,
  "production": topic_production,
  "rds-databases": topic_rds_databases,
  "route53": topic_route53,
  "s3": topic_s3,
  "security-groups-nacls": topic_security_groups_nacls,
  "security": topic_security,
  "storage-backup": topic_storage_backup,
  "vpc": topic_vpc,
};

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export default async function ToolTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const data = topics[topic as keyof typeof topics];

  if (!data) notFound();

  return (
    <NotesRenderer
      data={data}
      backHref="/notes-cheat-sheets/troubleshooting/aws"
      backLabel="aws Troubleshooting"
    />
  );
}
