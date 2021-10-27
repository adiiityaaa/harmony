module.exports = {
name: "sourcecode",
cooldown: 5000,
aliases: [""],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Sends the Link to Source Code for Beginners!",
usage: "h!invite",
category: "Utilities",
run: async(client, message, args) => {
const pong = new client.discord.MessageEmbed()
.setColor(client.colors.cyan)
.setDescription(`${client.emotes.search} | **Source Code:**\n\nView the Source Code of Friday by clicking the Button below to learn how to start making Bots yourself!`)
const invbtn = client.buttons.srcbtn(client)
message.channel.send({ embeds: [pong], components: [invbtn] })
}}