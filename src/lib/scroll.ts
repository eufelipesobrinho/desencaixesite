export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function headerOffset(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-h")
    .trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 76;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let scrollFrame = 0;
let stopScroll: (() => void) | null = null;

function cancelAnimatedScroll() {
  if (scrollFrame) cancelAnimationFrame(scrollFrame);
  scrollFrame = 0;
  if (stopScroll) {
    stopScroll();
    stopScroll = null;
  }
}

function animateScrollTo(targetY: number) {
  cancelAnimatedScroll();

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const duration = Math.min(1600, Math.max(850, Math.abs(distance) * 0.55));
  const start = performance.now();

  const halt = () => cancelAnimatedScroll();
  window.addEventListener("wheel", halt, { passive: true });
  window.addEventListener("touchstart", halt, { passive: true });
  window.addEventListener("keydown", halt);
  stopScroll = () => {
    window.removeEventListener("wheel", halt);
    window.removeEventListener("touchstart", halt);
    window.removeEventListener("keydown", halt);
  };

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) {
      scrollFrame = requestAnimationFrame(step);
    } else {
      cancelAnimatedScroll();
    }
  };

  scrollFrame = requestAnimationFrame(step);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  document.body.classList.remove("menu-open");

  const top = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - headerOffset() - 8,
  );

  if (prefersReducedMotion()) {
    window.scrollTo(0, top);
  } else {
    animateScrollTo(top);
  }

  history.replaceState(null, "", `#${id}`);
}

export function bindInPageScroll() {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest('a[href^="#"]');
    if (!(link instanceof HTMLAnchorElement)) return;

    const id = decodeURIComponent(link.hash.replace("#", ""));
    if (!id || !document.getElementById(id)) return;

    event.preventDefault();
    scrollToId(id);
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
