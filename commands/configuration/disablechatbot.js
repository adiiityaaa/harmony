module.exports = {
name: "disablechatbot",
usage: "h!disablechatbot <channel>",
description: "Disable the Chatbot Channel!",
cooldown: 30000,
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
memberperms: ["MANAGE_GUILD"],
aliases: ["unsetchatbot"],
category: "Configuration",
run: async(client, message, args) => {
const notset = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Chatbot isn't setupped!**`)    
const done = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Disabled the Chatbot!**`) 
const check = await client.db.get(`chatcheck_${message.guild.id}`);
if(check === null) { return message.channel.send({ embeds: [notset] }) }    
else if(check === true) {
  await client.db.delete(`chatcheck_${message.guild.id}`)
  await client.db.delete(`chatchx_${message.guild.id}`);
  await message.channel.send({ embeds: [done] })
}}}