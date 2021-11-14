"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binding = void 0;
//Classes
class Binding {
    //Constructor
    constructor() {
        this.functions = [];
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
//# sourceMappingURL=binding.js.map