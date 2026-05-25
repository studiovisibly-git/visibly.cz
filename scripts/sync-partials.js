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

  return partial.replace(partialOpen[0], currentOpen[0]);
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

  const script = `<script src="${src}" type="text/javascript"></script>`;
  const webflowScript = /<script\s+src="[^"]*js\/webflow\.js"[^>]*><\/script>/;
  const webflowMatch = source.match(webflowScript);

  if (webflowMatch) {
    return beforeWebflow
      ? source.replace(webflowMatch[0], `${script}\n  ${webflowMatch[0]}`)
      : source.replace(webflowMatch[0], `${webflowMatch[0]}\n  ${script}`);
  }

  return source.replace("</body>", `  ${script}\n</body>`);
}

function collectHtmlFiles(dir, relativeDir = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "realizace" || entry.name === "pruvodce") {
        files.push(...collectHtmlFiles(fullPath, relativePath));
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html") && relativeDir === "") {
      files.push(relativePath);
    } else if (entry.isFile() && entry.name.endsWith(".html") && (relativeDir === "realizace" || relativeDir === "pruvodce")) {
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

  next = ensureScript(next, file, "js/visibly-top-info-bar.js", topInfoBarStart);
  next = ensureScript(next, file, "js/visibly-mobile-menu.js", headerStart, true);
  next = ensureScript(next, file, "js/visibly-page-hero.js", pageHeroStart, true);

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
