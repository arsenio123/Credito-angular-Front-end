import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestGenericService<User>{
  URLpath:string="http://localhost:8081";


  constructor(public http:HttpClient) {
    super();
  }

  getUser():Observable<User[]>{
    console.log("UserServiceService: chamando o servico generico")
    return this.getFullpath(this.URLpath+"/user/list","",this.http)

  }
}
