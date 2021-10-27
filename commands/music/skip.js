module.exports = {
  name: "skip",
  aliases: ["next", "n"],
  clientperms: ["CONNECT", "SPEAK", "EMBED_LINKS", "USE_EXTERNAL_EMOTES"],
  cooldown: 5000,
  usage: "h!skip",
  djOnly: true,
  description: "Skips the Current Song!",
  run: async(client, message, args) => {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const check = client.manager.players.get(message.guild.id);
  if(!check) { return message.channel.send({ embeds: [noq] })}
  const channel = message.member.voice.channel;
  if(!channel) { return message.channel.send({ embeds: [novc] }) }
  if(message.guild.me.voice.channel && channel.id !== message.guild.me.voice.channel.id || channel.id !== check.voiceChannel) { return message.channel.send({ embeds: [nomutu] }) }
  if(check) {
     const lastsong = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **This is the Last Song in Queue!**`)
     if(check.queue.size === 0) { return message.channel.send({ embeds: [lastsong] }) }
     const embed = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Skipping the Song...**`)
     check.stop()
     message.channel.send({ embeds: [embed] })
  }
}}