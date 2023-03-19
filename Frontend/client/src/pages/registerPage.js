import "../App.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { registerFunction } from "./functions/registerFunction";

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function registerHandler(e) {
    e.preventDefault();

    if (userName === "" || password === "") {
      setErrorMessage("Please fill in all the fields");
      return;
    }

    const response = await registerFunction(userName, password);

    if (response === 200) {
      setSuccessMessage("You have successfully registered");
      return;
    } else {
      setErrorMessage(response);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="container-image-right">
          <p></p>
        </div>
        <div className="container-form-left">
          <form className="form__container">
            <div className="title-form">
              <h1>REGISTER</h1>
            </div>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button type="submit" onClick={registerHandler}>
              Submit
            </button>
            <p className="have__acount">
              Already have an account?
              <Link to="/" className="link">
                Go to Login
              </Link>
            </p>
            <p className="error-message">{errorMessage}</p>
            <p className="success-message">{successMessage}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
