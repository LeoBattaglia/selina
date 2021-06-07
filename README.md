# Selina
Basic Webserver, developed with TypeScript on Node.js.

Contains the following two Classes:
- Command
- Server

## Installation
Run `npm i selina`

## Example
```
const selina = require("selina");
const server = new selina.Server(false, 0, response);
const p = server.getPrompt();
server.init();
server.addCommand(new selina.Command("ps", "Print Something", printSomething));
server.start();

function printSomething(){
    p.printLine();
    p.print("SOMETHING");
}

function response(req:Request):string{
    return "RESPONSE";
}
```
Note: This Example shows all Methods you need for basic Webserver-Functionality.
The most Methods in the Server-Class are for internal use only.

## Class: Server
### Constructor
constructor(https:Boolean, port:number, responseFunction)
#### Example
```
let server = new Server(false, 80, anyFunction);
```
### Methods
#### addCommand()
Adds a Command to the Server, if it not already exists.
##### Parameters:
- command:Command
##### Use:
```
server.addCommand(new Command("command", "Description", anyFunction));
```

#### clearCommands()
Removes all Commands (incl. Default-Commands).
##### Parameters:
- NONE
##### Use:
```
server.clearCommands();
```

#### execute()
Executes the Callback-Function of a Command. 
##### Parameters:
- command:string
##### Use:
```
server.execute("command");
```

#### exit()
Shutdown Application.
##### Parameters:
- NONE
##### Use:
```
server.exit();
```

#### help()
Prints all Commands.
##### Parameters:
- NONE
##### Use:
```
server.help();
```

#### init()
Removes all Commands and adds Default-Commands again.
##### Parameters:
- NONE
##### Use:
```
server.init();
```

#### setPort()
Sets the Port. When "nr" is 0, the Default is 80 for HTTP or 8000 for HTTPS.
##### Parameters:
- nr:number
##### Use:
```
server.setPort(80);
```

#### start()
Starts the Application
##### Parameters:
- NONE
##### Use:
```
server.start();
```

#### startCLI()
Starts a Child-Process for CLI User-Input.
##### Parameters:
- NONE
##### Use:
```
server.startCLI();
```

#### startListener()
Starts the Listener in HTTP- or HTTPS-Mode on defined Port.
##### Parameters:
- NONE
##### Use:
```
server.startListener();
```

#### startListener()
Stops the Listener.
##### Parameters:
- NONE
##### Use:
```
server.stopListener();
```

## Class: Command
### Constructor
constructor(command:string, description:string, callback)
#### Example
```
let cmd = new Command("ps", "Print Something", printSomething);
```
### Get & Set-Methods
#### command
Command-Text, e.g. "start" or "help". Type: string
#### description
Description-Text which is displayed on Command "help". Type: string
#### callback
Function to execute when typing a Command. Type: any (Must be a Function to work)