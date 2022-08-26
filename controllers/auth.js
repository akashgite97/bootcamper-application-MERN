const { default: mongoose } = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");
const { errorMessage } = require("../utils/messagesConstant");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");

//@Desc   Get All Bootcamps
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, firstName, lastName, role } = req.body;

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
    return next(new ErrorResponse(errorMessage.requiredEmailAndPassword, 400));

  if (!existingUser)
    return next(new ErrorResponse(errorMessage.userNotExistError, 404));

  const isPasswordCorrect = await existingUser.matchPassword(password);

  if (!isPasswordCorrect) {
    return next(new ErrorResponse(errorMessage.passwordMatchError, 401));
  } else {
    sendTokenResponse(existingUser, 200, res);
  }
});

//@Desc : Logout User
exports.logOut = asyncHandler(async (req, res, next) => {
  res.cookie("token", "nonde", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
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
exports.getMyDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

//@Desc : Update user details
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const filedsToUpdate = {
    email: req.body.email,
    name: req.body.name,
  };
  const user = await User.findByIdAndUpdate(req.user.id, filedsToUpdate, {
    new: true,
  });
  res.status(200).json({
    success: true,
    data: user,
  });
});

//@Desc : Update upassword
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //check current password
  if(!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});

//@Desc : Forgot password to sent token via email
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new ErrorResponse("There is no user with this email", 404));

  //get resetToken
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of password. Please update your password using below link: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({ success: true, data: "Email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent"), 500);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

//@Desc : Get loggedin user details
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  //get user by token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return next(new ErrorResponse("Invalid token", 400));

  //set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});
