import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_ad_hoc_commands from "../ad-hoc-commands";
import topic_collections from "../collections";
import topic_error_handling from "../error-handling";
import topic_fundamentals from "../fundamentals";
import topic_installation_configuration from "../installation-configuration";
import topic_inventory from "../inventory";
import topic_loops_conditionals from "../loops-conditionals";
import topic_playbooks from "../playbooks";
import topic_production from "../production";
import topic_roles from "../roles";
import topic_ssh_connectivity from "../ssh-connectivity";
import topic_tasks_handlers from "../tasks-handlers";
import topic_templates from "../templates";
import topic_variables_facts from "../variables-facts";
import topic_vault_secrets from "../vault-secrets";

const topics = {
  "ad-hoc-commands": topic_ad_hoc_commands,
  "collections": topic_collections,
  "error-handling": topic_error_handling,
  "fundamentals": topic_fundamentals,
  "installation-configuration": topic_installation_configuration,
  "inventory": topic_inventory,
  "loops-conditionals": topic_loops_conditionals,
  "playbooks": topic_playbooks,
  "production": topic_production,
  "roles": topic_roles,
  "ssh-connectivity": topic_ssh_connectivity,
  "tasks-handlers": topic_tasks_handlers,
  "templates": topic_templates,
  "variables-facts": topic_variables_facts,
  "vault-secrets": topic_vault_secrets,
};

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export default async function ToolTopicPage({
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
      backHref="/notes-cheat-sheets/troubleshooting/ansible"
      backLabel="ansible Troubleshooting"
    />
  );
}
