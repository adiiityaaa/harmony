const Discord = require("discord.js")
const cooldowns = new Discord.Collection();

module.exports.run = async (client, message) => {
  if (message.author.bot) return;
    if (!message.guild) return;
// Return if Author is Bot or DM Message  
const blacklisted = client.db.get(`blacklistserverlol_${message.guild.id}`);
if (blacklisted === 'true') { message.guild.leave(); }
 // Server Blacklist Feature    
const lprefix = client.settings.prefix;    
let prefix = await client.db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = lprefix;
  if (!message.content.startsWith(prefix)) { return; }
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.normalcommands.get(cmd);
  if (!command) command = client.normalcommands.get(client.normalaliases.get(cmd));
  if (!command) return;
  const sendperms = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **I dont have permissions to send Messages!**`)
  if(!message.guild.me.permissions.has("SEND_MESSAGES")) { return message.author.send({ embeds: [sendperms] }).catch(e => { console.log(e) }) }
  if(!message.guild.me.permissions.has("EMBED_LINKS") || !message.guild.me.permissions.has("USE_EXTERNAL_EMOJIS")) { return message.channel.send({ content: ":x: **Please Provide the Following Basic Permissions for Proper functioning:**\n\`USE_EXTERNAL_EMOJIS, EMBED_LINKS\`" }) }
  // Checking for Commands
  if(command.devOnly) {
    if (message.author.id !== client.settings.devID) {
         const devsonly = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Command restricted to Developers.**`)
      return message.channel.send({ embeds: [devsonly] }); }
  }
// Restricted to the Developers
 if(command.clientperms) {
        const Permissions = command.clientperms.filter(x => !message.guild.me.permissions.has(x)).map(x => "`" + x + "`")
        if (Permissions.length) {
         const perms1 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Client Missing Permissions!**\n${client.emotes.rarrow} This Command Requires: ${Permissions.join(", ")}!`)
        return message.channel.send({ embeds: [perms1] });
  }}    
// Return if Bot Doesn't have Perms   
 if(command.memberperms) {
         const Permissions = command.memberperms.filter(x => !message.member.permissions.has(x)).map(x => "`" + x + "`")
         if (Permissions.length) { 
         const perms2 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **User Missing Permissions!**\n${client.emotes.rarrow} This Command Requires: ${Permissions.join(", ")}!`)
        return message.channel.send({ embeds: [perms2] });
 }}
// Return if Author Doesn't have Perms       
if(command.voiceChannel) {
    const novc = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please join a Voice Channel!`)
    if(!message.member.voice.channel) { return message.channel.send({ embeds: [novc] }) }
}
// Return if Author is not in a Voice Channel
if(command.mutualChannel) {
    const nomutu = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **You should be in a Mutual Voice Channel!`)
    if(message.guild.me.voice.channel && message.guild.me.voice.channel.id !== message.member.voice.channel.id) { return message.channel.send({ embeds: [nomutu] }) }
}   
// Return if Author is not in a Mutual Voice Channel
try {    
   const nodj = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **This is a DJ only Commmand!**`)
   const check = await client.modules.djcheckm(client, message);
   if(check === true && command.djOnly) { 
   const memcheck = await client.modules.isadjm(client, message);
   if(memcheck === false) { return message.channel.send({ embeds: [nodj] }); }
   else if(memcheck === true) { if(command) command.run(client, message, args); } }
   else if(check === true && !command.djOnly) { if(command) command.run(client, message, args); }
   else if(check === false && command.djOnly) { if(command) command.run(client, message, args); }
   else if(check === false && !command.djOnly) { if(command) command.run(client, message, args); }
   else if(!command.djOnly) { if(command) command.run(client, message, args); }
} catch(e) {
  console.log(e) 
  const riperr = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **An Error has Occured!`)
  message.channel.send({ embeds: [riperr] })
}}