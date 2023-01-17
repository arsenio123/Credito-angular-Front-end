import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/toPromise';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Token } from './model/token';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public jwtPayLoad:any;
  TOKEN:string="token";
session:Token={
  access_token:"",
  token_type: "",
  expires_in: 0,
  scope: "",
  jti: ""
};

 

  constructor(private http:HttpClient
    //,private jwtHelper:JwtHelperService
     ) {}
  
  login(username:any, password:any):any{

    const headesrsalga = new Headers();
    headesrsalga.append('Content-Type','application/x-www-form-urlencoded');
    headesrsalga.append('Authorization','Basic cmVhY3Q6cjM0Y3Q=');

    const body=`cliente=react&username=${username}&password=${password}&grant_type=password`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Basic cmVhY3Q6cjM0Y3Q='
      })
    };
    //return 
    this.http.post<Token>('http://localhost:8080/oauth/token',body, httpOptions )
    .subscribe(resp=>{
      console.log("LoginService: resp{"+resp);
      this.session.access_token=resp.access_token;
      //this.jwtPayLoad=this.jwtHelper.decodeToken(resp.access_token);
      //localStorage.setItem("payLoad", this.jwtPayLoad);
      localStorage.setItem("token",this.session.access_token);
      if(this.session.access_token!=null){
        console.log("autenicado com sucesso "+this.session.access_token);
      }
      else{
        console.log("autenicacao falhada "+this.session.access_token);
      }
      
      return this.session;
    });
  }
  getAccess_token(){
    console.log(this.session.access_token);
     return this.session.access_token;
  }

}
