export interface ClienteInterface {
    id:number,
    nome:string
    ,dataNascimento:Date
    ,rendimento:number
    ,morada:string
    ,telefone:string
    ,email:string
    ,idDoc:string
    ,numberDoc:string
    ,setor:string
    ,profissao:string
    ,empresa:string
}

export class Cliente implements ClienteInterface{
    id: number=0;
    nome: string="";
    dataNascimento: Date=new Date();
    rendimento: number=0;
    morada: string="";
    telefone: string="";
    email: string="";
    idDoc: string="";
    numberDoc: string="";
    profissao: string="";
    setor: string="";
    empresa: string="";
    constructor(){

    };
    
}
