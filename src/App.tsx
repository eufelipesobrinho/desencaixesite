import { useEffect } from "react";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { BrandStory } from "@/components/BrandStory";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Formation } from "@/components/Formation";
import { Header } from "@/components/Header";
import { HelpCards } from "@/components/HelpCards";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Identification } from "@/components/Identification";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { bindInPageScroll, prefersReducedMotion } from "@/lib/scroll";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const unbindScroll = bindInPageScroll();

    if (prefersReducedMotion()) {
      return unbindScroll;
    }

    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      unbindScroll();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#inicio">
        Ir para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Identification />
        <HelpCards />
        <About />
        <Approach />
        <BrandStory />
        <Formation />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
