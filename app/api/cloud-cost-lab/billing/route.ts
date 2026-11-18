import { createHash, createHmac } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REGION = process.env.AWS_COST_EXPLORER_REGION || "us-east-1";
const ENDPOINT = "https://ce." + REGION + ".amazonaws.com/";

function hmac(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value, "utf8").digest();
}
function hash(value: string) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}
function xml(xmlText: string, tag: string) {
  const match = xmlText.match(new RegExp("<" + tag + ">([\\\\s\\\\S]*?)</" + tag + ">"));
  return match?.[1] ?? "";
}
function amount(block: string) {
  return Number(xml(block, "Amount") || 0);
}
function serviceKey(block: string) {
  const keys = xml(block, "Keys");
  const member = xml(keys, "member");
  return member.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

export async function GET(request: Request) {
  const accessKey = process.env.AWS_ACCESS_KEY_ID;
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
  const sessionToken = process.env.AWS_SESSION_TOKEN;
  if (!accessKey || !secretKey) {
    return NextResponse.json({ connected: false, code: "AWS_BILLING_NOT_CONFIGURED", message: "AWS Cost Explorer is not connected. Configure read-only AWS credentials in Vercel environment variables." }, { status: 503 });
  }

  const requestedDays = Number(new URL(request.url).searchParams.get("days") || "30");
  const days = Number.isInteger(requestedDays) ? Math.min(90, Math.max(7, requestedDays)) : 30;
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  const date = new Date();
  const amzDate = date.toISOString().replace(/[:-]|\\.\\d{3}/g, "");
  const shortDate = amzDate.slice(0, 8);

  const params = new URLSearchParams();
  params.set("Action", "GetCostAndUsage");
  params.set("Version", "2017-10-25");
  params.set("TimePeriod.Start", start.toISOString().slice(0, 10));
  params.set("TimePeriod.End", end.toISOString().slice(0, 10));
  params.set("Granularity", "MONTHLY");
  params.set("Metrics.member.1", "UnblendedCost");
  params.set("GroupBy.member.1.Type", "DIMENSION");
  params.set("GroupBy.member.1.Key", "SERVICE");
  const body = params.toString();
  const payloadHash = hash(body);
  const host = new URL(ENDPOINT).host;
  const headers: Record<string, string> = {
    "content-type": "application/x-www-form-urlencoded; charset=utf-8",
    host,
    "x-amz-date": amzDate,
    "x-amz-content-sha256": payloadHash
  };
  if (sessionToken) headers["x-amz-security-token"] = sessionToken;

  const signedHeaders = Object.keys(headers).sort().join(";");
  const canonicalHeaders = Object.keys(headers).sort().map(key => key + ":" + headers[key].trim() + "\n").join("");
  const canonicalRequest = ["POST", "/", "", canonicalHeaders, signedHeaders, payloadHash].join("\n");
  const scope = shortDate + "/" + REGION + "/ce/aws4_request";
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, scope, hash(canonicalRequest)].join("\n");
  const dateKey = hmac("AWS4" + secretKey, shortDate);
  const regionKey = hmac(dateKey, REGION);
  const serviceKey = hmac(regionKey, "ce");
  const signingKey = hmac(serviceKey, "aws4_request");
  const signature = createHmac("sha256", signingKey).update(stringToSign, "utf8").digest("hex");
  headers.authorization = "AWS4-HMAC-SHA256 Credential=" + accessKey + "/" + scope + ", SignedHeaders=" + signedHeaders + ", Signature=" + signature;

  try {
    const response = await fetch(ENDPOINT, { method: "POST", headers, body, cache: "no-store", signal: AbortSignal.timeout(12000) });
    const responseText = await response.text();
    if (!response.ok) {
      return NextResponse.json({ connected: false, code: "AWS_COST_EXPLORER_ERROR", message: xml(responseText, "Message") || "AWS Cost Explorer request failed." }, { status: 502 });
    }
    const totalBlock = xml(responseText, "Total");
    const groups = Array.from(responseText.matchAll(/<Groups>([\\s\\S]*?)<\\/Groups>/g)).map(match => {
      const block = match[1];
      return { service: serviceKey(block), amount: amount(block), unit: xml(block, "Unit") || "USD" };
    }).sort((a, b) => b.amount - a.amount);
    const periods = Array.from(responseText.matchAll(/<ResultsByTime>([\\s\\S]*?)<\\/ResultsByTime>/g)).map(match => {
      const block = match[1];
      const time = xml(block, "TimePeriod");
      return { start: xml(time, "Start"), end: xml(time, "End"), total: amount(xml(block, "Total")) };
    });
    return NextResponse.json({
      connected: true,
      source: "AWS Cost Explorer",
      currency: xml(totalBlock, "Unit") || "USD",
      total: amount(totalBlock),
      days,
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
      services: groups,
      periods
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ connected: false, code: "AWS_BILLING_UNAVAILABLE", message: "Could not reach AWS Cost Explorer. Check the AWS region, IAM policy and network configuration." }, { status: 502 });
  }
}
