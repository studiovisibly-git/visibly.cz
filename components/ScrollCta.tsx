/**
 * Scroll CTA se zalomenou šipkou dolů — jednotné na celém webu.
 * Tvar i rozměry podle originálu: text 15px/700, ikona 18px vpravo.
 */
export function ScrollCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="scroll-cta">
      <span>{children}</span>
      <svg
        className="scroll-cta__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        aria-hidden="true"
      >
        <path d="M3.5 3.5H13.5V19.5" />
        <path d="M6.5 12.5L13.5 19.5L20.5 12.5" />
      </svg>
    </a>
  );
}
