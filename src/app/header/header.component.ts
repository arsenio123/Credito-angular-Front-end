import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { timeStamp } from 'console';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  routs:string[]=["/home","/credito"];
  creditmenuItemVisibilit:String='none';
  utilizador:String="";
  utilizadorMenuVizible:string='none'
  ulizadorHeadColor:string='aqua';
  creditoHeadColor:string='aqua';
  menuColorBackgroud:string='aquamarine';
  headerMenuStyle:any={diplay:'none'};
  showMenu:boolean=true;

  constructor(private activeRoute: ActivatedRoute, private route:Router){};

  ngOnInit(): void {
  this.activeRoute.queryParams.subscribe(params=>{
  });
  }

  showMenuItem(){
    //console.log('showMenuItem called ');
  }

  showCreditoItem(){
    this.creditmenuItemVisibilit="";
    this.creditoHeadColor="aquamarine"
  }
  hiddeCreditoItem(){
    this.creditmenuItemVisibilit="none"
    this.creditoHeadColor="aqua";
  }

  showUtilizadorItem(){
    this.utilizadorMenuVizible="";
    this.ulizadorHeadColor="aquamarine";
  }
  hiddeUtilizadorItem(){
    this.utilizadorMenuVizible="none"
    this.ulizadorHeadColor="aqua";
  }

  colapesAndShow(){
    if(this.showMenu){
      this.headerMenuStyle={display: 'grid'};
    }
    else{
      this.headerMenuStyle={}
    };
    this.showMenu=!this.showMenu;
  }
  
  logOff(){
    localStorage.removeItem("token");
    this.route.navigate(["/login"])
  }

  }
