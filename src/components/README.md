# src/components
- 用途：公共布局与交互组件目录。
- 关键入口：无单一入口，由各 pages 路由按需引入。
- 边界/依赖：被 src/pages 和 src/layouts 下的页面引用。
> 一旦本目录内容变化，请更新本文件

## Files
- Header.astro：顶栏导航条，含品牌标记和多语言列表
- Footer.astro：底栏，显示动态版权和可配置邮箱
- BackToTop.astro：回到顶部悬浮按钮，支持平滑滚动与动态可见性
- HomeHero.astro：首页巨幕，突出网站特色与 Roblox 入口链接
- CopyButton.astro：点击一键复制礼包兑换码组件
- VideoEmbed.astro：隐私增强 YouTube 嵌入组件，统一 nocookie、懒加载和备用链接
- SerpGuidePage.astro：SERP 内页通用渲染组件，输出证据标签、表格、视频和 FAQ
- RelatedGuides.astro：位于各文章底部的相关攻略快速导航组件
- ToolEventTracker.astro：挂机计算器数据输入埋点统计
- TrackedLink.astro：埋点追踪外链
