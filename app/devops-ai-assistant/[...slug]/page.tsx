import FeatureExplorer, { getFeatureStaticParams } from "@/components/devmavox-learning/FeatureExplorer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFeatureStaticParams("devops-ai-assistant");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <FeatureExplorer featureId="devops-ai-assistant" slug={slug} />;
}
