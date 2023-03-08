const pool = require("../server");

//Bcrypt
const bcrypt = require("bcrypt");

const { validateAuth } = require("./validation/validation");

function login(req, res) {
  const { error, value } = validateAuth(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const { username } = value;

  const sql = "select password from users where username =?";

  pool.execute(sql, [username], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error in your server!");
    } else {
      if (result.length === 0) {
        res.status(400).send("User not found!");
      } else {
        const hash = result[0].password;
        const { password } = value;

        const compare = bcrypt.compareSync(password, hash);

        if (compare) {
          res.status(200).send("User logged in!");
        } else {
          res.status(400).send("Wrong password!");
        }
      }
    }
  });
}

module.exports = { login };
