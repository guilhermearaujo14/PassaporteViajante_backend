import axios from "axios"
import { unwatchFile } from "fs";
interface dadosCidade{
    lat: string,
    long: string;
}

export async function GetCoordenadasByNomeCidade(cidadeNome: string) {
    const baseUrl = process.env.BASE_URL_SEARCH_NOME

    try {
        const response = await axios.get(`${baseUrl}${cidadeNome}&format=json&addressdetails=1&limit=1&polygon_svg=1`)
        let dadosCidade: dadosCidade = {
            lat: response.data[0].lat,
            long: response.data[0].lon
        }
        return dadosCidade
    } catch (error) {
        console.error(error)
    }
}