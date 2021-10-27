module.exports = {
name: "nodeinfo",
aliases: ["nodestats"],
usage: "h!nodeinfo",
description: "View information about the Nodes of the Bot!",
cooldown: 10000,
clientperms: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
category: "Utilities",    
run: async(client, message, args) => {
        const data = client.manager.nodes.map(node => 
            `${client.emotes.general} | **General Information:**` +
            `\n> Name: ${node.options.identifier}` +                                             
            `\n> Players: ${node.stats.playingPlayers} Playing` +
            `/${node.stats.players} Total` +
            `\n> Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}` +
            `\n\n${client.emotes.config} | **System Information**` +
            `\n> Cpu Cores: ${node.stats.cpu.cores}` +
            `\n> Lavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%` +                                              
            `\n> System Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\n\n${client.emotes.package} | **Memory Information:**` +
            `\n> Used Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
            `\n> Free Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
            `\n> Allocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` + 
            `\n> Reservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb`                                               
        ).join('\n**========================**\n');
const embed = client.modules.embed(client, client.colors.cyan, `${client.emotes.music} | **Lavalink Node Status**\n\n${data}`)    
message.channel.send({ embeds: [embed] })
}}