import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Database from '../dto/Database';
import "dotenv/config"

interface User {
   id_user: number;
   username: string;
   hash_password: string;
}

async function postSignup(req: Request, res: Response): Promise<void> {
   try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = jwt.sign({ username }, process.env.SECRET_JWT, { expiresIn: '1h' });
      await Database.query('call post_user(?, ?, ?)', [username, hashedPassword, token]);
      const userCreated = await Database.query('select id_user, username, token_jwt from tb_user where username = ?', [username]);
      const createdUser = userCreated[0];
      res.status(201).json(createdUser);

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao criar usuário.' });
   }
}

async function postSignin(req: Request, res: Response): Promise<void> {
   try {
      const { username, password } = req.body;
      const user = await getUserByUsername(username);

      if (!user) {
         res.status(401).json({ error: 'Credenciais inválidas.' });
         return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.hash_password);

      if (isPasswordValid) {
         const token = jwt.sign({ username }, process.env.SECRET_JWT, { expiresIn: '1h' });
         await Database.query('update tb_user set token_jwt = ? where id_user = ?;', [token, user.id_user]);
         res.status(200).json({
            id_user: user.id_user,
            username: user.username,
            token_jwt: token,
         });
      } else {
         res.status(401).json({ error: 'Credenciais inválidas.' });
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao fazer login.' });
   }
}

async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
   try {
      const token = req.header('Authorization').replace("Bearer ", "");

      if (!token) {
         res.status(401).json({ error: 'Token não fornecido' });
      }

      const decoded = jwt.verify(token, process.env.SECRET_JWT) as { username: string };
      const username = decoded.username;
      const user = await getUserByUsername(username);

      if (!user) {
         res.status(401).json({ error: 'Usuário não encontrado' });
      }

      req["user"] = user;
      console.log(user);
      next();
   } catch (error) {
      console.log(error);
      if (error instanceof jwt.JsonWebTokenError) {
         res.status(401).json({ error: 'Token inválido' });
      }

      if (error instanceof jwt.TokenExpiredError) {
         res.status(401).json({ error: 'Token expirado' });
      }
      res.status(403).json({ error: 'Falha na autenticação do token' });
   }
}

async function getUserByUsername(username: string): Promise<User | null> {
   try {
      const queryUser: any = await Database.query('call get_user_by_name(?);', [username]);
      return queryUser[0][0] || null;
   } catch (err) {
      throw err;
   }
}

export default {
   verifyToken,
   postSignup,
   postSignin,
};
