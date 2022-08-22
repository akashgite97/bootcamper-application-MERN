const jwt = require("jsonwebtoken");
const { asyncHandler } = require("./asyncHandler");
const User = require("../model/user");
const ErrorResponse = require("../utils/errorResponse");

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    if (token) {
      let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodeToken?.id);
      next();
    }
  } catch (error) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          401
        )
      );
    }
    next()
  };
};
