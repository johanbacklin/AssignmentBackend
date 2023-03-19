app.get("/api/todos", (req, res) => {
  // Get the user ID from the request query parameters
  const userId = req.query.userId;

  // Retrieve the user's own todo list from the database
  pool.query(
    "SELECT * FROM todos WHERE user_id = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error retrieving user's todo list from database");
        return;
      }

      // Retrieve the user's friends from the database
      pool.query(
        "SELECT friend_id FROM friends WHERE user_id = ?",
        [userId],
        (error, results) => {
          if (error) {
            console.error(error);
            res
              .status(500)
              .send("Error retrieving user's friends from database");
            return;
          }

          // Create an array of friend IDs
          const friendIds = results.map((result) => result.friend_id);

          // Retrieve the todo lists of the user's friends from the database
          pool.query(
            "SELECT * FROM todos WHERE user_id IN (?)",
            [friendIds],
            (error, results) => {
              if (error) {
                console.error(error);
                res
                  .status(500)
                  .send("Error retrieving friends' todo lists from database");
                return;
              }

              // Combine the user's own todo list and their friends' todo lists into a single array
              const todos = [...results, ...results2];

              // Send the combined todo list as the response
              res.send(todos);
            }
          );
        }
      );
    }
  );
});
