import YamlConfigWorkbench from "./YamlConfigWorkbench";
import Link from "next/link";
import ArchitectureTopicPage from "./ArchitectureTopicPage";
import { getArchitectureTopic } from "./architecture-topic-content";
import { notFound } from "next/navigation";
import {
  featureCatalog,
  type FeatureDefinition,
  type FeatureCategory,
  type FeatureSubcategory,
} from "./feature-catalog";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function topicCount(category: FeatureCategory) {
  return category.subcategories.reduce((sum, item) => sum + item.topics.length, 0);
}

function featureTheme(style: string) {
  const themes: Record<string, { accent: string; panel: string; badge: string; icon: string }> = {
    atlas: { accent: "text-cyan-300", panel: "border-cyan-500/30", badge: "bg-cyan-400/10 text-cyan-200", icon: "◈" },
    editor: { accent: "text-violet-300", panel: "border-violet-500/30", badge: "bg-violet-400/10 text-violet-200", icon: "{ }" },
    terminal: { accent: "text-emerald-300", panel: "border-emerald-500/30", badge: "bg-emerald-400/10 text-emerald-200", icon: ">_" },
    incident: { accent: "text-rose-300", panel: "border-rose-500/30", badge: "bg-rose-400/10 text-rose-200", icon: "!" },
    finance: { accent: "text-amber-300", panel: "border-amber-500/30", badge: "bg-amber-400/10 text-amber-200", icon: "$" },
    git: { accent: "text-orange-300", panel: "border-orange-500/30", badge: "bg-orange-400/10 text-orange-200", icon: "⑂" },
    observability: { accent: "text-sky-300", panel: "border-sky-500/30", badge: "bg-sky-400/10 text-sky-200", icon: "⌁" },
    knowledge: { accent: "text-indigo-300", panel: "border-indigo-500/30", badge: "bg-indigo-400/10 text-indigo-200", icon: "▤" },
    portfolio: { accent: "text-fuchsia-300", panel: "border-fuchsia-500/30", badge: "bg-fuchsia-400/10 text-fuchsia-200", icon: "▣" },
    planner: { accent: "text-teal-300", panel: "border-teal-500/30", badge: "bg-teal-400/10 text-teal-200", icon: "✓" },
    career: { accent: "text-blue-300", panel: "border-blue-500/30", badge: "bg-blue-400/10 text-blue-200", icon: "↗" },
    assistant: { accent: "text-purple-300", panel: "border-purple-500/30", badge: "bg-purple-400/10 text-purple-200", icon: "✳" },
    challenge: { accent: "text-lime-300", panel: "border-lime-500/30", badge: "bg-lime-400/10 text-lime-200", icon: "⚑" },
    matrix: { accent: "text-cyan-300", panel: "border-cyan-500/30", badge: "bg-cyan-400/10 text-cyan-200", icon: "▦" },
    security: { accent: "text-red-300", panel: "border-red-500/30", badge: "bg-red-400/10 text-red-200", icon: "⬡" },
  };

  return themes[style] ?? themes.knowledge;
}

function PageFrame({
  feature,
  eyebrow,
  title,
  description,
  children,
}: {
  feature: FeatureDefinition;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const theme = featureTheme(feature.style);

  return (
    <main className="min-h-screen bg-[#080d18] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-sm text-slate-400 transition hover:text-white">
            ← DevMavox Home
          </Link>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${theme.panel} ${theme.badge}`}>
            {theme.icon} {feature.label}
          </span>
        </div>

        <header className={`relative mb-8 overflow-hidden rounded-3xl border ${theme.panel} bg-gradient-to-br from-slate-900 via-[#101a2d] to-[#0b1220] p-6 sm:p-9`}>
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/[0.035] blur-3xl" />
          <div className="relative">
            <p className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${theme.accent}`}>{eyebrow}</p>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
          </div>
        </header>

        {children}

        <footer className="mt-12 border-t border-slate-800 pt-5 text-xs text-slate-500">
          DevMavox · Practical DevOps Learning
        </footer>
      </div>
    </main>
  );
}

function Breadcrumbs({ feature, items }: { feature: FeatureDefinition; items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
      <Link href={`/${feature.id}`} className="hover:text-white">{feature.title}</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          <span className="text-slate-600">/</span>
          {item.href ? <Link href={item.href} className="hover:text-white">{item.label}</Link> : <span className="text-slate-200">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

function CategoryCard({
  feature,
  category,
  index,
}: {
  feature: FeatureDefinition;
  category: FeatureCategory;
  index: number;
}) {
  const theme = featureTheme(feature.style);
  const href = `/${feature.id}/${slugify(category.name)}`;
  const count = topicCount(category);

  if (feature.style === "terminal") {
    return (
      <Link href={href} className={`group rounded-xl border ${theme.panel} bg-[#07130f] p-5 transition hover:-translate-y-1 hover:bg-[#0b2119]`}>
        <div className="mb-4 font-mono text-xs text-emerald-400">[{String(index + 1).padStart(2, "0")}] explorer</div>
        <h2 className="font-mono text-lg font-bold text-emerald-100 group-hover:text-white">{category.name}</h2>
        <p className="mt-3 font-mono text-xs text-emerald-300/70">{category.subcategories.length} command groups · {count} topics</p>
        <div className="mt-4 font-mono text-xs text-emerald-400">open_category →</div>
      </Link>
    );
  }

  if (feature.style === "git") {
    return (
      <Link href={href} className={`group relative rounded-2xl border ${theme.panel} bg-slate-900/80 p-5 transition hover:-translate-y-1`}>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,.5)]" />
          <span className="h-px flex-1 bg-orange-400/30" />
          <span className="text-xs text-orange-300">branch {index + 1}</span>
        </div>
        <h2 className="text-lg font-bold text-white">{category.name}</h2>
        <p className="mt-2 text-xs text-slate-400">{category.subcategories.length} workflows · {count} topics</p>
        <div className="mt-4 text-sm text-orange-300">Explore workflow →</div>
      </Link>
    );
  }

  if (feature.style === "incident") {
    return (
      <Link href={href} className={`group flex gap-4 rounded-xl border ${theme.panel} bg-slate-900/80 p-5 transition hover:bg-rose-950/20`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 font-black text-rose-300">{String(index + 1).padStart(2, "0")}</div>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-white group-hover:text-rose-200">{category.name}</h2>
          <p className="mt-2 text-xs text-slate-400">{category.subcategories.length} incident groups · {count} scenarios/topics</p>
          <p className="mt-3 text-xs font-semibold text-rose-300">Open response area →</p>
        </div>
      </Link>
    );
  }

  if (feature.style === "matrix") {
    return (
      <Link href={href} className={`group grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border ${theme.panel} bg-slate-900/70 p-4 transition hover:bg-cyan-950/20`}>
        <div>
          <h2 className="font-semibold text-white group-hover:text-cyan-200">{category.name}</h2>
          <p className="mt-1 text-xs text-slate-400">{category.subcategories.length} component groups</p>
        </div>
        <span className="rounded-md border border-cyan-500/30 px-3 py-2 font-mono text-xs text-cyan-200">{count} items</span>
      </Link>
    );
  }

  if (feature.style === "planner" || feature.style === "career" || feature.style === "portfolio") {
    return (
      <Link href={href} className={`group rounded-2xl border ${theme.panel} bg-slate-900/70 p-5 transition hover:-translate-y-1`}>
        <div className="mb-5 flex items-center justify-between">
          <span className={`rounded-lg px-3 py-2 text-sm ${theme.badge}`}>{theme.icon} {String(index + 1).padStart(2, "0")}</span>
          <span className="text-xs text-slate-500">{count} topics</span>
        </div>
        <h2 className="text-lg font-bold text-white">{category.name}</h2>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className={`h-full w-2/3 rounded-full ${feature.style === "planner" ? "bg-teal-400/60" : feature.style === "career" ? "bg-blue-400/60" : "bg-fuchsia-400/60"}`} />
        </div>
        <p className="mt-3 text-xs text-slate-400">{category.subcategories.length} sections · Explore details →</p>
      </Link>
    );
  }

  return (
    <Link href={href} className={`group rounded-2xl border ${theme.panel} bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:bg-slate-800/80`}>
      <div className="mb-4 flex items-center justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${theme.badge}`}>{theme.icon}</span>
        <span className="text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h2 className="text-lg font-bold text-white group-hover:text-slate-100">{category.name}</h2>
      <p className="mt-2 text-xs text-slate-400">{category.subcategories.length} subcategories · {count} topics</p>
      <div className={`mt-5 text-sm font-semibold ${theme.accent}`}>Explore category →</div>
    </Link>
  );
}

function SubcategoryCard({
  feature,
  category,
  subcategory,
  index,
}: {
  feature: FeatureDefinition;
  category: FeatureCategory;
  subcategory: FeatureSubcategory;
  index: number;
}) {
  const theme = featureTheme(feature.style);
  const href = `/${feature.id}/${slugify(category.name)}/${slugify(subcategory.name)}`;

  return (
    <Link href={href} className={`group flex items-center justify-between gap-4 rounded-xl border ${theme.panel} bg-slate-900/70 p-5 transition hover:bg-slate-800`}>
      <div className="flex min-w-0 items-center gap-4">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${theme.badge}`}>{String(index + 1).padStart(2, "0")}</span>
        <div className="min-w-0">
          <h2 className="font-bold text-white group-hover:text-slate-100">{subcategory.name}</h2>
          <p className="mt-1 text-xs text-slate-400">{subcategory.topics.length} topics</p>
        </div>
      </div>
      <span className={`text-sm ${theme.accent}`}>→</span>
    </Link>
  );
}

export function getFeatureStaticParams(featureId: string) {
  const feature = featureCatalog[featureId];
  if (!feature) return [];

  const result: { slug: string[] }[] = [];

  for (const category of feature.categories) {
    const categorySlug = slugify(category.name);
    result.push({ slug: [categorySlug] });

    for (const subcategory of category.subcategories) {
      const subcategorySlug = slugify(subcategory.name);
      result.push({ slug: [categorySlug, subcategorySlug] });

      for (const topic of subcategory.topics) {
        result.push({ slug: [categorySlug, subcategorySlug, slugify(topic)] });
      }
    }
  }

  return result;
}

export default function FeatureExplorer({
  featureId,
  slug = [],
}: {
  featureId: string;
  slug?: string[];
}) {
  const feature = featureCatalog[featureId];
  if (!feature) notFound();

  if (featureId === "yaml-config-playground") {
    return <YamlConfigWorkbench feature={feature} slug={slug} />;
  }

  const theme = featureTheme(feature.style);

  if (slug.length === 0) {
    const totalTopics = feature.categories.reduce((sum, category) => sum + topicCount(category), 0);

    return (
      <PageFrame feature={feature} eyebrow={feature.label} title={feature.title} description={feature.description}>
        <div className="mb-6 flex flex-wrap gap-3">
          <div className={`rounded-xl border ${theme.panel} bg-slate-900/70 px-4 py-3`}>
            <p className="text-2xl font-black text-white">{feature.categories.length}</p>
            <p className="text-xs text-slate-400">Categories</p>
          </div>
          <div className={`rounded-xl border ${theme.panel} bg-slate-900/70 px-4 py-3`}>
            <p className="text-2xl font-black text-white">{totalTopics}</p>
            <p className="text-xs text-slate-400">Learning topics</p>
          </div>
          <div className={`rounded-xl border ${theme.panel} bg-slate-900/70 px-4 py-3`}>
            <p className="text-2xl font-black text-white">3</p>
            <p className="text-xs text-slate-400">Navigation levels</p>
          </div>
        </div>

        {feature.style === "assistant" && (
          <div className="mb-6 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Workspace sections</p>
            <p className="mt-2 text-sm text-slate-300">Choose an assistant capability below. AI responses and model connectivity will be configured separately.</p>
          </div>
        )}

        {feature.style === "security" && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-950/20 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-red-300">Secure engineering domains</p>
            <p className="mt-2 text-sm text-slate-300">Browse defensive security topics, secure configurations and safe lab exercises.</p>
          </div>
        )}

        {feature.style === "atlas" && (
          <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Architecture collection</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="rounded-lg border border-cyan-500/30 px-3 py-2">Infrastructure</span><span className="text-cyan-400">→</span>
              <span className="rounded-lg border border-cyan-500/30 px-3 py-2">Application</span><span className="text-cyan-400">→</span>
              <span className="rounded-lg border border-cyan-500/30 px-3 py-2">Production</span>
            </div>
          </div>
        )}

        <div className={feature.style === "matrix" || feature.style === "knowledge" ? "space-y-3" : "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"}>
          {feature.categories.map((category, index) => (
            <CategoryCard key={category.name} feature={feature} category={category} index={index} />
          ))}
        </div>
      </PageFrame>
    );
  }

  const category = feature.categories.find((item) => slugify(item.name) === slug[0]);
  if (!category) notFound();

  if (slug.length === 1) {
    return (
      <PageFrame feature={feature} eyebrow="Category Explorer" title={category.name} description={`Explore the ${category.name} learning areas and open a subcategory to view its individual topics.`}>
        <Breadcrumbs feature={feature} items={[{ label: category.name }]} />
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-400">Select a subcategory to continue.</p>
          <span className={`rounded-full px-3 py-1 text-xs ${theme.badge}`}>{category.subcategories.length} subcategories</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {category.subcategories.map((subcategory, index) => (
            <SubcategoryCard key={subcategory.name} feature={feature} category={category} subcategory={subcategory} index={index} />
          ))}
        </div>
      </PageFrame>
    );
  }

  const subcategory = category.subcategories.find((item) => slugify(item.name) === slug[1]);
  if (!subcategory) notFound();

  if (slug.length === 2) {
    return (
      <PageFrame feature={feature} eyebrow="Topic Collection" title={subcategory.name} description={`Choose an individual topic in ${subcategory.name}. Each topic has its own dedicated learning page.`}>
        <Breadcrumbs feature={feature} items={[
          { label: category.name, href: `/${feature.id}/${slug[0]}` },
          { label: subcategory.name },
        ]} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subcategory.topics.map((topic, index) => (
            <Link key={topic} href={`/${feature.id}/${slug[0]}/${slug[1]}/${slugify(topic)}`} className={`group rounded-xl border ${theme.panel} bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:bg-slate-800`}>
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-lg px-3 py-2 text-xs font-bold ${theme.badge}`}>TOPIC {String(index + 1).padStart(2, "0")}</span>
                <span className={`text-lg ${theme.accent}`}>↗</span>
              </div>
              <h2 className="font-bold text-white group-hover:text-slate-200">{topic}</h2>
              <p className="mt-3 text-xs text-slate-400">Open dedicated topic page →</p>
            </Link>
          ))}
        </div>
      </PageFrame>
    );
  }

  if (slug.length === 3) {


    const topic = subcategory.topics.find((item) => slugify(item) === slug[2]);
    if (!topic) notFound();

    if (featureId === "architecture-diagram-library") {
      const architectureContent = getArchitectureTopic(topic);

      if (architectureContent) {
        return (
          <ArchitectureTopicPage
            content={architectureContent}
            categoryName={category.name}
            subcategoryName={subcategory.name}
            categorySlug={slug[0]}
            subcategorySlug={slug[1]}
          />
        );
      }
    }

    return (
      <PageFrame feature={feature} eyebrow="Individual Topic" title={topic} description={`This is the dedicated topic space for ${topic}. The detailed learning material will be added in the next content phase.`}>
        <Breadcrumbs feature={feature} items={[
          { label: category.name, href: `/${feature.id}/${slug[0]}` },
          { label: subcategory.name, href: `/${feature.id}/${slug[0]}/${slug[1]}` },
          { label: topic },
        ]} />

        <div className={`rounded-2xl border ${theme.panel} bg-slate-900/80 p-6 sm:p-8`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${theme.badge}`}>{feature.label}</span>
            <span className="text-xs text-slate-500">Topic page · Phase 1 structure</span>
          </div>
          <h2 className="mt-6 text-xl font-bold text-white">Learning material workspace</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
            The navigation and dedicated page for this topic are ready. In the next phase, this page will receive content designed specifically for this feature and topic.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              <p className={`text-xs font-bold uppercase tracking-wider ${theme.accent}`}>Feature</p>
              <p className="mt-2 text-sm text-slate-200">{feature.title}</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
              <p className={`text-xs font-bold uppercase tracking-wider ${theme.accent}`}>Topic path</p>
              <p className="mt-2 text-sm text-slate-200">{category.name} / {subcategory.name}</p>
            </div>
          </div>
        </div>
      </PageFrame>
    );
  }

  notFound();
}

