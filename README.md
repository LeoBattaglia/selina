# Selina
Basic TypeScript-Webserver on Node.js.

## Installation
Run `npm i selina`

## Usage
```
const selina = require("selina");
const server = new selina.Server(false, 0, response);
const p = server.getPrompt();
server.init();
server.addCommand(new selina.Command("print", "Print Something", printSomething));
server.start();

function printSomething(){
    p.printLine();
    p.print("SOMETHING");
}

function response(req:Request):string{
    return "RESPONSE";
}
```