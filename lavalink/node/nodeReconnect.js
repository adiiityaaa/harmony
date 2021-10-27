module.exports.run = async(client, node) => {
console.log(`🔃 | Lavalink Node Reconnecting....`)
const embed2 = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.loading} | **Lavalink Node is Reconnecting...**`)
.setColor(client.colors.yellow)
await client.channels.cache.get(client.settings.botlog).send({ embeds: [embed2] })
}