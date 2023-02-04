import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends RestGenericService<Producto>{

  constructor(private http:HttpClient) {
    super();
  }
  public getAllProduct():Observable<Producto[]>{
    return this.get("/producto/list","",this.http)
  }
}
