import { practiceItems, site } from "@/data/site";
import { Picture } from "@/components/Picture";
import { WhatsAppIcon } from "@/components/Icons";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function Approach() {
  return (
    <section
      id="abordagem"
      className="section approach"
      aria-labelledby="approach-title"
    >
      <div className="container approach-grid">
        <div className="approach-copy reveal">
          <p className="eyebrow">{site.approach}</p>
          <h2 id="approach-title">Entender o comportamento é parte do processo.</h2>
          <p>
            A Análise do Comportamento busca compreender o comportamento
            considerando sua relação com o ambiente e com as situações em que
            ele acontece.
          </p>
          <p>
            Na psicoterapia, isso pode significar observar padrões, compreender
            o que mantém determinados comportamentos e desenvolver ou ampliar
            repertórios mais funcionais para a vida da pessoa.
          </p>
          <h3>E como isso aparece na prática?</h3>
          <ul className="practice-list">
            {practiceItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <WhatsAppLink
            className="btn btn-primary"
            messageKey="approach"
            location="approach"
          >
            <WhatsAppIcon className="icon" />
            Quero conversar sobre meu caso
          </WhatsAppLink>
        </div>
        <figure className="approach-media reveal">
          <Picture
            name="marta-book"
            alt={`${site.professional} com material de Análise Comportamental Clínica`}
            className="approach-photo"
          />
          <figcaption>
            Atuação pela Análise do Comportamento
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
