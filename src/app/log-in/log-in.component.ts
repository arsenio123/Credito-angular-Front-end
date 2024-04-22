import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { Dialog } from '../model/dialog';
import { Type } from '../model/Type';
import { Token } from '../model/token';
import { UserService } from '../service/user-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MessageServiceService } from '../service/message-service.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent   implements OnInit
{
  usrId:string="";
  pwdId:string="";
  dialog:Dialog=new Dialog();

  session:Token={
    access_token:"",
      token_type: "",
      expires_in: 0,
      scope: "",
      jti: "",
      error: "",
      error_description: ""
  };
   constructor(public loginServe: LoginService,
    private router:Router,
     private userservice:UserService,
      private http:HttpClient,
      private messageAlert:MessageServiceService){};


  i:number=0;
  ngOnInit(){
}
  

  login(){
    console.log('iniciate login... para o user '+this.usrId+' pass: '+ this.pwdId);
      this.loginServe.login(this.usrId,this.pwdId).subscribe(resp=>{
        console.log("LoginService: resp{ "+resp);
        this.session=resp;
        localStorage.setItem("token",this.session.access_token);
        localStorage.setItem("userName",this.usrId);
        if(resp.access_token!=""){
          console.log("autenicado com sucesso "+this.session.access_token);
          this.router.navigate(["/credito"]);
          return this.userservice.getOneFull('http://localhost:8081',`/user/login?userName=${this.usrId}`,"",this.http).subscribe(respUser=>{
            LoginService.logedUser=respUser;
          })
        } 
        return this.session;
      },error=>{
        console.log(error.error.error_description);
        this.dialog.type=Type.ERROR;
        this.dialog.title="Credencias erradas";
        this.dialog.message=error.error.error_description;
          console.log('entrando para o 2 error');
          console.log(this.dialog);

          this.messageAlert.alertError(error);
      });     

  }

}
