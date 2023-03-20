import "./toDoForm.scss";
import axios from "axios";
import { useState } from "react";
import TodoItem from "../ToDoItem/ToDoItem";
import Cookies from "js-cookie";
import { deleteTodoHandler } from "./toDoFormFunctions/deleteTodoHandler";
import { formSubmit } from "./toDoFormFunctions/formSubmitHandler";

function ToDoForm({ userId, pageTitle }) {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function formSubmitHandler(event) {
    formSubmit(event, title, description, completed, userId, todoList);
    getAllTodos();
  }

  async function logoutButtonHandler() {
    try {
      const response = await fetch(
        "http://localhost:3001/auth/logout",
        {
          method: "POST",
        },
        { withCredentials: true }
      );
      if (response.ok) {
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
      } else {
        console.log("Failed to log out");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setTodoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleCheckboxChange(event) {
    const isChecked = event.target.checked;
    setCompleted(isChecked ? true : false);
  }

  function handleDeleteTodo(todoId) {
    deleteTodoHandler(todoId);

    setTodoList(todoList.filter((todo) => todo.id !== todoId));
  }

  return (
    <>
      <div className="todo__header">
        <div className="username-left-header">
          <h1>Hello</h1>
        </div>
        <div className="username-right-header">
          <button onClick={logoutButtonHandler}>Logout</button>
        </div>
      </div>

      <div className="todo__container">
        <div className="todo__wrapper">
          <form className="from-2" onSubmit={formSubmitHandler}>
            <div className="title-form">
              <h1>{pageTitle}</h1>
            </div>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <label htmlFor="text">Description</label>
            <input
              type="text"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <div>
              <label htmlFor="completed">Completed</label>
              <input
                type="checkbox"
                id="completed"
                name="completed"
                onChange={handleCheckboxChange}
              />
            </div>
            <button type="submit">Submit</button>
            <p className="error-message">{errorMessage}</p>
          </form>
        </div>

        <div className="todo-list-container">
          <h1>Todo List</h1>
          <button onClick={getAllTodos}>Get All Todos</button>
          <div className="todo__list">
            {todoList.map((val, key) => {
              return (
                <TodoItem
                  todo={val}
                  key={key}
                  deleteTodoHandler={() =>
                    deleteTodoHandler(val.id, setTodoList, todoList, userId)
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoForm;
