import { useEffect, useId, useRef, useState } from "react";
import { nav, site } from "@/data/site";
import { track } from "@/lib/analytics";
import { Logo } from "@/components/Picture";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/Icons";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (id: string) => () => {
    setOpen(false);
    track("cta_click", { location: "header_nav", target: id });
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <a href="#inicio" className="header-logo" onClick={goTo("inicio")}>
          <Logo />
        </a>

        <nav className="header-nav" aria-label="Principal">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={goTo(item.id)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <WhatsAppLink
            className="btn btn-primary header-cta"
            messageKey="default"
            location="header"
          >
            <WhatsAppIcon className="icon" />
            Falar no WhatsApp
          </WhatsAppLink>

          <WhatsAppLink
            className="icon-btn header-wa-mobile"
            messageKey="default"
            location="header_mobile_icon"
            ariaLabel={`Falar com ${site.professional} pelo WhatsApp`}
          >
            <WhatsAppIcon className="icon" />
          </WhatsAppLink>

          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="icon" /> : <MenuIcon className="icon" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`mobile-nav ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div
          className="mobile-nav-panel"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeRef}
            type="button"
            className="sr-only-focusable"
            onClick={() => setOpen(false)}
          >
            Fechar menu
          </button>
          <nav aria-label="Mobile">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={goTo(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
          <WhatsAppLink
            className="btn btn-primary btn-block"
            messageKey="default"
            location="header_mobile_menu"
          >
            <WhatsAppIcon className="icon" />
            Falar no WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </header>
  );
}
