import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private clienteRest:ClienteRestService,private router:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("token")==null){
      console.log("Sessao expirada");
      alert("Sessao expirada")
      this.router.navigate(["/login"]);
    }else{
      this.clienteRest.getAllcliente().subscribe(respose=>{
        this.clientes=respose;
        
      });
    }
    
 /* */

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
