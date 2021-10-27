module.exports = {
name: "uptime",
cooldown: 5000,
aliases: ["awakesince"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Displays the Uptime of the Bot!",
usage: "h!uptime",
category: "Utilities",
run: async (client, message, args) => {
        let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;    
        const RemoveUseless = (Duration) => {
      return Duration.replace("0 Day\n", "").replace("0 Hour\n", "").replace("0 Minute\n", "");
    };
    let Uptime = await RemoveUseless(`${Days} ${Days > 1 ? "Days" : "Day"}, ${Hours} ${Hours > 1 ? "Hours" : "Hour"}, ${Minutes} ${Minutes > 1 ? "Minutes" : "Minute"} and ${Seconds} ${Seconds > 1 ? "Seconds" : "Second"}`);
        
     const uptime = new client.discord.MessageEmbed()
     .setColor(client.colors.green)
     .setDescription(`${client.emotes.uptime} | **Client Uptime!**\n${client.emotes.garrow} ${Uptime}!`)
    await message.channel.send({ embeds: [uptime] })
}}