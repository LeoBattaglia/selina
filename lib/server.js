"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.Command = void 0;
//Constants
const cp = require("child_process");
const fs = require("fs");
const milena = require("milena");
const p = new milena.Prompt();
const pkg = require("../package.json");
const sys = require("samara");
//Declarations
let cli;
let commands;
let https;
let port;
let response;
let server;
//Classes
class Command {
    //Constructor
    constructor(command, description, callback) {
        this.command = command;
        this.description = description;
        this.callback = callback;
    }
    //Functions
    get callback() {
        return this._callback;
    }
    set callback(callback) {
        this._callback = callback;
    }
    get command() {
        return this._command;
    }
    set command(value) {
        this._command = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
exports.Command = Command;
class Server {
    //Constructor
    constructor(isHTTPS, port, responseFunction) {
        //Parameter-Values
        https = isHTTPS;
        this.setPort(port);
        response = responseFunction;
    }
    //Functions
    addCommand(cmd) {
        if (!this.exists(cmd)) {
            commands.push(cmd);
        }
        this.sortCommands();
    }
    clearCommands() {
        commands = [];
    }
    execute(command) {
        let executed = false;
        for (let cmd of commands) {
            if (cmd.command === command) {
                cmd.callback();
                executed = true;
                break;
            }
        }
        if (!executed) {
            p.print("Invalid Command: " + command);
        }
        p.printLine();
        cli.send("input");
    }
    exists(cmd) {
        for (let c of commands) {
            if (c.command === cmd.command) {
                return true;
            }
        }
        return false;
    }
    exit() {
        p.printLine();
        p.printError("Stop Webserver");
        p.printLine();
        cli.kill();
        process.exit(0);
    }
    help() {
        p.printLine();
        let len = 0;
        for (let cmd of commands) {
            if (cmd.command.length > len) {
                len = cmd.command.length;
            }
        }
        len += 4;
        p.printOption("Commands:");
        for (let cmd of commands) {
            p.print(sys.fillString(cmd.command, len, " ", false) + cmd.description);
        }
    }
    init() {
        p.printLine();
        p.print("Initialize Selina-Webserver " + pkg.version);
        this.clearCommands();
        this.addCommand(new Command("exit", "Stop Application", this.exit));
        this.addCommand(new Command("help", "Show Commands", this.help));
        this.addCommand(new Command("start", "Start Listener", this.startListener));
        this.addCommand(new Command("stop", "Stop Listener", this.stopListener));
    }
    setPort(nr) {
        if (nr < 1) {
            if (https) {
                port = 8000;
            }
            else {
                port = 80;
            }
        }
        else {
            port = nr;
        }
    }
    sortCommands() {
        for (let i = 0; i < commands.length; i++) {
            if (i < commands.length - 1) {
                if (commands[i].command > commands[i + 1].command) {
                    let temp = commands[i];
                    commands[i] = commands[i + 1];
                    commands[i + 1] = temp;
                    i = 0;
                }
            }
        }
    }
    start(name) {
        p.printLine();
        if (sys.isNull(name)) {
            p.printTitle("Start Webserver " + pkg.version);
        }
        else {
            p.printTitle("Start " + name);
        }
        this.help();
        this.startCLI();
        p.printLine();
        cli.send("input");
    }
    startCLI() {
        cli = cp.fork(__dirname + "/cli");
        cli.on("message", this.execute);
    }
    startListener() {
        p.printLine();
        p.print("Start Listener on Port: " + port);
        if (https) {
            const https = require("https");
            const cert_options = {
                key: fs.readFileSync(__dirname + "/cert/key.pem"),
                cert: fs.readFileSync(__dirname + "/cert/cert.pem")
            };
            server = https.createServer(cert_options, function (req, res) {
                let r = response(req);
                res.setHeader("content-type", r.type);
                res.writeHead(r.status);
                res.write(r.data);
                res.end("\n");
            }).listen(port);
        }
        else {
            const http = require("http");
            server = http.createServer(function (req, res) {
                let r = response(req);
                res.setHeader("content-type", r.type);
                res.writeHead(r.status);
                res.write(r.data);
                res.end("\n");
            }).listen(port);
        }
    }
    stopListener() {
        p.printLine();
        p.print("Stop Listener");
        server.close();
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map