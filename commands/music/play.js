module.exports = {
  name: "play",
  aliases: ["p"],
  clientperms: ["CONNECT", "SPEAK", "EMBED_LINKS", "USE_EXTERNAL_EMOTES"],
  cooldown: 5000,
  usage: "h!play <song>",
  description: "Play a Song in your Voice Channel!",
  run: async(client, message, args) => {
  const novc = client.embeds.novcem(client)
  const nomutu = client.embeds.nomutuem(client)
  const nosong = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please provide a Song Name/Link!**`)
  const cantjoin = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Cannot join your Voice Channel!**`)
  const err = client.embeds.errem(client);
  const channel = message.member.voice.channel;
  let reqchx;
  const check = client.manager.players.get(message.guild.id);
  if(!check) {
      const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    }) }
 const player = client.manager.players.get(message.guild.id);
 if(!channel.joinable) { return message.channel.send({ embeds: [cantjoin] }) }
 const query = args.join(" ");
 if(!query) { return message.channel.send({ embeds: [nosong] })}
 const noresult = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **No Results found for __${query}__!**`)
  const reqcheck = await client.modules.mreqchx(client, message.channel.id, message.guild.id);
 if(reqcheck === true) {
 if(player.state !== "CONNECTED") player.connect()
 let res;
 try {
    res = await player.search(query, message.author)
    if (res.loadType === 'LOAD_FAILED') {
      if (!player.queue.current) player.destroy()
      message.channel.send({ embeds: [err] })
    }
  } catch (err) {
    return message.channel.send({ embeds: [noresult] })
  }

  switch (res.loadType) {
    case 'NO_MATCHES':
      if (!player.queue.current) player.destroy()
      return message.channel.send({ embeds: [noresult] });

    case 'TRACK_LOADED':
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
       await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player)        
      return;

    case 'PLAYLIST_LOADED':
      await player.queue.add(res.tracks)
      if (!player.playing && !player.paused) player.play();
       await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player)         
      return;

    case 'SEARCH_RESULT':
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
       await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player) 
      return;
  }
 } else if(reqcheck === false) {
 const search = client.modules.embed(client, client.colors.yellow, `${client.emotes.loading} | **Searching for __${query}__**`)
 const msg = await message.channel.send({ embeds: [search] });
 if(player.state !== "CONNECTED") player.connect()
 let res;
 try {
    res = await player.search(query, message.author)
    if (res.loadType === 'LOAD_FAILED') {
      msg.delete()
      if (!player.queue.current) player.destroy()
      message.channel.send({ embeds: [err] })
    }
  } catch (err) {
    return message.channel.send({ embeds: [noresult] })
  }

  switch (res.loadType) {
    case 'NO_MATCHES':
      msg.delete()
      if (!player.queue.current) player.destroy()
      return message.channel.send({ embeds: [noresult] });

    case 'TRACK_LOADED':
      msg.delete()
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
      const embed2 = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Song added to Queue!**\n${client.emotes.parrow} [${res.tracks[0].title}](${res.tracks[0].uri}) by ${res.tracks[0].author}\n${client.emotes.parrow} Requester: ${res.tracks[0].requester} | Duration: ${client.modules.duration(res.tracks[0].duration)}`)
       await message.channel.send({ embeds: [embed2] })
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
       await message.channel.send({ embeds: [embed3] })
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
       await message.channel.send({ embeds: [embed4] }) 
       const finalcheck3 = await client.modules.isystem(client, player);
       if(finalcheck3 === false) { return; }    
       else if(finalcheck3 === true) { await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player) }       
      return;
  }
}}}