const express = require("express");
const pool = require("../../server");
const friendRoutes = express.Router();

const {
  getFriendList,
} = require("../../controllers/friendControllers/getFriendList");

const { addFriend } = require("../../controllers/friendControllers/addFriend");
const {
  friendsTodoController,
} = require("../../controllers/friendControllers/friendsTodoController");

friendRoutes.get("/friendList", getFriendList);

friendRoutes.put("/addFriend", addFriend);

friendRoutes.get("/getFriendsTodo", friendsTodoController);

module.exports = { friendRoutes };
