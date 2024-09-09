import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Token } from '../model/token';
import {  Router } from '@angular/router';
import { RestGenericService } from '../service/rest-generic.service';
import { User } from '../model/user';
import { Dialog } from '../model/dialog';
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
    return this.auth(body,this.http);
  }
  getAccess_token(){
    console.log(this.session.access_token);
     return this.session.access_token;
  }

}
