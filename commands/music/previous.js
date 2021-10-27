module.exports = {
  name: "previous",
  aliases: ["back"],
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
  const embed = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **No Previos Song!**`)
  const player = client.manager.players.get(message.guild.id);
  if(!player) { return message.channel.send({ embeds: [noq] })}
  const channel = message.member.voice.channel;
  if(!channel) { return message.channel.send({ embeds: [novc] }) }
  if(message.guild.me.voice.channel && channel.id !== message.guild.me.voice.channel.id || channel.id !== player.voiceChannel) { return message.channel.send({ embeds: [nomutu] }) }
  if(player) {
      if(player.queue.previous.size === 0) { return message.channel.send({ embeds: [embed] }) }
      if(!player.previous) { return message.channel.send({ embeds: [embed] }) }
      else {
      message.reply("Coming soon!")
}}}}