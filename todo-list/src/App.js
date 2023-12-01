import React, { useState } from "react";
import "./styles/App.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
   const [getPage, setPage] = useState("Home");

   const renderPage = () => {
      switch (getPage) {
         case "Home":
            return <Home />;
         case "Login":
            return <Login />;
         default:
            return <Home />;
      }
   };

   return (
      <div>
         <button onClick={() => setPage("Home")}>Ir para Home</button>
         <button onClick={() => setPage("Login")}>Ir para Login</button>

         {renderPage()}
      </div>
   );
}

export default App;
