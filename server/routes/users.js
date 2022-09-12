const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const User = require("../model/user");
const advanceResults = require("../middlewares/advanceResults");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router.use(isAuthenticated);
router.use(authorizeRole("admin"));

router.route("/").get(advanceResults(User), getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
