import { notFound } from "next/navigation";
import { ProductModal } from "@/components/ProductModal";
import { getProductPage } from "@/lib/malfini";

/**
 * Tentýž produkt, ale otevřený z mřížky — zachycená (intercepted) trasa.
 * Adresa je stejná jako u samostatné stránky vedle, takže odkaz jde
 * zkopírovat rovnou z řádku prohlížeče; po obnovení se otevře ta stránka.
 */
export const revalidate = 43200;

type Params = { kod: string; barva?: string[] };

export default async function ProduktModal({ params }: { params: Promise<Params> }) {
  const { kod, barva } = await params;
  if (barva && barva.length > 1) notFound();

  const data = await getProductPage(kod, barva?.[0]);
  if (!data) notFound();

  return (
    <ProductModal
      product={data.product}
      colors={data.colors}
      brand={data.brand}
      color={data.color}
      detail={data.detail}
      prices={data.prices}
    />
  );
}
