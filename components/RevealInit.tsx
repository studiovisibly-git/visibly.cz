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

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
