module.exports = {
name: "poker",
cooldown: 5000,
aliases: [""],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Lets you play Poker Nights along with Friends in Voice Channel!",
usage: "h!poker",
category: "Activities",
run: async(client, message, args) => {
 const novc = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please join a Voice Channel!**`)
const channel = message.member.voice.channel;
if(!channel) { return message.channel.send({ embeds: [novc] }) }
client.activities.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
const embed = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Poker Game Created!**`);
const btn = client.buttons.genlinkbtn(client, invite.code);
message.channel.send({ embeds: [embed], components: [btn] })   
})}}  