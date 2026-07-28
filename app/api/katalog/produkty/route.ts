import { getCatalog } from "@/lib/malfini";

/**
 * Filtrovaný seznam produktů. Filtruje API dodavatele — seznam sám o sobě
 * neobsahuje kategorii ani značku, takže lokálně by to nešlo.
 */
export const revalidate = 43200;

const SAFE = /^[a-z0-9-]{1,40}$/i;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "";
  const trademark = searchParams.get("trademark") ?? "";

  if ((category && !SAFE.test(category)) || (trademark && !SAFE.test(trademark))) {
    return Response.json({ error: "bad filter" }, { status: 400 });
  }

  const catalog = await getCatalog({
    category: category || undefined,
    trademark: trademark || undefined,
  });
  if (!catalog) return Response.json({ error: "unavailable" }, { status: 502 });

  return Response.json(catalog, {
    headers: { "cache-control": "public, s-maxage=43200, stale-while-revalidate=86400" },
  });
}
