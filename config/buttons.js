module.exports.delbtn = delbtn;
module.exports.srcbtn = srcbtn;
module.exports.addbtn = addbtn;
module.exports.genlinkbtn = genlinkbtn;
module.exports.isystembtn = isystembtn;

function delbtn(client) {
  const rawdlbtn = new client.discord.MessageButton()
  .setEmoji("<:hdelete:884339741389115453>")
  .setCustomId("delete_message")
  .setStyle("DANGER")
  const dlbtn = new client.discord.MessageActionRow()
  .addComponents(rawdlbtn)
  return dlbtn;
}

function srcbtn(client) {
  const rawdlbtn = new client.discord.MessageButton()
  .setLabel("Source Code")
  .setStyle("LINK")
  .setURL("https://sourcecode.jarvis3653.repl.co/")
  const dlbtn = new client.discord.MessageActionRow()
  .addComponents(rawdlbtn)
  return dlbtn;
}

function addbtn(client) {
   const rawaddbtn = new client.discord.MessageButton()
  .setLabel("Invite")
  .setStyle("LINK")
  .setURL("https://discord.com/api/oauth2/authorize?client_id=797508916518584351&permissions=8&scope=bot%20applications.commands")
   const rawsupbtn = new client.discord.MessageButton()
  .setLabel("Support Server")
  .setStyle("LINK")
  .setURL("https://discord.gg/UjaSx57Hpd")
   const invbtn = new client.discord.MessageActionRow()
  .addComponents(rawaddbtn, rawsupbtn)
  return invbtn;
}

function genlinkbtn(client, link) {
   const button = new client.discord.MessageButton()
  .setLabel("Click here to Join!")
  .setStyle("LINK")
  .setURL(`${link}`)
   const btn = new client.discord.MessageActionRow()
  .addComponents(button)
  return btn;
}

function isystembtn(client) {
  const button1 = new client.discord.MessageButton()
  .setStyle('PRIMARY')
  .setEmoji('863434522791247925')
  .setCustomId('previous_song')  
const button2 = new client.discord.MessageButton()
   .setStyle('DANGER')
  .setEmoji('863434545784291348')
  .setCustomId('pause_song')  
const button3 = new client.discord.MessageButton()
  .setStyle('SUCCESS')
  .setEmoji('863434655000952832')
  .setCustomId('resume_song')  
const button4 = new client.discord.MessageButton()
  .setStyle('DANGER')
  .setEmoji('863436294636961812')
  .setCustomId('stop_song')  
const button5 = new client.discord.MessageButton()
  .setStyle('PRIMARY')
  .setEmoji('863436483142615101')
  .setCustomId('next_song')
const button6 = new client.discord.MessageButton()
  .setStyle('PRIMARY')
  .setEmoji('863473242479263764')
  .setCustomId('volremove_song')  
const button7 = new client.discord.MessageButton()
   .setStyle('DANGER')
  .setEmoji('863434613367504916')
  .setCustomId('lyrics_song')  
const button8 = new client.discord.MessageButton()
  .setStyle('SUCCESS')
  .setEmoji('863434569742286848')
  .setCustomId('autoplay_song')  
const button9 = new client.discord.MessageButton()
  .setStyle('DANGER')
  .setEmoji('863434591327223888')
  .setCustomId('loop_song')  
const button10 = new client.discord.MessageButton()
  .setStyle('PRIMARY')
  .setEmoji('863473186204811324')
  .setCustomId('voladd_song')
const button11 = new client.discord.MessageButton()
  .setStyle('PRIMARY')
  .setEmoji('863434502549012480')
  .setCustomId('unseek_song')  
const button12 = new client.discord.MessageButton()
   .setStyle('DANGER')
  .setEmoji('863434632799322112')
  .setCustomId('shuffle_song')  
const button13 = new client.discord.MessageButton()
  .setStyle('SUCCESS')
  .setEmoji('863438855846625311')
  .setCustomId('save_song')  
const button14 = new client.discord.MessageButton()
  .setStyle('DANGER')
  .setEmoji('863436345095618571')
  .setCustomId('addrelated_song')  
const button15 = new client.discord.MessageButton()
  .setStyle('PRIMARY')
  .setEmoji('863436426367336448')
  .setCustomId('seek_song')
let row1 = new client.discord.MessageActionRow()
  .addComponents(button1, button2, button3, button4, button5);
let row2 = new client.discord.MessageActionRow()
  .addComponents(button6, button7, button8, button9, button10);
let row3 = new client.discord.MessageActionRow()
  .addComponents(button11, button12, button13, button14, button15);
  return [row1, row2, row3]
}
