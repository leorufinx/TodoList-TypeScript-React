import { Router } from "express";
import Tarefas from "../controller/Tarefas";
import Users from "../controller/Users";

const router: Router = Router();

const endpoints = {
    Tarefa: "/tarefas",
    User: "/users"
}

router.post(`${endpoints.User}/signup`, Users.postSignup);
router.post(`${endpoints.User}/signin`, Users.postSignin);

router.get(`${endpoints.Tarefa}/status`, Users.verifyToken, Tarefas.status);
router.get(endpoints.Tarefa, Users.verifyToken, Tarefas.get);
router.post(endpoints.Tarefa, Users.verifyToken, Tarefas.post);
router.put(endpoints.Tarefa, Users.verifyToken, Tarefas.put);
router.delete(endpoints.Tarefa, Users.verifyToken, Tarefas.del);

export default router;