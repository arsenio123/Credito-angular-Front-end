
import { Type } from '../model/Type';
export interface DialogInterface {
    message:string;
    type:Type;
    title:string;
}
  export class Dialog implements DialogInterface{
    
    message: string="";
    type: Type=Type.NOT_DEFINE;
    title: string="";
    constructor(){
        this.message="";
        this.type=Type.NOT_DEFINE;
        this.title="";
    }
}
