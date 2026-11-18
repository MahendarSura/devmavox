"use client";

import { useState } from "react";

type Billing = { connected: boolean; source?: string; currency?: string; total?: number; start?: string; end?: string; services?: {service:string;amount:number;unit:string}[]; message?: string };
const money = (amount:number, unit="USD") => new Intl.NumberFormat("en-US",{style:"currency",currency:unit,maximumFractionDigits:2}).format(amount);

export default function CloudBillingLivePanel() {
  const [data,setData] = useState<Billing|null>(null);
  const [error,setError] = useState("");
  const [accessKey,setAccessKey] = useState("");
  const [loading,setLoading] = useState(false);
  async function connect(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(""); setData(null);
    try {
      const response=await fetch("/api/cloud-cost-lab/billing?days=30",{cache:"no-store",headers:{Authorization:"Bearer "+accessKey}});
      const body=await response.json();
      if(!response.ok) throw new Error(body.message || "AWS billing request failed.");
      setData(body);
    } catch(reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load billing data.");
    } finally { setLoading(false); }
  }
  return <section className="mb-7 rounded-2xl border border-emerald-500/25 bg-[#0c1b29] p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Live cloud billing connection</p><h2 className="mt-2 text-xl font-bold text-white">AWS Cost Explorer</h2><p className="mt-1 text-sm text-slate-400">30-day account spend grouped by AWS service.</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${data?.connected ? "bg-emerald-400/10 text-emerald-200" : "bg-amber-400/10 text-amber-200"}`}>{loading ? "Connecting…" : data?.connected ? "Connected" : "Access protected"}</span></div>
    {!data?.connected && <form onSubmit={connect} className="mt-5 rounded-xl border border-slate-700 bg-slate-950/50 p-4"><label htmlFor="cloud-cost-billing-key" className="block text-sm font-semibold text-slate-200">Billing access key</label><p className="mt-1 text-xs leading-5 text-slate-400">Enter the Cloud Cost Lab access key supplied by your administrator. It is kept in this page's memory only and sent over HTTPS to authorize this request.</p><div className="mt-3 flex flex-col gap-2 sm:flex-row"><input id="cloud-cost-billing-key" type="password" autoComplete="off" value={accessKey} onChange={e=>setAccessKey(e.target.value)} placeholder="Enter billing access key" required className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"/><button disabled={loading||!accessKey.trim()} type="submit" className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">{loading?"Connecting…":"Connect AWS billing"}</button></div>{error&&<p role="alert" className="mt-3 text-sm text-amber-200">{error}</p>}</form>}
    {data?.connected && <><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4"><p className="text-xs text-slate-400">Total spend</p><p className="mt-2 text-2xl font-black text-emerald-200">{money(data.total||0,data.currency)}</p></div><div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4"><p className="text-xs text-slate-400">Period</p><p className="mt-2 text-sm font-bold text-white">{data.start} – {data.end}</p></div><div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4"><p className="text-xs text-slate-400">Services returned</p><p className="mt-2 text-2xl font-black text-cyan-200">{data.services?.length||0}</p></div></div><div className="mt-4 space-y-2">{(data.services||[]).slice(0,8).map(item=><div key={item.service} className="flex items-center justify-between gap-3 rounded-lg bg-slate-950/40 px-3 py-2 text-sm"><span className="truncate text-slate-300">{item.service}</span><b className="shrink-0 text-white">{money(item.amount,item.unit)}</b></div>)}</div><button type="button" onClick={()=>{setData(null);setAccessKey("");setError("");}} className="mt-4 text-xs font-semibold text-cyan-300 underline">Disconnect billing view</button><p className="mt-3 text-[11px] text-slate-500">Source: AWS Cost Explorer. Billing data may lag AWS refresh cycles.</p></>}
    <p className="mt-3 text-[11px] leading-5 text-slate-500">Requires server-side AWS read-only credentials and a separate Cloud Cost Lab access key configured in Vercel. Never paste AWS secret keys here.</p>
  </section>;
}
