import axios from "axios";

const deleteTodoHandler = async (id, setTodoList, todoList, userId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/todo/deleteTodo/${id}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response);
    setTodoList(todoList.filter((val) => val.id !== id));
  } catch (error) {
    console.error(error);
  }
};

export { deleteTodoHandler };
