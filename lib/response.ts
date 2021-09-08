//Methods
export class Response{
    //Declarations
    _data:any;
    _id:number;
    _type:string;

    //Constructor
    constructor(id:number, type:string, data:any){

    }

    //Get Methods
    get data():any{
        return this._data;
    }

    get id():number{
        return this._id;
    }

    get type():string{
        return this._type;
    }

    //Set Methods
    set data(data:any){
        this._data = data;
    }
    set id(id:number){
        this._id = id;
    }
    set type(type:string){
        this._type = type;
    }
}