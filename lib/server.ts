//Import
import {Response} from "./response";

//Constants
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
    private _command:string;
    private _description:string;
    private _callback;

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
    constructor(isHTTPS:Boolean, port:number, responseFunction){
        //Parameter-Values
        https = isHTTPS;
        this.setPort(port);
        response = responseFunction;
    }

    //Functions
    addCommand(cmd:Command):void{
        if(!this.exists(cmd)){
            commands.push(cmd);
        }
        this.sortCommands();
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

    exists(cmd:Command):Boolean{
        for(let c of commands){
            if(c.command === cmd.command){
                return true;
            }
        }
        return false;
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
        let len:number = 0;
        for(let cmd of commands){
            if(cmd.command.length > len){
                len = cmd.command.length;
            }
        }
        len += 4;
        p.printOption("Commands:")
        for(let cmd of commands){
            p.print(sys.fillString(cmd.command, len, " ", false) + cmd.description);
        }
    }

    init():void{
        p.printLine();
        p.print("Initialize Selina-Webserver " + pkg.version);
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

    private sortCommands(){
        for(let i:number = 0; i < commands.length; i++){
            if(i < commands.length - 1){
                if(commands[i].command > commands[i + 1].command){
                    let temp:Command = commands[i];
                    commands[i] = commands[i + 1];
                    commands[i + 1] = temp;
                    i = 0;
                }
            }
        }
    }

    start(name?:string):void{
        p.printLine();
        if(sys.isNull(name)){
            p.printTitle("Start Webserver " + pkg.version);
        }else{
            p.printTitle("Start " + name);
        }
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
                key: fs.readFileSync(__dirname + "/cert/key.pem"),
                cert: fs.readFileSync(__dirname + "/cert/cert.pem")
            };
            server = https.createServer(cert_options, function(req, res){
                let r:Response = response(req);
                res.setHeader("content-type", r.type);
                res.writeHead(r.status);
                res.write(r.data);
                res.end("\n");
            }).listen(port);
        }else{
            const http = require("http");
            server = http.createServer(function(req, res){
                let r:Response = response(req);
                res.setHeader("content-type", r.type);
                res.writeHead(r.status);
                res.write(r.data);
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