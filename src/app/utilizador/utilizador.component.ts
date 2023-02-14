import { Component, OnInit } from '@angular/core';
import { Role } from '../model/role';
import { User } from '../model/user';
import { UserService } from '../service/user-service.service';

@Component({
  selector: 'app-utilizador',
  templateUrl: './utilizador.component.html',
  styleUrls: ['./utilizador.component.css']
})
export class UtilizadorComponent implements OnInit {

  user:User=new User();
  users:User[]=[];

  constructor(private userService:UserService ) { }

  ngOnInit(): void {
    console.log("pedindo a lista de users")
    this.userService.getUser().subscribe(resp=>{
      console.log("[UtilizadorComponent: ngOnInit ]"+resp)
      this.users=resp

    });
  }
  adicionarUtilizadors(){
  }
  selecterdItem(curUser:User){
    this.user=curUser;
  }
}
