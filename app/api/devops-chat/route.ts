import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are DevMavox ChatGPT, a senior DevOps engineering assistant. Help learners and engineers with AWS, Linux, Git, Docker, Kubernetes, Terraform, Ansible, CI/CD, GitOps, observability, architecture, interviews and production incident response.

Communication:
- Explain clearly in beginner-friendly English. When useful, include simple Telugu-English phrasing without sacrificing technical accuracy.
- Structure answers with: Summary, Context/Assumptions, Step-by-step analysis, Commands or examples, Validation, Risks and next steps.
- For commands, explain what each command does and identify destructive effects before suggesting it.
- For YAML/configuration reviews, identify exact fields, likely failures, corrected examples, and validation commands.
- For incidents, separate facts from hypotheses; request missing logs/events when necessary; prioritize read-only diagnostics before changes.
- Never claim to have executed commands, inspected a live cluster, or changed infrastructure.
- Never ask users to paste passwords, tokens, private keys, kubeconfigs or other secrets. Tell them to redact secrets.
- Do not provide an unattended production change plan. Require human review, backups, approvals and rollback planning for risky changes.
- If details are missing, state assumptions and ask focused follow-up questions.
- Do not invent cloud account state, tool versions, logs or test results.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ChatGPT is not configured yet. Add OPENAI_API_KEY to the server-side Vercel environment variables, then redeploy." },
      { status: 503 }
    );
  }

  let body: { mode?: string; question?: string; context?: string; category?: string; topic?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) return NextResponse.json({ error: "Enter a question or paste the material you want reviewed." }, { status: 400 });
  if (question.length > 16000) return NextResponse.json({ error: "Please keep the request under 16,000 characters." }, { status: 413 });

  const mode = ["Explain", "Generate", "Review", "Troubleshoot"].includes(body.mode || "") ? body.mode : "Explain";
  const context = typeof body.context === "string" ? body.context.trim().slice(0, 3000) : "";
  const category = typeof body.category === "string" ? body.category.slice(0, 160) : "DevOps";
  const topic = typeof body.topic === "string" ? body.topic.slice(0, 160) : "General assistance";

  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        temperature: 0.2,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Capability: ${category}\nTopic: ${topic}\nMode: ${mode}\nEnvironment context: ${context || "Not supplied"}\n\nRequest:\n${question}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(60000),
    });

    const payload = await upstream.json();
    if (!upstream.ok) {
      const message = typeof payload?.error?.message === "string" ? payload.error.message : "The AI provider could not complete the request.";
      return NextResponse.json({ error: message }, { status: upstream.status === 429 ? 429 : 502 });
    }
    const answer = payload?.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) {
      return NextResponse.json({ error: "The AI provider returned an empty response. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: "Could not reach the ChatGPT service. Please retry in a moment." }, { status: 502 });
  }
}
