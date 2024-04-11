const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseID: {
    type: Number,
    primaryKey: true,
    autoIncrement: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
