import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/toPromise';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
session:string='';
 

  constructor(private http:HttpClient) {}
  sayHello(){
   this.http.get('http://localhost:8080/hello').toPromise().then(response =>{
    //console.log(response);
  });

  }

  //url: 'http://localhost:8080/oauth/toke'
  //body:  '{cliente:react,username:admin,password:strong,grant_type:password}', options: {
  
  login(username:any, password:any){

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
    console.log('fazendo login ...');
    return this.http.post('http://localhost:8080/oauth/token',body, httpOptions )
    .toPromise().then(response=>{console.log(response)});
  }

}
