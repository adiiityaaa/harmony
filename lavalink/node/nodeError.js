module.exports.run = async(client, node, error) => {
console.log(`❌ | Lavalink Node Error: ${error}`)
const embed2 = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.error} | **Lavalink Node Error!**\n${client.emotes.rarrow} ${error}`)
.setColor(client.colors.red)
await client.channels.cache.get(client.settings.botlog).send({ embeds: [embed2] })
}