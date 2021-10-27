const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("HARMONY COMMAND STATUS");
table.setHeading("Command Name", "Command Status");
module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.normalcommands.set(pull.name, pull);
                table.addRow(file, '✔');
            } else {
                table.addRow(file, `❌ | An Error Occured!`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.normalaliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
}