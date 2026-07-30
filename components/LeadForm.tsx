"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { EMAIL } from "@/lib/site";
import { OBLASTI, type PoptavkaSluzba } from "@/lib/poptavka";

/**
 * Dvoukrokový poptávkový formulář podle wireframu.
 * Web je statický — odeslání zatím skládá připravený e-mail (mailto).
 * Až bude backend/formulářová služba, stačí vyměnit handleSubmit.
 *
 * `sluzby` staví kontaktní stránka na serveru z dat služeb — do klienta se
 * tak dostane jen mapa slug → oblast, ne celý obsah pětadvaceti stránek.
 */
export function LeadForm({ sluzby = {} }: { sluzby?: Record<string, PoptavkaSluzba> }) {
  const [step, setStep] = useState<1 | 2>(1);
  /* Oblast a popis se předvyplňují z URL, a proto nejsou v `data`: drží se
     jako „null = zatím nesaháno". Hodnota do pole se pak skládá až při
     vykreslení z toho, co víme z odkazu.

     Přes useEffect to nešlo. Kontaktní stránka je staticky generovaná
     a formulář čte parametry, takže React ten podstrom po jejich doplnění
     přemountuje — a co efekt stihl uložit do useState, je pryč. Odvozená
     hodnota přemount přežije, protože se nedrží nikde. (Stejnou chybu měl
     i starší předvyplňovač z katalogu, jen si toho nikdo nevšiml: fungoval
     při prokliku z webu, ne při otevření odkazu.) */
  const [oblastRucne, setOblastRucne] = useState<string | null>(null);
  const [popisRucne, setPopisRucne] = useState<string | null>(null);
  const [data, setData] = useState({
    rozmer: "",
    pocet: "",
    termin: "",
    odkaz: "",
    jmeno: "",
    firma: "",
    email: "",
    telefon: "",
  });

  const set = (key: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }));

  const params = useSearchParams();

  /* Vybraný kus z katalogu textilu: /kontakt?produkt=…#poptavka.
     Zákazník tak nemusí kód produktu nikam opisovat. */
  const produkt = params.get("produkt");

  /* Stránka, ze které člověk přišel: /kontakt?sluzba=polepy-aut#poptavka.
     Kdo na podstránce klikne na „Poptat polep auta", nemá co vybírat —
     už to řekl tím klikem. Neznámý slug se prostě nenajde a nic se nestane. */
  const sluzba = sluzby[params.get("sluzba") ?? ""];

  /* Katalog má přednost: ví o zakázce víc než jméno stránky. */
  const predvyplneno = produkt
    ? {
        oblast: OBLASTI.textil,
        popis: `Mám vybráno z katalogu: ${produkt}.\n\nPotřebuji potisk (logo/motiv):\nVelikosti a počty kusů:`,
        zdroj: `Katalog textilu — ${produkt}`,
      }
    : { oblast: sluzba?.oblast ?? "", popis: "", zdroj: sluzba?.label };

  const oblast = oblastRucne ?? predvyplneno.oblast;
  const popis = popisRucne ?? predvyplneno.popis;

  /* Aby v e-mailu stálo „Polepy aut", ne jen široká oblast ze selectu.
     Drží se, i když si člověk v selectu vybere jinak — je to informace
     o tom, odkud přišel, ne o tom, co vyplnil. */
  const zdroj = predvyplneno.zdroj;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Poptávka z webu — ${zdroj || oblast || "výroba"}`;
    const body = [
      `Co řeším: ${oblast}`,
      zdroj && `Ze stránky: ${zdroj}`,
      "",
      popis,
      "",
      data.rozmer && `Rozměr: ${data.rozmer}`,
      data.pocet && `Počet / rozsah: ${data.pocet}`,
      data.termin && `Termín: ${data.termin}`,
      data.odkaz && `Odkaz na podklady: ${data.odkaz}`,
      "",
      `Jméno: ${data.jmeno}`,
      data.firma && `Firma: ${data.firma}`,
      `E-mail: ${data.email}`,
      data.telefon && `Telefon: ${data.telefon}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      {step === 1 ? (
        <>
          <p className="form-step-note">Krok 1 ze 2 · Zakázka a podklady</p>
          <h3>Nezávazná poptávka</h3>

          <label className="field">
            <span>Co řešíte? *</span>
            <select required value={oblast} onChange={(e) => setOblastRucne(e.target.value)}>
              <option value="">Vyberte oblast…</option>
              <option>Tisk (banner, samolepky, plakáty, tiskoviny…)</option>
              <option>Polep (auto, výloha, interiér…)</option>
              <option>Reklama (cedule, světelná reklama, 3D logo…)</option>
              <option>Reklamní textil (potisk trik, mikin…)</option>
              <option>Logo / identita / web</option>
              <option>Nevím — potřebuji poradit</option>
            </select>
          </label>

          {/* Tiché předvyplnění mate — člověk musí vidět, že za něj někdo
              rozhodl, a že to smí přepsat. */}
          {zdroj && (
            <p className="form-prefill">
              Vyplnili jsme podle toho, odkud jdete: <strong>{zdroj}</strong>. Když se
              netrefili, přepněte to výš.
            </p>
          )}

          <label className="field">
            <span>
              Napište, co už víte * <small>— klidně jen pár vět</small>
            </span>
            <textarea
              required
              value={popis}
              onChange={(e) => setPopisRucne(e.target.value)}
              placeholder="Např.: Potřebuji polepit dodávku, logo mám v PDF. Auto je bílý Transporter."
            />
          </label>

          <div className="form-grid-2">
            <label className="field">
              <span>
                Rozměr <small>— stačí orientačně</small>
              </span>
              <input value={data.rozmer} onChange={set("rozmer")} placeholder="např. 3 × 1 m" />
            </label>
            <label className="field">
              <span>
                Počet <small>— kusy, plocha, rozsah</small>
              </span>
              <input value={data.pocet} onChange={set("pocet")} placeholder="např. 2 ks" />
            </label>
            <label className="field">
              <span>
                Termín <small>— kdy výsledek potřebujete</small>
              </span>
              <input value={data.termin} onChange={set("termin")} placeholder="např. do konce měsíce" />
            </label>
            <label className="field">
              <span>
                Odkaz na data <small>— volitelné</small>
              </span>
              <input value={data.odkaz} onChange={set("odkaz")} placeholder="úschovna, Drive…" />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={() => setStep(2)}>
              Pokračovat ke kontaktu
            </button>
            <span className="hero__note">Fotku nebo podklady můžete přiložit do e-mailu.</span>
          </div>
        </>
      ) : (
        <>
          <p className="form-step-note">Krok 2 ze 2 · Kontakt</p>
          <h3>Kam se vám máme ozvat?</h3>

          <div className="form-grid-2">
            <label className="field">
              <span>Jméno *</span>
              <input required value={data.jmeno} onChange={set("jmeno")} autoComplete="name" />
            </label>
            <label className="field">
              <span>Firma</span>
              <input value={data.firma} onChange={set("firma")} autoComplete="organization" />
            </label>
            <label className="field">
              <span>E-mail *</span>
              <input
                required
                type="email"
                value={data.email}
                onChange={set("email")}
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span>Telefon</span>
              <input value={data.telefon} onChange={set("telefon")} autoComplete="tel" />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              Odeslat nezávaznou poptávku
            </button>
            <button type="button" className="arrow-link" onClick={() => setStep(1)}>
              ← Zpět k zadání
            </button>
          </div>
          <p className="hero__note" style={{ marginTop: "1rem" }}>
            Odesláním se otevře připravený e-mail ve vašem poštovním klientovi.
          </p>
        </>
      )}
    </form>
  );
}
