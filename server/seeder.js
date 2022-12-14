const { default: mongoose } = require("mongoose");
const color = require("colors");
const dotenv = require("dotenv");
const fs = require("fs");
const Bootcamp = require("./model/bootcamps");
const Courses = require("./model/courses");
const User = require("./model/user");
const Review = require("./model/review");

dotenv.config({ path: "./config/.env" });

//DB connect
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//read files data
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
);

//import data into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Courses.create(courses);
    await User.create(users);
    await Review.create(reviews);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//Delete Data from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Courses.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data Deleted".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//Perform action based on argument provided in CMD
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
