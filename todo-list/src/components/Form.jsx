import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Form({ addTodo }) {
   const [text, setText] = useState(null);
   const [id, setId] = useState(0);

   const todoCreate = (text) => {
      const todoObj = { text: text, id: id };
      setId(id + 1);
      addTodo(todoObj);
      document.getElementById("outlined-basic").value = null;
   };

   return (
      <div className="form">
         <div className="h1">Tarefa</div>
         <div style={{ display: "inline-block", justifyContent: "center" }}>

            <label htmlFor="titulo" className="lbl">Título</label>
            <input id="titulo" type="text" className="formInput" />

            <label htmlFor="descricao" className="lbl">Descrição</label>
            <input id="descricao" type="text" className="formInput" />

            <label htmlFor="texto" className="lbl">Texto</label>
            <input id="texto" type="text" className="formInput" />

            <Button variant="text" onClick={() => todoCreate(text)}>
               Criar
            </Button>
         </div>
      </div>
   );
}
