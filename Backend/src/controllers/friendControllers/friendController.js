const pool = require("../../server");
const jwt = require("jsonwebtoken");

function friendController(req, res) {
  const userId = req.userId;
  const friendId = req.body.friendId;

  const response = validateTodo(req.body);

  if (response.error) {
    return res.status(400).send({ error: response.error.details[0].message });
  }

  pool.execute(
    "SELECT * FROM friends WHERE user_id = ? AND friend_id = ?",
    [userId, friendId],
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: "Internal server error" });
      } else if (result.length > 0) {
        return res.status(400).send({ error: "Friendship already exists" });
      } else {
        const sql = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)";
        pool.execute(sql, [userId, friendId], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send({ error: "Internal server error" });
          } else {
            res.status(200).send(result);
          }
        });
      }
    }
  );
}

module.exports = { friendController };
