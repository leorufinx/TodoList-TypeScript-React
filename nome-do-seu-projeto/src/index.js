import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

ReactDOM.render(
   (
      <Router>
         <App>
            <Switch>
               <Route exact path="/" component={Cadastro} />
               <Route path="/login" component={Login} />
               <Route path="/home" component={Home} />
            </Switch>
         </App>
      </Router>
   ),
   document.getElementById('root')
);