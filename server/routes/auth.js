const express = require("express");
const {
  registerUser,
  loginUser,
  getMyDetails,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logOut
} = require("../controllers/auth");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.post("/me", isAuthenticated, getMyDetails);
router.put("/updateDetails", isAuthenticated, updateDetails);
router.put("/updatePassword", isAuthenticated, updatePassword);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:resettoken", resetPassword);

module.exports = router;
