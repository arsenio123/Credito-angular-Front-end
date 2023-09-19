import { Injectable } from '@angular/core';
import { RestGenericService } from './rest-generic.service';
import { Capital } from '../model/capital';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credito } from '../model/credito';

@Injectable({
  providedIn: 'root'
})
export class CapitalServiceService extends RestGenericService<Capital>{

  constructor(private http:HttpClient) { 
    super();
  }

  public getCapital(credito:Credito):Observable<Capital>{
    console.debug(`Pesquisando o Capital para o credito= ${credito.id}`);
   return this.getOne('/saldo/capital?'+`credito_id=${credito.id}`,"",this.http);
    
  }

}
