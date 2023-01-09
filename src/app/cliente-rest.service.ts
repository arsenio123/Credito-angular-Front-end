import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './model/cliente';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteRestService {
  url:string="http://localhost:8080";

 

 
  
  

  constructor(private http:HttpClient, private login:LoginService) { }

  getAllcliente():Observable<Cliente[]>{
    const fullUrl=this.url+"/credito/clientes"

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer '+this.login.getAccess_token()
      })
    };


    return this.http.get<Cliente[]>(fullUrl,httpOptions);
  }

  createCliente(cliente:Cliente):Observable<Cliente>{
    cliente.id=0;
    console.log("criando cliente.. "+cliente.email)
    const httpOptionsJson = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer '+this.login.getAccess_token()
      })
    };
    const fullUrl:any=this.url+"/credito/cliente/create";
    return this.http.post<Cliente>(fullUrl,cliente,httpOptionsJson);
  }
}
