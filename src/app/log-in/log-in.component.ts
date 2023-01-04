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



  login(){
    console.log('iniciate login... para o user '+this.usrId+' pass: '+ this.pwdId);
    const tokken=this.loginServe.login(this.usrId,this.pwdId);
    console.log('o tokken e: '+tokken.access_token);
    if(tokken.access_token!=null || tokken.access_token==""){
      this.rout.navigate(["/credito"]);
    }
    else{
      alert("User name ou password invalida");
    }
  }

}
