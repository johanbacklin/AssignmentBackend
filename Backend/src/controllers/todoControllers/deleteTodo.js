const pool = require("../../server");

const deleteTodo = (req, res) => {
  const userId = req.userId;
  const todoId = req.params.id;

  const sql = "DELETE FROM todos WHERE id = ? AND user_id = ?";
  pool.execute(sql, [todoId, userId], (err, result) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send("Todo not found");
      } else {
        res.status(200).send("Todo deleted!");
      }
    }
  });
};

module.exports = { deleteTodo };
