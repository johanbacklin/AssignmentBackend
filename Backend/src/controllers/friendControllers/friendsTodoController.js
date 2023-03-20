const pool = require("../../server");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const { validateUser } = require("../authControllers/validation/validation");

function friendsTodoController(req, res) {
  const authToken = req.cookies.authToken;

  const decodedToken = jwt.verify(authToken, process.env.SECRET_TOKEN);

  const userId = decodedToken.userId;

  const response = validateUser({ userId });

  if (response.error) {
    res
      .status(400)
      .send(response.error.details[0].message + " User id is invalid");
    return;
  } else {
    const sql =
      "SELECT t.*, u.username FROM todos t JOIN users u ON t.user_id = u.ID WHERE t.user_id IN (SELECT friend_id FROM friends WHERE user_id = ?) ORDER BY t.created_at DESC";
    pool.execute(sql, [userId], (err, result) => {
      if (err) {
        return res.status(500).send("Internal server error");
      } else {
        res.status(200).send(result);
      }
    });
  }
}

module.exports = { friendsTodoController };
