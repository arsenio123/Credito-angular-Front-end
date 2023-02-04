import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '../model/token';
import {  Router } from '@angular/router';
import { RestGenericService } from '../service/rest-generic.service';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends RestGenericService<Token>{
  public jwtPayLoad:any;
session:Token={
  access_token:"",
    token_type: "",
    expires_in: 0,
    scope: "",
    jti: "",
    error: "",
    error_description: ""
};

 

  constructor(private http:HttpClient
    ,private router:Router
     ) {
    super();
  }
  
  login(username:any, password:any, ):any{

    const body=`cliente=react&username=${username}&password=${password}&grant_type=password`;
    
    
    this.auth(body,this.http).subscribe(resp=>{
      console.log("LoginService: resp{"+resp);
      this.session=resp;
      localStorage.setItem("token",this.session.access_token);
      if(resp.access_token!=""){
        console.log("autenicado com sucesso "+this.session.access_token);
        this.router.navigate(["/credito"]);
      }
      else{
        alert("autenicacao falhada "+this.session.error_description);
      }
      
      return this.session;
    },error=>{
      alert("autenicacao falhada "+error.error_description);
    });
  }
  getAccess_token(){
    console.log(this.session.access_token);
     return this.session.access_token;
  }

}
