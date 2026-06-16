import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const violations = [];

const expectedPublicPaths = ["/", "/calculator/", "/codes/", "/tier-list/", "/beginner-guide/", "/updates/", "/wiki/", "/about/", "/contact/", "/editorial-policy/"];
const expectedNoindexPaths = ["/privacy/", "/terms/"];
const expectedBlockedPaths = ["/scripts/", "/macros/", "/executor/", "/exploit/", "/guide/"];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function extractString(source, key, fallback = "") {
  const match = source.match(new RegExp(`${key}:\\s*["']([^"']*)["']`, "m"));
  return match?.[1] || fallback;
}

function extractArray(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (!match) return [];
  return Array.from(match[1].matchAll(/["']([^"']*)["']/g)).map((item) => item[1]);
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

function sameList(label, actual, expected) {
  if (actual.join(",") !== expected.join(",")) {
    violations.push(`${label} must be ${expected.join(", ")}`);
  }
}

function absoluteUrl(siteDomain, routePath) {
  return `${siteDomain.replace(/\/+$/g, "")}${routePath}`;
}

if (!exists("src/data/config.ts")) {
  violations.push("Missing src/data/config.ts");
} else {
  const config = read("src/data/config.ts");
  const siteDomain = extractString(config, "siteDomain");
  const canonicalDomain = extractString(config, "canonicalDomain");
  const publicPaths = extractArray(config, "publicPaths");
  const noindexPaths = extractArray(config, "noindexPaths");
  const blockedPaths = extractArray(config, "blockedPaths");

  if (siteDomain !== "https://mergeanuke.online") violations.push("siteDomain must be https://mergeanuke.online");
  if (canonicalDomain !== "https://mergeanuke.online") violations.push("canonicalDomain must be https://mergeanuke.online");
  if (siteDomain.includes("www.")) violations.push("siteDomain must use the bare domain, not www");
  sameList("publicPaths", publicPaths, expectedPublicPaths);
  sameList("noindexPaths", noindexPaths, expectedNoindexPaths);
  sameList("blockedPaths", blockedPaths, expectedBlockedPaths);
  if (!config.includes("HUMAN_DECISION_REQUIRED")) violations.push("config must mark IndexNow human confirmation");
}

if (!exists("src/data/game.ts")) {
  violations.push("Missing src/data/game.ts");
} else {
  const game = read("src/data/game.ts");
  if (!game.includes("https://www.roblox.com/games/128784467030899/Merge-a-Nuke")) {
    violations.push("Roblox URL must be the real Merge a Nuke URL");
  }
  if (!game.includes("verifiedActiveCodes: []")) violations.push("verifiedActiveCodes must remain empty until in-game redemption proof exists");
}

if (!exists(".env.example")) {
  violations.push("Missing .env.example");
} else {
  const envExample = read(".env.example");
  if (!envExample.includes("HUMAN_DECISION_REQUIRED")) violations.push(".env.example must mark human confirmation");
  if (!/^INDEXNOW_KEY=[0-9a-fA-F-]{36}$/m.test(envExample)) violations.push(".env.example must include a UUID-style INDEXNOW_KEY");
}

if (!exists("NEW_SITE_SETUP.md")) {
  violations.push("Missing NEW_SITE_SETUP.md");
} else {
  const setup = read("NEW_SITE_SETUP.md");
  for (const required of ["HUMAN_DECISION_REQUIRED", "INDEXNOW_KEY", "Bulk Redirects", "https://mergeanuke.online", "https://www.mergeanuke.online"]) {
    if (!setup.includes(required)) violations.push(`NEW_SITE_SETUP.md must include ${required}`);
  }
}

if (!exists("scripts/indexnow-submit.mjs")) {
  violations.push("Missing scripts/indexnow-submit.mjs");
} else {
  const submitter = read("scripts/indexnow-submit.mjs");
  for (const required of ["publicPaths", "noindexPaths", "blockedPaths", "urlList", "fetch(endpoint"]) {
    if (!submitter.includes(required)) violations.push(`indexnow-submit must include ${required}`);
  }
}

if (!exists("package.json")) {
  violations.push("Missing package.json");
} else {
  const packageJson = JSON.parse(read("package.json"));
  if (packageJson.scripts?.["release:check"] !== "node scripts/release-check.mjs") violations.push("package.json must expose release:check");
  if (packageJson.scripts?.["indexnow:submit"] !== "node scripts/indexnow-submit.mjs") violations.push("package.json must expose indexnow:submit");
}

if (!fs.existsSync(distDir)) {
  violations.push("dist/ must exist before release:check");
} else {
  const config = read("src/data/config.ts");
  const siteDomain = extractString(config, "siteDomain");
  const sitemap = fs.existsSync(path.join(distDir, "sitemap.xml")) ? fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8") : "";
  const robots = fs.existsSync(path.join(distDir, "robots.txt")) ? fs.readFileSync(path.join(distDir, "robots.txt"), "utf8") : "";
  const privacy = fs.existsSync(path.join(distDir, "privacy/index.html")) ? fs.readFileSync(path.join(distDir, "privacy/index.html"), "utf8") : "";
  const terms = fs.existsSync(path.join(distDir, "terms/index.html")) ? fs.readFileSync(path.join(distDir, "terms/index.html"), "utf8") : "";
  const htmlFiles = listFiles(distDir).map((file) => path.relative(distDir, file)).filter((file) => file.endsWith(".html"));
  const sitemapLocs = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1]);
  const expectedSitemapLocs = expectedPublicPaths.map((routePath) => absoluteUrl(siteDomain, routePath));

  for (const file of ["sitemap.xml", "robots.txt", "llms.txt", "llms-full.txt"]) {
    if (!fs.existsSync(path.join(distDir, file))) violations.push(`Missing dist/${file}`);
  }
  sameList("sitemap URLs", sitemapLocs, expectedSitemapLocs);
  if (!robots.includes("Sitemap: https://mergeanuke.online/sitemap.xml")) violations.push("robots.txt must point to the bare-domain sitemap");
  if (!privacy.includes("noindex,follow")) violations.push("privacy page must be noindex");
  if (!terms.includes("noindex,follow")) violations.push("terms page must be noindex");
  for (const forbidden of [...expectedNoindexPaths, ...expectedBlockedPaths]) {
    if (sitemap.includes(forbidden)) violations.push(`sitemap must not include ${forbidden}`);
  }
  for (const blocked of expectedBlockedPaths) {
    const html = blocked === "/" ? "index.html" : `${blocked.replace(/^\/|\/$/g, "")}/index.html`;
    if (htmlFiles.includes(html)) violations.push(`blocked path must not output dist/${html}`);
  }
}

const sourceScanFiles = [
  "src/data/config.ts",
  "src/data/game.ts",
  "src/data/reported-guides.ts",
  "src/content/home.ts",
  "astro.config.mjs"
];

for (const file of sourceScanFiles) {
  if (!exists(file)) continue;
  const text = read(file);
  for (const forbidden of ["example.com", "PLACEHOLDER-CODE", "Placeholder class", "Placeholder weapon", "Placeholder item"]) {
    if (text.includes(forbidden)) violations.push(`Forbidden placeholder '${forbidden}' found in ${file}`);
  }
}

if (violations.length > 0) {
  console.error("Release check failed:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log("Release check passed.");
console.log(`Checked ${expectedPublicPaths.length} public path(s), ${expectedNoindexPaths.length} noindex path(s), and ${expectedBlockedPaths.length} blocked path(s).`);
console.log("HUMAN_DECISION_REQUIRED remains for Cloudflare Pages env vars and www Bulk Redirects.");
