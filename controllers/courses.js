const { default: mongoose, trusted } = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const Bootcamp = require("../model/bootcamps");
const Courses = require("../model/courses");
const ErrorResponse = require("../utils/errorResponse");

//@Desc:Get all courses
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Courses.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advanceResults);
  }
});

//@Desc:Get course
exports.getCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Courses.findById(id).populate({
    path: "bootcamp",
    select: "name descri[tion",
  });

  if (!course) {
    return next(new ErrorResponse(`Course not found with id ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@Desc:Add course
//@path: /api/v1/bootcamps/:bootcampId/course
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
  }

  const newCourse = new Courses(req.body);
  await newCourse.save();

  res.status(201).json({
    success: true,
    data: newCourse,
  });
});

//@Desc:Update course
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Courses.findById(id);

  if (!course) {
    return next(new ErrorResponse(`Course not found with id ${id}`, 404));
  }

  const updatedCourse = await Courses.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: updatedCourse,
  });
});

//@Desc:delete course
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Courses.findById(id);

  if (!course) {
    return next(new ErrorResponse(`Course not found with id ${id}`, 404));
  }
  await course.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
