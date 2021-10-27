module.exports = {
name: "lettertile",
cooldown: 5000,
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Lets you play Letter Tiles along with Friends in Voice Channel!",
category: "Activities",
run: async(client, interaction) => {
 const novc = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please join a Voice Channel!**`)
const channel = interaction.member.voice.channel;
if(!channel) { return interaction.reply({ embeds: [novc] }) }
client.activities.createTogetherCode(interaction.member.voice.channel.id, 'lettertile').then(async invite => {
const embed = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Letter Tiles Game Created!**`);
const btn = client.buttons.genlinkbtn(client, invite.code);
interaction.reply({ embeds: [embed], components: [btn] })   
})}}   