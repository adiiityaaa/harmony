module.exports = {
name: "test",
devOnly: true,
run: async(client, message, args) => {
const array = [];    
message.mentions.members.forEach(x => {
   array.push(x.id)
})
message.reply(`Hi Baby\n\n${array}`)    
}}