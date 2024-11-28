import jwt from 'jsonwebtoken'
import 'dotenv/config'


const secretKey = process.env.JWT_SECRET_KEY || ''

export interface dadosViajante {
    email: string;
    viajanteId: number;
}

export class Jwt {

    public static GeraToken(infoViajante: dadosViajante) {
        try {
            if(!infoViajante){
                return { message: 'Ops... Dados do viajante não informados' }
            }
            const token = jwt.sign(
                {viajante: JSON.stringify(infoViajante)},
                secretKey,
                { expiresIn: '7d'}
            )
            return token
        } catch (error) {
            console.error('Error -> ', error)
        }
    }

    public static ValidaToken(token: string) {
        try {
            const infoViajante: any = jwt.verify(token, secretKey)
            
            if(!infoViajante){
                return { message: 'Ops... Dados não encontrados! '}
            }
            return infoViajante
        } catch (error) {
            console.error(error)
        }
    }
}