// Shared routing rules (used by both Mihomo and Stash)
// Ordered from most-specific to least-specific.
//
// Deduplication notes:
// - applemusic/appletv BEFORE apple: they route to different groups
//   (🍏 苹果服务 / 🎬 苹果视频) while apple overall goes to 🍏 苹果服务 via proxy.
//   applemusic is accessible in China mainland, so it stays as 苹果服务 (direct-capable).
// - category-ai-chat-!cn covers openai/anthropic/gemini/deepseek/perplexity.
// - category-media covers netflix/disney/hbo/spotify etc.
// - category-games covers steam/epic/ea/blizzard etc.
// - category-dev covers github + many other dev tools → github rule removed.

export const configRules = `rules:
  # HttpDNS 拦截 & 隐私保护
  - RULE-SET,httpdns,🛡️ 隐私防护
  - RULE-SET,advertising,🛡️ 隐私防护
  - RULE-SET,privacy,🛡️ 隐私防护

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

  # 苹果音乐/视频优先（在 apple 整体规则前，路由到各自分组）
  - RULE-SET,applemusic,🍏 苹果服务
  - RULE-SET,appletv,🎬 苹果视频

  # 谷歌 / 苹果整体 / 微软 / 开发工具（含 Github）
  - RULE-SET,google,🔍 谷歌服务
  - RULE-SET,apple,🍏 苹果服务
  - RULE-SET,microsoft,Ⓜ️ 微软服务
  - RULE-SET,category-dev,🐱 Github

  # AI 服务（category-ai-chat-!cn 已包含各大 AI 服务）
  - RULE-SET,category-ai-chat-!cn,💬 AI 服务

  # 电报消息
  - RULE-SET,telegram,📲 电报消息,no-resolve

  # 油管视频（独立于流媒体大类）
  - RULE-SET,youtube,📹 油管视频

  # 流媒体（category-media 已包含 netflix/disney/hbo/spotify 等）
  - RULE-SET,category-media,🎬 流媒体

  # 社交媒体（已包含 twitter/facebook/instagram/tiktok/discord 等）
  - RULE-SET,category-social-media-!cn,🌐 社交媒体

  # 游戏平台（category-games 已包含 steam/epic/ea/blizzard 等）
  - RULE-SET,category-games,🎮 游戏平台

  # 教育资源
  - RULE-SET,category-scholar-!cn,📚 教育资源

  # 金融服务
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
