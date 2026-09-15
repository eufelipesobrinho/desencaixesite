import { site } from "@/data/site";

export function applySiteUrl() {
  const raw = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, "");
  if (!raw) return;

  const origin = raw;
  const canonicalHref = `${origin}/`;
  const image = `${origin}/og.jpg`;

  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalHref;

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector<HTMLMetaElement>(selector);
    if (el) el.setAttribute("content", content);
  };

  setMeta('meta[property="og:url"]', canonicalHref);
  setMeta('meta[property="og:image"]', image);
  setMeta('meta[name="twitter:image"]', image);
  document.title = site.title;
}
