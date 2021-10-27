const Discord = require("discord.js");
module.exports = {
  name: "reboot",
  aliases: ["restart"],
  devOnly: true,
  usage: "h!reboot",
  description: "Restarts the Bot!",
  category: "Developers",
  cooldown: 10000,
  clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
  run: async (client, message, args) => {
    await client.destroy();
    await client.login(client.settings.token);
    const restart = new client.disord.MessageEmbed()
    .setDescription(`${client.emotes.check} | <@${client.user.id}>** has been Rebooted!**`)
    .setColor(client.colors.green)    
    await message.channel.send({ embeds: [restart] })
  },
};