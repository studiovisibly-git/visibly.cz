import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildMetadata } from "@/lib/seo";
import { getStudioService } from "@/lib/services";

const page = getStudioService("tisk-fotoobrazu")!;

export const metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: `/${page.slug}`,
});

export default function FotoobrazyPage() {
  return <ServicePageTemplate page={page} />;
}
