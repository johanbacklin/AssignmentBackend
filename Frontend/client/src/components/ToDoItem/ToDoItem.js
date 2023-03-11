import React from "react";
import "./toDoItem.scss";

function TodoItem(props) {
  const { title, description, created_at, updated_at, completed } = props.todo;

  return (
    <div className="todo-container">
      <div className="todo-image-container">
        <h3 className="todo-title">Title: {title}</h3>
        <div className="todo-description">Description: {description}</div>
        <div className="todo-created">Created: {created_at}</div>
        <div className="todo-updated">Updated: {updated_at}</div>
        <div className="todo-status">Status: {completed}</div>
        <div className="button-container">
          <button>
            <a href={`/todo/${props.todo.id}`}>Edit</a>
          </button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
