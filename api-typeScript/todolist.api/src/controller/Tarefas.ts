import Database from "../dto/Database";
import { Request, Response } from "express";

async function getIdUserFromToken(token: string): Promise<number | null> {
   const result = await Database.query(`SELECT id_user FROM tb_user WHERE token_jwt = ?;`, [token]);

   return result[0].id_user;
}

async function status(req: Request, res: Response): Promise<void> {
   let rs = undefined;
   try {
      rs = await Database.query(`select 1+1 as teste;`);
      if (rs !== undefined) {
         res.send({
            banco: 'ok',
            server: 'ok'
         });
      }
   } catch (err) {
      if (rs === undefined) {
         res.status(400).json({
            server: "ok ",
            banco: err
         });
      }
   }
}

async function get(req: Request, res: Response): Promise<void> {
   try {
      const titulo = req.query.titulo ? req.query.titulo : undefined;
      const token_jwt = req.header('Authorization').replace("Bearer ", "");
      const userId = await getIdUserFromToken(token_jwt);

      if (titulo === undefined) {
         const rs = await Database.query(`call get_tarefa_by_user_id(?);`, [userId]);
         res.send(rs[0]);
      } else {
         const rs = await Database.query(`call get_tarefa_by_titulo(?,?);`, [titulo, userId]);
         res.send(rs[0]);
      }
   } catch (err) {
      res.send(err)
   }
}

async function post(req: Request, res: Response): Promise<void> {
   try {
      const body = req.body;
      const token_jwt = req.header('Authorization').replace("Bearer ", "");
      const userId = await getIdUserFromToken(token_jwt);

      await Database.query(`call post_tarefa(?,?,?);`, [userId, body.titulo, body.descricao]);

      body["post_success"] = true;

      res.send(body);
   } catch (err) {
      console.log(err);
      res.send(err)
   }
}

async function put(req: Request, res: Response): Promise<void> {
   try {
      const body = req.body;
      const token_jwt = req.header('Authorization').replace("Bearer ", "");
      const userId = await getIdUserFromToken(token_jwt);

      await Database.query(`call put_tarefa(?,?,?,?);`, [userId, body.id_tarefa, body.titulo, body.descricao]);
      body["update_success"] = true;
      res.send(body);
   } catch (err) {
      res.send(err)
   }
}

async function del(req: Request, res: Response): Promise<void> {
   try {
      const body = req.body;
      const token_jwt = req.header('Authorization').replace("Bearer ", "");
      const userId = await getIdUserFromToken(token_jwt);

      await Database.query(`call delete_tarefa(?,?);`, [body.id_tarefa, userId]);

      body["delete_success"] = true;
      res.send(body);
   } catch (err) {
      res.send(err)
   }
}

export default {
   get: get,
   post: post,
   put: put,
   del: del,
   status: status
}