import { useState } from "react";
import axios from "axios";

function FriendSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/friends?search=${searchQuery}`);
      onSearch(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search friends"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default FriendSearch;
