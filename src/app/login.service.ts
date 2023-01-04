import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/toPromise';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Token } from './model/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
session:Token={
  access_token:"",
  token_type: "",
  expires_in: 0,
  scope: "",
  jti: ""
};

 

  constructor(private http:HttpClient) {}
  sayHello(){
   this.http.get('http://localhost:8080/hello').toPromise().then(response =>{
    //console.log(response);
  });

  }
  
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

    return this.http.post<Token>('http://localhost:8080/oauth/token',body, httpOptions )
    .subscribe(resp=>{
      this.session=resp;
      return this.session;
    });
  }
  getAccess_token(){
    console.log(this.session.access_token);
     return this.session.access_token;
  }

}
