const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767, shards: 'auto' });
const { Manager } = require("erela.js");
const Deezer = require("erela.js-deezer");
const Facebook = require("erela.js-facebook");
const Spotify = require("better-erela.js-spotify");
const AppleMusic  = require("erela.js-apple");
const filter  = require("erela.js-filters");
const config = require("./config/config.json");
const { DiscordTogether } = require('discord-together');
const { LavasfyClient } = require("lavasfy");
const idp = config.spotifyID;
const pass = config.spotifySecret;
const password = config.token;
client.manager = new Manager({
            nodes: [
               { host: "usfr2.forcehost.net", port: 25583, retryDelay: 5000, password: "LavalinkForTrexy", identifier: "Primary Node" }
            ],
            plugins: [
                new Deezer(),
                new Facebook(),
                new AppleMusic(),
                new filter(),
                new Spotify.default({
                  strategy: 'API',
                  clientId: idp,
                  clientSecret: pass
                })
            ],
            autoPlay: false,
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            }});
client.lavasfy = new LavasfyClient({
    clientID: idp,
    clientSecret: pass
}, [
    {
        id: "primary",
        host: "usfr2.forcehost.net",
        port: 25583,
        password: "LavalinkForTrexy",
        secure: false
    }
]);
client.emotes = require("./config/emotes.json");
client.settings = require("./config/settings.json");
client.colors = require("./config/colors.json");
client.modules = require("./config/modules.js");
client.embeds = require("./config/embeds.js");
client.buttons = require("./config/buttons.js");
client.music = require("./config/playerfiles.js")
client.db = require("quick.db");
client.afkdb = require("quick.db");
client.discord = require("discord.js");
client.activities = new DiscordTogether(client);
client.slashcommands = new Discord.Collection();
client.normalcommands = new Discord.Collection();
client.normalaliases = new Discord.Collection();
["commands", "events", "lavalink", "slash", "process"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("messageCreate", async(message, args) => {
  if(!message.guild) { return; } 
  const check = await client.modules.mreqchx(client, message.channel.id, message.guild.id);
  if(check === false) { return; }
  else if(check === true) { await client.modules.lavaplay(client, message, args) }
})

client.on("messageCreate", async(message, args) => {
  if(!message.guild) { return; } 
  const check = await client.modules.chatbot(client, message.channel.id, message.guild.id);
  if(check === false) { return; }
  else if(check === true) { await client.modules.runchatbot(client, message, args) }
})

client.on("messageCreate", async(message, args) => {
  if(!message.guild) { return; } 
  await client.modules.viewprefix(client, message);
})

client.on("messageCreate", async(message, args) => {
  if(!message.guild || message.author.bot) { return; } 
  client.modules.afkcheck(client, message);
})

client.login(password)