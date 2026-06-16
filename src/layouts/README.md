# src/layouts
- 用途：全站页面通用布局模版。
- 关键入口：[SiteLayout.astro](file:///Users/tangjei/Documents/建站/游戏站/Roblox-Merge-a-Nuke/src/layouts/SiteLayout.astro)
- 边界/依赖：被 src/pages 内的所有页面文件引入，同时加载 src/styles/global.css 并依赖 src/data/config.ts 的头部 SEO 字段。
> 一旦本目录内容变化，请更新本文件

## Files
- SiteLayout.astro：全站 HTML 包裹层，内置 Canonical/noindex 机制及 OpenGraph 等元数据输出。
