// input: siteConfig data configurations, current path name
// output: getAvailableLocales, getMainNavItems navigation helper functions
// pos: src/lib/navigation.ts (更新规则：文件变更需同步本注释与所属目录 README)

import { siteConfig } from "../data/config";

export const localeLabels = {
  en: "English",
  th: "Thai",
  fil: "Filipino",
  id: "Indonesian"
};

export const defaultNavItems = [
  { slug: "", label: "Home", href: "/" },
  { slug: "codes", label: "Codes", href: "/codes/" },
  { slug: "guide", label: "Beginner Guide", href: "/guide/" },
  { slug: "progression", label: "Progression", href: "/progression/" },
  { slug: "raid", label: "Raid Guide", href: "/raid/" },
  { slug: "tier-list", label: "Tier List", href: "/tier-list/" },
  { slug: "upgrades", label: "Upgrades", href: "/upgrades/" },
  { slug: "offline-cash", label: "Offline Cash", href: "/offline-cash/" },
  { slug: "rebirth", label: "Rebirth", href: "/rebirth/" },
  { slug: "calculator", label: "Calculator", href: "/calculator/" },
  { slug: "updates", label: "Updates", href: "/updates/" },
  { slug: "wiki", label: "Wiki", href: "/wiki/" }
];

export function getMainNavItems() {
  const completed = new Set(siteConfig.completedCoreSlugs);
  return defaultNavItems.filter((item) => item.slug === "" || completed.has(item.slug));
}

export function getAvailableLocales() {
  return siteConfig.availableLocales.map((locale) => ({
    locale,
    label: localeLabels[locale] || locale,
    href: locale === siteConfig.defaultLocale ? "/" : `/${locale}/`,
    completed: siteConfig.completedLocales.includes(locale)
  }));
}
