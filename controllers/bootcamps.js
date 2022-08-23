const { default: mongoose } = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const Bootcamp = require("../model/bootcamps");
const ErrorResponse = require("../utils/errorResponse");
const geoCoder = require("../utils/geoCoder");
const path = require('path');
const { errorMessage, successMessage } = require("../utils/messagesConstant");

//@Desc   Get All Bootcamps
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  //Handled by advanceResults middleware
  res.status(200).json(res.advanceResults);
});

//@Desc   Get Single Bootcamp
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const bootcamp = await Bootcamp.findById(id);
  if (!bootcamp) {
    return next(new ErrorResponse(`${errorMessage.bootcampIdNotFound} ${id}`, 404));
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
    return res.status(404).send(`${errorMessage.bootcampIdNotFound}: ${id}`);
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
    return res.status(404).send(`${errorMessage.bootcampIdNotFound} ${id}`);
  }
  const bootcamp = await Bootcamp.findById(id);
  //Delete handled by middleware in bootcamp model
  bootcamp.remove();

  res.json({ success: true, message: successMessage.bootcampDeletd});
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

//@Desc   Photo upload
exports.uploadBootcampPhoto = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const bootcamp = await Bootcamp.findById(id);

  if (!bootcamp) {
    return next(new ErrorResponse(`${errorMessage.bootcampIdNotFound} ${id}`, 404));
  }
  if (!req.files) {
    return next(new ErrorResponse(errorMessage.uploadBootcampImage, 404));
  }

  const file = req.files.file;
  //Check file type is image or not
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(errorMessage.uploadBootcampImage, 400));
  }
  //Check max file size
  if (file.size > process.env.MAX_FILE_SIZE) {
    return next(new ErrorResponse(errorMessage.imageSizeError, 400));
  }

  //Custom file name
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  //Move file to static folder
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error)=>{
    if(error){
      return next(new ErrorResponse(errorMessage.imageUploadError, 400));
    }
    await Bootcamp.findByIdAndUpdate(id, {photo:file.name})
  })


  res.json({ success: true, message:`${file.name} ${successMessage.imageUploaded}` });
});
