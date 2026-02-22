// Stash iOS Mini routing rules
// Ordered from most-specific to least-specific.
// Matches the 15 providers in rule-providers-mini.ts.

export const configStashMiniRules = `rules:
  # 广告拦截
  - RULE-SET,advertising,🛡️ 广告拦截

  # 安全拒绝（STUN/WebRTC 端口，防 IP 泄漏）
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

  # 国内直连
  - RULE-SET,geolocation-cn,🔒 国内服务
  # GeoIP 国内 IP 段兜底（解决腾讯会议等 CN App 直连 IP 被漏网之鱼匹配的问题）
  - RULE-SET,cn-ip,🔒 国内服务,no-resolve

  # AI 服务
  - RULE-SET,category-ai-chat-!cn,💬 AI 服务

  # 油管
  - RULE-SET,youtube,📹 油管视频

  # 流媒体（netflix/spotify/twitch/biliintl 等）
  - RULE-SET,category-entertainment@!cn,🎬 流媒体

  # 即时通讯（telegram/signal/whatsapp 等）
  - RULE-SET,category-voip,📲 电报消息

  # 社交媒体（twitter/fb/ig/tiktok/discord/reddit 等）
  - RULE-SET,category-social-media-!cn,🌐 社交媒体

  # 游戏平台（仅境外）
  - RULE-SET,category-games-!cn,🎮 游戏平台

  # 谷歌 / 苹果 / 微软
  - RULE-SET,google,🔍 谷歌服务
  - RULE-SET,apple,🍏 苹果服务
  - RULE-SET,microsoft,Ⓜ️ 微软服务

  # 开发工具（github/npm/pypi 等）
  - RULE-SET,category-dev,🐱 开发工具

  # 云服务 / Cloudflare
  - RULE-SET,cloudflare,☁️ 云服务

  # 非中国兜底（代理）
  - RULE-SET,geolocation-!cn,🌐 非中国

  # 漏网之鱼
  - MATCH,🐟 漏网之鱼
`;
