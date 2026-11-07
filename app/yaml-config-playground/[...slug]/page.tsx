import FeatureExplorer, { getFeatureStaticParams } from "@/components/devmavox-learning/FeatureExplorer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getFeatureStaticParams("yaml-config-playground");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <FeatureExplorer featureId="yaml-config-playground" slug={slug} />;
}
