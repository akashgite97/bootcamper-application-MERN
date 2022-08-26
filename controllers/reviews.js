
const { asyncHandler } = require("../middlewares/asyncHandler");
const Bootcamp = require("../model/bootcamps");
const Review = require("../model/review");
const ErrorResponse = require("../utils/errorResponse");
const { errorMessage } = require("../utils/messagesConstant");


//@Desc:Get all reviews
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const review = await Review.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: review.length,
      data: review,
    });
  } else {
    res.status(200).json(res.advanceResults);
  }
});

//@Desc:Get review
exports.getReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return next(new ErrorResponse(`${errorMessage.reviewIdNotFound} ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

//@Desc:Add Review
//@path: /api/v1/bootcamps/:bootcampId/review
exports.addreview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(new ErrorResponse(`${errorMessage.bootcampIdNotFound} ${id}`, 404));
  }

  const newReview = new Review(req.body);
  await newReview.save();

  res.status(201).json({
    success: true,
    data: newReview,
  });
});

//@Desc:Update Review
exports.updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let review = await Review.findById(id);

  if (!review) {
    return next(new ErrorResponse(`${errorMessage.reviewIdNotFound} ${id}`, 404));
  }

   //make sure user is bootcamp owner
   if(review.user.toString()!== req.user.id && req.user.role!=="admin"){
    return next(new ErrorResponse(`Not authorized to update review`),401)
  }

   review = await Review.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: review,
  });
});

//@Desc:delete review
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return next(new ErrorResponse(`${errorMessage.reviewIdNotFound} ${id}`, 404));
  }

  await review.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
