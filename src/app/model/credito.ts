import { ClienteComponent } from "../cliente/cliente.component";
import { Cliente } from "./cliente";
import { Producto } from "./producto";
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
    producto:Producto
}

export class Credito implements CreditoInterface{
  id: number=0;
  createdDate: Date=new Date();
  updateDate: Date= new Date();
  valor: number=0;
  doDate: Date=new Date();
  beginDate: Date=new Date();
  estado: string="";
  jurus: number=0;
  balance: number=0;
  proxima_Prestacao: Date=new Date();
  cliente: Cliente=new Cliente();
  producto:Producto=new Producto();

  constructor(){

  }

}
