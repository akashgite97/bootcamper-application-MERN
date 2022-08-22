const express = require("express");
const { registerUser, loginUser, getMyDetails } = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/me",isAuthenticated, getMyDetails)

module.exports = router;
