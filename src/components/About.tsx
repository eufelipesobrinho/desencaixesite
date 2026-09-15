import { authorityCards, site } from "@/data/site";
import { Picture } from "@/components/Picture";

export function About() {
  return (
    <section id="sobre" className="section about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-photos reveal">
          <div className="portrait-frame">
            <Picture
              name="marta-desk"
              alt={`${site.professional}, psicóloga responsável pela Desencaixe`}
              className="about-photo-main"
            />
          </div>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow">A psicóloga</p>
          <h2 id="about-title">Conheça Marta Lima</h2>
          <p>
            Marta Lima é psicóloga, formada pelo Centro Universitário Santo
            Agostinho, com atuação orientada pela Análise do Comportamento.
          </p>
          <p>
            Sua experiência inclui Psicologia Clínica, desenvolvimento e
            ampliação de comportamentos funcionais, habilidades sociais e
            competências relacionadas à comunicação.
          </p>
          <p className="crp-chip">{site.crp}</p>
          <div className="authority-grid">
            {authorityCards.map((item) => (
              <p key={item} className="authority-card">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
