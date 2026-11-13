import YamlConfigWorkbench from "@/components/devmavox-learning/YamlConfigWorkbench";
import { featureCatalog } from "@/components/devmavox-learning/feature-catalog";

export default function Page() {
  return (
    <YamlConfigWorkbench
      feature={featureCatalog["yaml-config-playground"]}
    />
  );
}