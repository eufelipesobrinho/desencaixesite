import { site, steps } from "@/data/site";
import { Picture } from "@/components/Picture";
import { WhatsAppIcon } from "@/components/Icons";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section how"
      aria-labelledby="how-title"
    >
      <div className="container">
        <div className="how-top">
          <div className="section-heading reveal">
            <p className="eyebrow">O processo</p>
            <h2 id="how-title">Como funciona o atendimento online</h2>
            <p className="section-intro">
              O primeiro passo é uma conversa. Os valores e detalhes do
              atendimento são informados diretamente pelo WhatsApp.
            </p>
            <p className="online-badge">Atendimento 100% online</p>
          </div>
          <figure className="how-photo reveal">
            <Picture
              name="marta-online"
              alt={`${site.professional} em atendimento online`}
              className="how-img"
            />
          </figure>
        </div>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step.number} className="step-card reveal">
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="how-cta reveal">
          <WhatsAppLink
            className="btn btn-primary"
            messageKey="howItWorks"
            location="how_it_works"
          >
            <WhatsAppIcon className="icon" />
            Conversar pelo WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
