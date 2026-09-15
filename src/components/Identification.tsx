import { identificationItems } from "@/data/site";

export function Identification() {
  return (
    <section className="section identify" aria-labelledby="identify-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Identificação</p>
          <h2 id="identify-title">
            Talvez você esteja tentando se encaixar em algo que já não funciona.
          </h2>
          <p className="section-intro">
            A psicoterapia pode ser um espaço para observar o que tem se
            repetido e construir formas mais funcionais de responder às
            situações da vida — sem precisar se encaixar em um diagnóstico
            para começar.
          </p>
        </div>
        <ul className="identify-list">
          {identificationItems.map((item) => (
            <li key={item} className="identify-item reveal">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
