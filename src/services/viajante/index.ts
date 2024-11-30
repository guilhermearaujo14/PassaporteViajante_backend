import { Viajante } from "../../models/viajante";
import pool from "../../db";
import bcrypt from "bcrypt"
import { Jwt } from "../../utils/jwt";
import { dadosViajante } from '../../utils/jwt/index';
import { RowDataPacket } from "mysql2";



export class ViajanteService {

    
    public static async Create(nome: string, email: string, senha: string, isAtivo: boolean, device: string, cidadeReferencia: string, telefone: string, dataNascimento: Date)  {
        const db = await pool.getConnection();
        try {

            const novoViajante: Viajante = new Viajante(nome, email, senha, isAtivo, device, new Date(),telefone, 0, cidadeReferencia, dataNascimento);
            const isExisteUsuario = await this.GetByEmail(email);

            const senhaCriptografada = bcrypt.hashSync(senha, 10)
            console.log(isExisteUsuario)
            if (!isExisteUsuario) {
                const response = await db.query(`INSERT INTO viajantes (nome, email, telefone, senha, isAtivo, device, cidadeReferencia, dataNascimento) values (?,?,?,?,?,?,?,?)`,
                    [novoViajante.nome, novoViajante.email, novoViajante.telefone, senhaCriptografada, novoViajante.isAtivo, novoViajante.device, novoViajante.cidadeReferencia, novoViajante.dataNascimento]);
                return { message: 'Cadastro realizado com sucesso!' }
            }else{
                const updateResponse = await db.query(`UPDATE viajantes SET nome = ?, email = ?, senha = ?, isAtivo = ?, device = ?, cidadeReferencia = ?, dataNascimento = ? WHERE email = ?`, 
                    [novoViajante.nome, novoViajante.email, senhaCriptografada, novoViajante.isAtivo, novoViajante.device, novoViajante.cidadeReferencia, novoViajante.dataNascimento, novoViajante.email]);
                
                    return { messate: 'Viajante atualizado com sucesso!'}
            }
            return { message: 'Ops... Não foi possível cadastrar, pois já existe um usuário usando esse email!'}

        } catch (error) {
            return { message: 'Erro -> ', error }
        }
        finally {
            db.release();
        }
    }

    public static async GetByEmail(email: string) {
        const db = await pool.getConnection();
        try {
            const [result] = await db.query(`SELECT * FROM viajantes WHERE email = ?`, [email]);
            const isExisteUsuario = result ? true : false;
            console.log(result)

            return isExisteUsuario

        } catch (error) {
            return { message: 'Erro -> ', error }
        }
        finally {
            db.release();
        }
    }

    public static async GetViajanteByTelefone(telefone: string){
        const db = await pool.getConnection();
        try {
            const sql = `SELECT nome, email, telefone FROM viajantes WHERE telefone = ${telefone}`;
            const result = await db.query(sql);
            return result[0];

        } catch (error) {
            console.error(error)
        }finally{
            db.release()
        }
    }

    public static async GetViajanteByTelefoneAndSenha(telefone: string, senhaCriptografada: string){
        const db = await pool.getConnection();
        try {
            const sql = `SELECT * FROM viajantes WHERE telefone = ?`;
            const [viajanteResult] = await db.query<RowDataPacket[]>(sql,[telefone]);
            const viajante = viajanteResult[0];
            const isSenhasIguais = await bcrypt.compare(senhaCriptografada, viajanteResult[0].senha)
            if(isSenhasIguais){
                return viajante;
            }else{
                return { message: 'Ops... Verifique a senha informada!'}
            }

        } catch (error) {
            console.error(error)
        }finally{
            db.release();
        }
    }

    public static async GetViajanteByEmail(email: string){
        const db = await pool.getConnection();
        try {
            const [viajante]: any = await db.query(`SELECT * FROM viajantes WHERE email = ?`, [email]);
            return viajante;
        } catch (error) {
            console.log(error);
        }finally{
            db.release();
        }
    }

    public static async Login(email: string, senha: string){
        const db = await pool.getConnection();
        try {
            if(!email || !senha){
                return { message: 'Ops.. Email ou senha não preenchidos, verifique!'};
            }

            const viajanteByEmail = await this.GetViajanteByEmail(email)
            if(!viajanteByEmail){
                return { message: 'Ops.. Usuário não encontrado com o email fornecido.'}
            }
    
            const isSenhasIguais = await bcrypt.compare(senha, viajanteByEmail[0].senha)
            
            if(!isSenhasIguais){
                return { message: 'Ops... A senha esta incorreta, verifique!'}
            }

            let infoViajante: dadosViajante
            infoViajante = {email: email, viajanteId: viajanteByEmail[0].id}

            const token = Jwt.GeraToken(infoViajante)
            return { message: 'Login pode ser realizado.', token: token}

        } catch (error) {
            console.log('Error: -> ', error)
            return { message: 'Ops... Não foi possivel realizar o login ->', error};

        }finally{
            db.release();
        }

    }


}