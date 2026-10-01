
require('./settings');
const { Telegraf, Context, Markup } = require('telegraf');
const { simple } = require("./lib/myfunc");
const { runtime } = require('./lib/myfunc1');
const fs = require('fs');
const os = require('os');
const ms = toMs = require('ms');
const speed = require('performance-now');
const axios = require('axios');
const chalk = require("chalk");
const express = require('express');
const JsConfuser = require('js-confuser');
const crypto = require('crypto');
global.crypto = crypto;
const mongoose = require('mongoose');
const o = fs.readFileSync(`./Media/image1.jpg`);

if (BOT_TOKEN == 'YOUR_TELEGRAM_BOT_TOKEN') {
    return console.log("No token detected");
}

const { Client } = require('ssh2');
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '');

// File to store all user IDs
const usersFile = 'users.json';
// Ensure the users file exists
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
}

async function saveUser(userId) {
    // Load existing users
    let users = [];
    if (fs.existsSync(usersFile)) {
        try {
            const data = fs.readFileSync(usersFile, 'utf8');
            users = JSON.parse(data);
        } catch (error) {
            console.error('Error reading users file:', error);
            users = [];
        }
    }

    // Check if the user already exists
    if (!users.includes(userId)) {
        users.push(userId); // Add the new user ID

        // Save the updated list of users
        try {
            fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
            console.log(`User ID ${userId} added to the users list.`);
        } catch (error) {
            console.error('Error writing to users file:', error);
        }
    }
}

let allUsers = JSON.parse(fs.readFileSync(usersFile));
const premium_file = 'lib/premium.json';
try {
    premiumUsers = JSON.parse(fs.readFileSync(premium_file));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}

const bot = new Telegraf(BOT_TOKEN);

async function startXeony() {
    bot.on('callback_query', async (leo) => {
        // Split the action and extract user ID
        const action = leo.callbackQuery.data.split(' ');
        const user_id = Number(action[1]);

        // Check if the callback is from the correct user
        if (leo.callbackQuery.from.id !== user_id) {
            return leo.answerCbQuery('Oof! this button is not for you!', {
                show_alert: true
            });
        }

        const timestampi = speed();
        const latensii = speed() - timestampi;
        const user = simple.getUserName(leo.callbackQuery.from);
        const pushname = user.full_name;
        const username = user.username ? user.username : "Deee908";
        const isCreator = [leo.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(username);

        lang.first_chat = (botName, userName) => {
            return `Hello ${userName}, I'm ${botName}. How can I assist you today?`;
        };
        
        const reply = async (text) => {
            for (let x of simple.range(0, text.length, 4096)) { // Split text to avoid overflow
                await leo.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                });
            }
        };
        
        try {
            switch (action[0]) {
  
            }
        } catch (e) {
            console.log(e);
        }
    });        
    
    bot.command('staf', async (leo) => {
        let user = simple.getUserName(leo.message.from);
        await leo.reply(lang.first_chat(BOT_NAME, user.full_name), {
            parse_mode: "MarkdownV2", // Updated to "MarkdownV2"
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'OWNER 🤝',
                        url: "https://t.me/Deee908"
                    }, {
                        text: 'CHANNEL 💀',
                        url: "https://t.me/+khnBWNHXQHg4YzQ0"
                    }]
                ]
            }
        });
    });

    bot.command('listprem', async (leo) => {
        const isOwner = global.DEVELOPER.includes(leo.message.from.id.toString());
        if (!isOwner) {
            return leo.reply(`Please dm ${OWNER_NAME} for buy.`);
        }
        try {
            const adminList = premiumUsers.length > 0 ? premiumUsers.join('\n') : "No admins found.";
            await leo.reply(`👮 Premium List:\n${adminList}`);
        } catch (error) {
            console.error('Error listing admins:', error);
            leo.reply('Error listing premium users.');
        }
    });

    bot.command("monitoruser", async (leo) => {
        const usersFile = Array.from(new Set([...allUsers, ...premiumUsers])); // Combine all users and premium users, remove duplicates

        let userList = "";
        for (const userId in usersFile) {
            const user = usersFile[userId];
            userList += `
- *ID:* ${userId}
 *Nickname:* ${user}`;
        }

        const message = `
👤 *List of Bot Users:*
${userList}
Total Users: ${Object.keys(usersFile).length}
        `;

        await leo.replyWithMarkdown(message);
    });

    bot.command('wamenu', async (leo) => {
        await leo.deleteMessage();
        const Reothermenu = `
┏━━━━━━𝐂͢𝐎͠𝐌𝐌͜𝐀𝐍𝐃━━━━━
  ☞ /connect <pair number to bot>
  ☞ /delpair <delete listpair number>
  ☞ /listpair <check listpair numbers> 
┗━━━━━━━━━━━━━━`;
        const photoUrl = "https://files.catbox.moe/mrvhx2.jpeg"; 
        const mainKeyboard = [
            [{
                text: "CONTACT OWNER",
                url: "https://t.me/Deee908"
            }],
        ];
        leo.replyWithPhoto(photoUrl, {
            caption: Reothermenu,
            reply_markup: {
                inline_keyboard: mainKeyboard
            }
        });
    });

    bot.command('ownermenu', async (leo) => {
        await leo.deleteMessage();
        const OwnMenu = `
┏━━━━━━𝐂͢𝐎͠𝐌𝐌͜𝐀𝐍𝐃━━━━━
  ☞ /runtime
  ☞ /ping
  ☞ /monitoruser
  ☞ /addprem 
  ☞ /delprem
  ☞ /listprem    
┗━━━━━━━━━━━━━━`;
        const photoUrl = "https://files.catbox.moe/mrvhx2.jpeg"; 
        const mainKeyboard = [
            [{
                text: "CONTACT OWNER",
                url: "https://t.me/Deee908"
            }],
        ];
        leo.replyWithPhoto(photoUrl, {
            caption: OwnMenu,
            reply_markup: {
                inline_keyboard: mainKeyboard
            }
        });
    });

    bot.command('toolmenu', async (leo) => {
        await leo.deleteMessage();
        const BugMenu = `
┏━━━━━━𝐂͢𝐎͠𝐌𝐌͜𝐀𝐍𝐃━━━━━
  ☞ /checkhost
  ☞ /checkid 
  ☞ /broadcast 
  ☞ /ddos <link>
  ☞ /newbugs <user id>
┗━━━━━━━━━━━━━━`;
        const photoUrl = "https://files.catbox.moe/mrvhx2.jpeg"; 
        const mainKeyboard = [
            [{
                text: "CONTACT OWNER",
                url: "https://t.me/Deee908"
            }],
        ];
        leo.replyWithPhoto(photoUrl, {
            caption: BugMenu,
            reply_markup: {
                inline_keyboard: mainKeyboard
            }
        });
    });

    bot.command('addprem', async (leo) => {
        const isOwner = global.DEVELOPER.includes(leo.message.from.id.toString());
        if (!isOwner) {
            return leo.reply(`Please dm ${OWNER_NAME} for buy.`);
        }
        const text = leo.message.text.split(' ');
        if (text.length < 2) {
            return leo.reply("Please provide the user ID to add as premium user.\nUsage: `/addprem <user_id>`", { parse_mode: "Markdown" });
        }
        const newAdmin = text[1];
        if (premiumUsers.includes(newAdmin)) {
            return leo.reply("This user is already a premium user.");
        }
        try {
            premiumUsers.push(newAdmin);
            fs.writeFileSync(premium_file, JSON.stringify(premiumUsers, null, 2));
            leo.reply(`✅ User ${newAdmin} added as admin.`);
        } catch (error) {
            console.error('Error adding user as premium:', error);
            leo.reply('Error adding user as premium.');
        }
    });

    bot.command('delprem', async (leo) => {
        const isOwner = global.DEVELOPER.includes(leo.message.from.id.toString());
        if (!isOwner) {
            return leo.reply(`Please dm ${OWNER_NAME} for buy.`);
        }
        const text = leo.message.text.split(' ');
        if (text.length < 2) {
            return leo.reply("Please provide the user ID to remove as premium user.\nUsage: `/delprem <user_id>`", { parse_mode: "Markdown" });
        }
        const adminToRemove = text[1];
        if (!premiumUsers.includes(adminToRemove)) {
            return leo.reply("This user is not a premium user.");
        }
        try {
            premiumUsers = premiumUsers.filter((id) => id !== adminToRemove);
            fs.writeFileSync(premium_file, JSON.stringify(premiumUsers, null, 2));
            leo.reply(`✅ User ${adminToRemove} removed from admins.`);
        } catch (error) {
            console.error('Error removing premium user:', error);
            leo.reply('Error removing premium user.');
        }
    });

    bot.command('broadcast', async (leo) => {
        const isOwner = global.DEVELOPER.includes(leo.from.id.toString());
        if (!isOwner) {
            return leo.reply(`Please dm ${OWNER_NAME} for buy.`);
        }

        const cmdParts = leo.message.text.split(' ');
        if (cmdParts.length < 2) {
            return leo.reply("Please provide a message to broadcast.\nUsage: `/broadcast <message>`", { parse_mode: 'Markdown' });
        }

        // Join all parts after the command to form the full broadcast message
        const broadcastMessage = cmdParts.slice(1).join(' ');
        const allRecipients = Array.from(new Set([...allUsers, ...premiumUsers])); // Combine all users and premium users, remove duplicates

        let successCount = 0;
        let failedCount = 0;

        for (const userId of allRecipients) {
            try {
                // Check if the user is reachable
                const chat = await leo.telegram.getChat(userId);
                if (chat) {
                    await leo.telegram.sendMessage(userId, broadcastMessage, { parse_mode: 'Markdown' });
                    successCount++;
                }
            } catch (err) {
            }
        }

        leo.reply(`Broadcast completed.\n✅ Success: ${successCount}\n`);
    });

    bot.command('checkid', (leo) => {
        const sender = leo.from.username || "User";
        const text12 = `Hi @${sender} 👋
    
👤 From ${leo.from.id}
  └🙋🏽 You
  
Your ID Telegram : ${leo.from.id}
Your Full Name : @${sender}

🙏🏼 Excuse me, the bot will leave automatically.
Developer : @The_Chosen_001`;

        // Sending text messages without an interactive keyboard
        leo.reply(text12, { parse_mode: 'Markdown' });
    });
           
    bot.on('message', async (leo) => {
        require("./senintele")(leo, bot);
        const userId = leo.from.id; // Get the user's ID
        await saveUser(userId); // Save the user ID
    });

    bot.launch({
        dropPendingUpdates: true
    });

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Author": "https://t.me/Deee908"
        });
    });
    
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

//===================================\\
const { default: makeWASocket, DisconnectReason, makeInMemoryStore, jidDecode, Browsers, proto, getContentType, useMultiFileAuthState, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const readline = require("readline");
const _ = require('lodash');
const FileType = require('file-type');
const path = require('path');
const yargs = require('yargs/yargs');
const PhoneNumber = require('awesome-phonenumber');
const simple2 = require('./lib2/oke.js');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, sleep, reSize } = require('./lib2/myfunc');
var low;
try {
    low = require('lowdb');
} catch (e) {
    low = require('./lib2/lowdb');
}
const { Low, JSONFile } = low;
const mongoDB = require('./lib2/mongoDB');
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.db = new Low(
    /https?:\/\//.test(opts['db'] || '') ?
    new cloudDleoapter(opts['db']) : /mongodb/.test(opts['db']) ?
    new mongoDB(opts['db']) :
    new JSONFile(`./database/database.json`)
);
global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000));
    if (global.db.data !== null) return;
    global.db.READ = true;
    await global.db.read();
    global.db.READ = false;
    global.db.data = {
        users: {},
        chats: {},
        game: {},
        database: {},
        settings: {},
        setting: {},
        others: {},
        sticker: {},
        ...(global.db.data || {})
    };
    global.db.chain = _.chain(global.db.data);
};
loadDatabase();

const appenTextMessage = async (m, leo, text, chatUpdate) => {
    let messages = await generateWAMessage(
        m.key.remoteJid,
        {
            text: text
        },
        {
            quoted: m.quoted,
        },
    );
    messages.key.fromMe = areJidsSameUser(m.sender, leo.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.pushName;
    if (m.isGroup) messages.participant = m.sender;
    let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: "append",
    };
    return leo.ev.emit("messages.upsert", msg);
};

const question = (text) => { const rl = readline.createInterface({ input: process.stdin, output: process.stdout }); return new Promise((resolve) => { rl.question(text, resolve) }) };

async function leoStart() {
    const { state, saveCreds } = await useMultiFileAuthState("session");
    const leo = simple2({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        version: [2, 3000, 1026924051],
        browser: ['Ubuntu', 'Edge', '20.04'],
        getMessage: async key => {
            const jid = jidNormalizedUser(key.remoteJid);
            const msg = await store.loadMessage(jid, key.id);
            return msg?.message || '';
        },
        shouldSyncHistoryMessage: msg => {
            console.log(`\x1b[32mLoading Chat [${msg.progress}%]\x1b[39m`);
            return !!msg.syncType;
        },
    }, store);

    if (!leo.authState.creds.registered) {
        const phoneNumber = await question('Enter your phone number with country code without space and plus sign :\n');
        let code = await leo.requestPairingCode(phoneNumber, "DEEBUHLE");
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(`Code :`, code);
    }
    store.bind(leo.ev);

    leo.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages?.[0];
            if (!mek?.message) return;

            mek.message =
                Object.keys(mek.message)[0] === 'ephemeralMessage'
                    ? mek.message.ephemeralMessage.message
                    : mek.message;

            if (mek.key?.remoteJid === 'status@broadcast') return;

            if (!leo.public && !mek.key?.fromMe) return;

            if (mek.key?.id?.startsWith('BAE5') && mek.key.id.length === 16) return;

            const m = smsg(leo, mek, store);
            require('./senin.js')(leo, m, chatUpdate, store);
        } catch (err) {
            console.error(err);
        }
    });

    // Setting
    leo.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    leo.getName = (jid, withoutContact = false) => {
        id = leo.decodeJid(jid);
        withoutContact = leo.withoutContact || withoutContact;
        let v;
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) v = leo.groupMetadata(id) || {};
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'));
        });
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === leo.decodeJid(leo.user.id) ?
            leo.user :
            (store.contacts[id] || {});
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
    };

    leo.public = true;

    leo.serializeM = (m) => smsg(leo, m, store);
    leo.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;

            switch (reason) {
                case DisconnectReason.leoSession: // leo session file, delete and create a new one
                    console.error('leo session file. Deleting session and reconnecting...');
                    fs.rmSync('./session', { recursive: true, force: true }); // Delete session folder
                    leoStart();
                    break;

                case DisconnectReason.connectionClosed: // Connection closed, reconnect
                case DisconnectReason.connectionLost:
                case DisconnectReason.timedOut:
                    console.warn('Connection closed. Reconnecting...');
                    leoStart();
                    break;

                case DisconnectReason.loggedOut: // Logged out, requires re-login
                    console.error('Logged out. Delete session and re-run the script.');
                    fs.rmSync('./session', { recursive: true, force: true });
                    break;

                case DisconnectReason.restartRequired: // Restart required
                    console.log('Restart required. Reconnecting...');
                    leoStart();
                    break;

                default:
                    console.error(`Unknown disconnect reason: ${reason}. Reconnecting...`);
                    leoStart();
                    break;
            }
        } else if (connection === 'open') {
            const cleanBotNumber = leo.user.id.split(":")[0].replace(/[^0-9]/g, '');
            console.log(chalk.blue.bold(`Connected to ${leo.user.id.split(":")[0]}`));
            
            // Map the connection to global scope dynamically using the number
            global.zaza = global.zaza || {};
            global.zaza[cleanBotNumber] = leo;

            // Fetch and write the group chat cache specifically for this number
            try {
                const chats = await leo.groupFetchAllParticipating();
                const groups = Object.values(chats).map(v => ({ id: v.id, subject: v.subject }));
                
                // Ensure the directory exists before saving
                if (!fs.existsSync('./lib2/pairing')) {
                    fs.mkdirSync('./lib2/pairing', { recursive: true });
                }
                
                fs.writeFileSync(`./lib2/pairing/groups_cache_${cleanBotNumber}.json`, JSON.stringify(groups, null, 2));
            } catch (err) {
                console.error("Failed to sync group cache for open connection:", err);
            }

            /*await leo.sendMessage('2349124727062@s.whatsapp.net', {text: `@ DGXeon13 V18
┏━━━━━━━━━━━━━━
┃ ⎚ 𝙾𝚆𝙽𝙴𝚁 𝙽𝚄𝙼 : +@DGXeon13
┃ ⎚ 𝙾𝚆𝙽𝙴𝚁 𝙽𝙰𝙼𝙴 : @DGXeon13
┃ ⎚ 𝗦𝘁𝗮𝘁𝘀    : CONNECTED
┗━━━━━━━━━━━━━━━`});*/
            await sleep(1999);
            fs.readdir('./lib2/pairing/', { withFileTypes: true }, async (err, dirents) => {
                if (err) return;
                for (let i = 0; i < dirents.length; i++) {
                    const dirent = dirents[i];
                    if (dirent.isDirectory()) {
                        console.log(dirent.name);
                        const startpairing = require('./rentbot.js');
                        await startpairing(dirent.name);
                        await sleep(200);
                    }
                }
            });
        }
    });

    leo.ev.on('creds.update', saveCreds);

    async function getMessage(key) {
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id);
            return msg;
        }
        return {
            conversation: "SCARLET Bug Bot"
        };
    }
    
    leo.ev.on('messages.update', async (chatUpdate) => {
        for (const { key, update } of chatUpdate) {
            if (update.pollUpdates && key.fromMe) {
                const pollCreation = await getMessage(key);
                if (pollCreation) {
                    let pollUpdate = await getAggregateVotesInPollMessage({
                        message: pollCreation?.message,
                        pollUpdates: update.pollUpdates,
                    });
                    let toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name;
                    console.log(toCmd);
                    await appenTextMessage(m, leo, toCmd, pollCreation);
                    await leo.sendMessage(m.cht, { delete: key });
                } else return false;
                return;
            }
        }
    });

    leo.sendText = (jid, text, quoted = '', options) => leo.sendMessage(jid, { text: text, ...options }, { quoted });
    //=========================================\\
    leo.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension ? ('./sticker/' + filename + '.' + type.ext) : './sticker/' + filename;
        // save to file
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
    };
    //=========================================\\
    leo.getFile = async (PATH, save) => {
        let res;
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0);
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        };
        filename = path.join(__filename, '../database/' + new Date * 1 + '.' + type.ext);
        if (data && save) fs.promises.writeFile(filename, data);
        return {
            res,
            filename,
            size: await getSizeMedia(data),
            ...type,
            data
        };
    };

    leo.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await leo.getFile(path, true);
        let { res, data: file, filename: pathFile } = type;

        if (res && res.status !== 200 || file.length <= 65536) {
            try {
                throw {
                    json: JSON.parse(file.toString())
                };
            } catch (e) {
                if (e.json) throw e.json;
            }
        }

        let opt = {
            filename
        };

        if (quoted) opt.quoted = quoted;
        if (!type) options.asDocument = true;

        let mtype = '',
            mimetype = type.mime,
            convert;

        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
        else if (/video/.test(type.mime)) mtype = 'video';
        else if (/audio/.test(type.mime)) {
            convert = await (ptt ? toPTT : toAudio)(file, type.ext);
            file = convert.data;
            pathFile = convert.filename;
            mtype = 'audio';
            mimetype = 'audio/ogg; codecs=opus';
        } else mtype = 'document';

        if (options.asDocument) mtype = 'document';

        delete options.asSticker;
        delete options.asLocation;
        delete options.asVideo;
        delete options.asDocument;
        delete options.asImage;

        let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
        let m;

        try {
            m = await leo.sendMessage(jid, message, { ...opt, ...options });
        } catch (e) {
            //console.error(e)
            m = null;
        } finally {
            if (!m) m = await leo.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
            file = null;
            return m;
        }
    };

    leo.sendTextWithMentions = async (jid, text, quoted, options = {}) => leo.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted });
    //=========================================\\
    leo.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    };

    return leo;
}

function smsg(leo, m, store) {
    if (!m) return m;
    let M = proto.WebMessageInfo;
    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = leo.decodeJid(m.fromMe && leo.user.id || m.participant || m.key.participant || m.chat || '');
        if (m.isGroup) m.participant = leo.decodeJid(m.key.participant) || '';
    }
    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype]);
        m.body = m.message?.conversation
            || m.msg?.caption
            || m.msg?.text
            || (m.mtype === 'listResponseMessage' && m.msg?.singleSelectReply?.selectedRowId)
            || (m.mtype === 'buttonsResponseMessage' && m.msg?.selectedButtonId)
            || (m.mtype === 'viewOnceMessage' && m.msg?.caption)
            || m.text;
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
        if (m.quoted) {
            let type = getContentType(quoted);
            m.quoted = m.quoted[type];
            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted);
                m.quoted = m.quoted[type];
            }
            if (typeof m.quoted === 'string') m.quoted = {
                text: m.quoted
            };
            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo.stanzaId;
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false;
            m.quoted.sender = leo.decodeJid(m.msg.contextInfo.participant);
            m.quoted.fromMe = m.quoted.sender === leo.decodeJid(leo.user.id);
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
            m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false;
                let q = await store.loadMessage(m.chat, m.quoted.id, conn);
                return exports.smsg(conn, q, store);
            };
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            });
            m.quoted.delete = () => leo.sendMessage(m.quoted.chat, { delete: vM.key });
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => leo.copyNForward(jid, vM, forceForward, options);
            m.quoted.download = () => leo.downloadMediaMessage(m.quoted);
        }
    }
    if (m.msg.url) m.download = () => leo.downloadMediaMessage(m.msg);
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || '';
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? leo.sendMedia(chatId, text, 'file', '', m, { ...options }) : leo.sendText(chatId, text, m, { ...options });
    m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => leo.copyNForward(jid, m, forceForward, options);

    return m;
}

// Main Logic
(async () => {
    try {
        console.log("Connecting to WhatsApp...");
        await leoStart();
        console.log("WhatsApp connected! Starting Telegram bot...");
        await startXeony();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
})();