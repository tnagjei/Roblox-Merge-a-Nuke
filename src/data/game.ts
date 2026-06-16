// input: none
// output: gameData object storing official Roblox URL, universe IDs, descriptions, and update signals
// pos: src/data/game.ts (更新规则：文件变更需同步本注释与所属目录 README)

export const gameData = {
  robloxUrl: "https://www.roblox.com/games/128784467030899/Merge-a-Nuke",
  creatorName: "Nuke The Game",
  universeId: 10199301628,
  rootPlaceId: 128784467030899,
  maxPlayers: null,
  officialTitle: "Merge a Nuke!",
  genre: "Tycoon and simulation",
  officialDescription: "Merge bombs into bigger nukes, earn cash over time, raid enemy bases, and lock your base before retaliation.",
  updateCadence: "The Roblox description reports new updates every Friday.",
  sourceConfidence: [
    { label: "Roblox game page", level: "verified" },
    { label: "Roblox public API", level: "pending" },
    { label: "Official code text", level: "Roblox page reports BOOM" },
    { label: "In-game checks", level: "pending" }
  ],
  codes: {
    verifiedActiveCodes: [],
    pendingCodes: ["BOOM"],
    communityReportedCodes: [],
    officialStatus: "Roblox page currently reports code BOOM, but this site has not performed an in-game redemption check.",
    verificationPolicy: "Do not publish rewards or active status as in-game verified without redemption proof."
  }
};
