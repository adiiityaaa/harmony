module.exports = {
name: "enablechatbot",
usage: "h!enablechatbot <channel>",
description: "Enable the Chatbot Channel!",
cooldown: 30000,
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
memberperms: ["MANAGE_GUILD"],
aliases: ["setchatbot"],
category: "Configuration",    
run: async(client, message, args) => {
const nochannel = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please mention a Channel!**`);
const notext = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Channel must be a Text Channel!**`);
const already = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **This is already the Chatbot Channel!**`);
const channel = message.mentions.channels.first()
if(!channel) { return message.channel.send({ embeds: [nochannel] }) } 
if(channel) {    
const done = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Chatbot setupped in <#${channel.id}>!**`);   
if(channel.type !== "GUILD_TEXT") { return message.channel.send({ embeds: [notext] }) }
const check = await client.db.get(`chatcheck_${message.guild.id}`);
if(check === null) { await client.db.set(`chatcheck_${message.guild.id}`, true)
await client.db.set(`chatchx_${message.guild.id}`, channel.id)
message.channel.send({ embeds: [done] }) }
else if(check === true) { 
const chx = await client.db.get(`chatchx_${message.guild.id}`);
const chanel = client.channels.cache.get(chx);
if(!chanel) { await client.db.set(`chatcheck_${message.guild.id}`, true)
await client.db.set(`chatchx_${message.guild.id}`, channel.id)
message.channel.send({ embeds: [done] }) }
else if(channel.id === chanel.id) { return message.channel.send({ embeds: [already] }) }
else { await client.db.set(`chatcheck_${message.guild.id}`, true)
await client.db.set(`chatchx_${message.guild.id}`, channel.id)
message.channel.send({ embeds: [done] }) }
}}}}