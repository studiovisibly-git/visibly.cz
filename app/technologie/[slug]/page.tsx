import { notFound } from "next/navigation";
import { TechnologiePageTemplate } from "@/components/TechnologiePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getTechnologie, technologie } from "@/lib/technologie";

export function generateStaticParams() {
  return technologie.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tech = getTechnologie(slug);
  if (!tech) return {};
  return buildMetadata({
    title: tech.metaTitle,
    description: tech.metaDescription,
    path: `/technologie/${tech.slug}`,
  });
}

export default async function TechnologieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tech = getTechnologie(slug);
  if (!tech) notFound();
  return <TechnologiePageTemplate tech={tech} />;
}
