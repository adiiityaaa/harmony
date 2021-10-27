module.exports.run = async(client, player) => {
 const check = await client.modules.reqchx(client, player);
 if(check === false) { return; }
 else if(check === true) { await client.modules.reset(client, player) }
 const check2 = client.db.get(`autoplaycheck_${player.guild}`);
 if(check2 === null || check2 === false) { return; }
 else if(check2 === true) { await client.modules.autoplay(client, player); }
}