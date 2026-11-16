import type { Metadata } from 'next';
import CICDGitOpsLab from '../../../components/devmavox-learning/practical-labs/cicd-gitops-lab/CICDGitOpsLab';

export const metadata: Metadata = {
  title: 'CI/CD and GitOps Lab | DevMavox',
  description: 'Hands-on CI/CD and GitOps Lab workspace in DevMavox.',
};

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <CICDGitOpsLab />
    </main>
  );
}