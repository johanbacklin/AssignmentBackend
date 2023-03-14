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
        headers: {
          sameSite: "none",
          secure: true,
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      const userId = response.data.user_id;

      const now = new Date();
      const time = now.getTime();
      const expireTime = time + 3600000;
      now.setTime(expireTime);
      document.cookie = `userId=${userId};expires=${now.toUTCString()};path=/`;
      window.location.href = "/todo";
      return response.data;
    }
    return response;
  } catch (error) {
    const response = error.response.data;
    return response;
  }
};
