export interface RoleInterface {
      id:number,
      description:string,
      name:string
}

export class Role implements RoleInterface{
    id: number=0;
    description: string="sem Role";
    name: string="";
    constructor(){ 
        this.id=0;
        this.description="";
        this.name="";
    };

}
