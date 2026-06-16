import { siteConfig } from "../data/config";

export const wikiLinks = [
  { title: "Calculator", slug: "calculator", description: "Estimate offline cash or upgrade targets with your own numbers, avoiding fake official formulas." },
  { title: "Codes", slug: "codes", description: "Track official-page and community-reported code status without inventing rewards." },
  { title: "Tier List", slug: "tier-list", description: "Hold ranking research until enough evidence exists for reviewed community tiers." },
  { title: "Beginner Guide", slug: "beginner-guide", description: "Explain the verified loop: merge bombs, collect cash, raid bases, and lock your base." },
  { title: "Updates", slug: "updates", description: "Track the reported Friday update cadence and avoid fake patch notes." },
  { title: "Wiki", slug: "wiki", description: "Centralize source-backed mechanics and open research gaps." }
];

export const homeContent = {
  title: `${siteConfig.siteName} | Roblox Tools and Wiki`,
  description: `${siteConfig.siteName} is an evidence-first Astro static site for Merge a Nuke codes, calculator tools, beginner guidance, updates, and wiki research.`,
  hero: {
    eyebrow: "Roblox tools hub",
    title: `${siteConfig.gameName} Guide and Tools`,
    lede: "Merge bombs, earn cash, raid bases, and track code signals without mixing verified facts with unverified claims.",
    primaryAction: "Open Roblox page"
  },
  quickFacts: [
    { label: "Official creator", value: "Nuke The Game" },
    { label: "Route model", value: "Astro static dist/" },
    { label: "Evidence policy", value: "Verified / reported / pending" }
  ],
  trendingSearches: [
    `${siteConfig.gameName} calculator`,
    `${siteConfig.gameName} codes`,
    `${siteConfig.gameName} tier list`,
    `${siteConfig.gameName} beginner guide`,
    `${siteConfig.gameName} update`,
    `${siteConfig.gameName} wiki`
  ],
  wikiLinks,
  guideMap: [
    { step: "1", title: "Confirm the official page", body: "Roblox listing data anchors the title, creator, game ID, and the currently reported BOOM code." },
    { step: "2", title: "Separate tools from claims", body: "The calculator accepts player inputs instead of pretending to know hidden game formulas." },
    { step: "3", title: "Promote only reviewed pages", body: "Routes enter sitemap only after data, source labels, and static export checks pass." }
  ],
  faq: [
    { q: "Is BOOM verified in-game by this site?", a: "No. The Roblox listing reports BOOM, but this site still labels redemption proof as pending." },
    { q: "Why does the calculator ask for my own numbers?", a: "Because official cash-per-second and upgrade formulas are not published in the sources reviewed." }
  ]
};
