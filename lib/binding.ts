//Classes
export class Binding{
    //Declarations
    functions:BindingFunction[];

    //Constructor
    constructor(){
        this.functions = [];
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
    }
}

class BindingFunction{
    //Declarations
    channel:string;
    func:Function;

    //Constructor
    constructor(channel:string, func:Function){
        this.channel = channel;
        this.func = func;
    }
}