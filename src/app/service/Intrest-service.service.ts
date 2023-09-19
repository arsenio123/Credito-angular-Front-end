import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intrest } from '../model/intrest';
import { RestGenericService } from './rest-generic.service';
import { Observable } from 'rxjs';
import { Credito } from '../model/credito';

@Injectable({
  providedIn: 'root'
})
export class IntrestSevice extends RestGenericService<Intrest>{

  constructor(private http:HttpClient) { 
    super();
  }

  public getIntrest(credito:Credito):Observable<Intrest>{
    console.debug(`pesquisando para o Inreste para o credito=${credito.id}`);
   return this.getOne('/saldo/intrest?'+`credito_id=${credito.id}`,"",this.http);
    
  }
}
