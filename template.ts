export const configHeader = `tun:
  enable: false
  stack: system
  auto-route: true
  auto-redirect: true
  auto-detect-interface: true
  dns-hijack:
    - any:53
    - tcp://any:53
    - any:1053
    - tcp://any:1053
  loopback-address:
    - 10.7.0.1

ipv6: false
log-level: info
mixed-port: 7897
allow-lan: true
unified-delay: true
tcp-concurrent: true

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
    proxies: [DIRECT, REJECT, 🔗 节点链, {{AUTO_GROUPS_LIST}}, {{PROVIDERS_LIST}}, {{SELF_HOSTED_GROUP}}]
  - name: 🏮 入口节点
    type: select
    include-all-proxies: true
    proxies: [DIRECT, {{AUTO_GROUPS_LIST}}, {{PROVIDERS_LIST}}, {{SELF_HOSTED_GROUP}}]
  - name: 🛫 出口节点
    type: select
    include-all-proxies: true
    proxies: [DIRECT, {{AUTO_GROUPS_LIST}}, {{PROVIDERS_LIST}}, {{SELF_HOSTED_GROUP}}]
  - name: 🔗 节点链
    type: relay
    proxies: [🏮 入口节点, 🛫 出口节点]
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
  - name: 🔗 其它服务
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
  - name: 🛡️ 隐私防护
    type: select
    proxies: [REJECT, DIRECT, 🚀 节点选择]
  - name: 🧪 测速专线
    type: select
    proxies: [🚀 节点选择, DIRECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]
  - name: 🕓 NTP 服务
    type: select
    proxies: [DIRECT, 🚀 节点选择]
`;

export const configFooter = `
mode: rule
find-process-mode: strict
global-client-fingerprint: chrome

dns:
  enable: true
  listen: "127.0.0.1:1053"
  use-system-hosts: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  nameserver-policy:
    "rule-set:openai,anthropic,google-gemini,deepseek,perplexity": "https://8.8.8.8/dns-query"
    "rule-set:geolocation-!cn": "https://1.1.1.1/dns-query"
    "rule-set:geolocation-cn,cn": "https://dns.alidns.com/dns-query"
  fallback:
    - https://8.8.8.8/dns-query
    - https://1.1.1.1/dns-query
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
          +.google.cn,
          +.googleapis.cn,
          +.googleapis.com,
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
      "*.mcdn.bilivideo.cn",
      "+.ext.skype.com",
      "+.skype.com",
      "+.skypeforbusiness.com",
      "+.teams.microsoft.com",
      "teams.microsoft.com",
      "*.teams.microsoft.com",
      "*.s-microsoft.com",
      "+.msecnd.net",
      "+.visualstudio.com",
      "*.vsassets.io",
      "*.vstoken.visualstudio.com",
      "+.vo.msecnd.net",
      "+.aspnetcdn.com",
      "+.microsoft.com",
      "+.msn.com",
      "+.windows.com",
      "+.microsoftonline.com",
      "+.office.com",
      "+.office365.com",
      "+.outlook.com",
      "+.sharepoint.com",
      "broadcast.xboxlive.com",
      "cert.mcafee.com",
      "download.mcafee.com",
      "*.mcafee.com",
      "*.mcafee.com.cn",
      "*.mcafee.com.hk",
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
    QUIC: { ports: [443, 8443] }

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
  httpdns: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/httpdns.yaml", path: ./ruleset/httpdns.yaml, interval: 86400 }
  advertising: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.yaml", path: ./ruleset/advertising.yaml, interval: 86400 }
  privacy: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/privacy.yaml", path: ./ruleset/privacy.yaml, interval: 86400 }
  category-ads-all: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.yaml", path: ./ruleset/category-ads-all.yaml, interval: 86400 }
  category-ai-chat-!cn: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-chat-!cn.yaml", path: ./ruleset/category-ai-chat-!cn.yaml, interval: 86400 }
  category-media: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-media.yaml", path: ./ruleset/category-media.yaml, interval: 86400 }
  category-games: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-games.yaml", path: ./ruleset/category-games.yaml, interval: 86400 }
  category-social-media-!cn: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-social-media-!cn.yaml", path: ./ruleset/category-social-media-!cn.yaml, interval: 86400 }
  category-dev: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-dev.yaml", path: ./ruleset/category-dev.yaml, interval: 86400 }
  category-scholar-!cn: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-scholar-!cn.yaml", path: ./ruleset/category-scholar-!cn.yaml, interval: 86400 }
  speedtest: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/speedtest.yaml", path: ./ruleset/speedtest.yaml, interval: 86400 }

  # AI Services
  openai: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/openai.yaml", path: ./ruleset/openai.yaml, interval: 86400 }
  anthropic: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/anthropic.yaml", path: ./ruleset/anthropic.yaml, interval: 86400 }
  google-gemini: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google-gemini.yaml", path: ./ruleset/google-gemini.yaml, interval: 86400 }
  deepseek: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/deepseek.yaml", path: ./ruleset/deepseek.yaml, interval: 86400 }
  perplexity: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/perplexity.yaml", path: ./ruleset/perplexity.yaml, interval: 86400 }

  # Streaming & Media
  youtube: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.yaml", path: ./ruleset/youtube.yaml, interval: 86400 }
  netflix: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/netflix.yaml", path: ./ruleset/netflix.yaml, interval: 86400 }
  disney: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/disney.yaml", path: ./ruleset/disney.yaml, interval: 86400 }
  hbo: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hbo.yaml", path: ./ruleset/hbo.yaml, interval: 86400 }
  amazon: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/amazon.yaml", path: ./ruleset/amazon.yaml, interval: 86400 }
  bahamut: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bahamut.yaml", path: ./ruleset/bahamut.yaml, interval: 86400 }
  spotify: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/spotify.yaml", path: ./ruleset/spotify.yaml, interval: 86400 }
  abema: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/abema.yaml", path: ./ruleset/abema.yaml, interval: 86400 }
  biliintl: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/biliintl.yaml", path: ./ruleset/biliintl.yaml, interval: 86400 }
  pixiv: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/pixiv.yaml", path: ./ruleset/pixiv.yaml, interval: 86400 }
  viu: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/viu.yaml", path: ./ruleset/viu.yaml, interval: 86400 }
  dazn: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/dazn.yaml", path: ./ruleset/dazn.yaml, interval: 86400 }
  tidal: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tidal.yaml", path: ./ruleset/tidal.yaml, interval: 86400 }

  # Social Media
  telegram: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/telegram.yaml", path: ./ruleset/telegram.yaml, interval: 86400 }
  facebook: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/facebook.yaml", path: ./ruleset/facebook.yaml, interval: 86400 }
  instagram: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/instagram.yaml", path: ./ruleset/instagram.yaml, interval: 86400 }
  twitter: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/twitter.yaml", path: ./ruleset/twitter.yaml, interval: 86400 }
  tiktok: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tiktok.yaml", path: ./ruleset/tiktok.yaml, interval: 86400 }
  discord: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/discord.yaml", path: ./ruleset/discord.yaml, interval: 86400 }
  bluesky: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bluesky.yaml", path: ./ruleset/bluesky.yaml, interval: 86400 }
  signal: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/signal.yaml", path: ./ruleset/signal.yaml, interval: 86400 }
  whatsapp: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/whatsapp.yaml", path: ./ruleset/whatsapp.yaml, interval: 86400 }
  line: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/line.yaml", path: ./ruleset/line.yaml, interval: 86400 }

  # Games
  steam: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/steam.yaml", path: ./ruleset/steam.yaml, interval: 86400 }
  epicgames: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/epicgames.yaml", path: ./ruleset/epicgames.yaml, interval: 86400 }
  ea: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ea.yaml", path: ./ruleset/ea.yaml, interval: 86400 }
  ubisoft: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ubisoft.yaml", path: ./ruleset/ubisoft.yaml, interval: 86400 }
  blizzard: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/blizzard.yaml", path: ./ruleset/blizzard.yaml, interval: 86400 }
  nintendo: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/nintendo.yaml", path: ./ruleset/nintendo.yaml, interval: 86400 }
  playstation: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/playstation.yaml", path: ./ruleset/playstation.yaml, interval: 86400 }
  xbox: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/xbox.yaml", path: ./ruleset/xbox.yaml, interval: 86400 }
  riot: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/riot.yaml", path: ./ruleset/riot.yaml, interval: 86400 }
  hoyoverse: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hoyoverse.yaml", path: ./ruleset/hoyoverse.yaml, interval: 86400 }

  # Developer & Tools
  github: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/github.yaml", path: ./ruleset/github.yaml, interval: 86400 }
  gitlab: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gitlab.yaml", path: ./ruleset/gitlab.yaml, interval: 86400 }
  microsoft: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft.yaml", path: ./ruleset/microsoft.yaml, interval: 86400 }
  apple: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.yaml", path: ./ruleset/apple.yaml, interval: 86400 }
  appletv: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple-tvplus.yaml", path: ./ruleset/appletv.yaml, interval: 86400 }
  applemusic: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo-lite/geosite/applemusic.yaml", path: ./ruleset/applemusic.yaml, interval: 86400 }
  notion: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/notion.yaml", path: ./ruleset/notion.yaml, interval: 86400 }
  canva: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/canva.yaml", path: ./ruleset/canva.yaml, interval: 86400 }
  docker: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/docker.yaml", path: ./ruleset/docker.yaml, interval: 86400 }
  jetbrains: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/jetbrains.yaml", path: ./ruleset/jetbrains.yaml, interval: 86400 }
  adobe: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/adobe.yaml", path: ./ruleset/adobe.yaml, interval: 86400 }

  # General GeoData
  google: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google.yaml", path: ./ruleset/google.yaml, interval: 86400 }
  geolocation-cn: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-cn.yaml", path: ./ruleset/geolocation-cn.yaml, interval: 86400 }
  geolocation-!cn: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-!cn.yaml", path: ./ruleset/geolocation-!cn.yaml, interval: 86400 }
  private: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/private.yaml", path: ./ruleset/private.yaml, interval: 86400 }
  cn: { type: http, format: yaml, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/cn.yaml", path: ./ruleset/cn.yaml, interval: 86400 }

rules:
  # HttpDNS Protection
  - RULE-SET,httpdns,🛡️ 隐私防护
  - RULE-SET,advertising,🛡️ 隐私防护
  - RULE-SET,privacy,🛡️ 隐私防护

   # NTP & Speedtest
  - RULE-SET,speedtest,🧪 测速专线
  - DST-PORT,123,🕓 NTP 服务

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
  
  # ssh
  - DST-PORT,22,DIRECT

  # Local/Direct Rules
  - IP-CIDR,10.0.0.0/8,DIRECT
  - IP-CIDR,100.64.0.0/10,DIRECT
  - IP-CIDR,172.16.0.0/12,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT
  - RULE-SET,private,🏠 私有网络,no-resolve
  - RULE-SET,geolocation-cn,🔒 国内服务
  - RULE-SET,cn,🔒 国内服务,no-resolve

  # Global Logic
  - RULE-SET,google,🔍 谷歌服务
  - RULE-SET,geolocation-!cn,🌐 非中国
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
