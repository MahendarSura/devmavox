import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import fundamentals from "../topics/fundamentals";
import installation from "../topics/installation";
import images from "../topics/images";
import containers from "../topics/containers";
import dockerfile from "../topics/dockerfile";
import networking from "../topics/networking";
import volumes from "../topics/volumes";
import compose from "../topics/compose";
import registry from "../topics/registry";
import security from "../topics/security";
import performance from "../topics/performance";
import production from "../topics/production";

const topics = {
  fundamentals,
  installation,
  images,
  containers,
  dockerfile,
  networking,
  volumes,
  compose,
  registry,
  security,
  performance,
  production,
};

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export default async function DockerTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const data = topics[topic as keyof typeof topics];

  if (!data) notFound();

  return (
    <NotesRenderer
      data={data}
      backHref="/notes-cheat-sheets/troubleshooting/docker"
      backLabel="Docker Troubleshooting"
    />
  );
}
