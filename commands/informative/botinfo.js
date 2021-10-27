const os = require('os')
const cpuStat = require("cpu-stat")

module.exports = {
name: "botinfo",
aliases: ["stats"],
usage: "h!botinfo",
description: "Brief statistics about the Bot!",
cooldown: 10000,
clientperms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
category: "Utilities",    
run: async(client, message, args) => {
 let prefix;
 const lprefix = client.settings.prefix;
 const rprefix = await client.db.fetch(`prefix_${message.guild.id}`);
 if(rprefix === null) { prefix = lprefix; }
 else { prefix = rprefix; }    
let cpuLol;
cpuStat.usagePercent(function(err, percent, seconds) {
if (err) { return console.log(err); }    
const data1 = (Date.now() / 1000 - client.uptime / 1000).toFixed(0);
const embed = new client.discord.MessageEmbed()
.setColor(client.colors.cyan)
.setDescription(`${client.emotes.general} **General Information:**\n> Name: <@${client.user.id}>\n> ID: ${client.user.id}\n> Developers: AG〢JARVIS#4782\n> Created: ${client.user.createdAt}\n${client.emotes.channels} **Statistical Information:**\n> Total Servers: ${client.guilds.cache.size}\n> Total Channels: ${client.channels.cache.size}\n> Total Commands: ${client.normalcommands.size}\n> Total Users: ${client.users.cache.size}\n${client.emotes.config} **System Information:**\n> CPU Model: ${os.cpus().map(i => `${i.model}`)[0]}\n> CPU Usage: ${percent.toFixed(2)}%\n> Ram Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\n> Architecture: ${os.arch()}\n> Platform: ${os.platform()}\n${client.emotes.package} **Package Information:**\n> Discord.js: ${client.discord.version}\n> Nodejs: ${process.version}\n> Harmony: v1.2.7\n> Erela.js: v2.3.3\n${client.emotes.plus} **Additional Information:**\n> Prefix: ${prefix}\n> API Latency: ${client.ws.ping}ms\n> Last Reboot: <t:${data1}:R>\n> [Invite](https://discord.com/api/oauth2/authorize?client_id=819931019024269352&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/UjaSx57Hpd)`)
message.channel.send({ embeds: [embed] })
})}}