// Shared routing rules (used by both Mihomo and Stash)
// Ordered from most-specific to least-specific.
//
// Deduplication notes:
// - applemusic REMOVED from rule-providers (file doesn't exist in meta branch).
//   apple rule covers all apple domains.
// - appletv stays before apple so it routes to 🎬 苹果视频.
// - category-ai-chat-!cn covers routing; individual AI rules removed (redundant).
// - category-media covers netflix/disney/hbo/spotify.
// - category-games covers steam/epic/ea/blizzard.
// - category-dev covers github + dev tools; individual dev rules added for specificity.
// - win-spy/win-extra → 🛡️ 隐私防护 (replaces nonexistent "privacy" ruleset).
// - win-update → 🔒 国内服务 / DIRECT (Windows Update should go direct or via proxy).

export const configRules = `rules:
  # HttpDNS 拦截 & 广告拦截
  - RULE-SET,httpdns,🛡️ 隐私防护
  - RULE-SET,advertising,🛡️ 隐私防护

  # Windows 遥测拦截
  - RULE-SET,win-spy,🛡️ 隐私防护
  - RULE-SET,win-extra,🛡️ 隐私防护

  # Windows Update 直连（走代理会被微软限速）
  - RULE-SET,win-update,🔒 国内服务

  # 测速 & NTP
  - RULE-SET,speedtest,🧪 测速专线
  - DST-PORT,123,🕓 NTP 服务

  # 安全拒绝（STUN/WebRTC 端口）
  - DST-PORT,3478,REJECT
  - DST-PORT,3479,REJECT
  - DST-PORT,5349,REJECT
  - DST-PORT,5350,REJECT
  - DST-PORT,19302,REJECT
  - DST-PORT,19303,REJECT
  - DST-PORT,19304,REJECT
  - DST-PORT,19305,REJECT
  - DST-PORT,19306,REJECT
  - DST-PORT,19307,REJECT
  - DST-PORT,19308,REJECT
  - DST-PORT,19309,REJECT

  # SSH 直连
  - DST-PORT,22,DIRECT

  # 局域网 & 私有网络
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,100.64.0.0/10,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - RULE-SET,private,🏠 私有网络,no-resolve

  # 国内直连 (geolocation-cn 优先，cn 补充 no-resolve)
  - RULE-SET,geolocation-cn,🔒 国内服务
  - RULE-SET,cn,🔒 国内服务,no-resolve

  # 苹果视频优先（在 apple 整体前路由到 🎬 苹果视频）
  - RULE-SET,appletv,🎬 苹果视频

  # 谷歌 / 苹果 / 微软
  - RULE-SET,google,🔍 谷歌服务
  - RULE-SET,apple,🍏 苹果服务
  - RULE-SET,onedrive,Ⓜ️ 微软服务
  - RULE-SET,microsoft,Ⓜ️ 微软服务
  - RULE-SET,microsoft-dev,🐱 开发工具

  # 开发工具（含 Github / Gitlab / Docker / JetBrains）
  - RULE-SET,gitlab,🐱 开发工具
  - RULE-SET,docker,🐱 开发工具
  - RULE-SET,jetbrains,🐱 开发工具
  - RULE-SET,category-dev,🐱 开发工具

  # AI 服务（category-ai-chat-!cn 已包含主流服务；AI 编辑器单独路由）
  - RULE-SET,category-ai-chat-!cn,💬 AI 服务
  - RULE-SET,xai,💬 AI 服务
  - RULE-SET,cursor,💬 AI 服务
  - RULE-SET,windsurf,💬 AI 服务
  - RULE-SET,trae,💬 AI 服务
  - RULE-SET,manus,💬 AI 服务
  - RULE-SET,jetbrains-ai,💬 AI 服务

  # 即时通讯
  - RULE-SET,telegram,📲 电报消息,no-resolve
  - RULE-SET,signal,📲 电报消息
  - RULE-SET,whatsapp,📲 电报消息
  - RULE-SET,line,📲 电报消息

  # 油管视频（独立于流媒体大类）
  - RULE-SET,youtube,📹 油管视频

  # 流媒体（category-media 覆盖 netflix/disney/hbo/spotify 等）
  - RULE-SET,twitch,🎬 流媒体
  - RULE-SET,biliintl,🎬 流媒体
  - RULE-SET,category-entertainment,🎬 流媒体
  - RULE-SET,category-media,🎬 流媒体

  # 社交媒体（category 覆盖 twitter/fb/ig/tiktok/discord 等）
  - RULE-SET,twitter,🌐 社交媒体
  - RULE-SET,tiktok,🌐 社交媒体
  - RULE-SET,discord,🌐 社交媒体
  - RULE-SET,reddit,🌐 社交媒体
  - RULE-SET,bluesky,🌐 社交媒体
  - RULE-SET,category-social-media-!cn,🌐 社交媒体

  # 生产力工具
  - RULE-SET,slack,🛠️ 生产力工具
  - RULE-SET,zoom,🛠️ 生产力工具
  - RULE-SET,dropbox,☁️ 云服务
  - RULE-SET,mega,☁️ 云服务

  # 隐私邮件
  - RULE-SET,protonmail,🛠️ 生产力工具
  - RULE-SET,tutanota,🛠️ 生产力工具

  # 游戏平台（category-games 覆盖 steam/epic/ea/blizzard 等）
  - RULE-SET,category-games,🎮 游戏平台

  # 教育资源
  - RULE-SET,category-scholar-!cn,📚 教育资源

  # 金融服务（含 PayPal）
  - RULE-SET,paypal,💰 金融服务
  - RULE-SET,category-finance,💰 金融服务

  # 新闻资讯
  - RULE-SET,category-news-ir,📰 新闻资讯

  # 成人内容
  - RULE-SET,category-porn,🔞 成人内容

  # BT 公共追踪器 → 漏网之鱼
  - RULE-SET,category-public-tracker,🐟 漏网之鱼

  # 云服务 / Cloudflare
  - RULE-SET,cloudflare,☁️ 云服务

  # 非中国兜底
  - RULE-SET,geolocation-!cn,🌐 非中国

  # 漏网之鱼
  - MATCH,🐟 漏网之鱼
`;
