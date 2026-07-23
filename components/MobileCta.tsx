import Link from "next/link";
import { INQUIRY_URL } from "@/lib/site";

export function MobileCta({ label = "Poptat výrobu" }: { label?: string }) {
  return (
    <div className="mobile-cta">
      <Link href={INQUIRY_URL} className="btn">
        {label}
      </Link>
    </div>
  );
}
