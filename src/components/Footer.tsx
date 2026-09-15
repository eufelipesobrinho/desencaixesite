import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { Logo } from "@/components/Picture";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            <strong>Desencaixe</strong> — Clínica Online de Psicologia
          </p>
          <p>
            {site.professional} | {site.role} | {site.crp}
          </p>
        </div>
        <div className="footer-meta">
          <p>
            <span>Atendimento</span>
            Online
          </p>
          <p>
            <span>WhatsApp</span>
            <WhatsAppLink
              className="footer-link"
              messageKey="default"
              location="footer_phone"
            >
              {site.whatsappDisplay}
            </WhatsAppLink>
          </p>
          <p>
            <span>Instagram</span>
            <a
              className="footer-link"
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("instagram_click", { location: "footer" })}
            >
              {site.instagramHandle}
            </a>
          </p>
        </div>
        <div className="footer-actions">
          <WhatsAppLink
            className="btn btn-primary"
            messageKey="default"
            location="footer_cta"
          >
            <WhatsAppIcon className="icon" />
            WhatsApp
          </WhatsAppLink>
          <a
            className="btn btn-secondary"
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("instagram_click", { location: "footer_button" })}
          >
            <InstagramIcon className="icon" />
            Instagram
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} Desencaixe. Clínica online de psicologia.
        </p>
      </div>
    </footer>
  );
}
