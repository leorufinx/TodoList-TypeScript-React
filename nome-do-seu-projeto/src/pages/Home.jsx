import React, { useState } from "react";
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
