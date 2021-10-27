module.exports = {
name: "pause",
description: "Pauses the Currently Playing Song!",
run: async(client, interaction) => {
client.music.pause(client, interaction)
}}