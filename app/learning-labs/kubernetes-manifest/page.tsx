import type { Metadata } from 'next';
import KubernetesManifestLab from '../../../components/devmavox-learning/practical-labs/kubernetes-manifest-lab/KubernetesManifestLab';

export const metadata: Metadata = {
  title: 'Kubernetes Manifest Lab | DevMavox',
  description: 'Hands-on Kubernetes Manifest Lab workspace in DevMavox.',
};

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <KubernetesManifestLab />
    </main>
  );
}