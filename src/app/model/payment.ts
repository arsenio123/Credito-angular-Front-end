import { User } from "./user"

export interface PaymentInterface {
    id: number,
    dataDePagametno:Date,
    createdBay:User,
    conta:number,
    valorPago:number,
    formaPagamento:string
}
export class Payment implements PaymentInterface{
    
    id: number=0;
    dataDePagametno: Date=new Date();
    createdBay: User=new User();
    conta: number=0;
    valorPago: number=0;
    formaPagamento: string="";
    constructor(){
        
    }
}
