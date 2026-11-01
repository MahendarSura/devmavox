"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function formatName(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getBackDetails(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return null;

  // Troubleshooting Center
  if (parts[0] === "troubleshooting-center") {
    if (parts.length >= 3) {
      return {
        href: `/troubleshooting-center/${parts[1]}`,
        label: `Back to ${formatName(parts[1])} Troubleshooting`,
      };
    }

    if (parts.length === 2) {
      return {
        href: "/troubleshooting-center",
        label: "Back to Troubleshooting Center",
      };
    }

    return { href: "/", label: "Back to Main Menu" };
  }

  // Notes & Cheat Sheets
  if (parts[0] === "notes-cheat-sheets") {
    if (parts[1] === "troubleshooting") {
      if (parts.length >= 4) {
        return {
          href: `/${parts.slice(0, -1).join("/")}`,
          label: `Back to ${formatName(parts[2])}`,
        };
      }

      if (parts.length === 3) {
        return {
          href: "/notes-cheat-sheets/troubleshooting",
          label: "Back to Troubleshooting Notes",
        };
      }

      return {
        href: "/notes-cheat-sheets",
        label: "Back to Notes & Cheat Sheets",
      };
    }

    if (parts.length >= 3) {
      return {
        href: `/${parts.slice(0, -1).join("/")}`,
        label: `Back to ${formatName(parts[parts.length - 2])}`,
      };
    }

    if (parts.length === 2) {
      return {
        href: "/notes-cheat-sheets",
        label: "Back to Notes & Cheat Sheets",
      };
    }

    return { href: "/", label: "Back to Home" };
  }

  // Real-time project detail pages
  if (parts[0] === "real-time-projects" && parts.length >= 2) {
    return {
      href: "/real-time-projects",
      label: "Back to Real-Time Projects",
    };
  }

  // General nested pages
  if (parts.length >= 2) {
    return {
      href: `/${parts.slice(0, -1).join("/")}`,
      label: `Back to ${formatName(parts[parts.length - 2])}`,
    };
  }

  return { href: "/", label: "Back to Home" };
}

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const back = getBackDetails(pathname);

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="site-global-nav">
        <div className="site-global-nav-inner">
          <div className="site-nav-left">
            {back && (
              <Link href={back.href} className="site-back-link">
                <span aria-hidden="true">←</span>
                <span>{back.label}</span>
              </Link>
            )}
          </div>

          <Link
            href="/"
            className="site-home-link"
            aria-label="Go to Devmavox Home"
            title="Home"
          >
            <span aria-hidden="true">⌂</span>
            <span>Home</span>
          </Link>
        </div>
      </header>

      <div className="site-page-content">{children}</div>
    </>
  );
}
