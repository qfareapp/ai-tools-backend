const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: String,
  rating: Number,
});

const toolSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  website: String,
  logoUrl: String,
  screenshot: String,
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Tool", toolSchema);
