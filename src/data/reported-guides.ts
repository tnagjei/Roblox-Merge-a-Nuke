// input: none
// output: evidenceNotice, competitorSources, reportedCodeRows, reportedClassTiers for site guides
// pos: src/data/reported-guides.ts (更新规则：文件变更需同步本注释与所属目录 README)

export const evidenceNotice = {
  title: "Evidence boundaries",
  body: "This site separates verified evidence from community-reported and pending information. Third-party pages are research signals only. Do not present active codes, rewards, calculator formulas, rankings, patch notes, or wiki claims as verified unless official, Roblox API, or in-game proof exists.",
  verifiedLabel: "Verified: official Roblox page, Roblox public API, official channel, or in-game proof.",
  communityReportedLabel: "Community-reported, not independently verified.",
  pendingLabel: "Pending: not enough evidence yet."
};

type CompetitorSource = {
  label: string;
  url: string;
  evidenceLevel: "official-page-reported" | "community-reported";
  note: string;
};

type ReportedCodeRow = {
  code: string;
  reward: string;
  status: "official-page-reported" | "community-reported";
  sourceLabel: string;
  lastChecked: string;
};

type ReportedClassTier = {
  tier: string;
  items: string[];
  status: "community-reported";
  sourceLabel: string;
};

type ReportedClass = {
  name: string;
  role: string;
  status: "community-reported";
  sourceLabel: string;
  note: string;
};

type ReportedWeapon = {
  name: string;
  category: string;
  status: "community-reported";
  sourceLabel: string;
  note: string;
};

type ReportedValueRow = {
  item: string;
  priority: string;
  status: "community-reported";
  sourceLabel: string;
  note: string;
};

export const competitorSources: CompetitorSource[] = [
  {
    label: "Roblox game page",
    url: "https://www.roblox.com/games/128784467030899/Merge-a-Nuke",
    evidenceLevel: "official-page-reported",
    note: "Official Roblox listing reports the creator, gameplay summary, Friday update cadence, and code BOOM."
  },
  {
    label: "Third-party codes pages",
    url: "https://www.pcgamesn.com/merge-a-nuke/codes",
    evidenceLevel: "community-reported",
    note: "Useful for redemption-path cross-checking, but rewards and active state still need in-game confirmation."
  }
];
export const reportedCodeRows: ReportedCodeRow[] = [
  {
    code: "BOOM",
    reward: "Official Roblox listing does not state a reward.",
    status: "official-page-reported",
    sourceLabel: "Roblox game page, checked 2026-06-16",
    lastChecked: "2026-06-16"
  }
];
export const reportedClassTiers: ReportedClassTier[] = [];
export const reportedClasses: ReportedClass[] = [];
export const reportedWeapons: ReportedWeapon[] = [];
export const reportedValueRows: ReportedValueRow[] = [];
