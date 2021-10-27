module.exports = {
name: "volume",
description: "Manipulate the Volume of the Player!",
options: [
    {
      name: "level",
      type: "NUMBER",
      description: "The Volume Level | Minimum: 0 - Maximum: 120",
      required: true,
    },
  ],    
run: async(client, interaction) => {
client.music.volume(client, interaction)
}}