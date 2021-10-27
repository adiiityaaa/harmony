module.exports = {
 name: "setdj",
 description: "Set the DJ Role!",
 usage: "h!setdj <role>",
 category: "Configuration",
 cooldown: 60000,
 aliases: ["setdjrole"],
 clientperms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "SEND_MESSAGES", "MANAGE_CHANNELS"],
 memberperms: ["MANAGE_GUILD"],
 run: async(client, message, args) => {
 const norole = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please provide a Role!**`)
 const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
 if(!role) { return message.channel.send({ embeds: [norole] }) };
 if(role) {
 await client.db.set(`djrolecheck_${message.guild.id}`, true)
 await client.db.set(`djrole_${message.guild.id}`, role.id)
 const done = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **DJ Role set to <@&${role.id}>!**`)
 message.channel.send({ embeds: [done] })
 }}}     