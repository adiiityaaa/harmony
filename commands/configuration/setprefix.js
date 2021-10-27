module.exports = {
  name: "setprefix",
  description: "Lets you Change the Prefix",
  cooldown: 10000,
  category: "Configuration",
  aliases: ["prefix"],
  memberperms: ["MANAGE_GUILD"],
  usage: "h!setprefix <prefix>",
  clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
  run: async (client, message, args) => {
 const fals1 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **No Prefix Provided!**`)
 const fals2 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Prefix must be Single Argument!**`)
 const fals3 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Prefix cannot exceed 5 Characters!**`)
 const reset = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Prefix Resetted!**\n${client.emotes.parrow} New Prefix: \`${client.settings.prefix}\``)
 if(!args[0]) { return message.channel.send({ embeds: [fals1] }) } 
 if(args[1]) {  return message.channel.send({ embeds: [fals2] }) }
 if(args[0].length > 5) { return message.channel.send({ embeds: [fals3] }) }
 if(args.join("") === client.settings.prefix) { await client.db.delete(`prefix_${message.guild.id}`)
 return await message.channel.send({ embeds: [reset] }) }
 client.db.set(`prefix_${message.guild.id}`, args[0])
 const correct = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Prefix Changed!**\n${client.emotes.parrow} New Prefix: \`${args[0]}\``)
 await message.channel.send({ embeds: [correct] })
}}