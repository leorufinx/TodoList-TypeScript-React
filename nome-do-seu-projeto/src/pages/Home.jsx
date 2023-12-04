import React, { useState, useEffect } from "react";
import { InputField, InputArea } from "../components/Input";
import axios from 'axios';

export default function Home() {
   const [getTitulo, setTitulo] = useState("");
   const [getDescricao, setDescricao] = useState("");
   const [getId, setId] = useState(0);

   const [getTodos, setTodos] = useState([]);

   const addTodo = (todo) => {
      setTodos((prevTodos) => {
         if (Array.isArray(prevTodos)) {
            return [...prevTodos, todo];
         } else {
            return [todo];
         }
      });
   };

   const editTodo = (id) => async () => {
      var todosArray = getTodos;

      for (var i in todosArray) {
         if (todosArray[i].id == id) {
            todosArray[i].titulo = "123";
            todosArray[i].descricao = "newDesc";
         }
      }

      setTodos(todosArray);
   };

   const deleteTodo = async (paramId) => {
      alert(paramId);
      const token = localStorage.getItem("token");
      const idUser = localStorage.getItem("id");

      try {
         const response = await axios.delete('http://localhost:8080/tarefas', {
            data: {
               id_tarefa: paramId,
               id_user: idUser
            },
            headers: {
               Authorization: `Bearer ${token}`
            }
         });

         // var filtered = getTodos.filter((todo) => todo.id !== paramId);
         // setTodos(filtered);

         console.log(response);
      } catch (error) {
         console.error(error);
      }
   };

   const renderTodos = () => {
      const todosElements = [];

      for (let i = 0; i < getTodos.length; i++) {
         const todo = getTodos[i];
         todosElements.push(
            <div key={todo.id_tarefa} className="form">
               <h2 className="lbl">Título: {todo.titulo}</h2>
               <h2 className="lbl">Descrição: {todo.descricao}</h2>
               <input type="button" className="btn" value="Editar" onClick={() => editTodo(todo.id_tarefa)} />
               <input type="button" className="btn" value="Deletar" onClick={() => deleteTodo(todo.id_tarefa)} />
            </div>
         );
      }

      return todosElements.length > 0 ? todosElements : <p>Não há tarefas cadastradas.</p>;
   };

   const getTodosFromDB = async () => {
      const token = localStorage.getItem("token");
      const idUser = localStorage.getItem("id");

      try {
         const response = await axios.get('http://localhost:8080/tarefas', {
            params: {
               id: idUser
            },
            headers: {
               Authorization: `Bearer ${token}`
            }
         });

         console.log(response);

         setTodos(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getTodosFromDB();
   }, []);

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
   };

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
            {renderTodos()}
         </div>

      </>
   );
}