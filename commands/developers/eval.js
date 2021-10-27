module.exports = {
name: "eval",
devOnly: true, 
category: "Developers",
usage: "h!eval <code>",
cooldown: 10000,
description: "Evaluate a Custom Code!",
clientperms: ["EMBED_LINKS"],
run: async (client, message, args) => {
    message.delete()
const pog = new client.discord.MessageEmbed()
.setColor(client.colors.cyan)
.setDescription(`${client.emotes.loading} | **Evaluating the Code...**`)
const msg = await message.channel.send({ embeds: [pog]})
try {
 let evaled;
   try {
        evaled = await eval(args.join(" "));
        const embed = new client.discord.MessageEmbed()
                    .setAuthor("Code Evaluated Successfully!", "https://images-ext-1.discordapp.net/external/jX73PwPRQjSWKhEc0rM2vYXW3pNZmke_4usIEx6_798/https/cdn.discordapp.com/emojis/879225076602531870.png?width=90&height=90")
                    .setDescription(`${client.emotes.garrow} \`${evaled}\``)
                    .setColor(client.colors.green)
                    msg.delete()
                     message.channel.send({ embeds: [embed] })
            } catch (error) {
                console.error(error);
                const embed2 = new client.discord.MessageEmbed()
                    .setAuthor("Code Evaluation Failed!", "https://cdn.discordapp.com/emojis/879225003114106943.png")
                    .setDescription(`${client.emotes.rarrow} \`${error.message}\``)
                    .setColor(client.colors.red)
                    msg.delete()
                    message.channel.send({ embeds: [embed2] })
            }
        } catch (err) {
            console.error(err);
        }
}}
