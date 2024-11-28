import axios from "axios"
import { resolveNaptr } from "dns"

export async function GetCidadeByCoordenadas(lat: string, long: string) {
    const baseUrl = process.env.BASE_URL_SEARCH_COORDS
    try {
        const response = await axios.get(`${baseUrl}lat=${lat}&lon=${long}`)
        console.log(response.data)
        if (!response.data) {
            return { message: 'Ops... Cidade não encontrada com os dados informados!' }
        }
        return response.data.address.town
    } catch (error) {
        console.error(error)
    }


}