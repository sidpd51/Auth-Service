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

router.get("/dummy", (req, res) => {
    return req.status(200).json({
        message: "Ok",
    });
});

module.exports = router;
