import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { Router } from '@angular/router';
import { ProductService } from '../service/product-service.service';
import { MessageServiceService } from '../service/message-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  productos:Producto[]=[];
  curProducto:Producto=new Producto();
  estados:string[]=["PENDENTE","NORMAL","EXPIRADO"];
  producto:Producto=new Producto();
  saveClientBt:string="Adicionar";
  saveProductBt: string="Adicionar";
  constructor(private productoService:ProductService, private router:Router,
    private messageAlert:MessageServiceService) { }

  ngOnInit(): void {
    if(this.messageAlert.isSessiovalide()==true){
      this.productoService.getAllProduct().subscribe(resp=>{
        this.productos=resp;
      })
    }
    
  }

  adicionarProducto(){

    if(this.producto.id==0){
      this.productoService.createProducto(this.producto).subscribe({next:(resp)=>{
        this.producto=resp;
        this.productos.push(this.producto);
        this.ngOnInit();
        this.selectedItem;
        this.producto=this.productos[this.productos.length-1];
        console.log(this.productos[this.productos.length-1]);
        this.messageAlert.alertSuccess("Producto crido com sucesso");
      },error:(e)=>{
        this.messageAlert.alertError(e)
        console.log("ProductComponent/ adicionarProducto");
        console.log(e)
      }
    });
      
    }else{

      this.productoService.actulizarProducto(this.producto).subscribe({next:(resp)=>{
        this.producto=resp;
        this.productos.push(this.producto);
        this.ngOnInit();
        this.messageAlert.alertSuccess("Producto Alterado com sucesso");
      },error:(e)=>{
        this.messageAlert.alertError(e)
        console.log("ProductComponent/ adicionarProducto");
        console.log(e)
      }
    });

    }
    
    
  }

  selectedItem(curProducto:Producto){
    this.producto=curProducto;
    this.curProducto=curProducto;
    this.saveClientBt="Alterar Producto";
  }
  mostrarProducto(productoID:any){
    alert(productoID)
  }

  cancelarProducto(){
    this.saveProductBt="Adicionar";
    this.producto=new Producto();
  }

}
