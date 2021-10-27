module.exports = {
name: "setusername",
devOnly: true, 
category: "Developers",
usage: "h!eval <code>",
cooldown: 10000,
description: "Evaluate a Custom Code!",
clientperms: ["EMBED_LINKS"],
aliases: ["setname"],
run: async (client, message, args) => {
const exceed = new client.discord.MessageEmbed()
.setColor(client.colors.red)
.setDescription(`${client.emotes.cross} | **Name Cannot exceed 16 Characters!**`)    
const error = new client.discord.MessageEmbed()
.setColor(client.colors.red)
.setDescription(`${client.emotes.cross} | **An Error has Occured!**`)
const name = args.join(" ");
if(name.length > 16) { return message.channel.send({ embeds: [exceed] }) }    
const success = new client.discord.MessageEmbed()
.setColor(client.colors.green)
.setDescription(`${client.emotes.check} | **Client Username Changed!**\n${client.emotes.garrow} **New Username:** ${name}`)    
try { 
    client.user.setUsername(name)
    message.channel.send({ embeds: [success] })
    } catch (e) {
    console.log(e)
    message.channel.send({ embeds: [error] })
}}}