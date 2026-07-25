"use client";

import { useEffect, useRef } from "react";
import { NO_SCROLL_FX } from "@/lib/motion";

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

    const mq = window.matchMedia(NO_SCROLL_FX);
    let raf = 0;
    const update = () => {
      raf = 0;
      if (mq.matches) {
        el.style.setProperty("--s", String(from));
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--s", (from + (to - from) * p).toFixed(4));
    };
    const onScroll = () => {
      if (mq.matches || raf) return;
      raf = requestAnimationFrame(update);
    };
    const onBreakpoint = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onBreakpoint);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [from, to]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
