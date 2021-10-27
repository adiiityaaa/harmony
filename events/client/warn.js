module.exports.run = async(client, error) => {
 const embed = new client.discord.MessageEmbed()
 .setDescription(`${client.emotes.error} | **Client Warning!**\n${client.emotes.rarrow} ${error}`)
 .setColor(client.colors.red)
 client.channels.cache.get(client.settings.botlogs).send({ embeds: [embed]})
}