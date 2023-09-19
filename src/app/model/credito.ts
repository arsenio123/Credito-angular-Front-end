import { Cliente } from "./cliente";
import { Producto } from "./producto";
import { User } from "./user";
//import { Cliente } from "./cliente"

export interface CreditoInterface {
    id:number,
    createdDate:Date,
    updateDate:Date,
    valor:number,
    doDate:Date,
    beginDate:Date,
    estado:string,
    jurus:number,
    balance:number,
    proxima_Prestacao:Date,
    cliente:Cliente,
    producto:Producto,
    //createdBy:User,
    //aprovadoPOr:User
    createdBy:number,
    aprovadoPOr:number

}

export class Credito implements CreditoInterface{
  id: number=0;
  createdDate: Date=new Date();
  updateDate: Date= new Date();
  valor: number=0;
  doDate: Date=new Date();
  beginDate: Date=new Date();
  estado: string="VIGOR";
  jurus: number=0;
  balance: number=0;
  proxima_Prestacao: Date=new Date();
  cliente: Cliente=new Cliente();
  producto:Producto=new Producto();
  //createdBy:User=new User();
  //aprovadoPOr:User=new User();
  createdBy:number=0;
  aprovadoPOr:number=0;

  constructor(){

  }

}
