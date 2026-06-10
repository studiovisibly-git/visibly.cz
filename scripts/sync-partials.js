const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const topInfoBarPath = path.join(rootDir, "partials", "top-info-bar.html");
const headerPath = path.join(rootDir, "partials", "header.html");
const footerPath = path.join(rootDir, "partials", "footer.html");
const pageHeroPath = path.join(rootDir, "partials", "page-hero.html");

const topInfoBarPartial = fs.readFileSync(topInfoBarPath, "utf8").trim();
const headerPartial = fs.readFileSync(headerPath, "utf8").trim();
const footerPartial = fs.readFileSync(footerPath, "utf8").trim();
const pageHeroPartial = fs.existsSync(pageHeroPath) ? fs.readFileSync(pageHeroPath, "utf8").trim() : "";

const topInfoBarStart = "<!-- VISIBLY_TOP_INFO_BAR_START -->";
const topInfoBarEnd = "<!-- VISIBLY_TOP_INFO_BAR_END -->";
const headerStart = "<!-- VISIBLY_HEADER_START -->";
const headerEnd = "<!-- VISIBLY_HEADER_END -->";
const footerStart = "<!-- VISIBLY_FOOTER_START -->";
const footerEnd = "<!-- VISIBLY_FOOTER_END -->";
const pageHeroStart = "<!-- VISIBLY_PAGE_HERO_START -->";
const pageHeroEnd = "<!-- VISIBLY_PAGE_HERO_END -->";

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

const pageHeroImages = {
  "tisk": {
    src: "images/services/visibly-service-tisk-optimized.jpg",
    alt: "Velkoformátová tiskárna Epson při tisku reklamy Visibly",
  },
  "polepy": {
    src: "images/services/visibly-service-polepy-optimized.jpg",
    alt: "Polepená dodávka a výloha s reklamní grafikou",
  },
  "reklama": {
    src: "images/services/visibly-service-reklama-optimized.jpg",
    alt: "3D logo a reklamní cedule pro označení provozovny",
  },
  "o nás": {
    src: "images/services/visibly-service-grafika.jpg",
    alt: "Visibly reklamní studio a tiskárna",
  },
};

function indentBlock(content, indent) {
  return content
    .split("\n")
    .map((line) => (line ? `${indent}${line}` : line))
    .join("\n");
}

function replaceMarkedBlock(source, startMarker, endMarker, partial) {
  const escapedStart = startMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const markedBlock = new RegExp(`(^[ \\t]*)${escapedStart}[\\s\\S]*?^[ \\t]*${escapedEnd}`, "m");
  const match = source.match(markedBlock);

  if (!match) {
    return null;
  }

  const indent = match[1] || "";
  const replacement = `${indent}${startMarker}\n${indentBlock(partial, indent)}\n${indent}${endMarker}`;
  return source.replace(markedBlock, replacement);
}

function insertMarkedBlockBefore(source, beforeMarker, startMarker, endMarker, partial) {
  const markerIndex = source.indexOf(beforeMarker);
  if (markerIndex === -1) {
    return null;
  }

  const lineStart = source.lastIndexOf("\n", markerIndex) + 1;
  const indentMatch = source.slice(lineStart, markerIndex).match(/^[ \t]*/);
  const indent = indentMatch ? indentMatch[0] : "";
  const block = `${indent}${startMarker}\n${indentBlock(partial, indent)}\n${indent}${endMarker}\n`;

  return `${source.slice(0, lineStart)}${block}${source.slice(lineStart)}`;
}

function findMatchingDiv(source, startIndex) {
  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = startIndex;

  let depth = 0;
  let match;
  while ((match = tagPattern.exec(source))) {
    if (match[0].startsWith("</")) {
      depth -= 1;
      if (depth === 0) {
        return tagPattern.lastIndex;
      }
    } else {
      depth += 1;
    }
  }

  return -1;
}

function replaceUnmarkedDiv(source, selectorPattern, startMarker, endMarker, partial) {
  const match = selectorPattern.exec(source);
  if (!match) {
    return null;
  }

  const startIndex = match.index;
  const endIndex = findMatchingDiv(source, startIndex);
  if (endIndex === -1) {
    throw new Error(`Could not find closing div for ${startMarker}`);
  }

  const lineStart = source.lastIndexOf("\n", startIndex) + 1;
  const indentMatch = source.slice(lineStart, startIndex).match(/^[ \t]*/);
  const indent = indentMatch ? indentMatch[0] : "";
  const replacement = `${indent}${startMarker}\n${indentBlock(partial, indent)}\n${indent}${endMarker}`;

  return `${source.slice(0, lineStart)}${replacement}${source.slice(endIndex)}`;
}

function syncBlock(source, selectorPattern, startMarker, endMarker, partial) {
  return (
    replaceMarkedBlock(source, startMarker, endMarker, partial) ||
    replaceUnmarkedDiv(source, selectorPattern, startMarker, endMarker, partial) ||
    source
  );
}

function syncTopInfoBar(source, partial) {
  return (
    replaceMarkedBlock(source, topInfoBarStart, topInfoBarEnd, partial) ||
    insertMarkedBlockBefore(source, headerStart, topInfoBarStart, topInfoBarEnd, partial) ||
    source
  );
}

function preservePageHeroAttributes(currentBlock, partial) {
  const currentOpen = currentBlock.match(/<div\b[^>]*\bdata-page-hero\b[^>]*>/);
  const partialOpen = partial.match(/<div\b[^>]*\bdata-page-hero\b[^>]*>/);

  if (!currentOpen || !partialOpen) {
    return partial;
  }

  return buildPageHeroPartial(currentOpen[0]);
}

function getAttribute(openTag, name, fallback = "") {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = openTag.match(new RegExp(`${escaped}="([^"]*)"`, "i"));
  return match ? match[1] : fallback;
}

function markPageHeroRendered(openTag) {
  if (/data-page-hero-rendered=/i.test(openTag)) {
    return openTag;
  }

  return openTag.replace(/>$/, ' data-page-hero-rendered="true">');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildTitleFallback(title) {
  const lines = title.split("|").filter(Boolean);

  return lines
    .map((line, index) => {
      const lineClass = ["_2", "_1", "_3", "_4"][index] || "_2";
      const remainingTitle = index === 0 ? lines.slice(1).join(" ") : "";
      const tag = index === 0 ? "h1" : "div";
      const className = `title-1 ${lineClass}${index === 0 ? "" : " visibly-title-line"}`;
      const hiddenTitle = remainingTitle ? `<span class="visibly-sr-only"> ${escapeHtml(remainingTitle)}</span>` : "";

      return `  <div class="top-part-hero _2">
    <${tag} class="${className}">${escapeHtml(line)}${hiddenTitle}<strong><br></strong></${tag}>
  </div>`;
    })
    .join("\n");
}

function buildPageHeroPartial(openTag) {
  const renderedOpenTag = markPageHeroRendered(openTag);
  const title = getAttribute(openTag, "data-hero-title", "Velkoformátový|tisk");
  const kicker = getAttribute(openTag, "data-hero-kicker", "Tisk");
  const text = getAttribute(openTag, "data-hero-text", "");
  const buttonLabel = getAttribute(openTag, "data-hero-button-label", "");
  const buttonUrl = getAttribute(openTag, "data-hero-button-url", "/kontakt");
  const scrollText = getAttribute(openTag, "data-hero-scroll-text", "Scroll");
  const scrollTarget = getAttribute(openTag, "data-hero-scroll-target", "#sluzby");
  const image = pageHeroImages[kicker.toLowerCase()] || pageHeroImages.tisk;
  const imageBase = image.src.replace(/-optimized\.jpg$/, "");
  const imageSrcset = image.src.endsWith("-optimized.jpg")
    ? ` srcset="${imageBase}-480.jpg 480w, ${imageBase}-760.jpg 760w, ${image.src} 1100w" sizes="(max-width: 479px) 48vw, (max-width: 767px) 64vw, (max-width: 991px) 56vw, 540px"`
    : "";
  const button = buttonLabel
    ? `    <a href="${escapeHtml(buttonUrl)}" class="button-circle _2 w-inline-block">
      <div>${escapeHtml(buttonLabel)}</div>
      <div class="button-overlay active"></div>
    </a>`
    : "";

  return `${renderedOpenTag}
<div class="visibly-print-hero-copy">
${buildTitleFallback(title)}
</div>
<div class="visibly-print-hero-images visibly-page-hero-image-wrap" aria-label="Ukázka ${escapeHtml(kicker)} Visibly">
  <div class="circle-image visibly-print-hero-image visibly-print-hero-image-primary visibly-page-hero-circle">
    <img src="${image.src}"${imageSrcset} loading="eager" alt="${image.alt}" class="visibly-print-hero-photo" decoding="async">
  </div>
</div>
<p class="subhead _2 visibly-print-hero-text">${escapeHtml(text)}</p>
<div class="visibly-page-hero-actions">
${button}
  <a href="${escapeHtml(scrollTarget)}" class="scroll-down visibly-page-hero-scroll">${escapeHtml(scrollText)}</a>
</div>
</div>`;
}

function syncPageHero(source, partial) {
  if (!partial) {
    return source;
  }

  const escapedStart = pageHeroStart.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = pageHeroEnd.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const markedBlock = new RegExp(`(^[ \\t]*)${escapedStart}[\\s\\S]*?^[ \\t]*${escapedEnd}`, "m");
  const match = source.match(markedBlock);

  if (!match) {
    return source;
  }

  const indent = match[1] || "";
  const preservedPartial = preservePageHeroAttributes(match[0], partial);
  const replacement = `${indent}${pageHeroStart}\n${indentBlock(preservedPartial, indent)}\n${indent}${pageHeroEnd}`;

  return source.replace(markedBlock, replacement);
}

function scriptPathFor(file, scriptPath) {
  return file.includes(path.sep) ? `/${scriptPath}` : scriptPath;
}

function ensureScript(source, file, scriptPath, marker, beforeWebflow = false) {
  const requiredMarker = marker || topInfoBarStart;

  if (!source.includes(requiredMarker) || source.includes(scriptPath)) {
    return source;
  }

  const src = scriptPathFor(file, scriptPath);
  if (source.includes(`src="${src}"`) || source.includes(`src='${src}'`)) {
    return source;
  }

  const script = `<script src="${src}" type="text/javascript" defer></script>`;
  const webflowScript = /<script\s+src="[^"]*js\/webflow\.js"[^>]*><\/script>/;
  const webflowMatch = source.match(webflowScript);

  if (webflowMatch) {
    return beforeWebflow
      ? source.replace(webflowMatch[0], `${script}\n  ${webflowMatch[0]}`)
      : source.replace(webflowMatch[0], `${webflowMatch[0]}\n  ${script}`);
  }

  return source.replace("</body>", `  ${script}\n</body>`);
}

function ensureTopInfoBarBodyClass(source) {
  if (!source.includes(topInfoBarStart)) {
    return source;
  }

  return source.replace(/<body\b([^>]*)>/i, (match, attributes) => {
    const classMatch = attributes.match(/\bclass="([^"]*)"/i);

    if (!classMatch) {
      return `<body${attributes} class="has-top-info-bar">`;
    }

    const classes = classMatch[1].split(/\s+/).filter(Boolean);
    if (classes.includes("has-top-info-bar")) {
      return match;
    }

    const updatedClass = `class="${classes.concat("has-top-info-bar").join(" ")}"`;
    return match.replace(classMatch[0], updatedClass);
  });
}

function syncRuntimeScripts(source) {
  const keepScripts = [
    "/js/visibly-mobile-menu.js?v=mobile-menu-10",
    "/js/visibly-top-info-bar.js",
    "/js/visibly-breadcrumbs.js?v=performance-2",
    "/js/visibly-runtime-loader.js?v=performance-1",
  ];
  const removePattern = /[ \t]*<script\s+src="[^"]*\/?js\/(?:jquery-3\.5\.1\.min\.dc5e7f18c8|webflow|visibly-page-hero|visibly-custom|visibly-sticky-cta|visibly-breadcrumbs|visibly-mobile-menu|visibly-top-info-bar|visibly-runtime-loader)\.js[^"]*"[^>]*><\/script>\n?/g;
  let next = source.replace(removePattern, "");

  keepScripts.forEach((src) => {
    if (!next.includes(`src="${src}"`)) {
      next = next.replace("</body>", `  <script src="${src}" type="text/javascript" defer></script>\n</body>`);
    }
  });

  return next;
}

function isIgnored(relativePath) {
  return ignoredPathPatterns.some((pattern) => pattern.test(relativePath.split(path.sep).join("/")));
}

function collectHtmlFiles(dir, relativeDir = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    const fullPath = path.join(dir, entry.name);
    const normalizedPath = relativePath.split(path.sep).join("/");

    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules" || isIgnored(`${normalizedPath}/`)) {
        continue;
      }

      files.push(...collectHtmlFiles(fullPath, relativePath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html") && !isIgnored(normalizedPath)) {
      files.push(relativePath);
    }
  }

  return files;
}

const htmlFiles = collectHtmlFiles(rootDir).sort();

const changedFiles = [];

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  const original = fs.readFileSync(filePath, "utf8");
  let next = original;

  next = syncTopInfoBar(next, topInfoBarPartial);
  next = syncPageHero(next, pageHeroPartial);
  next = ensureTopInfoBarBodyClass(next);

  next = syncBlock(
    next,
    /<div\b[^>]*class="[^"]*\bnavigation-wrapper\b[^"]*"[^>]*>/,
    headerStart,
    headerEnd,
    headerPartial
  );

  next = syncBlock(
    next,
    /<div\b[^>]*class="[^"]*\bfooter\b[^"]*"[^>]*>/,
    footerStart,
    footerEnd,
    footerPartial
  );

  next = syncRuntimeScripts(next);

  if (next !== original) {
    fs.writeFileSync(filePath, next);
    changedFiles.push(file);
  }
}

if (changedFiles.length === 0) {
  console.log("No files changed.");
} else {
  console.log("Updated files:");
  for (const file of changedFiles) {
    console.log(`- ${file}`);
  }
}
