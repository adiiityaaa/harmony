const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("HARMONY PROCESS STATUS");
table.setHeading("Event Name", "Load status");
module.exports = (client) => {
  const commands = readdirSync(`./process/`).filter(file => file.endsWith(".js"));
  for (let file of commands) {
    try {
    let pull = require(`../process/${file}`);
    if (pull.event && typeof pull.event !== "string") {
      table.addRow(file, `❌ | Event Should be String!`);
      continue;
    }
    pull.event = pull.event || file.replace(".js", "")
    process.on(pull.event, pull.run.bind(null, client))
    table.addRow(file, '✔');
    } catch(err) {
  console.log("❌ | Something Went Wrong!")
  console.log(err)
  table.addRow(file, `❌ | Something Went Wrong!`);
    }
  }
   console.log(table.toString());
}