import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import './App.css';
import * as script from './javascript.js';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const Btn = param => {
  return (
    <img id={param.id} className="btn icon floatR" onClick={script.invertTheme} />
  );
};

const Pessoa = param => {

  const [getGenero, setGenero] = useState(true);
  const [getFala, setFala] = useState("");

  function falar() {
    setFala(document.getElementById("fala").value);
    alert(param.nome + " disse: " + getFala);
  }

  return (
    <div className="formulario">

      <label>Componente Child</label>

      <h2>Oi, eu sou {param.nome} e tenho {param.idade} anos! Sou {getGenero ? 'homem' : 'mulher'}.</h2>

      <h2 className="btn" onClick={() => setGenero(!getGenero)}>Mudar de gênero</h2>

      <label for="fala">Digite algo para eu falar</label>
      <br />
      <input type="text" id="fala" class="formInput" />
      <br />
      <h1 className="btn" onClick={falar}>Falar</h1>

    </div>
  );

};

const Componente2 = () => {

  let titulo = "Tela Principal";

  document.title = titulo;

  async function testeSleep() {

    document.title = titulo;

    for (let i = 1; i <= 1000; i++) {
      await sleep(300);
      document.title = "(" + i + ")" + " " + titulo;
    }
  }

  function mudarTitulo() {
    titulo = document.getElementById("title").value;
    document.title = titulo;
  }

  return (
    <div className="main">

      <div class="sticky">
        <h1 className="btn floatL" onClick={script.modoTerremoto} >Modo Terremoto</h1>
        <Btn id="btnTheme" />
      </div>

      <h1>Componente Parent</h1>
      <h2>Essa página é de teste para testar e aprender React Native e suas belíssimas funções</h2>

      <label for="title">Title da página</label>
      <br />
      <input type="text" id="title" class="formInput" />
      <br />
      <h1 className="btn" onClick={mudarTitulo}>Mudar</h1>
      <h1 className="btn" onClick={testeSleep}>Testar Sleep</h1>

      <Pessoa nome="Pedro" idade="21" />
      <Pessoa nome="Maria" idade="15" />
      <Pessoa nome="Maluco" idade="60" />
    </div>
  );

};

export default Componente2;