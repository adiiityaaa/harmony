module.exports = {
  name: "stop",
  aliases: ["destroy", "fuckoff"],
  clientperms: ["CONNECT", "SPEAK", "EMBED_LINKS", "USE_EXTERNAL_EMOTES"],
  cooldown: 5000,
  usage: "h!stop",
  djOnly: true,
  description: "Stops the Song and clears the Queue!",
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
     const embed = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Player has been Stoped!**`)
     message.channel.send({ embeds: [embed] })
     await check.destroy()
     const reqchx = await client.modules.reqchx(client, check);
     if(reqchx === false) { return; }
     else if(reqchx === true) { await client.modules.reset(client, check) }
  }
}}