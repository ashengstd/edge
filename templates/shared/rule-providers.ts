// Shared rule-providers definition (used by both Mihomo and Stash)
// All providers use format: yaml, which is supported by both platforms.
//
// Individual AI providers (openai/anthropic/google-gemini/deepseek/perplexity)
// are kept because the Mihomo DNS nameserver-policy references them.
// category-ai-chat-!cn handles routing; individual sets handle DNS.
//
// github removed — covered by category-dev.
// netflix/disney/hbo/spotify/steam removed — covered by category-media/category-games.

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

  privacy:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/privacy.yaml"
    path: ./ruleset/privacy.yaml
    interval: 86400

  # -- AI 服务 (DNS policy 需要独立集，路由由 category 统一处理) --
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

  applemusic:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/applemusic.yaml"
    path: ./ruleset/applemusic.yaml
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

  # -- 开发工具（含 Github）------------------------------------
  category-dev:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-dev.yaml"
    path: ./ruleset/category-dev.yaml
    interval: 86400

  # -- 社交媒体（含 twitter/fb/discord/tiktok 等）--------------
  telegram:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/telegram.yaml"
    path: ./ruleset/telegram.yaml
    interval: 86400

  category-social-media-!cn:
    type: http
    format: yaml
    behavior: domain
    url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-social-media-!cn.yaml"
    path: ./ruleset/category-social-media-!cn.yaml
    interval: 86400

  # -- 游戏平台（含 steam/epic/ea/blizzard 等）-----------------
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
