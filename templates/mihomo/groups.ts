// Mihomo proxy-groups template
// Includes relay-based node chain (🔗 节点链) which is Mihomo/Meta-only.

// Header groups: node selection + relay chain
export const configMihomoGroupsHeader = `proxy-groups:
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

// Mid groups: all functional category groups
export const configMihomoGroupsMid = `  - name: 🛑 广告拦截
    type: select
    proxies: [REJECT, DIRECT, 🚀 节点选择, {{AUTO_GROUPS_LIST}}]

  - name: 🛡️ 隐私防护
    type: select
    proxies: [REJECT, DIRECT, 🚀 节点选择]

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

  - name: 💰 金融服务
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]

  - name: 📰 新闻资讯
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]

  - name: 🔞 成人内容
    type: select
    proxies: [🚀 节点选择, DIRECT, REJECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]

  - name: ☁️ 云服务
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

  - name: 🧪 测速专线
    type: select
    proxies: [🚀 节点选择, DIRECT, {{AUTO_GROUPS_LIST}}]
    include-all-proxies: true
    use: [{{PROVIDERS_LIST}}]

  - name: 🕓 NTP 服务
    type: select
    proxies: [DIRECT, 🚀 节点选择]
`;
