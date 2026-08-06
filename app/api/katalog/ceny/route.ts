import { getPrices } from "@/lib/malfini";

/**
 * Ceny a dostupnost po velikostech pro jeden produkt v jedné barvě.
 * Barva je povinná: ceník se po barvách liší (i o deset korun na kuse),
 * takže bez ní by tabulka ukazovala jiné číslo, než jaké patří k fotce.
 */
export const revalidate = 43200;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const color = searchParams.get("color");

  if (!code || !/^[a-z0-9-]{1,20}$/i.test(code)) {
    return Response.json({ error: "bad code" }, { status: 400 });
  }
  if (!color || !/^[a-z0-9]{1,6}$/i.test(color)) {
    return Response.json({ error: "bad color" }, { status: 400 });
  }

  const prices = await getPrices(code, color);
  if (!prices) return Response.json({ error: "unavailable" }, { status: 502 });

  return Response.json(prices, {
    headers: { "cache-control": "public, s-maxage=43200, stale-while-revalidate=86400" },
  });
}
