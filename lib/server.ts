//Constants
import {start} from "repl";

const cp = require("child_process");
const fs = require("fs");
const milena = require("milena");
const p = new milena.Prompt();
const pkg = require("../package.json");
const sys = require("samara");

//Declarations
let cli;
let commands:Command[];
let https:Boolean;
let port:number;
let response;
let server;

//Classes
export class Command{
    //Declarations
    _command:string;
    _description:string;
    _callback;

    //Constructor
    constructor(command:string, description:string, callback){
        this.command = command;
        this.description = description;
        this.callback = callback;
    }

    //Functions
    get callback(){
        return this._callback;
    }
    set callback(callback){
        this._callback = callback;
    }
    get command():string{
        return this._command;
    }
    set command(value:string){
        this._command = value;
    }
    get description():string{
        return this._description;
    }
    set description(value:string){
        this._description = value;
    }
}

export class Server{
    //Constructor
    constructor(https:Boolean, port:number, responseFunction){
        https = https;
        this.setPort(port);
        response = responseFunction;
    }

    //Functions
    addCommand(cmd:Command):void{

        //TODO: Check if Command already exists

        commands.push(cmd);
    }
    clearCommands():void{
        commands = [];
    }
    execute(command:string):void{
        let executed:Boolean = false;
        for(let cmd of commands){
            if(cmd.command === command){
                cmd.callback();
                executed = true;
                break;
            }
        }
        if(!executed){
            p.print("Invalid Command: " + command);
        }
        p.printLine();
        cli.send("input");
    }
    exit():void{
        p.printLine();
        p.printError("Stop Webserver");
        p.printLine();
        cli.kill();
        process.exit(0);
    }
    help():void{
        p.printLine();
        p.printOption("Commands:")
        for(let cmd of commands){
            p.print(sys.fillString(cmd.command, 8, " ", false) + cmd.description);
        }
    }
    init():void{
        p.printLine();
        p.print("Initialize Webserver " + pkg.version);
        this.clearCommands();
        this.addCommand(new Command("exit", "Stop Application", this.exit));
        this.addCommand(new Command("help", "Show Commands", this.help));
        this.addCommand(new Command("start", "Start Listener", this.startListener));
        this.addCommand(new Command("stop", "Stop Listener", this.stopListener));
    }
    setPort(nr:number):void{
        if(nr < 1){
            if(https){
                port = 8000;
            }else{
                port = 80;
            }
        }else{
            port = nr;
        }
    }
    start():void{
        p.printLine();
        p.printTitle("Start Webserver " + pkg.version);
        this.help();
        this.startCLI();
        p.printLine();
        cli.send("input");
    }
    startCLI():void{
        cli = cp.fork(__dirname + "/cli");
        cli.on("message", this.execute);
    }
    startListener():void{
        p.printLine();
        p.print("Start Listener on Port: " + port);
        if(https){
            const https = require("https");
            const cert_options = {
                key: fs.readFileSync("./lib/cert/key.pem"),
                cert: fs.readFileSync("./lib/cert/cert.pem")
            };
            server = https.createServer(cert_options, function (req, res) {
                res.writeHead(200);
                res.write(response(req));
                res.end("\n");
            }).listen(port);
        }else{
            const http = require("http");
            server = http.createServer(function (req, res) {
                res.writeHead(200);
                res.write(response(req));
                res.end("\n");
            }).listen(port);
        }
    }
    stopListener():void{
        p.printLine();
        p.print("Stop Listener")
        server.close();
    }
}