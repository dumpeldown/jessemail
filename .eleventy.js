const fs = require("fs/promises");
const path = require("path");
const Image = require("@11ty/eleventy-img").default;
const exifr = require("exifr");

const UPLOAD_PREFIX = "/assets/img/uploads/";
const OPTIMIZED_URL_PATH = "/assets/img/optimized/";
const OPTIMIZED_OUTPUT_DIR = "./_site/assets/img/optimized/";
const IMAGE_TAG_REGEX = /<img\s+([^>]*?)>/gi;

function parseAttributes(attributeString) {
  const attributes = {};
  const attributeRegex = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

  for (const match of attributeString.matchAll(attributeRegex)) {
    const [, key, doubleQuoted, singleQuoted, bare] = match;
    if (!key) continue;
    attributes[key] = doubleQuoted ?? singleQuoted ?? bare ?? "";
  }

  return attributes;
}

function resolveUploadPath(src) {
  if (!src || !src.startsWith(UPLOAD_PREFIX)) {
    return null;
  }

  const decodedSource = decodeURIComponent(src);
  return path.join(process.cwd(), "src", decodedSource.replace(/^\/+/, ""));
}

function formatCoordinate(value) {
  return Number.parseFloat(value).toFixed(6);
}

function createLocationLink(gps) {
  if (!gps || !Number.isFinite(gps.latitude) || !Number.isFinite(gps.longitude)) {
    return "";
  }

  const latitude = formatCoordinate(gps.latitude);
  const longitude = formatCoordinate(gps.longitude);
  const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

  return `<br><small class="image-location"><a href="${mapUrl}" target="_blank" rel="noopener noreferrer">📍 Aufnahmeort des Bildes in OpenStreetMap anzeigen</a></small>`;
}

async function renderOptimizedImage(attrs) {
  const sourcePath = resolveUploadPath(attrs.src);

  if (!sourcePath) {
    return null;
  }

  try {
    await fs.access(sourcePath);
  } catch {
    return null;
  }

  const metadata = await Image(sourcePath, {
    widths: [1200],
    formats: ["webp", "jpeg"],
    outputDir: OPTIMIZED_OUTPUT_DIR,
    urlPath: OPTIMIZED_URL_PATH,
    filenameFormat: (id, src, width, format) => {
      const filename = path.parse(src).name;
      return `${filename}-${width}w.${format}`;
    }
  });

  const imageAttributes = {
    alt: attrs.alt || "",
    sizes: attrs.sizes || "(max-width: 1200px) 100vw, 1200px",
    loading: attrs.loading || "lazy",
    decoding: attrs.decoding || "async"
  };

  if (attrs.class) {
    imageAttributes.class = attrs.class;
  }

  if (attrs.title) {
    imageAttributes.title = attrs.title;
  }

  const picture = Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });

  let gps = null;
  try {
    gps = await exifr.gps(sourcePath);
  } catch {
    gps = null;
  }

  const locationLink = createLocationLink(gps);
  return `${picture}${locationLink}`;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.amendLibrary("md", (mdLib) => {
    mdLib.set({
      html: true
    });
  });

  eleventyConfig.addTransform("optimizeMarkdownImages", async function(content, outputPath) {
    if (!outputPath?.endsWith(".html") || !content.includes("<img")) {
      return content;
    }

    let result = "";
    let lastIndex = 0;

    for (const match of content.matchAll(IMAGE_TAG_REGEX)) {
      const [fullMatch, attributeString] = match;
      const matchStart = match.index ?? 0;
      const matchEnd = matchStart + fullMatch.length;

      result += content.slice(lastIndex, matchStart);

      const attrs = parseAttributes(attributeString);
      const replacement = await renderOptimizedImage(attrs);
      result += replacement || fullMatch;

      lastIndex = matchEnd;
    }

    result += content.slice(lastIndex);
    return result;
  });

  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
