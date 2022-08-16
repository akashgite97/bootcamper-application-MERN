const { default: mongoose } = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const Courses = require("../model/courses");
const ErrorResponse = require("../utils/errorResponse");

//@Desc:Get all courses
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Courses.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Courses.find();
  }

  const courses = await query

  res.status(200).json({
    success:true,
    data:courses,
    count: courses.length
  })


});
