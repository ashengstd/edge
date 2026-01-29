import { 
  configHeader, 
  configGroupsHeader, 
  configGroupsMid, 
  configFooter 
} from './template';

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
      // If it's not a URI, might be raw YAML
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

      const url = new URL(trimmedUri);
      const protocol = url.protocol.replace(':', '');
      const name = decodeURIComponent(url.hash.substring(1)) || `${protocol.toUpperCase()}-Proxy`;
      const hostname = url.hostname;
      const port = url.port || '443';
      const password = decodeURIComponent(url.username || url.password || url.searchParams.get('auth') || '');

      if (protocol === 'hysteria2') {
        const sni = url.searchParams.get('sni') || hostname;
        const skipCertVerify = url.searchParams.get('insecure') === '1' || url.searchParams.get('insecure') === 'true';
        const alpn = url.searchParams.get('alpn')?.split(',') || ['h3'];
        const ports = url.searchParams.get('mport') || url.searchParams.get('ports') || '';
        const udp = url.searchParams.get('udp') !== 'false';
        const obfs = url.searchParams.get('obfs') || '';
        const obfsPassword = url.searchParams.get('obfs-password') || '';

        yamlResult += `  - name: ${name}
    type: hysteria2
    server: ${hostname}
    port: ${port}
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
    port: ${port}
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
    port: ${port}
    password: ${url.username}
    udp: true
    skip-cert-verify: true
    sni: ${url.searchParams.get('sni') || hostname}
`;
      } else if (protocol === 'ss') {
        // Handle ss://base64(method:password)@host:port
        let method = 'aes-256-gcm';
        let userPass = url.username;
        if (!userPass.includes(':')) {
           try {
             const decoded = atob(userPass);
             if (decoded.includes(':')) {
               [method, userPass] = decoded.split(':');
             }
           } catch(e) {}
        } else {
          [method, userPass] = userPass.split(':');
        }
        yamlResult += `  - name: ${name}
    type: ss
    server: ${hostname}
    port: ${port}
    cipher: ${method}
    password: ${userPass}
    udp: true
`;
      } else {
        // Default fallback
        yamlResult += `  - name: ${name}
    type: ${protocol}
    server: ${hostname}
    port: ${port}
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

    // Get the secret from parameters or use a default
    const providedSecret = searchParams.get('secret') || 'edge-default';
    
    // Create an array to store subscription info
    const subscriptions: Subscription[] = [];
    
    // Iterate over all parameters
    for (const [key, value] of searchParams.entries()) {
      // Basic validation: skip empty keys or values
      if (!key || !value || key === 'secret' || key === 'proxies') continue;
      
      // If the value looks like a URL, treat it as a subscription
      if (value.startsWith('http://') || value.startsWith('https://')) {
        subscriptions.push({
          name: key,
          url: value
        });
      }
    }

    if (subscriptions.length === 0 && !searchParams.get('proxies')) {
      return new Response('No subscriptions found. Usage: ?secret=YOUR_SECRET&Name1=URL1&proxies=YAML_PROXIES', { status: 400 });
    }

    // Get custom proxies from parameter if provided
    let customProxies = searchParams.get('proxies') || '';
    if (customProxies && customProxies.includes('://')) {
      customProxies = parseProxyUri(customProxies);
    }

    // Generate proxy-providers and dynamic groups
    let proxyProvidersSection = 'proxy-providers:\n';
    let dynamicGroupsSection = '';
    const providerNames: string[] = [];
    const autoGroupNames: string[] = [];
    
    subscriptions.forEach((sub, index) => {
      const { name, url: subUrl } = sub;
      providerNames.push(name);
      
      const autoGroupName = `⚡ ${name} 自动选择`;
      autoGroupNames.push(autoGroupName);

      // Add provider
      proxyProvidersSection += `  ${name}:
    type: http
    url: "${subUrl}"
    path: ./providers/sub${index + 1}.yaml
    interval: 3600
    health-check:
      enable: true
      url: "https://www.gstatic.com/generate_204"
      interval: 300
      lazy: true
    header:
      User-Agent:
        - "clash.meta"
`;

      // Add corresponding groups
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

    // Replace placeholders in templates
    let header = configHeader.replace(/{{SECRET}}/g, providedSecret);
    
    let groupsHeader = configGroupsHeader
      .replace(/{{PROVIDERS_LIST}}/g, providersList)
      .replace(/{{AUTO_GROUPS_LIST}}/g, autoGroupsList);
    
    let groupsMid = configGroupsMid
      .replace(/{{PROVIDERS_LIST}}/g, providersList)
      .replace(/{{AUTO_GROUPS_LIST}}/g, autoGroupsList);

    // Combine everything
    const finalYaml = `${header}
${subscriptions.length > 0 ? proxyProvidersSection : ''}
${customProxies}
${groupsHeader}${dynamicGroupsSection}${groupsMid}
${configFooter}`;

    return new Response(finalYaml, {
      headers: {
        'content-type': 'text/yaml; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  },
};
