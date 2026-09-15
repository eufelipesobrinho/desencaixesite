import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/Icons";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function FinalCTA() {
  return (
    <section id="contato" className="final-cta" aria-labelledby="final-title">
      <div className="container final-inner reveal">
        <p className="eyebrow light">Desencaixe · Clínica Online</p>
        <h2 id="final-title">
          Talvez você não precise encontrar um lugar para se encaixar.
          <em> Talvez precise compreender novos caminhos.</em>
        </h2>
        <p className="final-lead">
          O primeiro passo pode ser simplesmente conversar.
        </p>
        <WhatsAppLink
          className="btn btn-light"
          messageKey="final"
          location="final_cta"
        >
          <WhatsAppIcon className="icon" />
          Falar com Marta pelo WhatsApp
        </WhatsAppLink>
        <p className="final-meta">
          {site.professional} — {site.role}
          <span>{site.crp}</span>
        </p>
      </div>
    </section>
  );
}
