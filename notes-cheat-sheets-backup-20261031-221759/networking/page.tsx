import Link from "next/link";

const topics = [
  { title: "Networking Connectivity Troubleshooting", slug: "connectivity-troubleshooting" },
  { title: "Networking Dhcp", slug: "dhcp" },
  { title: "Networking Dns", slug: "dns" },
  { title: "Networking Firewalls", slug: "firewalls" },
  { title: "Networking Fundamentals", slug: "fundamentals" },
  { title: "Networking Http Https", slug: "http-https" },
  { title: "Networking Ip Addressing", slug: "ip-addressing" },
  { title: "Networking Load Balancing", slug: "load-balancing" },
  { title: "Networking Osi Tcp Ip", slug: "osi-tcp-ip" },
  { title: "Networking Ports Protocols", slug: "ports-protocols" },
  { title: "Networking Production", slug: "production" },
  { title: "Networking Routing", slug: "routing" },
  { title: "Networking Subnetting", slug: "subnetting" },
  { title: "Networking Tcp Udp", slug: "tcp-udp" },
  { title: "Networking Vpn", slug: "vpn" },
];

export default function ToolTopicsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/notes-cheat-sheets/troubleshooting"
          className="text-sm text-cyan-300 hover:underline"
        >
          ← All Troubleshooting Tools
        </Link>

        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">
          Troubleshooting Notes
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Networking Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/networking/" + topic.slug}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-cyan-500 hover:bg-slate-800"
            >
              <p className="text-xs text-cyan-400">
                TOPIC {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-cyan-200">
                {topic.title} →
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

