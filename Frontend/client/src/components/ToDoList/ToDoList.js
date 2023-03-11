import React from "react";
import TodoItem from "../ToDoItem/ToDoItem";

function TodoList(props) {
  return (
    <div>
      {props.todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
