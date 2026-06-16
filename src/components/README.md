# src/components
- 用途：公共布局与交互组件目录。
- 关键入口：无单一入口，由各 pages 路由按需引入。
- 边界/依赖：被 src/pages 和 src/layouts 下的页面引用。
> 一旦本目录内容变化，请更新本文件

## Files
- Header.astro：顶栏导航条，含品牌标记和多语言列表
- Footer.astro：底栏，显示动态版权和可配置邮箱
- HomeHero.astro：首页巨幕，突出网站特色与 Roblox 入口链接
- CopyButton.astro：点击一键复制礼包兑换码组件
- RelatedGuides.astro：位于各文章底部的相关攻略快速导航组件
- ToolEventTracker.astro：挂机计算器数据输入埋点统计
- TrackedLink.astro：埋点追踪外链
