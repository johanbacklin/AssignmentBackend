// Express;
const express = require("express");
const app = express();

// Cors
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

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

// Routes
const { routes } = require("./routes/authRoute/authRoute");
app.use("/auth", routes);

//todo Routes

//Nytt
const { todoRoutes } = require("./routes/todoRoute/todoRoute");
app.use("/todo", todoRoutes);

app.listen(3001, () => {
  console.log("Listening on port 3001!");
});
