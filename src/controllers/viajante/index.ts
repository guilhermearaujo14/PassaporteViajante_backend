import { Request, Response } from "express";
import { Viajante } from "../../models/viajante";
import { ViajanteService } from "../../services/viajante";

export class ViajanteController{
    
    public static async Create(req: Request, res: Response){
        const { nome, email, senha, isAtivo, device, cidadeReferencia, telefone, dataNascimento} = req.body;
        try {
            const response = await ViajanteService.Create(nome, email, senha, isAtivo, device, cidadeReferencia, telefone, dataNascimento);
            return res.status(201).send(response)
        } catch (error) {
            res.status(400).send({message: 'Ops... Não foi possível realizar essa operação', erro: error})
        }
    }

    public static async Login(req: Request, res: Response){
        const { email, senha } = req.body;
        try {
            const response = await ViajanteService.Login(email, senha);
            return res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error);
        }
    }


    public static async GetViajanteByTelefone(req: Request, res: Response){
        const { telefone } = req.params;
        try {
            const response = await ViajanteService.GetViajanteByTelefone(telefone)
            return res.status(200).send(response);

        } catch (error) {
            console.error(error)
        }
    }

    public static async GetViajanteByTelefoneAndSenha(req: Request, res: Response){
        try {
            const { telefone, senha } = req.body;
            const result = await ViajanteService.GetViajanteByTelefoneAndSenha(telefone, senha);
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

}