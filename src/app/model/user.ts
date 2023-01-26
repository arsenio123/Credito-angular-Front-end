import { Role } from "./role";

export interface UserInterface {
    id:number;
    name:string;
    senha:string;
    roles:Role[];
    
}

export class User implements UserInterface{
    id: number=0;
    name: string="";
    senha: string="";
    roles: Role[]=[];
    constructor (){
    }
}

