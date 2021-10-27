module.exports = {
name: "deploy",
category: "Developers",
usage: "h!deploy",
devOnly: true,
description: "Deploys all the Slash commands of the Bot",
clientperms: ["EMBED_LINKS"],
cooldown: 10000,
run: async(client, message, args) => {
const posted = new client.discord.MessageEmbed()
.setColor(client.colors.green)
.setDescription(`${client.emotes.check} | **Slash Commands Deployed!**`);
const notposted = new client.discord.MessageEmbed()
.setColor(client.colors.red)
.setDescription(`${client.emotes.cross} | **Failed to Deploy Slash Commands!**`)
const posting = new client.discord.MessageEmbed()
.setColor(client.colors.cyan)
.setDescription(`${client.emotes.loading} | **Deploying Slash Commands...**`)
const msg = await message.channel.send({ embeds: [posting] })
try {
client.slashcommands.forEach(x => {
const data = {
name: x.name,
description: x.description,
options: x.options
};
client.application?.commands.create(data) })
msg.delete()    
message.channel.send({ embeds: [posted] })
} catch(e) {
console.log(e)
msg.delete()
message.channel.send({ embeds: [notposted] })
}
}}