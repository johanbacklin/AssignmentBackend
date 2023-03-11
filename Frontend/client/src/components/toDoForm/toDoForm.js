import React from "react";
import "./toDoForm.scss";

import axios from "axios";

import { useState } from "react";
import TodoItem from "../ToDoItem/ToDoItem";

function ToDoForm() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function formSubmitHandler(e) {
    e.preventDefault();

    if (title === "" || description === "" || completed === "") {
      setErrorMessage("Please fill in all the fields");
      return;
    }

    const response = await axios.post("http://localhost:3001/todo", {
      title: title,
      description: description,
      completed: completed,
    });
    console.log(response);
    setErrorMessage(response.data);

    setTitle("");
  }

  const getAllTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todo");
      setTodoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo__container">
      {" "}
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
          console.log(val);
          return <TodoItem todo={val} key={key} />;
        })}
      </div>
    </div>
  );
}

export default ToDoForm;
