"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
//Methods
class Response {
    //Constructor
    constructor(status, type, data) {
        this.status = status;
        this.type = type;
        this.data = data;
    }
    //Get Methods
    get data() {
        return this._data;
    }
    get status() {
        return this._status;
    }
    get type() {
        return this._type;
    }
    //Set Methods
    set data(data) {
        this._data = data;
    }
    set status(status) {
        this._status = status;
    }
    set type(type) {
        this._type = type;
    }
}
exports.Response = Response;
//# sourceMappingURL=response.js.map