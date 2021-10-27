module.exports = {
name: "prune",
description: "Purges the Messages Sent by the Bot!",
usage: "h!prune",
category: "moderation",
cooldown: 10000,
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
memberperms: ["MANAGE_MESSAGES"],
run: async(client, message, args) => { 
const prunn = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **An Error has Occured!**`);
message.channel.messages.fetch({ limit: 100 }).then(async messages => {
let msgs = await message.channel.messages.fetch({ limit: 100 })    
let tempCol = msgs.filter(c => c.author.id === client.user.id).first(100).map(c => [c.id, c])
msgs = new client.discord.Collection(tempCol)    
message.channel.bulkDelete(msgs.filter(c => !c.pinned), true).catch(e => { message.channel.send({ embeds: [prunn] })
console.log(e) })
const prunnn = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Pruned ${msgs.size} Messages!**`)
await message.channel.send({ embeds: [prunnn] });
})}}