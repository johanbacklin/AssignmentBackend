// Express;
const express = require("express");
const app = express();

//Mysql
const mysql = require("mysql2");

// Dotenv
require("dotenv").config();

// Json
app.use(express.json());

// Database
const dataBase = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};
// Pool
const pool = mysql.createPool(dataBase);
module.exports = pool;

app.get("/", (req, res) => {
  const sql = "SELECT * from users";

  pool.execute(sql, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(result);
    }
  });
});

// Routes
const { routes } = require("./routes/authRoute/authRoute");

app.use("/auth", routes);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
