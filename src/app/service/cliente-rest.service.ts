import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteRestService extends RestGenericService<Cliente>{
  findByName(name: string) : Observable<Cliente> {
    const paramClinetName=`client_Name=${name}`;
    return this.getOne("/credito/cliente/find?"+paramClinetName,"",this.http);
    //throw new Error('Method not implemented.');
  }
 



  constructor(private http:HttpClient) {
    super();
  }

  getAllcliente():Observable<Cliente[]>{
    console.log("ClienteRestService e: ");
    const uri="/credito/clientes";
    return this.get(uri,"",this.http);
  }

  createCliente(cliente:Cliente):Observable<Cliente>{
    cliente.id=0;
    console.log("criando cliente.. "+cliente.email)
    const uri:any="/credito/cliente/create";
    return this.post(uri,"application/json",this.http,cliente);
  }

  findByID(id: number): Observable<Cliente> {
    const paramClinetID=`client_id=${id}`;
    return this.getOne("/credito/cliente?"+paramClinetID,"",this.http);
    //throw new Error('Method not implemented.');
  }
 
}
