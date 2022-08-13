const express = require("express");
const dotenv = require("dotenv");
const bootcampsRoutes = require("./routes/bootcamps");
const { logger } = require("./middlewares/logger");
const connectDB = require("./config/db");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

dotenv.config({ path: "./config/.env" });

//DB
connectDB();

//middleware
app.use(logger);

//Routes
app.use("/api/v1/bootcamps", bootcampsRoutes);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Listeing on Port ${PORT}`));

//handle unhanled promise rejections
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error: ${error.message}`);
  server.close(() => process.exit(1));
});
