module.exports.run = async(client, interaction) => {
if(!interaction.inGuild()) { return; }
if(interaction.isCommand()) {
  const intslashcmd = client.slashcommands.get(interaction.commandName)
  if(!intslashcmd) { return; }    
  if(intslashcmd.voiceChannel) {
    const novc = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please join a Voice Channel!`)
    if(!interaction.member.voice.channel) { interaction.reply({ embeds: [novc] }) }}
if(intslashcmd.mutualChannel) {
    const nomutu = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **You should be in a Mutual Voice Channel!`)
    if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) { return interaction.reply({ embeds: [nomutu] }) }} 
if(intslashcmd.devOnly) {
    if (interaction.user.id !== client.settings.devID) {
         const devsonly = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Command restricted to Developers.**`)
      return interaction.reply({ embeds: [devsonly] }); }}
 if(intslashcmd.clientperms) {
        const Permissions = intslashcmd.clientperms.filter(x => !interaction.guild.me.permissions.has(x)).map(x => "`" + x + "`")
        if (Permissions.length) {
         const perms1 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Client Missing Permissions!**\n${client.emotes.rarrow} This Command Requires: ${Permissions.join(", ")}!`)
        return interaction.reply({ embeds: [perms1] }); }}    
 if(intslashcmd.memberperms) {
         const Permissions = intslashcmd.memberperms.filter(x => !interaction.member.permissions.has(x)).map(x => "`" + x + "`")
         if (Permissions.length) { 
         const perms2 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **User Missing Permissions!**\n${client.emotes.rarrow} This Command Requires: ${Permissions.join(", ")}!`)
        return interaction.reply({ embeds: [perms2] }); }} 
  try {
   const nodj = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **This is a DJ only Commmand!**`)
   const check = await client.modules.djcheckint(client, interaction);
   if(check === true && intslashcmd.djOnly) { 
   const memcheck = await client.modules.isadjint(client, interaction);
   if(memcheck === false) { return interaction.reply({ embeds: [nodj] }); }
   else if(memcheck === true) { await client.slashcommands.get(interaction.commandName).run(client, interaction); } }
   else if(check === true && !intslashcmd.djOnly) { await client.slashcommands.get(interaction.commandName).run(client, interaction); }
   else if(check === false && intslashcmd.djOnly) { await client.slashcommands.get(interaction.commandName).run(client, interaction); }
   else if(check === false && !intslashcmd.djOnly) { await client.slashcommands.get(interaction.commandName).run(client, interaction); }
   else if(!intslashcmd.djOnly) { await client.slashcommands.get(interaction.commandName).run(client, interaction); }
	} catch (error) {
		console.error(error);
        const riperr = new client.discord.MessageEmbed()
        .setColor(client.colors.red)
        .setDescription(`${client.emotes.error} | **An Error has Occured!**`)
		await interaction.reply({ embeds: [riperr], ephemeral: true });
	}
} else if(interaction.isButton) {
  if(interaction.customId === "stop_song") {
     client.music.stop(client, interaction)
  }	else if(interaction.customId === "pause_song") {
     client.music.pause(client, interaction)
  }	else if(interaction.customId === "resume_song") {
     client.music.resume(client, interaction)
  } else if(interaction.customId === "next_song") {
     client.music.skip(client, interaction)
  }	else if(interaction.customId === "volremove_song") {
     client.music.voldown(client, interaction)
  }	else if(interaction.customId === "voladd_song") {
     client.music.volup(client, interaction)
  }	else if(interaction.customId === "loop_song") {
     client.music.loopbtn(client, interaction)
  }	else if(interaction.customId === "lyrics_song") {
     client.music.lyrics(client, interaction)
  }	
}}