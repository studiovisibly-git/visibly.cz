"use client";

import { useEffect } from "react";

/** Prvky, nad kterými se puntík zvětší — stejně jako v šabloně nad klikacím. */
const CLICKABLE =
  'a, button, input, textarea, select, label, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';

/**
 * Puntík sledující kurzor — 1:1 podle .circle-cursor v Circle šabloně
 * (14px, rgba(0,0,0,.3), kruh). Nad klikacím prvkem se zvětší.
 * Jen pro myš: dotyková zařízení a prefers-reduced-motion ho nedostanou.
 */
export function CursorDot() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      dot.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.classList.add("is-visible");
      const target = e.target as Element | null;
      dot.classList.toggle("is-active", !!target?.closest?.(CLICKABLE));
    };
    const onLeave = () => dot.classList.remove("is-visible");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      dot.remove();
    };
  }, []);

  return null;
}
