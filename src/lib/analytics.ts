export type AnalyticsEvent =
  | "whatsapp_click"
  | "instagram_click"
  | "cta_click"
  | "scroll"
  | "faq_interact";

export function track(
  event: AnalyticsEvent,
  params: Record<string, string | number | undefined> = {},
) {
  const payload = { event, ...params };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }

  if (typeof window.fbq === "function") {
    if (event === "whatsapp_click" || event === "cta_click") {
      window.fbq("track", "Contact", { content_name: event, ...params });
    } else {
      window.fbq("trackCustom", event, params);
    }
  }
}

function injectScript(src: string) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

export function initAnalytics() {
  const gtmId = import.meta.env.VITE_GTM_ID?.trim();
  const ga4Id = import.meta.env.VITE_GA4_ID?.trim();
  const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();

  window.dataLayer = window.dataLayer ?? [];

  if (gtmId) {
    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
  } else if (ga4Id) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`);
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push({ gtag: args });
    };
    window.gtag("js", new Date());
    window.gtag("config", ga4Id);
  }

  if (pixelId) {
    type FbqFn = ((...args: unknown[]) => void) & {
      queue: unknown[][];
      loaded: boolean;
      version: string;
      callMethod?: (...args: unknown[]) => void;
    };
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as FbqFn;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    injectScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }
}

export function initScrollTracking() {
  const marks = [25, 50, 75, 90];
  const seen = new Set<number>();

  const onScroll = () => {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (height <= 0) return;
    const percent = Math.round((scrolled / height) * 100);

    marks.forEach((mark) => {
      if (percent >= mark && !seen.has(mark)) {
        seen.add(mark);
        track("scroll", { percent: mark });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}
