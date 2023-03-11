import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginFunction } from "./functions/loginFunction.js";

function LogInPage() {
  const [userName, setInputUserName] = useState("");
  const [password, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function logInHandler(e) {
    e.preventDefault();

    if (userName === "" || password === "") {
      setErrorMessage("Please fill in all the fields");
      return;
    }

    const response = await loginFunction(userName, password);
    console.log(response);
    setErrorMessage(response);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="container-image-right"></div>
        <div className="container-form-left">
          <form className="form__container" onSubmit={logInHandler}>
            <div className="title-form">
              <h1>LOGIN</h1>
            </div>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              onChange={(event) => {
                setInputUserName(event.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(event) => {
                setInputPassword(event.target.value);
              }}
            />
            <button type="submit">Submit</button>
            <p className="have__acount">
              Already have an account?
              <Link to="/RegisterPage" className="link">
                Go to Register
              </Link>
            </p>
            <p className="error-message">{errorMessage}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
