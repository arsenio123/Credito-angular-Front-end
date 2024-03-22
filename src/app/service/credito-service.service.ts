import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credito } from '../model/credito';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class CreditoService extends RestGenericService<Credito>{
  getCreditByCriteria(recordsForPage: number, creditoestado: string, findCreditoByClientID: number):Observable<Credito[]> {
    return this.get(`/credito/list/critirea/findByCriteria?records=${recordsForPage}&estado=${creditoestado}&clieteID=${findCreditoByClientID}`,"",this.http);
    // throw new Error('Method not implemented.');
  }
  
  
  
  getCreditoByClienteID(clientID: number):Observable<Credito[]> {
    return this.get(`/credito/list/findCreditoByClientID?clientID=${clientID}`,"",this.http);
  }
  
  
  
  getCreditsWithPaginationDown(recordsForPage: number, lastCreditId: number):Observable<Credito[]> {
    return this.get(`/credito/list/critirea/previes?id=${lastCreditId}&records=${recordsForPage}`,"",this.http);
  }


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

atualizaCredito(credito: Credito):Observable<Credito>{
  console.log(`atualizando credito de numero ${credito.id} `);
  console.log(credito);
  return this.post("/credito/atualiza","application/json",this.http,credito);
}

getCreditsWithPagination(recordsForPage: number, lastCreditId: number,estado:string):Observable<Credito[]> {
  return this.get(`/credito/list/critirea/v2?id=${lastCreditId}&records=${recordsForPage}&estado=${estado}`,"",this.http);
}
  
}
