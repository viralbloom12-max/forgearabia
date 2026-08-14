"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, track } from "@/lib/analytics";

/**
 * Loads Google Analytics 4 only when NEXT_PUBLIC_GA_ID is set (no fake IDs),
 * and tracks conversion events with a single delegated click listener so we do
 * not have to wire handlers into every button:
 *  - whatsapp_click on wa.me links
 *  - phone_click on tel: links
 *  - cta_click on links to the contact page or section
 * Form submissions fire generate_lead directly from the lead form.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.includes("wa.me")) {
        track("whatsapp_click", { link_url: href });
      } else if (href.startsWith("tel:")) {
        track("phone_click", { link_url: href });
      } else if (href.includes("/contact") || href.includes("#contact")) {
        track("cta_click", { link_url: href });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
