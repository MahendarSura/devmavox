import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_authentication_ssh from "../topics/authentication-ssh";
import topic_branches_merging from "../topics/branches-merging";
import topic_fundamentals from "../topics/fundamentals";
import topic_git_workflows from "../topics/git-workflows";
import topic_github_actions from "../topics/github-actions";
import topic_installation_configuration from "../topics/installation-configuration";
import topic_merge_conflicts from "../topics/merge-conflicts";
import topic_production from "../topics/production";
import topic_pull_requests from "../topics/pull-requests";
import topic_recovery from "../topics/recovery";
import topic_remote_repositories from "../topics/remote-repositories";
import topic_repositories from "../topics/repositories";
import topic_security from "../topics/security";
import topic_staging_commits from "../topics/staging-commits";
import topic_tags_releases from "../topics/tags-releases";

const topics = {
  "authentication-ssh": topic_authentication_ssh,
  "branches-merging": topic_branches_merging,
  "fundamentals": topic_fundamentals,
  "git-workflows": topic_git_workflows,
  "github-actions": topic_github_actions,
  "installation-configuration": topic_installation_configuration,
  "merge-conflicts": topic_merge_conflicts,
  "production": topic_production,
  "pull-requests": topic_pull_requests,
  "recovery": topic_recovery,
  "remote-repositories": topic_remote_repositories,
  "repositories": topic_repositories,
  "security": topic_security,
  "staging-commits": topic_staging_commits,
  "tags-releases": topic_tags_releases,
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
      backHref="/notes-cheat-sheets/troubleshooting/git-github"
      backLabel="git-github Troubleshooting"
    />
  );
}
