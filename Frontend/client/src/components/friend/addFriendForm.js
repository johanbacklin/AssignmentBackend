import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function AddFriendForm({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("user_id");

    try {
      const res = await axios.post("http://localhost:3001/friends", {
        user_id: userId,
        friend_name: friendName,
      });
      onAddFriend(res.data);
      setFriendName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="add-friend-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter friend's name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <button type="submit">Add Friend</button>
    </form>
  );
}

export default AddFriendForm;
