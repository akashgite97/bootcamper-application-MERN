const ErrorResponse = require("../utils/errorResponse")

exports.errorHandler = (err, req, res, next)=>{
console.log(err.stack.red)
let error = {...err}
let message
error.message =err.message

//Mongoose Cast error
if(err.name === 'CastError'){
    message = `Resource not found with id of ${err.value}`
    error=new ErrorResponse(message, 404)
}
//Mongoose Duplicate Key error
if(err.code === 11000){
    message = `Duplicate field value entered ${JSON.stringify(err.keyValue)}`
    error = new ErrorResponse(message, 404)
}
//Mongoose Validation error
if(err.name === 'ValidationError'){
    message = Object.values(err.errors).map(val=>val.message)
    error = new ErrorResponse(message, 404)
}

res.status(error.statusCode || 500).json({
    success:false,
    error: error.message || "Server Error"
})
}