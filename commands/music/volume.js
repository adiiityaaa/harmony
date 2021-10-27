module.exports = {
  name: "volume",
  aliases: ["vol"],
  clientperms: ["CONNECT", "SPEAK", "EMBED_LINKS", "USE_EXTERNAL_EMOTES"],
  cooldown: 5000,
  usage: "h!volume <level>",
  description: "Manipulate the Volume Level of the Song!",
  category: "Music",
  run: async(client, message, args) => {
  const novc = client.embeds.novcem(client);
  const nomutu = client.embeds.nomutuem(client);
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const range = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Volume must be in Range 1-120!**`)  
  const novol = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please provide a Volume Level!**`)  
  const nonum = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Volume must be a Number!**`)   
  const player = client.manager.players.get(message.guild.id);
  if(!player) { return message.channel.send({ embeds: [noq] }) }
  if(player) {
   const member = message.member;
   const alr = player.volume;
   const chx = member.voice.channel;
   if(!chx) { return message.channel.send({ embeds: [novc] }) }
   if(message.guild.me.voice.channel && member.voice.channel.id !== message.guild.me.voice.channel.id) { return message.channel.send({ embeds: [nomutu] }) }
   if(!player.queue) { return message.channel.send({ embeds: [noq] }) }
   if(message.member.voice.selfDeaf) { return message.channel.send({ embeds: [self] }) }
   let vol = args.slice(0).join(" ");
   const already = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Volume is already ${vol}%!**`)       
   if(!vol) { return message.channel.send({ embeds: [novol] }) }
   if (isNaN(vol)) { return message.channel.send({ embeds: [nonum] }) }
   if(vol < 1 || vol > 120) { return message.channel.send({ embeds: [range] }) }
   if(vol === alr) { return message.channel.send({ embeds: [already] }) }
   await player.setVolume(vol)
   const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Volume set to ${vol}%!**`)
   message.channel.send({ embeds: [success] })
}}}