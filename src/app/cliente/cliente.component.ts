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
  cliente:Cliente=new Cliente();

  constructor(private clienteRest:ClienteRestService) { }

  ngOnInit(): void {
  this.clienteRest.getAllcliente().subscribe(respose=>{
    this.clientes=respose;
  });

  }

  adicionarClientes(){

    this.clienteRest.createCliente(this.cliente).subscribe(resp=>{
      this.cliente=resp;
    });
    this.clientes.push(this.cliente);
  }

  selectedItem(curCliente:Cliente){
    this.cliente=curCliente;
  }
  mostrarCredito(clieteID:any){
    alert(clieteID)
  }

}
