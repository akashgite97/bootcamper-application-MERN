const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Connected to DB Successfully on ${conn.connection.host}`.cyan.underline.bold)
};

module.exports = connectDB
