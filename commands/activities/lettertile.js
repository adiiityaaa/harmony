module.exports = {
name: "lettertile",
cooldown: 5000,
aliases: [""],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Lets you play Letter Tiles along with Friends in Voice Channel!",
usage: "h!lettertile",
category: "Activities",
run: async(client, message, args) => {
 const novc = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please join a Voice Channel!**`)
const channel = message.member.voice.channel;
if(!channel) { return message.channel.send({ embeds: [novc] }) }
client.activities.createTogetherCode(message.member.voice.channel.id, 'lettertile').then(async invite => {
const embed = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Letter Tiles Game Created!**`);
const btn = client.buttons.genlinkbtn(client, invite.code);
message.channel.send({ embeds: [embed], components: [btn] })   
})}}   