import axios from "axios";

export const registerFunction = async (userName, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/auth/registerController",
      {
        username: userName,
        password: password,
      }
    );
    const data = await response.status;
    return data;
  } catch (error) {
    const response = error.response.data;
    return response;
  }
};
