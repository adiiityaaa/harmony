module.exports = {
 name: "unsetdj",
 description: "Unset the DJ Role if it Exists!",
 usage: "h!unsetdj",
 category: "Configuration",
 cooldown: 60000,
 aliases: ["unsetdjrole"],
 clientperms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "SEND_MESSAGES", "MANAGE_CHANNELS"],
 memberperms: ["MANAGE_GUILD"],
 run: async(client, message, args) => {
 const norole = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **No DJ Role has been Set!**`);  
 const done = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **DJ Role has been Disabled!**`);
 const check = await client.db.get(`djrolecheck_${message.guild.id}`);
 if(check === null) { return message.channel.send({ embeds: [norole] }) }
 else if(check === true) {
 await client.db.delete(`djrolecheck_${message.guild.id}`);
 await client.db.delete(`djrole_${message.guild.id}`);
 message.channel.send({ embeds: [done] })
 }}}     