import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FuncionarioCardComponent } from './funcionario-card/funcionario-card.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { HeaderComponent } from './header/header.component';
import { CreditoComponent } from './credito/credito.component';
import { LoginService } from './service/login.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { UtilizadorComponent } from './utilizador/utilizador.component';
import { DialogComponent } from './dialog/dialog.component';
//import { JwtHelperService } from '@auth0/angular-jwt';

const routes: Routes=[{ path:'credito',component:CreditoComponent},
{path:'login',component:LogInComponent},
{path:'funcionaria-card',component:FuncionarioCardComponent},
{path:'funcionaio-form',component:FuncionarioFormComponent},
{path:'cliente',component:ClienteComponent},
{path:'Utilizador',component:UtilizadorComponent}];


@NgModule({
  declarations: [
    AppComponent, FuncionarioCardComponent, FuncionarioFormComponent,
     HeaderComponent, CreditoComponent,
     LogInComponent, ClienteComponent, UtilizadorComponent, DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
