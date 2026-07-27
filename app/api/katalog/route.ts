import { getProductDetail } from "@/lib/malfini";

/**
 * Proxy na detail produktu. API dodavatele neposílá CORS hlavičky, takže
 * z prohlížeče na něj sáhnout nejde — voláme ho tedy ze serveru.
 */
export const revalidate = 43200;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const color = searchParams.get("color") ?? "";

  if (!code || !/^[a-z0-9-]{1,20}$/i.test(code)) {
    return Response.json({ error: "bad code" }, { status: 400 });
  }
  if (color && !/^[a-z0-9]{1,6}$/i.test(color)) {
    return Response.json({ error: "bad color" }, { status: 400 });
  }

  const detail = await getProductDetail(code, color);
  if (!detail) return Response.json({ error: "not found" }, { status: 404 });

  return Response.json(detail, {
    headers: { "cache-control": "public, s-maxage=43200, stale-while-revalidate=86400" },
  });
}
