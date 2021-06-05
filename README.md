# Selina
Basic TypeScript-Webserver on Node.js.

## Installation
Run `npm i selina`

## Usage
```
const selina = require("selina");
let server = new Server(false, 0, response);
server.init();
server.start();

function response(req:Request):string{
    return "RESPONSE";
}
```