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


@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent
 implements OnInit
  {
  makingPay_DIV:boolean=false;
  usrId:string="";
  saveCreditoBt:string="Adcionar Credito";
  
  payments:Payment[]=[];
  creditos:Credito[]=[];
  prestacoes:Prestacao[]=[];
  productos:Producto[]=[];
  pagamento:Payment=new Payment();
  prestacao:Prestacao=new Prestacao();
  credito:Credito=new Credito();
  estados:string[]=["CANCELADO","VIGOR"]//deve ser inicilizado por API
  popupDivida:string="display: none;opacity: 1;";
  mainDivStile:string=""  
  
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


  consultaCredito(){

    this.creditoAPI.getAllCredits().subscribe(data=>{
      this.creditos=data;
      console.log(data);}
    
    );

    
  }
  adicionarCredito(){
    console.log("adicionando um novo credito");
      this.credito.createdDate=new Date();
      this.credito.updateDate=this.credito.createdDate;
      this.creditoAPI.createCredito(this.credito).subscribe(resp=>{
        alert("SUCESSO credito adicionado com ");
        console.log("SUCESSO credito adicionado com ")
      },error=>{
        alert("ERRO ao adicionar o credito");
        console.log("ERRO ao adicionar o credito")
      });
    this.creditos.push(this.credito);
  }

  selecterdItem(curCredito:Credito){
    console.debug();
    this.credito=curCredito;
    this.prestacoes=[];
    this.saveCreditoBt="Editar Credito";

    this.prestacaoServ.getPrestacaoFromCredito(this.credito.id)
    .subscribe(resp=>{
      this.prestacoes=resp;
    });
  }
  selectedPrestacao(curPrestacao:Prestacao){
    this.payService.getPaymentByPrestacao(curPrestacao.id).subscribe(resp=>{
      this.payments=resp;
      this.makingPay_DIV=true
    });
  }
  cancelarCredito(){
    this.credito=new Credito();
    this.saveCreditoBt="Adcionar Credito";
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

  limparPagamento(){
    this.pagamento=new Payment();
  }
  pagar(){
    this.payService.makePayment(this.pagamento).subscribe(resp=>{
      console.log("Pagamento efectuado com sucesso");
      alert("SUCESSO no pagamento")

    },error=>{
      alert("ERROR ao fazer carregar o pagamento");
    })
  }

}
