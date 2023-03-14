const pool = require("../../server");
const jwt = require("jsonwebtoken");

function friendController(req, res) {
  const userId = req.userId;
  const friendId = req.body.friendId;

  console.log(userId + " user_id from todoController.js");

  pool.execute(
    "SELECT * FROM friendships WHERE user_id = ? AND friend_id = ?",
    [userId, friendId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
      } else if (result.length > 0) {
        return res.status(400).send({ error: "Friendship already exists" });
      } else {
        const sql =
          "INSERT INTO friendships (user_id, friend_id) VALUES (?, ?)";
        pool.execute(sql, [userId, friendId], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send({ error: "Internal server error" });
          } else {
            res.status(200).json(result);
          }
        });
      }
    }
  );
}

module.exports = { friendController };
