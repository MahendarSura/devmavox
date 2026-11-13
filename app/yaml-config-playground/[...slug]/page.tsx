import YamlConfigWorkbench from "@/components/devmavox-learning/YamlConfigWorkbench";
import { featureCatalog } from "@/components/devmavox-learning/feature-catalog";
import { getFeatureStaticParams } from "@/components/devmavox-learning/FeatureExplorer";

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

  return (
    <YamlConfigWorkbench
      feature={featureCatalog["yaml-config-playground"]}
      slug={slug}
    />
  );
}