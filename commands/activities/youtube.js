module.exports = {
name: "yttogether",
cooldown: 5000,
aliases: ["youtubetogether", "yttogether"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Lets you watch YouTube along with Friends in Voice Channel!",
usage: "h!yttogether",
category: "Activities",
run: async(client, message, args) => {
const novc = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please join a Voice Channel!**`)
const channel = message.member.voice.channel;
if(!channel) { return message.channel.send({ embeds: [novc] }) }
client.activities.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
const embed = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **YouTube Together Created!**`);
const btn = client.buttons.genlinkbtn(client, invite.code);
message.channel.send({ embeds: [embed], components: [btn] })
})}}   