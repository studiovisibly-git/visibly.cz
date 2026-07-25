/**
 * Sdílený scroll ticker pro všechny scroll-linked efekty.
 *
 * Proč: dřív měl každý efekt vlastní rAF smyčku a v ní volal
 * getBoundingClientRect() — tedy N vynucených přepočtů layoutu na každý
 * snímek. Na mobilu se kvůli tomu scroll trhal. Originální šablona (Webflow
 * IX2) to dělá jinak a jede plynule: jeden ticker, pozice prvků změřené
 * dopředu a za běhu se sahá jen na transform (kompozitní, bez layoutu).
 */

type Subscriber = (scrollY: number, viewportHeight: number) => void;

const subscribers = new Set<Subscriber>();
let raf = 0;
let listening = false;

function frame() {
  raf = 0;
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  const vh = window.innerHeight || 1;
  for (const fn of subscribers) fn(scrollY, vh);
}

function request() {
  if (!raf) raf = requestAnimationFrame(frame);
}

/** Přihlásí callback k jedinému sdílenému tickeru. Vrací odhlašovací funkci. */
export function onScrollFrame(fn: Subscriber): () => void {
  subscribers.add(fn);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
  }
  request();

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      listening = false;
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }
  };
}

/**
 * Vzdálenost prvku od horního okraje dokumentu. Používá offsetTop řetěz —
 * čte se jen při mountu a resize, nikdy uvnitř scroll snímku.
 */
export function documentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/** Přepočítá měření při změně velikosti okna i prvku. */
export function onLayoutChange(el: HTMLElement, fn: () => void): () => void {
  const ro = new ResizeObserver(fn);
  ro.observe(el);
  window.addEventListener("resize", fn, { passive: true });
  return () => {
    ro.disconnect();
    window.removeEventListener("resize", fn);
  };
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
