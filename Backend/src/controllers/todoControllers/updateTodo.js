const pool = require("../../server");

const { validateTodo } = require("../authControllers/validation/validation");

const updateTodo = (req, res) => {
  const { title, description, completed } = req.body;
  const id = req.params.id;
  const userId = req.userId;

  const response = validateTodo(req.body);

  const sql =
    "UPDATE todos SET title = ?, completed = ?, description = ? WHERE id = ? AND user_id = ?";

  pool.execute(
    sql,
    [title, completed, description, id, userId],
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        if (response.error) {
          res.status(400).send(response.error.details[0].message);
          console.log(response.error.details[0].message);
        } else {
          res.status(200).send("Todo updated!");
        }
      }
    }
  );
};

module.exports = { updateTodo };
