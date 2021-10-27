const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("HARMONY SLASH STATUS");
table.setHeading("Slash Name", "Load Status");
module.exports = (client) => {
    readdirSync("./slash/").forEach(dir => {
        const commands = readdirSync(`./slash/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../slash/${dir}/${file}`);
    
             if (pull.name) {
                client.slashcommands.set(pull.name, pull);
                table.addRow(file, '✔');
            } else {
                table.addRow(file, `❌  An Error Occured while Loading the Command`);
            }
        }
    });
    console.log(table.toString());
}