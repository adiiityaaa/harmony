module.exports = {
name: "skip",
djOnly: true,
description: "Skips the Current Song!",
run: async(client, interaction) => {
client.music.skip(client, interaction)
}}