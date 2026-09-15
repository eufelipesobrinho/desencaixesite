import { faq } from "@/data/site";
import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/Icons";
import { faqCtaKey, WhatsAppLink } from "@/components/WhatsAppLink";

export function FAQ() {
  return (
    <section id="duvidas" className="section faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="section-heading reveal">
          <p className="eyebrow">Dúvidas</p>
          <h2 id="faq-title">Perguntas frequentes</h2>
          <p className="section-intro">
            Se a sua dúvida não estiver aqui, o WhatsApp é o melhor caminho
            para conversar com a Marta.
          </p>
        </div>
        <div className="faq-list">
          {faq.map((item) => (
            <details
              key={item.question}
              className="faq-item"
              onToggle={(event) => {
                if ((event.currentTarget as HTMLDetailsElement).open) {
                  track("faq_interact", { question: item.question });
                }
              }}
            >
              <summary>{item.question}</summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
                {"cta" in item && item.cta ? (
                  <WhatsAppLink
                    className="text-link"
                    messageKey={faqCtaKey(item)}
                    location={`faq_${item.cta}`}
                  >
                    <WhatsAppIcon className="icon" />
                    Conversar pelo WhatsApp
                  </WhatsAppLink>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
