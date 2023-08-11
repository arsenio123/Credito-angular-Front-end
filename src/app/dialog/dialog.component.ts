import { Component, Input, OnInit } from '@angular/core';
import { Dialog } from '../model/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  @Input('dialog') public dialog:Dialog=new Dialog();

  constructor() { 
  }

  ngOnInit(): void {
  }
  
 
 

}
