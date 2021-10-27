module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  clientperms: ["CONNECT", "SPEAK", "EMBED_LINKS", "USE_EXTERNAL_EMOTES"],
  cooldown: 5000,
  usage: "h!nowplaying",
  description: "Displays Information about Currently Playing Song!",
  run: async(client, message, args) => {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const check = client.manager.players.get(message.guild.id);
  if(!check) { return message.channel.send({ embeds: [noq] })}
  const channel = message.member.voice.channel;
  if(!channel) { return message.channel.send({ embeds: [novc] }) }
  if(check) {
     if(!check.playing) { return message.channel.send({ embeds: [noq] }) }
     const bar = client.modules.progressbar(client, check.position, check.queue.current.duration)
     const embed = client.modules.embed(client, client.colors.cyan, `${client.emotes.music} | **Now Playing:**\n[${check.queue.current.title}](${check.queue.current.uri})\n${client.emotes.parrow} Requested by: ${check.queue.current.requester}\n${bar}`)
     message.channel.send({ embeds: [embed] })
  }
}}