import type { ReactNode } from "react";
import { faq, site, whatsappMessages } from "@/data/site";
import { track } from "@/lib/analytics";
import { whatsappUrl, type WhatsAppMessageKey } from "@/lib/whatsapp";

type FaqItem = (typeof faq)[number];

type WhatsAppLinkProps = {
  messageKey?: WhatsAppMessageKey;
  message?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  location: string;
};

export function WhatsAppLink({
  messageKey = "default",
  message,
  className,
  children,
  ariaLabel,
  location,
}: WhatsAppLinkProps) {
  const text = message ?? whatsappMessages[messageKey];
  const href = whatsappUrl(text);

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? `Falar com ${site.professional} pelo WhatsApp`}
      onClick={() => {
        if (typeof window.fbq === "function") {
          window.fbq("track", "Contact");
        }
        track("whatsapp_click", {
          location,
          message_key: messageKey,
        });
      }}
    >
      {children}
    </a>
  );
}

export function faqCtaKey(item: FaqItem): WhatsAppMessageKey {
  return "cta" in item && item.cta ? item.cta : "default";
}
