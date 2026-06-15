# Merge a Nuke Guide Setup

## Site Contract

- Site name: Merge a Nuke Guide
- Game name: Merge a Nuke
- Canonical domain: https://mergeanuke.online
- Roblox URL: https://www.roblox.com/games/128784467030899/Merge-a-Nuke
- Contact email: tangjei414@gmail.com
- Launch mode: wiki-hub
- Default locale: en
- Completed locales: en

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Runtime target: Astro static output
- HUMAN_DECISION_REQUIRED: Add `mergeanuke.online` as the Cloudflare Pages custom apex domain. 人工确认：在 Cloudflare Pages 里绑定裸域名。
- HUMAN_DECISION_REQUIRED: Configure Bulk Redirects so `https://www.mergeanuke.online/*` returns 301 to `https://mergeanuke.online/*`. 人工确认：在 Cloudflare Bulk Redirects 里配置 www 永久跳转到裸域名。

## IndexNow

- INDEXNOW_KEY: `8b580bcc-17ba-4527-b795-dcf465fc5208`
- HUMAN_DECISION_REQUIRED: Copy `INDEXNOW_KEY` into Cloudflare Pages environment variables before production deployment. 人工确认：部署前把 `INDEXNOW_KEY` 复制到 Cloudflare Pages 环境变量。
- The build writes the IndexNow key file only when `INDEXNOW_KEY` exists in the build environment.
- `npm run indexnow:submit` submits only public indexable paths.

## Public Paths

- /
- /codes/
- /tier-list/
- /classes/
- /weapons/
- /value-list/
- /about/
- /contact/
- /editorial-policy/

## Noindex Paths

- /privacy/
- /terms/

## Blocked Paths

- /scripts/
- /macros/
- /executor/
- /exploit/
- /guide/
- /updates/

## Evidence Rules

- No active codes are marked verified by default.
- No rewards are invented.
- No tier list is invented.
- No trading values are invented.
- Community sources stay labeled as `community-reported`.
