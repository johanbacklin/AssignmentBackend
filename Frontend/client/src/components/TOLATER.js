import React, { useState } from "react";
import axios from "axios";

function TodoPage() {
  const [userId, setUserId] = useState("");
  const [friendId, setFriendId] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddFriend = async () => {
    try {
      const response = await axios.post("/api/friends", { userId, friendId });
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  const handleFetchTodos = async () => {
    try {
      const response = await axios.get(`/api/todos?userId=${userId}`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h2>Add a Friend</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Friend ID:
          <input
            type="text"
            value={friendId}
            onChange={(event) => setFriendId(event.target.value)}
          />
        </label>
        <br />
        <button onClick={handleAddFriend}>Add Friend</button>
      </form>
      <hr />
      <h2>Todo List</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </label>
        <br />
        <button onClick={handleFetchTodos}>Fetch Todo List</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> -{" "}
            {todo.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
