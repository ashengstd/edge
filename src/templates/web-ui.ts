const webUIHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edge Subscription Generator</title>
    <style>
        :root {
            --bg: #0f172a;
            --surface: #1e293b;
            --primary: #3b82f6;
            --primary-hover: #2563eb;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --border: #334155;
            --success: #10b981;
        }

        @media (prefers-color-scheme: light) {
            :root {
                --bg: #f8fafc;
                --surface: #ffffff;
                --primary: #2563eb;
                --primary-hover: #1d4ed8;
                --text-main: #0f172a;
                --text-muted: #64748b;
                --border: #e2e8f0;
            }
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        body {
            background-color: var(--bg);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
        }

        .container {
            background: var(--surface);
            max-width: 600px;
            width: 100%;
            padding: 2.5rem;
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--border);
            animation: slideUp 0.4s ease-out;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        h1 {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        p.subtitle {
            color: var(--text-muted);
            margin-bottom: 2rem;
            font-size: 0.95rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--text-main);
        }

        textarea, input[type="text"], select {
            width: 100%;
            padding: 0.75rem 1rem;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-main);
            font-size: 0.95rem;
            transition: all 0.2s;
        }

        textarea {
            min-height: 120px;
            resize: vertical;
            font-family: inherit;
        }

        textarea:focus, input[type="text"]:focus, select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        button.generate-btn {
            width: 100%;
            padding: 1rem;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
            margin-top: 1rem;
        }

        button.generate-btn:hover {
            background: var(--primary-hover);
        }

        button.generate-btn:active {
            transform: scale(0.98);
        }

        .result-box {
            margin-top: 2rem;
            padding: 1rem;
            background: var(--bg);
            border-radius: 8px;
            border: 1px dashed var(--border);
            display: none;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .result-url {
            word-break: break-all;
            font-family: monospace;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 1rem;
            padding: 0.5rem;
            background: rgba(0,0,0,0.1);
            border-radius: 4px;
        }

        button.copy-btn {
            background: transparent;
            color: var(--primary);
            border: 1px solid var(--primary);
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            width: 100%;
        }

        button.copy-btn:hover {
            background: rgba(59, 130, 246, 0.1);
        }
        
        button.copy-btn.success {
            background: var(--success);
            color: white;
            border-color: var(--success);
        }

    </style>
</head>
<body>

    <div class="container">
        <h1>Edge Subscription</h1>
        <p class="subtitle">Convert your proxy URI links into Cloudflare Worker configs</p>

        <div class="form-group">
            <label for="proxies">Proxy Links (vless://, hysteria2://, tuic://, etc.)</label>
            <textarea id="proxies" placeholder="Paste your proxy uris here separated by newline..." spellcheck="false"></textarea>
        </div>

        <div class="form-group">
            <label for="configType">Template Type</label>
            <select id="configType">
                <option value="mihomo">Mihomo / Clash Meta</option>
                <option value="stash">Stash iOS (Full Rules)</option>
                <option value="stash-mini">Stash iOS Mini (Low memory <50MB)</option>
            </select>
        </div>

        <button class="generate-btn" onclick="generateUrl()">Generate Subscription</button>

        <div class="result-box" id="result-box">
            <label>Your Subscription URL</label>
            <div class="result-url" id="result-url"></div>
            <button class="copy-btn" id="copy-btn" onclick="copyUrl()">Copy to Clipboard</button>
        </div>
    </div>

    <script>
        function generateUrl() {
            const rawProxies = document.getElementById('proxies').value.trim();
            const type = document.getElementById('configType').value;
            
            if (!rawProxies) {
                alert('Please enter at least one proxy link!');
                return;
            }

            const url = new URL(window.location.origin);
            url.searchParams.set('type', type);
            
            // Re-encode newlines nicely for the query param
            const proxiesParam = rawProxies.split('\\n').map(l => l.trim()).filter(Boolean).join('\\n');
            url.searchParams.set('proxies', proxiesParam);

            const finalUrl = url.toString();
            
            document.getElementById('result-url').textContent = finalUrl;
            document.getElementById('result-box').style.display = 'block';
            
            // Reset copy button
            const copyBtn = document.getElementById('copy-btn');
            copyBtn.textContent = 'Copy to Clipboard';
            copyBtn.classList.remove('success');
        }

        function copyUrl() {
            const textToCopy = document.getElementById('result-url').textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const btn = document.getElementById('copy-btn');
                btn.textContent = 'Copied!';
                btn.classList.add('success');
                setTimeout(() => {
                    btn.textContent = 'Copy to Clipboard';
                    btn.classList.remove('success');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    </script>
</body>
</html>`;

export default webUIHtml;
