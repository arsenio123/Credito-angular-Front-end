import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(private router:Router) { }

  alertError(titleParam:any){
    if(titleParam.error!=null && titleParam.error!=undefined){
      titleParam=titleParam.error
    }
    var titleParamStr=new String(titleParam);
    if(titleParamStr.includes(": 401 ")){
      titleParam="sem autoridade para fazer a operacao"
    }
    

    Swal.fire({
      position: 'top-right',
      icon: 'error',
      title: titleParam,
      showConfirmButton: false,
      timer: 7500
    });
  }

  alertSuccess(titleParam:string){

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
