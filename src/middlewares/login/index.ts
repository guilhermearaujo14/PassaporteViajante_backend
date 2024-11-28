import { NextFunction, Request, Response } from "express";

function UsuarioLogado(req: Request, res: Response, next: NextFunction){
    
    try {

        next()
    } catch (error) {
        res.status(401).send({message: error})
    }


}

export default UsuarioLogado