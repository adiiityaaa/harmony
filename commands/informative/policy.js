module.exports = {
name: "policy",
cooldown: 5000,
aliases: ["agreement"],
clientperms: ["EMBED_LINKS", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
description: "Shows you the Bot Policy that you agree by Adding the Bot!",
usage: "h!policy",
category: "Informative",
run: async(client, message, args) => {
const introduction = client.modules.embed(client, client.colors.cyan, `${client.emotes.music} | **FRIDAY PRIVACY POLICY**\n\n${client.emotes.garrow} By Using Friday, you Hereby Agree to our Privacy Policy as Mentioned Below.`)
const subject = client.modules.embed(client, client.colors.cyan, `${client.emotes.search} | **What type of Data we Store?**\n${client.emotes.garrow} We Store IDs Like the Server ID, User ID, Message ID and Voice plus Text Channel IDs. This doesn't include any of your Credentials. Friday never Requests any of your Personal Data, Abides [Discord TOS](https://discord.com/terms) and never Redirects to any Malicious Website.\n\n${client.emotes.search} | **Why do we Need this Data?**\n${client.emotes.garrow} This Data is required for the Proper functioning of some the features like Logging, Channel Declaration for System, Role Management and Harmony Music.\n\n${client.emotes.search} | **How is this Data used by the Bot?**\n${client.emotes.garrow} Friday fetches the Channels from the Specified IDs in the Database. The Roles are also stored to fetch the DJ Role in the Server. Message IDs are used for Request Channel Feature.`)
const body = client.modules.embed(client, client.colors.cyan, `${client.emotes.search} | **How Long do we Store this Data?**\n${client.emotes.garrow} Once registered, the Data will be Permanently stored in the Database. This ensures that even if Friday leaves your Guild, the Configuration remains the Same when it joins Back.\n\n${client.emotes.search} | **Who has access to this Data?**\n${client.emotes.garrow} Friday is powered by SQL Based Database, which ensures only Friday and it's Developers have access to the Data.\n\n${client.emotes.search} | **How to Delete this Data?**\n${client.emotes.garrow} If you want to Delete this Data, you can use the Disable commands given for every Enable command. You can also use the Reset Command that will erase everything related to the server from the Database.`)
const conclusion = new client.discord.MessageEmbed()
.setColor("#00FFFF")
.setFooter(client.user.username, client.user.displayAvatarURL())
.setTimestamp()
.setDescription(`${client.emotes.search} **Still have a Query?**\n${client.emotes.garrow} You can join the Support Server by Clicking the Button below, where an answer to all of your queries and doubts. The Solution to every Bug Report and Resolution for Suggestions is also provided.`)
const invbtn = client.buttons.addbtn(client)
message.channel.send({ embeds: [introduction, subject, body, conclusion], components: [invbtn] })    
}}    