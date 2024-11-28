
export class Viajante{
    public nome: string;
    public email: string;
    public telefone: string;
    public senha: string;
    public isAtivo: boolean;
    public device: string;
    public dataInclusao: Date;
    public id?: number;
    public cidadeReferencia?: string;

    constructor (nome: string, email: string, senha: string, isAtivo: boolean, device: string, dataInclusao: Date, telefone: string , id?: number, cidadeReferencia?: string){
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.isAtivo = isAtivo;
        this.device = device;
        this.dataInclusao = dataInclusao;
        this.id = id;
        this.cidadeReferencia = cidadeReferencia;
        this.telefone = telefone;
    }
}

