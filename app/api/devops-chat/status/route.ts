import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { configured: Boolean(process.env.OPENAI_API_KEY) },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
