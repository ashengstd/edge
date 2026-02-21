// Stash iOS proxy-groups template
//
// Node chain implementation for Stash:
// Stash supports dialer-proxy (https://stash.wiki/en/proxy-protocols/dialer-proxy)
// which can reference a strategy group as its upstream.
//
// To use node chaining in Stash:
//   1. In your proxy config, add "dialer-proxy: 🏮 入口节点" to your exit proxy
//   2. The exit proxy will then tunnel through whichever node is selected in 🏮 入口节点
//
// Example in proxies section:
//   - name: My-Exit-Node
//     type: vless
//     server: exit.example.com
//     port: 443
//     ...
//     dialer-proxy: "🏮 入口节点"   <-- traffic goes through 入口节点 first
//
// Note: relay proxy-group type is NOT supported in Stash.

export const configStashGroupsHeader = `proxy-groups:
  - name: 🚀 节点选择
    type: select
    proxies: [DIRECT, REJECT, {{AUTO_GROUPS_LIST}}, {{PROVIDERS_LIST}}, {{SELF_HOSTED_GROUP}}]

  - name: 🏮 入口节点
    type: select
    include-all-proxies: true
    proxies: [DIRECT, {{AUTO_GROUPS_LIST}}, {{PROVIDERS_LIST}}, {{SELF_HOSTED_GROUP}}]
    # Set dialer-proxy: "🏮 入口节点" on your exit proxy to enable chaining

  - name: 🛫 出口节点
    type: select
    include-all-proxies: true
    proxies: [DIRECT, {{AUTO_GROUPS_LIST}}, {{PROVIDERS_LIST}}, {{SELF_HOSTED_GROUP}}]
`;

// Stash mid groups — same categories as Mihomo
export const configStashGroupsMid = `  - name: 🛑 广告拦截
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
