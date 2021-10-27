module.exports.run = async(client, player, track) => {
  const embed = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.music} | **Now Playing**\n\n${client.emotes.parrow} [${track.title}](${track.uri}) by ${track.author}\n${client.emotes.parrow} Requested by: ${track.requester} | Duration: ${client.modules.duration(client, track.duration)}`)
  .setThumbnail(track.thumbnail)
  .setColor(client.colors.green)
 const check = await client.modules.reqchx(client, player);
 if(check === false) { client.channels.cache.get(player.textChannel).send({ embeds: [embed] }) }
 else if(check === true) { await client.modules.editpembed(client, player) 
 await client.modules.editqembed(client, player) }
const check2 = await client.modules.isystem(client, player);
if(check2 === false) { return; }    
else if(check2 === true) { await client.modules.editpembed(client, player) 
 await client.modules.editqembed(client, player) }
 const server = client.guilds.cache.get(player.guild);
 if(player.voiceChannel.type === "GUILD_STAGE_VOICE" && server.me.voice.suppress) {
   try {
    setTimeout(async () => {
       await server.me.voice.setSuppressed(false); 
    }, 1000) 
 } catch(e) {
   console.log(e)
}} 
 const check3 = await client.db.get(`autoplaycheck_${player.guild}`);
 if(check3 === null || check3 === false) { return; }
 else if(check3 === true) {
 const data = {
 identity: track.identifier
 }
setTimeout(() => {      
  client.db.set(`autoplaydata_${player.guild}`, data)     
}, 3000)}
}  