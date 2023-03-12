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
        responseType: "json",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      window.location.href = "/toDoPage";
      return response.data;
    }
    return response;
  } catch (error) {
    const response = error.response.data;
    return response;
  }
};
