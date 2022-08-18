const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  locateBootcamp,
  uploadBootcampPhoto
} = require("../controllers/bootcamps");
const advanceResults = require("../middlewares/advanceResults");
const Bootcamp = require("../model/bootcamps");


//Include other resource router
const courseRouter = require('./courses')

const router = express.Router();

//Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)

router.route("/").get(advanceResults(Bootcamp,'course'),getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(locateBootcamp)  

router.route('/:id/photo').put(uploadBootcampPhoto)

module.exports = router;
