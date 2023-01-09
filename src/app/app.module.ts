import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FuncionarioCardComponent } from './funcionario-card/funcionario-card.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { HeaderComponent } from './header/header.component';
import { CreditoComponent } from './credito/credito.component';
import { CriarCreditoComponent } from './criar-credito/criar-credito.component';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
//import { JwtHelperService } from '@auth0/angular-jwt';

const routes: Routes=[{ path:'credito',component:CreditoComponent},
{path:'login',component:LogInComponent},
{path:'funcionaria-card',component:FuncionarioCardComponent},
{path:'funcionaio-form',component:FuncionarioFormComponent},
{path:'cliente',component:ClienteComponent}];


@NgModule({
  declarations: [
    AppComponent, FuncionarioCardComponent, FuncionarioFormComponent, HeaderComponent, CreditoComponent, CriarCreditoComponent,LogInComponent, ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    //RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
