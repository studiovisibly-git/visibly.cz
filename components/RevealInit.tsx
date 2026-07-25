"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Jemný scroll-reveal pro prvky s atributem data-reveal. */
export function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px 18% 0px", threshold: 0.01 },
    );

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    els.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });

    /* Nekonečné animace (marquee pásy, rotující badge) běží i mimo obrazovku
       a zbytečně zatěžují kompozitor při scrollu — pásy jsou přes 4000 px
       široké. Pouštíme je jen když jsou vidět. */
    const loops = document.querySelectorAll<HTMLElement>("[data-loop]");
    const loopObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-paused", !entry.isIntersecting);
        }
      },
      { rootMargin: "10% 0px" },
    );
    loops.forEach((el) => {
      el.classList.add("is-paused");
      loopObserver.observe(el);
    });

    return () => {
      observer.disconnect();
      loopObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
