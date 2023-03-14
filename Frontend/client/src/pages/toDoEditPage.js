import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { deleteTodoHandler } from "../components/toDoForm/toDoFormFunctions/deleteTodoHandler";

function TodoEditPage(props, { userId }) {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePutSubmit = async (event) => {
    event.preventDefault();

    if (title === "" || description === "") {
      setErrorMessage("Please fill in all the fields");
      return;
    }

    if (
      typeof completed === "undefined" ||
      (typeof completed === "string" &&
        completed !== "true" &&
        completed !== "false") ||
      (typeof completed === "boolean" &&
        completed !== true &&
        completed !== false)
    ) {
      setErrorMessage("Invalid value for completed");
      return;
    }

    try {
      const token = Cookies.get("authToken");

      const response = await axios.put(
        `http://localhost:3001/todo/updateTodo/${id}`,
        {
          title: title,
          description: description,
          completed: completed,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      window.location.href = `http://localhost:3000/todo`;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Todo Item</h1>
      <form onSubmit={handlePutSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="description-input">Description</label>
        <textarea
          id="description-input"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="completed-input">Completed</label>
        <input
          id="completed-input"
          type="checkbox"
          checked={completed}
          onChange={(event) => setCompleted(event.target.checked)}
        />
        <button onClick={(val) => deleteTodoHandler(val.id)}>Delete</button>
        <button type="submit">Save</button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
}

export default TodoEditPage;
