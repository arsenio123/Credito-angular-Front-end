import { Credito } from "./credito";

export interface CapitalInterface {

    id:number;
    credito:Credito;
    valor:number;
    descricao:String;
    enventDate:Date;
}

export class Capital implements CapitalInterface{
    id:number=0;
    valor:number=0;
    descricao:String="";
    enventDate:Date=new Date();
    credito:Credito=new Credito();
    constructor(){

    }
}