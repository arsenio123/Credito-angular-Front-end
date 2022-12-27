import { Component, OnInit } from '@angular/core';
import { ClienteRestService } from '../cliente-rest.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes:Cliente[]=[];
  id:number=0;
  nome:string='';
  dataNascimento:Date=new Date;
  rendimento:number=0;
  morada:string='';
  telefone:string='';
  email:string='';
  idDoc:string='';
  numberDoc:string='';

  constructor(private clienteRest:ClienteRestService) { }

  ngOnInit(): void {
  this.clienteRest.getAllcliente().subscribe(respose=>{
    this.clientes=respose;
  })

  }

  adicionarClientes(){
    const cliente:Cliente={
      id:this.id,
      nome:this.nome,
      dataNascimento:this.dataNascimento,
      rendimento:this.rendimento,
      morada:this.morada,
      telefone:this.telefone,
      email:this.email,
      idDoc:this.idDoc,
      numberDoc:this.numberDoc
    }
    this.clientes.push(cliente);
  }

}
