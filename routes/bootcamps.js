const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  locateBootcamp
} = require("../controllers/bootcamps");

//Include other resource router
const courseRouter = require('./courses')

const router = express.Router();

//Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(locateBootcamp)  

module.exports = router;
