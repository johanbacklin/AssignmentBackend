// Express;
const express = require("express");
const app = express();
// Cookie-parser
const cookie = require("cookie-parser");
app.use(cookie());

// Cors
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/* app.use(cookieParser()); */

// Dotenv
require("dotenv").config();
//Mysql
const mysql = require("mysql2");

// MiddleWares
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
const {
  verifyToken,
} = require("./controllers/authControllers/middleware/verifyToken");
const { todoRoutes } = require("./routes/todoRoute/todoRoute");
app.use("/todo", verifyToken, todoRoutes);

app.listen(3001, () => {
  console.log("Listening on port 3001!");
});
