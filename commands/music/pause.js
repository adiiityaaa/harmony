module.exports = {
  name: "pause",
  aliases: [""],
  clientperms: ["CONNECT", "SPEAK", "EMBED_LINKS", "USE_EXTERNAL_EMOTES"],
  cooldown: 5000,
  usage: "h!pause",
  description: "Pauses the Current Song!",
  category: "Music",
  run: async(client, message, args) => {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const already = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Player is already Paused!**`)  
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Paused the Song!**`)
  const player = client.manager.players.get(message.guild.id);
  if(!player) { return message.channel.send({ embeds: [noq] }) }
  if(player) {
   const member = message.member;
   const chx = member.voice.channel;
   if(!chx) { return message.channel.send({ embeds: [novc] }) }
   if(message.guild.me.voice.channel && member.voice.channel.id !== message.guild.me.voice.channel.id || chx.id !== player.voiceChannel) { return message.channel.send({ embeds: [nomutu] }) }
   if(!player.queue) { return message.channel.send({ embeds: [noq] }) }
   if(!player.playing) { return message.channel.send({ embeds: [already] }) }   
   if(message.member.voice.selfDeaf) { return message.channel.send({ embeds: [self] }) }
   await player.pause(true)
   message.channel.send({ embeds: [success] })
}}}