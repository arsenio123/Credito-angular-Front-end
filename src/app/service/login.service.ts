import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '../model/token';
import {  Router } from '@angular/router';
import { RestGenericService } from '../service/rest-generic.service';
import { User } from '../model/user';
import { UserService } from './user-service.service';
import { Dialog } from '../model/dialog';
import { Type } from '../model/Type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends RestGenericService<Token>{
  public jwtPayLoad:any;
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

  public static logedUser: User;
 

  constructor(private http:HttpClient
    ,private router:Router
     ) {
    super();
  }
  
  login(username:any, password:any, ):Observable<any>{

    const body=`cliente=react&username=${username}&password=${password}&grant_type=password`;
    
    
    return this.auth(body,this.http);/*.subscribe(resp=>{
      console.log("LoginService: resp{ "+resp);
      this.session=resp;
      localStorage.setItem("token",this.session.access_token);
      if(resp.access_token!=""){
        console.log("autenicado com sucesso "+this.session.access_token);
        this.router.navigate(["/credito"]);
         this.userservice.getOne(`/user/login?userName=${username}`,"",this.http).subscribe(respUser=>{
          LoginService.logedUser=respUser;
        })
      } 
      return this.session;
    },error=>{
      console.log(error.error.error_description);
      this.dialog.type=Type.ERROR;
        this.dialog.message="autenicacao falhada "+error.error.error_description;
        console.log('entrando para o 2 error');
        console.log(this.dialog);
        return this.dialog;
    });*/
  }
  getAccess_token(){
    console.log(this.session.access_token);
     return this.session.access_token;
  }

}
