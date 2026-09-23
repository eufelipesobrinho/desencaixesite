import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { PuzzleMark } from "@/components/BrandMarks";
import { Picture } from "@/components/Picture";
import { WhatsAppIcon } from "@/components/Icons";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">
            <span className="brand-word">{site.brand}</span>
            <span className="dot" aria-hidden="true" />
            Clínica Online
          </p>
          <h1>
            Nem tudo precisa se encaixar.
            <em> Às vezes, é preciso compreender novos caminhos.</em>
          </h1>
          <p className="lead">
            Psicoterapia online com {site.professional}, psicóloga que atua pela{" "}
            {site.approach}, com foco no desenvolvimento e ampliação de
            repertórios para uma vida mais funcional e relações mais saudáveis.
          </p>
          <p className="identity">
            {site.professional} | {site.role} | {site.crp}
          </p>
          <div className="hero-actions">
            <WhatsAppLink
              className="btn btn-primary"
              messageKey="hero"
              location="hero_primary"
            >
              <WhatsAppIcon className="icon" />
              Quero conversar com a Marta
            </WhatsAppLink>
            <a
              className="btn btn-secondary"
              href="#abordagem"
              onClick={() =>
                track("cta_click", {
                  location: "hero_secondary",
                  target: "abordagem",
                })
              }
            >
              Conhecer a abordagem
            </a>
          </div>
          <p className="hero-note">Atendimento 100% online</p>
        </div>

        <div className="hero-media reveal">
          <div className="portrait-frame">
            <PuzzleMark className="portrait-puzzle" />
            <Picture
              name="marta-hero"
              alt={`${site.professional}, psicóloga responsável pela Desencaixe`}
              className="portrait-img"
              priority
            />
          </div>
          <p className="portrait-caption">
            {site.professionalShort}
            <span>
              {site.role} · {site.crp}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
