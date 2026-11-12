import { SectionedLearningPage } from "../../components/devmavox-learning/SectionedLearningPage";
import { featureSections } from "../../components/devmavox-learning/feature-sections";

export default function Page() {
  return (
    <SectionedLearningPage
      config={featureSections["daily-devops-challenge"]}
    />
  );
}
