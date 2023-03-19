import { useState, useEffect } from "react";
import TodoForm from "../components/toDoForm/toDoForm";
import Cookies from "js-cookie";
import axios from "axios";
import { formSubmit } from "../components/toDoForm/toDoFormFunctions/formSubmitHandler";
import AddFriendForm from "../components/friend/addFriendForm";

function ToDoPage() {
  const [todoList, setTodoList] = useState([]);
  const [userId, setUserId] = useState("");
  const [friends, setFriends] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");

  useEffect(() => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      setUserId(userIdCookie);
      fetchFriends(userIdCookie);
      fetchTodos(userIdCookie);
    }
  }, []);

  async function fetchFriends(userId) {
    try {
      const res = await axios.get(
        `http://localhost:3001/friends?user_id=${userId}`
      );
      setFriends(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchTodos(userId) {
    try {
      const res = await axios.get(
        `http://localhost:3001/todos?user_id=${userId}`
      );
      setTodoList(
        res.data.map((todo) => ({
          ...todo,
          friend: friends.find((friend) => friend.friend_id === todo.user_id),
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function addFriend(newFriend) {
    try {
      const res = await axios.post("http://localhost:3001/friends", {
        ...newFriend,
        user_id: userId,
      });
      setFriends([...friends, res.data]);
    } catch (err) {
      console.error(err);
    }
  }

  function filterTodosByFriend(todos, friendName) {
    return todos.filter((todo) => {
      if (!friendName) return true; // if searchValue is empty, show all todos
      if (todo.friend) {
        return todo.friend.name
          .toLowerCase()
          .includes(friendName.toLowerCase());
      }
      return false;
    });
  }

  function handleFriendSelect(e) {
    setSelectedFriend(e.target.value);
  }

  const filteredTodoList = filterTodosByFriend(todoList, selectedFriend);

  return (
    <div className="todopage-container">
      <div className="friends-search-container">
        <input
          type="text"
          placeholder="Search for a friend..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select value={selectedFriend} onChange={handleFriendSelect}>
          <option value="">All Friends</option>
          {friends.map((friend) => (
            <option key={friend.id} value={friend.name}>
              {friend.name}
            </option>
          ))}
        </select>
        <AddFriendForm onAddFriend={addFriend} />
      </div>
      <div className="todolist-container">
        <TodoForm onFormSubmit={formSubmit} />
      </div>
    </div>
  );
}

export default ToDoPage;

/* import { useState, useEffect } from "react";
import TodoList from "../components/ToDoList/ToDoList";
import TodoForm from "../components/toDoForm/toDoForm";
import Cookies from "js-cookie";
import { formSubmit } from "../components/toDoForm/toDoFormFunctions/formSubmitHandler";
import { deleteTodoHandler } from "../components/toDoForm/toDoFormFunctions/deleteTodoHandler";

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
      <TodoForm
        pageTitle={"Add Todo"}
        addTodoItem={addTodoItem}
        userId={userId}
        onSubmit={formSubmit}
      />
      <TodoList
        todoList={todoList}
        userId={userId}
        deleteTodoHandler={deleteTodoHandler}
      />
    </div>
  );
}

export default ToDoPage;
 */
