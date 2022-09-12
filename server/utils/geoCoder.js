const NodeGeocoder = require("node-geocoder");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  // Optionnal depending of the providers
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null, // 'gpx', 'string', ...
};

const geoCoder = NodeGeocoder(options);

module.exports = geoCoder;
