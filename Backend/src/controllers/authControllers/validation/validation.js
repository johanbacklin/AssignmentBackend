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
  completed: joi.boolean().required(),
});

function validateTodo({ title, description, completed }) {
  const results = schemaTodo.validate({
    title,
    description,
    completed,
  });
  return results;
}

// Schema for user

const schemaUser = joi.object({
  userId: joi.required(),
});

function validateUser({ userId }) {
  const results = schemaUser.validate({
    userId,
  });
  return results;
}

// Schema for adding friends

const schemaAddFriend = joi.object({
  friendId: joi.number().required(),
});

function validateAddFriend({ friendId }) {
  const results = schemaAddFriend.validate({
    friendId,
  });
  return results;
}

// Schema for id

const schemaId = joi.object({
  todoId: joi.number().required(),
});

function validateId({ todoId }) {
  const result = schemaId.validate({
    todoId,
  });
  return result;
}

module.exports = {
  validateAuth,
  validateTodo,
  validateUser,
  validateAddFriend,
  validateId,
};
