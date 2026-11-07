import FeatureExplorer, { getFeatureStaticParams } from "@/components/devmavox-learning/FeatureExplorer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFeatureStaticParams("devops-knowledge-base");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <FeatureExplorer featureId="devops-knowledge-base" slug={slug} />;
}
