// Shared rule-providers definition (used by both Mihomo and Stash)
// All providers verified against local meta-rules-dat (MetaCubeX/meta-rules-dat@meta branch).
//
// Design principles:
// 1. Prefer category-* sets over individual providers when they cover the same scope.
// 2. Keep individual providers only when they need distinct routing from their category,
//    or for DNS nameserver-policy precision (Mihomo only).
// 3. Individual AI providers (openai/anthropic/etc.) are kept for Mihomo DNS nameserver-policy.

export const configRuleProviders = `rule-providers:
  # -- 隐私 & 广告拦截 -----------------------------------------
  # category-httpdns-cn: CN 应用的 HttpDNS 绕过（比 httpdns 更全）
  category-httpdns-cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-httpdns-cn.yaml"
    path: ./ruleset/category-httpdns-cn.yaml
    interval: 86400

  # category-doh: DoH 服务端点（防止 App 绕过本地 DNS）
  category-doh:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-doh.yaml"
    path: ./ruleset/category-doh.yaml
    interval: 86400

  advertising:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.yaml"
    path: ./ruleset/advertising.yaml
    interval: 86400

  # Windows 遥测 & 追踪
  win-spy:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/win-spy.yaml"
    path: ./ruleset/win-spy.yaml
    interval: 86400

  win-extra:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/win-extra.yaml"
    path: ./ruleset/win-extra.yaml
    interval: 86400

  win-update:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/win-update.yaml"
    path: ./ruleset/win-update.yaml
    interval: 86400

  # -- AI 服务 (DNS policy 需独立集，路由由 category 统一处理) --
  category-ai-chat-!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-chat-!cn.yaml"
    path: ./ruleset/category-ai-chat-!cn.yaml
    interval: 86400

  openai:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/openai.yaml"
    path: ./ruleset/openai.yaml
    interval: 86400

  anthropic:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/anthropic.yaml"
    path: ./ruleset/anthropic.yaml
    interval: 86400

  google-gemini:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google-gemini.yaml"
    path: ./ruleset/google-gemini.yaml
    interval: 86400

  deepseek:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/deepseek.yaml"
    path: ./ruleset/deepseek.yaml
    interval: 86400

  perplexity:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/perplexity.yaml"
    path: ./ruleset/perplexity.yaml
    interval: 86400

  xai:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/xai.yaml"
    path: ./ruleset/xai.yaml
    interval: 86400

  # AI 编辑器（cursor/windsurf/trae/manus 未必在 category-ai-chat-!cn 中）
  cursor:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/cursor.yaml"
    path: ./ruleset/cursor.yaml
    interval: 86400

  windsurf:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/windsurf.yaml"
    path: ./ruleset/windsurf.yaml
    interval: 86400

  trae:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/trae.yaml"
    path: ./ruleset/trae.yaml
    interval: 86400

  manus:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/manus.yaml"
    path: ./ruleset/manus.yaml
    interval: 86400

  jetbrains-ai:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/jetbrains-ai.yaml"
    path: ./ruleset/jetbrains-ai.yaml
    interval: 86400

  # -- 流媒体 --------------------------------------------------
  youtube:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.yaml"
    path: ./ruleset/youtube.yaml
    interval: 86400

  # category-entertainment@!cn 覆盖 twitch/biliintl/category-media 等境外娱乐
  category-entertainment@!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-entertainment@!cn.yaml"
    path: ./ruleset/category-entertainment@!cn.yaml
    interval: 86400

  # -- 苹果服务 ------------------------------------------------
  apple:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.yaml"
    path: ./ruleset/apple.yaml
    interval: 86400

  appletv:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple-tvplus.yaml"
    path: ./ruleset/appletv.yaml
    interval: 86400

  # -- 谷歌服务 ------------------------------------------------
  google:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google.yaml"
    path: ./ruleset/google.yaml
    interval: 86400

  # -- 微软服务 ------------------------------------------------
  microsoft:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft.yaml"
    path: ./ruleset/microsoft.yaml
    interval: 86400

  onedrive:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/onedrive.yaml"
    path: ./ruleset/onedrive.yaml
    interval: 86400

  # -- 开发工具 ------------------------------------------------
  # category-dev 含 github/npm/pypi/rubygems/crates.io 等
  category-dev:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-dev.yaml"
    path: ./ruleset/category-dev.yaml
    interval: 86400

  # category-container 覆盖 docker/quay 等容器仓库
  category-container:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-container.yaml"
    path: ./ruleset/category-container.yaml
    interval: 86400

  microsoft-dev:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft-dev.yaml"
    path: ./ruleset/microsoft-dev.yaml
    interval: 86400

  jetbrains:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/jetbrains.yaml"
    path: ./ruleset/jetbrains.yaml
    interval: 86400

  gitlab:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gitlab.yaml"
    path: ./ruleset/gitlab.yaml
    interval: 86400

  # -- 即时通讯 ------------------------------------------------
  # category-voip 覆盖 telegram/signal/whatsapp/line/zoom/webex 等
  category-voip:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-voip.yaml"
    path: ./ruleset/category-voip.yaml
    interval: 86400

  # -- 社交媒体 ------------------------------------------------
  # category-social-media-!cn 覆盖 twitter/fb/ig/tiktok/discord/reddit 等
  category-social-media-!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-social-media-!cn.yaml"
    path: ./ruleset/category-social-media-!cn.yaml
    interval: 86400

  # category-forums 覆盖 reddit/hackernews/discourse 等
  category-forums:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-forums.yaml"
    path: ./ruleset/category-forums.yaml
    interval: 86400

  # -- 游戏平台 ------------------------------------------------
  # category-games-!cn 仅境外游戏平台（更精确，避免误伤国内游戏）
  category-games-!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-games-!cn.yaml"
    path: ./ruleset/category-games-!cn.yaml
    interval: 86400

  # -- 教育资源 ------------------------------------------------
  category-scholar-!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-scholar-!cn.yaml"
    path: ./ruleset/category-scholar-!cn.yaml
    interval: 86400

  # -- 生产力工具 -----------------------------------------------
  # category-password-management 覆盖 1password/bitwarden/lastpass 等
  category-password-management:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-password-management.yaml"
    path: ./ruleset/category-password-management.yaml
    interval: 86400

  slack:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/slack.yaml"
    path: ./ruleset/slack.yaml
    interval: 86400

  dropbox:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/dropbox.yaml"
    path: ./ruleset/dropbox.yaml
    interval: 86400

  mega:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/mega.yaml"
    path: ./ruleset/mega.yaml
    interval: 86400

  protonmail:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/protonmail.yaml"
    path: ./ruleset/protonmail.yaml
    interval: 86400

  tutanota:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tutanota.yaml"
    path: ./ruleset/tutanota.yaml
    interval: 86400

  # -- 云服务 --------------------------------------------------
  cloudflare:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/cloudflare.yaml"
    path: ./ruleset/cloudflare.yaml
    interval: 86400

  # -- 金融服务 ------------------------------------------------
  category-finance:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-finance.yaml"
    path: ./ruleset/category-finance.yaml
    interval: 86400

  # category-cryptocurrency 覆盖 coinbase/binance/okx 等
  category-cryptocurrency:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-cryptocurrency.yaml"
    path: ./ruleset/category-cryptocurrency.yaml
    interval: 86400

  paypal:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/paypal.yaml"
    path: ./ruleset/paypal.yaml
    interval: 86400

  # -- 新闻资讯 ------------------------------------------------
  category-news-ir:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-news-ir.yaml"
    path: ./ruleset/category-news-ir.yaml
    interval: 86400

  # category-tech-media 覆盖 techcrunch/verge/arstechnica/wired 等
  category-tech-media:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-tech-media.yaml"
    path: ./ruleset/category-tech-media.yaml
    interval: 86400

  # -- 成人内容 ------------------------------------------------
  category-porn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-porn.yaml"
    path: ./ruleset/category-porn.yaml
    interval: 86400

  # -- BT / PT 追踪器 ------------------------------------------
  category-public-tracker:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-public-tracker.yaml"
    path: ./ruleset/category-public-tracker.yaml
    interval: 86400

  # category-pt: 私有 PT 站（M-Team/HDSky 等）
  category-pt:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-pt.yaml"
    path: ./ruleset/category-pt.yaml
    interval: 86400

  # -- 测速 ----------------------------------------------------
  # category-speedtest 覆盖 ookla/fast.com/nperf 等
  category-speedtest:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-speedtest.yaml"
    path: ./ruleset/category-speedtest.yaml
    interval: 86400

  # -- NTP 服务 ------------------------------------------------
  category-ntp:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ntp.yaml"
    path: ./ruleset/category-ntp.yaml
    interval: 86400

  # -- 地理数据 ------------------------------------------------
  private:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/private.yaml"
    path: ./ruleset/private.yaml
    interval: 86400

  geolocation-cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-cn.yaml"
    path: ./ruleset/geolocation-cn.yaml
    interval: 86400

  geolocation-!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-!cn.yaml"
    path: ./ruleset/geolocation-!cn.yaml
    interval: 86400

  cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/cn.yaml"
    path: ./ruleset/cn.yaml
    interval: 86400
`;
