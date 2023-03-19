const express = require("express");

const pool = require("../../server");

const friendRoutes = express.Router();

const {
  friendController,
} = require("../../controllers/friendControllers/friendController");
/* 
const {
  createFriend,
} = require("../../controllers/friendController/createFriend"); */

/* const {
  updateFriend,
} = require("../../controllers/friendController/updateFriend"); */

friendRoutes.get("/", friendController);

/* friendRoutes.put("/createFriend", createFriend);
friendRoutes.post("/updateFriend/:id", updateFriend); */

module.exports = { friendRoutes };
