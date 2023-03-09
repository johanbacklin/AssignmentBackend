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
      // Out put in frontend side
      console.log("Login Success");
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
