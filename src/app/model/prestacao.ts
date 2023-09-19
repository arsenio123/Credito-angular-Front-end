import { Capital } from "./capital";
import { Credito } from "./credito";
import { Intrest } from "./intrest";

export interface PrestacaoInterface {

    id: number;
    vencimento:Date;
    dataPagamento:Date;
    contaCreditada:number;
    valorCapitaPorPagar:number;
    jurusPago:number;
    capitalPago:number;
    estado:string;
    credito:Credito;
    intrest:Intrest;
    capital:Capital;
}

export class Prestacao implements PrestacaoInterface{
    id: number=0;
    vencimento: Date=new Date();
    dataPagamento: Date=new Date();
    contaCreditada: number=0;
    valorCapitaPorPagar: number=0;
    jurusPago: number=0;
    capitalPago: number=0;
    estado: string="";
    credito:Credito=new Credito();
    intrest: Intrest=new Intrest();
    capital: Capital=new Capital();
    constructor(){

    }
}
