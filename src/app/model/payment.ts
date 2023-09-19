import { Capital } from "./capital";
import { Intrest } from "./intrest";
import { Prestacao } from "./prestacao";
import { User } from "./user"

export interface PaymentInterface {
    id: number,
    dataDePagametno:Date,
    createdBay:number,
    conta:number,
    valorPago:number,
    formaPagamento:string,
    intrest:Intrest,
    capital:Capital,
    prestacao:Prestacao
}
export class Payment implements PaymentInterface{
    
    id: number=0;
    intrest: Intrest=new Intrest();
    capital:Capital=new Capital();
    dataDePagametno: Date=new Date();
    createdBay: number=0;
    conta: number=0;
    valorPago: number=0;
    formaPagamento: string="";
    prestacao:Prestacao=new Prestacao();
    constructor(){

    }
}
