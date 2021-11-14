//Classes
export class Binding{
    //Declarations
    functions:BindingFunction[];
    //objects:BindingObject[];

    //Constructor
    constructor(){
        this.functions = [];
        //this.objects = [];
    }

    //Methods
    addFunction(channel:string, callback:Function){
        this.functions.push(new BindingFunction(channel, callback));
    }

    execute(channel:string, data:any[]){
        for(let func of this.functions){
            if(func.channel === channel){
                func.func(data);
                return true;
            }
        }
        return false;
        //this.objects.push(new BindingObject(channel, data));
    }
}

export class BindingFunction{
    //Declarations
    channel:string;
    func:Function;

    //Constructor
    constructor(channel:string, func:Function){
        this.channel = channel;
        this.func = func;
    }
}

export class BindingObject{
    //Declarations
    channel:string;
    data:any[];

    //Constructor
    constructor(channel:string, data:any[]){
        this.channel = channel;
        this.data = data;
    }
}