import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './model/cliente';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteRestService {
  url:string="http://localhost:8080";
  

  constructor(private http:HttpClient) { }

  getAllcliente():Observable<Cliente[]>{
    const fullUrl=this.url+"/credito/clientes"
    return this.http.get<Cliente[]>(fullUrl);
  }

  createCliente(cliente:Cliente):Observable<Cliente>{
    const fullUrl:any=this.url+"/credito/cliente/create";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer cmVhY3Q6cjM0Y3Q='
      })
    };

    const clienteBody:any=""
    return this.http.post<Cliente>(fullUrl,clienteBody);
  }
}
