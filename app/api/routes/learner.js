const express = require("express");
const router = express.Router();
const learnerController = require("../controller/learner");

router.post("/register", learnerController.create);
router.post("/login", learnerController.login);

module.exports = router;
