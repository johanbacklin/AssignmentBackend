import React, { useState } from "react";

import TodoList from "../components/ToDoList/ToDoList";
import TodoForm from "../components/toDoForm/toDoForm";

function ToDoPage() {
  const [todoList, setTodoList] = useState([]);

  function addTodoItem(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div className="todopage-container">
      <TodoList todoList={todoList} />
      <TodoForm addTodoItem={addTodoItem} />
    </div>
  );
}

export default ToDoPage;
