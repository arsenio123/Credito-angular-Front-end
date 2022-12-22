import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent {
  @Input() nome='introduza aqui a user name';
  @Input() usrId=0;
  password="";
 @Output() onAdicionar= new EventEmitter();
 @Output() onRemover= new EventEmitter();
  adicionar(){
    const funcionario={
      id:this.usrId,
      nome:this.nome,
      password:this.password
    };
    this.onAdicionar.emit(funcionario);
  }

  cleanFildes(input:any){
    console.log(input);
  }

  remover(){
    
    this.onRemover.emit(this.usrId);
  }
  limparCampo(){
    this.nome='';
  }

}
