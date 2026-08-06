"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProductView } from "./ProductView";
import type { MalfiniColor, MalfiniDetail, MalfiniPrice, MalfiniProduct } from "@/lib/malfini";

/**
 * Produkt otevřený nad mřížkou katalogu. Je to zachycená (intercepted) trasa,
 * takže adresa je pořád skutečná adresa produktu — jde zkopírovat, přeposlat
 * i načíst napřímo, jen tehdy se místo modálu otevře celá stránka.
 *
 * Zavření je proto krok zpátky v historii, ne přepnutí stavu: filtry i pozice
 * v mřížce pod modálem zůstávají, protože se katalog vůbec neodmontoval.
 */
export function ProductModal({
  product,
  colors,
  brand,
  color,
  detail,
  prices,
}: {
  product: MalfiniProduct;
  colors: Record<string, MalfiniColor>;
  brand?: string;
  color: string;
  detail: MalfiniDetail | null;
  prices: MalfiniPrice[] | null;
}) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = () => router.back();

  /* Zavření Escapem + zámek scrollu pod modálem. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && router.back();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [router]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${product.subName} ${product.name}`}>
      <div className="modal__backdrop" onClick={close} />
      <div className="modal__panel prod">
        <button ref={closeRef} className="modal__close" onClick={close} aria-label="Zavřít">
          ✕
        </button>

        <ProductView
          product={product}
          colors={colors}
          brand={brand}
          initialColor={color}
          initialDetail={detail}
          initialPrices={prices}
        />
      </div>
    </div>
  );
}
