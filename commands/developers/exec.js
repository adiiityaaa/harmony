const process = require('child_process');
const delay = require("delay");

module.exports = {
name: "exec",
devOnly: true, 
category: "Developers",
usage: "h!exec <code>",
cooldown: 10000,
aliases: [""],
description: "Lets you Run a Shell Command from Discord!",
clientperms: ["EMBED_LINKS"],
run: async (client, message, args) => {
     const wait = new client.discord.MessageEmbed()
     .setDescription(`${client.emotes.loading} | **Executing...**`)
     .setColor(client.colors.cyan)
      const running = await message.channel.send({ embeds: [wait] })
	  process.exec(args.join(" "), (error, stdout) => {
      let result = (stdout || error)
      delay(1000)
      running.delete();
      let final;
      if(result.length > 2033) { final = `${result.slice(0, 2033)}...`;
      } else { final = result }
      const success = new client.discord.MessageEmbed()
      .setDescription(`\`\`\`${final}\`\`\``)
      .setColor(client.colors.green)
      .setAuthor("Shell Command Executed!", "https://images-ext-1.discordapp.net/external/jX73PwPRQjSWKhEc0rM2vYXW3pNZmke_4usIEx6_798/https/cdn.discordapp.com/emojis/879225076602531870.png?width=90&height=90")
	  console.log(final)})
	  }
	}