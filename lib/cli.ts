//Constants
const milena = require("milena");
const p = new milena.Prompt();

//Listener
process.on("message", execute);

//Functions
function execute(cmd:string){
    switch(cmd){
        case "input":
            input().then();
    }
}
async function input(){
    let inp:string = await p.input("Input: ");
    process.send(inp);
}