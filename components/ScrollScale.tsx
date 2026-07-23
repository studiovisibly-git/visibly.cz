"use client";

import { useEffect, useRef } from "react";

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

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--s", (from + (to - from) * p).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [from, to]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
