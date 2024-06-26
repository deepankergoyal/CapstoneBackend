const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
