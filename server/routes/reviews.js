const express = require("express");
const advanceResults = require("../middlewares/advanceResults");
const Review = require("../model/review");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const {
  getReviews,
  updateReview,
  deleteReview,
  getReview,
  addreview,
} = require("../controllers/reviews");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advanceResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  )
  .post(isAuthenticated, authorizeRole("admin", "user"), addreview);

router
  .route("/:id")
  .get(getReview)
  .put(isAuthenticated, authorizeRole("admin", "user"), updateReview)
  .delete(isAuthenticated, deleteReview);

module.exports = router;
