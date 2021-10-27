module.exports = {
name: "help",
cooldown: 5000,
aliases: ["commands"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Displays the Commands of the Bot!",
usage: "h!help",
category: "Utilities",
run: async (client, message, args) => {
const array = [];
client.normalcommands.forEach(x => {
   array.push(x.name)
})
const embed = client.modules.embed(client, client.colors.cyan, `${client.emotes.music} | **Help Command!**\n${client.emotes.garrow} This is an Under Development help command which will be modified with final version\n\n${array.join(", ")}`)
const btn = client.buttons.addbtn(client)
message.channel.send({ embeds: [embed], components: [btn] })
}}    