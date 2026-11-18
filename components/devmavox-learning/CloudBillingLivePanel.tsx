"use client";

import { useEffect, useState } from "react";

type Billing = { connected: boolean; source?: string; currency?: string; total?: number; start?: string; end?: string; services?: {service:string;amount:number;unit:string}[]; message?: string };
const money = (amount:number, unit="USD") => new Intl.NumberFormat("en-US",{style:"currency",currency:unit,maximumFractionDigits:2}).format(amount);

export default function CloudBillingLivePanel() {
  const [data,setData] = useState<Billing|null>(null);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetch("/api/cloud-cost-lab/billing?days=30",{cache:"no-store"})
      .then(async response => { const body=await response.json(); if(!response.ok) throw new Error(body.message || "AWS billing is not configured."); return body; })
      .then(body => { if(active) setData(body); })
      .catch(reason => { if(active) setError(reason instanceof Error ? reason.message : "Unable to load billing data."); })
      .finally(() => { if(active) setLoading(false); });
    return () => { active=false; };
  }, []);
  return <section className="mb-7 rounded-2xl border border-emerald-500/25 bg-[#0c1b29] p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Live cloud billing connection</p><h2 className="mt-2 text-xl font-bold text-white">AWS Cost Explorer</h2><p className="mt-1 text-sm text-slate-400">30-day account spend grouped by AWS service.</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${data?.connected ? "bg-emerald-400/10 text-emerald-200" : "bg-amber-400/10 text-amber-200"}`}>{loading ? "Connecting…" : data?.connected ? "Connected" : "Not connected"}</span></div>
    {loading ? <p className="mt-5 text-sm text-slate-400">Checking AWS Cost Explorer…</p> : data?.connected ? <><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4"><p className="text-xs text-slate-400">Total spend</p><p className="mt-2 text-2xl font-black text-emerald-200">{money(data.total||0,data.currency)}</p></div><div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4"><p className="text-xs text-slate-400">Period</p><p className="mt-2 text-sm font-bold text-white">{data.start} – {data.end}</p></div><div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4"><p className="text-xs text-slate-400">Services returned</p><p className="mt-2 text-2xl font-black text-cyan-200">{data.services?.length||0}</p></div></div><div className="mt-4 space-y-2">{(data.services||[]).slice(0,8).map(item=><div key={item.service} className="flex items-center justify-between gap-3 rounded-lg bg-slate-950/40 px-3 py-2 text-sm"><span className="truncate text-slate-300">{item.service}</span><b className="shrink-0 text-white">{money(item.amount,item.unit)}</b></div>)}</div><p className="mt-3 text-[11px] text-slate-500">Source: AWS Cost Explorer. Billing data may lag AWS refresh cycles.</p></> : <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"><p className="text-sm text-amber-100">{error || data?.message || "AWS credentials are not configured."}</p><p className="mt-2 text-xs leading-5 text-slate-400">Configure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (plus AWS_SESSION_TOKEN for temporary credentials) in Vercel Environment Variables. Grant only ce:GetCostAndUsage. Redeploy after setting variables.</p><a className="mt-3 inline-block text-xs font-semibold text-cyan-300 underline" href="https://docs.aws.amazon.com/cost-management/latest/userguide/ce-access.html" target="_blank" rel="noreferrer">AWS Cost Explorer access documentation ↗</a></div>}
  </section>;
}
