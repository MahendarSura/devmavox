import PortfolioStudio from "@/components/devmavox-learning/PortfolioStudio";

export const dynamicParams = false;

const categories = [
  ["profile", "professional-introduction", ["professional-summary", "career-objective"]],
  ["skills", "technical-skills", ["cloud-skills", "devops-skills", "programming-skills", "automation-skills"]],
  ["projects", "project-presentation", ["project-overview", "architecture", "responsibilities"]],
  ["project-evidence", "proof-of-work", ["github-repositories", "screenshots", "architecture-diagrams", "documentation"]],
  ["achievements", "professional-achievements", ["certifications", "open-source-contributions"]],
  ["case-studies", "project-case-studies", ["problem-statement", "solution", "results-and-impact"]],
  ["resume", "resume-preparation", ["resume-structure", "skills-section", "experience-section"]],
  ["portfolio-output", "portfolio-publishing", ["portfolio-preview", "export-portfolio", "share-portfolio"]],
];

export function generateStaticParams() {
  return categories.flatMap(([category, section, topics]) => [
    { slug: [category as string] },
    { slug: [category as string, section as string] },
    ...(topics as string[]).map((topic) => ({ slug: [category as string, section as string, topic] })),
  ]);
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <PortfolioStudio slug={slug} />;
}
