import axios from "axios";
import Cookies from "js-cookie";

const handleUpdateSubmit = async (
  id,
  event,
  completed,
  description,
  title,
  userId,
  setErrorMessage
) => {
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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    setErrorMessage("");
  } catch (error) {
    setErrorMessage(error.response.data);
  }
};

export { handleUpdateSubmit };
