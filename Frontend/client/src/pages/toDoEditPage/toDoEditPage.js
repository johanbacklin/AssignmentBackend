import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./toDoEditPage.scss";
import Cookies from "js-cookie";

import axios from "axios";

function ToDoEditPage() {
  const [todoList, setTodoList] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      setUserId(userIdCookie);
    }
  }, []);

  async function updateTodo(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/todo/updateTodo/${id}`,
        {
          id: id,
          title: title,
          description: description,
          completed: completed,
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTodoList(
        todoList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                title: title,
                description: description,
                completed: completed,
              }
            : val;
        })
      );
      setTitle("");
      setDescription("");
      setCompleted(false);
      getTodo();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/todo/deleteTodo/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTodoList(
        todoList.filter((val) => {
          return val.id !== id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function getTodo() {
    try {
      const response = await axios.get(`http://localhost:3001/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const todo = response.data;
      setTodoList([todo]);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleCheckboxChange(event) {
    const isChecked = event.target.checked;
    setCompleted(isChecked ? true : false);
  }

  return (
    <>
      <div className="container">
        <h1>Edit Todo</h1>
        <div className="get-todo-id">
          <button onClick={getTodo}>Get Todo</button>
          <Link path="/todo" to="/todo">
            <button>Back to Todo List</button>
          </Link>
          <div className="error-message">{errorMessage}</div>
        </div>
        <div className="todo__list">
          {todoList.map((val, key) => {
            return (
              <div className="todo-container">
                <h3>Todo ID: {val.id}</h3>
                <h3>Title: {val.title}</h3>
                <h3>Description: {val.description}</h3>
                <h3>Completed: {val.completed}</h3>
                <div>
                  <input
                    type="text"
                    value={title}
                    placeholder="Title..."
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    value={description}
                    placeholder="Description..."
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                  <input
                    type="checkbox"
                    placeholder="Completed..."
                    value={completed}
                    onChange={handleCheckboxChange}
                  />

                  <button type="submit" onClick={updateTodo}>
                    Add Changes
                  </button>
                  <button
                    className="delete__button"
                    onClick={() => {
                      deleteTodo(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ToDoEditPage;
