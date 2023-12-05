import React, { useState } from "react";
import "./styles/App.scss";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { Routes, Route } from 'react-router-dom';

export default function App() {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Cadastro />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
         </Routes>

         <Footer />
      </div>

   );
}