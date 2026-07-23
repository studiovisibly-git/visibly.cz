"use client";

import Link from "next/link";
import { ParallaxHeading } from "./ParallaxHeading";
import type { LinkItem } from "@/lib/types";

/**
 * Závěrečné CTA — jednotné na celém webu.
 * Nadpis používá stejný cik-cak parallax jako H1 nadpisy, jen vycentrovaný.
 */
export function FinalCta({
  eyebrow,
  title,
  text,
  cta,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  cta: LinkItem;
  secondary?: LinkItem;
}) {
  return (
    <section className="final section--rule">
      <div className="container container--wide">
        {eyebrow && (
          <span className="eyebrow" data-reveal>
            {eyebrow}
          </span>
        )}
        <ParallaxHeading as="h2" text={title} className="final__title" />
        {text && <p data-reveal>{text}</p>}
        <div className="final__actions" data-reveal>
          <Link href={cta.href} className="btn btn--solid btn--lg">
            {cta.label}
          </Link>
          {secondary && (
            <Link href={secondary.href} className="arrow-link">
              {secondary.label}{" "}
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
