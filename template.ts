export const configHeader = `tun:
  enable: false
  stack: system
  auto-route: true
  auto-detect-interface: true
  dns-hijack:
    - any:53
    - tcp://any:53
    - any:1053
    - tcp://any:1053
  loopback-address:
    - 10.7.0.1

external-controller: 0.0.0.0:9090
external-controller-cors:
  allow-origins:
    - "*"
  allow-private-network: true
secret: "{{SECRET}}"
external-ui: ./ui
external-ui-url: "https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip"
`;

export const configGroupsHeader = `proxy-groups:
  - name: 🚀 节点选择
    type: select
    proxies: [DIRECT, REJECT, {{AUTO_GROUPS_LIST}}, {{PROVIDERS_LIST}}, {{SELF_HOSTED_GROUP}}]
`;

export const configSelfHostedGroup = `  - name: Self-Hosted
    type: select
    proxies: [{{SELF_HOSTED_LIST}}]
`;

export const configGroupsMid = `  - name: 🛑 广告拦截
    type: select
    proxies: [REJECT, DIRECT, 🚀 节点选择, {{AUTO_GROUPS_LIST}}]
  - name: 💬 AI 服务
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 📹 油管视频
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🔍 谷歌服务
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🏠 私有网络
    type: select
    proxies: [DIRECT, REJECT, 🚀 节点选择, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🔒 国内服务
    type: select
    proxies: [DIRECT, REJECT, 🚀 节点选择, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 📲 电报消息
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🐱 Github
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: Ⓜ️ 微软服务
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🍏 苹果服务
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🎬 苹果视频
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🌐 社交媒体
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🎬 流媒体
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🎮 游戏平台
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 📚 教育资源
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: ☁️ 云服务
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 💰 金融服务
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🌐 非中国
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🐟 漏网之鱼
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
`;

export const configFooter = `
mixed-port: 7897
allow-lan: true
mode: rule
log-level: info
unified-delay: true
tcp-concurrent: true
find-process-mode: strict
global-client-fingerprint: chrome

dns:
  enable: true
  listen: "127.0.0.1:1053"
  use-system-hosts: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 8.8.8.8
    - 1.1.1.1
  nameserver:
    - 45.90.28.239
    - 45.90.30.239
  fallback:
    - https://dns.alidns.com/dns-query
    - https://doh.apad.pro/dns-query
  fallback-filter:
    {
      geoip: true,
      ipcidr: [240.0.0.0/4, 0.0.0.0/32, 127.0.0.1/32],
      domain:
        [
          +.google.com,
          +.facebook.com,
          +.twitter.com,
          +.youtube.com,
          +.xn--ngstr-lra8j.com,
          +.google.cn,
          +.googleapis.cn,
          +.googleapis.com,
          +.gvt1.com,
        ],
    }
  fake-ip-filter:
    [
      "*.lan",
      "*.localdomain",
      "*.example",
      "*.invalid",
      "*.localhost",
      "*.test",
      "*.local",
      "*.home.arpa",
      "time.*.com",
      "time.*.gov",
      "time.*.edu.cn",
      "time.*.apple.com",
      "time1.*.com",
      "time2.*.com",
      "time3.*.com",
      "time4.*.com",
      "time5.*.com",
      "time6.*.com",
      "time7.*.com",
      "ntp.*.com",
      "ntp1.*.com",
      "ntp2.*.com",
      "ntp3.*.com",
      "ntp4.*.com",
      "ntp5.*.com",
      "ntp6.*.com",
      "ntp7.*.com",
      "*.time.edu.cn",
      "*.ntp.org.cn",
      "+.pool.ntp.org",
      "time1.cloud.tencent.com",
      "music.163.com",
      "*.music.163.com",
      "*.126.net",
      "musicapi.taihe.com",
      "music.taihe.com",
      "songsearch.kugou.com",
      "trackercdn.kugou.com",
      "*.kuwo.cn",
      "api-jooxtt.sanook.com",
      "api.joox.com",
      "joox.com",
      "y.qq.com",
      "*.y.qq.com",
      "streamoc.music.tc.qq.com",
      "mobileoc.music.tc.qq.com",
      "isure.stream.qqmusic.qq.com",
      "dl.stream.qqmusic.qq.com",
      "aqqmusic.tc.qq.com",
      "amobile.music.tc.qq.com",
      "*.xiami.com",
      "*.music.migu.cn",
      "music.migu.cn",
      "*.msftconnecttest.com",
      "*.msftncsi.com",
      "msftconnecttest.com",
      "msftncsi.com",
      "localhost.ptlogin2.qq.com",
      "localhost.sec.qq.com",
      "+.srv.nintendo.net",
      "+.stun.playstation.net",
      "xbox.*.microsoft.com",
      "xnotify.xboxlive.com",
      "+.battlenet.com.cn",
      "+.wotgame.cn",
      "+.wggames.cn",
      "+.wowsgame.cn",
      "+.wargaming.net",
      "proxy.golang.org",
      "stun.*.*",
      "stun.*.*.*",
      "+.stun.*.*",
      "+.stun.*.*.*",
      "+.stun.*.*.*.*",
      "heartbeat.belkin.com",
      "*.linksys.com",
      "*.linksyssmartwifi.com",
      "*.router.asus.com",
      "mesu.apple.com",
      "swscan.apple.com",
      "swquery.apple.com",
      "swdownload.apple.com",
      "swcdn.apple.com",
      "swdist.apple.com",
      "lens.l.google.com",
      "stun.l.google.com",
      "+.nflxvideo.net",
      "*.square-enix.com",
      "*.finalfantasyxiv.com",
      "*.ffxiv.com",
    ]

profile:
  store-selected: true
  store-fake-ip: false

sniffer:
  enable: true
  parse-pure-ip: true
  sniff:
    TLS: { ports: [443, 8443] }
    HTTP: { ports: [80, 8080-8880], override-destination: true }

geodata-mode: true
geo-auto-update: true
geodata-loader: standard
geo-update-interval: 24
geox-url:
  geoip: https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat
  geosite: https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat
  mmdb: https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb
  asn: https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb

rule-providers:
  # Aggregated Categories
  category-ads-all: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.mrs", path: ./ruleset/category-ads-all.mrs, interval: 86400 }
  category-ai-chat-!cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-chat-!cn.mrs", path: ./ruleset/category-ai-chat-!cn.mrs, interval: 86400 }
  category-media: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-media.mrs", path: ./ruleset/category-media.mrs, interval: 86400 }
  category-games: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-games.mrs", path: ./ruleset/category-games.mrs, interval: 86400 }
  category-social-media-!cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-social-media-!cn.mrs", path: ./ruleset/category-social-media-!cn.mrs, interval: 86400 }
  category-dev: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-dev.mrs", path: ./ruleset/category-dev.mrs, interval: 86400 }
  category-scholar-!cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-scholar-!cn.mrs", path: ./ruleset/category-scholar-!cn.mrs, interval: 86400 }

  # AI Services
  openai: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/openai.mrs", path: ./ruleset/openai.mrs, interval: 86400 }
  anthropic: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/anthropic.mrs", path: ./ruleset/anthropic.mrs, interval: 86400 }
  google-gemini: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google-gemini.mrs", path: ./ruleset/google-gemini.mrs, interval: 86400 }
  deepseek: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/deepseek.mrs", path: ./ruleset/deepseek.mrs, interval: 86400 }
  perplexity: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/perplexity.mrs", path: ./ruleset/perplexity.mrs, interval: 86400 }

  # Streaming & Media
  youtube: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.mrs", path: ./ruleset/youtube.mrs, interval: 86400 }
  netflix: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/netflix.mrs", path: ./ruleset/netflix.mrs, interval: 86400 }
  disney: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/disney.mrs", path: ./ruleset/disney.mrs, interval: 86400 }
  hbo: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hbo.mrs", path: ./ruleset/hbo.mrs, interval: 86400 }
  amazon: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/amazon.mrs", path: ./ruleset/amazon.mrs, interval: 86400 }
  bahamut: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bahamut.mrs", path: ./ruleset/bahamut.mrs, interval: 86400 }
  spotify: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/spotify.mrs", path: ./ruleset/spotify.mrs, interval: 86400 }
  abema: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/abema.mrs", path: ./ruleset/abema.mrs, interval: 86400 }
  biliintl: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/biliintl.mrs", path: ./ruleset/biliintl.mrs, interval: 86400 }
  pixiv: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/pixiv.mrs", path: ./ruleset/pixiv.mrs, interval: 86400 }
  viu: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/viu.mrs", path: ./ruleset/viu.mrs, interval: 86400 }
  dazn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/dazn.mrs", path: ./ruleset/dazn.mrs, interval: 86400 }
  tidal: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tidal.mrs", path: ./ruleset/tidal.mrs, interval: 86400 }

  # Social Media
  telegram: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/telegram.mrs", path: ./ruleset/telegram.mrs, interval: 86400 }
  facebook: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/facebook.mrs", path: ./ruleset/facebook.mrs, interval: 86400 }
  instagram: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/instagram.mrs", path: ./ruleset/instagram.mrs, interval: 86400 }
  twitter: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/twitter.mrs", path: ./ruleset/twitter.mrs, interval: 86400 }
  tiktok: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tiktok.mrs", path: ./ruleset/tiktok.mrs, interval: 86400 }
  discord: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/discord.mrs", path: ./ruleset/discord.mrs, interval: 86400 }
  bluesky: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bluesky.mrs", path: ./ruleset/bluesky.mrs, interval: 86400 }
  signal: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/signal.mrs", path: ./ruleset/signal.mrs, interval: 86400 }
  whatsapp: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/whatsapp.mrs", path: ./ruleset/whatsapp.mrs, interval: 86400 }
  line: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/line.mrs", path: ./ruleset/line.mrs, interval: 86400 }

  # Games
  steam: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/steam.mrs", path: ./ruleset/steam.mrs, interval: 86400 }
  epicgames: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/epicgames.mrs", path: ./ruleset/epicgames.mrs, interval: 86400 }
  ea: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ea.mrs", path: ./ruleset/ea.mrs, interval: 86400 }
  ubisoft: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ubisoft.mrs", path: ./ruleset/ubisoft.mrs, interval: 86400 }
  blizzard: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/blizzard.mrs", path: ./ruleset/blizzard.mrs, interval: 86400 }
  nintendo: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/nintendo.mrs", path: ./ruleset/nintendo.mrs, interval: 86400 }
  playstation: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/playstation.mrs", path: ./ruleset/playstation.mrs, interval: 86400 }
  xbox: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/xbox.mrs", path: ./ruleset/xbox.mrs, interval: 86400 }
  riot: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/riot.mrs", path: ./ruleset/riot.mrs, interval: 86400 }
  hoyoverse: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hoyoverse.mrs", path: ./ruleset/hoyoverse.mrs, interval: 86400 }

  # Developer & Tools
  github: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/github.mrs", path: ./ruleset/github.mrs, interval: 86400 }
  gitlab: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gitlab.mrs", path: ./ruleset/gitlab.mrs, interval: 86400 }
  microsoft: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft.mrs", path: ./ruleset/microsoft.mrs, interval: 86400 }
  apple: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.mrs", path: ./ruleset/apple.mrs, interval: 86400 }
  appletv: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple-tvplus.mrs", path: ./ruleset/appletv.mrs, interval: 86400 }
  applemusic: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo-lite/geosite/applemusic.mrs", path: ./ruleset/applemusic.mrs, interval: 86400 }
  notion: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/notion.mrs", path: ./ruleset/notion.mrs, interval: 86400 }
  canva: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/canva.mrs", path: ./ruleset/canva.mrs, interval: 86400 }
  docker: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/docker.mrs", path: ./ruleset/docker.mrs, interval: 86400 }
  jetbrains: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/jetbrains.mrs", path: ./ruleset/jetbrains.mrs, interval: 86400 }
  adobe: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/adobe.mrs", path: ./ruleset/adobe.mrs, interval: 86400 }

  # General GeoData
  google: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google.mrs", path: ./ruleset/google.mrs, interval: 86400 }
  geolocation-cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-cn.mrs", path: ./ruleset/geolocation-cn.mrs, interval: 86400 }
  geolocation-!cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-!cn.mrs", path: ./ruleset/geolocation-!cn.mrs, interval: 86400 }
  private: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/private.mrs", path: ./ruleset/private.mrs, interval: 86400 }
  cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/cn.mrs", path: ./ruleset/cn.mrs, interval: 86400 }

rules:
  # Security Rejections
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

  # Local/Direct Rules
  - RULE-SET,private,🏠 私有网络,no-resolve
  - RULE-SET,geolocation-cn,🔒 国内服务
  - RULE-SET,cn,🔒 国内服务,no-resolve

  # Global Logic
  - RULE-SET,google,🚀 节点选择
  - RULE-SET,geolocation-!cn,🚀 节点选择
  - RULE-SET,category-ads-all,🛑 广告拦截

  # AI Services
  - RULE-SET,category-ai-chat-!cn,💬 AI 服务
  - RULE-SET,openai,💬 AI 服务
  - RULE-SET,anthropic,💬 AI 服务
  - RULE-SET,google-gemini,💬 AI 服务
  - RULE-SET,deepseek,💬 AI 服务
  - RULE-SET,perplexity,💬 AI 服务

  # Telegram
  - RULE-SET,telegram,📲 电报消息,no-resolve

  # Media & Streaming
  - RULE-SET,youtube,📹 油管视频
  - RULE-SET,appletv,🎬 苹果视频
  - RULE-SET,applemusic,🎬 苹果视频
  - RULE-SET,netflix,🎬 流媒体
  - RULE-SET,disney,🎬 流媒体
  - RULE-SET,hbo,🎬 流媒体
  - RULE-SET,amazon,🎬 流媒体
  - RULE-SET,bahamut,🎬 流媒体
  - RULE-SET,spotify,🎬 流媒体
  - RULE-SET,abema,🎬 流媒体
  - RULE-SET,biliintl,🎬 流媒体
  - RULE-SET,pixiv,🎬 流媒体
  - RULE-SET,viu,🎬 流媒体
  - RULE-SET,dazn,🎬 流媒体
  - RULE-SET,tidal,🎬 流媒体
  - RULE-SET,category-media,🎬 流媒体

  # Social Media
  - RULE-SET,facebook,🌐 社交媒体
  - RULE-SET,instagram,🌐 社交媒体
  - RULE-SET,twitter,🌐 社交媒体
  - RULE-SET,tiktok,🌐 社交媒体
  - RULE-SET,discord,🌐 社交媒体
  - RULE-SET,bluesky,🌐 社交媒体
  - RULE-SET,signal,🌐 社交媒体
  - RULE-SET,whatsapp,🌐 社交媒体
  - RULE-SET,line,🌐 社交媒体
  - RULE-SET,category-social-media-!cn,🌐 社交媒体

  # Games
  - RULE-SET,steam,🎮 游戏平台
  - RULE-SET,epicgames,🎮 游戏平台
  - RULE-SET,ea,🎮 游戏平台
  - RULE-SET,ubisoft,🎮 游戏平台
  - RULE-SET,blizzard,🎮 游戏平台
  - RULE-SET,nintendo,🎮 游戏平台
  - RULE-SET,playstation,🎮 游戏平台
  - RULE-SET,xbox,🎮 游戏平台
  - RULE-SET,riot,🎮 游戏平台
  - RULE-SET,hoyoverse,🎮 游戏平台
  - RULE-SET,category-games,🎮 游戏平台

  # Tools & Services
  - RULE-SET,github,🐱 Github
  - RULE-SET,gitlab,🐱 Github
  - RULE-SET,microsoft,Ⓜ️ 微软服务
  - RULE-SET,apple,🍏 苹果服务
  - RULE-SET,notion,☁️ 云服务
  - RULE-SET,canva,☁️ 云服务
  - RULE-SET,docker,☁️ 云服务
  - RULE-SET,jetbrains,☁️ 云服务
  - RULE-SET,adobe,☁️ 云服务
  - RULE-SET,category-dev,☁️ 云服务
  - RULE-SET,category-scholar-!cn,📚 教育资源

  # Fallback
  - RULE-SET,geolocation-!cn,🌐 非中国
  - MATCH,🐟 漏网之鱼
`;
