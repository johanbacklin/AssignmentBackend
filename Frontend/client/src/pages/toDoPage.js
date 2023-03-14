import { useState, useEffect } from "react";
import TodoList from "../components/ToDoList/ToDoList";
import TodoForm from "../components/toDoForm/toDoForm";
import Cookies from "js-cookie";

function ToDoPage() {
  const [todoList, setTodoList] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      setUserId(userIdCookie);
    }
  }, []);

  function addTodoItem(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div className="todopage-container">
      <h1>Welcome, {userId}!</h1>
      <TodoList todoList={todoList} userId={userId} />
      <TodoForm addTodoItem={addTodoItem} userId={userId} />
    </div>
  );
}

export default ToDoPage;

/* async function addTodoItem(title, description, completed) {
    try {
      const response = await fetch("http://localhost:3001/todo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,

          description: description,
          completed: completed,
          userId: userId,
        }),
      });

      const data = await response.json();
      console.log(data);
      setTodoList([...todoList, data]);
    } catch (error) {
      console.error(error);
    }
  } */
