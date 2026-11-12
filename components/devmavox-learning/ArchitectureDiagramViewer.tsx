"use client";

import { useRef, useState } from "react";

type Provider = "aws" | "azure" | "gcp" | "hybrid" | "multicloud";
type Layer = "edge" | "network" | "compute" | "data" | "security";

type DiagramNode = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  layer: Layer;
  x: number;
  y: number;
  width: number;
  height: number;
};

const AWS_NODES: DiagramNode[] = [
  {
    id: "users",
    title: "Users / Clients",
    subtitle: "Web browsers and mobile clients",
    detail: "Users access the application through HTTPS. DNS resolution and the public entry layer determine where their requests are routed.",
    layer: "edge",
    x: 375, y: 25, width: 250, height: 64
  },
  {
    id: "dns",
    title: "Amazon Route 53",
    subtitle: "DNS resolution and routing policies",
    detail: "Route 53 hosts DNS records and resolves the application domain. Routing policies and health checks can support suitable traffic-management designs.",
    layer: "edge",
    x: 375, y: 110, width: 250, height: 64
  },
  {
    id: "edge",
    title: "CloudFront + AWS WAF",
    subtitle: "Content delivery and web protection",
    detail: "CloudFront distributes cached and dynamic content through edge locations. AWS WAF evaluates configured web requests against security rules before forwarding allowed traffic.",
    layer: "security",
    x: 375, y: 195, width: 250, height: 64
  },
  {
    id: "alb",
    title: "Application Load Balancer",
    subtitle: "HTTPS listener and target routing",
    detail: "The Application Load Balancer distributes supported HTTP and HTTPS requests to healthy targets. Listener rules, target groups and health checks control backend routing.",
    layer: "network",
    x: 375, y: 280, width: 250, height: 64
  },
  {
    id: "app-a",
    title: "Application Tier · AZ A",
    subtitle: "Private EC2 / ECS / EKS workloads",
    detail: "Application workloads run in private subnets in one Availability Zone. Security groups should allow only required traffic from the approved application entry layer.",
    layer: "compute",
    x: 120, y: 395, width: 300, height: 86
  },
  {
    id: "app-b",
    title: "Application Tier · AZ B",
    subtitle: "Redundant application workloads",
    detail: "A second Availability Zone provides an additional application failure domain. Workload health, capacity and dependency behavior must be tested during zone-level failures.",
    layer: "compute",
    x: 580, y: 395, width: 300, height: 86
  },
  {
    id: "database",
    title: "Amazon RDS / Aurora",
    subtitle: "Private database tier",
    detail: "The database tier stores persistent application data. Multi-AZ deployment can support database availability, while read replicas address supported read-scaling or replication use cases.",
    layer: "data",
    x: 375, y: 525, width: 250, height: 72
  },
  {
    id: "operations",
    title: "Operations and Recovery",
    subtitle: "CloudWatch · CloudTrail · AWS Backup",
    detail: "CloudWatch provides metrics, logs and alarms. CloudTrail records supported API activity. AWS Backup can manage backups for supported resources. Recovery must be tested against RTO and RPO.",
    layer: "security",
    x: 375, y: 625, width: 250, height: 64
  }
];

const AZURE_NODES: DiagramNode[] = [
  {
    id: "users",
    title: "Users / Clients",
    subtitle: "Web browsers and mobile clients",
    detail: "Users connect to the application over HTTPS. The global entry service receives requests and routes them according to the configured application delivery design.",
    layer: "edge",
    x: 375, y: 25, width: 250, height: 64
  },
  {
    id: "dns",
    title: "Azure DNS",
    subtitle: "Domain name resolution",
    detail: "Azure DNS hosts DNS records for domain resolution. DNS configuration must match the selected public or private application entry design.",
    layer: "edge",
    x: 375, y: 110, width: 250, height: 64
  },
  {
    id: "frontdoor",
    title: "Azure Front Door + WAF",
    subtitle: "Global HTTP routing and web protection",
    detail: "Azure Front Door provides global application entry and HTTP routing capabilities. Its WAF integration can inspect requests using configured security policies.",
    layer: "security",
    x: 375, y: 195, width: 250, height: 64
  },
  {
    id: "gateway",
    title: "Application Gateway",
    subtitle: "Regional layer-seven routing",
    detail: "Application Gateway provides regional application delivery, listeners, backend pools and health probes. It can be combined with Front Door when both global and regional responsibilities are required.",
    layer: "network",
    x: 375, y: 280, width: 250, height: 64
  },
  {
    id: "app-a",
    title: "Application Tier · Zone A",
    subtitle: "App Service / VMSS / AKS workloads",
    detail: "The application tier can use App Service, Virtual Machine Scale Sets or AKS according to operational requirements. These platforms have different networking and scaling models.",
    layer: "compute",
    x: 120, y: 395, width: 300, height: 86
  },
  {
    id: "app-b",
    title: "Application Tier · Zone B",
    subtitle: "Redundant application capacity",
    detail: "A second availability zone or supported redundant deployment provides another failure domain. Confirm that the selected Azure service and configuration support the required zone behavior.",
    layer: "compute",
    x: 580, y: 395, width: 300, height: 86
  },
  {
    id: "database",
    title: "Azure SQL / Managed Data",
    subtitle: "Private data services",
    detail: "Managed data services store persistent application information. Private Endpoint, DNS, identity permissions, backup retention and database recovery behavior must be designed together.",
    layer: "data",
    x: 375, y: 525, width: 250, height: 72
  },
  {
    id: "operations",
    title: "Operations and Recovery",
    subtitle: "Azure Monitor · Log Analytics · Backup",
    detail: "Azure Monitor collects metrics and logs, Log Analytics supports log querying, and supported backup and recovery services protect workloads. Measure recovery through actual exercises.",
    layer: "security",
    x: 375, y: 625, width: 250, height: 64
  }
];


const GCP_NODES: DiagramNode[] = [
  {
    id: "users",
    title: "Global Users",
    subtitle: "Browsers, mobile apps and API clients",
    detail: "Clients resolve the application domain and connect over HTTPS. Global entry design, DNS behavior and certificate configuration determine how requests reach the service.",
    layer: "edge",
    x: 375, y: 25, width: 250, height: 64
  },
  {
    id: "dns",
    title: "Cloud DNS",
    subtitle: "Managed domain resolution",
    detail: "Cloud DNS hosts public or private DNS zones. Records should point to the intended application entry point, and private DNS resolution must be designed for internal services.",
    layer: "edge",
    x: 375, y: 110, width: 250, height: 64
  },
  {
    id: "edge",
    title: "Cloud Armor + CDN",
    subtitle: "Edge security and content delivery",
    detail: "Cloud Armor applies configured edge security policies. Cloud CDN caches eligible content close to users. Cache rules must not expose personalized or sensitive responses.",
    layer: "security",
    x: 375, y: 195, width: 250, height: 64
  },
  {
    id: "alb",
    title: "Cloud Load Balancing",
    subtitle: "Global HTTPS routing and backend health",
    detail: "The external Application Load Balancer uses forwarding rules, target proxies, URL maps, backend services and health checks to route supported HTTP and HTTPS traffic.",
    layer: "network",
    x: 375, y: 280, width: 250, height: 64
  },
  {
    id: "app-a",
    title: "GKE / Cloud Run · Region A",
    subtitle: "Application services and APIs",
    detail: "GKE provides Kubernetes orchestration when cluster capabilities are justified. Cloud Run provides managed container execution for suitable workloads. Choose based on runtime and operational requirements.",
    layer: "compute",
    x: 120, y: 395, width: 300, height: 86
  },
  {
    id: "app-b",
    title: "Compute · Region B",
    subtitle: "Recovery or distributed workload capacity",
    detail: "A second regional deployment can support selected recovery or active-active designs. Data consistency, service availability, traffic steering and failover behavior must be validated.",
    layer: "compute",
    x: 580, y: 395, width: 300, height: 86
  },
  {
    id: "database",
    title: "Cloud SQL / Spanner",
    subtitle: "Managed application data",
    detail: "Cloud SQL supports common managed relational workloads. Spanner supports distributed relational use cases with its own consistency and scaling model. Select based on data access patterns.",
    layer: "data",
    x: 375, y: 525, width: 250, height: 72
  },
  {
    id: "operations",
    title: "Cloud Operations",
    subtitle: "Monitoring · Logging · Audit Logs",
    detail: "Cloud Monitoring, Cloud Logging and Cloud Audit Logs provide operational and security evidence. Define service-level indicators, actionable alerts, retention and incident ownership.",
    layer: "security",
    x: 375, y: 625, width: 250, height: 64
  }
];

const HYBRID_NODES: DiagramNode[] = [
  {
    id: "users",
    title: "Enterprise Users",
    subtitle: "Employees, customers and partners",
    detail: "Users enter through approved enterprise access paths. Authentication, DNS resolution and application routing must work across both private and cloud environments.",
    layer: "edge",
    x: 375, y: 25, width: 250, height: 64
  },
  {
    id: "dns",
    title: "Enterprise DNS + Identity",
    subtitle: "Federation and conditional resolution",
    detail: "Enterprise DNS resolves private service names and forwards selected zones where configured. Identity federation connects enterprise authentication to cloud authorization without automatically granting resource permissions.",
    layer: "edge",
    x: 375, y: 110, width: 250, height: 64
  },
  {
    id: "edge",
    title: "Security Inspection",
    subtitle: "Firewalls · WAF · Access policies",
    detail: "Security controls inspect traffic at appropriate boundaries. Network connectivity does not imply trust; identity, segmentation, encryption and application authorization remain necessary.",
    layer: "security",
    x: 375, y: 195, width: 250, height: 64
  },
  {
    id: "alb",
    title: "Hybrid Connectivity Hub",
    subtitle: "VPN · Dedicated link · Routing",
    detail: "Redundant VPN or dedicated connectivity links connect the datacenter and cloud. BGP, route filters, non-overlapping CIDRs and firewall rules determine the actual traffic path.",
    layer: "network",
    x: 375, y: 280, width: 250, height: 64
  },
  {
    id: "app-a",
    title: "On-Premises Datacenter",
    subtitle: "Legacy apps and private databases",
    detail: "The datacenter hosts workloads retained for latency, compliance, hardware or migration reasons. Its dependencies, backup, identity and operational ownership must be documented.",
    layer: "compute",
    x: 120, y: 395, width: 300, height: 86
  },
  {
    id: "app-b",
    title: "Public Cloud Workloads",
    subtitle: "Private application services",
    detail: "Cloud workloads use private network paths and controlled integration with datacenter services. Avoid assuming that every on-premises dependency is highly available or low latency.",
    layer: "compute",
    x: 580, y: 395, width: 300, height: 86
  },
  {
    id: "database",
    title: "Data and Integration",
    subtitle: "Replication · APIs · Messaging",
    detail: "Data may remain on-premises, move to cloud storage or be replicated. Define system-of-record ownership, consistency, replication lag, retry behavior and recovery procedures.",
    layer: "data",
    x: 375, y: 525, width: 250, height: 72
  },
  {
    id: "operations",
    title: "Unified Operations",
    subtitle: "Central logs · Metrics · Incident response",
    detail: "Collect cloud and datacenter logs, metrics and security events. Synchronize time, define shared incident ownership and test recovery when network or identity dependencies fail.",
    layer: "security",
    x: 375, y: 625, width: 250, height: 64
  }
];

const MULTICLOUD_NODES: DiagramNode[] = [
  {
    id: "users",
    title: "Global Users",
    subtitle: "Customers · Employees · Partners",
    detail: "Users access services from multiple geographic locations. Global DNS and traffic steering select an appropriate application entry point based on health, latency, policy and regional availability.",
    layer: "edge",
    x: 375, y: 25, width: 250, height: 64
  },
  {
    id: "dns",
    title: "Global DNS and Identity",
    subtitle: "Traffic steering · Federated identity",
    detail: "Global DNS directs users to approved cloud endpoints. Federated identity connects enterprise authentication with each cloud provider while provider-specific roles and policies enforce least privilege.",
    layer: "edge",
    x: 375, y: 110, width: 250, height: 64
  },
  {
    id: "edge",
    title: "Global Security Layer",
    subtitle: "WAF · DDoS · Policy enforcement",
    detail: "Each cloud edge applies appropriate web protection, DDoS controls, TLS policies and request filtering. Central governance should define consistent security outcomes without assuming identical provider implementations.",
    layer: "security",
    x: 375, y: 195, width: 250, height: 64
  },
  {
    id: "alb",
    title: "Cross-Cloud Connectivity",
    subtitle: "Private links · VPN · Transit routing",
    detail: "Private connectivity, site-to-site VPN or controlled public endpoints connect cloud environments. Routing domains, CIDR planning, encryption, bandwidth and failure isolation must be designed explicitly.",
    layer: "network",
    x: 375, y: 280, width: 250, height: 64
  },
  {
    id: "app-a",
    title: "Cloud Provider A",
    subtitle: "Primary application workload",
    detail: "The first provider hosts application services using its native compute, network and managed platform capabilities. Workload placement should be based on service requirements, latency, skills, cost and operational maturity.",
    layer: "compute",
    x: 120, y: 395, width: 300, height: 86
  },
  {
    id: "app-b",
    title: "Cloud Provider B",
    subtitle: "Secondary or independent workload",
    detail: "The second provider may host independent services, selected replicas or recovery capacity. It is not automatically a hot standby: deployment parity, capacity, identity, data access and tested failover are required.",
    layer: "compute",
    x: 580, y: 395, width: 300, height: 86
  },
  {
    id: "database",
    title: "Data and Integration",
    subtitle: "APIs · Replication · Event exchange",
    detail: "Data exchange should use explicit ownership, supported APIs, event contracts or controlled replication. Define consistency expectations, replication lag, data residency, encryption and recovery responsibilities.",
    layer: "data",
    x: 375, y: 525, width: 250, height: 72
  },
  {
    id: "operations",
    title: "Unified Operations",
    subtitle: "Observability · Governance · FinOps",
    detail: "A shared operational view correlates logs, metrics, traces, security events, deployment activity and cloud spending. Teams still need provider-specific runbooks, ownership and tested incident procedures.",
    layer: "security",
    x: 375, y: 625, width: 250, height: 64
  }
];
const COLORS: Record<Layer, { stroke: string; fill: string; text: string }> = {
  edge: { stroke: "#38bdf8", fill: "#082f49", text: "#bae6fd" },
  network: { stroke: "#a78bfa", fill: "#2e1065", text: "#ddd6fe" },
  compute: { stroke: "#34d399", fill: "#064e3b", text: "#a7f3d0" },
  data: { stroke: "#fbbf24", fill: "#78350f", text: "#fde68a" },
  security: { stroke: "#fb7185", fill: "#881337", text: "#fecdd3" }
};

const MODES = [
  { id: "overview", label: "Overview" },
  { id: "network", label: "Network" },
  { id: "compute", label: "Compute" },
  { id: "security", label: "Security" }
] as const;

type Mode = typeof MODES[number]["id"];

export default function ArchitectureDiagramViewer({
  provider,
  topicTitle,
  diagram
}: {
  provider: Provider;
  topicTitle?: string;
  diagram?: string[];
}) {
  const providerNodes = provider === "multicloud" ? MULTICLOUD_NODES : provider === "azure" ? AZURE_NODES : provider === "gcp" ? GCP_NODES : provider === "hybrid" ? HYBRID_NODES : AWS_NODES;

  const topicNodes: DiagramNode[] = (diagram ?? []).map((step, index) => {
    const value = step.toLowerCase();

    const layer: Layer =
      /dns|user|client|internet|edge|cdn|ingress/.test(value) ? "edge" :
      /network|vpc|subnet|route|gateway|firewall|load balanc|connectivity/.test(value) ? "network" :
      /database|storage|s3|persistent|state|backup|queue|data/.test(value) ? "data" :
      /security|iam|identity|secret|policy|monitor|logging|audit|observability/.test(value) ? "security" :
      "compute";

    return {
      id: `topic-${index}`,
      title: step,
      subtitle: `Architecture flow · Step ${String(index + 1).padStart(2, "0")}`,
      detail: `${topicTitle ?? "Architecture"}: ${step}. This is a topic-specific architecture element. Review its dependencies, access boundaries, configuration, operational health and failure behavior in the technical sections below.`,
      layer,
      x: 250,
      y: 45 + index * 92,
      width: 500,
      height: 64
    };
  });

  const nodes = topicNodes.length > 0 ? topicNodes : providerNodes;
  const diagramHeight = topicNodes.length > 0 ? Math.max(720, topicNodes.length * 92 + 110) : 720;
  const exportBaseName = (topicTitle || provider).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const [selectedId, setSelectedId] = useState("topic-0");
  const [mode, setMode] = useState<Mode>("overview");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];

  const isHighlighted = (layer: Layer) => {
    if (mode === "overview") return true;
    if (mode === "network") return layer === "network" || layer === "edge";
    if (mode === "compute") return layer === "compute" || layer === "data";
    return layer === "security" || layer === "edge";
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const exportSvg = () => {
    const original = svgRef.current;
    if (!original) return;

    const clone = original.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "1600");
    clone.setAttribute("height", String(diagramHeight));

    const source = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${exportBaseName}-architecture-diagram.svg`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const exportPng = () => {
    const original = svgRef.current;
    if (!original) return;

    const clone = original.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "1600");
    clone.setAttribute("height", String(diagramHeight));

    const source = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new window.Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 1152;

      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#07111f";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((png) => {
          if (png) {
            const pngUrl = URL.createObjectURL(png);
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = `${exportBaseName}-architecture-diagram.png`;
            link.click();
            URL.revokeObjectURL(pngUrl);
          }
          URL.revokeObjectURL(url);
        }, "image/png");
      } else {
        URL.revokeObjectURL(url);
      }
    };

    image.onerror = () => URL.revokeObjectURL(url);
    image.src = url;
  };

  const openFullscreen = async () => {
    if (!viewerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await viewerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen may be unavailable in restricted browser contexts.
    }
  };

  const startPan = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const movePan = (event: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    setPan({
      x: drag.originX + (event.clientX - drag.startX) * 1.2,
      y: drag.originY + (event.clientY - drag.startY) * 1.2
    });
  };

  const stopPan = (event: React.PointerEvent<SVGSVGElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
  };

  const connect = (x1: number, y1: number, x2: number, y2: number, key: string) => (
    <path
      key={key}
      d={`M ${x1} ${y1} C ${x1} ${y1 + 35}, ${x2} ${y2 - 35}, ${x2} ${y2}`}
      fill="none"
      stroke="#64748b"
      strokeWidth="3"
      strokeDasharray="7 5"
      markerEnd="url(#architecture-arrow)"
    />
  );

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-cyan-500/25 bg-[#0b1424] shadow-2xl shadow-cyan-950/20">
      <div className="border-b border-slate-800 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Interactive architecture visualizer
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {topicTitle || (provider === "azure" ? "Microsoft Azure" : provider === "gcp" ? "Google Cloud Platform" : provider === "hybrid" ? "Hybrid Cloud" : provider === "multicloud" ? "Multi-Cloud Architecture" : "Amazon Web Services")} · Reference Design
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
              Select a component to understand its responsibility. Drag the diagram to pan,
              use zoom controls to inspect details, and export the current architecture.
            </p>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200">
            Interactive SVG
          </span>
        </div>

        <div className="mt-5 rounded-xl border border-cyan-500/20 bg-[#07111f] p-4">
          <p className="text-sm font-bold text-cyan-200">{topicTitle || "Architecture"} · Topic-specific component flow</p>
          <p className="mt-2 text-xs leading-6 text-slate-400">
            The interactive diagram below is generated from this topic's own architecture flow, not from a shared AWS illustration.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-4">
        <div className="flex flex-wrap gap-2">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              aria-pressed={mode === item.id}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                mode === item.id
                  ? "border-cyan-400 bg-cyan-400/15 text-cyan-200"
                  : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setZoom((value) => Math.min(2, value + 0.15))} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-800" aria-label="Zoom in">＋</button>
          <button type="button" onClick={() => setZoom((value) => Math.max(0.65, value - 0.15))} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-800" aria-label="Zoom out">−</button>
          <button type="button" onClick={resetView} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800">Reset</button>
          <button type="button" onClick={openFullscreen} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800">Full screen</button>
          <button type="button" onClick={exportSvg} className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-200 hover:bg-cyan-500/20">Export SVG</button>
          <button type="button" onClick={exportPng} className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-200 hover:bg-cyan-500/20">Export PNG</button>
        </div>
      </div>

      <div ref={viewerRef} className="bg-[#07111f] p-2 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-500">
          <span>Drag to pan · Select a component for details</span>
          <span>Zoom: {Math.round(zoom * 100)}%</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#081525]">
          <svg
            ref={svgRef}
            viewBox={`0 0 1000 ${diagramHeight}`}
            role="img"
            aria-label={`${topicTitle || provider} topic-specific architecture diagram`}
            className="block h-auto w-full select-none"
            style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "none" }}
            onPointerDown={startPan}
            onPointerMove={movePan}
            onPointerUp={stopPan}
            onPointerCancel={stopPan}
          >
            <defs>
              <marker id="architecture-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
              </marker>
              <linearGradient id="architecture-background" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0b1d32" />
                <stop offset="100%" stopColor="#07111f" />
              </linearGradient>
            </defs>

            <rect width="1000" height="720" fill="url(#architecture-background)" />

            <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
              {topicNodes.length === 0 && (
                <>
                  <rect x="65" y="365" width="870" height="245" rx="22" fill="#0f2740" fillOpacity="0.42" stroke="#38bdf8" strokeWidth="2" strokeDasharray="10 7" />
                  <text x="90" y="390" fill="#7dd3fc" fontSize="16" fontWeight="700">
                    {provider === "azure" ? "AZURE VIRTUAL NETWORK" : provider === "gcp" ? "GOOGLE CLOUD GLOBAL VPC" : provider === "hybrid" ? "HYBRID CONNECTIVITY BOUNDARY" : provider === "multicloud" ? "CROSS-CLOUD CONNECTIVITY BOUNDARY" : "AWS VPC · PRIVATE NETWORK BOUNDARY"}
                  </text>
                  <rect x="100" y="405" width="340" height="185" rx="14" fill="#0b332d" fillOpacity="0.28" stroke="#34d399" strokeOpacity="0.5" />
                  <rect x="560" y="405" width="340" height="185" rx="14" fill="#0b332d" fillOpacity="0.28" stroke="#34d399" strokeOpacity="0.5" />
                  <text x="120" y="430" fill="#6ee7b7" fontSize="13" fontWeight="700">FAILURE DOMAIN A</text>
                  <text x="580" y="430" fill="#6ee7b7" fontSize="13" fontWeight="700">FAILURE DOMAIN B</text>
                  {connect(500, 89, 500, 110, "users-dns")}
                  {connect(500, 174, 500, 195, "dns-edge")}
                  {connect(500, 259, 500, 280, "edge-gateway")}
                  {connect(500, 344, 270, 395, "gateway-app-a")}
                  {connect(500, 344, 730, 395, "gateway-app-b")}
                  {connect(270, 481, 500, 525, "app-a-db")}
                  {connect(730, 481, 500, 525, "app-b-db")}
                  {connect(500, 597, 500, 625, "db-ops")}
                </>
              )}

              {topicNodes.length > 0 && topicNodes.slice(0, -1).map((node, index) => {
                const next = topicNodes[index + 1];
                return connect(500, node.y + node.height, 500, next.y, `topic-flow-${index}`);
              })}

              {nodes.map((node) => {
                const colors = COLORS[node.layer];
                const active = isHighlighted(node.layer);
                const selectedNode = selectedId === node.id;

                return (
                  <g
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Show details for ${node.title}`}
                    onClick={() => setSelectedId(node.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedId(node.id);
                      }
                    }}
                    opacity={active ? 1 : 0.22}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width={node.width}
                      height={node.height}
                      rx="13"
                      fill={colors.fill}
                      stroke={selectedNode ? "#ffffff" : colors.stroke}
                      strokeWidth={selectedNode ? 4 : 2}
                    />
                    <text
                      x={node.x + node.width / 2}
                      y={node.y + (node.height === 86 ? 34 : 27)}
                      fill={colors.text}
                      fontSize="17"
                      fontWeight="700"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {node.title}
                    </text>
                    <text
                      x={node.x + node.width / 2}
                      y={node.y + (node.height === 86 ? 59 : 47)}
                      fill="#cbd5e1"
                      fontSize="12"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {node.subtitle}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(COLORS).map(([layer, color]) => (
            <span key={layer} className="flex items-center gap-2 text-xs capitalize text-slate-400">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color.stroke }} />
              {layer}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 border-t border-slate-800 p-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Selected component</p>
          <h3 className="mt-3 text-xl font-bold text-white">{selected.title}</h3>
          <p className="mt-2 text-sm text-cyan-100">{selected.subtitle}</p>
          <span className="mt-4 inline-flex rounded-full border border-slate-700 px-3 py-1 text-xs capitalize text-slate-300">
            {selected.layer} layer
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Technical responsibility</p>
          <p className="mt-3 text-sm leading-8 text-slate-300">{selected.detail}</p>
        </div>
      </div>

      <div className="border-t border-slate-800 px-5 py-4 text-xs leading-6 text-slate-500">
        {topicTitle || "This architecture"} reference flow is intended for technical learning. Validate actual service capabilities, dependencies, security boundaries and recovery behavior before using a design in production.
      </div>
    </section>
  );
}
