const pool = require("../../server");
const jwt = require("jsonwebtoken");

const {
  validateUser,
  validateAddFriend,
} = require("../authControllers/validation/validation");

function addFriend(req, res) {
  const authToken = req.cookies.authToken;

  const decodedToken = jwt.verify(authToken, process.env.SECRET_TOKEN);

  const userId = decodedToken.userId;
  const { friendId } = req.body;

  const response = validateUser({ userId });
  const friendResponse = validateAddFriend({ friendId });

  if (response.error || friendResponse.error) {
    res.status(400).send(response.error + friendResponse.error);
    return;
  } else {
    const sql = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)";
    pool.execute(sql, [userId, friendId], (err, result) => {
      if (result.affectedRows > 0) {
        res.status(201).json(result);
      } else {
        res.status(400).send(err + "Friend id is invalid");
        return;
      }
    });
  }
}

module.exports = { addFriend };
