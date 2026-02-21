// Mihomo/Meta header configuration
// Includes TUN, external-controller, and all Mihomo-specific settings.

export const configMihomoHeader = `tun:
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
