const pool = require("../../server");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const { validateAuth } = require("./validation/validation");

const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_TOKEN;
// ...

function loginController(req, res, next) {
  try {
    const { username, password } = req.body;

    const response = validateAuth(req.body);

    const sql = "SELECT id, password FROM users WHERE username = ?";

    pool.execute(sql, [username], (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (result.length > 0) {
          const userId = result[0].id;
          const cryptPassword = result[0].password;
          const isMatch = bcrypt.compareSync(password, cryptPassword);
          if (isMatch) {
            const token = jwt.sign({ userId }, secret, {
              expiresIn: "1h",
            });
            res.cookie("authToken", token, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 3600000,
            });
            console.log("cookies", req.cookies, "HÄR ÄR COOKIES");

            res.status(200).send({ message: "Logged in successfully!" });
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

/* const pool = require("../../server");
const bcrypt = require("bcrypt");
const { validateAuth } = require("./validation/validation");
const {
  verifyToken,
} = require("../../controllers/authControllers/middleware/verifyToken");

const jwt = require("jsonwebtoken");

// ...

function loginController(req, res, next) {
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
            // Generate JWT token
            const token = jwt.sign({ username }, process.env.SECRET_TOKEN, {
              expiresIn: "0.5h",
            });
            res.cookie("authToken", token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: "none",
              secure: true,
            });

            res.status(200).send({ message: "Logged in successfully!" });
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
 */
