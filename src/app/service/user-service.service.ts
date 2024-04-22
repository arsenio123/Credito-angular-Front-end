import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestGenericService<User>{
  URLpath:string="http://localhost:8081";

  
  changePassword(logedUser: User, changePassword: string,currentPassword:string):Observable<String> {
    console.log("alterando a pass para o user: "+logedUser);

    const headersOBJ=this.preparHeadersReqs("");

  
     const body =`email=${logedUser.name}&newPassword=${changePassword}&id=${logedUser.id}&oldPassword=${currentPassword}`;

     return this.http.post<String>(this.URLpath+"/user/changepass",body,headersOBJ);
  }
  
  constructor(public http:HttpClient) {
    super();
  }

  getUser():Observable<User[]>{
    console.log("UserServiceService: chamando o servico generico")
    return this.getFullpath(this.URLpath+"/user/list","",this.http)

  }
}
