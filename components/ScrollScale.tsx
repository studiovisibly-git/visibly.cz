"use client";

import { useEffect, useRef } from "react";
import { LERP, documentTop, onLayoutChange, onScrollFrame, prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll-linked zvětšení fotky — 1:1 podle Circle šablony, kde obrázek roste
 * ze scale(1) na scale(1.2) podle průchodu viewportem.
 *
 * Ven jdou dvě CSS proměnné a transform si složí CSS:
 *  · `--s` je hodnota mezi `from` a `to`,
 *  · `--p` je surový průchod 0→1, ze kterého se u hranatých fotek počítá
 *    ještě svislý posun. Kdyby se dopočítával z `--s`, musela by CSS znát
 *    rozsah — a ten je u kruhu a u hranaté fotky jiný.
 */
export function ScrollScale({
  children,
  className,
  from = 1,
  to = 1.2,
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Měříme dopředu, ne uvnitř scroll snímku — v něm se pak jen počítá
    // a nastavuje transform (kompozitní, bez přepočtu layoutu).
    let top = 0;
    let height = 0;
    let last = "";
    let inView = true;

    const measure = () => {
      top = documentTop(el);
      height = el.offsetHeight;
    };

    // Mimo viewport se nepočítá nic.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(el);

    let cur: number | null = null;

    const apply = (scrollY: number, vh: number) => {
      if (!inView) return false;
      const relTop = top - scrollY;
      const p = Math.min(1, Math.max(0, (vh - relTop) / (vh + height)));
      const target = from + (to - from) * p;
      // Dojíždění k cíli (smoothing jako v šabloně).
      if (cur === null) cur = target;
      cur += (target - cur) * LERP;
      if (Math.abs(target - cur) < 0.0004) cur = target;
      const next = cur.toFixed(4);
      if (next !== last) {
        last = next;
        el.style.setProperty("--s", next);
        // Průchod zpětně z vyhlazené hodnoty, ať posun a zvětšení jedou spolu.
        el.style.setProperty("--p", ((cur - from) / (to - from)).toFixed(4));
      }
      return cur !== target;
    };

    measure();
    const stopLayout = onLayoutChange(el, measure);
    const stopScroll = onScrollFrame(apply);
    return () => {
      io.disconnect();
      stopLayout();
      stopScroll();
    };
  }, [from, to]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
