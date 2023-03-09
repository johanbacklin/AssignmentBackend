const pool = require("../../server");

//Bcrypt
const bcrypt = require("bcrypt");

// Validation
const { validateAuth } = require("./validation/validation");

function loginController(req, res) {
  try {
    const { username, password } = req.body;

    const response = validateAuth(req.body);

    const sql = "SELECT password FROM users WHERE username = ?";

    pool.execute(sql, [username], (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (result.length > 0) {
          const cryptPassword = result[0].password;
          const isMatch = bcrypt.compareSync(password, cryptPassword);
          if (isMatch) {
            res.cookie("authToken", "hejhej", {
              maxAge: 10 * 400000,
              sameSite: "none",
              secure: true,
            });
            res.sendStatus(200);
          } else {
            res.sendStatus(404);
          }
        } else {
          if (response.error) {
            res.status(400).send(response.error.details[0].message);
          } else {
            res.status(404).send("User or Password is incorrect! Try again!");
          }
        }
      }
    });
  } catch (error) {
    res.send(error);
  }
}

module.exports = { loginController };
