/* POST /api/contact — the contact form's sender.
 *
 * Sends via Resend's REST API (the house email provider; no SDK needed).
 * Requires RESEND_API_KEY on the site's Vercel project — until it is set the
 * route answers 503 and the form falls back to a mailto link, so the page
 * never dead-ends. Honeypot field + light validation; no storage, no cookies.
 */
import { NextResponse } from "next/server";

const TO = process.env.CONTACT_TO || "hello@astertrack.app";
const FROM = process.env.CONTACT_FROM || "Aster website <hello@astertrack.app>";

const TOPICS = new Set(["general", "organisers", "clubs", "press", "support"]);

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    topic?: string;
    message?: string;
    company?: string; // honeypot — humans never fill this
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name || "").trim().slice(0, 200);
  const email = (body.email || "").trim().slice(0, 320);
  const topic = TOPICS.has(body.topic || "") ? (body.topic as string) : "general";
  const message = (body.message || "").trim().slice(0, 5000);

  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Not configured yet — the client falls back to mailto.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: [email],
      subject: `[site contact · ${topic}] ${name}`,
      text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
