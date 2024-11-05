// config/db.js
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Cloudinary Configuration
const setupCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary configured");
};

// Initialize both MongoDB and Cloudinary setups
const initializeServices = async () => {
  await connectDB();
  setupCloudinary();
};

module.exports = initializeServices;
