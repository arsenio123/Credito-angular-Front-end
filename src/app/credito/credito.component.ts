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
  estados:string[]=["CANCELADO","VIGOR"]//deve ser inicilizado por API
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
      this.productService.getProductByStatus("NORMAL").subscribe(resp=>{
        this.productos=resp;
        console.log("response Productos"+resp);
      },error=>{
        this.messageAlert.alertError(error);
        //this.messageAlert.alertError(this.dialog.message);
        console.log(error);
      })
      this.productos
    this.consultaCredito();// fazer a passagem dos dados antigos para a nova base de dados
    //this.consultaCredito_old;// TODO remove this line

      console.log(this.creditos);
    }
     
      
  }


  consultaCredito_old(){

    this.creditoAPI.getAllCredits().subscribe(data=>{
      this.creditos=data;
      console.log(data);},
      error=>{
        console.log(error);
        this.messageAlert.alertError(error);
      }
    
    );

    
  }

  filtrarCredit(){
    this.creditoAPI.getCreditByCriteria(this.recordsForPage, this.creditoestado,this.findCreditoByClientID).subscribe(
      resp=>{
        this.creditos=resp;
      },error=>{
        this.messageAlert.alertError(error);
      }
    )
  }
  consultaCredito(){

    this.creditoAPI
    .getCreditsWithPagination(this.recordsForPage,this.lastCreditId,this.creditoestado)
    .subscribe(resp=>{
      this.creditos=resp;
      console.log("resposta de consulta de creditos "+resp);
     this.lastCreditId=this.creditos[0].id;
     console.log("laste index is "+this.lastCreditId);
    },error=>{
      this.messageAlert.alertError(error);
      //this.messageAlert.alertError("erro ao consultar os creditos")
      console.log("consultaCredito com erro");
      console.log(error);
      }
      
    
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
    },error=>{
      this.messageAlert.alertError(error);
      console.log("erro no ")
      alert("");
      }
    );

    
  }

  adicionarCredito(){
    console.log("adicionando um novo credito");
    console.log(LoginService.logedUser);
    this.credito.createdBy=LoginService.logedUser.id;
    this.credito.aprovadoPOr=LoginService.logedUser.id;
      this.credito.createdDate=new Date();
      this.credito.updateDate=this.credito.createdDate;
      if(this.credito.id!=0){
        //Atualiza o Credito
        this.credito.estado="PENDENTE";
        this.creditoAPI.atualizaCredito(this.credito).subscribe(resp=>{
          //alert("SUCESSO credito adicionado com ");
          console.log("SUCESSO credito adicionado com ")
          this.creditos.push(this.credito);
          this.messageAlert.alertSuccess(this.dialog.message);
          
        },error=>{
          console.log(error);
          this.messageAlert.alertError(error);
          console.log("ERRO ao adicionar o credito "+error)
          console.log("ERRO ao adicionar o credito "+error)
        });
        this.ngOnInit();

      }else{
        //Cria um Credito
        this.creditoAPI.createCredito(this.credito).subscribe(resp=>{
          //alert("SUCESSO credito adicionado com ");
          console.log("SUCESSO credito adicionado com ")
          this.creditos.push(this.credito);
          this.messageAlert.alertSuccess(this.dialog.message);
        },error=>{
          console.log(error);
          this.messageAlert.alertError(error);
          console.log("ERRO ao adicionar o credito")
        });
      }
      
    
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
      this.credito.cliente=resp;

      if(this.credito.cliente==null){
        this.messageAlert.alertError(`cliente  nao existe`);
      }
    },
    error=>{
      //alert(`cliente com o id:${this.credito.cliente.id} nao existe`)
      this.messageAlert.alertError(`cliente com o id:${this.credito.cliente.id} nao existe`);
    })
   
  }

  findClienteByName(){
    this.clienteService.findByName(this.credito.cliente.nome)
    .subscribe(resp=>{
      this.credito.cliente=resp;
      if(this.credito.cliente==null){
        this.messageAlert.alertError(`cliente nao existe`);
      }
    },
    error=>{
      //alert(`cliente com o id:${this.credito.cliente.id} nao existe`)
      this.messageAlert.alertError(`cliente com o id:${this.credito.cliente.id} nao existe`);
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
    
    this.prestacaoServ.creatUpdate(this.prestacao).subscribe(response=>{
      this.prestacao=response;
      console.log(response);
      this.dialog.message="SUCESSO na criacao/atulizacao da prestacao";
        this.dialog.type=Type.SUCESSO;
        this.messageAlert.alertSuccess(this.dialog.message);
        this.selectedCreditItem(this.curCredito);
    },error=>{
      this.dialog.message="ERRO na criacao/atulizacao da prestacao";
        this.dialog.type=Type.ERROR;
        this.messageAlert.alertError(this.dialog.message);
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


  refreshIntressAndCapital(curCredito:Credito){
    this.curSaldo=0;
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

  findCreditByClient(){
    this.creditoAPI.getCreditoByClienteID(this.findCreditoByClientID)
    .subscribe(resp=>{
      this.creditos=resp;

      if(this.creditos==null){
        this.messageAlert.alertError(`cliente  nao existe`);
      }
    },
    error=>{
      //alert(`cliente com o id:${this.credito.cliente.id} nao existe`)
      //this.messageAlert.alertError(`creditos para o cliente com o id:${this.findCreditoByClientID} nao existe`);
      this.messageAlert.alertError(error);
      console.error(error);
    }
    );

  }

}
