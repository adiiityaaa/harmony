module.exports = {
name: "status",
devOnly: true, 
category: "Developers",
usage: "h!status <type> | <text> | <url>",
cooldown: 10000,
description: "Set a Custom Status for the Bot!",
clientperms: ["EMBED_LINKS"],
run: async (client, message, args) => {
const notype = new client.discord.MessageEmbed()
.setColor(client.colors.red)
.setDescription(`${client.emotes.cross} | **Please Provide Status Type!**`)
const notext = new client.discord.MessageEmbed()
.setColor(client.colors.red)
.setDescription(`${client.emotes.cross} | **Please Provide Status!**`)
const invalid = new client.discord.MessageEmbed()
.setColor(client.colors.red)
.setDescription(`${client.emotes.cross} | **Provided Status Type is Invalid!**`)
const nolink = new client.discord.MessageEmbed()
.setColor(client.colors.red)
.setDescription(`${client.emotes.cross} | **Please Provide Status URL!**`)
    
let choice = args.join(" ").split(" | ")[0]
let text = args.join(" ").split(" | ")[1]
if(!choice) { return message.channel.send({ embeds: [notype] }) }
if(!text) { return message.channel.send({ embeds: [notext] }) }    
let valid = ["STREAMING", "PLAYING", "COMPETING", "LISTENING", "WATCHING"];
if(!valid.includes(choice)) { return message.channel.send({ embeds: [invalid] }) }
if(choice === "STREAMING") {
   let link = args.join(" ").split(" | ")[2]
   if(!link) { return message.channel.send({ embeds: [nolink] }) }
   await client.user.setActivity(`${text}`, { type: `${choice}`, url: `${link}` })
    const embed1 = new client.discord.MessageEmbed()
   .setColor(client.colors.green)
   .setDescription(`${client.emotes.check} | **Bot Status Changed!**\n\n${client.emotes.garrow} **Status:** ${text}\n${client.emotes.garrow} **Type:** ${choice}\n${client.emotes.garrow} **URL:** ${link}`) 
   message.channel.send({ embeds: [embed1] })
} else {
   await client.user.setActivity(`${text}`, { type: `${choice}` })
   const embed2 = new client.discord.MessageEmbed()
   .setColor(client.colors.green)
   .setDescription(`${client.emotes.check} | **Bot Status Changed!**\n\n${client.emotes.garrow} **Status:** ${text}\n${client.emotes.garrow} **Type:** ${choice}`)
   message.channel.send({ embeds: [embed2] })
}}}