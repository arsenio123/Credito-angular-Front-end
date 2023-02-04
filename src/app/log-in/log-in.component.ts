import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router, RouterEvent, RouterLink } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent   implements OnInit
{
  usrId:string="";
  pwdId:string="";
   constructor(public loginServe: LoginService,private rout:Router){};


  i:number=0;
  ngOnInit(){
}
  
  login(){
    console.log('iniciate login... para o user '+this.usrId+' pass: '+ this.pwdId);
    const tokken=this.loginServe.login(this.usrId,this.pwdId);
  }

}
