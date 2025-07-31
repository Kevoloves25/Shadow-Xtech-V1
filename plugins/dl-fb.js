const axios = require("axios");
const { cmd } = require("../command");
const getFBInfo = require("@xaviabot/fb-downloader");
const whatsappChannelLink = 'https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10';

// Quoted contact for meta-style replies
const quotedContact = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "⚙️ Meta Extractor | Verified ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:SCIFI\nORG:Shadow-Xtech BOT;\nTEL;type=CELL;type=VOICE;waid=254700000001:+254 700 000001\nEND:VCARD"
    }
  }
};

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename,
  use: "<Facebook URL>",
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("*❗ Provide a valid Facebook URL:*\n`.fb https://www.facebook.com/...`");
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const fbData = await getFBInfo(q);
    if (!fbData || (!fbData.sd && !fbData.hd)) {
      return reply("❌ No downloadable video found at the provided link.");
    }

    const videoUrl = fbData.hd || fbData.sd;
    const caption =
`*⎾⦿======================================⏌*
  *🛰️ SHADOW XTECH — FB NODE CAPTURE*
  *⌬━━━━━━━━━━━━━━━━━━⌬*
   *📡 STREAM TYPE : Facebook/Meta-Grid*
   *🌐 DATA TRACE : ${q.split('?')[0]}*
   *🧾 SIGNAL STATUS : 🟢 LINK VERIFIED*
  
 _*⧉ PACKET FEED*_
   *🧬 UPLINK_ID | shadow.fb.grid://ΩF8Z2*
  *⌬━━━━━━━━━━━━━━━━━━⌬*
   *✅ MEDIA READY — TRANSMIT TO CLIENT*
*⎿========================================⏋*`;

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363369453603973@newsletter',
          newsletterName: "𝐒ʜᴀᴅᴏᴡ 𝐗ᴛᴇᴄʜ",
          serverMessageId: 143
        },
        externalAdReply: {
          title: "⚙️ Shadow-Xtech | Meta Extractor",
          body: "Facebook Node Captured & Stream Unlocked",
          thumbnailUrl: "https://files.catbox.moe/3l3qgq.jpg",
          sourceUrl: whatsappChannelLink,
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: quotedContact });

  } catch (err) {
    console.error("❌ FB Download Error:", err);
    reply("🚫 Failed to download Facebook video. Please try another link.");
  }
});