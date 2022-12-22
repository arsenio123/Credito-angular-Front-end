import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usrId:string="";
  pwdId:string="";
  
  //import do servico de login
  constructor(private loginservica: LoginService){}
 
  ngOnInit(): void {
    console.log('hello not from java');
    this.loginservica.sayHello();
    console.log('hello after send http request');
    
  }
 
  funcionarios:{id:number,nome:string}[]= [];
  nomeFuncionaio:string='';
 
  appAdicionar(funcionario:any){
    this.funcionarios.push(funcionario);
    this.nomeFuncionaio=funcionario.nome;
  }

  appRemover(){
    this.funcionarios=[];
    console.log('limpando os divs')
  }

  login(){
    console.log('username: '+this.usrId+', password:'+this.pwdId);
    alert('username: '+this.usrId+', password:'+this.pwdId);
    this.loginservica.login(this.usrId,this.pwdId);

  }

}
