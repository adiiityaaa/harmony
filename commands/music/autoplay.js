module.exports = {
name: "autoplay",
cooldown: 5000,
aliases: ["nonstop"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Toggle the Autoplay Mode!",
usage: "h!autoplay",
category: "Music",
memberperms: ["MANAGE_GUILD"],    
run: async(client, message, args) => {
const check = client.db.get(`autoplaycheck_${message.guild.id}`);
let mode;
if(check === null || check === false) { mode = true }
else if(check === true) { mode = false };
await client.db.set(`autoplaycheck_${message.guild.id}`, mode)
const embed = new client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Autoplay set to ${mode}!**`)
message.channel.send({ embeds: [embed] })
}}    