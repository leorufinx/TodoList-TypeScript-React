import { Container, List } from "@mui/material";
import React, { useState } from "react";
import Form from "../components/Form";
import TodoItem from "../components/TodoItem";

export default function Login() {
   const [todos, setTodos] = useState([]);
   const addTodo = (todo) => {
      setTodos([...todos, todo]);
   };

   const deleteTodo = (id) => {
      var filtered = todos.filter((todo) => todo.id !== id);
      setTodos(filtered);
   };

   const editTodo = (id, editedText) => {
      var todosArray = todos;

      for (var i in todosArray) {
         if (todosArray[i].id == id) {
            todosArray[i].text = editedText;
         }
      }

      // console.log(todosArray);
      // todosArray.splice(todosArray.id, 1, { text: editedText, id: id });
      // console.log(todosArray);
      setTodos(todosArray);
   };

   return (
      <Container maxWidth="90%" style={{ marginTop: "1em" }}>
         <span className="h1">ALO</span>
         <List sx={{ marginTop: "1em" }}>
            {todos.map((todo) => (
               <div key={todo.id} style={{ marginTop: "1em" }}>
                  <TodoItem editTodo={editTodo} todo={todo} deleteTodo={deleteTodo} />
               </div>
            ))}
         </List>
      </Container>
   );
}
