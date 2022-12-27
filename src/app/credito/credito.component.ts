import { HttpClient } from '@angular/common/http';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hello } from '../model/hello';
import { Observable } from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE4OTk5MDUsInVzZXJfbmFtZSI6Intub29wfWFkbWluIiwianRpIjoiZWxKM0VCY3luWFNZN2lteEtuTEZ3RThYdC1JIiwiY2xpZW50X2lkIjoicmVhY3QiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.nAWx9gGul_dyq6MBUfX2BKTIlpTw0Nny2v55EzLGwsU'
      })
    };
    return this.http.get<Hello[]>('http://localhost:8080/hello',httpOptions);

    
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
