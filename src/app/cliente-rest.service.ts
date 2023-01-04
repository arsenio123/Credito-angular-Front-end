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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      Authorization: 'Bearer '+this.login.getAccess_token()
    })
  };

  httpOptionsJson = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      Authorization: 'Bearer '+this.login.getAccess_token()
    })
  };
  
  

  constructor(private http:HttpClient, private login:LoginService) { }

  getAllcliente():Observable<Cliente[]>{
    const fullUrl=this.url+"/credito/clientes"

     


    return this.http.get<Cliente[]>(fullUrl,this.httpOptions);
  }

  createCliente(cliente:Cliente):Observable<Cliente>{
    const fullUrl:any=this.url+"/credito/cliente/create";
    this.http.post(fullUrl,cliente,this.httpOptionsJson);

   

    const clienteBody:any=""
    return this.http.post<Cliente>(fullUrl,clienteBody);
  }
}
