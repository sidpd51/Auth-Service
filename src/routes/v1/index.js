const userController = require("../../controllers/user-controller");
const express = require("express");

const router = express.Router();
const { AuthRequestValidator } = require("../../middlewares/index");

router.post(
    "/signup",
    AuthRequestValidator.validateUserAuth,
    userController.create
);
router.post(
    "/signin",
    AuthRequestValidator.validateUserAuth,
    userController.signIn
);

router.get("/isAuthenticated", userController.isAuthenticated);


router.get("/isAdmin", userController.isAdmin);

module.exports = router;
