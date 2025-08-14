// db.js
const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      maxPoolSize: 50,
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
