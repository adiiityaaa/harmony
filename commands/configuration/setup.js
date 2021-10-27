module.exports = {
 name: "setup",
 description: "Setup the Request Channel!",
 usage: "h!setup",
 category: "Configuration",
 cooldown: 60000,
 clientperms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "SEND_MESSAGES", "MANAGE_CHANNELS"],
 memberperms: ["MANAGE_GUILD"],
 run: async(client, message, args) => {
const already = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Request Channel is already Setupped!**`);
const check = await client.modules.already(client, message);
if(check === true) { return message.channel.send({ embeds: [already] })}
else if(check == false) {
const qembed = new client.modules.embed(client, client.colors.cyan, `${client.emotes.music} **Harmony Music** | **No Song Playing Currently!**\n\n${client.emotes.parrow} How to play a Song?\n${client.emotes.garrow} Join a Voice Channel.\n${client.emotes.garrow} Send Song Name or URL!\n${client.emotes.parrow} What are the Supported Sources?\n${client.emotes.garrow} YouTube, Spotify, Soundcloud, Deezer, Facebook, Apple Music, etc.\n${client.emotes.parrow} My Messages are Ignored?\n${client.emotes.rarrow} Messages starting with Prefix will be Ignored!\n${client.emotes.parrow} [Invite Harmony](https://discord.com/api/oauth2/authorize?client_id=819931019024269352&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/UjaSx57Hpd)`)
const pembed = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.music} **Harmony Music** | **No Song Playing Currently!**\n\n${client.emotes.parrow} [Invite Harmony](https://discord.com/api/oauth2/authorize?client_id=819931019024269352&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/UjaSx57Hpd)`)
.setImage("https://media.discordapp.net/attachments/854672348945711154/862617983067357204/20210708_142546.jpg?width=1144&height=643")
.setColor(client.colors.cyan)
const btn = client.buttons.isystembtn(client); 
const chx2 = await message.guild.channels.create(`📝｜harmony-request`, {
      type: 'GUILD_TEXT', 
      topic: "Harmony brings you an Interactive way of Listening to Music with Harmony-Player. To play a Song, Join a Voice or Stage channel and send the Song URL or Name.",
      parent: message.channel.parent.id,
    rateLimitPerUser: 6,
    reason: `Request Channel Setup | by ${message.author.tag}`
    });   
await chx2.send({ embeds: [qembed] }).then(x => client.db.set(`isystemqembed_${message.guild.id}`, x.id))
await chx2.send({ embeds: [pembed], components: btn }).then(x => client.db.set(`isystempembed_${message.guild.id}`, x.id))
await chx2.messages.fetch({ limit: 3 }).then(message =>
message.forEach(m => m.pin()))
setTimeout(function() { chx2.messages.fetch({ limit: 10 }).then(async(messages) => { const input = messages.filter(msg => !msg.pinned)
chx2.bulkDelete(input) }) }, 10000)    
await client.db.set(`isystemcheck_${message.guild.id}`, true)
await client.db.set(`isystemchx_${message.guild.id}`, chx2.id)
const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Request Channel Setupped in <#${chx2.id}>!**`)    
await message.channel.send({ embeds: [success] })    
}}}