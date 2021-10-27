const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("HARMONY PLAYER STATUS");
table.setHeading("Event Name", "Load status");
module.exports = (client) => {
            readdirSync("./lavalink/").forEach(dir => {
        const commands = readdirSync(`./lavalink/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            try {
            let pull = require(`../lavalink/${dir}/${file}`);
    if (pull.event && typeof pull.event !== "string") {
      table.addRow(file, `❌ | Event Should be String!`);
      continue;
    }
    pull.event = pull.event || file.replace(".js", "")
    client.manager.on(pull.event, pull.run.bind(null, client))
    table.addRow(file, '✔');
    } catch(err) {
  console.log("❌ | Something Went Wrong!")
  console.log(err)
  table.addRow(file, `❌ | Something Went Wrong!`);
    }
  }
   console.log(table.toString());
})}