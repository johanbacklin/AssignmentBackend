const jwt = require("jsonwebtoken");
const pool = require("../../server");

const {
  validateUser,
} = require("../../controllers/authControllers/validation/validation");

function getFriendList(req, res) {
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
      "SELECT users.id, users.username FROM friends INNER JOIN users ON friends.friend_id = users.id WHERE friends.user_id = ?";
    pool.execute(sql, [userId], (err, result) => {
      if (err) {
        res
          .status(500)
          .send("Something went wrong with friends from database!");
        console.log(err);
      } else {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(404).send("Friends not found in database!");
          console.log(result);
        }
      }
    });
  }
}

module.exports = { getFriendList };
