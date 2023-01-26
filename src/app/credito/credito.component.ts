import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login.service';
import { CreditoInterface } from '../model/credito';
import { Credito } from '../model/credito';
import { Prestacao } from '../model/prestacao';
import { PrestacoesService } from '../prestacoes.service';


@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent
 implements OnInit
  {
  usrId:string="";
  saveCreditoBt:string="Adcionar Credito";
  
  creditos:Credito[]=[];
  prestacoes:Prestacao[]=[];
  prestacao:Prestacao=new Prestacao();
  credito:Credito=new Credito();
  estados:string[]=["CANCELADO","VIGOR"]
  popupDivida:string="display: none;opacity: 1;";
  mainDivStile:string=""  
  
  constructor(private http:HttpClient,private login:LoginService, private prestacaoServ:PrestacoesService ) { }

  ngOnInit(){
    this.consultaCredito().subscribe(data=>{
      this.creditos=data;
      console.log(data);
    
    })

      console.log(this.creditos);
  }


  consultaCredito():Observable<CreditoInterface[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer '+localStorage.getItem(this.login.TOKEN)
      })
    };
    console.log(httpOptions.headers)
    console.log("CreditoComponent consultando com o token: "+ localStorage.getItem(this.login.TOKEN))
    return this.http.get<Credito[]>('http://localhost:8080/credito/list',httpOptions);

    
  }

 /* showCerdito(){
    console.log(this.creditos)
  }*/

  adicionarCredito(){
      this.credito.createdDate=new Date();
      this.credito.updateDate=this.credito.createdDate;
  
    this.creditos.push(this.credito);
  }

  selecterdItem(curCredito:Credito){
    this.credito=curCredito;
    this.prestacoes=[];
    this.saveCreditoBt="Editar Credito";

    this.prestacaoServ.getPrestacaoFromCredito(this.credito.id)
    .subscribe(resp=>{
      this.prestacoes=resp;
    });
  }
  selectedPrestacao(){
    
  }
  cancelarCredito(){
    this.credito=new Credito();
  }
  fazerPagamento(cred_id:number){
    this.popupDivida="";
  }

}
