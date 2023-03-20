import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import FriendDropdown from "./friendDropdown";
import FriendsTodoItem from "../friendsTodo/FriendsToDoItem/friendTodoItem";

function AddFriendForm() {
  const [friendTodoList, setFriendTodoList] = useState([]);
  const [friendId, setFriendId] = useState("");
  const [successMessage, setSuccessMessage] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFriendSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId");
    const token = Cookies.get("authToken");

    try {
      const res = await axios.put(
        "http://localhost:3001/friends/addFriend",
        {
          userId: userId,
          friendId: friendId,
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        setSuccessMessage("Friend added successfully");
        setErrorMessage("");
        setFriendId("");
      }
    } catch (err) {
      setErrorMessage(err.details[0].message);
      console.log(err);
    }
  };

  async function handleGetFriendsTodo() {
    const token = Cookies.get("authToken");
    try {
      const res = await axios.get(
        "http://localhost:3001/friends/getFriendsTodo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setFriendTodoList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form className="add-friend-form" onSubmit={handleFriendSubmit}>
        <input
          type="text"
          placeholder="Enter friend's id..."
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
        />
        <button type="submit">Add Friend</button>
        <p className="error">{errorMessage}</p>
        <p className="success">{successMessage}</p>
      </form>
      <FriendDropdown />
      <button onClick={handleGetFriendsTodo}>Get Friends Todo</button>
      <div className="todo__list">
        {friendTodoList.map((val, key) => {
          return <FriendsTodoItem todo={val} key={key} />;
        })}
      </div>
    </div>
  );
}

export default AddFriendForm;
