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
    proxies: [DIRECT, REJECT, {{AUTO_GROUPS_LIST}}, {{PROVIDERS_LIST}}]
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
      "stun.*.*.*",
      "stun.*.*",
      time.windows.com,
      time.nist.gov,
      time.apple.com,
      time.asia.apple.com,
      "*.ntp.org.cn",
      "*.openwrt.pool.ntp.org",
      time1.cloud.tencent.com,
      time.ustc.edu.cn,
      pool.ntp.org,
      ntp.ubuntu.com,
      ntp.aliyun.com,
      ntp1.aliyun.com,
      ntp2.aliyun.com,
      ntp3.aliyun.com,
      ntp4.aliyun.com,
      ntp5.aliyun.com,
      ntp6.aliyun.com,
      ntp7.aliyun.com,
      time1.aliyun.com,
      time2.aliyun.com,
      time3.aliyun.com,
      time4.aliyun.com,
      time5.aliyun.com,
      time6.aliyun.com,
      time7.aliyun.com,
      "*.time.edu.cn",
      time1.apple.com,
      time2.apple.com,
      time3.apple.com,
      time4.apple.com,
      time5.apple.com,
      time6.apple.com,
      time7.apple.com,
      time1.google.com,
      time2.google.com,
      time3.google.com,
      time4.google.com,
      music.163.com,
      "*.music.163.com",
      "*.126.net",
      musicapi.taihe.com,
      music.taihe.com,
      songsearch.kugou.com,
      trackercdn.kugou.com,
      "*.kuwo.cn",
      api-jooxtt.sanook.com,
      api.joox.com,
      joox.com,
      y.qq.com,
      "*.y.qq.com",
      streamoc.music.tc.qq.com,
      mobileoc.music.tc.qq.com,
      isure.stream.qqmusic.qq.com,
      dl.stream.qqmusic.qq.com,
      aqqmusic.tc.qq.com,
      amobile.music.tc.qq.com,
      "*.xiami.com",
      "*.music.migu.cn",
      music.migu.cn,
      "*.msftconnecttest.com",
      "*.msftncsi.com",
      localhost.ptlogin2.qq.com,
      "*.*.*.srv.nintendo.net",
      "*.*.stun.playstation.net",
      "xbox.*.*.microsoft.com",
      "*.ipv6.microsoft.com",
      "*.*.xboxlive.com",
      speedtest.cros.wr.pvp.net,
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
  category-ads-all: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ads-all.mrs", path: ./ruleset/category-ads-all.mrs, interval: 86400 }
  category-ai-chat-!cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-ai-chat-!cn.mrs", path: ./ruleset/category-ai-chat-!cn.mrs, interval: 86400 }
  youtube: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/youtube.mrs", path: ./ruleset/youtube.mrs, interval: 86400 }
  google: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/google.mrs", path: ./ruleset/google.mrs, interval: 86400 }
  private: { type: http, format: mrs, behavior: ipcidr, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/private.mrs", path: ./ruleset/private.mrs, interval: 86400 }
  geolocation-cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-cn.mrs", path: ./ruleset/geolocation-cn.mrs, interval: 86400 }
  cn: { type: http, format: mrs, behavior: ipcidr, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geoip/cn.mrs", path: ./ruleset/cn.mrs, interval: 86400 }
  telegram: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/telegram.mrs", path: ./ruleset/telegram.mrs, interval: 86400 }
  github: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/github.mrs", path: ./ruleset/github.mrs, interval: 86400 }
  gitlab: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/gitlab.mrs", path: ./ruleset/gitlab.mrs, interval: 86400 }
  microsoft: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/microsoft.mrs", path: ./ruleset/microsoft.mrs, interval: 86400 }
  apple: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/apple.mrs", path: ./ruleset/apple.mrs, interval: 86400 }
  facebook: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/facebook.mrs", path: ./ruleset/facebook.mrs, interval: 86400 }
  instagram: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/instagram.mrs", path: ./ruleset/instagram.mrs, interval: 86400 }
  twitter: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/twitter.mrs", path: ./ruleset/twitter.mrs, interval: 86400 }
  tiktok: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/tiktok.mrs", path: ./ruleset/tiktok.mrs, interval: 86400 }
  linkedin: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/linkedin.mrs", path: ./ruleset/linkedin.mrs, interval: 86400 }
  netflix: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/netflix.mrs", path: ./ruleset/netflix.mrs, interval: 86400 }
  hulu: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hulu.mrs", path: ./ruleset/hulu.mrs, interval: 86400 }
  disney: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/disney.mrs", path: ./ruleset/disney.mrs, interval: 86400 }
  hbo: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/hbo.mrs", path: ./ruleset/hbo.mrs, interval: 86400 }
  amazon: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/amazon.mrs", path: ./ruleset/amazon.mrs, interval: 86400 }
  bahamut: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/bahamut.mrs", path: ./ruleset/bahamut.mrs, interval: 86400 }
  steam: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/steam.mrs", path: ./ruleset/steam.mrs, interval: 86400 }
  epicgames: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/epicgames.mrs", path: ./ruleset/epicgames.mrs, interval: 86400 }
  ea: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ea.mrs", path: ./ruleset/ea.mrs, interval: 86400 }
  ubisoft: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/ubisoft.mrs", path: ./ruleset/ubisoft.mrs, interval: 86400 }
  blizzard: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/blizzard.mrs", path: ./ruleset/blizzard.mrs, interval: 86400 }
  coursera: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/coursera.mrs", path: ./ruleset/coursera.mrs, interval: 86400 }
  edx: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/edx.mrs", path: ./ruleset/edx.mrs, interval: 86400 }
  udemy: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/udemy.mrs", path: ./ruleset/udemy.mrs, interval: 86400 }
  khanacademy: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/khanacademy.mrs", path: ./ruleset/khanacademy.mrs, interval: 86400 }
  category-scholar-!cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/category-scholar-!cn.mrs", path: ./ruleset/category-scholar-!cn.mrs, interval: 86400 }
  paypal: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/paypal.mrs", path: ./ruleset/paypal.mrs, interval: 86400 }
  visa: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/visa.mrs", path: ./ruleset/visa.mrs, interval: 86400 }
  mastercard: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/mastercard.mrs", path: ./ruleset/mastercard.mrs, interval: 86400 }
  stripe: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/stripe.mrs", path: ./ruleset/stripe.mrs, interval: 86400 }
  wise: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/wise.mrs", path: ./ruleset/wise.mrs, interval: 86400 }
  aws: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/aws.mrs", path: ./ruleset/aws.mrs, interval: 86400 }
  azure: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/azure.mrs", path: ./ruleset/azure.mrs, interval: 86400 }
  digitalocean: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/digitalocean.mrs", path: ./ruleset/digitalocean.mrs, interval: 86400 }
  heroku: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/heroku.mrs", path: ./ruleset/heroku.mrs, interval: 86400 }
  dropbox: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/dropbox.mrs", path: ./ruleset/dropbox.mrs, interval: 86400 }
  geolocation-!cn: { type: http, format: mrs, behavior: domain, url: "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/meta/geo/geosite/geolocation-!cn.mrs", path: ./ruleset/geolocation-!cn.mrs, interval: 86400 }

rules:
  - RULE-SET,category-ads-all,🛑 广告拦截
  - RULE-SET,category-ai-chat-!cn,💬 AI 服务
  - RULE-SET,youtube,📹 油管视频
  - RULE-SET,coursera,📚 教育资源
  - RULE-SET,edx,📚 教育资源
  - RULE-SET,udemy,📚 教育资源
  - RULE-SET,khanacademy,📚 教育资源
  - RULE-SET,category-scholar-!cn,📚 教育资源
  - RULE-SET,google,🔍 谷歌服务
  - RULE-SET,google,🔍 谷歌服务,no-resolve
  - RULE-SET,private,🏠 私有网络,no-resolve
  - RULE-SET,geolocation-cn,🔒 国内服务
  - RULE-SET,cn,🔒 国内服务,no-resolve
  - RULE-SET,telegram,📲 电报消息,no-resolve
  - RULE-SET,github,🐱 Github
  - RULE-SET,gitlab,🐱 Github
  - RULE-SET,microsoft,Ⓜ️ 微软服务
  - RULE-SET,apple,🍏 苹果服务
  - RULE-SET,facebook,🌐 社交媒体
  - RULE-SET,instagram,🌐 社交媒体
  - RULE-SET,twitter,🌐 社交媒体
  - RULE-SET,tiktok,🌐 社交媒体
  - RULE-SET,linkedin,🌐 社交媒体
  - RULE-SET,netflix,🎬 流媒体
  - RULE-SET,hulu,🎬 流媒体
  - RULE-SET,disney,🎬 流媒体
  - RULE-SET,hbo,🎬 流媒体
  - RULE-SET,amazon,🎬 流媒体
  - RULE-SET,bahamut,🎬 流媒体
  - RULE-SET,steam,🎮 游戏平台
  - RULE-SET,epicgames,🎮 游戏平台
  - RULE-SET,ea,🎮 游戏平台
  - RULE-SET,ubisoft,🎮 游戏平台
  - RULE-SET,blizzard,🎮 游戏平台
  - RULE-SET,paypal,💰 金融服务
  - RULE-SET,visa,💰 金融服务
  - RULE-SET,mastercard,💰 金融服务
  - RULE-SET,stripe,💰 金融服务
  - RULE-SET,wise,💰 金融服务
  - RULE-SET,aws,☁️ 云服务
  - RULE-SET,azure,☁️ 云服务
  - RULE-SET,digitalocean,☁️ 云服务
  - RULE-SET,heroku,☁️ 云服务
  - RULE-SET,dropbox,☁️ 云服务
  - RULE-SET,geolocation-!cn,🌐 非中国
  - MATCH,🐟 漏网之鱼
`;
