const { requestLyricsFor, requestIconFor, requestTitleFor, requestAuthorFor } = require("solenolyrics");
module.exports = {
  name: "lyrics",
  aliases: [""],
  clientperms: ["CONNECT", "SPEAK", "EMBED_LINKS", "USE_EXTERNAL_EMOTES"],
  cooldown: 5000,
  usage: "h!lyrics <song>",
  description: "Displays the Lyrics of the Current Song or Input!",
  run: async(client, message, args) => {
  const nosong = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please provide a Song Name!**`)      
  let song = args.join(" ");
  if(!song) {
  const player = client.manager.players.get(message.guild.id);
  if(!player) { return message.channel.send({ embeds: [nosong] }) }
  else { song = player.queue.current.title; }
  }
  const raw = song.toLowerCase().replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "");
  const data = await requestLyricsFor(raw)
  const title = await requestTitleFor(raw)
  const author = await requestAuthorFor(raw)
  const embed = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.music} | ${title}\n${client.emotes.parrow} by ${author}\n\n${data.slice(0, 4020)}...`)
  .setColor(client.colors.cyan)
  message.channel.send({ embeds: [embed] })      
  }}