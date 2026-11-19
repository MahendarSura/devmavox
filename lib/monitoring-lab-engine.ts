export type LabResult = { ok: boolean; output: string; detail: string; evidence: Record<string, string | number | boolean> };
type Sample = { metric: string; labels: Record<string,string>; values: number[] };
const base: Sample[] = [
 {metric:"http_requests_total",labels:{service:"checkout",status:"200"},values:[4100,4210,4320,4440,4560,4680]},
 {metric:"http_requests_total",labels:{service:"checkout",status:"500"},values:[12,13,14,15,16,17]},
 {metric:"http_request_duration_seconds_p95",labels:{service:"checkout"},values:[.21,.22,.24,.23,.24,.24]},
 {metric:"process_cpu_usage_percent",labels:{node:"worker-02"},values:[34,36,37,38,38,38]},
 {metric:"node_memory_usage_percent",labels:{node:"worker-02"},values:[60,61,62,62,63,63]},
 {metric:"up",labels:{job:"checkout-api"},values:[1,1,1,1,1,1]}
];
function dataFor(incident:boolean):Sample[]{return base.map(s=>{
 if(!incident)return s;
 if(s.metric==="http_requests_total"&&s.labels.status==="500")return {...s,values:[12,18,30,48,70,96]};
 if(s.metric==="http_requests_total"&&s.labels.status==="200")return {...s,values:[4100,4230,4380,4560,4770,5010]};
 if(s.metric==="http_request_duration_seconds_p95")return {...s,values:[.24,.42,.78,1.22,1.62,1.84]};
 if(s.metric==="process_cpu_usage_percent")return {...s,values:[38,48,61,75,88,94]};
 if(s.metric==="node_memory_usage_percent")return {...s,values:[63,68,72,78,84,88]};
 return s;
});}
type Vec={metric:string;labels:Record<string,string>;value:number};
function selector(q:string,data:Sample[]):Vec[]{
 const m=q.trim().match(/^([a-zA-Z_:][\\w:]*)(?:\\{([^}]*)\\})?$/);
 if(!m)throw Error("Invalid metric selector. Example: http_requests_total{status=\\"500\\"}");
 const filters=(m[2]||"").split(",").filter(Boolean).map(x=>{const z=x.trim().match(/^([\\w]+)\\s*(=~|!~|!=|=)\\s*\\"([^\\"]*)\\"$/);if(!z)throw Error("Invalid label matcher: "+x);return z;});
 const found=data.filter(s=>s.metric===m[1]&&filters.every(f=>{const v=s.labels[f[1]]||"";return f[2]==="="?v===f[3]:f[2]==="!="?v!==f[3]:f[2]==="=~"?new RegExp(f[3]).test(v):!new RegExp(f[3]).test(v);}));
 if(!found.length)throw Error("Unknown metric or no matching series: "+m[1]);
 return found.map(s=>({metric:s.metric,labels:s.labels,value:s.values[s.values.length-1]}));
}
function evalExpr(q:string,incident:boolean):Vec[]{
 const data=dataFor(incident),d=q.match(/^(.+?)\\s*\\/\\s*(.+)$/);
 if(d){const a=evalExpr(d[1],incident).reduce((n,x)=>n+x.value,0),b=evalExpr(d[2],incident).reduce((n,x)=>n+x.value,0);if(!b)throw Error("Division by zero");return [{metric:"expression",labels:{},value:a/b}];}
 const a=q.match(/^(sum|avg|max|min)\\((.*)\\)$/);
 if(a){const v=evalExpr(a[2],incident).map(x=>x.value);return [{metric:a[1],labels:{},value:a[1]==="sum"?v.reduce((x,y)=>x+y,0):a[1]==="avg"?v.reduce((x,y)=>x+y,0)/v.length:a[1]==="max"?Math.max(...v):Math.min(...v)}];}
 const f=q.match(/^(rate|increase)\\(([\\w:]+)(?:\\{([^}]*)\\})?\\[(\\d+)([smhd])\\]\\)$/);
 if(f){const rows=selector(f[2]+(f[3]?"{"+f[3]+"}":""),data);return rows.map(v=>{const s=data.find(x=>x.metric===v.metric&&JSON.stringify(x.labels)===JSON.stringify(v.labels))!;const delta=s.values[5]-s.values[0],secs=Number(f[4])*({s:1,m:60,h:3600,d:86400}[f[5]]||60);return {...v,metric:f[1],value:f[1]==="rate"?delta/secs:delta};});}
 return selector(q,data);
}
export function runPromqlLab(code:string,incident:boolean):LabResult{
 const qs=code.split("\\n").map(x=>x.trim()).filter(x=>x&&!x.startsWith("#"));if(!qs.length)return {ok:false,output:"No expression entered",detail:"Enter a PromQL expression.",evidence:{}};
 const out:string[]=[],ev:Record<string,string|number|boolean>={};let good=0;
 for(const q of qs){try{const vs=evalExpr(q,incident);good++;for(const v of vs){out.push(v.metric+" "+JSON.stringify(v.labels)+" = "+Number(v.value.toFixed(5)));ev[v.metric]=v.value;}}catch(e){out.push("ERROR: "+q+"\\n"+(e instanceof Error?e.message:"Query failed"));}}
 return {ok:good===qs.length,output:out.join("\\n"),detail:good+"/"+qs.length+" expressions evaluated against six timestamped samples. "+(incident?"Injected failure data active.":"Baseline data active."),evidence:ev};
}
type Log={time:string;level:string;service:string;request_id:string;trace_id:string;message:string};
const logData:Log[]=[
 {time:"12:04:01.120",level:"INFO",service:"gateway",request_id:"req-1042",trace_id:"tr-8f21",message:"Request received GET /checkout"},
 {time:"12:04:01.141",level:"INFO",service:"auth",request_id:"req-1042",trace_id:"tr-8f21",message:"JWT validation succeeded"},
 {time:"12:04:02.002",level:"ERROR",service:"payment-db",request_id:"req-1042",trace_id:"tr-8f21",message:"DatabaseTimeout after 3000ms"},
 {time:"12:04:02.018",level:"WARN",service:"checkout",request_id:"req-1042",trace_id:"tr-8f21",message:"Retry attempt 2/3"},
 {time:"12:04:03.004",level:"ERROR",service:"checkout",request_id:"req-1042",trace_id:"tr-8f21",message:"HTTP 503 returned to client"},
 {time:"12:04:04.300",level:"INFO",service:"catalog",request_id:"req-1043",trace_id:"tr-8f22",message:"GET /products completed 200"}
];
export function runLogsLab(query:string):LabResult{
 const f:Record<string,string>={},terms:string[]=[];
 query.trim().split(/\\s+/).filter(Boolean).forEach(t=>{const m=t.match(/^([\\w]+)[=:](.+)$/);if(m)f[m[1].toLowerCase()]=m[2];else terms.push(t.toLowerCase());});
 const rows=logData.filter(r=>Object.entries(f).every(([k,v])=>{const key=({request:"request_id",trace:"trace_id"} as Record<string,string>)[k]||k;return ["level","service","request_id","trace_id"].includes(key)&&r[key as keyof Log].toLowerCase()===v.toLowerCase();})&&terms.every(t=>(r.message+" "+r.service+" "+r.level).toLowerCase().includes(t)));
 const root=rows.some(r=>r.message.includes("DatabaseTimeout"));
 return {ok:rows.length>0,output:rows.length+" matching events\\n"+rows.map(r=>r.time+" "+r.level+" "+r.service+" request="+r.request_id+" trace="+r.trace_id+" "+r.message).join("\\n"),detail:root?"Root cause: payment-db DatabaseTimeout precedes checkout HTTP 503.":"No database timeout in results; try level=ERROR request_id=req-1042.",evidence:{matches:rows.length,rootCause:root,has503:rows.some(r=>r.message.includes("HTTP 503"))}};
}
export function runTracesLab(query:string):LabResult{
 const id=query.match(/(?:trace_id|trace)\\s*=\\s*([\\w-]+)/i)?.[1];if(id!=="tr-8f21")return {ok:false,output:"No trace matched. Known trace: tr-8f21",detail:"Enter trace_id=tr-8f21.",evidence:{found:false}};
 const spans=[["gateway","GET /checkout",1840,0],["auth-service","validate-token",42,1],["cart-service","read-cart",86,1],["payment-service","authorize",1680,1],["payment-db","SELECT payment",1650,2]];
 return {ok:true,output:"Trace "+id+" · 1840ms total\\n"+spans.map(s=>"  ".repeat(Number(s[3]))+s[0]+"."+s[1]+" "+s[2]+"ms").join("\\n"),detail:"Critical path: payment-db SELECT payment takes 1650ms (89.7% of end-to-end latency).",evidence:{totalMs:1840,dbMs:1650,criticalPath:true}};
}
export function runGrafanaLab(code:string,parseYaml:(s:string)=>unknown):LabResult{
 try{const d=parseYaml(code) as {title?:string;panels?:{title?:string;type?:string;query?:string}[]};const ps=Array.isArray(d.panels)?d.panels:[],errors:string[]=[];if(!d.title)errors.push("Dashboard title required");if(ps.length<4)errors.push("At least four panels required");ps.forEach((p,i)=>{if(!p.title||!p.query)errors.push("Panel "+(i+1)+" requires title and query");if(!["timeseries","time series","stat","gauge","bar","table"].includes((p.type||"").toLowerCase()))errors.push("Panel "+(i+1)+" has unsupported type");});
 return {ok:errors.length===0,output:"Dashboard: "+(d.title||"untitled")+"\\n"+ps.map(p=>p.title+" ["+p.type+"] → "+p.query).join("\\n"),detail:errors.join(". ")||ps.length+" panel definitions parsed and validated from submitted YAML.",evidence:{panelCount:ps.length,valid:errors.length===0}};
 }catch(e){return {ok:false,output:"Dashboard YAML parse error",detail:e instanceof Error?e.message:"Invalid YAML",evidence:{}};}
}
export function runAlertLab(code:string,incident:boolean,ticks:number,parseYaml:(s:string)=>unknown):LabResult{
 try{const d=parseYaml(code) as {groups?:{rules?:{alert?:string;expr?:string;for?:string;labels?:Record<string,string>;annotations?:Record<string,string>}[]}[]};const r=d.groups?.[0]?.rules?.[0],err:string[]=[];if(!r?.alert)err.push("Alert name missing");if(!r?.expr||!/^http_request_duration_seconds_p95\\s*>\\s*\\d+(\\.\\d+)?$/.test(r.expr))err.push("Use p95 metric > numeric threshold");if(!r?.for||!/^\\d+[smhd]$/.test(r.for))err.push("Invalid for duration");if(!r?.labels?.severity||!r.labels.service)err.push("Severity and service labels required");if(!r?.annotations?.summary||!r.annotations.runbook)err.push("Summary and runbook annotations required");if(err.length)return {ok:false,output:"Alert rule invalid",detail:err.join(". "),evidence:{valid:false}};
 const threshold=Number(r!.expr!.split(">").pop()),breach=incident&&1.84>threshold,state=breach?(ticks>=2?"FIRING":"PENDING"):ticks>0?"RESOLVED":"INACTIVE";
 return {ok:true,output:state+" · "+r!.alert+"\\n"+r!.expr+"\\nfor: "+r!.for+"\\nevaluation ticks: "+ticks+"\\ncurrent p95: "+(incident?"1.84":"0.24")+"s",detail:state==="PENDING"?"Condition breached; waiting for second evaluation.":state==="FIRING"?"Condition persisted for two ticks; alert firing.":state==="RESOLVED"?"Condition cleared; alert resolved.":"No active breach.",evidence:{valid:true,breach,firing:state==="FIRING",resolved:state==="RESOLVED",ticks}};
 }catch(e){return {ok:false,output:"Alert YAML parse error",detail:e instanceof Error?e.message:"Invalid YAML",evidence:{}};}
}
export function runKubernetesLab(code:string,healthy:boolean):LabResult{
 let ok=healthy,cpu=healthy?48:94,mem=healthy?62:88,restarts=healthy?0:5,replicas=3;const lines=code.split("\\n").map(x=>x.trim()).filter(Boolean),out:string[]=[];let count=0;
 for(const c of lines){if(/^kubectl\\s+get\\s+nodes/.test(c)){count++;out.push("worker-01 Ready CPU 42% MEM 61%\\nworker-02 Ready CPU "+cpu+"% MEM "+mem+"%");}
 else if(/^kubectl\\s+get\\s+pods/.test(c)){count++;out.push("checkout-7c9d "+(ok?"1/1 Running":"0/1 CrashLoopBackOff")+" restarts="+restarts);}
 else if(/^kubectl\\s+describe\\s+pod\\s+checkout/.test(c)){count++;out.push("Last State: "+(ok?"Running":"Terminated")+"\\nReason: "+(ok?"-":"OOMKilled")+"\\nEvents: "+(ok?"Started, Ready":"BackOff, OOMKilled"));}
 else if(/^kubectl\\s+get\\s+events/.test(c)){count++;out.push(ok?"Normal Started Ready":"Warning BackOff OOMKilled");}
 else if(/^kubectl\\s+top\\s+nodes/.test(c)){count++;out.push("worker-02 CPU "+cpu+"% MEM "+mem+"%");}
 else if(/^kubectl\\s+top\\s+pods/.test(c)){count++;out.push("checkout-7c9d CPU "+(ok?180:950)+"m MEM "+(ok?256:980)+"Mi");}
 else if(/^kubectl\\s+rollout\\s+status\\s+deployment\\/checkout/.test(c)){count++;out.push("deployment/checkout "+(ok?replicas+"/"+replicas+" successfully rolled out":"2/3 replicas available"));}
 else if(/^kubectl\\s+rollout\\s+restart\\s+deployment\\/checkout/.test(c)){count++;ok=true;cpu=48;mem=62;restarts=0;out.push("deployment.apps/checkout restarted; replacement pods healthy");}
 else if(/^kubectl\\s+scale\\s+deployment\\/checkout\\s+--replicas=\\d+/.test(c)){count++;replicas=Number(c.match(/--replicas=(\\d+)/)![1]);out.push("deployment.apps/checkout scaled to "+replicas+" replicas");}
 else out.push("error: unsupported command: "+c);}
 return {ok:count===lines.length&&count>0,output:count+"/"+lines.length+" commands executed\\n"+out.join("\\n"),detail:count!==lines.length?"Unsupported command. Use get, describe, top, rollout status/restart or scale.":ok?"Cluster healthy after simulated recovery.":"Evidence: OOMKilled pod, BackOff events, node pressure and one unavailable replica.",evidence:{recognized:count,total:lines.length,podsHealthy:ok,cpu,memory:mem,restarts,replicas}};
}
