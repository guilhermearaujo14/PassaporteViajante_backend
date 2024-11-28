import { Request, Response } from "express";
import { CidadesVisitadasService } from "../../services/cidadesVisitadas";
import { ValidaCoordendasPreenchidas } from "../../utils/CidadesVisitadas/ValidaCoordenadasPreenchidas";


export class CidadesVisitadasController {

    public static async GetDadosCidade(req: Request, res: Response) {
        const { cidadeNome } = req.params
        try {
            const response = await CidadesVisitadasService.PreencheCoordenadasByNomeCidade(cidadeNome)
            return res.status(200).send(response)
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    public static async GetNomeCidadeByCoords(req: Request, res: Response) {
        const { lat, long } = req.params;

        try {
            const coordenadasPreenchidas = ValidaCoordendasPreenchidas(lat, long)
            if (coordenadasPreenchidas.isSucesso) {
                const response = await CidadesVisitadasService.PreencheNomeCidadeByCoordenadas(lat, long)
                return res.status(200).send(response)
            }
            return res.status(404).send(coordenadasPreenchidas.message)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}