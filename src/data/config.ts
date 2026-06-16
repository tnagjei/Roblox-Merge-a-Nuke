export const siteConfig = {
  siteName: "Merge a Nuke Guide",
  gameName: "Merge a Nuke",
  siteDomain: "https://mergeanuke.online",
  canonicalDomain: "https://mergeanuke.online",
  contactEmail: "tangjei414@gmail.com",
  primaryKeyword: "Merge a Nuke guide",
  launchMode: "wiki-hub",
  defaultLocale: "en",
  availableLocales: ["en", "th", "fil", "id"],
  completedLocales: ["en"],
  coreSlugs: ["", "calculator", "codes", "tier-list", "beginner-guide", "updates", "wiki"],
  completedCoreSlugs: ["", "calculator", "codes", "tier-list", "beginner-guide", "updates", "wiki"],
  englishOnlySlugs: [],
  completedEnglishOnlySlugs: [],
  systemSlugs: ["about", "contact", "editorial-policy"],
  blockedSlugs: ["scripts", "macros", "executor", "exploit", "guide"],
  navigationSlugs: ["", "calculator", "codes", "tier-list", "beginner-guide", "updates", "wiki"],
  routePolicy: {
    publicPaths: ["/", "/calculator/", "/codes/", "/tier-list/", "/beginner-guide/", "/updates/", "/wiki/", "/about/", "/contact/", "/editorial-policy/"],
    noindexPaths: ["/privacy/", "/terms/"],
    blockedPaths: ["/scripts/", "/macros/", "/executor/", "/exploit/", "/guide/"]
  },
  wwwPolicy: {
    source: "https://www.mergeanuke.online",
    target: "https://mergeanuke.online",
    statusCode: 301
  },
  indexNow: {
    // HUMAN_DECISION_REQUIRED: Copy INDEXNOW_KEY into Cloudflare Pages environment variables before deployment. 人工确认：部署时需要把 INDEXNOW_KEY 填进 Cloudflare Pages 环境变量。
    keyEnvVar: "INDEXNOW_KEY",
    endpoint: "https://api.indexnow.org/indexnow"
  },
  publisher: {
    displayName: "Merge a Nuke Guide",
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
    iconTheme: "nuke",
    brandColor: "#171717",
    accentColor: "#facc15"
  }
};
