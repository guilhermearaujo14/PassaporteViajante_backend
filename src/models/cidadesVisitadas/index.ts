
export class CidadesVisitadas{
    public viajanteId: number;
    public latitude: number;
    public longitude: number;
    public dataInclusao: Date;
    public id?: number
    public dataVisita?: Date;
    public cidadeNome?: string;

    constructor(viajanteId: number, latitude: number, longitude: number, dataInclusao: Date, id?: number, dataVisita?: Date, cidadeNome?: string){
        this.viajanteId = viajanteId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dataInclusao = dataInclusao;
        this.id = id;
        this.dataVisita = dataVisita;
        this.cidadeNome = cidadeNome
    }
}