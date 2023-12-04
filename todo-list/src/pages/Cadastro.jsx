import { Container, List } from "@mui/material";
import React, { useState } from "react";
import TodoItem from "../components/TodoItem";
import { InputField, InputArea } from "../components/Input";
import axios from 'axios';

export default function Cadastro() {
   const [getNome, setNome] = useState('');
   const [getSenha, setSenha] = useState('');
   const [getErro, setErro] = useState("");

   const handleSubmit = async (e) => {

      e.preventDefault();

      try {

         if (getNome === "" || getSenha === "") {
            throw new Error("Campos nulos");
         }

         const response = await axios.post('http://localhost:8080/users/signup', {
            username: getNome,
            password: getSenha
         });

         console.log(response);

         setErro("");
      } catch (error) {
         console.error(error);
         setErro("Erro no cadastro. Por favor, tente novamente.");
      } finally {
         setNome("");
         setSenha("");
      }
   };

   return (
      <div className="form" autoComplete="off" onSubmit={handleSubmit}>
         <div className="h1">Cadastro</div>

         <div className="center">
            <span className="error">{getErro}</span>
         </div>

         <div className="row">
            <InputField id="nome" title="Nome" type="text" value={getNome} onChange={setNome} />
         </div>

         <div className="row">
            <InputField id="senha" title="Senha" type="password" value={getSenha} onChange={setSenha} />
         </div>

         <input type="submit" className="btn" value="Criar" onClick={handleSubmit} />
      </div>
   );
}
