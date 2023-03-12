import React from "react";
import "./toDoForm.scss";

import axios from "axios";

import { useState } from "react";
import TodoItem from "../ToDoItem/ToDoItem";

function ToDoForm({ userId }) {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  async function formSubmitHandler(e) {
    e.preventDefault();

    if (
      title === "" ||
      description === "" ||
      (completed === "" && completed !== "true" && completed !== "false")
    ) {
      setErrorMessage(
        "Please fill in all the fields OR status should be true or false"
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/todo/createTodo",
        {
          title: title,
          description: description,
          completed: completed,
          userId: userId,
        }
      );
      console.log(response);
      setErrorMessage("");
      setTitle("");
    } catch (error) {
      setErrorMessage(error.response.data);
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

  const deleteTodoHandler = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/todo/deleteTodo/${id}`
      );

      console.log(response);
      setTodoList(todoList.filter((val) => val.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo__container">
      <button onClick={logoutButtonHandler}>Logout</button>
      <h1>Add Your Todos here !!! </h1>
      <form className="form__container" onSubmit={formSubmitHandler}>
        <div className="title-form">
          <h1>Create To Do</h1>
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
        <label htmlFor="text">Status</label>
        <input
          type="text"
          onChange={(event) => {
            setCompleted(event.target.value);
          }}
        />
        <button type="submit">Submit</button>
        <p className="error-message">{errorMessage}</p>
      </form>
      <h1>Todo List</h1>
      <button onClick={getAllTodos}>Get All Todos</button>
      <div className="todo__list">
        {todoList.map((val, key) => {
          return (
            <TodoItem
              todo={val}
              key={key}
              deleteTodoHandler={() => deleteTodoHandler(val.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ToDoForm;
