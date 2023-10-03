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
      this.productoService.createProducto(this.producto).subscribe(resp=>{
        this.producto=resp;
        this.productos.push(this.producto);
        this.ngOnInit();
      },error=>{
        this.messageAlert.alertError(error)
        console.log("ProductComponent/ adicionarProducto");
        console.log(error)
      }
      );
      
    }else{

      this.productoService.actulizarProducto(this.producto).subscribe(resp=>{
        this.producto=resp;
        this.productos.push(this.producto);
        this.ngOnInit();
      },error=>{
        this.messageAlert.alertError(error)
        console.log("ProductComponent/ adicionarProducto");
        console.log(error)
      }
      );

    }
    
    
  }

  selectedItem(curProducto:Producto){
    this.producto=curProducto;
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
