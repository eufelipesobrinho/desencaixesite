import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/Icons";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function WhatsAppFloat() {
  return (
    <WhatsAppLink
      className="wa-float"
      messageKey="default"
      location="floating"
      ariaLabel={`Falar com ${site.professional} pelo WhatsApp`}
    >
      <WhatsAppIcon className="icon" />
      <span>WhatsApp</span>
    </WhatsAppLink>
  );
}
