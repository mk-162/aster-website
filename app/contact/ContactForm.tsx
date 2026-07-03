"use client";

/* ContactForm — posts to /api/contact. Degrades to a mailto link when the
 * sender isn't configured (503) so the page never dead-ends. No storage
 * beyond the in-flight request; honeypot field for bots. */

import { useState } from "react";
import Button from "@/components/Button";

const TOPICS = [
  { value: "general", label: "General" },
  { value: "organisers", label: "I organise events" },
  { value: "clubs", label: "I run a club" },
  { value: "press", label: "Press" },
  { value: "support", label: "Support" },
];

const inputClass =
  "w-full rounded-xl border-2 border-dark/20 bg-white px-3.5 py-2.5 text-[15px] text-dark placeholder:text-dark/40 focus:border-lime-deep outline-none";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error" | "mailto">("idle");
  const [fields, setFields] = useState({ name: "", email: "", topic: "general", message: "", company: "" });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) setState("sent");
      else if (res.status === 503) setState("mailto");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="border-2 border-dark rounded-2xl bg-lime-bg shadow-pop-1 p-6">
        <p className="font-condensed uppercase tracking-[0.03em] font-semibold text-xl text-dark mb-1">
          Got it. Thanks.
        </p>
        <p className="text-[15px] text-dark/70 m-0">
          We read everything and reply to most messages within a working day.
        </p>
      </div>
    );
  }

  const mailtoHref = `mailto:hello@astertrack.app?subject=${encodeURIComponent(
    `[${fields.topic}] ${fields.name}`,
  )}&body=${encodeURIComponent(fields.message)}`;

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-condensed uppercase tracking-[0.06em] text-[12px] font-semibold text-dark/60 block mb-1.5">Name</span>
          <input required value={fields.name} onChange={set("name")} className={inputClass} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="font-condensed uppercase tracking-[0.06em] text-[12px] font-semibold text-dark/60 block mb-1.5">Email</span>
          <input required type="email" value={fields.email} onChange={set("email")} className={inputClass} placeholder="you@example.com" />
        </label>
      </div>
      <label className="block">
        <span className="font-condensed uppercase tracking-[0.06em] text-[12px] font-semibold text-dark/60 block mb-1.5">Topic</span>
        <select value={fields.topic} onChange={set("topic")} className={inputClass}>
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="font-condensed uppercase tracking-[0.06em] text-[12px] font-semibold text-dark/60 block mb-1.5">Message</span>
        <textarea required rows={6} value={fields.message} onChange={set("message")} className={inputClass} placeholder="What can we help with?" />
      </label>
      {/* Honeypot — hidden from humans */}
      <input type="text" value={fields.company} onChange={set("company")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {state === "error" && (
        <p className="text-sm text-red-600 m-0">
          That didn&apos;t send. Try again, or email{" "}
          <a className="underline" href="mailto:hello@astertrack.app">hello@astertrack.app</a>.
        </p>
      )}
      {state === "mailto" && (
        <p className="text-sm text-dark/70 m-0">
          Our form is having a moment —{" "}
          <a className="underline text-lime-deep font-semibold" href={mailtoHref}>
            send it by email instead
          </a>{" "}
          (your message is preserved).
        </p>
      )}

      <Button type="submit" variant="primary" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
