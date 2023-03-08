//Validation for the user input
const joi = require("joi");

//Schema
const schemaAuth = joi.object({
  username: joi.string().min(3).max(30).required(),
  password: joi.string().min(6).max(30).required(),
});

//Validation

function validateAuth({ username, password }) {
  const results = schemaAuth.validate({
    username,
    password,
  });
  return results;
}

module.exports = { validateAuth };
