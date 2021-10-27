module.exports.run = async(client, player) => {
  player.setVolume(100)
  const vc = client.channels.cache.get(player.voiceChannel);
  const tc = client.channels.cache.get(player.textChannel);
  const embed = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.check} | **Player Created!**\n\n${client.emotes.garrow} Voice Channel: ${vc}\n${client.emotes.garrow} Bound to: ${tc}`)
  .setColor(client.colors.green)
 const check = await client.modules.reqchx(client, player);
 if(check === false) { client.channels.cache.get(player.textChannel).send({ embeds: [embed] }) }
 else if(check === true) { return; }
}