import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getStudioService } from "@/lib/services";

const page = getStudioService("webdesign")!;

export const metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: `/${page.slug}`,
});

export default function WebdesignPage() {
  return <ServicePageTemplate page={page} />;
}
