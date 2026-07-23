import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { tiskServices } from "@/lib/services";

export function generateStaticParams() {
  return tiskServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = tiskServices.find((s) => s.slug === slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/tisk/${page.slug}`,
  });
}

export default async function TiskServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = tiskServices.find((s) => s.slug === slug);
  if (!page) notFound();
  return <ServicePageTemplate page={page} />;
}
