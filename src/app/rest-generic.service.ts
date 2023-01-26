import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestGenericService <T>{
  serverUrl:string="http://localhost:8080";
  TOKEN:string="token";

  
  constructor( ) {
   }

   protected get(uri:string,contentType:String,http:HttpClient):Observable<T[]>{
    console.log(`RestGenericService [uri=${uri}, contentType=${contentType}`)
    const fullUrl=this.serverUrl+uri;
    
    if(contentType==null||contentType==""){
      console.debug("definindo header");
      contentType='application/x-www-form-urlencoded'
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: 'Bearer '+localStorage.getItem(this.TOKEN)
      })
    };

    console.log("RestGenericService [sessao e: "+localStorage.getItem(this.TOKEN))
    http.get<T[]>(fullUrl,httpOptions).subscribe(resp=>{
      console.debug("RestGenericService[ "+resp);
    })
    return http.get<T[]>(fullUrl,httpOptions);
  }
}
