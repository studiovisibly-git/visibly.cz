/** Vložená mapa Google v kruhu — stejný tvar jako ostatní kruhová média. */
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2567.964815082329!2d17.90950257717683!3d49.93700147149875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713d96819c2e89b%3A0x9b0984007fa00f2b!2sVISIBLY%20-%20reklama%20%26%20tisk!5e0!3m2!1scs!2scz!4v1785275591025!5m2!1scs!2scz";

export function MapCircle({ title }: { title: string }) {
  return (
    <div className="media media--circle map-circle">
      <iframe
        src={MAP_EMBED}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
