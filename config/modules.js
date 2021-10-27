const prefix = "=";
const delay = require("delay");
const got = require('got');
const Chat = require('clever-chat');
const chat = new Chat({ name: "Harmony", gender: "Female", developer_name: "AG〢JARVIS#4782", user: "731870450669584458", language: "en", language2: "hi", country: "India", actress: "Disha Patani", age: "20", version: "v1.2.7", job: "Entertain people in the Discord Servers!", state: "Maharashtra" });

module.exports.embed = embed;
module.exports.reset = reset;
module.exports.progressbar = progressbar;
module.exports.reqchx = reqchx;
module.exports.duration = duration;
module.exports.editpembed = editpembed;
module.exports.editqembed = editqembed;
module.exports.resetdata = resetdata;
module.exports.lavaplay = lavaplay;
module.exports.mreqchx = mreqchx;
module.exports.viewprefix = viewprefix;
module.exports.isystem = isystem;
module.exports.already = already;
module.exports.chatbot = chatbot;
module.exports.runchatbot = runchatbot;
module.exports.djcheckm = djcheckm;
module.exports.isadjm = isadjm;
module.exports.autoplay = autoplay;
module.exports.afkcheck = afkcheck;
module.exports.djcheckint = djcheckint;
module.exports.isadjint = isadjint;
module.exports.automeme = automeme;

function embed(client, color, description) {
  const embed = new client.discord.MessageEmbed()
  .setColor(color)
  .setDescription(description)
  return embed;
}

function progressbar(client, current, total) {
const size = 16;
const line = "▬";
const position = ":radio_button:";    
	if (current > total) {
		const rawbar = `[${line.repeat(size)}](https://google.com/)`;
        const bar = rawbar + position;
		const percentage = (current / total) * 100;
		return [`${bar}\nDuration: [${current}/${total}] | Requester: ${percentage}%`];
	} else {
        const currr = parseInt(current);
        const tottt = parseInt(total);
		const percent = currr / tottt;
		const completed = Math.round((size * percent));
		const empty = size - completed;
		const rawbar1 = `[${line.repeat(completed)}](https://google.com/)`;
		const rawbar2 = line.repeat(empty);
		const bar = rawbar1 + position + rawbar2;
		const rawpercentage = percent * 100;
        const dur1 = client.modules.duration(client, current);
        const dur2 = client.modules.duration(client, total);
        let percentage;
        if(rawpercentage.length < 2) { percentage = 0 + rawpercentage.slice(0, 1) }
        else if(rawpercentage.length < 3) { rawpercentage.slice(0, 2) }
        else { percentage = rawpercentage; }
		return [`${bar}\nDuration: [${dur1}/${dur2}] | Requester: ${percentage}%`];
	}
}

function duration(client, time) {
    const h = Math.floor(time / 3600000);
    const m = Math.floor(time / 60000);
    const s = ((time % 60000) / 1000).toFixed(0);
    if (h < 1) { return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; }
    else { return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s; }
}

async function reqchx(client, player) {
  const check = await client.db.get(`isystemcheck_${player.guild}`);
  if(check === null) { return false; }
  if(check === true) {
  const chx = client.channels.cache.get(await client.db.get(`isystemchx_${player.guild}`))
  if(!chx) { return false; }
  if(player.textChannel === chx.id) { return true; }
  else { return false; }
  }
}

async function mreqchx(client, chxid, guildid) {
  const check = await client.db.get(`isystemcheck_${guildid}`);
  if(check === null) { return false; }
  if(check === true) {
  const chx = client.channels.cache.get(await client.db.get(`isystemchx_${guildid}`))
  if(!chx) { return false; }
  if(chxid === chx.id) { return true; }
  else { return false; }
  }
}

async function editpembed(client, player) {
   delay(1000)
   const dur = await client.modules.duration(client, player.queue.current.duration)
   const embed = new client.discord.MessageEmbed()
   .setFooter(`Total Songs: ${player.queue.size} | Volume: ${player.volume}%`)
   .setColor(client.colors.cyan)
   .setImage(`https://img.youtube.com/vi/${player.queue.current.identifier}/maxresdefault.jpg`)
   .setDescription(`${client.emotes.music} | **Now Playing:**\n\n${client.emotes.parrow} [${player.queue.current.title}](${player.queue.current.uri}) by ${player.queue.current.author}\n${client.emotes.parrow} Requester: ${player.queue.current.requester} | Duration: ${dur}`)
   const rawchx = await client.db.get(`isystemchx_${player.guild}`)
   const chx = client.channels.cache.get(rawchx);
   if(!chx) { return; }
   const m = await client.db.get(`isystempembed_${player.guild}`)
   const msg = client.channels.cache.get(rawchx).messages.fetch(m)
   if(!msg) { return; }
   const btn = client.buttons.isystembtn(client)
   await client.channels.cache.get(rawchx).messages.fetch(m).then(msg => { msg.edit({ embeds: [embed], components: btn }).catch(e => console.log(e)); })
}

async function editqembed(client, player) {
		const queue = player.queue;
		const duration = client.modules.duration(client, queue.duration);
		const a = 0;
		const b = queue.length > 10 ? 10 : queue.length
		const songs = player.queue.slice(a, b)
		const final = songs.map((song, i) => `#${i +1} ${client.emotes.parrow} [${song.title}](${song.uri}) : ${client.modules.duration(client, song.duration)}`).reverse().join("\n"); 
		const desc1 = `${client.emotes.music} Total Songs: ${songs.length} | Duration: ${client.modules.duration(client, songs.duration)}\n\n${final}`;
		const desc2 = `${client.emotes.music} No More Songs in the Queue! | Duration: ${duration}`;
		const desc = songs.length === 0 ? desc2 : desc1;
		const qembed = new client.discord.MessageEmbed()
		.setColor(client.colors.cyan)
		.setDescription(`${desc}`)
        const rawchx = await client.db.get(`isystemchx_${player.guild}`)
        const chx = client.channels.cache.get(rawchx);
        if(!chx) { return; }
        const m = await client.db.get(`isystemqembed_${player.guild}`)
        const msg = client.channels.cache.get(rawchx).messages.fetch(m)
        if(!msg) { return; }
        client.channels.cache.get(rawchx).messages.fetch(m).then(msg => { msg.edit({ embeds: [qembed] }).catch(e => console.log(e)); })
}

async function reset(client, player) {
const qembed = new client.modules.embed(client, client.colors.cyan, `${client.emotes.music} **Friday Music** | **No Song Playing Currently!**\n\n${client.emotes.parrow} How to play a Song?\n${client.emotes.garrow} Join a Voice Channel.\n${client.emotes.garrow} Send Song Name or URL!\n${client.emotes.parrow} What are the Supported Sources?\n${client.emotes.garrow} YouTube, Spotify, Soundcloud, Deezer, Facebook, Apple Music, etc.\n${client.emotes.parrow} My Messages are Ignored?\n${client.emotes.rarrow} Messages starting with Prefix will be Ignored!\n${client.emotes.parrow} [Invite Harmony](https://discord.com/api/oauth2/authorize?client_id=819931019024269352&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/UjaSx57Hpd)`)
const pembed = new client.discord.MessageEmbed()
.setDescription(`${client.emotes.music} **Friday Music** | **No Song Playing Currently!**\n\n${client.emotes.parrow} [Invite Harmony](https://discord.com/api/oauth2/authorize?client_id=819931019024269352&permissions=8&scope=bot%20applications.commands) | [Support Server](https://discord.gg/UjaSx57Hpd)`)
.setImage("https://media.discordapp.net/attachments/854672348945711154/862617983067357204/20210708_142546.jpg?width=1144&height=643")
.setColor(client.colors.cyan)
.setFooter(`Guild Prefix: ${prefix} | Last Played`)
.setTimestamp()
        const rawchx = await client.db.get(`isystemchx_${player.guild}`)
        const chx = client.channels.cache.get(rawchx);
        if(!chx) { return; }
        const m1 = await client.db.get(`isystemqembed_${player.guild}`)
        const msg1 = client.channels.cache.get(rawchx).messages.fetch(m1)
        if(!msg1) { return; }
        const m2 = await client.db.get(`isystempembed_${player.guild}`)
        const msg2 = client.channels.cache.get(rawchx).messages.fetch(m2)
        if(!msg2) { return; }    
        client.channels.cache.get(rawchx).messages.fetch(m1).then(msg => { msg.edit({ embeds: [qembed] }).catch(e => console.log(e)); })
        client.channels.cache.get(rawchx).messages.fetch(m2).then(msg => { msg.edit({ embeds: [pembed] }).catch(e => console.log(e)); })
}

async function lavaplay(client, message, args) {
if(message.author.id === client.user.id) { setTimeout(function() { message.delete() }, 30000) }
else { message.delete() }
if(message.author.bot) { return; }
let prefix = await client.db.get(`prefix_${message.guild.id}`);
if(!prefix) prefix = client.settings.prefix;
if(message.content.startsWith(prefix)) { return; }
const query = message.content;
const novc = client.embeds.novcem(client);
  const nomutu = client.embeds.nomutuem(client);
  const nosong = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please provide a Song Name/Link!**`);
  const cantjoin = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Cannot join your Voice Channel!**`);
  const nomen = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **Please don't mention anyone!**`);
  const noinv = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **No invite links in this Channel!**`);
  const err = client.embeds.errem(client);
  const channel = message.member.voice.channel;
  if(!channel) { return message.channel.send({ embeds: [novc] }) }
  if(message.guild.me.voice.channel && message.guild.me.voice.channel.id !== message.member.voice.channel.id) { return message.channel.send({ embeds: [nomutu] }) }
  if(query.includes("discord.gg/") || query.includes("dsc.gg/") || query.includes("/invite/") || query.includes("discord.io")) { return message.channel.send({ embeds: [noinv] }) }
  if(message.mentions.members.size > 0) { return message.channel.send({ embeds: [nomen] }) }
  let reqchx;
  const check = client.manager.players.get(message.guild.id);
  if(!check) {
      const player = message.client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    }) }
 const player = client.manager.players.get(message.guild.id);
 if(channel.id !== player.voiceChannel) { return message.channel.send({ embeds: [nomutu] }) }
 if(!channel.joinable) { return message.channel.send({ embeds: [cantjoin] }) }
 if(!query) { return message.channel.send({ embeds: [nosong] })}
 const noresult = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **No Results found for __${query}__!**`)
 if(player.state !== "CONNECTED") player.connect()
 let res;
 try {
    res = await player.search(query, message.author)
    if (res.loadType === 'LOAD_FAILED') {
      if (!player.queue.current) player.destroy()
      message.channel.send({ embeds: [err] })
    }
  } catch (err) {
    return message.channel.send({ embeds: [noresult] })
  }

  switch (res.loadType) {
    case 'NO_MATCHES':
      if (!player.queue.current) player.destroy()
      return message.channel.send({ embeds: [noresult] });

    case 'TRACK_LOADED':
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
       await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player) 
      return;

    case 'PLAYLIST_LOADED':
      await player.queue.add(res.tracks)
      if (!player.playing && !player.paused) player.play();
       await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player) 
      return;

    case 'SEARCH_RESULT':
      await player.queue.add(res.tracks[0])
      if (!player.playing && !player.paused && !player.queue.length) player.play()
       await client.modules.editpembed(client, player) 
       await client.modules.editqembed(client, player)
      return;
  }
}

async function viewprefix(client, message) {
   if(message.author.bot) { return; }
   if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
   let prefix;
   const lprefix = client.settings.prefix;
   const rprefix = await client.db.get(`prefix_${message.guild.id}`);
   if(rprefix === null) { prefix = lprefix; }
   else { prefix = rprefix; }
   const embed = new client.modules.embed(client, client.colors.cyan, `${client.emotes.music} | **${message.guild.name}**\n\n${client.emotes.parrow} Prefix: ${prefix}\n${client.emotes.parrow} Server ID: ${message.guild.id}\n${client.emotes.parrow} Type \`${prefix}help\` to view all Commands!`)
 message.channel.send({ embeds: [embed] })
}}

async function isystem(client, player) {
  const check = await client.db.get(`isystemcheck_${player.guild}`);
  if(check === null) { return false; }
  if(check === true) {
  const chx = client.channels.cache.get(await client.db.get(`isystemchx_${player.guild}`))
  if(!chx) { return false; }
  else { return true; }
  }
}

async function already(client, message) {
  const check = await client.db.get(`isystemcheck_${message.guild.id}`);
  if(check === null) { return false; }
  else if(check === true) { return true; }
}

async function chatbot(client, chxid, guildid) {
  const check = await client.db.fetch(`chatcheck_${guildid}`);
  if(check === null) { return false; }
  if(check === true) {
  const chx = client.channels.cache.get(await client.db.fetch(`chatchx_${guildid}`))
  if(!chx) { return false; }
  if(chxid === chx.id) { return true; }
  else { return false; }
  }
}

function runchatbot(client, message, args) {
  if(message.author.bot) { return; }
  if(!message.content) { return; }
  message.channel.sendTyping();
  let reply = chat.chat(message.content).then(reply => {
  const embed = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.message} | **${message.author.tag}**\n\n${client.emotes.garrow} ${reply}`)
  .setColor(client.colors.cyan)
  message.channel.send({ embeds: [embed] })
  })
} 

async function djcheckm(client, message) {
  const raw = await client.db.get(`djrolecheck_${message.guild.id}`);
  if(raw === null) { return false; }
  else if(raw === true) {
  const rawrole = await client.db.get(`djrole_${message.guild.id}`);
  const role = await message.guild.roles.cache.get(rawrole);  
  if(role) { return true; }
  else if(!role) { return false;
  await client.db.delete(`djrolecheck_${message.guild.id}`) 
  const final = await client.db.get(`djrole_${message.guild.id}`);
  if(final === null) { return; }
  else if(final === true) { await client.db.delete(`djrole_${message.guild.id}`)
}}}}

async function isadjm(client, message) {
  const raw = await client.db.get(`djrole_${message.guild.id}`);
  if(message.member.roles.cache.some(x => x.id === raw) || message.member.permissions.has("ADMINISTRATOR")) { return true; }
  else { return false; }
}

async function djcheckint(client, interaction) {
  const raw = await client.db.get(`djrolecheck_${interaction.guild.id}`);
  if(raw === null) { return false; }
  else if(raw === true) {
  const rawrole = await client.db.get(`djrole_${interaction.guild.id}`);
  const role = await interaction.guild.roles.cache.get(rawrole);
  if(role) { return true; }
  else if(!role) { return false;
  await client.db.delete(`djrolecheck_${interaction.guild.id}`) 
  const final = await client.db.get(`djrole_${interaction.guild.id}`);
  if(final === null) { return; }
  else if(final === true) { await client.db.delete(`djrole_${interaction.guild.id}`) }
}}}

async function isadjint(client, interaction) {
  const raw = await client.db.get(`djrole_${interaction.guild.id}`);
  if(interaction.member.roles.cache.some(x => x.id === raw) || interaction.member.permissions.has("ADMINISTRATOR")) { return true; }
  else { return false; }
}

async function automeme(client) {
   client.guilds.cache.forEach(guild => {
   const check = client.db.get(`automemecheck_${guild.id}`);
   if(check === null) { return; }
   if(check === true) {
   const chx = client.db.get(`automemechx_${guild.id}`);
   const channel = client.channels.cache.get(chx);
   if(!channel) { client.db.delete(`automemechx_${guild.id}`) 
                  client.db.delete(`automemecheck_${guild.id}`) }                 
   if(channel) {
   const Reds = ["memes", "IndianSavageMemes", "dankmemes", "comedyheaven", "Animemes", "IndianMeyMeys", "IndianDankMemes" ];
   const Rads = Reds[Math.floor(Math.random() * Reds.length)];
   got(`https://www.reddit.com/r/${Rads}/random/.json`).then(res => {
   let content = JSON.parse(res.body);
   const embed = new client.discord.MessageEmbed()
    .setTitle(content[0].data.children[0].data.title)
    .setImage(content[0].data.children[0].data.url)
    .setColor("RANDOM")
    .setFooter(`${content[0].data.children[0].data.ups} 👍 | ${content[0].data.children[0].data.downs} 👎 | ${content[0].data.children[0].data.num_comments} 💬`)
   channel.send({ embeds: [embed] }).catch(e => { return; })
})}}})}

async function afkcheck(client, message) {
const reqcheck = await client.modules.mreqchx(client, message.channel.id, message.guild.id);    
 if(message.mentions.members.size > 0) {
 message.mentions.members.forEach(user => {
 if(client.afkdb.has(user.id)) {
  const data = client.afkdb.get(user.id);
  data.forEach(x => {
  const reason = x.reason;
  const time = Math.floor(x.time / 1000).toFixed(0);
  const guild = x.guild;
  if(guild === message.guild.id) {
  message.channel.send(`${user.user.username} is currently AFK: ${reason} - <t:${time}:R>`)
 }})}})} else if(client.afkdb.has(message.author.id)) {
 const data = client.afkdb.get(message.author.id);
 data.forEach(x => {
 const guild2 = x.guild;
 if(guild2 === message.guild.id) {
 client.afkdb.delete(message.author.id); }})
 if(reqcheck === false) {
 message.channel.send(`Welcome Back <@${message.author.id}>, you are no longer AFK!`).then(m => setTimeout(() => m.delete(), 10000));
 message.member.setNickname(message.member.user.username).catch(e => { return; })
 } else if(reqcheck === true) {
 message.channel.send(`Welcome Back <@${message.author.id}>, you are no longer AFK!`);
 message.member.setNickname(message.member.user.username).catch(e => { return; })
}}}

async function resetdata(client, message) {
 const check1 = client.db.get(`prefix_${message.guild.id}`);
 if(check1) { client.db.delete(`prefix_${message.guild.id}`) }
 const check2 = await client.db.get(`chatcheck_${message.guild.id}`);
 if(check2 === true) {
 await client.db.delete(`chatcheck_${message.guild.id}`);
 await client.db.delete(`chatchx_${message.guild.id}`);  }
 let check3 = await client.db.get(`isystemcheck_${message.guild.id}`);
 if(check3 === true) {   
 await client.db.delete(`isystempembed_${message.guild.id}`)
 await client.db.delete(`isystemqembed_${message.guild.id}`)       
 await client.db.delete(`isystemcheck_${message.guild.id}`)   
 await client.db.delete(`isystemchx_${message.guild.id}`);
 await client.db.delete(`isystemcat_${message.guild.id}`);
 await client.db.delete(`isystemvoice_${message.guild.id}`); }
 }

async function autoplay(client, player) {
 if(player.queue.size > 0) { return; } 
 const data = client.db.get(`autoplaydata_${player.guild}`);
 if(data === null) { return; }
 const iden = data.identity;
 const query = `https://www.youtube.com/watch?v=${iden}&list=RD${iden}`;
 const response = await client.manager.search(query, client.user);
 if(!response || response.loadType === 'LOAD_FAILED' || response.loadType !== 'PLAYLIST_LOADED') {
 const fail = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **No result found for Autoplay!**`)
 client.channels.cache.get(player.textChannel).send({ embeds: [fail] })
 client.db.delete(`autoplaydata_${player.guild}`) }
 else {
 player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))])
 if (!player.playing && !player.paused && !player.queue.length) player.play()
}}