import { siteConfig } from "@/config/site";

/**
 * Build a WhatsApp click-to-chat URL with an optional pre-filled message.
 */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
