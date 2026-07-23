"use client";

import { useState } from "react";
import { EMAIL } from "@/lib/site";

/**
 * Dvoukrokový poptávkový formulář podle wireframu.
 * Web je statický — odeslání zatím skládá připravený e-mail (mailto).
 * Až bude backend/formulářová služba, stačí vyměnit handleSubmit.
 */
export function LeadForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState({
    oblast: "",
    popis: "",
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Poptávka z webu — ${data.oblast || "výroba"}`;
    const body = [
      `Co řeším: ${data.oblast}`,
      "",
      data.popis,
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
    <form className="form-card" onSubmit={handleSubmit} id="poptavka">
      {step === 1 ? (
        <>
          <p className="form-step-note">Krok 1 ze 2 · Zakázka a podklady</p>
          <h3>Nezávazná poptávka</h3>

          <label className="field">
            <span>Co řešíte? *</span>
            <select required value={data.oblast} onChange={set("oblast")}>
              <option value="">Vyberte oblast…</option>
              <option>Tisk (banner, samolepky, plakáty, tiskoviny…)</option>
              <option>Polep (auto, výloha, interiér…)</option>
              <option>Reklama (cedule, světelná reklama, 3D logo…)</option>
              <option>Logo / identita / web</option>
              <option>Nevím — potřebuji poradit</option>
            </select>
          </label>

          <label className="field">
            <span>
              Napište, co už víte * <small>— klidně jen pár vět</small>
            </span>
            <textarea
              required
              value={data.popis}
              onChange={set("popis")}
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
