import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [InputUsername, setInputUserName] = useState("");
  const [InputPassword, setInputPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/registerController",
        {
          username: InputUsername,
          password: InputPassword,
        }
      );
      const data = await response.status;

      if (data === 200) {
        // Out put in frontend side
        console.log("Register Success");
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1 className="title">Assignment Backend</h1>
      <div className="container">
        <div className="container-image-right">
          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
        </div>
        <div className="container-form-left">
          <form className="form__container">
            <div className="title-form">
              <h1>Register User</h1>
            </div>
            <label htmlFor="name">
              <em>Username</em>
            </label>
            <input
              type="text"
              onChange={(event) => {
                setInputUserName(event.target.value);
              }}
            />
            <label htmlFor="password">
              <em>Password</em>
            </label>
            <input
              type="password"
              onChange={(event) => {
                setInputPassword(event.target.value);
              }}
            />
            <button type="submit" onClick={registerUser}>
              Submit
            </button>
            <p className="have__acount">Already have an account?</p>

            <Link to="/" className="link">
              Go to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
