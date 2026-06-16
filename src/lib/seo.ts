// input: siteConfig configurations
// output: absoluteAssetUrl and jsonLd SEO helper tools
// pos: src/lib/seo.ts (更新规则：文件变更需同步本注释与所属目录 README)

import { siteConfig } from "../data/config";

export function absoluteAssetUrl(value: string) {
  if (value.startsWith("https://")) return value;
  return `${siteConfig.siteDomain.replace(/\/+$/g, "")}${value.startsWith("/") ? value : `/${value}`}`;
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
