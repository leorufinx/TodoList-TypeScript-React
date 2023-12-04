import React, { useState } from "react";
import { InputField, InputArea } from "../components/Input";
import axios from 'axios';

export default function Home() {
   const [getTitulo, setTitulo] = useState("");
   const [getDescricao, setDescricao] = useState("");

   const [getTodos, setTodos] = useState([]);
   const [getId, setId] = useState(0);

   const addTodo = (todo) => {
      setTodos([...getTodos, todo]);
   };

   const todoCreate = async () => {
      const token = localStorage.getItem("token");

      try {
         const response = await axios.post('http://localhost:8080/tarefas', {
            titulo: getTitulo,
            descricao: getDescricao
         }, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });

         const todoObj = { id: getId, titulo: getTitulo, descricao: getDescricao };
         setId(getId + 1);
         addTodo(todoObj);

         console.log(response);
      } catch (error) {
         console.error("Erro ao criar todo:", error);
      }

      setTitulo("");
      setDescricao("");
   };

   const logout = () => {
      localStorage.setItem("authenticated", "false");
      localStorage.setItem("token", null);
      localStorage.setItem("nome", null);

      window.location.href = "/";
   };

   if (localStorage.getItem("authenticated") === "false") {
      window.location.href = "/";
      return null;
   }

   return (
      <>

         <h2 className="h2">Logado como <strong>{localStorage.getItem("nome")}</strong></h2>
         <a className="link" onClick={logout}>Sair</a>

         <div className="form">

            <div className="h1">Criar Tarefa</div>

            <div className="row">
               <InputField id="titulo" title="Título" type="text" value={getTitulo} onChange={setTitulo} />
            </div>

            <div className="row">
               <InputArea id="descricao" title="Descrição" type="text" value={getDescricao} onChange={setDescricao} />
            </div>

            <input type="button" className="btn" value="Criar" onClick={todoCreate} />

         </div>

         <div className="form">

            <h2 className="h1">Tarefas Cadastradas</h2>

            {getTodos.map((todo) => (

               <div id={todo.id} className="form">
                  <h2 className="lbl">Título: {todo.titulo}</h2>
                  <h2 className="lbl">Descrição: {todo.descricao}</h2>
               </div>

            ))}

         </div>
      </>
   );
}
