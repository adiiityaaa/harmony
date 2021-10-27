module.exports = {
name: "play",
description: "Play a Song in your Voice Channel!",
options: [
    {
      name: "song",
      type: "STRING",
      description: "The URL or Name of the Song to be Played",
      required: true,
    },
  ],
run: async(client, interaction) => {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const nosong = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please provide a Song Name/Link!**`)
  const cantjoin = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Cannot join your Voice Channel!**`)
  const err = client.embeds.errem(client);
  const channel = interaction.member.voice.channel;
    if(!channel) { return interaction.reply({ embeds: [novc] }) }
  if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) { return interaction.reply({ embeds: [nomutu] }) }
  let reqchx;
  const check = client.manager.players.get(interaction.guild.id);
  if(!check) {
      const player = interaction.client.manager.create({
      guild: interaction.guild.id,
      voiceChannel: channel.id,
      textChannel: interaction.channel.id,
      selfDeafen: true,
    }) }
 const player = client.manager.players.get(interaction.guild.id);
 if(interaction.guild.me.voice.channel && channel.id !== interaction.guild.me.voice.channel.id || channel.id !== player.voiceChannel) { return interaction.reply({ embeds: [nomutu] }) }
 if(!channel.joinable) { return interaction.reply({ embeds: [cantjoin] }) }
 const query = interaction.options.getString('song');
 const noresult = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **No Results found for __${query}__!**`)   
 const search = client.modules.embed(client, client.colors.yellow, `${client.emotes.loading} | **Searching for __${query}__**`)
 const msg = await interaction.channel.send({ embeds: [search] });
 if(player.state !== "CONNECTED") player.connect()
 let res;
 try {
    res = await player.search(query, interaction.member)
    if (res.loadType === 'LOAD_FAILED') {
      msg.delete()
      if (!player.queue.current) player.destroy()
      interaction.reply({ embeds: [err] })
    }
  } catch (err) {
    return interaction.reply({ embeds: [noresult] })
  }

  switch (res.loadType) {
    case 'NO_MATCHES':
      msg.delete()
      if (!player.queue.current) player.destroy()
      return interaction.reply({ embeds: [noresult] });

    case 'TRACK_LOADED':
      msg.delete()
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
      const embed2 = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Song added to Queue!**\n${client.emotes.parrow} [${res.tracks[0].title}](${res.tracks[0].uri}) by ${res.tracks[0].author}\n${client.emotes.parrow} Requester: ${res.tracks[0].requester} | Duration: ${client.modules.duration(res.tracks[0].duration)}`)
       await interaction.reply({ embeds: [embed2] })
       const finalcheck1 = await client.modules.isystem(client, player);
       if(finalcheck1 === false) { return; }    
       else if(finalcheck1 === true) { await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player) }          
      return;

    case 'PLAYLIST_LOADED':
      await msg.delete() 
      await player.queue.add(res.tracks)
      if (!player.playing && !player.paused) player.play();
            const embed3 = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Playlist added to Queue!**\n${client.emotes.parrow} ${res.playlist.name} [${res.tracks.length} Songs]\n${client.emotes.parrow} Requester: ${res.tracks[0].requester} | Duration: ${client.modules.duration(res.playlist.duration)}`)
       await interaction.reply({ embeds: [embed3] })
       const finalcheck2 = await client.modules.isystem(client, player);
       if(finalcheck2 === false) { return; }    
       else if(finalcheck2 === true) { await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player) }          
      return;

    case 'SEARCH_RESULT':
      msg.delete()
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
      const embed4 = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Song added to Queue!**\n${client.emotes.parrow} [${res.tracks[0].title}](${res.tracks[0].uri}) by ${res.tracks[0].author}\n${client.emotes.parrow} Requester: ${res.tracks[0].requester} | Duration: ${client.modules.duration(client, res.tracks[0].duration)}`)
       await interaction.reply({ embeds: [embed4] }) 
       const finalcheck3 = await client.modules.isystem(client, player);
       if(finalcheck3 === false) { return; }    
       else if(finalcheck3 === true) { await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player) }       
      return;
  }
}} 