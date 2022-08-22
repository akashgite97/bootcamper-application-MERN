const { default: mongoose } = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");

//@Desc   Get All Bootcamps
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, firstName, lastName, role } = req.body;
  console.log(req.body);

  const user = await User.create({
    email,
    password,
    name: `${firstName} ${lastName}`,
    role,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

//@Desc  Register User
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");

  if (!email || !password)
    return next(new ErrorResponse("Please provide an email and password", 400));

  if (!existingUser) return next(new ErrorResponse("User dose not exits", 404));

  const isPasswordCorrect = existingUser.matchPassword(password);

  if (!isPasswordCorrect)
    return next(new ErrorResponse("Password dosen't match", 401));

  sendTokenResponse(existingUser, 200, res);
});

//@Desc  Get token and create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expire: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

//@Desc : Get loggedin user details
exports.getMyDetails = asyncHandler(async (req, res, next)=>{
  const user  = await User.findById(req.user.id)
  res.status(200).json({
    success:true,
    data:user
  })
})