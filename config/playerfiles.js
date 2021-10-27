const { requestLyricsFor, requestIconFor, requestTitleFor, requestAuthorFor } = require("solenolyrics");

module.exports.stop = stop;
module.exports.resume = resume;
module.exports.pause = pause;
module.exports.skip = skip;
module.exports.volume = volume;
module.exports.volup = volup;
module.exports.voldown = voldown;
module.exports.loopbtn = loopbtn;
module.exports.lyrics = lyrics;

async function stop(client, interaction) {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Player has been Stopped!**`)
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { return interaction.reply({ embeds: [noq] }) }
  if(player) {
   const member = interaction.member;
   const chx = member.voice.channel;
   if(!chx) { return interaction.reply({ embeds: [novc] }) }
   if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id || chx.id !== player.voiceChannel) { return interaction.reply({ embeds: [nomutu] }) }
   if(!player.queue || !player.playing) { return interaction.reply({ embeds: [noq] }) }
   if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
   await player.destroy()
   interaction.reply({ embeds: [success] })
   const reqchx = await client.modules.reqchx(client, player);
   if(reqchx === false) { return; }
   else if(reqchx === true) { await client.modules.reset(client, player) }
}}

async function skip(client, interaction) {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Skipping the Current Song...**`)
  const lastsong = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **This is the Last Song in Queue!**`)
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { return interaction.reply({ embeds: [noq] }) }
  if(player) {
   const member = interaction.member;
   const chx = member.voice.channel;
   if(!chx) { return interaction.reply({ embeds: [novc] }) }
   if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id || chx.id !== player.voiceChannel) { return interaction.reply({ embeds: [nomutu] }) }
   if(!player.queue || !player.playing) { return interaction.reply({ embeds: [noq] }) }
   if(player.queue.size === 0) { return interaction.reply({ embeds: [lastsong] }) }
   if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
   await player.stop()
   interaction.reply({ embeds: [success] })
}}

async function pause(client, interaction) {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const already = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Player is already Paused!**`)  
  const success = client.modules.embed(client, client.colors.green, `${client.emojis.cache.get("879225076602531870")} | **Paused the Song!**`)
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { return interaction.reply({ embeds: [noq] }) }
  if(player) {
   const member = interaction.member;
   const chx = member.voice.channel;
   if(!chx) { return interaction.reply({ embeds: [novc] }) }
   if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id || chx.id !== player.voiceChannel) { return interaction.reply({ embeds: [nomutu] }) }
   if(!player.queue) { return interaction.reply({ embeds: [noq] }) }
   if(!player.playing) { return interaction.reply({ embeds: [already] }) }   
   if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
   await player.pause(true)
   interaction.reply({ embeds: [success] })
}}

async function resume(client, interaction) {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Resumed the Song!**`)
  const already = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Player is already Playing!**`)  
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { return interaction.reply({ embeds: [noq] }) }
  if(player) {
   const member = interaction.member;
   const chx = member.voice.channel;
   if(!chx) { return interaction.reply({ embeds: [novc] }) }
   if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id || chx.id !== player.voiceChannel) { return interaction.reply({ embeds: [nomutu] }) }
   if(!player.queue) { return interaction.reply({ embeds: [noq] }) }
   if(player.playing) { return interaction.reply({ embeds: [already] }) }   
   if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
   await player.pause(false)
   interaction.reply({ embeds: [success] })
}}

async function previous(client, interaction) {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Playing the Previous Song...**`)
  const lastsong = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **There is no previous song!**`)
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { return interaction.reply({ embeds: [noq] }) }
  if(player) {
   const member = interaction.member;
   const chx = member.voice.channel;
   if(!chx) { return interaction.reply({ embeds: [novc] }) }
   if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id || chx.id !== player.voiceChannel) { return interaction.reply({ embeds: [nomutu] }) }
   if(!player.queue || !player.playing) { return interaction.reply({ embeds: [noq] }) }
   if(player.previous === null) { return interaction.reply({ embeds: [lastsong] }) }
   if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
   player.queue.unshift(player.previous);
   await player.stop()
   interaction.reply({ embeds: [success] })
}}

async function volume(client, interaction) {
  const novc = client.embeds.novcem(client);
  const nomutu = client.embeds.nomutuem(client);
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const range = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Volume must be in Range 0-120!**`)  
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { interaction.reply({ embeds: [noq] }) }
  if(player) {
  const member = interaction.member;
  const chx = member.voice.channel;
  if(!chx) { return interaction.reply({ embeds: [novc] }) }
  if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id) { return interaction.reply({ embeds: [nomutu] }) }
  if(!player.queue || !player.playing) { return interaction.reply({ embeds: [noq] }) }
  if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
  let vol = interaction.options.getNumber('level');
  if(vol < 0 || vol > 120) { return interaction.reply({ embed: [range] }) } 
  await player.setVolume(vol)
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Volume set to ${vol}%!**`)
  interaction.reply({ embeds: [success] })
}}

async function voldown(client, interaction) {
  const novc = client.embeds.novcem(client);
  const nomutu = client.embeds.nomutuem(client);
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const range = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Volume is at Lowest Level!**`)  
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { interaction.reply({ embeds: [noq] }) }
  if(player) {
  const member = interaction.member;
  const chx = member.voice.channel;
  if(!chx) { return interaction.reply({ embeds: [novc] }) }
  if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id) { return interaction.reply({ embeds: [nomutu] }) }
  if(!player.queue || !player.playing) { return interaction.reply({ embeds: [noq] }) }
  if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
  let vol = player.volume;
  if(vol === 10) { return interaction.reply({ embeds: [range] }) } 
  const time = vol - 10;
  await player.setVolume(time)
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Volume set to ${time}%!**`)
  interaction.reply({ embeds: [success] })
}}

async function volup(client, interaction) {
  const novc = client.embeds.novcem(client);
  const nomutu = client.embeds.nomutuem(client);
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const range = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Volume is at Highest Level!**`)  
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { interaction.reply({ embeds: [noq] }) }
  if(player) {
  const member = interaction.member;
  const chx = member.voice.channel;
  if(!chx) { return interaction.reply({ embeds: [novc] }) }
  if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id) { return interaction.reply({ embeds: [nomutu] }) }
  if(!player.queue || !player.playing) { return interaction.reply({ embeds: [noq] }) }
  if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
  let vol = player.volume;
  if(vol > 110) { return interaction.reply({ embeds: [range] }) } 
  const time = vol + 10;
  await player.setVolume(time)
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Volume set to ${time}%!**`)
  interaction.reply({ embeds: [success] })
}}

async function loopbtn(client, interaction) {
  const loop = new Map();
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const self = client.embeds.defem(client);
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { return interaction.reply({ embeds: [noq] }) }
  if(player) {
   const member = interaction.member;
   const chx = member.voice.channel;
   if(!chx) { return interaction.reply({ embeds: [novc] }) }
   if(interaction.guild.me.voice.channel && member.voice.channel.id !== interaction.guild.me.voice.channel.id || chx.id !== player.voiceChannel) { return interaction.reply({ embeds: [nomutu] }) }
   if(!player.queue || !player.playing) { return interaction.reply({ embeds: [noq] }) }
   if(interaction.member.voice.selfDeaf) { return interaction.reply({ embeds: [self] }) }
   let description;
   if(!player.trackRepeat && !loop.get(interaction.guild.id)) {
              loop.set(interaction.guild.id, 1)
              player.setQueueRepeat(true);
              player.setTrackRepeat(false);
              description = "Now Looping the Queue!";
            }
   else if(player.trackRepeat && loop.get(interaction.guild.id) === 1) {
              loop.set(interaction.guild.id, 2)
              player.setTrackRepeat(true);
              player.setQueueRepeat(false);
              description = "Now Looping the Current Song!";
            }
   else {  loop.delete(interaction.guild.id)
              player.setTrackRepeat(false);
              player.setQueueRepeat(false);
              description = "Loop Mode Disabled!";
            } 
   const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **${description}**`)    
   interaction.reply({ embeds: [success] })
}}

async function lyrics(client, interaction) {
  const err = client.embeds.errem(client);
  const noq = client.embeds.noqem(client);
  const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Player has been Stopped!**`)
  const player = client.manager.players.get(interaction.guild.id);
  if(!player) { return interaction.reply({ embeds: [noq] }) }
  if(player) {
  if(!player.queue || !player.playing) { return interaction.reply({ embeds: [noq] }) }
  const song = player.queue.current.title;
  const raw = song.toLowerCase().replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "");
  const data = await requestLyricsFor(raw);
  const title = await requestTitleFor(raw);
  const author = await requestAuthorFor(raw);
  const embed = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.music} | ${title}\n${client.emotes.parrow} by ${author}\n\n${data.slice(0, 4020)}...`)
  .setColor(client.colors.cyan)
}}