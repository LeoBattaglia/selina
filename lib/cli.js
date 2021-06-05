//Constants
const milena = require("milena");
const p = new milena.Prompt();
//Listener
process.on("message", execute);
//Functions
function execute(cmd) {
    switch (cmd) {
        case "input":
            input().then();
    }
}
async function input() {
    let inp = await p.input("Input: ");
    process.send(inp);
}
//# sourceMappingURL=cli.js.map