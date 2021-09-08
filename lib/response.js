"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
//Methods
class Response {
    //Constructor
    constructor(id, type, data) {
    }
    //Get Methods
    get data() {
        return this._data;
    }
    get id() {
        return this._id;
    }
    get type() {
        return this._type;
    }
    //Set Methods
    set data(data) {
        this._data = data;
    }
    set id(id) {
        this._id = id;
    }
    set type(type) {
        this._type = type;
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map