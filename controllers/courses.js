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
    return next(new ErrorResponse(`${errorMessage.courseIdNotFound} ${id}`, 404));
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
  req.body.user = req.user.id

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(new ErrorResponse(`${errorMessage.bootcampIdNotFound} ${id}`, 404));
  }

  //make sure user is bootcamp owner
  if(bootcamp.user.toString()!== req.user.id){
    return next(new ErrorResponse(`User ${user.params.id} is not authorized to a add course`),401)
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
  let course = await Courses.findById(id);

  if (!course) {
    return next(new ErrorResponse(`${errorMessage.courseIdNotFound} ${id}`, 404));
  }

  //make sure user is bootcamp owner
  if(course.user.toString()!== req.user.id){
    return next(new ErrorResponse(`User ${user.params.id} is not authorized to update this course`),401)
  }

   course = await Courses.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@Desc:delete course
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Courses.findById(id);

  if (!course) {
    return next(new ErrorResponse(`${errorMessage.courseIdNotFound} ${id}`, 404));
  }

   //make sure user is bootcamp owner
   if(course.user.toString()!== req.user.id){
    return next(new ErrorResponse(`User ${user.params.id} is not authorized to update this course`),401)
  }
  await course.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
