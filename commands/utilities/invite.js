module.exports = {
name: "invite",
cooldown: 5000,
aliases: ["inv", "add"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Sends an Invite Link to the Bot!",
usage: "h!invite",
category: "Utilities",
run: async(client, message, args) => {
const pong = new client.discord.MessageEmbed()
.setColor(client.colors.cyan)
.setDescription(`${client.emotes.plus} | **Invite Link**\n\nInvite Harmony by Clicking on the Button!`)
.setThumbnail(client.user.displayAvatarURL())
const invbtn = client.buttons.addbtn(client)
message.channel.send({ embeds: [pong], components: [invbtn] })
}}