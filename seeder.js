const { default: mongoose } = require("mongoose");
const color = require("colors");
const dotenv = require("dotenv");
const fs = require("fs");
const Bootcamp = require("./model/bootcamps");

dotenv.config({ path: "./config/.env" });

//DB connect
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//read bootcamp files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8"));

//import data into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    //await newBootcamp.save();
    console.log("Data Imported".green.inverse)
    process.exit()
  } catch (error) {
    console.error(error);
  }
};

//Delete Data from DB
const deleteData = async () => {
  try {
    const deletedBootcamp = await Bootcamp.deleteMany();
    console.log("Data Deleted".red.inverse)
    process.exit()
  } catch (error) {
    console.error(error);
  }
};

//Perform action based on argument provided in CMD
if(process.argv[2] === '-i'){
    importData()
}else if(process.argv[2] === '-d'){
    deleteData()
}

