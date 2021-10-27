module.exports = {
name: "resume",
description: "Resumes the Song if Paused!",
run: async(client, interaction) => {
client.music.resume(client, interaction)
}}