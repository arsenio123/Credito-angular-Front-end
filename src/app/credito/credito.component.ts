import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { Credito } from '../model/credito';
import { Prestacao } from '../model/prestacao';
import { PrestacoesService } from '../service/prestacoes.service';
import { Router } from '@angular/router';
import { ClienteRestService } from '../service/cliente-rest.service';
import { Producto } from '../model/producto';
import { ProductService } from '../service/product-service.service';
import { PaymentService } from '../service/payment-service.service';
import { Payment } from '../model/payment';
import { CreditoService } from '../service/credito-service.service';
import { LoginService } from '../service/login.service';
import { Dialog } from '../model/dialog';
import { Type } from '../model/Type';
import Swal from 'sweetalert2';
import { Intrest } from '../model/intrest';
import { Capital } from '../model/capital';
import { IntrestSevice } from '../service/Intrest-service.service';
import { CapitalServiceService } from '../service/capital-service.service';


@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent
 implements OnInit
  {
  makingPay_DIV:boolean=false;
  dialog:Dialog=new Dialog();

  divFormPrestacao:boolean=false;
  usrId:string="";
  saveCreditoBt:string="Adcionar Credito";
  //novaPrestacao:Prestacao=new Prestacao();
  
  payments:Payment[]=[];
  creditos:Credito[]=[];
  curCredito:Credito=new Credito();
  prestacoes:Prestacao[]=[];
  curPrestacao:Prestacao=new Prestacao();
  productos:Producto[]=[];
  pagamento:Payment=new Payment();
  prestacao:Prestacao=new Prestacao();
  credito:Credito=new Credito();
  estados:string[]=["CANCELADO","VIGOR"]//deve ser inicilizado por API
  popupDivida:string="display: none;opacity: 1;";
  mainDivStile:string=""  
  recordsForPage:number=5;
  lastCreditId:number=0;
  curIntrest:Intrest=new Intrest();
  curCapital:Capital=new Capital();
  curSaldo:number=0;
  prestacao_estados:string[]=["NAO_PAGA","PAGA"];
  
  constructor(private creditoAPI:CreditoService,
    private prestacaoServ:PrestacoesService,
    private router:Router,
    private http:HttpClient,
    private clienteService:ClienteRestService,
    private productService:ProductService,
    private payService:PaymentService,
    private intrestService:IntrestSevice,
    private capiralService:CapitalServiceService) { }


  ngOnInit(){

    if(localStorage.getItem("token")==null){
      console.log("Sessao expirada");
      //alert("Sessao expirada");
      this.dialog.message="Sessao expirada";
      this.dialog.type=Type.ERROR;
      this.alertError(this.dialog.message);
      this.router.navigate(["/login"]);
    }else{
      console.log("sessao que passa a ser usada "+localStorage.getItem("token"))
      this.productService.getAllProduct().subscribe(resp=>{
        this.productos=resp;
        console.log("response Productos"+resp);
      },error=>{
        this.alertError(this.dialog.message);
        console.log(error);
      })
      this.productos
      this.consultaCredito();
    }

      console.log(this.creditos);
  }


  consultaCredito_old(){

    this.creditoAPI.getAllCredits().subscribe(data=>{
      this.creditos=data;
      console.log(data);},
      error=>{
        console.log(error);
        this.alertError(error);
      }
    
    );

    
  }
  consultaCredito(){

    this.creditoAPI
    .getCreditsWithPagination(this.recordsForPage,this.lastCreditId)
    .subscribe(data=>{
      this.creditos=data;
      console.log("resposta de consulta de creditos "+data);
      //this.lastCreditId=this.creditos.;
     this.lastCreditId=this.creditos[1].id;
     console.log("laste index is "+this.lastCreditId);
    }/*,error=>{
      alert("");
      }*/
      
    
    );

    
  }

  consultaCreditopageDown(){

    this.creditoAPI
    .getCreditsWithPaginationDown(this.recordsForPage,this.lastCreditId)
    .subscribe(data=>{
      this.creditos=data;
      console.log(data);
      
     this.lastCreditId=this.creditos[0].id;
     console.log("laste index is "+this.lastCreditId);
    }/*,error=>{
      alert("");
      }*/
      
    
    );

    
  }

  adicionarCredito(){
    console.log("adicionando um novo credito");
    console.log(LoginService.logedUser);
    this.credito.createdBy=LoginService.logedUser.id;
    this.credito.aprovadoPOr=LoginService.logedUser.id;
      this.credito.createdDate=new Date();
      this.credito.updateDate=this.credito.createdDate;
      this.creditoAPI.createCredito(this.credito).subscribe(resp=>{
        //alert("SUCESSO credito adicionado com ");
        console.log("SUCESSO credito adicionado com ")
        this.dialog.message="SUCESSO credito adicionado com";
        this.dialog.type=Type.SUCESSO;

        Swal.fire({
          position: 'bottom-right',
          icon: 'error',
          title: this.dialog.message,
          showConfirmButton: false,
          timer: 3500
        });
      //}//,error=>{
        //alert("ERRO ao adicionar o credito");
        //console.log("ERRO ao adicionar o credito")
      });
    this.creditos.push(this.credito);
  }

  selectedCreditItem(curCredito:Credito){
    this.curCapital=new Capital();
    this.curIntrest=new Intrest();
    this.curSaldo=0;
    console.debug();
    this.credito=curCredito;
    this.curCredito=curCredito;
    this.prestacoes=[];
    this.saveCreditoBt="Editar Credito";

    this.prestacaoServ.getPrestacaoFromCredito(this.credito.id)
    .subscribe(resp=>{
      this.prestacoes=resp;
      console.log(resp);
    });
    
    this.refreshIntressAndCapital(curCredito);

    this.makingPay_DIV=false;
    this.divFormPrestacao=false;
    console.log("corrente state:");
    console.log(this.credito);
  }


  selectedPrestacao(curPrestacao:Prestacao){
    this.payService.getPaymentByPrestacao(curPrestacao.id).subscribe(resp=>{
      this.payments=resp;
      this.makingPay_DIV=true
    });
    this.prestacao=curPrestacao;
    this.curPrestacao=curPrestacao;
    console.log(this.prestacao);
    this.divFormPrestacao=false;
    this.refreshIntressAndCapital(curPrestacao.credito);
  }
  cancelarCredito(){
    this.curCredito=new Credito();
    this.credito=new Credito();
    this.saveCreditoBt="Adcionar Credito";
    this.divFormPrestacao=false;
    this.makingPay_DIV=false;
    this.prestacoes=[];
    this.payments=[];
    this.limparPagamento();
    this.limparPrestacao();
  }
  fazerPagamento(cred_id:number){
    this.popupDivida="";
  }

  findCliente(){
    this.clienteService.findByID(this.credito.cliente.id)
    .subscribe(resp=>{
      this.credito.cliente=resp
    },
    error=>{
      alert(`cliente com o id:${this.credito.cliente.id} nao existe`)
      this.alertError(`cliente com o id:${this.credito.cliente.id} nao existe`);
    })
   
  }

  editarPagamento(selecterPayment:Payment){

  }

  showPagamentos():boolean{
    return this.makingPay_DIV;
  }

  showPrestacaoForm():boolean{
    return this.divFormPrestacao;
  }

  limparPagamento(){
    this.pagamento=new Payment();
  }
  pagar(){
    this.pagamento.createdBay=LoginService.logedUser.id;
    this.prestacao.credito=this.credito;
    this.pagamento.prestacao=this.prestacao;
    this.payService.makePayment(this.pagamento).subscribe(resp=>{
        this.dialog.message="SUCESSO no pagamento";
        this.dialog.type=Type.SUCESSO;
        this.alertSuccess(this.dialog.message);

    },error=>{
      this.dialog.message="ERROR ao fazer carregar o pagamento";
        this.dialog.type=Type.ERROR;
        this.alertError(this.dialog.message);
    })
  }

  criarPrestacao(){
    this.prestacao.credito=this.credito;
    this.prestacao.intrest.credito=this.credito;
    this.prestacao.capital.credito=this.credito;
    console.log("cirando prestacao ");
    console.log(this.prestacao);
    
    this.prestacaoServ.creatUpdate(this.prestacao).subscribe(response=>{
      this.prestacao=response;
      console.log(response);
      this.dialog.message="SUCESSO na criacao/atulizacao da prestacao";
        this.dialog.type=Type.SUCESSO;
        this.alertSuccess(this.dialog.message);
    },error=>{
      this.dialog.message="ERRO na criacao/atulizacao da prestacao";
        this.dialog.type=Type.ERROR;
        this.alertError(this.dialog.message);
      console.log(error);
    });
    
  }

  limparPrestacao(){
    this.curPrestacao=new Prestacao();
   this.prestacao=new Prestacao();
  }

  switchVisibilitePrestacaoForm () {
    return this.divFormPrestacao=!this.divFormPrestacao;
  }

  alertError(titleParam:string){

    Swal.fire({
      position: 'top-right',
      icon: 'error',
      title: titleParam,
      showConfirmButton: false,
      timer: 3500
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


  refreshIntressAndCapital(curCredito:Credito){
    this.intrestService.getIntrest(curCredito).subscribe(resp=>{
      this.curIntrest=resp;
      
      if(this.curIntrest==null){
        this.curIntrest=new Intrest();
        this.curIntrest.credito=this.curCredito
      }else{
        this.curSaldo=this.curSaldo+this.curIntrest.valor;
      }
    });
    this.capiralService.getCapital(curCredito).subscribe(resp=>{
      this.curCapital=resp;
      this.curSaldo=this.curSaldo+this.curCapital.valor;
    });
  }

}
