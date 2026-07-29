import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CookieSettingsButton } from "@/components/CookieSettingsLink";
import { ParallaxHeading } from "@/components/ParallaxHeading";
import { buildMetadata } from "@/lib/seo";
import { ADDRESS_FULL, EMAIL, EMAIL_HREF } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cookies a soukromí | Visibly",
  description:
    "Co si visibly.cz ukládá do prohlížeče, co měříme, co načítáme od Googlu — a jak si to kdykoli přenastavit.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cookies", href: "/cookies" }]} />
      <section className="section container">
        <article className="prose">
          <ParallaxHeading text="Cookies a soukromí" className="h2" stagger />

          <p>
            Krátce: dokud si nevyberete v liště se sušenkou, web nic neměří a nenačte nic od cizích
            služeb. Sám od sebe si pamatuje jen zvolený vzhled a to, jak jste se rozhodli.
          </p>

          <h2>Co si web pamatuje i bez souhlasu</h2>
          <p>
            Tohle zůstává jen ve vašem prohlížeči, v místním úložišti, a nikam se to neodesílá.
            Vypnout to nejde — bez toho bychom si vaši volbu nezapamatovali a ptali se pořád dokola.
          </p>
          <table>
            <thead>
              <tr>
                <th>Název</th>
                <th>K čemu</th>
                <th>Jak dlouho</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>visibly-theme</td>
                <td>Jestli chcete web světlý, nebo tmavý.</td>
                <td>Než smažete data prohlížeče</td>
              </tr>
              <tr>
                <td>visibly-cookies</td>
                <td>Vaše volba v liště, ať se neptáme znovu.</td>
                <td>Než smažete data prohlížeče</td>
              </tr>
            </tbody>
          </table>

          <h2>Měření návštěvnosti — jen se souhlasem</h2>
          <p>
            Používáme Google Analytics 4. Zajímá nás, které stránky lidé čtou a kudy na web
            přicházejí, abychom věděli, co má smysl psát dál. Jména ani kontakty se tam nedostanou.
            Dokud v liště nekliknete, skript se vůbec nenačte.
          </p>
          <table>
            <thead>
              <tr>
                <th>Název</th>
                <th>K čemu</th>
                <th>Jak dlouho</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>Rozliší jednotlivé návštěvníky.</td>
                <td>2 roky</td>
              </tr>
              <tr>
                <td>_ga_*</td>
                <td>Drží pohromadě jednu návštěvu.</td>
                <td>2 roky</td>
              </tr>
            </tbody>
          </table>
          <p>
            Data zpracovává Google Ireland Limited. Jak s nimi nakládá, popisuje ve svých{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
              zásadách ochrany soukromí ↗
            </a>
            .
          </p>

          <h2>Mapa v kontaktech — jen se souhlasem</h2>
          <p>
            Na stránce Kontakt je vložená mapa Google. Je to okno do cizí služby: jakmile se načte,
            Google se dozví vaši IP adresu a může si uložit vlastní cookies. Proto ji bez svolení
            nenačítáme vůbec — místo ní uvidíte tlačítko a rozhodnete se sami.
          </p>

          <h2>Jak volbu změnit</h2>
          <p>
            Kdykoli a bez vysvětlování. Souhlas jde stejně snadno vzít zpět — měření se pak přestane
            načítat. Odkaz na nastavení najdete taky dole v patičce, na každé stránce.
          </p>
          <p>
            <CookieSettingsButton />
          </p>

          <h2>Kdo za tím stojí</h2>
          <p>
            Správcem je <strong>studio visibly s.r.o.</strong>, {ADDRESS_FULL}. S čímkoli k soukromí
            se ozvěte na <a href={EMAIL_HREF}>{EMAIL}</a> — odpovíme normálně, bez formulářů.
          </p>

          <p>
            <small>
              Stránka popisuje skutečný stav webu. Až přibude něco dalšího, co potřebuje souhlas,
              upravíme ji a lišta se zeptá znovu.
            </small>
          </p>
        </article>
      </section>
    </>
  );
}
