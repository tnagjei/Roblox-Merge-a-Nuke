// input: SERP execution blueprint decisions for existing Roblox guide routes
// output: serpPages data used by SerpGuidePage to render conservative SEO pages
// pos: src/data/serp-pages.ts (更新规则：文件变更需同步本注释与所属目录 README)

type EvidenceLabel = "verified" | "reported" | "pending" | "disputed" | "estimated" | "unsafe";

type TextBlock = {
  title: string;
  body: string;
};

type DataTable = {
  eyebrow: string;
  heading: string;
  intro: string;
  columns: string[];
  rows: string[][];
};

type CardSection = {
  eyebrow: string;
  heading: string;
  cards: Array<{
    title: string;
    label: EvidenceLabel;
    body: string[];
  }>;
};

type EvidenceItem = {
  claim: string;
  label: EvidenceLabel;
  detail: string;
};

type FaqItem = {
  question: string;
  answer: string;
  label: EvidenceLabel;
};

export type SerpGuidePageData = {
  currentSlug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  status: string;
  callout: {
    title: string;
    body: string;
    tone?: "neutral" | "green" | "blue" | "red";
  };
  checklist?: {
    eyebrow: string;
    heading: string;
    items: TextBlock[];
  };
  tables: DataTable[];
  cardSections: CardSection[];
  video: {
    heading: string;
    title: string;
    embedUrl: string;
    originalUrl: string;
    note: string;
  };
  evidence: {
    heading: string;
    items: EvidenceItem[];
  };
  faqHeading: string;
  faqs: FaqItem[];
};

export const serpPages = {
  beginnerGuide: {
    currentSlug: "beginner-guide",
    title: "Merge a Nuke Beginner Guide | Roblox Loop and Defense",
    description: "Start with this Merge a Nuke beginner guide for clean merges, cash upgrades, base lock habits, cautious raids, and evidence-safe next steps.",
    eyebrow: "Beginner guide",
    h1: "Merge a Nuke Beginner Guide",
    intro: [
      "Start Merge a Nuke by learning the loop before chasing raids or dramatic tier claims: create pieces, merge duplicates, reinvest cash, protect the base, and only attack when your economy can recover.",
      "This beginner guide avoids fake reward certainty. Codes, tier lists, offline formulas, and rebirth details stay labeled unless they are official, directly tested, or clearly reported."
    ],
    status: "Evidence labels: reported for public game-loop claims, pending for exact stats, unsafe for scripts and exploit shortcuts.",
    callout: {
      title: "Beginner rule",
      body: "Your first goal is not a lucky raid. It is a board that stays clean enough to keep producing cash while you learn when to lock, spend, and reset.",
      tone: "green"
    },
    checklist: {
      eyebrow: "Starter route",
      heading: "What to Do First",
      items: [
        { title: "Merge duplicates", body: "Combine obvious pairs before the board becomes hard to read." },
        { title: "Spend on the cash loop", body: "Use early cash on upgrades that make the next purchase easier." },
        { title: "Keep space open", body: "A cluttered board slows every later decision." },
        { title: "Lock before idling", body: "Build the habit before exposed cash becomes painful to lose." },
        { title: "Delay risky raids", body: "Raid after your base can recover from a bad result." }
      ]
    },
    tables: [
      {
        eyebrow: "Loop",
        heading: "Beginner Progression Loop",
        intro: "Use this simple loop until you know which specialized page you need next.",
        columns: ["Step", "Action", "Next page"],
        rows: [
          ["1", "Merge duplicate pieces and keep the board readable.", "/progression/"],
          ["2", "Spend early cash on upgrades that improve the engine.", "/upgrades/"],
          ["3", "Use the calculator only with your own measured numbers.", "/calculator/"],
          ["4", "Check reported codes without assuming they are active.", "/codes/"],
          ["5", "Learn raid timing after the cash loop feels stable.", "/raid/"]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Safety",
        heading: "Avoid Risky Shortcuts",
        cards: [
          {
            title: "No scripts or executors",
            label: "unsafe",
            body: [
              "Auto merge, executor, macro, exploit, and free Robux pages are unsafe. They are not needed for a legitimate guide route.",
              "Use manual upgrade decisions and the calculator instead."
            ]
          },
          {
            title: "No fake reward promises",
            label: "pending",
            body: [
              "This site currently has 0 in-game verified active codes. Reported codes stay reported until proof improves."
            ]
          },
          {
            title: "Use evidence labels",
            label: "reported",
            body: [
              "Labels tell you whether a claim comes from public game text, community reporting, player input, or unresolved disagreement."
            ]
          }
        ]
      }
    ],
    video: {
      heading: "Beginner Gameplay Video",
      title: "Merge a Nuke beginner gameplay video",
      embedUrl: "https://www.youtube-nocookie.com/embed/qYVHWmSC05U",
      originalUrl: "https://www.youtube.com/watch?v=qYVHWmSC05U",
      note: "This video gives visual context for the store, codes, and early loop. It does not verify code status, rewards, upgrade costs, or the best route."
    },
    evidence: {
      heading: "Beginner Evidence Boundaries",
      items: [
        { claim: "The core loop is publicly reported.", label: "reported", detail: "Public descriptions support merge, cash, raid, lock, offline, and update concepts." },
        { claim: "Exact stats are not beginner advice.", label: "pending", detail: "New players should not rely on unverified damage, cash, or multiplier tables." },
        { claim: "Code status needs proof.", label: "reported", detail: "Reported code rows can be tested, but they are not verified active by this site." },
        { claim: "Shortcut automation is excluded.", label: "unsafe", detail: "No script, macro, executor, or exploit guidance is provided." }
      ]
    },
    faqHeading: "Beginner Guide FAQ",
    faqs: [
      { question: "What should I do first in Merge a Nuke?", answer: "Merge cleanly, improve the cash loop, and keep enough board space open before chasing raids.", label: "reported" },
      { question: "Should beginners raid immediately?", answer: "Usually no. Raid after your economy can recover from mistakes and exposed cash is protected.", label: "pending" },
      { question: "Are beginner codes verified here?", answer: "No. This site currently has 0 directly verified active codes, so reported codes remain labeled.", label: "reported" },
      { question: "Is there a safe script for beginners?", answer: "No. Scripts, executors, and automation shortcuts are unsafe and outside this guide.", label: "unsafe" }
    ]
  },
  raid: {
    currentSlug: "raid",
    title: "Merge a Nuke Raid Guide | Attack, Lock, Cash Defense",
    description: "Use this Merge a Nuke raid guide to plan attacks, pick safer targets, protect cash, avoid scripts, and read evidence labels before raiding.",
    eyebrow: "Raid guide",
    h1: "Merge a Nuke Raid Guide",
    intro: [
      "Raid only when your cash engine can recover from a missed attack. The public Roblox listing reports raiding enemy bases, stealing cash, earning offline cash, and locking your base, but it does not publish raid payout math or lock timing.",
      "This page treats raiding as a mid-run pressure tool, not a beginner shortcut. Merge first, spend exposed cash, choose readable targets, then lock or leave only after you have reduced the chance of losing liquid cash."
    ],
    status: "Evidence labels: reported for public game-loop claims, pending for raid payout details, unsafe for script or executor requests.",
    callout: {
      title: "Raid rule",
      body: "If a raid guide promises guaranteed stolen cash, exact percentages, or a fixed lock cooldown without direct proof, treat it as unverified. This page keeps the decision table practical and avoids fake raid math.",
      tone: "red"
    },
    checklist: {
      eyebrow: "Quick answer",
      heading: "Quick Raid Checklist",
      items: [
        { title: "Stabilize your engine", body: "Upgrade spawn flow and hangar value before you spend time hunting targets." },
        { title: "Spend obvious cash", body: "Convert exposed pocket cash into upgrades so a counter-raid has less value." },
        { title: "Pick a readable target", body: "Prefer a base with visible activity and no obvious lock signal; do not chase late-game players blindly." },
        { title: "Launch once, then observe", body: "Avoid spam attacks because failed raids waste attention and can invite retaliation." },
        { title: "Reinvest immediately", body: "Use any gained cash on spawn flow, capacity, or lock habits before idling." },
        { title: "Avoid scripts", body: "Auto raid, executor, and auto lock pages are unsafe and are not part of this guide." }
      ]
    },
    tables: [
      {
        eyebrow: "Timing",
        heading: "When to Raid and When to Wait",
        intro: "Use this table as a decision guide. It is a gameplay judgment layer, not an official formula.",
        columns: ["Situation", "Decision", "Reason"],
        rows: [
          ["Starter board with weak income", "Wait", "A failed raid costs focus while spawn and cash upgrades still give cleaner gains."],
          ["Stable cash engine and open board", "Try one raid", "You can test raid value without putting your whole run at risk."],
          ["Large unspent cash balance", "Spend or lock first", "Liquid cash is the part most likely to feel painful if retaliation lands."],
          ["Target has visible lock protection", "Skip", "The public loop supports base locking, but exact bypass rules are not verified here."],
          ["You are about to idle", "Do not raid", "Leaving after provoking another player increases risk without giving you time to react."]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Target choice",
        heading: "Target Selection and Attack Order",
        cards: [
          {
            title: "Prefer recoverable fights",
            label: "pending",
            body: [
              "Look for targets where a failed attack will not break your session plan. A readable mid-tier base is usually safer than a rich active player who can answer immediately.",
              "The goal is to test whether raiding helps your current run, not to prove a universal best target list."
            ]
          },
          {
            title: "Protect cash after the strike",
            label: "reported",
            body: [
              "The public game loop reports base locking and cash stealing. That supports a habit of locking, spending, and checking your base after a raid.",
              "Do not write or trust exact stolen percentages unless you have direct in-game logs."
            ]
          },
          {
            title: "Script demand is unsafe",
            label: "unsafe",
            body: [
              "Search results include auto raid and executor intent. This site does not link to those pages, explain them, or provide code.",
              "The legitimate alternative is a manual raid checklist, stronger upgrades, and careful lock timing."
            ]
          }
        ]
      }
    ],
    video: {
      heading: "Raid Context Video",
      title: "Merge a Nuke raid context gameplay video",
      embedUrl: "https://www.youtube-nocookie.com/embed/_fUwK07O4R8",
      originalUrl: "https://www.youtube.com/watch?v=_fUwK07O4R8",
      note: "This SERP video satisfies visual raid intent. It should help players recognize the gameplay context, but it does not verify payout formulas, cooldowns, or the best target order."
    },
    evidence: {
      heading: "Raid Evidence Boundaries",
      items: [
        { claim: "Raid, cash stealing, offline cash, and lock base are public-loop claims.", label: "reported", detail: "They appear in public game descriptions and third-party data pages, but exact raid math is not included." },
        { claim: "Stolen cash percentage is not published here.", label: "pending", detail: "Without direct logs, this page avoids numerical payout claims." },
        { claim: "Executor and auto raid pages are excluded.", label: "unsafe", detail: "They are search-demand signals only and are not valid guide material." },
        { claim: "Target selection is a practical judgment.", label: "pending", detail: "It depends on lobby state, lock status, and your ability to recover." }
      ]
    },
    faqHeading: "Merge a Nuke Raid FAQ",
    faqs: [
      { question: "When should I raid in Merge a Nuke?", answer: "Raid after your spawn flow and cash engine can recover from a miss. Early players usually get cleaner progress from upgrades first.", label: "pending" },
      { question: "Does raiding guarantee stolen cash?", answer: "No verified source reviewed here gives a guaranteed payout. Treat raid rewards as reported gameplay behavior, not a fixed formula.", label: "reported" },
      { question: "Should I lock before or after raiding?", answer: "Build a lock habit before idling and after major cash moves. Exact lock duration and cooldown are not verified on this page.", label: "pending" },
      { question: "What should I do with stolen cash?", answer: "Reinvest it into spawn flow, capacity, or progression upgrades before other players can turn it back into raid value.", label: "pending" },
      { question: "Are auto raid scripts safe?", answer: "No. Executor, auto farm, auto raid, and script pages are unsafe and are not covered by this site.", label: "unsafe" }
    ]
  },
  upgrades: {
    currentSlug: "upgrades",
    title: "Merge a Nuke Upgrades Guide | Spawn, Lock, Raid Order",
    description: "Plan Merge a Nuke upgrades by bottleneck: spawn flow, cash growth, board cleanup, lock habits, raid pressure, and script-safe alternatives.",
    eyebrow: "Upgrades guide",
    h1: "Merge a Nuke Upgrades Guide",
    intro: [
      "The safest Merge a Nuke upgrades path starts with spawn flow and cash growth. Raid pressure and premium convenience can matter later, but they do not replace a stable board and repeatable income loop.",
      "Search results mix legitimate upgrade questions with unsafe auto-upgrade script demand. This page turns that demand into a manual, compliant upgrade plan."
    ],
    status: "Evidence labels: pending for public pass names, Judgment for priority order, unsafe for script and executor topics.",
    callout: {
      title: "Upgrade rule",
      body: "Do not buy upgrades because a page calls them best. Identify the bottleneck first: empty board, clogged board, weak income, raid losses, or low offline returns.",
      tone: "blue"
    },
    checklist: {
      eyebrow: "Quick answer",
      heading: "Best Upgrade Priority",
      items: [
        { title: "Spawn flow", body: "Improve the rate and quality of pieces entering your board before chasing raids." },
        { title: "Cash growth", body: "Prioritize upgrades that make the next purchase easier to reach." },
        { title: "Board cleanup", body: "Keep room for merge chains instead of filling every slot with low-value pieces." },
        { title: "Base lock habit", body: "Treat lock upgrades as protection once your exposed cash becomes meaningful." },
        { title: "Raid pressure", body: "Add raid-related upgrades after your passive income can recover from PvP mistakes." },
        { title: "Premium convenience", body: "Public pass names are only pending signals here, not purchase advice." }
      ]
    },
    tables: [
      {
        eyebrow: "Decision table",
        heading: "Choose by Bottleneck",
        intro: "Use the current problem on your board to decide the next upgrade category.",
        columns: ["Bottleneck", "Upgrade focus", "Why it helps"],
        rows: [
          ["Empty board and slow starts", "Spawn flow", "More usable pieces keeps merge chains active."],
          ["Full weak board", "Board cleanup and capacity", "Extra space prevents low-tier clutter from blocking matches."],
          ["Low cash after logging back in", "Cash growth and offline setup", "Better measured income makes the calculator more useful."],
          ["Frequent losses after raids", "Lock habit and defensive timing", "Protection matters once exposed cash is large."],
          ["Strong income but stalled reset plan", "Rebirth preparation", "A reset route can be better than forcing small upgrades."]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Safety",
        heading: "Script and Auto Upgrade Safety",
        cards: [
          {
            title: "Manual route instead of scripts",
            label: "unsafe",
            body: [
              "Auto upgrade and executor pages are unsafe. They can risk the account and usually hide the real problem: the player has not identified the bottleneck.",
              "Use the table above as the legal alternative."
            ]
          },
          {
            title: "Public pass names are not proof",
            label: "pending",
            body: [
              "Third-party data pages report names such as Auto Merge or Quick Lock Cooldown. This page treats those names as category signals only.",
              "It does not claim any pass is required, best, or worth buying."
            ]
          }
        ]
      }
    ],
    video: {
      heading: "Upgrade Route Video",
      title: "Merge a Nuke upgrade route gameplay video",
      embedUrl: "https://www.youtube-nocookie.com/embed/qYVHWmSC05U",
      originalUrl: "https://www.youtube.com/watch?v=qYVHWmSC05U",
      note: "This video is included because upgrade and beginner route searches show video intent. It is not proof of upgrade costs, pass value, or a universal best order."
    },
    evidence: {
      heading: "Upgrade Evidence Boundaries",
      items: [
        { claim: "Spawn flow first is a strategy recommendation.", label: "pending", detail: "It is based on observed page patterns and gameplay logic, not official upgrade math." },
        { claim: "Exact upgrade costs are not listed.", label: "pending", detail: "Costs and scaling can change, and no official table is used here." },
        { claim: "Script pages are excluded.", label: "unsafe", detail: "No executor instructions, code, or outbound script links are provided." },
        { claim: "Premium pass names are not purchase advice.", label: "pending", detail: "They are public data signals that still need in-game confirmation." }
      ]
    },
    faqHeading: "Merge a Nuke Upgrades FAQ",
    faqs: [
      { question: "Should I upgrade spawn speed or tier first?", answer: "Start with whichever bottleneck is visible. If pieces arrive too slowly, improve speed. If the board fills with weak pieces, focus on quality or cleanup.", label: "pending" },
      { question: "When are lock upgrades worth it?", answer: "Lock habits matter once your exposed cash is large enough that a raid setback would change your next purchase.", label: "reported" },
      { question: "Are raid upgrades early-game priorities?", answer: "Usually no. Raid upgrades are easier to justify after passive income and board flow are stable.", label: "pending" },
      { question: "Do I need Robux passes to progress?", answer: "This page does not treat premium passes as required. Public pass names are pending signals, not purchase recommendations.", label: "pending" },
      { question: "Are auto-upgrade scripts allowed?", answer: "No. This site does not provide script, executor, macro, or auto farm instructions.", label: "unsafe" }
    ]
  },
  rebirth: {
    currentSlug: "rebirth",
    title: "Merge a Nuke Rebirth Guide | Reset Timing and Recovery",
    description: "Use this Merge a Nuke rebirth guide to decide reset timing, run a pre-rebirth checklist, rebuild after reset, and avoid fake multiplier claims.",
    eyebrow: "Rebirth guide",
    h1: "Merge a Nuke Rebirth Guide",
    intro: [
      "Rebirth should happen when the current run slows down and the next run has a clear recovery plan. This page does not publish exact requirements, exact retained items, or guaranteed multipliers.",
      "The practical question is not whether rebirth is powerful. It is whether resetting now will rebuild faster than continuing the current cash engine."
    ],
    status: "Evidence labels: pending for exact reset details, reported for the public progression loop, Judgment for timing decisions.",
    callout: {
      title: "Reset rule",
      body: "Do not confirm rebirth just because the button appears. Spend exposed cash, record your current rate, and know the first upgrades you will buy after the reset.",
      tone: "green"
    },
    checklist: {
      eyebrow: "Before reset",
      heading: "Before You Confirm Rebirth",
      items: [
        { title: "Spend cash that would be wasted", body: "Use obvious purchases before the reset if the game prompt makes clear that cash will not help later." },
        { title: "Merge obvious pairs", body: "Clean the board so you understand what value you are giving up." },
        { title: "Record current income", body: "Write down your observed cash pace so the next run can be compared honestly." },
        { title: "Read the prompt", body: "Do not assume retained items, multiplier size, or reset cost from a third-party page." },
        { title: "Check codes and updates", body: "Use reported code and update pages as signals, not as verified reset boosters." }
      ]
    },
    tables: [
      {
        eyebrow: "Timing",
        heading: "Rebirth Timing Decision Table",
        intro: "This table frames reset timing as a practical decision. It avoids exact multiplier claims.",
        columns: ["Current state", "Decision", "Reason"],
        rows: [
          ["Next upgrade is still close", "Wait", "A few normal upgrades may beat a reset."],
          ["Cash growth has slowed for a full session", "Consider rebirth", "A reset may be better if the next run starts faster."],
          ["No post-reset plan", "Wait", "A blind reset creates early-run drag."],
          ["Friday update or code status is unclear", "Check updates first", "New reports can change the best timing, but they need labels."],
          ["You can rebuild spawn flow quickly", "Rebirth can make sense", "Recovery speed matters more than hype around multipliers."]
        ]
      },
      {
        eyebrow: "Recovery",
        heading: "Post-Rebirth Recovery Route",
        intro: "Use the first 15 minutes to rebuild the cash engine instead of raiding early.",
        columns: ["Minute window", "Action", "Evidence label"],
        rows: [
          ["0 to 2", "Check any available reported codes, then verify the reward in game before relying on it.", "reported"],
          ["2 to 6", "Rebuild spawn flow and keep the board open.", "pending"],
          ["6 to 10", "Spend on cash growth or capacity depending on the visible bottleneck.", "pending"],
          ["10 to 15", "Avoid early raid pressure unless your base is stable and cash is protected.", "Judgment"]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Trust",
        heading: "What This Guide Will Not Invent",
        cards: [
          {
            title: "Exact retained items",
            label: "pending",
            body: ["No reviewed source here is enough to list every retained item as verified. Read the in-game prompt before confirming."]
          },
          {
            title: "Guaranteed multiplier",
            label: "pending",
            body: ["The page avoids fixed multiplier promises because the blueprint did not include direct in-game reset proof."]
          }
        ]
      }
    ],
    video: {
      heading: "Rebirth Context Video",
      title: "Merge a Nuke rebirth context video",
      embedUrl: "https://www.youtube-nocookie.com/embed/KG_lFaKZW1o",
      originalUrl: "https://www.youtube.com/watch?v=KG_lFaKZW1o",
      note: "This video is a visual context block for reset and progression searches. It is not used as proof of rebirth cost, multiplier, or retained items."
    },
    evidence: {
      heading: "Rebirth Evidence Boundaries",
      items: [
        { claim: "Rebirth timing is a judgment call.", label: "pending", detail: "It depends on the current run, next-run route, and confirmed prompt text." },
        { claim: "Exact retained items are not claimed.", label: "pending", detail: "The safest source is the live in-game confirmation prompt." },
        { claim: "Reported codes can help recovery only after verification.", label: "reported", detail: "Codes pages disagree, so this page does not rely on them as guaranteed reset boosts." },
        { claim: "Video is not evidence of multiplier math.", label: "pending", detail: "It supports visual intent only." }
      ]
    },
    faqHeading: "Merge a Nuke Rebirth FAQ",
    faqs: [
      { question: "When is the best time to rebirth?", answer: "When upgrades feel slow, your next run has a clear spawn-flow plan, and the prompt confirms the reset tradeoff you are willing to accept.", label: "pending" },
      { question: "What do I keep after rebirth?", answer: "This page does not claim exact retained items. Read the live prompt and treat third-party lists as pending unless tested.", label: "pending" },
      { question: "Should I raid before rebirth?", answer: "Only if your base is stable and you can spend or protect the result. A risky raid right before reset can waste time.", label: "pending" },
      { question: "Do codes help after rebirth?", answer: "They can be useful if they work in your session, but this site currently has 0 codes verified by direct in-game redemption.", label: "reported" }
    ]
  },
  calculator: {
    currentSlug: "calculator",
    title: "Merge a Nuke Calculator | Offline Cash Planner",
    description: "Use the Merge a Nuke calculator as a Roblox offline cash planner with player-input estimates, privacy-safe local math, and no hidden official formula claims.",
    eyebrow: "Calculator",
    h1: "Merge a Nuke Calculator",
    intro: [
      "This Merge a Nuke calculator is a Roblox offline cash planner. It is not a real-world nuclear simulator, not a VFX tool, and not an official hidden formula table.",
      "Enter your own cash-per-minute, away time, and target upgrade cost. The result is an estimated planning number that helps decide whether to wait, upgrade, or log back in sooner."
    ],
    status: "Evidence labels: verified for the local browser tool behavior, estimated for every calculation result, pending for hidden game formulas.",
    callout: {
      title: "Calculator rule",
      body: "The tool only multiplies numbers you enter. It does not read your Roblox account, store private data, or claim an official cash-per-second formula.",
      tone: "blue"
    },
    tables: [
      {
        eyebrow: "How to use",
        heading: "How to Use the Calculator Safely",
        intro: "A calculator is useful only when the inputs come from your current session.",
        columns: ["Step", "Action", "Why it matters"],
        rows: [
          ["1", "Record your current cash per minute from the game screen.", "The site does not invent a hidden rate."],
          ["2", "Enter the minutes you expect to be offline.", "Away time controls the estimate."],
          ["3", "Enter your next upgrade target.", "The result shows whether the target might be reachable."],
          ["4", "Check again after updates or rebirth.", "Rates can change when your board or game version changes."],
          ["5", "Treat raid losses as outside the formula.", "PvP events can make the estimate too optimistic."]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Trust",
        heading: "No Hidden Official Formula",
        cards: [
          {
            title: "Player-input estimate",
            label: "estimated",
            body: [
              "The formula is intentionally simple: cash per minute multiplied by offline minutes, then compared with target cost.",
              "If the game changes rates, the safe fix is to update your input, not to trust an old static table."
            ]
          },
          {
            title: "Privacy-safe local tool",
            label: "verified",
            body: [
              "The calculator runs in the browser. It does not ask for Roblox login, store account identifiers, or send your numbers to a database.",
              "That makes the tool useful for quick planning without account risk."
            ]
          },
          {
            title: "Not a raid guarantee",
            label: "pending",
            body: [
              "The estimate assumes the input rate continues uninterrupted. If a raid or update changes your session, the estimate needs to be refreshed."
            ]
          }
        ]
      }
    ],
    video: {
      heading: "Visual Context, Not Formula Proof",
      title: "Merge a Nuke calculator visual context video",
      embedUrl: "https://www.youtube-nocookie.com/embed/G3isH1-NeXw",
      originalUrl: "https://www.youtube.com/watch?v=G3isH1-NeXw",
      note: "This video reflects player interest in larger nukes and progression goals. It does not prove the calculator formula or any cash-per-minute value."
    },
    evidence: {
      heading: "Calculator Evidence Boundaries",
      items: [
        { claim: "The tool behavior is visible on this page.", label: "verified", detail: "Inputs and output are client-side and can be checked in the browser." },
        { claim: "Every result is an estimate.", label: "estimated", detail: "Results depend entirely on the player's entered numbers." },
        { claim: "No official cash formula is claimed.", label: "pending", detail: "The public sources reviewed do not publish a hidden rate table." },
        { claim: "Real nuclear blast simulations are irrelevant.", label: "reported", detail: "The target intent is Roblox progression planning." }
      ]
    },
    faqHeading: "Merge a Nuke Calculator FAQ",
    faqs: [
      { question: "Is this an official Merge a Nuke calculator?", answer: "No. It is an independent planning tool that uses the numbers you enter.", label: "estimated" },
      { question: "Does the calculator store my Roblox data?", answer: "No. The current tool works in the browser and does not ask for a login.", label: "verified" },
      { question: "Why did my real offline cash differ?", answer: "Your input rate may have changed, a raid may have affected progress, or the game may have updated.", label: "estimated" },
      { question: "Can this replace in-game testing?", answer: "No. Use it as a planning estimate, then compare the result with your next session.", label: "estimated" }
    ]
  },
  progression: {
    currentSlug: "progression",
    title: "Merge a Nuke Progression Guide | Cash, Upgrades, Raids",
    description: "Follow a Merge a Nuke progression guide built around codes, clean merges, cash upgrades, lock habits, selective raids, and rebirth timing.",
    eyebrow: "Progression",
    h1: "Merge a Nuke Progression Guide",
    intro: [
      "A clean Merge a Nuke progression route is simple: use any verified or reported free value carefully, keep merge chains moving, spend into the cash engine, protect exposed cash, raid selectively, then rebirth with a recovery plan.",
      "This page is a route guide, not an exact speedrun formula. It avoids fixed cash-per-second, strongest-nuke requirements, and guaranteed completion times."
    ],
    status: "Evidence labels: reported for public loop claims, estimated for calculator planning, pending for exact route math.",
    callout: {
      title: "Progression rule",
      body: "Progression improves when every action increases the next purchase speed or protects the value already earned. If an action does neither, delay it.",
      tone: "green"
    },
    checklist: {
      eyebrow: "Snapshot",
      heading: "Progression Snapshot",
      items: [
        { title: "First move", body: "Check reported codes and update status, but do not rely on unverified rewards." },
        { title: "Main engine", body: "Keep the board clean enough to merge without stalling." },
        { title: "Defense rule", body: "Lock or spend before idling when exposed cash is meaningful." },
        { title: "Raid rule", body: "Raid only after your cash engine can recover from failed pressure." }
      ]
    },
    tables: [
      {
        eyebrow: "Route",
        heading: "Progression Phases",
        intro: "Use phases instead of a fake exact speedrun timer.",
        columns: ["Phase", "Goal", "Next link"],
        rows: [
          ["Early setup", "Clean merges and basic cash growth.", "/beginner-guide/"],
          ["First wall", "Identify whether spawn flow, capacity, or cash growth is blocking progress.", "/upgrades/"],
          ["Mid game", "Use offline estimates and lock habits to protect longer windows.", "/offline-cash/"],
          ["Raid pressure", "Try selective raids only when recovery is easy.", "/raid/"],
          ["Reset planning", "Rebirth when recovery beats staying in the current run.", "/rebirth/"]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Cash engine",
        heading: "Cash Engine and Spending Rules",
        cards: [
          {
            title: "Spend when it increases the next purchase speed",
            label: "estimated",
            body: [
              "If an upgrade makes the next target faster to reach, it supports progression. If it only looks exciting, delay it until the engine is stable."
            ]
          },
          {
            title: "Codes are boosts, not a route",
            label: "reported",
            body: [
              "Third-party code reports can help, but this site currently has 0 in-game verified active codes. Do not build a route around unverified rewards."
            ]
          },
          {
            title: "Avoid first-run max-tier claims",
            label: "pending",
            body: [
              "The blueprint found no direct official requirement table for strongest nuke targets. Treat end-goal videos as motivation, not route proof."
            ]
          }
        ]
      }
    ],
    video: {
      heading: "Strongest Nuke Goal Video",
      title: "Merge a Nuke strongest nuke goal video",
      embedUrl: "https://www.youtube-nocookie.com/embed/LjIzRhWt124",
      originalUrl: "https://www.youtube.com/watch?v=LjIzRhWt124",
      note: "This video supports end-goal search intent. It does not prove the fastest route, exact requirements, or a guaranteed strongest-nuke path."
    },
    evidence: {
      heading: "Progression Evidence Boundaries",
      items: [
        { claim: "The public loop includes merging, cash, raids, lock, and updates.", label: "reported", detail: "That is enough to structure a guide, not enough to publish exact formulas." },
        { claim: "Calculator planning is input-based.", label: "estimated", detail: "Offline estimates depend on player-entered rates." },
        { claim: "Strongest nuke requirements are not verified.", label: "pending", detail: "This page avoids exact end-goal requirements." },
        { claim: "Unsafe automation is excluded.", label: "unsafe", detail: "Progression advice does not include scripts, macros, or auto farm tools." }
      ]
    },
    faqHeading: "Progression FAQ",
    faqs: [
      { question: "What is the fastest safe progression route?", answer: "Build spawn flow, keep the board clean, spend into cash growth, protect offline windows, raid selectively, then rebirth with a recovery plan.", label: "pending" },
      { question: "Should I save cash or spend it?", answer: "Spend when the purchase makes the next target easier. Save only when you are clearly waiting for a specific upgrade.", label: "estimated" },
      { question: "When should I start raiding?", answer: "After the cash engine is stable enough that a failed raid does not derail the session.", label: "pending" },
      { question: "How important is offline cash?", answer: "It matters for away windows, but exact returns must be estimated from your own current rate.", label: "estimated" },
      { question: "Can I follow a strongest-nuke video exactly?", answer: "Use it as visual context only. A video title does not verify the best route for your current board.", label: "pending" }
    ]
  },
  offlineCash: {
    currentSlug: "offline-cash",
    title: "Merge a Nuke Offline Cash Guide | Lock and Reinvest",
    description: "Prepare Merge a Nuke offline cash runs with a pre-logout checklist, return routine, calculator bridge, lock habit, and conservative evidence labels.",
    eyebrow: "Offline cash",
    h1: "Merge a Nuke Offline Cash Guide",
    intro: [
      "Offline cash is useful only when your board, measured rate, and lock habit are aligned. The public game description reports offline cash, but exact rate, cap, and raid loss formulas are not verified here.",
      "Use this page as a repeatable logout and return routine. Measure your own numbers, estimate with the calculator, then adjust after updates or rebirth."
    ],
    status: "Evidence labels: reported for offline cash existence, estimated for player-input math, pending for exact cap or rate.",
    callout: {
      title: "Offline rule",
      body: "If a page claims an official offline formula or guaranteed cap without direct proof, treat it as pending. Your current measured rate is safer than a stale table.",
      tone: "green"
    },
    checklist: {
      eyebrow: "Pre-logout",
      heading: "Before You Log Out",
      items: [
        { title: "Merge obvious duplicates", body: "Do not leave easy matches untouched if they would improve your active value." },
        { title: "Spend obvious cash", body: "Convert liquid cash into progression where possible." },
        { title: "Set best active value", body: "Keep your most useful current pieces contributing before you step away." },
        { title: "Lock if needed", body: "Use the lock habit when exposed cash makes raid loss painful." },
        { title: "Record the rate", body: "Write down current cash per minute so the calculator uses your real session state." }
      ]
    },
    tables: [
      {
        eyebrow: "Return route",
        heading: "Return and Reinvest Routine",
        intro: "Treat the first minute back as a verification window.",
        columns: ["Step", "Action", "Reason"],
        rows: [
          ["Collect", "Check actual cash against your estimate.", "This tells you whether the old rate is still useful."],
          ["Compare", "If the estimate missed badly, refresh the cash-per-minute input.", "The calculator depends on live inputs."],
          ["Upgrade", "Spend into spawn flow, capacity, or cash growth.", "Liquid cash becomes less risky when converted into progress."],
          ["Merge", "Clean the board before opening a new idle window.", "A clean board makes the next estimate more reliable."],
          ["Check updates", "Look for Friday update signals before trusting old rates.", "Public updates can change assumptions."]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Trust",
        heading: "What Is Confirmed and What Is Not",
        cards: [
          {
            title: "Offline cash exists as a public-loop claim",
            label: "reported",
            body: ["The public game description reports offline earning. That supports an offline guide and calculator bridge."]
          },
          {
            title: "Exact rate and cap are not verified",
            label: "pending",
            body: ["This page does not publish an official offline formula, cap, or raid loss calculation."]
          },
          {
            title: "Calculator bridge uses your input",
            label: "estimated",
            body: ["Use the calculator after recording your current rate. Replace the input when the board, rebirth state, or update status changes."]
          }
        ]
      }
    ],
    video: {
      heading: "Offline Setup Visual Reference",
      title: "Merge a Nuke offline setup visual reference",
      embedUrl: "https://www.youtube-nocookie.com/embed/KG_lFaKZW1o",
      originalUrl: "https://www.youtube.com/watch?v=KG_lFaKZW1o",
      note: "This video gives visual context for the game loop. It does not prove an offline cap, offline rate, or raid loss formula."
    },
    evidence: {
      heading: "Offline Cash Evidence Boundaries",
      items: [
        { claim: "Offline cash is publicly reported.", label: "reported", detail: "The guide can discuss the mechanic at a high level." },
        { claim: "Exact offline formula is not published here.", label: "pending", detail: "Use measured player input for estimates." },
        { claim: "Raid loss risk is a practical concern.", label: "pending", detail: "The page avoids exact loss percentages." },
        { claim: "Update changes require rechecking.", label: "pending", detail: "Friday update signals do not equal confirmed formula changes." }
      ]
    },
    faqHeading: "Offline Cash FAQ",
    faqs: [
      { question: "How is Merge a Nuke offline cash calculated?", answer: "This page does not claim an official formula. Use your measured cash-per-minute and away time as an estimate.", label: "estimated" },
      { question: "Do spawners work offline?", answer: "The exact offline behavior is not verified here. Prepare by cleaning the board and measuring the result next session.", label: "pending" },
      { question: "Can raids affect offline progress?", answer: "The public loop includes raiding and locking, so protect exposed cash. Exact loss math is not verified.", label: "reported" },
      { question: "Why were my offline gains low?", answer: "Your measured rate may have changed, your board may have been weak, or a session event may have changed assumptions.", label: "estimated" },
      { question: "Is there an offline cap?", answer: "No cap is published as verified on this page. Treat cap claims as pending until tested.", label: "pending" }
    ]
  },
  codes: {
    currentSlug: "codes",
    title: "Merge a Nuke Codes | Reported Rewards and Redeem Steps",
    description: "Check Merge a Nuke codes with 0 verified active codes by this site, reported rewards, source conflicts, redeem steps, and conservative status labels.",
    eyebrow: "Codes",
    h1: "Merge a Nuke Codes",
    intro: [
      "Current site status: 0 verified active codes by this site. BOOM is official-page-reported, while UPDATE2 and ATOMIC are community-reported or disputed depending on the source.",
      "Codes are high-competition SEO pages, so trust discipline matters more than speed. This page separates reported status from direct in-game redemption proof."
    ],
    status: "Evidence labels: official-page-reported for BOOM mention, reported for multi-source code claims, disputed for ATOMIC, pending until in-game redemption.",
    callout: {
      title: "Code rule",
      body: "Do not treat a third-party code table or YouTube title as proof that a code is active. Copying a reported code is allowed, but the status remains unverified until tested.",
      tone: "red"
    },
    tables: [
      {
        eyebrow: "Conflicts",
        heading: "Source Conflict Ledger",
        intro: "Use this table to understand why the page avoids the phrase verified active codes.",
        columns: ["Code", "Current label", "Why"],
        rows: [
          ["BOOM", "official-page-reported", "The public Roblox page reports the code text, but this site has not completed redemption proof."],
          ["UPDATE2", "reported", "Multiple third-party trackers report it, but direct in-game proof is not recorded here."],
          ["ATOMIC", "disputed", "Some trackers list it while others omit or describe it differently."],
          ["Expired list", "reported", "Several trackers report no expired codes, but code status can change quickly."]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Redeem path",
        heading: "How to Redeem Codes",
        cards: [
          {
            title: "Reported redemption flow",
            label: "reported",
            body: [
              "Third-party guides commonly describe launching the game, opening Store, scrolling to the code box, pasting the code, and pressing Redeem.",
              "After redemption, compare your before-and-after reward state instead of assuming the code worked."
            ]
          },
          {
            title: "Failure recovery",
            label: "pending",
            body: [
              "If a code fails, check capitalization, accidental spaces, server lag, and whether the code has expired since the tracker update.",
              "Do not retry through scripts or automation."
            ]
          }
        ]
      }
    ],
    video: {
      heading: "Redeem Flow Video",
      title: "Merge a Nuke redeem flow video",
      embedUrl: "https://www.youtube-nocookie.com/embed/CYTgw17tz88",
      originalUrl: "https://www.youtube.com/watch?v=CYTgw17tz88",
      note: "This video is embedded to satisfy visual redeem-flow intent. It does not prove any code is currently active."
    },
    evidence: {
      heading: "Codes Evidence Boundaries",
      items: [
        { claim: "0 verified active codes by this site.", label: "pending", detail: "No direct in-game redemption proof is recorded in this repo." },
        { claim: "BOOM is official-page-reported.", label: "reported", detail: "The public Roblox description reports the code text." },
        { claim: "UPDATE2 is community-reported.", label: "reported", detail: "Multiple third-party trackers report it, but this site has not verified redemption." },
        { claim: "ATOMIC is disputed.", label: "disputed", detail: "The SERP blueprint records source disagreement." }
      ]
    },
    faqHeading: "Merge a Nuke Codes FAQ",
    faqs: [
      { question: "Are there verified active Merge a Nuke codes here?", answer: "No. This site currently lists 0 codes as verified active by direct in-game redemption.", label: "pending" },
      { question: "Is ATOMIC active?", answer: "ATOMIC is disputed in the reviewed sources, so this page does not promote it as verified active.", label: "disputed" },
      { question: "Where do new codes come from?", answer: "Codes may appear in official game text, developer channels, or third-party trackers. This page labels each source type separately.", label: "reported" },
      { question: "Why did a code fail?", answer: "It may be expired, mistyped, blocked by spacing, or simply not active despite being reported elsewhere.", label: "pending" },
      { question: "Should I trust YouTube code videos?", answer: "Use them for visual flow only. A video title is not redemption proof.", label: "pending" }
    ]
  },
  wiki: {
    currentSlug: "wiki",
    title: "Merge a Nuke Wiki | Source-Backed Roblox Guide Hub",
    description: "Use this Merge a Nuke wiki as an independent source-backed hub for codes, guides, progression, raids, updates, and fields we refuse to invent.",
    eyebrow: "Wiki",
    h1: "Merge a Nuke Wiki",
    intro: [
      "This Merge a Nuke wiki is an independent, source-backed guide hub. It is not an official wiki, not an official Trello, and not a complete database of hidden stats.",
      "The purpose is to route players to trustworthy pages while marking missing fields clearly: exact damage, cash per second, raid payout, rebirth multiplier, and lock duration remain pending unless verified."
    ],
    status: "Evidence labels: verified for this site's own routes, reported for public game facts, pending for missing stat fields.",
    callout: {
      title: "Wiki rule",
      body: "A useful wiki does not need fake completeness. It should show what is known, what is reported, and what is still missing.",
      tone: "blue"
    },
    tables: [
      {
        eyebrow: "Sources",
        heading: "Reviewed Source Map",
        intro: "Every source type has a different evidence ceiling.",
        columns: ["Source", "Use", "Evidence ceiling"],
        rows: [
          ["Roblox game page", "Public game description, creator, update signals, BOOM mention.", "reported"],
          ["Rolimon's data page", "Third-party public listing and pass-name signals.", "pending"],
          ["Fandom and fan wikis", "Topic coverage and missing-field discovery.", "reported"],
          ["Code trackers", "Reported code status and conflicts.", "reported or disputed"],
          ["YouTube videos", "Visual gameplay intent.", "youtube_embed only"]
        ]
      },
      {
        eyebrow: "Route map",
        heading: "Wiki Route Map",
        intro: "Use the hub to move into the page that matches the task.",
        columns: ["Need", "Route", "Evidence policy"],
        rows: [
          ["Reported code checks", "/codes/", "No verified active claims without proof."],
          ["Main progression route", "/progression/", "No exact speedrun promises."],
          ["Raid decisions", "/raid/", "No stolen percentage claims."],
          ["Upgrade priority", "/upgrades/", "Bottleneck-based guidance."],
          ["Tier priorities", "/tier-list/", "Priority tiers, not official damage tables."],
          ["Update status", "/updates/", "Reviewed timeline with source labels."]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Missing fields",
        heading: "Do Not Invent These Fields",
        cards: [
          { title: "Exact damage", label: "pending", body: ["No verified official table is recorded here for damage or blast values."] },
          { title: "Cash per second", label: "pending", body: ["Use calculator estimates and player inputs instead of fake static formulas."] },
          { title: "Raid payout", label: "pending", body: ["The guide discusses raid decisions without publishing stolen percentages."] },
          { title: "Rebirth multiplier", label: "pending", body: ["Reset details belong to the live prompt or direct testing, not guesses."] }
        ]
      }
    ],
    video: {
      heading: "Gameplay Overview Video",
      title: "Merge a Nuke gameplay overview video",
      embedUrl: "https://www.youtube-nocookie.com/embed/qYVHWmSC05U",
      originalUrl: "https://www.youtube.com/watch?v=qYVHWmSC05U",
      note: "This video gives visual gameplay context for wiki visitors. It does not verify wiki facts."
    },
    evidence: {
      heading: "Wiki Evidence Boundaries",
      items: [
        { claim: "This site controls its own route map.", label: "verified", detail: "The listed internal routes exist in the current project." },
        { claim: "Public Roblox facts are reported, not expanded into math.", label: "reported", detail: "Public descriptions support broad mechanisms only." },
        { claim: "Missing stats stay missing.", label: "pending", detail: "A blank field is better than invented data." },
        { claim: "Corrections need evidence.", label: "pending", detail: "Screenshots, direct tests, or official posts are required before labels improve." }
      ]
    },
    faqHeading: "Merge a Nuke Wiki FAQ",
    faqs: [
      { question: "Is this the official Merge a Nuke wiki?", answer: "No. It is an independent guide hub that labels sources and avoids claiming official status.", label: "verified" },
      { question: "Why are some stats missing?", answer: "Because exact values are not verified here. Missing data is left pending instead of invented.", label: "pending" },
      { question: "Where should I verify codes?", answer: "Use the codes page and the live game. This wiki does not upgrade reported codes to verified active.", label: "reported" },
      { question: "How can I submit corrections?", answer: "Send source-backed corrections through the contact page or the listed editorial email.", label: "pending" }
    ]
  },
  tierList: {
    currentSlug: "tier-list",
    title: "Merge a Nuke Tier List | Progression Priorities",
    description: "Read a Merge a Nuke tier list focused on progression priorities, ranking criteria, source notes, pending exact stats, and update-sensitive labels.",
    eyebrow: "Tier list",
    h1: "Merge a Nuke Tier List",
    intro: [
      "This Merge a Nuke tier list is a progression priority list, not an official damage table. It ranks what usually deserves attention first: cash engine, base lock habits, reported code boosts, merge chain efficiency, raids, and unverified bomb claims.",
      "Exact damage, cash per second, and official tier names are not published as verified here."
    ],
    status: "Evidence labels: pending for exact stats, estimated for ranking criteria, reported for community priority signals.",
    callout: {
      title: "Tier rule",
      body: "If a tier list looks complete but gives no source labels, it can be worse than no tier list. This page ranks priorities and labels uncertainty.",
      tone: "green"
    },
    tables: [
      {
        eyebrow: "Priority tiers",
        heading: "Progression Priority Tiers",
        intro: "These are planning tiers, not official item tiers.",
        columns: ["Tier", "Priority group", "Caveat"],
        rows: [
          ["S", "Cash engine upgrades, base lock habit, directly verified or official-page-reported free value.", "Not a bomb damage rank."],
          ["A", "Clean merge chain, board capacity, measured offline routine.", "Depends on current board state."],
          ["B", "Selective raids after recovery is stable.", "No payout percentage is verified here."],
          ["C", "Unverified bomb-name claims and unsourced exact stats.", "Do not chase these without evidence."]
        ]
      },
      {
        eyebrow: "Criteria",
        heading: "Ranking Criteria",
        intro: "The tier list uses criteria that a player can reason about without fake stat tables.",
        columns: ["Criterion", "Why it matters", "Evidence label"],
        rows: [
          ["Cash growth", "Makes the next purchase easier.", "estimated"],
          ["Raid value", "Can help only after recovery is stable.", "pending"],
          ["Offline protection", "Protects long away windows.", "reported"],
          ["Merge effort", "Reduces manual bottlenecks.", "pending"],
          ["Evidence confidence", "Stops weak claims from looking official.", "verified for labels"]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Trust",
        heading: "Why Exact Nuke Stats Are Pending",
        cards: [
          { title: "No official table used", label: "pending", body: ["This page does not have a verified official nuke stat table."] },
          { title: "Videos are not stat proof", label: "pending", body: ["A gameplay video can show progression visuals but cannot verify all numbers."] },
          { title: "Updates can change priorities", label: "reported", body: ["Friday update signals mean old tier claims should be rechecked."] }
        ]
      }
    ],
    video: {
      heading: "Tier Visual Reference",
      title: "Merge a Nuke tier visual reference video",
      embedUrl: "https://www.youtube-nocookie.com/embed/CfIdoE-D5R8",
      originalUrl: "https://www.youtube.com/watch?v=CfIdoE-D5R8",
      note: "This video is included for visual progression context. It does not prove tier ranking, exact damage, or cash-per-second values."
    },
    evidence: {
      heading: "Tier List Evidence Boundaries",
      items: [
        { claim: "This is a priority tier list.", label: "estimated", detail: "It ranks decisions, not official bomb stats." },
        { claim: "Exact stats are pending.", label: "pending", detail: "No verified table is recorded in this project." },
        { claim: "Codes can appear in priority tiers only with labels.", label: "reported", detail: "Reported code value is not active-code proof." },
        { claim: "Unsafe shortcuts are excluded.", label: "unsafe", detail: "No script, exploit, or auto farm tier is listed." }
      ]
    },
    faqHeading: "Tier List FAQ",
    faqs: [
      { question: "What is the highest nuke in Merge a Nuke?", answer: "This page does not publish a verified highest-nuke stat. It focuses on progression priorities until exact data is confirmed.", label: "pending" },
      { question: "Why not list exact damage?", answer: "Because the reviewed blueprint did not include direct official or in-game proof for exact damage values.", label: "pending" },
      { question: "Do codes belong in a tier list?", answer: "Only as reported progression boosts with labels. They are not verified active by this site.", label: "reported" },
      { question: "How often should priorities change?", answer: "Recheck after updates, new code reports, or major balance changes. Old priorities can become stale.", label: "reported" }
    ]
  },
  updates: {
    currentSlug: "updates",
    title: "Merge a Nuke Updates | Friday Patch and Code Watch",
    description: "Track Merge a Nuke updates with Friday update signals, code changes, source hierarchy, pending patch notes, and video context without fake confirmations.",
    eyebrow: "Updates",
    h1: "Merge a Nuke Updates",
    intro: [
      "This Merge a Nuke updates page tracks Friday update signals, code changes, and pending patch notes with labels. The public Roblox description reports Friday updates, but that does not prove every Friday has a detailed patch note.",
      "Use this page to decide what to check next, not to treat YouTube titles or code trackers as official changelogs."
    ],
    status: "Evidence labels: reported for Friday update signal, pending for patch-note details, disputed when sources conflict.",
    callout: {
      title: "Update rule",
      body: "Do not publish unofficial patch notes as confirmed. A reviewed timeline is stronger than a fake complete changelog.",
      tone: "red"
    },
    checklist: {
      eyebrow: "Friday check",
      heading: "Friday Update Check",
      items: [
        { title: "Check the Roblox description", body: "Look for changed text, code mentions, or update wording." },
        { title: "Check code trackers", body: "Record reported changes without upgrading them to verified." },
        { title: "Check developer channels", body: "Use official channels when available; keep weak sources pending." },
        { title: "Check in-game UI", body: "Direct session evidence can improve labels when recorded." },
        { title: "Check update videos", body: "Use them as visual context, not patch-note proof." }
      ]
    },
    tables: [
      {
        eyebrow: "Timeline",
        heading: "Reviewed Timeline",
        intro: "This timeline keeps the latest local source check separate from unverified patch details.",
        columns: ["Date", "Signal", "Status"],
        rows: [
          ["2026-06-16", "Roblox listing and third-party coverage show Friday update and code signals.", "reported"],
          ["2026-06-16", "No official patch-note body is stored in this repo.", "pending"],
          ["Next Friday window", "Recheck Roblox description, code pages, group channels, and in-game UI.", "pending"]
        ]
      },
      {
        eyebrow: "Sources",
        heading: "Allowed Update Sources",
        intro: "Different source types can support different claims.",
        columns: ["Source", "Can support", "Cannot support alone"],
        rows: [
          ["Official Roblox listing", "Public description and visible code text.", "Detailed hidden balance formulas."],
          ["Developer group or official channel", "Patch wording when accessible.", "Unseen in-game outcomes."],
          ["Direct in-game test", "Observed UI, code redemption, or mechanic change.", "Permanent future behavior."],
          ["Third-party trackers", "Reported code or update signals.", "Verified active status."],
          ["YouTube videos", "Visual update interest.", "Confirmed patch notes."]
        ]
      }
    ],
    cardSections: [
      {
        eyebrow: "Code bridge",
        heading: "Code Watch Bridge",
        cards: [
          {
            title: "Codes often move with updates",
            label: "reported",
            body: ["Track code pages after Friday update signals, but keep every code label separate from direct redemption proof."]
          },
          {
            title: "No guaranteed weekly content",
            label: "pending",
            body: ["A Friday update signal does not mean every week has a public changelog or new indexable content."]
          }
        ]
      }
    ],
    video: {
      heading: "Update Showcase Video",
      title: "Merge a Nuke update showcase video",
      embedUrl: "https://www.youtube-nocookie.com/embed/CfIdoE-D5R8",
      originalUrl: "https://www.youtube.com/watch?v=CfIdoE-D5R8",
      note: "This video gives visual update context. It does not prove patch notes, balance changes, or code status."
    },
    evidence: {
      heading: "Updates Evidence Boundaries",
      items: [
        { claim: "Friday update wording is a public signal.", label: "reported", detail: "It can justify a tracking page, not a guaranteed weekly changelog." },
        { claim: "Patch-note details are pending.", label: "pending", detail: "No official patch-note body is stored here for the latest check." },
        { claim: "Code tracker claims need separation.", label: "reported", detail: "They are useful signals, not proof of active redemption." },
        { claim: "YouTube update videos are visual context only.", label: "pending", detail: "They do not confirm developer patch notes." }
      ]
    },
    faqHeading: "Updates FAQ",
    faqs: [
      { question: "When do Merge a Nuke updates release?", answer: "The public description reports Friday updates. This page treats that as a reported signal, not a guarantee of a new changelog every Friday.", label: "reported" },
      { question: "Do updates reset progress?", answer: "No reviewed source here verifies automatic reset behavior. Treat reset claims as pending unless an official note or direct test confirms them.", label: "pending" },
      { question: "Do new codes appear after updates?", answer: "They can be reported around updates, but this site keeps code status separate until direct redemption proof exists.", label: "reported" },
      { question: "Are YouTube update videos official patch notes?", answer: "No. They are visual context and search-demand evidence only.", label: "pending" }
    ]
  }
} satisfies Record<string, SerpGuidePageData>;
