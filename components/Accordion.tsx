"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/types";

export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="faq__item" data-open={isOpen} key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <span className="faq__icon" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div
              className="faq__a"
              id={`${baseId}-a-${i}`}
              aria-hidden={!isOpen}
              style={isOpen ? { maxHeight: "30rem" } : undefined}
            >
              <p className="faq__a-inner">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
