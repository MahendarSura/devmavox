import type { Metadata } from 'next';
import TroubleshootingLab from '../../../components/devmavox-learning/practical-labs/troubleshooting-lab/TroubleshootingLab';

export const metadata: Metadata = {
  title: 'Troubleshooting Lab | DevMavox',
  description: 'Hands-on Troubleshooting Lab workspace in DevMavox.',
};

export default function Page() {
  return (
    <main className="min-h-screen w-full">
      <TroubleshootingLab />
    </main>
  );
}