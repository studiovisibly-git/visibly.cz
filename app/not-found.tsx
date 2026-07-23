import Link from "next/link";
import { INQUIRY_URL } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="final container">
      <span className="eyebrow">Chyba 404</span>
      <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5.25rem)", fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.02em" }}>
        Tahle stránka není vidět.
      </h1>
      <p style={{ marginTop: "1.4rem", color: "var(--muted)", fontWeight: 500 }}>
        Což je u nás docela ironie. Zkuste rozcestník, nebo nám rovnou napište.
      </p>
      <div className="final__actions">
        <Link href="/" className="btn">
          Na úvodní stránku
        </Link>
        <Link href={INQUIRY_URL} className="arrow-link">
          Poptat výrobu <span className="arr" aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
