const express = require("express");
const dotenv = require("dotenv");
const bootcampsRoutes = require("./routes/bootcamps");
const coursesRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const { logger } = require("./middlewares/logger");
const connectDB = require("./config/db");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorHandler");
const fileupload = require('express-fileupload')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());

dotenv.config({ path: "./config/.env" });

//DB
connectDB();

//middleware
app.use(logger);
app.use(fileupload())
app.use(cookieParser())

//set static folders
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use("/api/v1/bootcamps", bootcampsRoutes);
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Listeing on Port ${PORT}`));

//handle unhanled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`);
  server.close(() => process.exit(1));
});
