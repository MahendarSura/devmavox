import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "./SiteShell";

export const metadata: Metadata = {
  title: "Devmavox | Learn DevOps in Telugu",
  description:
    "Learn Linux, AWS, Docker, Kubernetes, Jenkins, Terraform and DevOps in Telugu and English.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
