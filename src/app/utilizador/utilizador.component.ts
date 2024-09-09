import { Component, OnInit } from '@angular/core';
import { Role } from '../model/role';
import { User } from '../model/user';
import { UserService } from '../service/user-service.service';
import { MessageServiceService } from '../service/message-service.service';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-utilizador',
  templateUrl: './utilizador.component.html',
  styleUrls: ['./utilizador.component.css']
})
export class UtilizadorComponent implements OnInit {

  user:User=new User();
  users:User[]=[];
  showForm:boolean=false;

  currentPassword:string="";
  newPassword:string="";
  confirmPassword:String="";

  constructor(private userService:UserService,
     private messageAlert:MessageServiceService) { }

  ngOnInit(): void {
    if(this.messageAlert.isSessiovalide()==true){
      console.log("pedindo a lista de users")
    this.userService.getUser().subscribe({next:resp=>{
      console.log("[UtilizadorComponent: ngOnInit ]"+resp)
      this.users=resp

    },error:(e)=>{
      this.messageAlert.alertError(e);
    }});
    }
    
  }
  adicionarUtilizadors(){
  }
  selecterdItem(curUser:User){
    this.user=curUser;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  changePassword(){
    if(this.newPassword!=this.confirmPassword){
        this.messageAlert.alertError("Nova Password deve ser igual a password de confirmacao");
    }else{
      this.userService.changePassword(LoginService.logedUser,this.newPassword,this.currentPassword).subscribe(resp=>{
        console.log("change password response: "+resp.toString());  
        this.messageAlert.alertSuccess(resp);
      },
        error=>{
          console.error("erro ao mudar a password: "+error);
          console.error("erro ao mudar a password: "+error.error);
          console.error("erro ao mudar a password: "+error.status);
            this.messageAlert.alertError(error);
        });
    }
    localStorage.getItem("userName")
  }
}
