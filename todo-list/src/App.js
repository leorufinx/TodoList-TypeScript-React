import React, { useState } from "react";
import "./styles/App.scss";
import { Button, Link } from "./components/Link";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function App() {
   const [getPage, setPage] = useState("Cadastro");

   const renderPage = () => {
      switch (getPage) {
         case "Home":
            return <Home />;
         case "Login":
            return <Login />;
         case "Cadastro":
            return <Cadastro />;
         default:
            return <Cadastro />;
      }
   };

   return (
      <div>

         {getPage !== "Home" && <Button href="Home" setPage={setPage} />}

         {getPage !== "Login" && <Button href="Login" setPage={setPage} />}

         {getPage !== "Cadastro" && <Button href="Cadastro" setPage={setPage} />}

         {renderPage()}
      </div>
   );
}

export default App;
