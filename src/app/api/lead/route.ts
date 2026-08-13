import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  locale?: string;
  // Honeypot: real users never fill this hidden field.
  company?: string;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot hit: pretend success so bots do not retry, but send nothing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const service = (body.service ?? "").trim();
  const message = (body.message ?? "").trim();

  // Server-side validation mirrors the client rules.
  const errors: Record<string, boolean> = {};
  if (!name) errors.name = true;
  if (!email && !phone) errors.contact = true;
  if (!message) errors.message = true;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = true;
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || siteConfig.email;
  const from = process.env.LEAD_FROM_EMAIL || "Forge Arabia <leads@forgearabia.com>";

  // Not configured yet: report a delivery gap so the client offers WhatsApp,
  // instead of silently dropping the lead or crashing.
  if (!apiKey) {
    console.warn("[lead] RESEND_API_KEY is not set; email was not sent.");
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email || "-"],
    ["Phone", phone || "-"],
    ["Service", service || "Not specified"],
    ["Message", message],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0b1020;line-height:1.6">
      <h2 style="margin:0 0 12px">New enquiry from the Forge Arabia website</h2>
      <table style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 14px 6px 0;color:#5b6172;vertical-align:top"><strong>${k}</strong></td><td style="padding:6px 0">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New enquiry from ${name}`,
      html,
      text,
      replyTo: email || undefined,
    });
    if (error) {
      console.error("[lead] Resend error:", error);
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] send failed:", err);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }
}
