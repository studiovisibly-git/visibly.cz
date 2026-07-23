import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ParallaxHeading } from "@/components/ParallaxHeading";
import { buildMetadata } from "@/lib/seo";
import { EMAIL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cookies a soukromí | Visibly",
  description: "Informace o používání cookies na webu visibly.cz.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cookies", href: "/cookies" }]} />
      <section className="section container">
        <article className="prose">
          <ParallaxHeading text="Cookies a soukromí" className="h2" stagger />
          <p>
            Web visibly.cz používá pouze technické cookies nezbytné pro svůj provoz. Nepoužíváme
            marketingové ani sledovací cookies třetích stran.
          </p>
          <h2>Technické cookies</h2>
          <p>
            Slouží výhradně k zajištění správného fungování webu (např. zapamatování stavu
            navigace). Tyto cookies nevyžadují váš souhlas a nelze je vypnout.
          </p>
          <h2>Analytika</h2>
          <p>
            Pokud v budoucnu nasadíme měření návštěvnosti, budeme preferovat řešení bez cookies,
            která nesbírají osobní údaje. Tuto stránku v takovém případě aktualizujeme.
          </p>
          <h2>Kontakt</h2>
          <p>
            S dotazy k ochraně soukromí se na nás obraťte na {EMAIL}.
          </p>
        </article>
      </section>
    </>
  );
}
