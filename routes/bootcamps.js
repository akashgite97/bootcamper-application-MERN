const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  locateBootcamp,
  uploadBootcampPhoto,
} = require("../controllers/bootcamps");
const advanceResults = require("../middlewares/advanceResults");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");
const Bootcamp = require("../model/bootcamps");

//Include other resource router
const courseRouter = require("./courses");
const reviewsRouter = require("./reviews");

const router = express.Router();

//Re-route into other resource router
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewsRouter);


router
  .route("/")
  .get(advanceResults(Bootcamp, "course"), getBootcamps)
  .post(isAuthenticated, authorizeRole("admin", "publisher"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(isAuthenticated, authorizeRole("admin", "publisher"), updateBootcamp)
  .delete(isAuthenticated, authorizeRole("admin", "publisher"), deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(locateBootcamp);

router
  .route("/:id/photo")
  .put(
    isAuthenticated,
    authorizeRole("admin", "publisher"),
    uploadBootcampPhoto
  );

module.exports = router;
