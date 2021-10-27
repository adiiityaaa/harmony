module.exports = {
name: "afk",
cooldown: 5000,
aliases: ["awayfromkeyboard"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Set an AFK Status!",
usage: "h!afk <optional reason>",
category: "Utilities",
run: async(client, message, args) => {
 let rawreason;
 let rawtime = Date.now();
 let msg = args.join(" ");
 if(!msg) { rawreason = "AFK"; }
 else if(msg) { rawreason = msg; }
 const data = {
 reason: rawreason,
 time: rawtime,
 guild: message.guild.id
 }
 await client.afkdb.push(message.author.id, data)
 message.channel.send({ content: `<@${message.author.id}>, you are now AFK: ${rawreason}` })
 await message.member.setNickname(`[AFK] ${message.member.user.username}`).catch(e => { return; })
}}