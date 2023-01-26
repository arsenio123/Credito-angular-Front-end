import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends RestGenericService<User>{


  constructor(public http:HttpClient) {
    super();
  }

  getUser():Observable<User[]>{
    console.log("UserServiceService: chamando o servico generico")
    return this.get("/user/list","",this.http)

  }
}
