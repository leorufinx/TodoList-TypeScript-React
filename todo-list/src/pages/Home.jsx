import { Container, List } from "@mui/material";
import React, { useState } from "react";
import TodoItem from "../components/TodoItem";
import { InputField, InputArea } from "../components/Input";

export default function Home() {
   const [getTitulo, setTitulo] = useState("");
   const [getDescricao, setDescricao] = useState("");

   const todoCreate = () => {

      console.log(getTitulo + "\n" + getDescricao);

      setTitulo("");
      setDescricao("");
   };

   const logout = () => {
      localStorage.setItem("authenticated", "false");
      localStorage.setItem("name", null);
      localStorage.setItem("password", null);
   };

   return (
      <>
         <input type="button" className="btn" value="Sair" onClick={() => logout} />

         <div className="form">

            <div className="h1">Tarefa</div>

            <div className="row">
               <InputField id="titulo" title="Título" type="text" value={getTitulo} onChange={setTitulo} />
            </div>

            <div className="row">
               <InputArea id="descricao" title="Descrição" type="text" value={getDescricao} onChange={setDescricao} />
            </div>

            <input type="button" className="btn" value="Criar" onClick={todoCreate} />

         </div>
      </>
   );
}
