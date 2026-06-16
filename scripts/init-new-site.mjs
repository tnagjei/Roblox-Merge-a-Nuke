import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const WIKI_HUB_SLUGS = ["", "calculator", "codes", "tier-list", "beginner-guide", "updates", "wiki", "progression", "raid", "upgrades", "offline-cash", "rebirth"];
const MINIMAL_SLUGS = [""];
const WIKI_PAGE_FILES = [
  "src/pages/calculator.astro",
  "src/pages/codes.astro",
  "src/pages/tier-list.astro",
  "src/pages/beginner-guide.astro",
  "src/pages/updates.astro",
  "src/pages/wiki.astro",
  "src/pages/progression.astro",
  "src/pages/raid.astro",
  "src/pages/upgrades.astro",
  "src/pages/offline-cash.astro",
  "src/pages/rebirth.astro"
];
const ICON_THEMES = ["default", "magic", "farm", "anime", "combat", "racing", "simulator", "nuke"];

function parseArgs(items) {
  const result = {};
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = items[i + 1];
    if (!next || next.startsWith("--")) {
      result[key] = "true";
    } else {
      result[key] = next;
      i += 1;
    }
  }
  return result;
}

function usage() {
  return `Usage:\n  npm run init:new-site -- --site-name "Merge a Nuke Guide" --game-name "Merge a Nuke" --domain "https://mergeanuke.online" --contact-email "tangjei414@gmail.com" --roblox-url "https://www.roblox.com/games/128784467030899/Merge-a-Nuke" --icon-theme combat\n\nRequired:\n  --site-name\n  --game-name\n  --domain\n  --contact-email\n  --roblox-url\n\nDefault launch mode:\n  wiki-hub\n\nLaunch modes:\n  --launch-mode wiki-hub\n  --launch-mode minimal\n\nOptional Roblox metadata:\n  --primary-keyword\n  --creator-name\n  --universe-id\n  --root-place-id\n  --max-players\n  --official-title\n  --genre\n\nOptional themed icon settings:\n  --icon-theme default|magic|farm|anime|combat|racing|simulator|nuke\n  --brand-color "#171717"\n  --accent-color "#facc15"\n`;
}

function assertRequired(options, key) {
  if (!options[key] || options[key].trim() === "") {
    throw new Error(`Missing required argument: --${key}`);
  }
}

function assertHttpsUrl(label, value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid URL`);
  }
  if (parsed.protocol !== "https:") {
    throw new Error(`${label} must start with https://`);
  }
  return parsed.toString().replace(/\/+$/g, "");
}

function assertEmail(value) {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
    throw new Error("--contact-email must be a valid email address");
  }
}

function numberOrNull(value, label) {
  if (!value) return null;
  if (!/^\d+$/.test(value)) throw new Error(`${label} must be a numeric value`);
  return Number(value);
}

function assertHexColor(label, value) {
  if (!/^#[0-9a-fA-F]{6}$/.test(value)) throw new Error(`${label} must be a hex color like #17241f`);
  return value.toLowerCase();
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), `${content.trim()}\n`);
}

function q(value) {
  return JSON.stringify(value);
}

function packageNameFromDomain(domain) {
  return domain.replace(/^https:\/\//, "").replace(/^www\./, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "roblox-guide-site";
}

function removeWikiPagesForMinimal() {
  for (const file of WIKI_PAGE_FILES) {
    const fullPath = path.join(root, file);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  }
}

const options = parseArgs(args);

if (options.help === "true") {
  console.log(usage());
  process.exit(0);
}

try {
  for (const key of ["site-name", "game-name", "domain", "contact-email", "roblox-url"]) {
    assertRequired(options, key);
  }

  const siteName = options["site-name"].trim();
  const gameName = options["game-name"].trim();
  const siteDomain = assertHttpsUrl("--domain", options.domain.trim());
  const contactEmail = options["contact-email"].trim();
  const robloxUrl = assertHttpsUrl("--roblox-url", options["roblox-url"].trim());
  const launchMode = (options["launch-mode"] || "wiki-hub").trim();
  const primaryKeyword = (options["primary-keyword"] || `${gameName} guide`).trim();
  const creatorName = (options["creator-name"] || "Unknown creator").trim();
  const officialTitle = (options["official-title"] || gameName).trim();
  const genre = (options.genre || "Roblox adventure").trim();
  const universeId = numberOrNull(options["universe-id"], "--universe-id");
  const rootPlaceId = numberOrNull(options["root-place-id"], "--root-place-id");
  const maxPlayers = numberOrNull(options["max-players"], "--max-players");
  const iconTheme = (options["icon-theme"] || "default").trim();
  const brandColor = assertHexColor("--brand-color", options["brand-color"] || "#17241f");
  const accentColor = assertHexColor("--accent-color", options["accent-color"] || "#facc15");

  if (!["minimal", "wiki-hub"].includes(launchMode)) {
    throw new Error("--launch-mode must be minimal or wiki-hub");
  }
  if (!ICON_THEMES.includes(iconTheme)) {
    throw new Error(`--icon-theme must be one of: ${ICON_THEMES.join(", ")}`);
  }

  assertEmail(contactEmail);

  const completedCoreSlugs = launchMode === "wiki-hub" ? WIKI_HUB_SLUGS : MINIMAL_SLUGS;
  const publicPaths = [
    ...completedCoreSlugs.map((slug) => (slug ? `/${slug}/` : "/")),
    "/about/",
    "/contact/",
    "/editorial-policy/"
  ];

  if (launchMode === "minimal") removeWikiPagesForMinimal();

  write(
    "src/data/config.ts",
    `export const siteConfig = {
  siteName: ${q(siteName)},
  gameName: ${q(gameName)},
  siteDomain: ${q(siteDomain)},
  canonicalDomain: ${q(siteDomain)},
  contactEmail: ${q(contactEmail)},
  primaryKeyword: ${q(primaryKeyword)},
  launchMode: ${q(launchMode)},
  defaultLocale: "en",
  availableLocales: ["en", "th", "fil", "id"],
  completedLocales: ["en"],
  coreSlugs: ["", "calculator", "codes", "tier-list", "beginner-guide", "updates", "wiki", "progression", "raid", "upgrades", "offline-cash", "rebirth"],
  completedCoreSlugs: ${JSON.stringify(completedCoreSlugs)},
  englishOnlySlugs: [],
  completedEnglishOnlySlugs: [],
  systemSlugs: ["about", "contact", "editorial-policy"],
  blockedSlugs: ["scripts", "macros", "executor", "exploit", "guide"],
  navigationSlugs: ["", "calculator", "codes", "tier-list", "beginner-guide", "updates", "wiki", "progression", "raid", "upgrades", "offline-cash", "rebirth"],
  routePolicy: {
    publicPaths: ${JSON.stringify(publicPaths)},
    noindexPaths: ["/privacy/", "/terms/"],
    blockedPaths: ["/scripts/", "/macros/", "/executor/", "/exploit/", "/guide/"]
  },
  wwwPolicy: {
    source: ${q(siteDomain.replace("https://", "https://www."))},
    target: ${q(siteDomain)},
    statusCode: 301
  },
  indexNow: {
    // HUMAN_DECISION_REQUIRED: Copy INDEXNOW_KEY into Cloudflare Pages environment variables before deployment. 人工确认：部署时需要把 INDEXNOW_KEY 填进 Cloudflare Pages 环境变量。
    keyEnvVar: "INDEXNOW_KEY",
    endpoint: "https://api.indexnow.org/indexnow"
  },
  publisher: {
    displayName: ${q(siteName)},
    responseTime: "We usually review messages within 7 business days.",
    country: ""
  },
  systemPages: {
    about: true,
    contact: true,
    privacy: true,
    terms: true,
    editorialPolicy: true,
    adPolicy: false
  },
  analytics: {
    googleAnalyticsId: "",
    adsenseClient: "",
    clarityId: "",
    thirdPartyAdScripts: []
  },
  assets: {
    icon: "/icon.svg",
    hero: "/hero-bg.jpg",
    ogImage: "/og-default.jpg",
    iconTheme: ${q(iconTheme)},
    brandColor: ${q(brandColor)},
    accentColor: ${q(accentColor)}
  }
};`
  );

  write(
    "src/data/game.ts",
    `export const gameData = {
  robloxUrl: ${q(robloxUrl)},
  creatorName: ${q(creatorName)},
  universeId: ${universeId === null ? "null" : universeId},
  rootPlaceId: ${rootPlaceId === null ? "null" : rootPlaceId},
  maxPlayers: ${maxPlayers === null ? "null" : maxPlayers},
  officialTitle: ${q(officialTitle)},
  genre: ${q(genre)},
  sourceConfidence: [
    { label: "Roblox game page", level: "pending" },
    { label: "Roblox public API", level: "pending" },
    { label: "Official channels", level: "pending" },
    { label: "In-game checks", level: "pending" }
  ],
  codes: {
    verifiedActiveCodes: [],
    pendingCodes: [],
    communityReportedCodes: [],
    officialStatus: "No verified official active codes yet",
    verificationPolicy: "Do not publish active codes as verified without official or in-game proof."
  }
};`
  );

  write(
    "src/content/home.ts",
    `import { siteConfig } from "../data/config";

export const wikiLinks = [
  { title: "Calculator", slug: "calculator", description: "Estimate offline cash or upgrade targets with your own numbers, avoiding fake official formulas." },
  { title: "Codes", slug: "codes", description: "Track official-page and community-reported code status without inventing rewards." },
  { title: "Tier List", slug: "tier-list", description: "Hold ranking research until enough evidence exists for reviewed community tiers." },
  { title: "Beginner Guide", slug: "beginner-guide", description: "Explain the verified loop: merge bombs, collect cash, raid bases, and lock your base." },
  { title: "Updates", slug: "updates", description: "Track the reported Friday update cadence and avoid fake patch notes." },
  { title: "Wiki", slug: "wiki", description: "Centralize source-backed mechanics and open research gaps." },
  { title: "Progression Guide", slug: "progression", description: "Build the cash engine, protect value, and prepare rebirth timing." },
  { title: "Raid Guide", slug: "raid", description: "Choose raid timing, targets, and post-raid cash protection with conservative labels." },
  { title: "Upgrades Guide", slug: "upgrades", description: "Pick upgrades by bottleneck instead of unsafe auto-upgrade scripts." },
  { title: "Offline Cash", slug: "offline-cash", description: "Prepare away windows with measured rates, lock habits, and calculator estimates." },
  { title: "Rebirth Guide", slug: "rebirth", description: "Plan reset timing, pre-rebirth checks, and post-reset recovery." }
];

export const homeContent = {
  title: \`\${siteConfig.siteName} | Roblox Tools and Wiki\`,
  description: \`\${siteConfig.siteName} is an evidence-first Astro static site for Roblox codes, calculator tools, beginner guidance, updates, and wiki research.\`,
  hero: {
    eyebrow: "Roblox tools hub",
    title: \`\${siteConfig.gameName} Guide and Tools\`,
    lede: "Track tools, codes, updates, and source-backed wiki notes without mixing verified facts with unverified claims.",
    primaryAction: "Open Roblox page"
  },
  quickFacts: [
    { label: "Evidence policy", value: "Verified / reported / pending" },
    { label: "Route model", value: "Astro static dist/" },
    { label: "Click depth", value: "Core pages stay within three clicks" }
  ],
  trendingSearches: [
    \`\${siteConfig.gameName} calculator\`,
    \`\${siteConfig.gameName} codes\`,
    \`\${siteConfig.gameName} tier list\`,
    \`\${siteConfig.gameName} beginner guide\`,
    \`\${siteConfig.gameName} update\`,
    \`\${siteConfig.gameName} wiki\`
  ],
  wikiLinks,
  guideMap: [
    { step: "1", title: "Confirm official sources", body: "Roblox listing data anchors game identity and current official-page code signals." },
    { step: "2", title: "Separate tools from claims", body: "Calculators use player input instead of pretending to know hidden formulas." },
    { step: "3", title: "Keep evidence labels visible", body: "Pages enter sitemap only after source labels and static export checks pass." }
  ],
  faq: [
    { q: "Are community-reported codes verified?", a: "No. They are research signals until independently confirmed." },
    { q: "Why do tools ask for player inputs?", a: "Because official formulas are often unavailable and should not be invented." }
  ]
};`
  );

  write(
    "astro.config.mjs",
    `import { defineConfig } from "astro/config";

export default defineConfig({
  site: ${q(siteDomain)},
  output: "static",
  trailingSlash: "always"
});`
  );

  const packagePath = path.join(root, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  packageJson.name = packageNameFromDomain(siteDomain);
  fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

  console.log("New Astro Roblox guide site initialized.");
  console.log(`- Site: ${siteName}`);
  console.log(`- Game: ${gameName}`);
  console.log(`- Domain: ${siteDomain}`);
  console.log(`- Launch mode: ${launchMode}`);
  console.log(`- Icon theme: ${iconTheme}`);
  console.log("Next: run npm run build, then npm run check");
} catch (error) {
  console.error("init:new-site failed:");
  console.error(`- ${error.message}`);
  console.error(usage());
  process.exit(1);
}
