import axios from "axios";

const deleteTodoHandler = async (id, setTodoList, todoList, userId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/todo/deleteTodo/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      setTodoList(todoList.filter((val) => val.id !== id));
    } else {
      console.error(`Failed to delete todo with ID ${id}.`);
    }
  } catch (error) {
    console.error(error);
  }
};

export { deleteTodoHandler };
