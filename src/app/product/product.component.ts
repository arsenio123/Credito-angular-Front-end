import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { Router } from '@angular/router';
import { ProductService } from '../service/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  productos:Producto[]=[];
  producto:Producto=new Producto();
  saveClientBt:string="Adicionar";
  saveProductBt: string="Adicionar";
  constructor(private productoService:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.productoService.getAllProduct().subscribe(resp=>{
      this.productos=resp;
    })
  }

  adicionarProducto(){

    this.productoService.createProducto(this.producto).subscribe(resp=>{
      this.producto=resp;
      
    },error=>{
      alert("erro ao adicionar Producto");
      console.log("ProductComponent/ adicionarProducto");
      console.log(error)
    }
    );
    this.productos.push(this.producto);
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
