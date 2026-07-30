import { VYROBCI } from "@/components/TechStrip";

export type TechNote = {
  /** Značky, které o výsledku téhle služby opravdu rozhodují. */
  brands: (keyof typeof VYROBCI)[];
  /** Jedna věta. Ne co máme, ale co z toho zákazník má. */
  text: string;
};

/**
 * Drobná zmínka o technice na podstránkách služeb, klíčem je slug.
 *
 * Schválně jen tam, kde o výsledku rozhoduje konkrétní stroj. Chybí u služeb,
 * kde bychom si museli vymýšlet:
 *
 *  · tiskoviny — vizitky, letáky a brožury jsou práce pro ofset nebo
 *    produkční digitál, který nemáme; velkoformátový Epson je na to
 *    nesprávná odpověď,
 *  · 3D loga — plastická písmena se frézují, náš Roland je řezací ploter
 *    na fólie do 640 mm,
 *  · reklamní předměty — nakupované zboží, ne naše výroba,
 *  · reklamní textil — termolis, ke kterému logo výrobce nemáme; stránka
 *    navíc už má vlastní panel katalogu,
 *  · logo, identita, web — tam žádný stroj nerozhoduje.
 *
 * Údaje musí sedět s /technologie. Ta stránka je zdroj pravdy.
 */
export const TECH_NOTES: Record<string, TechNote> = {
  /* ---------- Tisk ---------- */
  "velkoformatovy-tisk": {
    brands: ["epson", "agfa"],
    text: "Tiskneme na svých strojích — role až 3,2 m v jednom kuse, deska bez podlepování.",
  },
  "bannery-a-plachty": {
    brands: ["agfa"],
    text: "Bannery jedou z rolového UV do šířky 3,2 m, takže velké plachty jsou bez spoje.",
  },
  "samolepky-a-folie": {
    brands: ["epson", "roland"],
    text: "Tiskneme a rovnou řežeme do tvaru — samolepka nemusí končit obdélníkem.",
  },
  tapety: {
    brands: ["epson"],
    text: "Tapetu tiskneme u sebe, v pruzích na míru vaší stěně.",
  },
  "roll-upy": {
    brands: ["epson"],
    text: "Grafiku tiskneme na vlastním Epsonu — sytá barva i na plné ploše.",
  },
  "billboardy-a-citylighty": {
    brands: ["agfa"],
    text: "Velké formáty tiskneme z role do 3,2 m, takže plocha drží v jednom kuse.",
  },
  plakaty: {
    brands: ["epson"],
    text: "Plakáty tiskneme na vlastním Epsonu, takže i jediný kus jde ve fotografické kvalitě.",
  },
  "pos-materialy": {
    brands: ["agfa", "roland"],
    text: "Tiskneme přímo na desku a vyřežeme do tvaru, takže stojan drží sám.",
  },

  /* ---------- Polepy ---------- */
  "polepy-aut": {
    brands: ["epson", "roland"],
    text: "Fólii tiskneme, řežeme do tvaru a laminujeme u sebe — polep pak vydrží slunce i myčku.",
  },
  "polepy-dodavek": {
    brands: ["epson", "roland"],
    text: "Tisk, řez i laminace pod jednou střechou. Velké plochy dodávky tak zvládneme bez spojů.",
  },
  "polepy-vyloh": {
    brands: ["epson", "roland"],
    text: "Řezaná grafika i tištěná fólie z jedné dílny, včetně aplikace na místě.",
  },
  "interierove-polepy": {
    brands: ["epson", "roland"],
    text: "Tiskneme a řežeme u sebe, takže tvar odpovídá grafice, ne možnostem nože.",
  },
  "rezana-grafika": {
    brands: ["roland"],
    text: "Řežeme na vlastním Rolandu — čisté hrany a tvar podle dat.",
  },

  /* ---------- Reklama ---------- */
  "reklamni-cedule": {
    brands: ["agfa"],
    text: "Ceduli tiskneme přímo na Dibond. Bez podlepené fólie, která se po letech krčí.",
  },
  "svetelna-reklama": {
    brands: ["epson"],
    text: "Backlit do světelných rámů tiskneme u sebe, s barvou nastavenou na prosvícení.",
  },
  "venkovni-reklama": {
    brands: ["agfa"],
    text: "UV LED tisk jde přímo na materiál — bez mezivrstvy, která se venku odlepuje.",
  },
  "interierova-reklama": {
    brands: ["agfa", "roland"],
    text: "Tiskneme na desku i fólii a řežeme do tvaru, takže prvek sedne do prostoru.",
  },
  "orientacni-systemy": {
    brands: ["agfa", "roland"],
    text: "Tabulky tiskneme přímo na materiál a vyřežeme na jeden rozměr, ať série drží pohromadě.",
  },

  /* ---------- Studio ---------- */
  "tisk-fotoobrazu": {
    brands: ["epson"],
    text: "Fotoobraz tiskneme na vlastním Epsonu, s kontrolou barev před tiskem.",
  },
};
