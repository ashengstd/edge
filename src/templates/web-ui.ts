const webUIHtml = `<!DOCTYPE html>
<html lang="en" class="dark:bg-slate-900">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edge Subscription Generator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'media',
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                        primaryHover: '#2563eb',
                        bgDark: '#0f172a',
                        surfaceDark: '#1e293b',
                    }
                }
            }
        }
    </script>
    <style>
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.3s; }
        .animate-scaleIn { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    </style>
</head>
<body class="bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 min-h-screen flex items-center justify-center p-4 sm:p-6 antialiased selection:bg-blue-500/30">

    <div class="w-full max-w-2xl bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 animate-slideUp relative overflow-hidden">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
                <h1 class="text-3xl font-extrabold mb-2 bg-gradient-to-br from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight">
                    Edge Subscription
                </h1>
                <p class="text-gray-500 dark:text-slate-400 text-sm sm:text-base">
                    Convert your proxy endpoints & external subscriptions into Cloudflare configurations
                </p>
            </div>
            <button onclick="openModal()" class="shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 font-medium text-sm rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Add Node Link
            </button>
        </div>

        <!-- Proxies Section -->
        <div class="mb-6 space-y-2">
            <div class="flex items-center justify-between">
                <label for="proxies" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Self-Hosted Proxies
                </label>
                <span class="text-xs text-gray-400 dark:text-slate-500">vless, hysteria2, tuic...</span>
            </div>
            <textarea id="proxies" 
                placeholder="Paste your individual proxy uris here separated by newline...&#10;For example:&#10;tuic://uuid:password@host:port..." 
                spellcheck="false"
                class="w-full min-h-[140px] p-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono resize-y"></textarea>
        </div>

        <!-- External Subscriptions Section -->
        <div class="mb-6 space-y-3">
            <div class="flex items-center justify-between">
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    External Subscriptions <span class="text-gray-400 font-normal">(Optional)</span>
                </label>
            </div>
            <div id="subs-container" class="space-y-3">
                <!-- Subscription Rows go here -->
            </div>
            <button onclick="addSubRow()" class="w-full py-3 border border-dashed border-gray-300 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:text-blue-600 hover:border-blue-400 dark:hover:text-blue-400 dark:hover:border-blue-500 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                Add Subscription Provider
            </button>
        </div>

        <!-- Target Target Configuration -->
        <div class="mb-8 space-y-2">
            <label for="configType" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Template Configuration
            </label>
            <div class="relative">
                <select id="configType" class="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer appearance-none pr-10">
                    <option value="mihomo">Mihomo / Clash Meta</option>
                    <option value="stash">Stash iOS (Full Rules)</option>
                    <option value="stash-mini">Stash iOS Mini (Low memory &lt;50MB)</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <button onclick="generateUrl()" 
            class="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            Build Configuration API
        </button>

        <!-- Result Box -->
        <div id="result-box" class="mt-8 p-6 bg-gray-50 dark:bg-slate-900 rounded-xl border border-dashed border-gray-300 dark:border-slate-600 animate-fadeIn hidden">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Your API Subscription URL
            </label>
            <div id="result-url" class="break-all font-mono text-xs sm:text-sm text-gray-600 dark:text-slate-400 mb-4 p-4 bg-gray-200/50 dark:bg-black/20 rounded-lg select-all border border-gray-200 dark:border-slate-700/50"></div>
            
            <button id="copy-btn" onclick="copyUrl()" 
                class="w-full py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 dark:hover:border-slate-500 font-medium rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy to Clipboard</span>
            </button>
        </div>
    </div>

    <!-- Node Editor Modal -->
    <div id="node-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden animate-fadeIn">
        <div class="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl animate-scaleIn overflow-hidden border border-gray-200 dark:border-slate-600">
            <div class="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
                <h3 class="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Add Individual Node URI
                </h3>
                <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="p-6">
                <p class="text-sm text-gray-500 dark:text-slate-400 mb-4">Paste your proxy endpoint URI. This will append the raw textual representation to your self-hosted list.</p>
                <div class="space-y-4">
                    <div>
                        <input type="text" id="modal-node-input" placeholder="e.g. hysteria2://auth@host:port..." class="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono">
                    </div>
                </div>
            </div>
            <div class="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700 flex justify-end gap-3">
                <button onclick="closeModal()" class="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancel</button>
                <button onclick="commitModalNode()" class="px-5 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
                    Inject Link
                </button>
            </div>
        </div>
    </div>

    <script>
        // Init a single blank sub row
        let subCounter = 0;
        
        function addSubRow(nameVal = '', urlVal = '') {
            subCounter++;
            const id = \`sub-row-\${subCounter}\`;
            const container = document.getElementById('subs-container');
            
            const div = document.createElement('div');
            div.id = id;
            div.className = "flex items-start gap-2 animate-fadeIn";
            div.innerHTML = \`
                <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input type="text" placeholder="Name (e.g. Provider1)" value="\${nameVal}" class="sub-name-input col-span-1 p-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
                    <input type="text" placeholder="https://..." value="\${urlVal}" class="sub-url-input col-span-1 sm:col-span-2 p-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono">
                </div>
                <button onclick="removeSubRow('\${id}')" class="shrink-0 p-3 mt-1 sm:mt-0 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors" title="Remove Provider">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            \`;
            container.appendChild(div);
        }

        function removeSubRow(id) {
            const el = document.getElementById(id);
            if(el) el.remove();
        }

        // Add initial row automatically on load
        addSubRow();

        // Modal Logic
        function openModal() {
            document.getElementById('node-modal').classList.remove('hidden');
            document.getElementById('modal-node-input').focus();
        }
        function closeModal() {
            document.getElementById('node-modal').classList.add('hidden');
            document.getElementById('modal-node-input').value = '';
        }
        function commitModalNode() {
            const val = document.getElementById('modal-node-input').value.trim();
            if (val) {
                const proxyArea = document.getElementById('proxies');
                proxyArea.value = proxyArea.value ? proxyArea.value + '\\n' + val : val;
            }
            closeModal();
            // Highlight text area visually briefly to signal append
            const proxyArea = document.getElementById('proxies');
            proxyArea.classList.add('ring-2', 'ring-green-500');
            setTimeout(() => proxyArea.classList.remove('ring-2', 'ring-green-500'), 500);
        }

        // Generate Logic
        function generateUrl() {
            const rawProxies = document.getElementById('proxies').value.trim();
            const type = document.getElementById('configType').value;
            
            const url = new URL(window.location.origin);
            url.searchParams.set('type', type);

            // Harvest subscriptions from rows
            const subNames = document.querySelectorAll('.sub-name-input');
            const subUrls = document.querySelectorAll('.sub-url-input');
            let hasSub = false;
            for(let i = 0; i < subNames.length; i++) {
                const name = subNames[i].value.trim();
                const vUrl = subUrls[i].value.trim();
                if(name && vUrl) {
                    url.searchParams.set(name, vUrl);
                    hasSub = true;
                }
            }
            
            if (!rawProxies && !hasSub) {
                alert('Please provide at least a self-hosted proxy URI or an external subscription.');
                return;
            }

            if(rawProxies) {
                const proxiesParam = rawProxies.split('\\n').map(l => l.trim()).filter(Boolean).join('\\n');
                url.searchParams.set('proxies', proxiesParam);
            }

            const finalUrl = url.toString();
            
            document.getElementById('result-url').textContent = finalUrl;
            document.getElementById('result-box').classList.remove('hidden');
            
            // Reset copy button
            const copyBtn = document.getElementById('copy-btn');
            copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg><span>Copy to Clipboard</span>';
            copyBtn.className = "w-full py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 dark:hover:border-slate-500 font-medium rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95";
        }

        // Copy logic
        function copyUrl() {
            const textToCopy = document.getElementById('result-url').textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const btn = document.getElementById('copy-btn');
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span>Copied!</span>';
                btn.className = "w-full py-3 px-4 bg-green-500 text-white border-transparent shadow-lg shadow-green-500/30 font-medium rounded-xl transition-colors flex items-center justify-center gap-2";
                
                setTimeout(() => {
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg><span>Copy to Clipboard</span>';
                    btn.className = "w-full py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 dark:hover:border-slate-500 font-medium rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95";
                }, 2000);
            }).catch(err => console.error('Failed to copy: ', err));
        }
    </script>
</body>
</html>`;

export default webUIHtml;
