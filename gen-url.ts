import fs from 'fs';

/**
 * URL Generation Utility
 * Reads proxy.yaml and generates a Cloudflare Worker subscription URL.
 * 
 * Usage: bun gen-url.ts [--stash] [--stash-mini]
 *   --stash       Generate a Stash/iOS compatible URL (adds type=stash)
 *   --stash-mini  Generate a Stash/iOS low-memory URL (adds type=stash-mini, <50MB)
 */

function generateUrl() {
    const isStash = process.argv.includes('--stash');
    const isStashMini = process.argv.includes('--stash-mini');
    const configFile = 'proxy.yaml';

    if (!fs.existsSync(configFile)) {
        console.error(`\x1b[31m✘ ${configFile} not found!\x1b[0m`);
        console.error('Copy example.yaml to proxy.yaml and fill in your values.');
        process.exit(1);
    }

    const yamlContent = fs.readFileSync(configFile, 'utf-8');
    const lines = yamlContent.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
    
    let secret = '';
    let workerDomain = '';
    const providers: { name: string; url: string }[] = [];
    const proxies: any[] = [];

    let currentSection = '';
    let currentItem: any = null;

    for (const line of lines) {
        if (line.startsWith('worker:'))        { workerDomain = line.split(':').slice(1).join(':').trim().replace(/^["']|["']$/g, ''); continue; }
        if (line.startsWith('secret:'))        { secret = line.split(':').slice(1).join(':').trim().replace(/^["']|["']$/g, ''); continue; }
        if (line.startsWith('provider:'))      { currentSection = 'provider'; currentItem = null; continue; }
        if (line.startsWith('proxy:'))         { currentSection = 'proxy'; currentItem = null; continue; }

        if (line.startsWith('- name:')) {
            const name = line.replace('- name:', '').trim().replace(/^["']|["']$/g, '');
            currentItem = { name };
            if (currentSection === 'provider') providers.push(currentItem);
            else if (currentSection === 'proxy') proxies.push(currentItem);
        } else if (line.includes(':') && currentItem) {
            const colonIdx = line.indexOf(':');
            const k = line.slice(0, colonIdx).trim();
            const v = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
            currentItem[k] = v;
        }
    }

    if (!workerDomain) {
        workerDomain = 'https://your-worker.workers.dev/';
        console.warn('\x1b[33m⚠ No "worker:" field found in proxy.yaml, using placeholder URL\x1b[0m');
    }

    const params = new URLSearchParams();
    if (secret) params.set('secret', secret);
    if (isStashMini) params.set('type', 'stash-mini');
    else if (isStash) params.set('type', 'stash');

    // Add subscription providers
    for (const p of providers) {
        if (p.name && p.url) {
            params.set(p.name, p.url);
        }
    }

    // Convert proxy definitions to URI strings
    const proxyUris = proxies.flatMap(p => {
        const name = encodeURIComponent(p.name);
        const proto = p.protocol || p.type || '';

        if (proto === 'hysteria2') {
            const auth = p.password || p.auth || '';
            const server = p.server || '';
            // Support both single port and port range
            const port = p.port || p.ports?.split('-')[0] || '443';
            const q = new URLSearchParams();
            if (p.sni) q.set('sni', p.sni);
            if (p.alpn) q.set('alpn', p.alpn);
            if (p.insecure !== undefined) q.set('insecure', String(p.insecure));
            // Port hopping range
            const portRange = p.ports || (p.port && p.port.includes('-') ? p.port : '');
            if (portRange) q.set('mport', portRange);
            q.set('udp', 'true');
            return [`hysteria2://${auth}@${server}:${port}?${q.toString()}#${name}`];
        }

        if (proto === 'vless') {
            const uuid = p.uuid || '';
            const server = p.server || '';
            const port = p.port || '443';
            const q = new URLSearchParams();
            if (p.flow) q.set('flow', p.flow);
            if (p.network) q.set('type', p.network);
            if (p.sni || p.servername) q.set('sni', p.sni || p.servername);
            if (p.security) q.set('security', p.security);
            if (p['public-key']) q.set('pbk', p['public-key']);
            if (p['short-id']) q.set('sid', p['short-id']);
            return [`vless://${uuid}@${server}:${port}?${q.toString()}#${name}`];
        }

        if (proto === 'trojan') {
            const pw = p.password || '';
            const server = p.server || '';
            const port = p.port || '443';
            const q = new URLSearchParams();
            if (p.sni) q.set('sni', p.sni);
            return [`trojan://${pw}@${server}:${port}?${q.toString()}#${name}`];
        }

        if (proto === 'ss' || proto === 'shadowsocks') {
            const cipher = p.cipher || 'aes-256-gcm';
            const pw = p.password || '';
            const server = p.server || '';
            const port = p.port || '443';
            // SS URI: ss://base64(method:password)@host:port#name
            const userinfo = btoa(`${cipher}:${pw}`);
            return [`ss://${userinfo}@${server}:${port}#${name}`];
        }

        if (proto === 'vmess') {
            const obj = {
                v: '2', ps: p.name,
                add: p.server, port: p.port,
                id: p.uuid, aid: p.alterId || '0',
                scy: p.cipher || 'auto',
                net: p.network || 'tcp',
                tls: p.tls ? 'tls' : '',
                sni: p.sni || p.servername || '',
                path: p['ws-path'] || p.path || '',
                host: p['ws-host'] || p.host || '',
            };
            return [`vmess://${btoa(JSON.stringify(obj))}`];
        }

        console.warn(`\x1b[33m⚠ Unknown protocol "${proto}" for proxy "${p.name}", skipping\x1b[0m`);
        return [];
    }).filter(Boolean);

    if (proxyUris.length > 0) {
        params.set('proxies', proxyUris.join('\n'));
    }

    const base = workerDomain.replace(/\/$/, '');
    const finalUrl = `${base}/?${params.toString()}`;

    console.log('\n\x1b[32m✔ Worker URL Generated Successfully!\x1b[0m');
    if (isStashMini) console.log('\x1b[35m  Mode: Stash/iOS Mini (low-memory, <50MB)\x1b[0m');
    else if (isStash) console.log('\x1b[35m  Mode: Stash/iOS\x1b[0m');
    console.log('\x1b[36m' + finalUrl + '\x1b[0m\n');
}

generateUrl();
