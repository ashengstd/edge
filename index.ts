import { configMihomoHeader } from './templates/mihomo/header';
import { configMihomoGroupsHeader, configMihomoGroupsMid } from './templates/mihomo/groups';
import { configMihomoFooter } from './templates/mihomo/footer';
import { configStashHeader } from './templates/stash/header';
import { configStashGroupsHeader, configStashGroupsMid } from './templates/stash/groups';
import { configStashFooter } from './templates/stash/footer';
import { configRuleProviders } from './templates/shared/rule-providers';
import { configRules } from './templates/shared/rules';

interface Subscription {
  name: string;
  url: string;
}

function parseProxyUri(uri: string): string {
  if (!uri) return '';

  const uris = uri.split(/[|\n]/).filter(u => u.trim());
  let yamlResult = 'proxies:\n';

  for (const u of uris) {
    const trimmedUri = u.trim();
    if (!trimmedUri.includes('://') && !trimmedUri.startsWith('vmess://')) {
      yamlResult += trimmedUri.startsWith('  -') ? trimmedUri + '\n' : `  - ${trimmedUri}\n`;
      continue;
    }

    try {
      if (trimmedUri.startsWith('vmess://')) {
        const vmessData = JSON.parse(atob(trimmedUri.replace('vmess://', '')));
        yamlResult += `  - name: ${vmessData.ps || 'VMess-Proxy'}
    type: vmess
    server: ${vmessData.add}
    port: ${vmessData.port}
    uuid: ${vmessData.id}
    alterId: ${vmessData.aid || 0}
    cipher: ${vmessData.scy || 'auto'}
    udp: true
    tls: ${vmessData.tls === 'tls'}
    skip-cert-verify: true
`;
        if (vmessData.sni) yamlResult += `    servername: ${vmessData.sni}\n`;
        if (vmessData.net === 'ws') {
          yamlResult += `    network: ws\n    ws-opts:\n      path: ${vmessData.path || '/'}\n`;
          if (vmessData.host) yamlResult += `      headers:\n        Host: ${vmessData.host}\n`;
        } else if (vmessData.net === 'grpc') {
          yamlResult += `    network: grpc\n    grpc-opts:\n      serviceName: ${vmessData.path || ''}\n`;
        }
        continue;
      }

      let uriToParse = trimmedUri;
      const portRangeMatch = trimmedUri.match(/:(\d+-\d+)([\?#]|$)/);
      if (portRangeMatch) {
        uriToParse = trimmedUri.replace(portRangeMatch[1], '443');
      }

      const url = new URL(uriToParse);
      const protocol = url.protocol.replace(':', '');
      const name = decodeURIComponent(url.hash.substring(1)) || `${protocol.toUpperCase()}-Proxy`;
      const hostname = url.hostname;
      const port = portRangeMatch ? portRangeMatch[1] : (url.port || (protocol === 'vmess' ? '80' : '443'));
      const mainPort = port.includes('-') ? port.split('-')[0] : port;
      const password = decodeURIComponent(url.username || url.password || url.searchParams.get('auth') || '');

      if (protocol === 'hysteria2') {
        const sni = url.searchParams.get('sni') || hostname;
        const skipCertVerify = url.searchParams.get('insecure') === '1' || url.searchParams.get('insecure') === 'true';
        const alpn = url.searchParams.get('alpn')?.split(',') || ['h3'];
        const ports = url.searchParams.get('mport') || url.searchParams.get('ports') || port;
        const udp = url.searchParams.get('udp') !== 'false';
        const obfs = url.searchParams.get('obfs') || '';
        const obfsPassword = url.searchParams.get('obfs-password') || '';

        yamlResult += `  - name: ${name}
    type: hysteria2
    server: ${hostname}
    port: ${mainPort}
    password: ${password}
    sni: ${sni}
    skip-cert-verify: ${skipCertVerify}
    alpn: [${alpn.join(', ')}]
    udp: ${udp}
`;
        if (ports) yamlResult += `    ports: ${ports}\n`;
        if (obfs) {
          yamlResult += `    obfs: ${obfs}\n`;
          if (obfsPassword) yamlResult += `    obfs-password: ${obfsPassword}\n`;
        }
      } else if (protocol === 'vless') {
        yamlResult += `  - name: ${name}
    type: vless
    server: ${hostname}
    port: ${mainPort}
    uuid: ${url.username}
    udp: true
    tls: ${url.searchParams.get('security') === 'tls' || url.searchParams.get('security') === 'reality'}
    skip-cert-verify: true
`;
        const flow = url.searchParams.get('flow');
        if (flow) yamlResult += `    flow: ${flow}\n`;
        const network = url.searchParams.get('type') || 'tcp';
        yamlResult += `    network: ${network}\n`;
        if (network === 'ws') {
          yamlResult += `    ws-opts:\n      path: ${url.searchParams.get('path') || '/'}\n`;
          if (url.searchParams.get('host')) yamlResult += `      headers:\n        Host: ${url.searchParams.get('host')}\n`;
        } else if (network === 'grpc') {
          yamlResult += `    grpc-opts:\n      serviceName: ${url.searchParams.get('serviceName') || ''}\n`;
        }
        if (url.searchParams.get('security') === 'reality') {
          yamlResult += `    reality-opts:\n      public-key: ${url.searchParams.get('pbk') || ''}\n      short-id: ${url.searchParams.get('sid') || ''}\n`;
        }
        if (url.searchParams.get('sni')) yamlResult += `    servername: ${url.searchParams.get('sni')}\n`;
      } else if (protocol === 'trojan') {
        yamlResult += `  - name: ${name}
    type: trojan
    server: ${hostname}
    port: ${mainPort}
    password: ${url.username}
    udp: true
    skip-cert-verify: true
    sni: ${url.searchParams.get('sni') || hostname}
`;
      } else if (protocol === 'ss') {
        let method = 'aes-256-gcm';
        let userPass = url.username;
        if (!userPass.includes(':')) {
          try {
            const decoded = atob(userPass);
            if (decoded.includes(':')) {
              [method, userPass] = decoded.split(':');
            }
          } catch (e) {}
        } else {
          [method, userPass] = userPass.split(':');
        }
        yamlResult += `  - name: ${name}
    type: ss
    server: ${hostname}
    port: ${mainPort}
    cipher: ${method}
    password: ${userPass}
    udp: true
`;
      } else {
        yamlResult += `  - name: ${name}
    type: ${protocol}
    server: ${hostname}
    port: ${mainPort}
    udp: true
`;
      }
    } catch (e) {
      if (!u.includes('://')) {
        yamlResult += trimmedUri.startsWith('  -') ? trimmedUri + '\n' : `  - ${trimmedUri}\n`;
      }
    }
  }
  return yamlResult;
}

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Config type: 'stash' for iOS Stash app, default is mihomo/clash-meta
    const configType = searchParams.get('type')?.toLowerCase() || 'mihomo';
    const isStash = configType === 'stash';

    const providedSecret = searchParams.get('secret') || 'edge-default';

    const subscriptions: Subscription[] = [];

    for (const [key, value] of searchParams.entries()) {
      if (!key || !value || key === 'secret' || key === 'proxies' || key === 'type') continue;
      if (value.startsWith('http://') || value.startsWith('https://')) {
        subscriptions.push({ name: key, url: value });
      }
    }

    if (subscriptions.length === 0 && !searchParams.get('proxies')) {
      return new Response(
        'No subscriptions found. Usage: ?secret=YOUR_SECRET&Name1=URL1&proxies=YAML_PROXIES&type=stash',
        { status: 400 }
      );
    }

    // Parse custom proxies
    let customProxies = searchParams.get('proxies') || '';
    let customProxyNames: string[] = [];

    if (customProxies) {
      const lines = customProxies.split(/[|\n]/).filter(l => l.trim());
      for (const line of lines) {
        if (line.includes('#')) {
          customProxyNames.push(decodeURIComponent(line.split('#')[1].trim()));
        } else if (line.startsWith('vmess://')) {
          try {
            const vmessData = JSON.parse(atob(line.replace('vmess://', '')));
            customProxyNames.push(vmessData.ps || 'VMess-Proxy');
          } catch (e) {}
        } else {
          const nameMatch = line.match(/- name:\s*['"]?([^'"]+)['"]?/);
          if (nameMatch) customProxyNames.push(nameMatch[1]);
        }
      }

      if (customProxies.includes('://')) {
        customProxies = parseProxyUri(customProxies);
      } else {
        customProxies = `proxies:\n${customProxies.split('\n').map(l => l.startsWith('  -') ? l : `  - ${l}`).join('\n')}\n`;
      }
    }

    // Build proxy-providers and dynamic groups
    let proxyProvidersSection = 'proxy-providers:\n';
    let dynamicGroupsSection = '';
    const providerNames: string[] = [];
    const autoGroupNames: string[] = [];

    // User-Agent adapts to config type
    const userAgent = isStash ? 'Stash' : 'clash.meta';

    subscriptions.forEach((sub) => {
      const { name, url: subUrl } = sub;
      providerNames.push(name);

      const autoGroupName = `⚡ ${name} 自动选择`;
      autoGroupNames.push(autoGroupName);

      const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();

      proxyProvidersSection += `  ${name}:
    type: http
    url: "${subUrl}"
    path: ./providers/${safeName}.yaml
    interval: 3600
    health-check:
      enable: true
      url: "https://www.gstatic.com/generate_204"
      interval: 300
      lazy: true
    header:
      User-Agent:
        - "${userAgent}"
`;

      dynamicGroupsSection += `  - name: ${name}
    type: select
    use: [${name}]
  - name: ${autoGroupName}
    type: url-test
    use: [${name}]
    url: https://www.gstatic.com/generate_204
    interval: 300
    lazy: false
`;
    });

    const providersList = providerNames.join(', ');
    const autoGroupsList = autoGroupNames.join(', ');

    // Self-hosted group
    const configSelfHostedGroup = customProxyNames.length > 0
      ? `  - name: Self-Hosted\n    type: select\n    proxies: [${customProxyNames.join(', ')}]\n`
      : '';
    const selfHostedPlaceholder = customProxyNames.length > 0 ? 'Self-Hosted' : '';

    // Select the right templates based on config type
    const tplGroupsHeader = isStash ? configStashGroupsHeader : configMihomoGroupsHeader;
    const tplGroupsMid = isStash ? configStashGroupsMid : configMihomoGroupsMid;
    const tplHeader = isStash ? configStashHeader : configMihomoHeader.replace(/{{SECRET}}/g, providedSecret);
    const tplFooter = isStash ? configStashFooter : configMihomoFooter;

    const fillPlaceholders = (s: string) => s
      .replace(/{{PROVIDERS_LIST}}/g, providersList)
      .replace(/{{AUTO_GROUPS_LIST}}/g, autoGroupsList)
      .replace(/{{SELF_HOSTED_GROUP}}/g, selfHostedPlaceholder)
      // Clean up any trailing ", ]" or ",  ]" caused by empty placeholders
      .replace(/,\s*]/g, ']')
      // Clean up consecutive ", ," from multiple empty expansions
      .replace(/,\s*,/g, ',');

    const groupsHeader = fillPlaceholders(tplGroupsHeader);
    const groupsMid = fillPlaceholders(tplGroupsMid);

    // groupsHeader already starts with "proxy-groups:\n"
    const finalYaml = [
      tplHeader,
      subscriptions.length > 0 ? proxyProvidersSection : '',
      customProxies,
      groupsHeader,
      configSelfHostedGroup,
      dynamicGroupsSection,
      groupsMid,
      tplFooter,
      configRuleProviders,
      configRules,
    ].join('\n');

    return new Response(finalYaml, {
      headers: {
        'content-type': 'text/yaml; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  },
};
