const pool = require("../../server");
const jwt = require("jsonwebtoken");
const { validateTodo } = require("../authControllers/validation/validation");

function todoController(req, res) {
  const userId = req.userId;
  console.log(userId + " user_id from todoController.js");

  const sql =
    "SELECT t.*, u.username FROM todos t JOIN users u ON t.user_id = u.ID WHERE t.user_id = ?";

  pool.execute(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    } else {
      res.status(200).json(result);
    }
  });
}

module.exports = { todoController };
