module.exports.run = async(client) => {
 const embed = new client.discord.MessageEmbed()
 .setDescription(`${client.emotes.error} | **Client has been Disconnected!**`)
 .setColor(client.colors.yellow)
 client.channels.cache.get(client.settings.botlogs).send({ embeds: [embed] })
}