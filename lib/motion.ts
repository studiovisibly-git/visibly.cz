/**
 * Sdílený scroll ticker pro všechny scroll-linked efekty.
 *
 * Proč takhle: efekty plánované ze scroll UDÁLOSTÍ dopadají střídavě do
 * téhož / dalšího snímku (závisí, kdy událost přijde vůči snímkové smyčce).
 * Prvky pak o snímek poskakují vůči plynule scrollující stránce — na iOS
 * viditelné jako trhání parallaxových textů. Originální šablona (Webflow
 * IX2) proto jede nepřetržitou rAF smyčkou a k cíli se DOJÍŽDÍ s easingem;
 * děláme totéž. Smyčka po pár desítkách klidných snímků usne a probudí ji
 * další scroll/touch/resize.
 */

/** Vrací true, dokud se efekt ještě dolaďuje (drží smyčku vzhůru i po
 *  zastavení scrollu, než easing dojede). */
type Subscriber = (scrollY: number, viewportHeight: number) => boolean | void;

const subscribers = new Set<Subscriber>();
let raf = 0;
let running = false;
let listening = false;
let idleFrames = 0;
let lastY = -1;

function frame() {
  raf = 0;
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  const vh = window.innerHeight || 1;

  let settling = false;
  for (const fn of subscribers) {
    if (fn(scrollY, vh) === true) settling = true;
  }

  if (scrollY === lastY && !settling) idleFrames++;
  else idleFrames = 0;
  lastY = scrollY;

  // ~0,75 s klidu → usnout; probudí nás wake() z dalšího vstupu.
  if (idleFrames > 45 || subscribers.size === 0) {
    running = false;
    return;
  }
  raf = requestAnimationFrame(frame);
}

function wake() {
  idleFrames = 0;
  if (!running && subscribers.size > 0) {
    running = true;
    raf = requestAnimationFrame(frame);
  }
}

/** Přihlásí callback ke sdílené smyčce. Vrací odhlašovací funkci. */
export function onScrollFrame(fn: Subscriber): () => void {
  subscribers.add(fn);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("touchmove", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
  }
  wake();

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      listening = false;
      window.removeEventListener("scroll", wake);
      window.removeEventListener("touchmove", wake);
      window.removeEventListener("resize", wake);
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      running = false;
    }
  };
}

/** Easing k cílové hodnotě — stejné „dojíždění" jako smoothing v šabloně. */
export const LERP = 0.16;

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
