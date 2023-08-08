import { HttpClient } from '@angular/common/http';
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


@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent
 implements OnInit
  {
  makingPay_DIV:boolean=false;

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
  prestacao_estados:string[]=["NAO_PAGA","PAGA"];
  
  constructor(private creditoAPI:CreditoService,
    private prestacaoServ:PrestacoesService,
    private router:Router,
    private http:HttpClient,
    private clienteService:ClienteRestService,
    private productService:ProductService,
    private payService:PaymentService ) { }

  ngOnInit(){

    if(localStorage.getItem("token")==null){
      console.log("Sessao expirada");
      alert("Sessao expirada")
      this.router.navigate(["/login"]);
    }else{
      this.productService.getAllProduct().subscribe(resp=>{
        this.productos=resp;
        console.log("response Productos"+resp);
      },error=>{
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
      console.log(data);}
    
    );

    
  }
  consultaCredito(){

    this.creditoAPI
    .getCreditsWithPagination(this.recordsForPage,this.lastCreditId)
    .subscribe(data=>{
      this.creditos=data;
      console.log(data);
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
      //this.lastCreditId=this.creditos.;
      
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
    this.credito.createdBy=LoginService.logedUser;
    this.credito.aprovadoPOr=LoginService.logedUser;
      this.credito.createdDate=new Date();
      this.credito.updateDate=this.credito.createdDate;
      this.creditoAPI.createCredito(this.credito).subscribe(resp=>{
        alert("SUCESSO credito adicionado com ");
        console.log("SUCESSO credito adicionado com ")
      //}//,error=>{
        //alert("ERRO ao adicionar o credito");
        //console.log("ERRO ao adicionar o credito")
      });
    this.creditos.push(this.credito);
  }

  selecterdCreditItem(curCredito:Credito){
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
    this.pagamento.createdBay=LoginService.logedUser;
    this.prestacao.credito=this.credito;
    this.pagamento.prestacao=this.prestacao;
    this.payService.makePayment(this.pagamento).subscribe(resp=>{
      console.log("Pagamento efectuado com sucesso");
      alert("SUCESSO no pagamento")

    },error=>{
      alert("ERROR ao fazer carregar o pagamento");
    })
  }

  criarPrestacao(){
    this.prestacao.credito=this.credito;
    console.log(this.prestacao);
    this.prestacaoServ.creatUpdate(this.prestacao).subscribe(response=>{
      this.prestacao=response;
      console.log(response);
    },error=>{
      alert("nao foi possivel ");
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

}
