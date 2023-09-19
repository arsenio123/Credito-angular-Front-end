import { Credito } from "./credito";

export interface IntrestInterface {

    id:number;
    credito:Credito;
    valor:number;
    descricao:String;
    enventDate:Date;
}

export class Intrest implements IntrestInterface{
    id:number=0;
    valor:number=0;
    descricao:String="";
    enventDate:Date=new Date();
    credito:Credito=new Credito();
    constructor(){

    }
}