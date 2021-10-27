module.exports.run = async(client, node) => {
console.log(`✔ | Lavalink Node Created!`)
const embed2 = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.check} | **Lavalink Node has been Created!**`)
.setColor(client.colors.green)
await client.channels.cache.get(client.settings.botlog).send({ embeds: [embed2] })
}