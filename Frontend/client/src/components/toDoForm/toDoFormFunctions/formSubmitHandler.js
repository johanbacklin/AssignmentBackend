import axios from "axios";
import Cookies from "js-cookie";

async function formSubmit(
  e,
  title,
  description,
  completed,
  userId,
  setErrorMessage,
  setTitle
) {
  e.preventDefault();

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

    const response = await axios.post(
      "http://localhost:3001/todo/createTodo",
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
    console.log(response);

    setErrorMessage("");
    setTitle("");
  } catch (error) {
    setErrorMessage(error.response.data);
  }
}

export { formSubmit };
