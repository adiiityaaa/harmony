module.exports.run = async(client, node) => {
console.log(`✔ | Lavalink Node has been Connected!`)
const embed2 = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.check} | **Established a Connection with Lavalink Node!**`)
.setColor(client.colors.green)
await client.channels.cache.get(client.settings.botlog).send({ embeds: [embed2] })
}