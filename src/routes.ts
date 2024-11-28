import express, { Request, Response, Router } from 'express'
import UsuarioLogado from './middlewares/login/index'
import { ViajanteController } from './controllers/viajante';
import { CidadesVisitadasController } from './controllers/cidadesVisitadas';


const router = Router();



    router.get('/', (req: Request, res: Response)=>{
        return res.status(200).send({message: 'Acesso a primeira rota de teste.'})
    })

    router.get('/login', UsuarioLogado, (req: Request, res: Response)=>{
        res.status(200).send({message: 'Usuário autorizado para login!'})
    })


    /* VIAJANTE */
    router.post('/login', (req: Request, res: Response) => ViajanteController.Login(req, res));
    router.post('/viajante',(req: Request, res: Response) => ViajanteController.Create(req, res));
    router.get('/viajanteByTelefone/:telefone', (req: Request, res: Response) => ViajanteController.GetViajanteByTelefone(req, res));
    router.post('/viajanteBySenha', (req: Request, res: Response) => ViajanteController.GetViajanteByTelefoneAndSenha(req, res));

    /* CIDADES VISITADAS */ 
    router.get('/pesquisaCidadeByNome/:cidadeNome', (req: Request, res: Response) => CidadesVisitadasController.GetDadosCidade(req, res))
    router.get('/pesquisaCidadeByCoords/:lat/:long', (req: Request, res: Response) => CidadesVisitadasController.GetNomeCidadeByCoords(req, res))


export default router;