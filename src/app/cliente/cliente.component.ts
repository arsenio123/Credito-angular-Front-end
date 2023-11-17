import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteRestService } from '../service/cliente-rest.service';
import { Cliente } from '../model/cliente';
import Swal from 'sweetalert2';
import { MessageServiceService } from '../service/message-service.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes:Cliente[]=[];
  sectores:string[]=["PRIVADO","PUBLICO"];
  cliente:Cliente=new Cliente();
  saveClientBt:string="Adicionar";
  curCliente:Cliente=new Cliente();

  constructor(private clienteRest:ClienteRestService,private router:Router,private messageAlert:MessageServiceService) { }

  ngOnInit(): void {
    if(this.messageAlert.isSessiovalide()==true){
      this.clienteRest.getAllcliente().subscribe(respose=>{
        this.clientes=respose;
        
      });
    }
    
    

  }

  adicionarCliente(){

    this.clienteRest.createCliente(this.cliente).subscribe(resp=>{
      this.cliente=resp;
      this.clientes.push(this.cliente);
      this.messageAlert.alertSuccess("Cleinte adicionado com Sucesso");
    },error=>{
      console.log(error);
      this.messageAlert.alertError(error);
    }
    );
    
    
  }

  selectedItem(curCliente:Cliente){
    this.cliente=curCliente;
    this.saveClientBt="Alterar Cliente";
    this.curCliente=curCliente;
  }
  mostrarCredito(clieteID:any){
    alert(clieteID)
  }

  cancelarCliente(){
    this.saveClientBt="Adicionar";
  }

}
