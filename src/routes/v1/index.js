const userController = require("../../controllers/user-controller");
const express = require("express");

const router = express.Router();

router.post("/signup", userController.create);

module.exports = router;
