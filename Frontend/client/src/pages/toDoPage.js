import { useState, useEffect } from "react";
import TodoForm from "../components/toDoForm/toDoForm";
import Cookies from "js-cookie";
import { formSubmit } from "../components/toDoForm/toDoFormFunctions/formSubmitHandler";
import AddFriendForm from "../components/friend/friendForm/addFriendForm";

function ToDoPage() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      setUserId(userIdCookie);
    }
  }, []);

  return (
    <div className="todopage-container">
      <div className="todolist-container">
        <TodoForm onFormSubmit={formSubmit} />
        <AddFriendForm />
      </div>
    </div>
  );
}

export default ToDoPage;
