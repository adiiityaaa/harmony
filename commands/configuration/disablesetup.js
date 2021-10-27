module.exports = {
name: "disablesetup",
usage: "h!disablesetup",
aliases: ["unset"],
cooldown: 10000,
clientperms: ["MANAGE_CHANNELS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
memberperms: ["MANAGE_GUILD"],
category: "Configuration",
description: "Disable the Request Channel!",    
run: async(client, message, args) => {
const notset = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Request Channel isn't setupped!**`);    
let done;
const done1 = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Request Channel Disabled!**`);
const done2 = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Request Channel Disabled!**\n${client.emotes.rarrow} **Could not delete Channels!**`);    
let checking = await client.db.get(`isystemcheck_${message.guild.id}`);
if(checking === null) { return message.channel.send({ embeds: [notset] }) }
if(checking === true) {
   await client.db.delete(`isystempembed_${message.guild.id}`)
   await client.db.delete(`isystemqembed_${message.guild.id}`)       
   await client.db.delete(`isystemcheck_${message.guild.id}`)    
const data1 = await client.db.get(`isystemchx_${message.guild.id}`)
const data2 = await client.db.get(`isystemcat_${message.guild.id}`)
const data3 = await client.db.get(`isystemvoice_${message.guild.id}`)
const chx1 = client.channels.cache.get(data1);
const chx2 = client.channels.cache.get(data2);
const chx3 = client.channels.cache.get(data3);
if(!chx1) {
   done = done2;
}
if(!chx2) {
    done = done2;
}    
if(!chx3) {
    done = done2;
}    
try {
   done = done1;
   await chx1.delete()
   await chx2.delete()
   await chx3.delete()   
   await client.db.delete(`isystemchx_${message.guild.id}`);
   await client.db.delete(`isystemcat_${message.guild.id}`);
   await client.db.delete(`isystemvoice_${message.guild.id}`);
    
} catch(e) {
   done = done2;
   await client.db.delete(`isystemchx_${message.guild.id}`);
   await client.db.delete(`isystemcat_${message.guild.id}`);
   await client.db.delete(`isystemvoice_${message.guild.id}`);
   console.log(e)
}
message.channel.send({ embeds: [done] })
}}}