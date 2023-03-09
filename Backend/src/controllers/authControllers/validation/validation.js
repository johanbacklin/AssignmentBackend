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

// Schema for todo

const schemaTodo = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  createdAt: joi.date().required(),
  updatedAt: joi.date().required(),
  status: joi.string().required(),
});

function validateTodo({ title, description, createdAt, updatedAt, status }) {
  const results = schemaTodo.validate({
    title,
    description,
    createdAt,
    updatedAt,
    status,
  });
  return results;
}

module.exports = { validateAuth, validateTodo };
