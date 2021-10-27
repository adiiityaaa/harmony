module.exports.run = async(client) => {
console.log(`✔ | Logged in as ${client.user.tag} with ${client.guilds.cache.size} Servers having ${client.users.cache.size} Users!`)
const embed = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.check} | **Established a Connection with Client!**`)
.setColor("#00FF00")
await client.manager.init(client.user.id)
await client.channels.cache.get(client.settings.botlog).send({ embeds: [embed] })
await client.modules.automeme;
setInterval(() => {
    client.modules.automeme;
  }, 900000);    
}