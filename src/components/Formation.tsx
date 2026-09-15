import { formation } from "@/data/site";

export function Formation() {
  return (
    <section className="section formation" aria-labelledby="formation-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Percurso</p>
          <h2 id="formation-title">Formação e experiência</h2>
          <p className="section-intro">
            Formação em Psicologia, formação complementar em Análise do
            Comportamento e participação em eventos acadêmicos da área.
          </p>
        </div>
        <div className="formation-groups">
          {formation.map((group) => (
            <section key={group.group} className="formation-group reveal">
              <h3>{group.group}</h3>
              <ol className="timeline">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <span className="timeline-kind">{item.kind}</span>
                    <strong>{item.title}</strong>
                    <span>{item.place}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
