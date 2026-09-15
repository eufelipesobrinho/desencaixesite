import { helpCards } from "@/data/site";

const icons = [
  "M4 12h16M12 4v16",
  "M5 12a7 7 0 1 0 14 0 7 7 0 0 0-14 0Zm7-4v4l3 2",
  "M8 9h8M8 15h5",
  "M12 21s-7-4.4-7-10a7 7 0 0 1 14 0c0 5.6-7 10-7 10Z",
  "M4 16l6-6 4 4 6-8",
  "M12 3l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V7l8-4Z",
  "M5 19V5h14M9 15l3-3 3 3 4-4",
];

export function HelpCards() {
  return (
    <section className="section help" aria-labelledby="help-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Psicoterapia</p>
          <h2 id="help-title">Como a psicoterapia pode ajudar</h2>
          <p className="section-intro">
            O trabalho clínico pode apoiar o desenvolvimento e a ampliação de
            repertórios relevantes para a vida cotidiana e para as relações.
          </p>
        </div>
        <div className="card-grid">
          {helpCards.map((card, index) => (
            <article key={card.title} className="info-card reveal">
              <span className="card-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path
                    d={icons[index]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
