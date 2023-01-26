export interface RoleInterface {
      id:number,
      descricao:string
}

export class Role implements RoleInterface{
    id: number=0;
    descricao: string="sem Role";
    constructor(){ };

}
