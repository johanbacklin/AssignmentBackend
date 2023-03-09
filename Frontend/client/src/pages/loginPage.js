import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginFunction } from "./functions/loginFunction.js";

function LogInPage() {
  const [userName, setInputUserName] = useState("");
  const [password, setInputPassword] = useState("");

  async function logInHandler(e) {
    e.preventDefault();
    const response = await loginFunction(userName, password);
    console.log(response);
  }

  return (
    <div className="App">
      <h1 className="title">Assignment Backend</h1>
      <div className="container">
        <div className="container-image-right">
          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
        </div>
        <div className="container-form-left">
          <form className="form__container" onSubmit={logInHandler}>
            <div className="title-form">
              <h1>Login User</h1>
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
            <button type="submit">Submit</button>
            <p className="have__acount">Already have an account?</p>

            <Link to="/RegisterPage" className="link">
              Go to Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
