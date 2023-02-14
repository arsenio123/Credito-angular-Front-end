import { Prestacao } from "./prestacao";
import { User } from "./user"

export interface PaymentInterface {
    id: number,
    dataDePagametno:Date,
    createdBay:User,
    conta:number,
    valorPago:number,
    formaPagamento:string,
    prestacao:Prestacao
}
export class Payment implements PaymentInterface{
    
    id: number=0;
    dataDePagametno: Date=new Date();
    createdBay: User=new User();
    conta: number=0;
    valorPago: number=0;
    formaPagamento: string="";
    prestacao:Prestacao=new Prestacao();
    constructor(){

    }
}
