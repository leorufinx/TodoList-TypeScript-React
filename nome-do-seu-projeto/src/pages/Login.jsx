import React, { useState } from "react";
import { InputField, InputArea } from "../components/Input";
import { A } from "../components/A";
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

         const response = await axios.post('http://localhost:8080/users/signin', {
            username: getNome,
            password: getSenha
         });

         console.log(response);

         localStorage.setItem("authenticated", "true");
         localStorage.setItem("token", response.data.token_jwt);
         localStorage.setItem("nome", response.data.username);

         setErro("");

         window.location.href = "/home";
      } catch (error) {
         console.error(error);
         setErro("Erro no login. Por favor, tente novamente.");
      } finally {
         setNome("");
         setSenha("");
      }
   };

   return (
      <div className="form" autoComplete="off" onSubmit={handleSubmit}>
         <div className="h1">Login</div>

         <div className="center">
            <span className="error">{getErro}</span>
         </div>

         <div className="row">
            <InputField id="nome" title="Nome" type="text" value={getNome} onChange={setNome} />
         </div>

         <div className="row">
            <InputField id="senha" title="Senha" type="password" value={getSenha} onChange={setSenha} />
         </div>

         <input type="submit" className="btn" value="Entrar" onClick={handleSubmit} />
         <A href="/" target="_self" value="Criar conta" />
      </div>
   );
}