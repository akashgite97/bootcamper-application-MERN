const { default: mongoose } = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const Bootcamp = require("../model/bootcamps");
const ErrorResponse = require("../utils/errorResponse");
const geoCoder = require("../utils/geoCoder");

//@Desc   Get All Bootcamps
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let queryStr = JSON.stringify(req.query);
  let query
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query =  Bootcamp.find(JSON.parse(queryStr))
  const bootcamps = await query ;
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

//@Desc   Get Single Bootcamp
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const bootcamp = await Bootcamp.findById(id);
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found with id ${id}`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@Desc   Create Bootcamp
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const newBootcamp = new Bootcamp(req.body);
  await newBootcamp.save();
  res.status(201).json({ success: true, data: newBootcamp });
});

//@Desc   Update Bootcamp
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No bootcamp with id: ${id}`);
  }
  const updatedBootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: updatedBootcamp });
});

//@Desc   Delete Bootcamp
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No bootcamp with id: ${id}`);
  }
  const updatedBootcamp = await Bootcamp.findByIdAndDelete(id);

  res.json({ success: true, message: "Bootcamp deleted successfully" });
});

//@Desc   Locate Bootcamp
exports.locateBootcamp = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //get lat/lan from geoCoder
  const loc = await geoCoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //Cal Radius using radians
  //Div dis by rad of earth(3,963 mi / 6378km)
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
