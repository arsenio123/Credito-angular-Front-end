import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../model/token';
import { Injectable } from '@angular/core';
import { config } from '../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestGenericService <T>{
  serverUrl:string=config.serverUrl;
  ssoUrl:string=config.ssoUrl
  TOKEN:string="token";
  barrerPass=config.pass;
  headers:HttpHeaders=new HttpHeaders();
 
  
  constructor( ) {
   }

   
   protected get(uri:string,contentType:String,http:HttpClient):Observable<T[]>{
        const fullUrl=this.serverUrl+uri;
        console.log(`RestGenericService [uri=${fullUrl}, contentType=${contentType}`);
        console.log("RestGenericService [sessao e: "+localStorage.getItem(this.TOKEN));
       // var headers =this.preparHeadersReqs(contentType);
  
    return http.get<T[]>(fullUrl,this.preparHeadersReqs(contentType));
  }

  protected getFullpath(uri:string,contentType:String,http:HttpClient):Observable<T[]>{
    const fullUrl=uri;
    console.log(`RestGenericService [uri=${fullUrl}, contentType=${contentType}`);
 //console.log("RestGenericService [sessao e: "+localStorage.getItem(this.TOKEN))

return http.get<T[]>(fullUrl,this.preparHeadersReqs(contentType));
}

  getOne(uri: string, contentType: string, http: HttpClient): Observable<T> {
   //const fullUrl=this.ssoUrl+uri;
    const fullUrl=this.serverUrl+uri;
    console.log(`RestGenericService [uri=${fullUrl}, contentType=${contentType}`)
    var headers =this.preparHeadersReqs(contentType);
    console.log("headers: "+headers)
    return http.get<T>(fullUrl,headers);
  }

  getOneFull(server:string ,uri: string, contentType: string, http: HttpClient): Observable<T> {
     const fullUrl=server+uri;
     console.log(`RestGenericService [uri=${fullUrl}, contentType=${contentType}`)
     var headers =this.preparHeadersReqs(contentType);
     console.log("headers: "+headers)
     return http.get<T>(fullUrl,headers);
   }


  protected post(uri:string,contentType:String,http:HttpClient,t:T):Observable<T>{

    const fullUrl=this.serverUrl+uri;
    return http.post<T>(fullUrl,t,this.preparHeadersReqs(contentType));
  }

  protected postFullPathString(fullUrl:string,contentType:String,http:HttpClient,t:T):Observable<String>{
    return http.post<String>(fullUrl,t,this.preparHeadersReqs(contentType));
  }

  protected postString(uri:string,contentType:String,http:HttpClient,t:T):Observable<String>{

    const fullUrl=this.serverUrl+uri;
    return http.post<String>(fullUrl,t,this.preparHeadersReqs(contentType));
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

  protected preparHeadersReqs(contentType:String){
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
    console.log("fim do preparacao dos headers")
    //console.log("********: "+httpOptions.headers.get("Authorization"));
    
    return httpOptions;

  }
}
