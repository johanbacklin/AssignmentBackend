/ joi
 const joi = require("joi");

 // Pool
 const pool = require("../server");

 // bcrypt
 const bcrypt = require("bcrypt");

 // Joi Schema
 const { validateAuth } = require("./validation/validation");

 // Register User
 const registerUser = (req, res) => {
   const { error, value } = validateAuth(req.body);

   if (error) {
     res.status(400).send(error.details[0].message);
   }

   const { username, password } = value;

   const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

   const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(password, salt);

   pool.execute(sql, [username, hash], (err, result) => {
     if (err) {
       res.status(500).send(err.message);
     } else {
       res.status(200).send("User registered!");
     }
   });
 };

 module.exports = { registerUser };