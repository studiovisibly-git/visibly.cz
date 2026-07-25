"use client";

import { useEffect, useRef } from "react";
import { documentTop, onLayoutChange, onScrollFrame, prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll-linked zvětšení kruhové fotky — 1:1 podle Circle šablony,
 * kde .circle-image roste ze scale(1) na scale(1.2) podle průchodu viewportem.
 * Hodnotu předává jako CSS proměnnou --s, samotný transform řeší CSS.
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

    const apply = (scrollY: number, vh: number) => {
      if (!inView) return;
      const relTop = top - scrollY;
      const p = Math.min(1, Math.max(0, (vh - relTop) / (vh + height)));
      const next = (from + (to - from) * p).toFixed(4);
      if (next !== last) {
        last = next;
        el.style.setProperty("--s", next);
      }
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
