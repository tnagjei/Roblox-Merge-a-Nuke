# mergeanuke.online 线上抓取检查报告

日期：2026-06-16  
域名：https://mergeanuke.online/  
站点源码：/Users/tangjei/Documents/建站/游戏站/Roblox-Merge-a-Nuke  
任务：确认线上是否可抓取，并做首次抓取前风险检查  

## Counter:

🚨 结论不是“已经上线，所以可以直接提交全站抓取”。  

当前状态是：站点可以被搜索爬虫访问，但全站提交前仍有两个需要处理的问题：

* 首页 description 缺失，中文解释：description 是搜索结果摘要的主要候选文本。
* 本地发布策略与现有路由冲突，中文解释：源码同时生成 `/guide/` 和 `/beginner-guide/`，但发布校验仍把 `/guide/` 视为禁止路径。

## 声明分类

### Verifiable 可验证

| 项目 | 结果 |
|---|---|
| 首页状态 | `HTTP 200`，中文解释：服务器成功返回网页 |
| `http` 到 `https` | 301 跳转正常，中文解释：旧协议会永久跳到安全协议 |
| `www` 到裸域 | 301 跳转正常，中文解释：`www.mergeanuke.online` 会跳到 `mergeanuke.online` |
| `robots.txt` | 允许 `Googlebot`、`Bingbot`、`AdsBot-Google` |
| `sitemap.xml` | 存在，当前线上列出 15 个 URL |
| 首页规范链接 | `https://mergeanuke.online/` |
| 首页索引指令 | `index,follow`，中文解释：允许索引并跟踪链接 |

### Judgment 主观判断

| 判断 | 依据 |
|---|---|
| 可以抓首页 | 首页可访问，规范域名正确，robots 允许 |
| 不建议马上提交全站 sitemap | 首页描述刚修到本地，还未确认已部署；路由策略校验失败 |
| 主要机会词不是 codes | Codes 赛道已有 Pocket Tactics、PCGamesN、Beebom、Destructoid 等强站 |
| 更值得抢内页 | raid、upgrades、rebirth、progression、calculator 直接竞争较弱 |

### Confidence 不等于正确

* 没有 Google Search Console 数据，不能确认 Google 已经索引了多少页面。
* 没有游戏内兑换验证，不能把 `ATOMIC` 标成 verified active，中文解释：已验证可用。
* 公开搜索结果里看到的第三方 codes 信息只能作为 community-reported，中文解释：社区报告，不能当官方事实。

## 线上页面抓取结果

| URL | 标题 | 描述 | 字数估算 | 判断 |
|---|---|---|---:|---|
| `/` | Merge a Nuke Guide | Roblox Simulator Codes and Wiki | 抓取时为空 | 2869 | P0 已本地修复 |
| `/calculator/` | Merge a Nuke Guide Calculator | 有 | 954 | 可索引 |
| `/codes/` | Merge a Nuke Guide Codes | 有 | 1147 | 可索引，代码状态需保守 |
| `/tier-list/` | Merge a Nuke Guide Tier List | 有 | 1122 | 可索引，但需要证据边界 |
| `/guide/` | Merge a Nuke Guide Beginner Guide | 有 | 1368 | 内容足够，但与发布策略冲突 |
| `/updates/` | Merge a Nuke Guide Updates | 有 | 1008 | 可索引 |
| `/wiki/` | Merge a Nuke Guide Wiki | 有 | 1023 | 可索引 |
| `/progression/` | Merge a Nuke Guide Progression | 有 | 1085 | 可索引 |
| `/raid/` | Merge a Nuke Guide Raid | 有 | 1070 | 可索引，机会高 |
| `/upgrades/` | Merge a Nuke Guide Upgrades | 有 | 1037 | 可索引，机会高 |
| `/offline-cash/` | Merge a Nuke Guide Offline Cash | 有 | 1088 | 可索引 |
| `/rebirth/` | Merge a Nuke Guide Rebirth | 有 | 1064 | 可索引，机会高 |
| `/about/` | About Merge a Nuke Guide | 有 | 305 | 可保留 |
| `/contact/` | Contact | 有 | 238 | 可保留 |
| `/editorial-policy/` | Editorial Policy | 有 | 276 | 可保留 |

## 已做本地修复

修复文件：

`/Users/tangjei/Documents/建站/游戏站/Roblox-Merge-a-Nuke/src/pages/index.astro`

修复内容：

```astro
<SiteLayout title={homeContent.title} description={homeContent.description}>
```

修复效果：

```html
<meta name="description" content="Merge a Nuke Guide is your ultimate offline cash progress planner and code watcher hub. Get updated Roblox simulation codes, wiki databases, and guides.">
<meta property="og:description" content="Merge a Nuke Guide is your ultimate offline cash progress planner and code watcher hub. Get updated Roblox simulation codes, wiki databases, and guides.">
```

## 验证结果

| 命令 | 结果 | 说明 |
|---|---|---|
| `npm run build` | 通过 | 本地静态产物可生成 |
| `dist/index.html` 检查 | 通过 | 首页 description 已存在 |
| `npm test` | 失败 | 失败来自旧模板测试与当前路由策略不一致 |
| `npm run validate:static-export` | 失败 | `/guide/` 与 `/beginner-guide/` 冲突 |
| `npm run release:check` | 失败 | 发布策略仍期待 `/beginner-guide/`，并禁止 `/guide/` |

## 对标抓取结果

| 来源 | 抓到的信息 | 对你的意义 |
|---|---|---|
| Pocket Tactics | 2026-06-14 更新，列出 `ATOMIC`、`UPDATE2`、`BOOM` | 竞品更新快，但只做 codes |
| PCGamesN | 2026-06-10 更新，列出 `UPDATE2`、`BOOM` | 强域名压 codes 词 |
| Beebom | 2026-06-10 发布，列出 `UPDATE2`、`BOOM` | Codes 页竞争强 |
| Destructoid | 列出 `ATOMIC`、`UPDATE2`、`BOOM`，并提到 Discord 和 wiki 信息 | 代码和社区入口竞争强 |
| Rolimon's | 公开游戏描述包含 offline cash、raid、base lock、BOOM、Friday updates | 官方和数据源事实基准 |
| BO3 scripts | 出现 auto merge、auto upgrade、base locking 等脚本需求 | 不能做作弊页，但可转成手动攻略和安全替代内容 |

## 关键词机会矩阵

| 优先级 | 关键词 | 页面 | 判断 |
|---:|---|---|---|
| 1 | merge a nuke raid guide | `/raid/` | 竞争较低，建议优先提交 |
| 2 | merge a nuke upgrades guide | `/upgrades/` | 脚本需求可转成合规升级顺序 |
| 3 | merge a nuke rebirth guide | `/rebirth/` | 直接竞品少 |
| 4 | merge a nuke calculator | `/calculator/` | 差异化工具页，适合新站 |
| 5 | merge a nuke progression guide | `/progression/` | 能承接 wiki 和 guide 流量 |
| 6 | merge a nuke offline cash | `/offline-cash/` | 官方描述支持这个主题 |
| 7 | merge a nuke codes | `/codes/` | 竞争强，只能靠更新和证据边界 |
| 8 | merge a nuke wiki | `/wiki/` | 可以做总资料入口 |
| 9 | merge a nuke tier list | `/tier-list/` | 需要更多实测或明确说明是用途分层 |
| 10 | merge a nuke updates | `/updates/` | Friday update 适合持续刷新 |

## 抓取提交建议

### 现在可以提交

只建议先提交这些：

1. `https://mergeanuke.online/`
2. `https://mergeanuke.online/raid/`
3. `https://mergeanuke.online/upgrades/`
4. `https://mergeanuke.online/rebirth/`
5. `https://mergeanuke.online/calculator/`

理由：

* 这些页面有独立搜索意图。
* 不是最拥挤的 codes 赛道。
* 线上内容量不算薄。

### 暂缓全站提交

暂缓全站 sitemap 提交，直到确认两件事：

1. 首页 description 修复已经部署到线上。
2. `/guide/` 与 `/beginner-guide/` 只保留一个主入口，并让 sitemap、canonical、release check 一致。

## 最终裁决

即使经过讨论，我认为你在以下方面依然错误：

* 你把“已上线”理解成“可以直接全站抓取”。实际上只能说明服务器可访问。
* 你忽略了首页 description 空值，这会影响首次抓取质量。
* 你忽略了 `/guide/` 与 `/beginner-guide/` 的路由冲突。这个问题不解决，全站提交会把重复入口暴露给搜索引擎。
