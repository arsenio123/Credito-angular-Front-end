import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(private router:Router) { }

  alertError(errorOject:any){
    console.log("alertError: "+errorOject.error);
    console.log("alertError status: "+errorOject.status);
    var titleParam=errorOject;
    if(errorOject.status==401){
      titleParam="sem autoridade para fazer a operacao";
      console.log(2);
    }

    


    if(errorOject.error!=null && errorOject.error!=undefined){
      titleParam=errorOject.error;
      console.log(1);

    }
    if(errorOject.status==400){
      console.log("keep going")
      if(errorOject.error.message!=null){
        titleParam=errorOject.error.message;
         console.log(3);
        }
      else{titleParam=errorOject.message; console.log(4);}
    }
    if(errorOject.status==404){
      alert("404")
      
      titleParam=errorOject.error.error;
      console.log(titleParam);
    }
    

    
//fire the message on the screen
    Swal.fire({
      position: 'top-right',
      icon: 'error',
      title: titleParam,
      showConfirmButton: false,
      timer: 7500
    });
  }

  alertSuccess(titleParam:String){

    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: titleParam,
      showConfirmButton: false,
      timer: 1500
    });
  }

  isSessiovalide():Boolean{
    if(localStorage.getItem("token")==null){
      console.log("Sessao expirada");
      this.alertError("Sessao expirada\n     /     \n  Sem sessao Válida");
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
