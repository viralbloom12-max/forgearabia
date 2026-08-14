/**
 * Thin wrapper over gtag. Safe to call anywhere: it no-ops when analytics is
 * not configured (no NEXT_PUBLIC_GA_ID) or on the server.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type ConversionEvent =
  | "generate_lead"
  | "whatsapp_click"
  | "phone_click"
  | "cta_click";

export function track(event: ConversionEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params ?? {});
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
