import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment';
import { RestGenericService } from './rest-generic.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends RestGenericService<Payment>{


  constructor(public http:HttpClient) {
    super()
   }

   public getPaymentByPrestacao(id:number):Observable<Payment[]>{
    return this.get(`/pagamento/lista?Prestacao_id=${id}`,"",this.http);
   }  
   
   public makePayment(pagamento: Payment):Observable<Payment> {
    console.log("A efectuar pagamento: "+pagamento);
    return this.post("/pagamento/create","application/json",this.http,pagamento)
  }
}
