const { requestLyricsFor, requestIconFor, requestTitleFor, requestAuthorFor } = require("solenolyrics");
module.exports = {
  name: "lyrics",
  description: "Displays the Lyrics of the Current Song or Input!",
  options: [
    {
      name: "song",
      type: "STRING",
      description: "The Name of the Song whose Lyrics are to be Fetched!",
      required: false,
    },
  ],
  run: async(client, interaction) => {
  const nosong = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please provide a Song Name!**`)
  let song = interaction.options.getString('song');
  if(!song) {
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { return interaction.reply({ embeds: [nosong] }) }
  else { song = player.queue.current.title; }
  }
  const raw = song.toLowerCase().replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "");
  const data = await requestLyricsFor(raw)
  const title = await requestTitleFor(raw)
  const author = await requestAuthorFor(raw)
  const embed = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.music} | ${title}\n${client.emotes.parrow} by ${author}\n\n${data.slice(0, 4020)}...`)
  .setColor(client.colors.cyan)
  interaction.reply({ embeds: [embed] })      
  }}