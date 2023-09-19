export interface ProductoInterface {
    id:number,
    taxa:number,
    capitalMin:number,
    capitalMax:number,
    descricao:string,
    estado:string,
    intervaloPrestacao:number
}

export class Producto implements ProductoInterface{
    id: number=0;
    taxa: number=0;
    capitalMin: number=0;
    capitalMax: number=0;
    descricao: string="";
    estado: string="NORMAL";
    intervaloPrestacao: number=0;
    constructor(){

    }
}
