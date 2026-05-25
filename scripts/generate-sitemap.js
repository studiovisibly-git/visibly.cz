const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const siteUrl = "https://www.visibly.cz";
const today = new Date().toISOString().slice(0, 10);

const ignoredPathPatterns = [
  /^partials\//,
  /^home\//,
  /^pages\//,
  /^information\//,
  /^detail_.*\.html$/,
  /^checkout\.html$/,
  /^paypal-checkout\.html$/,
  /^order-confirmation\.html$/,
  /^401\.html$/,
  /^404\.html$/,
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        return [];
      }

      return walk(fullPath);
    }

    return entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function isIgnored(relativePath) {
  return ignoredPathPatterns.some((pattern) => pattern.test(relativePath));
}

function hasCleanUrlCopy(relativePath) {
  if (!relativePath.endsWith(".html") || relativePath === "index.html") {
    return false;
  }

  const withoutExt = relativePath.replace(/\.html$/, "");
  return fs.existsSync(path.join(rootDir, withoutExt, "index.html"));
}

function toPublicPath(relativePath) {
  if (relativePath === "index.html") {
    return "/";
  }

  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.replace(/\/index\.html$/, "/")}`;
  }

  return `/${relativePath.replace(/\.html$/, "/")}`;
}

function getPriority(publicPath) {
  if (publicPath === "/") return "1.0";
  if (/^\/(tisk|polepy|reklama|realizace|technologie|o-nas|kontakt)\/$/.test(publicPath)) return "0.9";
  if (/^\/(pruvodce|mapa-webu)\/$/.test(publicPath)) return "0.7";
  if (/^\/(realizace|pruvodce)\//.test(publicPath)) return "0.6";
  if (publicPath === "/cookies/") return "0.3";
  return "0.5";
}

function getChangefreq(publicPath) {
  if (publicPath === "/") return "weekly";
  if (/^\/(tisk|polepy|reklama|realizace|technologie|kontakt)\/$/.test(publicPath)) return "monthly";
  if (/^\/(realizace|pruvodce)\//.test(publicPath)) return "monthly";
  return "yearly";
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const urls = walk(rootDir)
  .map((filePath) => toPosix(path.relative(rootDir, filePath)))
  .filter((relativePath) => !isIgnored(relativePath))
  .filter((relativePath) => !hasCleanUrlCopy(relativePath))
  .map((relativePath) => toPublicPath(relativePath))
  .filter((publicPath, index, list) => list.indexOf(publicPath) === index)
  .sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b, "cs");
  });

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((publicPath) => `  <url>
    <loc>${escapeXml(`${siteUrl}${publicPath}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangefreq(publicPath)}</changefreq>
    <priority>${getPriority(publicPath)}</priority>
  </url>`)
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(rootDir, "sitemap.xml"), xml);
console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
