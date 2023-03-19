import { useState } from "react";
import axios from "axios";

function AddFriendForm({ userId, onAddFriend }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/friends?userId=${userId}`,
        { name }
      );
      onAddFriend(res.data);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Friend's name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Friend</button>
    </form>
  );
}

export default AddFriendForm;
