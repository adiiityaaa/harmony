module.exports = {
name: "ping",
cooldown: 5000,
aliases: ["latency"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Displays the Bot Latency!",
usage: "h!ping",
category: "Utilities",
run: async(client, message, args) => {
const pog = new client.discord.MessageEmbed()
.setColor(client.colors.cyan)
.setDescription(`${client.emotes.loading} | **Getting the Ping from the Host...**`)
 const reqcheck = await client.modules.mreqchx(client, message.channel.id, message.guild.id);
 if(reqcheck === false) {
let msg = await message.channel.send({ embeds: [pog] });
let ping1 = msg.createdTimestamp - message.createdTimestamp;
let ping2 = client.ws.ping;
let pong = new client.discord.MessageEmbed()
        .setDescription(`${client.emotes.ping} **Message Latency:** ${ping1}ms\n${client.emotes.dcping} **API Latency:** ${ping2}ms`)
if(ping2 > 150) { pong.setColor(client.colors.red) }
else if(ping2 > 70) { pong.setColor(client.colors.yellow) }
else { pong.setColor(client.colors.green) }
msg.delete()
message.channel.send({ embeds: [pong]})
 } else if(reqcheck === true) {
  let msg = await message.channel.send({ embeds: [pog] });
let ping1 = msg.createdTimestamp - message.createdTimestamp;
let ping2 = client.ws.ping;
let pong = new client.discord.MessageEmbed()
        .setDescription(`${client.emotes.ping} **Message Latency:** ${ping1}ms\n${client.emotes.dcping} **API Latency:** ${ping2}ms`)
if(ping2 > 150) { pong.setColor(client.colors.red) }
else if(ping2 > 70) { pong.setColor(client.colors.yellow) }
else { pong.setColor(client.colors.green) }
message.channel.send({ embeds: [pong]})
}}}