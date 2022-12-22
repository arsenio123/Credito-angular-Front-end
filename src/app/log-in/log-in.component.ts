import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router, RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent   
{
  usrId:string="";
  pwdId:string="";
  


  
  constructor(private loginServe: LoginService,private rout:Router){};
  //constructor(private rout:Router){};



  login(){
    console.log('iniciate login...');
    this.loginServe.login(this.usrId,this.pwdId);
    alert(this.usrId);
    //console.log('preparando o reditect');
    //this.rout.navigate(['/funcionaria-card']);
    //console.log('fim do rederecionamento');
  }

}
