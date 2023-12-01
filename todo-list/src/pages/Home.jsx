import { Container, List } from "@mui/material";
import React, { useState } from "react";
import TodoItem from "../components/TodoItem";
import { InputField, InputArea } from "../components/Input";

export default function Home() {
   const [getTitulo, setTitulo] = useState('');
   const [getDescricao, setDescricao] = useState('');

   const todoCreate = (titulo, desc) => {



      document.getElementById("titulo").value = "";
      document.getElementById("descricao").value = "";
   };

   return (
      <div className="form">

         <div className="h1">Tarefa</div>

         <div className="row">
            <InputField id="titulo" title="Título" type="text" value={getTitulo} onChange={setTitulo} />
         </div>

         <div className="row">
            <InputArea id="descricao" title="Descrição" type="text" />
         </div>

         <input type="button" className="btn" value="Criar" onClick={() => todoCreate(getTitulo, getDescricao)} />

      </div>
   );
}
