module.exports = {
name: "reset",
cooldown: 5000,
aliases: ["factoryreset"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Reset every setting of the Bot!",
usage: "h!reset",
category: "Moderative",
memberperms: ["MANAGE_GUILD"],
run: async(client, message, args) => {
const areyousure = client.modules.embed(client, client.colors.yellow, `${client.emotes.package} | **Do you want to Continue?**`);
const notforyou = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **This interaction is not for you!**`);    
const ended = client.modules.embed(client, client.colors.yellow, `${client.emotes.settings} | **Reset Confirmation has Ended.**`);    
const cancelled = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Reset has been Cancelled!**`);    
const success = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Reset has been executed Successfully!**`);
const btn1 = new client.discord.MessageButton()
  .setEmoji("<:hcross:879225003114106943>")
  .setCustomId("cancelreset")
  .setStyle("SUCCESS")
const btn2 = new client.discord.MessageButton()
  .setEmoji("<:hcheck:879225076602531870>")
  .setCustomId("confirmreset")
  .setStyle("DANGER")  
const row = new client.discord.MessageActionRow()
  .addComponents(btn2, btn1)
message.channel.send({ embeds: [areyousure], components: [row] }).then(msg => {
const filter = i => { i.deferUpdate();
return i.customId === "confirmreset" || i.customId === "cancelreset" && i.user.id === message.author.id; };
msg.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 30000 })    
.then(int => { 
 if(int.customId === "confirmreset") { 
    msg.delete()
    client.modules.reset(client, message)
    int.channel.send({ embeds: [success] });
 } else if(int.customId === "cancelreset") {
    int.channel.send({ embeds: [cancelled] })
    msg.delete()
}})})}}