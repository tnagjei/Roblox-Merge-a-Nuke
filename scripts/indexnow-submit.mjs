import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const configText = fs.readFileSync(path.join(root, "src/data/config.ts"), "utf8");

function extractString(source, key, fallback = "") {
  const match = source.match(new RegExp(`${key}:\\s*["']([^"']*)["']`, "m"));
  return match?.[1] || fallback;
}

function extractArray(source, key) {
  const match = source.match(new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (!match) return [];
  return Array.from(match[1].matchAll(/["']([^"']*)["']/g)).map((item) => item[1]);
}

function cleanBaseUrl(value) {
  return value.replace(/\/+$/g, "");
}

function absoluteUrl(baseUrl, routePath) {
  const normalizedPath = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `${cleanBaseUrl(baseUrl)}${normalizedPath}`;
}

const siteDomain = extractString(configText, "siteDomain", "https://mergeanuke.online");
const endpoint = extractString(configText, "endpoint", "https://api.indexnow.org/indexnow");
const publicPaths = extractArray(configText, "publicPaths");
const noindexPaths = extractArray(configText, "noindexPaths");
const blockedPaths = extractArray(configText, "blockedPaths");
const forbiddenPaths = new Set([...noindexPaths, ...blockedPaths]);
const unsafeSubmission = publicPaths.filter((item) => forbiddenPaths.has(item));

if (unsafeSubmission.length > 0) {
  throw new Error(`IndexNow publicPaths includes forbidden path(s): ${unsafeSubmission.join(", ")}`);
}

if (publicPaths.length === 0) {
  throw new Error("IndexNow publicPaths must not be empty.");
}

const urlList = publicPaths.map((routePath) => absoluteUrl(siteDomain, routePath));

if (dryRun) {
  console.log("IndexNow dry run. No request was sent.");
  console.log(`Endpoint: ${endpoint}`);
  console.log(`URL count: ${urlList.length}`);
  for (const url of urlList) console.log(`- ${url}`);
  process.exit(0);
}

const key = (process.env.INDEXNOW_KEY || "").trim();

if (!key) {
  throw new Error("INDEXNOW_KEY is missing. HUMAN_DECISION_REQUIRED: set INDEXNOW_KEY in Cloudflare Pages or shell environment before submitting. 人工确认：提交前需要设置 INDEXNOW_KEY。");
}

if (!/^[0-9a-fA-F-]{36}$/.test(key)) {
  throw new Error("INDEXNOW_KEY must be a UUID-style key.");
}

const host = new URL(siteDomain).host;
const body = {
  host,
  key,
  keyLocation: absoluteUrl(siteDomain, `/${key}.txt`),
  urlList
};

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify(body)
});

if (!response.ok) {
  const text = await response.text();
  throw new Error(`IndexNow submission failed with ${response.status}: ${text}`);
}

console.log(`IndexNow submitted ${urlList.length} public URL(s).`);
