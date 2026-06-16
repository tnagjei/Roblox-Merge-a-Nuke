// input: siteConfig configurations
// output: homeContent object including hero texts, quick facts, FAQ structures for landing usage
// pos: src/content/home.ts (更新规则：文件变更需同步本注释与所属目录 README)

import { siteConfig } from "../data/config";

export const wikiLinks = [
  { title: "Calculator", slug: "calculator", description: "Estimate offline cash or upgrade targets with your own numbers, avoiding fake official formulas." },
  { title: "Codes", slug: "codes", description: "Track official-page and community-reported code status without inventing rewards." },
  { title: "Tier List", slug: "tier-list", description: "Hold ranking research until enough evidence exists for reviewed community tiers." },
  { title: "Beginner Guide", slug: "guide", description: "Start with codes, clean merges, income upgrades, base lock habits, and safer first raids before chasing higher tiers." },
  { title: "Progression Guide", slug: "progression", description: "Build a stronger cash engine, improve upgrade order, protect offline value, and work toward the strongest nuke route." },
  { title: "Raid Guide", slug: "raid", description: "Learn when to attack, how to choose targets, how to protect stolen cash, and why base lock matters after raids." },
  { title: "Upgrades Guide", slug: "upgrades", description: "Choose spawn flow, stronger nuke spawns, lock upgrades, raid cooldowns, and health upgrades in a safer order." },
  { title: "Offline Cash", slug: "offline-cash", description: "Prepare the board before leaving, spend useful cash, keep your best nukes active, and lock the base as the final action." },
  { title: "Rebirth Guide", slug: "rebirth", description: "Decide when rebirth is worth it, prepare before confirming, and rebuild quickly after the reset." },
  { title: "Updates", slug: "updates", description: "Track the reported Friday update cadence and avoid fake patch notes." },
  { title: "Wiki", slug: "wiki", description: "Centralize source-backed mechanics and open research gaps." }
];

export const homeContent = {
  title: `${siteConfig.siteName} | Roblox Simulator Codes and Wiki`,
  description: `${siteConfig.siteName} is your ultimate offline cash progress planner and code watcher hub. Get updated Roblox simulation codes, wiki databases, and guides.`,
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
