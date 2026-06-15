export const evidenceNotice = {
  title: "Evidence boundaries",
  body: "This site separates verified evidence from community-reported and pending information. Third-party pages are research signals only. Do not present active codes, class tiers, weapon stats, or value rows as verified unless official, Roblox API, or in-game proof exists.",
  verifiedLabel: "Verified: official Roblox page, Roblox public API, official channel, or in-game proof.",
  communityReportedLabel: "Community-reported, not independently verified.",
  pendingLabel: "Pending: not enough evidence yet."
};

type CompetitorSource = {
  label: string;
  url: string;
  evidenceLevel: "community-reported";
  note: string;
};

type ReportedCodeRow = {
  code: string;
  reward: string;
  status: "community-reported";
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

export const competitorSources: CompetitorSource[] = [];
export const reportedCodeRows: ReportedCodeRow[] = [];
export const reportedClassTiers: ReportedClassTier[] = [];
export const reportedClasses: ReportedClass[] = [];
export const reportedWeapons: ReportedWeapon[] = [];
export const reportedValueRows: ReportedValueRow[] = [];
