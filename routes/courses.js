const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");
const advanceResults = require("../middlewares/advanceResults");
const Course = require("../model/courses");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advanceResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(isAuthenticated, addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(isAuthenticated, updateCourse)
  .delete(isAuthenticated, deleteCourse);

module.exports = router;
