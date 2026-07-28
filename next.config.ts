import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Produktové fotky katalogu textilu běží na doméně dodavatele.
    remotePatterns: [{ protocol: "https", hostname: "onlinecatalog.malfini.com" }],
  },

  trailingSlash: false,
  poweredByHeader: false,
  compress: true,

  async redirects() {
    return [
      // Kanonická doména je www.visibly.cz — apex přesměruj na www (301)
      {
        source: "/:path*",
        has: [{ type: "host", value: "visibly.cz" }],
        destination: "https://www.visibly.cz/:path*",
        permanent: true,
      },
      // Bezpečnostní přesměrování starých variant URL
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/kontakt-formular", destination: "/kontakt#poptavka", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Dlouhá cache pro statická média
        source: "/:all*(svg|jpg|jpeg|png|webp|mp4|woff2|ttf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
