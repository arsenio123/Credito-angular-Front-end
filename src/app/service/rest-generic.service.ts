import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../model/token';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestGenericService <T>{
  serverUrl:string="http://localhost:8080";
  ssoUrl:string="http://localhost:8081";
  //serverUrl:string="http://146.190.124.219:8080";
  //ssoUrl:string="http://146.190.124.219:8081";
  TOKEN:string="token";
  barrerPass="cmVhY3Q6cjM0Y3Q=";

  
  constructor( ) {
   }

   
   protected get(uri:string,contentType:String,http:HttpClient):Observable<T[]>{
        const fullUrl=this.serverUrl+uri;
        console.log(`RestGenericService [uri=${fullUrl}, contentType=${contentType}`);
     //console.log("RestGenericService [sessao e: "+localStorage.getItem(this.TOKEN))
  
    return http.get<T[]>(fullUrl,this.preparHeadersReqs(contentType));
  }

  protected getFullpath(uri:string,contentType:String,http:HttpClient):Observable<T[]>{
    const fullUrl=uri;
    console.log(`RestGenericService [uri=${fullUrl}, contentType=${contentType}`);
 //console.log("RestGenericService [sessao e: "+localStorage.getItem(this.TOKEN))

return http.get<T[]>(fullUrl,this.preparHeadersReqs(contentType));
}

  getOne(uri: string, contentType: string, http: HttpClient): Observable<T> {
    const fullUrl=this.ssoUrl+uri;
    console.log(`RestGenericService [uri=${fullUrl}, contentType=${contentType}`)
    return http.get<T>(fullUrl,this.preparHeadersReqs(contentType));
  }


  protected post(uri:string,contentType:String,http:HttpClient,t:T):Observable<T>{

    const fullUrl=this.serverUrl+uri;
    return http.post<T>(fullUrl,t,this.preparHeadersReqs(contentType));
  }


  auth(body:string,http:HttpClient):Observable<Token>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        Authorization: `Basic ${this.barrerPass}`
      })
    };
    return   http.post<Token>(this.ssoUrl+'/oauth/token',body, httpOptions );
  }

  private preparHeadersReqs(contentType:String){
    if(contentType==null||contentType==""){
      console.debug("definindo header");
      contentType='application/x-www-form-urlencoded'
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  `${contentType}`,
        Authorization: 'Bearer '+localStorage.getItem(this.TOKEN)
      })
    };
    console.log("********: "+Headers.toString);
    return httpOptions;

  }
}
