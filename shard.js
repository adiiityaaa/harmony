const { ShardingManager, MessageEmbed, WebhookClient } = require("discord.js");
const settings = require("../config/settings.json");
const shard = new ShardingManager("./harmony.js", {
  totalShards: 'auto',
  respawn: true,
  token: config.token,
});
manager.on("shardCreate", (shard) => {
  let hook = new WebhookClient(config.webhookid, config.webhooktoken);
  const embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Shard \`${shard.id}\` Launched!`);
  hook.send({ embeds: [embed] });
});
manager.spawn();