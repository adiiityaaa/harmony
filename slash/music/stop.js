module.exports = {
name: "stop",
description: "Stops the Song, Clears the Queue and Leaves the Voice Channel!",
djOnly: true,    
run: async(client, interaction) => {
client.music.stop(client, interaction)
}}