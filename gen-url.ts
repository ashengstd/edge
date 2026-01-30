import fs from 'fs';

/**
 * URL Generation Utility
 * Converts Proxy.yaml into a Cloudflare Worker URL.
 */

function generateUrl() {
    if (!fs.existsSync('Proxy.yaml')) {
        console.error('Proxy.yaml not found!');
        process.exit(1);
    }

    const yamlContent = fs.readFileSync('Proxy.yaml', 'utf-8');
    const lines = yamlContent.split('\n').map(l => l.trim()).filter(l => l);
    
    let secret = '';
    const providers: {name: string, url: string}[] = [];
    const proxies: any[] = [];
    
    let currentSection = '';
    let currentItem: any = null;

    for (const line of lines) {
        if (line.startsWith('provider:')) { currentSection = 'provider'; continue; }
        if (line.startsWith('proxy:')) { currentSection = 'proxy'; continue; }
        if (line.startsWith('secret:')) { secret = line.split(':')[1].trim().replace(/^["']|["']$/g, ''); continue; }

        if (line.startsWith('- name:')) {
            const name = line.replace('- name:', '').trim();
            currentItem = { name };
            if (currentSection === 'provider') providers.push(currentItem);
            else if (currentSection === 'proxy') proxies.push(currentItem);
        } else if (line.includes(':') && currentItem) {
            const [key, ...valParts] = line.split(':');
            const k = key.trim();
            const v = valParts.join(':').trim();
            currentItem[k] = v;
        }
    }

    // You should replace this with your actual worker domain
    const workerDomain = 'https://config.ascka.qzz.io/'; 
    const params = new URLSearchParams();
    
    if (secret) params.set('secret', secret);
    
    for (const p of providers) {
        if (p.name && p.url) {
            params.set(p.name, p.url);
        }
    }

    const proxyUris = proxies.map(p => {
        if (p.protocol === 'hysteria2') {
            const auth = p.password ? `${p.password}@` : '';
            const params = new URLSearchParams();
            if (p.sni) params.set('sni', p.sni);
            if (p.alpn) params.set('alpn', p.alpn);
            if (p.insecure) params.set('insecure', p.insecure);
            if (p.port) params.set('mport', p.port);
            params.set('udp', 'true');
            
            const query = params.toString();
            return `hysteria2://${auth}${p.server}:${p.port || 443}${query ? '?' + query : ''}#${encodeURIComponent(p.name)}`;
        }
        // Add more protocol mapping here if needed
        return '';
    }).filter(Boolean);

    if (proxyUris.length > 0) {
        params.set('proxies', proxyUris.join('\n'));
    }

    console.log('\n\x1b[32m✔ Worker URL Generated Successfully!\x1b[0m');
    console.log('\x1b[36m' + workerDomain + '?' + params.toString() + '\x1b[0m\n');
}

generateUrl();
