module.exports = {
  name: "nowplaying",
  description: "Displays Information about Currently Playing Song!",
  run: async(client, interaction) => {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const check = client.manager.players.get(interaction.guild.id);
  if(!check) { return interaction.reply({ embeds: [noq] })}
  const channel = interaction.member.voice.channel;
  if(!channel) { return interaction.reply({ embeds: [novc] }) }
  if(check) {
     if(!check.playing) { return interaction.reply({ embeds: [noq] }) }
     const bar = client.modules.progressbar(client, check.position, check.queue.current.duration)
     const embed = client.modules.embed(client, client.colors.cyan, `${client.emotes.music} | **Now Playing:**\n[${check.queue.current.title}](${check.queue.current.uri})\n${client.emotes.parrow} Requested by: ${check.queue.current.requester}\n${bar}`)
     interaction.reply({ embeds: [embed] })
  }
}}