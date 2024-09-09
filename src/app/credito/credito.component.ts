import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit,  } from '@angular/core';
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
import { Intrest } from '../model/intrest';
import { Capital } from '../model/capital';
import { IntrestSevice } from '../service/Intrest-service.service';
import { CapitalServiceService } from '../service/capital-service.service';
import { MessageServiceService } from '../service/message-service.service';


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
  estados:string[]=["CANCELADO","VIGOR","PENDENTE","VENCIDO"]//deve ser inicilizado por API
  popupDivida:string="display: none;opacity: 1;";
  mainDivStile:string=""  
  recordsForPage:number=50;
  lastCreditId:number=0;
  curIntrest:Intrest=new Intrest();
  curCapital:Capital=new Capital();
  curSaldo:number=0;
  findCreditoByName:string='';
  findCreditoByClientID:number=0
  prestacao_estados:string[]=["EM_VIGOR","EXPIRADO"];
  creditoestado:string="";
  creditoestados:string[]=["VIGOR","PENDENTE","CANCELADO","VENCIDO",""];

  constructor(private creditoAPI:CreditoService,
    private prestacaoServ:PrestacoesService,
    private router:Router,
    private http:HttpClient,
    private clienteService:ClienteRestService,
    private productService:ProductService,
    private payService:PaymentService,
    private intrestService:IntrestSevice,
    private capiralService:CapitalServiceService,
    private messageAlert:MessageServiceService) { }


  ngOnInit(){

    if(this.messageAlert.isSessiovalide()==true){
      this.productService.getProductByStatus("NORMAL").subscribe({next: (resp)=>{
        this.productos=resp;
        console.log("response Productos"+resp);
      },error: (e)=>{
        this.messageAlert.alertError(e);
        //this.messageAlert.alertError(this.dialog.message);
        console.log(e);
      }
    })
      this.productos
    this.consultaCredito("VIGOR");// fazer a passagem dos dados antigos para a nova base de dados
    //this.consultaCredito_old;// TODO remove this line

      console.log(this.creditos);
    }
      
  }


  consultaCredito_old(){

    this.creditoAPI.getAllCredits().subscribe({next:(data)=>{
      this.creditos=data;
      console.log(data);},
      error:(e)=>{
        console.log(e);
        this.messageAlert.alertError(e);
      }
    
  });

    
  }

  filtrarCredit(){
    this.creditoAPI.getCreditByCriteria(this.recordsForPage, this.creditoestado,this.findCreditoByClientID).subscribe({
      next:(resp)=>{
        this.creditos=resp;
      },error:(e)=>{
        this.messageAlert.alertError(e);
      }
  })
  }
  consultaCredito(estado:string){

    console.log("****** consultaCredito[ index is "+this.lastCreditId+", estado:"+estado+", recordsForPage:"+this.recordsForPage+"]");

    this.creditoAPI
    .getCreditsWithPagination(this.recordsForPage,this.lastCreditId,estado)
    .subscribe({next:(resp)=>{
      this.creditos=resp;

      console.log("resposta de consulta de creditos "+resp[1].estado);
     this.lastCreditId=this.creditos[0].id;
     console.log("laste index is "+this.lastCreditId+", estado:"+estado+", recordsForPage:"+this.recordsForPage);
    },error: (e)=>{
      this.messageAlert.alertError(e);
      //this.messageAlert.alertError("erro ao consultar os creditos")
      console.log("consultaCredito com erro");
      console.log(e);
      }
      
    
  });

    
  }

  consultaCreditopageDown(){

    this.creditoAPI
    .getCreditsWithPaginationDown(this.recordsForPage,this.lastCreditId)
    .subscribe({next: (data)=>{
      this.creditos=data;
      console.log(data);
      
     this.lastCreditId=this.creditos[0].id;
     console.log("laste index is "+this.lastCreditId);
    },error: (e)=>{
      this.messageAlert.alertError(e);
      console.log("erro no ")
      alert("");
      }
  });

    
  }

  adicionarCredito(){
    console.log("adicionando um novo credito");
    console.log(LoginService.logedUser);
    this.credito.createdBy=LoginService.logedUser.id;
    this.credito.aprovadoPOr=LoginService.logedUser.id;
      this.credito.createdDate=new Date();
      this.credito.updateDate=this.credito.createdDate;
      if(this.credito.id!=0){
        this.creditoAPI.atualizaCredito(this.credito).subscribe({next :(resp)=>{
          //alert("SUCESSO credito adicionado com ");
          console.log("SUCESSO credito adicionado com ")
          this.creditos.push(this.credito);
          this.messageAlert.alertSuccess(this.dialog.message);
          
        },error:(e)=>{
          console.log(e);
          this.messageAlert.alertError(e);
          console.log("ERRO ao adicionar o credito "+e)
          console.log("ERRO ao adicionar o credito "+e)
        }});
        this.ngOnInit();

      }else{
        //Cria um Credito
        this.creditoAPI.createCredito(this.credito).subscribe({next:(resp)=>{
          //alert("SUCESSO credito adicionado com ");
          console.log("SUCESSO credito adicionado com ")
          this.creditos.push(this.credito);
          this.messageAlert.alertSuccess(this.dialog.message);
        },error: (e)=>{
          console.log(e);
          this.messageAlert.alertError(e);
          console.log("ERRO ao adicionar o credito")
      }});
      }
      
    
  }

  selectedCreditItem(curCredito:Credito){
    console.log("***** curCapital credito"+this.curCapital);

    this.curCapital=new Capital();
    this.curIntrest=new Intrest();
    this.curSaldo=0;
    console.debug();
    this.credito=curCredito;
    this.curCredito=curCredito;
    
    //logs do corrente producto
    console.log("**** "+this.curCredito.producto.descricao);
    this.credito.producto=curCredito.producto;
    
    
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
    this.payService.getPaymentByPrestacao(curPrestacao.id).subscribe({next:(resp)=>{
      this.payments=resp;
      this.makingPay_DIV=true;
      console.log(resp);
    },error:(e)=>{
    this.messageAlert.alertError(e);
    }});
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
    this.curIntrest=new Intrest();
    this.curCapital=new Capital();
    this.curSaldo=0;  
  }
  fazerPagamento(cred_id:number){
    this.popupDivida="";
  }

  findCliente(){
    this.clienteService.findByID(this.credito.cliente.id)
    .subscribe({next:(resp)=>{
      this.credito.cliente=resp;

      if(this.credito.cliente==null){
        this.messageAlert.alertError(`cliente  nao existe`);
      }
    },
    error:(e)=>{
      //alert(`cliente com o id:${this.credito.cliente.id} nao existe`)
      this.messageAlert.alertError(`cliente com o id:${this.credito.cliente.id} nao existe`);
  }})
   
  }

  findClienteByName(){
    this.clienteService.findByName(this.credito.cliente.nome)
    .subscribe({next: (resp)=>{
      this.credito.cliente=resp;
      if(this.credito.cliente==null){
        this.messageAlert.alertError(`cliente nao existe`);
      }
    },
    error:(e)=>{
      this.messageAlert.alertError(e);
  }})
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
    this.pagamento.intrest.credito=this.credito;
    this.pagamento.capital.credito=this.credito;

    console.log("debug value Sector this.curCredito:"+this.curCredito.cliente.setor);
    console.log("debug value Sector this.credito:"+this.credito.cliente.setor);

    //a fachamar o servico de pagamento
    this.payService.makePayment(this.pagamento).subscribe(resp=>{
        this.dialog.message="SUCESSO no pagamento";
        this.dialog.type=Type.SUCESSO;
        this.messageAlert.alertSuccess(this.dialog.message);

    },error=>{
      this.dialog.message="ERROR ao fazer carregar o pagamento";
        this.dialog.type=Type.ERROR;
        console.log(error.message)
        this.messageAlert.alertError(this.dialog.message);
    })
  }

  criarPrestacao(){
    this.prestacao.credito=this.credito;

    this.prestacao.intrest=new Intrest();
    this.prestacao.intrest.credito=this.credito;

    this.prestacao.capital=new Capital();
    this.prestacao.capital.credito=this.credito;

    this.prestacao.id=0;
    console.log("cirando prestacao ");
    console.log(this.prestacao);
    
    this.prestacaoServ.creatUpdate(this.prestacao).subscribe({next :(response)=>{
      this.prestacao=response;
      console.log(response);
      this.dialog.message="SUCESSO na criacao/atulizacao da prestacao";
        this.dialog.type=Type.SUCESSO;
        this.messageAlert.alertSuccess(this.dialog.message);
        this.selectedCreditItem(this.curCredito);
    },error:(e)=>{
      this.dialog.message="ERRO na criacao/atulizacao da prestacao";
        this.dialog.type=Type.ERROR;
        this.messageAlert.alertError(this.dialog.message);
      console.log(e);
  }});
    
  }

  limparPrestacao(){
    this.curPrestacao=new Prestacao();
   this.prestacao=new Prestacao();
  }

  switchVisibilitePrestacaoForm () {
    return this.divFormPrestacao=!this.divFormPrestacao;
  }


  refreshIntressAndCapital(curCredito:Credito){
    this.curSaldo=0;
    this.intrestService.getIntrest(curCredito).subscribe({next:(resp)=>{
      this.curIntrest=resp;
      
      if(this.curIntrest==null){
        this.curIntrest=new Intrest();
        this.curIntrest.credito=this.curCredito
      }else{
        this.curSaldo=this.curSaldo+this.curIntrest.valor;
      }
    },error:(e)=>{
      this.messageAlert.alertError(e);
    }});
    this.capiralService.getCapital(curCredito).subscribe({next:(resp)=>{
      this.curCapital=resp;
      if(resp==null){
        this.curCapital=new Capital();
      }
      this.curSaldo=this.curSaldo+this.curCapital.valor;
    },error:(e)=>{
      this.messageAlert.alertError(e);
    }});
  }

  findCreditByClient(){
    this.creditoAPI.getCreditoByClienteID(this.findCreditoByClientID)
    .subscribe({next: (resp)=>{
      this.creditos=resp;

      if(this.creditos==null){
        this.messageAlert.alertError(`cliente  nao existe`);
      }
    },
    error:(e)=>{
      //alert(`cliente com o id:${this.credito.cliente.id} nao existe`)
      //this.messageAlert.alertError(`creditos para o cliente com o id:${this.findCreditoByClientID} nao existe`);
      this.messageAlert.alertError(e);
      console.error(e);
    }}
    );

  }

}
