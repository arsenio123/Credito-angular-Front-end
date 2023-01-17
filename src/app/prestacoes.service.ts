import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Prestacao } from './model/prestacao';

@Injectable({
  providedIn: 'root'
})
export class PrestacoesService {

  constructor(private login:LoginService,private http:HttpClient) { }
  //config:Config=new Config();

  getPrestacaoFromCredito(creditoId:number):Observable<Prestacao[]>{
    const fullUrl='http://localhost:8080'+'/prestacao/list/id?'+`id=${creditoId}`;
    const body=`?id=${creditoId}`
    console.log("localStorage "+localStorage.getItem(this.login.TOKEN));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer '+localStorage.getItem(this.login.TOKEN)
      })
    };

    console.log("sessao e: "+this.login.getAccess_token())
    return this.http.get<Prestacao[]>(fullUrl,httpOptions);
  }
}
