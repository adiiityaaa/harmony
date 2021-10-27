module.exports = {
name: "afkclear",
cooldown: 5000,
aliases: ["clearawayfromkeyboard"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Clear AFK Status for an User!",
usage: "h!afkclear <userid> | <user mention>",
category: "Moderative",
memberperms: ["MANAGE_GUILD"],
run: async(client, message, args) => {
const embed = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **AFK Status Cleared!**`);
const embed2 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **User does not have AFK Status!**`);
const embed3 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Provide a Valid User!**`);    
const user = message.mentions.members.first() || message.guild.members.cache.get(args.join(" "));
if(!user) { message.channel.send({ embeds: [embed3] }) }
const member = client.users.cache.get(user.id);
const check = client.afkdb.get(member.id);
if(!check) { return message.channel.send({ embeds: [embed2] }) }
if(check) {
 client.afkdb.delete(member.id);
 message.channel.send({ embeds: [embed] })
 member.setNickname(member.user.username).catch(e => { return; })
}}}