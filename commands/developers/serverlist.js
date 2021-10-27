const sourcebin = require('sourcebin_js');
module.exports = {
	name: 'serverlist',
	description: 'Provides an Sourcebin Link for the Serverlist',
	devOnly: true,
	usage: 'h!serverlist',
    aliases: [""],
    category: "Developers",
    clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
	run: async (client, message, args) => {
    const fals6969 = client.modules.embed(client, client.colors.red, `${client.emotes.cross} | **An Error has Occured!**`)  
    const rawserverlist = client.guilds.cache.map(guild => `➡ ${guild.name} : ${guild.memberCount} Users`).join('\n');     
    let response;
	 try {
	  response = await sourcebin.create([
		{ 
          name: '',
		  content: rawserverlist,
	      languageId: 'text', 
        },
		], {
			title: `${client.user.username} Serverlist`,
			description: `${client.guilds.cache.size} Servers | ${client.users.cache.size} Users`,
			});
     } catch(e) {
      console.log(e)   
      return message.channel.send({ embeds: [fals6969] }); }
        const serverlist = client.modules.embed(client, client.colors.green, `${client.emotes.check} | **Serverlist Created!**`)
        let rawbutton = new client.discord.MessageButton()
      .setLabel("View the List Here")
      .setStyle("LINK")
      .setURL(`${response.url}`)
      let button = new client.discord.MessageActionRow()
        .addComponents(rawbutton)
        message.channel.send({ embeds: [serverlist], components: [button]})
    }}