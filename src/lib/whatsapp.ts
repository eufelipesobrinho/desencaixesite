import { site } from "@/data/site";

export type WhatsAppMessageKey =
  | "default"
  | "hero"
  | "approach"
  | "howItWorks"
  | "values"
  | "schedule"
  | "final";

export function whatsappUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${site.whatsappE164}?text=${encoded}`;
}
