/**
 * Katalog a nad ním slot pro otevřený produkt.
 *
 * Díky souběžné trase zůstane mřížka pod modálem namontovaná — nastavené
 * filtry, hledání i pozice ve výpisu přežijí otevření i zavření produktu.
 * Kdyby se produkt otevíral jako běžná stránka, katalog by se odmontoval
 * a návrat zpátky by znamenal začínat s filtry znovu.
 */
export default function KatalogLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
