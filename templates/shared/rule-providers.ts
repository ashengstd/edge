// Shared rule-providers definition (used by both Mihomo and Stash)
// All providers verified against local meta-rules-dat (MetaCubeX/meta-rules-dat@meta branch).
//
// VERIFIED MISSING (removed):
//   - privacy: does not exist in meta branch → replaced by win-spy/win-extra/win-update
//   - applemusic: does not exist in meta branch → apple rule covers the domains
//
// Individual AI providers (openai/anthropic/etc.) kept for Mihomo DNS nameserver-policy.
// category-ai-chat-!cn handles routing; individual sets handle DNS precision.

export const configRuleProviders = `rule-providers:
  # -- 隐私 & 广告拦截 -----------------------------------------
  httpdns:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/httpdns.yaml"
    path: ./ruleset/httpdns.yaml
    interval: 86400

  advertising:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.yaml"
    path: ./ruleset/advertising.yaml
    interval: 86400

  # Windows 遥测 & 追踪拦截（替代不存在的 privacy 规则集）
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

  # -- AI 服务 (DNS policy 用独立集，路由由 category 统一处理) --
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

  # AI 编辑器
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

  # -- 流媒体 (category-media 覆盖 netflix/disney/hbo/spotify 等) --
  youtube:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.yaml"
    path: ./ruleset/youtube.yaml
    interval: 86400

  category-media:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-media.yaml"
    path: ./ruleset/category-media.yaml
    interval: 86400

  twitch:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/twitch.yaml"
    path: ./ruleset/twitch.yaml
    interval: 86400

  biliintl:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/biliintl.yaml"
    path: ./ruleset/biliintl.yaml
    interval: 86400

  category-entertainment:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-entertainment.yaml"
    path: ./ruleset/category-entertainment.yaml
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

  microsoft-dev:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft-dev.yaml"
    path: ./ruleset/microsoft-dev.yaml
    interval: 86400

  onedrive:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/onedrive.yaml"
    path: ./ruleset/onedrive.yaml
    interval: 86400

  # -- 开发工具（含 Github / Gitlab / Docker / JetBrains）------
  category-dev:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-dev.yaml"
    path: ./ruleset/category-dev.yaml
    interval: 86400

  gitlab:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gitlab.yaml"
    path: ./ruleset/gitlab.yaml
    interval: 86400

  docker:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/docker.yaml"
    path: ./ruleset/docker.yaml
    interval: 86400

  jetbrains:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/jetbrains.yaml"
    path: ./ruleset/jetbrains.yaml
    interval: 86400

  # -- 电报 & 即时通讯 -----------------------------------------
  telegram:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/telegram.yaml"
    path: ./ruleset/telegram.yaml
    interval: 86400

  signal:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/signal.yaml"
    path: ./ruleset/signal.yaml
    interval: 86400

  whatsapp:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/whatsapp.yaml"
    path: ./ruleset/whatsapp.yaml
    interval: 86400

  line:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/line.yaml"
    path: ./ruleset/line.yaml
    interval: 86400

  # -- 社交媒体 (category 已含 twitter/fb/ig/tiktok/discord) ---
  category-social-media-!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-social-media-!cn.yaml"
    path: ./ruleset/category-social-media-!cn.yaml
    interval: 86400

  twitter:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/twitter.yaml"
    path: ./ruleset/twitter.yaml
    interval: 86400

  tiktok:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tiktok.yaml"
    path: ./ruleset/tiktok.yaml
    interval: 86400

  discord:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/discord.yaml"
    path: ./ruleset/discord.yaml
    interval: 86400

  reddit:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/reddit.yaml"
    path: ./ruleset/reddit.yaml
    interval: 86400

  bluesky:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bluesky.yaml"
    path: ./ruleset/bluesky.yaml
    interval: 86400

  # -- 生产力工具 -----------------------------------------------
  slack:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/slack.yaml"
    path: ./ruleset/slack.yaml
    interval: 86400

  zoom:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/zoom.yaml"
    path: ./ruleset/zoom.yaml
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

  # -- 隐私邮件 ------------------------------------------------
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

  # -- 支付 ----------------------------------------------------
  paypal:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/paypal.yaml"
    path: ./ruleset/paypal.yaml
    interval: 86400

  # -- 游戏平台（category-games 已含 steam/epic/ea/blizzard 等）-
  category-games:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-games.yaml"
    path: ./ruleset/category-games.yaml
    interval: 86400

  # -- 教育资源 ------------------------------------------------
  category-scholar-!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-scholar-!cn.yaml"
    path: ./ruleset/category-scholar-!cn.yaml
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

  # -- 新闻资讯 ------------------------------------------------
  category-news-ir:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-news-ir.yaml"
    path: ./ruleset/category-news-ir.yaml
    interval: 86400

  # -- BT 公共追踪器 -------------------------------------------
  category-public-tracker:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-public-tracker.yaml"
    path: ./ruleset/category-public-tracker.yaml
    interval: 86400

  # -- 成人内容 ------------------------------------------------
  category-porn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-porn.yaml"
    path: ./ruleset/category-porn.yaml
    interval: 86400

  # -- 测速 ----------------------------------------------------
  speedtest:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/speedtest.yaml"
    path: ./ruleset/speedtest.yaml
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
