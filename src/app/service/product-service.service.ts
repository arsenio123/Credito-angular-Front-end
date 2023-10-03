import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends RestGenericService<Producto>{
  actulizarProducto(producto: Producto) {
    console.log("atualizando producto ");
    console.log(producto);
    return this.post("/producto/atualizar","application/json",this.http,producto);
  }

  constructor(private http:HttpClient) {
    super();
  }
  public getAllProduct():Observable<Producto[]>{
    return this.get("/producto/listar","",this.http);
  }

  public getProductByStatus(status:string):Observable<Producto[]>{
    return this.get(`/producto/find?status=${status}`,"",this.http);
  }

  public createProducto(producto:Producto):Observable<Producto>{
    console.log("criando novo producto ");
    console.log(producto);
    return this.post("/producto/create","application/json",this.http,producto);
  
  }
}
