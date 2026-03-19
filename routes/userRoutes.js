const router = require('express').Router();
const userCOntroller  = require("../controller/userController");

router.post("/register", userCOntroller.register);
router.post("/login", userCOntroller.login);
router.get("/profile/:id", userCOntroller.getProfile);
module.exports = router;