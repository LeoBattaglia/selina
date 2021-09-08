//Methods
export class Response{
    //Declarations
    _data:any;
    _status:number;
    _type:string;

    //Constructor
    constructor(status:number, type:string, data:any){
        this.status = status;
        this.type = type;
        this.data = data
    }

    //Get Methods
    get data():any{
        return this._data;
    }

    get status():number{
        return this._status;
    }

    get type():string{
        return this._type;
    }

    //Set Methods
    set data(data:any){
        this._data = data;
    }
    set status(status:number){
        this._status = status;
    }
    set type(type:string){
        this._type = type;
    }
}