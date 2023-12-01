import React, { useState } from "react";
import "./styles/App.scss";
import { Link } from "./components/Link";
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
         <Link href="Home" setPage={setPage} />
         <Link href="Login" setPage={setPage} />

         {renderPage()}
      </div>
   );
}

export default App;
