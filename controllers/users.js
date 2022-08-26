const { default: mongoose } = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");
const { errorMessage } = require("../utils/messagesConstant");

//@Desc   Get all users
//@Scope  Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
});

//@Desc   Get single
//@Scope  Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, data: user });
});

//@Desc   Create User
//@Scope  Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  res.status(200).json({ success: true, data: user });
});

//@Desc   Update User
//@Scope  Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});

//@Desc  Delete User
//@Scope  Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});
