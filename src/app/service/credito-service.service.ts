import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credito } from '../model/credito';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class CreditoService extends RestGenericService<Credito>{

  constructor(public http:HttpClient) {
    super();
  }

getAllCredits():Observable<Credito[]>{
  return this.get("/credito/list","",this.http)
}
createCredito(credito:Credito):Observable<Credito>{
  console.log("criando o novo credito ");
  console.log(credito);
  return this.post("/credito/creat","application/json",this.http,credito);
}
  
}
