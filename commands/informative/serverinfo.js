module.exports = {
name: "serverinfo",
usage: "h!serverinfo",
description: "Shows the Information about the Server!",
cooldown: 15000,
clientperms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
aliases: ["server"],
category: "Utilities",
run: async(client, message, args) => {
let prefix;
const check = await client.db.fetch(`prefix_${message.guild.id}`);
if(check === null) { prefix = client.settings.prefix; }
else { prefix = check; }
let chx;
const check2 = await client.db.fetch(`isystemcheck_${message.guild.id}`);
if(check2 === null) { chx = "null"; }
else if(check2 === true) { let dat = await client.db.fetch(`isystemchx_${message.guild.id}`);
let chaa = client.channels.cache.get(dat);
if(!chaa) { chx = "null"; }
else { chx = chaa; }} 
let chatbot;
const chaaat = await client.db.get(`chatcheck_${message.guild.id}`);
if(chaaat === null) { chatbot = "null"; }
else if(chaaat === true) { const daat = await client.db.get(`chatchx_${message.guild.id}`);
const chxxx = client.channels.cache.get(daat);
if(!chxxx) { chatbot = "null" }
else { chatbot = `<#${chxxx.id}>`; } }
let djrole;
const check3 = await client.db.fetch(`djrolecheck_${message.guild.id}`);  
if(check3 === null) { djrole = "null"; }
else if(check3 === true) {
const rawrole = await client.db.get(`djrole_${message.guild.id}`);
const role = message.guild.roles.cache.get(rawrole);
if(!role) { djrole = "null"; }
else if(role) { djrole = `<@&${role.id}>`; }
}
const embed = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.music} | **${message.guild.name}**\n\n${client.emotes.general} **General Information:**\n> ID: ${message.guild.id}\n> Owner: <@${message.guild.ownerId}>\n> Created: ${message.guild.createdAt}\n> Description: ${message.guild.description}\n> AFK Channel: ${message.guild.afkChannel}\n> Rules Channel: ${message.guild.rulesChannel}\n${client.emotes.channels} **Channel Information:**\n> Total Channels: ${message.guild.channels.cache.size}\n> Categories: ${message.guild.channels.cache.filter((channel) => channel.type === "GUILD_CATEGORY").size}\n> Voice Channels: ${message.guild.channels.cache.filter((channel) => channel.type === "GUILD_VOICE").size}\n> Text Channels: ${message.guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").size}\n> Stage Channels: ${message.guild.channels.cache.filter((channel) => channel.type === "GUILD_STAGE_VOICE").size}\n${client.emotes.emotes} **Emote Information:**\n> Total Emotes: ${message.guild.emojis.cache.size}\n> Total Stickers: ${message.guild.stickers.cache.size}\n${client.emotes.boosts} **Premium Information:**\n> Total Boosts: ${message.guild.premiumSubscriptionCount}\n> Premium Tier: ${message.guild.premiumTier}\n${client.emotes.roles} **Role Information:**\n> Total Roles: ${message.guild.roles.cache.size}\n> Highest Role: ${message.guild.roles.highest}\n${client.emotes.members} **Member Information:**\n> Total Members: ${message.guild.memberCount}\n> Bot Count: ${message.guild.members.cache.filter(member => member.user.bot).size}\n> Human Count: ${message.guild.members.cache.filter(member => !member.user.bot).size}\n${client.emotes.config} **Bot Configuration:**\n> Prefix: ${prefix}\n> Request Channel: ${chx}\n> DJ Role: ${djrole}\n> Chatbot: ${chatbot}`)
.setColor(client.colors.cyan)
.setThumbnail(message.guild.iconURL())
message.channel.send({ embeds: [embed] })
}}