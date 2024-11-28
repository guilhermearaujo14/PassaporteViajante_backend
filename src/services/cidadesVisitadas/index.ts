import { GetCidadeByCoordenadas } from "../../api/GetCidadeByCoordenadas";
import { GetCoordenadasByNomeCidade } from "../../api/GetCoordenadasByNomeCidade";
import pool from "../../db";

export class CidadesVisitadasService{
    
    public static async CadastraCidade(viajanteId: number, latitude: string, longitude: string, cidadeNome: string, dataVisita: Date){
        const db = await pool.getConnection();
        try {
            
        } catch (error) {
            console.error(error)
        }finally{
            db.release();
        }
    }

    public static GetCidadeCadastradaByNome(){

    }

    public static getCidadesByViajante(){

    }

    public static async PreencheCoordenadasByNomeCidade(cidadeNome: string){
        try {
            const response = await GetCoordenadasByNomeCidade(cidadeNome)
            return response
        } catch (error) {
            console.error(error)
        }
    }

    public static async PreencheNomeCidadeByCoordenadas(lat: string, long: string){
        try {
            const response = await GetCidadeByCoordenadas(lat, long)
            return response
        } catch (error) {
            return error
        }
    }
}