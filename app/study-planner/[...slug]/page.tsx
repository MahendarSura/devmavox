import StudyPlanner from "@/components/devmavox-learning/StudyPlanner";
import { featureCatalog } from "@/components/devmavox-learning/feature-catalog";

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const dynamicParams = false;

export function generateStaticParams() {
  const feature = featureCatalog["study-planner"];
  return feature.categories.flatMap(category => {
    const categorySlug = slugify(category.name);
    return [
      { slug: [categorySlug] },
      ...category.subcategories.flatMap(section => {
        const sectionSlug = slugify(section.name);
        return [
          { slug: [categorySlug, sectionSlug] },
          ...section.topics.map(topic => ({ slug: [categorySlug, sectionSlug, slugify(topic)] })),
        ];
      }),
    ];
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <StudyPlanner slug={slug} />;
}
