import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function FriendDropdown() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(
          "http://localhost:3001/friends/friendList",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setFriends(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFriends();
  }, []);

  function handleFriendSelect(event) {
    const friendId = parseInt(event.target.value);
    setSelectedFriend(friendId);
  }

  return (
    <div>
      <select onChange={handleFriendSelect}>
        <option value="">Your Friends</option>
        {friends.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.username}
          </option>
        ))}
      </select>
      {selectedFriend && <p>You selected friend {selectedFriend}</p>}
    </div>
  );
}

export default FriendDropdown;
