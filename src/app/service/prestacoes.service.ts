import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestacao } from '../model/prestacao';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class PrestacoesService extends RestGenericService<Prestacao>{

  constructor(private http:HttpClient) {
    super();
  }
  //config:Config=new Config();

 

  getPrestacaoFromCredito(creditoId:number):Observable<Prestacao[]>{
    console.debug(`PrestacoesService [pedindo as prestacoes para o credito numero ${creditoId}`);
   return this.get('/prestacao/list/credit_id?'+`id=${creditoId}`,"",this.http);
    
  }
}
