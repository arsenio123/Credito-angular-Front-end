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
  cur_Cliente:Cliente={id:0,
  nome:'',
  dataNascimento:new Date,
  rendimento:0,
  morada:'',
  telefone:'',
  email:'',
  idDoc:'',
  numberDoc:''}

  constructor(private clienteRest:ClienteRestService) { }

  ngOnInit(): void {
  this.clienteRest.getAllcliente().subscribe(respose=>{
    this.clientes=respose;
  });
  console.log("escrevendo a data curente: "+this.cur_Cliente.dataNascimento);

  }

  adicionarClientes(){
    const cliente:Cliente={
      id:this.cur_Cliente.id,
      nome:this.cur_Cliente.nome,
      dataNascimento:this.cur_Cliente.dataNascimento,
      rendimento:this.cur_Cliente.rendimento,
      morada:this.cur_Cliente.morada,
      telefone:this.cur_Cliente.telefone,
      email:this.cur_Cliente.email,
      idDoc:this.cur_Cliente.idDoc,
      numberDoc:this.cur_Cliente.numberDoc
    }

    this.clienteRest.createCliente(this.cur_Cliente).subscribe(resp=>{
      this.cur_Cliente=resp;
    });
    this.clientes.push(cliente);
  }

  selectedItem(selectedItem:any){
    this.cur_Cliente=selectedItem;
  }

}
