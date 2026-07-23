import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { reklamaServices } from "@/lib/services";

export function generateStaticParams() {
  return reklamaServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = reklamaServices.find((s) => s.slug === slug);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/reklama/${page.slug}`,
  });
}

export default async function ReklamaServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = reklamaServices.find((s) => s.slug === slug);
  if (!page) notFound();
  return <ServicePageTemplate page={page} />;
}
