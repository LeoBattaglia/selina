"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingObject = exports.BindingFunction = exports.Binding = void 0;
//Classes
class Binding {
    //objects:BindingObject[];
    //Constructor
    constructor() {
        this.functions = [];
        //this.objects = [];
    }
    //Methods
    addFunction(channel, callback) {
        this.functions.push(new BindingFunction(channel, callback));
    }
    execute(channel, data) {
        for (let func of this.functions) {
            if (func.channel === channel) {
                func.func(data);
                return true;
            }
        }
        return false;
        //this.objects.push(new BindingObject(channel, data));
    }
}
exports.Binding = Binding;
class BindingFunction {
    //Constructor
    constructor(channel, func) {
        this.channel = channel;
        this.func = func;
    }
}
exports.BindingFunction = BindingFunction;
class BindingObject {
    //Constructor
    constructor(channel, data) {
        this.channel = channel;
        this.data = data;
    }
}
exports.BindingObject = BindingObject;
//# sourceMappingURL=binding.js.map