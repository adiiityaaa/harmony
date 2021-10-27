module.exports.novcem = novcem;
module.exports.nomutuem = nomutuem;
module.exports.noqem = noqem;
module.exports.errem = errem;
module.exports.defem = defem;

function novcem(client) {
  const novc = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.cross} | **Please join a Voice Channel!**`)
  .setColor(client.colors.red)
  return novc;
}

function nomutuem(client) {
  const nomutu = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.cross} | **Please join a Mutual Voice Channel!**`)
  .setColor(client.colors.red)
  return nomutu;
}

function noqem(client) {
  const noq = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.cross} | **Player is not playing anything!**`)
  .setColor(client.colors.red)
  return noq;
}

function errem(client) {
  const err = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.cross} | **An Error has Occured!**`)
  .setColor(client.colors.red)
  return err;
}

function defem(client) {
  const def = new client.discord.MessageEmbed()
  .setDescription(`${client.emotes.cross} | **You are on Deafen Mode!**`)
  .setColor(client.colors.red)
  return def;
}