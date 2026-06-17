# mergeanuke.online 线上抓取复跑报告

日期：2026-06-16  
域名：https://mergeanuke.online/  
站点源码：/Users/tangjei/Documents/建站/游戏站/Roblox-Merge-a-Nuke  
任务：重跑线上抓取、构建、测试、静态导出校验、发布校验和 IndexNow dry run。IndexNow dry run 中文解释：只模拟提交，不向搜索引擎发送请求。

## Counter:

🚨 复跑后结论已经改变：现在可以提交全站 sitemap 抓取。  

上一轮的两个阻塞点已经消失：

* 首页 description 已经在线上出现。description 中文解释：搜索结果摘要的主要候选文本。
* `/guide/` 与 `/beginner-guide/` 的路由冲突已经消失，当前 sitemap 使用 `/beginner-guide/`。

仍要保留的反对意见：

* 不要把第三方 codes 页面里的 `ATOMIC`、`UPDATE2` 直接写成 verified active。verified active 中文解释：本站亲自进游戏验证可用。
* Codes 赛道竞争强，不要只提交 codes 页后就等流量。

## 声明分类

### Verifiable 可验证

| 项目 | 结果 |
|---|---|
| 首页状态 | `HTTP 200`，中文解释：服务器成功返回网页 |
| Sitemap URL 数量 | 15 |
| 首页 title | `Merge a Nuke Guide | Roblox Simulator Codes and Wiki` |
| 首页 description 长度 | 152 字符 |
| 首页 canonical | `https://mergeanuke.online/`，canonical 中文解释：规范网址 |
| 首页 robots | `index,follow`，robots 中文解释：允许索引并继续抓取链接 |
| `npm test` | 通过，22 个测试全部通过 |
| `npm run build` | 通过 |
| `npm run validate:static-export` | 通过 |
| `npm run release:check` | 通过 |
| `npm run indexnow:dry-run` | 通过，模拟 15 个 URL |

### Judgment 主观判断

| 判断 | 依据 |
|---|---|
| 可以提交全站 sitemap | 测试、构建、静态导出、发布校验均通过 |
| 首页可以提交抓取 | description、canonical、robots 都正常 |
| 最值得优先观察的页面 | `/raid/`、`/upgrades/`、`/rebirth/`、`/calculator/` |
| Codes 页需要持续更新 | Pocket Tactics、PCGamesN、Beebom、Destructoid、Sportskeeda 都在抢 codes 词 |

### Confidence 不等于正确

* 没有 Google Search Console 数据，不能确认点击、展现、索引覆盖率。
* 没有游戏内兑换验证，不能把社区报告代码升级为 verified active。
* 搜索结果出现页面，不等于排名稳定。

## 线上页面抓取结果

| URL | Title | Description 长度 | Canonical | 字数估算 |
|---|---|---:|---|---:|
| `/` | Merge a Nuke Guide \| Roblox Simulator Codes and Wiki | 152 | `/` | 2893 |
| `/calculator/` | Merge a Nuke Calculator \| Roblox Offline Cash Planner | 157 | `/calculator/` | 991 |
| `/codes/` | Merge a Nuke Codes \| Reported Rewards and Redeem Steps | 149 | `/codes/` | 985 |
| `/tier-list/` | Merge a Nuke Tier List \| Roblox Progression Priorities | 146 | `/tier-list/` | 892 |
| `/beginner-guide/` | Merge a Nuke Beginner Guide \| Roblox Loop and Defense | 140 | `/beginner-guide/` | 924 |
| `/updates/` | Merge a Nuke Updates \| Friday Patch and Code Watch | 153 | `/updates/` | 948 |
| `/wiki/` | Merge a Nuke Wiki \| Source-Backed Roblox Guide Hub | 142 | `/wiki/` | 889 |
| `/progression/` | Merge a Nuke Progression Guide \| Cash, Upgrades, Raids | 145 | `/progression/` | 960 |
| `/raid/` | Merge a Nuke Raid Guide \| Attack, Lock, Cash Defense | 147 | `/raid/` | 1178 |
| `/upgrades/` | Merge a Nuke Upgrades Guide \| Spawn, Lock, Raid Order | 139 | `/upgrades/` | 1028 |
| `/offline-cash/` | Merge a Nuke Offline Cash Guide \| Lock and Reinvest | 148 | `/offline-cash/` | 985 |
| `/rebirth/` | Merge a Nuke Rebirth Guide \| Reset Timing and Recovery | 143 | `/rebirth/` | 1077 |
| `/about/` | About Merge a Nuke Guide \| Roblox Wiki & Strategy Hub | 157 | `/about/` | 321 |
| `/contact/` | Contact Merge a Nuke Guide \| Submit Feedback & Codes | 155 | `/contact/` | 260 |
| `/editorial-policy/` | Editorial Policy \| Merge a Nuke Guide Trust System | 151 | `/editorial-policy/` | 297 |

## 验证命令结果

| 命令 | 结果 | 说明 |
|---|---|---|
| `npm test` | 通过 | 22 个测试全部通过 |
| `npm run build` | 通过 | 生成 18 个静态页面，15 个 sitemap 路由 |
| `npm run validate:static-export` | 通过 | 检查 15 个 sitemap URL 和 17 个 HTML 文件 |
| `npm run release:check` | 通过 | 检查 15 个 public path、2 个 noindex path、5 个 blocked path |
| `npm run indexnow:dry-run` | 通过 | 模拟提交 15 个 URL，没有发送请求 |

## 搜索结果复查

已观察到 `mergeanuke.online` 多个页面出现在搜索结果中：

* `/beginner-guide/`
* `/codes/`
* `/wiki/`
* `/progression/`
* `/upgrades/`
* `/`

这说明站点已经不是单纯“等待首次发现”的状态，而是进入“新站早期索引与排名观察”阶段。

## IndexNow dry run URL 列表

可以提交以下 15 个 URL：

1. `https://mergeanuke.online/`
2. `https://mergeanuke.online/calculator/`
3. `https://mergeanuke.online/codes/`
4. `https://mergeanuke.online/tier-list/`
5. `https://mergeanuke.online/beginner-guide/`
6. `https://mergeanuke.online/updates/`
7. `https://mergeanuke.online/wiki/`
8. `https://mergeanuke.online/progression/`
9. `https://mergeanuke.online/raid/`
10. `https://mergeanuke.online/upgrades/`
11. `https://mergeanuke.online/offline-cash/`
12. `https://mergeanuke.online/rebirth/`
13. `https://mergeanuke.online/about/`
14. `https://mergeanuke.online/contact/`
15. `https://mergeanuke.online/editorial-policy/`

## 对标抓取结果

| 来源 | 观察 | 对你的意义 |
|---|---|---|
| Pocket Tactics | Merge a Nuke codes 结果靠前 | Codes 竞争强 |
| PCGamesN | Merge a Nuke codes 结果靠前 | 强域名压 codes |
| Beebom | Codes 兑换流程覆盖完整 | 不能只靠兑换教程抢词 |
| Destructoid | 强调 instant currency 和 nukes | 竞品文案偏奖励导向 |
| Sportskeeda | beginner guide 和 codes 都有结果 | beginner 词也开始竞争 |
| Rolimon's | 官方描述含 offline cash、raid、base lock、BOOM、Friday updates | 你的内页主题有事实基础 |
| mergeanuke.org | 对标站覆盖 play online、strategy、video、final nuke、mobile | 需要监控其新增内页 |

## 抓取提交建议

### 现在可以提交

可以提交 sitemap 和 IndexNow。IndexNow 中文解释：把 URL 推送给支持该协议的搜索引擎。

优先观察这 5 个页面：

1. `/raid/`
2. `/upgrades/`
3. `/rebirth/`
4. `/calculator/`
5. `/progression/`

原因：

* 这些页面有明确搜索意图。
* 直接竞品少于 codes 页面。
* 页面正文量、title、description、canonical 都已达基本要求。

### 提交后观察

1. Google Search Console 看 coverage，中文解释：索引覆盖状态。
2. 看 impressions，中文解释：展现次数。
3. 看 queries，中文解释：用户实际搜索词。
4. 看 `/codes/` 是否被大站压制。
5. 看 `/raid/`、`/upgrades/`、`/rebirth/` 是否先拿到长尾展现。

## 最终裁决

即使经过复跑，我认为你在以下方面依然容易犯错：

* 把“能提交”理解成“马上有排名”。现在只能说明抓取入口合格。
* 把 codes 作为唯一主战场。实际低竞争机会更可能在 raid、upgrades、rebirth、calculator。
* 把第三方 codes 结果当成 verified active。当前仍必须保持 reported、pending、disputed 等证据标签。
