import { getPrices } from "@/lib/malfini";

/** Ceny a dostupnost po velikostech pro jeden produkt. */
export const revalidate = 43200;

export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code");
  if (!code || !/^[a-z0-9-]{1,20}$/i.test(code)) {
    return Response.json({ error: "bad code" }, { status: 400 });
  }

  const prices = await getPrices(code);
  if (!prices) return Response.json({ error: "unavailable" }, { status: 502 });

  return Response.json(prices, {
    headers: { "cache-control": "public, s-maxage=43200, stale-while-revalidate=86400" },
  });
}
