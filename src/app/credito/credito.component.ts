import { HttpClient } from '@angular/common/http';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hello } from '../model/hello';
import { Observable } from 'rxjs/';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent
 implements OnInit
  {
    usrId:string="";
  clientes:Hello[]=[];
  id:any=0;
   name:any="";
   senha:any='';
  roles:any='';
  
  constructor(private http:HttpClient ) { }

  ngOnInit(){
    this.consultaCredito().subscribe(data=>{
      this.clientes=data;
      console.log(data);
    
    })

      console.log(this.clientes);
  }


  consultaCredito():Observable<Hello[]>{
    return this.http.get<Hello[]>('http://localhost:8080/hello');

    
  }
  consultaPromise():Promise<any>{
    return  this.http.get<Hello>('http://localhost:8080/hello')
          .toPromise();
          //.then(output => output);
    
  }

  showClientes(){
    console.log(this.clientes)
  }

  adicionarClientes(){
    const tempCliente:Hello={
      id:	this.id,
      name:this.name,
      senha:this.senha,
      roles:	this.roles
  };
    this.clientes.push(tempCliente);
  }

  

}
