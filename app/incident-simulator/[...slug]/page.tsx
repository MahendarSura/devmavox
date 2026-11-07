import FeatureExplorer, { getFeatureStaticParams } from "@/components/devmavox-learning/FeatureExplorer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFeatureStaticParams("incident-simulator");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <FeatureExplorer featureId="incident-simulator" slug={slug} />;
}
