const express = require("express");
const dotenv = require("dotenv");
const bootcampsRoutes = require("./routes/bootcamps");
const coursesRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const reviewsRoutes = require("./routes/reviews");
const { logger } = require("./middlewares/logger");
const connectDB = require("./config/db");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorHandler");
const fileupload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");

//Security Configuration Packages
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

const app = express();
app.use(express.json());

dotenv.config({ path: "./config/.env" });

//DB
connectDB();

//middleware
app.use(mongoSanitize()); // Prevent SQL injections
app.use(helmet()); // Adds Header Security
app.use(xss()); // Prevent cross site scripting
app.use(logger);
app.use(fileupload());
app.use(cookieParser());
app.use(cors());

//Request Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10min
  max: 100,
});
app.use(limiter);

//Prevent http param polution
app.use(hpp());

//set static folders
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/v1/bootcamps", bootcampsRoutes);
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/reviews", reviewsRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Listeing on Port ${PORT}`));

//handle unhanled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`);
  server.close(() => process.exit(1));
});
