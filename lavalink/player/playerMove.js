module.exports.run = async(client, player, oldChannel, newChannel) => {
if(!newChannel) {
  setTimeout(async () => { await client.modules.reset(client, player); }, 2000)
  const embed = new client.modules.embed(client, client.colors.red, `${client.emotes.error} | **Player has been Disconnected!**`)
  client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
  await player.destroy()   
} else if(newChannel) {
  await player.setVoiceChannel(newChannel);
  if(player.paused) return;
  player.pause(true);
  setTimeout(() => { player.pause(false) }, 1000);
}}