"use client";

import { useEffect, useRef } from "react";

/**
 * Smyčkové video, které hraje jen když je vidět. Autoplay video, které běží
 * pořád (i mimo obrazovku), nepřetržitě dekóduje na hlavním vlákně a na
 * mobilu viditelně zadrhává scroll — šablona žádné autoplay video nemá.
 * Přehrání spouští IntersectionObserver; muted + playsInline dovolí
 * programové play() i na iOS.
 */
export function LazyVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay policy — necháme na posteru */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="media__video"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
