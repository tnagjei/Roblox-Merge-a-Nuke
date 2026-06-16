import { siteConfig } from "../data/config";

export const localeLabels = {
  en: "English",
  th: "Thai",
  fil: "Filipino",
  id: "Indonesian"
};

export const defaultNavItems = [
  { slug: "", label: "Home", href: "/" },
  { slug: "calculator", label: "Calculator", href: "/calculator/" },
  { slug: "codes", label: "Codes", href: "/codes/" },
  { slug: "tier-list", label: "Tier List", href: "/tier-list/" },
  { slug: "beginner-guide", label: "Beginner Guide", href: "/beginner-guide/" },
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
