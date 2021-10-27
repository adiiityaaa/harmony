module.exports.run = async(client, node, reason) => {
console.log(`❌ | Lavalink Node Disconnected!`)
const embed2 = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.error} | **Lavalink Node has been Disconnected!**`)
.setColor(client.colors.red)
await client.channels.cache.get(client.settings.botlog).send({ embeds: [embed2] })
}