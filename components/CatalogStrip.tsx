import Link from "next/link";
import { Media } from "./Media";
import { productImage } from "@/lib/malfini";

/**
 * Ukázky ze sortimentu. Kódy jsou napsané natvrdo schválně: stránka se pak
 * nemusí při sestavení ptát dodavatele a nemá jak spadnout, když jeho API
 * mlčí. Vybrané tak, aby každý kus měl jiný střih i barvu — teprve ta
 * rozmanitost říká „katalog" líp než jakákoli věta.
 */
const UKAZKY = [
  { code: "145", color: "02", alt: "Unisex tričko v tmavě modré" },
  { code: "259", color: "71", alt: "Pánská polokošile v červené" },
  { code: "422", color: "01", alt: "Unisex mikina s kapucí v černé" },
  { code: "509", color: "06", alt: "Unisex vesta v lahvově zelené" },
];

const KATALOG = "/reklama/reklamni-textil/katalog-malfini";

/**
 * Tichý pás, který ukazuje, že si textil jde vybrat online. Celý je odkaz —
 * šipka uvnitř je jen návěští, ne jediné klikací místo.
 */
export function CatalogStrip() {
  return (
    <Link href={KATALOG} className="cat-strip" data-reveal>
      <div className="cat-strip__copy">
        <span className="eyebrow">Online katalog</span>
        <h2 className="cat-strip__title">Firemní textil si vyberete sami.</h2>
        <p className="cat-strip__text">
          Trička, mikiny, polokošile i pracovní oblečení. Přes 390 modelů s barvami, velikostmi
          a cenou za kus — potisk doděláme my.
        </p>
        <span className="arrow-link cat-strip__cta">
          Otevřít katalog{" "}
          <span className="arr" aria-hidden="true">
            ↗
          </span>
        </span>
      </div>

      <div className="cat-strip__items" aria-hidden="true">
        {UKAZKY.map((u) => (
          <span className="cat-strip__item" key={u.code}>
            <Media
              media={{
                label: u.alt,
                alt: u.alt,
                variant: "circle",
                src: productImage(u.code, u.color, "c", 640),
                blend: true,
              }}
              sizes="(max-width: 860px) 24vw, 10rem"
            />
          </span>
        ))}
      </div>
    </Link>
  );
}
