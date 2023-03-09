import axios from "axios";

export const loginFunction = async (userName, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/loginController",
      {
        username: userName,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    const data = await response.status;

    if (data === 200) {
      window.location.href = "/toDoPage";
      return response;
    }
    return response;
  } catch (error) {
    const response = error.response.data;
    return response;
  }
};
